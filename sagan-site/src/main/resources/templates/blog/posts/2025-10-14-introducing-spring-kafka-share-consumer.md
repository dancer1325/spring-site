---
title: Introducing Share Consumer Support (Kafka Queues) in Spring for Apache Kafka
source: https://spring.io/blog/2025/10/14/introducing-spring-kafka-share-consumer
scraped: 2026-02-23T07:25:38.762Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Soby Chacko |  October 14, 2025 | 8 Comments
---

# Introducing Share Consumer Support (Kafka Queues) in Spring for Apache Kafka

_Engineering | Soby Chacko |  October 14, 2025 | 8 Comments_

Continuing our [Road to GA series](https://spring.io/blog/2025/09/02/road_to_ga_introduction), this week we're exploring Share Groups in Apache Kafka 4.0.0 and their integration in Spring for Apache Kafka 4.0.0 - a feature that fundamentally expands how we can consume messages from Kafka topics.

When we first start working with Kafka, the mental model is straightforward: topics hold messages, consumers read them, and processing happens in order within partitions. This partition-based model has served countless applications well, providing ordered processing with strong guarantees. However, certain use cases involve creating topics with hundreds of partitions primarily to achieve higher parallelism rather than for any ordering requirement. The relationship between partition count and consumer parallelism works perfectly when we need the ordering guarantees, but it becomes a constraint when we're processing independent events that don't require sequence preservation.

Apache Kafka 4.0.0 introduces [Share Groups (also known as "Kafka Queues")](https://cwiki.apache.org/confluence/display/KAFKA/KIP-932%3A+Queues+for+Kafka) as a complementary consumption model. This addition doesn't replace traditional consumer groups but offers an alternative for scenarios where record-level distribution makes more sense than partition-level assignment. Spring for Apache Kafka 4.0.0 brings full support for Share Groups, and in this post we'll explore how they work and when they fit our application needs.

Note that Share Groups are currently in preview status in Kafka 4.1.0 and are expected to reach production-ready status in Kafka 4.2.0.

## [](#two-models-for-different-needs)Two Models for Different Needs

Traditional consumer groups assign entire partitions to consumers. Each partition belongs to exactly one consumer in the group at any given time, which gives us ordered processing within that partition.

Share Groups take a different approach by distributing individual records rather than entire partitions. The broker coordinates record distribution across available consumers in the share group, allowing any consumer to receive any record regardless of which partition it came from.

The key tradeoff: traditional consumer groups provide ordering guarantees through partition assignment, while Share Groups provide scaling flexibility through record-level distribution.

## [](#when-to-use-share-groups)When to Use Share Groups

**Choose Share Groups when:**

-   Processing high volumes of independent events where throughput matters more than sequence. Examples include image processing pipelines, notification services, and job coordination systems where each task stands alone.
-   Workloads have variable demand patterns that fluctuate throughout the day or follow seasonal patterns. Share Groups let you scale consumers dynamically without provisioning hundreds of partitions for peak capacity.

**Continue using traditional consumer groups when:**

-   Sequence matters. If you're processing event streams where order is important (user sessions, financial transactions, state transitions), partition assignment with its ordering guarantees is the right model.
-   Building stateful processing that maintains aggregations or windows. These scenarios need the partition affinity that traditional consumer groups provide.

## [](#how-share-groups-work)How Share Groups Work

Let's look at the mechanics of Share Groups briefly to understand what changes under the hood.

When we create a consumer in a share group, it connects to the broker and requests records. The broker maintains coordination through a component called the Share Coordinator, which tracks which records have been assigned to which consumers. When a consumer requests records, the broker selects unassigned records from the topic's partitions and delivers them to that consumer. The records are now in "acquired" state - assigned to that specific consumer for processing.

The acquired state comes with a time-based lock (default 30 seconds, configurable via `group.share.record.lock.duration.ms`). If the consumer doesn't acknowledge the record within this timeout, the broker automatically returns it to the available pool for another consumer to process. This acquisition lock provides automatic failure recovery without requiring manual intervention when consumers crash or become unresponsive.

The consumer processes the record and sends back an acknowledgment. There are three possible acknowledgment types: `ACCEPT` (processed successfully), `RELEASE` (return to pool for retry), and `REJECT` (mark as permanently failed). Based on the acknowledgment, the broker updates the record's state and moves on.

This coordination happens at the broker level, which is different from how traditional consumer groups work where consumers directly track their offsets.

The broker also provides built-in retry semantics. Each time a record is delivered to a consumer, the broker increments an internal delivery count. By default, after 5 delivery attempts (configurable via `group.share.delivery.attempt.limit`), the broker moves the record to archived state. This gives us poison message protection without requiring application-level retry logic, though we can still implement our own retry strategies when we need more control.

## [](#getting-started-with-share-groups)Getting Started with Share Groups

The programming model for Share Groups in Spring for Apache Kafka stays close to what we already know. We have two primary ways to set up share consumers: programmatic container creation and annotation-driven listeners with `@KafkaListener`.

We start by configuring a `ShareConsumerFactory` instead of a regular `ConsumerFactory`:

```java
Copy@Configuration
public class ShareConsumerConfig {

    @Bean
    public ShareConsumerFactory<String, String> shareConsumerFactory() {
        Map<String, Object> props = new HashMap<>();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG,
                  StringDeserializer.class);
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG,
                  StringDeserializer.class);
        return new DefaultShareConsumerFactory<>(props);
    }

    @Bean
    public ShareKafkaListenerContainerFactory<String, String>
            shareKafkaListenerContainerFactory(
                ShareConsumerFactory<String, String> shareConsumerFactory) {
        return new ShareKafkaListenerContainerFactory<>(shareConsumerFactory);
    }
}
```

This configuration follows the same factory pattern we use for traditional consumers. We're defining a factory that creates share consumers and a container factory that manages the listener lifecycle. The Spring for Apache Kafka abstractions remain consistent across both consumption models.

### [](#programmatic-container-creation)Programmatic Container Creation

We can create a container programmatically and set up a message listener:

```java
Copy@Bean
public ShareKafkaMessageListenerContainer<String, String> imageProcessingContainer(
        ShareConsumerFactory<String, String> shareConsumerFactory) {

    ContainerProperties containerProps = new ContainerProperties("image-processing");
    containerProps.setGroupId("image-processors");

    ShareKafkaMessageListenerContainer<String, String> container =
        new ShareKafkaMessageListenerContainer<>(shareConsumerFactory, containerProps);

    container.setupMessageListener(new MessageListener<String, String>() {
        @Override
        public void onMessage(ConsumerRecord<String, String> record) {
            imageService.process(record.value());
            // Implicit ACCEPT when method completes successfully
        }
    });

    return container;
}
```

This gives us fine-grained control over container creation and configuration. We create a `ContainerProperties` instance with the topic and group ID, instantiate the container with the factory and properties, and attach our message listener.

### [](#annotation-driven-listeners)Annotation-Driven Listeners

For most use cases, the annotation-driven approach with `@KafkaListener` provides a cleaner programming model:

```java
Copy@KafkaListener(
    topics = "image-processing",
    groupId = "image-processors",
    containerFactory = "shareKafkaListenerContainerFactory"
)
public void processImage(String imageUrl) {
    // Process the image
    imageService.process(imageUrl);
    // Implicit ACCEPT when method completes successfully
}
```

The `containerFactory` attribute tells Spring to use our `ShareKafkaListenerContainerFactory`, which creates a share consumer instead of a traditional consumer. The `groupId` now refers to a share group rather than a consumer group, but the annotation structure stays the same.

When this method completes successfully, Spring for Apache Kafka automatically sends an `ACCEPT` acknowledgment to the broker. If an exception is thrown, it sends a `REJECT`, which marks the record as permanently failed and prevents further delivery attempts. This implicit acknowledgment mode works well for straightforward processing scenarios where success or failure maps cleanly to method completion or exception. If you need transient failures to trigger retries (using `RELEASE`), you'll want to use explicit acknowledgment mode for more fine-grained control.

## [](#explicit-acknowledgment-for-fine-grained-control)Explicit Acknowledgment for Fine-Grained Control

Sometimes we need more control over how records are acknowledged. We might want to explicitly reject poison messages that we know are invalid, or we might need to acknowledge at specific points in our processing logic rather than at method completion.

We can enable explicit acknowledgment at different levels. The most common approach is configuring it at the factory level:

```java
Copy@Bean
public ShareConsumerFactory<String, String> explicitShareConsumerFactory() {
	Map<String, Object> props = new HashMap<>();
	props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
	props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
	props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
	props.put(ConsumerConfig.SHARE_ACKNOWLEDGEMENT_MODE_CONFIG, "explicit");
	return new DefaultShareConsumerFactory<>(props);
}

@Bean
public ShareKafkaListenerContainerFactory<String, String> explicitShareKafkaListenerContainerFactory(
		ShareConsumerFactory<String, String> explicitShareConsumerFactory) {
	// The factory will detect the explicit acknowledgment mode from the consumer factory configuration
	return new ShareKafkaListenerContainerFactory<>(explicitShareConsumerFactory);
}
```

With explicit acknowledgment enabled, our listener method receives a `ShareAcknowledgment` parameter that gives us direct control:

```java
Copy@KafkaListener(
    topics = "payment-processing",
    groupId = "payment-processors",
    containerFactory = "shareKafkaListenerContainerFactory"
)
public void processPayment(PaymentEvent event,
                          ShareAcknowledgment acknowledgment) {
    try {
        if (!isValid(event)) {
            // Permanently reject invalid events
            acknowledgment.reject();
            return;
        }

        paymentService.process(event);
        acknowledgment.acknowledge();

    } catch (TransientException e) {
        // Release for retry with another consumer
        acknowledgment.release();
    } catch (PermanentException e) {
        // Don't retry unrecoverable errors
        acknowledgment.reject();
    }
}
```

The three acknowledgment types give us precise control over record outcomes. Calling `acknowledge()` tells the broker the record was processed successfully and can be archived. Calling `release()` returns the record to the pool for another consumer to process, useful for transient failures like temporary network issues or resource unavailability. Calling `reject()` marks the record as permanently failed and prevents further delivery attempts.

One important constraint in explicit acknowledgment mode: the consumer cannot poll for new records until all previously delivered records have been acknowledged. This prevents overwhelming the consumer with unprocessed records, but it means we must ensure every record receives an acknowledgment (accept, release, or reject) to avoid blocking the consumer thread. Spring for Apache Kafka helps with debugging by logging warnings after 30 seconds (configurable via `shareAcknowledgmentTimeout`) when records remain unacknowledged.

Remember that each `release()` increments the broker's internal delivery count, so the broker will eventually archive the record after reaching the configured limit, even if consumers keep calling `release()`.

## [](#scaling-with-concurrency)Scaling with Concurrency

Traditional Kafka consumers process records sequentially - each consumer instance polls for records and processes them one at a time from its assigned partitions. When we need more parallelism, we typically add more consumer instances, which often means more application instances or processes.

Share Groups enable a different scaling approach because record-level distribution removes the partition assignment constraint. Spring for Apache Kafka takes advantage of this by adding concurrency support directly to `ShareKafkaMessageListenerContainer`.

We can configure multiple consumer threads within a single container:

```java
Copy@Bean
public ShareKafkaListenerContainerFactory<String, String>
        shareKafkaListenerContainerFactory(
            ShareConsumerFactory<String, String> shareConsumerFactory) {
    ShareKafkaListenerContainerFactory<String, String> factory =
        new ShareKafkaListenerContainerFactory<>(shareConsumerFactory);
    factory.setConcurrency(10); // 10 concurrent consumer threads
    return factory;
}
```

This creates a container with 10 threads, each running its own share consumer polling loop. All 10 threads pull records from the same share group and process them concurrently within the same JVM. If we're running this across 5 application instances, that's 50 concurrent consumers working through the record stream.

This concurrency model gives us flexibility in how we scale. We can scale vertically by increasing concurrency (more threads per instance) or horizontally by adding more instances, or both. For workloads with variable demand, we can adjust concurrency settings or instance counts without changing topic configuration or worrying about partition rebalancing.

## [](#current-status-and-compatibility)Current Status and Compatibility

Share Groups were introduced as early access in Kafka 4.0.0, moved to preview in Kafka 4.1.0, and are expected to reach production-ready status in Kafka 4.2.0. Spring for Apache Kafka 4.0.0 (shipping with Spring Boot 4.0.0) provides support for Share Groups as implemented in Kafka 4.1.0 version.

There's an important compatibility consideration: Kafka 4.0.0 and 4.1.0 are not compatible for Share Groups. The protocol evolved between these versions, so clients and brokers need to be on the same minor version when using Share Groups. This matters particularly in environments where brokers and client libraries might upgrade at different times.

## [](#wrapping-up)Wrapping Up

Share Groups expand Kafka's consumption models by adding record-level distribution as an alternative to partition-level assignment. Both models serve important purposes - traditional consumer groups with their ordering guarantees remain essential for stateful processing and event sequencing, while Share Groups offer advantages for high-throughput processing of independent events.

The key is matching the consumption model to our application requirements. When sequence matters, partition assignment gives us the guarantees we need. When throughput and scaling flexibility matter more than order, record-level distribution can simplify our architecture and resource management.

The Spring for Apache Kafka implementation supports [KIP-932](https://cwiki.apache.org/confluence/display/KAFKA/KIP-932%3A+Queues+for+Kafka) and adds Spring-specific enhancements. The `@KafkaListener` integration maintains consistency with the programming model we use for traditional consumers. The built-in concurrency support provides options for scaling within a single application instance. Features like timeout detection and graceful shutdown help production deployments handle operational concerns.

Spring for Apache Kafka 4.0.0 makes working with Share Groups feel natural by maintaining consistency with the existing `@KafkaListener` model. We can adopt Share Groups incrementally, using them for specific use cases while continuing to use traditional consumer groups for others. The two models coexist within the same Spring for Apache Kafka application without conflict.

As Share Groups move toward production readiness in Kafka 4.2.0, it's worth evaluating whether they fit any of our current or planned use cases. If we've been provisioning high partition counts primarily for parallelism rather than ordering, or if we're dealing with variable workloads that make capacity planning difficult, Share Groups might offer a simpler approach.

For more details on Share Groups in Spring for Apache Kafka, check out the [reference documentation](https://docs.spring.io/spring-kafka/reference/4.0-SNAPSHOT/kafka/kafka-queues.html).

We welcome your feedback as you explore Share Groups in your applications. If you encounter issues or have suggestions for improvement, please open an issue on the [Spring for Apache Kafka GitHub repository](https://github.com/spring-projects/spring-kafka/issues). Your input helps us improve the framework as we move toward the GA release and beyond.