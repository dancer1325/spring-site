---
title: Spring Session 2.0 M3 Released
source: https://spring.io/blog/2017/07/25/spring-session-2-0-m3-released
scraped: 2026-02-23T16:25:02.908Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Joe Grandja |  July 25, 2017 | 4 Comments
---

# Spring Session 2.0 M3 Released

_Releases | Joe Grandja |  July 25, 2017 | 4 Comments_

On behalf of the community I’m pleased to announce the release of [Spring Session 2.0.0.M3](http://docs.spring.io/spring-session/docs/2.0.0.M3/reference/html5/). This release is focused primarily on ensuring compatibility with Spring Framework 5.0.0.RC3 and Spring Data Kay RC1 which is the minimum Spring version required.

This release includes the following new features:

-   Support added for Spring WebFlux
    
-   Support for WebFlux’s `WebSession`
    
-   Added `ReactorSessionRepository` to support a reactive `SessionRepository` API. The default implementation provided is `MapReactorSessionRepository`.
    

We have split Spring Session into modules based upon the repository implementation. You will find:

```
Copy<dependency>
  <groupId>org.springframework.session</groupId>
  <artifactId>spring-session-core</artifactId>
  <version>2.0.0.M3</version>
</dependency>
<dependency>
  <groupId>org.springframework.session</groupId>
  <artifactId>spring-session-data-redis</artifactId>
  <version>2.0.0.M3</version>
</dependency>
<dependency>
  <groupId>org.springframework.session</groupId>
  <artifactId>spring-session-hazelcast</artifactId>
  <version>2.0.0.M3</version>
</dependency>
<dependency>
  <groupId>org.springframework.session</groupId>
  <artifactId>spring-session-jdbc</artifactId>
  <version>2.0.0.M3</version>
</dependency>
```

# [](#feedback-please)[](#feedback-please)Feedback Please

If you have feedback on this release, I encourage you to reach out via [StackOverflow](http://stackoverflow.com/questions/tagged/spring-session), [GitHub Issues](https://github.com/spring-projects/spring-session/issues), or via the comments section. You can also ping me [@rob\_winch](https://twitter.com/rob_winch), Joe [@joe\_grandja](https://twitter.com/joe_grandja), or Vedran [@vedran\_pavic](https://twitter.com/vedran_pavic) on Twitter.

Of course the best feedback comes in the form of [contributions](https://github.com/spring-projects/spring-session/blob/2.0.0.M3/CONTRIBUTING.adoc).

[Project Site](http://projects.spring.io/spring-session/) | [Reference](http://docs.spring.io/spring-session/docs/2.0.0.M3/reference/html5/) | [Help](http://stackoverflow.com/questions/tagged/spring-session)