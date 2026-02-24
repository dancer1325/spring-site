---
title: Eventing Data with RabbitMQ and Riak
source: https://spring.io/blog/2011/04/21/eventing-data-with-rabbitmq-and-riak
scraped: 2026-02-24T08:42:37.175Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Jon Brisbin |  April 21, 2011 | 0 Comments
---

# Eventing Data with RabbitMQ and Riak

_Engineering | Jon Brisbin |  April 21, 2011 | 0 Comments_

As new applications take advantage of the scalability benefits of message brokers like [RabbitMQ](http://www.rabbitmq.com/ "RabbitMQ Home") and cloud-scale datastores like [Riak](http://wiki.basho.com/ "Riak Home"), it's inevitable that the two should become fast friends (the kind who actually talk to each other in person rather than the kind whose only contact is through Facebook).

So many of the applications we find ourselves writing these days have these two functions in the same application. Very often we want to update data as the result of a message or send a message as the result of updated data. Two new utilities facilitating RabbitMQ and Riak integration allow you to do either directly inside their respective servers.

### RabbitMQ Custom Exchange

The purpose of the experimental RabbitMQ Riak custom exchange is to send AMQP messages from the broker to a Riak cluster. You could, of course, simply bind a consumer to a particular exchange and do that yourself. If you're doing any kind of message transformation, then you might still need to do that in a special consumer. But having a dedicated exchange type for this purpose gives you lots of flexibility over where the message actually ends up with minimal configuration or overhead. You can specify the host and Protocol Buffers port of the Riak server in the arguments you pass to the exchange declare operation, or you can pass that information as an AMQP message header--or you could do both. You could specify the bucket and key information in an AMQP message header, or you could let that be inferred from the exchange name and routing key, respectively--or you could do a combination of both by overriding, say, the bucket name in which the message will be stored.

Once the message has been delivered to Riak, the exchange calls the topic exchange routing logic, which means this exchange works just like a normal topic exchange--with the exception that it stores all messages it receives in Riak. In the near future, support will be added for all the exchange types that RabbitMQ supports, not just the topic exchange type.

Internally, the exchange uses connection pooling to send messages to Riak. To expand the number of available clients in the pool beyond the default of five, simply set the "maxclients" argument when you declare your exchange.

### RabbitMQ Riak postcommit Hook

The other side of the coin is the [postcommit hook](http://wiki.basho.com/Pre--and-Post-Commit-Hooks.html "Pre and Post-commit Hooks") you can install into your Riak server that will send any updated Riak objects to a RabbitMQ server whenever that entry is modified.

To specify where to send this message, you can include a number of different metadata headers of the "X-Riak-Meta-" variety on your entry. Here is the full list of possible options that can be set either on each individual entry or on a special document in that bucket with a key of "AMQP-Meta". This will provide a default set of metadata headers that will be checked if none exist on the actual entry.

The full list of headers recognized is:

-   X-Riak-Meta-Amqp-Exchange
-   X-Riak-Meta-Amqp-Routing-Key
-   X-Riak-Meta-Amqp-Host
-   X-Riak-Meta-Amqp-Port
-   X-Riak-Meta-Amqp-Vhost
-   X-Riak-Meta-Amqp-User
-   X-Riak-Meta-Amqp-Password
-   X-Riak-Meta-Amqp-Ignore

Most of these options are self-documenting. One option to note is the "X-Riak-Meta-Amqp-Ignore" header. By setting this to the value "true", the RabbitMQ postcommit hook will ignore any updates to this entry and not send a message like it normally would.

### What can I do with it?

The concept is simple, of course, but the implications are profound.

One of the problems when dealing with RabbitMQ's clustering is that it uses mnesia under the covers. In many distributed setups this is not always ideal. Sometimes-connected WAN nodes in particular can suffer from not having a solid connection to the other brokers.

By specifying the RabbitMQ server to send Riak updates to, it's actually possible to set up a scenario like the one in the following diagram:

![Riak Shovel Diagram](http://cms.jbrisbin.com/riak-shovel-diagram.jpg)

The two RabbitMQ servers in this diagram are not clustered. Using a combination of a Riak exchange type for RabbitMQ and the RabbitMQ postcommit hook for Riak, consumers on both servers will receive the messages in a manner much like what the [shovel plugin for RabbitMQ](http://www.rabbitmq.com/plugins.html#rabbitmq-shovel) does.

Keep in mind that this custom exchange type does not address the underlying problem of communicating with nodes across a WAN (or, for that matter, in any scenario where nodes come and go ad hoc, like in a dynamic scaling situation). There are trade-offs in everything, of course, so your mileage may vary. Currently, neither of these utilties handles retries or resends. There is no official roadmap yet, but if there were, retries would be at the top of the list.

One of the nice things about using a Riak-backed message exchange is that your messages are all stored. Since Riak is a cloud-scale data store, you can keep every message your exchange receives without worrying about the storage overhead (just add more Riak servers for greater capacity). This also means you can write a simple web interface to display those messages and, by simply updating the message, you can resend any (or all!) of them. This could be a great way to replay a set of messages for testing, or if you wanted to re-send all your messages somewhere else by changing one of the metadata headers to point to a different broker.

This is just a quick introduction to a brand new, but potentially powerful tool. I'm sure you've already got ideas on how you can apply this method to your own problem domains. I'd love to hear how you plan to do that! Send me a Tweet ([@j\_brisbin](http://twitter.com/#!/j_brisbin)) about what you're doing.