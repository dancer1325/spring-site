---
title: Spring Integration 4.0 Release Candidate Available
source: https://spring.io/blog/2014/04/15/spring-integration-4-0-release-candidate-available
scraped: 2026-02-24T07:26:03.012Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  April 15, 2014 | 0 Comments
---

# Spring Integration 4.0 Release Candidate Available

_Releases | Artem Bilan |  April 15, 2014 | 0 Comments_

We are pleased to announce that the Spring Integration 4.0 release candidate (4.0.0.RC1) is now available. Please use the [Milestone Repository](http://repo.springsource.org/milestone) with maven or gradle, download a [distribution archive](http://repo.spring.io/milestone/org/springframework/integration/spring-integration/4.0.0.RC1), or see the project [home page](http://projects.spring.io/spring-integration) for links to the updated documentation, and Maven/Gradle configuration details.

The release includes several bug fixes, some new features and further improvements with the GA release due near the end of April.

Here is a summary of major changes since the [last milestone](https://spring.io/blog/2014/03/31/spring-integration-3-0-2-and-4-0-milestone-4-released)

**@Poller and @InboundChannelAdapter**

Building on the extensive improvements to annotation support announced in [M4 Release](https://spring.io/blog/2014/03/31/spring-integration-3-0-2-and-4-0-milestone-4-released), the new `@Poller` annotation has been added to each of the Messaging Annotations (`@ServiceActivator`, `@Router` etc.). The `@Poller` annotation attribute enables configuration of `poller` options for the `inputChannel` of the Messaging Annotation. This allows annotated endpoints to be `PollingConsumer`s. Previously, annotated endpoints could only use `SubscribableChannel`s and be event-driven.

This also provided the ability for us to introduce the `@InboundChannelAdapter` method Messaging Annotation. Now it can be configured without using XML, in a Spring Boot application, for example:

```java
Copy@EnableAutoConfiguration  // enables integration infrastructure
@MessageEndpoint          // makes this class as an integration component
@PropertySource("classpath:integration.properties") // property-placeholder configuration
public class Integration {

    public static void main(String[] args) throws Exception {
        ConfigurableApplicationContext ctx = SpringApplication.run(Integration.class, args);
        Thread.sleep(10000);
        ctx.close();
    }

	@InboundChannelAdapter(value = "countChannel",
         poller = @Poller(fixedDelay = "${poller.interval}", maxMessagesPerPoll = "1"))
	public Integer count() {
		return this.counter.incrementAndGet();
	}

 	@ServiceActivator(inputChannel="countChannel")
    public void foo(Integer payload) {
        System.out.println(payload);
    }
        
}
```

This is equavalent to the following XML configuration:

```xml
Copy<int:inbound-channel-adapter channel="countChannel" ref="counter" method="incrementAndGet">
	<int:poller fixed-delay="${poller.interval}" max-messages-per-poll="1"/>
</int:inbound-channel-adapter>

<int-stream:stdout-channel-adapter id="countChannel"/>
```

**Distributed MetadataStore and LockRegistry**

The `MetadataStore` is designed to store various types of generic meta-data (e.g., published date of the last feed entry that has been processed) to help components, such as the `Feed Adapter`, to maintain state, and avoid duplicates. For a distributed environment, and multi-instance applications, and to have persistent metadata state to be maintained across application restarts, the `RedisMetadataStore` and `GemfireMetadataStore` have been introduced with this release.

For example, a `<int-file:inbound-channel-adapter>` can be configured with a `FileSystemPersistentAcceptOnceFileListFilter`, which can be configured to use one of these distributed `MetadataStore`s. This allows `filter keys` to be shared across multiple application instances, or when a network file share is being used by multiple servers.

For similar distributed (cross-JVM) environments, when only one instance can have access to the object (e.g. `AggregatorHandler` for `MessageGroup` on message arrival), distributed `LockRegistry` implementations have been introduced - `RedisLockRegistry` and `GemfireLockRegistry`.

**Aggregator automatic group release**

The `<aggregator>` and `<resequencer>` endpoints can now have a `group-timeout` or `group-timeout-expression` option to allow these Correlating Endpoints to take action after a group has been idle for some time. Previously, you had to configure an external `MessagGroupStoreReaper` for this purpose. The `groupTimeout` property schedules the `MessageGroup` to be forced complete some time after a `Message` arrives where that event does not cause the `ReleaseStrategy` to release the group.

Perhaps more interesting from this perspective, is the `group-timeout-expression`. It allows dynamic determination of the `groupTimeout` value at runtime based on the state of the group at the time the message arrives. For example:

```xml
Copy<aggregator input-channel="input" output-channel="output" discard-channel="discard"
        send-partial-result-on-expiry="true"
        group-timeout-expression="size() ge 2 ? 1000 : -1"
        release-strategy="someReleaseStrategy"/>
```

In this case, the group will never timeout if there is only 1 messdage in the group, but the `Aggregator` will send the partial `MessageGroup` automatically after being idle for 1 second, as long as the group contains at least 2 messages.

**Priority Channel and Message Store**

With this release, you can configure a `<priority-queue>` using an external `MessageStore`. For this purpose we have introduced the new `PriorityCapableChannelMessageStore` strategy and provided implementations for JDBC, Redis and MongoDB. This now allows message persistence in priority channels.

**Twitter Search Gateway**

The existing twitter `<search-inbound-channel-adapter>` only allows a fixed query to be executed on each poll. For more flexibility, the `<int-twitter:search-outbound-gateway/>` has been added as a component to perform arbitrary request/reply Twitter Search operations, based on a `search-args-expression`. The default is `payload`, which can be a search String or an instance of `org.springframework.social.twitter.api.SearchParameters`. However this attribute can be configred in SpEL as:

```xml
Copy"new SearchParameters(payload).count(5).sinceId(headers.sinceId)"
```

or:

```xml
Copy"{payload, 30}"
```

as a SpEL inline list - in this case the query string and page size, or...

```xml
Copy"{payload, headers.pageSize, headers.sinceId, headers.maxId}"
```

The four arguments of `org.springframework.social.twitter.api.SearchOperations#search`. For more information see [Spring Social Twitter](http://docs.spring.io/spring-social-twitter/docs/current/reference/html/apis.html#twitter-search) documentation.

**Wrapping up**

For a complete list of changes refer to the [release notes](https://jira.spring.io/secure/ReleaseNote.jspa?version=14499&projectId=10121), [What's New](http://docs.spring.io/spring-integration/docs/4.0.0.RC1/reference/html/whats-new.html) and [Java Docs](http://docs.spring.io/spring-integration/docs/4.0.0.RC1/api) of the new components.

We look forward to your comments and feedback ([Spring Forum](http://forum.spring.io/forum/spring-projects/integration), [StackOverflow](http://stackoverflow.com) (`spring-integration` tag), [Spring JIRA](https://jira.spring.io/browse/INT)) as soon as possible and report issues you find before we GA towards the end of the month.

**SpringOne 2GX 2014 is around the corner**

Book your place at [SpringOne in Dallas, TX](http://www.springone2gx.com/) for Sept 8-11 soon. It's simply the best opportunity to find out first hand all that's going on and to provide direct feedback. Expect a number of significant new announcements this year. We are anticipating that several in-depth Spring-Integration sessions will be presented.