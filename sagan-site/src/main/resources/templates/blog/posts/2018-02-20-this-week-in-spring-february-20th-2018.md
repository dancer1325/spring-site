---
title: This Week in Spring - February 20th, 2018
source: https://spring.io/blog/2018/02/20/this-week-in-spring-february-20th-2018
scraped: 2026-02-23T16:08:37.598Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  February 20, 2018 | 0 Comments
---

# This Week in Spring - February 20th, 2018

_Engineering | Josh Long |  February 20, 2018 | 0 Comments_

Hi Spring fans! Welcome to another installment of *This Week in Spring!* This week I'm speaking at the [San Diego JUG](http://joshlong.com/jl/blogPost/bootiful-testing-in-san-diego.html) with Mario Gray on testing with Spring. Then I'm off to the [IBM Index conference](http://joshlong.com/jl/blogPost/index-2018.html) here in San Francisco where I'll be talking about building reactive microservices, and then it's off to [Devnexus](http://joshlong.com/jl/blogPost/devnexus-2018.html) in Atlanta, GA, where I'll be talking about Kotlin and testing. I hope you'll join [me and say hi if you're nearby](http://twitter.com/starbuxman).

-   Stéphane Nicoll has just announced [Spring Framework 5.0.4](https://spring.io/blog/2018/02/19/spring-framework-5-0-4-available-now).
-   Check out this whitepaper [on building flexible Spring Cloud Data Flow data pipelines](https://content.pivotal.io/blog/building-flexible-data-pipelines-with-spring-cloud-data-flow-for-pcf)
-   It's now even easier to use Spring Cloud Stream [from the Spring Initializr](http://start.spring.io): now you need only choose a binder implementation (Kafka, or RabbitMQ) and then choose whether you want the implementation to be reactive or not, and you're off to the races!
-   Spring Cloud Task lead Michael Minella just announced Spring Cloud Task 2.0.0.M3. The new release includes smarter default behavior when an application closes, the ability to restrict tasks from running concurrently, [and smarter integrations with Spring Batch](https://spring.io/blog/2018/02/14/spring-cloud-task-2-0-0-m3-is-now-available)
-   I love this nice post by Abhishek Gupta from [the Oracle developer blog on distributed tracing with Zipkin](https://medium.com/oracledevs/distributed-tracing-for-microservices-on-oracle-cloud-with-spring-cloud-sleuth-and-zipkin-b67158ebb34a)
-   Check out the recording of the talk that Mark Heckler and I gave at last year's SpringOne Platform 2017 to [learn about building reactive Spring applications](https://www.infoq.com/presentations/reactive-spring-5)
-   [Apache Tomcat 9.0.5 has just been released](http://tomcat.apache.org/tomcat-9.0-doc/changelog.html)
-   I liked this post on the community *SpringUni* blog that looks at some of [the new features in Spring Boot 2.0](https://springuni.com/spring-boot-2-infrastructure-changes/)
-   The biggest problem with the various Docker build plugins is that they assume a stable API - a big mistake! The [approach outline in this post uses the `docker` commands themselves](https://lazystone.github.io/programming/gradle/docker/travis/2018/02/17/gradle-docker.html).
-   This is a nice post [that introduces HATEOAS, the pattern, and Spring HATEOAS (the technology)](http://e4developer.com/2018/02/16/hateoas-simple-explanation/)
-   This post looks at how to pre-process [requests created with Spring Cloud Feign](http://blog.arnoldgalovics.com/2018/02/19/customizing-each-request-with-spring-cloud-feign/)
-   This is a short and sweet post that looks at creating [a simple Spring Boot API from scratch](https://dzone.com/articles/creating-a-simple-spring-boot-api-from-scratch)
-   Friend of the community Aboullaite Mohammed [has put together a Spring Boot starter that autoconfigure a Minio client](https://t.co/pbJB24wuv2?ssr=true). Minio is a high performance distributed object storage server, designed for large-scale private cloud infrastructure.
-   Happy tenth anniversary [to the Grails Framework!](https://twitter.com/grailsframework/status/965144858259161088?s=12)
-   This blog looks at how to setup [multiple MongoDB connections in a Spring Boot application](http://blog.marcosbarbero.com/multiple-mongodb-connectors-in-spring-boot/)
-   Société Générale have put together a Spring Boot starter that supports some of their more [nuanced uses of RabbitMQ](https://github.com/societe-generale/rabbitmq-advanced-spring-boot-starter) - maybe there's something here for you?
-   Spring and Cloud Foundry member Brian McClain put together a quick video showing how [to install Pivotal's function-as-a-service offering, *Project Riff*, on GKE](https://www.youtube.com/watch?v=bXXOn1ffM8k)
-   Baeldung have a nice post on [using Dubbo, the Spring Framework-based RPC framework from Alibaba](http://www.baeldung.com/dubbo) that's served as the foundation for a large number of services at Alibaba (and other companies) for many, many years.
-   We're hiring! We're looking for [a product marketing manager](https://boards.greenhouse.io/pivotalsoftware/jobs/1046846#.Wovk8HXwaV5)
-   Want a front-seat tour on implementing reactive APIs with project Reactor? Check out [this talk from two who've made the journey before, project Reactor luminaries Ben Hale and Paul Harris](https://www.infoq.com/articles/Designing-Implementing-Using-Reactive-APIs)
-   Here's another [post on Dockerizing a Spring Boot application](http://bmuschko.com/blog/dockerized-spring-boot-app/). I guess there are a lot of ways to approach this..
-   Spring and Kotlin [ninja Sébastien Deleuze‏ has updated the stellar Spring Petclinic application with Kotlin](https://twitter.com/springcentral/status/964207899982553088)
-   Good news everybody! MongoDB has support for transactions. Spring Data lead Oliver Gierke [tweets](https://twitter.com/springcentral/status/964207863437524992), "I can smell a MongoDbTransactionManager… #SpringData" :)
-   InfoQ's Richcard Seroter hosts a discussion [on event-sourcing](https://twitter.com/springcentral/status/964162678418747392) and talks to, among others, Axon project lead Allard Buijze. Axon is a framework for building event-driven, CQRS-centric, event-sourcing aware applictions built on Spring.
-   Paul Czarkowski has a nice post on setting up Pivotal Container Service (PKS) [with Elasticsearch, Fluentd and Kibana](https://medium.com/@pczarkowski/pks-cfcr-logging-with-elasticsearch-fluentd-kibana-df212ef2cdb2)
-   Check out the new [Spring Cloud Data Flow tile for Pivotal Cloud Foundry](https://twitter.com/pivotalcf/status/963855245787959297)
-   I really like Andrew Fitzgerald's post [on using Spring Cloud Gateway to create a Cloud Foundry route service](https://medium.com/@fitzoh/creating-a-cloud-foundry-route-service-with-spring-cloud-gateway-2dcabf04540e)
-   This looks interesting: it's a [Grafana Dashboard for Spring Boot Actuator based on Micrometer](https://github.com/nobusugi246/prometheus-grafana-spring-mac).
-   \[Community legend Mark is back with a different example this one [using Spring Cloud Stream Kafka Streams](_URL_)\]([https://github.com/mknutty/spring-boot-cloud-streams-kafka-streams-json-example](https://github.com/mknutty/spring-boot-cloud-streams-kafka-streams-json-example))
-   Adam Cowley has a nice post on using Spring Boot with Neo4j, though I think this misses an exciting [opportunity to look more deeply at Spring Data Neo4j](https://www.adamcowley.co.uk/neo4j/using-the-neo4j-driver-in-spring-boot/)
-   Spring community legend Michael Simons has a nice [post on the new Spring Boot Actuator support in Spring Boot 2.0](http://info.michael-simons.eu/2018/02/13/revised-actuators-in-spring-boot-2/)