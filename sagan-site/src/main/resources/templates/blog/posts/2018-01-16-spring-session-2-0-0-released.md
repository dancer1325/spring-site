---
title: Spring Session 2.0.0 Released
source: https://spring.io/blog/2018/01/16/spring-session-2-0-0-released
scraped: 2026-02-23T16:07:11.756Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  January 16, 2018 | 2 Comments
---

# Spring Session 2.0.0 Released

_Releases | Rob Winch |  January 16, 2018 | 2 Comments_

*This post was authored by [Vedran Pavić](https://github.com/vpavic)*

On behalf of the community I’m pleased to announce the release of [Spring Session 2.0.0.RELEASE](https://docs.spring.io/spring-session/docs/2.0.0.RELEASE/reference/html5/). This release evolved through [2.0.0.M1](https://github.com/spring-projects/spring-session/milestone/17?closed=1), [2.0.0.M2](https://github.com/spring-projects/spring-session/milestone/22?closed=1), [2.0.0.M3](https://github.com/spring-projects/spring-session/milestone/23?closed=1), [2.0.0.M4](https://github.com/spring-projects/spring-session/milestone/24?closed=1), [2.0.0.M5](https://github.com/spring-projects/spring-session/milestone/25?closed=1), [2.0.0.RC1](https://github.com/spring-projects/spring-session/milestone/26?closed=1), [2.0.0.RC2](https://github.com/spring-projects/spring-session/milestone/27?closed=1) and [2.0.0.RELEASE](https://github.com/spring-projects/spring-session/milestone/30?closed=1), closing over 130 issues and pull requests in total.

# [](#whats-new-in-spring-session-20)[](#what-s-new-in-spring-session-2-0)What’s New in Spring Session 2.0

You can find highlights of what’s new in the [What’s New 2.0](https://docs.spring.io/spring-session/docs/current/reference/html5/#what-s-new-in-2-0) section of the reference. For details refer to the changelog links above.

### [](#requirements)[](#requirements)Requirements

This release moves to Java 8 and Spring Framework 5.0 as baseline requirements. Entire codebase is based on Java 8 source code level now.

### [](#spring-webflux-support)[](#spring-webflux-support)Spring WebFlux Support

Introduction of reactive programming model in Spring Framework 5.0 has been one of the biggest stories in 2017, and we’re happy to bring the support for managing Spring WebFlux’s `WebSession` with Redis `ReactiveSessionRepository`.

In a familiar Spring Session fashion, enabling Redis backed `WebSession` support is as simple as the following code snippet:

```
Copy@EnableRedisWebSession
public class WebSessionConfig {

    @Bean
    public LettuceConnectionFactory redisConnectionFactory() {
        return new LettuceConnectionFactory();
    }

}
```

Spring Boot users will be happy to learn that auto-configuration support for reactive Spring Session is already available since the [`2.0.0.M6` milestone release](https://spring.io/blog/2017/11/06/spring-boot-2-0-0-m6-available-now).

### [](#spring-session-modules)[](#spring-session-modules)Spring Session Modules

The new release bring some major changes to project’s modules, as we have split Spring Session into modules based upon the repository implementation. You will find:

```
Copy<dependency>
    <groupId>org.springframework.session</groupId>
    <artifactId>spring-session-core</artifactId>
    <version>2.0.0.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.springframework.session</groupId>
    <artifactId>spring-session-data-redis</artifactId>
    <version>2.0.0.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.springframework.session</groupId>
    <artifactId>spring-session-hazelcast</artifactId>
    <version>2.0.0.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.springframework.session</groupId>
    <artifactId>spring-session-jdbc</artifactId>
    <version>2.0.0.RELEASE</version>
</dependency>
```

As a part of this change, we have removed some of the Spring Session implementations from the main repository. We now have sub projects for [Spring Session Data Geode (GemFire)](https://github.com/spring-projects/spring-session-data-geode) and [Spring Session Data MongoDB](https://github.com/spring-projects/spring-session-data-mongodb). You will find:

```
Copy<dependency>
    <groupId>org.springframework.session</groupId>
    <artifactId>spring-session-data-gemfire</artifactId>
    <version>2.0.0.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.springframework.session</groupId>
    <artifactId>spring-session-data-geode</artifactId>
    <version>2.0.0.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.springframework.session</groupId>
    <artifactId>spring-session-data-mongodb</artifactId>
    <version>2.0.0.RELEASE</version>
</dependency>
```

The goal is to allow the core Spring Session team to focus on delivering new features rather than needing to know the ins and outs of every data store. This will allow development of other modules to be done without the overhead of reviews from the core Spring Session team.

# [](#contributions)[](#contributions)Contributions

Without the community we couldn’t be the successful project we are today. I’d like to thank everyone that created issues & provided feedback.

# [](#feedback-please)[](#feedback-please)Feedback Please

If you have feedback on this release, I encourage you to reach out via [StackOverflow](https://stackoverflow.com/questions/tagged/spring-session), [GitHub Issues](https://github.com/spring-projects/spring-session/issues), or via the comments section. You can also ping Rob [@rob\_winch](https://twitter.com/rob_winch), Joe [@joe\_grandja](https://twitter.com/joe_grandja), or me [@vedran\_pavic](https://twitter.com/vedran_pavic) on Twitter.

Of course the best feedback comes in the form of [contributions](https://github.com/spring-projects/spring-session/blob/2.0.0.RELEASE/CONTRIBUTING.adoc).

[Project Site](https://projects.spring.io/spring-session/) | [Reference](https://docs.spring.io/spring-session/docs/2.0.0.RELEASE/reference/html5/) | [Help](https://stackoverflow.com/questions/tagged/spring-session)