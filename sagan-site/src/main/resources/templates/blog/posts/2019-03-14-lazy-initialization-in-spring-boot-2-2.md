---
title: Lazy Initialization in Spring Boot 2.2
source: https://spring.io/blog/2019/03/14/lazy-initialization-in-spring-boot-2-2
scraped: 2026-02-23T14:55:21.924Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Andy Wilkinson |  March 14, 2019 | 10 Comments
---

# Lazy Initialization in Spring Boot 2.2

_Engineering | Andy Wilkinson |  March 14, 2019 | 10 Comments_

The [recently announced](https://spring.io/blog/2019/03/08/spring-boot-2-2-m1) first milestone of Spring Boot 2.2 introduces support for lazy initialization. This post describes the new functionality and explains how and when to enable it.

## [](#what-does-it-mean-to-be-lazy)What Does it Mean to be Lazy?

Spring Framework has had support for lazy bean initialization since before its source code moved to Git 11 years ago. By default, when an application context is being refreshed, every bean in the context is created and its dependencies are injected. By contrast, when a bean definition is configured to be initialized lazily it will not be created and its dependencies will not be injected until it's needed.

## [](#enabling-lazy-initialization)Enabling Lazy Initialization

It's possible to enable lazy initialization in any version of Spring Boot if you're happy to get your hands dirty and write a `BeanFactoryPostProcessor`. Spring Boot 2.2 just makes it easier via the introduction of a new property, `spring.main.lazy-initialization` (there are also equivalent methods on both `SpringApplication` and `SpringApplicationBuilder`). When set to `true`, bean definitions in the application will be configured to use lazy initialization.

## [](#benefits-of-lazy-initialization)Benefits of Lazy Initialization

Lazy initialization can result in significantly reduced startup times as fewer classes are loaded and fewer beans are created during application startup. For example, a small web application that's using Actuator and Spring Security that normally starts in 2500ms will start in 2000ms with lazy initialization enabled. The exact improvement will vary from application to application depending on the structure of their beans' dependency graphs.

### [](#what-about-devtools)What About DevTools?

Spring Boot's DevTools already provide a significant boost to developer productivity. Rather than having to restart the JVM and the application each time you want to try out a change, DevTools enables hot restart of your application in the same JVM. A significant benefit of hot restart is that it gives the JIT more of a chance to optimise the code involved in starting your application. After a few restarts, the original time of 2500ms is reduced by almost 80% to nearer 500ms. With lazy initialization, we can do even better. Setting `spring.main.lazy-initialization` sees our application restart in 400ms directly in the IDE.

## [](#downsides-of-lazy-initialization)Downsides of Lazy Initialization

As we've seen above, enabling lazy initialization can reduce startup times quite dramatically. You may be tempted to enable it all the time or be wondering why we didn't decide to enable it by default. There are a few downsides to lazy initialization that mean we believe it's better to opt-in once you have decided it makes sense to do so.

Due to classes no longer being loaded and beans no longer being created until they're needed, it's possible for lazy initialization to mask a problem that previously would have been identified at startup. Such problems can include no class def found errors, out of memory errors, and failures due to misconfiguration.

In a web application lazy initialization can lead to increased latency for HTTP requests that trigger bean initialization. This will typically just be the first request but it may have an adverse effect on load-balancing and auto-scaling.

## [](#is-this-thing-switched-on)Is This Thing Switched On?

If you're not sure what effect lazy initialization is having on your application, or you'd like to verify that another framework's behaviour meets your needs and matches their claims, it can be informative to use the debugger. By placing a breakpoint in the constructor of one of your beans you can see when it is being initialized. For example, in a Spring Boot web application with lazy initialization enabled you'll see that `@Controller` beans are not created until the first request is made to Spring MVC's `DispatcherServlet` or Spring WebFlux's `DispatcherHandler`.

## [](#when-to-enable-lazy-initialization)When to Enable Lazy Initialization

As we've seen above, lazy initialization can offer significant improvements in start up time but there are some notable downsides too and it's important to enable it with care.

One area where lazy initialization can be highly beneficial with few, if any, downsides is during development. As you're iterating on an application, the reduced startup times offered by lazy initialization and DevTools' hot restarts can dramatically improve your productivity.

Another area that can benefit from lazy initialization is your application's integration tests. You may already be using Spring Boot's test slices to reduce test execution time by limiting the number of beans that are initialized in certain types of tests. Lazy initialization provides an alternative mechanism to achieve a similar end result. If you're not in a position to structure your application such that it's amenable to test slicing, or if there isn't a slice available for a particular type of test, enabling lazy initialization will limit the beans that are initialized to those that are needed by the test. This will reduce test execution time, particularly when running a test in isolation during development.

Lastly, you may want to consider enabling lazy initialization in production. If you do so, it should be done with care. For web applications, container orchestration may benefit from a `/health` endpoint that is able to respond more quickly, but you also need to be aware of the potential for increased latency when the first request is made to one of the application's own endpoints. You should also take care to size your application's JVM with lazy initialization disabled to avoid any unwanted out of memory errors once all of its components have been used.