---
title: Spring Integration Java DSL Milestone 1 Released
source: http://spring.io/blog/2014/05/08/spring-integration-java-dsl-milestone-1-released
scraped: 2026-02-23T22:30:55.518Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  May 08, 2014 | 2 Comments
---

# Spring Integration Java DSL Milestone 1 Released

_Releases | Artem Bilan |  May 08, 2014 | 2 Comments_

The Spring Integration development team is pleased to announce the release of the **First Milestone of the Java DSL extension for [Spring Integration](http://projects.spring.io/spring-integration)**!

The general purpose of the Java DSL is to provide a fluent and convenient API for *Message Flows* based on [EIP](http://www.eaipatterns.com) and avoid boilerplate Spring Integration configuration.

The `org.springframework.integration:spring-integration-java-dsl:1.0.0.M1` artifact is available from the [Spring IO Milestone Repository](http://repo.spring.io/libs-milestone).

You can find in more information in the [Reference Manual](https://github.com/spring-projects/spring-integration-extensions/wiki/Spring-Integration-Java-DSL-Reference) and from [source code](https://github.com/spring-projects/spring-integration-extensions/tree/master/spring-integration-java-dsl), however let us shed some light on the main features.

**The Concept**

The Spring Integration Java DSL is not similar to existing [Scala](https://github.com/spring-projects/spring-integration-dsl-scala) and [Groovy](https://github.com/spring-projects/spring-integration-dsl-groovy) DSls; nor is it similar to the [Apache Camel Java DSL](https://camel.apache.org/java-dsl.html), although it does implement the *method-chain* principle.

Our main goal is to reuse existing practices from the Spring Framework JavaConfig (`@Configuration` classes), as well from Spring Integration Core components. To achieve the *method-chain* principle, we provide a set of *builders* and their *factories*. Also Java 8 *Lambdas* provide some additional assistance for clean syntax.

**The Basics**

The central class is `IntegrationFlows` - the `IntegrationFlowBuilder` factory, - which should be used from a `@Bean` definition method to populate the `IntegrationFlow` bean using *method-chain*s and *Lambdas* as parameters. The `IntegrationFlowBuilder` provides a lot of overloaded methods to configure Integration Endpoints. We call them **EIP-methods**. The canonical sample:

```java
Copy@Bean
public IntegrationFlow helloWorldFlow() {
	return IntegrationFlows.from("helloWorldInput")
			.filter("World"::equals)
			.transform("Hello "::concat)
			.handle(System.out::println)
			.get();
}
```

Using Spring Integration terms the description for the sample above is:

-   A `Message` is sent to the "helloWorldInput" channel;
-   The `filter` accepts it only if its `payload` is the String "World";
-   The `transformer` prefixes the `payload` with `Hello `;
-   The `handler` prints the result to the STDOUT;
-   if the original `payload` isn't "World", we won't see anything in the console - the `Message` is discarded by

`filter`.

The Spring Integration Java DSL can be used in existing applications as is, and can be wired with exising Messaging Annotations configuration or Spring Integration XML configuration, and, of course, in Spring Boot applications.

Plesae refer to the Reference Manual mentioned above for more information.

**Wrapping up**

This is just the beginning and we are working on an appropriate solution to configure protocol-specific adapters using similar fluent API and Lambdas. Please don't hesitate to share your thoughts and feedback: [Spring Forum](http://forum.spring.io/forum/spring-projects/integration), [StackOverflow](http://stackoverflow.com) (`spring-integration` tag), [Spring JIRA](https://jira.spring.io/browse/INT).

**Webinar: Spring Integration 4.0**

Don't miss the [Webinar](https://spring.io/blog/2014/04/22/webinar-spring-integration-4-0-the-new-frontier) with [Gary Russell](https://spring.io/team/grussell) demonstrating new features from [Spring Integration 4.0](http://docs.spring.io/spring-integration/docs/4.0.0.RELEASE/reference/html/whats-new.html)!

**SpringOne 2GX 2014 is around the corner**

Book your place at [SpringOne in Dallas, TX](http://www.springone2gx.com/) for Sept 8-11 soon. It's simply the best opportunity to find out first hand all that's going on and to provide direct feedback. Expect a number of significant new announcements this year. We are anticipating that several in-depth Spring-Integration sessions will be presented.