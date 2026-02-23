---
title: Spring Cloud Stream 1.0.0.RELEASE is available
source: https://spring.io/blog/2016/05/10/spring-cloud-stream-1-0-0-release-is-available
scraped: 2026-02-23T19:15:53.935Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Marius Bogoevici |  May 10, 2016 | 0 Comments
---

# Spring Cloud Stream 1.0.0.RELEASE is available

_Releases | Marius Bogoevici |  May 10, 2016 | 0 Comments_

On behalf of the team, I am pleased to announce the general availability of Spring Cloud Stream 1.0.0.RELEASE. The artifacts can be found in [Spring Repository](https://repo.spring.io) as well as [Maven Central](http://search.maven.org/#search%7Cga%7C1%7Cspring-cloud-stream).

The goal of [Spring Cloud Stream](https://cloud.spring.io/spring-cloud-stream) is to be a lightweight framework for developing event-driven microservices, building on the ease of development and deployment of Spring Boot, and the component model and integration capabilities of Spring Integration. As part of the Spring Cloud family of projects, it has a specific focus on cloud-native architectures.

In order to simplify the development of both streaming and more traditional enterprise integration, it provides a number of primitives and abstractions such as:

-   Persistent publish-subscribe semantics between different logical applications;
-   Consumer group support for scaling individual applications;
-   Declarative partitioning support;
-   Declarative message conversion support;

All features above are implemented in a middleware agnostic-fashion through the framework’s Binder abstraction, that allows for different implementations to adapt the model to the native capabilities of the communication middleware. This allows the developers to focus on the business abstractions, and also to develop reusable components that can be used with different flavors of messaging middleware. Spring Cloud Stream 1.0.0.RELEASE ships with Binders for Apache Kafka and Rabbit MQ. Additional implementations, such as Gemfire are available.

The whole list of features can be found in the [reference documentation](http://docs.spring.io/spring-cloud-stream/docs/1.0.0.RELEASE/reference/htmlsingle/) and examples can be found [here](https://github.com/spring-cloud/spring-cloud-stream-samples).

From the [first commit](https://github.com/spring-cloud/spring-cloud-stream/commit/a288ed1fbb2c974e57a099f849d90f5c74c2e757), 21 contributors, from the Spring team and the community have been adding 506 commits and resolving 189 issues.

Spring Cloud Stream has an older heritage than its commit history. It has been born as part of rethinking Spring XD (to which it owes a significant part of its current code) from a cloud-native, microservice-oriented perspective, more specifically redefining the notions of module and message bus in a Spring Boot and Spring Cloud-friendly fashion. It provides the mechanisms to write long-lived microservices that can be orchestrated and deployed across various platforms (Cloud Foundry, Apache YARN, Kubernetes, Apache Mesos) in sophisticated streaming pipelines by [Spring Cloud Data Flow](http://cloud.spring.io/spring-cloud-dataflow/), in counterpart with its task-oriented sibling [Spring Cloud Task](http://cloud.spring.io/spring-cloud-task/). It powers a [rich ecosystem of Spring Cloud Stream applications](https://github.com/spring-cloud/spring-cloud-stream-app-starters) that integrate with various types of middleware and data stores, owing to its Spring Integration foundation. It also powers a few other Spring Cloud projects: [Spring Cloud Bus](http://cloud.spring.io/spring-cloud-bus/), [Spring Cloud Hystrix](http://cloud.spring.io/spring-cloud-netflix) and [Spring Cloud Sleuth](http://cloud.spring.io/spring-cloud-sleuth/), who as early adopters have provided tremendously valuable input.

Thanks and congratulations to everyone who has been part of this this journey, current and former members of the Spring XD/Spring Cloud Data Flow team, and especially community members who have either been contributing directly or providing the more than necessary feedback for the success of the project. We couldn’t have gotten here without your help and hope you continue to do so.

You can find us on [GitHub](https://github.com/spring-cloud/spring-cloud-stream), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud-stream), or on [Twitter](https://twitter.com/springcloudoss).

As for the future, our intended [roadmap](https://github.com/spring-cloud/spring-cloud-stream/milestones/1.1.0.M1) includes such items as:

-   Kafka 0.9 client support
-   Support for reactive binders and a reactive programming model
-   Adding new types of binders such as JMS or Kinesis
-   Schema registration and evolution support

Join us for the next leg of the journey!

---

If you are attending Spring IO in Barcelona, I will be talking about Spring Cloud Stream on Friday, May 20. There are many other great talks from the Spring team members, so check the [agenda](http://www.springio.net/agenda/).

This is also a reminder that [Spring One Platform](http://springoneplatform.io) will be taking place in Las Vegas between August 1-4 this year, and you should consider [getting your ticket](https://2016.event.springoneplatform.io/register) if you haven’t done so already.