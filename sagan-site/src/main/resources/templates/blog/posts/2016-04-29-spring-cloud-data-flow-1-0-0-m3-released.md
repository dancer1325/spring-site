---
title: Spring Cloud Data Flow 1.0.0 M3 Released
source: https://spring.io/blog/2016/04/29/spring-cloud-data-flow-1-0-0-m3-released
scraped: 2026-02-23T19:17:51.369Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Fisher |  April 29, 2016 | 3 Comments
---

# Spring Cloud Data Flow 1.0.0 M3 Released

_Releases | Mark Fisher |  April 29, 2016 | 3 Comments_

On behalf of the team, I am pleased to announce the 1.0.0.M3 release of [Spring Cloud Data Flow](http://cloud.spring.io/spring-cloud-dataflow/).

Over the last few months, we have added exciting new features and improvements to the overall orchestration of data microservices on a variety of platforms. We have also made some changes that significantly benefit developers, such as exposing [Spring Boot Starters](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#using-boot-starter-poms) for all of the [stream](https://github.com/spring-cloud/spring-cloud-stream-app-starters) and [task](https://github.com/spring-cloud/spring-cloud-task-app-starters) applications we publish. Following are some of the highlights from this release:

-   Provides the foundation for the following Data Flow Server implementations that have also been released today:
    -   Spring Cloud Data Flow’s [Cloud Foundry Server](https://spring.io/blog/2016/04/29/spring-cloud-data-flow-for-cloud-foundry-1-0-0-m2-released) 1.0.0.M2
    -   Spring Cloud Data Flow’s [Kubernetes Server](https://spring.io/blog/2016/04/29/spring-cloud-data-flow-for-apache-mesos-and-kubernetes-1-0-0-m2-versions-released) 1.0.0.M2
    -   Spring Cloud Data Flow’s [Apache YARN Server](https://spring.io/blog/2016/04/29/spring-cloud-data-flow-for-apache-yarn-1-0-0-m2-released) 1.0.0.M2
    -   Spring Cloud Data Flow’s [Apache Mesos Server](https://spring.io/blog/2016/04/29/spring-cloud-data-flow-for-apache-mesos-and-kubernetes-1-0-0-m2-versions-released) 1.0.0.M2
-   Introduces and builds upon the [Spring Cloud Deployer](https://github.com/spring-cloud/spring-cloud-deployer) Service Provider Interface

-   New multi-platform application deployment model factored out of Spring Cloud Data Flow itself for general purpose use, including [AppDeployer](https://github.com/spring-cloud/spring-cloud-deployer/blob/master/spring-cloud-deployer-spi/src/main/java/org/springframework/cloud/deployer/spi/app/AppDeployer.java) and [TaskLauncher](https://github.com/spring-cloud/spring-cloud-deployer/blob/master/spring-cloud-deployer-spi/src/main/java/org/springframework/cloud/deployer/spi/task/TaskLauncher.java) to deploy long-running and short-lived microservices, respectively.
-   Improved application resolution strategy with support for maintaining a registry of applications as `http`, `file`, `maven`, `docker`, or `hdfs` artifacts

-   Builds upon [Spring Cloud Stream](http://cloud.spring.io/spring-cloud-stream) 1.0.0.RC3
-   Builds upon [Spring Cloud Task](https://spring.io/blog/2016/04/29/spring-cloud-task-1-0-0-m2-is-now-available) 1.0.0.M2
-   Improves DSL support for streaming and batch pipelines
-   Adds "tap" support for streaming and batch pipelines
-   Applications

-   Supports out-of-the-box stream applications built from the new [Stream Application Starters](https://github.com/spring-cloud/spring-cloud-stream-app-starters) project (auto-generated apps for both Kafka and RabbitMQ binders)
-   Supports out-of-the-box task applications built from the new [Task Application Starters](https://github.com/spring-cloud/spring-cloud-task-app-starters) project
-   Adds several new out-of-the-box stream and task applications
-   Improves custom application registration mechanics from the Shell and Dashboard

-   Dashboard

-   New and improved Dashboard
-   Adds Batch and Task support
-   Adds "Apps" tab to [monitor and manage](https://github.com/spring-cloud/spring-cloud-dataflow/blob/master/spring-cloud-dataflow-docs/src/main/asciidoc/images/dataflow-available-apps-list.png) out-of-the-box and custom applications

-   [Flo for Spring Cloud Data Flow](https://network.pivotal.io/products/p-flo-for-spring-cloud-data-flow)

-   Modern look and feel with several UX improvements around the palette, auto-layouts, auto-linking, canvas, nodes, node connectors, and many more
-   Adds support for a scriptable-transform processor that accepts ruby, groovy, python, or javascript code for runtime compute logic
-   Adds visual distinction between primary and tap’d pipelines
-   Adapts to Angular style tooltips
-   Graph layout optimizations

-   Improved IT and TCK tests
    
-   Adds new [samples](https://github.com/spring-cloud/spring-cloud-dataflow-samples)
-   Adds new [logo](http://cloud.spring.io/spring-cloud-dataflow/)

For the complete list of features, bug-fixes, and improvements, please refer to the closed [1.0.0.M3](https://github.com/spring-cloud/spring-cloud-dataflow/issues?q=milestone:1.0.0.M3) GitHub issues.

We welcome feedback and contributions! If you have any questions, comments or suggestions, please let us know via [GitHub Issues](https://github.com/spring-cloud/spring-cloud-dataflow/issues), [StackOverflow](http://stackoverflow.com/tags/spring-cloud-dataflow), or using the #SpringCloudDataFlow hashtag on Twitter.

We have aggressive plans for the upcoming RC release. Stay tuned!

Last but not least... check out this [brand new website](http://pivotal.io/spring-app-framework) to learn how Spring Accelerates Cloud Native Java Application Development!