---
title: Spring XD 1.3.1 GA and Flo for Spring XD 1.0.1 GA released
source: https://spring.io/blog/2016/02/24/spring-xd-1-3-1-ga-and-flo-for-spring-xd-1-0-1-ga-released
scraped: 2026-02-23T19:26:14.428Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  February 24, 2016 | 0 Comments
---

# Spring XD 1.3.1 GA and Flo for Spring XD 1.0.1 GA released

_Releases | Mark Pollack |  February 24, 2016 | 0 Comments_

Today we are pleased to announce the general availability of Spring XD 1.3.1 and Flo for Spring XD 1.0.1

-   Spring XD 1.3.1 GA: [zip](http://repo.spring.io/libs-release/org/springframework/xd/spring-xd/1.3.1.RELEASE/spring-xd-1.3.1.RELEASE-dist.zip), [brew](http://docs.spring.io/spring-xd/docs/1.3.1.RELEASE/reference/html/#osx-homebrew-installation) and [rpm](http://docs.spring.io/spring-xd/docs/1.3.1.RELEASE/reference/html/#redhatcentos-installation).
-   Flo for Spring XD 1.0.1 GA: [zip](https://network.pivotal.io/products/p-spring-flo/).

Here are some highlights of bug fixes and general improvements. Consult the [JIRA release notes](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=11401&version=15424) for the full list of issues fixed.

-   [Support for encryption in XD configuration files](http://docs.spring.io/spring-xd/docs/1.3.1.RELEASE/reference/html/#encrypted-properties)
-   [Support for Kafka sync or async producers](http://docs.spring.io/spring-xd/docs/1.3.1.RELEASE/reference/html/#kafka-configuration)
-   Fix for Embedded Headers Message Converter Buffer Overflow
-   [Update default redis pool settings to have no limit on number of active connections](http://docs.spring.io/spring-xd/docs/1.3.1.RELEASE/reference/html/#_redis)
-   Upgrade to Spring Integration 4.2.5, Spring Framework 4.2.5, Spring AMQP 3.6

The next release line introduces a major redesign to the underlying architecture and breaking up Spring XD into several independent projects. Building upon Spring Boot and Spring Cloud capabilities, Spring XD is actively being redesigned as [Spring Cloud Data Flow](http://cloud.spring.io/spring-cloud-dataflow/) - a cloud native programming and operating model for composable message-driven microservices. More details can be found in the blog posts: [Introducing Spring Cloud Data Flow](http://blog.pivotal.io/pivotal-cloud-foundry/products/introducing-spring-cloud-data-flow) and [A Quick Look At Spring Cloud Data Flow](http://blog.pivotal.io/pivotal-perspectives/features/a-quick-look-at-spring-cloud-data-flow). InfoQ also summarizes the changes in the article [SpringXD being Re-architected and Re-branded to Spring Cloud Data Flow](http://www.infoq.com/news/2015/09/spring-cloud-data-flow).

Feedback is very important, so please get in touch with questions and comments via

-   [StackOverflow](http://stackoverflow.com/questions/tagged/spring-xd) `spring-xd` tag
-   [Spring JIRA](https://jira.spring.io/browse/XD/?selectedTab=com.atlassian.jira.jira-projects-plugin:summary-panel) or [GitHub Issues](https://github.com/spring-projects/spring-xd/issues)