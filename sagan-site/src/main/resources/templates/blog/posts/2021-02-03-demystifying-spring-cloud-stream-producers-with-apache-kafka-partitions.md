---
title: Demystifying Spring Cloud Stream producers with Apache Kafka partitions
source: https://spring.io/blog/2021/02/03/demystifying-spring-cloud-stream-producers-with-apache-kafka-partitions
scraped: 2026-02-23T13:32:39.808Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Soby Chacko |  February 03, 2021 | 0 Comments
---

# Demystifying Spring Cloud Stream producers with Apache Kafka partitions

_Engineering | Soby Chacko |  February 03, 2021 | 0 Comments_

In this blog, we are taking a deeper look at writing a Spring Cloud Stream producer with Apache Kafka and how it handles native partitions in Kafka.

Spring Cloud Stream has a middleware agnostic concept of partitions. Whenever possible, Spring Cloud Stream leverages the native partitioning capabilities of the middleware if it has such capabilities as in the case of Apache Kafka. This blog looks at how a Spring Cloud Stream developer handles partitions when writing a producer application that publishes data to Kafka. In a subsequent article, we will look at how consumers handle partitions in a Kafka based Spring Cloud Stream application.

Partitions are the basic unit of scaling and parallelism in Apache Kafka. Using the right partitioning strategies allows your application to handle terabytes of data at scale with minimal latency. A Kafka producer can write to different partitions in parallel, which generally means that it can achieve higher levels of throughput. While partitioning has these obvious upsides, there are other various considerations one needs to carefully make. Within a partition itself, throughput may be further limited by factors such as batching size, compression algorithms used, type of acknowledgments, replication factor, etc. Further, having more partitions means more open file handles (because partitions map to a directory on the broker and each log segment within a partition needs an index file and a data file). There are plenty of resources available on the web on how to come up with the right number of partitions for a Kafka application, which you may want to get familiar with before deploying your Kafka based enterprise producer application.

### [](#spring-cloud-stream-provisioner-for-kafka-binder)[](#spring-cloud-stream-provisioner-for-kafka-binder)Spring Cloud Stream Provisioner for Kafka binder

Spring Cloud Stream Kafka binder has a topic provisioner that handles the various application-level topic requirements. Among other things, creating and modifying the number of partitions is something that the provisioner is capable of doing. The Provisioner itself is not doing these operations but calls the right admin APIs from the Kafka cluster.

There are two scenarios that deal with topic creation that could come up with when writing a Spring Cloud Stream Kafka application in general. Most enterprises lock down access to the Kafka cluster and only an admin can make such operational changes as creating a topic, adding partitions, etc. In this scenario, the applications cannot directly create or modify topics. The other scenario is that the enterprise is pretty relaxed when it comes to giving access to the Kafka cluster in that the applications are free to create or modify the topics. Let’s consider a few of these things further.

#### [](#scenario-1-application-has-full-admin-privileges-on-the-kafka-cluster)[](#scenario-1-application-has-full-admin-privileges-on-the-kafka-cluster)Scenario 1: Application has full admin privileges on the Kafka Cluster

In this scenario, the application has full admin access to the Kafka cluster. You are writing a Spring Cloud Stream producer that publishes messages to a Kafka topic. For the sake of our discussion, let’s assume that this topic is non-existent and your application will create it. You also want to make sure that the topic is provisioned with a certain number of partitions.

There are a couple of ways to tell Spring Cloud Stream, how many partitions you want the topic to be provisioned with. Each one has pros and cons. Let’s look at them.

-   Use a binder wide property to specify the partition count. Using this, any topic that you create will have the same partition count. If your application is creating multiple topics and they all want the same number of partitions, this is an ideal way to create partitions. The disadvantage of this approach is that this is non-configurable per-binding unless overridden. The property you use at the binder level is the following.

`spring.cloud.stream.kafka.binder.min-partition-count`

-   Another option is to have the partition count specified at the binding level. Using this approach, you can have multiple topics in the same application configured with different partition counts. The following is the property

