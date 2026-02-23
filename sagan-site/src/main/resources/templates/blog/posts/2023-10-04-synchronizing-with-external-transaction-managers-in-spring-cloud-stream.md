---
title: Synchronizing with External Transaction Managers in Spring Cloud Stream Kafka Applications
source: https://spring.io/blog/2023/10/04/synchronizing-with-external-transaction-managers-in-spring-cloud-stream
scraped: 2026-02-23T09:15:18.305Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Soby Chacko |  October 04, 2023 | 11 Comments
---

# Synchronizing with External Transaction Managers in Spring Cloud Stream Kafka Applications

_Engineering | Soby Chacko |  October 04, 2023 | 11 Comments_

**Other parts in this blog series**

Part 1: [Introduction to Transactions in Spring Cloud Stream Kafka Applications](https://spring.io/blog/2023/09/27/introduction-to-transactions-in-spring-cloud-stream-kafka-applications)

Part 2: [Producer Initiated Transactions in Spring Cloud Stream Kafka Applications](https://spring.io/blog/2023/09/28/producer-initiated-transactions-in-spring-cloud-stream-kafka-applications)

In the [previous part](https://spring.io/blog/2023/09/28/producer-initiated-transactions-in-spring-cloud-stream-kafka-applications) of this blog series, we saw the basics of transaction management, primarily when using producer-initiated Spring Cloud Stream Kafka applications. In that discussion, we also briefly saw how a Spring Cloud Stream Kafka consumer application could consume records produced transactionally with proper isolation levels. When you synchronize with external transaction managers, such as one for a relational database, we mentioned that you must use transactions to ensure data integrity. In this part, we will see how we can accomplish transactional guarantees in Spring Cloud Stream when using external transaction managers.

Before we start this exploration, it is important to remember that achieving distributed transactions is extremely difficult in practice. You must rely on 2 phase commit (2PC) strategies and a properly distributed transaction manager, such as a JTA-compatible transaction manager, to do this properly. Nevertheless, most enterprise use cases may not require this level of complexity, and most use cases that we consider and see people use in practice may be better off by sticking with the non-distributed transactional methods, as we describe in this blog. [This article](https://www.infoworld.com/article/2077963/distributed-transactions-in-spring--with-and-without-xa.html), by [Dr.Dave Syer](https://spring.io/team/dsyer) of the Spring engineering team, published back in 2009, is still relevant (even after 14 years) to understanding the challenges of distributed transactions and the recommended alternative approaches in Spring.

Let’s return to our discussion: achieving transactionality in Spring Cloud Stream Kafka application when using external transaction managers in producer-initiated and consume-process-produce (read-process-write) applications.

Now we can set the stage for our discussion in an example domain by sketching out some code that we can work through in the discussion. We use a few domain objects to drive the demo and have created pseudo-code for them.

Assume that the messaging system deals with “event” domain types - let's use a **PersonEvent**:

```
Copyclass PersonEvent {

   String name;
   String type;

   //Rest omitted for brevity
}
```

We also need a Domain Entity for the **Person** object:

```
Copy@Entity
@Table(name = "person")
public class Person {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;

   private String name;

   // Rest omitted for brevity
}
```

Finally, we need a **CrudRepository** for the **Person** domain object:

```
Copypublic interface PersonRepository extends CrudRepository<Person, String> {}
```

In the case of a producer-initiated scenario, assume that, when a method is called (via REST, for example), a **Person** domain object is created, persists to the database, and is sent as a **PersonEvent** to an outbound Kafka topic through `StreamBridge`.

In the case of the **consume-process-produce** scenario, assume that the input topic receives a **PersonEvent**, from which the processor generates a **Person** domain object to persist to a database. Finally, it produces another **PersonEvent** to an outbound Kafka topic.

Let’s also use JPA for our discussions here. Spring Cloud Stream applications are Boot applications, and you can include the spring-boot-starter-jpa dependency in the application and include the appropriate spring.jpa.\* properties to drive the necessary autoconfiguration. The assumption is that Spring Boot will autoconfigure a `JPATransactionManager` for us.

Let us break down our use cases into various scenarios.

## [](#scenario-1-producer-initiated-transactions)Scenario 1: Producer-initiated transactions

In the producer-initiated scenario, we have two operations that we must do transactionally: a database operation followed by a Kafka publishing operation. Here is the basic idea. Keep in mind that this code shows only the crux of what is involved. In real-world settings, the code will almost certainly be much more complex than this.

```
Copy@Autowired
Sender sender;

@PostMapping("/send-data")
public void sendData() {
   sender.send(streamBridge, repository);
}

@Component
static class Sender {

   @Transactional
   public void send(StreamBridge streamBridge, PersonRepository repository) {
       Person person = new Person();
       person.setName("Some Person");

       Person savedPerson = repository.save(person);

       PersonEvent event = new PersonEvent();
       event.setName(savedPerson.getName());
       event.setType("PersonSaved");
       streamBridge.send("process-out-0", event);
   }
}

```

The above producer-initiated code is fully transactional. In the previous part of this blog, we saw that more than adding just the `Transactional` annotation is needed if you only have a Kafka transaction. As discussed, the `Transactional` annotation did not have a transaction manager, and we needed a custom transaction manager that uses the same underlying transactional resources to achieve transactionality. Here, however, the situation is different. We have the `JpaTransactionManager` autoconfigured by Spring Boot, and the transaction interceptor uses that to start a transaction. Since we have the **transaction-id-prefix** configured, the `StreamBridge` send operation can be done transactionally. However, `KafkaTemplate` synchronizes the Kafka transaction with the already existing JPA transaction through the `TransactionSynchronizationManager`. Upon method exit, the primary transaction is committed first, followed by the synchronized transactions, which, in this case, is the Kafka transaction.

##### [](#the-following-is-the-sequence-in-this-flow)The following is the sequence in this flow.

1.  The JPA transaction manager starts a new JPA transaction.
2.  The database operation commences, but no commit occurs here since we are still in the method execution.
3.  The `StreamBridge` send operation triggers a new Kafka transaction, synchronizing with the JPA transaction through the transaction synchronization manager.
4.  When the method exits, the JPA transaction is committed first, followed by the Kafka transaction.

**A general note on synchronizing transactions in Spring:** It might sound like it is doing complex transaction synchronization behind the scenes. However, as we implied at the opening of this article, there is no distributed transaction synchronization going on here, let alone any intelligent ways to synchronize between the various transactions. The transactions themselves do not know anything about the synchronization. The Spring `TransactionSynchronizatonManager` simply coordinates the commits and rollbacks of multiple transactions. Synchronizing transactions in this context is functionally similar to nesting two or more `@Transactional` methods or `TransactionTempate` objects. There is less to configure because Spring does the nesting for you.

## [](#scenario-2-reversing-the-order-of-commits)Scenario 2: Reversing the Order of Commits

Suppose we need to reverse the order of commits due to some new requirements in the flow, with the Kafka transaction getting committed first instead of the JPA one. How do we do that? One solution that might intuitively come to us is to explicitly provide a Kafka transaction manager to the `@Transactional` annotation and let the JPA transaction synchronize with the Kafka transaction, which is the primary one. The code looks like the following:

```
Copy@Transactional(“customKafkaTransactionManager)
public void send(StreamBridge streamBridge, PersonRepository repository) {
    Person person = new Person();
    person.setName("Some Person");

    Person savedPerson = repository.save(person);

    PersonEvent event = new PersonEvent();
    event.setName(savedPerson.getName());
    event.setType("PersonSaved");
    streamBridge.send("process-out-0", event);
}
```

We need to provide a custom Kafka transaction manager:

```
Copy@Bean
KafkaTransactionManager customKafkaTransactionManager() {
   KafkaMessageChannelBinder kafka = (KafkaMessageChannelBinder) this.binderFactory.getBinder("kafka", MessageChannel.class);
   ProducerFactory<byte[], byte[]> transactionalProducerFactory = kafka.getTransactionalProducerFactory();
   KafkaTransactionManager kafkaTransactionManager = new KafkaTransactionManager(transactionalProducerFactory);
   return kafkaTransactionManager;
}
```

Since Spring Boot does not configure a transaction manager if it detects one already present, we must configure the JPA transaction manager ourselves:

```
Copy@Bean
public PlatformTransactionManager transactionManager(
       ObjectProvider<TransactionManagerCustomizers> transactionManagerCustomizers) {
   JpaTransactionManager transactionManager = new JpaTransactionManager();
   transactionManagerCustomizers.ifAvailable((customizers) -> customizers.customize(transactionManager));
   return transactionManager;
}
```

Did our intuition work here? Have we successfully changed the order of applying transactions? Unfortunately, no. It does not work, because the JPA transaction manager does not let its transaction synchronize with other transactions, such as the one from the primary transaction manager in this case (the custom Kafka transaction manager). In our case, although we made a custom Kafka transaction manager to be the primary one, the JPA transaction starts and commits by itself without synchronizing with the primary upon executing the repository save method.

##### [](#the-order-of-events-in-this-flow-is-as-follows)The order of events in this flow is as follows

1.  The Kafka transaction manager starts a new transaction that the interceptor uses.
2.  When the repository save method executes, a JPA transaction is created by the JpaTransactionManager without synchronizing with the primary transaction.
3.  The JPA transaction commits while still within the method execution.
4.  The interceptor will commit the Kafka transaction upon exiting the method.

How can we reverse the transactions, then? There are two ways to do this.

First, we can try chaining the transaction managers. [ChainedTransactionManager](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/transaction/ChainedTransactionManager.html) is a transaction manager implementation from the [Spring Data](https://spring.io/projects/spring-data) project. You can specify the list of transaction managers to the `ChainedTransactionManager`, and it starts the transaction in the order of transaction managers in its list. On the way out (that is, when the method exits), the transactions are committed in the reverse order of the list of transaction managers.

While this sounds like a reasonable strategy, one big caveat to keep in mind is that `ChainedTransactionManager` is currently deprecated and not a recommended option. The reason for the deprecation is in the [Javadoc](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/transaction/ChainedTransactionManager.html). The gist is that people often expect the `ChainedTransactionManager` to be a magical silver bullet that solves all the transactional issues, including distributed transactions with two-phase commits and other issues, while this couldn’t be further away from the truth. `ChainedTransactionManager` ensures only that the transactions are started and committed in a particular order. It doesn't guarantee any transaction synchronization, let alone any distributed transaction coordination. Suppose you are comfortable with the limitations of `ChainedTransactionManager` and want a particular order, as our use case requires. In that case, it is reasonable to use this transaction manager as long as you remember that you are using a deprecated class from the framework.

Let us try `ChainedTransactionManager` in our scenario and see how it goes. Spring for Apache Kafka provides a subclass called ChainedKafkaTransactionManager, which is also deprecated because the parent class is deprecated.

We use the same custom `KafkaTransactionManager` bean that we saw before in the chained transactions.

We also need to create the `JpaTransactionManager` bean, as before, since Spring Boot does not auto-configure it, because it already detects the custom `KafkaTransactionManager` bean.

Once we add those two beans, let’s create the `ChainedKafkaTransactionManager` bean:

```
Copy@Bean
public ChainedKafkaTransactionManager chainedKafkaTransactionManager(KafkaTransactionManager kafkaTransactionManager, PlatformTransactionManager transactionManager) {
   return new ChainedKafkaTransactionManager(jpaTransactionManager, kafkaTransactionManager);
}
```

With these in place, let’s modify our Transactional annotation:

```
Copy@Transactional("chainedKafkaTransactionManager")
public void send(StreamBridge streamBridge, PersonRepository repository) {
..
}
```

The above configuration accomplishes the result we want. When you run this application, we reverse the transactions, as expected - that is, Kafka will commit first, followed by the JPA.

##### [](#here-are-the-steps-in-the-flow)Here are the steps in the flow

1.  TransactionInterceptor uses the custom `ChainedKafkaTransactionManager` to start the transaction. It starts the Jpa transaction using the `JpaTransactionManager` and does the same for the `KafkaTransactionManager`.
2.  When the method calls the database operation, since it already runs within a JPA transaction, it doesn’t start another one. No commit or rollback occurs here since this is not a new transaction.
3.  Next, the method performs the Kafka publishing through `StreamBridge`. We see the same deal here as we saw for JPA, above. Since there is an already existing Kafka transaction, it does not start a new Kafka transaction. The `StreamBridge` send operation occurs by using the same transactional producer factory that was used by the initial Kafka transaction. No commits or rollbacks occur here.
4.  When the method exits, the chained transaction manager goes in reverse order, starting with the Kafka transaction commit (or rolling back), followed by the JPA one.

If you are comfortable with the limitations of the chained transaction manager, this approach works. Remember that there is no transaction synchronization here. The transaction managers are applied in the order given when the transactions begin and reverse order on the way out when committing or rolling back. If you are going with this route, since you are using deprecated classes in the framework, copying them and using them in your project will be a good idea rather than relying on the framework. Since they are deprecated, no new features and bug fixes are guaranteed. A future version can drop them altogether. It is also possible that this may never be removed and that the deprecation status is present to discourage its use (due to people thinking it has greater functionality than it really does).

If you do not want to rely on deprecated classes from the framework or do not want to copy them and maintain them on your end, you have another option to try. You can create two transactional methods and nest the calls. Here is a blueprint for that idea:

```
Copy@Component
static class Sender {

       @Transactional("jpaTransactionManager")
       public void send(StreamBridge streamBridge, PersonRepository repository, KafkaSender kafkaSender) {
           Person person = new Person();
           person.setName("Some Person");

           Person savedPerson = repository.save(person);

           PersonEvent event = new PersonEvent();
           event.setName(savedPerson.getName());
           event.setType("PersonSaved");
           kafkaSender.send(streamBridge, event);
       }
}

@Component
static class KafkaSender {
       @Transactional("customKafkaTransactionManager")
       public void send(StreamBridge streamBridge, PersonEvent event) {
           streamBridge.send("process-out-0", event);
       }
}
```

Ensure that the nested call is in a different class for the reasons we went through in [part 2](https://spring.io/blog/2023/09/28/producer-initiated-transactions-in-spring-cloud-stream-kafka-applications) of this blog series, because of how AOP proxying works in Spring.

Both methods, in this case, are transactional, and they are nested. When the transaction interceptor intercepts the first method call, it starts the JPA transaction. In the middle of the execution, the nested call (whose method also has the `@Transactional` annotation) comes in. Since this bean method has the `@Transactional` annotation, Spring AOP wraps the bean in an AOP advice. Because we call this advised bean from another bean in a different class, the proxy mechanism properly invokes the advised bean. Another transaction interceptor starts a new transaction by using a different transaction manager (that is, the `KafkaTransactionManager`). When Kafka publishing occurs, the transaction does not immediately commit or roll back, since the transaction started as part of the method, and the commit or roll-back happens when the method exits. At that point, the control returns to the first method and continues. Once it exits the original method, the JPA transaction is committed through the interceptor. If the method that publishes to Kafka throws an exception, it rolls back that transaction. In that case, after rolling back, the exception propagates back to the first transactional method (the JPA one), which also rolls back its transaction due to the exception.

**An important note when using this technique** The call to the nested method should be the last thing the first method does because, if the first method fails to execute some code after the Kafka call, which went successfully, the Kafka transaction has already been committed. The failure in the first method does not automatically roll back the Kafka transaction.

## [](#scenario-3-consume-process-produce)Scenario 3: Consume-Process-Produce

With the core understanding we gained about transactions in this series so far, let’s look at a crucial pattern in event-driven and streaming applications called the **consume-process-produce** pattern. In Spring Cloud Stream, an implementation of such a pattern looks as follows:

```
Copy@Bean
public Function<PersonEvent, PersonEvent> process(TxCode txCode) {
  return pe -> txCode.run(pe);
}

@Component
class TxCode {

   @Transactional
   PersonEvent run(PersonEvent pe) {
       Person person = new Person();
       person.setName(pe.getName());

       Person savedPerson = repository.save(person);

       PersonEvent event = new PersonEvent();
       event.setName(savedPerson.getName());
       event.setType("PersonSaved");
       return event;
   }
}
```

We have a Spring Cloud Stream function that consumes `PersonEvent` from an input topic and then calls a function to process in the body of the function’s lambda expression. This function returns another `PersonEvent`, which we publish to the outbound Kafka topic. If we are not in a transactional context, we can inline the `run` method above as part of the function’s lambda expression. However, to achieve transactional semantics, the `@Transactional` annotation must be on a method in a different class.

To make the binder transactional, make sure that you provide the `spring.cloud.stream.kafka.binder.transaction.transaction-id-prefix` with a valid value.

Is the code above fully transactional? The reality, however, is that it is only partially transactional end-to-end. Let’s look at the sequence of events.

The binder is transactional, because we provide the `transaction-id-prefix`. When the consumer polls for the records in the message listener container, it invokes the internal listener method within its `TrasactionTemplate#execute` method. Therefore, the whole end-to-end process of executing the listener method (which invokes the user method) runs within a transaction started by the `KafkaTransactionManager`. When the transaction starts, the `TransactionSynchronizationManager` binds the resources (the producer) to the transaction. When the user method (the method annotated with `@Transactional`) gets called, the transaction interceptor intercepts that call, letting the wrapped AOP advice take care of the actual invocation. Because we have a `JpaTransactionManager`, the transaction interceptor uses that manager and starts a new transaction. It is up to each transaction manager implementation to decide whether it wants to synchronize with an existing transaction. In the case of JpaTransactionManager (and many other similar database transaction manager implementations), it does not allow synchronization with an existing transaction as we already discussed above. Therefore, the JPA transaction runs independently, as seen in the above sections. When the run method exits, the transaction interceptor does a commit or rollback operation by using the JPA transaction manager. With that, the JPA transaction manager finishes its job. At this point, the response from the method invocation goes back to the caller, which is the Spring Cloud Stream infrastructure. This mechanism in Spring Cloud Stream takes this response and sends it to the outbound topic in Kafka. It uses the same transactional producer bound when the initial transaction began. After sending the record, the control returns to the message listener container, which then commits or rolls back the transaction.

##### [](#here-are-the-steps-in-this-sequence)Here are the steps in this sequence

1.  The Kafka consumer receives the record.
2.  The container in Spring Kafka invokes the listener by using the `execute` method of the `TransactionTemplate`.

KafkaTransactionManager starts a new transaction. 3. The Kafka resources are bound (producer). 4. When it reaches the user code, the transaction interceptor eventually intercepts that call and starts a new JPA transaction. 5. The AOP proxy then invokes the actual method. When the method exits, the `JpaTransactionManager` commits or rolls back. 6. The method’s output returns to the caller in Spring Cloud Stream. 7. The response is then sent to Kafka outbound using the same transactional resource from step 4. 8. The control returns to the message listener container and the `KafkaTransactionManager` commits or rolls back.

So, what is the issue here? It looks transactional, but, in reality, it is only partially so. The main problem at the outset is that the whole end-to-end process is outside the bounds of a single atomic transaction, which is a significant issue. There are two transactions here - Kafka and JPA - and there is no synchronization between the JPA and Kafka transactions. If the database transaction got committed and the Kafka sending failed, there is no way to roll back the JPA transaction.

We might think that `ChainedTransactionManager` could help here. While that intuition has some merits, it doesn’t work with the above code. Because of the Kafka transaction created in the container while invoking the listener method, `ChainedTransactionManager` will not create any new Kafka transactions from any Kafka transaction managers provided to it. We still have a single JPA transaction to commit or roll back when exiting the user method. The Kafka transaction must wait until the call returns to the container to commit or rollback.

The problem is that we use a function in Spring Cloud Stream that enables the framework to publish to Kafka. In our case, any user-specified transactions, such as the JPA one, occur before Spring Cloud Stream does the Kafka publishing. We need to ensure that the user code is the one that publishes to Kafka so that we can treat the entire transactional code as one unit. To achieve this, we should switch to a `Consumer` instead of a `Function` and then use the `StreamBridge` API to publish to Kafka. Look at this modified code:

```
Copy@Bean
public Consumer<PersonEvent> process(TxCode txCode) {
   return txCode::run;
}
```

Then we use the same TxCode as above:

```
Copy@Component
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

Notice that the run method does not return anything, but we explicitly send to the outbound Kafka topic through the `StreamBridge` API.

##### [](#lets-look-at-the-sequence-of-events-with-these-changes)Let’s look at the sequence of events with these changes

1.  The Kafka consumer receives the record.
2.  The container in Spring Kafka invokes the listener by using the execute method of the TransactionTemplate.
3.  `KafkaTransactionManager` starts a new transaction.
4.  The Kafka resources are bound (producer).
5.  When it gets to the user code, the interceptor intercepts that call and starts a new transaction by using the `JpaTransactionManager`.
6.  The actual user method is invoked.
7.  The Kafka send operation is made through `StreamBridge` as part of the method execution. The underlying KafkaTemplate uses the same transactional producer factory bound in step 4.
8.  When the method exits, `JpaTransactionManager` commits or rolls back.
9.  Finally, the control returns to the `TransactionTemplate#execute` method when the Kafka transaction is committed (or rolled back).

Pay special attention to step 7 above. When `KafkaTemplate` detects that there is already a Kafka transaction in progress (begun in step 3), it does not synchronize with the JPA transaction, although the `KafkaTemplate` is capable of doing so. The existing Kafka transaction gets precedence, and it joins that transaction.

Even though we still have two separate transactions, things are atomic from an end-to-end transactional standpoint. If the Kafka publishing operation through `StreamBridge` fails, neither JPA nor Kafka transactions perform a commit operation. Both will roll back. Similarly, both transactions still roll back if the database operation fails. However, there is always the possibility that one transaction commits and the other rolls back, so the application code must handle the de-duplication of the records to be fault-tolerant.

Another crucial component in this discussion of the **consume-process-produce** pattern is that the producer needs to send the consumed record’s offset (in addition to the consumer that commits the offset) to the transaction. As we saw in the [first part](https://spring.io/blog/2023/09/27/introduction-to-transactions-in-spring-cloud-stream-kafka-applications) of this blog series, there is a Kafka Producer API method called `sendOffsetToTransaction` in which the producer sends an offset (the current message’s offset + 1) for each partition through the `OffsetMetadata` and the `ConsumerGroupMetadata`. The applications do not need to call this low-level operation when using **Spring Cloud Stream** or **Spring for Apache Kafka**. The Kafka message listener container in Spring for Apache Kafka handles it automatically on behalf of the application. Although the framework calls `sendOffsetToTransaction` on the producer before the transaction commits, sending the offsets to the transaction and the actual consumer offset commit occur atomically when the transaction coordinator commits the transaction.

With this discussion, we ventured into the various options for writing transactional Spring Cloud Stream applications that must interact with external transactional systems, such as databases, while consuming and producing to Apache Kafka.

In the next part of the series, we will look at transaction rolling back (another critical aspect when writing transactional systems) and how we can access the various Spring components while writing Spring Cloud Stream Kafka applications.