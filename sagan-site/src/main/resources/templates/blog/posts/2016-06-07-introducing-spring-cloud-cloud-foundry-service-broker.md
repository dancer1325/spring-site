---
title: Introducing Spring Cloud Cloud Foundry Service Broker
source: https://spring.io/blog/2016/06/07/introducing-spring-cloud-cloud-foundry-service-broker
scraped: 2026-02-23T19:14:07.206Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Scott Frederick |  June 07, 2016 | 1 Comment
---

# Introducing Spring Cloud Cloud Foundry Service Broker

_Releases | Scott Frederick |  June 07, 2016 | 1 Comment_

I am pleased to announce the newest addition to the Spring Cloud family. [Spring Cloud Cloud Foundry Service Broker](http://cloud.spring.io/spring-cloud-cloudfoundry-service-broker/) is a framework for building [service brokers](http://docs.cloudfoundry.org/services) for the [Cloud Foundry](https://www.cloudfoundry.org) platform.

## [](#cloud-foundry-service-brokers)[](#cloud-foundry-service-brokers)Cloud Foundry service brokers

Service brokers provide a means to extend Cloud Foundry with managed services that can be consumed by applications deployed to the platform. Managed services typically expose some sort of resource to an application, such as a database or other persistent store, a messaging system, or other supporting infrastructure. Service brokers publish a catalog of services and service plans, manage the provisioning and de-provisioning of service instances, and provide connection details and credentials for an application to consume the resource. Service brokers are registered to Cloud Foundry and communicate with the platform using a well-defined [Service Broker REST API](http://docs.cloudfoundry.org/services/api.html).

Spring Cloud Cloud Foundry Service Broker implements the full service broker REST API as Spring MVC endpoints. This allows a service broker author to focus on the logic necessary to manage the backing resources without having to worry about implementing the broker API semantics.

## [](#some-history)[](#some-history)Some history

Shortly after Spring Boot was released, [Steve Greenberg](https://twitter.com/spgreenberg) developed the [spring-boot-cf-service-broker](https://github.com/cloudfoundry-community/spring-boot-cf-service-broker) project and contributed it to the Cloud Foundry community. In the subsequent months, many [contributors](https://github.com/cloudfoundry-community/spring-boot-cf-service-broker/graphs/contributors) helped add features, fix bugs, and keep pace with the service broker API. Unfortunately, the contributors couldn’t commit to keeping the project up to date on a consistent basis since it was a "side project" for everyone involved.

The Spring Cloud team offered to take ownership and commit to keeping the project up-to-date, and Steve graciously agreed to allow the project to be moved under the Spring Cloud umbrella. The move to Spring Cloud includes changes to the project’s packaging structure and Maven coordinates, along with some cleanup and rationalization of the interfaces that need to be implemented by service broker authors.

## [](#the-path-forward)[](#the-path-forward)The path forward

Spring Cloud Cloud Foundry Service Broker will track the service broker API evolution and add support for the latest broker API features, allowing developers to quickly react to changes in the API. Of course, contributions are welcomed and encouraged. Since there are no interdependencies with other Spring Cloud projects, Spring Cloud Cloud Foundry Service Broker won’t be part of the Spring Cloud [release trains](http://projects.spring.io/spring-cloud/#release-trains).

A few release candidates have already been published for the project. Users of the previous project have tested these RCs and provided feedback. With this introduction, Spring Cloud Cloud Foundry Service Broker will be GA with version 1.0.0.RELEASE.

## [](#get-involved)[](#get-involved)Get involved

To get started, view the [project page](http://cloud.spring.io/spring-cloud-cloudfoundry-service-broker/) and the [documentation](https://github.com/spring-cloud/spring-cloud-cloudfoundry-service-broker). Provide feedback via GitHub [issues](https://github.com/spring-cloud/spring-cloud-cloudfoundry-service-broker/issues) or contribute via [pull requests](https://github.com/spring-cloud/spring-cloud-cloudfoundry-service-broker/pulls).