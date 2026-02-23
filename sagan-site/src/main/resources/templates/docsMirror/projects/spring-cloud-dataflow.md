---
title: Spring Cloud Data Flow
source: https://spring.io/projects/spring-cloud-dataflow
scraped: 2026-02-19T07:49:35.350Z
description: Level up your Java code and explore what Spring can do for you.
---

[All projects](/projects)

-   [Spring Boot](/projects/spring-boot)
-   [Spring Framework](/projects/spring-framework)
-   [Spring Data](/projects/spring-data)
-   [Spring Cloud](/projects/spring-cloud)
-   [Spring Cloud Data Flow](/projects/spring-cloud-dataflow)
-   [Spring gRPC](/projects/spring-grpc)
-   [Spring Security](/projects/spring-security)
-   [Spring Authorization Server](/projects/spring-authorization-server)
-   [Spring for GraphQL](/projects/spring-graphql)
-   [Spring Session](/projects/spring-session)
-   [Spring Integration](/projects/spring-integration)
-   [Spring HATEOAS](/projects/spring-hateoas)
-   [Spring Modulith](/projects/spring-modulith)
-   [Spring REST Docs](/projects/spring-restdocs)
-   [Spring AI](/projects/spring-ai)
-   [Spring Batch](/projects/spring-batch)
-   [Spring AMQP](/projects/spring-amqp)
-   [Spring CredHub](/projects/spring-credhub)
-   [Spring for Apache Kafka](/projects/spring-kafka)
-   [Spring LDAP](/projects/spring-ldap)
-   [Spring for Apache Pulsar](/projects/spring-pulsar)
-   [Spring Shell](/projects/spring-shell)
-   [Spring Statemachine](/projects/spring-statemachine)
-   [Spring Vault](/projects/spring-vault)
-   [Spring Web Flow](/projects/spring-webflow)
-   [Spring Web Services](/projects/spring-ws)

# ![Spring Cloud Data Flow](/img/projects/spring-data-flow.svg)Spring Cloud Data Flow2.11.5[](https://github.com/spring-cloud/spring-cloud-dataflow "Github")[](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow "Stack Overflow")

-   [Overview](#overview)
-   [Learn](#learn)
-   [Support](#support)
-   [Samples](#samples)

# [](#spring-cloud-data-flow-is-no-longer-maintained-as-an-open-source-project-by-broadcom-inc)Spring Cloud Data Flow is no longer maintained as an open-source project by Broadcom, Inc.

## [](#for-information-about-extended-support-or-enterprise-options-for-spring-cloud-data-flow-please-read-the-official-blog-post-here)For information about extended support or enterprise options for Spring Cloud Data Flow, please read the official blog post [here](https://spring.io/blog/2025/04/21/spring-cloud-data-flow-commercial).

Microservice based Streaming and Batch data processing for Cloud Foundry and Kubernetes.

Spring Cloud Data Flow provides tools to create complex topologies for streaming and batch data pipelines. The data pipelines consist of [Spring Boot](https://projects.spring.io/spring-boot/) apps, built using the [Spring Cloud Stream](https://cloud.spring.io/spring-cloud-stream) or [Spring Cloud Task](https://cloud.spring.io/spring-cloud-task/) microservice frameworks.

Spring Cloud Data Flow supports a range of data processing use cases, from ETL to import/export, event streaming, and predictive analytics.

## [](#features)[](#features)Features

The Spring Cloud Data Flow server uses [Spring Cloud Deployer](https://github.com/spring-cloud/spring-cloud-deployer/), to deploy data pipelines made of Spring Cloud Stream or Spring Cloud Task applications onto modern platforms such as Cloud Foundry and Kubernetes.

A selection of pre-built [stream](https://spring.io/projects/spring-cloud-stream-applications/) and [task/batch](https://docs.spring.io/spring-cloud-dataflow/docs/current/reference/htmlsingle/#_out_of_the_box_task_applications) starter apps for various data integration and processing scenarios facilitate learning and experimentation.

[Custom](https://docs.spring.io/spring-cloud-dataflow/docs/current/reference/htmlsingle/#custom-applications) stream and task applications, targeting different middleware or data services, can be built using the familiar Spring Boot style programming model.

A simple [stream pipeline DSL](https://docs.spring.io/spring-cloud-dataflow/docs/current/reference/htmlsingle/#_stream_dsl) makes it easy to specify which apps to deploy and how to connect outputs and inputs. The [composed task DSL](https://docs.spring.io/spring-cloud-dataflow/docs/current/reference/htmlsingle/#_composed_tasks_dsl) is useful for when a series of task apps require to be run as a directed graph.

The [dashboard](https://docs.spring.io/spring-cloud-dataflow/docs/current/reference/htmlsingle/#dashboard-introduction) offers a graphical editor for building data pipelines interactively, as well as views of deployable apps and monitoring them with metrics using [Wavefront](https://www.wavefront.com), [Prometheus](https://prometheus.io), [Influx DB](https://www.influxdata.com), or other monitoring systems.

The Spring Cloud Data Flow server exposes a [REST API](https://docs.spring.io/spring-cloud-dataflow/docs/current/reference/htmlsingle/#api-guide-resources) for composing and deploying data pipelines. A separate [shell](https://docs.spring.io/spring-cloud-dataflow/docs/current/reference/htmlsingle/#shell) makes it easy to work with the API from the command line.

## [](#getting-started)[](#getting-started)Getting Started

The [Spring Cloud Data Flow Microsite](https://dataflow.spring.io/getting-started/) is the best place to get started.

![Spring Initializr](/img/logos/spring-initializr.svg)

## Quickstart Your Project

Bootstrap your application with [Spring Initializr](https://start.spring.io/).

![](/img/extra/footer.svg)

## Get ahead

VMware offers training and certification to turbo-charge your progress.

[Learn more](https://spring.academy/)

## Get support

Tanzu Spring offers support and binaries for OpenJDK™, Spring, and Apache Tomcat® in one simple subscription.

[Learn more](/support)

## Upcoming events

Check out all the upcoming events in the Spring community.

[View all](/events)