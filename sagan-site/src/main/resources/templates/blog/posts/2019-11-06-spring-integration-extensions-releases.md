---
title: Spring Integration Extensions Releases
source: https://spring.io/blog/2019/11/06/spring-integration-extensions-releases
scraped: 2026-02-23T14:26:58.714Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  November 06, 2019 | 0 Comments
---

# Spring Integration Extensions Releases

_Releases | Artem Bilan |  November 06, 2019 | 0 Comments_

Dear Spring Community,

Following several requests from community members, it is my pleasure to announce that some Spring Integration Extensions have made it to their new generations and up-to-date dependencies. Of course, first of all, thank you everybody contributed, even if that was just a GitHub issue or StackOverflow question!

Below are highlights for those projects. All of them are available on Maven Central, JCenter and Spring Release repositories. Since all these projects are not a part of Spring Integration BOM (and they cannot be because of different release cycles) you have to specify their versions in your dependency management explicitly.

## [](#spring-integration-smb)[](#spring-integration-smb)Spring Integration SMB

[Spring Integration support for Server Message Block](https://github.com/spring-projects/spring-integration-extensions/tree/master/spring-integration-smb) has reached version `1.2.0.RELEASE` and is based on Spring Integration `5.2.1.RELEASE` and JCIFS `2.1.11`. Besides upgrades we also have a community contributed ability to use a custom implementation of the `jcifs.CIFSContext` interface in the `SmbSessionFactory`. The dependency for this artifact is this:

```
Copyorg.springframework.integration:spring-integration-smb:1.2.0.RELEASE
```

## [](#spring-integration-cassandra)[](#spring-integration-cassandra)Spring Integration Cassandra

[Spring Integration support for Apache Cassandra](https://github.com/spring-projects/spring-integration-extensions/tree/master/spring-integration-cassandra) has reached version `0.7.0.RELEASE` and is based on Spring Integration `5.2.1.RELEASE` and Spring Data `Moore-SR1`. Besides upgrades the `CassandraMessageHandler` implementation is fully reactive and produces a `Mono<WriteResult>` reply in the `async` and gateway modes. Otherwise a subscription or `block()` happens internally if not an async or we are not interested in the reply. The dependency for this artifact is this:

```
Copyorg.springframework.integration:spring-integration-cassandra:0.7.0.RELEASE
```

## [](#spring-integration-hazelcast)[](#spring-integration-hazelcast)Spring Integration Hazelcast

[Spring Integration support for Hazelcast](https://github.com/spring-projects/spring-integration-extensions/tree/master/spring-integration-hazelcast) has reached version `2.0.0.RELEASE` and is based on Spring Integration `5.2.1.RELEASE` and Hazelcast `3.12.4`. With this major new version we have reworked some internals for latest Hazelcast and Spring Integration compatibilities. The dependency for this artifact is this:

```
Copyorg.springframework.integration:spring-integration-hazelcast:2.0.0.RELEASE
```

## [](#spring-integration-kotlin-dsl)[](#spring-integration-kotlin-dsl)Spring Integration Kotlin DSL

[Spring Integration Kotlin DSL](https://github.com/spring-projects/spring-integration-extensions/tree/master/spring-integration-kotlin-dsl) has been changed radically and released as `0.0.2.RELEASE` version. It is based on Spring Integration `5.2.1.RELEASE` & Kotlin `1.3.50`. With a `KotlinIntegrationFlowDefinition` implementation & `@BuilderInference` marker for it lambda in the `integrationFlow()` global functions makes the target integration flow definitions much cleaner and Kotlin-friendly:

```
Copy@Bean
fun flowLambda() =
    integrationFlow {
        filter<String>({ it === "test" })
        wireTap(
                integrationFlow {
                    handle { m -> println(m.payload) }
                })
        transform<String, String>({ it.toUpperCase() })
    }
```

The dependency for this artifact is this:

```
Copyorg.springframework.integration:spring-integration-kotlin-dsl:0.0.2.RELEASE
```

## [](#spring-integration-kafka)[](#spring-integration-kafka)Spring Integration Kafka

[Spring Integration support for Apache Kafka](https://github.com/spring-projects/spring-integration-kafka) was also released as version `3.2.1.RELEASE` with all the latest Spring Integration and Spring for Apache Kafka releases. A `ProducerRecordCreator` strategy can now be injected into the `KafkaProducerMessageHandler` for custom `ProducerRecord` creating respectively. As well as `ProducerRecord` can come now in the request message payload. A dependency for this artifact is this:

```
Copyorg.springframework.integration:spring-integration-kafka:3.2.1.RELEASE
```

As always, we are open for any feedback in any communication channels available!

[Project Page](http://projects.spring.io/spring-integration-extensions/) | [GitHub Issues](https://github.com/spring-projects/spring-integration-extensions/issues) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)