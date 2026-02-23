---
title: Spring AMQP (for Java) 1.4 Milestone 1 Available
source: http://spring.io/blog/2014/09/05/spring-amqp-for-java-1-4-milestone-1-available
scraped: 2026-02-23T22:15:37.540Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gary Russell |  September 05, 2014 | 0 Comments
---

# Spring AMQP (for Java) 1.4 Milestone 1 Available

_Releases | Gary Russell |  September 05, 2014 | 0 Comments_

We are pleased to announce that the first milestone of Spring AMQP 1.4 is now available.

##Key Features

-   Annotation-based message listeners (`@RabbitListener`), enabled with either `@EnableRabbit` or `<rabbit:annotation-driven />` (see below for an example).
-   `RabbitMessagingTemplate` allowing interaction with `RabbitMQ` using `spring-messaging` `Message` objects.
-   A new factory bean to ease the configuration of SSL with the `RabbitConnectionFactory`
-   Log4j Appender now supports configuration of message persistence.

Here is a simple example for a POJO service using the new annotations:

```java
Copypublic static class MyService {

	@RabbitListener(queues = "fooQ")
	public String capitalize(String foo) {
		return foo.toUpperCase();
	}

}

@Configuration
@EnableRabbit
public static class EnableRabbitConfig {

	@Bean
	public SimpleRabbitListenerContainerFactory rabbitListenerContainerFactory() {
		SimpleRabbitListenerContainerFactory factory = new SimpleRabbitListenerContainerFactory();
		factory.setConnectionFactory(rabbitConnectionFactory());
		return factory;
	}

	@Bean
	public MyService myService() {
		return new MyService();
	}

	// Rabbit infrastructure setup

	@Bean
	public ConnectionFactory rabbitConnectionFactory() {
		CachingConnectionFactory connectionFactory = new CachingConnectionFactory();
		connectionFactory.setHost("localhost");
		return connectionFactory;
	}

}
```

See the [Release Notes](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=10450&version=14522) and the [Project Page](http://projects.spring.io/spring-amqp/) for more information.

A minor [1.3.6 Maintenance Release](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=10450&version=14640) is also available.