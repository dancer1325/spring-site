---
title: Spring Hateoas 0.4 released
source: https://spring.io/blog/2013/01/29/spring-hateoas-0-4-released
scraped: 2026-02-24T08:10:08.360Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Pieter Humphrey |  January 29, 2013 | 0 Comments
---

# Spring Hateoas 0.4 released

_Releases | Pieter Humphrey |  January 29, 2013 | 0 Comments_

Untitled Document

SpringSource would like to announce the release of Spring Hateoas 0.4!

The Spring HATEOAS project provides some APIs to ease creating REST representations that follow the HATEOAS principle when working with Spring and especially Spring MVC. **HATEOAS**, an abbreviation for **Hypermedia as the Engine of Application State**, is a constraint of the REST application architecture that distinguishes it from most other network application architectures. The core problem it tries to address is link creation and representation assembly.

In this release, the most important new features are:

\- extended LinkBuilder API to point to Controller \*methods\* as well  
\- Jackson 2 support  
\- HAL support  
\- EntityLinks API to create links pointing to controllers managing a particular entity type  
\- introduced LinkDiscoverer API to find links in representations by rel (incl. JSONPath based implementation)

You can read about all of the new features and bug fixes in the change log. Enjoy!

[Download](http://static.springsource.org/downloads/nightly/milestone-download.php?project=BATCH) | [Documentation](https://github.com/SpringSource/spring-hateoas#spring-hateoas) | Javadoc API (coming soon) | [Change Log](https://raw.github.com/SpringSource/spring-hateoas/0.4.0.RELEASE/src/main/resources/changelog.txt) | [Issues/Bugs](https://github.com/SpringSource/spring-hateoas/issues) |