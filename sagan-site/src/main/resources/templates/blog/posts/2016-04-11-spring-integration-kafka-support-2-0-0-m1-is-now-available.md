---
title: Spring Integration Kafka Support 2.0.0.M1 is now available
source: https://spring.io/blog/2016/04/11/spring-integration-kafka-support-2-0-0-m1-is-now-available
scraped: 2026-02-23T19:14:20.342Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  April 11, 2016 | 6 Comments
---

# Spring Integration Kafka Support 2.0.0.M1 is now available

_Releases | Artem Bilan |  April 11, 2016 | 6 Comments_

I am pleased to announce that the `spring-integration-kafka` (Spring Integration Kafka Support) First Milestone for version `2.0` is now available.

The **Spring Integration Kafka** extension project provides `inbound` and `outbound` channel adapters for Apache Kafka.

Starting with this version 2.0 the project is a complete rewrite based on the new `spring-kafka` project which uses the pure java `Producer` and `Consumer` clients provided by Kafka `0.9.x.x`.

The artifact `org.springframework.integration:spring-integration-kafka:2.0.0.M1` is available in the [Milestone](https://repo.spring.io/milestone/) repository.

# [](#key-features)Key Features

## [](#the-kafka-consumer-channel-adapter)The Kafka Consumer Channel Adapter

Having the `MessageListenerContainer` foundation from the `spring-kafka` project, the `KafkaMessageDrivenChannelAdapter` definition is very simple now:

```java
Copy@Bean
public MessageProducer kafkaProducer(
                   AbstractMessageListenerContainer<Integer, String> container) {
    KafkaMessageDrivenChannelAdapter<Integer, String> adapter = 
                              new KafkaMessageDrivenChannelAdapter<>(container);
    adapter.setMessageConverter(new StringJsonMessageConverter());
    adapter.setOutputChannel(fromKafkaChannel());
    adapter.setErrorChannel(myErrorChannel());
    return adapter;
}
```

With the XML configuration we should declare just single component as well:

```xml
Copy<int-kafka:message-driven-channel-adapter
        id="kafkaListener"
        listener-container="container1"
        auto-startup="false"
        phase="100"
        send-timeout="5000"
        channel="nullChannel"
        message-converter="messageConverter"
        error-channel="errorChannel" />
```

## [](#the-kafka-producer-channel-adapter)The Kafka Producer Channel Adapter

With the `KafkaTemplate` foundation from the the `spring-kafka` project, the `KafkaProducerMessageHandler` is simple too:

```java
Copy@Bean
@ServiceActivator(inputChannel = "toKafka")
public MessageHandler kafkaProducerHandler(
                            KafkaTemplate<Integer, String> template) {
    KafkaProducerMessageHandler<Integer, String> handler = 
                         new KafkaProducerMessageHandler<>(template);
    handler.setTopicExpression(PARSER.parseExpression("headers.myTopic"));
    handler.setPartitionIdExpression(
                            PARSER.parseExpression("headers.myPartition"));
    return handler;
}
```

The XML configuration has been simplified, too:

```xml
Copy<int-kafka:outbound-channel-adapter 
                kafka-template="template" 
                channel="inputToKafka"
                topic="foo"/>
```

## [](#java-dsl-changes)Java DSL Changes

Starting with version `1.2` [Spring Integration Java DSL](https://github.com/spring-projects/spring-integration-java-dsl) introduces `Kafka09` Factory to cover the functionality for aforementioned channel adapters from this new `2.0` version. For example the producing part may look like:

```java
Copy.handle(Kafka09.outboundChannelAdapter(producerFactory())
             .defaultTopic("foo")
             .partitionId(m -> m.getHeaders().get("myPartition", Integer.class)))
```

And finally, don't miss [Spring for Apache Kafka](https://spring.io/blog/2016/04/11/spring-for-apache-kafka-1-0-milestone-2-available) announcement, too!

# [](#next-steps)Next Steps

Together with the next Spring for Apache Kafka we may consider to implement some adapters for [Kafka Streams](http://www.confluent.io/blog/introducing-kafka-streams-stream-processing-made-simple) as well.

Since the code base of the project became pretty straightforward and looks like Apache Kafka API is going to be [stable](https://cwiki.apache.org/confluence/display/KAFKA/Release+Plan+0.10.0), we intend to absorb this project in the Spring Integration Code 5.0, when the time comes.

Meanwhile we look forward to your feedback and if all goes well plan to release `2.0.0.RELEASE` in the next few weeks!

[Project Page](https://github.com/spring-projects/spring-integration-kafka) | [Help](http://stackoverflow.com/questions/tagged/spring-integration)