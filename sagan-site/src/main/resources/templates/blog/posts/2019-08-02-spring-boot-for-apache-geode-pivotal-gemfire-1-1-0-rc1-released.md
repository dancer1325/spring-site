---
title: Spring Boot for Apache Geode & Pivotal GemFire 1.1.0.RC1 Released!
source: https://spring.io/blog/2019/08/02/spring-boot-for-apache-geode-pivotal-gemfire-1-1-0-rc1-released
scraped: 2026-02-23T14:39:32.958Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | John Blum |  August 02, 2019 | 0 Comments
---

# Spring Boot for Apache Geode & Pivotal GemFire 1.1.0.RC1 Released!

_Releases | John Blum |  August 02, 2019 | 0 Comments_

It is my pleasure to announce the release of *Spring Boot for Apache Geode & Pivotal GemFire/Pivotal Cloud Cache* (SBDG) `1.1.0.RC1`.

This is the 1st of 2 release candidates before the **final GA**, tentatively scheduled for **Wednesday, August 14th, 2019**. Be on the lookout for the SBDG 1.1.0.RELEASE then.

You make acquire the new SBDG `1.1.0.RC1` bits from Spring’s `libs-milestone` repo [here](https://repo.spring.io/libs-milestone/org/springframework/geode/spring-geode-starter/1.1.0.RC1/), or by declaring the following dependency declaration in your Maven POM:

Maven Dependency

```
Copy<dependency>
  <groupId>org.springframework.geode</groupId>
  <artifactId>spring-geode-starter</artifactId>
  <version>1.1.0.RC1</version>
</dependency>
```

## [](#whats-new)[](#whats-new)What’s New

The theme of the 1.1.x release line has once again been focused on developer productivity using the amazing power of Spring Boot combined with effective use of Apache Geode.

One of the easiest, quickest ways to get started using modern, **Cloud-Native Data Access Technologies** (and patterns) in your enterprise application architecture is to start by leveraging Apache Geode as a *caching provider* in [Spring’s Cache Abstraction](https://docs.spring.io/spring/docs/current/spring-framework-reference/integration.html#cache). It is truly the least invasive approach to introducing a modern, scalable data stack, like Apache Geode, in your enterprise application architecture.

Indeed, caching is a very powerful design pattern allowing you to make more effective use of system resources and prolong the life of legacy data management systems (e.g. RDBMS).

In the `1.1.0.RC1` release, we include a **new** [Sample](https://docs.spring.io/spring-boot-data-geode-build/1.1.x/reference/html5/guides/caching-inline.html) that builds on the *Look-Aside Cache* pattern and introduces you ***Inline Caching***.

Tip

Of course, if you have not done so already, you should first read the [Guide](https://docs.spring.io/spring-boot-data-geode-build/1.1.x/reference/html5/guides/caching-look-aside.html) on ***Look-Aside Caching***. It includes [example code](https://github.com/spring-projects/spring-boot-data-geode/tree/1.1.0.RC1/spring-geode-samples/caching/look-aside) as well.

## [](#whats-next)[](#whats-next)What’s Next

Since we are focused on the topic of caching in the `1.1.x` release series, we will round out our discussion on caching by talking about one more caching design pattern…​ ***Near Caching*** in the 1.1.0.RC2 release, coming up next.

Finally, in the 1.1 GA, we will talk about a common Use Case for caching, HTTP Session state caching, and how [Spring Session](https://spring.io/projects/spring-session) makes short work of that.

## [](#feedback)[](#feedback)Feedback

As always, we want to hear from you on how we are doing. Your feedback is highly important in helping us shape the product to help you achieve your desired outcomes.

Also don’t forget [SpringOne Platform 2019](https://springoneplatform.io/) is just around the corner. Don’t miss out!

[Issues](https://github.com/spring-projects/spring-boot-data-geode/issues) | [PR](https://github.com/spring-projects/spring-boot-data-geode/pulls) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-boot)