---
title: Spring Session Data Geode/GemFire 2.0.0.M2 Available
source: https://spring.io/blog/2017/10/06/spring-session-data-geode-gemfire-2-0-0-m2-available
scraped: 2026-02-23T16:19:35.820Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | John Blum |  October 06, 2017 | 0 Comments
---

# Spring Session Data Geode/GemFire 2.0.0.M2 Available

_Engineering | John Blum |  October 06, 2017 | 0 Comments_

Greetings Spring Community!

I am pleased to announce the second milestone of both *Spring Session Data Geode* for Apache Geode and *Spring Session Data GemFire* for Pivotal GemFire.

The 2nd milestone release brings many welcome improvements, including:

-   Upgrades to *Spring Framework* 5.0.0.RELEASE.
    
-   Upgrades to *Spring Data* Kay-RELEASE.
    
-   Upgrades to *Spring Session* 2.0.0.M4.
    
-   Upgrades to *Spring Boot* 2.0.0.M4.
    
-   Adds support for Pivotal GemFire and Apache Geode [PDX Serialization](http://geode.apache.org/docs/guide/12/developing/data_serialization/gemfire_pdx_serialization.html).
    
-   Introduces a new [Serialization framework](https://docs.spring.io/autorepo/docs/spring-session-data-geode-build/2.0.0.M2/reference/htmlsingle/#httpsession-gemfire-serialization-framework) and adapter for Pivotal GemFire/Apache Geode’s *Data Serialization* and PDX frameworks.
    

Both artifacts can be downloaded from *Spring’s* `libs-milestone` Repository using Maven …

```
Copy  <dependency>
    <groupId>org.springframework.session</groupId>
    <artifactId>spring-session-data-geode</artifactId>
    <version>2.0.0.M2</version>
  </dependency>
```

Or, using Gradle…​

`compile 'org.springframework.session:spring-session-data-geode:2.0.0.M2`

To use *Spring Session* with Pivotal GemFire, just switch the artifact from `spring-session-data-geode` to `spring-session-data-gemfire`. The version stays the same.

## [](#from-data-serialization-to-pdx)[](#from-data-serialization-to-pdx)From Data Serialization to PDX

Many users have been requesting that *Spring Session* for Pivotal GemFire and Apache Geode support [PDX Serialization](http://geode.apache.org/docs/guide/12/developing/data_serialization/gemfire_pdx_serialization.html). This makes sense given that PDX is highly "portable", as explained further in the [*Reference Guide*](https://docs.spring.io/autorepo/docs/spring-session-data-geode-build/2.0.0.M2/reference/htmlsingle/#httpsession-gemfire-serialization-background).

One of the key benefits of PDX is that you do not need *Spring Session* for Pivotal GemFire or Apache Geode on the classpath of the servers in the cluster to use *Spring Session* in *Spring Boot*, GemFire/Geode cache client applications using the client/server topology. In fact, you do not even need to put your application domain object classes stored in an (HTTP) Session, and persisted to GemFire/Geode servers in the cluster, on the servers' classpath, either.

*Spring Session Data GemFire/Geode* now uses PDX by default. However, it is very easy to switch between *Data Serialization* and PDX just by switching the bean reference in the `@EnableGemFireHttpSession` annotation.

OOTB, *Spring Session Data GemFire/Geode* register 2 beans on the user’s behalf implementing each GemFire/Geode Serialization strategy.

To explicitly declare that you want your *Spring Boot*, *Spring Session* enabled application to use PDX Serialization, set the new `sessionSerializerBeanName` attribute in the `@EnableGemFireHttpSession` annotation to `GemFireHttpSessionConfiguration.SESSION_PDX_SERIALIZER_BEAN_NAME`…​

```
Copy@SpringBootApplication
@EnableGemFireHttpSession(sessionSerializerBeanName =
    GemFireHttpSessionConfiguration.SESSION_PDX_SERIALIZER_BEAN_NAME
class Application {
  ...
}
```

To use *Data Serialization*, and leverage *Deltas*, set `sessionSerializerBeanName` to `GemFireHttpSessionConfiguration.SESSION_DATA_SERIALIZER_BEAN_NAME`…​

```
Copy@SpringBootApplication
@EnableGemFireHttpSession(sessionSerializerBeanName =
    GemFireHttpSessionConfiguration.SESSION_DATA_SERIALIZER_BEAN_NAME
class Application {
  ...
}
```

More details on using PDX with *Spring Session* and Pivotal GemFire or Apache Geode can be found in the [*Reference Guide*](https://docs.spring.io/autorepo/docs/spring-session-data-geode-build/2.0.0.M2/reference/htmlsingle/#httpsession-gemfire-serialization-spring-session).

## [](#serialization-framework)[](#serialization-framework)Serialization Framework

*Spring Session Data GemFire/Geode* introduces a new `SessionSerializer` interface allowing users to customize how a `Session` gets serialized to either Pivotal GemFire or Apache Geode.

```
Copyinterface SessionSerializer<T, IN, OUT> {

  void serializer(T session, OUT out);

  T deserialize(IN in);

  boolean canSerialize(Class<?> type);
}
```

Users can provide an custom implementation of this interface, register it as a bean in the *Spring* context, set the `sessionSerializerBeanName` attribute to the name of the custom `SessionSerializer` bean definition, and *Spring Session Data GemFire/Geode* will adapt and register this bean as a `PdxSerializer` in Pivotal GemFire or Apache Geode.

For instance…​

```
Copy@SpringBootApplication
@EnableGemFireHttpSession(sessionSerializerBeanName = "customSerializer")
class Application {

  @Bean
  SessionSerializer<Session, PdxReader, PdxWriter> customSerializer() {
    // return an instance of a custom `SessionSerializer` implementation
  }
}
```

This is just the tip of the iceberg. More details can be found in the *Reference Guide* on the new [Serialization framework](https://docs.spring.io/autorepo/docs/spring-session-data-geode-build/2.0.0.M2/reference/htmlsingle/#httpsession-gemfire-serialization-framework-serializer-implementation).

## [](#feedback)[](#feedback)Feedback

As always, any feedback on this release is highly appreciated. Users can reach out on [StackOverflow](https://stackoverflow.com/questions/tagged/spring-session), file [GitHub Issues](https://github.com/spring-projects/spring-session-data-geode/issues), or share your comments below. You can also reach me on Twitter, [@john\_blum](https://twitter.com/john_blum).

## [](#springone-platform-2017)[](#springone-platform-2017)SpringOne Platform 2017

Also make sure to checkout the lineup this year at [SpringOne Platform 2017](https://springoneplatform.io/). This is going to be a year to remember with so much great content…​ *Spring Framework* 5 with early support of JDK 9, *Reactive* and *Functional* programming, integration with JUnit 5 and Kotlin. So much cool stuff to learn!