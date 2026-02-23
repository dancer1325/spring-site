---
title: Spring Cloud Data Flow for Cloud Foundry 1.1M1 and 1.0.1 released
source: https://spring.io/blog/2016/10/06/spring-cloud-data-flow-for-cloud-foundry-1-1m1-and-1-0-1-released
scraped: 2026-02-23T19:01:55.851Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Eric Bottard |  October 06, 2016 | 0 Comments
---

# Spring Cloud Data Flow for Cloud Foundry 1.1M1 and 1.0.1 released

_Releases | Eric Bottard |  October 06, 2016 | 0 Comments_

[Spring Cloud Data Flow for Cloud Foundry](http://cloud.spring.io/spring-cloud-dataflow-server-cloudfoundry/) gets two new releases today, detailed below:

**1.0.1.GA** is a maintenance release that

-   Builds upon 2.0.1.RELEASE of Cloud Foundry’s Java Client and 3.0.2.RELEASE of Reactor
    
-   Builds upon 1.0.1.RELEASE of Spring Cloud Data Flow core
    
-   Gets general clarifications and improvements in the reference documentation
    
-   Fixes a bug pertaining to multiple ORG + Space combination causing task launch failures
    
-   Fixes a bug where environment variables were not propagated correctly when launching a task
    

**1.1.0.M1** is the first milestone in the new line of development. In addition to the bug fixes and dependency upgrades detailed above, it

-   Builds upon 1.1.0.M1 of Spring Cloud Data Flow core. See details [here](https://spring.io/blog/2016/09/16/spring-cloud-data-flow-1-1-m1-and-1-0-1-ga-released#1-1-m1-release)
    
-   Builds upon 1.1.0.M1 of [Spring Cloud Deployer for Cloud Foundry](https://github.com/spring-cloud/spring-cloud-deployer-cloudfoundry). As such, the following options are now available:
    
-   Adds support to override default application “staging” and “starting” timeouts. This is particularly useful for development machines where resource constraints could cause timeout errors and as well, for applications that are very large in size
    
-   Adds the ability to define custom routes (or no route at all) for the deployed applications in Cloud Foundry
    
-   Adds the ability to turn-off health checks in entirety. This is particularly useful when remote debugging the deployed application at startup time
    

As part of these releases, Spring Cloud Deployer for Cloud Foundry 1.0.1.GA and 1.1.0.M1 were also made available and can be consumed by any project that needs to leverage deployment capability to Cloud Foundry using the Spring Cloud Deployer abstraction.