`spring.cloud.stream.bindings.<binding-name>.producer.partition-count`

Given that the previous global property enforces a minimum (it could be larger), the larger of the two will take effect for a specific binding.

-   If neither of the above options is used, then the topic will be created with the number of partitions based on the broker `num.partitions` property (default: 1).

#### [](#scenario-2-kafka-cluster-is-locked-down-and-the-application-is-not-allowed-to-perform-any-admin-operations)[](#scenario-2-kafka-cluster-is-locked-down-and-the-application-is-not-allowed-to-perform-any-admin-operations)Scenario 2: Kafka Cluster is locked down and the application is not allowed to perform any admin operations.

In this scenario, your options as an application developer are very limited. Since the Kafka cluster is locked down, the application will not be able to create or change existing topics. If the topic is not created beforehand, your application will throw an exception during startup and fail. In order to avoid this, you have to make sure that the topic is created with the right number of partitions and disable automatic topic provisioning using the binder property (spring.cloud.stream.kafka.binder.auto-create-topics set to false).

#### [](#scenario-3-application-has-full-admin-privileges-on-the-kafka-cluster-and-the-topic-already-exists-but-you-want-to-increase-the-partitions-next-time-the-application-starts)[](#scenario-3-application-has-full-admin-privileges-on-the-kafka-cluster-and-the-topic-already-exists-but-you-want-to-increase-the-partitions-next-time-the-application-starts)Scenario 3: Application has full admin privileges on the Kafka Cluster and the topic already exists, but you want to increase the partitions next time the application starts.

This is possible. Let’s say that your topic is already provisioned with 64 partitions, now you want to double that to 128 due to some higher capacity requirements. You let the binder know that by using either of the properties discussed in scenario 1. (`spring.cloud.stream.kafka.binder.min-partition-count` or `spring.cloud.stream.bindings.<binding-name>.producer.partition-count`)

In this case, the binder detects that the topic already exists. If the topic’s current partition size is less than what is requested, then the binder checks for a property `spring.cloud.stream.kafka.binder.autoAddPartitions`. By default, this is set to `false`. So, if the application has a need for increasing the partitions, this has to be explicitly set to `true`. If it is set to `true`, the provisioner will request the Kafka admin API to increase the number of partitions. If it is not set to true and the new requested number of partitions is higher than the existing number of partitions, then in the case of producers, the binder will complain that it cannot tolerate the lower number of partitions on the broker and throw a provisioning exception. If this happens, you have to either increase the partitions manually or set the `autoAddPartitions` property to `true`.

One thing to note in particular here is that the binder does not allow you to decrease the number of Kafka topic partitions through Spring Cloud Stream.

Bear in mind that increasing or decreasing the partitions (using any mechanism) might break strict ordering within a partition (if that’s a consideration), depending on your partitioning strategy (see below).

### [](#selecting-a-partition)[](#selecting-a-partition)Selecting a Partition

Now that we understand how topics are partitioned, we need to discuss how to select a partition for a particular record.

There are three mechanisms to select the partition:

#### [](#native-kafka-partition-selection)[](#native-kafka-partition-selection)Native Kafka Partition Selection

To use native partitioning, configure a custom Partitioner, either at the binder level, using the `spring.cloud.stream.kafka.binder.producer-properties.partitioner.class` property or at the binding level, using the `spring.cloud.stream.kafka.bindings.<binding>.producer.configuration.partitioner.class`

#### [](#directly-setting-the-partition-header)[](#directly-setting-the-partition-header)Directly setting the partition header

When using the default Kafka Partitioner, the application can directly set the `KafkaHeaders.PARTITION_ID` header to the desired partition.

#### [](#spring-cloud-stream-partition-selection)[](#spring-cloud-stream-partition-selection)Spring Cloud Stream Partition Selection

When using Spring Cloud Stream partitioning, leave the kafka partitioner to use its default partitioner, which will simply use the partition set in the producer record by the binder. In the following sections, we will see details of this support provided by Spring Cloud Stream.

