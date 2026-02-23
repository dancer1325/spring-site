---
title: Spring Session (Core/MongoDB/Geode) 2.0.0.RC2 released!
source: https://spring.io/blog/2017/12/03/spring-session-core-mongodb-geode-2-0-0-rc2-released
scraped: 2026-02-23T16:12:51.133Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Greg L. Turnquist |  December 03, 2017 | 0 Comments
---

# Spring Session (Core/MongoDB/Geode) 2.0.0.RC2 released!

_Engineering | Greg L. Turnquist |  December 03, 2017 | 0 Comments_

Greetings Spring community,

In preparation for the soon-to-be GA release, Spring Session, Spring Session MongoDB, and Spring Session for Apache Geode and Pivotal GemFire have all aligned to versions 2.0.0.RC2 for this release.

In case you missed it, this is what’s included with each of the modules:

-   [Core](http://projects.spring.io/spring-session/) - includes support for Redis, JDBC, and Hazelcast
    
-   [MongoDB](https://github.com/spring-projects/spring-session-data-mongodb#spring-session-mongodb) - both traditional blocking as well as reactive support for MongoDB
    
-   [Apache Geode](https://github.com/spring-projects/spring-session-data-geode#spring-session-for-apache-geode) - support for Apache Geode as well as Pivotal GemFire (including the [PCC](https://docs.pivotal.io/p-cloud-cache/1-2/index.html) service with the [SSC](https://docs.pivotal.io/ssc-gemfire/index.html) extension on [PCF](https://pivotal.io/platform))
    

In this version, Spring Session has done some refactorings and minor tweaks in its APIs. There were minor breaking changes in some of the contracts, but nothing that impacts end users.

We are working toward a BOM (Bill of Materials) similar to several other Spring projects (like Spring Cloud and Spring Data). Once released, this will allow the versions of the store-specific solution you choose along with the version of Spring Session core to align. Stay tuned!

## [](#versions)[](#versions)Versions

Key supported libraries in Spring Session include:

-   Spring Framework 5.0.2.RELEASE
    
-   Project Reactor Bismuth-SR4
    
-   Spring Data Kay-SR2
    
-   Spring Security 5.0.0.RELEASE
    
-   Hazelcast 3.9
    
-   Lettuce driver 5.0.1.RELEASE
    

Spring Session MongoDB includes these additional dependencies:

-   MongoDB 3.5
    
-   MongoDB (reactive streams) 1.6.0
    

Spring Session for Apace Geode (& Pivotal GemFire) includes these additional dependencies:

-   Apache Geode 1.2.1
    
-   Pivotal GemFire 9.1.1
    

Feel free to give the bits a spin!

## [](#links)[](#links)Links

-   Spring Session (Core) - [Project Site](http://projects.spring.io/spring-session/) | [Reference](http://docs.spring.io/spring-session/docs/2.0.0.RC2/reference/htmlsingle/) | [Help](https://stackoverflow.com/questions/tagged/spring-session)
    
-   Spring Session MongoDB - [Project Site](http://projects.spring.io/spring-session-data-mongodb/) | [Reference](http://docs.spring.io/spring-session-data-mongodb/docs/2.0.0.RC2/reference/htmlsingle/) | [Help](https://stackoverflow.com/questions/tagged/spring-session+mongodb)
    
-   Spring Session for Apache GeodeGeode - [Reference](http://docs.spring.io/spring-session-data-geode/docs/2.0.0.RC2/reference/htmlsingle/) | [Help](https://stackoverflow.com/questions/tagged/spring-session+gemfire)
    

We hope to see you at [SpringOne Platform](https://springoneplatform.io/) this week. It will be packed with many Spring talks, opportunities to learn about the latest and greatest features and of course some previews about what we’re planning to do next.