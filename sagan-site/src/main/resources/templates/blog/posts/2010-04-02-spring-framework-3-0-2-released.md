---
title: Spring Framework 3.0.2 released
source: https://spring.io/blog/2010/04/02/spring-framework-3-0-2-released
scraped: 2026-02-24T08:58:32.952Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Juergen Hoeller |  April 02, 2010 | 0 Comments
---

# Spring Framework 3.0.2 released

_Engineering | Juergen Hoeller |  April 02, 2010 | 0 Comments_

I'm pleased to announce that Spring Framework 3.0.2 is available now, including more than 100 fixes for user-reported issues. Get it from our [download page](http://www.springsource.com/download).

Spring 3.0.2 catches up with recent third-party releases such as **Hibernate 3.5 final, OpenJPA 2.0 beta 3, Hessian 4.0.3, and JasperReports 3.7**. In addition, this release introduces web support refinements (e.g. the new HttpEntity class) and fixes a couple of regressions.

**We recommend upgrading to Spring 3.0.2 from all previous Spring 3.0 releases - for both development and production use.** If you are currently using Spring 2.5, the 3.0.2 release is the recommended entry point into the world of Spring 3 now. Enjoy!

*P.S.:*

Since there were several questions about supported third-party versions, let me summarize our general approach quickly: Spring ships with build dependencies on specific library versions (e.g. Hibernate 3.3.1) but at the same time supports a range of versions at runtime (e.g. Hibernate from version 3.2 up to 3.5). The specific library versions that Spring builds against are generally *not* the 'recommended' versions but rather just the most suitable ones for us to build against.

So in terms of choosing a library version for use with Spring in your application, simply speaking, feel free to pick your favorite version - very recent or a couple of years old. Spring as a framework won't unnecessarily constrain you in that choice; we are even actively trying to support a range of popular versions. Wherever we require a minimum version of a third-party library for specific features, our components (e.g. LocalSessionFactoryBean) will usually tell you so in their javadoc.