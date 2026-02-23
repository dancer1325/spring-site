---
title: Spring Integration
source: https://spring.io/projects/spring-integration
scraped: 2026-02-19T07:50:31.317Z
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

# ![Spring Integration](/img/projects/spring-integration.svg?v=2)Spring Integration7.0.3[](http://github.com/spring-projects/spring-integration "Github")[](https://stackoverflow.com/questions/tagged/spring-integration "Stack Overflow")

-   [Overview](#overview)
-   [Learn](#learn)
-   [Support](#support)
-   [Samples](#samples)

Extends the Spring programming model to support the well-known [Enterprise Integration Patterns](http://www.eaipatterns.com/). Spring Integration enables lightweight messaging within Spring-based applications and supports integration with external systems via declarative adapters. Those adapters provide a higher-level of abstraction over Spring’s support for remoting, messaging, and scheduling. Spring Integration’s primary goal is to provide a simple model for building enterprise integration solutions while maintaining the separation of concerns that is essential for producing maintainable, testable code.

## [](#introduction)[](#introduction)Introduction

Using the Spring Framework encourages developers to code using interfaces and use dependency injection (DI) to provide a Plain Old Java Object (POJO) with the dependencies it needs to perform its tasks. Spring Integration takes this concept one step further, where POJOs are wired together using a messaging paradigm and individual components may not be aware of other components in the application. Such an application is built by assembling fine-grained reusable components to form a higher level of functionality. With careful design, these flows can be modularized and also reused at an even higher level.

In addition to wiring together fine-grained components, Spring Integration provides a wide selection of channel adapters and gateways to communicate with external systems. Channel Adapters are used for one-way integration (send or receive); gateways are used for request/reply scenarios (inbound or outbound). For a full list of adapters and gateways, refer to the reference documentation.

The Spring Cloud Stream project builds on Spring Integration, where Spring Integration is used as an engine for message-driven microservices.

## [](#features)[](#features)Features

-   Implementation of most of the Enterprise Integration Patterns
    
-   Endpoint
    
-   Channel (Point-to-point and Publish/Subscribe)
    
-   Aggregator
    
-   Filter
    
-   Transformer
    
-   Control Bus
    
-   …
    
-   Integration with External Systems
    
-   ReST/HTTP
    
-   FTP/SFTP
    
-   STOMP
    
-   WebServices (SOAP and RESTful)
    
-   TCP/UDP
    
-   JMS
    
-   RabbitMQ
    
-   Email
    
-   …
    
-   The framework has extensive JMX support
    
-   Exposing framework components as MBeans
    
-   Adapters to obtain attributes from MBeans, invoke operations, send/receive notifications
    

## [](#examples)[](#examples)Examples

In the following "quick start" application you can see that the same gateway interface is used to invoke two completely different service implementations. To build and run this program you will need the *spring-integration-ws* and *spring-integration-xml* modules as described above.

```
Copypublic class Main {

	public static void main(String... args) throws Exception {
		ApplicationContext ctx =
			new ClassPathXmlApplicationContext("context.xml");
		// Simple Service
		TempConverter converter =
			ctx.getBean("simpleGateway", TempConverter.class);
		System.out.println(converter.fahrenheitToCelcius(68.0f));
		// Web Service
		converter  = ctx.getBean("wsGateway", TempConverter.class);
		System.out.println(converter.fahrenheitToCelcius(68.0f));
	}
}
```

```
Copypublic interface TempConverter {

	float fahrenheitToCelcius(float fahren);

}
```

```
Copy<!-- Simple Service -->

<int:gateway id="simpleGateway"
	service-interface="foo.TempConverter"
	default-request-channel="simpleExpression" />

<int:service-activator id="expressionConverter"
	input-channel="simpleExpression"
	expression="(payload - 32) / 9 * 5"/>

<!-- Web Service -->

<int:gateway id="wsGateway" service-interface="foo.TempConverter"
	default-request-channel="viaWebService" />

<int:chain id="wsChain" input-channel="viaWebService">
	<int:transformer
	   expression="'&lt;FahrenheitToCelsius xmlns=&quot;https://www.w3schools.com/xml/&quot;&gt;&lt;Fahrenheit&gt;XXX&lt;/Fahrenheit&gt;&lt;/FahrenheitToCelsius&gt;'.replace('XXX', payload.toString())" />
	<int-ws:header-enricher>
		<int-ws:soap-action value="https://www.w3schools.com/xml/FahrenheitToCelsius"/>
	</int-ws:header-enricher>
	<int-ws:outbound-gateway
		uri="https://www.w3schools.com/xml/tempconvert.asmx"/>
	<int-xml:xpath-transformer
		xpath-expression="/*[local-name()='FahrenheitToCelsiusResponse']/*[local-name()='FahrenheitToCelsiusResult']"/>
</int:chain>
```

And here is the same application (web service part) using the [Java DSL](https://docs.spring.io/spring-integration/docs/current/reference/html/dsl.html#java-dsl) (and Spring Boot). You will need the *spring-boot-starter-integration* dependency or *spring-integration-core* directly if you don’t use Spring Boot:

```
Copy@SpringBootApplication
public class Application {

  public static void main(String[] args) {
    ConfigurableApplicationContext ctx = SpringApplication.run(Application.class, args);
    TempConverter converter = ctx.getBean(TempConverter.class);
    System.out.println(converter.fahrenheitToCelcius(68.0f));
    ctx.close();
  }

  @MessagingGateway
  public interface TempConverter {

    @Gateway(requestChannel = "convert.input")
    float fahrenheitToCelcius(float fahren);

  }

  @Bean
  public IntegrationFlow convert() {
      return f -> f
        .transform(payload ->
              "<FahrenheitToCelsius xmlns=\"https://www.w3schools.com/xml/\">"
            +     "<Fahrenheit>" + payload + "</Fahrenheit>"
            + "</FahrenheitToCelsius>")
        .enrichHeaders(h -> h
            .header(WebServiceHeaders.SOAP_ACTION,
                "https://www.w3schools.com/xml/FahrenheitToCelsius"))
        .handle(new SimpleWebServiceOutboundGateway(
            "https://www.w3schools.com/xml/tempconvert.asmx"))
        .transform(Transformers.xpath("/*[local-name()=\"FahrenheitToCelsiusResponse\"]"
            + "/*[local-name()=\"FahrenheitToCelsiusResult\"]"));
  }

}
```

## Spring Boot Config

[Spring Boot auto-configuration for Spring Integration](https://docs.spring.io/spring-boot/docs/current/reference/html/messaging.html#messaging.spring-integration)

Also see [Spring Functions Catalog](https://github.com/spring-cloud/spring-functions-catalog) where most of the artifacts are essentially an auto-configuration for specific Spring Integration channel adapters.

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