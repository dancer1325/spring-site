---
title: Spring Cloud Stream Fishtown.M2 /2.1.0.M2 Release Announcement
source: https://spring.io/blog/2018/08/28/spring-cloud-stream-fishtown-m2-2-1-0-m2-release-announcement
scraped: 2026-02-23T15:02:28.154Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oleg Zhurakousky |  August 28, 2018 | 0 Comments
---

# Spring Cloud Stream Fishtown.M2 /2.1.0.M2 Release Announcement

_Engineering | Oleg Zhurakousky |  August 28, 2018 | 0 Comments_

We are pleased to announce the second Milestone of the Spring Cloud Stream Fishtown release train - Fishtown.M2/2.1.0.M2.

Spring Cloud Stream Fishtown 2.1.0.M2 is available for use in the [Spring Milestone](http://repo.spring.io/libs-milestone-local/org/springframework/cloud/spring-cloud-stream/2.1.0.M2/) repository. The [release notes](https://github.com/spring-cloud/spring-cloud-stream-starters/releases/tag/vFishtown.M2) include relevant information about version compatibility with Spring Boot, Spring Cloud, Spring AMQP, and Spring for Apache Kafka.

The following section provides a brief summary of features and improvements included in this release.

### [](#notable-dependency-upgrades)Notable Dependency Upgrades

-   Spring Boot 2.1.0.M2 (now fully compatible with [Spring Initializr](https://start.spring.io/))
-   Reactor Californium M2

### [](#spring-cloud-function-support)Spring Cloud Function support

The main theme for this release is the introduction of a new programming model which uses [Spring Cloud Function](https://cloud.spring.io/spring-cloud-function/) as an alternative for defining *stream handlers* and *sources* which can now be expressed as beans of type `java.util.function.[Supplier/Function/Consumer]`

To specify which functional bean to bind to the external destination(s) exposed by the bindings, you must provide `spring.cloud.stream.function.definition` property.

Here is the example of the Processor application exposing message handler as `java.util.function.Function`

```
Copy@SpringBootApplication
@EnableBinding(Processor.class)
public class MyFunctionBootApp {

	public static void main(String[] args) {
		SpringApplication.run(MyFunctionBootApp.class, 
                  "--spring.cloud.stream.function.definition=toUpperCase");
	}

	@Bean
	public Function<String, String> toUpperCase() {
		return s -> s.toUpperCase();
	}
}
```

In the above you we simply define a bean of type `java.util.function.Function` called *toUpperCase* and identify it as a bean to be used as message handler whose *input* and *output* will be bound to the external destinations exposed by the Processor binding.

#### [](#function-composition)Function composition

Using this programming model you can also benefit from *functional composition* where you can dynamically compose complex handlers from a set of simple functions. As an example add the following function bean to the application defined above

```
Copy@Bean
public Function<String, String> wrapInQuotes() {
	return s -> "\"" + s + "\"";
}
```

and modify the `spring.cloud.stream.function.definition` property to reflect your intention to compose a new function from both *toUpperCase* and *wrapInQuotes*. To do so Spring Cloud Function allows you to use `|` (pipe) symbol. So to finish our example our property will now look like this:

```
Copy--spring.cloud.stream.function.definition=toUpperCase|wrapInQuotes
```

### [](#other-notable-features-improvements--enhancements)Other Notable Features, Improvements & enhancements

#### [](#core)Core

-   Improvements and enhancements around multi-binder scenarios

#### [](#rabbit-binder)Rabbit Binder

-   Support for customization of the [Consumer tags](https://github.com/spring-cloud/spring-cloud-stream-binder-rabbit/issues/164)

#### [](#kafka-binder)Kafka Binder

-   Upgrade Kafka Client to 2.0

#### [](#quality-improvements)Quality improvements

As part of the continuing efforts to improve the code quality and to evaluate the framework components for its contract correctness, we have a new [Acceptance Test project](https://github.com/spring-cloud/spring-cloud-stream-acceptance-tests) to bootstrap Spring Cloud Stream applications on Cloud Foundry and Kubernetes. These tests run multiple times in a day on a freshly repaved environment. We hope this provides a foundation for the community and customers to build more automation pipelines on target platforms.

#### [](#kinesis-binder)Kinesis Binder

With this release we also want to highlight the recently release [Kinesis Binder](https://spring.io/blog/2018/08/21/spring-integration-for-aws-2-0-ga-and-spring-cloud-stream-kinesis-binder-1-0-ga)

Various other enhancements and bug fixes: [Core](https://github.com/spring-cloud/spring-cloud-stream/milestone/46?closed=1) [Rabbit Binder](https://github.com/spring-cloud/spring-cloud-stream-binder-rabbit/milestone/27?closed=1) [Kafka Binder](https://github.com/spring-cloud/spring-cloud-stream-binder-kafka/milestone/30?closed=1)

> NOTE:

If the applications are created from Spring Initializr, they need to add this BOM snippet in maven dependency management before the spring-cloud BOM declaration, otherwise you'll end up with the latest snapshot (which may be ok since it would include all the work from M2):

```
Copy<dependency>
           <groupId>org.springframework.cloud</groupId>
           <artifactId>spring-cloud-stream-dependencies</artifactId>
           <version>Fishtown.M2</version>
           <type>pom</type>
           <scope>import</scope>
</dependency>
```

#### [](#next-steps)Next Steps

The M3 is planned for the end of September and will contain primarily new binding features as well as more features and improvements around to support [Spring Cloud Function](https://cloud.spring.io/spring-cloud-function/) as a programming model.

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-stream) or [GitHub](https://github.com/spring-cloud/spring-cloud-stream/) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-stream).