---
title: Vaadin Spring 1.1 - build web UIs that hook right to your Java backend
source: https://spring.io/blog/2016/11/15/vaadin-spring-1-1-build-web-uis-that-hook-right-to-your-java-backend
scraped: 2026-02-23T18:58:03.100Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Stéphane Nicoll |  November 15, 2016 | 0 Comments
---

# Vaadin Spring 1.1 - build web UIs that hook right to your Java backend

_Engineering | Stéphane Nicoll |  November 15, 2016 | 0 Comments_

> This post is a guest post by community member [Matti Tahvonen (@MattiTahvonen)](https://twitter.com/MattiTahvonen), who works as a developer advocate in [Vaadin Ltd](https://vaadin.com), the company that originally developed Vaadin Framework and provides commercial services and extensions for it.

The first stable release of the official Spring integration library for Vaadin was released a bit over a year ago. The feedback has been great and many Spring developers, who have wanted to stay on the safe “backend side”, have discovered a new way to use their existing Java skills to build good-looking web UIs. Using Vaadin Spring, your UI code lives in Spring managed beans and the integration with your Spring based backend becomes trivial.

[Vaadin Spring 1.1](https://vaadin.com/blog/-/blogs/vaadin-spring-1-1-is-out) is a first feature release and was published last week. It provides a handy `SpringNavigator` (auto-configure in Spring Boot apps), which makes it easier to create “top level navigation” for your larger Vaadin Spring-based UI. Vaadin Spring 1.1.0 and previous 1.0.x releases have also fixed a number of bugs, so existing Vaadin Spring users should definitely upgrade their versions.

If you are new to Vaadin or want some handy Spring tips, you should definitely also check out our recent joint webinar “Java web apps with Spring and Vaadin”, hosted by Stéphane Nicoll (Pivotal) and Matti Tahvonen (Vaadin). In addition to Vaadin related stuff, the webinar contains a bunch of productivity tips related to devtools, consuming RESTful services and maintaining your database structure using Flyway. The sample app that we used is also [available on github](https://github.com/mstahv/spring-data-vaadin-crud).

If you are more of a “learn by doing” type of person and got interested in using Vaadin Framework in your Spring web app, refer to [vaadin.com/spring](https://vaadin.com/spring).