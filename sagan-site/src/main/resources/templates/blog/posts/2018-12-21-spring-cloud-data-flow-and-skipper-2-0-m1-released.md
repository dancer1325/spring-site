---
title: Spring Cloud Data Flow and Skipper 2.0 M1 Released
source: https://spring.io/blog/2018/12/21/spring-cloud-data-flow-and-skipper-2-0-m1-released
scraped: 2026-02-23T15:03:54.149Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  December 21, 2018 | 0 Comments
---

# Spring Cloud Data Flow and Skipper 2.0 M1 Released

_Releases | Mark Pollack |  December 21, 2018 | 0 Comments_

The [Spring Cloud Data Flow](https://cloud.spring.io/spring-cloud-dataflow/) team is pleased to announce the release of `2.0 M1` Follow the *Getting Started* guides for running on [Local](https://docs.spring.io/spring-cloud-dataflow/docs/2.0.0.M1/reference/htmlsingle/#getting-started-local), [Cloud Foundry](https://docs.spring.io/spring-cloud-dataflow/docs/2.0.0.M1/reference/htmlsingle/#getting-started-cloudfoundry), and [Kubernetes](https://docs.spring.io/spring-cloud-dataflow/docs/2.0.0.M1/reference/htmlsingle/#getting-started-kubernetes).

Hand in hand is the `2.0 M1` release of [Spring Cloud Skipper](https://cloud.spring.io/spring-cloud-skipper/) which has been updated to depend upon Spring Boot 2.1. The [getting started section](https://docs.spring.io/spring-cloud-skipper/docs/2.0.0.M1/reference/htmlsingle/#getting-started) in the reference guide is the best place to start kicking the tires.

## [](#here-are-the-highlights-for-data-flow)[](#here-are-the-highlights-for-data-flow)Here are the highlights for Data Flow

-   Stream deployment always delegates to Skipper
    
-   Single server that runs on all supported platforms
    
-   Update to Boot 2.1
    
-   Standardize on OAuth2 and OpenID Connect for Security
    
-   Update internals to use JPA
    
-   UI improvements
    
-   Task/Job Execution and Performance improvements
    

## [](#stream-deployment-always-delegates-to-skipper)[](#stream-deployment-always-delegates-to-skipper)Stream deployment always delegates to Skipper

The 1.x series of Data Flow Server allowed for Streams to be deployed directly by the Data Flow Server or to delegate to Skipper. This resulted in two modes of operation, 'classic' and 'skipper'. Now there is just one option to deploy streams, via Skipper, which provides rolling upgrade and downgrade functionality for stream applications. Tasks are deployed by the Data Flow server as before.

## [](#single-server-that-runs-on-all-supported-platforms)[](#single-server-that-runs-on-all-supported-platforms)Single server that runs on all supported platforms

We have consolidated the Local, Cloud Foundry, and Kubernetes servers into a single server, no need to pick different jar or docker images depending on what platform you want to run. The getting started steps for each platfrom remains largely the same. One big change is how Tasks are configured, as we are opening up the capability for Tasks to be launched across different platforms.

## [](#update-to-boot-21)[](#update-to-boot-2-1)Update to Boot 2.1

The Data Flow Server 2.0 release is now based on Spring Boot 2.1. With this foundation shift we took some time to address technical debt and adopt to new features from Spring Boot. As we head towards Data Flow 2.0 GA, we will continue to address technical debt areas and some additional internal refactoring.

## [](#standardize-on-oauth2-and-openid-connect-for-security)[](#standardize-on-oauth2-and-openid-connect-for-security)Standardize on OAuth2 and OpenID Connect for Security

A large amount of effort has gone into improving the security by adoptiong OAuth2 and OpenID connect as the default security implementation. Traditional security options were removed. Token authorization, lifecycle-management, revocation, and renewal are all part of this feature-set, and we are excited about the developer experience this brings to our users.

## [](#update-internals-to-use-jpa)[](#update-internals-to-use-jpa)Update internals to use JPA

Coming from Spring XD to Data Flow 1.x, we retained a few 'key-value' like tables and managed them via Spring JDBC APIs. We now updated to use Spring Data JPA and will introduce Flyway for schema management in a future milestone release.

## [](#ui-improvements)[](#ui-improvements)UI improvements

Improvements to the Dashboard continue in a regular pace. Angular has been upgraded to 7.1.1 and based on user feedback added a job restart button inside the execution page of a job.

## [](#taskjob-execution-and-performance-improvements)[](#task-job-execution-and-performance-improvements)Task/Job Execution and Performance improvements

Thanks to the community member Nicolas Widart for his thorough [bug report](https://github.com/spring-cloud/spring-cloud-dataflow/issues/2583) on the task-execution and the performance issues associated with it.

A new endpoint was added to avoid breaking changes to the existing REST resource which is now used behind the scenes in the client tools. With these changes, queries for task/batch execution history are almost 10x faster, helping when there are hundreds of steps in a batch job.

## [](#what-is-next)[](#what-is-next)What is next

The 2.0 M2 release will provide an overhaul of the Analytics support - migrating to use Micrometer and it’s supported backends instead of the current Redis based functionality. The Analytics Dashboard will also be retired and use of more production grade tools such as Grafana will be possible. Metric collection will also undergo a similar change, the servers and the out of the box applications will be instrumented with the Mirometer library for some popular monitoring platforms. The Spring Cloud Metrics Collector will no longer be used. Task support will get some improvements, allowing for the Data Flow server to launch tasks across platforms. We are also working on a new Data Flow web site that will provide a better experience to understand how you can use Data Flow for a wide variety of use-cases.

Also note that the 1.x line of Spring Cloud Data Flow will cease maintenance twelve months from the 2.0 GA announcement date. The 2.,0 GA is tentatively planned for February 2019, so in February 2020, the 1.x line would reach end-of-general-support status.

## [](#stay-in-touch)[](#stay-in-touch)Stay in touch…​

Happy Holidays and New Year! As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) or [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-dataflow).