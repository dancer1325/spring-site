---
title: Spring Cloud Stream 1.0 M3 and Data Flow 1.0 M2 released
source: https://spring.io/blog/2015/12/29/spring-cloud-stream-1-0-m3-and-data-flow-1-0-m2-released
scraped: 2026-02-23T19:32:20.605Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  December 29, 2015 | 0 Comments
---

# Spring Cloud Stream 1.0 M3 and Data Flow 1.0 M2 released

_Releases | Mark Pollack |  December 29, 2015 | 0 Comments_

On behalf of the team, I am pleased to announce several releases in the Spring Cloud Stream and Spring Cloud Data Flow family of projects.

[Spring Cloud Stream 1.0 M3](http://docs.spring.io/spring-cloud-stream/docs/1.0.0.M3/reference/html/) introduces the following features

-   Many improvements in middleware binding. In particular for supporting [multiple binders](http://docs.spring.io/spring-cloud-stream/docs/1.0.0.M3/reference/html/spring-cloud-stream-overview.html#_multiple_binders_on_the_classpath), so you can now have RabbitMQ as an input and Kafka be the output, for example.
-   [Partitioning improvements](http://docs.spring.io/spring-cloud-stream/docs/1.0.0.M3/reference/htmlsingle/#_partitioning)

[Spring Cloud Stream Modules 1.0 M2](http://docs.spring.io/spring-cloud-stream-modules/docs/1.0.0.M2/reference/html/) adds many new modules with updated documentation.

-   Sources: File, Load Generator, sftp, and tcp
-   Processors: httpclient, PMML, and Splitter
-   Sinks: Cassandra, Field Value Counter, file, ftp, gemfire, HDFS Dataset, JDBC, tcp, throughput, and websocket

[Spring Cloud Data Flow 1.0 M2](http://docs.spring.io/spring-cloud-dataflow/docs/1.0.0.M2/reference/htmlsingle/#_deploying_local) has split out the multiple Admin Server implementations into separate github repositories. The Spring Cloud Data Flow core project supports deploying modules on a local host in separate JVMs

The following Data Flow implementations were also released

-   [Data Flow Apache YARN 1.0 M1](http://docs.spring.io/spring-cloud-dataflow-admin-yarn/docs/1.0.0.M1/reference/html/_deploying_on_yarn.html)
-   [Data Flow Cloud Foundry 1.0 M1](http://docs.spring.io/spring-cloud-dataflow-admin-cloudfoundry/docs/1.0.0.M1/reference/htmlsingle/#getting-started)
-   [Data Flow Apache Mesos 1.0 M1](http://docs.spring.io/spring-cloud-dataflow-admin-mesos/docs/1.0.0.M1/reference/htmlsingle/#_deploying_streams_on_mesos_and_marathon)
-   [Data Flow Kubernetes 1.0 M1](http://docs.spring.io/spring-cloud-dataflow-admin-kubernetes/docs/1.0.0.M1/reference/htmlsingle/#_deploying_streams_on_kubernetes)

UI Improvements

-   The Admin UI is available across all Admin implementations.
-   The Admin UI adds a new Runtime Modules tab that allows you to remotely monitor and manage deployed modules.
-   [Flo for Spring Cloud Data Flow 1.0 M1](https://network.pivotal.io/products/p-flo-for-spring-cloud-data-flow) is now available with drag-and-drop support for creating Streams.

There is also a new [Data Flow Samples repository](https://github.com/spring-cloud/spring-cloud-dataflow-samples) to collect some common use-cases, and look forward to a blog post on how to get started on creating your own custom modules and deploying them in Spring Cloud Data Flow.

Of note, we are using github issues with waffle.io for issue management. Links to the waffle boards are on each project’s github page. You can find the links to each github project page under the main [Spring Cloud Data Flow](http://cloud.spring.io/spring-cloud-dataflow/) project page.