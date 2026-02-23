---
title: Spring Boot 1.3.2 released
source: https://spring.io/blog/2016/01/22/spring-boot-1-3-2-released
scraped: 2026-02-23T19:30:10.862Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Phil Webb |  January 22, 2016 | 0 Comments
---

# Spring Boot 1.3.2 released

_Releases | Phil Webb |  January 22, 2016 | 0 Comments_

Spring Boot 1.3.2 has been released and is available now from [repo.spring.io](http://repo.spring.io/release) and [Maven Central](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22org.springframework.boot%22).

This maintenance release includes a [number of fixes](https://github.com/spring-projects/spring-boot/issues?q=milestone%3A1.3.2+is%3Aclosed) and 3rd party dependency updates.

If you are upgrading from 1.3.1 there is one potentially breaking change; we now only search for `messages.properties` (and not `messages*.properties`) to enable auto-configuration of a message source. If you previously had a message file of the form `messages_en.properties` and you didn't include a default `messages.properties` file, you will now need to add one.

[Project Page](http://projects.spring.io/spring-boot/) | [GitHub](https://github.com/spring-projects/spring-boot) | [Issues](https://github.com/spring-projects/spring-boot/issues) | [Documentation](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle)