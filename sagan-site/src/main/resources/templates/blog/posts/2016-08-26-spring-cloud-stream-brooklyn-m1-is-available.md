---
title: Spring Cloud Stream Brooklyn.M1 is available
source: https://spring.io/blog/2016/08/26/spring-cloud-stream-brooklyn-m1-is-available
scraped: 2026-02-23T19:06:51.326Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Marius Bogoevici |  August 26, 2016 | 1 Comment
---

# Spring Cloud Stream Brooklyn.M1 is available

_Releases | Marius Bogoevici |  August 26, 2016 | 1 Comment_

On behalf of the team, I am pleased to announce the release of the first milestone of the [Spring Cloud Stream](http://cloud.spring.io/spring-cloud-stream) Brooklyn release train. Spring Cloud Stream Brooklyn.M1 is available for use in the [Spring Milestone repository](http://repo.spring.io/libs-milestone-local/org/springframework/cloud/spring-cloud-stream-dependencies/Brooklyn.M1), a detailed description of its features can be found in the [reference documentation](http://docs.spring.io/spring-cloud-stream/docs/Brooklyn.M1/reference/htmlsingle/). Release notes are available [here](https://github.com/spring-cloud/spring-cloud-stream-starters/wiki/Brooklyn-Release-Notes) and include important information on the migration path.

## [](#from-a-monolith-to-a-release-train)From a Monolith to a Release Train

Spring Cloud Stream Brooklyn.M1 succeeds Spring Cloud Stream 1.0. The change in the naming scheme reflects the project's structural changes, in particular switching from a monolithic structure, where the core components and the binder implementations are contained together, to a more decentralized one. In the new structure, the core and binder implementations are separate projects, with their own release cadence. A release train BOM aggregates the release components together and manages their versions.

The benefits of this approach are twofold. On one hand, it allows adding new features and fixes to individual implementations at a faster rate. On the other, it lowers the barrier for creating and developing new binders, which as they mature, can become part of a future release train themselves by simply being added to the release train BOM. Finally, it is only fitting for a project that targets the development of microservices not to be a monolith itself!

The following components are part of the Brooklyn.M1 release train:

-   Spring Cloud Stream 1.1.0.M1 (core components)
-   Spring Cloud Stream Kafka Binder 1.1.0.M1
-   Spring Cloud Stream Rabbit Binder 1.1.0.M1

Let's see what the new release brings.

## [](#what-is-new-)What is new ?

Spring Cloud Stream Brooklyn.M1 brings some major upgrades to existing components, and introduces new features targeted towards programming model, application interoperability, and the overall developer experience.

### [](#apache-kafka-09-new-consumer-support)Apache Kafka 0.9 new consumer support

The Apache Kafka Binder has been upgraded to use the Kafka new consumer library (introduced with version 0.9), based on [Spring Kafka](https://projects.spring.io/spring-kafka/) 1.0.x and [Spring Integration Kafka](https://github.com/spring-projects/spring-integration-kafka) 2.0.x, and currently supports Apache Kafka 0.9. The use of the new client library adds a few benefits:

-   Applications using the Apache Kafka Binder do not have to have `spring.cloud.stream.instanceIndex` set. The new consumer library will take care of assigning partitions to all the instances which are part of a given consumer group, and rebalancing when new instances join or leave - useful especially for scaling consumer applications at runtime. For users that wish to still use a static partition allocation scheme, we will support it by the final release ( `spring.cloud.stream.instanceIndex` will still be required in that case).
-   Support for [secured clients with SSL and Kerberos](http://docs.spring.io/spring-cloud-stream/docs/Brooklyn.M1/reference/htmlsingle/#_example_security_configuration).

The abstractions of Spring Kafka and Spring Integration Kafka will also make adding support for Apache Kafka 0.10 easier too, and it is expected that the final release will support Kafka 0.10 as well.

### [](#reactive-programming-support-with-java-8)Reactive programming support (with Java 8)

In addition to the Spring Integration application model and the `@StreamListener` present in version 1.0, this release introduces support for [reactive APIs](http://docs.spring.io/spring-cloud-stream/docs/Brooklyn.M1/reference/htmlsingle/#_reactive_programming_support), based on [Project Reactor](http://projectreactor.io). This feature requires the use of Java 8.

Applications can add the `spring-cloud-stream-reactive` module as a dependency, enabling the use of reactive types directly as the programming abstraction. In the context of data processing, a functional and reactive programming model is extremely attractive because of the declarative and expressive nature of a reactive composition API, which lets the developer focus on what to do, not how. On the other hand, while processing messages individually is a classic paradigm for enterprise integration, when it comes to stream processing, a developer also needs to think about processing a continuous inbound stream of messages, and describe operations that make sense only in that context, like windowing - by time, or count.

Here is an example of a reactive processor for counting words (for determining the most popular tags in the last 5 seconds, every second).

```java
Copy@StreamListener
@Output(Processor.OUTPUT)
public Flux<WordCount> count (@Input(Processor.Input) Flux<String> flux) {
  return flux.window(ofSeconds(5), ofSeconds(1))
    .flatMap(window ->
      window.groupBy(word -> word)
        .flatMap(group -> group.reduce(0, (count,word) -> count + 1)
          .map(count -> new WordCount(group.key(), count))));
}
```

Additionally, the use of a reactive API allows to integrate with other reactive components, such as reactive web controllers. For a more comprehensive overview of upcoming reactive support in Spring, watch Stephane Maldini and Rossen Stoyanchev's [keynote at Spring One Platform 2016](https://www.youtube.com/watch?v=Xm-KjMY_Z_w), one of the other Reactive talks at Spring One Platform, or read Dave Syer's [blog series](https://spring.io/blog/2016/06/07/notes-on-reactive-programming-part-i-the-reactive-landscape).

### [](#avro-serialization-and-schema-evolution-support)Avro serialization and schema evolution support

Spring Cloud Stream Brooklyn.M1 is also adding support for Avro and schema evolution. Starting with this release, applications can include the `spring-cloud-stream-schema` module, which contains `MessageConverters` with Apache Avro.

The Apache Avro serializers support both [fixed schemas](http://docs.spring.io/spring-cloud-stream/docs/Brooklyn.M1/reference/htmlsingle/#_apache_avro_message_converters), as well as [dynamically interacting with a schema registry](http://docs.spring.io/spring-cloud-stream/docs/Brooklyn.M1/reference/htmlsingle/#_avro_schema_registry_client_message_converters). You can make your applications interact with a schema registry, by simply adding `@EnableSchemaRegistryClient` to your application and setting the `application/*+avro` content type on your outbound channels, so that data is sent in Apache Avro format. With this, publisher applications will register schemas for the messages they send, and pass metadata about the subject and version to consumers. Based on that, a consumer can retrieve the writer's schema from the registry and deserialize the messages it received, even if the schema wasn't known to them beforehand.

This is an important feature for microservice evolution, as it allows the different components of your system to upgrade or change their schemas and data formats, without breaking the existing ones.

The release includes a [schema registry server](http://docs.spring.io/spring-cloud-stream/docs/Brooklyn.M1/reference/htmlsingle/#_schema_registry_server) and a general-purpose [schema registry client](http://docs.spring.io/spring-cloud-stream/docs/Brooklyn.M1/reference/htmlsingle/#_schema_registry_client). An implementation of the schema registry client for the [Confluent schema registry](http://docs.confluent.io/2.0.0/schema-registry/docs/index.html) is available as well.

Special thanks to [Vinicius Carvalho](https://twitter.com/vccarvalho) for contributing the schema evolution support!

## [](#what-is-next-)What is next ?

In the following weeks, we will continue the development of the Brooklyn release train, with a goal of producing a release candidate. As it is customary with milestones, some API changes are to be expected until the RC. Here are a few intended additional features before the final release:

-   add support for Apache Kafka 0.10 via a simple drop-in replacement of the Spring Kafka library with version 1.1;
-   add support for Reactive binders (including reactive producers and consumers, such as the ones introduced by the [Reactor Kafka](https://github.com/reactor/reactor-kafka) project);
-   add support for developing applications using the [Kafka Stream API](http://kafka.apache.org/documentation.html#streams);

And, as always, we welcome feedback: either in [GitHub](https://github.com/spring-cloud/spring-cloud-stream), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud-stream), or on [Twitter](https://twitter.com/springcloudoss).