---
title: Java CFEnv 1.1.0.M1 Released
source: https://spring.io/blog/2019/05/31/java-cfenv-1-1-0-m1-released
scraped: 2026-02-23T14:45:48.401Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  May 31, 2019 | 0 Comments
---

# Java CFEnv 1.1.0.M1 Released

_Releases | Mark Pollack |  May 31, 2019 | 0 Comments_

## [](#introduction)[](#introduction)Introduction

On behalf of the community I am happy to announce the release of Java CFEnv 1.1 M1.

This release brings in contributions from several teams

-   EMC Volume Service
    
-   Pivotal Single Sign-On Service
    
-   Pivotal Redis Service
    

Support for Volume Services is a new feature. Single Sign-On functionality has been improved to set Spring Security auto-configuration properties for Spring Security 5’s OAuth support. The Redis support has been improved to support auto-configuration of TLS.

The project [README](https://github.com/pivotal-cf/java-cfenv/blob/master/README.adoc) has more information.

A release candidate is going out next week, followed quickly by a GA release. Please try it out and give feedback on our [github issues](https://github.com/pivotal-cf/java-cfenv/issues) page.

## [](#background)[](#background)Background

For those who may have missed the [first release announcement](https://spring.io/blog/2019/02/15/introducing-java-cfenv-a-new-library-for-accessing-cloud-foundry-services), the Java CFEnv library allows you to easily access environment variables set when deploying an application to Cloud Foundry. It is modeled after the design of the library [node-cfenv](https://github.com/cloudfoundry-community/node-cfenv/) and other `*-cfenv` libraries in the Cloud Foundry ecosystem.

The library also sets common application properties in Spring Boot so that Java objects such as the `DataSource` or the `RabbitConnectionFactory` are created using Spring Boot auto-configuration. It is a replacement for the Spring Cloud Connectors library which is now is maintenance mode.