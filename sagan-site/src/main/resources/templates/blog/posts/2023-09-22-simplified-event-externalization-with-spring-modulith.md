---
title: Simplified Event Externalization with Spring Modulith
source: https://spring.io/blog/2023/09/22/simplified-event-externalization-with-spring-modulith
scraped: 2026-02-23T09:20:06.966Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oliver Drotbohm |  September 22, 2023 | 4 Comments
---

# Simplified Event Externalization with Spring Modulith

_Engineering | Oliver Drotbohm |  September 22, 2023 | 4 Comments_

Transactional service methods are a common pattern in Spring applications. These methods trigger a state transition important to the business. This usually involves a core domain abstraction, such as an aggregate and its corresponding repository. A stereotypical example of such an arrangement might look like this:

```
Copy@Service
@RequiredArgsConstructor
class OrderManagement {

  private final OrderRepository orders;

  @Transactional
  Order complete(Order order) {
     return orders.save(order.complete());
  }
}
```

As state transitions like these might be interesting to third parties, we might want to involve a message broker to publish a message for general distribution across other systems. A naive approach to implement this would be to hide that kind of interaction in another Spring service, inject that into our primary bean and invoke a method that would ultimately interact with the broker.

```
Copy@Service
@RequiredArgsConstructor
class OrderManagement {

  private final OrderRepository orders;
  private final MessageSender sender;

  @Transactional
  Order complete(Order order) {

     var result = orders.save(order.complete());

     sender.publishMessage(…);

     return result;
  }
}
```

## [](#problems)Problems

Unfortunately, this approach suffers from a variety of problems:

1.  As the method runs within a transaction, it has already acquired a database connection. Interaction with other infrastructure is costly and, thus, likely significantly extends the length of the transaction, preventing the connection from being returned early, which might lead to connection pool saturation and, thus, poor performance.
2.  While we have elegantly wrapped the interaction with the broker behind a nice-looking facade, our `completeOrder(…)` method is now susceptible to more infrastructure problems. Failing to access the broker rolls back the transactions and prevent orders from completion. Our system might be technically available but entirely unable to do anything useful due to a downstream infrastructure problem.
3.  Lastly, we have created a consistency issue in case the message publication succeeds but the database transaction ends up rolling back eventually.

A common pattern to solve these problems is publishing an application event from the service, which, at first glance, doesn't look too different from what we had laid out before.

```
Copy@Service
@RequiredArgsConstructor
class OrderManagement {

  private final OrderRepository orders;
  private final ApplicationEventPublisher events; 

  @Transactional
  Order complete(Order order) {

     var result = orders.save(order.complete());

     events.publishEvent(
         new OrderCompleted(result.getId(), result.getCustomerId()));

     return result;
  }

  record OrderCompleted(OrderId orderId, CustomerId customerId) {}
}
```

The primary difference here is that the event published is a simple object handed around *within* the JVM in the first place. The actual interaction with the broker would then be implemented in an `@Async` `@TransactionalEventListener`. By default, such a listener will be invoked after the original business transaction has committed, which resolves issue 3. Marking the listener with `@Async` causes the event handling being executed on a separate thread, which in turn solves problem 1.

## [](#spring-modulith-event-externalization)Spring Modulith Event Externalization

The implementation of the listener is a rather mundane exercise: we have to select a broker-specific client (Spring Kafka, Spring AMQP, JMS, and others), marshal the event, determine a routing target, and (optional and depending on the broker) a routing key. Spring Modulith 1.1 M1 ships such an integration out of the box. To use it with Kafka, for example, you would add the corresponding artifact to your project’s class path:

```
Copy<dependency>
  <groupId>org.springframework.modulith</groupId>
  <artifactId>spring-modulith-events-api</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.modulith</groupId>
  <artifactId>spring-modulith-events-kafka</artifactId>
  <scope>runtime</scope>
</dependency>
```

The presence of the latter JAR registers a listener, as described above. To get an application event transparently published to a broker, you can annotate it with the `@Externalized` annotation provided by either Spring Modulith's (the first JAR) or jMolecules' (not shown), like this:

```
Copyimport org.springframework.modulith.events.Externalized;

@Externalized("orders.OrderCompleted::#{customerId()}")
record OrderCompleted(OrderId orderId, CustomerId customerId) {}
```

The presence of the annotation triggers instances of that class being selected for publication. We have defined `orders.OrderCompleted` as a routing target. The SpEL expression, `#{customerId()}`, selects the accessor method to be invoked on the event to produce a routing key, which triggers the correct partition assignment. If you prefer describing event selection and routing in code, check out how to use [`EventExternalizationConfiguration`](https://docs.spring.io/spring-modulith/reference/1.1/events.html#externalization.api).

## [](#error-scenarios)Error Scenarios

This is all pretty convenient, and we have elegantly solved two of our three problems already. But what about the error scenario? What if the message publication fails? The original business transaction has already committed, but we have now lost the internal event publication. Fortunately, that case is already solved by Spring Modulith's [Event Publication Registry](https://docs.spring.io/spring-modulith/reference/1.1/events.html#publication-registry). It creates a registry entry for every transactional event listener interested in an event being published and marks that entry completed only if the listener succeeds. Failing to send the message to the broker results in the entry staying around, being subject to resubmission attempts later.

## [](#summary)Summary

Interacting with third infrastructure within a primary business transaction should be avoided for performance, reliability, and consistency reasons. Spring Modulith 1.1 allows easily publishing application events to message brokers by marking event types for externalization and defining routing targets and keys. For more information, refer to the [reference documentation](https://docs.spring.io/spring-modulith/reference/1.1/events.html#externalization).