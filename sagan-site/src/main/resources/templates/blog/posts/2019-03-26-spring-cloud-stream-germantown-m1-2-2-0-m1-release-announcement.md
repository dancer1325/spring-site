---
title: Spring Cloud Stream Germantown.M1 /2.2.0.M1 Release Announcement
source: https://spring.io/blog/2019/03/26/spring-cloud-stream-germantown-m1-2-2-0-m1-release-announcement
scraped: 2026-02-23T14:54:14.621Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oleg Zhurakousky |  March 26, 2019 | 1 Comment
---

# Spring Cloud Stream Germantown.M1 /2.2.0.M1 Release Announcement

_Engineering | Oleg Zhurakousky |  March 26, 2019 | 1 Comment_

We are pleased to announce the first Milestone of the Spring Cloud Stream Germantown release train - Germantown.M1/2.2.0.M1.

Spring Cloud Stream Germantown 2.2.0.M1 is available for use in the [Spring Milestone](http://repo.spring.io/libs-milestone-local/org/springframework/cloud/spring-cloud-stream/2.2.0.M1/) repository.

### [](#some-of-the-highlights)Some of the highlights:

##### [](#improved-home-page-and-user-documentation)Improved Home page and User Documentation

Please check out our new [home page](https://spring.io/projects/spring-cloud-stream#overview) and [user guide](https://cloud.spring.io/spring-cloud-static/spring-cloud-stream/2.2.0.M1/home.html)

##### [](#further-functional-programming-enhancements)Further functional programming enhancements

We've added additional [functional programming enhancements and simplifications](https://github.com/spring-cloud/spring-cloud-stream/issues/1590) where you no longer required to provide `@EnableBinding` annotation and in some cases you may not need spring.cloud.stream.definition\` property. Consider the following:

```java
Copy@SpringBootApplication
public class SimpleFunctionRabbitDemoApplication {

    public static void main(String[] args) throws Exception {
        SpringApplication.run(SimpleFunctionRabbitDemoApplication.class);
    }

    @Bean
    public Function<String, String> echo() {
        return v -> v;
    }
}
```

Without any additional property and/or annotation the above is a fully functioning Spring Cloud Stream application bound as `Processor` based on what framework was able to determine from the above code. Subsequently the following would be bound as `Sink`:

```java
Copy@SpringBootApplication
public class SimpleFunctionRabbitDemoApplication {

    public static void main(String[] args) throws Exception {
        SpringApplication.run(SimpleFunctionRabbitDemoApplication.class);
    }

    @Bean
    public Consumer<String> log() {
        return System.out::println;
    }
}
```

Notice there is no longer `@EnableBinding` annotation nor `spring.cloud.stream.function.definition` property as the framework was able to determine the intention given that there is only one functional bean available in the application context. In the event there are more then one and/or if you want to [compose function](https://cloud.spring.io/spring-cloud-static/spring-cloud-stream/2.2.0.M1/spring-cloud-stream.html#_functional_composition) from several, you can still provide `spring.cloud.stream.function.definition` property

##### [](#functional-kafka-streams)Functional Kafka Streams

Keeping with the spirit of the main theme that we are driving in Germantown, the Kafka Streams binder also now supports writing applications using a functional programming model. Instead of using `StreamListener` and `SendTo` for composing your processors, you can simply define beans of type `java.util.Function|Consumer` and the binder will delegate to appropriate bindings. This [feature is still evolving](https://github.com/spring-cloud/spring-cloud-stream-binder-kafka/blob/master/spring-cloud-stream-binder-kafka-streams/src/test/java/org/springframework/cloud/stream/binder/kafka/streams/function/KafkaStreamsBinderWordCountFunctionTests.java#L175) in Kafka Streams binder and watch this space for more improvements, details and sample applications as we progress through further milestones of Germantown.

##### [](#retry-template-per-binding)Retry template per binding

Ability to configure RetryTemplate [per binding](https://cloud.spring.io/spring-cloud-static/spring-cloud-stream/2.2.0.M1/spring-cloud-stream.html#_retry_template).

Numerous [enhancements and bug fixes](https://github.com/spring-cloud/spring-cloud-stream/issues?q=milestone%3A2.2.0.M1+is%3Aclosed).

> NOTE:

If the applications are created from Spring Initializr, they need to add this BOM snippet in maven dependency management before the spring-cloud BOM declaration, otherwise you'll end up with the latest snapshot:

```
Copy<dependency>
           <groupId>org.springframework.cloud</groupId>
           <artifactId>spring-cloud-stream-dependencies</artifactId>
           <version>Germantown.M1</version>
           <type>pom</type>
           <scope>import</scope>
</dependency>
```

Also, please keep an eye on one of our newest [AWS Kinesis binder](https://github.com/spring-cloud/spring-cloud-stream-binder-aws-kinesis/releases/tag/v1.1.0.RELEASE) which was just released v1.1.0.

#### [](#next-steps)Next Steps

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-stream) or [GitHub](https://github.com/spring-cloud/spring-cloud-stream/) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-stream).