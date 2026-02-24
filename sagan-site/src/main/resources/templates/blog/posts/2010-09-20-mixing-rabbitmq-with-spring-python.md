---
title: Mixing RabbitMQ with Spring Python
source: https://spring.io/blog/2010/09/20/mixing-rabbitmq-with-spring-python
scraped: 2026-02-24T08:53:06.271Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Greg L. Turnquist |  September 20, 2010 | 0 Comments
---

# Mixing RabbitMQ with Spring Python

_Engineering | Greg L. Turnquist |  September 20, 2010 | 0 Comments_

[RabbitMQ](http://rabbitmq.com) is a powerful messaging broker based on the [Advanced Message Queueing Protocol (AMQP)](http://blog.springsource.com/2010/06/14/understanding-amqp-the-protocol-used-by-rabbitmq/). In an [earlier post, we looked into building a Python stock ticker program](http://blog.springsource.com/2010/08/19/building-rabbitmq-apps-using-python/). We compared using RabbitMQ's [pika](http://github.com/tonyg/pika) with [py-amqplib](http://code.google.com/p/py-amqplib/), and how it was easy to transition from one to the other with minimal changes.

In this article, we'll show how pika can easily be used by [Spring Python](http://springpython.webfactional.com). Spring Python is an implementation of the concepts of Spring with the language of Python. It includes many features such as [dependency injection](http://springpython.webfactional.com/1.1.0/reference/html/objects.html). If we choose to build a Spring-like application in Python, it is easy to utilize pika.

At the heart of any Spring application is a set of blue prints or application context. This is the same for Spring Python as for Spring Java.

As I'm sure you've noticed, this context isn't written in XML. Instead it is coded with pure Python. This is very similar to Spring Java Config (which has since been rolled into the core Spring Framework). This defines both a publisher and a subscriber.

-   They are both configured with lazy initialization so we can use one context to support two startup scripts. To create a stock ticker, we need to create the same ticker app, only use the Spring Python container.
-   They are both configured with scope.PROTOTYPE, in the event we wanted to grab more than one copy for a given situation.

We also need a script to fire up a brokerage house that subscribes for these messages, also using Spring Python's container.

The following image shows two terminal windows. The background window shows the ticker application running, spitting out stock quotes. If you look closely, you will notice the last parameter is a message identifying id of 290. The foreground window shows the brokerage house subscribing for stock quotes. It has just received message 290 and then printed out its current net worth.

\[caption id="attachment\_5659" align="alignnone" width="784" caption="Ticker and brokerage house running inside Spring Python"\][![](http://blog.springsource.com/wp-content/uploads/2010/09/sp_ticker_app.png "sp_ticker_app")](http://blog.springsource.com/wp-content/uploads/2010/09/sp_ticker_app.png)\[/caption\]

Because we used Spring Python to inject pika-based RabbitMQ clients, we can easily switch these out for other clients. As pointed out in the previous blog entry, this helps us avoid lockin, and instead choose the solution based on what's important: technical merit, vendor support, and business needs. Pika has shown itself to be an active project with support from the same team that develops the RabbitMQ broker. Migrating to it from py-amqplib is easy and supports whatever tools we are using, including Spring Python as we have just seen. And it will be easy to migrate to another library in the future should the need arise.