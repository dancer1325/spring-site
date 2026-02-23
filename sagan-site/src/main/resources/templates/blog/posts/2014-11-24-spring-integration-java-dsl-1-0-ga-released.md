---
title: Spring Integration Java DSL 1.0 GA Released
source: https://spring.io/blog/2014/11/24/spring-integration-java-dsl-1-0-ga-released
scraped: 2026-02-23T22:05:42.073Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  November 24, 2014 | 1 Comment
---

# Spring Integration Java DSL 1.0 GA Released

_Releases | Artem Bilan |  November 24, 2014 | 1 Comment_

Dear Spring community,

As we promised in the Release Candidate [blog post](https://spring.io/blog/2014/10/31/spring-integration-java-dsl-1-0-rc1-released), we are pleased to announce that the Spring Integration Java DSL 1.0 GA is now available. As usual, use the [Release Repository](http://repo.springsource.org/release) with Maven or Gradle, or download a [distribution archive](http://repo.spring.io/release/org/springframework/integration/spring-integration-java-dsl/1.0.0.RELEASE), to give it a spin.

See the project [home page](https://github.com/spring-projects/spring-integration-java-dsl/wiki/Spring-Integration-Java-DSL-Reference) for more information.

First of all, we are glad to share with you that on Nov 12, 2014, [DZone research](http://dzone.com/research/guide-to-enterprise-integration) recognized Spring Integration as the leader in the ESB / Integration framework space, leading with 42% marketshare, in a publication of their recent survey results. And the report is the most popular DZone Guide in November, with more than 12 000 downloads already! Don't miss it: very exciting. We hope the release of the Spring Integration Java DSL adds more excitement!.

Many thanks to all contributors, including several who are new to the community.

The release includes just a few bug fixes, since the release candidate, and a lot of JavaDocs!

Not specifically related to the the release, I want to present here some resources on the matter.

We are observing many valuable DSL questions on [Stack Overflow](http://stackoverflow.com/tags/spring-integration).

[Josh Long](https://spring.io/team/jlong)'s [tech tip](https://spring.io/blog/2014/11/15/building-a-spring-integration-4-1-websocket-endpoint) showing how we can use together Spring Boot, REST, Spring Integration 4.1 WebSocket support and Spring Integration Java DSL plus Java 8 features.

The `Jdbc Splitter` implementation in the project [tests](https://github.com/spring-projects/spring-integration-java-dsl/blob/master/src/test/java/org/springframework/integration/dsl/test/jdbc/JdbcTests.java).

My [gist](https://gist.github.com/artembilan/9bd32f5e899ef293b6c2) to demonstrate how we can use \[Reactor\] ([https://github.com/reactor/reactor](https://github.com/reactor/reactor)) `Stream`s together with the Spring Integration Java DSL.

[Dave Syer](https://spring.io/team/dsyer) has started to use Spring Integration Java DSL in the [Spring Cloud Bus](https://github.com/spring-cloud/spring-cloud-bus) project.

Don't miss the [si4demo](https://github.com/spring-projects/spring-integration-samples/tree/master/dsl/si4demo) to see the evolution of Spring Integration including the Java DSL, as shown at the 2014 SpringOne/2GX Conference. (Video should be available soon).

Especial thanks to [Biju Kunjummen](https://twitter.com/bijukunjummen) who has done some nice articles on DZone to introduce Spring Integration Java DSL: [http://java.dzone.com/articles/spring-integration-java-dsl](http://java.dzone.com/articles/spring-integration-java-dsl), [http://java.dzone.com/articles/spring-integration-java-dsl-0](http://java.dzone.com/articles/spring-integration-java-dsl-0).

And of course, with the latest [Spring XD](https://spring.io/blog/2014/11/19/spring-xd-1-1-m1-and-1-0-2-released), we can build Modules based on `@Configuration` including Spring Integration Java DSL `IntegrationFlow` definitions.

Also see the comprehensive [Cafe Demo: Line by line tutorial](https://spring.io/blog/2014/11/25/spring-integration-java-dsl-line-by-line-tutorial).

As always, we look forward to your comments and feedback ([StackOverflow](http://stackoverflow.com) (`spring-integration` tag), [Spring JIRA](https://jira.spring.io/browse/INTEXT), [GitHub](https://github.com/spring-projects/spring-integration-java-dsl/issues)) and we very much welcome [contributions](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.md)!