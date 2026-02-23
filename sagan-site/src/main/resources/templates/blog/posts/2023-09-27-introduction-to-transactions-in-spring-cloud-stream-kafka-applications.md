---
title: Introduction to Transactions in Spring Cloud Stream Kafka Applications
source: https://spring.io/blog/2023/09/27/introduction-to-transactions-in-spring-cloud-stream-kafka-applications
scraped: 2026-02-23T09:15:09.564Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Soby Chacko |  September 27, 2023 | 3 Comments
---

# Introduction to Transactions in Spring Cloud Stream Kafka Applications

_Engineering | Soby Chacko |  September 27, 2023 | 3 Comments_

We are starting a new blog series that focuses on working with transactions in Spring Cloud Stream Kafka applications. This blog series covers many low-level details of writing transactional applications with Spring Cloud Stream and Apache Kafka. By the end of this blog series, we hope to give you enough information about writing transactional Spring Cloud Stream Kafka applications for various business use cases.

## [](#basic-building-blocks)Basic Building Blocks

The foundational support for transactions in Spring Cloud Stream Kafka applications primarily comes from Apache Kafka itself and the Spring for Apache Kafka library. However, this blog series is about using this support specifically with Spring Cloud Stream. If you are familiar with how transactions work in Apache Kafka and how Spring for Apache Kafka makes it possible to use it in a Spring-friendly way, this series will feel like home turf.

While Apache Kafka provides the foundational transaction support, the Spring for Apache Kafka (AKA Spring Kafka) library extends this support on the Spring side to make it more natural for Spring developers to use it by relying on the traditional transactional support available in Spring Framework. The Kafka binder in Spring Cloud Stream further builds upon this support from Spring for Apache Kafka, making it possible to use that same support in Spring Cloud Stream Kafka applications. In this first part of the blog series, we briefly introduce Kafka transactions, some use case analysis where it becomes helpful to rely on transactions, and the transactional building blocks in Apache Kafka and the Spring ecosystem.

