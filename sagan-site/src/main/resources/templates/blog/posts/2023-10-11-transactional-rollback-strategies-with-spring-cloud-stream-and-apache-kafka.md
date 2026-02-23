---
title: Transactional Rollback Strategies with Spring Cloud Stream and Apache Kafka
source: https://spring.io/blog/2023/10/11/transactional-rollback-strategies-with-spring-cloud-stream-and-apache-kafka
scraped: 2026-02-23T09:15:22.700Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Soby Chacko |  October 11, 2023 | 0 Comments
---

# Transactional Rollback Strategies with Spring Cloud Stream and Apache Kafka

_Engineering | Soby Chacko |  October 11, 2023 | 0 Comments_

**Other parts in this blog series**

Part 1: [Introduction to Transactions in Spring Cloud Stream Kafka Applications](https://spring.io/blog/2023/09/27/introduction-to-transactions-in-spring-cloud-stream-kafka-applications)

Part 2: [Producer Initiated Transactions in Spring Cloud Stream Kafka Applications](https://spring.io/blog/2023/09/28/producer-initiated-transactions-in-spring-cloud-stream-kafka-applications)

Part 3: [Synchronizing with External Transaction Managers in Spring Cloud Stream Kafka Applications](https://spring.io/blog/2023/10/04/synchronizing-with-external-transaction-managers-in-spring-cloud-stream)

In the last three sections of this blog series, we analyzed how transactions work in Spring Cloud Stream Kafka applications. We encountered different contexts in which transactions are helpful, including both producer and consumer applications and how an application can correctly use them. Now that those fundamental elements are behind us, let’s move on to another aspect of transactions: **rolling back a transaction when an error occurs**. When an error occurs and a transactional system cannot commit the transaction, the transaction manager rolls back the transaction and does not persist anything for a downstream consumer to see. It would help if an application could dictate how this rollback mechanism works. Spring Cloud Stream facilitates this rollback customization through the fundamental support in Spring for Apache Kafla. We must be aware of a few things regarding producer and consumer (**consume-process-produce**) transactional applications. We take a tour through those.

### [](#producer-initiated-transactions)Producer-initiated transactions

Here is a code snippet that we saw before in the [previous article](https://spring.io/blog/2023/10/04/synchronizing-with-external-transaction-managers-in-spring-cloud-stream).

```
Copy@Transactional        
public void send(StreamBridge streamBridge)      
{
    for (int i = 0; i < 5; i++) {
      streamBridge.send("mySupplier-out-0", "my data: " + i);           
    }
}
```

What do we do if the transactional method throws an exception? The answer is that we need to do nothing from a Spring Cloud Stream perspective. The transaction interceptor initiates a rollback, and, ultimately, the transaction coordinator in Kafka aborts the transaction. Eventually, the exception gets propagated to the caller, and then it can decide to retrigger the transactional method if the error is transient. The framework does not retry as this is a producer-initiated transaction. This case is straightforward, as we do not need to do anything from an application or framework perspective during the transaction rollback. If an error occurs, it is guaranteed to be rolled back. However, recall that even though the transaction was rolled back, there may be uncommitted records in the Kafka logs. Consumers with isolation level `read_uncommitted` (the default) still receive these records. Therefore, consumer applications must ensure that they use an isolation level of `read_committed` so that they don’t receive any records rolled back by transactions upstream.

### [](#producer-initiated-transactions-synchronizing-with-external-transactions)Producer-Initiated Transactions Synchronizing with External Transactions

We saw this scenario in the last part of this blog series. As in the first scenario, if the method throws an exception and a rollback occurs, even if the Kafka transaction synchronizes with the database transaction, the application needs to do nothing to handle the errors. The transactions roll back from both the database and Kafka publishing.

### [](#consumer-initiated-transactions-rollback)Consumer-Initiated Transactions Rollback

If producer-initiated transactions rollback is that straightforward, you might wonder what the big deal is and why we must dedicate an entire article to this topic. When is it necessary that the applications provide particular rollback strategies? It makes sense when you have a consumer-initiated transaction in progress, since we need to pay special attention to how we handle the state of the consumed records and their offsets. Let us re-examine our running consumer-initiated transactional method code from the [previous blog](https://spring.io/blog/2023/10/04/synchronizing-with-external-transaction-managers-in-spring-cloud-stream) in the series.

```
Copypublic Consumer<PersonEvent> process(TxCode txCode) {
   return txCode::run;
}

@Component
class TxCode {

   @Transactional
   void run(PersonEvent pe) {
       Person person = new Person();
       person.setName(pe.getName());

       Person savedPerson = repository.save(person);

       PersonEvent event = new PersonEvent();
       event.setName(savedPerson.getName());
       event.setType("PersonSaved");
       streamBridge.send("process-out-0", event);
   }
}
```

As you recall, this is a **consume-process-produce** pattern done transactionally from end to end. What if the transactional method throws an exception? Here, we need to understand how the framework handles the consumed record upon rolling back the transaction. The underlying message listener container in Spring for Apache Kafka allows setting a [rollback processor](https://docs.spring.io/spring-kafka/docs/current/reference/html/#after-rollback)

The message listener container invokes the `AfterRollbackProcessor` API with the remaining records from the last consumer poll with the failed record at the beginning of the list. The implementations use the topic/partition information to ensure the failed record is fetched again during the next poll. When the applications enable transactions in Spring Cloud Stream, we use a default implementation called `DefaultAfterRollbackProcessor` that implements the `AfterRollbackProcessor` API. Therefore, when the transaction rolls back, this implementation kicks in, by default. Let us examine what happens when this `AfterRollbackProcessor` is in action.

Spring Cloud Stream lets you set the maximum number of method invocation retries through the consumer binding. For example, `spring.cloud.stream.bindings.<binding-name>.consumer.max-attempts`. The max attempts value includes the initial try. The default value for this is **three**. If you want to disable retries, you can set this value to **one**. In that case, the framework tries the record only once. The value for this is inclusive of the first try of the record. Therefore, in the default case of three, the binder retries twice after the initial attempt.

When the user method throws the exception, the transaction that was originally started by the container is rolled back. Since we are in a transactional context, the container then invokes the process method of `AfterRollbackProcessor` in a new transaction using the transaction template, which starts a new Kafka transaction. While running the process method of `AfterRollbackProcessor`, it checks to see if any pending retries remain, based on the max attempts configuration. If it finds more retries, it commits the current transaction, which is a no-op, since nothing occurred during the checks. A consumer seek occurs with the failed record so that the next poll returns this failed record. The consumer then polls for more records, which redelivers the failed record. The whole flow starts again and continues. If it fails again, it repeats until it exhausts all the available retries. Once all the retries are exhausted, the `AfterRollbackProcessor` calls the registered recoverer. Spring Cloud Stream registers a recoverer that sends the record in error to an error channel. After that, the input (recovered) record’s offsets are sent to the new transaction. After this, the current transaction commits, which atomically sends the offset to the transaction and commits the record’s offset. The process is complete now. The recovered record is not included in the consumer seek, and the next poll returns the new records.

If the recovery fails for any reason, the container behaves as if the retries are not exhausted and gets into an endless retry. As mentioned above, when recovery succeeds, the failed record is not included in the seek, so the next poll does not return that record.

Assuming that the application sets maximum attempts to be two and that the record fails both times, **the following is the sequence of events when using transactions**.

1.  The consumer polls for records, and the listener in Spring Kafka is invoked within the execute method of the `TransactionTemplate`, which triggers the `KafkaTransactionManager` to start a new transaction.
2.  Eventually, the listener calls the user method, which is annotated with the `@Transactional` annotation.
3.  The transaction interceptor intercepts the transactional method and starts a new JPA transaction by using its transaction manager.
4.  When it reaches database operation, no commit or rollback occurs, since we are in the middle of the method execution.
5.  `StreamBridge` calls the send method, which publishes to the Kafka topic. No new Kafka transaction starts here, as there is already a Kafka transaction in progress. The same transactional resource, the producer, is used by the `KafkaTemplate` to publish.
6.  The method throws an exception from any of its operations, and the transaction interceptor catches that and performs a rollback on the JPA transaction.
7.  The exception is propagated back to the message listener container in Spring Kafka, where the listener invoked the user method through the execute method of `TransactionTemplate`. It then rolls back the Kafka transaction.
8.  At this point, the container invokes `AfterRollbackProcessor` in a new transaction, since we are in a transactional context. It starts another execute operation on its `TransactionTemplate`, creating a new Kafka transaction by the `KafkaTransactionManager`.
9.  The execute method of the `TransactionTemplate` invokes the process method from the `AfterRollbackProcessor` API and immediately returns, since one more retry is left (since we have a maximum of two attempts).
10.  The container then commits the new Kafka transaction, closing the transaction without doing anything - essentially a no-op operation.
11.  The following consumer poll re-delivers the failed record, which the container retries by calling the listener again in a new transaction (Step 1).
12.  Steps 2 - 8 repeat.
13.  The execute method of `TransactionTemplate` invokes the process method of `AfterRollbackProcessor` and discovers that no more retries are left.
14.  The **process** method calls the registered recoverer. Since we run it as a Spring Cloud Stream application, the default recoverer sends to the error channel.
15.  After the record recovery, the offset of the recovered record (initially consumed by the consumer) offset is sent to the transaction by using the producer on the transaction.
16.  Once the **process** method in `AfterRollbackProcessor` returns, the container calls the commit operation on the transaction, which atomically sends the offset to the transaction and performs the consumer offset commit.

Why do we need a new transaction in **step 8** above, and each subsequent time it calls the `AfterRollbackProcessor` after a failed attempt? Why can’t we call the `AfterRollbackProcessor` before committing the original Kafka transaction? While creating a new Kafka transaction after each failed attempt to perform after-rollback tasks may sound like unneeded overhead, this is necessary. When a rollback occurs in the original transaction, it does not send the offset to the transaction. If there is a retry, the container calls the listener again in a new transaction, and the cycle continues until the retries exhaust and the record is recovered. There are potentially as many transactions created by the container and rolled back as the number of max attempts without sending the offsets to the transaction. Each time the original transaction rolls back, the container starts a corresponding new transaction for the `AfterRollbackProcessor` invocation, whose commits are no-ops (except for the last one after the recovery). After recovering the record, this last invocation sends the offsets to the transaction for atomically committing the offsets and do the necessary transactional cleanups on the Kafka side. Therefore, as we can see, to send the offsets to the transaction, we need to invoke the `AfterRollbackProcessor` in a new transaction.

### [](#customizing-the-afterrollbackprocessor)Customizing the AfterRollbackProcessor

If an application wants to customize the after-rollback tasks, rather than using the default - `DefaultAfterRollbackProcessor` - used by Spring Cloud Stream, then it can use the `ListenerContainerCustomizer` to provide a custom `AfterRollbackProcessor`. The following listing shows how to do so:

```
Copy@Bean
public ListenerContainerCustomizer<AbstractMessageListenerContainer<byte[], byte[]>> customizer() {
   return (container, destination, group) -> container.setAfterRollbackProcessor(
           new DefaultAfterRollbackProcessor<byte[], byte[]>(
                   (record, exception) -> System.out.println("Discarding failed record: " + record),
                   new FixedBackOff(0L, 1)));
}
```

When providing the above customization, the recoverer logs the error and moves on. The constructor of the `DefaultAfterRollbackProcessor` also takes a **backoff** with no retries. Therefore, in this example, as soon as the first time an exception occurs in the method, the record is recovered by logging.

### [](#transactional-dlq-publishing-during-record-recovery)Transactional DLQ Publishing During Record Recovery

Spring Cloud Stream lets you send the failed records after it exhausts all retries to a unique **DLQ** (Dead Letter Queue) topic as part of the recovery process. We mentioned that the `DefaultAfterRollbackProcessor` used by the Spring Cloud Stream Kafka binder sends the record to an error channel. When an application enables **DLQ**, the binder sends the failed record to a special **DLT** topic. The details of how this happens are outside the scope of our transaction discussions. However, the question is whether the **DLT** publishing is transactional or not. When setting up the **DLQ** infrastructure, if the application uses transactions (that is, it provides the `transaction-id-prefix`) the binder uses the same original transactional producer factory used in the `KafkaTransactionManager`. Therefore, the framework guarantees to publish to the **DLT** transactionally.

With the discussions in this article, we covered all the major building blocks of transactions when using them in a Spring Cloud Stream Kafka application. In the next section of this blog series, we will look at a practical application of transactions in Kafka, the popular exactly-once-semantics, and how we can enable them in a Spring Cloud Stream Kafka application.