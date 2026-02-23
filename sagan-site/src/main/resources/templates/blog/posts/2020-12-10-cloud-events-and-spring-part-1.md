---
title: Cloud Events and Spring - part 1
source: https://spring.io/blog/2020/12/10/cloud-events-and-spring-part-1
scraped: 2026-02-23T13:36:29.692Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oleg Zhurakousky |  December 10, 2020 | 2 Comments
---

# Cloud Events and Spring - part 1

_Engineering | Oleg Zhurakousky |  December 10, 2020 | 2 Comments_

#### [](#prologue)Prologue

***Uniformity of data across systems and platforms*** is a singular and noble purpose of [Cloud Event specification](https://cloudevents.io/). With its growing adoption, the hope is that the developers and architects would no longer have to worry about how to deal with various events coming from different systems and platforms. . . But the point of this post is not to re-litigate or re-justify Cloud Events. A simple Google search renders quite a few points for you to read to help the "*Why Cloud Events?*" question. The goal of this and subsequent posts on the subject is to share some ideas and the work we've been doing here at Spring to anticipate and handle greater adoption of Cloud Events.

#### [](#introduction)Introduction

***[Message](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/messaging/Message.html), which is the Spring implementation of the EIP [Message](https://www.enterpriseintegrationpatterns.com/patterns/messaging/Message.html), is an adequate structure to represent Cloud Event!*** That is the case we are building here. If true, then any framework or application that currently relies on Spring Messaging would automatically support Cloud Event use cases. So. . .

#### [](#a-message-is-a-cloud-event)A Message is a Cloud Event

According to the official [website](https://cloudevents.io/), ***Cloud Events*** is "A specification for describing event data in a common way".

If you read the specification (which is quite simple), you quickly realize that Cloud Event effectively defines a canonical and platform-independent data structure to be exchanged across systems and platforms in a uniform way. The structure is rather simple. It encapsulates some payload as a `data` field and additional metadata as `attributes` (a key/value structure). The `attributes` themselves are split into well-defined metadata fields called `attributes` (required and optional) and loosely defined or undefined fields called `extension attributes`.

![](https://github.com/spring-cloud/spring-cloud-function/blob/main/docs/src/main/images/ce.png?raw=true)

That’s pretty much it for now.

Now, for those of you who are familiar with a *Message* - one of the core [Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com/patterns/messaging/Message.html) - and its definition in [Spring Messaging](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/messaging/Message.html), you may say: This looks very familiar! And rightfully so.

![](https://github.com/spring-cloud/spring-cloud-function/blob/main/docs/src/main/images/message.png?raw=true)

Just like Cloud Event, Message defines a canonical and platform-independent data structure to be exchanged across systems and platforms in a uniform way. This structure is very simple. It encapsulates some payload as a `payload` field and metadata as `headers` (key/value structure).

Why is this important? As with any other technology, providing integration for Cloud Events in Spring is really a question of the effort necessary to realize its concepts within the confines of the well-known and familiar (to its users) Spring idioms and abstractions. And that is why [Message](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/messaging/Message.html) comes to mind. Given its near-perfect match to the structure defined by the Cloud Event specification, "Can [Message](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/messaging/Message.html) be the appropriate abstraction in Spring to represent Cloud Event?" Because, if the answer is "yes", tens of thousands frameworks and application that currently rely on Spring Messaging can automatically support Cloud Event use cases, which means that users of such frameworks as well as frameworks themselves would be able to recognize incoming Cloud Event instances as well as create them, all within the confines of the specification-defined protocol details, such as *attribute prefixes*, *type system* and others.

#### [](#functional--non-functional-boilerplate)Functional & Non-Functional (boilerplate)

We also need to look at some of the typical Cloud Event usage patterns. We do that to isolate what we call *functional* vs. *non-functional* (boilerplate) aspects. So let's describe some of them:

-   Produce something and encapsulate it into a Cloud Event
-   Consume something that may have originated from a Cloud Event
-   Consume the actual Cloud Event (different from above, since it implies consuming the entire event)
-   Route and filter based on Cloud Event attributes

This list is a small subset of some of the typical usage patterns, but it helps illustrate the problem domain. It also helps us to begin understanding and isolating *functional* versus *non-functional* aspects. What is also interesting is that most of the described patterns are the examples of non-functional aspects, something that a seasoned Spring user would expect to be handled by the framework. For example, while it is expected from the user to "produce something" (functional), the "encapsulate it into a Cloud Event" part should be handled by the framework (non-functional). The same principle applies when consuming Cloud Event. While vaguely stated, it generally implies that a user may only care about the data portion of the Cloud Event, most likely expecting it in the form of a domain-specific object that the framework should extract, convert and serve. All of these are, once again, examples of non-functional aspects. Then there is the question of Cloud Event attributes and their prefixes (e.g., `ce_` vs. `ce-` etc.) which effectively describe the origin or the destination of the event, something one would expect the framework to handle as well, especially given that the implementer of the functionality may not even be aware of the origin or the destination of the event.

#### [](#spring)Spring

Spring has been successfully supporting transformation, type conversion, routing, filtering, and many more messaging patterns (most of which are described by [Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com)) for over a decade through Message-based frameworks with tens of thousands of user applications running in production. And how can we forget the infrastructure-type concerns, such as connectivity, session and transaction management, sending and receiving, retries, error handling, recovery, and so on? In Spring, our general motto is ***We try to take care of non-functional (boilerplate) concerns, leaving you with only the functional (business logic) concerns***. Thus, it is always important for us to distinguish the two in the context of a given integration and outsource as much as we can to the framework. We also expose utilities, libraries, and configuration options that let you influence certain non-functional concerns, as doing so may still be required for a variety of reasons.

So, given that, what would a typical Spring application that supports Cloud Events look like, especially in the era of [Spring Boot](https://spring.io/projects/spring-boot)?

Here is an example of an application that receives a Cloud Event as an HTTP request and produces a Cloud Event as an HTTP response:

```java
Copy@SpringBootApplication
public static class SampleApplication
  public static void main(String[] args) throws Exception {
    SpringApplication.run(SampleApplication.class, args);
  }

  @Bean
  Function<Person, Employee> hire() {
	return person -> {
            Employee employee = ...
            return employee;
        };
  }
}
```

And here is an example of an application that receives a Cloud Event from Apache Kafka and sends it to a RabbitMQ messaging broker:

```java
Copy@SpringBootApplication
public static class SampleApplication
  public static void main(String[] args) throws Exception {
    SpringApplication.run(SampleApplication.class, args);
  }

  @Bean
  Function<Person, Employee> hire() {
	return person -> {
            Employee employee = ...
            return employee;
        };
  }
}
```

We omitted the implementation details of the functions, since they have no relevance to the topic. The framework does not really care what you do. It cares only about what you expect -- *input* -- and what you produce -- *output* -- and that information is available from the function signature.

However, I am certain that is not what is on your mind, as you probably wonder why the two applications that I have presented as being different are actually identical? And where does it say that one application is a REST endpoint while another is a message handler? Well, to answer those questions, we need to know the context of the execution, which comes from Spring Boot auto-configurations that are available to your application classpath. So, for example, to make the description of the first application true, you'll need the `spring-cloud-function-web` dependency on your classpath, which brings all the necessary components and additional auto-configurations needed to expose your function as a REST endpoint. As for the second, we can simply fall back on the [extensive library of binders](https://spring.io/projects/spring-cloud-stream) we already provide for Apache Kafka, AMQP, Solace, HTTP, AWS, Google and more. These binders and related auto-configurations will turn the example code into a message handler.

#### [](#message)Message

Message is at the center of this enablement, the one canonical structure that all moving parts in Spring understand. It is one structure that can clearly communicate intentions and expectations. *Where did it arrive from? Where will it go? Who sent it? What are the contents? Does it represent a Cloud Event? If so, is it in binary-mode or structured?* The list is endless, but the one constant is that Message as a structure and as a concept is well positioned to answer these questions. With that in mind, Cloud Event becomes another kind of Message. The Spring Framework can handle it as it would any other Message and free you to think about your business logic rather than the details of the plumbing.

#### [](#summary)Summary

So, ***[Message](https://www.enterpriseintegrationpatterns.com/patterns/messaging/Message.html) *is* not only an adequate structure to represent a Cloud Event, it is also the right abstraction to handle Cloud Event use cases in Spring***. I hope that is clear, and with the upcoming Cloud Event support for Message, we are on the path of providing Cloud Events support for any application that relies on Spring Messaging.

In the [follow-up post](https://spring.io/blog/2020/12/23/cloud-events-and-spring-part-2), we will cover the technical details of the upcoming Cloud Event support within several Spring frameworks as well Cloud Event integration with Spring using [Cloud Event Java SDK](https://github.com/cloudevents/sdk-java). You can also start looking at some of the samples now:

-   [Spring Cloud Function/Spring Cloud Stream](https://github.com/spring-cloud/spring-cloud-function/tree/master/spring-cloud-function-samples/function-sample-cloudevent)
-   [KNative](https://github.com/dsyer/knative-docs/tree/cloudevents-spring/docs/serving/samples/cloudevents/cloudevents-spring)
-   [Spring reactive via Java SDK](https://github.com/cloudevents/sdk-java/tree/master/examples/spring-reactive)