There are many use cases, in which, publishing, consuming, and processing records transactionally in Apache Kafka becomes necessary. When producing records transactionally in a producer-initiated application or a process that implements a consume-process-produce pattern transactionally, they are written to Kafka atomically. If something goes wrong, the whole process gets rolled back, and the transaction is not committed. One thing to remember is that, unlike a relational database that supports transactions, where no records persist when such transaction rollback occurs, Apache Kafka still publishes the records to the topic partition. This behavior is due to the fundamental append-only immutable log-based architecture of Apache Kafka, which does not allow any record modifications, such as removing the records after adding them to the record log. One might wonder what the benefit of using transactions is, since the records may be published to the topic partition when a transaction gets aborted, potentially causing consumers to see them. However, a consumer with the proper [isolation levels](https://docs.confluent.io/platform/current/installation/configuration/consumer-configs.html#isolation-level) never sees the rolled-back records, even though the records from the rolled-back transaction are in the topic partition. Thus, from an end-to-end standpoint, the whole process is guaranteed to be fully transactional.

## [](#transactional-use-cases)Transactional Use Cases

Transactions usually add significant overhead in Kafka applications. When using transactions in Apache Kafka, each record must add special transaction logs to the record, send a transaction marker to a special transaction state topic, and so on. All these steps take time and space, increasing the overall latency. Therefore, each application must carefully examine the need for transactional support by analyzing the use cases.

Transactions provide a way to primarily safeguard the data to provide [ACID](https://en.wikipedia.org/wiki/ACID) capabilities. It ensures data integrity by providing atomicity, consistency, data isolation, and durability.

There are several mission-critical use cases in today’s enterprises where using transactions and relying on the ACID semantics they bring is highly desirable. There is no simple, straightforward answer regarding when you want to use transactions and justify the overhead it brings. You have to look at the application and evaluate what is at stake. The usual canonical example of transactions is anything that needs to deal with financial data. Bob sends money to Alice, an action that debits from Bob’s account, and Alice gets credited. If anything goes wrong in this process, the whole thing gets rolled back as if nothing happened, as we do not want the flow to be in a haphazard state. If the process debits from Bob’s account, but Alice is not credited (or vice-versa), that is a problem. From Apache Kafka perspective, we have a few things going on here. First, a message comes to a Kafka processor to debit from Bob’s account and the receiver's information. The processor processes the information and then sends a message to another topic, indicating that a debit occurred from Bob’s account. After this, another message indicates that Alice is now credited. The various actions in this process require complex coordination to ensure that everything happens as expected. Any time we have multiple related events like these, transactions may help ensure data integrity and provide the ACID semantics. In this example, a single event does not have much meaning standalone, but they all combine to form the entire flow and require transactionality to ensure data integrity.

If we want to generalize this pattern, we can say that any time we have a consume-process-publish pattern that is mission critical, where, if one component fails, the whole processor needs to act as if it didn’t happen, using transactions is a potential solution to look at.

#### [](#more-high-level-examples-from-other-domains)More high-level examples from other domains

-   Imagine an airline reservation system that needs to publish information about a reservation with multiple legs. If, for any reason, the system cannot publish the whole reservation, it needs to abort the process and start over.
-   A brokerage that sends requests that contain multiple buy orders to send to a clearing house. Suppose the process cannot publish the individual orders as a single atomic unit to the messaging system from which the clearing house consumes. In that case, the brokerage must resend the order.
-   A medical billing system that sends patient test data to an insurance company must publish various related tests from a patient to the messaging system.
-   An online gaming system needs to track players' positions in a game and send them to a centralized server transactionally to ensure that all the players see the correct coordinates, not partially updated locations.
-   An inventory restocking system at a retailer needs to send information about various related product statuses as a single atomic unit.
-   An online e-commerce ordering system that publishes order details (such as order entries, account holder information, shipping information, and so on) within a single atomic aggregate operation.

#### [](#synchronizing-with-external-databases)Synchronizing with External Databases

Another class of use cases in which transactions become handy is when you have to synchronize with other transactional systems. In addition to publishing to Kafka, assume that you must persist the records or some derived information in a relational database, all within a single atomic operation. If one system fails to send the data, we must roll back. If you have only a single record each time to publish to Kafka and nothing else and no other related operations, you do not need to use transactions, as we will see in the next part of this blog series. However, even if you publish to a Kafka topic only once but use a relational database operation as part of the same process, using transactions becomes necessary to ensure data integrity.

#### [](#publishing-to-multiple-kafka-topics)Publishing to Multiple Kafka Topics

Another use case for transactions in a producer-only application is publishing to multiple Kafka topics. Assume you have some business-critical data in the form of a critical notification (such as an order detail) you wish to publish to multiple Kafka topics, some part of the order detail to an order topic, and another to a shipping topic. In that case, we can use transactions to ensure end-to-end data integrity.

#### [](#generalizing-the-transactional-use-cases-above)Generalizing the Transactional Use Cases Above

The above set of use cases is a non-exhaustive list where transactions are necessary. Many other use cases, not that different from the general thrust of the ones we looked at, exist in today’s enterprises from various domains that require transactional processing in messaging systems.

The following list summarizes generalized use cases where transactions in Apache Kafka can be helpful:

-   Consume-process-publish systems where it needs to publish records as a single atomic unit and provide an exactly-once-semantics delivery guarantee.
-   Multiple publishing events that are related and do not make sense individually.
-   Publishing data to multiple topics as a single atomic unit.
-   Synchronizing with external transaction managers.

Here is a pictorial representation of all these various situations. It covers the scenarios we considered above, such as the consume-process-produce, multiple producers, synchronizing with external transactions, and others. A processor consumes data from an inbound topic, executes the business logic, persists some information to a database system, and publishes to multiple Kafka topics.

![scst-kafka-txn-overview](https://github.com/spring-cloud/spring-cloud-stream/raw/gh-pages/images/scst-kafka-txn-overview.png)

## [](#transactions-in-apache-kafka)Transactions in Apache Kafka

There is plenty of literature available to study the low-level details of how transactions work in Apache Kafka, and [here is an article](https://www.confluent.io/blog/transactions-apache-kafka) that can give an introduction to those details. However, briefly seeing the Kafka client APIs for achieving transactionality from a very high-level is still worthwhile. One thing to note is that, when it comes to plain consumers, there is no such thing as a transactional consumer in Kafka, but there are transaction-aware consumers. Consumers achieve this transactional awareness by setting the isolation level. By default, a consumer in Kafka sees all records, even the uncommitted records, by an upstream producer because the default isolation level is **read\_uncommitted** in a Kafka consumer. A Kafka consumer must use the isolation level of **read\_committed** to provide end-to-end transactional semantics. We will see how we can accomplish this in Spring Cloud Stream in the upcoming sections of this blog series.

On the producer side, there are a few API methods that an application relies on from the Kafka client. Let’s take a look at the important ones.

To make an application transactional, the Kafka client requires a transaction ID. The applications provide it through a Kafka producer property called **transactional.id**, which the transaction coordinator uses to initiate the transaction by registering it. The transaction coordinator uses this ID to track all aspects of the transaction, such as initializing it, ongoing progress, commit, etc.

The following list summarizes the critical transaction-related producer API methods.

**Producer#initTransactions()** - Called once per producer to initiate transaction support. Initializes the Kafka transaction.

**Producer#beginTransaction()** - Begins the transaction before sending the record.

**Producer#sendOffsetsToTransaction()** - Sends the consumed record offset to the transaction.

**Producer#commitTransaction()** - Commits the transaction.

**Producer#abortTransaction()** - Aborts the transaction.

Before sending a record, we need to initialize and begin the transaction. Then, it carries on with data processing. If we consumed a record to do this publishing, we must send the consumed record’s offset to the transaction using the producer. After this, the transaction commit or abort operation can continue (commitTransaction or abortTransaction). When we call the commitTransaction method, that is when, exactly, the offsets are atomically sent to the consumer\_offsets topic by the Kafka client.

## [](#transaction-support-in-spring-for-apache-kafka)Transaction Support in Spring for Apache Kafka

When using a framework like Spring for Apache Kafka or Spring Cloud Stream Kafka binder that relies on it, they bring the benefit of allowing applications to focus primarily on the business logic since the frameworks handle the low-level boilerplate transactional sequence that we saw above. It would be beneficial to use Spring for Apache Kafka or another framework (such as Spring Cloud Stream that uses it) because it allows us not worrying about writing the low-level boilerplate sequence (described above) to ensure that all the transactional steps succeed. As you can imagine, there are many moving parts here, and if you omit a step or not doing a step as per the expectations, it could make the application error-prone. In the case of Spring, the frameworks we mentioned handle them on behalf of the application developer. Let’s briefly see how it does that.

The Spring for Apache Kafka framework hides all these low-level details by providing a consistent transactional programming model familiar to Spring developers. The result is that the applications, when using Spring for Apache Kafka or another framework such as Spring Cloud Stream, can simply focus on the application’s business logic rather than deal with complex low-level transactional-related matters.

#### [](#kafkatransactionmanager)KafkaTransactionManager

How does Spring for Apache Kafka provide this consistent transactional programming model? The short answer is that Spring developers have traditionally used Transactional annotation or programmatic approaches, such as using a TransactionTemplate directly in the applications to create local transactions. These mechanisms need a transaction manager implementation to drive the transactional aspects. Spring for Apache Kafka provides a transaction manager implementation. **KafkaTransactionManager** is an implementation of the **PlatformTransactionManager** in Spring Framework. You can use this transaction manager along with the Transactional annotation or in local transactions by using a TransactionTemplate. KafkaTransactionManager uses a producer factory to create a Kafka producer and provides APIs to begin, commit, and roll back transactions.

#### [](#kafkaresourceholder)KafkaResourceHolder

Spring for Apache Kafka also provides a **KafkaResourceHolder** that holds the Kafka producer resource. KafkaTemplate in Spring for Apache Kafka triggers the binding of a KafkaResourceHolder on the current thread for a given producer factory. In the case of a consumer-initiated transaction, the message listener container does this binding, and the producer factory is the same as that used by the KafkaTransactionManager. This way, the transaction uses the same transactional producer for all publishing needs.

In addition to the above components, Spring for Apache Kafka provides other utilities for dealing with transactional-related concerns. As it becomes necessary when we go through the following sections of this series, we will see some of them.

In part 2 of this blog series, we will move on to more practical implementation details of using transactions in Spring Cloud Stream applications.