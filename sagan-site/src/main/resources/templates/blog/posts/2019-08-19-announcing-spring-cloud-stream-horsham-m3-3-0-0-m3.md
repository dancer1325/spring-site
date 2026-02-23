---
title: Announcing Spring Cloud Stream Horsham.M3 (3.0.0.M3)
source: https://spring.io/blog/2019/08/19/announcing-spring-cloud-stream-horsham-m3-3-0-0-m3
scraped: 2026-02-23T14:38:36.517Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oleg Zhurakousky |  August 19, 2019 | 1 Comment
---

# Announcing Spring Cloud Stream Horsham.M3 (3.0.0.M3)

_Engineering | Oleg Zhurakousky |  August 19, 2019 | 1 Comment_

We are pleased to announce the third Milestone of the Spring Cloud Stream Horsham.M3 (3.0.0.M3).

> NOTE: Spring Cloud Stream 3.0.0.M1/M2 was primarily to establish compatibility with Spring Boot 2.2.x. and therefore went unannounced.

Spring Cloud Stream Horsham.M3 (3.0.0.M3) modules are available for use in the [Spring Milestone](https://repo.spring.io/libs-milestone-local/org/springframework/cloud/) repository.

### [](#quick-highlights)Quick highlights:

-   Spring Boot 2.2.x
-   Spring Cloud Function 3.0.0.M2

### [](#notable-features-and-enhancements-for-this-milestone)Notable features and enhancements for this milestone:

##### [](#emphasis-on-functional-programming-model)Emphasis on functional programming model

While we're not (yet) deprecating `@StreamListener` and/or `@EnableBinding`, we are moving toward a simpler and more natural auto-configuration driven programming model.

```java
Copy@SpringBootApplication
public class MyApplicationConfiguration {

    @Bean
    public Function<String, String> uppercase() {
        return value -> value.toUpperCase();
    }
}
```

The above is a completely functioning *spring-cloud-stream* application. Notice the lack of `@StreamListener` and `@EnableBinding`. The fact that it's a `Function` bootstrapped in the context of spring-cloud-stream (since it's on the classpath) effectively tell us all the information that `@StreamListener` and `@EnableBinding` were telling us before (e.g., Function maps to `Processor` with default destination names as "input" and "output").

> NOTE: One of the improvements in spring-cloud-function is that we no longer auto-transform non-reactive functions to reactive functions. This means that your *imperative function* will be wired as any other Message Handler (e.g., StreamListener) while *reactive function* will be wired the same way as reactive listeners on spring-cloud-stream-reactive module (more on that in another blog) giving you more flexibility.

In the coming weeks we will be updating [Functional Support](https://cloud.spring.io/spring-cloud-static/spring-cloud-stream/3.0.0.M3/reference/html/spring-cloud-stream.html#spring_cloud_function) documentation with more details.

##### [](#functional-support-in-kafka-streams)Functional support in Kafka Streams

Kafka Streams binder now supports a first class function based programming model using which you can now write your Kafka Streams applications based on java.util.function support. This further reduces the boilerplate code that the applications need to write and allow the developers to focus on the business logic at hand. For further details, please visit [Functional Style](https://cloud.spring.io/spring-cloud-static/spring-cloud-stream-binder-kafka/3.0.0.M3/reference/html/spring-cloud-stream-binder-kafka.html#_programming_model) section for more details. We are planning to have another dedicated write up going over all the new features.

Other [features, enhancements and bug fixes](https://github.com/spring-cloud/spring-cloud-stream/milestone/63?closed=1)

#### [](#next-steps)Next Steps

One big feature we are planning to introduce in the next milestone is support for functions with multiple inputs and outputs for which there will be a separate blog.

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-stream) or [GitHub](https://github.com/spring-cloud/spring-cloud-stream/) and or [Gitter](https://gitter.im/spring-cloud/spring-cloud-stream)