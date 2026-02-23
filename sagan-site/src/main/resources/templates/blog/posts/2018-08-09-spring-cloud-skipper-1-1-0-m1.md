---
title: Spring Cloud Skipper 1.1.0.M1
source: https://spring.io/blog/2018/08/09/spring-cloud-skipper-1-1-0-m1
scraped: 2026-02-23T15:16:55.454Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ilayaperumal Gopinathan |  August 09, 2018 | 0 Comments
---

# Spring Cloud Skipper 1.1.0.M1

_Releases | Ilayaperumal Gopinathan |  August 09, 2018 | 0 Comments_

We are pleased to announce the release of Spring Cloud Skipper 1.1.0.M1

Spring Cloud Skipper is a lightweight tool that allows you to discover Spring Boot applications and manage their lifecycle on multiple Cloud Platforms. You can use Skipper standalone or integrate it with Continuous Integration pipelines to help implement the practice of Continuous Deployment.

The [getting started section](https://docs.spring.io/spring-cloud-skipper/docs/1.1.0.M1/reference/htmlsingle/#getting-started) in the reference guide is the best place to start kicking the tires.

Focus on Cloud Foundry manifest:

This milestone release adds a new feature to perform the lifecycle operations to install, upgrade, rollback and delete on any applications that can be deployed into Cloud Foundry using the Cloud Foundry `manifest` format.

To do this, we are introducing a new "kind" with the name `CloudFoundryApplication` as a specification, which can include Cloud Foundry manifest entries as mentioned [here](https://docs.spring.io/spring-cloud-skipper/docs/1.1.0.M1/reference/htmlsingle/#package-templates-cf). These manifest entries can be overridden during install/upgrade operations. Check out these [examples](https://docs.spring.io/spring-cloud-skipper/docs/1.1.0.M1/reference/htmlsingle/#tour-cf-manifest) to learn more about how Cloud Foundry manifest based packages are managed in Skipper.

Please reach out on [GitHub Issues](https://github.com/spring-cloud/spring-cloud-skipper/issues), [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud-skipper), and the [Gitter channel](https://gitter.im/spring-cloud/spring-cloud-skipper) with questions, feedback or contributions.