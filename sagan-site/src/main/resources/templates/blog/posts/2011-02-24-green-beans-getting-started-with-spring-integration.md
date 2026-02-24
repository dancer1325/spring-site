---
title: Green Beans: Getting Started with Spring Integration
source: https://spring.io/blog/2011/02/24/green-beans-getting-started-with-spring-integration
scraped: 2026-02-24T08:45:38.300Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  February 24, 2011 | 0 Comments
---

# Green Beans: Getting Started with Spring Integration

_Engineering | Josh Long |  February 24, 2011 | 0 Comments_

Applications don't exist in a vacuum. They need to communicate with their customers and with other applications. Application Integration is all about enabling this communication. Integration lets applications share services and data with each other, and, just as often, integration helps applications connect with their users.

Spring Integration provides a framework to build integration solutions, to facilitate these kinds of solutions. Spring Integration solutions describe the flow of data through a pipeline. Data enters the processing pipeline as a message. The message is moved forward through named pipes (called channels) that route the data to different components (called endpoints). You can string as many endpoints and channels together as you like.

This model is very similar in its simplicity to the Unix command line. Take for example the following Unix incantation:

```shell
Copycat spring.txt |grep spring |cut -f1 -d, | sort | uniq > spring_cleaning.txt
```

In this command, data from an external resource (a file named `spring.txt`) is passed into the `grep` command line. `grep` sifts through the results and finds all lines that match the word "spring" and sends them as output. The output from the `grep` command is sent as the input to `cut` command, which will parse the results and split each line on commas (",") and only keep the first column of data (everything else after the first "," is discarded). This relay continues until the end, where finally the output is written back to another external resource called `spring_cleaning.txt.` In this command, we connected the output of one command to the input of another using the Unix "pipe" ("|"). We read, cleaned, filtered, transformed and wrote the data by composing specialized. singly-focused commands into a pipeline. This approach is called the pipes and filters model, and Spring Integration lets you think about much bigger problems using this same simple model. In Spring Integration, channels are pipes, and endpoints are filters.

## Spring Integration comes with Batteries Included

Spring Integration supports many different use cases. Here are some common ones:

-   **Transform data**: transformer endpoints might change the type of the payload from one class to another, or delete, add, or change the message headers.
-   **Route data**: router endpoints provide custom routing logic – perhaps the data from the input channel should be delivered to multiple output channels?
-   **Filter data**: perhaps input data isn't fit to proceed and should be weeded out. You use filter endpoints to conditionally stop the data from proceeding.
-   **Adapt different systems to Spring Integration**: Adapters provide the ability for data to enter and exit the Spring Integration solution.
-   **Split data**: when the payload is too big, or is intended to be partitioned into smaller pieces of data. An example might be a single file that should be split into rows.
-   **Aggregate data**: this is the inverse of splitting functionality: an aggregator waits for messages to arrive, one by one, and collects them until some condition is met. Then, it sends all the aggregate messages as one message.

These are the tools of the Spring Integration developer’s toolbox. Spring Integration is, at its core, just one Maven dependency with common abstractions and interfaces.

```xml
Copy
<dependency>
    <groupId>org.springframework.integration</groupId>
    <artifactId>spring-integration-core</artifactId>
    <version>2.0.3.RELEASE</version>
</dependency>
```

Spring Integration provides many out-of-the-box modules, each with support appropriate to a specific type of requirement (for example: XML handling, or web services integration). As an example, the file namespace provides inbound and outbound adapters to read files from the file system and write files to the filesystem, respectively. The `file:inbound-channel-adapter` adapts the file system – it monitors a directory of your specification and, whenever a new file appears, produces Messages with a paylod of type `java.io.File` payload for the new file. A common use case is to transform files from a `java.io.File` to a representation of the file's contents - either a `String` or a `byte` array (`byte[]`). Since this is very common, the file namespace provides both a `file:file-to-string-transformer` endpoint as well as a `file:file-to-bytes-transformer`. Finally, a common scenario is that people want to write `String` or `byte` array data to the file system. For this, the `file` namespace provides the `file:outbound-channel-adapter` adapter. These are all simply file IO-oriented implementations of the basic endpoints described before, e.g., adapters and transformers.

