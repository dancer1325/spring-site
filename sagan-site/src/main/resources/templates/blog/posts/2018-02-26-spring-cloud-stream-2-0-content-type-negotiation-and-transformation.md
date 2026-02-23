---
title: Spring Cloud Stream 2.0 - content-type negotiation and transformation
source: https://spring.io/blog/2018/02/26/spring-cloud-stream-2-0-content-type-negotiation-and-transformation
scraped: 2026-02-23T16:08:02.161Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oleg Zhurakousky |  February 26, 2018 | 0 Comments
---

# Spring Cloud Stream 2.0 - content-type negotiation and transformation

_Engineering | Oleg Zhurakousky |  February 26, 2018 | 0 Comments_

> *This is the first blog in a series of pre-release blogs in preparation for Spring Cloud Stream 2.0.0.RELEASE.*

### [](#preface)Preface

Spring Cloud Stream 2.0 includes a complete revamp of content-type negotiation for the *channel-based binders* to address performance, flexibility and most importantly consistency. The following blog touches on some of the key points around what has been done, what to expect and how it may help you.

#### [](#introduction)Introduction

Data transformation is one of the core features of any *message-driven* microservice architecture. In Spring Cloud Stream, such data is represented as a Spring `Message`.

At various points of the message flow (a stream), a message may have to be transformed to a desired shape/size before reaching its destination. This is required for two reasons:

*1\. To convert the contents of the incoming message ***from*** the wire format to match the signature of the application-provided handler. 2. To convert the contents of the outgoing message ***to*** the signature of the next handler (in the event there is some internal flow) or back to the wire format.*

The wire format is typically `byte[]` and is governed by the binder implementation.

In Spring Cloud Stream Message, transformation is accomplished with a `org.springframework.messaging.converter.MessageConverter` abstraction.

The following sequence of steps shows a typical message flow and the transformation(s) a `Message` goes through described using a `Processor` contract of Spring Cloud Stream essentially covering requirements behind both an *inbound* and an *outbound* content transformations.

*1\. Receive a Spring `Message` in wire format from the binder 2. Ensure that an *input* `contentType` header is set in the Spring `Message` 3. Convert the Spring `Message` *from* the wire format to the signature of the application supplied `MessageHandler` 4. Invoke the application supplied `MessageHandler` 5. Convert the return value of the `MessageHandler` back to the Spring `Message` 6. Ensure that an *output* `contentType` header is set in Spring `Message` 7. Convert the Spring `Message` back *to* the wire format* 8. Send the Spring `Message` in the wire format back to the binder

While the above provides a complete summary of major state changes in the typical message flow, the devil is always in the details, so let's look at each step more closely.

#### [](#details)Details

