---
title: Announcing the release of Spring Cloud Stream Horsham (3.0.0.RELEASE)
source: https://spring.io/blog/2019/11/25/announcing-the-release-of-spring-cloud-stream-horsham-3-0-0-release
scraped: 2026-02-23T14:24:26.032Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oleg Zhurakousky |  November 25, 2019 | 2 Comments
---

# Announcing the release of Spring Cloud Stream Horsham (3.0.0.RELEASE)

_Engineering | Oleg Zhurakousky |  November 25, 2019 | 2 Comments_

We are pleased to announce the release of the Spring Cloud Stream Horsham (3.0.0.RELEASE) release train which is available as part of Spring Cloud Hoxton.RELEASE (imminent) and builds on Spring Boot 2.2.x and Spring Cloud Function 3.0.0.RELEASE which was also [just released](https://spring.io/blog/2019/11/25/announcing-the-release-of-spring-cloud-function-3-0-0-release).

Spring Cloud Stream Horsham.RELEASE modules are available for use in the [Maven Central](https://repo.maven.apache.org/maven2/org/springframework/cloud/) repository.

### [](#quick-highlights)Quick highlights:

As mentioned in these posts ([demystified and simplified](https://spring.io/blog/2019/10/14/spring-cloud-stream-demystified-and-simplified), [functional and reactive](https://spring.io/blog/2019/10/17/spring-cloud-stream-functional-and-reactive), [stream and spring Integration](https://spring.io/blog/2019/10/25/spring-cloud-stream-and-spring-integration) and [event routing](https://spring.io/blog/2019/10/31/spring-cloud-stream-event-routing)) preceding this announcement, the core theme of this release is *functions*!.

Historically, Spring Cloud Stream exposed annotation-based configuration model that required the user to be aware of and provide considerable amount of boilerplate information that could be otherwise easily inferred. You can read more details about it [here](https://spring.io/blog/2019/10/14/spring-cloud-stream-demystified-and-simplified), but with this release and subsequent release of Spring Cloud Functions that is no longer the case.

*Stream app is just a boot app!*

```java
Copy@SpringBootApplication
public class SampleApplication  {
    @Bean
    public Function<String, String> uppercase() {
        return value -> value.toUpperCase();
    }
}
```

Yes, the above is fully functional Spring Cloud Stream application

### [](#notable-features-and-enhancements)Notable features and enhancements:

Most of notable features and enhancements are to emphasise our commitment to functional programming model;

-   ***Routing Function*** - which effectively corresponds to equal functionality (and more) provided by `condition` attribute of `@StreamListener` annotation. See [Event Routing](https://cloud.spring.io/spring-cloud-static/spring-cloud-stream/3.0.0.RELEASE/reference/html/spring-cloud-stream.html#_event_routing) for more details.
    
-   ***Multiple bindings with functions*** (multiple message handlers) - see [Multiple functions](https://cloud.spring.io/spring-cloud-static/spring-cloud-stream/3.0.0.RELEASE/reference/html/spring-cloud-stream.html#_multiple_functions_in_a_single_application) in a single application for more details.
    
-   ***Function arity*** (functions with multiple inputs/outputs - single function that can subscribe or target multiple destinations) - see [Functions with multiple input and output arguments](https://cloud.spring.io/spring-cloud-static/spring-cloud-stream/3.0.0.RELEASE/reference/html/spring-cloud-stream.html#_functions_with_multiple_input_and_output_arguments) for more details.
    
-   ***Native support for reactive programming*** - since v3.0.0 we no longer distribute spring-cloud-stream-reactive modules and instead relying on native reactive support provided by spring cloud function. For backward compatibility you can still bring spring-cloud-stream-reactive from previous versions.
    
-   ***Schema Registry*** module has been migrated to a [stand alone project](https://github.com/spring-cloud/spring-cloud-schema-registry)
    

For more information you should also checkout the updated [user guide](https://cloud.spring.io/spring-cloud-static/spring-cloud-stream/3.0.0.RELEASE/reference/html/index.html).

##### [](#functional-support-in-kafka-streams)Functional support in Kafka Streams

Kafka Streams binder now supports a first class function based programming model using which you can now write your Kafka Streams applications based on java.util.function support. This further reduces the boilerplate code that the applications need to write and allow the developers to focus on the business logic at hand. For further details, please visit [Functional Style](https://cloud.spring.io/spring-cloud-static/spring-cloud-stream-binder-kafka/3.0.0.RC1/reference/html/spring-cloud-stream-binder-kafka.html#_programming_model) section for more details. [Soby Chako](https://spring.io/team/sobychacko) (the lead for [Spring Cloud Stream Kafka](https://cloud.spring.io/spring-cloud-static/spring-cloud-stream-binder-kafka/3.0.0.RELEASE/reference/html/spring-cloud-stream-binder-kafka.html) binder) is planning to have a dedicated set of write ups going over all the new features.

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-stream) or [GitHub](https://github.com/spring-cloud/spring-cloud-stream/) and or [Gitter](https://gitter.im/spring-cloud/spring-cloud-stream)