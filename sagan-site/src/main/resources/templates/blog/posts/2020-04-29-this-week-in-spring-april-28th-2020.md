---
title: This Week in Spring - April 28th, 2020
source: https://spring.io/blog/2020/04/29/this-week-in-spring-april-28th-2020
scraped: 2026-02-23T14:03:20.655Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  April 29, 2020 | 0 Comments
---

# This Week in Spring - April 28th, 2020

_Engineering | Josh Long |  April 29, 2020 | 0 Comments_

Hi, Spring fans! Welcome to another installment of *This Week in Spring*! It's already April 28th, 2020. I can't even believe it.

The time sure is flying, not just since the last time we spoke in this little blog of ours, but also since I first started writing these roundups the first week of January 2011. In four short months, it'll have been ten years since I officially joined the Spring team! Crazy.

It's also the case that time has flown by since this #COVID19 crisis forced much of the world into lockdown. I am an eternal optimist, and I was wondering if this COVID19 crisis was going to have a silver lining. For us here at the Long household, it's been a gift for me to be able to hang out with my family. My little girl is making really good progress learning how to program, too. She's already good with basic control flow, variables, functions, etc., all just since we went into lockdown. I've become a homeschooling parent. It's been a lot of fun renewing my maths fundamentals with her. She's a remarkable kid.

Anyway, I hope you are taking this time to be with your family and expand your skillset. I think that's very valuable. I get lots of emails and tweets (usually direct messages) from folks all over the world every day. They warm my heart - I *love* our active community! Today, I got a nice email from a student in Ho Chi Minh, Vietnam, who asks what he can do to expand his Spring skills. I want to relay to you what I told him, basically:

> Spring is a *big* universe. It's impossible to know everything. But, you try a little bit of everything to increase your exposure. I would suggest going to [spring.io/guides](http://Spring.io/guides) and trying each of the guides. Each one takes maybe 15 - 30 minutes. Try each one every day. That way, you will know what is possible. From there, you can focus more on a particular subject as the applications that you're building requires it.

> \[As to how I learned:\] I just practice, practice, practice :) Many people know more than I do. I have been using it for years, full time, and I still don't know everything. You don't need to know *everything*. You only need to know that which is required to support a particular application, and *why* it is required. The guides will help you here, as well. It will help you to understand the different possibilities. You will also have to learn the ideas that motivate the frameworks. So, before you learn about Spring Batch, learn a little about batch processing in general. Before you learn about Spring Integration, learn a little about enterprise integration patterns (EIP) and messaging. Before you learn about Spring Data, learn a little about SQL and NoSQL data stores. Before you learn about Spring MVC, learn a little about HTTP and the MVC pattern. Before you learn Reactor and Spring Webflux, learn about Reactive programming. And so on.

I hope this helps you all in your journey, as well.

Anyway, my friends, there's a *lot* of good stuff today so let's get to it!

-   [Spring Data Neumann RC2, Moore SR7, and Lovelace SR17](https://spring.io/blog/2020/04/28/spring-data-neumann-rc2-moore-sr7-and-lovelace-sr17)
-   [Spring Framework 5.2.6, 5.1.15, 5.0.17, and 4.3.27 available now](https://spring.io/blog/2020/04/28/spring-framework-5-2-6-5-1-15-5-0-17-and-4-3-27-available-now)
-   [Announcing Spring Cloud Stream Horsham.SR4 (3.0.4.RELEASE) and Spring Cloud Hoxton.SR4](https://spring.io/blog/2020/04/27/announcing-spring-cloud-stream-horsham-sr4-3-0-4-release-and-spring-cloud-hoxton-sr4)
-   [A Bootiful Podcast: Linux Kernel Hacker Steve Rostedt on what our busy Spring applications look like from the Kernel's perspective](https://spring.io/blog/2020/04/24/a-bootiful-podcast-linux-kernel-hacker-steve-rostedt-on-what-our-busy-spring-applications-look-like-from-the-kernel-s-perspective)
-   [Spring Cloud Data Flow 2.5.0.RC1 Released](https://spring.io/blog/2020/04/23/spring-cloud-data-flow-2-5-0-rc1-released)
-   [Spring Tips: Configuration](https://spring.io/blog/2020/04/23/spring-tips-configuration)
-   [Spring Tools 4.6.1 released](https://spring.io/blog/2020/04/22/spring-tools-4-6-1-released)
-   [Spring HATEOAS brings you new ways to configure clients](https://spring.io/blog/2020/04/22/spring-hateoas-brings-you-new-ways-to-configure-clients)
-   Piotr Mińkowski has done a nice job introducing [Spring Cloud Gateway in this YouTube video](https://www.youtube.com/watch?v=XIkSWHX38Tg&feature=emb_title).
-   This looks super interesting! Native images, very much like the ones we just looked at in this [Spring Tips](http://bit.ly/spring-tips-playlist) installment [on our Spring Graal Feature](https://www.youtube.com/watch?v=u1XJTI1PVLw), are coming to the JDK itself as part of this this new effort, [Project Leyden](https://mail.openjdk.java.net/pipermail/discuss/2020-April/005429.html). Pretty cool, right? Also of note, Leyden refers to a [Leyden jar](https://en.wikipedia.org/wiki/Leyden_jar), an antique electrical instrument which stores a high voltag electric charge between two electrical conductors. How cool!
-   [Building a Community for Your Company’s Open Source Projects – Part 1: Openness and Transparency](https://blogs.vmware.com/opensource/2020/04/27/building-a-community-part-1-openness-and-transparency/)
-   [Spring: Blocking vs non-blocking: R2DBC vs JDBC and WebFlux vs Web MVC](https://technology.amis.nl/2020/04/10/spring-blocking-vs-non-blocking-r2dbc-vs-jdbc-and-webflux-vs-web-mvc/)
-   [twitter.com](https://twitter.com/gregturn/status/1254407735355023361?s=12)
-   [Building a Robust SQS Client with Spring Boot](https://reflectoring.io/spring-robust-sqs-client/)
-   [twitter.com](https://twitter.com/linux_china/status/1253915371234455552?s=12)
-   [Deploy Spring Boot with PostgreSQL on Qovery](https://docs.qovery.com/guides/tutorial/deploy-spring-boot-with-postgresql/)
-   [Building Robust and Resilient Apps Using Spring Boot and Resilience4j](https://www.infoq.com/presentations/resilience4j/?itm_source=infoq&itm_medium=popular_content_link&itm_campaign=popularContent_news_clk)
-   [The Springdoc team moves quickly! Springdoc is an interesting alternative to Springfox that supports the integration of Swagger and OpenAPI into Spring-based applications](https://twitter.com/maciejwalkowiak/status/1253025708525391872?s=12)
-   [Going Reactive With Spring Webflux - Rashmi Shehana - Medium](https://medium.com/@rashmishehana_48965/going-reactive-with-spring-webflux-40128f3d5bad)
-   Did you hear the news? SpringOne is now all-online, all-free! Join us September 1 for the show of a lifetime!
-   You should watch this [replay of the Java Language Features](http://oracl.info/XAGI50zjBB3) session by Stuart Marks at the inaugural #DevDotNextDigital conference.
-   [Introducing Paketo.io Buildpacks](https://paketo.io/). Build and patch containerized apps so that you can spend all your time on the thing that matters the most - developing great software.