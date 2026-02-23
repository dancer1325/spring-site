---
title: Stream Processing with Spring Cloud Stream and Apache Kafka Streams. Part 3 - Data deserialization and serialization
source: https://spring.io/blog/2019/12/04/stream-processing-with-spring-cloud-stream-and-apache-kafka-streams-part-3-data-deserialization-and-serialization
scraped: 2026-02-23T14:21:12.033Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Soby Chacko |  December 04, 2019 | 3 Comments
---

# Stream Processing with Spring Cloud Stream and Apache Kafka Streams. Part 3 - Data deserialization and serialization

_Engineering | Soby Chacko |  December 04, 2019 | 3 Comments_

Part 1 - [Programming Model](https://spring.io/blog/2019/12/02/stream-processing-with-spring-cloud-stream-and-apache-kafka-streams-part-1-programming-model) Part 2 - [Programming Model Continued](https://spring.io/blog/2019/12/03/stream-processing-with-spring-cloud-stream-and-apache-kafka-streams-part-2-programming-model-continued)

Continuing on the previous two blog posts, in this series on writing stream processing applications with Spring Cloud Stream and Kafka Streams, now we will look at the details of how these applications handle deserialization on the inbound and serialization on the outbound.

All three major higher-level types in Kafka Streams - `KStream<K,V>`, `KTable<K,V>` and `GlobalKTable<K,V>` - work with a key and a value.

With Spring Cloud Stream Kafka Streams support, keys are always deserialized and serialized by using the native `Serde` mechanism. A `Serde` is a container object where it provides a deserializer and a serializer.

Values, on the other hand, are marshaled by using either `Serde` or the binder-provided message conversion. Starting with version 3.0 of the binder, using `Serde` is the default approach. Using the message converters in Spring is an optional feature that you only need to use on special occasions.

Let’s look at this processor:

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

This is the same processor we saw in the [previous blog](https://spring.io/blog/2019/12/03/stream-processing-with-spring-cloud-stream-and-apache-kafka-streams-part-2-programming-model-continued). It has two inputs and an output. The first input binding is a `KStream<String, Long>`. The key is of type `String` and the value is a `Long`. The next input binding is a `KTable<String, String>`. Here, both key and value are of type `String.` Finally, the output binding is a `KStream<String, Long>` with the key as a `String` and the value as a `Long`.

Normally, you have to tell the application the right `Serde` to use as part of the application’s configuration. However, when using the Kafka Streams binder, for most standard types, this information is inferred and you don’t need to provide any special configuration.

The types that are inferred by the binder are those for which Kafka Streams provides out of the box `Serde` implementations. These are those types:

-   Integer
-   Long
-   Short
-   Double
-   Float
-   Byte\[\]
-   UUID
-   String

In other words, if your `KStream`, `KTable`, or `GlobalKTable` have these as the types for the key and the value, you don’t need to provide any special `Serde` configuration.

## [](#providing-serde-objects-as-spring-beans)Providing Serde objects as Spring Beans

If the types are not from one of these, you can provide a bean of type `Serde<T>`, and, if the generic type `T` matches with the actual type, the binder will delegate that as the `Serde`.

For example, let's say you have the following function signature:

```
Copy@Bean
publicFunction<KStream<CustomKey, AvroIn>, KStream<CustomKey, AvroOut>> process() {

}
```

Then, the key and value types don’t match with any of the known `Serde` implementations. In that case, you have two options. The recommended approach is to provide a `Serde` bean, as follows:

```
Copy@Bean
public Serde<CustomKey> customKeySerde(){ 
  	return new CustomKeySerde();
}

@Bean
public Serde<AvroIn> avroInSerde(){ 
  	final SpecificAvroSerde<AvroIn> avroInSerde = new SpecificAvroSerde<>();
avroInSerde.configure(...);
return avroInSerde;

}

@Bean
public Serde<AvroOut> avroInSerde(){ 
 	final SpecificAvroSerde<AvroOut> avroOutSerde = new SpecificAvroSerde<>();
avroOutSerde.configure(...);
return avroOutSerde;
}
```

## [](#provide-serde-through-configuration)Provide Serde through Configuration

If you don’t want to provide `Serde` as programmatically created Spring beans, you can also define these by using configuration, where you pass the fully qualified name of the `Serde` implementation class, as follows:

```
Copyspring.cloud.stream.kafka.streams.bindings.process-in-0.consumer.keySerde=CustomKeySerde
spring.cloud.stream.kafka.streams.bindings.process-in-0.consumer.valueSerde=io.confluent.kafka.streams.serdes.avro.SpecificAvroSerde

spring.cloud.stream.kafka.streams.bindings.process-out-0.producer.keySerde=CustomKeySerde
spring.cloud.stream.kafka.streams.bindings.process-out-0.producer.valueSerde=io.confluent.kafka.streams.serdes.avro.SpecificAvroSerde
```

By the way, setting Serde like this will have higher precedence even if you have matching beans since these configurations are set on the actual consumer and producer bindings. The binder gives it precedence since the user explicitly requested it.

## [](#default-serde-and-falling-back-to-jsonserde)Default Serde and falling back to JsonSerde

At this point, if the binder still cannot match any `Serde`, it looks for a default one to match.

If all approaches fail to match one, the binder will fall back to the [JsonSerde](https://docs.spring.io/spring-kafka/api/org/springframework/kafka/support/serializer/JsonSerde.html) implementation provided by Spring for Apache Kafka project. If you don’t use any of the above mechanisms and let the binder fall back to `JsonSerde`, you have to make sure that the classes are JSON-friendly.

## [](#serde-used-inside-the-actual-business-logic)Serde used inside the actual business logic

Kafka Streams has several API methods that need access to `Serde` objects. For example, look at the method calls `joined` or `groupBy` from the earlier `BiFunction` example processor. This is actually the responsibility of the application developer to provide, as the binder cannot help with any inference in those instances. In other words, the binder support for `Serde` inference, matching a `Serde` with a provided bean, and so on are applied only on the edges of your application, at either the input or the output bindings. Confusion may arise because, when you use the binder for developing Kafka Streams applications, you might think that the binder will completely hide the complexities of `Serde`, which is a false impression. The binder helps you with the `Serde` only on consuming and producing. Any `Serde` required by your business logic implementation still needs to be provided by the application.

## [](#summary)Summary

In this blog post, we saw an overview of how the Kafka Streams binder for Spring Cloud Stream helps you with deserialization and serialization of the data. The binder can infer the key and value types used on the input and output bindings. We saw that the default is to always use native `Serde` mechanism, but the binder gives you an option to disable this and delegate to Spring’s message converters if need be. We also found out that any `Serde` required by your business logic implementation still needs to be provided by the application.

In the next blog post, we will look at the various error handling mechanisms that Kafka Streams provides for deserialization and production of messages and how the binder supports them.