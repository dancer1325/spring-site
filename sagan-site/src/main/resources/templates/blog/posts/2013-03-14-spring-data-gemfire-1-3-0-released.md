---
title: Spring Data GemFire 1.3.0 Released
source: https://spring.io/blog/2013/03/14/spring-data-gemfire-1-3-0-released
scraped: 2026-02-24T08:07:29.127Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | David Turanski |  March 14, 2013 | 0 Comments
---

# Spring Data GemFire 1.3.0 Released

_Engineering | David Turanski |  March 14, 2013 | 0 Comments_

I am pleased to announce the GA release of Spring Data GemFire 1.3.0. In addition to many minor bug fixes and enhancements, this release includes some notable new features to make writing Java applications with GemFire even easier:

## Annotation Support For Functions

GemFire provides the ability to "bring the code to the data" by providing a framework for remote function execution. In keeping with Spring's core values, Spring Data GemFire hides the boilerplate code necessary to register and execute remote functions, allowing you to write POJOs and focus on application logic. See the [Annotation Support for Function Execution](http://static.springsource.org/spring-gemfire/docs/current/reference/htmlsingle/#function-annotations) chapter in the Spring Data GemFire Reference Guide for details.

## Simplified Connection to a GemFire Datasource

GemFire exposes a lot of options for tuning the performance of it's connection pool, and to configure how local data is managed an synchronized. The Spring Data GemFire namespace supports all of these options, however many applications are clients that simply need read/write access to the GemFire data grid. For this class of applications, it is now possible to connect to GemFire as a client without explicitly configuring a pool or client regions:

```xml
Copy
 <gfe-data:datasource>
        <gfe-data:locator host="${host}" port="${port}"/>
 </gfe-data:datasource>
```

The above configuration will create a client cache, pool, and proxy client regions for all available regions on the server, with sensible defaults, and register them as Spring beans.

## JSON Support

GemFire 7.0 provides the ability to store JSON with full query support. Typically this requires the application to use the JSONFormatter to convert GemFire's internal format to and from JSON Strings. Spring Data GemFire now provides an option to perform this conversion automatically for selected regions, as will as one way conversion from Object to JSON using Jackson's ObjectMapper. This feature uses Spring AOP to intercept appropriate operations on Region and GemFireTemplate. See the [Spring Data GemFire Reference Guide](http://static.springsource.org/spring-gemfire/docs/current/reference/htmlsingle/#bootstrap:region:json) for details.