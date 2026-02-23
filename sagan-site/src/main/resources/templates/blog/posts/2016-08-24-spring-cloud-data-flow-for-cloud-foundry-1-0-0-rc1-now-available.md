---
title: Spring Cloud Data Flow for Cloud Foundry 1.0.0.RC1 now available
source: https://spring.io/blog/2016/08/24/spring-cloud-data-flow-for-cloud-foundry-1-0-0-rc1-now-available
scraped: 2026-02-23T19:07:04.952Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Eric Bottard |  August 24, 2016 | 0 Comments
---

# Spring Cloud Data Flow for Cloud Foundry 1.0.0.RC1 now available

_Releases | Eric Bottard |  August 24, 2016 | 0 Comments_

We are pleased to announce the 1.0.0.RC1 release of Spring Cloud Data Flow for Cloud Foundry.

As we near completion towards a GA release in the upcoming days, this milestone brings the following improvements:

-   Builds upon the 1.0.0.RC1 release of Spring Cloud Deployer Cloud Foundry, which itself builds upon Project Reactor 3.0.0.RELEASE and of CF-Java-Client 2.0.0.RELEASE
    
-   Adds the ability to orchestrate short-lived [tasks](http://docs.spring.io/spring-cloud-dataflow-server-cloudfoundry/docs/1.0.0.RC1/reference/htmlsingle/#tasks-on-cloudfoundry) including Spring Batch Jobs in Cloud Foundry, which can be enabled as an *experimental* feature toggle
    
-   Adds support for command line arguments as a separate set of properties to be passed to a Task when it’s launched
    
-   Adds support to separate stream and task specific service bindings. This allows pinning stream and tasks specific services to stream and task applications respectively
    
-   Adds the ability to override the buildpack used on a per-app deployment basis
    
-   Significant improvements to the Spring Cloud Deployer Cloud Foundry TCK test coverage allowed refinements in app-state calculation
    
-   Adds documentation about rolling upgrades and how to [integrate](http://docs.spring.io/spring-cloud-dataflow-server-cloudfoundry/docs/1.0.0.RC1/reference/htmlsingle/#_using_spring_cloud_config_server) with Spring Cloud Config Server "service" in Pivotal Cloud Foundry
    

At this point, we’re hoping to promote this Release Candidate milestone to GA, expecting only minor fixes and documentation updates. If you use SCDF for CF, we strongly encourage you to upgrade to this release and give it a try.