---
title: Spring Cloud Azure 5.0 is now Generally Available
source: https://spring.io/blog/2023/01/26/spring-cloud-azure-5-0-is-now-generally-available
scraped: 2026-02-23T10:15:10.854Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  January 26, 2023 | 0 Comments
---

# Spring Cloud Azure 5.0 is now Generally Available

_Engineering | Josh Long |  January 26, 2023 | 0 Comments_

We're very pleased to announce that Spring Cloud Azure 5.0 is now generally available.

This major release includes the following features, improvements, and documentation updates:

-   Compatible with Spring Boot 3 and Spring Cloud 2022.0.0
-   Supports [Passwordless Connections](https://learn.microsoft.com/azure/developer/intro/passwordless-overview)
-   Updated [Azure for Spring developers documentation](https://learn.microsoft.com/en-us/azure/developer/java/spring/) to help Spring developers code, deploy and scale Spring applications on Azure
-   Redesigned [Spring Cloud Azure documentation](https://learn.microsoft.com/en-us/azure/developer/java/spring-framework/) with improved scenarios

![](https://github.com/joshlong/blog-images/raw/master/spring-cloud-azure-5-ga/upgrades.jpg)

To try Spring Cloud Azure 5.0, simply add the following dependency BOM to your project:

```
Copy<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>com.azure.spring</groupId>
      <artifactId>spring-cloud-azure-dependencies</artifactId>
      <version>5.0.0</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  </dependencies>
</dependencyManagement>

```

## [](#spring-boot-3-and-spring-cloud-202200-integration)Spring Boot 3 and Spring Cloud 2022.0.0 integration

Spring Boot 3 and Spring Cloud 2022.0.0 bring many exciting features, requiring some significant changes to Spring Cloud Azure to fully leverage them.

### [](#noteworthy-changes-in-this-version)Noteworthy changes in this version

-   Deprecated API upgrades, [Azure/azure-sdk-for-java#31543](https://github.com/Azure/azure-sdk-for-java/pull/31543):

`com.azure.spring.cloud.autoconfigure.aad.implementation.oauth2.AadOAuth2AuthenticatedPrincipal` class removed `com.azure.spring.cloud.autoconfigure.aad.implementation.webapi.AadOboOAuth2AuthorizedClientProvider` class removed `com.azure.spring.cloud.autoconfigure.aad.properties.AadAuthorizationGrantType` class removed `com.azure.spring.cloud.autoconfigure.aad.AadJwtBearerTokenAuthenticationConverter` class removed `AuthorizationGrantType.PASSWORD` no longer supported `com.nimbusds.jwt.proc.DefaultJWTClaimsVerifier#DefaultJWTClaimsVerifier(com.nimbusds.jwt.JWTClaimsSet, java.util.Set<java.lang.String>)` method replaces `com.nimbusds.jwt.proc.DefaultJWTClaimsVerifier#DefaultJWTClaimsVerifier()` `AbstractHttpConfigurer` replaces `org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter` `spring-cloud-azure-trace-sleuth` artifact removed

-   Spring Security 6 dependencies upgrades, [Azure/azure-sdk-for-java#31808](https://Azure/azure-sdk-for-java#31808):

`org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity` annotation replaces `org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity` `org.springframework.security.oauth2.server.resource.authentication.BearerTokenAuthenticationToken` class replaces `org.springframework.security.oauth2.server.resource.BearerTokenAuthenticationToken`

-   Class package path updates and API polishing/refinement, including reducing the number of public APIs: [#32552](https://github.com/Azure/azure-sdk-for-java#32552), [#32582](https://github.com/Azure/azure-sdk-for-java#32552), [#32597](https://github.com/Azure/azure-sdk-for-java#32597) , [#32616](https://github.com/Azure/azure-sdk-for-java#32616), [#32716](https://Azure/azure-sdk-for-java#32716) .

The following features are planned for future releases:

-   GraalVM native image\*\*
-   Spring Data Cosmos DB
-   App Configuration Config and Feature Management

\*\* Currently available for beta testing, please visit [Spring Cloud Azure Native Reachability client library for Java](https://github.com/Azure/azure-sdk-for-java/tree/feature/spring-boot-3/sdk/spring/spring-cloud-azure-native-reachability) to give it a try.

Stay tuned for updates!

## [](#passwordless-connections)Passwordless connections

Using username/password credentials to access one application from another significantly increases overall risk profile. An unauthorized user can gain access to the application using a connection string accidentally checked into source control, sent through an insecure email, pasted into the wrong chat, or otherwise illegitimately obtained. Updating your application to use passwordless connections provides dramatically improved security.

Passwordless connections for Java applications to Azure databases and eventing services are generally available with Spring Cloud Azure 5.0, enabling you to access services securely without passing usernames and passwords over the wire.

![](https://github.com/joshlong/blog-images/raw/master/spring-cloud-azure-5-ga/passwordless.png)

These Azure Services currently support passwordless connections:

Azure Service

Quickstart

Migration guide

Azue Database for MySQL

[Spring Data JDBC](https://learn.microsoft.com/en-us/azure/developer/java/spring-framework/configure-spring-data-jpa-with-azure-mysql?tabs=passwordless&toc=%2Fazure%2Fdeveloper%2Fintro%2Ftoc.json&bc=%2Fazure%2Fdeveloper%2Fintro%2Fbreadcrumb%2Ftoc.json), [Spring Data JPA](https://learn.microsoft.com/en-us/azure/developer/java/spring-framework/configure-spring-data-jdbc-with-azure-mysql?tabs=passwordless&toc=%2Fazure%2Fdeveloper%2Fintro%2Ftoc.json&bc=%2Fazure%2Fdeveloper%2Fintro%2Fbreadcrumb%2Ftoc.json)

[Delete passwords and migrate](https://learn.microsoft.com/en-us/azure/developer/java/spring-framework/migrate-mysql-to-passwordless-connection?toc=%2Fazure%2Fdeveloper%2Fintro%2Ftoc.json&bc=%2Fazure%2Fdeveloper%2Fintro%2Fbreadcrumb%2Ftoc.json&tabs=sign-in-azure-cli%2Cjava%2Capp-service%2Capp-service-identity)

Azure Database for PostgreSQL

[Spring Data JDBC](https://learn.microsoft.com/en-us/azure/developer/java/spring-framework/configure-spring-data-jpa-with-azure-postgresql?tabs=passwordless&toc=%2Fazure%2Fdeveloper%2Fintro%2Ftoc.json&bc=%2Fazure%2Fdeveloper%2Fintro%2Fbreadcrumb%2Ftoc.json), [Spring Data JPA](https://learn.microsoft.com/en-us/azure/developer/java/spring-framework/configure-spring-data-jdbc-with-azure-postgresql?tabs=passwordless&toc=%2Fazure%2Fdeveloper%2Fintro%2Ftoc.json&bc=%2Fazure%2Fdeveloper%2Fintro%2Fbreadcrumb%2Ftoc.json)

[Delete passwords and migrate](https://learn.microsoft.com/en-us/azure/developer/java/spring-framework/migrate-sql-database-to-passwordless-connection?toc=%2Fazure%2Fdeveloper%2Fintro%2Ftoc.json&bc=%2Fazure%2Fdeveloper%2Fintro%2Fbreadcrumb%2Ftoc.json&tabs=java%2Capp-service%2Cassign-role-service-connector)

Azure SQL Database

[Spring Data JDBC](https://learn.microsoft.com/en-us/azure/developer/java/spring-framework/deploy-passwordless-spring-database-app?tabs=sqlserver&toc=%2Fazure%2Fdeveloper%2Fintro%2Ftoc.json&bc=%2Fazure%2Fdeveloper%2Fintro%2Fbreadcrumb%2Ftoc.json), [Spring Data JPA](https://learn.microsoft.com/en-us/azure/developer/java/spring-framework/deploy-passwordless-spring-database-app?tabs=sqlserver&toc=%2Fazure%2Fdeveloper%2Fintro%2Ftoc.json&bc=%2Fazure%2Fdeveloper%2Fintro%2Fbreadcrumb%2Ftoc.json)

[Delete passwords and migrate](https://learn.microsoft.com/en-us/azure/developer/java/spring-framework/migrate-sql-database-to-passwordless-connection?toc=%2Fazure%2Fdeveloper%2Fintro%2Ftoc.json&bc=%2Fazure%2Fdeveloper%2Fintro%2Fbreadcrumb%2Ftoc.json&tabs=java%2Capp-service%2Cassign-role-service-connector)

Event Hubs – Kafka

[Spring Cloud Stream Binder for Kafka](https://learn.microsoft.com/en-us/azure/developer/java/spring-framework/migrate-kafka-to-passwordless-connection?tabs=azure-portal%2Csign-in-azure-cli%2Cspring-cloud-stream-kafka%2Cservice-connector%2Cassign-role-azure-portal), [Spring Kafka](https://learn.microsoft.com/en-us/azure/developer/java/spring-framework/migrate-kafka-to-passwordless-connection?tabs=azure-portal%2Csign-in-azure-cli%2Cspring-cloud-stream-kafka%2Cservice-connector%2Cassign-role-azure-portal)

[Delete passwords and migrate](https://learn.microsoft.com/en-us/azure/developer/java/spring-framework/migrate-kafka-to-passwordless-connection?toc=%2Fazure%2Fdeveloper%2Fintro%2Ftoc.json&bc=%2Fazure%2Fdeveloper%2Fintro%2Fbreadcrumb%2Ftoc.json&tabs=azure-portal%2Csign-in-azure-cli%2Cjava-kafka%2Cservice-connector%2Cservice-connector-identity%2Cassign-role-service-connector)

Storage

[Storage Blob](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-java?toc=%2Fazure%2Fdeveloper%2Fintro%2Ftoc.json&bc=%2Fazure%2Fdeveloper%2Fintro%2Fbreadcrumb%2Ftoc.json&tabs=powershell%2Cmanaged-identity%2Croles-azure-portal%2Csign-in-azure-cli), [Storage Queues](https://learn.microsoft.com/en-us/azure/storage/queues/storage-quickstart-queues-java?toc=%2Fazure%2Fdeveloper%2Fintro%2Ftoc.json&bc=%2Fazure%2Fdeveloper%2Fintro%2Fbreadcrumb%2Ftoc.json&tabs=powershell%2Cpasswordless%2Croles-azure-portal%2Cenvironment-variable-windows%2Csign-in-azure-cli)

[Delete passwords and migrate](https://learn.microsoft.com/en-us/azure/storage/common/migrate-azure-credentials?toc=%2Fazure%2Fdeveloper%2Fintro%2Ftoc.json&bc=%2Fazure%2Fdeveloper%2Fintro%2Fbreadcrumb%2Ftoc.json&tabs=roles-azure-portal%2Csign-in-azure-cli%2Cservice-connector%2Cservice-connector-identity%2Cassign-role-service-connector)

Our passwordless journey does not end here. Support for additional Azure services is planned and under development.

## [](#spring-initializr)Spring Initializr

The Azure Support module in Spring Initializr now supports Spring Boot 3, so you can begin your Spring Cloud Azure 5.0 journey directly from the Spring Initializr.

![](https://github.com/joshlong/blog-images/raw/master/spring-cloud-azure-5-ga/initializr.png)

## [](#documentation)Documentation

Good documentation is a key part of Spring Cloud Azure. We’ve created a new online resource, [Azure for Spring developers](https://learn.microsoft.com/en-us/azure/developer/java/spring/), to help Spring developers code, deploy, and scale their Spring applications on Azure. Whether developers are familiar with Spring and unfamiliar with Azure Service or the other way around – or new to both! – they can come to this site to learn. Content will be expanded and updated continuously.

In addition, we’ve redesigned the [Spring Cloud Azure](https://learn.microsoft.com/en-us/azure/developer/java/spring-framework/) documentation to help developers more easily find what they need, combined with useful scenarios.

![](https://github.com/joshlong/blog-images/raw/master/spring-cloud-azure-5-ga/docs.png)

## [](#other-bug-fixes-and-feature-improvements)Other bug fixes and feature improvements

-   Support auto startup for the autoconfigured Service Bus Processor client by enabling new property `spring.cloud.azure.servicebus.processor.auto-startup` [#29997](https://github.com/Azure/azure-sdk-for-java#29997)
-   Provide property `spring.cloud.azure.eventhubs.kafka.enabled` to enable/disable Spring Cloud Azure OAuth2 support for Event Hubs for Kafka [#30574](https://github.com/Azure/azure-sdk-for-java#30574)
-   Support connecting to Azure AD via proxy (NOTE: custom `RestTemplateCustomizer` bean must be provided) [#26493](https://github.com/Azure/azure-sdk-for-java#26493)
-   Support spring-cloud-azure-stream-binder-eventhubs connection to Azure China eventhub [#30936](https://github.com/Azure/azure-sdk-for-java#30936)
-   Resolved issues in Spring Cloud Stream Azure Kafka with Managed Identity credential refresh [#30719](https://github.com/Azure/azure-sdk-for-java#30719)
-   Removed logged warnings for Kafka passwordless autoconfiguration [#31182](https://github.com/Azure/azure-sdk-for-java#31182)
-   Enabled the token authentication converter and Azure AD Resource Server configurer adapter to accept custom JWT granted authorities converter [#28665](https://github.com/Azure/azure-sdk-for-java#28665)
-   Deleted properties [#32465](https://github.com/Azure/azure-sdk-for-java#32465): `spring.jms.servicebus.username`,

`spring.jms.servicebus.password`, `spring.jms.servicebus.remote-uri`

-   `JacksonHttpSessionOAuth2AuthorizedClientRepository.getAuthorizedClients` now returns an unmodifiable `Map` [#31190](https://github.com/Azure/azure-sdk-for-java#31190)
-   `RestTemplate` used to get access token now contains only the two required converters [#31482](https://github.com/Azure/azure-sdk-for-java#31482)
-   `RestOperations` now properly configured when `jwkResolver` is `null` [#31218](https://github.com/Azure/azure-sdk-for-java#31218)
-   Fixed duplicated `scope` parameter [#31191](https://github.com/Azure/azure-sdk-for-java#31191)
-   Updated `NimbusJwtDecoder` to use `RestTemplateBuilder` instead of `RestTemplate` [#31233](https://github.com/Azure/azure-sdk-for-java#31233)
-   Resolved `NoClassDefFoundError` for `JSONArray` [#31716](https://github.com/Azure/azure-sdk-for-java#31716)
-   Resolve issues appending `spring.main.sources` configuration from Spring Cloud Stream Kafka binder [#31715](https://github.com/Azure/azure-sdk-for-java#31715)

## [](#feedback)Feedback

Feedback and contributions are always welcome. Please contact us on [StackOverflow](https://stackoverflow.com/questions/tagged/spring-cloud-azure) or [GitHub](https://github.com/Azure/azure-sdk-for-java/issues?q=is%3Aissue%20is%3Aopen%20label%3Aazure-spring).

## [](#resources)Resources

To learn more about Spring Cloud Azure, please visit the following links:

-   [Reference documentation](https://microsoft.github.io/spring-cloud-azure/current/reference/html/index.html)
-   [Conceptual documentation](https://aka.ms/spring/msdocs)
-   [Code samples](https://aka.ms/spring/samples)
-   [Spring versions mapping](https://aka.ms/spring/versions)