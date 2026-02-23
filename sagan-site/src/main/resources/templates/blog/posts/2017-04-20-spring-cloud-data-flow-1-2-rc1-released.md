---
title: Spring Cloud Data Flow 1.2 RC1 released
source: https://spring.io/blog/2017/04/20/spring-cloud-data-flow-1-2-rc1-released
scraped: 2026-02-23T16:34:02.165Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  April 20, 2017 | 0 Comments
---

# Spring Cloud Data Flow 1.2 RC1 released

_Releases | Mark Pollack |  April 20, 2017 | 0 Comments_

On behalf of the team, I am pleased to announce the first release candidate of Spring Cloud Data Flow 1.2.

Note: A great way to start using this new release is to follow the [Getting Started Guide](http://docs.spring.io/spring-cloud-dataflow/docs/1.2.0.RC1/reference/htmlsingle/#getting-started) in the reference documentation.

## [](#highlights-of-the-12-rc1-release)[](#highlights-of-the-1-2-rc1-release)Highlights of the 1.2 RC1 release:

### [](#composed-tasks)[](#composed-tasks)Composed Tasks

This release introduces *Composed Tasks* ! This feature provides the ability to orchestrate a flow of tasks as a cohesive unit-of-work. A complex ETL pipeline may include executions in sequence, parallel, conditional transitions, or a combination of all of the above. The composed task feature comes with DSL primitives and an interactive graphical interface to quickly build these type of topologies more easily. You can read more about it from the [reference guide](http://docs.spring.io/spring-cloud-dataflow/docs/1.2.0.RC1/reference/htmlsingle/#spring-cloud-dataflow-composed-tasks).

An ETL job, for example, may include multiple steps. Each step in the topology can be built as a finite short-lived Spring Cloud Task application. The orchestration of multiple tasks as steps can be easily defined with the help of the Data Flow Task DSL.

task create simple-etl --definition "extractDbToHDFS && <analysisInSpark || enrichAndLoadHawq> && <populateMgmtDashboard || runRegulatoryReport || loadAnalyticsStore>"

This will first run `extractDbToHDFS` and then run `analysisInSpark` and `enrichAndLoadHawq` in parallel, waiting for the both of them to complete before running the three remaining tasks in parallel and waiting for them to all complete before ending the job. The graphical representation of this topology looks like the following.

![Visualization of Composed Tasks](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/master/spring-cloud-dataflow-docs/src/main/asciidoc/images/dataflow-composed-tasks-flo.png)

### [](#real-time-metrics-and-monitoring)[](#real-time-metrics-and-monitoring)Real-time Metrics and Monitoring

Real-time metrics are now part of the operational view of deployed streams. The applications that are part of a stream publish metrics contained in their Spring Boot `/metrics` actuator endpoint. This includes send and receive messages rates. A new server, the [Spring Cloud Data Flow Metrics Collector](https://github.com/spring-cloud/spring-cloud-dataflow-metrics-collector), collects these metrics and calculates aggregate message rates. The Data Flow server queries the Metrics Collector to support showing message rates in the UI and in the shell. For more details about the architecture, refer to the [Monitoring Deployed Applications](http://docs.spring.io/spring-cloud-dataflow/docs/1.2.0.RC1/reference/htmlsingle/#_monitoring_deployed_applications) Section in the reference guide.

The screenshot below shows the aggregate message rates for a `time | log` stream with three instances of the `time` and `log` applications. Each dot below the main application box shows the message rates for each individual application along with a `guid` value that can be used to identify the application on the platform where they are running.

![Visualization of Input and Output Rates in Flo](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/master/spring-cloud-dataflow-docs/src/main/asciidoc/images/dataflow-stream-metrics-flo.png)

The *Runtime* tab, shown below, also had improvements to show message rates and any other metrics exposed by the platform. For the script savvy users, the shell experience also includes these details via the `runtime apps` command.

![Runtime Apps UI](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/master/spring-cloud-dataflow-docs/src/main/asciidoc/images/dataflow-runtme-apps-metrics.png)

### [](#companion-artifact)[](#companion-artifact)Companion Artifact

The companion artifact support [introduced in 1.2 M3](https://spring.io/blog/2017/03/22/spring-cloud-data-flow-1-2-m3-released#companion-metadata-artifact) has had some improvements. The bulk registration workflow now eagerly resolves and downloads the metadata artifacts for all the out-of-the-box applications. This comes handy in the Shell or UI when reviewing the supported properties for each application.

### [](#oauth-improvements)[](#oauth-improvements)OAUTH Improvements

This change will provide an additional option for REST-API users. Instead of providing a `username:password` combination via BasicAuth, users will now have the ability to retrieve an OAuth2 Access token from their OAuth2 provider directly and then provide the Access Token in the HTTP header, when invoking RESTful calls against secured Spring Cloud Data Flow setup.

### [](#spring-cloud-stream-app-starters---baconrelease)[](#spring-cloud-stream-app-starters-bacon-release)Spring Cloud Stream App Starters - Bacon.RELEASE

[Bacon.RELEASE](https://github.com/spring-cloud-stream-app-starters/app-starters-release/releases/tag/vBacon.RELEASE) is now generally available. All the out-of-the-box stream applications build upon Spring Cloud Stream Chelsea.RELEASE and Spring Cloud Dalston.RELEASE foundation. There were several enhancements and bug-fixes to the existing applications and this release-train also brings new applications such as MongoDB-sink, Aggregator-processor, Header-Enricher-processor, and PGCopy-sink.

For convenience, we have generated the [bit.ly links](http://cloud.spring.io/spring-cloud-stream-app-starters/#stream-app-starters-and-spring-cloud-data-flow-) that includes the latest coordinates for docker and maven artifacts.

### [](#spring-cloud-task-app-starters---belmontrc1)[](#spring-cloud-task-app-starters-belmont-rc1)Spring Cloud Task App Starters - Belmont.RC1

The App Starters Belmont.RC1 release is now complete. To support *Composed Task* feature in Spring Cloud Data Flow, we have added a new out-of-the-box application named [Composed Task Runner](https://github.com/spring-cloud-task-app-starters/composed-task-runner/blob/master/spring-cloud-starter-task-composedtaskrunner/README.adoc). This is a task that executes others tasks in a directed graph as specified by a DSL that is passed in via the `--graph` command line argument.

The Belmont.RC1 builds upon [Spring Cloud Task 1.2 RC1](https://spring.io/blog/2017/04/14/spring-cloud-task-1-2-0-rc1-is-now-available) and Spring Cloud Dalston.RELEASE foundation.

For convenience, we have generated the [bit.ly links](http://cloud.spring.io/spring-cloud-task-app-starters/#task-app-starters-and-spring-cloud-data-flow-) that includes the latest coordinates for docker and maven artifacts.

### [](#whats-next)[](#what-s-next)What’s Next?

The 1.2.0.RELEASE is around the corner. We are aiming to wrap it over the next 2-3 weeks. Spring Cloud Data Flow’s runtime implementations will catch up and adapt to this foundation momentarily after the core release.

Feedback is important. Please reach out to us in [StackOverflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) and [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues) for questions and feature requests. We also welcome contributions! Any help improving the [Spring Cloud Data Flow ecosystem](http://cloud.spring.io/spring-cloud-dataflow/#building-blocks-of-spring-cloud-data-flow) is appreciated.