---
title: Spring Cloud Data Flow and Skipper 2.0 GA Released
source: https://spring.io/blog/2019/03/06/spring-cloud-data-flow-and-skipper-2-0-ga-released
scraped: 2026-02-23T14:56:05.792Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  March 06, 2019 | 0 Comments
---

# Spring Cloud Data Flow and Skipper 2.0 GA Released

_Releases | Mark Pollack |  March 06, 2019 | 0 Comments_

The [Spring Cloud Data Flow](https://cloud.spring.io/spring-cloud-dataflow/) team is pleased to announce the release of `2.0` of Data Flow. Follow the *Getting Started* guides for running on [Local](https://docs.spring.io/spring-cloud-dataflow/docs/2.0.0.RELEASE/reference/htmlsingle/#getting-started-local), [Cloud Foundry](https://docs.spring.io/spring-cloud-dataflow/docs/2.0.0.RELEASE/reference/htmlsingle/#getting-started-cloudfoundry), and [Kubernetes](https://docs.spring.io/spring-cloud-dataflow/docs/2.0.0.RELEASE/reference/htmlsingle/#getting-started-kubernetes).

Hand in hand is the `2.0` release of [Spring Cloud Skipper](https://cloud.spring.io/spring-cloud-skipper/). The [getting started section](https://docs.spring.io/spring-cloud-skipper/docs/2.0.0.RELEASE/reference/htmlsingle/#getting-started) in the reference guide is the best place to start if you want to use Skipper separately from Data Flow.

## [](#here-are-the-highlights-for-data-flow)[](#here-are-the-highlights-for-data-flow)Here are the highlights for Data Flow

-   Stream deployment always delegates to Skipper
    
-   Single server that runs on all supported platforms
    
-   Launch tasks against multiple platforms
    
-   UI improvements
    
-   Standardize on OAuth2 and OpenID Connect for Security
    
-   Revamped metrics and monitoring of deployed applications
    
-   Updated analytics using micrometer
    
-   Database migration support
    
-   Update to Boot 2.1
    
-   Update internals to use JPA
    
-   Task/Job Execution and Performance improvements
    

## [](#stream-deployment-always-delegates-to-skipper)[](#stream-deployment-always-delegates-to-skipper)Stream deployment always delegates to Skipper

The 1.x series of Data Flow Server allowed for Streams to be deployed directly by the Data Flow Server or to delegate to Skipper. This resulted in two modes of operation, 'classic' and 'skipper'. Now there is just one option to deploy streams, via Skipper, which can deploy to all supported platforms and also provides rolling upgrade and downgrade functionality for long lived stream applications. Architecturally, tasks are deployed by the Data Flow server as before, but can now deploy across different platforms. See below for more on that functionality.

![The Spring Cloud Data Flow Stream Architecture](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/master/spring-cloud-dataflow-docs/src/main/asciidoc/images/arch-stream-dsl.png)

## [](#single-server-that-runs-on-all-supported-platforms)[](#single-server-that-runs-on-all-supported-platforms)Single server that runs on all supported platforms

We have consolidated the Local, Cloud Foundry, and Kubernetes servers into a single server, no need to pick different jar or docker images depending on what platform you want to run. The getting started steps for each platform remains largely the same. One big change is how Tasks are configured, see below, as we now support the capability for Tasks to be launched across different platforms. Long-lived applications can be deployed across different platforms as in previous releases.

## [](#launch-tasks-against-multiple-platforms)[](#launch-tasks-against-multiple-platforms)Launch tasks against multiple platforms

When a task is launched you can specify the platform where it will execute. Previously, this functionality was only available for Stream and Application deployment. The Data Flow server lets you configure multiple Kubernetes and Cloud Foundry task platforms. This is particularly useful when you want to orchestrate data pipelines against multiple platforms, but manage them all from a central location.

For example, if you are running Data Flow on Cloud Foundry in `org1/space1`, you can launch tasks in `org2/space2` or into a namespace of a Kubernetes cluster. Similarly, if you are running Data Flow on Kubernetes in `namespace`, you can launch tasks in `namespace2` or into `org1/space1` on Cloud Foundry. If running the Data Flow server locally, you can specify different local task platforms, say with different JVM properties, as an alternative to using task deployment properties. The docs describe how to configure multiple task platforms for [Local](http://docs.spring.io/spring-cloud-dataflow/docs/2.0.0.REFERENCE/reference/htmlsingle/#configuration-local-tasks), [Cloud Foundry](http://docs.spring.io/spring-cloud-dataflow/docs/2.0.0.REFERENCE/reference/htmlsingle/#configuration-cloudfoundry-tasks), and [Kubernetes](http://docs.spring.io/spring-cloud-dataflow/docs/2.0.0.REFERENCE/reference/htmlsingle/#configuration-kubernetes-tasks)

![The Spring Cloud Data Flow Task Architecture](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/master/spring-cloud-dataflow-docs/src/main/asciidoc/images/arch-task-dsl.png)

## [](#ui-improvements)[](#ui-improvements)UI Improvements

-   The UI supports launching a Task against a collection of back-end platforms.
    
-   The UI/UX is built with a consistent experience for both Stream and Task launches.
    
-   Building upon another important feature-set, it is now possible to automatically enable/disable Dashboard functionality based on granular roles defined in Data Flow.
    
-   A Grafana launch-icon is natively integrated in Dashboard’s Streams and Runtime pages. With Data Flow configured against the available Micrometer backends, monitoring streaming-pipeline metrics such as message-rates, error-counts, and latency is just a click away!
    
-   A new button to rollback to the previous version of a stream is now supported.
    
-   The analytics tab has been removed and has been replaced with a link to a micrometer-fed Grafana dashboard.
    
-   Angular has been upgraded to 7.2.4
    
-   Based on user feedback added a job restart button inside the execution page of a job.
    
-   The UI and Data Flow server now support searching audit records by date.
    

![The Spring Cloud Data Flow Audit Dashboard](https://github.com/spring-cloud/spring-cloud-dataflow/blob/master/spring-cloud-dataflow-docs/src/main/asciidoc/images/dataflow-audit-records-list-app-reg.png?raw=true)

## [](#standardize-on-oauth2-and-openid-connect-for-security)[](#standardize-on-oauth2-and-openid-connect-for-security)Standardize on OAuth2 and OpenID Connect for Security

A large amount of effort has gone into improving the security by adopting OAuth2 and OpenID Connect as the default security implementation. Traditional security options were removed. The token-based authorization, password-grant type validation, and LDAP integration are a few options, and they are consistently supported with the help of UAA as the backend.

[New granular roles](http://docs.spring.io/spring-cloud-dataflow/docs/2.0.0.M2/reference/htmlsingle/#configuration-security-customizing-authorization) to govern the stream/task deployment operations were added. The granularity brings better alignment with the intended action, and the client-tools (Shell and Dashboard) automatically also adapt to it.

There is a sample application that shows how to Spring Cloud Data Flow with a [Cloud Foundry User Account and Authentication](https://github.com/cloudfoundry/uaa) (UAA) Server backed by Lightweight Directory Access Protocol (LDAP) security. Also available is documentation and sample code showing how to [configure the `DataFlowTemplate` for use with OAuth2.0](http://docs.spring.io/spring-cloud-dataflow/docs/2.0.0.RELEASE/reference/htmlsingle/#_data_flow_template_and_security). Dependent libraries that had recent CVEs reported were updated.

The following video provides a walkthrough of the new OAuth2 security features and a composed task example using an LDAP backed UAA:

## [](#revamped-metrics-and-monitoring-of-deployed-applications)[](#revamped-metrics-and-monitoring-of-deployed-applications)Revamped metrics and monitoring of deployed applications

Data Flow 2.0 introduces a new architecture for collecting and displaying application metrics for Streams. The Data Flow Metrics Collector introduced in Data Flow 1.4 has been removed.

![Monitoring Architecture](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/master/spring-cloud-dataflow-docs/src/main/asciidoc/images/micrometer-arch.png)

This new architecture is based on using the [Micrometer library](http://micrometer.io/) in the deployed applications to send metrics to popular monitoring systems and then visualizing the metrics with [Grafana](https://grafana.com/). Each application in the [Einstein release train of the application starters](https://cloud.spring.io/spring-cloud-stream-app-starters/) contains Micrometer libraries for Prometheus, InfluxDB and DataDog.

We have provided instructions on how to get started using [Prometheus](http://docs.spring.io/spring-cloud-dataflow/docs/2.0.0.RELEASE/reference/htmlsingle/#streams-monitoring-local-prometheus) and [InfluxDB](http://docs.spring.io/spring-cloud-dataflow/docs/2.0.0.RELEASE/reference/htmlsingle/#streams-monitoring-local-influx) as the monitoring system for Data Flow running locally on your laptop. There are also instructions on how to get started using [Prometheus as the monitoring system when running Data Flow on Kubernetes](http://docs.spring.io/spring-cloud-dataflow/docs/2.0.0.RELEASE/reference/htmlsingle/#streams-monitoring-kubernetes-prometheus).

Links to the Grafana dashboard from the Data Flow UI are also provided. Two Grafana dashboards are also provided, one that shows a more application centric view and other that show a more stream based view. Here is a screenshot of the Grafana dashboard based on Prometheus showing the message rates for the applications in a stream.

![Grafana Dashboard for applications in a stream](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/master/spring-cloud-dataflow-docs/src/main/asciidoc/images/grafana-prometheus-scdf-applications-dashboard.png)

Selectors for applications and streams allows you to navigate down to specific areas of interest.

Here is a short video showing the Stream monitoring in action.

## [](#updated-analytics-using-micrometer)[](#updated-analytics-using-micrometer)Updated analytics using micrometer

In Data Flow 2.0, the use of Redis counters has been replaced with counters provided by the Micrometer library. The Einstein release train of application starters now provide a [Counter Processor](https://docs.spring.io/spring-cloud-stream-app-starters/docs/Einstein.RELEASE/reference/htmlsingle/#spring-cloud-stream-modules-counter-processor) and a [Counter Sink](https://docs.spring.io/spring-cloud-stream-app-starters/docs/Einstein.RELEASE/reference/htmlsingle/#spring-cloud-stream-modules-counter-sink). [The twitter analytics sample application](https://docs.spring.io/spring-cloud-dataflow-samples/docs/current/reference/htmlsingle/#spring-cloud-data-flow-samples-twitter-analytics-overview) has been updated to use the new counter implementation and a Grafana Dashboard is provided to show the equivalent view of what the Data Flow Analytics UI had previously shown.

![Grafana Dashboard for Twitter Analytics](https://docs.spring.io/spring-cloud-dataflow-samples/docs/current/reference/htmlsingle/images/twitter_analytics.png)

Here is a short video showing the new analytics functionality in action.

## [](#database-migration-support)[](#database-migration-support)Database migration support

Flyway migration code has been improved and tested across all supported databases using a suite of [Docker based integration tests](https://github.com/spring-cloud/spring-cloud-dataflow-acceptance-tests/blob/master/acceptance-tests/spring-cloud-dataflow-acceptance-tests/src/test/java/org/springframework/cloud/dataflow/acceptance/tests/DataflowServerMigrationTests.java).

## [](#update-to-boot-21)[](#update-to-boot-2-1)Update to Boot 2.1

The Data Flow Server 2.0 release is now based on Spring Boot 2.1. With this foundation shift we took some time to address technical debt and adopt to new features from Spring Boot. As we head towards Data Flow 2.0 GA, we will continue to address technical debt areas and some additional internal refactoring.

## [](#update-internals-to-use-jpa)[](#update-internals-to-use-jpa)Update internals to use JPA

Coming from Spring XD to Data Flow 1.x, we retained a few 'key-value' like tables and managed them via Spring JDBC APIs. We now updated to use Spring Data JPA.

## [](#taskjob-execution-and-performance-improvements)[](#task-job-execution-and-performance-improvements)Task/Job Execution and Performance improvements

Thanks to the community member Nicolas Widart for his thorough [bug report](https://github.com/spring-cloud/spring-cloud-dataflow/issues/2583) on the task-execution and the performance issues associated with it.

A new endpoint was added to avoid breaking changes to the existing REST resource which is now used behind the scenes in the client tools. With these changes, queries for task/batch execution history are almost 10x faster, helping when there are hundreds of steps in a batch job.

## [](#what-is-next)[](#what-is-next)What is next

While we have a few features in mind for 2.1, the focus on the next couple of months will be on documentation, getting started guides, videos and overall user experience. A new site for Data Flow is planned as well.

Also note that the 1.x line of Spring Cloud Data Flow will cease maintenance twelve months from this 2.0 GA announcement date, March 7th, 2020.

## [](#stay-in-touch)[](#stay-in-touch)Stay in touch…​

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) or [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-dataflow).