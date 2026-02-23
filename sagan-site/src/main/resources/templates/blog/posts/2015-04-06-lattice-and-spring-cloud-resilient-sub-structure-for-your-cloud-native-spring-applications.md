---
title: Lattice and Spring Cloud: Resilient Sub-structure for Your Cloud-Native Spring Applications
source: https://spring.io/blog/2015/04/06/lattice-and-spring-cloud-resilient-sub-structure-for-your-cloud-native-spring-applications
scraped: 2026-02-23T21:08:04.461Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Matt Stine |  April 06, 2015 | 0 Comments
---

# Lattice and Spring Cloud: Resilient Sub-structure for Your Cloud-Native Spring Applications

_Engineering | Matt Stine |  April 06, 2015 | 0 Comments_

We believe that the development of [cloud-native application architectures](http://pivotal.io/platform-as-a-service/migrating-to-cloud-native-application-architectures-ebook) is the next great evolutionary phase of enterprise application development. These architectures combine elements like [twelve-factor applications](http://12factor.net), [microservices](http://martinfowler.com/articles/microservices.html), [self-service agile infrastructure](http://pivotal.io/platform-as-a-service/pivotal-cloud-foundry), [API-based collaboration](http://www.mattstine.com/2014/06/30/microservices-are-solid), and [antifragility](http://www.infoq.com/articles/russ-miles-antifragility-microservices). All of these elements enable us to simultaneously move quickly and safely as we continuously deliver business value to our customers.

The Spring team's goal has always been to [win the war on Java complexity](https://twitter.com/mstine/status/559141270715924481), and now we're teaming up with our colleagues on the [Cloud Foundry](http://cloudfoundry.org) team to eliminate complexity from the development and operation of cloud-native applications.

We began this effort with [Spring Cloud](http://cloud.spring.io), an umbrella project that brings to the composition of cloud-native application architectures the same simplicity and productivity you've come to depend on in [Spring Boot](http://projects.spring.io/spring-boot). Coordination of distributed systems can be accomplished by applying many well-characterized boiler plate patterns. Using Spring Cloud, developers can quickly stand up services and applications that implement those patterns. Many of these patterns are provided via wrapping the battle-tested components found at [NetflixOSS](http://netflix.github.io/).

You can develop and run Spring Cloud applications anywhere, including your laptop, bare-metal data center infrastructure, or cloud infrastructure like AWS or Google Cloud. But for maximum effectiveness, cloud-native applications need a cloud-native application platform. We believe that Cloud Foundry is the platform that, combined with Spring Cloud, provides the optimal necessary sub-structure for building and operating cloud-native applications.

Historically it's been challenging to run Cloud Foundry on your laptop. That's why we're excited to tell you about [Lattice](http://lattice.cf). Lattice is a cloud-native application platform that enables you to run your applications in containers using solutions like [Docker](http://docker.com). Lattice includes features like:

-   Cluster scheduling
-   HTTP load balancing
-   Log aggregation
-   Health management

Lattice does this by packaging a subset of the components found in the Cloud Foundry elastic runtime. The result is an open, single-tenant environment suitable for rapid application development. Applications developed using Lattice should migrate unchanged to full Cloud Foundry deployments.

To help you get started with Lattice, we've published two getting started guides:

-   [Spring Boot with Docker](https://spring.io/guides/gs/spring-boot-docker): Lattice currently supports running applications packaged as Docker images, so this guide helps you to build Docker images from your Spring Boot application using either Maven or Gradle.
-   [Spring Cloud + Lattice](https://spring.io/guides/gs/spring-cloud-and-lattice/): this guide walks you through setting up Lattice and then deploying a Spring Boot application to it. Applications you package following the Docker guide should run on Lattice with ease.

The second guide highlights our first direct integration between Spring Cloud and Lattice, [spring-cloud-lattice](https://github.com/spring-cloud/spring-cloud-lattice), which is an implementation of Spring Cloud's `DiscoveryClient` backed by Lattice's [API](http://lattice.cf/docs/lattice-api). This implementation allows us to perform [service discovery](http://microservices.io/patterns/client-side-discovery.html) directly from Lattice without any additional dependencies. If you've already started leveraging Netflix Ribbon or Zuul via Spring Cloud, you'll now be able to use both without deploying a Eureka server! Spring Cloud Lattice is currently an alpha-quality preview release.

This integration is only the first of many you'll be seeing from the ever deepening collaboration between the Cloud Foundry and Spring teams. For example, the Spring XD team has been hard at work building a service-provider interface that allows XD to treat Lattice as a runtime layer, deploying stream modules as containers.

Our goal is to provide you, the enterprise Java developer, with the ideal local development and cloud operation environments that you need to harness the power of cloud-native applications. We look forward to showing you even more great things at [SpringOne 2GX](http://springone2gx.com) in September, 2015. Stay tuned!