---
title: Spring Boot 1.4.1 and 1.3.8 Available Now
source: https://spring.io/blog/2016/09/21/spring-boot-1-4-1-and-1-3-8-available-now
scraped: 2026-02-23T19:04:20.971Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Stéphane Nicoll |  September 21, 2016 | 8 Comments
---

# Spring Boot 1.4.1 and 1.3.8 Available Now

_Releases | Stéphane Nicoll |  September 21, 2016 | 8 Comments_

It is my pleasure to announce that Spring Boot `1.4.1` and `1.3.8` haven been released and are available now from [repo.spring.io](http://repo.spring.io/release) and [Maven Central](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22org.springframework.boot%22).

Spring Boot 1.3.8 includes [35 fixes and a selection of improvements and dependency upgrades](https://github.com/spring-projects/spring-boot/milestone/71?closed=1). The first maintenance release of the 1.4 line contains [over 150 fixes, improvements and 3rd party dependency updates](https://github.com/spring-projects/spring-boot/milestone/72?closed=1)! Thanks to all that have contributed!

### [](#whats-new)What's new?

We snuck in a few major improvements such as a new `FailureAnalyzer` for `NoSuchBeanDefinitionException`. If your code expects a bean to be present (typically via auto-configuration), you should now get a nice error message if it isn't:

```
Copy***************************
APPLICATION FAILED TO START
***************************

Description:

Parameter 0 of constructor in com.example.JdbcStore required a bean of type 'org.springframework.jdbc.core.JdbcTemplate' that could not be found.
	- Bean method 'jdbcTemplate' not loaded because @ConditionalOnSingleCandidate (types: javax.sql.DataSource; SearchStrategy: all) did not find any beans

Action:

Consider revisiting the conditions above or defining a bean of type 'org.springframework.jdbc.core.JdbcTemplate' in your configuration.
```

Based on your feedback, we've also refined the new testing support that was introduced in 1.4. Changes include:

-   `@MockBean` and `@Qualifier` can now be used together.
-   `TestRestTemplate` now uses your `server.*` properties to automatically use SSL or the configured context path.
-   `@MockBean` can now be used to mock a bean with a parameterized type.

### [](#whats-next)What's next?

The team is now working on the next two releases.

1.5 will have a shorter release cycle and is scheduled for late this year. It will primarily address PRs that couldn't be processed in time for 1.4 and include some minor dependency upgrades.

2.0 will integrate Spring Framework 5 and provide auto-configuration for the new reactive infrastructure. Note that, like Spring Framework 5, Spring Boot 2.0 will require Java 8.

### [](#how-can-you-help)How can you help?

If you're interested in helping out, check out the ["ideal for contribution" tag](https://github.com/spring-projects/spring-boot/labels/ideal-for-contribution) in the issue repository. If you have general questions, please ask at [stackoverflow.com](http://stackoverflow.com) using the [`spring-boot` tag](http://stackoverflow.com/tags/spring-boot).

[Project Page](http://projects.spring.io/spring-boot/) | [GitHub](https://github.com/spring-projects/spring-boot) | [Issues](https://github.com/spring-projects/spring-boot/issues) | [Documentation](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle)