---
title: Spring Integration 4.1 RC1 Released
source: https://spring.io/blog/2014/10/27/spring-integration-4-1-rc1-released
scraped: 2026-02-23T22:08:36.146Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  October 27, 2014 | 1 Comment
---

# Spring Integration 4.1 RC1 Released

_Releases | Artem Bilan |  October 27, 2014 | 1 Comment_

Dear Spring community,

We are pleased to announce that the Spring Integration 4.1 Release Candidate is available. Please use the [Milestone Repository](http://repo.springsource.org/milestone) with Maven or Gradle, or download a [distribution archive](http://repo.spring.io/milestone/org/springframework/integration/spring-integration/4.1.0.RC1), to give it a spin.

The release includes many new features and improvements, as well as a number of bug fixes. The GA release is planned in early November.

First of all, thank you all who provided feedback for the [4.1 Milestone 1](https://spring.io/blog/2014/09/05/spring-integration-4-1-milestone-1-available) and submitted reports (bugs or new features). A special thanks to those who provided contribution via Pull Requests. Here is a summary of major changes since the milestone:

**Web Sockets support**

This feature was introduced in 4.1 Milestone 1, but several issues have been resolved, and we have now provided a couple of samples to better understand how Web Sockets can be used in Spring Integration applications: [Basic](https://github.com/spring-projects/spring-integration-samples/tree/master/basic/web-sockets) and [STOMP Chat](https://github.com/spring-projects/spring-integration-samples/tree/master/applications/stomp-chat).

**JDK8 Optional<?> consistent handling**

If you are using Java 8, you'll be able to use the `Optional<?>` container for service method arguments. For example:

```java
Copypublic void optionals(@Payload("@myConvert.conv(payload)") Optional<Bar> payload,
        @Header(value="foo") Optional<String> header)
```

In this case, if `@myConvert.conv(payload)` returns `null`, the `payload` variable will contain an `Optional.empty()`. The same thing for `header` variables - if there is no `foo` header in the request `Message<?>`. This can be used as an alternative to the `required` attribute on a `@Header` annotation.

**Routing Slip pattern**

The [Routing Slip](http://www.enterpriseintegrationpatterns.com/RoutingTable.html) pattern is now supported. Rather than a simple `static list of channel names`, we have introduced the `RoutingSlipRouteStrategy`, which provides dynamic runtime routing based on the request `Message<?>` and `reply object`. SpEL is supported too:

```xml
Copy<header-enricher input-channel="input" output-channel="process">
	<routing-slip value="channel1; request.headers[myRoutingSlipChannel];
	                        routingSlipRoutingStrategy;"/>
</header-enricher>
```

This pattern is useful in complex, dynamic, cases when it can become difficult to configure multiple routers to determine message flow. With this enhancement, when a message arrives at an endpoint that has no `output-channel`, the routing slip is consulted to determine the next channel to which the message will be sent. When the routing slip is exhausted, normal `replyChannel` processing resumes.

**Idempotent Receiver pattern**

With this release we have implemented the [Idempotent Receiver](http://www.enterpriseintegrationpatterns.com/IdempotentReceiver.html) as a first class feature. Previously, users would have to implement this pattern, by using a custom `MessageSelector` in a `<filter/>`, for example. The framework now supports this capability as an `Advice` component that can be applied to any consuming endpoint:

```xml
Copy<idempotent-receiver endpoint="endpoint1, foo*"
				     metadata-store="store"
					 discard-channel="duplicates"
					 key-expression="payload.invoiceNumber"/>
```

This creates an AOP `IdempotentReceiverInterceptor` which is applied to the `MessageHandler#handleMessage` within endpoints where the `id` matches one of the provided `endpoint` patterns.

If the `discard-channel` is omitted, a duplicate message is still sent to the message handler, but it will contain a `duplicateMessage` header, allowing user code to take further action.

For JavaConfig, the `@IdempotentReceiver` annotation is provided, however the `IdempotentReceiverInterceptor` `@Bean` must be configured too:

```java
Copy@Bean
public IdempotentReceiverInterceptor idempotentReceiverInterceptor() {
   return new IdempotentReceiverInterceptor(new MetadataStoreSelector(m ->
                                                    m.getPayload().toString()));
}

@Bean
@ServiceActivator(inputChannel = "input", outputChannel = "output")
@IdempotentReceiver("idempotentReceiverInterceptor")
public MessageHandler myService() {
	....
}
```

For more information, please, read `IdempotentReceiverInterceptor` JavaDocs.

**Scatter-Gather pattern**

The [Scatter-Gather](http://www.enterpriseintegrationpatterns.com/BroadcastAggregate.html) Enterprise Integration Pattern is now provided:

```xml
Copy<!--Auction scenario-->
<scatter-gather input-channel="inputAuction" output-channel="output"
                scatter-channel="auctionChannel">
	<gatherer release-strategy-expression="^[payload gt 5] != null or size() == 3"/>
</scatter-gather>

<!--Distribution scenario-->
<scatter-gather input-channel="inputDistribution" output-channel="output"
                gather-channel="gatherChannel">
	<scatterer apply-sequence="true">
		<recipient channel="distribution1Channel"/>
		<recipient channel="distribution2Channel"/>
		<recipient channel="distribution3Channel"/>
	</scatterer>
	<gatherer release-strategy-expression="^[payload gt 5] != null or size() == 3"/>
</scatter-gather>
```

It is a compound endpoint, which combines `publish-subscribe` logic and an `aggregation` function. Of course, it could previously be implemented as an integration flow using the existing `publish-subscribe-channel`, or `recipient-list-router`, together with an `aggregator` component, but this new feature provides for a cleaner implementation of scenarios such as `best quote`.

**Redis Queue Gateways**

A pair of `request-reply` (inbound and outbound) gateway components based on `Redis List`s have been added to the `Redis` module:

```xml
Copy<int-redis:queue-outbound-gateway request-channel="sendChannel" queue="foo"/>

<int-redis:queue-inbound-gateway request-channel="requestChannel" queue="foo"/>
```

**Reactor's PersistentQueue**

The `QueueChannel` has been changed to allow inject any `Queue<?>` implementation. This was done to allow the use of the [Chronicle-Queue](https://github.com/OpenHFT/Chronicle-Queue) implementation in the \[Reactor\] ([http://reactor.github.io/reactor/](http://reactor.github.io/reactor/)) project:

```java
Copy@Bean QueueChannel queueChannel() {
   return new QueueChannel(new PersistentQueueSpec<Message<?>>()
                           		.codec(new JavaSerializationCodec<>())
                           		.basePath("/usr/queuePath")
                           		.get());
}
```

**Skipping Polls**

When using polling endpoints, it is sometimes necessary to "skip" polls, perhaps because some downstream condition might cause a failure or, say, a task executor pool has no available threads. This release adds the `PollSkipAdvice` that can be inserted in the poller's advice chain, with the skip logic based on user-supplied code.

**Notes**

1.  Spring Integration 4.1 requires Spring Framework 4.1
2.  While JDK8 is now required to **build** Spring Integration, the framework remains compatible with Java 6 at runtime.
3.  We expect to announce the availability of the [Spring Integration Java DSL](https://github.com/spring-projects/spring-integration-extensions/tree/master/spring-integration-java-dsl) release candidate later this week.

**Conclusion**

See the [Release Notes](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=10121&version=14521) for this release and the [Project Page](http://projects.spring.io/spring-integration/) for more information. For a complete list of "What's new" in the 4.1 release, see the [reference documentation](http://docs.spring.io/spring-integration/docs/4.1.0.RC1/reference/html/whats-new.html). Users upgrading from earlier releases should consult the various [migration guides](https://github.com/spring-projects/spring-integration/wiki).

As always, we very much welcome [contributions](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.md).