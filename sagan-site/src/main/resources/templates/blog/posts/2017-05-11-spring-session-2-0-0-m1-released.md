---
title: Spring Session 2.0.0 M1 Released
source: https://spring.io/blog/2017/05/11/spring-session-2-0-0-m1-released
scraped: 2026-02-23T16:29:06.853Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  May 11, 2017 | 2 Comments
---

# Spring Session 2.0.0 M1 Released

_Releases | Rob Winch |  May 11, 2017 | 2 Comments_

On behalf of the community I’m pleased to announce the release of [Spring Session 2.0.0.M1](http://docs.spring.io/spring-session/docs/2.0.0.M1/reference/html5/). This release is focused primarily on ensuring compatability with Spring Framework 5 which is the minimum Spring version required.

# [](#supported-data-stores)[](#supported-data-stores)Supported Data Stores

We have also removed some of the Spring Session implementations from the main repository. The goal is to allow the core Spring Session team to focus on delivering new features rather than needing to know the ins and outs of every data store. This will allow development of other modules to be done without the overhead of reviews from the Spring Session team.

Going forward,the Spring team will officially maintain Redis, JDBC, Hazelcast, & Geode / GemFire implementations of Spring Session. These choices were made based upon the Spring Session teams expertise and popularity within Spring Session.

We will provide links to additional implementations that are maintained by the community. If you are interested in picking up support for another data store please get in touch in an [issue](https://github.com/spring-projects/spring-session/issues).

# [](#feedback-please)[](#feedback-please)Feedback Please

If you have feedback on this release, I encourage you to reach out via [StackOverflow](http://stackoverflow.com/questions/tagged/spring-session), [GitHub Issues](https://github.com/spring-projects/spring-session/issues), or via the comments section. You can also ping me [@rob\_winch](https://twitter.com/rob_winch), Joe [@joe\_grandja](https://twitter.com/joe_grandja), or [@vedran\_pavic](https://twitter.com/vedran_pavic) on Twitter.

Of course the best feedback comes in the form of [contributions](https://github.com/spring-projects/spring-session/blob/2.0.0.M1/CONTRIBUTING.adoc).

[Project Site](http://projects.spring.io/spring-session/) | [Reference](http://docs.spring.io/spring-session/docs/2.0.0.M1/reference/html5/) | [Help](http://stackoverflow.com/questions/tagged/spring-session)