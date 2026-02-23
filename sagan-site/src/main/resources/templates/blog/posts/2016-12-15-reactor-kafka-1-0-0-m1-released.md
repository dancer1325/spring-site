---
title: Reactor Kafka 1.0.0.M1 released
source: https://spring.io/blog/2016/12/15/reactor-kafka-1-0-0-m1-released
scraped: 2026-02-23T18:54:45.713Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rajini Sivaram |  December 15, 2016 | 1 Comment
---

# Reactor Kafka 1.0.0.M1 released

_Releases | Rajini Sivaram |  December 15, 2016 | 1 Comment_

We are pleased to announce the release of the first milestone of Reactor Kafka 1.0.0.

### [](#what-is-reactor-kafka)[](#what-is-reactor-kafka)What is Reactor Kafka?

Reactor Kafka is a reactive API for [Apache Kafka](https://kafka.apache.org/) based on [Project Reactor](https://projectreactor.io). Reactor Kafka API enables messages to be published to Kafka topics and consumed from Kafka topics using functional APIs with non-blocking back-pressure and very low overheads. This enables applications using Reactor to use Kafka as a message bus or streaming platform and integrate with other systems to provide an end-to-end reactive pipeline.

The value proposition for Reactor Kafka is the efficient utilization of resources in applications with multiple external interactions where Kafka is one of the external systems. End-to-end reactive pipelines benefit from non-blocking back-pressure and efficient use of threads, enabling a large number of concurrent requests to be processed efficiently. The optimizations provided by Project Reactor enable development of reactive applications with very low overheads and predictable capacity planning to deliver low-latency, high-throughput pipelines.

### [](#getting-started)[](#getting-started)Getting Started

To get started and run sample reactive Kafka producers and consumers, follow the instructions in the [Getting Started](https://repo.spring.io/milestone/io/projectreactor/kafka/reactor-kafka-docs/1.0.0.M1/reactor-kafka-docs-1.0.0.M1.zip!/docs/index.html#_getting_started) section of the Reference Guide.

### [](#reactor-kafka-api)[](#reactor-kafka-api)Reactor Kafka API

Reactor Kafka API is based on the Apache Kafka Producer/Consumer API and consists of two main classes:

-   `Sender` for publishing messages to Kafka topics
    
-   `Receiver` for consuming messages from Kafka topics
    

The full functionality of the underlying Kafka `Producer` and `Consumer` are provided by these reactive interfaces.

#### [](#reactive-sender)[](#reactive-sender)Reactive Sender

```
CopySender<Integer, String> sender =
    Sender.create(SenderOptions.create(producerProps));                 (1)
Flux<SenderRecord<Integer, String, Integer>> outboundFlux =             (2)
    Flux.range(1, 10)
        .map(i -> SenderRecord.create(producerRecord(topic, i), i));
sender.send(outboundFlux, false)                                        (3)
      .doOnNext(r -> log.debug("Message #{} result: {}",
                         r.correlationMetadata(), r.recordMetadata()))  (4)
      .subscribe();                                                     (5)
```

1.  Create a `Sender`
    
2.  `Flux` of outbound messages to send to Kafka
    
3.  Reactive send
    
4.  Log the result of every send
    
5.  Subscribe to start flow of messages to Kafka
    

#### [](#reactive-receiver)[](#reactive-receiver)Reactive Receiver

```
CopyReceiverOptions<Integer, String> receiverOptions =                      (1)
    ReceiverOptions.<Integer, String>create(consumerProps)
                   .subscription(Collections.singleton(topic));
Receiver.create(receiverOptions)                                        (2)
        .receive()                                                      (3)
        .subscribe(r -> {
                log.info("Received message {} ", r.record());           (4)
                r.offset().acknowledge();                               (5)
            });
```

1.  Create `ReceiverOptions` and configure subscription to Kafka topic
    
2.  Create `Receiver`
    
3.  Reactive receive
    
4.  Log every incoming message
    
5.  Acknowledge after processing message so that offset may be committed
    

### [](#resources)[](#resources)Resources

Reactor Kafka source and samples are available on [github](https://github.com/reactor/reactor-kafka).

For more information and additional resources, see [Reactor Kafka Reference Guide](https://repo.spring.io/milestone/io/projectreactor/kafka/reactor-kafka-docs/1.0.0.M1/reactor-kafka-docs-1.0.0.M1.zip!/docs/index.html) and [Javadocs](https://repo.spring.io/milestone/io/projectreactor/kafka/reactor-kafka/1.0.0.M1/reactor-kafka-1.0.0.M1-javadoc.jar!/index.html).