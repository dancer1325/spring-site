---
title: Pivotal Announces Spring Curriculum & Certification Changes
source: https://spring.io/blog/2017/05/10/pivotal-announces-spring-curriculum-certification-changes
scraped: 2026-02-23T16:32:35.451Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Paul Chapman |  May 10, 2017 | 0 Comments
---

# Pivotal Announces Spring Curriculum & Certification Changes

_Engineering | Paul Chapman |  May 10, 2017 | 0 Comments_

.blog--container .blog--post ul { margin: 15px 0 0px 25px; } .blog--container .blog--post ul li { padding-bottom: 8px; }

# [](#introduction)Introduction

It has been almost 10 years now since I taught my first Core Spring class. At that time almost everything was XML and configuring JPA or Spring Security, for example, could be a lot of hard work. Spring has matured a great deal in the meantime with component-scanning, Java Configuration and Spring Boot making it much more fun to use. And the number of [Spring Projects](https://spring.io/projects) has increased considerably.

Pivotal Training continues to enhance our Spring curriculum and introduce new courses - including Spring Boot Developer and Spring Cloud Services. I have provided an overview of these courses and some of the newest features below. Most importantly, how you obtain Certification has changed.

We recently announced this exciting change to our Spring Certification Program. **Spring Certification Exams are now available for *individual* purchase, without the enrolling in the course**. Yes, you read that right!. Experienced Java developers - with extensive Spring knowledge already - can purchase a Spring Certification Exam *directly* from Pivotal.

That said, the best way to prepare for a Spring Certification Exam is to attend the corresponding Spring course. However, this change to our [Certification Program](https://pivotal.io/training/certification) makes proving your Spring expertise even more accessible.

![Sample Certification Badge](https://raw.githubusercontent.com/paulc4/spring-blog/master/images/badge.png "Click to enlarge")

In addition to your actual certificate, we have partnered with [Badge Cert](https://bcert.me) so that you can add a validated certification badge to your LinkedIn or other profile, proving you have the certification for real. This is what a badge looks like.

And here is the link to my Core Spring Instructor [certification](http://bcert.me/prskhcsx).

Learn more about our curriculum below and visit [Pivotal Training](https://pivotal.io/training) to enroll in your class and exam today.

> BTW, don’t miss Spring Team members, and community speakers at the upcoming Spring Days \[Chicago\](https://www.springdays.io/ehome/spring-days/chicago), \[New York\](https://www.springdays.io/ehome/spring-days/new-york) and \[Atlanta\](https://www.springdays.io/ehome/spring-days/atlanta) 2 day community events!

# [](#topics)Topics

Pivotal Training offers an extensive portfolio of role-based courses across the latest Pivotal products. In this blog, I am going to focus on our Spring curriculum:

-   [Core Spring](#core-spring)
-   [Spring Web](#spring-web)
-   [Enterprise Spring](#enterprise-spring)
-   [Spring Boot](#spring-boot)
-   [Spring Cloud Services](#spring-cloud-services)

[![Spring Learning-Path](https://raw.githubusercontent.com/paulc4/spring-blog/master/images/PVDI-Pivotal-Training-Blog-1f1-1000px-framed.png "Click to enlarge")](https://raw.githubusercontent.com/paulc4/spring-blog/master/images/PVDI-Pivotal-Training-and-Pluralsight-Blog-1f1-2000px.png)

# [](#spring-courses)Spring Courses

## [](#core-spring-a-namecore-springa)Core Spring

Designed for developers and architects, *Core Spring* is a 4-day class that explores all the basics of using Spring. The content is broken down into three sections:

-   **Container:** Configuration using Java Config, Spring annotations like @Autowired, XML bean-files, FactoryBeans, Aspect Oriented programming and Spring based integration testing.
-   **Data Management:** JdbcTemplate, caching using @Cachable, in-memory embedded databases for testing, Spring managed transactions, JPA and Spring Data repositories
-   **Web Applications:** Writing Spring MVC Controllers, using Spring Boot, implementing REST using Spring MVC, Spring Security and Cloud Native applications (Spring Cloud)

The course has been updated to use Spring Framework 4.3 and covers several features introduced since Spring 4.0 such as `@Optional` parameters, `@Sql` for database testing and `@RestController`.

Note that, as this is a fundamentals course, many of the new features in 4.x are beyond its scope. The course also features expanded coverage of web applications to include Spring Boot properties and configuration and Building Microservices with Spring Cloud.

Attending our Core Spring course is the most effective way to prepare for the industry-recognized [Spring Professional Certification Exam](https://pivotal.io/training/certification). To learn more, view the course datasheet, and register, visit the [Core Spring](https://pivotal.io/training/courses/core-spring-training) information page.

## [](#spring-web-a-namespring-weba)Spring Web

Looking for a deep-dive into Spring MVC and related technologies? Our 4-day *Spring Web* course teaches you how to create enterprise web applications across four key areas:

-   **Basics:** Spring MVC Controllers, building web-applications with Spring Boot, layout management, defining views, using multiple view technologies and form handling
-   **Internals:** Using message-sources, understanding Handler Mappers, Handler Adapters, View Resolvers, Interceptors, ControllerAdvices, Internationalization, Filters, Resource handling, CORS support, Exception handling, Mobile device support
-   **Enterprise:** Implementing REST, AJAX and Browser support, Spring Security, Testing with the `MockMvc` framework, using Web Sockets and Server-Sent Events
-   **Optional:** Deeper dive into Spring MVC internals, configuring a Spring MVC application *without* Spring Boot, migrating an existing application to Spring Boot

This course has also been updated to use Spring Framework 4.3 and Spring Boot 1.4. Spring 4 features such as `@RestControllers`, `ResponseBodyAdvice`, the resource handling pipeline, Web Sockets, server-sent events and `@CrossOrigin` (CORS). All the practical exercises use Spring Boot since it makes writing Spring MVC applications quick and easy. However, while this is beneficial, we want students to learn how to use MVC fully and be able to override Spring Boot defaults with configurations of their own.

Pivotal Training recommends students that are new to Spring attend the [Core Spring](#core-spring) class prior to attending Spring Web. However, if you have a good working knowledge of Spring and your primary interest is building web-applications, our Spring Web course is the right fit for you.

Ready to get started? Visit the [Spring Web](https://pivotal.io/training/courses/spring-web-training) page to lean more, view the course datasheet, and register in an upcoming session. After attending the class, prove your skills by successfully completing the [Spring Web Application Developer Certification Exam](https://pivotal.io/training/certification).

## [](#enterprise-spring-a-nameenterprise-springa)Enterprise Spring

Use Spring to build loosely coupled event-driven architectures composed from communicating components and processes. A microservices architecture might be one example of this approach.

Based in part on the popular [Enterprise Integration Patterns](http://www.enterpriseintegrationpatterns.com/) book, the *Enterprise Spring* course covers inter-process communications using Web Services (REST) and Messaging (JMS, AMQP) and then builds on this foundation to cover Spring Integration, Spring Batch and Spring Cloud Data Flow.

As part of the Spring Framework 4.3 update, this course will include expanded coverage of REST, cover new features such as `UriComponentsBuilder`, `@JmsListener`, our Java DSL for configuring Spring Integration, and an entirely new section on building data transformation and integration pipelines using [Spring Cloud Data Flow](http://cloud.spring.io/spring-cloud-dataflow/).

A reasonable familiarity with the Spring Framework and Spring Boot is assumed. We recommend that students that are new to Spring attend the [Core Spring](#core-spring) class prior to attending Enterprise Spring.

Visit the [Enterprise Spring](https://pivotal.io/training/courses/enterprise-spring-training) page to learn more, view the course datasheet, and register for a class today. Once complete, demonstrate your skills by enrolling in the [Enterprise Integration Specialist Certification Exam](https://pivotal.io/training/certification).

## [](#spring-boot-developer-a-namespring-boota)Spring Boot Developer

Spring Boot makes building and configuring Spring applications much, much easier. The 2-day *Spring Boot Developer* course explores major features of Spring Boot, including auto-configuration, data access, actuators, and more.

Key features are divided into two main areas:

-   **Basics:** Spring Boot principles, auto-configuration, profiles, overriding defaults using properties and/or your own configuration
-   **Topics:** Spring Boot applied to web-applications (Spring MVC, GSP, REST), data-access (JDBC, JPA, Spring Data, NoSQL), Security and OAuth, Messaging (AMQP, RabbitMQ), Monitoring (actuators)

A reasonable familiarity with the Spring Framework is useful for this course. We recommend that students that are new to Spring attend the [Core Spring](#core-spring) class first.

Visit the [Spring Boot Developer](https://pivotal.io/training/courses/spring-boot-developer-training) page to learn more, view the course datasheet, and enroll today.

## [](#spring-cloud-services-a-namespring-cloud-servicesa)Spring Cloud Services

Microservices and Cloud Native Applications are a popular pattern for delivering applications more quickly. Spring Cloud Services is a 2-day course that explores using Spring Boot and Spring Cloud to support this style of application. Course topics are organized into four functional areas:

-   **Basics:** Why Cloud Native? How cloud-native changes development
-   **Infrastructure:** Building Spring Boot applications, deploying to a PaaS (PCF)
-   **Microservices:** Overview, Cloud Native design, 12 Factors.
-   **Spring Cloud:** Shared configuration, service discovery, client-side load-balancing, handling and monitoring failed services using a circuit-breaker

Microservice applications involve many collaborating processes making them harder to deploy without a smart underlying infrastructure. The course deploys applications to Pivotal’s Cloud Foundry PaaS to show the benefits of one-step deployment, automated recovery, and scalability.

A reasonable familiarity with Spring is useful for this course. We recommend that students that are new to Spring attend either the [Core Spring](#core-spring) or [Spring Boot](#spring-boot) class first.

To learn more, view the course datasheet, and register in an upcoming class, visit our [Spring Cloud Services](https://pivotal.io/training/courses/spring-cloud-services-training) page.

# [](#more-information)More Information

Pivotal Training has made an array of exciting changes to align our curriculum with the latest Spring features. We have also made it easier to earn an industry-recognize Spring Certification by making Spring Exams available for individual purchase.

Learn more about our Spring offerings by visiting [http://pivotal.io/training](http://pivotal.io/training).