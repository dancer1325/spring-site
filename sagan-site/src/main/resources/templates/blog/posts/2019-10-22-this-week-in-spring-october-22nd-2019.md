---
title: This Week in Spring - October 22nd, 2019
source: https://spring.io/blog/2019/10/22/this-week-in-spring-october-22nd-2019
scraped: 2026-02-23T14:30:32.188Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  October 22, 2019 | 2 Comments
---

# This Week in Spring - October 22nd, 2019

_Engineering | Josh Long |  October 22, 2019 | 2 Comments_

Hi, Spring fans! What a week! I've just returned from Prague, the Czech Republic, where I was for the epic Geecon Prague 2019 event. (Thanks for voting my talk on Reactive Spring the #1 talk, Prague!). Now I'm in Nantes, France, the DevFest Nantes show. I'd never been to Prague and I've never been to Nantes. So how's that for cool first-time appearances in one week? I'll be speaking about testing here. Tonight I fly to Paris, Fr, for customer meetings. Then I fly on Thursday to St. Petersburg, Russia, for the Joker conference, where I'll be presenting on testing and I'll be co-presenting with Spring co-founder, my friend, and hero, the one, the only, the amazing and inimitable, a veritable font of kindness and wisdom, Juergen Hoeller! Then, on the 27th, I fly to Chicago. It's shaping up to be quite the week!

I've really enjoyed my time in Prague and now Nantes. Yesterday, I recorded 3 podcasts with folks from Microsoft and Pivotal, among others, so look forward to them in my podcast, [*A Bootiful Podcast*](https://soundcloud.com/a-bootiful-podcast). I also got to tour Nantes a little bit with my friend and Reactor / Spring teammate [Simon Baslé](http://twitter.com/SimonBasle). *Merci*, Simon!

I thought I was going to wake up and get this week's *This Week in Spring* roundup done and dusted before breakfast but it has turned out to be a *whopper* of a roundup! I hope you made a pot of coffee, this one's going to be a doozie!

