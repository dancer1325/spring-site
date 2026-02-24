---
title: Understanding AMQP, the protocol used by RabbitMQ
source: https://spring.io/blog/2010/06/14/understanding-amqp-the-protocol-used-by-rabbitmq
scraped: 2026-02-24T08:56:53.906Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Peter Ledbrook |  June 14, 2010 | 10 Comments
---

# Understanding AMQP, the protocol used by RabbitMQ

_Engineering | Peter Ledbrook |  June 14, 2010 | 10 Comments_

table { margin-bottom: 1em; } table, tr, th, td { border: 1px solid #DDD; border-collapse: collapse; } th, td { padding: 5px 10px; }

**Update** I changed the first paragraph to clarify the relationship between RabbitMQ and JMS.

RabbitMQ is a lightweight, reliable, scalable and portable message broker. But unlike many message brokers familiar to Java developers, it's not based on JMS. Instead, your applications communicate with it via a platform-neutral, wire-level protocol: the Advanced Message Queuing Protocol (AMQP). Fortunately there's already a Java client library and SpringSource is working on first class Spring and Grails integration - so don't worry about having to do low-level stuff to use RabbitMQ. You can even find AMQP client libraries that expose a JMS interface. But AMQP is sufficiently different in operation from JMS that it might cause headaches for Java developers that are used to the JMS model.

In order to ease the transition, I'll be looking in this post at the basic concepts that underpin AMQP along with three common usage scenarios. By the end, you will hopefully have a good enough understanding to configure RabbitMQ and use it via the APIs provided by Spring and Grails.

## Exchanges, queues, and bindings

Like any messaging system, AMQP is a message protocol that deals with publishers and consumers. The publishers produce the messages, the consumers pick them up and process them. It's the job of the message broker (such as RabbitMQ) to ensure that the messages from a publisher go to the right consumers. In order to do that, the broker uses two key components: exchanges and queues. The following diagram shows how they connect a publisher to a consumer:

![rabbit-basics](http://blog.springsource.com/wp-content/uploads/2010/06/rabbit-basics.png "rabbit-basics")

As you can see, the setup is pretty straightforward. A publisher sends messages to a named exchange and a consumer pulls messages from a queue (or the queue pushes them to the consumer depending on the configuration). Of course, the connections have to be made in the first place, so how do publishers and consumers discover each other? Via the name of the exchange. Usually, either the publisher or consumer creates the exchange with a given name and then makes that name public. How that publication happens depends on the circumstances, but one might put it in public API documentation or send it to known clients.

How are the messages routed from the exchange to the queue? Good question. First, the queue has to be attached to the given exchange. Typically, a consumer creates a queue and attaches it to an exchange at the same time. Second, messages received by the exchange have to be matched to the queue - a process called "binding".

To understand binding, it's useful to understand the structure of an AMQP message:

![rabbit-message](http://blog.springsource.com/wp-content/uploads/2010/06/rabbit-message.png "rabbit-message")

The headers and properties of the message are basically key/value pairs. The difference between them is that headers are defined by the AMQP specification whereas properties can contain arbitrary, application-specific information. The actual message content is just a sequence of bytes, so if you want to pass text around in your messages, then you should standardise on an encoding. UTF-8 is a good bet. You can specify a content type and encoding in the message headers if you want, but that's apparently not particularly common.

What does this have to do with binding? One of the standard headers is called routing-key and it is this that the broker uses to match messages to queues. Each queue specifies a "binding key" and if that key matches the value of the routing-key header, the queue receives the message.

Things are slightly complicated by the concept of exchange types. The AMQP spec. defines the following four types:

Exchange type

Behaviour

Direct

The binding key must match the routing key exactly - no wildcard support.

Topic

Same as Direct, but wildcards are allowed in the binding key. '#' matches zero or more dot-delimited words and '\*' matches exactly one such word.

Fanout

The routing and binding keys are ignored - all published messages go to all bound queues.

Headers

**Update** I corrected the information on wildcards, which work on the basis of dot-delimited words or terms.

For example, say a publisher sends a message with a routing key of "NYSE" to a topic exchange called "Stocks". If a consumer creates a queue attached to "Stocks" with a binding key of "#", "\*", or "NYSE", then that consumer will get the message because all three binding keys match "NYSE". However, if the message is published to a direct exchange, then the consumer will not get the message if the binding key is "#" or "\*" since those characters are treated as literals, not wildcards. Interestingly, "#.#" will also match "NYSE" despite the routing key not having a dot.

Now consider a message with a routing key of "NYSE.TECH.MSFT". What binding keys will match it given that the message is going to a topic exchange?

Binding key

Match?

NYSE.TECH.MSFT

Yes

#

Yes

NYSE.#

Yes

\*.\*

No

NYSE.\*

No

NYSE.TECH.\*

Yes

NYSE.\*.MSFT

Yes

That's really all there is to it. Flexibility is provided by support for multiple consumers per queue and multiple queues per exchange. In fact, a single queue can even be bound to multiple exchanges. Now let's look at some of those scenarios.

## RPC

An AMQP broker can act as an RPC mechanism between a client and a service. The general setup is like this, using a direct exchange:

![rabbit-rpc](http://blog.springsource.com/wp-content/uploads/2010/06/rabbit-rpc.png "rabbit-rpc")

The general sequence goes:

1.  Client sends message to the queue, specifying: (a) a routing key that matches the service; and (b) the name of a queue to pick the response up from.
2.  Exchange passes the message to the service's queue ("ops\_q" in this case).
3.  The queue pushes the message to the service, which then does some work and sends a response message back to the exchange, specifying a routing\_key that matches the reply queue.
4.  The client picks the response message off the reply queue.

From the perspective of the client, the call could either be blocking or non-blocking. How easy it is to do one or the other, though, depends on the client library in use.

The key to the RPC scenario is making sure that the client and service are using the same exchange for the initial request and that the client knows what to specify for the routing key.

As for the reply queue, it's typically created by the client, which then populates the reply\_to header appropriately. Also, although you can use a different exchange for the replies compared to the requests, it's much more common to use the same exchange for both requests and replies.

## Pub(lish)/Sub(scribe)

JMS has the concept of topic queues that ensure that messages from a publisher go to all subscribers. You can easily achieve the same behaviour in AMQP by binding multiple queues to an exchange like so:

![rabbit-pub-sub](http://blog.springsource.com/wp-content/uploads/2010/06/rabbit-pub-sub.png "rabbit-pub-sub")

Even better, the queues can filter which messages they receive via the binding key. If a consumer wants to receive all messages, then it can specify a binding key of "#" - the "match any number of words" wildcard. Rather confusingly for your average developer, "\*" matches zero or one (dot-delimited) words as mentioned earlier.

## Work distribution

Imagine you have an application that has a bunch of jobs that need executing. With AMQP, you can hook up multiple consumers such that each job goes to one, and only one, of those consumers. The publisher doesn't care which consumer does the work, just that the work is done. This is work distribution.

Configuring it is pretty straightforward, as shown in this diagram:

![rabbit-work](http://blog.springsource.com/wp-content/uploads/2010/06/rabbit-work.png "rabbit-work")

So you have one queue bound to the exchange with multiple consumers sharing that queue. This setup guarantees that only one consumer processes a given message, no matter how many consumers there are.

Those are the three main usage patterns for AMQP brokers. Although I have described each individually, it's fairly common to combine them. For example, you could have multiple services sharing the same queue (work distribution) in the RPC pattern. It's really up to you to decide how to configure the exchanges and queues, and now you should have a good enough understanding to work out the appropriate setup for your situation.

If you want to go further into AMQP, then check out [the specification itself](http://www.amqp.org/confluence/download/attachments/720900/amqp0-8.pdf), particularly the section on General Architecture. And to get started with RabbitMQ, just go to [its website](http://www.rabbitmq.com/).