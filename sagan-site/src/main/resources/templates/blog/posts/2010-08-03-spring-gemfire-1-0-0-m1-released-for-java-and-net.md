---
title: Spring GemFire 1.0.0.M1 released for Java and .NET
source: https://spring.io/blog/2010/08/03/spring-gemfire-1-0-0-m1-released-for-java-and-net
scraped: 2026-02-24T08:54:47.884Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Costin Leau |  August 03, 2010 | 0 Comments
---

# Spring GemFire 1.0.0.M1 released for Java and .NET

_Engineering | Costin Leau |  August 03, 2010 | 0 Comments_

I am happy to announce the first milestone [release](http://www.springsource.org/node/2723) of the Spring GemFire [project](http://www.springsource.org/spring-gemfire), the newest member in the Spring family. Spring GemFire (for short SGF) brings the Spring concepts and programming model to GemFire, SpringSource's distributed [data management](http://www.springsource.com/products/data-management) platform. The release is available for both [Java](http://www.springsource.com/download/community?project=Spring GemFire) and [.NET](http://www.springsource.com/download/community?project=Spring GemFire for .NET).

The features in 1.0.0.M1 include:

-   declarative dependency injection style configurations for the GemFire infrastructure (such as Cache, Region, Interest, etc)
-   exception translation to Spring's portable DataAccess exception hierarchy
-   Template and callback support for easy native API access
-   transaction management support
-   Spring-backed wiring for GemFire managed objects
-   auto-generation of non-reflection based Instantiators

*Note that some of these features are currently available only in the Java version.*  
Through SGF, Spring users should feel right at home when interacting with GemFire while developers familiar with GemFire will see the benefits and flexibility of the Spring container, its powerful AOP integration, and versatile service abstractions. But don't take my word for it - download the project and take the sample application for a spin. It's a console based 'shell' which allows for ad-hoc interaction with the data grid; one can start and stop nodes and see the information shared transparently between multiple clients.

We look forward to your feedback!