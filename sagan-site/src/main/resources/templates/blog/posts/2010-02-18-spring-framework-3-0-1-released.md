---
title: Spring Framework 3.0.1 released
source: https://spring.io/blog/2010/02/18/spring-framework-3-0-1-released
scraped: 2026-02-24T08:59:38.358Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Juergen Hoeller |  February 18, 2010 | 0 Comments
---

# Spring Framework 3.0.1 released

_Engineering | Juergen Hoeller |  February 18, 2010 | 0 Comments_

After two months of incorporating valuable feedback, it is my pleasure to announce the first Spring 3.0 maintenance release - **addressing more than 170 reported issues**. Get it from our [download page](http://www.springsource.com/download).

Since quite a few users asked for a dependencies distribution (as an alternative to grabbing dependencies via Maven or Ivy), we are providing a third download now: containing an Ivy repository with **common third-party jar files**. Note that the core framework is separate from the dependencies; the latter are just provided as an additional convenience and do not constitute an inherent part of the framework distribution. You may of course **keep using any supported version** of the third-party libraries of your choice.

Talking about third-party library versions, Spring 3.0.1 includes support for two important new third-party releases: **Tiles 2.2** (with 2.2.1 as the latest release) and **Hibernate 3.5** (with 3.5 CR1 as the current release candidate). You may keep using Tiles 2.1 and Hibernate 3.2/3.3, respectively; we are just actively tracking the emerging next generations of those libraries so that you may choose to upgrade whenever you wish. FYI, in line with Spring 3.0's JPA 2.0 support, Hibernate 3.5 is the **first Hibernate generation to implement JPA 2.0**.

Spring 3.0.1 introduces several core refinements, addressing limitations that were reported against 3.0 GA:

-   **ApplicationListener detection** has been revised for improved robustness and consistency, e.g. with respect to proxies and factory methods, and in particular with respect to Spring 3.0's support for declaring a specific event through the use of generics.
-   **Pointcut-based proxies** and also **EntityManager proxies** and **@Transactional proxies** are fully **serializable** now. This completes the BeanFactory serialization capabilities in 3.0 GA, in particular for use in web application environments.
-   **Generic interfaces such as FactoryBean and HttpMessageConverter** have relaxed declarations of Class parameters now, for more convenient use in practice. (You may have to adapt your source signatures in some cases if you implement those interfaces with use of generics; binary compatibility should not be affected.)
-   Spring's **JdbcTemplate** features overloaded **query methods with full use of varargs**, as previously known from the SimpleJdbcTemplate class. This turns the standard JdbcTemplate class into an equally convenient Java 5 based delegate for most query use cases.

We recommend upgrading to Spring 3.0.1 for the best possible Spring 3 API experience!

As a bonus, 3.0.1 also introduces an addition to Spring's JSP tag library: The **<spring:eval> tag** allows for evaluating a SpEL (Spring EL) expression and embedding its result into a JSP page, properly formatted through **Spring 3.0's new formatting system**. This is basically a Spring variant of JSTL's <c:out>, with <fmt:\*> capabilities integrated out of the box. Watch out for up-to-date sample applications, demonstrating the use of Spring 3.0's web feature set - just around the corner!

**Quick update (Feb 19th):** Due to an accidental breakage in the OSGi manifest, we released a 3.0.1.A update (called "3.0.1.RELEASE-A" for OSGi naming convention reasons). If you are going to use 3.0.1 in an OSGi environment, make sure to use those revised artifacts.

*P.S.: A good opportunity to hear about the latest Spring 3 features - and about the latest releases in the overall SpringSource portfolio - is the [SpringSource S2G Forum - Munich](http://www.springsource.org/node/2335) on March 18th, part of this year's S2G conference series in Europe. See you there!*