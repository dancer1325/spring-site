---
title: Spring Cloud 1.0.0.M3 Available Now
source: https://spring.io/blog/2014/11/25/spring-cloud-1-0-0-m3-available-now
scraped: 2026-02-23T22:05:05.483Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Dave Syer |  November 25, 2014 | 1 Comment
---

# Spring Cloud 1.0.0.M3 Available Now

_Releases | Dave Syer |  November 25, 2014 | 1 Comment_

[Spring Cloud](http://projects.spring.io/spring-cloud) 1.0.0.M3 is available now in the repo.spring.io repository. The following projects all had a 1.0.0.M3 release:

-   Spring Cloud Config: centralized key-value (or YAML) configuration management. Now supports the config server being fully embedded in another application.
    
-   Spring Cloud Netflix. Also has better support for embeddability of the server components. Now also properly records load balancer statistics in Ribbon-enabled Spring `RestTemplate`.
    
-   Spring Cloud for Amazon Web Services. Has new Spring Boot integration points, externalizing configuration for AWS metadata.
    
-   Spring Cloud Security: super simple OAuth2 in a declarative style.
    
-   Spring Cloud Bus: broadcasts framework-level events to Spring Cloud components. Big news here is that we now have a [RabbitMQ-based aggregator](https://github.com/spring-cloud/spring-cloud-bus/tree/master/spring-cloud-bus-turbine) for Hystrix metrics (based on Turbine 2), so you don't have to rely on having direct HTTP access to all service instances.
    
-   Spring Cloud CLI: Groovy CLI for writing microservices in self-contained scripts.
    
-   Spring Cloud for Cloud Foundry: now bridges between Spring Cloud Security and Cloud Foundry service bindings, making it super easy to do Single Sign On and OAutth2 protected resources in Cloud Foundry.
    

All these modules now depend on Spring Boot 1.2.0.RC2 with the intention that we move to 1.2.0.RELEASE when it becomes available. Together with the starters (dependency management helpers, also released now at 1.0.0.M3) these represent almost all of Spring Cloud, with the exception of Spring Cloud Connectors, which should see a 1.1.1 release soon.

We are making good progress towards a release candidate for 1.0.0 in December, and would like to thank the community for contributing on github and getting involved by trying out the early milestones.