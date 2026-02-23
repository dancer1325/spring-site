---
title: This Week in Spring - September 15th, 2020
source: https://spring.io/blog/2020/09/16/this-week-in-spring-september-15th-2020
scraped: 2026-02-23T13:47:56.831Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  September 16, 2020 | 0 Comments
---

# This Week in Spring - September 15th, 2020

_Engineering | Josh Long |  September 16, 2020 | 0 Comments_

Hi, Spring fans! Welcome to another installment of *This Week in Spring*! It's been an absolutely nutty week! It's *just* Tuesday and I'm beat!

Over the weekend I completely refactored the pipeline I used for my just-published book [*Reactive Spring*](http://ReactiveSpring.io) (which, by the way, is now available on Leanpub and on Amazon as digital and paperback editions) and turned it into the turnkey Asciidoctor pipeline I'd always wanted but - since I was traveling 650,000 miles a year, speaking at hundreds of conferences or events yearly, writing a 450-page book, releasing weekly blogs, recording a weekly podcast, releasing an almost weekly screencast and, you know, being a member of a wonderful family - I just didn't have the time to do. I'd managed to get a Spring Boot-ified Asciidoctor pipeline working. It worked. It produced `.epub`, `.mobi`, screen-ready `.PDF`, prepress-ready `.PDF`, and HTML versions on every `git push`. But everything was serialized. It was *slow*. And inflexible since I got the absolute basic flow working for my needs and nothing more. That all changed this weekend. I present to you `http://bootiful-asciidoctor.github.io`. It's all Apache2 licensed open-source. It's a Spring Boot and Spring Batch pipeline. You can deploy the Spring Batch job to your favorite Ci environment and tell it which Git repositories contain your `.adoc` files and which contain the code you need to be included. You tell it how you want your produced artifacts - Amazon S3 or checked into a Git repository's branch - and it'll emit those. It's delivered as a Spring Boot autoconfiguration, too, so it publishes events and everything is overridable as `@Bean` instances. I am hoping that if folks like it, they'll feel the urge to write their own technical books, and perhaps even some on Spring :-)

What else? I recorded a few episodes of *A Bootiful Podcast*. Fun. Always fun.

Oh! This morning I was on the Microsoft Learn TV conference introducing Azure Spring Cloud along with a bunch of awesome folks from Microsoft and all around the world. That was fun - look for those recordings to be available soon.

And I spent today pre-recording a talk - *Bootiful Kotliin* - intended for the [J4k.io](http://j4k.io) conference next month. It took literally 50m to record the talk, and 12h to finesse everything with Adobe Premiere and Adobe Auditon and Adobe InDesign, and Adobe Photoshop so that it worked as I hoped it would. What a journey! But it's done. And a grateful GPU thanks me.

And of course, there's the preparation for this amazing week that was. Just look at this list of good stuff! I don't even know where to... yes I do. That's a fib. I totally know where to start. At the first entry! And the first entry of course is the interview I did with Spring legend and amazing human being Rossen Stoyanchev. He's been an integral part of the Spring team for as long as I can remember and more. He's everything I love about people and about Spring. A modest, patient, friendly genius. You know him - even if you don't *know* him - if you've ever used Spring to do any kind of web programming. Yep. He's *that* prolific. Trust me, you're going to want to listen to that episode. It was one of those episodes where I went back for a re-listen! I was there the first time and I still feel like I missed stuff.

Anyway my friends, there is a ton of stuff to get to, so let's get to it!

-   [A Bootiful Podcast: Legendary Spring contributor Rossen Stoyanchev on all things web, reactive and RSocket](https://spring.io/blog/2020/09/10/a-bootiful-podcast-legendary-spring-contributor-rossen-stoyanchev-on-all-things-web-reactive-and-rsocket)
-   [Java 15 went GA today](https://jdk.java.net/15/)! This means that text blocks are officially a thing! They're not hidden behind the preview-feature flags! Get the bits while they're hot!
-   [Announcing the Inside Java Podcast](https://inside.java/2020/09/15/announcing-inside-java-podcast/)
-   [Azure in the Enterprise: Azure Cosmos DB and Spring Boot](https://spring.io/blog/2020/09/14/azure-in-the-enterprise-azure-cosmos-db-and-spring-boot)
-   [Azure in the Enterprise: Azure Service Bus and Spring Boot](https://spring.io/blog/2020/09/09/azure-in-the-enterprise-azure-service-bus-and-spring-boot)
-   [Case Study: Relational Database Source and File Sink](https://spring.io/blog/2020/09/10/case-study-relational-database-source-and-file-sink)
-   [Deploy Friday: E09 Spring Framework - Java in focus - YouTube. Did I mention I was on the "Deploy Friday" show not too long ago? The video is up!](https://www.youtube.com/watch?reload=9&v=Y5dcDyeRlDQ&feature=youtu.be)
-   [Enhancing Software Update Security With TUF (The Update Framework)](https://blogs.vmware.com/opensource/2020/09/10/tuf-enhancing-software-update-security/)
-   [Episode 3 “The State of Java” with Georges Saab](https://inside.java/2020/09/14/podcast-003/)
-   [JEP proposed to target JDK 16: 387: Elastic Metaspace](https://inside.java/2020/09/10/elastic-metaspace-jep-proposed-to-target/)
-   I presented at my talk *Bootiful Testing* for the [JetBrains Technology Day for Java](https://blog.jetbrains.com/idea/2020/09/jetbrains-technology-day-for-java-bootiful-testing/) and Jetbrains did a nice recap blog on the talk.
-   [Microsoft Announces the General Availability of Azure Spring Cloud](https://www.infoq.com/news/2020/09/azure-spring-cloud-ga/?itm_campaign=rightbar_v2&itm_source=infoq&itm_medium=news_link&itm_content=link_text)
-   [Spring Framework 5.2.9, 5.1.18, 5.0.19, and 4.3.29 available now](https://spring.io/blog/2020/09/15/spring-framework-5-2-9-5-1-18-5-0-19-and-4-3-29-available-now)
-   [Spring Framework 5.3 goes RC1](https://spring.io/blog/2020/09/15/spring-framework-5-3-goes-rc1)
-   [Spring Security 5.4 goes GA](https://spring.io/blog/2020/09/10/spring-security-5-4-goes-ga)
-   [Spring Vault 2.3 M1 available](https://spring.io/blog/2020/09/15/spring-vault-2-3-m1-available)
-   [The Path Towards Spring Boot Native Applications - YouTube](https://www.youtube.com/watch?v=Um9djPTtPe0)
-   [The arrival of Java 15](https://inside.java/2020/09/15/the-arrival-of-java-15/)
-   [Toshiaki Maki on Twitter: "? rsc 0.6.0 has been released https://t.co/fww8PQ80ap ? Authentication Extension is supported!! @RSocketIO @SpringSecurity https://t.co/FugKJwAzhB Demo: https://t.co/gTNpN39mu8 Try: brew install making/tap/rsc" / Twitter](https://twitter.com/making/status/1305869573548376070)
-   [You spoke, we listened: State of Spring 2020 report is here!](https://spring.io/blog/2020/09/11/you-spoke-we-listened-state-of-spring-2020-report-is-here)