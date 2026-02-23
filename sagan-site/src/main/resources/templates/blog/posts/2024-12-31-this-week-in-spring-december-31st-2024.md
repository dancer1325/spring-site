---
title: This Year in Spring - December 31st, 2024
source: https://spring.io/blog/2024/12/31/this-week-in-spring-december-31st-2024
scraped: 2026-02-23T07:56:32.987Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  December 31, 2024 | 0 Comments
---

# This Year in Spring - December 31st, 2024

_Engineering | Josh Long |  December 31, 2024 | 0 Comments_

Hi Spring fans! Happy New Year! And welcome to another installment of This *Year* in Spring!

## [](#the-year-that-was)The year that was...

I write this edition from a desk overlooking the beautiful jungle of Martinique, a beautiful island nation in the French Caribbean. I’m sipping some *rhum martinique*, enjoying the semi-sweltering heat, and thinking about the year that's been *2024*. Every year at this time, since 2011, I write *this year in spring*, an abbreviated look at the year from the rearview mirror.

So many amazing things happened this year. It’s sort of difficult to put my finger on any one thing. But, I shall try to narrow it down. To five items. As I always do.

We’ll have the week's roundup below, too, as usual.

So where to begin? Remember, this is meant to be a roundup of the things that most impressed. The things that most took my breath away. Not a roundup of the latest of a given thing. And there have been a ton of amazing things that fit the bill. Let’s dive right into them.

### [](#spring-ai)Spring AI

C’mon. You saw this coming. I’m a contributor to Spring AI, for Pete’s sake! It’s *super* good and getting better by the minute! Spring AI is a comprehensive framework for end-to-end integration of the common patterns of AI engineering. It provides robust support for building AI-powered systems and services through the use fo the four pillars of Spring: AOP, portable service abstractions, dependency injection, and auto-configuration.

And, it's even at the leading edge of a ton of new and amazing protocols, MCP - Model Context Protocol - which lets you integrate arbitrary data sources with your LLM models. Spring AI MCP is (at least for the moment) a subproject of Spring AI making it trivial to both produce and consume MCP services.

In Chinese, the word for 'love' is *ai*. The word for ‘I' is 'wo'. So: *wo ai AI*!

### [](#spring-modulith)Spring Modulith

Look, one of the biggest pet peeves of mine is that I see so many codebases which sort of fly in the face of good object-oriented design, using package structures like `app.controllers`, `app.services`, `app.models`, `app.repositories`, etc. In order for this scheme to work, every type (save perhaps the controllers) would need to be `public`. Why?\_ this is an anti-pattern! Why use a nice object-oriented language if you're only going to make everything public? The whole point of object orientation is information hiding. If you want everything to effectively be public, in a flat global namespace, just use C! At least that's a bit more honest.

But what are the alternatives? There are tons of other approaches that/will guide you to cleaner architecture, and one of my favorites is Spring Modulith. Spring Modulith gives you the tools to build clean, modular codebases with Spring. It extends the framework, adding infrastructure to make modular decoupling easier. And, through the use of conventions and tests backed by ArchUnit, it lets you extend the Java language with a new layer and level of validation to ensure you don't inadvertently *expose* implementation details from one root package (a "module") to another.

Trust me (I’m a contributor for a reason!): Once you've gone Spring Modulith, you won't want to go back! Your code will be cleaner and better architectured for the long term and you'll have more confidence that you're not accidentally making promises you can't keep to other would-be dependents!

### [](#spring-grpc)Spring gRPC

This is a new *experimental* project (but it's on the Spring Initializr!) that lets you quickly and easily stand up GraalVM-ready gRPC services with Spring Boot! You just define your proto service definitions in the `proto` folder. What else do you need to know? Go to start.spring.io, choose gRPC, and hit generate. Build the project using your build tool and it’ll generate the stubs for your services, which you then implement in a Spring Boot project. If you run the resulting jar in the usual way, it’ll bind the gRPC in the usual way to a port directly. If you have `spring-boot-starter-web` on the classpath, it’ll expose the gRPC service through the servlet infrastructure. If you have Actuator, it'll give you metrics about your services. And, soon, if you are using `spring-boot-starter-security`, it'll let you secure your services. And of course, if you select`graalvm` on the Spring Initializr, it’ll let you compile the applications into a GraalVM native binary! *Nice*. Try it out *now* (and I'll be doing a video in the new year!)

### [](#spring-security)Spring Security

