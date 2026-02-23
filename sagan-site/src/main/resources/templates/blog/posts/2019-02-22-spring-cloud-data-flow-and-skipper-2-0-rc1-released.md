---
title: Spring Cloud Data Flow and Skipper 2.0 RC1 Released
source: https://spring.io/blog/2019/02/22/spring-cloud-data-flow-and-skipper-2-0-rc1-released
scraped: 2026-02-23T14:57:06.420Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  February 22, 2019 | 1 Comment
---

# Spring Cloud Data Flow and Skipper 2.0 RC1 Released

_Releases | Mark Pollack |  February 22, 2019 | 1 Comment_

The [Spring Cloud Data Flow](https://cloud.spring.io/spring-cloud-dataflow/) team is pleased to announce the release of `2.0 RC1` of Data Flow. Follow the *Getting Started* guides for running on [Local](https://docs.spring.io/spring-cloud-dataflow/docs/2.0.0.RC1/reference/htmlsingle/#getting-started-local), [Cloud Foundry](https://docs.spring.io/spring-cloud-dataflow/docs/2.0.0.RC1/reference/htmlsingle/#getting-started-cloudfoundry), and [Kubernetes](https://docs.spring.io/spring-cloud-dataflow/docs/2.0.0.RC1/reference/htmlsingle/#getting-started-kubernetes).

Hand in hand is the `2.0 RC1` release of [Spring Cloud Skipper](https://cloud.spring.io/spring-cloud-skipper/). The [getting started section](https://docs.spring.io/spring-cloud-skipper/docs/2.0.0.RC1/reference/htmlsingle/#getting-started) in the reference guide is the best place to start if you want to use Skipper separately from Data Flow.

## [](#here-are-the-highlights-for-data-flow)[](#here-are-the-highlights-for-data-flow)Here are the highlights for Data Flow

-   Revamped metrics and monitoring of deployed applications on Kubernetes
    
-   Updated analytics using micrometer
    
-   Security improvements
    
-   Dashboard improvements
    
-   Database migration support
    

## [](#revamped-metrics-and-monitoring-of-deployed-applications-on-kubernetes)[](#revamped-metrics-and-monitoring-of-deployed-applications-on-kubernetes)Revamped metrics and monitoring of deployed applications on Kubernetes

Data Flow 2.0 introduces a new architecture for collecting and displaying application metrics for Streams. The Data Flow Metrics Collector introduced in Data Flow 1.4 has been removed.

![Monitoring Architecture](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/master/spring-cloud-dataflow-docs/src/main/asciidoc/images/micrometer-arch.png)

This new architecture is based on using the Micrometer library in the deployed applications to send metrics to popular monitoring systems and then visualizing the metrics with [Grafana](https://grafana.com/). Each application in the [Einstein release train of the application starters](https://cloud.spring.io/spring-cloud-stream-app-starters/) contains Micrometer libraries for Prometheus, InfluxDB and DataDog.

In this release we provide instructions on how to get started using [Prometheus](http://docs.spring.io/spring-cloud-dataflow/docs/2.0.0.RC1/reference/htmlsingle/#streams-monitoring-kubernetes-prometheus) as the monitoring system when running Data Flow on Kubernetes. Two Grafana dashboards are also provided, one that shows a more application centric view and other that show a more stream based view. Here is a screenshot of the Grafana dashboard based on Prometheus showing the message rates for the applications in a stream.

![Grafana Dashboard for applications in a stream deployed on Kubernetes](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/master/spring-cloud-dataflow-docs/src/main/asciidoc/images/grafana-prometheus-scdf-applications-dashboard.png)

Selectors for applications and streams allows you to navigate down to specific areas of interest.

## [](#updated-analytics-using-micrometer)[](#updated-analytics-using-micrometer)Updated analytics using micrometer

In Data Flow 2.0, the use of Redis counters has been replaced with counters provided by the Micrometer library. The Einstein release train of application starters now provide a [Counter Processor](https://docs.spring.io/spring-cloud-stream-app-starters/docs/Einstein.RELEASE/reference/htmlsingle/#spring-cloud-stream-modules-counter-processor) and a [Counter Sink](https://docs.spring.io/spring-cloud-stream-app-starters/docs/Einstein.RELEASE/reference/htmlsingle/#spring-cloud-stream-modules-counter-sink). [The twitter analytics sample application](https://docs.spring.io/spring-cloud-dataflow-samples/docs/current/reference/htmlsingle/#spring-cloud-data-flow-samples-twitter-analytics-overview) has been updated to use the new counter implementation and a Grafana Dashboard is provided to show the equivalent view of what the Data Flow Analytics UI had previously shown.

![Grafana Dashboard for Twitter Analytics](https://docs.spring.io/spring-cloud-dataflow-samples/docs/current/reference/htmlsingle/images/twitter_analytics.png)

## [](#security-improvements)[](#security-improvements)Security improvements

The server uses OAuth 2.0 authentication to secure the REST endpoints. Documentation and sample code is now available that shows how to [configure the `DataFlowTemplate` for use with OAuth2.0](http://docs.spring.io/spring-cloud-dataflow/docs/2.0.0.RC1/reference/htmlsingle/#_data_flow_template_and_security). Dependent libraries that had recent CVEs reported were updated.

## [](#dashboard-improvements)[](#dashboard-improvements)Dashboard improvements

You can now search the audit trail by a date range.

## [](#database-migration-support)[](#database-migration-support)Database migration support

Flyway migration code has been improved and tested across all supported databases using a suite of [Docker based integration tests](https://github.com/spring-cloud/spring-cloud-dataflow-acceptance-tests/blob/master/acceptance-tests/spring-cloud-dataflow-acceptance-tests/src/test/java/org/springframework/cloud/dataflow/acceptance/tests/DataflowServerMigrationTests.java).

## [](#what-is-next)[](#what-is-next)What is next

We postponed the feature of storing the detailed history of Task deployments for 2.1. Various documentation issues and additional testing is planned leading up to the 2.0 GA release. General themes for 2.1 will be a focus on documentation, getting started guides, videos and overall user experience. A new site for Data Flow is planned as well.

Also note that the 1.x line of Spring Cloud Data Flow will cease maintenance twelve months from the 2.0 GA announcement date. The 2.0 GA is tentatively planned for end of February 2019, so in February 2020, the 1.x line would reach end-of-general-support status.

## [](#a-special-thanks)[](#a-special-thanks)A special thanks

Last but not least, we wanted to thank [Daniel Serleg](https://github.com/sylank) for [his many contributions in this release](https://github.com/spring-cloud/spring-cloud-dataflow/pulls?q=is%3Apr+author%3Asylank).

## [](#stay-in-touch)[](#stay-in-touch)Stay in touch…​

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) or [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-dataflow).