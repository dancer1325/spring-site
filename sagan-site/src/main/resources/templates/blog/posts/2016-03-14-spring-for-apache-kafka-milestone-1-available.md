---
title: Spring for Apache Kafka Milestone 1 Available
source: https://spring.io/blog/2016/03/14/spring-for-apache-kafka-milestone-1-available
scraped: 2026-02-23T19:20:07.369Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Gary Russell |  March 14, 2016 | 0 Comments
---

# Spring for Apache Kafka Milestone 1 Available

_Engineering | Gary Russell |  March 14, 2016 | 0 Comments_

I am pleased to announce that the `spring-kafka` (Spring for Apache Kafka) first milestone is now available (`1.0.0.M1`).

The existing `spring-integration-kafka` [extension project](https://github.com/spring-projects/spring-integration-kafka) - currently at version `1.3.0.RELEASE` supports Kafka [0.8.x.x](http://kafka.apache.org/082/documentation.html) and is used in [Spring XD](http://projects.spring.io/spring-xd/) (Kafka `MessageBus`) and [Spring Cloud Stream](http://cloud.spring.io/spring-cloud-stream/) (Kafka `Binder`).

This new project (`spring-kafka`) breaks out the core components into a separate project. It is based on the new [0.9.0.x](http://kafka.apache.org/documentation.html) pure Java Kafka clients.

`spring-kafka` brings the familiar Spring programming model to Apache Kafka for any Spring user, not just those using Spring Integration. An upcoming `spring-integration-kafka` release will be a complete rewrite, utilizing the `spring-kafka` project internally.

Much like the other messaging projects in the Spring portfolio, `spring-kafka` provides:

-   Message Listener Container.
-   Annotations for POJO message listeners (`@KafkaListener` - similar to `@JmsListener` and `@RabbitListener`).
-   `KafkaTemplate` for sync and async sending to Kafka topics:

```java
Copy@Configuration
@EnableKafka
public class KafkaConfig {
     // Infrastructure @Beans omitted. 
     // See Reference Manual and tests for comprehensive sample

     @Bean
     public Listener listener() {
        return new Listener();
     }

}

public class Listener {

     @KafkaListener(topics = "myTopic")
     public void handleFromKakfa(String payload) {
       ...
    }

}
```

Using maven or gradle:

```xml
Copy<dependencies>
    <dependency>
        <groupId>org.springframework.kafka</groupId>
        <artifactId>spring-kafka</artifactId>
        <version>1.0.0.M1</version>
    </dependency>
</dependencies>
```

```java
Copydependencies {
    compile 'org.springframework.kafka:spring-kafka:1.0.0.M1'
}
```

In addition, the `spring-kafka-test` artifact is available, containing support for testing, including an embedded Kafka broker, hamcrest `Matcher`s etc.

Both artifacts are available in the `repo.spring.io/milestone` repository.

See the [milestone 1 reference manual](http://docs.spring.io/spring-kafka/docs/1.0.0.M1/reference/htmlsingle/) for more information.

Many thanks to [Soby Chacko](https://github.com/sobychacko) (for kicking off the initial Spring Integration Kafka extension), [Marius Bogoevici](https://spring.io/team/mbogoevici) and [Artem Bilan](https://spring.io/team/artembilan) for their help with this important project.

#Next Steps:

-   First milestone of `spring-integration-kafka` (`2.0`) based on `spring-kafka`
-   A Spring Boot starter, with auto configuration support etc.
-   A new `Binder` implementation for `spring-cloud-stream`
-   Flesh out the documentation, set up a project page etc.

In the meantime, you can follow progress, report issues, etc, in the [github repo](https://github.com/spring-projects/spring-kafka).