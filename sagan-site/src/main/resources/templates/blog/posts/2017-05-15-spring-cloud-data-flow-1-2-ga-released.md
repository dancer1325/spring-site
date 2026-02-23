---
title: Spring Cloud Data Flow 1.2 GA released
source: https://spring.io/blog/2017/05/15/spring-cloud-data-flow-1-2-ga-released
scraped: 2026-02-23T16:32:19.385Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  May 15, 2017 | 3 Comments
---

# Spring Cloud Data Flow 1.2 GA released

_Releases | Mark Pollack |  May 15, 2017 | 3 Comments_

On behalf of the team, I am pleased to announce the general availability of Spring Cloud Data Flow 1.2 across a range of platforms

Here are the relevant links to documentation and getting started guides.

-   Local: [Quick Start](http://cloud.spring.io/spring-cloud-dataflow/#quick-start), [Getting Started Guide](http://docs.spring.io/spring-cloud-dataflow/docs/1.2.0.RELEASE/reference/htmlsingle/#getting-started)
    
-   Cloud Foundry: [Getting Started Guide](http://docs.spring.io/spring-cloud-dataflow-server-cloudfoundry/docs/1.2.0.RELEASE/reference/htmlsingle/#getting-started)
    
-   YARN: [Getting Started Guide](http://docs.spring.io/spring-cloud-dataflow-server-yarn/docs/1.2.0.RELEASE/reference/htmlsingle/#yarn-deploying-on-yarn)
    
-   Kubernetes: [Getting Started Guide](http://docs.spring.io/spring-cloud-dataflow-server-kubernetes/docs/1.2.0.RELEASE/reference/htmlsingle/#kubernetes-getting-started)
    

## [](#highlights-of-the-12-release)[](#highlights-of-the-1-2-release)Highlights of the 1.2 release:

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

This change will provide an additional option for REST-API users. Instead of providing a `username:password` combination via BasicAuth, users will now have the ability to retrieve an OAuth2 Access token from their OAuth2 provider directly and then provide the Access Token in the HTTP header, when invoking RESTful calls against a secured Spring Cloud Data Flow setup.

### [](#role-based-access)[](#role-based-access)Role based access

Add [role-based access control](http://docs.spring.io/spring-cloud-dataflow/docs/1.2.0.RELEASE/reference/htmlsingle/#customizing-authorization) to define who has access to create, deploy, destroy, or view streams/tasks. This works seamlessly in coordination with the supported [authentication methods](http://docs.spring.io/spring-cloud-dataflow/docs/1.2.0.M1/reference/htmlsingle/#configuration-security).

### [](#bug-reporting)[](#bug-reporting)Bug reporting

A new REST endpoint and About page in the Dashboard to collect server implementation details to the clipboard for use in bug reporting.

### [](#spring-cloud-stream-app-starters---baconrelease)[](#spring-cloud-stream-app-starters-bacon-release)Spring Cloud Stream App Starters - Bacon.RELEASE

The Stream App Starters [Bacon.RELEASE](https://github.com/spring-cloud-stream-app-starters/app-starters-release/releases/tag/vBacon.RELEASE) is now generally available which provides you a range of sources, processors, and sinks to get started creating stream. All the out-of-the-box stream applications build upon Spring Cloud Stream Chelsea.RELEASE and Spring Cloud Dalston.RELEASE foundation. There were several enhancements and bug-fixes to the existing applications and this release-train also brings new applications such as MongoDB-sink, Aggregator-processor, Header-Enricher-processor, and PGCopy-sink.

For convenience, we have generated the [bit.ly links](http://cloud.spring.io/spring-cloud-stream-app-starters/#stream-app-starters-and-spring-cloud-data-flow-) that includes the latest coordinates for docker and maven artifacts.

### [](#spring-cloud-task-app-starters---belmontrelease)[](#spring-cloud-task-app-starters-belmont-release)Spring Cloud Task App Starters - Belmont.RELEASE

The Task App Starters [Belmont.RELEASE](https://github.com/spring-cloud-task-app-starters/app-starters-release/releases/tag/vBelmont.RELEASE) release is now complete. To support *Composed Task* feature in Spring Cloud Data Flow, we have added a new out-of-the-box application named [Composed Task Runner](https://github.com/spring-cloud-task-app-starters/composed-task-runner/blob/master/spring-cloud-starter-task-composedtaskrunner/README.adoc). This is a task that executes others tasks in a directed graph as specified by a DSL that is passed in via the `--graph` command line argument.

The Belmont.RELEASE builds upon [Spring Cloud Task 1.2 RELEASE](https://spring.io/blog/2017/04/25/spring-cloud-task-1-2-0-release-is-now-available) and Spring Cloud Dalston.RELEASE foundation.

For convenience, we have generated the [bit.ly links](http://cloud.spring.io/spring-cloud-task-app-starters/#task-app-starters-and-spring-cloud-data-flow-) that includes the latest coordinates for docker and maven artifacts.

### [](#whats-next)[](#what-s-next)What’s Next?

An immediate goal is adding more automated integration tests and to expose this as an additional user facing feature. You can track that work [here](https://github.com/spring-cloud/spring-cloud-dataflow-acceptance-tests).

Beyond the 1.2.x line, we are going to start planning for the 2.0 version. Some general themes are support for deploying individual applications and keeping track of application deployment properties and metadata such as the application version. This functionality would build up into supporting a rich Continuous Delivery theme at the application level that also extends to "editing" streams at runtime. In addition, we are also looking into supporting functions, either "in-line" as Java code or compiled `java.util.Function` s to be a first class programming model for data processing a stream.

Feedback is important. Please reach out to us in [StackOverflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) and [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues) for questions and feature requests. We also welcome contributions! Any help improving the [Spring Cloud Data Flow ecosystem](http://cloud.spring.io/spring-cloud-dataflow/#building-blocks-of-spring-cloud-data-flow) is appreciated.