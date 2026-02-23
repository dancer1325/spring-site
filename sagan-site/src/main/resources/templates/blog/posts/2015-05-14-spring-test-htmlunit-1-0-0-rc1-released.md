---
title: Spring Test HtmlUnit 1.0.0 RC1 Released
source: https://spring.io/blog/2015/05/14/spring-test-htmlunit-1-0-0-rc1-released
scraped: 2026-02-23T19:53:04.758Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  May 14, 2015 | 0 Comments
---

# Spring Test HtmlUnit 1.0.0 RC1 Released

_Releases | Rob Winch |  May 14, 2015 | 0 Comments_

I'm pleased to announce the release of [Spring Test HtmlUnit](http://projects.spring.io/spring-test-htmlunit/) 1.0.0 RC1. The highlights of the release can be found below:

## [](#migration-guide)Migration Guide

A detailed [migration guide from 1.0.0.M2 to 1.0.0.RC1](http://docs.spring.io/spring-test-htmlunit/docs/1.0.0.RC1/reference/html5/#migrating-from-1-0-0-m2-to-1-0-0-rc1) was added.

## [](#new-maven-coordinates)New Maven Coordinates

We have changed the maven group id. For details refer to [Updating Dependencies](http://docs.spring.io/spring-test-htmlunit/docs/1.0.0.RC1/reference/html5/#updating-dependencies)

## [](#default-context-path-is-)Default Context Path is ""

Based upon community feedback, the default context path is now "". This means if you are using a previous release, you will need to update the URL that is configured.

For details refer to [Default Context Path is now ""](http://docs.spring.io/spring-test-htmlunit/docs/1.0.0.RC1/reference/html5/#default-context-path-is-now)

## [](#mockmvc-webclient--webdriver-builders)MockMvc WebClient & WebDriver Builders

This release adds builders for MockMvc and HtmlUnit integration. The builders provide a number of benefits:

-   Simplify the setup
-   Allow for more configuration options
-   By default any URL that has a host of localhost is processed by MockMvc (i.e. [http://localhost/something](http://localhost/something)) while any other host is retrieved normally (i.e. [http://cdn.example.com/jquery.js](http://cdn.example.com/jquery.js)).

For details refer to [MockMvc WebClient & WebDriver Builders](http://docs.spring.io/spring-test-htmlunit/docs/1.0.0.RC1/reference/html5/#mockmvc-webclient-webdriver-builders)

## [](#new-project-site--documentation)New Project Site & Documentation

We have added a new [Project Site](http://projects.spring.io/spring-test-htmlunit/). We have also released [documentation](http://docs.spring.io/spring-test-htmlunit/docs/1.0.0.RC1/reference/html5/) in which all code is tested.

## [](#forwarded-urls-now-processed)Forwarded URLs now processed

Forwarded URLs are now processed properly.

# [](#feedback-please)Feedback Please

If you have feedback, I encourage you to reach out via [github issues](https://github.com/spring-projects/spring-test-htmlunit/issues), via the comments section, or ping me on twitter [@rob\_winch](http://twitter.com/rob_winch).

If all goes well, we plan to go GA in July.

[Project Site](http://projects.spring.io/spring-test-htmlunit/) | [Reference](http://docs.spring.io/spring-test-htmlunit/docs/1.0.0.RC1/reference/html5/) | [Issues](https://github.com/spring-projects/spring-test-htmlunit/issues) | [Changelog](https://github.com/spring-projects/spring-test-htmlunit/issues?utf8=%E2%9C%93&q=+is%3Aissue+milestone%3A1.0.0.RC1+)