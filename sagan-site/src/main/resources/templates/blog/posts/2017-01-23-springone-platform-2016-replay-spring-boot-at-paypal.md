---
title: SpringOne Platform 2016 Replay: Spring Boot at PayPal
source: https://spring.io/blog/2017/01/23/springone-platform-2016-replay-spring-boot-at-paypal
scraped: 2026-02-23T18:41:50.643Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Pieter Humphrey |  January 23, 2017 | 0 Comments
---

# SpringOne Platform 2016 Replay: Spring Boot at PayPal

_News | Pieter Humphrey |  January 23, 2017 | 0 Comments_

Recorded at SpringOne Platform 2016. Speakers: Fabio Carvalho, Eduardo Solis Slides: [http://www.slideshare.net/SpringCentral/spring-boot-paypal](http://www.slideshare.net/SpringCentral/spring-boot-paypal)

Although PayPal has been using Spring in production for many years, as part of a goal to move towards micro-services, PayPal recently introduced Spring Boot to its Java framework (known as “Raptor”), which includes RESTful services, Batch and Message Daemon applications. Besides Spring Boot, other Spring projects are used, such as Spring framework, Spring Batch and Spring Integration.

PayPal Java RESTful framework provides a microservices architecture and deployment model, relying on a PaaS infrastructure on the cloud, CI, Docker, embedded container and Spring Boot. Additionally, many Spring Boot starters, and Spring based features, were developed to achieve PayPal needs.

A few examples are:

A REST client abstraction and DI mechanism Central application logging (abstracting URIs and supporting sub-resources when logging traffic to RESTful endpoints) Application logging to asynchronous activity in Spring Integration channels (for messaging applications) A few Spring Boot starters for automatic initialization and configuration of “opinionated” PayPal components RESTEasy Spring Boot starter Regarding REST services, RESTEasy is the JAX-RS choice for PayPal. Although there is one Spring Boot starter for Jersey, and one for Spring REST, there was none for RESTEasy. Because of that PayPal also created, and open sourced, a RESTEasy Spring Boot starter.