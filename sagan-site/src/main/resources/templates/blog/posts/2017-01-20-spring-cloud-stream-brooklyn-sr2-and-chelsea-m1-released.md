---
title: Spring Cloud Stream Brooklyn.SR2 and Chelsea.M1 released
source: https://spring.io/blog/2017/01/20/spring-cloud-stream-brooklyn-sr2-and-chelsea-m1-released
scraped: 2026-02-23T18:42:40.799Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Marius Bogoevici |  January 20, 2017 | 0 Comments
---

# Spring Cloud Stream Brooklyn.SR2 and Chelsea.M1 released

_Releases | Marius Bogoevici |  January 20, 2017 | 0 Comments_

On behalf of the community, I am happy to announce the release of Spring Cloud Stream Brooklyn.SR2 and Chelsea.M1 release trains. As part of the next installment to Brooklyn release train, Brooklyn.SR2 adds a number of new features and fixes. The next release train Chelsea.M1 builds on top of Spring Boot 1.5 and a contains a core improvement listed below.

## [](#what-is-new)What is new?

A few highlights of the improved areas:

-   *Schema Registry Support:* fixed issues related to using the Schema Registry server, in particular support for MySQL and Postgresql;
-   *Aggregate Applications:* improved support for property propagation via namespaces;
-   *Reactive support*: Aligns declarative (e.g. reactive) handler support with imperative mode, which makes it easier to seamlessly adopt a functional programming model. In particular, this adds support for the following idiom:

```java
Copy@StreamListener(Processor.INPUT)
@SendTo(Processor.OUTPUT)
public Flux<String> uppercaseTransformer(Flux<String> input) {
  return input.map(String::toUpperCase);
}   
```

-   *Apache Kafka binder and core*: Adding support in core for binder native marshalling unmarshalling, and in the case of Kafka binder, it supports using Serializers/Deserializers directly (including Confluent Schema Registry-based deserializers);
-   *Core*: The Chelsea.M1 release train introduces internal changes that allow the binding process to operate over entities other than Spring Integration message channels, which is a prerequisite for Kafka Streams ([KStream](http://docs.confluent.io/3.0.0/streams/)) and native reactive support.

Comprehensive lists of fixes for the release train components can be find for the [core](https://github.com/spring-cloud/spring-cloud-stream/milestone/16?closed=1), [Rabbit MQ binder](https://github.com/spring-cloud/spring-cloud-stream-binder-rabbit/milestone/5?closed=1) and the [Apache Kafka binder](https://github.com/spring-cloud/spring-cloud-stream-binder-kafka/milestone/5?closed=1).

## [](#what-is-next)What is next?

-   The addition of JMS binder support (targeted in Chelsea.M2) with an out of the box implementation for ActiveMQ. Additional implementations for Solace and IBM MQ will be available as community contributions, but not released as artifacts, for licensing reasons;
-   Support for KStream binding as an experimental feature;
-   Rabbit MQ binder improvements, including support for user infrastructure, priority queues and TTL.

## [](#acknowledgments)Acknowledgments

I would like to thank everyone involved for their support. In particular, I would like to extend special thanks to the community members that have contributed to this release by opening issues or providing patches:

-   Rajiv Jivan ([@rjivan](https://github.com/rjivan))
-   Mark Nadelson ([@mnadelson](https://github.com/mnadelson))
-   Ivo Parun Rua ([@parunruaivo](https://github.com/parunruaivo))
-   Sanjay Parmar ([@parmarsanjay](https://github.com/parmarsanjay))
-   Dennis Melzer ([@sirwayne](https://github.com/sirwayne))
-   Dominik Meister ([@neptoon](https://github.com/neptoon)).

Also, special thanks to Donovan Muller ([@donovanmuller](https://github.com/donovanmuller)) for the contributions to the JMS binder, which will be included in the upcoming milestone release.into a later release train.

As usual the releases are available as follows:

-   Brooklyn.SR2 in the [Spring Releases](https://repo.spring.io/libs-release/org/springframework/cloud/spring-cloud-stream-dependencies/Brooklyn.SR2/) repository and [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-stream-dependencies/Brooklyn.SR2/);
-   Chelsea.M1 in the [Spring Milestone](https://repo.spring.io/libs-milestone/org/springframework/cloud/spring-cloud-stream/1.2.0.M1/) repository.

As always, you can stay in touch with us either in [GitHub](https://github.com/spring-cloud/spring-cloud-stream), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud-stream), on [Gitter](https://gitter.im/spring-cloud/spring-cloud-stream), or on [Twitter](https://twitter.com/springcloud) (hashtag #SCStream).

This is also a reminder that the CFP for [Spring I/O](http://2017.springio.net) is open. Spring I/O is the leading European conference focused on the Spring Framework ecosystem, and will take place in Barcelona in May 18-19, 2017. - if you think you have something interesting to say about Spring, submit a proposal! Spring I/O will also start selling tickets soon, so watch the site!