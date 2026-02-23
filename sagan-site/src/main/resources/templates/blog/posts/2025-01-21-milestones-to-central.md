---
title: Spring Milestones to Maven Central
source: https://spring.io/blog/2025/01/21/milestones-to-central
scraped: 2026-02-23T07:23:12.247Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Michael Minella |  January 21, 2025 | 0 Comments
---

# Spring Milestones to Maven Central

_News | Michael Minella |  January 21, 2025 | 0 Comments_

**TL;DR;** The Spring portfolio will begin releasing its milestones and release candidates to Maven Central starting with the releases related to the [major versions due out in November](https://spring.io/blog/2024/10/01/from-spring-framework-6-2-to-7-0).

As we enter the new year, we look forward to many new opportunities for the Spring ecosystem. We see JDK 25 coming in the fall. We see both minor versions of the entire portfolio and a new major version coming out this year with a long list of new capabilities. And we see Spring AI going GA ushering in a new class of workloads for enterprise applications, bringing agentic AI to the enterprise through programming paradigms that are already familiar to millions of developers. With all of that, there is another thing to look forward to this year. That is a change in how we do our early releases.

Historically, we have made regular milestone and release candidate releases during the development of new feature branches. This was for a couple reasons, it allows for you to provide feedback on the changes as well as evaluate the impact our changes make on your software. We also hope that it enables you to develop your extensions and addons alongside us. Up to now, we have released those early versions to [https://repo.spring.io](https://repo.spring.io) which presents a few limitations we are now looking to address.

First, as enterprises look to secure their software supply chains, the ability to access all but a few core code repositories becomes more limited. We have received feedback on multiple occasions where you have told us that you’d be willing to try out milestone versions, but cannot access them due to limitations within your organization preventing you from accessing repositories other than Maven Central or an internal repository.

Second, we take full advantage of the availability of early milestone releases in our ecosystem, grabbing early development releases, upgrading our dependencies, running CI against them all in the effort to be as proactive as we can about incorporating updates where we can. However, virtually all of those early milestones we consume are available via Maven Central. This makes it easy for us to consume those updates, but we do not return the favor to all of you. Maven Central has the rule that anything in Central must have all of its dependencies available in Central. If a library wanted to build a Spring integration or extension alongside our early releases, they couldn’t if they wanted to release their versions to Maven Central because we were not releasing our early releases to Maven Central.

We want to address those issues. And so we are announcing today that starting with the early releases that align with the major versions of the portfolio later this year (Spring Framework 7, Spring Boot 4, etc) we will begin to release our milestone and release candidate releases to Maven Central in addition to [https://repo.spring.io](https://repo.spring.io). Our goal is to provide access to as many as possible to those early releases and enable every opportunity for the ecosystem to evolve along with us. While we make this transition, while Spring Framework 7.0.0-M1 is due out this month and will be the first release to Maven Central for a milestone release, milestones and release candidates that align with the minor version feature releases in May (Spring Boot 3.5, etc) will continue to only be available via [https://repo.spring.io](https://repo.spring.io).

We continue to look for new ways to make things easier for you to consume Spring and be a part of the process that delivers the capabilities you know and love. Our change from a [CLA to the DCO](https://spring.io/blog/2025/01/06/hello-dco-goodbye-cla-simplifying-contributions-to-spring) is one recent example and we hope that this will represent another way of simplifying the way you work with Spring.