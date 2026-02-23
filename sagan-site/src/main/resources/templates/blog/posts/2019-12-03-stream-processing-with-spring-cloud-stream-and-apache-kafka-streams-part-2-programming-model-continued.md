---
title: Stream Processing with Spring Cloud Stream and Apache Kafka Streams. Part 2 - Programming Model Continued
source: https://spring.io/blog/2019/12/03/stream-processing-with-spring-cloud-stream-and-apache-kafka-streams-part-2-programming-model-continued
scraped: 2026-02-23T14:21:07.621Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Soby Chacko |  December 03, 2019 | 5 Comments
---

# Stream Processing with Spring Cloud Stream and Apache Kafka Streams. Part 2 - Programming Model Continued

_Engineering | Soby Chacko |  December 03, 2019 | 5 Comments_

On the heels of the [previous blog](https://spring.io/blog/2019/12/02/stream-processing-with-spring-cloud-stream-and-apache-kafka-streams-part-1-programming-model) in which we introduced the basic functional programming model for writing streaming applications with Spring Cloud Stream and Kafka Streams, in this part, we are going to further explore that programming model.

Let’s look at a few scenarios.

## [](#scenario-1-single-input-and-output-binding)Scenario 1: Single input and output binding

If your application consumes data from a single input binding and produces data into an output binding, you can use Java’s Function interface to do that. Keep in mind that binding in this sense is not necessarily mapped to a single input Kafka topic, because topics could be multiplexed and attached to a single input binding (with comma-separated multiple topics configured on a single binding - see below for an example). On the outbound case, the binding maps to a single topic here.

Here is an example processor:

Note that the actual business logic implementation is given as a lambda expression in this processor.

```
Copy@Bean
public Function<KStream<Object, String>, KStream<String, WordCount>> wordcount() {

  return input -> input
        .flatMapValues(value -> Arrays.asList(value.toLowerCase().split("\\W+")))
        .map((key, value) -> new KeyValue<>(value, value))
        .groupByKey(Grouped.with(Serdes.String(), Serdes.String()))
        .windowedBy(TimeWindows.of(5000))
        .count(Materialized.as("wordcount-store"))
        .toStream()
        .map((key, value) -> new KeyValue<>(key.key(), new WordCount(key.key(), value,
              new Date(key.window().start()), new Date(key.window().end()))));
}
```

Look at the return signature of the processor. It is a `Function<KStream<Object, String>, KStream<String, WordCount>>`. The processor consumes a `KStream` and produces another `KStream` Under the hood, the binder uses an incoming Kafka topic to consume data from and then provide that to this input `KStream`. Similarly, on the outbound, the binder produces data as a `KStream` which will be sent to an outgoing Kafka topic.

Here is how you may provide input topics to this processor:

`spring.cloud.stream.bindings.wordcount-in-0.destination=words`

In the case of multiplexed topics, you can use this:

`spring.cloud.stream.bindings.wordcount-in-0.destination=words1,words2,word3`

The output topic can be configured as below:

`spring.cloud.stream.bindings.wordcount-out-0.destination=counts`

## [](#scenario-2-multiple-output-bindings-through-kafka-streams-branching)Scenario 2: Multiple output bindings through Kafka Streams branching

Kafka Streams lets you send to multiple topics on the outbound by using a feature called branching. Essentially, it uses a predicate to match as a basis for branching into multiple topics. This is largely identical to the example above, but the main difference is that the outbound is provided as a KStream\[\].

Here is an example processor:

```
Copy  @Bean
  public Function<KStream<Object, String>, KStream<?, WordCount>[]> wordcount() {

     Predicate<Object, WordCount> isEnglish = (k, v) -> v.word.equals("english");
     Predicate<Object, WordCount> isFrench = (k, v) -> v.word.equals("french");
     Predicate<Object, WordCount> isSpanish = (k, v) -> v.word.equals("spanish");

     return input -> input
           .flatMapValues(value -> Arrays.asList(value.toLowerCase().split("\\W+")))
           .groupBy((key, value) -> value)
           .windowedBy(TimeWindows.of(5000))
           .count(Materialized.as("WordCounts-branch"))
           .toStream()
           .map((key, value) -> new KeyValue<>(null, new WordCount(key.key(), value,
                 new Date(key.window().start()), new Date(key.window().end()))))
           .branch(isEnglish, isFrench, isSpanish);
  }
}
```

Pay attention to the second parametric type for the function. It is provided as a KStream\[\].

You can provide the individual output topics for these bindings:

```
Copyspring.cloud.stream.bindings.wordcount-out-0.destination=output1
spring.cloud.stream.bindings.wordcount-out-1.destination=output2
spring.cloud.stream.bindings.wordcount-out-2.destination=output3
```

## [](#scenario-3-two-input-bindings-and-a-single-output-binding)Scenario 3: Two input bindings and a single output binding.

When you have two input bindings and an output binding, you can represent your processor as a bean of type `java.util.function.BiFunction`. Here is an example:

```
Copy@Bean
public BiFunction<KStream<String, Long>, KTable<String, String>, KStream<String, Long>> process() {
  return (userClicksStream, userRegionsTable) -> (userClicksStream
        .leftJoin(userRegionsTable, (clicks, region) -> new RegionWithClicks(region == null ?
                    "UNKNOWN" : region, clicks),
              Joined.with(Serdes.String(), Serdes.Long(), null))
        .map((user, regionWithClicks) -> new KeyValue<>(regionWithClicks.getRegion(),
              regionWithClicks.getClicks()))
        .groupByKey(Grouped.with(Serdes.String(), Serdes.Long()))
        .reduce(Long::sum)
        .toStream());
}
```

The `BiFunction` has two inputs and an output. The first input is a `KStream`, and the second one is a `KTable`, whereas the output is another `KStream`. If you want to have a multiple `KStream` on the outbound, you can change the type signature to `KStream[] `and then make the necessary implementation changes.

Scenario 4: Two input bindings and no output bindings

If you only have two input bindings but no outputs, you can use Java’s `BiConsumer` support. Possible use cases are where you don’t want to produce output, but update some state stores. Here is an example:

```
Copy@Bean
public BiConsumer<KStream<String, Long>, KTable<String, String>> process() {
  return (userClicksStream, userRegionsTable) -> {
     userClicksStream.foreach((key, value) -> latch.countDown());
     userRegionsTable.toStream().foreach((key, value) -> latch.countDown());
  };
}
```

## [](#scenario-5-more-than-two-input-bindings)Scenario 5: More than two input bindings.

What if you have three or four or n number of input bindings? In that case, you cannot rely on a Function or BiFunction approach. You need to rely on partially applied functions. Basically, you start with a Function, but then, on the outbound of this first function, you provide another Function or Consumer until you exhaust your inputs. This technique of partially applying functions in this way is generally known as function currying in functional programming jargon. Here is an example that uses three inputs and a single output:

```
Copy@Bean
public Function<KStream<Long, Order>,
     Function<GlobalKTable<Long, Customer>,
           Function<GlobalKTable<Long, Product>, KStream<Long, EnrichedOrder>>>> process() {

  return orderStream -> (
        customers -> (
              products -> (
                    orderStream.join(customers,
                          (orderId, order) -> order.getCustomerId(),
                          (order, customer) -> new CustomerOrder(customer, order))
                          .join(products,
                                (orderId, customerOrder) -> customerOrder
                                      .productId(),
                                (customerOrder, product) -> {
                                   EnrichedOrder enrichedOrder = new EnrichedOrder();
                                   enrichedOrder.setProduct(product);
                                   enrichedOrder.setCustomer(customerOrder.customer);
                                   enrichedOrder.setOrder(customerOrder.order);
                                   return enrichedOrder;
                                })
              )
        )
  );
}
```

Carefully examine the processor’s type signature.:

```
CopyFunction<KStream<Long, Order>,
     Function<GlobalKTable<Long, Customer>,
           Function<GlobalKTable<Long, Product>, KStream<Long, EnrichedOrder>>>>
```

We start with a function that takes a `KStream` as input, but the second argument (the output of this function) is another `Function` that takes a `GlobalKTable` as input. This second Function has another function as its output, which has an input of another `GlobalKTable`. This third function is exhausting our inputs, and this function has a `KStream` as its output, which will be used for the output binding.

Let’s look at this model from a mathematical perspective.

Let's call these three functions as `f(x)`, `f(y)` and `f(z)`.

If we expand these functions, it will look like this:

`f(x) -> f(y) -> f(z) ->  KStream<Long, EnrichedOrder>`.

The **x** variable stands for `KStream<Long, Order>`, the **y** variable stands for `GlobalKTable<Long, Customer>` and the **z** variable stands for `GlobalKTable<Long, Product>`.

The first function `f(x)` has the first input binding of the application (`KStream<Long, Order>`) and its output is the function, `f(y)`.

The function` f(y)` has the second input binding for the application (`GlobalKTable<Long, Customer>`), and its output is yet another function, `f(z)`.

The input for the function `f(z)` is the third input for the application (`GlobalKTable<Long, Product>`) and its output is `KStream<Long, EnrichedOrder>`, which is the final output binding for the application.

The inputs from the three partial functions (`KStream`, `GlobalKTable`, `GlobalKTable`, respectively) are available in the method body for implementing the business logic as part of the lambda expression.

Bear in mind that, using function currying in Java as described above for more than a reasonable number of inputs (like three as in the above example) might cause code readability issues. Therefore, you have to carefully evaluate and decompose your application to see the appropriateness of having a larger number of input bindings in a single processor.

## [](#summary)Summary

In this blog post, we took a whirlwind tour of the various functional programming models that you can use in a Spring Cloud Stream-based Kafka Streams applications. We saw the ways in which we can use `java.util.function.Function` (or `Consumer` as we saw in the [previous blog](https://spring.io/blog/2019/12/02/stream-processing-with-spring-cloud-stream-and-apache-kafka-streams-part-1-programming-model)), `java.util.function.BiFunction`, and `BiConsumer.` We also saw how multiple bindings can be supported on the outbound by using Kafka Stream’s branching feature, which provides an array of `KStream` as output. Finally, we saw the ways in which more than two input bindings can be supported through partially applied (curried) functions. In the next blog post, we will see how data deserialization and serialization are performed by the Kafka Streams binder.