---
title: Spring Cloud Skipper 1.0 M1 Released
source: https://spring.io/blog/2017/10/30/spring-cloud-skipper-1-0-m1-released
scraped: 2026-02-23T16:13:41.503Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  October 30, 2017 | 0 Comments
---

# Spring Cloud Skipper 1.0 M1 Released

_Releases | Mark Pollack |  October 30, 2017 | 0 Comments_

On behalf of the team, I am pleased to announce the release of Spring Cloud Skipper 1.0 M1.

Skipper is a lightweight tool that allows you to discover Spring Boot applications and manage their lifecycle on multiple Cloud Platforms. You can use Skipper standalone or integrate it with Continuous Integration pipelines to help implement the practice of Continuous Deployment.

The main features in Skipper 1.0 M1 are:

-   Define multiple platform accounts where Spring Boot applications can be deployed. Supported platforms are Local, Cloud Foundry, and Kubernetes.
-   Substitute variables in Mustache templated files that describe how to deploy applications to a platform.
-   Search Package Repositories for existing applications.
-   Upgrade/Rollback a package based on a simple blue/green workflow.
-   Store the history of resolved template files (aka 'application manifests') which represent the final description of what has been deployed to a platform for a specific release.
-   Use via a standalone interactive shell or web API.

The [getting started section](https://docs.spring.io/spring-cloud-skipper/docs/1.0.0.M1/reference/htmlsingle/#getting-started-installing-skipper) in the reference guide is the best place to start kicking the tires.

This project was born out of providing continuous delivery features in [Spring Cloud Data Flow](http://cloud.spring.io/spring-cloud-dataflow/). In Data Flow, data pipelines are created which consist of two or more microservice applications that evolve independent from each other. It was later recognized that instead of addressing these features in Data Flow, a more general purpose project, Spring Cloud Skipper, should be created so that it can also be a useful tool outside the context of Spring Cloud Data Flow.

In the short term, Skipper’s main use-case is to deploy [Spring Cloud Stream](http://cloud.spring.io/spring-cloud-stream/) applications via Data Flow. However, we are looking to support templating of Cloud Foundry manifests and deploying them in a `cf push` style.

Please reach out on [Github issues](https://github.com/spring-cloud/spring-cloud-skipper/issues), [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud-skipper), and the [Gitter channel](https://gitter.im/spring-cloud/spring-cloud-skipper) with questions, feedback or contributions.