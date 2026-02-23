---
title: Spring Boot for Apache Geode & Pivotal GemFire 1.1.0.M3 Released!
source: https://spring.io/blog/2019/07/03/spring-boot-for-apache-geode-pivotal-gemfire-1-1-0-m3-released
scraped: 2026-02-23T14:42:22.931Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | John Blum |  July 03, 2019 | 0 Comments
---

# Spring Boot for Apache Geode & Pivotal GemFire 1.1.0.M3 Released!

_Releases | John Blum |  July 03, 2019 | 0 Comments_

On behalf of the Spring, Apache Geode and Pivotal communities, I am pleased to announce the release of *Spring Boot for Apache Geode & Pivotal GemFire* `1.1.0.M3`.

## [](#whats-new)[](#whats-new)What’s New

The main theme of this release was to add support for hybrid cloud deployments.

For instance, perhaps you want to push and run your Spring Boot, Apache Geode or Pivotal GemFire applications on [Pivotal CloudFoundry](https://pivotal.io/platform) (PCF), but connect those applications to an externally managed, standalone Apache Geode or Pivotal GemFire cluster. Now, SBDG allows you to do just that.

Technically, SBDG takes advantage of a feature in PCF called [CUPS](https://docs.pivotal.io/pivotalcf/2-6/devguide/services/user-provided.html), or *Create User-Provided Service*. By defining your own service descriptor you can connect your Spring Boot applications to externally managed services, like databases, message queues and even In-Memory Data Grids & Caches like [Apache Geode](https://geode.apache.org/) or [Pivotal GemFire](https://pivotal.io/pivotal-gemfire).

By following a prescribed service descriptor format, it makes it simple to switch to a platform managed service like [Pivotal Cloud Cache](https://pivotal.io/pivotal-cloud-cache) when you need it.

Indeed, we believe this is an important stepping stone for users making their way to a **Cloud-Native** platform, like PCF, where they still have much invested in their legacy architectures.

We do highly recommend using a managed service like [Pivotal Cloud Cache](https://pivotal.io/pivotal-cloud-cache) for your application and Microservices caching needs, but we also realize that making this switch is not as easy as flipping the switch.

We want to help you get there. After all, **Cloud-Native (Data) Patterns** are crucial to the modern application architecture, particularly when talking about things like high availability and resiliency as well as making effective use of your computing resources.

You can learn more about this new support in the [Reference Documentation](https://docs.spring.io/spring-boot-data-geode-build/1.1.x/reference/html5/#cloudfoundry-geode).

In addition to hybrid cloud support, we also added:

-   Auto-configuration for logging.
    
-   Support to target specific Pivotal Cloud Cache (PCC) service instances when multiple instances are bound to your Spring Boot app.
    
-   Upgrades to Spring Boot `2.1.6.RELEASE.`
    
-   Upgrade to *Spring Test for Apache Geode & Pivotal GemFire* (STDG) `0.0.5.RELEASE`.
    

See the [changelog](https://github.com/spring-projects/spring-boot-data-geode/blob/1.1.0.M3/spring-geode/src/main/resources/changelog.txt#L7-L21) for more details.

## [](#whats-next)[](#whats-next)What’s Next

We will push towards our first release candidate, an SBDG `1.1.0.RC1`, by mid-July and final GA by end of July.

Specifically, we will be:

-   Adding a couple of samples:
    
    -   Example for *Inline Caching*,
        
    -   Example on how to get started in under 5 minutes
        
-   Improved Documentation
    
-   Incorporating your Feedback
    

## [](#conclusion)[](#conclusion)Conclusion

As always, feedback is welcomed and appreciated. Let us know what you think and give the new bits a try.

[Issues](https://github.com/spring-projects/spring-boot-data-geode/issues) | [PR](https://github.com/spring-projects/spring-boot-data-geode/pulls) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-boot)