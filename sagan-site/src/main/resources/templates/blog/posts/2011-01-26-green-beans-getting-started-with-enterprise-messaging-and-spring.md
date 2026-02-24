---
title: Green Beans: Getting Started with Enterprise Messaging and Spring
source: https://spring.io/blog/2011/01/26/green-beans-getting-started-with-enterprise-messaging-and-spring
scraped: 2026-02-24T08:48:06.901Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  January 26, 2011 | 0 Comments
---

# Green Beans: Getting Started with Enterprise Messaging and Spring

_Engineering | Josh Long |  January 26, 2011 | 0 Comments_

In this post, we will introduce the core concepts of messaging, as well as the rich support for various types of messaging that the Spring framework and its sister projects provide.

What is Messaging? To best explain this, I'll paraphrase the example offered by the groundbreaking *Enterprise Integration Patterns* book by Gregor Hohpe and Bobby Woolf (Addison Wesley, 2004). When you make a telephone call, you attempt to relay information to another party. This only works if the second party is available when you place the phone call. Because it is not always possible to answer phone calls, we use a voice-mail boxes to queue the messages. Callers leave messages in the voice-mail box and the callee is then free to retrieve the message (or, indeed, many messages) at a later point, asynchronously.

In that example, a voice-mail box sits in the middle of the two parties. It stores the message and then delivers it when the callee – the recipient – retrieves it. In the world of enterprise messaging, things work very much the same: a party sends a message to a messaging broker (also known as messaging-oriented middle-ware – MOM) and another party – when that party can – takes delivery of, or explicitly queries for, any messages from the message broker.

Here is where the analogy stops being useful. Message brokers, in contrast to voice-mail boxes, have a lot of options. Message brokers are ideally positioned to provide extra services, like routing, and to make guarantees about message delivery. Message brokers can be optimized for different use cases, for example, you can trade speed for durability. Message brokers may persist messages to an external store to ensure durability, though this is typically a configuration that can be toggled in the name of speed.

In the voice-mail box example, a message was sent by one party and then delivered to another – the communication was *point-to-point*. Message brokers support this, as well as another type of communication called *publish-subscribe*, where messages are delivered to multiple clients.

A common use of message brokers is to solve integration problems between two different systems. Data sent to a message broker is usually of a format common to both the sender and recipient of the message. The only thing that two systems need to agree on to use a message broker is the data contract. Messages typically have a message body, in which the contents of the message itself are stored, and message headers, which are key / value pairs that provide meta-data about the body of the message that can be used to aid consumers of the messages in processing the message. Message headers can be anything you like, but they typically relate to the message itself, or to the processor of the message.

## Java Message Service

The Java Message Service (JMS) API specifies client interfaces for interacting with message brokers. Each message broker provides its own implementation of the API, very much like JDBC drivers do for the JDBC API. This implies that JMS clients should generally use the same version of the client as the server. There are many, many fine JMS broker implementations to choose from. One reason for this is that messaging ihas always been an important part of application development, and continues to be even more so today. JMS has been a part of the J2EE (now Java EE) specifications since 1.1. The JMS specification has been at version 1.1 for most of the last decade.

In JMS, clients use a `javax.jms.ConnectionFactory` to create a `javax.jms.Connection`. The `Connection` can then be used to create a `javax.jms.Session`. The `Session` represents the client interaction with the broker and allows for sending and receiving messages as well as other less obvious operations.

The most useful methods on the interface concern the creation of a message producers, and message consumers that send and receive messages to and from a `javax.jms.Destination`. A `Destination` maps the JMS concept of an "address" on a message broker. It also maps the concept of where a broker stores messages. In JMS, messages are sent to, stored in, and consumed from the same place, all represented by a `javax.jms.Destination` instance.

