---
title: Spring Boot 2.0.0 M6 available now
source: https://spring.io/blog/2017/11/06/spring-boot-2-0-0-m6-available-now
scraped: 2026-02-23T16:16:12.653Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Stéphane Nicoll |  November 06, 2017 | 6 Comments
---

# Spring Boot 2.0.0 M6 available now

_Releases | Stéphane Nicoll |  November 06, 2017 | 6 Comments_

On behalf of the team, it is my pleasure to announce that Spring Boot 2.0.0.M6 has been released and is now available from [our milestone repository](http://repo.spring.io/milestone/). This release closes [141 issues and pull requests](https://github.com/spring-projects/spring-boot/milestone/92?closed=1) and continues our progress towards 2.0 GA. Thanks to everyone that has contributed!

This milestone refines a number of items from previous milestones, and provides a number of notable new features:

-   **Initial support for HTTP/2** - At the moment Tomcat and Undertow are supported (See [#10902](https://github.com/spring-projects/spring-boot/issues/10902) for the Jetty support)
-   **Improved support for WebFlux-based apps** - Spring Boot now supports TLS configuration for all containers and error page support is available
-   **Kotlin extension** - The first Kotlin extension has landed. You can now start your app in a more idiomatic way:

```java
Copypackage com.example.demo

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class DemoApplication

fun main(args: Array<String>) {
    runApplication<DemoApplication>(*args)
}
```

For a complete list of changes, and upgrade instructions, see the [Spring Boot 2.0.0.M6 Release Notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.0.0-M6-Release-Notes) on the WIKI.

To get started with Spring Boot 2.0.0 M6 and discover those new feature, you can easily bootstrap a new project on [start.spring.io](https://start.spring.io).

[Project Page](http://projects.spring.io/spring-boot/) | [GitHub](https://github.com/spring-projects/spring-boot) | [Issues](https://github.com/spring-projects/spring-boot/issues) | [Documentation](http://docs.spring.io/spring-boot/docs/2.0.0.M6/reference/htmlsingle) | [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-boot) | [Gitter](https://gitter.im/spring-projects/spring-boot)