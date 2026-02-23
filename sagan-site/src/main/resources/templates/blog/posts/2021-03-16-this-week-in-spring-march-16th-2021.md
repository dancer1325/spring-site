---
title: This Week in Spring - March 16th, 2021
source: https://spring.io/blog/2021/03/16/this-week-in-spring-march-16th-2021
scraped: 2026-02-23T13:29:59.405Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  March 16, 2021 | 0 Comments
---

# This Week in Spring - March 16th, 2021

_Engineering | Josh Long |  March 16, 2021 | 0 Comments_

Hi, Spring fans! Welcome to another installment of *This Week in Spring*! As usual, we've got a ton of stuff to get to so let's dive right in!

-   [Announcing Spring Native Beta!](https://spring.io/blog/2021/03/11/announcing-spring-native-beta). This is by far the most important bit to come out of the last week! There is SO MUCH good stuff to ponder here. Spring Native is a set of hints that help GraalVM's `native-image` facility turn your dynamic Java code into a lightning fast, super lightweight, machine architecture-specific binary that you'll definitely want to invite to your next Docker container party. Tons of stuff just works out of the box. Native compilation is even supported on the [Spring Initializr](http://start.spring.io) - just add `Native` to the selections! You can use `@NativeHint` annotations to register certain classes for proxying, reflection, etc. Or, you can implement `NativeConfiguration` to dynamically register things at compile time. Make sure that you add the `.jar` containing the `NativeConfiguration` class to the `META-INF/services/` service loader entry for classes of type `NativeConfiguration` and then add that `.jar` to the `spring-aot` Maven plugin's classpath. You can easily build your native image and export a container using Spring Boot's buildpack support: `mvn spring-boot:build-image`. You'll find tons of [samples](https://github.com/spring-projects-experimental/spring-native/tree/master/samples) supporting its use in the repository, too!
-   [Java 16 is here!](https://twitter.com/java/status/1371842658256228356?s=12). Finally, `instanceof` pattern matching and record types (`record Customer(Integer id, String name) {} `) work out of the box in Java! Congrats to the Java team and, of course, you can expect good support for Java 16 in Spring Boot to land sooner rather than later.
-   [A Bootiful Podcast: FF4J project creator and DataStax Astra SDK engineer Cedrick Lunven](https://spring.io/blog/2021/03/11/a-bootiful-podcast-ff4j-project-creator-and-datastax-astra-sdk-engineer-cedrick-lunven)
-   [Apache Tomcat on Twitter: "Apache Tomcat 8.5.64 has been released. Downloads: https://t.co/gvowEu055P Changelog: https://t.co/J4TCalUgvU" / Twitter](https://twitter.com/theapachetomcat/status/1370090389261197314?s=21)
-   [Deploy Spring Boot applications by leveraging enterprise best practices – Azure Spring Cloud Reference Architecture](https://spring.io/blog/2021/03/11/deploy-spring-boot-applications-by-leveraging-enterprise-best-practices-azure-spring-cloud-reference-architecture)
-   This isn't particularly related to Spring Boot, but, there's an interesting repository on [GitHub - `ossu/computer-science` - that offers a path to a free self-taught education in Computer Science!](https://github.com/ossu/computer-science)
-   [Graceful Shutdown of Spring Boot Applications in Kubernetes by Kaan Taş on the Trendyol Tech blog](https://medium.com/trendyol-tech/graceful-shutdown-of-spring-boot-applications-in-kubernetes-f80e0b3a30b0)
-   [I was on the Devpod podcast](https://twitter.com/ankurkumarz/status/1370576164582952962?s=12) and it was a lot of fun and you might enjoy it.
-   [Java Recognized as the Favorite Programming Language](https://blogs.oracle.com/java/java-recognized-as-the-favorite-programming-language) . Of course it was! It's double dope.
-   [Java in the Cloud Native World, featuring the Starbuxman (Josh Long) | Meetup](https://www.meetup.com/all-things-cloud-native-bay-area/events/276525445/)
-   A great thread from Microsoft's [Julien Dubois on Twitter: "As Spring Native beta was released last Friday...](https://twitter.com/juliendubois/status/1371509038601621505)
-   [KNative eventing with Spring and Apache Kafka](https://piotrminkowski.com/2021/03/12/knative-eventing-with-kafka-and-spring-cloud/)
-   [Spring Framework 5.3.5 available now](https://spring.io/blog/2021/03/16/spring-framework-5-3-5-available-now)
-   [Tanzu Observability for Wavefront (formerly Wavefront) delivers scalable observability as a service where Spring developers can build analytics-driven dashboards based on multi-sourced data including metrics, traces, histograms, and span logs. The Spring](https://calendly.com/mgist1/spring-boot-wavefront?month=2021-03)
-   [The State of Undo panel in which I participated](https://twitter.com/infoq/status/1369347300200488962?s=12)
-   [The first drop of the Oracle R2DBC driver!](https://twitter.com/kmensah/status/1370566724307750913?s=12)
-   [Deploy Spring Boot apps with enterprise best practices in the Azure Spring Cloud Reference Architecture. Start here](https://twitter.com/JavaAtMicrosoft/status/1370079361831866372)