I can't tell you how impressed I’ve been with Spring Security of late. It’s already a one-stop-shop for all things security, authentication, and authorization. But it keeps getting easier and more awesome. This latest release - 6.4 - includes new or enhanced support for:

-   The full OAuth suite: OAuth clients, OAuth resource servers
-   Magic passwords where a user can click a link to get instantly logged in
-   WebAuthn/Passkeys. Want users to be able to log into your service with just their face or touch id or an external USB-based key? Look no further!

And remember, Spring Authorization Server is getting better and better all the time, too! The newest release makes standing one up trivial. It’s basically a one-liner for the common cases! You can even mix-and-match: have a Spring Authorization Server that lets people redirect OAuth clients to handle authentication and then let them authenticate using their fingers or magic links or whatever. Amazing!

### [](#performance)Performance

There’s an incredible opportunity implied in using a framework like Spring, because it sits between you and the lower-level runtime, which means that if we - the folks working on Spring - can optimize things at the framework level, we can do so and advantage everyone using the framework. It’s too good a fruit to resist! So we're always looking for levers we can pull that improve your application. And this year is no different.

This year, we took our efforts even further. You may know that we have great support for Project CRaC in Spring Boot. We also have amazing support for GraalVM native images. This year we debuted our integrated AppCDS support and previewed our Project Leyden support. I did a video [covering all of these options](https://www.youtube.com/watch?v=zeY3Wg1ieqI) except Project Leyden here. For details on Project Leyden, check out this video, which was [presented at Devoxx Belgium in cooperation with the Java team at Oracle](https://www.youtube.com/watch?v=78HV0MRtfiw).

*Vroom!*

All right, with those five tentpole marquee features introduced, let's look at..

## [](#the-week-that-was)The Week That Was!

Here's your usual dose of goodness from the last week of the new and novel in this the most amazing community ever!

-   Interesting discussion [on Spring Boot Actuator misconfigurations](https://www.wiz.io/blog/spring-boot-actuator-misconfigurations)
-   Oldie but a goodie: [Event-driven microservices with Spring Boot and Kafka](https://www.javacodegeeks.com/2024/10/event-driven-microservices-with-spring-boot-kafka.html)
-   A nice discussion on the [use of Oracle JSON Relational Duality views with Spring Boot](https://martinelli.ch/oracle-json-relational-duality-views-with-spring-boot/)
-   As always, another [great roundup of all things Spring Boot on InfoQ](https://www.infoq.com/news/2024/12/spring-news-roundup-dec16-2024/)
-   [Spring AI MCP 0.3.0 released](https://spring.io/blog/2024/12/29/spring-ai-mcp-0)
-   In last week's installment of *A Bootiful Podcast*, I talked to Intact’s Luke Shannon about how [they're building a developer portal to connect developers building services using Spring Boot](https://spring.io/blog/2024/12/27/a-bootiful-podcast-luke-shannon)
-   [Spring AI 1.0.0. m5 released](https://spring.io/blog/2024/12/23/spring-ai-1-0-0-m5-released)
-   Nice discussion on how to build [a Spring Boot starter](https://www.youtube.com/watch?v=EO6U8-OQVZQ)
-   Neat! A video looking [at how to build a REST API with Spring Boot](https://www.youtube.com/watch?v=ictnntknQhA)
-   How to build [Spring Boot microservices with a simple example. (This video is *eight hours long*! I haven't watched it all. But, there's bound to be something interesting in it!)](https://www.youtube.com/watch?v=wz0xvn14M2E)
-   Have you been following the videos I've been putting out looking a the latest-and-greatest to come of the Spring Boot 3.4 line? Check them all out!
    -   [*What's New in Spring Framework 6.2*](https://youtu.be/t2NEM-Jw430?si=V2JpbgEpNLgN0BWR)
    -   [What's New in Spring Data 2024.1](https://youtu.be/DUIpWkl_ixE?si=3qbNBDkmXu2w9mAx)
    -   [What's New in Spring Security 6.4](https://youtu.be/lPreCE97nEw?si=qQQ85t46_p6MKj9P)
    -   [What's New in Spring Integration 6.4](https://youtu.be/gGyg3gU5iY0?si=6amCM8XAB1lyi4n0)
    -   [What's New in Spring Batch 5.2](https://youtu.be/phbYTF6xAaY?si=imJQt1EkpEC3chVK)
    -   I've got more comin', too! So [stay tuned](https://youtube.com/@cofffeesoftware)!

I speak, I'm sure, for the entire Spring team when I say to you: *HAPPY NEW YEAR*, and we look forward to seeing you in 2025!!