-   It's here! It's finally here! [Spring Boot 2.2.0](https://spring.io/blog/2019/10/16/spring-boot-2-2-0)! There's so much good stuff I can't even! Check the blog, get [the bits](http://start.Spring.io), and [get to production](http://run.pivotal.io)!
-   [Spring Boot for Apache Geode & Pivotal GemFire 1.2.0.RELEASE Available](https://spring.io/blog/2019/10/22/spring-boot-for-apache-geode-pivotal-gemfire-1-2-0-release-available)
-   [Spring Session for Apache Geode & Pivotal GemFire 2.2.0.RELEASE Available](https://spring.io/blog/2019/10/18/spring-session-for-apache-geode-pivotal-gemfire-2-2-0-release-available)
-   In last weeks' *A Bootiful Podcast*, I interviewed [Bytebuddy founder Rafael Winterhalter](https://spring.io/blog/2019/10/18/a-bootiful-podcast-bytebuddy-founder-rafael-winterhalter). Check it out!
-   [Spring Security OAuth 2.3.7, 2.2.6, 2.1.6, 2.0.19 Released](https://spring.io/blog/2019/10/17/spring-security-oauth-2-3-7-2-2-6-2-1-6-2-0-19-released)
-   [Spring Cloud Stream - functional and reactive](https://spring.io/blog/2019/10/17/spring-cloud-stream-functional-and-reactive)
-   [Simple Event Driven Microservices with Spring Cloud Stream](https://spring.io/blog/2019/10/15/simple-event-driven-microservices-with-spring-cloud-stream)
-   Spring founder and Atomist CEO Rod Johnson ([@SpringRod](http://twitter.com/springRod)) blogs about the journey of Spring in this blog, [*Eighteen Years of Spring*](https://blog.atomist.com/eighteen-years-of-spring/). This was a followup to his [epic talk at SpringOne Platform 2019](https://www.youtube.com/watch?v=ukx9ykof03q&feature=share) talk of the same name.
-   The Spring Cloud Gateway RSocket module [have been moved to `spring-cloud-incubator` pending the completion of the `rsocket-java` support for routing and forwarding](https://github.com/spring-cloud/spring-cloud-gateway/issues/1366)
-   A third party [MySQL R2DBC implementation, supporting v.0.8.0 of the SPI, is available](https://github.com/mirromutth/r2dbc-mysql). Thanks, Mirro Mutth!
-   A nice talk by Axon founder Allard Builjze, [*Event driven microservices with Axon and Spring Boot*](https://www.youtube.com/watch?v=ivad3mdwvx4&feature=share)
-   Somebody recently asked me I planned on doing a talk about Hexagonal Architecture with Spring Boot. I had no plans. Someone else responded with this [great talk from Spring I/O by Tom Hombergs](https://youtu.be/cPH5AiqLQTo)
-   Wow! There's a new feature in IntelliJ IDEA, ["Support for Reactor Debug mode," and it is *awesome*!](https://twitter.com/bsideup/status/1185252220587126784)
-   There's a great piece by Tim van Baarsen answering the question, [What’s new in Spring Boot 2.2?](https://medium.com/@TimvanBaarsen/whats-new-in-spring-boot-2-2-dab550f664bb)
-   [SpringOne Platform 2019 was amazing and the videos are up!](https://www.youtube.com/playlist?list=PLAdzTan_eSPRlQ8t4TU5c-AB4SHV939M6) I'll be introducing some of them here.
-   Check out Christopher Strobl's talk [on "What's New in Spring Data Moore"](https://twitter.com/SpringData/status/1185160145065725952)
-   Did you know that the fat-jar plugin that Spring Boot ships to envelope your Java application's `.jar`s inside another `.jar` was originally called, wait for it, [Binks](https://github.com/philwebb/binks)?
-   I like this post in The Register, [*Created to mimic Heroku, Cloud Foundry explained by its chief technology officer*](https://www.theregister.co.uk/AMP/2019/09/18/cloud_foundry/?__twitter_impression=true)
-   Event-Driven Java Applications with Redis 5.0 Streams, [another great SpringOne Platform 2019 talk, this one by Mark Paluch](https://www.youtube.com/watch?v=Gmwh-tUr_1E&feature=youtu.be)
-   [Spring Data team member Jens Schauder's SpringOne Platform 2019 talk on Spring Data JPA is now up](https://twitter.com/SpringData/status/1184765032195907584)
-   [Josh Long at SpringOne Platform 2019 - YouTube](https://www.youtube.com/watch?v=qFT93y2n_3M&list=PLAdzTan_eSPRlQ8t4TU5c-AB4SHV939M6&index=37&t=0s)
-   The Spring Initializr, the library that powers [start.Spring.io](http://start.spring.io), just had its [first release hitting Maven Central](https://twitter.com/springcentral/status/1184754537665630208)
-   [The 2019 Java Developer RoadMap](https://javarevisited.blogspot.com/2019/10/the-java-developer-roadmap.html?m=1)
-   [The DO’s and DON’T’s of Reactive Programming - what a treasure!](https://www.youtube.com/watch?v=0rnMIueRKNU)
-   [Building Resilient applications with Resilience4J](https://www.youtube.com/watch?v=NHVxrLb3jFI&t=1560s)
-   [Feature flipping for Java, a very cool talk!](https://www.youtube.com/watch?v=r2vs20QLVw8&t=65s)
-   I loved this talk on [R2DBC](https://www.youtube.com/watch?v=xQEJFUPeQ_8)
-   [The state of Kotlin In Spring](https://www.youtube.com/watch?v=j2OEtSO2gvM&t=286s)
-   [The new power source for PayPals JVM Framework](https://www.youtube.com/watch?v=khzC-VwpFVM&t=39s)
-   [13 Stream Processing Patterns for building Streaming and Realtime Applications | My views of the World and Systems](https://iwringer.wordpress.com/2015/08/03/patterns-for-streaming-realtime-analytics/)
-   Richard Seroter has a great post on [fronting web sites, a classic .NET app, and a serverless function with Spring Cloud Gateway](https://seroter.wordpress.com/2019/10/16/fronting-web-sites-a-classic-net-app-and-a-serverless-function-with-spring-cloud-gateway/)
-   [Did you see Spencer Gibb's SpringOne Platform 2019 keynote? Here it is!](https://www.youtube.com/watch?v=EMFcNBfRqWs)
-   The New Stack has a great interview with Pivotal VP Cornelia Davis [on Implementing CI/CD and what it means for Java-based programs](https://www.pscp.tv/w/1vAxRqzZqMZJl?t=7m9s)
-   I liked this [introduction to Spring Cloud Contact](https://diegolirio.wordpress.com/2019/10/22/spring-cloud-contract-pt-1/)
-   A fantastic Spanish-language talk on [Spring Cloud Contract by Spring community friend Eddú Meléndez](https://www.youtube.com/watch?v=sIiPVX_s0FI)
-   [Spring Cloud Gateway and RSocket](https://www.youtube.com/watch?v=pfbycn_eqhg&feature=share)
-   [Oded Shopen has a fantastic talk called Microservices are for humans, not machines](https://twitter.com/springcentral/status/1184451038364999681)
-   Check out this amazing talk by [Spencer Gibb and Cora Iberkleid introducing Spring Cloud Gateway and RSocket](https://www.youtube.com/watch?v=PfbycN_eqhg&t=2236s)
-   Love this episode of the Heavybit podcast, [Ep. #13, Cloud Wrangling with Natalie Bennett of Pivotal](https://www.heavybit.com/library/podcasts/o11ycast/ep-13-cloud-wrangling-with-natalie-bennett-of-pivotal)
-   A nice post from TechCrunch, [With Alibaba, Pivotal and Lightbend on board, Reactive flexes its ROI muscle in the microservices world](https://techcrunch.com/2019/10/15/with-alibaba-pivotal-and-lightbend-on-board-reactive-flexes-its-roi-muscle-in-microservices-world/amp/?__twitter_impression=true)
-   Adrian Cole, Tommy Ludwig and Narayanan Arunachalam [talk about distributed tracing in the wild](https://twitter.com/springcentral/status/1184269324233650177)
-   Check out what's new in the [Spring Cloud products for the Pivotal Platform](https://twitter.com/springcentral/status/1184269322576957445)
-   [Check out this amazing talk by Olga Maciaszek-Sharma on how to live in a post Spring Cloud world](https://twitter.com/springcentral/status/1184239169507336194)
-   A great *The New Stack* article from the Pivotal SpringOne Platform Keynote: [Is Kubernetes Boring Yet? - The New Stack](https://thenewstack.io/pivotal-springone-platform-keynote-overview-is-kubernetes-boring-yet/?_lrsc=d21a5b2f-fbd3-4d34-94d6-c40f5e5a9b03)