### [](#how-does-a-spring-cloud-stream-producer-determine-which-partition-to-assign)[](#how-does-a-spring-cloud-stream-producer-determine-which-partition-to-assign)How does a Spring Cloud Stream producer determine which partition to assign?

How is it that the producer assigns records to the right partitions using Spring Cloud Stream? What are the controls available for doing so in Spring Cloud Stream? The remainder of this blog will focus on these questions.

#### [](#deciding-on-a-partition-key)[](#deciding-on-a-partition-key)Deciding on a partition key

Spring Cloud Stream provides two mechanisms for the application to decide on a partition key.

##### [](#1-partition-key-expression)[](#1-partition-key-expression)1\. Partition key expression

A simple approach is to provide the partition key as a SpEL expression property. Here is an example.

`spring.cloud.stream.bindings.<binding-name>.producer.partition-key-expression: headers['partitionKey']`

Then your application, when publishing the message, can add a header called partitonKey. Spring Cloud Stream will use the value for this header when evaluating the above expression to assign a partition key. Here is an example producer code:

```
Copy@Bean
public Supplier<Message<?>> generate() {
  return () -> {
     String value = “random payload”;
    	return MessageBuilder.withPayload(value)
           .setHeader("partitionKey", value.length() % 4)
           .build();
  };
}
```

##### [](#2-partition-key-extractor-strategy)[](#2-partition-key-extractor-strategy)2\. Partition key extractor strategy

Spring Cloud Stream provides an API called PartitionKeyExtractorStrategy which has a single method to implement - `Object extractKey(Message<?> message)`

You can implement this interface and configure it as a bean. Then provide a property `spring.cloud.stream.bindings.<binding-name>.producer.parition-key-extractor-name`

And then provide the bean name.

If you only have one such bean, then you can ignore providing this as a property. Spring Cloud Stream will simply pick this bean as the partition extractor strategy.

Setting a key using a partition key extractor strategy is the default mechanism. Spring Cloud Stream will only look for the partition key expression if an extractor strategy is not given.

Please bear in mind that this partition key we discussed here may not be the same as the ultimate partition the record will land upon. For that we need to use a partition selector that is using this key.

#### [](#selecting-the-actual-partition)[](#selecting-the-actual-partition)Selecting the actual partition

We selected a partition key, now how does it select the actual partition on Kafka topic?

Ok, now we got Spring Cloud Stream to decide on a partition key to use. But, how about actually selecting the partition based on this key? Similar to the partition key selection options, Spring Cloud Stream provides two different mechanisms for selecting the partition with a given key.

##### [](#1-use-a-partition-selector-strategy)[](#1-use-a-partition-selector-strategy)1\. Use a Partition Selector Strategy\`

Once again, this is a functional interface with a single method - `int selectPartition(Object key, int partitionCount)`

You can implement this method and provide it as a bean. If you only have one such bean, you don’t need any additional property. If there are more than one, then you can define it per binding using the property `spring.cloud.stream.bindings.<binding-name>.producer.parition-selector-name`

##### [](#2-partition-selector-expression)[](#2-partition-selector-expression)2\. Partition Selector Expression

If you don’t want to implement a partition selector strategy, you can also provide a SpEL expression that evaluates against the key.

If neither of these options are provided, then Spring Cloud Stream will use a default Partition Selector Strategy which is based on taking the hashCode of the key and then doing a modulo operation with the total partition count on the topic. Unless you have sophisticated needs, this default strategy will work in most cases.

### [](#why-is-the-binder-providing-two-different-abstractions)[](#why-is-the-binder-providing-two-different-abstractions)Why is the binder providing two different abstractions?

You might be wondering why we have these two different abstractions. First a partition key and then a partition selector. Partition key could be anything - for example, it could be an integer, a string (maybe a text with arbitrary length) or some other type. Partition selector will select a key based on the partition key expression. The selector also makes sure that the partition selected is bound within the available number of partitions. The default implementation does it by doing a modulo division of the hash code of the partition key and the total number of partitions. For this reason, when you have partitioning use cases like these, you must specify the `partittionCount` property on the producer. In summary, `PartitionKey` is a piece of data used by PartitionSelector to select the actual partition.

