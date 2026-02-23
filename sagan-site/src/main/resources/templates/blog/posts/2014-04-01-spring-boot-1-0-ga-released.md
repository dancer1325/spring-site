---
title: Spring Boot 1.0 GA Released
source: http://spring.io/blog/2014/04/01/spring-boot-1-0-ga-released
scraped: 2026-02-23T22:02:22.792Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Phil Webb |  April 01, 2014 | 13 Comments
---

# Spring Boot 1.0 GA Released

_Releases | Phil Webb |  April 01, 2014 | 13 Comments_

On behalf of the entire Spring Boot team, I am very pleased to announce the general availability of Spring Boot 1.0! You can download the 1.0.1 with an important security fix [here](https://spring.io/blog/2014/04/07/spring-boot-1-0-1-release-available-now).

You'll find everything you need to get going at [projects.spring.io/spring-boot](http://projects.spring.io/spring-boot), and from our ever-growing collection of ["Getting Started" guides](http://spring.io/guides) (most of which use Spring Boot).

It's been 18 months since the original request to ["improve containerless web application architectures"](https://jira.spring.io/browse/SPR-9888), that gave birth to Spring Boot, was raised. Since then we have seen [1720 commits](https://github.com/spring-projects/spring-boot/tree/v1.0.0.RELEASE) by [54 different contributors](https://github.com/spring-projects/spring-boot/graphs/contributors), we've closed [549 issues](https://github.com/spring-projects/spring-boot/issues?page=1&state=closed), and have had the code [forked 398 times](https://github.com/spring-projects/spring-boot/network/members). Thanks!

Why containerless? Today’s PaaS environments provide much of the management, scale out, and reliability features already, so we focus on making spring boot an ultralight container, great for application or service deployment in the cloud. If you've not yet seen Spring Boot in action, here is a canonical "Hello World!" web application that you can actually run using the [CLI tool](http://docs.spring.io/spring-boot/docs/1.0.0.RELEASE/reference/htmlsingle/#getting-started-installing-the-cli).

`groovy @RestController class Example {     @RequestMapping("/")     String helloWorld() {         "Hello World!"     } } `

The CLI uses the superb [Groovy language](http://groovy.codehaus.org/) to compile your code. You are of course also free to use the Spring Boot libraries directly with Java, or any other JVM based language, to write your applications. Be sure to check out the extensive [reference documentation](http://docs.spring.io/spring-boot/docs/1.0.0.RELEASE/reference/htmlsingle/) for a full feature breakdown.

If you're interested in looking at a slightly larger example of an application that was built using Spring Boot, try [spring.io](http://spring.io) itself. We recently [open-sourced the entire site](http://spring.io/blog/2014/03/27/project-sagan-open-sourcing-spring-io) as a Spring reference application.

For a smaller example, like a service, try the ["Building a RESTful Web Service"](https://spring.io/guides/gs/rest-service/) guide. It shows how writing a service in < 100 LoC is pretty easy, you can even fit executable programs [in a single tweet](https://twitter.com/rob_winch/status/364871658483351552) (140 characters)! You can read more about micro-services and boot in Dan Woods’s [excellent article on InfoQ](http://www.infoq.com/articles/microframeworks1-spring-boot).

Thanks to the [Java Buildpack](https://github.com/cloudfoundry/java-buildpack) team, you'll also find that Spring Boot applications deploy seamlessly to [Cloud Foundry](http://www.gopivotal.com/platform-as-a-service/pivotal-cf); and, of course, you can also use Boot applications with [other cloud providers](http://docs.spring.io/spring-boot/docs/1.0.0.RELEASE/reference/htmlsingle/#cloud-deployment) or directly in your own data center.

Finally, if you're an [STS](http://spring.io/tools) user, take a look at the [latest v3.5 release](http://spring.io/tools/sts/all) which includes integrated support for Spring Boot (see the video below). If you prefer some other IDE (or you're more a Vim/Emacs kind of person) you can use [start.spring.io](http://start.spring.io/) to initialize your project.

!{iframe width="560" height="315" src="//www.youtube.com/embed/p8AdyMlpmPk" frameborder="0" allowfullscreen}{/iframe}

  

Thanks again to all the early adopters that have tested, written about and submitted pull-requests for Spring Boot. Your feedback is invaluable to us so please [keep it coming](https://github.com/spring-projects/spring-boot/issues)!

[Project Page](http://projects.spring.io/spring-boot/) | [GitHub](https://github.com/spring-projects/spring-boot) | [Issues](https://github.com/spring-projects/spring-boot/issues) | [Documentation](http://docs.spring.io/spring-boot/docs/1.0.0.RELEASE/reference/htmlsingle/)