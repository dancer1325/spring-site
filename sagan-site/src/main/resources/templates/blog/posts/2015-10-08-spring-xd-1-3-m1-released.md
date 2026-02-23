---
title: Spring XD 1.3 M1 released
source: https://spring.io/blog/2015/10/08/spring-xd-1-3-m1-released
scraped: 2026-02-23T19:40:26.944Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  October 08, 2015 | 0 Comments
---

# Spring XD 1.3 M1 released

_Releases | Mark Pollack |  October 08, 2015 | 0 Comments_

On behalf of the Spring XD team, I am very pleased to announce the first milestone release of Spring XD 1.3

This release includes [bug fixes and some enhancements](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=11401&version=15099):

-   Hadoop distribution version updates to Apache Hadoop 2.7.1 and Hortonworks Data Platform 2.3. Pivotal Hadoop 2.1, 3.0 and Cloudera Hadoop 5.4
-   Spark 1.3.1 Support
-   Cassandra Sink
-   Header Enricher Processor
-   Bug fixes to the Flo Designer UI and Admin UI
-   Gpfdist sink now supports update operations and full range of control file options
-   Update to Spring Integration 4.2 which provides performance improvements when monitoring is enabled.
-   Upgrade to Spring Data Gosling Release train

You can [download the zip distribution](http://repo.spring.io/milestone/org/springframework/xd/spring-xd/1.3.0.M1/spring-xd-1.3.0.M1-dist.zip) or install on OSX [using homebrew](http://docs.spring.io/spring-xd/docs/1.3.0.M1/reference/html/#osx-homebrew-installation). On RHEL/CentOS you can [install using rpm](https://github.com/spring-projects/spring-xd/wiki/Installing-Spring-XD-using-RPM-on-RHEL-CentOS-v.-6.x). The [updated Flo UI](https://network.pivotal.io/products/p-spring-flo/) is also available as a separate download.

Looking ahead, 1.3 release candidate will include a new DSL for creating Batch Jobs as well as a new version of Flo to author and visualize Jobs. The 1.3 release candidate is targeted for October 22 and 1.3 GA by the first week of November.

After the 1.3 GA release, the 1.x release line will be in maintenance mode, addressing only bug fixes. The next release line introduces a major redesign to the underlying architecture. The Spring XD Zookeeper based runtime will be replaced by a [service provider interface](http://docs.spring.io/spring-cloud-dataflow/docs/1.0.0.M1/reference/html/getting-started-deploying-spring-cloud-dataflow.html) (SPI) that delegates to native platform capabilities for running and scaling applications. Given the major change to the architecture, the next release line is rebranded as [Spring Cloud Data Flow](http://cloud.spring.io/spring-cloud-dataflow/) to better represent XD reimagined with a cloud native programming and operational model. For more details, please refer to the recent [launch blog](http://blog.pivotal.io/pivotal-cloud-foundry/products/introducing-spring-cloud-data-flow) and stay tuned for an upcoming engineering blog on Spring Cloud Data Flow.

Feedback is very important, so please get in touch with questions and comments via

-   [StackOverflow](http://stackoverflow.com/questions/tagged/spring-xd) `spring-xd` tag
-   [Spring JIRA](https://jira.spring.io/browse/XD/?selectedTab=com.atlassian.jira.jira-projects-plugin:summary-panel) or [GitHub Issues](https://github.com/spring-projects/spring-xd/issues)