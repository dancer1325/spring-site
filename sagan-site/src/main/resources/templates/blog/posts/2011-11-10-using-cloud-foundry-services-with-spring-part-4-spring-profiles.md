---
title: Using Cloud Foundry Services with Spring: Part 4 – Spring Profiles
source: https://spring.io/blog/2011/11/10/using-cloud-foundry-services-with-spring-part-4-spring-profiles
scraped: 2026-02-24T08:32:31.575Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Scott Andrews |  November 10, 2011 | 0 Comments
---

# Using Cloud Foundry Services with Spring: Part 4 – Spring Profiles

_Engineering | Scott Andrews |  November 10, 2011 | 0 Comments_

Spring 3.1 adds significant new support for environments. This new [Environment API](http://static.springsource.org/spring/docs/3.1.x/javadoc-api/org/springframework/core/env/Environment.html) makes it easy to expose properties to an application or conditionally load a fragment of configuration.

In an earlier post in this series, Ramnivas showed how [Cloud Foundry can automatically connect to a database without manual configuration](http://blog.springsource.com/2011/11/04/using-cloud-foundry-services-with-spring-part-2-auto-reconfiguration/). When you need more control over this process, e.g. connecting to multiple databases, the cloud namespace condenses the configuration of a `DataSource` into just a single line of XML. The cloud namespace is powerful, but it is only supported for applications running in Cloud Foundry. Using the cloud namespace means coupling that portion of configuration to Cloud Foundry. When not deployed to Cloud Foundry, this configuration should be disabled. Out of container testing is a fundamental tenet of Spring’s philosophy, so it would be unacceptable if an application had to be deployed  in order to run an integration test. Spring Profiles solves this problem.

A *[Profile](http://static.springsource.org/spring/docs/3.1.x/spring-framework-reference/html/new-in-3.1.html#d0e1293)* in Spring is a fragment of configuration that is only activated when a certain condition is true. Many application platforms have had a concept of development, test, and production configurations. While profiles can be used in this way, they are also much more flexible. There is no predefined set of profiles, except  a “`default`” profile that is activated when no other profiles are defined. A profile can be used to swap configurations when running in a different environment or to enable an optional feature in your application. It’s up to you how you want to use it.

## Isolating Cloud Foundry specific configuration

When a Spring application is deployed to Cloud Foundry, the “`cloud`” profile is automatically enabled. This allows for a pre-defined, convenient location for Cloud Foundry specific application configuration. All specific usages of the cloud namespace should occur within the cloud profile block to allow the application to run outside of Cloud Foundry environments.

```xml
Copy
<bean id="mongoTemplate" class="org.springframework.data.mongodb.core.MongoTemplate">
    <constructor-arg ref="mongoDbFactory" />
</bean>
<beans profile="default">
    <mongo:db-factory id="mongoDbFactory" dbname="pwdtest" host="127.0.0.1" port="27017" username="test_user" password="efgh" />
</beans>
<beans profile="cloud">
    <cloud:mongo-db-factory id="mongoDbFactory" />
</beans>
```

This sample configuration shows Spring's `MongoTemplate` being populated from two alternatively configured connection factories. When running on Cloud Foundry, the connection factory is automatically configured. When not running on Cloud Foundry, the connection factory is manually configured with the connection settings to a locally running MongoDB instance.

## Enabling an application feature on Cloud Foundry

One common question we receive is, “How do I send email from my application?” Unfortunately, SMTP is blocked from applications running on CloudFoundry.com to prevent spam and other abuse.

However, it is still possible to send email from your Cloud Foundry application. Service providers, such as [SendGrid](http://sendgrid.com/), can send email on your behalf via HTTP web services. When the application is running in your own datacenter, you may want to use the corporate SMTP server, and then use SendGrid when running on CloudFoundry.com.  Here is an example of how to create a service bean to connect to SendGrid in the cloud profile.

```xml
Copy
<beans profile="cloud">
    <bean name="mailSender" class="example.SendGridMailSender">
        <property name="apiUser" value="youremail@domain.com" />
        <property name="apiKey" value="secureSecret" />
    </bean>
</beans>
```

## Cloud Properties

Beyond profiles, cloud specific properties are now exposed directly into the application and can be consumed with Spring’s property placeholder support. These properties include basic information about the application, such as its name and the cloud provider, and detailed connection information for all services bound to the application. This makes it easy to create your own service connection factories. If your application requires a c3p0 connection pool instead of the provided connection pool for some reason, it’s easy to do.

```xml
Copy
<beans profile="cloud">
    <bean id="c3p0DataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource" destroy-method="close">
        <property name="driverClass" value="com.mysql.jdbc.Driver" />
        <property name="jdbcUrl" value="jdbc:mysql://${cloud.services.mysql.connection.host}:${cloud.services.mysql.connection.port}/${cloud.services.mysql.connection.name}" />
        <property name="user" value="${cloud.services.mysql.connection.username}" />
        <property name="password" value="${cloud.services.mysql.connection.password}" />
    </bean>
</beans>
```

Service properties generally take the form “`cloud.services.{service-name}.connection.{property}`”. The specific connection properties that are available depend on the type of service.

For convenience, if there is a single service of a given type bound to the application, an alias will be created based on the service type instead of the service name. For a MySQL service, the properties will take the form “`cloud.services.mysql.connection.{property}`”.

## Available today, automagically

Both the cloud profile and properties are automatically available to all Spring applications running on Cloud Foundry. Use of Spring 3.1 (or later) is required. Our goal is to create a frictionless path to get running on Cloud Foundry while still making it easy to take control when needed.  Most importantly, we want to allow maximum portability for Spring applications to run everywhere without having to manually configure the application for each deployment environment.