Spring Integration comes with many pre-packaged modules that support a wide range of functionality in terms of these very same endpoint types. Some of the modules that ship with the Spring Integration 2.0 include File IO, JDBC, RSS/ATOM, FTP/FTPS, SFTP, TCP/IP, RMI, HTTP, JMX, e-mail, IO streams, Twitter, XMPP, web services, HTTP/REST, XML, and JMS. While this list is extensive, it is not complete. There's much more support that is either coming, or provided as part of other Spring portfolio projects, including Gemfire support, AMQP support, workflow system integration based on work done with the Activiti BPMN 2 business process management project, Ajax/Comet-based support, Flex BlazeDS messaging-based support and much more.

### A Simple Example

Let's look at a simple example – that of a hypothetical online retailer ("e-tailer"!) that handles transactions on the website and enlists several third-party companies to help fulfill orders. In particular, we're going to look at the flow of the data from the purchase point on the website through to the shipping company. The integration is triggered by a JMS message that is sent from the service. The shipping company is not affiliated with the e-tailer, and expects all orders to be submitted through its web-service endpoint, so the trigger JMS message must be used to invoke a webservice endpoint. Finally, all jobs submitted to the third parties (in this case, the shipping company) need to be audited, so information should be recorded in a reporting-oriented audit table in our database.

