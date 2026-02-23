---
title: How not to hate Spring in 2016
source: https://spring.io/blog/2015/11/29/how-not-to-hate-spring-in-2016
scraped: 2026-02-23T19:34:38.724Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Phil Webb |  November 29, 2015 | 56 Comments
---

# How not to hate Spring in 2016

_Engineering | Phil Webb |  November 29, 2015 | 56 Comments_

Over the Thanksgiving weekend a 2014 article called ["Why I hate Spring" by Sam Atkinson](http://samatkinson.com/why-i-hate-spring/) started doing the rounds on Twitter. It's always interesting to listen to criticisms to see what we can do to improve Spring, much of [Spring Boot](https://spring.io/projects/spring-boot) was born out of listening to [people talk about the problems](https://jira.spring.io/browse/SPR-9888) that they faced with the framework.

In this blog post, I'll try to address some of the concerns discussed in Sam's article, and describe my personal Spring "best practices". Before we get too much into the details though, it's worth considering why less than optimal ways of doing things still exist in the framework.

## [](#the-curse-of-backwards-compatibility)The curse of backwards-compatibility

One of the more stressful aspects of working on Spring, other than people writing about how much they hate it, is that features tend to have a very long tail. Spring has a strong commitment to back-compatibility, which means once a feature gets added, it's quite hard to fundamentally change it. Developing a framework presents unique challenges that application developers don't generally have. Agile techniques such as YAGNI *(You ain't gonna need it)* and, refactor aggressively are much harder to apply. We have SMNI *(Someone might need it)* and, refactor cautiously. Features that made sense before lambdas, generics and even annotations existed in Java are still supported. It's easy to argue that XML isn't such a good way to wire up beans these days, but it's much harder to argue that it should be removed altogether. I personally value the fact that I can easily upgrade older Spring applications and gradually migrate to newer techniques.

Remember as well that, just like commercial software, open source has limited resource and pressures of time. Sometimes we just make mistakes as developers and end up needing to live with them for a while.

## [](#too-big-too-fail)Too Big, Too Fail?

At its heart, Spring is an integration framework. It provides a consistent programming model over lots of different technologies. It's fair to say that Spring can be on the large side, but it's simply not possible to provide integration with lots of technologies without... integrating with lots of technologies. Although it can seem overwhelming, once you understand the core concepts, it's pretty easy to pick only the parts of the Spring that you need. The [guides on spring.io](https://spring.io/guides) can be useful starting point if you have some specific goal that you need to achieve. The [list of Spring Boot starters](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#using-boot-starter-poms) or using [start.spring.io](http://start.spring.io) can also be a good way of limiting Spring to a specific area.

## [](#dependencies)Dependencies

A typical Spring-based application will have dependencies on any number of third-party libraries. Historically, it's been hard to know exactly which versions of various libraries will work well together. If you're starting a new project today, I highly recommend using [Spring Boot's parent POM](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#using-boot-dependency-management) or the [Spring Platform](https://spring.io/platform). Both provide a curated set of dependencies that are known to work well together.

We've even developed a [Gradle plugin that allows you to use the managed dependencies](https://github.com/spring-gradle-plugins/dependency-management-plugin) section of POM when you don't have the benefit of Maven's parent dependency feature.

If you can't use managed dependencies for some reason, you can still refer to the Spring Boot documentation for a [list of compatible versions](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#appendix-dependency-versions) that are known to play well together.

## [](#injection)Injection

Always use [constructor based dependency injection](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-constructor-injection) in your beans. Always use [assertions](http://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/util/Assert.html) for mandatory dependencies. For more background on why field based injection is evil, you can read [this article by Oliver Gierke](http://olivergierke.de/2013/11/why-field-injection-is-evil/).

As always there is one exception to the rule, it's fine to use field based injection in tests when you're [using the `SpringJUnit4ClassRunner`](http://docs.spring.io/spring-framework/docs/current/spring-framework-reference/htmlsingle/#integration-testing).

## [](#leaky-spring)Leaky Spring

I've seen a few people argue that application code should *never* have any dependencies on frameworks. I.e. an `org.springframework` import anywhere (other than configuration code) is bad. Whilst you can absolutely can do this (there is wide support for standard annotations such as `@Inject`), I tend not to be so prescriptive. I prefer to apply the 80/20 rule here. I think it's fine to have dependencies on framework classes and annotations, but I don't want to rewrite more than 20% of the class if I were to move off Spring.

What I do want is application code that is easy to test. It should be possible for me to manually create an instance of my business service and test it without needing a full `ApplicationContext`.

## [](#configuration)Configuration

I personally like to keep my Spring configuration fairly light. I like to use component-scanning to find application beans and I like to keep my `@Configuration` for framework specific configuration that deviates from Spring Boot's default auto-configuration. I don't tend to use XML-configuration at all these days.

Some people argue that it's better to have explicit configuration for all defined beans but in practice I tend to find this a hindrance. Applications that follow this approach tend to have a single `@Configuration` class that ends up knowing about everything in the system, and contains a whole bunch of small `@Bean` methods. I also find the self-documentation nature of annotations really useful. I can easily search for `@Service` and find all my service beans.

Sam's article states *"...annotations are still magic. Until you run your app you’ve no idea if it’s wired up correctly"* but I don't really see how this is much different to having a class that [manually wires everything up](https://sites.google.com/site/unclebobconsultingllc/blogs-by-robert-martin/dependency-injection-inversion). You still need to run the entire app at some point to be sure that it works.

## [](#layering)Layering

Any system of significant size needs to think about architectural layers. Almost all my Spring applications end up with a "domain" layer at the bottom and a "web" layer at the top. I find it best to enforce strict separation between layers and keep dependencies in a single direction. It's pretty easy to annotate domain service exceptions with `@ResponseStatus` but I've rarely found this to be a good idea in practice. Likewise, it's easy to throw some Jackson annotations on an `@Entity` so that it can be marshalled as JSON but this often causes problems in the long run.

I recommend tools such as [Structure 101](https://structure101.com/) and [SonarQube](http://www.sonarqube.org/) which can check your code for package tangles and design problems.

## [](#spring-mvc)Spring MVC

I generally find it best to keep business logic outside of Spring MVC `@Controller` beans. I like to think of Spring MVC as a little adapter layer. It's responsible for taking HTTP input, validating it, passing it to a service then returning a response. I'll often add mediator `@Service` beans at the web layer to take care coordinating calls to business services. This generally makes it much easier to test things, especially when using the [MVC Test framework](http://docs.spring.io/spring-framework/docs/current/spring-framework-reference/htmlsingle/#spring-mvc-test-framework).

## [](#logging)Logging

Logging in Java really shouldn't be as difficult as it is. There are so many logging libraries to choose from, and so many different combinations that it's easy to get bogged down. Luckily, for a typical Spring Boot application you don't really need to worry too much. My advice is always:

-   Use [SLF4J](http://www.slf4j.org/) in your code to log things.
-   Stick with Spring Boot's default choice of [logback](http://logback.qos.ch/) if possible.
-   Log to the console only and use a tool such as [Splunk](http://www.splunk.com) to capture and store.

## [](#testing)Testing

The golden rule for unit testing in Spring is keep Spring out of your unit testing! It should be possible to unit test the majority of your beans without needing to spin up an application context. There's a lot of debate in the testing world about mocks, but I generally find judicious use of [Mockito](http://mockito.org/) (I like [BDD Mockito](http://mockito.github.io/mockito/docs/current/org/mockito/BDDMockito.html)) pretty helpful.

You will often need to involve Spring when it comes to integration testing. I tend to find my integration tests often configure a "layer" of the application. For example, domain tests might startup Hibernate + Spring Data + In-memory Database. For Spring MVC tests, I tend to leave the database alone and inject mock services. The layered architecture discussed above really starts to pay dividends here since it's easy to mock or stub the things that your "web layer" needs.

## [](#startup-times)Startup times

A typical Spring Boot REST application starts in about 2.5 seconds and things get slower once you start to throw technologies such as Hibernate in the mix. Spring is designed to "fail fast & fail early" and unfortunately that does have an impact on startup time. On the plus side, once an application has started, it's likely that it's in a functioning state.

If you do have issues with slow startup, consider looking at [Spring Boot Devtools](https://spring.io/blog/2015/06/17/devtools-in-spring-boot-1-3) which should make re-starts much quicker. You should also look at using `@Lazy` initialization if you have any of your own beans that are slow to create.

## [](#spring-boot)Spring Boot

Spring Boot was launched at the end of 2013 to specifically address some of the common problems faced by users of Spring. Unfortunately I've seen the *"Spring is now so complex that it has its own framework."* quote paraphrased quite often. Spring Boot is intentionally distinct from the Spring Framework, it has different goals, different dependencies and a different release schedule. I prefer to think of Spring Framework as the raw ingredients, and Spring Boot as fully baked cake. You're free to mix the ingredients in anyway you see fit, but who doesn't like cake?

![Ingredients](https://raw.githubusercontent.com/philwebb/media/master/hownottohate/spring-ingredients.jpg) ![Cake](https://raw.githubusercontent.com/philwebb/media/master/hownottohate/boot-cake.jpg)

## [](#choice--open-source)Choice & Open Source

One of the greatest things about Open Source is that it gives you tremendous freedom. If you want Dependency Injection, but you're not a fan of Spring, take a look at [Guice](https://github.com/google/guice). If you want to build a REST service, but you don't like Spring MVC, try [Ratpack](http://ratpack.io/). If you want a well integrated, well tested, documented framework with a proven track record, try [Spring](http://start.spring.io) with [Spring Boot](http://start.spring.io).

If you want to change the way that your Open Source works, try [contributing](https://spring.io/blog/2013/09/20/contributing-to-spring-boot-with-a-pull-request)!