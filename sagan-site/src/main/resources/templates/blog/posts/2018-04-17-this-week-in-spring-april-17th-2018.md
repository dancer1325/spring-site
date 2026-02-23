---
title: This Week in Spring - April 17th, 2018
source: https://spring.io/blog/2018/04/17/this-week-in-spring-april-17th-2018
scraped: 2026-02-23T15:27:18.337Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  April 17, 2018 | 1 Comment
---

# This Week in Spring - April 17th, 2018

_Engineering | Josh Long |  April 17, 2018 | 1 Comment_

Hi Spring fans! Welcome to another installment of *This Week in Spring*! This week I'm in Paris, France and I'll be in Mainz, Germany, next week for JAX and Linz, Austria for the DevOne event. If you're in any of these places then [don't hesitate to reach out](http://twitter.com/Starbuxman)!

We've got so much to cover so let's get to it!

-   Spring Cloud Task and Spring Batch [lead Michael Minella just announced Spring Cloud Task 2.0.0.RC1](https://spring.io/blog/2018/04/16/spring-cloud-task-2-0-0-rc1-is-now-available)
-   Artem Bilan looks [at what's new in the Spring Cloud GCP 1.0.0.M3 release](https://spring.io/blog/2018/04/16/what-s-new-in-spring-cloud-gcp-1-0-0-milestone-3).
-   Spring Tool Suite lead Martin Lippert just [announced Spring Tool Suite 3.9.4](https://spring.io/blog/2018/04/16/spring-tool-suite-3-9-4-released)
-   Spring Boot lead Phil Webb [is cooking up a very interesting project to ensure code-formatting consistency for all Spring Boot projects](https://github.com/spring-io/spring-javaformat/). Interesting! (and still super early days yet..) Think of this as the Java and Spring Boot equivalent of `gofmt`.
-   Spring Data ninja Mark Paluch just [announced Spring Data Lovelace M2](https://spring.io/blog/2018/04/13/spring-data-lovelace-m2-released). This release ships with updates for all store modules that contain new features, improvements, and bug fixes. Notable changes include: MongoDB 3.6 support for Change Streams, $jsonSchema, and Client Sessions (in preparation for MongoDB Transactions); Apache Cassandra mapping improvements for Map and Tuple Types, along with newly introduced Lifecycle Callbacks; Upgrade to Apache Solr 7; Improved Connection Handling for reactive Redis and static Master/Slave use; SCAN support for Redis Cluster; List support for Spring Data JDBC; Composable repositories support via CDI; and an t increment to Spring Data Solr to a new major version number, 4.0 M2, as we upgraded from SolrJ 6.6.2 to 7.2.1.
-   There's some interesting changes [afoot in the programmatic bean definition Kotlin DSL!](https://github.com/spring-projects/spring-framework/commit/97ee94f4ca7e1d0c6f7e218e0ba8448940b7ba24) The new DSL supports injecting multiple bean definitions and accessing the Spring `Environment`, among other things.
-   Springg Security OAuth lead Joe Grandja just announced Security OAuth 2.3.2.RELEASE [fixing a minor runtime incompatability with Redis](https://spring.io/blog/2018/04/12/spring-security-oauth-2-3-2-released)
-   Our very own Jakub Pilimon has a [nice post on "event-storming with a splash of domain-driven design."](https://spring.io/blog/2018/04/11/event-storming-and-spring-with-a-splash-of-ddd)
-   Spring Data ninja Mark Paluch shares details on new releases of Spring Data - Spring Data Ingalls SR11 and Kay SR - which include fixes for recently announced vulnerabilities. If you're using Spring Boot 1.5.12 and 2.0.1 then they bring in the [appropriate Spring Data releases, as well](https://spring.io/blog/2018/04/11/multiple-cve-reports-published-for-spring-data)
-   Hi Spring fans! Last week, in the latest *Spring Tips* installment, I look at [the reactive Cloud Foundry Java client](https://spring.io/blog/2018/04/11/spring-tips-the-cloud-foundry-java-client)
-   This is a list of must-read books [for Spring developers in 2018](http://javarevisited.blogspot.fr/2018/04/5-spring-framework-books-experienced-Java-developers-2018.html?m=1).
-   Jenkins X is a new offering from CloudBees that supports smart continuous delivery of applications. [In this example it offers an integrated CI/CD pipeline for Spring Boot](https://www.youtube.com/watch?v=kPes3rvT1UM&feature=youtu.be)
-   The Flowbable BPMN engine has a [nice post on the journey they took to Spring Boot 2.0 support](https://blog.flowable.org/2018/04/11/the-road-to-spring-boot-2-0/)
-   This new project - [Chaos Monkey from Spring Boot](https://codecentric.github.io/chaos-monkey-spring-boot/) - from Codecentric supports the principles of chaos engineering in Spring Boot-based services. It helps you answer questions that your tests don't, like: "will our fallbacks work?"; "how does the application behave with network latency?"; "what if one of our services breaks down?"; and "Service Discovery works, but is our client-side-load-balancing also working?" If Spring Boot Chaos Monkey is on your classpath and activated with profile name `chaos-monkey`, it will automatically scan your application for all classes annotated with any of the following Spring annotations: `@Controller`, `@RestController`, `@Service`, and `@Repository`. Then, you configure different "assaults" which will, well, assault your components and try to break them. This is *so* cool!
-   This is an exhaustive review of a simple concept: [how to change the context-path of a Spring Boot application](http://www.baeldung.com/spring-boot-context-path)
-   I love this image, "Deployment g-forces," that illustrates what things [most support continuous delivery](https://twitter.com/adilaijaz/status/985748670791299072)
-   Jeff Kelly over on the Built to Adapt blog has a really nice post on how Mercedes-Benz [uses Pivotal Cloud Foundry to handle their usecases](https://builttoadapt.io/a-unifying-foundation-for-the-customer-journey-at-mercedes-benz-fc8f8877816b)
-   Check out the following Spring meetup in Minneapolis, MN at 5:30 on April 23, 2018 [on serverless and Spring Cloud Function](https://www.meetup.com/SpringMN/events/246492799/)
-   The E4Developer blog has a nice post [on the request processing lifecycle for Spring WebFlux](https://www.e4developer.com/2018/04/14/webflux-and-servicing-client-requests-how-does-it-work/)
-   Spring and Kotlin ninja Sebastien Deleuze has a nice post on [testing reactive Spring WebFlux-based web applications with Spring and Kotlin](https://github.com/sdeleuze/webflux-kotlin-web-tests/)
-   Our very own Daniel Frey has a really [nice event-sourcing example with Kafka Streams](https://github.com/dmfrey/event-store-demo)
-   Mimacom have a very nice post on [using Spring Cloud Contract](https://blog.mimacom.com/spring-cloud-contract/)
-   I love this post on [consumer driven contracts (by example) with Spring Cloud Contract](http://sketchingdev.co.uk/blog/consumer-driven-contracts-by-example.html)
-   Maciej Walkowiak surfaced an oldie-but-a-goodie: [SpringSource co-founder Keith Donald on the origins of SpringSource](https://twitter.com/maciejwalkowiak/status/984518778577965056?s=12), the company eventually accquired by VMWare which ultimately spun out to become a part of Pivotal.
-   I haven't tried this out yet, *but* it looks like [you can now add `@RefreshScope` to a `javax.sql.DataSource` `@Bean` definition](https://twitter.com/springcloud/status/984494029470617608) and it'll automatically be re-configured? If so, that's *super* cool!
-   Pivotal's own Matthew Parker has a nice [post on the benefits of test-driven development](https://t.co/6nVNmnQLvD?amp=1)
-   The Google Cloud Platform blog has a [nice post on the Spring Cloud GCP support, too](https://cloudplatform.googleblog.com/2018/02/announcing-Spring-Cloud-GCP-integrating-your-favorite-Java-framework-with-Google-Cloud.html?m=1)
-   The Spring Cloud GCP starters are [now on the Spring Initializr](https://twitter.com/snicoll/status/984406909330567168?s=12)!
-   The Docker blog has a [nice post on containerizing Spring Boot applications](https://blog.docker.com/2018/03/video-series-modernizing-java-apps-developers-part-3/). Cool.
-   The E4developer blog has a worthy read: ["Getting Reactive with Spring Boot 2.0 and Reactor."](https://www.e4developer.com/2018/04/11/getting-reactive-with-spring-boot-2-0-and-reactor/)
-   Do you have your tickets for [the Spring Connect São Paulo event on June 26th? I'll be there and I'd love to see you!](https://twitter.com/springcloud/status/984184114189357057)
-   RabbitMQ have a nice blog on how [they support capturing client-side metrics with Micrometer](https://twitter.com/springcentral/status/984115737596837889)
-   This is a good list on [must-read books for Spring developers](http://javarevisited.blogspot.com/2018/04/5-spring-framework-books-experienced-Java-developers-2018.html?m=1)
-   Christoph Strobl has teased the forthcoming [Spring Data MongoDB support for transactions and it's exciting](https://twitter.com/stroblchristoph/status/983975976630673409/photo/1)!
-   Wijnand Top has an interesting post on how to use [GitLab’s Auto DevOps for a Spring Boot application](https://medium.com/@wijnandtop/gitlabs-auto-devops-java-spring-boot-with-quality-control-to-production-in-minutes-using-7afdbc859b9a?source=userActivityShare-a17df5ec14a4-1523428894). Auto DevOps, as I understand it, is basically a made-to-order continuous delivery platform. This is cool!
-   Jonatan Reiners has a nice post on [using the Azure KeyVault as a property source in Spring Boot](https://kreuzwerker.de/blog/posts/keyvault-with-spring)