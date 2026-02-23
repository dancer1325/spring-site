---
title: Spring Web Flow 2.5 RC1 is available
source: https://spring.io/blog/2018/02/12/spring-web-flow-2-5-rc1-is-available
scraped: 2026-02-23T16:09:30.464Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rossen Stoyanchev |  February 12, 2018 | 2 Comments
---

# Spring Web Flow 2.5 RC1 is available

_Engineering | Rossen Stoyanchev |  February 12, 2018 | 2 Comments_

The first and only release candidate planned for Spring Web Flow 2.5 is now available from the [Spring Milestones](http://repo.spring.io/milestone) repository. The [samples repository](https://github.com/spring-projects/spring-webflow-samples) has been updated to use it.

This release provides an upgrade path to Spring Framework 5 along with Java 8, Servlet 3.1, Hibernate 5, Tiles 3, and JSF 2.2 as minimum requirements.

In this release "spring-js" has been merged with "spring-webflow" so there is no longer a separate "spring-js" module. As a result some configuration classes have changed packages. The "spring-js-resources" module is still available but as an optional module that must be included explicitly if needed.

Please give the release candidate a try and report any issues. The final release is currently scheduled for early March.