\[caption id="attachment\_7506" align="alignnone" width="573" caption="Above, blue elements represent producers and consumers. The orange elements represent destinations in the broker where messages are buffered. In JMS, these are either topics or queues."\][![](http://blog.springsource.com/wp-content/uploads/2011/01/jms.jpg "jms")](http://blog.springsource.com/wp-content/uploads/2011/01/jms.jpg)\[/caption\]

`Destination` is an interface and has two more specific sub-interfaces, `javax.jms.Queue` and `javax.jms.Topic.` A `Queue` represents a standard queue, which is a point-to-point construct as described before. A `Topic` provides publish-subscribe messaging and can deliver a single message to multiple recipients.

To send a message to a `Destination`, you must create a `javax.jms.MessageProducer`. The `MessageProducer ` can then be used to send `javax.jms.Message`s.

JMS supports two different mechanisms to receive messages. The first way is to ask for a message, using the `javax.jmx.MessageConsumer#receive()` method, which returns an individual message from a `Destination` in a *synchronous* manner; the method blocks until a message is received, by default. Instead of using a `MessageConsumer`, clients may install a `javax.jms.MessageListener` by calling `javax.jms.Session#setMessageListener(MessageListener)`. `MessageListener` is an interface and has only one method, `public void onMessage(javax.jms.Message)`, which will be called whenever a `javax.jms.Message` is available for consumption on a `Destination`. A `MessageListener` provides *asynchronous* message processing: as messages arrive, they are processed.

There is quite a bit more to learn in the JMS API, but these classes and concepts will help you most in our discussion of Spring's support for JMS messaging. The first level of support is the ` org.springframework.jms.core.JmsTemplate`, which provides simplifying methods to reduce the things we just discussed to one-liners. The `JmsTemplate`, requires a `javax.jms.ConnectionFactory` instance to do its work. `JmsTemplate` can do a lot of work for you. For example, to send a message, the `JmsTemplate` establishes a `javax.jms.Session`, sets up a `javax.jms.MessageConsumer` or `javax.jms.MessageProducer`, sets up all the machinery for transactions, and provide you with a reference to the current `javax.jms.Session` so you can create the message of your choice and send it. With all the error handling and construction logic, that's easily a savings of dozens of lines of code. Once your message has been sent, it destroys or closes most of those objects. This is standard practice in application servers (like a Java EE server) because the `ConnectionFactory` instances are created by the server, managed by the server, and are pooled. They cache the instances after use. Closing resources in those environments simply returns them to a pool. So, the `JmsTemplate` does the right thing in the standard case, assuming the `ConnectionFactory` caches or pools instances.

In a managed environment like an application server, you will typically need to acquire the `javax.jms.ConnectionFactory` from JNDI. You can use Spring to lookup that reference for you and configure a `JmsTemplate`. In our examples, we want to operate more loosely, so we will use the standalone ActiveMQ message broker. ActiveMQ is a popular, [open-source message broker](http://activemq.apache.org/). To use it, download it, and then run the startup script appropriate to your operating system in the bin folder. In your application, you'll need the client libraries to connect for the corresponding version of ActiveMQ. At the time of this writing, the latest version of ActiveMQ was 5.4.2. If you are using Maven, add the following dependencies to your Maven pom file:

```xml
Copy

            <dependency>
                <groupId>org.apache.activemq</groupId>
                <artifactId>activemq-core</artifactId>
                <version>${activemq.version}</version>
            </dependency>
            <dependency>
                <groupId>org.apache.activemq</groupId>
                <artifactId>activemq-optional</artifactId>
                <version>${activemq.version}</version>
            </dependency>

```

Be sure to either create a Maven property for `${activemq.version}` or replace the string manually with the appropriate version. There is an `activemq-all` dependency out there as well, but it brings down a lot of perhaps unnecessary jars. For our application, the two dependencies above suffice.

### Using Spring with JMS

Let's examine the configuration for a basic JMS application. First, let's examine the basic Spring XML configuration:

```xml
Copy

<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="
       http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
       http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-3.0.xsd
       http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx-3.0.xsd
       ">

    <context:property-placeholder location="jms.properties"/>
    <context:component-scan base-package="org.springsource.greenbeans.examples.jms.core"/>
    <context:component-scan base-package="org.springsource.greenbeans.examples.jms.jmstemplate"/>
    <tx:annotation-driven transaction-manager="jmsTransactionManager"/>

</beans>
```

You can see that the XML mainly sets up property placeholder resolution and enables classpath scanning. The most interesting part is the element that tells Spring to enable transactions on all methods that have the `@Transactional` annotation on it. The element references another bean in the Spring context, `jmsTransactionManager`, which is defined in the following Java configuration class.

```java
Copy

package org.springsource.greenbeans.examples.jms.core;

import org.apache.activemq.ActiveMQConnectionFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.*
import org.springframework.jms.connection.*
import org.springframework.jms.core.JmsTemplate;

import javax.jms.ConnectionFactory;

@Configuration
public class JmsConfiguration {

  @Value("${broker.url}")
  private String brokerUrl;

  @Bean
  public ConnectionFactory connectionFactory() {
    ActiveMQConnectionFactory activeMQConnectionFactory = new ActiveMQConnectionFactory();
    activeMQConnectionFactory.setBrokerURL(this.brokerUrl);
    return new CachingConnectionFactory(activeMQConnectionFactory);
  }

  @Bean
  public JmsTransactionManager jmsTransactionManager() {
    return new JmsTransactionManager(this.connectionFactory());
  }

  @Bean
  public JmsTemplate jmsTemplate() {
    return new JmsTemplate(this.connectionFactory());
  }
}
```

The configuration is pretty tame. First, we define an `ActiveMQConnectionFactory` instance and then give it to an instance of the Spring framework's `CachingConnectionFactory`. Some brokers provide their own caching `ConnectionFactory` implementation. If yours doesn't, however, then you can always use the Spring Caching ConnectionFactory implementation to achieve the speed boost.

Next, we have a `JmsTransactionManager`, which provides JMS-local transactions. In JMS, there are only two outcomes for a transaction rollback: on failed send operations, messages are unsent, and on failed receive operations, messages are re-queued with the message broker. This last case can be complicated.

If you receive a message, and then experience an error in its processing, and assuming you've kept a transaction open, the transaction is rolled back and the message is returned to the broker. What happens once its in the broker depends on the broker and your configuration. Typically, a message will simply be redelivered immediately. This isn't always the desired behavior, however. So, most (if not all) brokers support some notion of a dead letter queue to which messages that can't be delivered are sent. Messages in this queue can be handled however you want – perhaps some monitoring tool can wake somebody up when this error condition strikes. Most brokers provide even more control, however. It might be possible to set up rules on the routing of an in-error message. For example, the broker might attempt to redeliver a message immediately, then, if it fails again, it might wait a while and try again, and, if that fails, wait a while longer. This is typically called a backing off period. Perhaps after a certain threshold the message could be delivered to the dead letter queue, or outright discarded. Check your broker's documentation, in any case.

Finally, we create a `JmsTemplate` by giving it a reference to the `ConnectionFactory`.

Let's look at the `JmsTemplate` in action. To keep the examples simple, we'll first discuss how to send messages in an aptly-named `Producer` class. A common use of messaging is to send notifications to a (or many) different systems as a synchronization mechanism so that interested systems have the latest version of some piece of data. Let's assume in this example that we have a simple `Customer` POJO with the standard fields: `firstName`, ` lastName`, `email`, and `id`.

```java
Copy
package org.springsource.greenbeans.examples.jms.core;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.logging.*
import org.springframework.beans.factory.annotation.*
import org.springframework.jms.core.*;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springsource.greenbeans.examples.Customer;
import javax.jms.*;

@Component
public class Producer {

  @Value("${jms.customer.destination}")
  private String customerDestination;

  @Autowired
  private JmsTemplate jmsTemplate;

  private Log log = LogFactory.getLog(getClass());

  @Transactional
  public void sendCustomerUpdate(final Customer customer) throws Exception {
    this.jmsTemplate.send(this.customerDestination, new MessageCreator() {
      @Override
      public Message createMessage(Session session) throws JMSException {
           log.info("Sending customer data " + ToStringBuilder.reflectionToString(customer));
           MapMessage mapMessage = session.createMapMessage();
           mapMessage.setLong("id", customer.getId());
           mapMessage.setString("firstName", customer.getFirstName());
           mapMessage.setString("lastName", customer.getLastName());
           mapMessage.setString("email", customer.getEmail());
      }
    });
  }
}
```

In the class, we see a `sendCustomerUpdate` method that takes as its arguments a Customer reference. Using the `JmsTemplate`'s send method – which takes two parameters: the first a String for the name of the destination ("customers"), and the second a reference to the Spring framework class `MessageCreator` – we build a JMS message using the `javax.jms.Session` reference passed into our implementation of the ` createMessage(javax.jms.Session)` method. There are many types of messages that you can create in JMS: `javax.jms.TextMessage`, `javax.jms.ObjectMessage`, `javax.jms.MapMessage`, etc. The `ObjectMessage ` does exactly what you'd expect – it lets you transmit a serialized object as the payload a JMS message. Generally, this is to be avoided. A serialized data type couples both the producer and consumer of a message to the same API contracts, which may not always be tenable. Even if it is feasible to guarantee that the type will be available, and of the same class version, on both sides of the message exchange, it is often inefficent to do so in comparison to other more flexible options. Instead, prefer decomposition – perhaps you can marshal the object as an XML or JSON String using the `javax.jms.TextMessage`. Or, send the constituent, primitive parts of the object, not the object itself using a `javax.jms.MapMessage`, which is simply a message with known key/value pairs just like in a `java.util.Map`. This is the approach we have taken here. All JVM's have `ints`, `longs,` `Strings`, etc. and can deserialize data transmitted this way.

Let's now look to receiving messages in JMS. The first approach is to synchronously ask for them, one at a time.

```java
Copy

package org.springsource.greenbeans.examples.jms.jmstemplate;

import org.apache.commons.logging.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springsource.greenbeans.examples.Customer;
import javax.jms.*

@Component
public class RawJmsTemplatePollingMessageConsumer {

  @Autowired
  protected JmsTemplate jmsTemplate;

  @Value("${jms.customer.destination}")
  private String destination;

  private Log log = LogFactory.getLog(getClass());

  @Transactional
  public void receiveAndProcessCustomerUpdates() throws Exception {
    Message message = this.jmsTemplate.receive(this.destination);
    if (message instanceof MapMessage) {

      MapMessage mapMessage = (MapMessage) message ;
      String firstName = mapMessage.getString("firstName");
      String lastName = mapMessage.getString("lastName");
      String email = mapMessage.getString("email");
      Long id = mapMessage.getLong("id");

      Customer customer = new Customer(id, firstName, lastName, email );

      log.info("receiving customer message: " + customer);

    }
  }
}
```

This example uses the `JmsTemplate` instance to receive a new message when one available and then transform it into a Customer object, in steps that are the reverse of what we did when we sent it, where it is oh-so-usefully written out to the log. This kind of packing and unpacking of JMS messages becomes tedious if you have to repeat it more than once. There is often value in extracting this sort of logic into a separate class. The Spring JMS hierarchy supports the use of instances of the `MessageConverter` hierarchy to let you override how objects are serialized. The default – `SimpleMessageConverter` – is in play when nothing is otherwise specified and it does a good job for the most case, so we don't override it here. If, however, we decided that we wanted to transmit objects as XML, we could take advantage of the `MarshallingMessageConverter`, which leverages the Spring framework's OXM (object-to-XML marshaling) support. Finally, note that the `receiveAndProcessCustomerUpdates` method is decorated with the `@Transactional` annotation. If anything should go wrong when a message is received, and should an `Exception` be thrown, Spring will rollback the receipt and return the message to the broker.

### Listening Makes It More Simple

This example is simple enough, but has some limitations. First, our code is tightly coupled to the JMS and Spring APIs. Second, this only handles one message, and only when the method is invoked. It is the implementers responsibility to see that the method is called. Typically, implementers want messages processed as soon as they've arrived, asynchronously. A natural next step might be to then invoke the receive method in succession from within an endless loop to ensure that all messages in the queue are handled as quickly as possible. After that, to achieve higher throughput for particularly long running tasks and to ensure the queue is always drained, you might add threading so that multiple loops are always running. These are logical next steps, but they're also a lot of work just to receive messages and process them. Really, the only business logic here is the code that takes the payload of the message and does something with it.

The Spring framework provides a solution for this problem out of the box, and using it is simple! There are two implementations that are suitable for different situations that provide this functionality in the Spring framework. They are both rooted at the `AbstractJmsListeningContainer` class. You could work with this hierarchy directly, if you wanted, but as it happens, there's an even simpler way to configure this using Spring's JMS namespace.

Let's revisit our previous Spring XML configuration, adding the `http://www.springframework.org/schema/jms ` namespace and then the appropriate configuration.

```xml
Copy

<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:jms="http://www.springframework.org/schema/jms"
       ...
       xsi:schemaLocation="…  http://www.springframework.org/schema/task http://www.springframework.org/schema/task/spring-task-3.0.xsd">
       ….

    <jms:listener-container  connection-factory="connectionFactory" acknowledge="auto" transaction-manager="jmsTransactionManager">
        <jms:listener destination="${jms.customer.destination}" ref="messageListenerContainerConsumer" method="receiveMessage" />
    </jms:listener-container>

</beans>
```

We've excerpted only the parts that have been added to the configuration file. The `<jms:listener-container>` element requires a reference to the connection factory and the transaction manager in play. Note that the Spring message listener provides its own caching, so you should use a regular `ConnectionFactory` here: `CachingConnectionFactory` is redundant here, and should not be used. In the elemnt, you can configure as many `<jms:listener>` elements as you like, each specifying the name of a `javax.jms.Destination` instance and a reference to a Spring bean that will be given new messages. Optionally, you can configure which method should be invoked in the configured bean reference. If the Spring bean implements one of either `javax.jms.MessageListener` or Spring's own `SessionAwareMessageListener` interface, then the unique method on each of those interfaces will be invoked with the `javax.jms.Message`, and there is no need to specify a method. If a method is configured, the method should take as its parameters an object of the same type as the `javax.jms.Message`'s payload. For our examples, this would be a `java.util.Map` instance since we're expecting a `javax.jms.MapMessage` instance.

The revised code is:

```java
Copy
package org.springsource.greenbeans.examples.jms.messagelistenercontainer;

import org.apache.commons.logging.*;
import org.springframework.stereotype.Component;
import org.springsource.greenbeans.examples.Customer;

import java.util.Map;

@Component
public class MessageListenerContainerConsumer {

  private Log log = LogFactory.getLog(getClass());

  public void receiveMessage(Map<String, Object> message) throws Exception {
    String firstName = (String) message.get("firstName");
    String lastName = (String) message.get("lastName");
    String email = (String) message.get("email");
    Long id = (Long) message.get("id");
    Customer customer = new Customer(id, firstName, lastName, email);
    log.info("receiving customer message: " + customer);
  }
}
```

Not bad, huh? Your code is unaware of JMS and almost completely unaware even of Spring (it is, save for the `@Component` annotation. Naturally, you can simply configure this bean using XML or Java Configuration and this dependency would be avoided, too.) Additionally, your code's much easier to follow. All the same rules apply – exceptions thrown during receipt will trigger a rollback, for example. You can ratchet up concurrency by specifying how many listeners you want using the XML `<jms:listener-container >` element. You can also control which type of transaction management is in play.

## AMQP

While JMS is a very powerful option, it is not without its limitations. Clients are coupled to the version of the broker, and it quickly becomes tedious to arrange flag-day upgrades of deployed systems and brokers. JMS is by definition Java-centric. Clients use Java-language drivers to connect to a given broker. Messaging is all about integration, and we can't always assume we're integrating with other Java clients, especially in a world with so many different platforms. While some of the JMS message brokers (even the open source ones) can scale to incredible throughputs, there are simply faster messaging options out there and if your situation demands it then it's at least worth investigating alternatives. JMS is a good API, but nobody would call it the best API. For this reason, while many message brokers support JMS, they also support their proprietary APIs or alternative APIs that are more powerful or expressive. One example is the lack of routing capabilities in JMS once a message is sent.

One popular option that meets these challenges is the AMQP standard. AMQP (advanced message queuing protocol) is a standard that was born, initially, of challenges faced in mission critical applications at JPMorgan Chase bank. From the beginnings of their work emerged a specification, around which eventually formed a working group that today includes numerous companies like Goldman Sachs, Progress Software, Microsoft, Novell, Red Hat, WS02, Goldman Sachs, Bank of America, Barclays, Cisco, Credit Suisse, Deutsche Borse Systems, and, of course, the SpringSource division of VMware. SpringSource, in particular, develops the most popular AMQP-based message broker implementation, RabbitMQ.

RabbitMQ is an [open-source message broker](http://www.rabbitmq.org). It is easy to install, and particularly so if you are running one of the many systems whose package manager has RabbitMQ already available. RabbitMQ is written in the Erlang language. Normally, implementation details should not matter, but this particular detail is salient because of RabbitMQ's speed. You see, Erlang is a lightweight language that originally saw deployment in mission-critical telephony systems. Erlang features a very lightweight, intuitive threading model that makes Erlang programs able to achieve far more concurrency than the JVM is currently capable of. Additionally, Erlang's threading model blends seemlessly with its networking model. This means that scaling out into multiple threads or multiple machines is done in basically the same way. All of this is to say that RabbitMQ is fast. Really fast, and that it's resilient to errors, which is one of the reasons companies like Ericsson have enjoyed nine nines (99.9999999%) of availability.

AMQP is a wire protocol (like HTTP), not an API. This makes it language-agnostic (indeed there are dozens of known clients for different languages and platforms), and it means that RabbitMQ enjoys support in all sorts of tools that you wouldn't normally expect to care about message brokers, like WireShark, a networking traffic monitoring tool. Conceptually, any AMQP client should be able to talk to any other AMQP implementation.

### A Peek Inside the AMQP Broker

The AMQP specification specifies all the constructs on the client side as well as server side, as well as routine management options. In AMQP, a client creates a connection to a server. Clients may send messages to exchanges. Exchanges route messages to queues inside the broker, or stop them all together. Whereas exchanges are stateless gatekeepers, queues actually queue and store the messages.

Clients may consume messages from the queues. There is no relationship between an exchange and a queue: you may create as many queues as you like and bind one or many of them to an exchange. The relationship between an exchange and a queue is called a binding. An exchange will deliver up to one copy of a message to a queue if the routing key in the message matches a binding. This is important, because I said before, it is possible to specify many exchanges, and bindings, for a single queue. Multiple matches do not yield multiple messages. Exchanges dictate what is a match. There are several well-known exchanges, and they specify different matching algorithms.

-   **fanout exchange**: a fanout exchange routes all messages received to every queue bound to that exchange (this is most simialar to a `javax.jms.Topic`, for publish-subscribe-style messaging)
-   **direct exchange**: matches when the routing key (a common header in a message) and the binding key are identical (this is most simialar to a `javax.jms.Queue`, for point-to-point messaging)
-   **topic exchange**: a topic exchange has no API-specific equivalent in JMS. It is most like hierarchical topics in some message brokers. A topic exchange matches the routing key header to a exchange binding that uses a special syntax to allow for wildcards. The binding key might specify the following, for example: ".years.#". This wildcard would match any one word, followed by a dot ("."), followed "years," and another dot ("."), followed by zero or more words. Thus, "taxes.years.2011" would match, as would "taxes.years," but "years.2322" would not.
-   **headers exchange**: matches the presence of header keys or header key-value pairs.

\[caption id="attachment\_7484" align="alignnone" width="698" caption="Above, the blue circles are producers and consumers, the green elements are the exchanges, and the orange elements are the AMQP queues where messages are stored. They are simply named storage for messages, and don't have any relationship to a queue in the JMS sense."\][![](http://blog.springsource.com/wp-content/uploads/2011/01/amqp.jpg "amqp")](http://blog.springsource.com/wp-content/uploads/2011/01/amqp.jpg)\[/caption\]

The specification also permits special exchanges to be added, as well. For example, RabbitMQ adds the plugin exchange, which is basically an extension point for third parties (Or, indeed, RabbitMQ itself) to provide extra functionality. This has fostered an ever-growing list of installable plugins that do everything from send XMPP messages, handle replication and display a web UI for management.

### Using Spring with AMQP

We're going to investigate the use of [Spring AMQP,](http://www.springsource.org/spring-amqp) the Spring portfolio project that lets you work with RabbitMQ to do all the things mandated by the specification, but also more advanced RabbitMQ-specific operations.

Let's start building our example - of basically the same design as our JMS example - using RabbitMQ and the Spring AMQP client. The first thing you'll need are the appropriate dependencies. If you're using Maven, add the following dependencies to your `pom.xml` file:

```xml
Copy
            <dependency>
                <groupId>com.rabbitmq</groupId>
                <artifactId>amqp-client</artifactId>
                <version>${com.rabbitmq.version}</version>
            </dependency>
            <dependency>
                <groupId>org.springframework.amqp</groupId>
                <artifactId>spring-rabbit</artifactId>
                <version>${spring.amqp.version}</version>
            </dependency>
            <dependency>
                <groupId>org.springframework.amqp</groupId>
                <artifactId>spring-amqp</artifactId>
                <version>${spring.amqp.version}</version>
            </dependency>
```

Be sure to create Maven properties for the `${spring.amqp.version}`, and `${com.rabbitmq.version}` property placeholders, or simply replace them expressly with the appropriate version. At the time of this wiriting, `${spring.amqp.version}` is` 1.0.0.M2,` and `${com.rabbitmq.version}` is` 2.1.0`. As we did in the previous example, we've installed a simple Spring XML configuration file to bootstrap everything else. The only thing different is the name of the transaction manager implementation referenced from the use of the `<tx:annotation-driven>` element, the packages scanned and the name of the property file that was loaded! So, let's not waste too much time on the setup and get straight to the configuration for our AMQP-based example.

```java
Copy
package org.springsource.greenbeans.examples.amqp.core;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.*;
import org.springframework.amqp.rabbit.core.*
import org.springframework.amqp.rabbit.transaction.RabbitTransactionManager;
import org.springframework.amqp.support.converter.*
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.*;

@Configuration
@SuppressWarnings("unused")
public class AmqpConfiguration {

  @Value("${broker.url}")
  private String brokerUrl;

  @Value("${broker.username}")
  private String username;

  @Value("${broker.password}")
  private String password;

  @Value("${amqp.customer.queue}")
  private String customerQueueName;

  @Bean
  public RabbitTemplate rabbitTemplate() {
    RabbitTemplate rabbitTemplate = new RabbitTemplate(singleConnectionFactory());
    rabbitTemplate.setMessageConverter(jsonMessageConverter());
    return rabbitTemplate;
  }

  @Bean
  public RabbitTransactionManager rabbitTransactionManager() {
    return new RabbitTransactionManager(this.singleConnectionFactory());
  }

  @Bean
  public MessageConverter jsonMessageConverter() {
    return new JsonMessageConverter();
  }

  @Bean
  public ConnectionFactory singleConnectionFactory() {
    SingleConnectionFactory connectionFactory = new SingleConnectionFactory(this.brokerUrl);
    connectionFactory.setUsername(this.username);
    connectionFactory.setPassword(this.password);
    return connectionFactory;
  }

  @Bean
  public AmqpAdmin amqpAdmin() {
    return new RabbitAdmin(this.rabbitTemplate());
  }

  @Bean
  public Queue customerQueue() {
    Queue q = new Queue(this.customerQueueName);
    amqpAdmin().declareQueue(q);
    return q;
  }

  @Bean
  public DirectExchange customerExchange() {
    DirectExchange directExchange = new DirectExchange(customerQueueName);
    this.amqpAdmin().declareExchange(directExchange);
    return directExchange ;
  }

  @Bean
  public Binding marketDataBinding() {
    return BindingBuilder.from(customerQueue()).to(customerExchange()).with(this.customerQueueName);
  }
}
```

As you can see there's a bit more going on here than there was for our `JmsTemplate`, but don't fret, the big parts are identical in form and function to their JMS counterparts. The rest are just details. First, we configure the usual suspects – the `TransactionManager` (`RabbitTransactionManager`), the `ConnectionFactory ` instance and the `RabbitTemplate`. Most of that should be pretty self explanatory.

Let's dive into the areas that don't line up. The first nuance is that we configure a reference to `JsonMessageConverter` on `RabbitTemplate`. Remember: AMQP is language and platform independent. Messages sent to an AMQP broker from Java may well be consumed by a client on .NET or Python or PHP. When messages are packaged and sent over the wire, the payload goes as a stream of bytes. The recipient of the message needs to be able to restore those bytes to something that can be read on the recipient's platform. If the message used Java objects, those bytes would be serialized Java objects and only a Java client with the same class on the other side would be able to deserialize it. So, just as in the Spring JMS support, Spring AMQP provides a `MessageConverter ` hierarchy. The Spring AMQP hierarchy has a `MarshallingMessageConverter`, as well as a `SimpleMessageConverter`, and – in addition – it features a `JsonMessageConverter` (which is unique to the Spring AMQP project, at the moment) that converts objects to and from JSON (the JavaScript Object Notation format that's parse-able by all major languages and platforms and less verbose / porous than XML). In JMS, smart serialization was a matter of efficiency and design, but in AMQP, it is a far more pressing concern, so pay attention to the configured `MessageConverter`.

You'll find four objects in the configuration that have no analog in the JMS example. The first is the `AmqpAdmin`. AMQP defines – at the protocol level – commands for creating everything your application needs to work including the exchanges, queues and binding. In the Spring AMQP API, the `AmqpAdmin ` is the key interface to those commands.

In the `customerQueue` method, we configure an AMQP queue, and a `DirectExchange ` in the `customerExchange` method. Finally, we use the Spring AMQP fluid `BindingBuilder ` API to connect the queue to our exchange. In our specific example – we're sending a message with a routing key of `"customers"` to a queue named "customers." In our specific example, we don't need to declare anything besides the queue for this to work, as the no-name exchange will kick in and simply route the message based on the routing key. However, it's useful to see how it's done, even if it is a bit redundant. We use the `AmqpAdmin` instance to "declare" these constructs. These objects are idempotent. You may "declare" them a million times and if they already exist, then nothing will happen for any but one of those declarations, so it's harmless to repeat the calls when your application starts up. Additionally, if these constructs are made *persistent*, then there is no need to even declare them each time.

Let's look at how to send a message.

```java
Copy

package org.springsource.greenbeans.examples.amqp.core;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.logging.*;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.*
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springsource.greenbeans.examples.Customer;

@Component
public class Producer {

  @Value("${amqp.customer.exchange}")
  private String exchange;
  
  @Value("${amqp.customer.queue}")
  private String routingKey;

  @Autowired
  private RabbitTemplate rabbitTemplate;

  private Log log = LogFactory.getLog(getClass());

  @Transactional
  public void sendCustomerUpdate(Customer customer) {
    log.info("sending customer update " + ToStringBuilder.reflectionToString(customer));
    this.rabbitTemplate.convertAndSend(this.exchange , this.routingKey, customer);
  }
}
```

In this class, we use the `RabbitTemplate` to send a message and convert it to JSON. We specify which `routingKey` we want to use and which exchange should be used (both "customers," in keeping with the type of binding we set up in the configuration.) We've configured the class to use `@Transactional` and so any failures to send a message will behave the same as if there were a failure using JMS.

Now, let's look at our options for receiving messages using AMQP.

```java
Copy

package org.springsource.greenbeans.examples.amqp.amqptemplate;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.logging.*;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springsource.greenbeans.examples.Customer;

@Component
public class RawAmqpTemplatePollingMessageConsumer {

  @Autowired
  protected RabbitTemplate amqpTemplate;

  @Value("${amqp.customer.queue}")
  private String queue;

  private Log log = LogFactory.getLog(getClass());

  @Transactional
  public void receiveAndProcessCustomerUpdates() throws Exception {
    Customer msg = (Customer)this.amqpTemplate.receiveAndConvert(this.queue);
    log.info("receiving customer message: " + ToStringBuilder.reflectionToString(  msg));
  }
}
```

Unsurprisingly, this looks virtually identical (save for the `RabbitTemplate`) as the first, synchronous JMS example. We are spared a bit of the conversion logic that we had to work with in the first example, but otherwise it's basically the same. If a transaction rollback occurs on message receipt the message will be returned to the end of the queue where it will eventually be redelivered.

Spring AMQP also supports asynchronous message receipt, just as in the Spring JMS suppport. However, as the Spring AMQP project is still a nascent project, there's no equivalent namespace support. So, we need to configure the object oursevles. Add the following to your configuration.

```java
Copy

  @Autowired
  private MessageListenerContainerConsumer messageListenerContainerConsumer;

  @Bean
  public SimpleMessageListenerContainer listenerContainer() {
    SimpleMessageListenerContainer container = new SimpleMessageListenerContainer();
    container.setTransactionManager(this.rabbitTransactionManager());
    container.setConnectionFactory(singleConnectionFactory());
    container.setQueueName(this.customerQueueName);

    MessageListenerAdapter messageListenerAdapter = new MessageListenerAdapter(
           this.messageListenerContainerConsumer, this.jsonMessageConverter());
    container.setMessageListener(messageListenerAdapter);
    return container;
  }
```

This configuration injects the component that will do the processing (see below, the `messageListenerContainerConsumer` instance is picked up by component-scanning and automatically registered with Spring, which is why we autowirte it here) and then configures a `SimpleMessageListenerContainer` instance that will handle receiving messages, managing transactions, and converting the incoming messges before giving it to the POJO.

The POJO itself looks like this:

```java
Copy

package org.springsource.greenbeans.examples.amqp.messagelistenercontainer;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.logging.*;
import org.springframework.stereotype.Component;
import org.springsource.greenbeans.examples.Customer;

@Component
public class MessageListenerContainerConsumer {
  
  private Log log = LogFactory.getLog(getClass() );
  
  public void handleMessage(Customer cu){
    log.info("Received customer " + ToStringBuilder.reflectionToString(cu)) ;
  }
}
```

This class benefits from the message converter a bit more than the other one. Here, we're able to declare a method that takes a parameter of type Customer, and the `MessageListenerContainer` knows how to convert it and then pass it to the `handleMessage` method. All the same rules apply, however. Exceptions will trigger a rollback, etc.

## Summary

In this post, we've explored the two options available to developers that want to incorporate enterprise messaging in their application today with the Spring framework. We introduced both the Java Message Service (JMS) API and the Advanced Message Queueing Protocol (AMQP) for dealing with enterprise messages. We have provided both synchronous and asynchronous examples using the core Spring framework and the Spring AMQP project. We touched on how messaging can help scale applications and how it can be a handy way to integrate applications. I hope that this will make it easier for you to understand the choices possible when using enterprise messaging and how Spring makes it easier to make the correct choice for your application. As usual, the code for this blog post can be found in our [Spring Samples](http://git.springsource.org/spring-samples/spring-samples) repository.