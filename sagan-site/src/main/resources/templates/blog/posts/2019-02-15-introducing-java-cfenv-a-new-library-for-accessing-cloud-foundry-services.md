---
title: Introducing java-cfenv: A new library for accessing Cloud Foundry Services
source: https://spring.io/blog/2019/02/15/introducing-java-cfenv-a-new-library-for-accessing-cloud-foundry-services
scraped: 2026-02-23T14:56:35.686Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  February 15, 2019 | 6 Comments
---

# Introducing java-cfenv: A new library for accessing Cloud Foundry Services

_Releases | Mark Pollack |  February 15, 2019 | 6 Comments_

## [](#introduction)Introduction

The Spring Cloud Connectors library has been with us since the launch event of Cloud Foundry itself back in 2011. One of the main goals of the connector library and Cloud Foundry’s Java buildpack was to “reduce the initial investment when you want to get started with Cloud Foundry”. The connector library creates the Spring bean definitions required to connect to backing services, like databases, using information contained in the VCAP\_SERVICES environment variable. The buildpack then replaces these bean definitions you had in your application with those created by the connector library through a feature called ‘auto-reconfiguration’. You may have seen it mentioned in the logs when you pushed an app to Cloud Foundry…

```bash
Copy-----> Downloading Spring Auto Reconfiguration 2.5.0_RELEASE from https://java-buildpack.cloudfoundry.org/auto-reconfiguration/auto-reconfiguration-2.5.0_RELEASE.jar
```

Auto-reconfiguration is great for getting started. However, it is not so great when you want more control, for example changing the size of the connection pool associated with a `DataSource`. This requires writing connector-specific code and it doesn’t expose as many connection pool options as Spring Boot does. The same limitations apply to other backing services.

This raises the question, why do we have two competing mechanisms to create service infrastructure beans? Can’t we let Spring Boot handle all of this for us? That was the motivation for creating our new `java-cfenv` library.

## [](#introducing-java-cfenv)Introducing java-cfenv

