---
title: Spring Authorization Server Is Going 1.0
source: https://spring.io/blog/2022/07/28/spring-authorization-server-is-going-1-0
scraped: 2026-02-23T10:45:24.874Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Joe Grandja |  July 28, 2022 | 6 Comments
---

# Spring Authorization Server Is Going 1.0

_Engineering | Joe Grandja |  July 28, 2022 | 6 Comments_

We are excited to announce that we’ve started preparing for Spring Authorization Server 1.0 with plans to release the GA version in November 2022. It has been just over two years since we [initially announced](https://spring.io/blog/2020/04/15/announcing-the-spring-authorization-server) this new project, and we have come a long way since its initial development. The project has a full [feature set](https://docs.spring.io/spring-authorization-server/docs/current/reference/html/overview.html#feature-list), and the APIs have stabilized and matured over this time. A lot of effort and care was put into this project to ensure that it can grow and adapt over the next few years.

Spring Authorization Server 1.0 will be based on Spring Security 6.0, which will be based off of [Spring Framework 6.0](https://spring.io/blog/2021/09/02/a-java-17-and-jakarta-ee-9-baseline-for-spring-framework-6) and will require a minimum of Java 17 at runtime, as well as a minimum of Tomcat 10 or Jetty 11 (for Jakarta EE 9 compatibility). This major release will inherit the [VMware Tanzu OSS support policy](https://tanzu.vmware.com/support/oss). [Commercial support](https://tanzu.vmware.com/spring-runtime), which offers an extended support period, is also available from VMware.

In addition to Spring Authorization Server 1.0, we will also release Spring Authorization Server 0.4.0, which will continue to be based on Spring Security 5.x and Java 8. The 0.4.x branch will continue to use its own [support policy](https://github.com/spring-projects/spring-authorization-server/blob/main/SUPPORT_POLICY.adoc).

Over the next couple of months, we will focus on fine-tuning the public APIs and enhancing the configuration model to allow for easier configuration and greater extensibility. We will also make some minor API changes, resulting in breaking changes, which may require updates to consuming applications.

The [release schedule](https://github.com/spring-projects/spring-authorization-server/milestones) has been set for 1.0.0 and 0.4.0. We would appreciate any feedback as we continue to add improvements to Spring Authorization Server and track towards its first major release planned for this Nov 2022.

On behalf of the team, I would like to thank everyone who has contributed and helped grow this project. We have great momentum heading into the next phase and are really looking forward to building on this momentum and gaining wider adoption within the community. We hope to continue to work together and ultimately establish Spring Authorization Server as the de facto framework for OAuth2 Authorization Server support on the Java platform.

[Project Page](https://spring.io/projects/spring-authorization-server) | [GitHub Issues](https://github.com/spring-projects/spring-authorization-server/issues) | [ZenHub Board](https://app.zenhub.com/workspaces/authorization-server-5e8f3182b5e8f5841bfc4902/board?repos=248032165)