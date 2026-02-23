---
title: Spring Cloud Data Flow 2.2.0.M1 Released
source: https://spring.io/blog/2019/07/09/spring-cloud-data-flow-2-2-0-m1-released
scraped: 2026-02-23T14:42:00.069Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ilayaperumal Gopinathan |  July 09, 2019 | 0 Comments
---

# Spring Cloud Data Flow 2.2.0.M1 Released

_Engineering | Ilayaperumal Gopinathan |  July 09, 2019 | 0 Comments_

The [Spring Cloud Data Flow](https://cloud.spring.io/spring-cloud-dataflow/) team is pleased to announce the milestone release 2.2.0.M1.

Along with some enhancements and bug fixes, here are some of the highlights of the release:

**Metrics for Tasks** Metrics and monitoring continue to be one of the important themes for Spring Cloud Data Flow. Building upon the InfluxDB integration that we have for streams, in 2.2, we are adding support for Tasks, too. The core of the Micrometer integration landed in Spring Cloud Task's 2.2.0 release-line, which by the way is a requirement if you are going to try out the Task-metrics and the SCDF integration.

For convenience, we have a [sample application](https://github.com/tzolov/task-demo-metrics/blob/master/README.md) that builds on the compatible upstream versions of Spring Boot, Spring Batch, and Spring Cloud Task. With this application launched in SCDF, you are now able to instrument metrics with InfluxDB as the backend, and likewise visualize the statistics through Grafana dashboard as shown below.

![Screenshot](https://raw.githubusercontent.com/tzolov/task-demo-metrics/master/docs/grafana-task.png)

**Application Logs** A set of REST endpoints are now available to access the application logs of stream and task applications. Currently, this is available for applications running in Cloud Foundry and Kubernetes platforms. In the upcoming releases, we'll have the Dashboard access to viewing the stream/task application logs along with the Local platform support.

**Patching Database Drivers** The community members and the customers who attempted to patch Spring Cloud Data Flow with proprietary database drivers have had the option to clone and build the project locally. There's another option, though. The procedure is now [documented](https://docs.spring.io/spring-cloud-dataflow/docs/2.2.0.M1/reference/htmlsingle/#_adding_a_custom_jdbc_driver) for both Maven and Gradle users.

**Acceptance Tests** To further improve the quality of software that we build and to have more confidence in what we ship, we have invested time to cycle through and overhaul the acceptance-tests. We are now continually running the acceptance-tests on Local, Pivotal Cloud Foundry, Kubernetes (GKE), and PKS.

**Developer Recipes** Apache Kafka, RabbitMQ, File-ingest and ETL in K8s/CF, and Amazon Kinesis recipes are now available in the latest Spring Cloud Data Flow [website](https://dataflow.spring.io/). Given all the content is coded as markdown files, it is easy for the community to contribute, so feel free to start the dialog with pull-requests - we are looking forward to your contributions [here](https://github.com/spring-io/dataflow.spring.io)

## [](#stay-in-touch)Stay in touch...

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) or [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-dataflow).