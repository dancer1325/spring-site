---
title: This Year in Spring - December 31, 2013
source: https://spring.io/blog/2013/12/31/this-year-in-spring-december-31-2013
scraped: 2026-02-24T07:48:19.081Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  December 31, 2013 | 0 Comments
---

# This Year in Spring - December 31, 2013

_Engineering | Josh Long |  December 31, 2013 | 0 Comments_

Happy New Year! Welcome back to this year's final installment of *This Week in Spring*!

We'll do some of the news, as usual, and then I'll take a look back over the last year in news surrounding Spring, of which there's been much indeed!

1.  Matt Raible, who we know has also been looking at Spring Boot, [just wrote up our just-released Spring 4 for InfoQ](http://www.infoq.com/news/2013/12/spring4). Definitely worth a read if you have the time!

-   Xavier Padró has a nice post on retrying web service operations with [`RequestHandlerRetryAdvice`](http://xpadro.blogspot.com/2013/12/retry-web-service-operations-with.html).
-   There's a great discussion on Stack Overflow on Spring's `CrudRepository` vs. the more JPA-specific `JpaRepository` with an [awesome answer by Spring Data lead Oliver Gierke](http://stackoverflow.com/questions/14014086/what-is-difference-between-crudrepository-and-jparepository-interfaces-in-spring/20784007)
-   Ken Blair has put together a nice introduction to doing bean mapping [using the Orika bean-mapping framework alongside Spring](http://kenblair.net/orika-spring-easy-bean-mapping/)
-   Groovy ninja Guillaume LaForge has started putting together a nice roundup of all the latest happenings in the Groovy community, and I'd just like to invite readers of [this column to check out that series, as well](http://glaforge.appspot.com/article/groovy-weekly-2)
-   Viral Patel is back at it again, this time with a post on [handling request headers with Spring MVC](http://viralpatel.net/blogs/spring-requestheader-example/)
-   Norris Shelton, Jr. has put together a nice post on rendering validation messages from [a JSON service with Spring MVC](http://norrisshelton.wordpress.com/2013/12/30/getting-spring-mvc-validation-messages-from-a-json-service/).
-   Jim White on the *Intertech* blog has a post that looks at [Spring 4's generics-aware dependency injection](http://www.intertech.com/Blog/spring-4-generic-qualifiers/).
-   Lalit Jha has a nice post on how to [integrate Play with Spring for dependency injection](http://spring-webservice-2-step-by-step.blogspot.com/2013/12/spring-framework-integration-with-play.html). To be honest, I think I've seen alternative approaches that were different, so apparently there are many ways to approach this. Interesting read, nonetheless!
-   Microsoft put up a little note [on running Spring applications on Windows Azure](http://blogs.msdn.com/b/windowsazurej/archive/2013/12/25/blog-migrating-a-java-spring-framework-application-to-windows-azure.aspx). I don't necessarily recommend Azure, but if you're going that route anyway... :)
-   The *numberformat* blog has a nice post (titled *the 3 r’s of spring batch 3.0.x with annotations*) on [using Spring Batch's Java Configuration API](http://numberformat.wordpress.com/2013/12/28/the-3-rs-of-spring-batch-3-0-x-with-annotations/). Definitely worth a read!
-   The *Way2Java* blog has a nice post [on using Spring AOP's after-throwing advice](http://way2java.com/spring/spring-aop-after-throwing-advice-example/).
-   Zheng Dongping (I'm assuming that it's his blog, too, though I only saw this name in the `@author` attribution in the code... otherwise this blog's under the user *dempe*) put together a code-only look at how to [use Spring Data MongoDB's mapping support](http://www.cnblogs.com/dempe/p/3484190.html). The balance of the blog is in Chinese, so I was only relying on what Google Translate could give me. Looked good, though.
-   *xinhuaxuan*, also under the same Chinese Blogs site as the former entry, put together a nice post [on using Spring's `@Required` annotation](http://www.cnblogs.com/xinhuaxuan/p/3490126.html) to trigger startup-time checks for the presence of dependencies.

Looking back over the past year and trying to summarize it is *very* difficult! Beleive me, I know, [I've tried](http://blog.gopivotal.com/products/have-you-seen-spring-lately) and [tried](http://www.youtube.com/watch?v=_twyZL_AGCI)! This year saw the Spring team join [GoPivotal](http://gopivotal.com), which in turn has led to one wild ride for all involved! Here, in short order, is some of the stuff that got our attention in *This Week in Spring*:

1.  [We launched Spring 4!](https://spring.io/blog/2013/12/12/announcing-spring-framework-4-0-ga-release) This featured markedly improved REST support, Java EE 7 and Java 8 support, websockets support, and a slew of other features.

-   3..2... 1... Lift Off! We joined [the GoPivotal initiative](http://twitter.com/gopivotal) at the end of March 2013! (and formally in various other countries in the months to follow)
-   At our annual [SpringOne2GX](http://springone2gx.com) conference, we launched the new home of Spring on the web, [Spring.IO](http://spring.io/)! (You probably already knew about it if you're reading this blog! :D )
-   [Cloud Foundry v2 was released](http://www.infoq.com/news/2013/06/cloudfoundry_v2)
-   We launched [Pivotal One](http://www.gopivotal.com/press-center/11122013-pivotal-one), the comprehensive platform which features Pivotal HD and Cloud Foundry as well as popular infrastructure like [RabbitMQ](http://rabbitmq.com), [Redis](http://redios.io), etc., and of course [Spring](http://spring.io) features at the heart of it all.
-   This year, of course, saw the release of many fine updates to the usual suspects including [Spring Social](http://projects.spring.io/spring-social/) , [Spring Integration](http://projects.spring.io/spring-integration), [Spring Batch](http://projects.spring.io/spring-batch), [Spring Data](http://projects.spring.io/spring-data), [Spring Security](http://projects.spring.io/spring-security) and [Spring for Hadoop](http://projects.spring.io/spring-hadoop) . Notably: Spring Batch got a new Java Configuration API and saw its design underpin that of the just-released [Batch standard](https://jcp.org/en/jsr/detail?id=352). Spring Data added even more projects to the release train. Spring Integration 3.0 just shipped with numerous new adapters and improvements. Spring Security's Java configuration API and raft of improvements for open-web application security all hit this year.
-   [Spring Boot](http://projects.spring.io/spring-boot), which takes an opinionated view of the Spring platform and third-party libraries so you can get started with minimum fuss, hit mid-year to rave reception and reviews. Spring Boot's been making waves all over the industry with Java developers and developers from other communities alike agreed: Boot is productive.
-   [Spring XD](http://projects.spring.io/spring-xd) delivers a turnkey appliance for building big-data aware applications. Spring XD, which builds on top of Spring Batcha and Spring Integration, is a *runtime*, and can handle common things like scaling a job by itself.
-   And, of course, any discussion about the great big-data technology coming out of Pivotal would be incomplete without mention of [Pivotal HD](http://www.gopivotal.com/products/pivotal-hd/), our enterprise-grade Hadoop distribution. Pivotal HD, of course, works well with Spring for Hadoop and is a natural data-warehousing complement to the online processing supported featured in [Spring XD](http://projects.spring.io/spring-xd).
-   While this list could continue ad nauseum, the most amazing aspect of 2013 was you, the community: world-wide, loud and proud, your code, blogs, articles, videos, talks at conferences, Tweets, and interactions have driven *This Week in Spring* through it all. Thanks, and rock on!

I'm sure I speak for all of the Spring team in wishing you the happiest, healthiest and safest of New Years (if you haven't already crossed it yet)! We'll see you in 2014!