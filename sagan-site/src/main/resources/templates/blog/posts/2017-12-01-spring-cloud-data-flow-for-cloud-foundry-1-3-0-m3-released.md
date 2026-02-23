---
title: Spring Cloud Data Flow for Cloud Foundry 1.3.0.M3 released
source: https://spring.io/blog/2017/12/01/spring-cloud-data-flow-for-cloud-foundry-1-3-0-m3-released
scraped: 2026-02-23T16:12:55.513Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Pollack |  December 01, 2017 | 0 Comments
---

# Spring Cloud Data Flow for Cloud Foundry 1.3.0.M3 released

_Engineering | Mark Pollack |  December 01, 2017 | 0 Comments_

We are pleased to announce the 1.3.0.M3 release of the Spring Cloud Data Flow for Cloud Foundry.

The [Getting Started Guide](https://docs.spring.io/spring-cloud-dataflow/docs/1.3.0.M3/reference/htmlsingle/#getting-started) is the best place to start kicking the tires.

# [](#release-highlights)[](#release-highlights)Release Highlights

Stream updates, a JavaDSL, and the complete port of the UI to the Angular 4.0 stack are some of the main highlights. More information on release highlights can be found in the [release blog](https://spring.io/blog/2017/11/29/spring-cloud-data-flow-1-3-0-m3-released) for the core Data Flow project.

Of note for the Cloud Foundry server is an upgrade to v2.23.0 of the cf-java client library and setting the default health check to be `http` instead of `port`. You can now also specify the health check endpoint URL and timeout values as deployment properties.

Looking ahead, we are aiming for 1.3.0 RC1 in a few weeks followed by the general availability release by end of January 2018.

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) or [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow-server-cloudfoundry/issues) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-stream).

Please try it out, share your feedback, and consider contributing to the project!