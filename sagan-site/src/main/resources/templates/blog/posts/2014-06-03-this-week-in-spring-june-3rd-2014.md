---
title: This Week in Spring  - June 3rd, 2014
source: https://spring.io/blog/2014/06/03/this-week-in-spring-june-3rd-2014
scraped: 2026-02-23T22:27:50.477Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  June 03, 2014 | 0 Comments
---

# This Week in Spring  - June 3rd, 2014

_Engineering | Josh Long |  June 03, 2014 | 0 Comments_

Welcome to another installment of *This Week in Spring*. This week's an exciting week! Well, let's be honest. They're all exciting weeks. But in particular, this week's going to make a lot of people happy. Watch [the blog](http://spring.io/blog) and I'll see you back here next week to recap! :)

1.  Oh my goodness! [Spring Boot 1.1.0.RC1 is now available](https://spring.io/blog/2014/06/02/spring-boot-1-1-0-rc1-available-now)! The new release maintains the epic with support for Spring Data Elasticsearch, HornetQ, and Spring Social, and a *lot* more! Grab the latest release, kick the tires, and feedback [on Twitter](http://twitter.com/SpringBoot) or [GitHub](http://github.com/spring-projects/spring-boot).
2.  Dr. Mark Pollack has just announced that the latest release of [Spring XD, 1.0.0.M7](https://spring.io/blog/2014/06/03/spring-xd-1-0-0-m7-released) is now available. The new release provides a lot of great new features. My favorite is the ability to pin data to a certain stream - think of this as *correllation* using a message's content - so that you can preserve stateful operations. Think of this as a *great* way to route and divide messages based on a useful business key. There's a great example in the release notes.
3.  Azul rockstar Gil Tene gave an amazing talk on [reducing latency for SpringOne2gX 2013 that is now available online](https://spring.io/blog/2014/06/03/springone2gx-2013-replay-how-not-to-measure-latency). Gil is one of our industry's mad scientists. I haven't yet seen this talk, but I will, and I highly recommend that you do too. Azul makes high performance, low latency JVMs both as appliances and as deliverable software. His talks thus stem from a *lot* of thankless research and development that I'd just as soon spare myself by watching, and learning from, his talks. Go, Gil!
4.  June webinars are here! Michael Minella in [Spring Batch 3.0.0](http://spring.io/blog/2014/05/27/webinar-spring-batch-3-0-0) on June 10th, and Glenn Renfro in [Spring Integration Done Boot-ifully](http://spring.io/blog/2014/05/27/webinar-spring-integration-done-boot-ifully) on June 17th.
5.  Spring ninja Greg Turnquist has put together a [teaser post on using the amazing `when.js` Promises/A+ implementation in a front-end REST client](https://spring.io/blog/2014/06/02/using-new-when-js-3-2-2-to-build-a-front-end-for-spring-data-rest) in advance of his SpringOne2GX 2014 talk. Check out the post *and* [his talk at the conference](http://springone2gx.com)!
6.  Ramnivas Laddad, a Spring ninja, original AspectJ leaders, and architects behind Cloud Foundry, has just posted a [very cool look at Spring Cloud](https://spring.io/blog/2014/06/03/introducing-spring-cloud), which makes consuming client services from different middle/infrastructure services (a database, a message queue) on various Platforms-as-a-Service (PaaSes) a simple matter of platform-decoupling configuration.
7.  The replay of ADP's Jeffery Sologov's talk looking [at the pitfalls of building large scale applications](https://spring.io/blog/2014/06/03/springone2gx-2013-replay-the-pitfalls-of-building-large-scale-applications) is now up! Check it out!
8.  [ttp://twitter.com/JakubJirutka](@JakubJirutka) chimed in to tell us about this *epic* [Spring Expression Language (SpEL)-powered implementation of the Bean Validation API (JSR 303/349)](https://github.com/jirutka/validator-spring). The GitHub offers an interesting point, "it’s especially very useful for cross-field validations that are very complicated with a plain Bean Validation." I *love* the examples, too:
    
     
    @SpELAssert(value = "password.equals(passwordVerify)",
            applyIf = "password || passwordVerify",
            message = "{validator.passwords\_not\_same}")
    public class User {
      private String password;
      private String passwordVerify;
    }
    
    Nice job!
    
9.  A hat tip to [the amazing Brian Dussault](http://twitter.com/briandussault) for finding this: [Zuul is a nifty looking application configuration management solution](http://www.devnull.org/zuul) that offers a clean Spring client API.
    
10.  You know what made my day yesterday? A [`HystrixInvocationHandler`](https://github.com/spencergibb/halfpipe/blob/master/halfpipe-client/src/main/java/halfpipe/client/HystrixInvocationHandler.java). An `InvocationHandler` is used by the JDK (and Spring's rich proxying subsystem) to create proxies that wrap beans. This `InvocationHandler` wraps method invocations on a given bean in Netflix's OSS [Hystrix](https://github.com/Netflix/Hystrix) project's `Command` objects. Hystrix `Command`s wrap functionality and provide/support [resiliency patterns](http://techblog.netflix.com/2011/12/making-netflix-api-more-resilient.html). I can't wait to see more of [what becomes of Spencer Gibb](http://twitter.com/spencerbgibb)'s Halfpipe project!
11.  Our pal David Welch is at it again, this time with an interesting project called Spring Tiered, which aims to simplify *even further* (and normalize) [the development of HATEOAS based services](https://github.com/Lemniscate/spring-tiered). Interesting...
12.  Also, speaking of building (and consuming) resilient services, check out [Chris Richardson](http://twitter.com/crichardson)'s fantastic talk from SpringOne2GX 2013 on [powerful abstractions for consuming services asynchronously](https://spring.io/blog/2014/04/29/springone2gx-2013-replay-futures-and-rx-observables-powerful-abstractions-for-consuming-web-services-asynchronously).
13.  Also, I put together a post talking about [getting started with Maven (and alternatives) and Spring](http://www.joshlong.com/jl/blogPost/dont_want_to_use_maven_with_spring.html)