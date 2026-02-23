---
title: Spring Cloud Data Flow for Cloud Foundry 1.1 GA released
source: https://spring.io/blog/2017/01/18/spring-cloud-data-flow-for-cloud-foundry-1-1-ga-released
scraped: 2026-02-23T18:42:49.488Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Eric Bottard |  January 18, 2017 | 0 Comments
---

# Spring Cloud Data Flow for Cloud Foundry 1.1 GA released

_Releases | Eric Bottard |  January 18, 2017 | 0 Comments_

We are pleased to announce the general availability of [Spring Cloud Data Flow](http://cloud.spring.io/spring-cloud-dataflow/) for Cloud Foundry version 1.1.0.RELEASE.

In addition to all the bells and whistles of [Spring Cloud Data Flow 1.1.2](https://spring.io/blog/2016/11/23/spring-cloud-data-flow-1-1-ga-released) that this release builds upon, the Cloud Foundry specifics include:

-   **Memory Optimizations:** After much troubleshooting, we are pleased to deliver a memory efficient SCDF server in this release. With the changes now, regardless of how many stream/task deployments and concurrency, we have observed the memory usage of the server stay within the 200MB range as opposed to 1G or over to an eventual crash in previous 1.0.0.RELEASE. If you experienced spurious crashes previously, we highly recommend upgrading to 1.1.0.RELEASE right away.
    
-   **Maven Cache and Disk Optimizations:** We have improved the way Maven caching is applied and used. There is a new LRU (Least Recently Used) design on top of the maven cache to allow us to be more proactive about the cache size as opposed to letting it grow indefinitely, which if not governed, leads to out of disk space errors for the application container where the server is running.
    
-   **Tasks Support:** In the latest PCF 1.9 release, the Task component graduated from being experimental to production-ready feature capability. Spring Cloud Data Flow’s Task support for Cloud Foundry closely followed this development and with this release, we have removed the “experimental” clause from our side, too. Spring Cloud Data Flow’s Task support is production-ready when used on PCF 1.9. *One can still try this functionality on older PCF releases, PCF 1.8 for example, but the feature capabilities neither guaranteed nor supported on older PCF releases since is it classified as ”experimental”.*
    
    The Task database schema changed slightly with this release. For folks upgrading from 1.0.0.RELEASE to 1.1.0.RELEASE, please review the [migration steps](http://docs.spring.io/spring-cloud-dataflow/docs/1.1.0.RELEASE/reference/htmlsingle/#configuration-rdbms) included in the reference guide.
    
-   **Improved Error Handling:** Building on the latest version of the [Spring Cloud Deployer for Cloud Foundry project](https://github.com/spring-cloud/spring-cloud-deployer-cloudfoundry), interaction with the Cloud Controller REST API has been made more resilient, being more pro-active in dealing with the occasional server-side error.
    

**Important Notice:**

There have been changes to the environment variables used by Spring Cloud Data Flow’s Cloud Foundry Server. Please make sure to review the [reference guide](http://docs.spring.io/spring-cloud-dataflow-server-cloudfoundry/docs/1.1.0.RELEASE/reference/htmlsingle/#_configuration_reference) for the latest changes to the environment variables.

The random app name generation feature gets an update. If this feature is enabled, you’ll notice that the name stays within the 63 character limit, to comply with RFC1035 when used as a hostname.

**Get Started!**

Head over to the [Spring Cloud Data Flow for Cloud Foundry project page](http://cloud.spring.io/spring-cloud-dataflow-server-cloudfoundry/) and follow the **Quick Start** section. Be sure to browse the [reference documentation](http://docs.spring.io/spring-cloud-dataflow-server-cloudfoundry/docs/1.1.0.RELEASE/reference/htmlsingle/) for this release.