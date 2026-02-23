---
title: Better application events in Spring Framework 4.2
source: https://spring.io/blog/2015/02/11/better-application-events-in-spring-framework-4-2
scraped: 2026-02-23T21:55:37.813Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Stéphane Nicoll |  February 11, 2015 | 83 Comments
---

# Better application events in Spring Framework 4.2

_Engineering | Stéphane Nicoll |  February 11, 2015 | 83 Comments_

Application events are available since the *very* beginning of the Spring framework as a mean for loosely coupled components to exchange information. One of the most well known usage of application events is the following:

```java
Copy@Component
public class MyListener 
        implements ApplicationListener<ContextRefreshedEvent> {
  
    public void onApplicationEvent(ContextRefreshedEvent event) {
        ...
    }
}
```

This allows `MyListener` to be notified when the context has *refreshed* and one can use that to run arbitrary code when the application context has fully started.

In Spring Framework 4.2 we have revisited the event infrastructure in three main areas that I am going to explain in this post.

## [](#generics-support)Generics support

It is now possible to define your `ApplicationListener` implementation with nested generics information in the event type, something like:

```java
Copypublic class MyListener 
        implements ApplicationListener<MyEvent<Order>> { ... }
```

When dispatching an event, the signature of your listener is used to determine if it matches said incoming event.

> Due to type erasure you need to publish an event that resolves the generics parameter you would filter on, something like `MyOrderEvent extends MyEvent<Order>`. There might be other workarounds and we are happy to revisit the signature matching algorithm if the community thinks it worthwhile.

## [](#annotation-driven-event-listener)Annotation-driven event listener

The biggest new feature is the support of annotation-driven event listeners, similar to our recent work on [JMS and AMQP endpoints](https://spring.io/blog/2014/04/30/spring-4-1-s-upcoming-jms-improvements) in Spring Framework 4.1. In a nutshell, it is now possible to simply annotate a method of a managed-bean with `@EventListener` to automatically register an `ApplicationListener` matching the signature of the method. Our example above can be rewritten as follows:

```java
Copy@Component
public class MyListener {
  
    @EventListener
    public void handleContextRefresh(ContextRefreshedEvent event) {
        ...
    }
}
```

`@EventListener` is a core annotation that is handled transparently in a similar fashion as `@Autowired` and others: no extra configuration is necessary with java config and the existing `<context:annotation-driven/>` element enables full support for it.

The method signature defines the event type that you're interested in. It is also possible to define a SpEL expression that should match in order to handle the event. For instance, consider the following event:

```java
Copypublic class OrderCreatedEvent implements CreationEvent<Order> { ... }

    private boolean awesome;
   
    public boolean isAwesome() { return this.awesome; }
    ....
}
```

The following example showcases an event listener that will only be invoked for an *awesome* `CreationEvent` of `Order` (i.e. if the `awesome` flag is `true`):

```java
Copy@Component
public class MyComponent {
  
  @EventListener(condition = "#creationEvent.awesome")
  public void handleOrderCreatedEvent(CreationEvent<Order> creationEvent) {
    ... 
  }

}
```

> As you can see from the sample above, method arguments are exposed via their names if such information can be discovered. The condition expression also exposes a "root" variable with the *raw* `ApplicationEvent` (`#root.event`) and the actual method arguments (`#root.args`).

## [](#publishing-events)Publishing events

You can define a non-`void` return type for any method annotated with `@EventListener`. If you return a non `null` value as the result of the processing of a particular event, we'll send that result as a new event for you.

You may have noticed that our `OrderCreatedEvent` does not extend from `ApplicationEvent`; we felt it was about time to give you the flexibility to publish any arbitrary event and not force you to extend from `ApplicationEvent`. The `ApplicationEventPublisher` interface has been extended to allow you to publish any object; when said object isn't an `ApplicationEvent`, we wrap it in a `PayloadApplicationEvent` for you. Remember this if you want to listen to such arbitrary event using a regular `ApplicationListener` implementation.

The following sample shows how you can use `ApplicationEventPublisher` to send an `OrderCreatedEvent`:

```java
Copy@Component
public class MyComponent {

    private final ApplicationEventPublisher publisher;
    
    @Autowired
    public MyComponent(ApplicationEventPublisher publisher) { ... }
    
    public void createOrder(Order order) {
        // ....
        this.publisher.publishEvent(new OrderCreatedEvent(order)); 
    }

}
```

## [](#transaction-bound-events)Transaction bound events

Another popular improvement is the ability to bind the listener of an event to a phase of the transaction. The typical example is to handle the event when the transaction has completed successfully: this allows events to be used with more flexibility when the outcome of the current transaction actually matters to the listener.

Spring Framework is currently structured in such a way that the context is not aware of the transaction support and we obviously didn't want to deviate from that very sane principle so we built an open infrastructure to allow additional components to be registered and influence the way event listeners are created.

The transaction module implements an `EventListenerFactory` that looks for the new `@TransactionalEventListener` annotation. When this one is present, an extended event listener that is aware of the transaction is registered instead of the default.

Let's reuse our example above and rewrite it in such a way that the order creation event will only be processed when the transaction in which the producer is running has completed successfully:

```java
Copy@Component
public class MyComponent {
  
  @TransactionalEventListener(condition = "#creationEvent.awesome")
  public void handleOrderCreatedEvent(CreationEvent<Order> creationEvent) { 
    ...
  }

}
```

Not much to see, right? `@TransactionalEventListener` *is* a regular `@EventListener` and also exposes a `TransactionPhase`, the default being `AFTER_COMMIT`. You can also hook other phases of the transaction (`BEFORE_COMMIT`, `AFTER_ROLLBACK` and `AFTER_COMPLETION` that is just an alias for `AFTER_COMMIT` and `AFTER_ROLLBACK`).

By default, if no transaction is running the event isn't sent at all as we can't obviously honor the requested phase, but there is a `fallbackExecution` attribute in `@TransactionalEventListener` that tells Spring to invoke the listener immediately if there is no transaction.

## [](#try-it-out)Try it out!

If you want to give this a try before the first milestone release of 4.2, grab a nightly SNAPSHOT build via our [snapshot repository](https://repo.spring.io/snapshot/). You can also create a sample project using [start.spring.io](https://start.spring.io) using the latest Spring Boot snapshot build, or if you're super lazy you can copy/paste this in your shell:

```
Copy$ curl https://start.spring.io/starter.tgz -d artifactId=events-demo \
    -d baseDir=events-demo -d bootVersion=1.2.2.BUILD-SNAPSHOT | tar -xzvf -
```

And update the project to use Spring Framework `4.2.0.BUILD-SNAPSHOT`

```xml
Copy<properties>
  ...
  <spring.version>4.2.0.BUILD-SNAPSHOT</spring.version>
</properties>
```

As always, we welcome community feedback, please try these features and let us know if you run into any issue.