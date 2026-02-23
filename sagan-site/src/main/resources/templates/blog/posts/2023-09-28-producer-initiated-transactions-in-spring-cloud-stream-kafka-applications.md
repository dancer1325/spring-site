---
title: Producer Initiated Transactions in Spring Cloud Stream Kafka Applications
source: https://spring.io/blog/2023/09/28/producer-initiated-transactions-in-spring-cloud-stream-kafka-applications
scraped: 2026-02-23T09:15:13.970Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Soby Chacko |  September 28, 2023 | 0 Comments
---

# Producer Initiated Transactions in Spring Cloud Stream Kafka Applications

_Engineering | Soby Chacko |  September 28, 2023 | 0 Comments_

**Other parts in this blog series**

Part 1: [Introduction to Transactions in Spring Cloud Stream Kafka Applications](https://spring.io/blog/2023/09/27/introduction-to-transactions-in-spring-cloud-stream-kafka-applications)

This article is part 2 of the blog series in which we look at transactions in detail with Spring Cloud Stream and Apache Kafka. We saw a general introduction to transactions in the [previous part](https://spring.io/blog/2023/09/27/introduction-to-transactions-in-spring-cloud-stream-kafka-applications), touching on the fundamental ideas. In this part of the blog series, we get to the metal by seeing a few implementation details and their practical aspects.

In this article, we largely stay on the producer's side to understand how transactions work with Spring Cloud Stream and Apache Kafka.

## [](#producers-in-spring-cloud-stream)Producers in Spring Cloud Stream

Before we look deeper into producer-initiated transactions, let’s get to some basics by looking at a simple producer. In Spring Cloud Stream, there are a couple of ways to write a producer (also known as a publisher in the messaging domain). If you have a use case in which you need to produce data on a schedule, you can write a `java.util.function.Supplier` method as shown below.

```
Copy@Bean
public Supplier<Pojo> mySupplier() {
  return () -> {
        new Pojo();
  };
}
```

When providing the above Supplier as a Spring bean, as indicated in the code, Spring Cloud Stream treats it as a publisher, and, since we are under the context of Apache Kafka here, it sends the POJO record to a Kafka topic.

By default, Spring Cloud Stream invokes the supplier once each second, but you can change that schedule through configuration. See the [refence docs](https://docs.spring.io/spring-cloud-stream/docs/current/reference/html/spring-cloud-stream.html#_polling_configuration_properties) fore more details.

What if you don’t want to poll the supplier but want to control how often it publishes? Spring Cloud Stream provides a convenient way through the `StreamOperations` API with its out-of-the-box implementation called `StreamBridge`. Here is an example.

```
Copy@Autowired
StreamBridge streamBridge;

@PostMapping("/send-data")
public void publishData() {
   streamBridge.send("mySupplier-out-0", new Pojo());
}
```

In this case, the application uses a REST endpoint to trigger publishing the data through `StreamBridge`. Since the framework does not call the function on a schedule, any external party can initiate the publishing of the data by invoking the REST endpoint.

**Is it Appropriate to Use Transactions in These Basic Producers?**

Now that we have seen the two strategies Spring Cloud Stream provides for publishing records, let us return to our main topic of discussion: **transactional publishing**. Assume a scenario in which we want to ensure data integrity and gain transactional guarantees while using one or more of these producers. In that case, the question is whether we need to use transactions to achieve them in the first place. In these two examples above, how can you ensure that the records are published transactionally? The short answer is that you should refrain from using transactions for these types of publishing use cases. The publishing of the records in these examples are single-send scenarios. Using a sync producer, we can achieve the same semantic transactional guarantees. By default, the producer is asynchronous, and, when making it run in synchronous mode, the producer ensures that it writes the records to the leader and all the replicas before sending a response to the client. You can enable sync publishing by setting the `spring.cloud.stream.kafka.bindings.<binding-name>.producer.sync` property to `true`.

To summarize, when designing a producer-only application, use transactions judiciously. We do not recommend using transactions if you send one record at a time by using a `Supplier` or through `StreamBridge`, since converting the producer to run in sync mode would accomplish the same result without the transaction overhead. This discussion then leads to an interesting question. For producer-only applications, when does it become necessary to use transactions and get the benefits? As discussed in the [previous part](https://spring.io/blog/2023/09/27/introduction-to-transactions-in-spring-cloud-stream-kafka-applications) of this blog series, it depends entirely on the application's use case. In the context of producers, this means that we need only use transactions if we do multiple related publishings, or, in addition to publishing, we need to synchronize with an external transaction manager. The next sections of this post cover the former scenario, and the next post in this blog series covers the latter one.

## [](#enabling-transactions-in-spring-cloud-stream-kafka-binder)Enabling Transactions in Spring Cloud Stream Kafka Binder

The main driver for enabling transactions in the Kafka binder for Spring Cloud Stream is a single property: `spring.cloud.stream.kafka.binder.transaction.transaction-id-prefix`. When this property has a valid prefix string, the Kafka binder in Spring Cloud Stream ensures that the underlying `KafkaTemplate` publishes the data by using transactions. Incidentally, this property signals Spring Cloud Stream to make a consumer be transaction-aware while using processor patterns (**consume-process-produce** or **read-process-write** patterns).

## [](#transactions-in-action)Transactions in Action

Although counterintuitive, let us return to our single `Supplier` or `StreamBridge` example (described earlier) and introduce transactions to understand the primary usage of transaction components. As explained earlier, we need not use transactions in those cases, as this adds more overhead. However, doing so helps us understand things.

Here is the code again:

```
Copy@SpringBootApplication
@RestController
public class SimpleSpringCloudStreamProducer {

  @Bean
  public Supplier<Pojo> mySupplier() {
    return () -> {
      new Pojo();
    };
  }

  @Autowired
  StreamBridge streamBridge;

  @PostMapping("/send-data")
  public void publishData() {
   streamBridge.send("mySupplier-out-0", new Pojo());
  }
}
```

Let us now provide the required property.

```
Copyspring.cloud.stream.kafka.binder.transaction.transaction-id-prefix: my-transactional-producer-
```

Since we are providing the property in the application’s configuration, each time the supplier in this example is invoked (through the framework) or someone calls the REST endpoint behind the `StreamBridge#send` method, the underlying publishing to Kafka topic becomes fully transactional.

When the supplier is triggered, the Kafka binder uses a `KafkaTemplate` to publish the data. When the binder detects that the application provides the `transaction-id-prefix` property, each `KafkaTemplate#send` invocation is done through the `KafkaTemplate#executeInTransaction` method. Thus, rest assured that the frameworks do the underlying publishing to the Kafka topic transactionally. From an application perspective, the only thing the app developer needs to provide for transaction purposes is the `transaction-id-prefix` property.

Setting the logging level to `TRACE` is often worthwhile when developing or debugging transactional applications so that the relevant underlying transactional classes can provide us with details about what’s happening.

For example, if you set the logging level to TRACE on the following packages, you will see quite a lot of activity in the logs.

```
Copylogging:
 level:
   org.springframework.transaction: TRACE
   org.springframework.kafka.transaction: TRACE
   org.springframework.kafka.producer: TRACE
   org.springframework.kafka.core: TRACE
```

We can observe the following in the logs each time the framework calls the supplier method:

```
Copyo.s.k.core.DefaultKafkaProducerFactory   : CloseSafeProducer [delegate=org.apache.kafka.clients.producer.KafkaProducer@1426370c] beginTransaction()
o.s.kafka.core.KafkaTemplate             : Sending: ProducerRecord
o.s.kafka.core.KafkaTemplate             : Sent: ProducerRecord(topic=myTopic1, partition=null, headers=RecordHeaders(headers = …
o.s.k.core.DefaultKafkaProducerFactory   : CloseSafeProducer [delegate=org.apache.kafka.clients.producer.KafkaProducer@1426370c] commitTransaction()
```

As you can see from the trace logs, each time it publishes the record transactionally, it forms a sequence: **beginTransaction**, **Sending**, **Sent**, and **commitTransaction**. If you run the application, you will observe that you see these sequences every second since that is the default schedule for how often Spring Cloud Stream invokes a `Supplier` method.

The same transactional flow applies to the `StreamBridge#send` case also. When Spring Cloud Stream calls the send method, the underlying `KafkaTemplate` that the output binding uses ensures that the record publishes within a transaction, since we provide the `transaction-id-prefix`.

## [](#transactions-with-multiple-record-publishing)Transactions with multiple record publishing

With that primer out of the way, let’s move on to cases where it makes sense to use transactions. As we discussed before, the need to publish multiple records as a single atomic unit is a valid scenario where using transactions becomes necessary.

Let’s look at the following code example:

```
Copypublic void publish(StreamBridge streamBridge {
  for (int i = 0; i < 5; i++) {
    streamBridge.send("mySupplier-out-0", "data-" + i);
  }
}
```

As you can see, this is a contrived example to demonstrate what is at stake. Instead of publishing once, we publish multiple records. Publishing to multiple topics is also an equally valid approach here. We might think that we can quickly wrap the publishing of multiple records within a single transaction by setting the `transaction-id-prefix` property. However, we need more than this to help us here. We still need to provide the prefix property. However, with just that, each send still occurs in its dedicated transaction. To ensure that the whole end-to-end publishing of all five records happens atomically, we need to apply the `@Transactional` annotation from the core Spring Framework on the method. In addition, we must provide a transaction manager bean - `KafkaTransactionManager` - that uses the same producer factory created by the Spring Cloud Stream Kafka binder. Here is how our code looks like now and the application's configuration:

```
Copy@SpringBootApplication
@RestController
public class SpringCloudStreamProducer {

   @Autowired
   StreamBridge streamBridge;

   @Autowired Sender sender;

   @Autowired
   DefaultBinderFactory binderFactory;

   public static void main(String[] args) {
       SpringApplication.run(SpringCloudStreamProducer.class, args);
   }

   @PostMapping("/send-data")
   public void publishData() throws InterruptedException {
       sender.send(streamBridge);
   }

   @Component
   static class Sender {

     @Transactional        
     public void send(StreamBridge streamBridge)      
     {
       for (int i = 0; i < 5; i++) {
     	   streamBridge.send("mySupplier-out-0", "data-" + i);           
       }
     }
   }

  @Bean
  KafkaTransactionManager customKafkaTransactionManager() {
     KafkaMessageChannelBinder kafka = (KafkaMessageChannelBinder)this.binderFactory.getBinder("kafka", MessageChannel.class);
     ProducerFactory<byte[], byte[]> transactionalProducerFactory = kafka.getTransactionalProducerFactory();
     KafkaTransactionManager kafkaTransactionManager = new KafkaTransactionManager(transactionalProducerFactory);
     return kafkaTransactionManager;
  }
}
```

And the corresponding configuration:

```
Copyspring:
  cloud:
   stream:
     bindings:
       mySupplier-out-0:
         destination: my-topic
     kafka:
       binder:
         Transaction:
		transaction-id-prefix: mySupplier-
producer:
             configuration:
               retries: 1
               acks: all
```

Note that the transactional method (the method annotated with `@Transactional`) in the preceding code must be in a different class from the one invoking the method. If the invocation is between the methods on the same class or between different classes that are not Spring-managed beans, there is no proxy, and the transaction interceptor does not kick in. The JVM does not know about the proxying and interceptor mechanism at runtime. When adding the `@Transactional` annotation on a method, Spring creates a transactional proxy for that method behind the scenes. When Spring Cloud Stream invokes the transactional method, the proxy intercepts that call and then the actual invocation happens through the proxied object.

The custom `KafkaTransactionManager` bean we provide serves two purposes. First, it makes Spring Boot apply `@EnableTransactionManagerment`. It also provides the same producer factory the binder uses internally so that the Transactional annotation uses the proper resources when applying transactions.

When Spring Boot detects an available transaction manager bean, it automatically applies the `@EnableTransactionManagement` annotation for us, which is responsible for detecting the `@Transactional` annotation and then adding the interceptor through the Spring AOP proxy and advice mechanism. In other words, Spring AOP creates a proxy for the `@Transactional` method and includes the AOP advice. Without the `@EnableTransactionManagement` annotation applied, Spring does not trigger any of these proxying and interception mechanisms. Since the `EnableTransactionManagement` annotation is crucial for these various reasons, we must provide a transaction manager bean. Otherwise, the `Transactional` annotation on the method has no bearings.

Note that we are getting the transactional producer factory from the binder and using that in the constructor for `KafkaTransactionManager`. When this bean is present in the application, the entire publishing of all the records now happens within the scope of a single transaction. We see only a single sequence of **beginTransaction…commitTransaction** in the trace logs, which means that only one proper transaction carries out all the publishing operations.

Behind the scenes, these are the sequence of events:

1.  As soon as the method annotated with `Transactional` is called, the transaction interceptor kicks in through the AOP proxying mechanism, and it starts a new transaction by using the custom `KafkaTransactionManager`.
2.  When the transaction manager begins the transaction, the resource used by the transaction manager - the transactional resource holder (AKA, producer obtained from the producer factory) - is bound to the transaction.
3.  When the method calls the `StreamBridge#send` method, the underlying `KafkaTemplate` will use the same transactional resource created by the custom `KafkaTransactionManager`. Since a transaction is already in progress, it does not start another transaction, but the publishing occurs on the same transactional producer.
4.  As it calls more `send` methods, it will not start new transactions. Instead, it publishes via the same producer resource used in the original transaction.
5.  When the method exits, the interceptor asks the transaction manager to commit the transaction if there is no error. If any of the send operations or anything else in the method throws an exception, the interceptor asks the transaction manager to roll back the transaction. These calls eventually hit the `KafkaResourceHolder` **commit** or **rollback** methods, which calls the Kafka producer to **commit** or **rollback** the transaction.

Since we only have one custom `KafkaTransactionManager` bean in our example, we can simply use the `Transactional` annotation as is. On the other hand, if we had multiple custom `KafkaTransactionManager` beans, we would have to qualify the `@Transactional` annotation with the correct bean name.

## [](#what-if-we-run-the-app-without-the-custom-kafkatransactionmanager)What if we run the app without the custom KafkaTransactionManager?

If we remove the custom `KafkaTransactionManager` and run this application, you can see that it creates five individual transactions, not a single transaction. If you enable `TRACE` logging, you can see five sequences of **beginTransaction…commitTransaction** in the logs.

You can verify this behavior by writing a transactional consumer Spring Cloud Stream application and setting its isolation level to `read_committed`. You can do so by using the `spring.cloud.stream.kafka.binder.configuration.isolation.level` property and setting its value to `read_committed`. For testing purposes, add a `Thread.sleep` or another wait mechanism to simulate the behavior after each `StreamBridge#send` in the for loop. You can see that, as soon as each `send` method call returns, regardless of the wait, the consumer receives data, thus proving that not a single transaction carried out the entire operation, rather each `send` occurred in its own transaction.

We see individual transactions for each send because the `Transactional` annotation does not do what we expect it to do. The `Transactional` annotation works only if there is a transaction manager bean available and its producer factory is the same one used by the binder.

Spring Boot auto-configures a `KafkaTransactionManager` if it detects the `transaction-id-prefix` property in the configuration through `spring.kafka.producer.transaction-id-prefix`. However, since we are in a Spring Cloud Stream context, we must use `spring.cloud.stream.kafka.binder.transaction.transaction-id-prefix`, since this is how we signal the framework to create an internal transaction manager for the binder and the associated transactional producer factory. What if we provide the proper `spring.kafka` prefix so that Spring Boot auto-configures a `KakaTransactionManager` for us? Although that is very tempting, it does not work, as the auto-configured transaction manager uses a different producer factory from the one that the binder uses. Thus, we must provide a custom `KafkaTransactionManager` that uses the same producer factory the binder uses. This is precisely what we did above.

In the next part of this blog series, we will learn how to synchronize with external transaction managers for both producer and consumer-initiated transactions.