1.  The incoming message is received by the binder and is sent to the binder's input channel (e.g., `Processor.INPUT'`) in the wire format.
2.  The internal input channel is pre-configured with a channel interceptor to inject the incoming message with the `contentType` header if and only if the incoming message does not already have a `contentType` header set. This is required to ensure that, if needed, downstream message conversion can take `contentType` into consideration (more on this later). The injected `contentType` comes from the *content-type* set per individual destination binding, with `application/json` being the default content type.

*For example, 'spring.cloud.stream.bindings.myInput.content-type=text/plain' sets the content type to 'text/plain' for the 'myInput' (incoming) destination binding. This means that every incoming message is injected with the 'contentType=text/plain' header unless the message already contains a 'contentType' header.* In other words, header-provided `contentType` supersedes the one set per-binding. 3. Now, with the help of `HandlerMethodArgumentResolvers` and preconfigured or user-provided `MessageConverters`, the incoming message is converted to the signature of the application-provided `MessageHandler` (e.g.,`public Text process(Foo foo){..}`). Such handler methods are typically annotated with one of `@StreamListener`, `@ServiceActivator`, `@Transformer`, and others. This is where `contentType` may be required by some of the converters, and action in step 2 guarantees that such message always has it available via its `contentType` header. Of course, if such method takes `Message` as its input argument, no conversion is performed. 4. A handler method is invoked and, upon success, the process of creating an outgoing message from the return value of the handler method begins (assumes non-void handler method). 5. The value returned by the handler method is converted back to the Spring `Message` if and only if the return value is not already a `Message`. This means that a new Spring `Message` is created with the payload being the handler's return value. The incoming message's headers are copied into a new outgoing message, stripping away any headers identified by the *'SpringIntegrationProperties.messageHandlerNotPropagatedHeaders'*. By default, there is only one header set there - `contentType`. This means that the new outgoing message is created with no `contentType` header set. This is to ensure that the `contentType` can evolve with application-level transformation of the actual data. *NOTE: The `contentType` is only stripped if the handler method returned a non-Message.* The message is sent to the binder's output channel. 6. Similar to the binder's input channel, the binder's output channel (e.g., `Processor.OUTPUT`) is also pre-configured with channel interceptor. This is where we optionally inject a `contentType` header into an outgoing message in preparation for transforming the content of the outgoing message back to the wire format. Let's look at the only two possible scenarios: a. ***The outgoing Message has a `contentType` header set***. Since the header-set `contentType` takes precedence over any other `contentType`, no `contentType` injection will be performed and the value of the header-set `contentType` will be used during the conversion back to the wire format. b. ***The outgoing Message doesn't have a `contentType` header set***. The binding `contentType` (default or provided) will be injected as the header into the outgoing message and used during the conversion back to the wire format. 7. The message is converted to the wire format using one of the available `MessageConverters`. 8. The converted message is sent back to the binder retaining the injected or existing `contentType` header. In other words, the outgoing message will ***always*** have `contentType` header present.

#### [](#customization)Customization

The above covers the default out-of-the-box behavior. But that may not be enough, so *can we and if so how can we customize?*. The goal of the content-type negotiation improvements that went into 2.0 was not only to answer these type of questions but to ensure that the answer is consistent - *the 'MessageConverters' used by the *inbound* and *outbound* channel interceptors to convert to/from wire format are the same 'MessageConverters' used by the 'HandlerMethodArgumentResolvers' to convert to/from strong types*.

To add custom a *MessageConverter* simply create an implementation of the `org.springframework.messaging.converter.MessageConverter` and configure it as a `@Bean` and also annotate the bean as `@StreamMessageConverter` and it will be added as the first converter in the stack of existing *MessageConverters* essentially taking precedence over the existing *MessageConverters*.

### [](#summary)Summary

Hopefully by now it's fairly clear that *any and all* content-type transformations are done by the `MessageConverters`. While `MessageConverters` differ in their implementation most utilize both `contentType` header as well as the target type (`targetClass`) which allows them to perform intra-type conversions as well as to/from wire format conversions. Currently there is a set of pre-configured `MessageConverters` to support majority of the use cases, so for most typical data types (i.e., json, text etc) nothing really needs to be done by the end user. Yet it's worth knowing how things work now vs. how to customize - *customize the existing and/or bring new `MessageConverter` implementation*.

### [](#conclusion)Conclusion

We're currently in the process of updating documentation where we'll be including more details and samples around this and many other subjects relevant to the work that went into 2.0, while the goal of these pre-release blogs is to primarily raise the awareness, facilitate the "give it a try" and solicit the feedback. With that said; The Spring Cloud Stream 2.0.0.RC1 is available [here](http://cloud.spring.io/spring-cloud-stream/)

We encourage you to provide feedback using one of the following facilities:

-   [Project's GitHub Issues](https://github.com/spring-cloud/spring-cloud-stream/issues)
-   [Stack Overflow channel](https://stackoverflow.com/tags/spring-cloud-stream)
-   [Gitter channel](https://gitter.im/spring-cloud/spring-cloud-stream)

Enjoy!