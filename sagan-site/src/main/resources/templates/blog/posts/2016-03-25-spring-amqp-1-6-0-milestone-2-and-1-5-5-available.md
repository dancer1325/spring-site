---
title: Spring AMQP 1.6.0 Milestone 2 (and 1.5.5) Available
source: https://spring.io/blog/2016/03/25/spring-amqp-1-6-0-milestone-2-and-1-5-5-available
scraped: 2026-02-23T19:22:03.859Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gary Russell |  March 25, 2016 | 0 Comments
---

# Spring AMQP 1.6.0 Milestone 2 (and 1.5.5) Available

_Releases | Gary Russell |  March 25, 2016 | 0 Comments_

We are pleased to announce the second milestone of Spring AMQP 1.6 is available.

Additions since the first milestone include:

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
    

The release candidate should be available near the end of April with the GA release in early May.

For a complete list of new features in 1.6, see the [What's new?](http://docs.spring.io/spring-amqp/docs/1.6.0.M2/reference/html/_introduction.html#_changes_in_1_6_since_1_5) as well as the [JIRA Release Notes for this milestone](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10450&version=15489) and [the previous](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10450&version=15297).

Visit the [project page](http://projects.spring.io/spring-amqp/) for links to downloads, documentation etc.

In addition, the 1.5.5.RELEASE is available with a few [bug fixes](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10450&version=15493). It also includes the white list for deserialization mentioned above. Existing users are encouraged to upgrade to this version.

Upcoming Conferences

Be sure to register for [Spring I/O conference](http://www.springio.net/) where you can learn about the latest and greatest Spring has to offer.

If you are interested in attending [SpringOne Platform](http://springoneplatform.io/) make sure you register before the early bird discount ends to save big!