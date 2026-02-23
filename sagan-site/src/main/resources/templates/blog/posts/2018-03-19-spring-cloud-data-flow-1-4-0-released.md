---
title: Spring Cloud Data Flow 1.4.0 Released
source: https://spring.io/blog/2018/03/19/spring-cloud-data-flow-1-4-0-released
scraped: 2026-02-23T16:05:35.207Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gunnar Hillert |  March 19, 2018 | 0 Comments
---

# Spring Cloud Data Flow 1.4.0 Released

_Releases | Gunnar Hillert |  March 19, 2018 | 0 Comments_

The **[Spring Cloud Data Flow](https://cloud.spring.io/spring-cloud-dataflow/)** team is pleased to announce the final `1.4.0` GA release. Follow the *Getting Started* guides for [Local Server](https://docs.spring.io/spring-cloud-dataflow/docs/1.4.0.RELEASE/reference/htmlsingle/#getting-started), [Cloud Foundry](https://docs.spring.io/spring-cloud-dataflow-server-cloudfoundry/docs/1.4.0.RELEASE/reference/htmlsingle/#getting-started), and [Kubernetes](https://docs.spring.io/spring-cloud-dataflow-server-kubernetes/docs/1.4.0.RELEASE/reference/htmlsingle/#kubernetes-getting-started).

This release packs in quite a few improvements including:

-   Dashboard improvements
    
-   Ability to manage app versions (in Skipper mode)
    
-   New stream deployment builder (in Skipper mode)
    
-   Docker compose for development
    
-   Security improvements
    
-   Proxy server support for the Shell
    
-   LDAP Role Mapping support
    
-   Documentation improvements
    

## [](#dashboard-improvements)[](#dashboard-improvements)Dashboard Improvements

A substantial focus of the `1.4.0` release has been the [Dashboard UI](https://github.com/spring-cloud/spring-cloud-dataflow-ui) and its integration with [Spring Cloud Skipper](https://cloud.spring.io/spring-cloud-skipper/).

### [](#manage-app-versions)[](#manage-app-versions)Manage App Versions

With the Skipper mode enabled, you can now manage the versions of App Registrations and set a default version.

![Manage Versions](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/gh-pages/img/ui-manage-versions-1-4-0-M1.png)

The version information is now shown on the App Registration list page as well. Besides providing better visual hues regarding the *Application Types* (`Source`, `Sink`, `Task`, `Processor`), you can now also search for App Registrations by *Application Type*.

![Manage Versions](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/gh-pages/img/ui-applications-list-1-4-0-M1v2.png)

Additionally, when browsing the App Registration details, you can easily select the version for which you would like to see the details.

![Application Details](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/gh-pages/img/ui-application-details-1-4-0-M1.png)

When deploying streams, you now have the ability to deploy them to multiple platforms.

![Deploy Streams to Platform](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/gh-pages/img/ui-deploy-stream-1-4-0-M1v2.png)

### [](#new-stream-deployment-builder)[](#new-stream-deployment-builder)New Stream Deployment Builder

In Skipper mode, we have added a brand new stream deployment builder form to simplify the selection of the targeted platform and the properties while deploying a stream. The options include overrides to the deployment platform and the deployer, application and global properties for the streaming pipeline.

![Deployment Properties](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/gh-pages/img/ui-deployment-properties-1-4-0-RC1.png)

## [](#docker-compose-for-development)[](#docker-compose-for-development)Docker Compose for Development

To simplify the getting started experience for the Local Server, we have added the [Docker Compose](https://docs.spring.io/spring-cloud-dataflow/docs/1.4.0.RELEASE/reference/htmlsingle/#getting-started-deploying-spring-cloud-dataflow-docker) support, which when run as a single command from the CLI, it will automatically provision the latest release of the Local-server along with Apache Kafka for messaging and H2 database to back the SCDF repository.

In addition to the out-of-the-box experience, you can also [customize](https://docs.spring.io/spring-cloud-dataflow/docs/1.4.0.RELEASE/reference/htmlsingle/#getting-started-customizing-spring-cloud-dataflow-docker) to switch to RabbitMQ for messaging, MySQL for database, or add Redis for Analytics.

## [](#security)[](#security)Security

### [](#proxy-server-support-for-the-shell)[](#proxy-server-support-for-the-shell)Proxy Server Support for the Shell

Using the *Spring Cloud Data Flow Shell* you can now specify a Proxy server when targeting the Data Flow server. This works either via command line arguments when starting the Shell or via additional options for the `dataflow config server` command. We support basic username/password authentication as well as SSL when connection to the *Spring Cloud Data Flow Server* via a proxy server.

### [](#ldap-role-mapping-support)[](#ldap-role-mapping-support)LDAP Role Mapping Support

On the security side, his release adds support for [mapping](https://docs.spring.io/spring-cloud-dataflow/docs/1.4.0.RELEASE/reference/htmlsingle/#_ldap_role_mapping) the LDAP Active Directory Groups with the roles in Spring Cloud Data Flow. No need of extra translations or filtering; with Active Directory definition and the right mapping in SCDF, the desired authorization role can be automatically applied.

## [](#documentation)[](#documentation)Documentation

Lastly, in this release we also polished the [Reference Documentation](https://docs.spring.io/spring-cloud-dataflow/docs/1.4.0.RELEASE/reference/htmlsingle/) and documented among other things the UI support for [named destinations](https://docs.spring.io/spring-cloud-dataflow/docs/1.4.0.RELEASE/reference/htmlsingle/#spring-cloud-dataflow-stream-dsl-named-destinations) to facilitate [fan-in/fan-out](https://docs.spring.io/spring-cloud-dataflow/docs/1.4.0.RELEASE/reference/htmlsingle/#_creating_fan_in_fan_out_streams) scenarios.

Lastly, this release also addresses a few technical debt chores and bug-fixes. For more details, check out the [release notes](https://github.com/spring-cloud/spring-cloud-dataflow/releases/tag/v1.4.0.RELEASE).

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) or [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-dataflow).

Please try it out, share your feedback, and consider contributing to the project!