[![Spring Integration Example Process](http://blog.springsource.com/wp-content/uploads/2011/02/SpringIntegration600x233.png "SpringIntegration600x233")](http://blog.springsource.com/wp-content/uploads/2011/02/SpringIntegration600x233.png) *A diagram of the example integration solution - this diagram was generated by SpringSource Tool Suite*

**Processing JMS messages**: the first step is to receive messages from the JMS broker. We will use a Spring Integration inbound adapter – an endpoint that receives messages from JMS brokers - to connect the JMS broker to our application code in a simple, declarative way.

Spring Integration lets you process individual chunks of data, wrapped in a `org.springframework.integration.core.Message`. Data doesn’t just show up, it has to come from somewhere. To get data into and out of Spring Integration, you use inbound and outbound adapters, respectively. Adapters are a specialized type of endpoint that tell you when interesting things have happened in an external system and they tell you what has happened in the external system. Because adapters only take in data, or send it out, they are *unidrectional*.

```xml
Copy
    <int-jms:message-driven-channel-adapter
      channel="partnerNotifications"
      connection-factory="connectionFactory"
      transaction-manager="jmsTransactionManager"
      acknowledge="transacted"
       destination-name="${jms.partnernotifications.destination}"
    />

    <int:channel id="partnerNotifications"/>
```

We won't cover the specifics of the `connectionFactory` and `jmsTransactionManager` beans as they are standard Spring JMS-oriented beans and can be examined in the source code. Whenever a message appears on the JMS broker (in a JMS `destination`), Spring Integration will publish a `org.springframework.integration.Message` on the channel named `partnerNotifications` where it can be consumed.

**Invoking the Partner Webservice**: The Message payload is an XML document in a String. We'll cover how it got that way shortly, but suffice it to say that it's already in a common XML format that the etailer's partners can use. The next step is to make a web service call to the shipping company. The flow is like this: the message comes in from the JMS adapter and its payload is used as the payload of a web service call. It’s enqueued in the `partnerNotifications` channel after it’s been received from the JMS adapter, and before it’s sent out as a web service call.

This represents a different type of endpoint, similar to an adapter, called a gateway. A gateway is bidirectional, and handles request/reply scenarios. An outbound gateway sends a request to an external system and awaits a reply from that external system, which is delivered to you (the requester) as an inbound message. The web service call produces a response for each request. The reply data is sent as a Spring Integration message on the `partnerXmlShippingReplies` channel.

**Updating the Audit Table**: once we've received the successful reply from the webservice call, we need to update our audit table. This audit table is a data warehouse-oriented table; it contains de-normalized records that can be used to trace progress of orders through the fulfillment system and to drive reporting and analytics. The reply message from the web service is a simple XML document, and it contains the information we need to feed into the audit table.

Message has two important parts to it: its headers, and its payload. In Spring Integration, a payload can be any type of object. Message headers are basically a series of key/value pairs in a `java.util.Map`. The header keys are `String`s, but the values can be of any type. Headers usually carry metadata about the payload that endpoints can rely on when processing the payload.

In our example, we need to extract the salient XML attributes and make them available as message headers which can be fed into a JDBC query to update the table. We'll use Spring Integration's `xml:xpath-header-enricher` to evaluate XPath expressions against the response from the webservice, and extract the resolved expressions as values for message headers. In the example below, we create three headers: `customerId`, `purchaseId`, and `date`.

```xml
Copy
    <int-xml:xpath-header-enricher input-channel="partnerXmlShippingReplies" output-channel="partnerShippingReplies">
        <int-xml:header name="purchaseId" xpath-expression="//@purchase-id"/>
        <int-xml:header name="customerId" xpath-expression="//@customer-id"/>
        <int-xml:header name="date" xpath-expression="//@confirmation-date"/>
    </int-xml:xpath-header-enricher>

   <int:channel id="partnerShippingReplies"/>
```

The `xml:xpath-header-enricher` is a transformer endpoint: the message comes in as a `Message` with an XML document payload and headers and leaves as a `Message` with the same XML document payload and three new headers, in addition to the ones that were already there. In this example, the output is published on the `partnerShippingReplies` channel.

Next, we send the message and the new headers to the `jdbc:outbound-channel-adapter` where it will be used to execute a JDBC insert.

```xml
Copy
    <int-jdbc:outbound-channel-adapter
        data-source="dataSource"
        channel="partnerShippingReplies" >
        <int-jdbc:query>
INSERT INTO purchase_fulfillment_log(
    PURCHASE_ID, CUSTOMER_ID, EVENT_DATE, EVENT)
VALUES( :headers[purchaseId], :headers[customerId],
               :headers[date], 'SHIPPED' )
        </int-jdbc:query>
    </int-jdbc:outbound-channel-adapter>
```

This is a complete, working integration. We used Java-based configuration to configure all the necessary beans, but needed no Java to handle any of the business logic itself – all the real processing logic lived inside of the 25 or so lines of Spring Integration namespace elements and relied on technologies you're more than likely already familiar with. The Spring Integration JMS adapter, for example, builds on the support for JMS available in core Spring. The outbound web services gateway builds the Spring Web Services stack (just as the outbound HTTP gateway builds on the `RestTemplate`). The XML support, generally, builds on the Spring OXM support. Finally, the outbound JDBC adapter builds on the Spring JDBC support (in the example, we could have supplied an instance of Spring's JdbcTemplate insead of a ` javax.sql.DataSource`, for example).

## Error Handling in Spring Integration

**Transactions** In the example, we consume messages from JMS, send the message through a web service and then transform the response, writing it to a database. There are lots of moving parts here, and if something goes wrong, and you should be aware of the various mechanisms in play to deal with errors. With JMS and JDBC, common intuition is to use transactions to rollback in the event of some sort of failure. In the `jms:message-driven-channel-adapter` used in the example, the `transaction-manager` reference is optional, but works as you'd expect it to when in play: any exception in the same thread as the transaction will cause the JMS message receipt to rollback. The thread-local transaction extends to all the components in Spring Integration that execute in the same thread, which in the case of this solution, encompasses everything.

To try it, shutdown the database and then run the solution again – it will attempt to consume messages from the JMS broker, invoke the web service, transform the reply and then hit the database where it will incur an exception which will cause the JMS receive operation to rollback and ultimately be re-queued in the JMS broker (in ActiveMQ, by default, the messages eventually end up in the `ActiveMQ.DLQ` queue, the dead letter queue).

**Building Consistency into your Architecture** Thus, transactions are one way of dealing with error conditions, but they are of little help with resources that don't work with transactions, like web services. One way to work without transactions is to address the problem at the implementation level. A web service call, or a database call, for example, might be made to be idempotent: multiple invocations with the same inputs should yield the same output with no side effects, if possible. Updating a single row in a database with the same values is idempotent, for example: you may run the same statement 100 times and the worst that could happen is that you get the same (correct) result as if you had run the update 1 time. Another way to handle errors is to implement compensatory logic. If both the producer and consumer of a message are in the same thread, then normal Java error-handling logic applies if something goes wrong: an exception is thrown and can be handled (as appropriate) by the sender. If, however, the producer and consumer are in different threads, then the normal rules don't apply. In those cases, there is no consumer to feed the exception back to. By default, Spring Integration catches the exception and forwards it as a Message with an exception as its payload to a well-known, automatically created channel called `errorChannel`. You can specify an alternative channel to which errors should be forwarded by specifying a message header with the key `MessageHeaders.ERROR_CHANNEL` in your code. It’s up to you to consume messages from that channel and react to them appropriately.

## The Spring Integration Component Model

So far we’ve built everything by relying on the out-of-the-box support that served our goals. You’ll find this is true most of the time - Spring Integration really is a good toolbox. Like a box of Lego bricks, you can put together seemingly infinite combinations of the modules to solve most problems. However, that doesn’t mean every problem has been solved. Spring Integration can’t know the specifics of your domain model, for example, and it can’t know the specifics of your business logic and services. Sometimes you want to drop down to Java and just plug in the correct behavior.

To support custom logic, Spring Integration supports generic, pluggable (in the core namespace) implementations of all the core components (`transformers`, `splitters`, `routers`, `adapters`, `aggregators`, etc.) and expect that you will provide the custom Java logic to fulfill the duties of the component. In addition, Spring Integration provides a `service-activator` component, which is a an escape-hatch component: you use it to stick in custom Java processing logic, no matter what the purpose of this code is. You can use the`service-activator` for anything you'd like – perhaps you simply want to write a PDF to the file system using iText or to perform some sort of intrinsic business calculation? All of these custom components permit POJO implementations. They all work by invoking a method on a bean of your specification. There are no strict rules as to the shape and form of the methods, as Spring Integration is very flexible. Generally, however, you should imagine that the component will sit between other components and so must both accept as a parameter the inbound message and produce as its return type an outbound message. Message in, messsage out.

The method specification tends to vary a bit based on the type of component: a transformer might take in a message of one type and produce an outbound message of an entirely different, transformed type (naturally!). A splitter takes in a single message and produces a collection of messages as its return type. An aggregator works in reverse: it takes as its input parameter a collection of messages and returns as its output a single, aggregate message. The list goes on, and the details are of course available in the documentation. For our example, let's look at a servce-activator to demonstrate the flexibility in the method mapping. To use a service-activator, we must first declare it in the XML DSL, like this:

```xml
Copy
 <service-activator
      input-channel = "in"
      ref = "helloWorldServiceActivator" method = "sayHello"
      output-channel = "out" />
```

This example is typical: the input channel produces a message, the component processes it, and sends the result of the processing out on the output channel. Here, however, the processing logic is up to you to supply. The `ref` attribute specifies which bean should be employed to transform the inbound message. It also stipulates which method to use. If the bean in question had only method, or if the bean had multiple methods but only method annotated with Spring Integration’s `@ServiceActivator` annotation, then there is no need to stipulate a particular method in the XML as we have here. Let’s look at the first-cut implementation for such a `service-activator`.

```java
Copy
@Component
public class HelloWorldServiceActivator {

 public Message<String> sayHello( Message<String> inboundMessage) {
 Map<String,Object> headers = inboundMessage.getHeaders();
 String payload = inboundMessage.getPayload();
 System.out.println( "In the sayHello method, printing out the  "+
 "payload of the inbound message: "+payload + ". Also, there are " +
 headers.size() + " headers." ) ;
 return MessageBuilder.withPayload( inboundMessage.getPayload() )            .copyHeadersIfAbsent( inboundMessage.getHeaders() )            .build();
 }
}
```

The bean is simple: it's a simple POJO and declares a single method that takes in a Spring Integration message and returns its input as the output. You don't have to depend on Spring Integration's message type if you don't want to, however. Spring Integration has some smart heuristics and can automatically do the right thing on your behalf in many cases. Let’s rework the code for that method a bit to work in terms of the payloads, and not the Message wrapper class:

```java
Copy
  public String sayHello( String inboundPayload) {
    //  ... same as before
  }
```

This code works the same as before, except that now it depends only the type of the `Message` payload. The headers are automatically copied for you. You can also declare a place for Spring Integration to put the message headers (which are in a `java.util.Map<String,Object>`), if you like, like this:

```java
Copy
  public String sayHello( Map<String,Object> headers, String inboundPayload) {
    // ... same as before
  }
```

If you want to exercise more control over what gets put where, perhaps to avoid ambiguity, you can use Spring Integration's annotations. Let's use the annotations to rework the last example:

```java
Copy
  public String sayHello( @Headers Map<String,Object> headers, @Payload String inboundPayload) {
    // ... same as before
  }
```

There is one more annotation - `@Header` - of particular use here that tells Spring Integration that you want only the value of one specific header injected into your method:

```java
Copy
  public String sayHello( @Header("id") UUID idHeaderValue, @Payload String inboundPayload) {
    // ... same as before
  }
```

This reduces the complexity of your code and allows you to write expressive integration code. All the other components support this dynamic mapping capability just like `@ServiceActivator` and `service-activator`: `@Transformer` and `transformer`, `@Splitter` and `splitter`, `@Aggregator` and `aggregator`, `@Router` and `router`, etc.

## Using Spring Integration From Your Services

Spring Integration solutions do not need to always be kicked off by an adapter. You can launch them from Java code. The previous example was initiated by a JMS message – processing began whenever a JMS message was consumed.

Lets look at the other side of that exchange – the producer of the JMS message. In the previous example, we looked at processing messages sent when a customer checked out their shopping cart in online e-tailer. Using the Spring Integration API In this section, we’ll look at how to produce that message from the shopping cart, transform it into XML and then send it to a JMS broker where the previous example is waiting to process it.

```java
Copy
  @Autowired @Qualifier("partnerNotifications")
  private MessageChannel messageChannel ;

  @Override
  @Transactional
  public void checkout(long purchaseId) {
    Purchase purchase = getPurchaseById(purchaseId);

    if (purchase.isFrozen())
      throw new RuntimeException("you can't check out Purchase(#" + purchase.getId() + ") that's already been checked out!");

    Date purchasedDate = new Date();
    Set<LineItem> lis = purchase.getLineItems();
    for (LineItem lineItem : lis) {
      lineItem.setPurchasedDate(purchasedDate);
      entityManager.merge(lineItem);
    }
    purchase.setFrozen(true);
    entityManager.merge(purchase);

    Message<Purchase> msg = MessageBuilder.withPayload(purchase).build();
    this.messageChannel.send(msg);
  }
```

Most of that code is typical service-tier code – the only parts of interest to us are the use of the `MessageChannel`. `MessageChannel` is the runtime base type for the various Spring Integration channel types that we configured in the XML. Once you have a reference to a `MessageChannel`, it's simply a matter of sending a message through it. You can use a `MessageChannel` and directly interact with it to send and receive messages, just as you might use the low level JMS and AMQP APIs to send and receive messages.

`Message` objects in Spring Integration are immutable - you don't create `Message` objects directly. Instead, use the `MessageBuilder` class and its static methods to build a Message. The `MessageBuilder` class contains methods to factory new Messages based on an existing payload and based on an existing Headers map. The API is fluid - method calls can be chained together. In this example, we use the `MessageBuilder` class to build a Message based on the `Purchase` object (a JPA entity that's local to the shopping cart domain model).

