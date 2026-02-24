---
title: Routing Topologies for Performance and Scalability with RabbitMQ
source: https://spring.io/blog/2011/04/01/routing-topologies-for-performance-and-scalability-with-rabbitmq
scraped: 2026-02-24T08:43:58.101Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Helena Edelson |  April 01, 2011 | 2 Comments
---

# Routing Topologies for Performance and Scalability with RabbitMQ

_Engineering | Helena Edelson |  April 01, 2011 | 2 Comments_

Designing a good routing topology for a highly-scalable system can be like mapping a graph. Many things need to be considered, for instance the problem, constraints of the environment, those of the messaging implementation, and performance strategies. What we often run up against is a lack of flexibility and expressivity in fitting routing to our needs. Here is where RabbitMQ stands out.

## Basic Concepts

Anyone familiar with messaging in general knows the concept of routing messages from A to B. Routing can be simplistic or quite complex, and when designing a routing topology for a scalable, complex system it must be elegant. Kept clean and decoupled, components can throttle nicely with varying loads. This can be expressed as a simple map or complex graph. In its simplest form a routing topology can be expressed as nodes, for instance hierarchical nodes:

[![Hierarchical nodes in message routing topology](http://blog.springsource.com/wp-content/uploads/2011/03/tree-nodes.png "Hierarchical nodes in message routing topology")](http://blog.springsource.com/wp-content/uploads/2011/03/tree-nodes.png)

For those new to RabbitMQ or [AMQP](http://en.wikipedia.org/wiki/AMQP ) (note that Rabbit works with many protocols including [STOMP](http://en.wikipedia.org/wiki/Streaming_Text_Oriented_Messaging_Protocol), HTTP, HTTPS, XMPP, and SMTP), here are some basic component descriptions:

-   **Exchange** The entity within the server which receives messages from producer applications and optionally routes these to message queues within the server
-   **Exchange type** The algorithm and implementation of a particular model of exchange. In contrast to the "exchange instance", which is the entity that receives and routes messages within the server
-   **Message queue** A named entity that holds messages and forwards them to consumer applications
-   **Binding** An entity that creates a relationship between a message queue and an exchange
-   **Routing key** A virtual address that an exchange may use to decide how to route a specific message

For point-to-point routing, the routing key is usually the name of a message queue. For topic pub-sub routing the routing key is usually hierarchical in nature:

`api.agents.agent-{id}.operations.{operationName}`

In more complex cases the routing key may be combined with routing on message header fields and/or its content. An exchange examines a message's properties, header fields, body content, and possibly data from other sources, then decides how to route the message. A binding pattern derived from the above routing key idea might look like` api.agents.*.operations.*` where we bind exchange `E1` to queue `Q1` with binding pattern `api.agents.*.operations.*` so that any messages sent to `E1` route to `Q1` if their routing key matches the binding pattern.

A Rabbit broker is structured differently than a JMS Broker. Each RabbitMQ server is comprised of at least one node (broker), or more typically, nodes in a cluster. Each node has a default virtual host, "/", and further virtual hosts can be created such as "/develoment". Rabbit virtual hosts are like Tomcat virtual hosts and partition broker data into sub-sets. Within these virtual hosts are exchanges and queues. When a user connects with its credentials, it is connecting to a virtual host on a Rabbit node.

Here we connect to a Rabbit node, declare an exchange to publish to, a queue to consume from, a binding pattern, then publish a few messages, using the [RabbitMQ java client api](http://www.rabbitmq.com/java-client.html):

```java
Copypackage org.demo.simple.rabbit;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.QueueingConsumer;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public final class RocketSender {

 public void sendRockets() throws IOException {
     List<String> rocketsWithRoutings = new RocketRouter().build();

     Connection connection = new ConnectionFactory().newConnection();
     Channel channel = connection.createChannel();

     String rocketExchange = "rockets.launched";
     channel.exchangeDeclare(rocketExchange, "topic");
     String rocketQueue = channel.queueDeclare().getQueue();
     channel.queueBind(rocketQueue, rocketExchange, "galaxies.*.planets.*");

     for (String rocketTo : rocketsWithRoutings) {
         channel.basicPublish(rocketExchange, "galaxies.*.planets." + rocketTo, null, rocketTo.getBytes());
     }

     channel.close();
     connection.close();
 }
}
```

A simple consume of "landed" rockets could look like:

```java
Copy
 QueueingConsumer queueingConsumer = new QueueingConsumer(channel);
 channel.basicConsume(rocketQueue, false, queueingConsumer);

 int landed = 0;
 while (landed < launched) {
     QueueingConsumer.Delivery delivery = queueingConsumer.nextDelivery();
     channel.basicAck(delivery.getEnvelope().getDeliveryTag(), false);
     String rocketLanded = new String(delivery.getBody());

     if (rocketLanded.equalsIgnoreCase("Alderaan")) {
         System.out.println("That's no moon, that's a space station.");
     }
     landed++;
 }
```

## The Problem

In considering what routing strategies perform best in scalable environments where performance itself can also be improved, there many options. One of the great things about messaging in general is the variety of configurations available, and figuring out the right ones that solve both current and growing requirements.

To keep things simple let's consider two strategies:

1.  Highly-partitioned routing with hierarchical routing keys, fewer topic exchanges
2.  A larger number of direct exchanges and queues with far less routing partitions

Each scenario follows this use case: each application that must scale is both producer and consumer:

[![](http://blog.springsource.com/wp-content/uploads/2011/03/producer-consumer.png "Producer Consumer")](http://blog.springsource.com/wp-content/uploads/2011/03/producer-consumer.png)

### Where To Start

It is a good idea to take stock of your environment and its components before delving into a routing solution that will scale cleanly and efficiently over time. For example, what lends to scaling? Generally, decoupling, distribution, asynchrony, parallelism, levels of abstraction and indirection to name a few. Then consider what elements are current or potential bottlenecks. It is a basic principle that high traffic/volume pathways require more efficient throughput or you incur risk of bottlenecks in your distribution. One exercise is to rank these in terms of traffic or as a heat map. Next, can you classify your traffic - are there overarching patterns, topics or similar message types, and what are the relationships? Now start to consider consolidation, how and where might efficiency be improved, and apply tested patterns that resolve those heat points, decouple for scale, and increase performance.

## General Routing Considerations

All exchange types behave differently. Here are a few general rules:

-   If you have a finite domain of routing keys in an application's graph then many fanout exchanges might be the right fit  (1:1 mapping of exchange per routing  key)
-   If you have a potentially infinite number of routing keys, consider topic exchanges
-   For topic routing, performance decreases as the number of bindings increase
-   Fanout exchanges are very fast because they have no routing to process yet if bound to a large number of queues that changes
-   Direct exchanges are a faster form of topic exchanges, provided you do not need the wild card
-   Troubleshooting problems across 100,000+ queues could be tedious versus a topology with more bindings, fewer exchanges and queues
-   A very high number of exchanges and queues take up more memory which may be significant but this really depends

As of RabbitMQ 2.4.0, released March 23, 2011, a new topic routing algorithm optimization is available that is 60 times faster at peak than the previous topic algorithm. Due to this, one recommendation is to go for less exchanges and queues, and more routing because the time increase is now minimal.

## Performance

### What is Cheap?

In terms of memory cost, exchanges and bindings. In [Erlang](http://www.erlang.org "Erlang"), which RabbitMQ is built on, each node (broker) is a process, as is each queue. By default the Erlang VM process limit is set to 1M, which can be raised. However, an exchange is not a process for scalability reasons, it is simply a row in RabbitMQ's built-in Mnesia database. In a cluster, declaring an exchange causes it to appear on all nodes of the cluster, while declaring a queue creates it on only one of the nodes. This explains why exchanges survive node restarts or creating a node in a cluster, yet queues do not.

Be wary of binding churn. In strategy number 2, if you create many new queues and their bindings, whenever consumers attach you might run into problems. For instance, given exchanges `E1...En` to which many messages are being published, whenever consumer `Cm` connects, it creates bindings from its own queue to all of `E1...En` which may cause problems, depending on the rate of connections.

To alleviate binding churn, consider exchange-to-exchange bindings, new as of version 2.3.1. Each consumer could have its own secondary exchange `Ym` which must not be auto-delete. Then bind all of `E1...En` to `Ym`. In this way these bindings always exist. In this scenario, whenever consumer `Cm` connects it simply has to declare its queue and bind that queue to `Ym`. If Ym is a fanout exchange, it will be very fast and reduce the binding churn rate to 1 per connection, rather than potentially n per connection.

[![Exchange-to-Exchange Binding](http://blog.springsource.com/wp-content/uploads/2011/04/exchange-exchange.png "Exchange-to-Exchange Binding")](http://blog.springsource.com/wp-content/uploads/2011/04/exchange-exchange.png)

## Use Cases

### Exchange-to-Exchange Scalable Use Case

Consider a server application with autonomous agents. Each agent is on a virtual machine that is part of an elastically-scaled system. As each agent starts up it sends a message to the server that it is online, followed by many other messages such authentication and data transfer. If we have 1,000 agents, each declaring 50 direct exchanges, queues and bindings, then each agent must know the server's queues in order to fulfill the binding contract on queue.declare operations. That is not a scalable solution.

Now consider creating shared topic exchanges: one exchange for the agent to server pathway,  another for the server to agent pathway, and a third to handle unauthenticated agents which routes only to those queues that do not require security. Now we partition with binding patterns, message routing keys and bring one set of those up for each server to be shared by all agents that connect to it. Then, in its simplest form, as each agent comes online it declares a private exchange and queue, and binds its exchange to the shared topic exchanges.

Our relationships are now expressed by exchange-to-exchange mappings which reduces churn rate and decouples agents from having to 'know' the server queues. Using this pattern the system is  clean, decoupled, and scalable.

[![](http://blog.springsource.com/wp-content/uploads/2011/04/routing-topology.png "Basic Routing Topology")](http://blog.springsource.com/wp-content/uploads/2011/04/routing-topology.png)

### Elastic-Scaling Use Case

Let's take the previous scenario a step further. We are already using topic pub-sub routing over scenario 2: many direct routings. Now let's say the system requirement bumps up to scale clusters of our server application in a data center with 50,000 or more agents. How can we throttle varying loads?

The authenticated client exchange routes messages from agent to server. It handles all operations publishing messages to singular-consumer queues, including those producing the highest frequency of messages. This is a potential bottleneck under the current topology with roughly 60,000 messages per minute for 10,000 clients or 86,400,000 messages per day. This is easily resolvable, RabbitMQ can handle over 1 billion messages per day depending on your configuration, for example whether or not you are persisting messages.

Our server applications are running a RabbitMQ cluster. Remember that in a cluster, declaring an exchange causes it to appear on all nodes, while declaring a queue creates it on only one of the nodes, so we have to configure a solution.

### Load-Balancing Between Producers and Consumers

To efficiently handle these potentially very high loads as more client applications (Agents) come online, we can modify this topology in several ways. First, an optimization from the above configuration to load-balance messages across a Rabbit cluster. We can create one queue for each node in the Rabbit cluster. If we have four nodes, for each high-traffic queue we create hfq.{0,1,2,3} for that operation. Now each agent can randomly pick a node by a number between zero and three, or a more sophisticated round-robin implementation, to publish to. With RabbitMQ there are RPC calls or you can use the [Rabbit management plugin](http://www.rabbitmq.com/management.html "Rabbit management plugin") to GET the number of nodes, which you can use in your round-robin algorithm.

### Worker Queues With Round-Robin Dispatching

Worker Queues, or Task Queues, are generally used to efficiently distribute time-consuming tasks among multiple workers and easily parallelise work. In addition, this topology applies to eliminating the need to execute resource-intensive tasks and having to block until they complete. Running several worker queues allows these tasks to be distributed among them.

[![](http://blog.springsource.com/wp-content/uploads/2011/03/multiple-consumers.png "Worker Queues")](http://blog.springsource.com/wp-content/uploads/2011/03/multiple-consumers.png)

With Worker Queues, by default, Rabbit uses a round-robin distribution method, sending each message to the next consumer in sequence. Each consumer receives roughly the same number of messages. If you declare a queue and spin up 3 competing consumers, bind them to the exchange, and send 20,000 messages, messages zero will route to the first consumer, message one to the second, message two to the third and so on. If we begin building up a backlog of tasks, we can simply add more workers, allowing the system to scale easily.

## Performance

### Memory

Neither option above will necessarily induce high load in RabbitMQ. There are no hard limits to the number of exchanges and queues, one can create, and running 100,000 queues on one broker is fine. With the right tuning and enough RAM you can run well over a million queues.

RabbitMQ dynamically pushes messages to disk to free up RAM, thus the memory footprint of a queue is not dependent on its contents. After a queue is idle for 10 seconds or more it will "hibernate" which causes GC on that queue. As a result, the amount of memory a queue requires can dramatically shrink. For example, it might be possible for 1000 empty, idle queues to take up 10MB of RAM. When they're all active (even if empty), they might of course, depending on memory fragmentation, consume much more memory. Forcing them back into hibernation to test behavior is difficult because the Erlang VM does not hand back memory to the OS immediately.

You can, however, observe a large process that hibernates and has very fragmented memory because the amount reclaimed can be sufficient to force the VM to hand back memory to the OS. If you run a test that steadily increases the memory footprint of Rabbit you could observe the effect of hibernation on idle processes as it reduces the rate of increase of memory use.

Erlang is a multi-threaded VM which takes advantage of multiple cores. It presents green threads to the developer which are called 'processes' because unlike threads, they conceptually do not share an address space. Here is an interesting confession on [the Erlang VM and Processes](http://www.infoq.com/news/2011/04/erlang-copied-jvm-and-scala).

### Transactions

Transactions on 10,000 messages can take as along as four minutes to publish. A new RabbitMQ feature called [Publisher Confirms](http://www.rabbitmq.com/blog/2011/02/10/introducing-publisher-confirms/) is more than 100 times faster than the same, but transactional, code. If you are not explicitly required to implement transactions but do need the verification you might consider this option.

## The Take-Away

Here are some final takeaways to help you squeeze the greatest performance gains out of your implementation:

-   The new topic routing algorithm optimization is 60 times faster at peak
-   Topic binding patterns using wildcards '\*', which matches a single word, is much faster than '#', which matches zero or more words. Wildcard '#' takes longer to process in the routing table than '\*'
-   Exchange-to-exchange bindings improve decoupling, increase topology flexibility, reduce binding churn, and help increase performance
-   Exchanges and bindings are very light weight
-   RabbitMQ Publisher Confirms are more than 100 times faster than AMQP transactions
-   After a queue is idle for >=10 seconds it will "hibernate", inducing GC on the queue, resulting in a dramatic decrease in memory required for that queue
-   Worker Queues help parallelize and distribute workloads
-   Distributing worker queues in the Rabbit cluster helps scale
-   Load-balance your topology

This is by no means a thesis on the subject, there are indeed many more patterns, topologies and performance details to consider. A strategy, as always, depends on so many factors but I hope this encapsulates enough to help or at least get one thinking in the right directions.

## Get It

[RabbitMQ Source on GitHub](https://github.com/rabbitmq) [RabbitMQ Binary Downloads and Plugins](http://www.rabbitmq.com/download.html) [Erlang Downloads](http://www.erlang.org/download.html) [Spring AMQP](http://www.springsource.org/spring-amqp) API for RabbitMQ in Java and .NET [Hyperic to monitor RabbitMQ](http://www.hyperic.com/downloads) Maven

> `  <dependency> <groupId>com.rabbitmq</groupId> <artifactId>amqp-client</artifactId> <version>${rabbitmq.version}</version> <exclusions> <exclusion> <groupId>commons-cli</groupId> <artifactId>commons-cli</artifactId> </exclusion> </exclusions> </dependency> <dependency> <groupId>commons-io</groupId> <artifactId>commons-io</artifactId> </dependency>  `