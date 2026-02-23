---
title: Spring Session Data Geode/GemFire 2.0.0.RC1 Available
source: https://spring.io/blog/2017/11/07/spring-session-data-geode-gemfire-2-0-0-rc1-available
scraped: 2026-02-23T16:15:42.319Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | John Blum |  November 07, 2017 | 0 Comments
---

# Spring Session Data Geode/GemFire 2.0.0.RC1 Available

_Engineering | John Blum |  November 07, 2017 | 0 Comments_

On behalf of the Spring and Apache Geode/Pivotal GemFire communities, I am pleased to announce the release of *Spring Session Data Geode* and *Spring Session Data GemFire* 2.0.0.RC1 releases.

Both releases build on:

1.  *Spring Framework* `5.0.1.RELEASE`
    
2.  *Spring Security* `2.0.0.RC1`
    
3.  *Spring Data* `Kay-RC1`
    
4.  *Spring Session* core `2.0.0.RC1`
    
5.  *Spring Boot* `2.0.0.M5`
    

The artifacts can be acquired from *Spring* `libs-milestone`:

Maven

```
Copy<repositories>
  <repository>
    <id>spring-libs-milestone</id>
    <url>https://repo.spring.io/libs-milestone</url>
  </repository>
</repositories>

<dependencies>
  <dependency>
    <groupId>org.springframework.session</groupId>
    <artifactId>spring-session-data-geode</artifactId>
    <version>2.0.0.RC1</version>
  </dependency>
</dependencies>
```

Gradle

```
Copyrepositories {
  maven { url "https://repo.spring.io/libs-milestone" }
}

dependencies {
  compile 'org.springframework.session:spring-session-data-geode:2.0.0.RC1'
}
```

# [](#whats-new)[](#what-s-new)What’s New!

This release builds on the `2.0.0.M2` release by applying Java 8 types (e.g. `Stream`) and *Lambda* expressions to simplify the codebase.

In addition, I have included a [new sample](https://docs.spring.io/autorepo/docs/spring-session-data-geode-build/2.0.0.RC1/reference/html5/guides/boot-gemfire-with-scoped-proxies.html) demonstrating how to use *Spring Session* backed by Apache Geode (or Pivotal GemFire) to build *Spring Boot* Web applications that use either "*session*" or "*request*" scoped proxy beans.

This sample proves that "*session*" scoped proxy beans defined in the *Spring* container are still managed properly even though *Spring Session* replaces the underlying Web container’s `HttpSession` with an implementation provided by *Spring Session* using a backing data store, like Apache Geode.

This sample was based on this [posting](https://stackoverflow.com/questions/45674137/can-session-scope-beans-be-used-with-spring-session-and-gemfire) in *StackOverflow*.

# [](#whats-next)[](#what-s-next)What’s Next?

Once *Spring Session* core goes GA, I can release *Spring Session Data GemFire/Geode* 2.0 GA.

As always feedback on this release is welcomed and appreciated.

[Project Page](http://projects.spring.io/spring-session/) | [GitHub](https://github.com/spring-projects/spring-session-data-geode) | [Issues](https://github.com/spring-projects/spring-session-data-geode/issues) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-session)

Tip

If you are using Pivotal GemFire instead of Apache Geode, you can simply change the `artifactid` to `spring-session-data-gemfire`.