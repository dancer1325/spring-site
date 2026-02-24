---
title: Using Cloud Foundry Services with Spring: Part 2 - Auto-reconfiguration
source: https://spring.io/blog/2011/11/04/using-cloud-foundry-services-with-spring-part-2-auto-reconfiguration
scraped: 2026-02-24T08:33:03.448Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ramnivas Laddad |  November 04, 2011 | 1 Comment
---

# Using Cloud Foundry Services with Spring: Part 2 - Auto-reconfiguration

_Engineering | Ramnivas Laddad |  November 04, 2011 | 1 Comment_

If you watched the video for the [Cloud Foundry launch event](http://www.youtube.com/watch?v=o2iXuUkVJ9Q), you saw that we deployed the Spring Travel application downloaded from Spring Web Flow samples, bound a MySQL service to it, and dragged and dropped the application to the Cloud Foundry server in STS, **without making a single line of change** in the application itself. How’s that possible since the application is configured to use a local database? That’s when auto-reconfiguration comes into play.

Cloud Foundry strives to keep your initial investment low. Beyond dollars and cents, a real investment comes from the time that a developer spends in getting started. Auto-reconfiguration is one mechanism that reduces initial investment when you want to get started with Cloud Foundry. In this blog, we explore how it works with Spring applications (grails applications use the same underlying mechanism and thus behave identically).

## Leveraging dependency injection for auto-reconfiguration

Your application consists of business logic and interaction with services such as database and messaging. In a typical Spring application, you take advantage of dependency injection (DI) to create beans for each service used and inject those beans into other beans that need access to those services.

Let's look at a typical Spring application that uses a relational database that will have a datasource bean defined as:

```xml
Copy
<bean class="org.apache.commons.dbcp.BasicDataSource" id="dataSource">
    <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
    <property name="url" value="jdbc:mysql://localhost:3306/inventory-db"/>
    <property name="username" value="myuser"/>
    <property name="password" value="mypass"/>
</bean>
```

We could externalize properties such as username and password into a separate file, but we embed values to focus on the auto-reconfiguration mechanism.

This bean may then be injected into other beans (in this case, into a JPA entity manager):

```xml
Copy
<bean class="org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean" id="entityManagerFactory">
    <property name="persistenceUnitName" value="persistenceUnit"/>
    <property name="dataSource" ref="dataSource"/>
</bean>
```

We can make one easy observation: The database URL points to a database on localhost, username is set to "myuser", and password is set to "mypass". When you push this application to Cloud Foundry and bind a MySQL or Postgres service, the URL for that service is not going to be `jdbc:mysql://localhost:3306/inventory-db` and the username or password aren't going to be that easy! So without an additional mechanism, such an application will fail on startup. This is where the auto-reconfiguration mechanism comes into play. The auto-reconfiguration mechanism leverages DI to examine Spring application context, look for beans that correspond to services, and replace each of those services with beans created based on service bound to the application. The result is the user application works in local deployment and in Cloud Foundry without any change.

The following table shows what bean types auto-reconfiguration looks for reconfiguration.

Service Type

Replaced bean type

Mysql, Postgres

`javax.sql.DataSource`

Redis

`org.springframework.data.redis.connection.RedisConnectionFactory`

MongoDB

`org.springframework.data.document.mongodb.MongoDbFactory`

RabbitMQ

`org.springframework.amqp.rabbit.connection.ConnectionFactory`

The underlying mechanism behind auto-reconfiguration uses a `BeanFactoryPostProcessor` that examines the application context before creating beans and swaps existing beans of matching types with equivalent beans based on services bound to the application. For relational databases, it also reconfigures the JPA entity manager factory or Hibernate session factory to adjust the dialect being used.

When your application is staged during the deployment process, Cloud Foundry will make two modifications:

1.  It will add an additional jar to your application that contains the `BeanFactoryPostProcessor` and attendant resources. Note that the jar used for auto-reconfiguration also comes with a version of the cloudfoundry-runtime. However, those classes are relocated to a different package through a shading mechanism. This allows your application to use a different version of the cloudfoundry-runtime without any conflict.
2.  It will modify web.xml to update files that constitute Spring's application context to add the `BeanFactoryPostProcessor` to it.

## Limitations

Auto-reconfiguration of services work only under the following conditions:

1.  There may exactly be only one service of a given service type. For example, you may bind only one relational database service (MySQL or Postgres) to an application.
2.  There may exactly be only one bean of the matching type. For example, you may have only one `DataSource` bean in the application context.

If an application doesn't follow these limitations, the auto-reconfiguration mechanism will not take place. In those cases, you will need to use the `<cloud>` namespace described in the next blog with or without the Spring 3.1 profile support.

The auto-reconfiguration mechanism expects typical Spring applications. If your application context is complex, it may not work. In those cases, you can opt out of auto-reconfiguration as we will describe next.

## Opting out of auto-reconfiguration

There may be situations where you would like to opt out of auto-reconfiguration. For example, you may have an in-memory relational database that should not be bound to a Cloud Foundry service. Cloud Foundry offers a few ways to opt out of auto-reconfiguration mechanism.

1.  Choose framework as "JavaWeb" when deploying the application. This will treat your application as if it isn't a Spring application. This is a hard opt out in that your application will remain unchanged (no jars will be added to your application and web.xml will remain unchanged). This also means that the profile feature discussed later in this blog series will not be available to such applications.
2.  Use any `<cloud>` element that creates a bean representing a service. This currently includes `<cloud:data-source>`, `<cloud:mongo-db-factory>`, `<cloud:rabbit-connection-factory>`, `<cloud:redis-connection-factory>`, and `<cloud:service-scan>`. If the application directly includes a bean based on the underlying type for these namespace elements (such as `CloudMongoDbFactoryBean`), opt-out will be in effect. Cloud Foundry uses this mechanism to opt out, since applications either want to have the auto-reconfiguration behavior or simply take control over service creating completely. We do not see the value in auto-reconfiguring some services and manually doing for others.

## Conclusion

Auto-reconfiguration facility in Cloud Foundry is a wonderful way to get started. As your application matures or you need to bind to multiple services, you may need finer control over service connection objects. This is where the `<cloud>` namespace support comes into the picture. In the next blog in this series, Thomas Risberg will explain how to use it. Take it away Thomas.