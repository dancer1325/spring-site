---
title: Spring Cloud Data Flow 1.4 RC1 released
source: https://spring.io/blog/2018/03/12/spring-cloud-data-flow-1-4-rc1-released
scraped: 2026-02-23T16:06:07.680Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gunnar Hillert |  March 12, 2018 | 0 Comments
---

# Spring Cloud Data Flow 1.4 RC1 released

_Releases | Gunnar Hillert |  March 12, 2018 | 0 Comments_

The Spring Cloud Data Flow team is pleased to announce the release of 1.4.0 RC1. Follow the *Getting Started* guides for [Local Server](https://docs.spring.io/spring-cloud-dataflow/docs/1.4.0.RC1/reference/htmlsingle/#getting-started), [Cloud Foundry](https://docs.spring.io/spring-cloud-dataflow-server-cloudfoundry/docs/1.4.0.RC1/reference/htmlsingle/#getting-started), and [Kubernetes](https://docs.spring.io/spring-cloud-dataflow-server-kubernetes/docs/1.4.0.RC1/reference/htmlsingle/#kubernetes-getting-started).

Following are the release highlights:

## [](#stream-deployment-ux)[](#stream-deployment-ux)Stream Deployment UX

In Skipper mode, we have added a brand new stream deployment builder form to simplify the selection of platform and the properties while deploying a stream. The options include override to the deployment platform and the deployer, application and global properties for the streaming pipeline.

![Deployment Properties](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/gh-pages/img/ui-deployment-properties-1-4-0-RC1.png)

## [](#docker-compose-for-development)[](#docker-compose-for-development)Docker Compose for Development

To simplify the getting started experience for the Local Server, we have added the [Docker Compose](https://docs.spring.io/spring-cloud-dataflow/docs/1.4.0.RC1/reference/htmlsingle/#getting-started-deploying-spring-cloud-dataflow-docker) support, which when run as a single command from the CLI, it will automatically provision the latest release of the Local-server along with Apache Kafka for messaging and H2 database to back the SCDF repository.

In addition to the out-of-the-box experience, you can also [customize](https://docs.spring.io/spring-cloud-dataflow/docs/1.4.0.RC1/reference/htmlsingle/#getting-started-customizing-spring-cloud-dataflow-docker) to switch to RabbitMQ for messaging, MySQL for database, or add Redis for Analytics.

## [](#security)[](#security)Security

Based on the recent feedback, this release adds support for [mapping](https://docs.spring.io/spring-cloud-dataflow/docs/1.4.0.RC1/reference/htmlsingle/#_ldap_role_mapping) the LDAP Active Directory Groups with the roles in Spring Cloud Data Flow. No need of extra translations or filtering; with Active Directory definition and the right mapping in SCDF, the desired authorization role can be automatically applied.

This release also addressed a few technical debt chores and bug-fixes. For more details, check out the [release notes](https://github.com/spring-cloud/spring-cloud-dataflow/releases/tag/v1.4.0.RC1).

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) or [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-dataflow).

Please try it out, share your feedback, and consider contributing to the project!