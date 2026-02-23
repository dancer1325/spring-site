---
title: Spring Session 2.0.0 M4
source: https://spring.io/blog/2017/09/15/spring-session-2-0-0-m4
scraped: 2026-02-23T16:22:08.725Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  September 15, 2017 | 0 Comments
---

# Spring Session 2.0.0 M4

_Releases | Rob Winch |  September 15, 2017 | 0 Comments_

On behalf of the community I’m pleased to announce the release of [Spring Session 2.0.0.M4](http://docs.spring.io/spring-session/docs/2.0.0.M4/reference/html5/). This release is focused primarily on refining WebFlux support. The highlights are:

## [](#simplified-webflux-configuration)[](#simplified-webflux-configuration)Simplified WebFlux Configuration

Configuring Spring Session for WebFlux is simplified to be:

```
Copy@Configuration
@EnableSpringWebSession
public class HelloWebfluxSessionConfig {

  @Bean
  public MapReactorSessionRepository reactorSessionRepository() {
    return new MapReactorSessionRepository(new ConcurrentHashMap<>());
  }
}
```

You can also switch the strategy for resolving session id’s by simply adding a `WebSessionIdResolver` Bean. For example, to switch from using cookies to resolve the session id to using headers, you can use Spring Framework’s new `HeaderWebSessionIdResolver`:

```
Copy@Bean
public HeaderWebSessionIdResolver webSessionIdResolver() {
  return new HeaderWebSessionIdResolver();
}
```

## [](#webflux-sample-application)[](#webflux-sample-application)WebFlux Sample Application

We have added a [webflux sample](https://github.com/spring-projects/spring-session/blob/2.0.0.M4/samples/javaconfig/webflux/) application that demonstrates how to do WebFlux session management.

## [](#webflux-session-refactoring)[](#webflux-session-refactoring)WebFlux Session Refactoring

We also spent some time refining the APIs within Spring Framework’s `WebSession` management APIs. While this might not seem important to Spring Session, it ended up letting us delete quite a bit of code within Spring Session which is always a big win!

# [](#feedback-please)[](#feedback-please)Feedback Please

If you have feedback on this release, I encourage you to reach out via [StackOverflow](http://stackoverflow.com/questions/tagged/spring-session), [GitHub Issues](https://github.com/spring-projects/spring-session/issues), or via the comments section. You can also ping me [@rob\_winch](https://twitter.com/rob_winch), Joe [@joe\_grandja](https://twitter.com/joe_grandja), or Vedran [@vedran\_pavic](https://twitter.com/vedran_pavic) on Twitter.

Of course the best feedback comes in the form of [contributions](https://github.com/spring-projects/spring-session/blob/2.0.0.M4/CONTRIBUTING.adoc).

[Project Site](http://projects.spring.io/spring-session/) | [Reference](http://docs.spring.io/spring-session/docs/2.0.0.M4/reference/html5/) | [Help](http://stackoverflow.com/questions/tagged/spring-session)