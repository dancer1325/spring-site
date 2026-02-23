---
title: Spring Cloud Stream 1.0.0.RC1 is now available
source: https://spring.io/blog/2016/03/23/spring-cloud-stream-1-0-0-rc1-is-now-available
scraped: 2026-02-23T19:22:21.769Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Marius Bogoevici |  March 23, 2016 | 2 Comments
---

# Spring Cloud Stream 1.0.0.RC1 is now available

_Releases | Marius Bogoevici |  March 23, 2016 | 2 Comments_

On behalf of the team, I am pleased to announce that the first release candidate for [Spring Cloud Stream](http://cloud.spring.io/spring-cloud-stream/) is out. As the last milestone before 1.0.0.RELEASE, it stabilizes the APIs, and comes with a number of new features and bug fixes, in the area of tooling support, and content type management. Here is a highlight of the most important changes:

#### [](#binder-and-binding-property-restructuring)Binder and binding property restructuring

The configuration for binders and bindings has changed to a model friendlier to [Spring Boot configuration metadata](https://docs.spring.io/spring-boot/docs/current/reference/html/configuration-metadata.html). Now all the configuration properties (including binding-specific properties) support validation and completion (in Spring Tool Suite).

Configuration properties for generic binding settings, as well as binder-specific settings, have changed, please consult the [documentation](http://docs.spring.io/spring-cloud-stream/docs/1.0.0.RC1/reference/htmlsingle/index.html) for details.

NOTE: The short form for destinations, e.g. `spring.cloud.stream.bindings.input=someDestination`, is not supported anymore. The standard form, i.e. `spring.cloud.stream.bindings.input.destination=someDestination` must be used instead.

#### [](#streamlistener-for-spring-messaging-alignment-and-content-type-handling)@StreamListener for Spring Messaging alignment and content-type handling

In addition to Spring Integration support, which is a first class citizen in Spring Cloud Stream, 1.0.0.RC1 introduces a new `@StreamListener` annotation for message dispatching to methods, based on the Spring Messaging infrastructure for argument and content type handling (more details [here](http://docs.spring.io/spring-cloud-stream/docs/1.0.0.RC1/reference/htmlsingle/index.html#__streamlistener_for_automatic_content_type_handling)). This allows for more seamless handling for messages with known content types (e.g. marhalled JSON with a content type header) and better interoperability with other Spring Cloud Stream applications, and for certain types of middleware, like Rabbit MQ, or even applications that are not based on Spring Cloud Stream.

For example, an application that receives `String` payloads with an `application/json` content type header, can do the transformation to the Vote POJO directly.

```java
Copy@EnableBinding(Sink.class)
public class VoteHandler {

  @Autowired
  VotingService votingService;

  @StreamListener(Sink.INPUT)
  public void handle(Vote vote) {
    votingService.record(vote);
  }
}
```

Additionally the release features a number of bug fixes in the area of content type management, as well as improved documentation. The entire list of changes is available [in Git Hub](https://github.com/spring-cloud/spring-cloud-stream/issues?q=milestone%3A1.0.0.RC1).

We are looking forward to a 1.0.0.RELEASE at the beginning of April.

And, as always, we welcome feedback: either in [GitHub](https://github.com/spring-cloud/spring-cloud-stream), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud-stream), or on [Twitter](https://twitter.com/springcentral).

If you happen to be in Barcelona mid-May, don’t miss the chance to join the [Spring I/O conference](http://www.springio.net) where I’ll be presenting Spring Cloud Stream. Also, the registration for SpringOne Platform (early August, Las Vegas) has opened recently, in case you want to benefit from early bird ticket pricing. The latter is also still open for [talk proposals](http://springoneplatform.io/submit) (but only until March 24, so hurry up!). So if you’re interested to give a talk about Spring or Pivotal-related technologies, feel free to submit!