---
title: Spring AMQP 1.6.0 Release Candidate (and 1.5.6) Available
source: https://spring.io/blog/2016/05/06/spring-amqp-1-6-0-release-candidate-and-1-5-6-available
scraped: 2026-02-23T19:14:48.605Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gary Russell |  May 06, 2016 | 0 Comments
---

# Spring AMQP 1.6.0 Release Candidate (and 1.5.6) Available

_Releases | Gary Russell |  May 06, 2016 | 0 Comments_

We are pleased to announce that the Spring AMQP 1.6 release candidate (1.6.0.RC1) is now available in the [spring milestone repo](https://repo.spring.io/milestone).

The 1.5.6 maintenance release is also available with a [few bug fixes](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10450&version=15517).

Here is a summary of the 1.6.0 release contents, for more details, refer to the [what's new](http://docs.spring.io/spring-amqp/docs/1.6.0.RC1/reference/html/_introduction.html#whats-new) in the reference documentation as well as [the closed JIRA Issues for this release](https://jira.spring.io/issues/?jql=project%20%3D%20AMQP%20AND%20status%20%3D%20Closed%20AND%20fixVersion%20in%20%28%221.6%20M1%22%2C%20%221.6%20M2%22%2C%20%221.6%20RC1%22%29%20%20ORDER%20BY%20fixVersion%2C%20priority%20DESC).

-   A new jar `spring-rabbit-test` containing a test harness to help with testing `@RabbitListener` methods; see [the testing chapter](http://docs.spring.io/spring-amqp/docs/1.6.0.RC1/reference/html/_reference.html#testing).
    
-   Multiple `@RabbitListener` annotations on a method (when using Java 8) and the `@RabbitListeners` annotation (for pre-Java 8), each allowing the same method to be the listener method for multiple listener containers.
    
-   Full support for the [Delayed Message Exchange](https://www.rabbitmq.com/blog/2015/04/16/scheduling-messages-with-rabbitmq/) RabbitMQ plugin.
    
-   An `AsyncRabbitTemplate` returning `ListenableFuture<?>` for request/reply messaging.
    
-   An option to publish `ApplicationEvents` when listener containers go idle.
    
-   The caching connection factory now exposes cache statistics
    
-   `@RabbitListener` methods now communicate type information to the message converter for inbound messages. This means, for example, the `Jackson2JsonMessageConverter` no longer needs a custom class mapper when a message without type information in the headers is received (e.g. from a sender that is not a Spring AMQP app). Instead, the `@RabbitListener` method parameter type is used in the conversion. In addition, the `Method` and `bean` are also made available via message properties to custom converters.
    

```java
Copy@Bean
public SimpleRabbitListenerContainerFactory rabbitListenerContainerFactory(
		ConnectionFactory rabbitConnectionFactory) {
	SimpleRabbitListenerContainerFactory factory = 
             new SimpleRabbitListenerContainerFactory();
	factory.setConnectionFactory(rabbitConnectionFactory);
	factory.setMessageConverter(new Jackson2JsonMessageConverter());
	return factory;
}

public static class MyService {

	@RabbitListener(queues="foos")
	public void handleFoos(Foo foo) {
	    ...
	}

	@RabbitListener(queues="lists.of.bars")
	public void handleBarLists(List<Bar> bars) {
            ...
	}
}
```

-   `@RabbitListener` irrecoverable errors are now considered to be fatal by the default error handler, to avoid endless redelivery of such messages.
    
-   `@RabbitListener` `@SendTo` addresses (used when the inbound message has no `replyTo`) can now contain a `SpEL` expression evaluated at runtime against the input and output message.
    
-   When using java serialized messages, you can now specify a "white list" of allowable classes/packages for deserialization. This is recommended when receiving serialized objects from untrusted sources.
    
-   You can now declare 'internal' exchanges to which messages cannot be directly published.
    
-   The log appenders can now be configured with multiple broker addresses and client properties can be set.
    
-   `@QueueBinding` annotations now support arguments for queues, exchanges and bindings.
    

We expect to have the final release at the end of May.

Please download and try the release candidate so we can address any issues before GA. Next up (2017) is 2.0 which will may require Spring 5 and include some Reactive Streams effort.

We welcome any feedback, questions, or help, using the usual mechanisms:

[Project Page](http://projects.spring.io/spring-amqp/) | [JIRA](https://jira.spring.io/browse/AMQP) | [Contribution](https://github.com/spring-projects/spring-amqp/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-amqp)

Upcoming Conferences

Be sure to register for [Spring I/O conference](http://www.springio.net/) where you can learn about the latest and greatest Spring has to offer.

Also, [SpringOne Platform](http://springoneplatform.io/) is coming up soon!