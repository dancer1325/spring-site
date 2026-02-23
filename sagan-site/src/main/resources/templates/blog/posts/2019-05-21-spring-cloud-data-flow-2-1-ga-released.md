---
title: Spring Cloud Data Flow 2.1 GA Released
source: https://spring.io/blog/2019/05/21/spring-cloud-data-flow-2-1-ga-released
scraped: 2026-02-23T14:46:54.769Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  May 21, 2019 | 1 Comment
---

# Spring Cloud Data Flow 2.1 GA Released

_Releases | Mark Pollack |  May 21, 2019 | 1 Comment_

The Spring Cloud Data Flow team is pleased to announce the release of 2.1 of Data Flow.

We have a brand new website with great new content, which is where you can find our [getting started guide](https://dataflow.spring.io/getting-started/) for use on Cloud Foundry and Kubernetes and your Local Machine.

Here are the highlights:

**New Dedicated Data Flow Website**

The Data Flow team takes pride is openly communicating with the community in various forums including StackOverflow, Gitter, GitHub, Twitter, and at times in Email and Zoom calls even.

However, we realized that we could provide a much better experience to answer common questions and provide an easier on-ramp to using Data Flow if we focused on improving the online documentation. The reference guide was not the ideal format to achieve that goal, so we embarked on creating a new website - [https://dataflow.spring.io](https://dataflow.spring.io) - that acts as the hub for learning about all things Data Flow related.

![scdf-new-website](https://github.com/spring-cloud/spring-cloud-dataflow/raw/master/spring-cloud-dataflow-docs/src/main/asciidoc/images/new-web-site.png)

**Helm Chart Updates**

With continued interest from the community, we have now added support to toggle between RabbitMQ and Apache Kafka when using Data Flow's [Helm Chart](https://hub.kubeapps.com/charts/stable/spring-cloud-data-flow). The [installation instructions for Kubernetes](https://dataflow.spring.io/docs/installation/kubernetes/helm/) is the best place to get started using the Chart.

**Concurrent Launch Throttling for Tasks**

With the recent feedback from the community concerning the concurrent task launching algorithm, we have redesigned the approach to decide whether or not Tasks are currently running, and if running, how many are concurrently in running state. A more realistic view of what’s actually happening with Tasks is now possible by querying against the runtime status of the Tasks in the underlying platforms (e.g., Local, Cloud Foundry and Kubernetes). You can read all about the new design and the corner cases from the [reference guide](http://docs.spring.io/spring-cloud-dataflow/docs/2.1.0.RELEASE/reference/htmlsingle/#spring-cloud-dataflow-task-limit-concurrent-executions).

**Deployer Properties as Dropdown**

A growing number of support cases indicated that it is hard for the developers to discover and then supply the platform-specific deployer properties when deploying streams and tasks. We are fixing that by adding a new dropdown with deployer properties automatically populated based on the platform where Data Flow is configured to run. The same also will apply for scenarios when there are 1 or more target platforms configured, the dropdown updates to reflect the target platform. We have implemented this for Stream deployments and in the next version will include support for Tasks.

![scdf-local-deployment-properties-1](https://user-images.githubusercontent.com/50398/56348316-137ab480-61be-11e9-9f92-6607b7ec6fc6.png)

**Switched to ZenHub**

From a product backlog perspective, we have switched and migrated all the GitHub backlog from Waffle to ZenHub (see: [reasons](https://waffle.io/)). If you’re interested in following along the product release progress, you could install the ZenHub plugin for the web browser and navigate to ZenHub tab in the Data Flow GitHub repository.

**Stay in touch**​

As always, we welcome feedback and contributions, so please reach out to us on [StackOverflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) or [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-dataflow).