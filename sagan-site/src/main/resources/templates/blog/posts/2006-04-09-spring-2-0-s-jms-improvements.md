---
title: Spring 2.0\'s JMS Improvements
source: https://spring.io/blog/2006/04/09/spring-2-0-s-jms-improvements
scraped: 2026-02-24T09:37:49.338Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Hale |  April 09, 2006 | 0 Comments
---

# Spring 2.0's JMS Improvements

_Engineering | Ben Hale |  April 09, 2006 | 0 Comments_

With the release of Spring 1.1 the Spring community was given it’s first taste of JMS support. This support included exception translation, message conversion, and a template class much like [JdbcTemplate](http://static.springframework.org/spring/docs/2.0-m3/api/org/springframework/jdbc/core/JdbcTemplate.html). This support also took care of domain unification between the JMS 1.0.2 and 1.1 specs. The centerpieces of this support are the [JmsTemplate](http://static.springframework.org/spring/docs/1.2.x/api/org/springframework/jms/core/JmsTemplate.html) class and it’s JMS 1.0.2 counterpart [JmsTemplate102](http://static.springframework.org/spring/docs/1.2.x/api/org/springframework/jms/core/JmsTemplate102.html).

This support was a great improvement over using the raw JMS APIs to do enterprise messaging. However it did have a shortcoming; the JmsTemplate only supported synchronous reception of messages using the [JmsTemplate.receive()](http://static.springframework.org/spring/docs/1.2.x/api/org/springframework/jms/core/JmsTemplate.html#receive\(\)) methods. This behavior worked well for many people but the vast majority of users of ended up rolling their own implementations of an asynchronous consumer. In short, they wanted what EJB 2 called [Message Driven Beans](http://java.sun.com/j2ee/tutorial/1_3-fcs/doc/EJBConcepts5.html).

But no longer will users do without. With the release of 2.0M1 and the final 2.0 release later, native support for asynchronous reception of JMS messages has been added. The JmsTemplate is still used for sending of messages at his always been, but it has now been joined by subclasses of [AbstractMessageListenerContainer](http://static.springframework.org/spring/docs/2.0-m3/api/org/springframework/jms/listener/AbstractMessageListenerContainer.html) such as [DefaultMessageListenerContainer](http://static.springframework.org/spring/docs/2.0-m3/api/org/springframework/jms/listener/DefaultMessageListenerContainer.html), [SimpleMessageListenerContainer](http://static.springframework.org/spring/docs/2.0-m3/api/org/springframework/jms/listener/SimpleMessageListenerContainer.html), and [ServerSessionMessageListener](http://static.springframework.org/spring/docs/2.0-m3/api/org/springframework/jms/listener/serversession/ServerSessionMessageListenerContainer.html).

Let’s take a look at how to use these MessageListenerContainers. The first step is to create a class that can receive the messages. To do this, one must create a class that implements the [MessageListener](http://java.sun.com/j2ee/1.4/docs/api/javax/jms/MessageListener.html) interface.

```java
Copy
package jmsexample;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.TextMessage;

public class ExampleListener implements MessageListener {

	public void onMessage(Message message) {
		if (message instanceof TextMessage) {
			try {
				System.out.println(((TextMessage)message).getText());
			} catch (JMSException e) {
				throw new RuntimeException(e);
			}
		} else {
			throw new IllegalArgumentException(
					"Message must be of type TestMessage");
		}
	}

}
```

Once you have that, you’ll need a message producer. This code is the same as it was back before Spring 2.0, so if you have code that does this already, it should not require any changes.

```java
Copy
package jmsexample;

import org.springframework.jms.core.JmsTemplate;

public class ExampleProducer {

	private JmsTemplate jmsTemplate;

	public ExampleProducer(JmsTemplate jmsTemplate) {
		this.jmsTemplate = jmsTemplate;
	}

	public void sendMessage() {
		jmsTemplate.convertAndSend("Example Message");
	}

}
```

Next, you need to configure your context to create a MessageListenerContainer that routes messages to this bean. You’ll notice that I’m using ActiveMQ implementation classes in this example. This just happens to be one of many JMS implementations and happens to be the one that I’m most familiar with.

```xml
Copy
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd">

	<bean id="messageListener" class="jmsexample.ExampleListener" />

	<bean id="messageProducer" class="jmsexample.ExampleProducer">
		<constructor-arg ref="jmsTemplate" />
	</bean>

	<bean id="jmsTemplate"
		class="org.springframework.jms.core.JmsTemplate">
		<property name="connectionFactory" ref="connectionFactory" />
		<property name="defaultDestination" ref="destination" />
	</bean>

	<bean id="destination" class="org.activemq.message.ActiveMQQueue">
		<constructor-arg value="jmsExample" />
	</bean>

	<bean id="listenerContainer"
		class="org.springframework.jms.listener.DefaultMessageListenerContainer">
		<property name="connectionFactory" ref="connectionFactory" />
		<property name="destination" ref="destination" />
		<property name="messageListener" ref="messageListener" />
	</bean>

	<bean id="connectionFactory"
		class="org.activemq.ActiveMQConnectionFactory">
		<property name="brokerURL" value="tcp://localhost:61616" />
	</bean>

</beans>
```

I’m going to skip it for now, but obviously you’ll need to have an MQ started, and a main method that bootstraps your context. I’ve added an [archive of the project](http://blog.springframework.com/main/wp-content/uploads/2006/04/JmsExample.zip "JmsExample Source Code") from this example so that you can see the rest of the code if you need it.

Finally, you just need to run your application and take a look at the output.

```code
CopyExample Message
```

One thing to note is that so far we’ve been dealing with asynchronous reception with a single consumer thread. It is possible to multithread to your consumers (remember that you’ll still have to make them stateless or thread-safe) using the concurrent consumers property of the MessageListenerContainer.

```xml
Copy
<bean id="listenerContainer"
	class="org.springframework.jms.listener.DefaultMessageListenerContainer">
	<property name="concurrentConsumers" value="5" />
	<property name="connectionFactory" ref="connectionFactory" />
	<property name="destination" ref="destination" />
	<property name="messageListener" ref="messageListener" />
</bean>
```

One thing I’d like to note (from my own painful experience) is to make sure that you don’t use concurrent consumers with a Topic. Remember that in a JMS topic all messages are delivered to all consumers on a topic. This means that if you have concurrent consumers on a topic, all of them will receive the same message; typically something that you’d want to avoid. However, if you’re using a queue, obviously this would dispatch each new message to the consumers in a round-robin fashion.

So, there you have it. It isn’t very flashy and is probably very similar to something you may have written at some point, but now all you have to do is use it, you don’t have to maintain it. Let me also say that this is just the tip of the iceberg. The MessageListenerContainers have the ability to take part in transactions, use custom threadpools (like the ones provided with an app server) with the new Spring [TaskExecutor](http://static.springframework.org/spring/docs/2.0-m3/api/org/springframework/core/task/TaskExecutor.html)abstraction, and even expose the native JMS session to the consumer. Each of those things is a topic for another post though.