---
title: Spring Web Services 4.0.0-RC1 is out!
source: https://spring.io/blog/2022/10/18/spring-web-services-4-0-0-rc1-is-out
scraped: 2026-02-23T10:37:31.013Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Greg L. Turnquist |  October 18, 2022 | 0 Comments
---

# Spring Web Services 4.0.0-RC1 is out!

_Releases | Greg L. Turnquist |  October 18, 2022 | 0 Comments_

Greetings Spring community,

The Spring Web Services team has released **4.0.0-RC1**. This is the last planned release candidate that supports Spring Boot 3.0. The final GA release is coming next month in anticipation of Spring Boot 3.0 going GA.

**4.0.x** is the generation of Spring Web Services that works with Jakarta EE 9, the version where the enterprise specs (JAX-WS, etc.) migrate from `javax.` **to `jakarta.`**. See [Juergen Holler’s blog post](https://spring.io/blog/2022/10/12/spring-framework-6-0-goes-rc1) for more details about that.

Being based upon Spring Framework 6.0, this is also the generation of Spring Web Services that is rebased on top of Java 17 (LTS). So check it out!

For more details, read the following release notes for each version:

## [](#release-notes---spring-web-services---version-400-rc1)[](#release-notes-spring-web-services-version-4-0-0-rc1)Release Notes - Spring Web Services - Version 4.0.0-RC1

#1284 - Upgrade to Spring Security 6.0.0-RC1. dependenciesPull requests that update a dependency file

#1283 - Upgrade to Spring Framework 6.0.0-RC1. dependenciesPull requests that update a dependency file

There were also a LOT of 3rd party library upgrades that were merged from other baselines into this one (and tracked on other tickets).

#1281 - Upgrade to xmlsec 3.0.1.

#1280 - Upgrade to woodstox 4.4.1.

#1274 - Remove old log4j dependency.

#1278 - Upgrade to Smack 4.3.5.

#1277 - Upgrade to slf4j 2.0.3.

#1274 - Upgrade to log4j2 2.19.0.

#1272 - Upgrade to jdom2 2.0.6.1.

#1271 - Upgrade to jaxen 1.1.6.

#1268 - Upgrade to ehcache 2.10.9.2.

#1267 - Upgrade to Commons IO 2.11.0.

Note

This is to ensure Spring WS is running against the latest versions of libraries that are tied to Jakarta EE 9 (and NOT Jakarta EE 10, for which some are already supporting!)

Links: [Project Page](https://spring.io/projects/spring-ws/) | [GitHub](https://github.com/spring-projects/spring-ws) | [Issues](https://github.com/spring-projects/spring-ws/issues)

The artifacts are located on repo.spring.io. Get it while it’s hot!

## [](#its-not-too-late-to-register-for-springone-2022)[](#its-not-too-late-to-register-for-springone-2022)It’s not too late to register for SpringOne 2022!

If you want the chance to meet up at the world’s most popular Spring event, this is it. You can register at [https://springone.io/register](https://springone.io/register). It’s not too late.

I’ll be giving a talk on It’s 10 PM: Where Is Your Relational Data Store? on Spring’s various approaches approaches to tame relational data stores. But that’s not all. There will be a plethora of talks ranging from beginner to advanced across the spectrum of Spring portfolio projects.

And…​it’s in San Francisco. Don’t miss this chance to see your favorite Spring teammate (even if it’s not me!)