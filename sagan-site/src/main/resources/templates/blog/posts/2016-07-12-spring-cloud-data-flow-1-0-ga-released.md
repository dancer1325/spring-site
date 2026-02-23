---
title: Spring Cloud Data Flow 1.0 GA released
source: https://spring.io/blog/2016/07/12/spring-cloud-data-flow-1-0-ga-released
scraped: 2026-02-23T19:10:33.972Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  July 12, 2016 | 7 Comments
---

# Spring Cloud Data Flow 1.0 GA released

_Releases | Mark Pollack |  July 12, 2016 | 7 Comments_

On behalf of the team, I’m excited to announce the 1.0 GA release of Spring Cloud Data Flow!

Note

A great way to start using this new release is to follow the [Getting Started section](http://docs.spring.io/spring-cloud-dataflow/docs/1.0.0.RELEASE/reference/htmlsingle/#getting-started) of the reference documentation. It uses a Data Flow server that runs on your computer and deploys a new process for each application.

Spring Cloud Data Flow (SCDF) is an orchestration service for data microservices on modern runtimes. SCDF lets you describe data pipelines that can either be composed of long lived streaming applications or short lived task applications and then deploys these to platform runtimes that you may already be using today, such as Cloud Foundry, Apache YARN, Apache Mesos, and Kubernetes. We provide a wide range of [stream](https://github.com/spring-cloud/spring-cloud-stream-app-starters) and [task](https://github.com/spring-cloud/spring-cloud-task-app-starters) applications so you can get started right away to develop solutions for use-cases such as data ingestion, real-time analytics and data import/export.

Streams are defined using a DSL inspired by the [Unix pipeline syntax](https://en.wikipedia.org/wiki/Pipeline_\(Unix\)#Pipelines_in_command_line_interfaces). As an example, the DSL for a stream that performs data ingestion from an http endpoint and writes to an Apache Cassandra database is defined as `http | cassandra`. In turn each element of this DSL maps onto a Spring Boot microservice application focused on data processing that uses the [Spring Cloud Stream programming model](http://docs.spring.io/spring-cloud-stream/docs/1.0.2.RELEASE/reference/htmlsingle/index.html#_programming_model). This programming model lets you focus on handling the input and outputs of your applications while SCDF configures how those outputs and inputs map onto the messaging middleware, which is how applications communicate. Multiple message brokers are supported through a binder abstraction in Spring Cloud Stream. Currently RabbitMQ and Kafka are available for use in production. [Consumer Groups](http://docs.spring.io/spring-cloud-stream/docs/1.0.2.RELEASE/reference/htmlsingle/index.html#consumer-groups) and [Data Partitioning](http://docs.spring.io/spring-cloud-stream/docs/1.0.2.RELEASE/reference/htmlsingle/index.html#partitioning) are also supported in Spring Cloud Stream and can be configured when [deploying a stream](http://docs.spring.io/spring-cloud-dataflow/docs/1.0.0.RELEASE/reference/htmlsingle/#passing_stream_partition_properties).

![Data Flow Architecture](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/master/spring-cloud-dataflow-docs/src/main/asciidoc/images/dataflow-arch.png)

It is very cool how the Unix philosophy of “Write programs that do one thing and do it well.”, “Write programs to work together.”, and “Write programs to handle text streams, because that is a universal interface.” comes together with the microservice architecture and Spring Cloud Stream binders in SCDF.

Today we are also announcing the release of

-   Spring Cloud Data Flow’s [Apache YARN Server 1.0 GA](https://spring.io/blog/2016/07/12/spring-cloud-data-flow-for-apache-yarn-1-0-0-released)
    
-   Spring Cloud Data Flow’s [Kubernetes Server 1.0 GA](https://spring.io/blog/2016/07/12/spring-cloud-data-flow-for-kubernetes-1-0-ga-released)
    
-   Spring Cloud Data Flow’s [Cloud Foundry Server 1.0 M4](https://spring.io/blog/2016/07/12/spring-cloud-data-flow-for-cloud-foundry-1-0-0-m4-now-available)
    

[Support for Apache Mesos](https://github.com/spring-cloud/spring-cloud-dataflow-server-mesos) is under development. We are also quite happy to see community contributions for other runtimes, for example [OpenShift](http://blog.switchbit.io/spring-cloud-deployer-openshift/). You can find out more about the architecture of SCDF in [our reference manual](http://docs.spring.io/spring-cloud-dataflow/docs/1.0.0.RELEASE/reference/htmlsingle/).

Notable features in this release are:

-   A [Stream DSL](http://docs.spring.io/spring-cloud-dataflow/docs/1.0.0.RELEASE/reference/htmlsingle/#_stream_dsl) that describes a data pipeline as a directed graph of individual applications.
    
-   DSL support for named destinations that lets you consume events from any ‘pipe’ in the stream definition. This is referred to as [tapping a stream](http://docs.spring.io/spring-cloud-dataflow/docs/1.0.0.RELEASE/reference/htmlsingle/#spring-cloud-dataflow-stream-tap-dsl). You can also [combine the output from multiple streams](http://docs.spring.io/spring-cloud-dataflow/docs/1.0.0.RELEASE/reference/htmlsingle/#spring-cloud-dataflow-stream-advanced).
    
-   A deployment manifest that lets you define the resource usage of individual applications (CPU, Disk, Memory) as well as application [instance count](http://docs.spring.io/spring-cloud-dataflow/docs/1.0.0.RELEASE/reference/htmlsingle/#_passing_instance_count_as_deployment_property) and [how to partition data](http://docs.spring.io/spring-cloud-dataflow/docs/1.0.0.RELEASE/reference/htmlsingle/#passing_stream_partition_properties). You can also [pass arbitrary application properties when deploying](http://docs.spring.io/spring-cloud-dataflow/docs/1.0.0.RELEASE/reference/htmlsingle/#_passing_application_properties_when_deploying_a_stream).
    
-   Support application packaging as either a Spring Boot uber-jar or Docker image.
    
-   Support deploying data microservices built using Spring Cloud Stream for long lived Stream applications that process an unbounded amount of data and Spring Cloud task for applications that process a finite set of data and then terminate. In turn these build upon Spring Boot.
    
-   A shell application with tab-completion to create, deploy and monitor streams and tasks.
    
-   A HTML5 [Dashboard](http://docs.spring.io/spring-cloud-dataflow/docs/1.0.0.RELEASE/reference/htmlsingle/#dashboard) that lets you create, deploy, and monitor deployed streams and tasks.
    
-   Flo for Spring Cloud Data Flow: A [visual designer for Stream definitions](http://docs.spring.io/spring-cloud-dataflow/docs/1.0.0.RELEASE/reference/htmlsingle/#dashboard-flo-streams-designer) that also supports a scriptable-transform processor that accepts Ruby, Groovy, Python, or Javascript code for runtime compute logic.
    
-   Support for basic HTTP and OAuth 2.0 [authentication](http://docs.spring.io/spring-cloud-dataflow/docs/1.0.0.RELEASE/reference/htmlsingle/#getting-started-security).
    
-   ‘NoSql’ style [real-time analytics](http://docs.spring.io/spring-cloud-dataflow/docs/1.0.0.RELEASE/reference/htmlsingle/#arch-analytics) using Field Value and Aggregate Counters with HTTP endpoints on the server to access counter values. Counter data is backed by Redis.
    
-   Use [Spring Initializr](http://start.spring.io/) to simplify the [creation of stream applications](http://docs.spring.io/spring-cloud-stream/docs/1.0.2.RELEASE/reference/htmlsingle/index.html#_getting_started).
    
-   Spring Cloud Stream applications support RabbitMQ and Kafka 0.8
    
-   [Task](https://github.com/spring-cloud/spring-cloud-task-app-starters) and [Stream Application Starters](https://github.com/spring-cloud/spring-cloud-stream-app-starters) that you can use to customize the many source, processor, sink and task applications that we have provided.
    
-   [Whitelisting of Spring Boot application properties](http://docs.spring.io/spring-cloud-dataflow/docs/1.0.0.RELEASE/reference/htmlsingle/#spring-cloud-dataflow-stream-app-whitelisting) gives the shell/UI information to show a preferred set of boot properties to display for code completion and application info.
    

Spring Cloud Data Flow has been under development for about one year, having evolved out of the previous project Spring XD which had a similar goal, to simplify the development of streaming and batch applications. We learned a great deal through that experience, which has been described quite nicely by Sabby Anandan in this [blog post](https://blog.pivotal.io/pivotal-cloud-foundry/products/data-goes-cloud-native-with-the-new-spring-cloud-data-flow).

A major architectural change was replacing our own application runtime with a [pluggable Deployer Service Provider Interface](https://github.com/spring-cloud/spring-cloud-deployer). While much of the engineering time spent in Spring Cloud Data Flow 1.0 GA was in making this architectural shift, we are now in a very good position to continue to add higher level value on top of this foundation and not have to spend time developing core runtime features. Here are some of the ideas on the team’s collective mind:

-   By depending on the components of a stream or task application to be ‘just apps’, we can take advantage of many other Spring Cloud projects, such as Spring Cloud Sleuth to collect response times in a distributed application.
    
-   Integration with [Spinnaker](http://www.spinnaker.io/) to handle the responsibilities of continuous deployment/upgrading of applications since Spinnaker ‘deals with apps’ as its unit of currency and can use data such as response times in making automated decisions to upgrade to new versions of an application.
    
-   Polyglot deployment, we want to deploy more than Java Spring Boot apps. We will be looking first into deploying Python apps, since many Data Science teams use Python to develop models that need to be evaluated in real-time.
    
-   Bring back the Task DSL and UI Designer from Spring XD.
    

Since Spring Cloud Data Flow is decoupled from the release lifecycle of Spring Cloud Stream and Spring Cloud Task, as those projects release new features, they can immediately be consumed by SCDF. Some of the exciting features for Spring Cloud Stream worth mentioning are support for Project Reactor and Kafka Streams APIs as well as binding support for Kafka 0.9, Google Cloud Pub/Sub, Azure Event Hubs, and JMS. For Spring Cloud Task, there are plans to support the latest Task features on Cloud Foundry. Check out the roadmaps for those two projects for details

For the complete list of features, bug-fixes, and improvements, please refer to the [closed 1.0 RELEASE GitHub issues](https://github.com/spring-cloud/spring-cloud-dataflow/issues?utf8=%E2%9C%93&q=milestone%3A1.0.0.RELEASE).

We welcome feedback and contributions! If you have any questions, comments or suggestions, please let us know via [GitHub Issues](https://github.com/spring-cloud/spring-cloud-dataflow/issues), [StackOverflow](http://stackoverflow.com/tags/spring-cloud-dataflow), or using the #SpringCloudDataFlow hashtag on Twitter.

[SpringOne Platform](https://springoneplatform.io) is right around the corner. In addition to several sessions covering Spring Cloud Data Flow and dependent projects, there will also be a [two day training class](https://springoneplatform.io/training). The entire Spring Cloud Data Flow team will be there, looking forward to seeing you there!