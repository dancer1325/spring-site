---
title: Announcing Spring Framework 4.0 GA Release
source: https://spring.io/blog/2013/12/12/announcing-spring-framework-4-0-ga-release
scraped: 2026-02-24T07:49:04.450Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Adrian Colyer |  December 12, 2013 | 3 Comments
---

# Announcing Spring Framework 4.0 GA Release

_Releases | Adrian Colyer |  December 12, 2013 | 3 Comments_

The Spring Framework re-invented enterprise Java in the last decade, becoming the dominant programming model in enterprise Java. Today we are releasing Spring Framework 4.0, a brand new major version of Spring that keeps Spring at the cutting edge of modern Java development. Together with the rest of the upcoming Spring IO Platform, Spring Framework 4.0 is positioned to empower the next decade of JVM based innovation, responding to, and setting trends in Developer Productivity, Big Data, Cloud, REST, and Micro Service Architecture.

Spring Framework 4.0 works beautifully with Java 8 and also allows applications to be written partially or entirely in Groovy, a concise dynamic language on the JVM. Spring Framework 4.0 also provides the foundation for new advances in the Spring IO platform such as Spring Boot. Spring Boot nearly eliminates initial configuration work altogether. Developer productivity options like these are typically associated with single-purpose frameworks that are limited in scope and simply do not offer the breadth, depth, and years of battle-tested production usage that Spring offers.

A major goal of Spring IO is to make Java a leader in developer productivity via components like Spring Boot. Edward Hieatt, at the SpringOne 2GX 2013 conference keynote, had some great remarks about Boot: “The bar for developer happiness and intolerance of boilerplate code has been set very high at Pivotal Labs, which historically has done a lot of Ruby on Rails development, our Ruby on Rails developers who use Spring Framework 4.0 with Spring Boot are impressed with its productivity and ability to address a wide range of scenarios on a single programming model.” Edward Hieatt is the chief operating officer at Pivotal Labs, who built the spring.io website using Spring Framework 4.0 and Spring Boot, among other technologies.

**Modernization**

Spring Framework 4.0 offers 1st class Java 8 support now, based on the pre-release Java 8 builds, and will be immediately production-capable once OpenJDK 8 is GA in March 2014. Spring Framework 4.0 doesn’t just run on Java 8, it makes it really easy and natural to leverage new language features such as Lambdas, method references, JSR-310 date and time, and repeatable annotations. The framework also has been updated to work with the latest versions of popular open source libraries like Hibernate, Quartz, and EhCache.

**New application architectures**

