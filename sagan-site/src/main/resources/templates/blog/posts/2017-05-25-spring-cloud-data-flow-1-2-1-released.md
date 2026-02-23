---
title: Spring Cloud Data Flow 1.2.1 released
source: https://spring.io/blog/2017/05/25/spring-cloud-data-flow-1-2-1-released
scraped: 2026-02-23T16:30:54.012Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gunnar Hillert |  May 25, 2017 | 0 Comments
---

# Spring Cloud Data Flow 1.2.1 released

_Releases | Gunnar Hillert |  May 25, 2017 | 0 Comments_

On behalf of the Spring Cloud Data Flow team, I’m pleased to announce the release of [Spring Cloud Data Flow](http://cloud.spring.io/spring-cloud-dataflow/) and [Spring Cloud Data Flow for Cloud Foundry](http://cloud.spring.io/spring-cloud-dataflow-server-cloudfoundry/) **1.2.1.RELEASE**. This release provides several improvements around [OAuth2](https://oauth.net/2/) authorization.

Here are the relevant links to documentation and getting started guides.

-   Local: [Quick Start](http://cloud.spring.io/spring-cloud-dataflow/#quick-start), [Getting Started Guide](http://docs.spring.io/spring-cloud-dataflow/docs/1.2.1.RELEASE/reference/htmlsingle/#getting-started)
-   Cloud Foundry: [Getting Started Guide](http://docs.spring.io/spring-cloud-dataflow-server-cloudfoundry/docs/1.2.1.RELEASE/reference/htmlsingle/#getting-started)

Spring Cloud Data Flow now provides role support for OAuth2, converging with the *VIEW*, *CREATE*, *MANAGE* roles that Data Flow supports when using the traditional security option. Considering the varying use-case requirements across organizations in regards to security roles, the out-of-the-box implementation will assign all the *VIEW*, *CREATE*, *MANAGE* roles to the OAuth authenticated user. However, this can be customized by providing your own [AuthoritiesExtractor](http://docs.spring.io/spring-boot/docs/current/api/org/springframework/boot/autoconfigure/security/oauth2/resource/AuthoritiesExtractor.html).

A special thanks goes out to Mike Heath for adding the ability to login into the Shell using HTTP credentials from an external process (Access token).

In the *Spring Cloud Data Flow for Cloud Foundry* release we provide better integration support for [*Cloud Foundry User Account and Authentication (UAA) Server*](https://github.com/cloudfoundry/uaa), building upon the features mentioned above.

As always, your feedback is highly appreciated. In case you have any questions or feature requests, please reach out to us on [StackOverflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) and [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues). And please also consider contributing back to Spring Cloud Data Flow!

*[Spring Cloud Data Flow Home](http://cloud.spring.io/spring-cloud-dataflow/)* ([Source on GitHub](https://github.com/spring-cloud/spring-cloud-dataflow) | [Reference Documentation](http://docs.spring.io/spring-cloud-dataflow/docs/current/reference/htmlsingle/)) *[Spring Cloud Data Flow for Cloud Foundry](http://cloud.spring.io/spring-cloud-dataflow-server-cloudfoundry/)* ([Source on GitHub](https://github.com/spring-cloud/spring-cloud-dataflow-server-cloudfoundry) | [Reference Documentation](http://docs.spring.io/spring-cloud-dataflow-server-cloudfoundry/docs/1.2.1.RELEASE/reference/htmlsingle/))