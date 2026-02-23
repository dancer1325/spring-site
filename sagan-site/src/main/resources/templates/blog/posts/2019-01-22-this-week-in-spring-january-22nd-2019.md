---
title: This Week in Spring - January 22nd, 2019
source: https://spring.io/blog/2019/01/22/this-week-in-spring-january-22nd-2019
scraped: 2026-02-23T15:00:10.100Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  January 22, 2019 | 0 Comments
---

# This Week in Spring - January 22nd, 2019

_Engineering | Josh Long |  January 22, 2019 | 0 Comments_

Hi Spring fans and welcome to another installment of *This Week in Spring*! This week I'm off to pleasant Pittsburgh, PA to speak at, among other places, [DICK's Sporting Goods](https://www.meetup.com/DICKS-Sporting-Goods-Tech-Talk-Thursdays/events/256576574/?_xtd=gqFyqTI1ODU5NTQxNqFwo3dlYg&from=ref). Join me!

Now that my entire six part series introducing how to use **Spring Boot with Microsoft Azure** just concluded, with the last parts being released in this last week, I wanted to give you the whole thread here for your consumption.

-   [Bootiful Azure: Taking Your First Steps with Microsoft Azure (1/6)](https://spring.io/blog/2019/01/03/bootiful-azure-taking-your-first-steps-with-microsoft-azure-1-6)
-   [Bootiful Azure: SQL-based data access with Microsoft SQL Server (2/6)](https://spring.io/blog/2019/01/07/bootiful-azure-sql-based-data-access-with-microsoft-sql-server-2-6)
-   [Bootiful Azure: Global Scale Data Access with CosmosDB (3/6)](https://spring.io/blog/2019/01/10/bootiful-azure-global-scale-data-access-with-cosmosdb-3-6)
-   [Bootiful Azure: Integration with Azure Service Bus (4/6)](https://spring.io/blog/2019/01/14/bootiful-azure-integration-with-azure-service-bus-4-6)
-   [Bootiful Azure: Object Storage Service (5/6)](https://spring.io/blog/2019/01/17/bootiful-azure-object-storage-service-5-6)
-   [Bootiful Azure: To Production! (6/6)](https://spring.io/blog/2019/01/21/bootiful-azure-to-production-6-6)

I also did a similar eight part series on using **Spring with Google Cloud Platform** a while back. Check that out here. There are eight posts in the series. Here they all are:

-   [Bootiful GCP: Getting Started with Spring Cloud for Google Cloud Platform (1/8)](https://spring.io/blog/2018/08/20/bootiful-gcp-getting-started-with-spring-cloud-for-google-cloud-platform-1-8)
-   [Bootiful GCP: Relational Data Access with Spring Cloud GCP (2/8)](https://spring.io/blog/2018/08/23/bootiful-gcp-relational-data-access-with-spring-cloud-gcp-2-8)
-   [Bootiful GCP: Globally Consistent Data Access with Spanner (3/8)](https://spring.io/blog/2018/08/27/bootiful-gcp-globally-consistent-data-access-with-spanner-3-8)
-   [Bootiful GCP: Integration with Google Cloud Pub/Sub (4/8)](https://spring.io/blog/2018/08/30/bootiful-gcp-integration-with-google-cloud-pub-sub-4-8)
-   [Bootiful GCP: Runtime Configuration with Spring Cloud GCP Runtime Config (5/8)](https://spring.io/blog/2018/09/03/bootiful-gcp-runtime-configuration-with-spring-cloud-gcp-runtime-config-5-8)
-   \[Bootiful GCP: Supporting Observability with Spring Cloud GCP Stackdriver Trace (6/8)

\]([https://spring.io/blog/2018/09/06/bootiful-gcp-supporting-observability-with-spring-cloud-gcp-stackdriver-trace-6-8](https://spring.io/blog/2018/09/06/bootiful-gcp-supporting-observability-with-spring-cloud-gcp-stackdriver-trace-6-8))

-   \[Bootiful GCP: Use Spring Cloud GCP to Connect to Other GCP Services (7/8)

\]([https://spring.io/blog/2018/09/10/bootiful-gcp-use-spring-cloud-gcp-to-connect-to-other-gcp-services-7-8](https://spring.io/blog/2018/09/10/bootiful-gcp-use-spring-cloud-gcp-to-connect-to-other-gcp-services-7-8))

-   [Bootiful GCP: To Production! (8/8)](https://spring.io/blog/2018/09/13/bootiful-gcp-to-production-8-8)

Now, let's get back to our regularly scheduled programming and review all the other, really amazing content on the internet.

-   I liked this post from the good Dr. Dave Syer on [Manual Bean Definitions in Spring Boot](https://spring.io/blog/2019/01/21/manual-bean-definitions-in-spring-boot). In it, he looks at how to widdle down the number of objects in play in a Spring Boot application in order to acheive better performance. You could get non-trivial Spring Boot applications down below 1s startup times, whre they belong!
-   Last week I released the latest installment of my podcast, A Bootiful Podcast, and this time my interview was [with Google Developer Advocate Ray Tsang](https://spring.io/blog/2019/01/18/a-bootiful-podcast-an-interview-with-google-developer-advocate-ray-tsang). Ray has been a friend to the Spring community and I wanted to highlight his work here. Are you already a subscriber? You can be! Listen to the Podcast on [SoundCloud](https://soundcloud.com/a-bootiful-podcast/google-developer-advocate-ray-tsang) or on [iTunes](https://itunes.apple.com/us/podcast/a-bootiful-podcast/id1438691771?mt=2), among other places. If you like it, *please* leave a nice review on iTunes. It really helps the podcast. Thanks.
-   Last week I also released my latest installment of Spring Tips, this time looking at [JavaFX](https://spring.io/blog/2019/01/16/spring-tips-javafx). "JavaFX!" I hear you cry. I know, but trust me - it's awesome. If you're going to build a native desktop application (granted, that's a big *if*) then JavaFX is a very credible way to do so and it plays rather nicely with Spring. Not much required to make it work, either. It's as if the folks working on JavaFX saw fit to build it to be flexible enough to support integration with other technologies. Wonderful.
-   A friendly reminder that Spring Data auto-derived queries are exceptions, not the rules. [Use `@Query`, please](https://twitter.com/SpringData/status/1087791586149314560)
-   You know who I loved working with and who I'll miss now that he's leaving Pivotal? [My friend Josh Mckenty (@jmckenty).](https://twitter.com/jmckenty/status/1087423107944443906). He's a fellow Python-programmer, and a Cloud Foundry fan. He and I did a wonderful video, [Cloud Foundry Livelessons](https://www.oreilly.com/library/view/cloud-foundry-livelessons/9780134836126/), that to this day ranks among my favorites. It is *so* ambitious and *so* dense! Farewell, better Josh, and thank you.
-   Thomas Darimont just upgraded an example application using the Spring Boot Admin with Keycloak to the latest [Spring Boot version 2.1.2.RELEASE](https://github.com/thomasdarimont/spring-boot-admin-keycloak-example)
-   [PKS, Pivotal's Kubernetes Service, now runs on Azure!](https://content.pivotal.io/blog/pks-azure-multi-cloud-kubernetes?_lrsc=760e1aed-b496-4a4b-a63c-b2a2f8bd54cf&utm_source=employee-social&utm_medium=twitter&utm_campaign=employee_advocacy)
-   Thanks to Java Champion and industry legend [Trisha Gee](https://twitter.com/trisha_gee/status/1087632992602857472?s=12) for pointing me to this thread for advice to give to young, impressionable programmers beginning their journey.
-   This has very little to do with Spring, per se, but [Mario Gray](http://Twitter.com/MarioGray) and I got Java editing and Asciidoctor editing working in `emacs` yesterday and documented it here: [Getting Emacs Ready for Writin', Part 1](http://joshlong.com/jl/blogPost/emacs-pt-1.html)
-   PicoCLI, a library for building command-line applications on the JVM, [now supports Spring Boot](https://twitter.com/picocli/status/1087251260707729408?s=12).
-   Unsurprisingly, Java still dominates the [TIOBE language rankings](https://twitter.com/elderjava/status/1086293944886022144?s=12)
-   Thanks to Olga Maciaszek we have [XML support in Spring Cloud Contract!](https://github.com/spring-cloud/spring-cloud-contract/pull/855)
-   (Reactive) Spring Data engineer Mark Paluch does an amazing job in identifying [a "Reactive Programmming Maturity Model" in this Tweet](https://twitter.com/mp911de/status/1086240112135077895). Brilliant!
-   Working towards your Spring Core Professional certification? [Check out these resources](https://twitter.com/springcentral/status/1086284839114997760)
-   Laszlo Csontos has a nice example of [using Twitter4J together with Spring Integration](https://twitter.com/craftingjava/status/1048241529968574464?s=12)
-   Don't miss January 29th's [application security and OAuth webinar](https://twitter.com/springcentral/status/1085917418101166080)
-   [Want to see a WebMVC.fn similar to Webflux.fn in Spring Framework? Vote for this issue](https://github.com/spring-projects/spring-framework/issues/21490)
-   We could use your [feedback on Spring Cloud Task](https://twitter.com/springcloud/status/1085574805431242752)
-   Many years ago I created the first pull-request for what was then only a mirror of the Spring Framwork on Github, a thing that [Rashidi Zin noticed on Twitter.](https://twitter.com/shidi/status/1085512615063769088?s=12) Now, keep in mind, I am *by no means* the first person to send a fix or patch or changeset or anything of the sort to Spring Framework. Just the first to do so on Github, which has only been a thing for the last few years. Spring's been around in some form or another, on CVS, Subversion, Git and now - just recently - on Github for closer to twenty years.
-   The Codecentric [Spring Boot Admin 2.1.2 has been released!](https://twitter.com/joshiste/status/1085136545504522242?s=12) It now supports Dischord, thanks to a contribution from the community.