---
title: This Week in Spring - February 13th, 2018
source: https://spring.io/blog/2018/02/13/this-week-in-spring-february-13th-2018
scraped: 2026-02-23T16:09:08.993Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  February 13, 2018 | 4 Comments
---

# This Week in Spring - February 13th, 2018

_Engineering | Josh Long |  February 13, 2018 | 4 Comments_

Hi Spring fans! Welcome to another installment of *This Week in Spring*! This week I've been in Munich and Frankfurt, Germany, and Minneapolis, Minnesota, and it looks like i'll be in New York City and San Francisco for the balance of the week.

We've got a *lot* to cover so without further ado so let's get started.

-   Spring Cloud Contract lead Marcin Grzejszczak has just put together [a very nice post on using Spring Cloud Contract in a polyglot world](https://spring.io/blog/2018/02/13/spring-cloud-contract-in-a-polyglot-world)
-   Spring Cloud Stream lead Oleg Zhurakousky just [announced Spring Cloud Streamm Elmhurst M4 / 2.0.0.M4](https://spring.io/blog/2018/02/05/spring-cloud-stream-elmhurst-m4-2-0-0-m4-release-announcement).
-   Spring Integration legend Artem Bilan [just announced the Spring Integration for AWS 2.0.0.M1 and Spring Cloud Stream Kinesis Binder 1.0.0.M1](https://spring.io/blog/2018/02/13/spring-integration-for-aws-2-0-0-m1-and-spring-cloud-stream-kinesis-binder-1-0-0-m1). This release highlights some of the things that we do to make the experience as valuable as possible for you, including - in this case - adapting the AWS Kinesis binder to provide consumer groups using the MetadataStore interface in Spring Integration.
-   Pivotal Developer Advocate [Mario Gray](http://twitter.com/MarioGray) has a really good look at the new Project Riff, the Pivotal offering that's [turning heads and putting the *fun* back into function-as-a-service!](https://github.com/marios-code-path/intro-to-riff) - don't miss this!
-   [Spring Cloud Finchley M6 is out](https://spring.io/blog/2018/02/13/spring-cloud-finchley-m6-is-available)! The new release is full of awesome new features including improvements in Spring Cloud Cloud Foundry (including auto-configuration for the reactive Cloud Foundry Java client) and its integration into the Cloud Foundry `DiscoveryClient`), improvements to the Spring Cloud Gateway routing API, and the restoration of the Hystrix `hystrix` SSE stream endpoint to work in a reactive WebFlux application.
-   Spring Web Flow lead Rossen Stoyanchev announced spring Web Flow 2.5 RC1. The release This release provides an upgrade path to Spring Framework 5 along with [Java 8, Servlet 3.1, Hibernate 5, Tiles 3, and JSF 2.2 as minimum requirements.](https://spring.io/blog/2018/02/12/spring-web-flow-2-5-rc1-is-available)
-   Vedran Pavić has just announced [Spring Session 1.3.2 which is a maintenance release](https://spring.io/blog/2018/02/12/spring-session-1-3-2-released)
-   There's a new guide in town! This guide looks at how to [build a reactive REST API](https://spring.io/guides/gs/reactive-rest-service/).
-   Check out the most popular webinar from last year, when the Spring team debuted our [reactive support in Spring Framework 5](https://content.pivotal.io/webinars/oct-4-getting-reactive-with-spring-framework-5-0-s-ga-release-webinar?_lrsc=58776e07-090c-4814-9709-14673e38ec85)
-   Artem Bilan has a nice post [that looks at the Spring Cloud for GCP integrations](https://spring.io/blog/2018/02/07/spring-cloud-for-google-cloud-platform-1-0-milestone-2-available)
-   [The Upside-Down Economics of Building Your Own Platform](https://content.pivotal.io/white-papers/the-upside-down-economics-of-building-your-own-platform?_lrsc=8c3fb3a7-35a8-4fc4-a8ad-4bbb7c459925)
-   Spring Data ninja Christoph Strobl just [announced Spring Data Lovelace M1](https://spring.io/blog/2018/02/06/spring-data-lovelace-m1-released), packed with lots of great features including JPA 2.2 result streaming, MongoDB Validator and JsonSchema support, support for MongoDB Change Streams, Neo4J OGM 3.1 upgrade, `exist`/ `count` projections, and a fluent template API in Spring Data for Apache Cassandra, Spring Data for Apache Geode added JCache Annotation support, query By Example for Redis repository abstractions, and Spring Data REST offers more fine grained method exposure mechanisms.
-   Check out the roundup of all the things happening in the Opentracing, including [the latest revisions to Spring Cloud Sleuth](https://twitter.com/opentracing/status/963156775808544768?ref_src=twcamp%5Eshare%7Ctwsrc%5Eios%7Ctwgr%5Ecom.blork.Pinner.AddBookmarkExtension%7Ctwcon%5E7100%7Ctwterm%5E0)
-   [Spring Boot recommended by the French govt](https://references.modernisation.gouv.fr/sites/default/files/SILL%202018%20-%20socle%20interministeriel%20de%20logiciels%20libres.pdf)
-   Dustin Marx has a nice roundup of [APIs to be removed in Java 10](http://marxsoftware.blogspot.co.at/2018/02/apis-to-be-removed-from-java-10.html).
-   Joel Patrick Llosa has a nice [look at logging in Spring Boot](https://examples.javacodegeeks.com/enterprise-java/spring/boot/spring-boot-logging-example/)
-   I really liked this post introducing the Reactive Streams API and its counterpart [in Java 9](https://dzone.com/articles/reactive-streams-in-java-9)
-   This is an oldie-but-a-goodie: Spring Data lead Oliver Gierke looking [at advanced Spring Data REST](https://www.infoq.com/presentations/spring-data-rest-springone2016)
-   This is a [nice looking DSL for JUnit with Kotlin](https://github.com/neworld/kupiter)
-   Good news everybody! At long last, [Spring Statemachine has been added to the Spring Initializr](https://twitter.com/snicoll/status/963048286478307328)!
-   Have you tried Pivotal's function-as-a-service offering, Project Riff, which works on Kubernetes? It works well and it's garnering the interest of Kubernetes-legends [like Kelsey Hightower](https://twitter.com/springcentral/status/963092299470090241). Kelsey also put together a [worth-a-read introduction](https://twitter.com/kelseyhightower/status/963070881252614146?ref_src=twcamp%5Eshare%7Ctwsrc%5Eios%7Ctwgr%5Ecom.blork.Pinner.AddBookmarkExtension%7Ctwcon%5E7100%7Ctwterm%5E0)
-   The JavaCodeGeeks blog has a nice post on setting [up an OAuth authorization server with Spring](https://www.javacodegeeks.com/2018/02/spring-boot-2-applications-oauth-2-setting-authorization-server.html)
-   This looks interesting! A rate limiter [implementation for Zuul, something that's not provided out of the box](https://github.com/marcosbarbero/spring-cloud-zuul-ratelimit)
-   The Vaadin blog has a nice post on consuming [microservices from a Spring Boot-based Vaadin application](https://vaadin.com/blog/microservices-consuming-stateless-services-from-vaadin-uis)
-   It's really cool to see Pivotal [listed among the coolest cloud vendors in this CRN Mobile roundup](https://m.crn.com/slide-shows/cloud/300098611/the-20-coolest-cloud-platform-vendors-of-the-2018-cloud-100.htm/pgno/0/11)
-   Another nice post from the Baeldung blog [on using Spring Framework 5 and the Servlet 4 `PushBuilder` API](http://www.baeldung.com/spring-5-push)
-   Biju Kunjummen has a great [post on scatter-gather composition with the Reactor project](https://www.javacodegeeks.com/2016/04/scatter-gather-using-spring-reactor-core.html). Reactive programming is an ideal fit for microservices.
-   Bartosz Jedrzejewski looks at distributed [tracing with Spring Cloud Sleuth](http://e4developer.com/2018/02/09/tracing-messages-in-choreography-with-sleuth-and-zipkin/)
-   Salesforce have a reactive gRPC client [that works with project Reactor](https://github.com/salesforce/reactive-grpc/releases/tag/0.8.0)
-   Christina Cardoza has a nice writeup on the [twelve factors - yes, those twelve factors from the 12 Factor manifesto from 2011 - for building modern applications](https://sdtimes.com/webdev/twelve-factor-app-methodology-sets-guidelines-modern-apps/)
-   Mahmoud Ben Hassine‏ has a really good example of [using the Spring Boot Initializr REST API, with `curl` and a shell alias](https://twitter.com/_benas_/status/961992947507105793), to instantly generate a Spring Batch-based Spring Boot application. Useful!
-   We're going on tour! Come join us for a day or two of fun in the [cloud with Spring on the SpringOne Tour](https://springonetour.io/)!
-   Spring Cloud ninja Ryan Baxter has [just announced Spring Cloud Edgware SR2](https://twitter.com/springcloud/status/962083655064702976).
-   At long last! The formal announcement of Spring Cloud GCP! Check out this nice post from our friends at Google introducing the new capabilities [for Spring Cloud users running on Google Cloud](https://cloudplatform.googleblog.com/2018/02/announcing-Spring-Cloud-GCP-integrating-your-favorite-Java-framework-with-Google-Cloud.html)
-   [Comparing API Gateway Performances: NGINX vs. ZUUL vs. Spring Cloud Gateway vs. Linkerd](https://engineering.opsgenie.com/comparing-api-gateway-performances-nginx-vs-zuul-vs-spring-cloud-gateway-vs-linkerd-b2cc59c65369?gi=30607f433d1b)
-   this is an interesting [sample implementation to retrieve application configurations from database with Spring Cloud.](https://github.com/rashidi/jdbc-env-repo-sample)
-   I really liked this project simplifying integration [of SSL with Spring Boot projects using ACME](https://github.com/creactiviti/spring-boot-starter-acme)
-   Community friend Mark Nutall has a concise example of [setting up Spring for Apache Kafka and Kafka Streams](https://github.com/mknutty/kafka-streams-spring-boot-json-example) - nice job, as usual, Mark!
-   This is a nice post [on reactive resource utilization](https://kamilszymanski.github.io/resources-utilization-in-reactive-services/)
-   The SivaLabs blog also has a nice post on using Travis CI to continuously [integrate and deliver a Spring Boot-based application](https://sivalabs.in/2018/01/ci-cd-springboot-applications-using-travis-ci/)
-   The SivaLabs blog has a nice post on session [management using Spring Session with a JDBC DataStore](https://sivalabs.in/2018/02/session-management-using-spring-session-jdbc-datastore/)
-   Check out this Chinese-language post [on using Spring Boot's Actuator](http://sparkgis.com/java/2018/02/springboot%e5%8d%81%e4%b9%9d%ef%bc%9a%e4%bd%bf%e7%94%a8spring-boot-actuator%e7%9b%91%e6%8e%a7%e5%ba%94%e7%94%a8/)
-   I like this Spanish-language article on [using multiple databases with Spring Boot](https://geeks-mexico.com/2018/02/02/utiliza-multiples-bases-de-datos-con-spring-boot-y-spring-jdbc/amp/?__twitter_impression=true)
-   Pivotal's resident raconteur Michael Cote has a nice article up on *The Register* called [*The many-faced god of operational excellence, DevOps and now 'site reliability engineering'*](https://www.theregister.co.uk/AMP/2018/02/06/devops_no_ops_less_ops/). It's a good'un.