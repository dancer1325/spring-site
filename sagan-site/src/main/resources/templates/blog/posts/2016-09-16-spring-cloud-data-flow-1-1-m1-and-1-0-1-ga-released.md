---
title: Spring Cloud Data Flow 1.1 M1  and 1.0.1 GA released
source: https://spring.io/blog/2016/09/16/spring-cloud-data-flow-1-1-m1-and-1-0-1-ga-released
scraped: 2026-02-23T19:04:58.004Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  September 16, 2016 | 0 Comments
---

# Spring Cloud Data Flow 1.1 M1  and 1.0.1 GA released

_Releases | Thomas Risberg |  September 16, 2016 | 0 Comments_

On behalf of the team, I am excited to announce the release of the first milestone of Spring Cloud Data Flow 1.1 along with a 1.0.1 maintenance release for the 1.0 version.

*Note:* A great way to start using this new release(s) is to follow the [release matrix](http://cloud.spring.io/spring-cloud-dataflow/#spring-cloud-data-flow-server-implementations) on the project page, which includes the download coordinates and the links to the reference guide.

## [](#11-m1-release)1.1 M1 release

Over the last few weeks, we have added new features and improvements to the overall orchestration of data microservices. The following new features were included in the 1.1.0.M1 release:

### [](#security)Security

-   Adds [LDAP backend-authentication](http://docs.spring.io/spring-cloud-dataflow/docs/1.1.0.M1/reference/html/getting-started-security.html#getting-started-security-ldap-authentication)
-   Adds [Basic backend-authentication](http://docs.spring.io/spring-cloud-dataflow/docs/1.1.0.M1/reference/html/getting-started-security.html#getting-started-security-basic-authentication)
-   Adds [File backend-authentication](http://docs.spring.io/spring-cloud-dataflow/docs/1.1.0.M1/reference/html/getting-started-security.html#getting-started-security-file-based-authentication)
-   Improvements to [OAUTH backed-authentication](http://docs.spring.io/spring-cloud-dataflow/docs/1.1.0.M1/reference/html/getting-started-security.html#getting-started-security-ldap-authentication)

### [](#spring-boot-13x-and-14x-compatibility)Spring Boot 1.3.x and 1.4.x Compatibility

-   Adds backward compatibility for “[property whitelisting](http://docs.spring.io/spring-cloud-dataflow/docs/1.1.0.M1/reference/html/spring-cloud-dataflow-register-apps.html#spring-cloud-dataflow-stream-app-whitelisting)” to support both Spring Boot 1.3.x and 1.4.x applications

### [](#ui-improvements)UI improvements

-   Builds upon [0.5.1](https://github.com/spring-projects/spring-flo/releases/tag/v0.5.1) release of Spring Flo
-   Adds bulk import and registration of stream and task app-starters
-   Adds Flo’s visual representation of running streams
-   Adds stream deployment progress

### [](#general)General

-   Adds the ability to turn-off analytics infrastructure in entirety
-   Adds REST-Docs infrastructure for core REST-APIs
-   Test coverage improvements

Review the [1.1.0.M1 (core)](https://github.com/spring-cloud/spring-cloud-dataflow/milestone/7?closed=1) / [1.1.0.M1 (ui)](https://github.com/spring-cloud/spring-cloud-dataflow-ui/milestone/7?closed=1) release markers to learn more about the incremental improvements.

Looking ahead, we are targeting 1.1 GA release of Spring Cloud Stream and building upon this, Spring Cloud Data Flow would support Apache Kafka’s 0.9/0.10 releases, schema-evolution, and the newly improved reactive-streaming capabilities. Dynamic scaling and auto-rebalancing of stream partitions would be supported as well.

Likewise, we are targeting 1.1 GA release of Spring Cloud Task with improvements including updates to task partitions, newer database schemas, support for external execution ids, and the improved interoperability between streaming and task pipelines in Spring Cloud Data Flow.

Look out for significant improvements to UI/UX around Task workflows. Better paging, sorting, monitoring, and search capabilities, including Flo support for “composed tasks” is coming.

## [](#101-ga-release)1.0.1 GA release

The 1.0.1 release builds upon 1.0.2.RELEASE of Spring Cloud Task, bug-fixes and documentation improvements.

Review the [1.0.1.RELEASE release marker](https://github.com/spring-cloud/spring-cloud-dataflow/milestone/5?closed=1) to learn more about the incremental improvements.

## [](#upcoming-webinar)Upcoming webinar

Tune-in to “[Data Microservices in the Cloud](https://spring.io/blog/2016/09/13/webinar-data-microservices-in-the-cloud)” webinar scheduled on 9/29/2016 to learn more about Spring Cloud Data Flow and the incremental improvements.