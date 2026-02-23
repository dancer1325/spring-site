---
title: Spring Framework 5.2.0.M1 available now
source: https://spring.io/blog/2019/04/10/spring-framework-5-2-0-m1-available-now
scraped: 2026-02-23T14:52:02.399Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  April 10, 2019 | 0 Comments
---

# Spring Framework 5.2.0.M1 available now

_Releases | Brian Clozel |  April 10, 2019 | 0 Comments_

On behalf of the team and everyone that contributed, I am pleased to announce that the first milestone of Spring Framework 5.2 has been released and is available from [our milestone repository](http://repo.spring.io/milestone/). This release closes over [140 issues and pull requests](https://github.com/spring-projects/spring-framework/releases/tag/v5.2.0.M1).

This first milestone is packed with features and fixes, including:

-   Many core container improvements, from parsing annotation data with the new `MergedAnnotations` API to `@Configuration` class optimizations
-   [Support for Kotlin coroutines](https://docs.spring.io/spring/docs/5.2.0.M1/spring-framework-reference/languages.html#coroutines)
-   New [WebMvc.fn](https://spring.io/blog/2019/04/03/spring-tips-webmvc-fn-the-functional-dsl-for-spring-mvc) programming model in the `spring-webmvc` module providing a functional alternative to annotated controllers that's built on the Servlet API. Now `spring-webmvc` like `spring-webflux` offers both functional and annotation-based programming models.
-   Performance improvements in Spring MVC and Spring WebFlux to reduce overhead in request mapping, media type parsing, CORS checks, and more
-   [RSocket](http://rsocket.io/) support including [response handling](https://github.com/spring-projects/spring-framework/blob/6d7bf8050fe710c5253e6032233021d5e025e1d5/spring-messaging/src/test/java/org/springframework/messaging/rsocket/RSocketClientToServerIntegrationTests.java#L200) via annotated `@MessageMapping` methods and [performing requests](https://github.com/spring-projects/spring-framework/blob/6d7bf8050fe710c5253e6032233021d5e025e1d5/spring-messaging/src/test/java/org/springframework/messaging/rsocket/RSocketClientToServerIntegrationTests.java#L151) via `RSocketRequester`.
-   Many interesting integration testing improvements, especially if you're dealing with [application and context events in tests](https://docs.spring.io/spring/docs/5.2.0.M1/spring-framework-reference/testing.html#testcontext-test-execution-events)
-   A brand new look for our [reference documentation](https://docs.spring.io/spring-framework/docs/5.2.0.M1/spring-framework-reference/)

Please keep an eye on the [What's new in Spring Framework 5.x](https://github.com/spring-projects/spring-framework/wiki/What%27s-New-in-Spring-Framework-5.x) and [Upgrading to Spring Framework 5.x](https://github.com/spring-projects/spring-framework/wiki/Upgrading-to-Spring-Framework-5.x) wiki pages, as we'll keep adding information there during the milestone phase. If you're wondering about our support policy, the [dedicated page should help you](https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-Versions).

If you want to try out the new Spring Framework features with your Spring Boot application, you'll be able to use [Spring Boot 2.2.0.M2 as soon as it's out](https://github.com/spring-projects/spring-boot/milestone/134). Of course, this will be available on [https://start.spring.io](https://start.spring.io).

[Project Page](http://spring.io/projects/spring-framework/) | [GitHub](https://github.com/spring-projects/spring-framework) | [Issues](https://github.com/spring-projects/spring-framework/issues) | [Documentation](https://docs.spring.io/spring-framework/docs/5.2.0.M1/spring-framework-reference/) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring+or+spring-mvc+or+spring-aop+or+spring-jdbc+or+spring-transactions+or+spring-annotations+or+spring-jms+or+spring-el+or+spring-test+or+spring-java-config+or+spring-remoting+or+spring-orm+or+spring-jmx+or+spring-cache+or+spring-webflux)