---
title: Spring AMQP 1.4 RC1 Released
source: https://spring.io/blog/2014/10/23/spring-amqp-1-4-rc1-released
scraped: 2026-02-23T22:08:40.516Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  October 23, 2014 | 0 Comments
---

# Spring AMQP 1.4 RC1 Released

_Releases | Artem Bilan |  October 23, 2014 | 0 Comments_

We are pleased to announce the availability of the Release Candidate for Spring AMQP 1.4; the GA is planned to be released in early November.

First of all, thank you all who provided feedback for the [milestone 1.4 M1 version](https://spring.io/blog/2014/09/05/spring-amqp-for-java-1-4-milestone-1-available) and submitted reports (bugs or new features). Special thanks to [Stéphane Nicoll](https://spring.io/team/snicoll/), who had introduced annotation-based message listeners (`@RabbitListener`) and the new `RabbitMessagingTemplate`.

## [](#features-and-fixes-included-in-this-release-changes-since-the-milestone)Features and fixes included in this release (changes since the milestone)

-   With the annotation-based message listener you can use the `@SendTo` annotation to send the result of the method as a reply message (when there's no `replyTo` in the inbound message):

```java
Copy@RabbitListener(queues = "capitalize")
@SendTo("capitalize.reply")
public String capitalize(String s) {
	return s.toUpperCase();
}
```

(Annotation-basd listeners require Spring Framework 4.1.x).

-   A new `RabbitMessagingTemplate` has been introduced, allowing the use of the `spring-messaging` `Message<?>` abstraction as an alternative to the Spring AMQP `Message` (Spring Messaging `Message<?>` is also supported by the annotated listeners).
    
-   The Logback `AmqpAppender` is now available, with configuration similar to the existing Log4j `AmqpAppender`:
    

```xml
Copy<appender name="AMQP" class="org.springframework.amqp.rabbit.logback.AmqpAppender">
	<layout>
		<pattern><![CDATA[ %d %p %t [%c] - <%m>%n ]]></pattern>
	</layout>
	<abbreviation>36</abbreviation>
	<applicationId>MyApplication</applicationId>
	<routingKeyPattern>%property{applicationId}.%c.%p</routingKeyPattern>
	<generateId>true</generateId>
	<charset>UTF-8</charset>
	<durable>false</durable>
	<deliveryMode>NON_PERSISTENT</deliveryMode>
</appender>
```

-   The `RabbitTemplate` can now be configured with an `AbstractRoutingConnectionFactory` with `expression` attributes to determine the target `ConnectionFactory` depending on the `RabbitTemplate` operation:

```xml
Copy<rabbit:template connection-factory="RoutingConnectionFactory"
     send-connection-factory-selector-expression="messageProperties.userId"
     receive-connection-factory-selector-expression="#root == 'fooQueue' ? 'foo' : null"/>
```

-   In addition, the `mandatory-expression` attribute has been added to the `RabbitTemplate` to set the `mandatory` flag for each sent message:

```xml
Copy<rabbit:template connection-factory="connectionFactory"
      mandatory-expression="messageProperties.contentType == 'application/json'"/>
```

(Previously, `mandatory` was set at the template level).

-   The `AbstractRoutingConnectionFactory` is now also supported for the `MessageListenerContainer`, where the `key` for

the target `ConnectionFactory` is based on the configured `queueNames` array

See the [Release Notes](https://jira.spring.io/secure/ReleaseNote.jspa?version=14724&projectId=10450) and the [Project Page](http://projects.spring.io/spring-amqp/) for more information.