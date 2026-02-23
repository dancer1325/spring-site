---
title: This Week in Spring - March 14th, 2017
source: https://spring.io/blog/2017/03/14/this-week-in-spring-march-14th-2017
scraped: 2026-02-23T16:37:01.447Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  March 14, 2017 | 0 Comments
---

# This Week in Spring - March 14th, 2017

_Engineering | Josh Long |  March 14, 2017 | 0 Comments_

Welcome to another installment of *This Week in Spring*! This week I'm in Chicago on business and preparing for next week, where [I'll be at the first Devoxx US event, ever!](http://devoxx.us/). I hope to see you there!

-   last week, I continued the *Spring Tips* series with a look at how to [implement server-sent events using *classic* Spring MVC and Spring WebFlux in Spring Framework 5](https://spring.io/blog/2017/03/08/spring-tips-server-sent-events-sse), due this summer
-   Last week, Pivotal and Google announced [Kubo](https://content.pivotal.io/announcements/meet-kubo-bosh-powered-web-scale-release-engineering-for-kubernetes), the ability to [run and manage Kubernetes, on top of BOSH, alongside Cloud Foundry.](http://www.infoworld.com/article/3179753/cloud-computing/pivotal-google-team-up-for-kubernetes-cloud-management.html) This means that it's now possible to get support for both Pivotal Cloud Foundry and Kubernetes deployments, supporting cloud native applications and low-level container orchestration equally.
-   Spring I/O Platform lead Andy Wilkinson announced [Spring I/O Platform Brussels SR1](https://spring.io/blog/2017/03/07/spring-io-platform-brussels-sr1) and [Spring I/O Platform Athens sr4](https://spring.io/blog/2017/03/07/spring-io-platform-athens-sr4)
-   Disid has just announced an [Spring Roo 2.0.RC1](https://spring.io/blog/2017/03/07/spring-roo-2-0-rc1-released)
-   Spring I/O Platform lead Andy Wilkinson just announced an updated revision [of the dependency management plugin Platform](https://spring.io/blog/2017/03/09/dependency-management-plugin-1-0-1-release)
-   Spring Integration ninja Artem Bilan just announced an [updated revision of the Spring Integration extension for AWS](https://spring.io/blog/2017/03/09/spring-integration-extension-for-aws-1-1-0-m1-available)
-   Spring Cloud ninja [Ryan Baxter just announced Spring Cloud Camden SR6](https://spring.io/blog/2017/03/10/spring-cloud-camden-sr6-is-available)
-   Don't miss Michael Plod on Wednesday March 29th at 10:00am PT, he's going to talk about [Strategic (Domain Driven) Design with Spring Boot](https://spring.io/blog/2017/03/14/webinar-strategic-domain-driven-design-with-spring-boot)
-   Greg Turnquist has announced that all the [Spring guides are now updated to reflect usage with IntelliJ IDEA](https://twitter.com/gregturn/status/841378891545628675)
-   the Spring Security team is cooking up some amazing stuff for OAuth. Check out the [*super preliminary*, not-final-at-all look at what's coming](https://github.com/jgrandja/oauth2-samples)
-   MuleSoft and Pivotal partner to [support application networks between Pivotal Cloud Foundry and MuleSoft AnyPoint](https://blogs.mulesoft.com/biz/news/mulesoft-pivotal-announce-solution-to-build-application-networks-on-pivotal-cloud-foundry/)
-   The Baeldung blog has [a nice look at Spring LDAP](http://www.baeldung.com/spring-ldap)
-   [BOSH](http://bosh.io/), for those that don't know, is an open source tool for release engineering, deployment, lifecycle management, and monitoring of distributed systems. It was developed by the Cloud Foundry team (many of whom were former Googlers) to support deploying Cloud Foundry itself. It's the package manager for *services*, not servers. It can be used to recreate entire distributed systems from the operating system up, with immutable infrastructure (as opposed to converged infrastructure options like Puppet or Chef). If you're managing a large distributed system, you *need* something like this beneath your system. You can also deploy arbitrary other packages, [like Apache JMeter in distributed mode](http://engineering.pivotal.io/post/jmeter-bosh-release/).
-   Also announced last week, Google's CRE support and reliability engineers and Pivotal have [tag-teamed to support and certify Pivotal Cloud Foundry running on Google Cloud](https://www.forbes.com/sites/alexkonrad/2017/03/08/google-cloud-brings-reliability-engineers-to-customers/#5c2aa1c05ab0). To appreciate why this is so important, it means that [Pivotal Cloud Foundry](http://fortune.com/2017/03/07/pivotal-cloud-foundry-growth/) - which is becoming [more and more white-hot](http://fortune.com/2017/03/07/pivotal-cloud-foundry-growth/) by the day - now bakes in Google's best practices for *site reliability engineering*, [as described here](https://medium.com/@jerub/tenets-of-sre-8af6238ae8a8#.ixagtgbqa).
-   Michael Gruczel put together a nice look at building [REST APIs with Spring Boot in this German language post](https://jaxenter.de/spring-boot-tutorial-54020)
-   I liked Stefan Pröll's [posts](https://blog.stefanproell.at/2017/03/10/hibernate-search-and-spring-boot/) introducing [using Hibernate Search and Spring Boot together](https://blog.stefanproell.at/2017/03/12/using-hibernate-search-with-spring-boot/)
-   Not particularly related to Pivotal, I enjoyed this post from Eric Brewer - father of the CAP theorem - [framing how CAP applies to Google's Spanner database](https://cloudplatform.googleblog.com/2017/02/inside-Cloud-Spanner-and-the-CAP-Theorem.html)
-   I really enjoyed [this JAX survey report detailing the frameworks in which people have the most interest](https://jaxenter.com/technology-trends-2017-top-frameworks-131993.html). Spring MVC and Spring Boot take the top spots in their respective categories. Thanks so much, Java community!
-   Check out this talk introducing Apache Geode [by Spring Data for Apache Geode contributors John Blum and Luke Shannon](https://dzone.com/articles/spring-data-and-in-memory-data-management-in-action)
-   Couchbase developer advocate Laurent Doguin put together a [nice look at testing Spring Data Couchbase applications with Test Containers and Spring](https://blog.couchbase.com/testing-spring-data-couchbase-applications-with-testcontainers/)
-   This Russian language [post by Alexander Kosarev nicely introduces Spring Data repository method tricks](https://alexkosarev.name/2017/02/09/spring-data-jpa-magic-methods/)
-   I liked Oracle senior application engineer Orlando L. Otero's post [on multi-version service discovery using Spring Cloud](http://tech.asimio.net/2017/03/06/Multi-version-Service-Discovery-using-Spring-Cloud-Netflix-Eureka-and-Ribbon.html#running-the-demo-service-2)
-   this was a *very* short-n-sweet look [at Spring Boot's DevTools and live-reload support](https://www.youtube.com/watch?v=nWR26lEHyCg)
-   Kevin Hooke put together a nice look at [using Spring Data Redis to build a search endpoint over REST](https://dzone.com/articles/building-a-spring-boot-restcontroller-to-search-re)
-   John Thompson put together a nice look [at using Spring Boot with Microsoft SQL Server](https://dzone.com/articles/configuring-spring-boot-for-microsoft-sql-server)
-   Oliver Antoine put together a nice [look at integration testing Spring Data Cassandra applications](https://www.arexo.be/blog/writing-integration-tests-spring-boot-cassandra-2-minutes/)
-   Check out the slides and [code](https://github.com/nfrankel/spring-boot-starter-xstream) to our friend Nicolas Frankel's talk, [Spring Boot Under the Hoode](https://www.slideshare.net/nfrankel/jdays-spring-boot-under-the-hood)
-   this Tech Primer video on using [Spring Data ElasticSearch seemed interesting](https://www.youtube.com/watch?v=bYiNlCaaRiI)
-   Iam Djalas looks at how to [configure Spring Boot to talk to different databases using profiles](https://www.youtube.com/watch?v=ZA9WpK-lxXM)
-   Auth0 has a nice post [on configuring Spring Boot to work with a third-party JWT implementation](https://auth0.com/blog/securing-spring-boot-with-jwts/)
-   to our friends at [Stormpath, congratulations on joining forces with Okta!](https://stormpath.com/blog/stormpaths-new-path)