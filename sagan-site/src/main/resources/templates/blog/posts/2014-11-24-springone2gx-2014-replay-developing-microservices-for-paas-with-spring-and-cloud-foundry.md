---
title: SpringOne2GX 2014 Replay: Developing Microservices for PaaS with Spring and Cloud Foundry
source: https://spring.io/blog/2014/11/24/springone2gx-2014-replay-developing-microservices-for-paas-with-spring-and-cloud-foundry
scraped: 2026-02-23T22:05:59.406Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Pieter Humphrey |  November 24, 2014 | 2 Comments
---

# SpringOne2GX 2014 Replay: Developing Microservices for PaaS with Spring and Cloud Foundry

_News | Pieter Humphrey |  November 24, 2014 | 2 Comments_

Recorded at SpringOne2GX 2014.

Speaker: Matt Stine

Slides: http://www.slideshare.net/SpringCentral/developing-microservices-for-paas-with-spring-and-cloud-foundry

Marc Andressen has famously said "Software is eating the world." What does that mean? We take it to mean that multiple industries with historically entrenched leaders are being disrupted by businesses built around a software core. These software factories are characterized by: tight feedback loops rapid iteration horizontal scaling mobile-first UX continuous delivery These factors have contributed to drive a change in how we approach infrastructure, which has taken the lead in adapting to meet these needs with the move to the cloud, and Platform as a Service (PaaS) offerings like Cloud Foundry have raised the level of abstraction to a focus on an ecosystem of applications and services. However, most applications are still developed as if we're living in the previous generation of both business and infrastructure: the monolithic application. Microservices - small, loosely coupled applications that follow the Unix philosophy of ""doing one thing well"" - represent the application development side of enabling rapid, iterative development, horizontal scale, polyglot clients, and continuous delivery. They also enable us to scale application development and eliminate long term commitments to a single technology stack. While microservices are simple, they are certainly not easy. It's recently been said that "microservices are not a free lunch." Interestingly enough, if you look at the concerns typically expressed about microservices, you'll find that they are exactly the challenges that a PaaS is intended to address. So while microservices do not necessarily imply cloud (and vice versa), there is in fact a symbiotic relationship between the two, with each approach somehow compensating for the limitations of the other, much like the practices of eXtreme Programming do the same. This session will describe architectural patterns for developing microservices:

-   Service Decomposition
-   API Gateways
-   Stateless / Shared-Nothing
-   Apps Configuration and Backing Service
-   Consumption
-   Fault Tolerance

Along the way we'll see how to leverage technologies such as Spring Boot and Reactor to develop microservices targeted at Cloud Foundry.

!{iframe width="560" height="315" src="//www.youtube.com/embed/iMvCOEsSuAc" frameborder="0" allowfullscreen}{/iframe}