Let’s take a concrete example. Assume that you are writing an application that deals with credit card transactions. This application uses the credit card number as the partition key - a long random number with x number of digits. Imagine that depending on the first 4 digits of the credit card, you want to send that transaction to a particular partition in the topic. How do you do that? First, you set your `partitionKeyExpression` by parsing the card number to extract the first 4 digits (or provide a partition key extractor strategy). Then, you need to provide a partition selector strategy implementation in which, based on the key and the number of partitions, you select the key. If you don’t provide this or a partition key selector expression against the key, then the default partition selector strategy will select one for you. Say, your first 4 digits are 1234 and you have 10 partitions on the topic. Let’s say that the hash is computed as 1234 also. Then, this will land in partition `1234 % 10 = 4`. If you rather want this transaction to come to partition 8 for whatever reason, then you have to explicitly implement that in partition selector strategy class or expression.

Following is a flow chart representation of how these two different layers fit together.

![kafka producer partitions blog](https://github.com/spring-cloud/spring-cloud-stream-binder-kafka/raw/gh-pages/images/kafka-producer-partitions-blog.png)

### [](#confusion-between-partition-key-and-the-message-key)[](#confusion-between-partition-key-and-the-message-key)Confusion between partition key and the message key

Sometimes it is confusing to think through partition keys and the actual message keys going down the wire through the actual Kafka topic to be used on the Kafka record as the key. It is done through a different mechanism. The above partition key and the selector simply ensures that a partition key is chosen and based on that partition key, an actual partition is selected on the Kafka topic. But, how do you send a key with the record when producing? Here again, you can choose from two options. One is simply to attach a header into the outgoing message. Here is an example.

```
Copy@Bean Supplier<Message<String>> process() {
   return () -> MessageBuilder.withPayload("foo")
     .setHeader(KafkaHeaders.MESSAGE_KEY, "bar".getBytes()) .build(); }
```

You can also use a message key SpEL expression on the Kafka binder as below.

`spring.cloud.stream.kafka.binder.messageKeyExpression: headers['messageKey']`

Then attach this header on the outgoing message.

### [](#some-caveats-to-keep-in-mind)[](#some-caveats-to-keep-in-mind)Some caveats to keep in mind

If you don’t provide a partition key expression or partition key extractor bean, then Spring Cloud Stream will completely stay out of the business of making any partition decision for you. In that case, if the topic has more than one partition, Kafka’s default partitioning mechanisms will be triggered. By default, Kafka uses a DefaultPartitioner, which if the message has a key (see above), then using the hash of this key for computing the partition. If the message does not have a key, then it will be assigned using a round robin strategy. Starting with Kafka client 2.4 onwards, there are some additional complexities to keep in mind. If the record doesn’t carry the partition information (the main discussion of this blog) or if the record is missing a key, then starting with Kafka 2.4, it will use sticky partitions instead of a round-robin strategy. In a nutshell, sticky partitions are used to minimize the latency by sticking the records to a partition or a group of partitions. For more information on sticky partitions, see KIP-480 [https://cwiki.apache.org/confluence/display/KAFKA/KIP-480%3A+Sticky+Partitioner](https://cwiki.apache.org/confluence/display/KAFKA/KIP-480%3A+Sticky+Partitioner)

### [](#conclusion)[](#conclusion)Conclusion

In this blog, we discussed how Spring Cloud Stream can help with dealing with Kafka partitions when writing a producer based application. We saw a number of ways Spring Cloud Stream gives controls to the application developer to configure the various nuances of partitions. We saw the differences between partition key, partition selector and message key. We discussed how message keys can be added to a Kafka record. Finally, we looked at how Spring Cloud Stream producers can completely stay out of the partitioning business and let Kafka tackle it directly.