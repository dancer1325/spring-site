---
title: Evolving Spring Initializr
source: https://spring.io/blog/2015/10/06/evolving-spring-initializr
scraped: 2026-02-23T19:40:54.968Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Brian Clozel |  October 06, 2015 | 1 Comment
---

# Evolving Spring Initializr

_Engineering | Brian Clozel |  October 06, 2015 | 1 Comment_

We're happy to release today the new version of Spring Initializr at [https://start.spring.io](https://start.spring.io) !

What started out as a small, in-house web application that generates Spring Boot projects, grew into something bigger than we expected. You can now use Spring Initializr on the web, in your favorite IDE (Eclipse STS and IntelliJ IDEA) and even with your command-line tools (try `curl https://start.spring.io`).

In the meantime, the Spring portfolio is growing and we received a lot of useful feedback from the Spring community. Because nothing beats actual data, we've improved the service to export its metrics to a centralized redis instance, before the summer. This allows us to keep a reliable set of statistics for a long period of activity (and regardless of the number of instances we deploy on [Pivotal Web Services](http://run.pivotal.io/)).

Spring Initializr now generates roughly **50.000 projects a month**, mostly Java (98%) web applications using Maven (80%), Java 8 (82%) and jar packaging (83%). The most widely used starters are web (63%), Spring Data JPA (25%), Spring Security (21%) and MySQL (19%). We noticed that most users generate their projects using the default settings. Early June, we [switched the default Java version to 8](https://github.com/spring-io/initializr/pull/118) and noticed a ramp up of Java 8-based projects since then.

We redesigned Spring Initializr to improve the experience for both newcomers and experienced users; it should be easy to generate a project very quickly if you know what you want, but the app should also provide guidance when needed. That's why we added a new search engine but also complete descriptions for all dependencies.

For example, we've noticed that "AOP" is the 6th most widely used starter! We believe it’s a misunderstanding, as you don't need this dependency to have DI or proxy support in your application. It's only required if you want to use AspectJ or create your own aspects.

Send us feedback on Twitter [@springcentral](https://twitter.com/springcentral) and on the [github project page](https://github.com/spring-io/initializr) (of course, this is open source)!