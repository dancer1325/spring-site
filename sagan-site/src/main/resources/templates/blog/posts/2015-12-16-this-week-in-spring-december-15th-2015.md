---
title: This Week in Spring - December 15th, 2015
source: https://spring.io/blog/2015/12/16/this-week-in-spring-december-15th-2015
scraped: 2026-02-23T19:33:14.776Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  December 16, 2015 | 2 Comments
---

# This Week in Spring - December 15th, 2015

_Engineering | Josh Long |  December 16, 2015 | 2 Comments_

Wow! It's December 15th, friends; many of us on this planet will *soon* celebrate a new year! Hopefully, you've done a better job than I have of getting all my new year's resolutions finished in time for 2016! If you haven't, at least catching up on the latest and greatest in the Pivotal community won't be insurmountable! Let's see what's happened this week..

-   Greg Turnquist's epic blog series on using [Spring with React.js is now available online as a tutorial](https://spring.io/blog/2015/12/15/check-out-our-new-tutorial-react-js-and-spring-data-rest)
-   Spring Batch lead Michael Minella just announced [Spring Batch 3.0.6 which contains lots of great contributions and bug fixes from the community](https://spring.io/blog/2015/12/11/spring-batch-3-0-6-release-is-now-available)
-   the good Dr. David Syer put together a *very* [good look at Spring Boot's memory characteristics in various configurations](https://spring.io/blog/2015/12/10/spring-boot-memory-performance)
-   Spring RestDocs [lead Andy Wilkinson just announced Spring Rest Docs 1.0.1](https://spring.io/blog/2015/12/10/spring-rest-docs-1-0-1-release) which is maintenance release that includes a number of changes, including improved support for documenting attributes in XML payloads. An immediate
-   Spring Social lead Craig Walls [has been hard at work adapting Spring Social to a recent breaking change](https://spring.io/blog/2015/12/09/spring-social-facebook-2-0-3-released) in Facebook's Graph API which prevented connections and sign-in from working with Spring Social Facebook. In addition, the API binding has been adjusted to target Graph API v2.5.
-   Duncan Brown wrote a great look at [how to migrate Spring Data Neo4J 3.0 projects to the new 4.0 line](https://dzone.com/articles/do-not-publish-migrating-spring-data-neo4j-3x-to-4)
-   I *think* this Chinese-language [post introduces how to use Spring Boot](http://www.jianshu.com/p/a35b25f4c1ec), in which case - enjoy!
-   Couchbase's Simon Baslé put together a nice post on using Spring Data Couchbase and the various things it supports, [including the `Cache` abstraction and Spring Data repositories](http://blog.couchbase.com/2015/december/couchbase-spring-cache)
-   the *AppMite* blog has a neat introduction to standing up [a simple Spring Boot application to serve as the backend for a Backbone + Marionette-based JavaScript client](http://appmite.com/spring-with-backbone-marionette-hello-world/)
-   Marko Švaljek has put together a very cool post on handling stream [processing with Spring Boot, Kafka, and more](http://msvaljek.blogspot.com/2015/12/stream-processing-with-spring-kafka_44.html)
-   Duy Hai Doan, an Apache Cassandra evangelist at DataStax, put together a very [cool post on a sample application, *KillrChat*, based on Spring Boot, Cassandra, and more](https://academy.datastax.com/demos/getting-started-killrchat-example-data-model-messaging)
-   Want a [quick introduction to using Spring Boot and AOP](https://www.youtube.com/watch?v=3xrRIesGneg)?
-   Christoph Strobl's talk from SpringOne2GX 2015, [*Boot Your Search with Spring*](http://www.infoq.com/presentations/spring-boot-search), is now available online.
-   Learn about [Spring Boot 1.3's new support for colored banners](http://toedter.com/2015/12/13/creating-colorful-banners-for-spring-boot-applications/)
-   Recently, a friend of the community, [Craig Burke](https://twitter.com/craigburke1), made an [*epic* pull-request](https://github.com/spring-projects/spring-boot/pull/4647) after Spring Boot 1.3 debuted the aforementioned support for color banner ASCII art: a `Banner` implementation that *also* knows to look for `banner.jpg`, not just `banner.txt`! Seizing upon this, I created a simple Boot-based CLI and [a Cloud Foundry web service](http://bootiful-banners.cfapps.io/banners) whose [code are available online](http://github.com/joshlong/bootiful-banners) - thanks Craig!