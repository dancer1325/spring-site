---
title: Spring Cloud Data Flow 2.1.0.M1 released
source: https://spring.io/blog/2019/04/18/spring-cloud-data-flow-2-1-0-m1-released
scraped: 2026-02-23T14:50:33.070Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Janne Valkealahti |  April 18, 2019 | 0 Comments
---

# Spring Cloud Data Flow 2.1.0.M1 released

_Releases | Janne Valkealahti |  April 18, 2019 | 0 Comments_

The Spring Cloud Data Flow team is pleased to announce the release of a 2.1.0 M1 milestone-release. Follow the Getting Started guides for running on [Local](http://docs.spring.io/spring-cloud-dataflow/docs/2.1.0.M1/reference/htmlsingle/#getting-started-local), [Cloud Foundry](http://docs.spring.io/spring-cloud-dataflow/docs/2.1.0.M1/reference/htmlsingle/#getting-started-cloudfoundry), and [Kubernetes](http://docs.spring.io/spring-cloud-dataflow/docs/2.1.0.M1/reference/htmlsingle/#getting-started-kubernetes).

What’s new?

**SCDF Helm Chart and Apache Kafka**

With continued interest from the community, as of v2.0.2, we have now added support to toggle between RabbitMQ and Apache Kafka when using SCDF’s helm chart. Though the chart is in the PR status in Helm repository, [you could still try it](http://docs.spring.io/spring-cloud-dataflow/docs/2.1.0.M1/reference/htmlsingle/#_installing_the_spring_cloud_data_flow_server_and_required_services) out and give us feedback.

**Docker Compose and Apache Kafka**

To continue with the same trend in regards to Apache Kafka, along with regular Apache Kafka binder properties, we have now also added support for Kafka Streams binder properties; likewise, we have switched to use the official Confluent’s Docker image as part of the Docker Compose [getting-started experience](http://docs.spring.io/spring-cloud-dataflow/docs/2.1.0.M1/reference/htmlsingle/#getting-started-local-deploying-spring-cloud-dataflow-docker-download).

**Concurrent Launch Throttling for Tasks**

With the recent feedback from the community concerning the concurrent task launching algorithm, we have redesigned the approach to decide whether or not Tasks are currently running, and if running, how many are concurrently in running state. A more realistic view of what’s actually happening with Tasks is now possible by querying against the runtime status of the Tasks in the underlying platforms (e.g., Local, Cloud Foundry and Kubernetes). You can read all about the new design and the corner cases from the [reference guide](http://docs.spring.io/spring-cloud-dataflow/docs/2.1.0.M1/reference/htmlsingle/#spring-cloud-dataflow-task-limit-concurrent-executions).

**Deployer Properties as Dropdown**

A growing number of support cases indicated that it is hard for the developers to discover and then supply the platform-specific deployer properties when deploying streams and tasks. We are fixing that by adding a new dropdown with deployer properties automatically populated based on the platform where SCDF is configured to run. The same also will apply for scenarios when there are 1 or more platforms configured to the single instance of SCDF - dropdown would react to the platform selection. Having this would not only simplify the discovery of how to derive these properties and its purpose but it also automatically creates the necessary prefixes in required by SCDF, so you don’t have to worry about it when deploying streams/tasks. We are rolling it out for Streams in this release and the next milestone will include support for Tasks as well.

![scdf-local-deployment-properties-1](https://user-images.githubusercontent.com/50398/56348316-137ab480-61be-11e9-9f92-6607b7ec6fc6.png)

**Spring Cloud Data Flow Microsite**

The SCDF team takes pride is openly communicating with the community in various forums including StackOverflow, Gitter, GitHub, Twitter, and at times in Email and Zoom calls even.

In the years of experience working in this model, we have come to learn that providing samples and documenting all the features in the form of a reference-guide alone is not sufficient. While engaging with the community, we tend to write even more workable code-samples and clarify concepts with extra examples. It has happened so much so that we tend to repeat answering for the same questions frequently, too.

Adding to this, in the recent [Spring Cloud Stream](https://gitter.im/spring-cloud/spring-cloud-stream?at=5c3d1b8020b78635b624166c), [Spring Cloud Task](https://gitter.im/spring-cloud/spring-cloud-task?at=5c3deffdf780a1521f1451f1), and [Spring Cloud Data Flow](https://gitter.im/spring-cloud/spring-cloud-dataflow?at=5c3def6bf780a1521f144e41) developer surveys, it was evident that our samples, docs, and guides need some improvement.

We are determined to improve this! The SCDF Team is working on a more hands-on developer guide that goes into the depth of various concepts, features, deployment options, and among many other topics. We are calling it “Spring Cloud Data Flow Microsite” - a standalone application with all the collateral structured to speak to the developer personas more directly. The larger theme for the 2.1.0 release is just the Microsite - more on this topic in the next milestone - stay tuned!

**Switched to ZenHub**

From a product backlog perspective, we have switched and migrated all the GitHub backlog from Waffle to ZenHub (see: [reasons](https://waffle.io/)). If you’re interested in following along the product release progress, you could install the ZenHub plugin for the web browser and navigate to ZenHub tab in the SCDF GitHub repository.

**Stay in touch**​

As always, we welcome feedback and contributions, so please reach out to us on [StackOverflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) or [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-dataflow).