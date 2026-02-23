---
title: Announcing Spring Cloud Stream Horsham.RC1 (3.0.0.RC1)
source: https://spring.io/blog/2019/10/28/announcing-spring-cloud-stream-horsham-rc1-3-0-0-rc1
scraped: 2026-02-23T14:29:54.445Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oleg Zhurakousky |  October 28, 2019 | 0 Comments
---

# Announcing Spring Cloud Stream Horsham.RC1 (3.0.0.RC1)

_Engineering | Oleg Zhurakousky |  October 28, 2019 | 0 Comments_

We are pleased to announce the first Release Candidate of the Spring Cloud Stream Horsham.RC1 (3.0.0.RC1).

Spring Cloud Stream Horsham.RC1 (3.0.0.RC1) modules are available for use in the [Spring Milestone](https://repo.spring.io/libs-milestone-local/org/springframework/cloud/) repository.

### [](#quick-highlights)Quick highlights:

-   Spring Boot 2.2.x
-   Spring Cloud Function 3.0.0.RC1

### [](#notable-features-and-enhancements-for-this-milestone)Notable features and enhancements for this milestone:

##### [](#emphasis-on-functional-programming-model)Emphasis on functional programming model

As mentioned in the previous release blogs, with this release we are shifting to a simpler functional programming model.

In the nutshell a simple spring-boot application with at least one function bean is also a spring-cloud-stream application (as shown below).

```java
Copy@SpringBootApplication
public class MyApplicationConfiguration {

    @Bean
    public Function<String, String> uppercase() {
        return value -> value.toUpperCase();
    }
}
```

For benefits and features as well as additional details please reference these recent blogs

[Spring-Cloud-Stream - demystified & simplified](https://spring.io/blog/2019/10/14/spring-cloud-stream-demystified-and-simplified) [Spring-Cloud-Stream - functional & reactive](https://spring.io/blog/2019/10/17/spring-cloud-stream-functional-and-reactive) [Spring-Cloud-Stream & Spring-Integration](https://spring.io/blog/2019/10/25/spring-cloud-stream-and-spring-integration) [Spring Cloud Stream M3 release announcement](https://spring.io/blog/2019/08/19/announcing-spring-cloud-stream-horsham-m3-3-0-0-m3)

You should also checkout the updated [user guide](https://cloud.spring.io/spring-cloud-static/spring-cloud-stream/3.0.0.RC1/reference/html/).

> NOTE: User guide is still being updated so for up to date details you can also reference it's [source](https://github.com/spring-cloud/spring-cloud-stream/blob/master/docs/src/main/asciidoc/spring-cloud-stream.adoc)

##### [](#functional-support-in-kafka-streams)Functional support in Kafka Streams

Kafka Streams binder now supports a first class function based programming model using which you can now write your Kafka Streams applications based on java.util.function support. This further reduces the boilerplate code that the applications need to write and allow the developers to focus on the business logic at hand. For further details, please visit [Functional Style](https://cloud.spring.io/spring-cloud-static/spring-cloud-stream-binder-kafka/3.0.0.RC1/reference/html/spring-cloud-stream-binder-kafka.html#_programming_model) section for more details. We are planning to have another dedicated write up going over all the new features.

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-stream) or [GitHub](https://github.com/spring-cloud/spring-cloud-stream/) and or [Gitter](https://gitter.im/spring-cloud/spring-cloud-stream)