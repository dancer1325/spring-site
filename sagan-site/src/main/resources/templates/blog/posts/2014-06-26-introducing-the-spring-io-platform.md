---
title: Introducing the Spring IO Platform
source: https://spring.io/blog/2014/06/26/introducing-the-spring-io-platform
scraped: 2026-02-23T15:28:52.509Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  June 26, 2014 | 3 Comments
---

# Introducing the Spring IO Platform

_Engineering | Josh Long |  June 26, 2014 | 3 Comments_

We're pleased to announce the release of *[Spring IO 1.0](http://spring.io/blog/2014/06/26/spring-io-platform-1-0-0-released)*!

Spring IO is first and foremost a *logical* description of what many of users will already know and use as a single, cohesive, harmonized platform, centered around Spring.

## [](#big-things-come-in-small-java-packages)Big Things Come in Small (Java) Packages

The Spring IO platform includes *Foundation Layer* modules and *Execution Layer* domain-specific runtimes (DSRs). The Foundation Layer represents the core Spring modules and associated third-party dependencies that have been harmonized to ensure a smooth development experience. The DSRs provided by the Spring IO Execution Layer dramatically simplify building production-ready, JVM-based workloads. The first release of Spring IO includes two DSRs: Spring Boot and Grails. Spring XD will be added to the Spring IO platform later in 2014.

Spring supports many application workloads. Want to talk [to a datastore](http://spring.io/projects/spring-framework)? [A *big*, or *specialized* datastore](http://spring.io/projects/spring-data)? Build a [batch processing solution](http://spring.io/projects/spring-batch)? [Integrate disparate systems and data](http://spring.io/projects/spring-integration)? Work [with AMQP](http://spring.io/projects/spring-amqp)? Use [the Groovy programming](http://groovy.codehaus.org/) language [to rapidly build web applications with Grails](http://grails.org)? Connect to an OAuth-secured REST service like that of [Twitter](http://spring.io/projects/spring-social-twitter), [Facebook](http://spring.io/projects/spring-social-facebook), or indeed [any OAuth-secured service](http://spring.io/projects/spring-security-oauth)? [Secure an application](http://spring.io/projects/spring-security)? Build a [web application with REST, websockets and more](http://spring.io/projects/spring-framework)? ([Using HATEOAS](http://spring.io/projects/spring-hateoas)?) Connect to infrastructure services on your favorite [Platform-as-a-Service (like Cloud Foundry)](http://spring.io/projects/spring-cloud)? Need to [manage fast, reactive, concurrent, message and event dispatch](http://github.com/reactor/)? Expose [SOAP-powered web services](http://spring.io/projects/spring-ws)? Need I go on? There's likely a solution [for you if you know where to look](http://spring.io/projects)!

With [Spring Boot](http://spring.io/projects/spring-boot), it's easy to pull these modules (and many more besides!) together into a solution driven by conventions. Spring Boot is a great way to bootstrap and simplify ongoing application development.

## [](#the-platform-in-a-bom)The Platform in a `BOM`

The Spring IO platform is also an *actual* harmonization of APIs through a Maven Bill-of-Materials dependency. It's now easy to reason about which versions of which dependencies across the entire portfolio work together. If you want to get the latest and greatest revisions of the APIs, simply update your Spring IO dependency. Spring IO, as a platform, also specifies known-to-work revisions of popular third-party libraries (like Hibernate).

Spring IO is, ultimately, just libraries on the `CLASSPATH` of your application, though. You can choose to use specific versions of dependencies using your build tools' `<dependencyManagement/>` facility. The version management is ultimately a suggestion and a convenience, not a *requirement*.

Spring IO is certified to work with Java 1.7 and 1.8, though specific projects under Spring IO will often work with even older JDKs, too. It requires only Java SE and supports Groovy, Grails, and some Java EE. As a platform, it can be deployed in embedded runtimes, classic applications server deployments, and PaaS environments.

## [](#less-is-more)Less is More

Here's an example of how you might use Spring IO. This is a simple Spring Boot REST endpoint that, when run, responds to HTTP requests of the form `http://127.0.0.1:8080/hello/SpringIO`.

**hi/pom.xml**

```xml
Copy<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <groupId>com.example</groupId>
    <artifactId>your-application</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    
    <!-- our one dependency on Spring Boot's web support. No version. -->
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>

    <!-- Transitively bring in the Spring IO Platform Bill-of-Materials `pom.xml` -->    
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>io.spring.platform</groupId>
                <artifactId>platform-bom</artifactId>
                <version>1.0.0.RELEASE</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

</project>
```

**hi/src/main/java/io/Application.java**

```java
Copy
package io;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Configuration
@EnableAutoConfiguration
@RestController
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @RequestMapping("/hello/{name}")
    String hi(@PathVariable String name) {
        return "Hello, " + name + "!";
    }
}
```

There's a lot more to be said and read in the [exhaustive Spring IO documentation](http://docs.spring.io/platform/docs/current/reference/html/getting-started-using-spring-io-platform.html#getting-started-using-spring-io-platform-maven). It includes more examples and covers Gradle, as well.