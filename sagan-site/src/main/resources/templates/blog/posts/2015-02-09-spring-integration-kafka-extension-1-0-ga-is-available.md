---
title: Spring Integration Kafka Extension 1.0.GA is available
source: https://spring.io/blog/2015/02/09/spring-integration-kafka-extension-1-0-ga-is-available
scraped: 2026-02-23T21:09:45.511Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  February 09, 2015 | 10 Comments
---

# Spring Integration Kafka Extension 1.0.GA is available

_Releases | Artem Bilan |  February 09, 2015 | 10 Comments_

Dear Spring community,

We are pleased to announce that the Spring Integration Kafka 1.0 GA extension is now available, providing familiar Spring Integration endpoints for Apache Kafka. As usual, use the [Release Repository](http://repo.springsource.org/release) with Maven or Gradle

```
Copycompile "org.springframework.integration:spring-integration-kafka:1.0.0.RELEASE"
```

or download a [distribution archive](http://repo.spring.io/release/org/springframework/integration/spring-integration-kafka/1.0.0.RELEASE), to give it a spin.

First of all thanks to all who contributed to the project - special thanks to the project's founder **Soby Chacko**, who implemented the infrastructure, as well as the High Level Consumer-based message source and the producers, and also to **Marius Bogoevici**, who learned the intricacies of the Simple Consumer API for the message-driven consumer.

**Overview**

It isn't a surprise that this project is fully based on [Apache Kafka](http://kafka.apache.org/) (the 0.8.1.1 version) and on the [Spring Integration](http://projects.spring.io/spring-integration/) foundation (4.0.5.RELEASE version). We provide several abstractions like `Configuration`, `ConnectionFactory`, `KafkaMessageListenerContainer`, `KafkaConsumerContext`/`KafkaProducerContext`, `KafkaMessage` etc. to follow with Spring's principles of decoupling and ease of use. Basing on those abstraction we provide high-level API like `KafkaMessageDrivenChannelAdapter`, `KafkaHighLevelConsumerMessageSource` and `KafkaProducerMessageHandler` which are adapters in terms of Spring Integration. The XML configuration support is also provided.

*KafkaHighLevelConsumerMessageSource*

The [Kafka High Level Consumer](https://cwiki.apache.org/confluence/display/KAFKA/Consumer+Group+Example) is presented with `<int-kafka:inbound-channel-adapter>` and `<int-kafka:consumer-context>` to `poll` messages from Kafka topics using `KafkaStream`. Its main advantage is simplicity of use and ability to balance partitions between consumers, if multiple instances of the message source are running in parallel.

The typical configuration may looks like:

```xml
Copy<int-kafka:inbound-channel-adapter kafka-consumer-context-ref="consumerContext"
                                    channel="inputFromKafka">
       <int:poller fixed-delay="10"/>
</int-kafka:inbound-channel-adapter>

<int-kafka:consumer-context id="consumerContext"
                            consumer-timeout="4000"
                            zookeeper-connect="zookeeperConnect">
     <int-kafka:consumer-configurations>
           <int-kafka:consumer-configuration group-id="default"
                                  value-decoder="valueDecoder"
                                  key-decoder="valueDecoder"
                                  max-messages="5000">
                  <int-kafka:topic id="test1" streams="4"/>
                  <int-kafka:topic id="test2" streams="4"/>
           </int-kafka:consumer-configuration>
    </int-kafka:consumer-configurations>
</int-kafka:consumer-context>
```

As you see in addition the `<int-kafka:consumer-context>` requires a reference to the `zookeeperConnect`. It is a simple bean, which represent a connection to the Zookeeper ensemble:

```xml
Copy<int-kafka:zookeeper-connect id="zookeeperConnect" 
                          zk-connect="host1,host2,host3:2182"
                          zk-connection-timeout="6000"
                          zk-session-timeout="6000"
                          zk-sync-time="2000"/>
```

The `KafkaHighLevelConsumerMessageSource` produces `Message` with `Map<String, Map<Integer, List<Object>>>` `payload`, where it is like "Kafka messages by partitions for each topic".

*KafkaMessageDrivenChannelAdapter*

The [Kafka Simple Consumer](https://cwiki.apache.org/confluence/display/KAFKA/0.8.0+SimpleConsumer+Example) is presented with `<int-kafka:message-driven-adapter>` and based on the well-know `ListenerContainer` abstraction - `KafkaMessageListenerContainer` (similar to Spring AMQP [`SimpleMessageListenerContainer`](http://docs.spring.io/spring-amqp/docs/latest-ga/reference/html/amqp.html#containerAttributes) or Spring JMS [`DefaultMessageListenerContainer`](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/jms.html#jms-asynchronousMessageReception)):

```java
Copy@Bean
public Configuration zkConfiguration() {
   return new ZookeeperConfiguration(new ZookeeperConnect());
}

@Bean
public ConnectionFactory kafkaConnectionFactory() {
   return new DefaultConnectionFactory(zkConfiguration());
}

@Bean
public MessageProducer kafkaMessageDrivenChannelAdapter() {
   KafkaMessageDrivenChannelAdapter adapter = 
            new KafkaMessageDrivenChannelAdapter(
   		new KafkaMessageListenerContainer(kafkaConnectionFactory(),    
                                       "topic1", "topic2"));
   adapter.setOutputChannel(inputChannel());
   return adapter;
}
```

The main advantage of this component is better control of the partitions one component listens to (which are configurable), as well as starting offsets (wherever replaying a topic is, for example, necessary). Also, richer offset management and error handling strategies are available, too.

The result of the listening task is a single `Message` with `payload` based on the Kafka message and additional `headers` with keys from `KafkaHeaders`. Ordering is preserved inside a partition.

Both adapters can be configured with `kafka.serializer.Decoder` for the Kafka message as well as for the Kafka message key. The Spring Integration Kafka provides out-of-the-box the [Avro](http://avro.apache.org/) `Encoder/Decoder` implementations.

In addition the Spring Integration Kafka introduces the `OffsetManager` abstraction to get deal with Kafka topic offset, which isn't available with `High Level Consumer`. The `MetadataStoreOffsetManager` and `KafkaTopicOffsetManager` are presented. The `OffsetManager` must be injected to the `KafkaMessageListenerContainer`. By default the `MetadataStoreOffsetManager` is used, backed by `SimpleMetadataStore` from Spring Integration Core.

*KafkaProducerMessageHandler*

The [Kafka Producer](https://cwiki.apache.org/confluence/display/KAFKA/0.8.0+Producer+Example) represents with `<int-kafka:outbound-channel-adapter>` and `<int-kafka:producer-context>` pair. The last one utilizes the configurations for the target Kafka `Producer`, which is selected by the `KafkaHeaders.TOPIC` from the `MessageHeaders` or by the `topic-expression` on the `<int-kafka:outbound-channel-adapter>` and matched to the configured `topic` option on the `<int-kafka:producer-configuration>` sub-element:

```xml
Copy<int-kafka:producer-context id="kafkaProducerContext">
	<int-kafka:producer-configurations>
		<int-kafka:producer-configuration broker-list="localhost:9092"
					key-class-type="java.lang.String"
					value-class-type="java.lang.String"
					topic="test1"
					value-encoder="kafkaEncoder"
					key-encoder="kafkaEncoder"
					compression-codec="default"/>
		<int-kafka:producer-configuration broker-list="localhost:9092"
					topic="test2"
					compression-codec="default"/>
	</int-kafka:producer-configurations>
</int-kafka:producer-context>
```

As you see there are enough options for tuning the target `Producer`, as well as each `Producer` can be backed by the specific `broker-list`. If only the single `<int-kafka:producer-configuration>` is present you can send messages to any `topic`, e.g. based on the `Message` context headers.

The [Spring XD](http://projects.spring.io/spring-xd/) utilizes these adapters as Kafka Source and Sink. In addition it provides the `KafkaMessageBus`. These features will be available in the Spring XD 1.1 RELEASE soon.

Also, while we were finishing this release, [Apache Kafka](http://kafka.apache.org/) 0.8.2 has received its final release as well. We are happy to congratulate the team, and we will incorporate the new features available in the near future - this is just the beginning of providing premier support for Kafka in Spring applications!

See the project [home page](https://github.com/spring-projects/spring-integration-kafka) for more information.

As always, we look forward to your comments and feedback ([StackOverflow](http://stackoverflow.com) (`spring-integration` tag), [Spring JIRA](https://jira.spring.io/browse/INTEXT), [GitHub](https://github.com/spring-projects/spring-integration-kafka/issues)) and we very much welcome [contributions](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.md)!