We afford ourselves a bit of indirection by using Spring Integration: we are free to change the course of the message later, in Spring Integration. The service code need not change, as it only interfaces with Spring Integration.

The JMS consumer (the one we established in the first example) is slower as it needs to make a costly web service call. By sending the notification to JMS and then letting some other, out-of-process integration handle the web-service invocation, we buy ourselves two things: the checkout service is faster, and the slow processing can be scaled out independently of the service. For example, the checkout service might be deployed in a web application, once per machine. The notification processing that invokes the web service on the other hand is just a simple `main(String[])` class, and could be run many times on the same box with no problem to meet load.

## Summary

We’ve explored the wide world of integration, and learned how to use Spring Integration to tie together different systems in a clean, flexible way. We’ve explored how Spring Integration benefits from its position on top of the core Spring framework - how it is a natural next step for Spring developers looking to tackle integration problems. In this post, we’ve also explored Spring Integration’s friendly Spring XML DSL-based, as well as its POJO-based, programming model. Users can find the source code for this, as well as all the other "Green Beans" posts, in our [Git-based community samples project](http://git.springsource.org/spring-community-examples/spring-community-examples/trees/master) under the [Getting Started with Spring Integration folder.](http://git.springsource.org/spring-community-examples/spring-community-examples/trees/master/spring-integration/getting-started-with-spring-integration)