---
title: Spring Cloud Data Flow for Cloud Foundry 1.0.0.M3 released
source: https://spring.io/blog/2016/06/21/spring-cloud-data-flow-for-cloud-foundry-1-0-0-m3-released
scraped: 2026-02-23T19:12:36.376Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Eric Bottard |  June 21, 2016 | 0 Comments
---

# Spring Cloud Data Flow for Cloud Foundry 1.0.0.M3 released

_Releases | Eric Bottard |  June 21, 2016 | 0 Comments_

I am pleased to announce the 1.0.0.M3 release of Spring Cloud Data Flow for Cloud Foundry, a team effort that encompasses many new features under the hood:

This third milestone builds upon the recent RC1 release of Spring Cloud Data Flow and also adds Cloud Foundry specific refinements. Some highlights include:

-   Alignment with Cloud Foundry’s global environment properties such as ORG, API, and URL as opposed to previous naming variants
    
-   Adds security integration to authenticate against OAUTH backend server that’s compatible with Cloud Foundry
    
-   Publishes security configurations for easier overrides when connecting to OAUTH backend server that’s compatible with Cloud Foundry
    
-   Preliminary iterations on performance testing on Cloud Foundry with and without taps’s in real-time streaming pipeline
    
-   Builds upon feature-toggle support from Spring Cloud Data Flow’s core project to conditionally refine what features get included in each release
    

A great way to start using this new release by yourself is to follow [this section](http://docs.spring.io/spring-cloud-dataflow-server-cloudfoundry/docs/1.0.0.M3/reference/htmlsingle/#getting-started) of the reference documentation.

For a complete list of changes and improvements, please refer to the 1.0.0.M3 [release](https://github.com/spring-cloud/spring-cloud-dataflow-server-cloudfoundry/issues?q=milestone%3A1.0.0.M3) as well as the Cloud Foundry deployer [release details](https://github.com/spring-cloud/spring-cloud-deployer-cloudfoundry/issues?q=milestone%3A1.0.0.M2).