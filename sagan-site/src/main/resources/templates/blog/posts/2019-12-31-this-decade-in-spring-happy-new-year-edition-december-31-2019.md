---
title: This Decade in Spring - Happy New Year Edition - December 31, 2019
source: https://spring.io/blog/2019/12/31/this-decade-in-spring-happy-new-year-edition-december-31-2019
scraped: 2026-02-23T14:16:41.257Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  December 31, 2019 | 1 Comment
---

# This Decade in Spring - Happy New Year Edition - December 31, 2019

_Engineering | Josh Long |  December 31, 2019 | 1 Comment_

Hi, Spring fans, and *HAPPY NEW YEAR*! Welcome to another, extra-special installment of This Week in Spring. Normally, when writing the first post after or before the new year, I chronicle the most important moments in the last year. This year, seeing as we're about to tip the scales and embark upon not just a new year but a new *decade*, I'm going to do my level headed best to distill the biggest and the best for the Spring ecosystem in the last decade. The problem I face in writing this isn't in coming up with things to mention, it's in limiting the number of things I mention!

Where does one even start? It's hard to believe we've come this far, as a community. Remember, the earliest pages of code in Spring date back to 2001, almost 19 years ago. Rod Johnson, the original creator of Spring, talked about Spring's progression over the last [almost two decades in this blog post - *18 Years of Spring*](https://blog.atomist.com/eighteen-years-of-spring/).

## [](#this-decade-in-spring)This Decade in Spring

Now, where do we begin?

-   **Spring Boot** - this one is pretty easy! Spring Boot is changing the world. When we on the Spring team announced the .4 release of Spring Boot back in 2013, none of us could have guessed how far it would go. It was an opinionated approach on Spring and the Java ecosystem it supports that embraces some of the best patterns from convention-over-configuration frameworks like Rails, Grails, Spring Roo and others while *also* not sacrificing flexibility. Spring Boot is now - by far - the most widely used JVM library in the JVM ecosystem save for Java itself. All the major-scale online services use it. It's been forged in the fires of production and the work, of late, has seen it go from being the most productive, powerful framework to being among the most performant frameworks. Who knows what the next decade will offer for the Spring developer, but I'll bet it builds upon Spring Boot.
-   **Spring Cloud** - if Spring Boot is an opinionated approach to building applications, Spring Cloud - which builds on Spring Boot - is an opinionated approach at building applications (microservices!) that are destined for the cloud. The cloud, for modern applications, *is* production. Spring Cloud leverages the same Spring Boot autoconfiguration and supports an opinionated approach to building applications.
-   **Java 8** - Java 8 came out in 2014 and revitalized the JVM. If it wasn't clear with Spring Boot that Java was the ecosystem to bet on, this release cinched it. It showed that there was life yet in this workhorse ecosystem and introduced tons of new language and runtime features. Suddenly, Java syntax looked a lot more like some of its more contemporary siblings. It's hard to underestimate how important Java 8 and deliver-new-features mindset the Java team has since embraced is to our ecosystem.
-   **The Death of the Application Server** - While Spring Boot wasn't the first to support alternative deployment models for JVM-based applications, it was the first to popularize it. It made clear that the application server, such as we knew them, were no longer relevant. Sure, you can run a Spring Boot application in an application server, but.... why? You gained nothing and sacrificed, clearly sacrificed, a considerable amount to do so. Now, keep in mind, Pivotal/VMware are, and have been, one of the major investors into Apache Tomcat, the most prolific application server, so the death of the application server was a self-inflicted wound. We're just fine with that. You can use Apache Tomcat, as a library, in Spring Boot, and millions already do. It's just that you don't have to. The HTTP server isn't the same as your runtime, and that's as it should be.
-   **Cloud Native Applications** - Spring Boot assumed the runtime responsibilities of the application server, where the cloud stepped in to deliver the platform-centric responsibilities that the application server never could. These two things - smart applications powered by Spring Boot and smart platforms like Cloud Foundry and Kubernetes - have ushered in a new era of Cloud Native Java applications, a topic I love so much I wrote a book on it!

## [](#this-week-in-spring)This Week in Spring

Alright my friends, we've come a long way so let's get to it!

-   [Pivotal is now officially part of VMware](https://twitter.com/pivotal/status/1211642643853258752)!
-   [Microsoft's Jialin Dai on the various Spring for Azure Starters](https://spring.io/blog/2019/12/27/microsoft-s-jialin-dai-on-the-various-spring-for-azure-starters)
-   [Getting Started with Spring Cloud DataFlow and Confluent Cloud](https://www.solstice.com/fwd/spring-cloud-dataflow-confluent-cloud)
-   [Baeldung has a nice post on one of the other most important things to come out of the last decade for the average Spring developer: color ASCII art banners!](https://www.baeldung.com/spring-boot-color-banner)
-   [This Practical Guide](https://www.marcobehler.com/guides/java-microservices-a-practical-guide) looks at using Spring Boot and Spring Cloud for microservices.
-   [Applying CI/CD to Java Apps Using Spring Boot - DZone Java](https://dzone.com/articles/applying-cicd-to-java-apps-using-spring-boot)
-   Check out the talk that Google's James Ward, Okta's Matt Raible and I gave at SpringOne Platform 2019: [From Idea to Dev to Ops](https://www.infoq.com/presentations/simplicity-spring-cloud-services/)
-   [This is a nice post on using Reislience4J and Spring Cloud CircuitBreaker](https://mromeh.com/2019/12/26/spring-cloud-gateway-with-resilience4j-circuit-breaker/)
-   [I love this post introducing the `Flow` concept in Kotlin](https://medium.com/@shelbyc0hen/what-the-flow-c707da1c3903)
-   Did you see the amazing Christmas-themed [Spring Initializr](https://twitter.com/oodamien/status/1209535981222842369?s=12)? :D
-   There are a ton of new features [in Java 14 and you should check them out](https://www.infoq.com/news/2019/12/java14-feature-freeze/?itm_source=infoq&itm_medium=popular_widget&itm_campaign=popular_content_list&itm_content=)

And, finally, my friends, it's the end of the year. It's new years day already in some parts of the world as I post this. I want to remind those of you who haven't crossed the date line to not drinkn and code and not drink and drive. It's dangerous out there. Stay safe, get a car home from tonight's festivities if there's even a moment of doubt. And, of course, to every one, everywhere, HAPPY NEW YEAR!