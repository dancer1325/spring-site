---
title: Spring AMQP 1.4.5.RELEASE and 1.5.0.M1 Available
source: https://spring.io/blog/2015/05/08/spring-amqp-1-4-5-release-and-1-5-0-m1-available
scraped: 2026-02-23T21:03:10.464Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gary Russell |  May 08, 2015 | 4 Comments
---

# Spring AMQP 1.4.5.RELEASE and 1.5.0.M1 Available

_Releases | Gary Russell |  May 08, 2015 | 4 Comments_

We are pleased to announce that the latest maintenance release for Spring AMQP (1.4.5.RELEASE) is now available. This contains just a [few bug fixes since 1.4.4](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=10450&version=14993).

In addition, the first milestone release for the 1.5 release is also available (1.5.0.M1). A release candidate will be available in a month or so, with the GA expected later in the summer.

The main features of this release are highlighted below:

##Class-level `@RabbitListener`

It is now possible to define the `@RabbitListener` annotation at the class level. Together with method-level `@RabbitHandler` annotations, this allows a single listener to invoke different methods in the class, depending on the payload type. For example:

```java
Copy@RabbitListener(queues="orders, shipments")
public class MultiListenerBean {

    @RabbitHandler
    public OrderConfirmation handleOrder(Order order) {
        ...    
    }

    @RabbitHandler
    public Invoice ship(Shipment shipment) {
        ...
    }

}
```

##Auto-Declare Queues and Bindings for `@RabbitListener`

It is now possible to automatically declare queues, exchanges and bindings when using the `@RabbitListener` annotation.

```java
Copy@RabbitListener(bindings = @QueueBinding(
	value = @Queue(value = "auto.declare", autoDelete = "true"),
	exchange = @Exchange(value = "auto.exch", autoDelete = "true"),
	key = "auto.rk"))
public String handleWithDeclare(String foo) {
	return foo.toUpperCase();
}
```

In this example, the queue `auto.declare` is declared and bound to exchange `auto.exch` with routing key `auto.rk`. The exchange is declared too.

Previously, the `Queue`, `Exchange` and `Binding` had to be declared as separate `@Bean`s.

##Configurable Exchange/Routing Key for Replies

Previously, when using request/reply messaging with the `RabbitTemplate`, replies were routed to the default exchange and routed with the queue name. It is now possible to supply a `reply-address` with the form `exchange/routingKey` to route using a specific exchange and routing key.

##RabbitManagementTemplate

The `spring-erlang` jar is no longer provided. Users are encouraged to use the RabbitMQ REST API instead. The RabbitMQ team are working on a Java binding for the REST API and Spring AMQP now provides a lightweight wrapper for that API using the familiar `Queue`, `Exchange` and `Binding` domain objects.

##Conclusion

Complete details of the new features can be found in the [What's New section of the reference manual](http://docs.spring.io/spring-amqp/docs/1.5.0.M1/reference/html/_introduction.html#_changes_in_1_5_since_1_4) and the [JIRA release notes](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=10450&version=14837).

Users are encouraged to try the new features before the GA release and provide feedback using the normal channels (`spring-amqp` tag on Stack Overflow, and JIRA).

See [the project page](http://projects.spring.io/spring-amqp/) for links to documentation and downloads.