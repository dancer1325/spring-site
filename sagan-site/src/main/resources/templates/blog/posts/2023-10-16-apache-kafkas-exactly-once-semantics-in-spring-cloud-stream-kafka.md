---
title: Apache Kafka’s Exactly-Once Semantics in Spring Cloud Stream Kafka Applications
source: https://spring.io/blog/2023/10/16/apache-kafkas-exactly-once-semantics-in-spring-cloud-stream-kafka
scraped: 2026-02-23T09:15:27.066Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Soby Chacko |  October 16, 2023 | 2 Comments
---

# Apache Kafka’s Exactly-Once Semantics in Spring Cloud Stream Kafka Applications

_Engineering | Soby Chacko |  October 16, 2023 | 2 Comments_

**Other parts in this blog series**

Part 1: [Introduction to Transactions in Spring Cloud Stream Kafka Applications](https://spring.io/blog/2023/09/27/introduction-to-transactions-in-spring-cloud-stream-kafka-applications)

Part 2: [Producer Initiated Transactions in Spring Cloud Stream Kafka Applications](https://spring.io/blog/2023/09/28/producer-initiated-transactions-in-spring-cloud-stream-kafka-applications)

Part 3: [Synchronizing with External Transaction Managers in Spring Cloud Stream Kafka Applications](https://spring.io/blog/2023/10/04/synchronizing-with-external-transaction-managers-in-spring-cloud-stream)

Part 4: [Transactional Rollback Strategies with Spring Cloud Stream and Apache Kafka](https://spring.io/blog/2023/10/11/transactional-rollback-strategies-with-spring-cloud-stream-and-apache-kafka)

With the fundamental analysis of how transactions work with Spring Cloud Stream Kafka applications out of the way from our previous discussions in this series, we have finally arrived at the elephant in the room: the **exactly-once semantics**, a much-discussed and required feature in streaming applications. In this part of this blog series, we look at how you can get exactly-once semantics in Spring Cloud Stream applications via Apache Kafka transactions. The knowledge of how transactions work from the previous sections makes it relatively easy to understand how Spring Cloud Stream Kafka applications achieve exactly-once semantics.

One important thing to note here is that there is no new code that we need to write to achieve **exactly-once-semantics** beyond the code that we already saw in the previous articles of this blog series. This blog clarifies certain expectations required to adequately support the exactly-once semantics in Spring Cloud Stream Kafka applications.

Exactly-once semantics is a hard thing to achieve in distributed computing. We are out of scope to review all the technical details to see why it is such a difficult task. Interested readers who want to learn all the underpinnings of exactly-once semantics and why it is so hard to achieve in distributed systems may refer to the wider literature on the subject. [This blog](https://www.confluent.io/blog/exactly-once-semantics-are-possible-heres-how-apache-kafka-does-it/) from Confluent is a good starting point for understanding these technical challenges and the solutions implemented by Apache Kafka to achieve them.

Although we won’t go into the details, looking at the different delivery guarantees that Apache Kafka provides is worthwhile. There are three such major delivery guarantees:

-   At-least-once semantics
-   At-most-once semantics
-   Exactly-once semantics

In the delivery semantics of **at-least-once**, the applications may receive data once or multiple times, but they are guaranteed to receive it at least once. With the delivery guarantee of **at-most-once** semantics, the applications may receive data zero times or once, meaning there is a potential for data loss. On the other hand, the **exactly-once** semantics guarantees, as the name indicates, only-once delivery. Depending on the application's use case, you may be OK using any one of these guarantees. By default, Apache Kafka provides an at-least-once delivery guarantee, meaning that a record might be delivered multiple times. If your application can handle the consequences of duplicate records or no records, going with a non-exactly-once guarantee might be okay. On the contrary, if you deal with mission-critical data, such as financial systems or medical data, you must guarantee exactly-once delivery and processing to avoid dire consequences. Because of the distributed nature of systems like Apache Kafka, it is usually hard to achieve exactly-once semantics, due to the nature of many moving parts.

### [](#spring-cloud-stream-kafka-and-exactly-once-semantics)Spring Cloud Stream Kafka and Exactly-Once Semantics

We saw many different scenarios in the previous articles in the blog series. The exactly-once semantics in Apache Kafka addresses **read-process-write** (or **consume-transform-produce**) applications. Confusion sometimes arises on what exactly we are doing “once.” Is it the initial consumption, the processing of the data, or the producing part at the end? Apache Kafka guarantees the exactly-once semantics for the entire **read->process-write** sequence. In this sequence, the read and process parts are always **at-least-once** – for example, if part of the process or the write fails for any reason. When you rely on exactly-once delivery, transactions are very critical, such that the final publishing of the data is done successfully or rolled back. A potential side effect is that the initial consumption and the processing may occur multiple times. For example, if the transaction gets rolled back, the consumer offsets are not updated, and the next poll, if it is a retry within Spring Cloud Stream or upon a restart of the application, redelivers the same record and processes again. Therefore, the guarantee is at-least-once in the consume and process (transform) parts, which is a crucial point to understand. Any downstream consumers running with an isolation level of `read_committed` will get only the messages from the upstream processor exactly once. It is, therefore, imperative to understand that in an exactly-once delivery world, both the processor and the downstream consumers must coordinate to benefit from the exactly-once semantics. Any consumers of the produced topic running with `read_uncommitted` isolation levels may see duplicate data.

Another point to keep in mind is that, since the consuming of the record and its processing may occur multiple times, the application code needs to follow idempotent patterns, which is primarily a concern if your code interacts with external systems, such as a database. In that case, it is up to the application to ensure no side effects from the user code.

Let’s revisit the code we previously saw for a simple consume-process-produce loop.

```
Copy@Bean
public Consumer<PersonEvent> process(TxCode txCode) {
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

As we saw before, to make this application transactional, we must provide the `spring.cloud.stream.kafka.binder.transaction.transaction-id-prefix` configuration property with a proper value. Providing this property is all that is required in Spring Cloud Stream to enable the code segment above to be completely exactly-once delivery capable. The total end-to-end process runs within transactional boundaries (although we have two transactions in the above example). We have an outer Kafka transaction that starts in the container when it invokes the listener and another JPA transaction started by the transaction interceptor. When the `StreamBridge` send happens, the same transactional resources are used from the initial Kafka transaction, but it does not commit until after control returns to the container. When the method exits, the JPA transaction is committed. Let’s say something goes wrong here, and the database operation throws an exception. In that case, the JPA doesn’t commit, it will roll back, and the exception propagates back to the listener container, at which point the Kafka transaction also gets rolled back. On the other hand, if the JPA operation succeeds, but Kafka publishing fails and throws an exception, the JPA does not commit but rolls back, and the exception gets propagated to the listener.

In the above code, if we are not synchronizing with an external transaction manager but only publishing to Kafka, then we don’t need to use the `@Transactional` annotation, and we can even inline the code in the `txCode` method as part of the consumer lambda:

```
Copy@Bean
public Consumer<PersonEvent> process() {
   return pe -> {
	  Person person = new Person();
       person.setName(pe.getName());
       PersonEvent event = new PersonEvent();
       event.setName(person.getName());
       event.setType("PersonSaved");
       streamBridge.send("process-out-0", event);

   }
}
```

In this case, we have only the Kafka transaction initiated by the container when invoking the listener. When the code publishes the record through the `StreamBridge` send method, `KafkaTemplate` uses the same transactional producer factory from the initial transaction.

The story in both scenarios is that we are fully transactional, and the final publishing is done only once for the transaction. The downstream consumers with the isolation level of `read_committed` should consume them exactly once.

### [](#kafka-streams-and-exactly-once-semantics)Kafka Streams and Exactly-Once Semantics

In this series, up to this point, we haven’t talked about Kafka Streams. It is sort of ironic that, originally, Kafka Streams applications were the reason why Apache Kafka added transactional support and exactly-once semantics, but we haven’t talked about it yet. The reason is that achieving exactly-once semantics in Kafka Streams applications is straightforward and almost non-trivial. As they call it, it is a single configuration knob. To learn more about exactly-once semantics in Kafka Streams, see this [blog from Confluent](https://www.confluent.io/blog/enabling-exactly-once-kafka-streams/)

As with regular Kafka client-based applications, in the case of Kafka Streams, the exactly-once guarantee comes into play when you produce the final output in a **consume-process-produce** pattern, implying that any downstream consumers of the produced data consume exactly one as long as they use the `read_committed` isolation level.

The Kafka Streams configuration property `processing.guarantee` property enables exactly-once semantics in Kafka Streams applications. You can set it in Spring Cloud Stream by setting the `spring.cloud.stream.kafka.streams.binder.configuration.processing.guarantee` property. You need to set the value to `exactly_once`. By default, Kafka Streams uses the value of `at_least_once`.

**The three main activities that generally occur in a stateful Kafka Streams application are:**

1.  Initial consumption of the records
2.  State store updates through changelog topics.
3.  Producing the data

The pattern is that the record is received and processed. Along the way, any state information materializes into a state store, essentially updating specific changelog topics. Finally, the outbound record gets published to another Kafka topic. If you noticed this pattern, it looks similar to many scenarios we have already seen, except for the state store part. When setting the `processing.guarantee` to `exactly_once`, Kafka Streams guarantees that, if an exception occurs during these activities or the application crashes, the whole unit gets rolled back atomically as if nothing happened. Upon application restart, the processor consumes the record again, processes it, and finally publishes the data. Since this publishing occurs transactionally behind the scenes, no downstream consumers with an isolation level of `read_committed` will consume that record until it publishes for good, taking care of all that is required to achieve transactionality (such as committing the consumed record’s offset and so on), thus guaranteeing exactly-once delivery.

Kafka Streams' exactly-once delivery guarantee is for end-to-end consumption, processing, and publishing of the record from a Kafka-related activities standpoint. It does not provide this guarantee when external systems are present. For example, suppose your code has interactions with external systems such as a database insert or update operation. In that case, it is up to the application to decide how it wants to participate in the transaction. Spring’s transactional support comes in handy again in this situation. We do not want to repeat the code here. Still, as we have seen plenty of times in this series, you can encapsulate the code that interacts with the database in a separate method, annotate it with the `@Transactional` annotation, and provide a proper transaction manager, such as the JPA one we have seen. When such a method throws an exception, the JPA transaction rolls back, and the exception propagates to the Kafka Streams processor code, which ultimately propagates that back to the Kafka Streams framework itself, which then rolls back the original Kafka transaction. It is worth repeating here again that it is important to understand that these operations, called from processors in a stream topology, must be coded to handle idempotency because “exactly once” only applies to the entire process, not to read and process individually in the sequence.

### [](#conclusion)Conclusion

As we already mentioned at the onset of this article, **exactly-once-delivery** semantics is a complex topic in distributed computing. However, with the solution that Kafka natively provides for achieving exactly-once semantics and Spring’s support in the Spring for Apache Kafka and Spring Cloud Stream frameworks, it is relatively easy to achieve exactly-once delivery semantics in Spring Cloud Stream Kafka applications.