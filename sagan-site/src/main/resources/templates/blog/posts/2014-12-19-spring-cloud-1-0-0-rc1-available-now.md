---
title: Spring Cloud 1.0.0.RC1 Available Now
source: https://spring.io/blog/2014/12/19/spring-cloud-1-0-0-rc1-available-now
scraped: 2026-02-23T22:02:40.247Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Dave Syer |  December 19, 2014 | 1 Comment
---

# Spring Cloud 1.0.0.RC1 Available Now

_Releases | Dave Syer |  December 19, 2014 | 1 Comment_

Another cheerful holiday message from the Spring team: [Spring Cloud](http://projects.spring.io/spring-cloud/) 1.0.0.RC1 is now available in the [http://repo.spring.io](http://repo.spring.io) Maven repository. There are plenty of new features including

-   Support for Hystrix metrics aggregation via an annotation `@EnableTurbine` and `@EnableTurbineAmqp` (for an AMQP-based collector)
    
-   A rehaul of the Ribbon configuration making it more friendly for Spring users. You can now configure each Ribbon client in its own `ApplicationContext` using `@RibbonClient` and override various bits, like the `LoadBalancer`, or the `ServerListFilter`, by providing `@Bean` definitions.
    
-   `DiscoveryHealthIndicator` is now a composite that users can add information to by declaring `@Beans` of type `DiscoveryHealthIndicator`.
    
-   Discovery is now abstracted away from Eureka into a new spring-cloud-commons library, and enabled via new annotations like `@EnableDiscoveryClient` (instead of the old `@EnableEurekaClient`). The same pattern also applies to circuit breakers
    

and `@EnableCircuitBreaker` replaces `@EnableHystrix`.

-   Several improvements to the Zuul proxy, including automatic updates when the Eureka catalog changes, support for form-encoded POSTs, external configuration of the routes and authentication scheme for each client.
    
-   Declarative configuration of which routes require OAuth2 authentication in Spring Cloud Security.
    
-   Support for labels (like git branches) in the "native" profile of the Config Server (looks in subdirectory of the search locations).
    
-   Fail fast option in Config Server and Client if the required URI to locate config data is invalid.
    
-   Out of the box support for JSON messages in the Spring Cloud Bus.
    
-   A nice framework for Feign configuration based on a new `@FeignClient` annotation (a bit like Spring Data repositories).
    

Some of the bus and starter modules have been re-organized and renamed, and there is a new (optional) parent pom for user apps. The full list of starters in RC1 is

-   spring-cloud-starter: provides the config client and basic Spring Boot dependencies
    
-   spring-cloud-starter-bus-amqp: for bus clients over AMQP
    
-   spring-cloud-starter-cloudfoundry: Cloud Foundry specific features
    
-   spring-cloud-starter-eureka: service discovery client with Netflix Eureka
    
-   spring-cloud-starter-eureka-server: service discovery server with Netflix Eureka
    
-   spring-cloud-starter-hystrix: circuit break client with Netflix Hystrix
    
-   spring-cloud-starter-hystrix-dashboard: circuit break dashboard with Netflix Hystrix
    
-   spring-cloud-starter-security: single sign on and OAuth2 resource server short cuts
    
-   spring-cloud-starter-turbine: HTTP-based Hystrix metric aggregation with Netflix Turbine 1.0
    
-   spring-cloud-starter-turbine-amqp: AMQP-based Hystrix metric aggregation with Netflix Turbine 2.0
    
-   spring-cloud-starter-zuul: basic Zuul proxy with auto-registration of discovered services
    

There are loads of samples in the [spring-cloud-samples](https://github.com/spring-cloud-samples/) repositories. Please try the bits out that you might use and for those of you who already did, thanks, and continue to hit it as hard as you can and come back with feedback. Happy Holidays!