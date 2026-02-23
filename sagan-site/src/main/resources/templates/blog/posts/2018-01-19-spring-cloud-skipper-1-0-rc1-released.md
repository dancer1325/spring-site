---
title: Spring Cloud Skipper 1.0 RC1 Released
source: https://spring.io/blog/2018/01/19/spring-cloud-skipper-1-0-rc1-released
scraped: 2026-02-23T16:11:13.572Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  January 19, 2018 | 0 Comments
---

# Spring Cloud Skipper 1.0 RC1 Released

_Releases | Mark Pollack |  January 19, 2018 | 0 Comments_

On behalf of the team, I am pleased to announce the release of Spring Cloud Skipper 1.0 RC1.

Skipper is a lightweight tool that allows you to discover Spring Boot applications and manage their lifecycle on multiple Cloud Platforms. You can use Skipper standalone or integrate it with Continuous Integration pipelines to help implement the practice of Continuous Deployment.

The 1.0 RC1 release fixes several bugs and introduces a some new features.

-   OAuth Security support.
-   Release install, upgrade, and rollback workflow managed using the [Spring StateMachine](https://projects.spring.io/spring-statemachine/) project.
-   REST API improvements.
-   Database Schemas managed using Flyway.
-   Package deletion, checking for active Releases.
-   Release deletion with optional package deletion.
-   Shell commands follow a consistent format, e.g. platform list, release status.
-   Add support for ResourceMetadata URIs in package template.
-   Support for interactive and non-interactive shell modes.
-   Improved conversion from java.util.Properties, to YAML in shell.

The [getting started section](https://docs.spring.io/spring-cloud-skipper/docs/1.0.0.RC1/reference/htmlsingle/#getting-started-installing-skipper) in the reference guide is the best place to start kicking the tires.

Please reach out on [Github issues](https://github.com/spring-cloud/spring-cloud-skipper/issues), [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud-skipper), and the [Gitter channel](https://gitter.im/spring-cloud/spring-cloud-skipper) with questions, feedback or contributions.