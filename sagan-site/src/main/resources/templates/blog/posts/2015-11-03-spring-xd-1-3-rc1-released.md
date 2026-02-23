---
title: Spring XD 1.3 RC1 released
source: https://spring.io/blog/2015/11/03/spring-xd-1-3-rc1-released
scraped: 2026-02-23T19:36:00.969Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  November 03, 2015 | 0 Comments
---

# Spring XD 1.3 RC1 released

_Releases | Mark Pollack |  November 03, 2015 | 0 Comments_

On behalf of the Spring XD team, I am very pleased to announce the first release candidate of Spring XD 1.3 is now [available for download](http://repo.spring.io/libs-milestone/org/springframework/xd/spring-xd/1.3.0.RC1/spring-xd-1.3.0.RC1-dist.zip). You can also install using [brew](http://docs.spring.io/spring-xd/docs/1.3.0.RC1/reference/html/#osx-homebrew-installation) and [rpm](http://docs.spring.io/spring-xd/docs/1.3.0.RC1/reference/html/#redhatcentos-installation).

This release includes some major new functionality for batch jobs. We have introduced the ability to create composed jobs that allows you to create a complex graph of jobs executed based on a new Job DSL. [Flo for Spring XD UI](https://network.pivotal.io/products/p-spring-flo/) has been updated to support the new Job DSL and provide a visual drag and drop canvas for creating composed jobs. Spring XD’s job execution UI also supports execution history of composed jobs. The video in the Flo for XD blog post shows it in action.

Another important new feature is a timeout value for flushing writes to HDFS in order to ensure data is persisted on the HDFS DataNode’s disks.

You can view the [JIRA release notes](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=11401&version=15100) for additional details on bug fixes and general improvements.

We are targeting the 1.3 GA release on November 17th. After the 1.3 GA release, the 1.x release line will be in maintenance mode, addressing only bug fixes. The next release line introduces a major redesign to the underlying architecture and breaking up Spring XD into several independent projects. More details can be found in the blog posts: [Introducing Spring Cloud Data Flow](http://blog.pivotal.io/pivotal-cloud-foundry/products/introducing-spring-cloud-data-flow) and [A Quick Look At Spring Cloud Data Flow](http://blog.pivotal.io/pivotal-perspectives/features/a-quick-look-at-spring-cloud-data-flow). InfoQ also summarizes the changes in the article [SpringXD being Re-architected and Re-branded to Spring Cloud Data Flow](http://www.infoq.com/news/2015/09/spring-cloud-data-flow).

Feedback is very important, so please get in touch with questions and comments via

-   [StackOverflow](http://stackoverflow.com/questions/tagged/spring-xd) `spring-xd` tag
-   [Spring JIRA](https://jira.spring.io/browse/XD/?selectedTab=com.atlassian.jira.jira-projects-plugin:summary-panel) or [GitHub Issues](https://github.com/spring-projects/spring-xd/issues)