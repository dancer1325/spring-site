---
title: SpringOne2GX 2015 replay: Applied Spring Integration, Spring AMQP and RabbitMQ in Spring XD
source: https://spring.io/blog/2016/03/08/springone2gx-2015-replay-applied-spring-integration-spring-amqp-and-rabbitmq-in-spring-xd
scraped: 2026-02-23T19:24:32.536Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Pieter Humphrey |  March 08, 2016 | 0 Comments
---

# SpringOne2GX 2015 replay: Applied Spring Integration, Spring AMQP and RabbitMQ in Spring XD

_News | Pieter Humphrey |  March 08, 2016 | 0 Comments_

Recorded at SpringOne2GX 2015 Presenter: Gary Russell Data / Integration Track Slides: [http://www.slideshare.net/SpringCentral/applied-spring-integration-spring-amqp-rabbitmq-in-spring-xd](http://www.slideshare.net/SpringCentral/applied-spring-integration-spring-amqp-rabbitmq-in-spring-xd)

In this session we will discuss how Spring Integration and Spring AMQP are used as two of the underlying technologies in Spring XD.

The RabbitMQ message bus is used to dynamically create and bind queues and exchanges at runtime when modules are deployed. Items of particular interest include the provision of taps using fanout exchanges, use of the RabbitMQ REST API and spring-retry within the message bus. Spring Integration is used to bind the modules to the message bus (as well as being the technology used within the modules themselves.

This use case shows how these technologies can be used in a much more dynamic scenario than the typical enterprise integration application.

Attendees will learn the architecture and how to apply similar techniques to their own applications. As an added bonus, we will see some of the performance enhancements that XD has driven into the Spring Integration project - in particular how the JMX support is now much more streamlined and performant.