---
title: Using Cloud Foundry Services with Spring: Part 3 - the <cloud> namespace
source: https://spring.io/blog/2011/11/09/using-cloud-foundry-services-with-spring-part-3-the-cloud-namespace
scraped: 2026-02-24T08:32:54.728Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Thomas Risberg |  November 09, 2011 | 1 Comment
---

# Using Cloud Foundry Services with Spring: Part 3 - the <cloud> namespace

_Engineering | Thomas Risberg |  November 09, 2011 | 1 Comment_

We saw in the previous blog post [Using Cloud Foundry Services with Spring: Part 2 - Auto-reconfiguration](http://blog.springsource.com/2011/11/04/using-cloud-foundry-services-with-spring-part-2-auto-reconfiguration/) that when you deploy a Spring application, your use of data services will be detected, and your application will automatically be re-configured to use the cloud services available to your application. This works great for simple applications and demos, but if you have a serious production application you probably want to have more control. You also need more control if you have multiple services of the same type. Ramnivas hinted at this saying that you can opt out of auto-reconfiguration by explicitly using the cloud data service factory beans like `CloudMongoDbFactoryBean`, `CloudRedisConnectionFactoryBean` etc. The easiest way to do this is to use the `<cloud>` namespace for your service definitions. This blog post will cover this namespace in more detail.

## Including the `<cloud>` namespace in your application.

You need to include the org.cloudfoundry:cloudfoundry-runtime dependency in your build. If you are using Maven add this dependency to your pom.xml:

```xml
Copy
<dependencies>
    <dependency>
        <groupId>org.cloudfoundry</groupId>
        <artifactId>cloudfoundry-runtime</artifactId>
        <version>0.8.1</version>
    </dependency>

    <!-- additional dependency declarations -->
</dependencies>
```

You will also need to have the Spring Framework Milestone Repository in your pom.xml. Simply add this repository declaration to your repositories:

```xml
Copy
<repositories>
    <repository>
        <id>org.springframework.maven.milestone</id>
        <name>Spring Framework Maven Milestone Repository</name>
        <url>http://maven.springframework.org/milestone</url>
    </repository>

    <!-- additional repository declarations -->
</repositories>
```

Now we are ready to add the `<cloud>` namespace to our application context files. We need to declare the namespace (line 5) and also provide the schema location (line 8). Once we have this declared we can use the `<cloud>` namespace elements in our xml file (line 10). Here is the complete example::

```xml
Copy
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:context="http://www.springframework.org/schema/context"
  xmlns:cloud="http://schema.cloudfoundry.org/spring"
  xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.1.xsd
	http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-3.1.xsd
	http://schema.cloudfoundry.org/spring http://schema.cloudfoundry.org/spring/cloudfoundry-spring-0.8.xsd">

    <cloud:mongo-db-factory id="mongoDbFactory">

    <bean id="mongoTemplate" class="org.springframework.data.mongodb.core.MongoTemplate">
        <constructor-arg ref="mongoDbFactory"/> 	
    </bean>

    <!-- more beans for your app -->

</beans>
```

The rest of this blog post covers all the available namespace elements and their configuration options.

## Available Namespace Elements

### `<cloud:data-source>`

The `<cloud:data-source>` element provides a convenient way to configure the JDBC `DataSource` for your Spring application.

Basic attributes:

-   **id** - defaults to service name
-   **service-name** - only needed if you have multiple relational database services bound to the app

  

A simple example `DataSource` configuration to be injected into a `JdbcTemplate` would look like this, with the only attribute used specifying the id of the datasource bean.

```xml
Copy
<cloud:data-source id="dataSource" />

<bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
  <property name="dataSource" ref="dataSource" />
</bean>
```

There are sub-elements that can be used to configure specific connections and pool settings. The `<cloud:data-source>` namespace element supports the most commonly used configuration options via the `<cloud:connection>` and `<cloud:pool>` sub-elements. The supported options are explained bellow:

**`<cloud:connection>` options**

Namespace attribute

Description

Type

properties

The connection properties that will be sent to the JDBC driver when establishing new connections. Format of the string must be "propertyName=property;"

string

  

**`<cloud:pool>` options**

Namespace attribute

Description

Type

Default

pool-size

Either the maximum number of connections in the pool or a range specifying minimum and maximum size separated by a dash.

int

Uses the default settings of the Apache Commons Pool which are 0 for min and 8 for max size

max-wait-time

The maximum number of milliseconds that the pool will wait (when there are no available connections) for a connection to be returned before throwing an exception. -1 indicates unlimited wait.

int

Uses the default setting of the Apache Commons Pool which is unlimited (-1)

  

Here is an example of a `DataSource` configuration with additional settings specified:

```xml
Copy
<cloud:data-source id="mydatasource">
    <cloud:connection properties="charset=utf-8;" />
    <cloud:pool pool-size="5-10" max-wait-time="2000" />
</cloud:data-source>
```

### `<cloud:mongo-db-factory>`

The `<cloud:mongo-db-factory>` element provides a convenient way to configure the MongoDB connection factory for your Spring application.

Basic attributes:

-   **id** - defaults to service name
-   **service-name** - only needed if you have multiple MongoDB services bound to the app
-   **write-concern** - the WriteConcern to use for all DB connections created (NONE, NORMAL, SAFE, FSYNC\_SAFE). If this is not specified then no WriteConcern will be set for the DB connections and all writes will default to NORMAL

  

The values for the write-concern attribute correspond to the values available in the `com.mongodb.WriteConcern` class.

Value

Description

NONE

No exceptions are raised, even for network issues

NORMAL

Exceptions are raised for network issues, but not server errors

SAFE

Exceptions are raised for network issues, and server errors; waits on a server for the write operation

FSYNC\_SAFE

Exceptions are raised for network issues, and server errors and the write operation waits for the server to flush the data to disk

  

A simple example `MongoDbFactory` configuration to be injected into a `MongoTemplate` would look like this, with the only attribute used specifying the id of the mongoDbFactory bean.

```xml
Copy
<cloud:mongo-db-factory id="mongoDbFactory" />

<bean id="mongoTemplate" class="org.springframework.data.mongodb.core.MongoTemplate">
    <constructor-arg ref="mongoDbFactory"/> 	
</bean>
```

There are some advanced configuration attributes that are available using the `<cloud:mongo-options>` sub-element and they are listed below.

**`<cloud:mongo-options>`**

Namespace attribute

Description

Type

Default

connections-per-host

The maximum number of connections allowed per host for the Mongo instance. Those connections will be kept in a pool when idle. Once the pool is exhausted, any operation requiring a connection will block waiting for an available connection.

int

The Mongo driver has a default of 10

max-wait-time

The maximum wait time in ms that a thread may wait for a connection to become available.

int

The Mongo driver has a default of 120000

  

Here is an example of a `MongoDbFactory` configuration with additional settings specified:

```xml
Copy
<cloud:mongo-db-factory id="mongoDbFactory" write-concern="FSYNC_SAFE">
    <cloud:mongo-options connections-per-host="10" max-wait-time="2000" />
</cloud:mongo-db-factory>
```

### `<cloud:redis-connection-factory>`

The `<cloud:redis-connection-factory>` element provides a convenient way to configure the Redis connection factory for your Spring application.

Available attributes:

-   **id** - defaults to service name
-   **service-name** - only needed if you have multiple Redis services bound to the app

  

A simple example `RedisConnectionFactory` configuration to be injected into a `RedisTemplate` would look like this, with the only attribute used specifying the id of the redisConnectionFactory bean.

```xml
Copy
<cloud:redis-connection-factory id="redisConnectionFactory" />

<bean id="redisTemplate" class="org.springframework.data.redis.core.StringRedisTemplate">
    <property name="connection-factory" ref="redisConnectionFactory"/>
</bean>
```

The advanced configuration attributes that are available via the `<cloud:pool>` sub-element are listed below.

**`<cloud:pool>` options**

Namespace attribute

Description

Type

Default

pool-size

Either the maximum number of connections in the pool or a range specifying minimum and maximum size separated by a dash.

int

Uses the default settings of the Apache Commons Pool which are 0 for min and 8 for max size

max-wait-time

The maximum number of milliseconds that the pool will wait (when there are no available connections) for a connection to be returned before throwing an exception.

int

Uses the default setting of the Apache Commons Pool which is unlimited (-1)

  

Here is an example of a `RedisConnectionFactory` configuration with additional settings specified:

```xml
Copy
<<cloud:redis-connection-factory id="myRedisConnectionFactory">
    <cloud:pool pool-size="5-10" max-wait-time="2000" />
</cloud:redis-connection-factory>
```

### `<cloud:rabbit-connection-factory>`

The `<cloud:rabbit-connection-factory>` element provides a convenient way to configure the RabbitMQ connection factory for your Spring application.

Available attributes:

-   **id** - defaults to service name
-   **service-name** - only needed if you have multiple RabbitMQ services bound to the app

  

A simple example `RabbitConnectionFactory` configuration to be injected into a `RabbitTemplate` would look like this, with the only attribute used specifying the id of the rabbitConnectionFactory bean. This example uses the `<rabbit>` namespace in addition to the `<cloud>` one.

```xml
Copy
<cloud:rabbit-connection-factory id="rabbitConnectionFactory" />

<rabbit:template id="rabbitTemplate"
    connection-factory="rabbitConnectionFactory" />
```

The advanced configuration attributes that are available via the `<cloud:rabbit-options>` are listed below.

**`<cloud:rabbit-options>`**

Namespace attribute

Description

Type

Default

channel-cache-size

The size of the channel cache.

int

The default is 1

  

Here is an example of a `RabbitConnectionFactory` configuration with additional settings specified:

```xml
Copy
<cloud:rabbit-connection-factory id="myRedisConnectionFactory">
    <cloud:rabbit-options channel-cache-size="10" />
</cloud:rabbit-connection-factory>
```

### `<cloud:service-scan>`

The `<cloud:service-scan>` element scans all services bound to the application and creates a bean of an appropriate type for each. You can think of this element as a cloud extension of `<context:component-scan>` in core Spring, which scans the classpath for beans with certain annotations and creates a bean for each. The `<cloud:service-scan>` is especially useful during the initial phases of application development, where you want immediate access to service beans without adding a `<cloud>` element for each new service bound.

Once you include a `<cloud:service-scan>` element in application context, then in your Java code, simply add `@Autowired` dependencies for each bound service:

```java
Copy
@Autowired DataSource dataSource;
@Autowired ConnectionFactory rabbitConnectionFactory;
@Autowired RedisConnectionFactory redisConnectionFactory;
@Autowired MongoDbFactory mongoDbFactory;
```

Voila! You have access to all services without breaking a sweat.

The above style works as long as you have only one service of each type bound to the application. In other cases, you need to use the `@Qualifier` to specify the service name (each automatically created bean is named after the associated service name).

```java
Copy
@Autowired @Qualifier("inventory-db") DataSource inventoryDataSource;
@Autowired @Qualifier("pricing-db") DataSource pricingDataSource;
```

Here, the `inventoryDataSource` bean will be bound to the `inventory-db` service and the `pricingDataSource` bean will be bound to the `pricing-db` service.

### `<cloud:properties>`

Available attributes:

-   **id** - the name of the Properties bean

The `<cloud:properties>` element exposes basic information about services that can be consumed with Spring’s property placeholder support. The properties exposed match those automatically enabled for a Spring 3.1 application. We will talk about the property form in the next blog.

## Conclusion

The cloud namespace supports an easy mechanism to connect to cloud services. Developers often desire to deploy the same application (the same ‘bits’) in local Tomcat/tcServer, local cloud, and CloudFoundry.com. Spring 3.1’s profile support is tailor-made to support such a possibility. In the next blog, Scott Andrews will explain how.