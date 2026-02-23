---
title: Spring Integration Hazelcast Support 1.0 Milestone 1 is available
source: https://spring.io/blog/2015/04/20/spring-integration-hazelcast-support-1-0-milestone-1-is-available
scraped: 2026-02-23T16:27:28.788Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  April 20, 2015 | 0 Comments
---

# Spring Integration Hazelcast Support 1.0 Milestone 1 is available

_Releases | Artem Bilan |  April 20, 2015 | 0 Comments_

Dear Spring community,

We are pleased to announce the Milestone 1 for the Spring Integration Hazelcast Support project. Use the [Milestone Repository](https://repo.spring.io/milestone/) with Maven or Gradle to try it in early access.

```
Copycompile "org.springframework.integration:spring-integration-hazelcast:1.0.0.M1"
```

First of all, special thanks to [Eren Avşaroğulları](http://java.dzone.com/users/erenavsarogullari-0), who initiated the project and is a responsive and energetic contributor. Please, don't miss his [talk](https://2015.event.springone2gx.com/presenters/eren_avsarogullari.html) with us on SpringOne this year!

## [](#overview)Overview

Spring Integration implements well-known [Enterprise Integration Patterns](http://www.eaipatterns.com/) and provides lightweight messaging within Spring-based applications and supports integration with external systems via declarative adapters. Spring Integration's primary goal is to provide a simple model for building enterprise integration solutions while maintaining the separation of concerns that is essential for producing maintainable, testable code.

From other side [Hazelcast](http://hazelcast.com/products/hazelcast/) is the leading Open Source In-Memory Data Grid written in Java; it allows the distribution of data and computation across servers, clusters and geographies, and to manage very large data sets or high data ingest rates.

So, from my perspective it looks very cool to bring messaging to Hazelcast-based applications, as well as to have an easy way to distribute Spring Integration message flows via Hazelcast.

From here I'm sure this extension will have demand from the Community and will have active development and support according to the feedback received.

Let's revise what we suggest to you with this Milestone!

## [](#just-in-place-features)Just in place features

For those who don't want wait for the finished project, or are already using Spring Integration and Hazelcast in their application or want to consider doing that, I'm glad to represent features which work out-of-the-box even before this milestone release.

### [](#iqueue)IQueue

Thanks to so generic implementation of `QueueChannel` we already can have a distributed message channel with Hazelcast:

```java
Copy@Configuration
@EnableIntegration
public static class ContextConfiguration {

	@Bean
	public HazelcastInstance hazelcastInstance() {
		return Hazelcast.newHazelcastInstance(new Config());
	}

	@Bean
	public PollableChannel hazelcastQueueChannel() {
		return new QueueChannel(hazelcastInstance()
                                          .Message<?>>getQueue("siQueue"));
	}

}
```

Placing this config on several nodes in Hazelcast cluster of our application, we will have a *distributed* `QueueChannel` and only one node will be able to poll a single `Message` from this `IQueue`.

### [](#itopic)ITopic

An `ITopic` abstraction in Hazelcast has similar semantics to a `Topic` in JMS: all subscribers receive published messages. Using a bit of imagination we can utilize this mechanism as an out-of-the-box feature:

```java
Copy@Configuration
@EnableIntegration
public static class ContextConfiguration {

	@Bean
    public ITopic<Message<?>> siTopic() {
    	return hazelcastInstance().getTopic("siTopic");
    }
    
    @Bean
    public MessageChannel publishToHazelcastTopicChannel(
                                    ITopic<Message<?>> siTopic) {
    	return new FixedSubscriberChannel(siTopic::publish);
    }

    @Bean
    public MessageChannel fromHazelcastTopicChannel() {
	return new DirectChannel();
    }

    @PostConstruct
    public void init() {
	siTopic().addMessageListener(m -> 
                     fromHazelcastTopicChannel().send(m.getMessageObject()));
    }

}
```

The `FixedSubscriberChannel` is an optimized variant of `DirectChannel`, which requires a `MessageHandler` on initialization. Since `MessageHandler` is a *functional* interface we can simply provide a Lambda for the `handleMessage` method. When a message is sent to `publishToHazelcastTopicChannel` it is just published to the Hazelcast `ITopic`. The `com.hazelcast.core.MessageListener` is a *functional* interface, too, hence we can provide a Lambda to the `ITopic#addMessageListener`. So, publishing the whole `Message<?>` to the `ITopic` allows us to receive it on the subscriber as is and send to the `MessageChannel` for processing on all subscribed nodes in Hazelcast cluster.

### [](#iexecutorservice)IExecutorService

Using the Hazelcast `ExecutorService` support we can configure an `ExecutorChannel` to accept and perform only one message at a time throughout the whole cluster. I call this *cluster-wide singleton*:

```java
Copy@Configuration
@EnableIntegration
public static class ContextConfiguration {

	@Bean
	public HazelcastInstance hazelcastInstance() {
		return Hazelcast.newHazelcastInstance(new Config()
				.addExecutorConfig(new ExecutorConfig()
						.setName("singletonExecutor")
						.setPoolSize(1)));
	}
	@Bean
	public MessageChannel hazelcastSingletonExecutorChannel() {
		return new ExecutorChannel(hazelcastInstance()
                                       .getExecutorService("singletonExecutor"));
	}
	
}
```

Now let's talk about the features that are already available in this first milestone of the Spring Integration Hazelcast extension.

## [](#hazelcast-inbound-channel-adapters)Hazelcast Inbound Channel Adapters

With Spring Integration Hazelcast Support we provide these components for *inbound* data from Hazelcast:

```xml
Copy<int-hazelcast:inbound-channel-adapter channel="multiMapChannel" 
                cache="multiMap" 
                cache-events="ADDED, REMOVED, CLEAR_ALL" /> 
                              
<int-hazelcast:cq-inbound-channel-adapter 
                channel="cqMapChannel" 
                cache="cqMap" 
                cache-events="UPDATED, REMOVED" 
                predicate="name=TestName AND surname=TestSurname"
                include-value="true"
                cache-listening-policy="SINGLE" /> 
                
<int-hazelcast:ds-inbound-channel-adapter  
                channel="dsMapChannel" 
                cache="dsMap"
                iteration-type="ENTRY" 
                distributed-sql="active=false OR age >= 25 OR name = 'TestName'">
    <int:poller fixed-delay="100"/>
</int-hazelcast:ds-inbound-channel-adapter>
```

Please, refer to the Spring Integration Hazelcast [Project Page](https://github.com/spring-projects/spring-integration-extensions/tree/master/spring-integration-hazelcast) for more information about their purpose and configuration options.

The use of these should be obvious to those who are already familiar with [Spring Integration Gemfire](http://docs.spring.io/spring-integration/docs/latest-ga/reference/html/gemfire.html) support.

## [](#hazelcast-outbound-channel-adapter)Hazelcast Outbound Channel Adapter

Currently, we just provide only one generic *outbound* channel adapter to place the data into Hazelcast:

```xml
Copy<int-hazelcast:outbound-channel-adapter channel="listChannel" 
                     cache="distributedList" /> 

<bean id="distributedList" factory-bean="instance" factory-method="getList"> 
    <constructor-arg value="distributedList"/> 
</bean> 
```

See more information about this adapter on the project home page. We are going to make this component more flexible, before `RELEASE`, e.g. utilize the *publish* operation to the `ITopic` mentioned above, add runtime `distributedObject` resolution, for example via SpEL, allow to accept `MapEntry` as a `payload` of incoming message and others.

## [](#wrap-up)Wrap up

It's just a beginning of the road to RELEASE. We, with Eren, have several features in mind like `Hazelcast Distributed Execution Service Activator`, `Hazelcast Client Support`, `Hazelcast backed Subscribable Channel`, `HazelcastLockRegistry`, `Annotation Support` etc. and hope to have `1.0.0.RELEASE` just before the SpringOne conference in this September. In the meantime, don't hesitate to reach us via StackOverflow, JIRA and GitHub issues to share your thoughts and ideas!

[Project Page](https://github.com/spring-projects/spring-integration-extensions/tree/master/spring-integration-hazelcast) | [JIRA](https://jira.spring.io/browse/INTEXT) | [Issues](https://github.com/spring-projects/spring-integration-extensions/issues) | \[Contributions\] ([https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.md](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.md)) | [StackOverflow](http://stackoverflow.com) (`spring-integration` tag)