---
title: Spring Petclinic is on Github!
source: https://spring.io/blog/2013/03/21/spring-petclinic-is-on-github
scraped: 2026-02-24T08:07:05.064Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Michael Isvy |  March 21, 2013 | 6 Comments
---

# Spring Petclinic is on Github!

_Engineering | Michael Isvy |  March 21, 2013 | 6 Comments_

We are pleased to announce that the *Spring Petclinic* sample application has been refactored.

The source code is now [available on github](https://github.com/SpringSource/spring-petclinic/). Here is a screenshot of the new application: ![](https://lh3.googleusercontent.com/iO7Aucq24r_NMOBtYrM4sXdqAPTO8tyyvibiJV8V_CHlMDDXLs-tRRxQD738lWJdUvtT_Nzar_b9Yvz5LX1Ayg6if8KqdS6WsWPvxJIEzniaHDoig2T0ro6k)

And here is an overview of the new architecture:

[![](http://blog.springsource.org/wp-content/uploads/2013/03/Screen-Shot-2013-03-21-at-15.04.21.png "Screen Shot 2013-03-21 at 15.04.21")](http://blog.springsource.org/wp-content/uploads/2013/03/Screen-Shot-2013-03-21-at-15.04.21.png)

## Spring, Spring, Spring

We have used the following Spring features:

-   Dependency Injection using Annotations

-   Data Access Integration using jdbc (JdbcTemplate), JPA or Spring Data JPA (repository layer). You can choose which implementation to use by setting up the corresponding bean profile in web.xml or in one of the JUnit tests.

-   Transactions using @Transactional (service layer)

-   Caching using @Cacheable with ehcache as a cache implementation (service layer)

-   Aspect Oriented Programming (to monitor how many times has been called each of the Repository methods)

-   Spring MVC: Form validation using Bean Validation (JSR-303)

-   Spring MVC: content negotiation (html, xml or atom) using ContentNegotiatingViewResolver.

-   Spring MVC: exception handling using SimpleMappingExceptionResolver

-   Spring MVC: use of the Spring MVC Test Framework

## Our Vibrant Community

We have had quite a lot of contributions from experts in our community (including the leads of several open source projects).

## Thymeleaf

In case you haven’t heard of it yet, Thymeleaf can be seen as a replacement for JSP. it defines itself as an  XML / XHTML / HTML5 template engine.

It is based on some plain HTML files with a little bit of namespace magic.

Daniel and Soraya from the Thymeleaf project have created a Spring-Petclinic branch that uses Thymeleaf instead of JSP. They have documented the migration steps in this blog entry: [http://www.thymeleaf.org/petclinic.html](http://www.thymeleaf.org/petclinic.html)

The Thymeleaf branch of *Spring Petclinic* is available here: [https://github.com/thymeleaf/thymeleafexamples-petclinic](https://github.com/thymeleaf/thymeleafexamples-petclinic)

To learn more about Thymeleaf: [http://www.thymeleaf.org](http://www.thymeleaf.org/petclinic.html)

To follow Thymeleaf on twitter: [https://twitter.com/thymeleaf](https://twitter.com/thymeleaf)

## Dandelion

Dandelion provides a set of taglibs that you can use with JSP or Thymeleaf.

We have used it inside Spring-Petclinic to work with DataTables. It generates tables based on jQuery DataTables and Bootstrap.

You can do things like that:

```html
Copy
<datatables:table data="${ownerList}" id="dataTable"  theme="bootstrap2" export="pdf">
 <datatables:column title="Name" property="name" sortable="true" />
 <datatables:column title="Address" property="address" sortable="true" />
</datatables:table>
```

The output html table then looks like this:

![](https://lh3.googleusercontent.com/E6wRuTmzIcE2EvDH0PhC3QIiEl1P3ATtFGr5DYKCNpxKcQVgi546SnD5MHU4y_6JF0hYhYXHqAGhecbpxaHV0w7S0_JHl8g5euDDZdwfUME9drh5OceWPlvv)

Dandelion is used inside the main branch of Spring Petclinic.

Thibault Duchateau from the Dandelion project has written [a nice blog entry that describes the migration of the Spring Petclinic application](http://dandelion.github.io/blog/2013/04/24/Integrating-Dandelion-DataTables-in-the-Spring-Petclinic-app)

To learn more about Dandelion:  [http://dandelion.github.com/](http://dandelion.github.com/)

To follow them on twitter: [https://twitter.com/dandelion\_proj](https://twitter.com/dandelion_proj)

## Maven or Gradle?

By default, Spring Petclinic uses Maven as it is the most common choice for Java applications. While *Spring Petclinic* is fairly small in comparison to most real-life applications, its Maven pom.xml file is pretty verbose already.

Li Yanhui from Thoughtworks China has been nice enough to migrate Spring Petclinic to Gradle. That is a great way to compare Maven and Gradle side by side. The build.gradle configuration file is indeed much simpler to understand. It currently contains 143 lines (as opposed to 543 lines for the Maven POM).

You can browse the Gradle-based version of Spring Petclinic here: [https://github.com/whimet/spring-petclinic](https://github.com/whimet/spring-petclinic ) Thanks to them we have been able to identify a few places inside Spring Petclinic that contained code duplication and lacked of automated testing.

## Performance Testing: Let’s Scale!

Would it be possible to take Spring Petclinic as it is now and scale it up to 1000 requests per second on a single server instance? Julien Dubois from Ippon Technologies has written [a great series of five blog entries on that topic.](http://blog.ippon.fr/2013/03/11/improving-the-performance-of-the-spring-petclinic-sample-application-part-1-of-5/)

It answers questions such as: - Should I rely on the session context? ([part 2](http://blog.ippon.fr/2013/03/12/improving-the-performance-of-the-spring-petclinic-sample-application-part-2-of-5/)) - Which Apache Tomcat connector should I use? ([part 2](http://blog.ippon.fr/2013/03/12/improving-the-performance-of-the-spring-petclinic-sample-application-part-2-of-5/)) - Which database connection pool should I use? ([part 3](http://blog.ippon.fr/2013/03/13/improving-the-performance-of-the-spring-petclinic-sample-application-part-3-of-5/)) - Is JDBC faster than JPA or Spring Data JPA? ( [part 4](http://blog.ippon.fr/2013/03/14/improving-the-performance-of-the-spring-petclinic-sample-application-part-4-of-5/)) - What are the pros of using OpenSessionInViewFilter? ( [part 4](http://blog.ippon.fr/2013/03/14/improving-the-performance-of-the-spring-petclinic-sample-application-part-4-of-5/))

## References

[Spring Petclinic on GitHub](https://github.com/SpringSource/spring-petclinic/) [Spring Petclinic on Cloud Foundry](http://spring-petclinic.cloudfoundry.com/) [Petclinic + Thymeleaf](http://www.thymeleaf.org/petclinic.html) [Petclinic + Gradle](https://github.com/whimet/spring-petclinic)