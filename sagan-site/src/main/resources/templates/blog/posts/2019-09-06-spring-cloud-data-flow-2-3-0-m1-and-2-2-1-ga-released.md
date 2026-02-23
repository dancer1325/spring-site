---
title: Spring Cloud Data Flow 2.3.0.M1 and 2.2.1 GA Released
source: https://spring.io/blog/2019/09/06/spring-cloud-data-flow-2-3-0-m1-and-2-2-1-ga-released
scraped: 2026-02-23T14:37:19.616Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ilayaperumal Gopinathan |  September 06, 2019 | 0 Comments
---

# Spring Cloud Data Flow 2.3.0.M1 and 2.2.1 GA Released

_Engineering | Ilayaperumal Gopinathan |  September 06, 2019 | 0 Comments_

The [Spring Cloud Data Flow](https://cloud.spring.io/spring-cloud-dataflow/) team is pleased to announce the milestone release 2.3.0.M1 and the release of 2.2.1 GA.

Along with the bug fixes and enhancements, the first milestone of 2.3.0 also has the following new features:

-   Improved Prometheus monitoring based on [Prometheus RSocket](https://github.com/micrometer-metrics/prometheus-rsocket-proxy). It uses persistent bidirectional (RSocket) connections between the Stream/Task applications and a Prometheus RSocket Proxy instance. When Prometheus scrapes the proxy instance, and the proxy, in turn, uses the connections to pull metrics from the applications.
-   Ability to pass OAuth Access Token as command-line arguments for [Composed Tasks](https://docs.spring.io/spring-cloud-dataflow/docs/2.3.0.M1/reference/htmlsingle/#_configuration_options)
-   Users can now specify a description of the stream when creating it. Thanks to `Daniel Serleg` for the contribution!
-   Spring Cloud Scheduler SPI is now merged into Spring Cloud Deployer. We’ll deprecate the explicit `spring-cloud-scheduler` project and its implementations on Cloud Foundry, K8s and have them available as part of `spring-cloud-deployer`.

You can see the full list of [changes](https://github.com/spring-cloud/spring-cloud-dataflow/releases/tag/v2.3.0.M1) on Github.

The release 2.2.1 GA is mostly the bug fixes on 2.2.x base and you can see the [changes](https://github.com/spring-cloud/spring-cloud-dataflow/releases/tag/v2.2.1.RELEASE) on Github.

## [](#stay-in-touch)Stay in touch...

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) or [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-dataflow).