---
title: Spring Web Services
source: https://spring.io/projects/spring-ws
scraped: 2026-02-19T07:52:52.719Z
description: Level up your Java code and explore what Spring can do for you.
---

[All projects](/projects)

-   [Spring Boot](/projects/spring-boot)
-   [Spring Framework](/projects/spring-framework)
-   [Spring Data](/projects/spring-data)
-   [Spring Cloud](/projects/spring-cloud)
-   [Spring Cloud Data Flow](/projects/spring-cloud-dataflow)
-   [Spring gRPC](/projects/spring-grpc)
-   [Spring Security](/projects/spring-security)
-   [Spring Authorization Server](/projects/spring-authorization-server)
-   [Spring for GraphQL](/projects/spring-graphql)
-   [Spring Session](/projects/spring-session)
-   [Spring Integration](/projects/spring-integration)
-   [Spring HATEOAS](/projects/spring-hateoas)
-   [Spring Modulith](/projects/spring-modulith)
-   [Spring REST Docs](/projects/spring-restdocs)
-   [Spring AI](/projects/spring-ai)
-   [Spring Batch](/projects/spring-batch)
-   [Spring AMQP](/projects/spring-amqp)
-   [Spring CredHub](/projects/spring-credhub)
-   [Spring for Apache Kafka](/projects/spring-kafka)
-   [Spring LDAP](/projects/spring-ldap)
-   [Spring for Apache Pulsar](/projects/spring-pulsar)
-   [Spring Shell](/projects/spring-shell)
-   [Spring Statemachine](/projects/spring-statemachine)
-   [Spring Vault](/projects/spring-vault)
-   [Spring Web Flow](/projects/spring-webflow)
-   [Spring Web Services](/projects/spring-ws)

# ![Spring Web Services](/img/projects/logo-web-services.svg)Spring Web Services5.0.0[](http://github.com/spring-projects/spring-ws "Github")[](https://stackoverflow.com/questions/tagged/spring-ws "Stack Overflow")

-   [Overview](#overview)
-   [Learn](#learn)
-   [Support](#support)

Spring Web Services (Spring-WS) is focused on creating document-driven Web services. Spring Web Services aims to facilitate contract-first SOAP service development, allowing for the creation of flexible web services using one of the many ways to manipulate XML payloads. The product is based on Spring itself, which means you can use the Spring concepts such as dependency injection as an integral part of your Web service.

People use Spring-WS for many reasons, but most are drawn to it after finding alternative SOAP stacks lacking when it comes to following Web service best practices. Spring-WS makes the best practice an easy practice. This includes practices such as the WS-I basic profile, Contract-First development, and having a loose coupling between contract and implementation.

## [](#support-policy-and-migration)[](#support-policy-and-migration)Support Policy and Migration

For information about minimum requirements, guidance on upgrading from earlier versions and support policies, please check out [the official Spring Web Services support page](https://spring.io/projects/spring-ws#support).

## [](#features)[](#features)Features

-   Makes the Best Practice an Easy Practice: Spring Web Services makes enforcing best practices easier. This includes practices such as the WS-I basic profile, Contract-First development, and having a loose coupling between contract and implementation.
    
-   [Powerful mappings](https://docs.spring.io/spring-ws/docs/current/reference/html/#features-powerful-mappings): You can distribute incoming XML request to any object, depending on message payload, SOAP Action header, or an XPath expression.
    
-   [XML API support](https://docs.spring.io/spring-ws/docs/current/reference/html/#features-xml-api-support): Incoming XML messages can be handled in standard JAXP APIs such as DOM, SAX, and StAX, but also JDOM, dom4j, XOM, or even marshalling technologies.
    
-   [Flexible XML Marshalling](https://docs.spring.io/spring-ws/docs/current/reference/html/#features-flexible-xml-marshalling): The Object/XML Mapping module in the Spring Web Services distribution supports JAXB 1 and 2, Castor, XMLBeans, JiBX, and XStream. And because it is a separate module, you can use it in non-Web services code as well.
    
-   [Reuses your Spring expertise](https://docs.spring.io/spring-ws/docs/current/reference/html/#features-reusing-your-spring-expertise): Spring-WS uses Spring application contexts for all configuration, which should help Spring developers get up-to-speed nice and quickly. Also, the architecture of Spring-WS resembles that of Spring-MVC.
    
-   [Supports WS-Security](https://docs.spring.io/spring-ws/docs/current/reference/html/#features-support-for-ws-security): WS-Security allows you to sign SOAP messages, encrypt and decrypt them, or authenticate against them.
    
-   [Integrates with Spring Security](https://docs.spring.io/spring-ws/docs/current/reference/html/#features-integration-with-spring-security): The WS-Security implementation of Spring Web Services provides integration with Spring Security. This means you can use your existing configuration for your SOAP service as well.
    
-   Apache license. You can confidently use Spring-WS in your project.
    

## Spring Boot Config

Spring Boot will automatically:

-   Configure a MessageDispatcherServlet in the servlet container
    
-   Scan all `.wsdl` **and** `.xsd` documents for WSDL and schema-defined beans
    

![Spring Initializr](/img/logos/spring-initializr.svg)

## Quickstart Your Project

Bootstrap your application with [Spring Initializr](https://start.spring.io/).

![](/img/extra/footer.svg)

## Get ahead

VMware offers training and certification to turbo-charge your progress.

[Learn more](https://spring.academy/)

## Get support

Tanzu Spring offers support and binaries for OpenJDK™, Spring, and Apache Tomcat® in one simple subscription.

[Learn more](/support)

## Upcoming events

Check out all the upcoming events in the Spring community.

[View all](/events)