The [java-cfenv](https://github.com/pivotal-cf/java-cfenv) library is inspired by the [node-cfenv](https://github.com/cloudfoundry-community/node-cfenv/) and [py-cfenv](https://github.com/jmcarp/py-cfenv) libraries used elsewhere in the Cloud Foundry ecosystem. These libraries provide a simple API for retrieving credentials from the JSON strings contained inside the `VCAP_SERVICES` environment variable. We will start with a tour of the Java API (which we don’t expect will be used very often) and then show how it integrates with Spring and Spring Boot’s auto-configuration functionality.

The core API consists of five classes

-   `CfEnv` which is responsible for parsing the contents of the `VCAP_SERVICES` and `VCAP_APPLICATION` environment variables.
-   `CfApplication` that provides accessors for the contents of the `VCAP_APPLICATION` environment variable.
-   Finder methods on `CfEnv` return instances of a `CfService` class.
-   `CfService` provides accessors for the name, label, tabs, and plan of the service as well as a `CfCredentials` object.
-   `CfCredentials` provides accessors for getting the username, password, host, port, and URI. The URI is represented using a `UriInfo` class.

For example, if you bind a MySql service to your application in Cloud Foundry, the `VCAP_SERVICES` environment variable would contain an entry such as

```javascript
Copy{
 "p-mysql": [
    {
      "credentials": {
        "hostname": "10.0.4.35",
        "port": 3306,
        "name": "cf_2e23d10a_8738_8c3c_66cf_13e44422698c",
        "username": "8McHri7aKbuTEGCR",
        "password": "J2BNJYkeXAH9idkG",
        "uri": "mysql://8McHri7aKbuTEGCR:J2BNJYkeXAH9idkG@10.0.4.35:3306/cf_2e23d10a_8738_8c3c_66cf_13e44422698c?reconnect=true",
        "jdbcUrl": "jdbc:mysql://10.0.4.35:3306/cf_2e23d10a_8738_8c3c_66cf_13e44422698c?user=8McHri7aKbuTEGCR&password=J2BNJYkeXAH9idkG"
      },
      "syslog_drain_url": null,
      "volume_mounts": [],
      "label": "p-mysql",
      "provider": null,
      "plan": "100mb",
      "name": "mysql",
      "tags": [
        "mysql",
        "relational"
      ]
    }
  ]
}
```

When using the java-cfenv API, we can obtain the credential information using a few simple method calls, and then programmatically create a connection to your database.

```java
CopyCfEnv cfEnv = new CfEnv();
CfService cfService = cfEnv.findServiceByName(“mysql”);
String plan = cfService.getPlan(); // 100mb
CfCredentials cfCredentials = cfService.getCredentials();
String password = cfCredentials.getPassword(); // J2BNJYkeXAH9idkG
UriInfo uriInfo = cfCredentials.getUriInfo();
String username = uriInfo.getUsername(); // 8McHri7aKbuTEGCR
```

The `findServiceByName` method takes a regular expression to help provide some portability across different Cloud Foundry environments which can name services slightly differently. There are other finder methods too, to help you select from tags and labels etc.

## [](#database-support)Database support

In the previous example, you probably just want to obtain the JSON field jdbcUrl so you can pass it into a `DataSource`. You can do this using the API

```java
CopyString jdbcUrl = cfCredentials.getString(“jdbcUrl”);
```

However, not all database services on Cloud Foundry provide this handy field. In fact, the fields provided by various database services on Cloud Foundry can be rather arbitrary. The existing connector library has developed heuristics to deal with this disparity, and this functionality has been ported over to the new java-cfenv library. It’s is available in the `CfEnvJdbc` class:

```java
CopyCfEnvJdbc cfEnvJdbc = new CfEnvJdbc();
CfJdbcService cfJdbcService = cfEnvJdbc.findJdbcService();
String jdbcUrl = cfJdbcService.getUrl();
```

The method `findJdbcService` will throw an exception if there is more than one database service bound to the application. In this case, you can use the method `findJdbcServiceByName` to select among multiple database services.

```java
CopyString jdbcUrl1 = cfEnvJdbc.findJdbcServiceByName('mysqlA').getUrl();
String jdbcUrl2 = cfEnvJdbc.findJdbcServiceByName('mysqlB').getUrl();
```

## [](#use-with-spring)Use with Spring

If you are using Spring and not Spring Boot, you can register a `CfJdbcEnv` instance as a bean and then invoke methods on it using the Spring Expression Language to set application properties.

```java
Copy@Bean
public CfJdbcEnv cfJdbcEnv() {
  return new CfJdbcEnv();
}
```

Then in a property file, access the `CfJdbcEnv` instance

```java
CopymyDatasourceUrl=#{ cfJdbcEnv.findJdbcService().getUrl() }
```

## [](#use-with-spring-boot)Use with Spring Boot

Most Spring Boot users will not have to use the java-cfenv API directly. The java-cfenv library contains Spring Boot `EnvironmentPostProcessor` implementations that set well-known Spring Boot properties automatically. This allows for Spring Boot’s auto-configuration to kick-in while still leaving open the possibility of overriding values through environment variables or other higher prioritized environment property sources.

After generating your project from [start.spring.io](https://start.spring.io), all you need to do to make this work is to manually add the java-cfenv-boot dependency into your project, and disable auto-reconfiguration when pushing your application to Cloud Foundry. For maven, the dependency is:

```xml
Copy<dependency>
  <groupId>io.pivotal.cfenv</groupId>
  <artifactId>java-cfenv-boot</artifactId>
  <version>1.0.0.M1</version>
</dependency>
```

Because this is currently a milestone build, you will need to add a milestone `<repository>` configuration such as:

```xml
Copy<repository>
   <id>spring-milestones</id>
   <name>Spring Milestones</name>
   <url>http://repo.spring.io/libs-milestone-local</url>
</repository>
```

To disable auto-reconfiguration, use the following commands or their equivalent in a manifest file.

```bash
Copycf set-env <APP> JBP_CONFIG_SPRING_AUTO_RECONFIGURATION '{enabled: false}'
```

Since auto-reconfiguration also sets the `cloud` profile, which many applications have come to depend upon, you will likely need to also set this profile explicitly.

```bash
Copycf set-env <APP> SPRING_PROFILES_ACTIVE cloud
```

If you are using a manifest, the entries would be:

```yaml
Copyenv:
 SPRING_PROFILES_ACTIVE: cloud
 JBP_CONFIG_SPRING_AUTO_RECONFIGURATION: '{enabled: false}'
```

> It’s worth noting that in production, you probably should be doing this anyway.

To set connection pool properties, you can now simply use standard Spring Boot properties such as `spring.datasource.maxActive=10` and other more specific connection pool properties.

## [](#whats-next)What's next?

More information on how to use the java-cfenv library is available on [GitHub](https://github.com/pivotal-cf/java-cfenv). The current release is 1.0.0.M1 and there will be a short path to a GA release since it is being incorporated into the Data Flow 2.0 GA release later this month. As always, we welcome your feedback and contributions, even if they result in breaking API changes that need to be incorporated into a java-cfenv 2.0 version shortly after the 1.0 release.

The 1.0 GA release of java-cfenv will support all the services that were part of the Spring Cloud Connectors project as they are well supported by Spring Boot auto-configuration. **At that point, the existing Connectors library will be put into maintenance mode.** Critical bugs and security issues will, of course, be addressed, but new features will not be added. A guide for migrating applications from Spring Cloud Connectors to java-cfenv will be provided with the 1.0 GA release of java-cfenv.

There are other libraries that build off the core Connectors project, listed on the project page. These extension projects can continue to use Connectors, but the maintainers are encouraged to migrate to a Boot-centric approach.