Industry leaders such as Amazon, Google, Facebook and many others have already moved away from monolithic Java architecture, in favor of micro-service architecture (MSA) and REST - often moving presentation logic to the client tier. This important trend in [decomposing applications](https://www.youtube.com/watch?v=OY7QGDg93Ic), using [RESTful principles](/blog/2013/12/02/springone2gx-2013-replay-rest-ful-api-design), is similar to traditional SOA only in concept, but we agree with those that feel that it deserves to be called something different.

James Lewis wrote a popular InfoQ [presentation](http://www.infoq.com/presentations/Micro-Services) where he articulated some key characteristics of a micro service that we agree with:

-   Each application only does one thing
-   Small enough to fit in your head
-   Small enough that you can throw them away
-   Embedded web container
-   Packaged as a single executable jar
-   Use HTTP and HATEOAS to decouple services
-   Each app exposes metrics about itself

The core Spring Framework is looking ahead into this micro-service future, with both direct and foundational support. REST is a 1st class citizen across Spring, reflected in the core 4.0 framework with Spring MVC as well as Spring IO platform components like Spring Boot, Spring HATEOAS, Spring Security, Spring Social, and Spring Data. With Spring Framework 4.0, developers can create more reactive event-driven REST services, using the new non-blocking AsyncRestTemplate together with Java language features like Futures.

Spring Boot, which builds on Spring Framework 4.0’s @Conditional bean definition infrastructure, offers a “containerless” (embedded) runtime for REST based micro services, the ability to package as a single executable JAR, in addition to other lightweight capabilities - around exposing metrics for itself, for example.

Reactive, event-driven applications are also enabled by Spring Framework 4.0’s leading support for HTML5/WebSocket RFC 6455/JSR-356. Spring’s WebSocket support provides the essential protocol fallback mechanisms that are required by today’s network topologies. More importantly, it provides a foundation for building WebSocket-style messaging architectures for use in web applications. That foundation integrates STOMP, Spring MVC, and lightweight, client side message brokers like msgs.js or full-blown server side message brokers like RabbitMQ. Also, the core message and channel abstractions from Spring Integration are now included in Spring Framework 4.0 to support server side messaging.

**Debunking myths**

Many who are unfamiliar with recent versions associate Spring closely with XML, but it has long offered a rich, annotation - driven programming model. This model was introduced in Spring Framework 3, and is being further refined in Spring Framework 4. Looking across both releases, the model offers capability like:

-   Custom annotations through composition
-   Configuration classes and factory methods
-   Spring Expression Language
-   Flexible MVC/REST controller style
-   Declarative validation and formatting
-   Declarative scheduling and caching

Also, Java Configuration is widely supported across Spring Projects, including the core framework, as another alternative to XML and Annotation driven configuration.

**Working with the JCP**

The Spring approach to Java EE support is reflected in Spring Framework 4.0’s innovations around configuration, WebSocket, DI, Batch, etc. For relevant Java EE specifications Spring collaborates in the JCP to define, and then works to exceed the related JSR specification. Pivotal has been an active collaborator in the JCP around key Java EE 7 features like WebSocket, and directly inspired the batch JSR with Spring Batch. Java EE 7 also introduced some revisions to their JMS, JTA, JPA, and Bean Validation specifications that Spring is supporting.

The evolution of Spring goes far beyond what is addressed here in the core Spring Framework. A modular micro-platform is needed to address future architectures, trends, and technologies; something to enable new features, yet retain a lightweight footprint. Spring Framework 4.0 is a critical element of the Spring IO platform. The other Spring IO platform components compliment Spring Framework 4.0 in that they address modern trends in Hadoop and NoSQL, batch processing, enterprise integration patterns, and reactive/event-driven application development. These options allow micro services to be developed with just the dependencies that are required for the job, while maintaining a consistent, but simple POJO programming model.

Spring Framework 4.0 is open source and available at no charge under an Apache 2.0 license. We encourage you to use Maven or Gradle, and coordinates can be obtained from the [spring.io website](/).

**Learning more, or getting your hands dirty**

The Spring Framework project page is always a great start. But we’ve worked hard on new guides to accompany the launch of the Framework. In keeping with our philosophy of “let’s build a better enterprise” we’ve developed these getting started guides with a few principles:

-   Be the simplest possible example , not the “best”, as that is subjective
-   Use the most up-to-date Spring best practices
-   Do not give in to the temptation to become a full-blown tutorial, keep those separate
-   Make assumptions. Separate underlying concepts into linked, distinct documents
-   Stay task oriented, use case-oriented, explain things beyond Spring when relevant
-   Above all, be a resource that experts and beginners alike can appreciate

We’ve launched many new guides in celebration of the Spring Framework 4.0 release. We hope you enjoy them!

https://spring.io/guides/gs/messaging-stomp-websocket/  
https://spring.io/guides/gs/consuming-rest-angularjs/  
https://spring.io/guides/gs/consuming-rest-backbone/  
https://spring.io/guides/gs/consuming-rest-jquery/  
https://spring.io/guides/gs/consuming-rest-restjs/  
https://spring.io/guides/gs/consuming-rest-sencha/  
https://spring.io/guides/gs/consuming-rest-ios/  
https://spring.io/guides/gs/rest-service-cors/  
https://spring.io/understanding/cors  

This compliments the other [guides](/guides) already available at spring.io, with more to come. In depth, 90-minute talks are starting to get published on our YouTube channel from SpringOne2GX 2013, as well as many 60 minute webinar replays on a variety of topics.

We hope you enjoy the release, and want to hear your feedback about how you use Spring to build a better enterprise.