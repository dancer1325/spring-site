---
title: Spring Boot for Apache Geode & Pivotal GemFire 1.2.0.RELEASE Available
source: https://spring.io/blog/2019/10/22/spring-boot-for-apache-geode-pivotal-gemfire-1-2-0-release-available
scraped: 2026-02-23T14:30:27.801Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | John Blum |  October 22, 2019 | 1 Comment
---

# Spring Boot for Apache Geode & Pivotal GemFire 1.2.0.RELEASE Available

_Releases | John Blum |  October 22, 2019 | 1 Comment_

On behalf of the [Spring](https://spring.io/), [Apache Geode](https://geode.apache.org/), [Pivotal GemFire](https://pivotal.io/pivotal-gemfire) and [Pivotal Cloud Cache](https://pivotal.io/pivotal-cloud-cache) (PCC) communities, it is my pleasure to announce the release of *Spring Boot for Apache Geode & Pivotal GemFire* (SBDG) `1.2.0.RELEASE`.

SBDG 1.2.0.RELEASE is based on the Spring Boot 2.2.0.RELEASE and can be acquired from [Maven Central](https://search.maven.org/search?q=org.springframework.geode).

Just declare `org.springframework.geode:spring-geode-starter` to use Apache Geode or `org.springframework.geode:spring-gemfire-starter` to use either Pivotal GemFire or PCC in your Maven or Gradle build files and you are ready to start building highly scalable Spring Boot applications using these technologies.

Alternatively, you can [start](https://start.spring.io/#!platformVersion=2.2.0.RELEASE&groupId=example.app&artifactId=crm&dependencies=geode) with *Spring Initializer* at [start.spring.io](https://start.spring.io).

See the ["*Getting Started*"](https://docs.spring.io/spring-boot-data-geode-build/1.2.x/reference/html5/guides/getting-started.html) Guide to help you get up and running quickly, easily and reliably.

## [](#the-journey-to-12-and-the-cloud)[](#whats-new)The Journey to 1.2 and the Cloud

An imperative part to SBDG’s story from the very beginning has been to help users prepare for their journey to the cloud by transforming apps into modern, fully integrated, "*Cloud-Ready*" services, even before being [*Cloud-Native*](https://12factor.net/), which is much more than just a technical problem.

To partly arrive at this lofty destination, you need a framework backed by technology that enables you to:

1.  Move from *Open Source Software* (e.g. [Apache Geode](https://geode.apache.org/)) to *Commercial Software* (e.g. [Pivotal GemFire](https://pivotal.io/pivotal-gemfire) or [Pivotal Cloud Cache (PCC)](https://pivotal.io/pivotal-cloud-cache)).
    
2.  Move from a *Non-Managed Platform* (Standalone, Externally Managed Services) to a *Managed Platform* (e.g. [Pivotal Platform](https://pivotal.io/platform)).
    
3.  And do so with ***little*** to ***no code or configuration*** changes. It should just work!
    

Being able to move in the opposite direction is also crucial, especially during the discovery and development phase of your project, because it enables you to iterate quicker.

This process must happen in a natural and non-invasive manner that allows you to pick and choose what capabilities you need, when you need it. Capabilities, such as caching, distributed compute and event stream processing, to name but a few, must be quick and easy to apply, and they must work reliably and be consistent regardless of the context in which the application is run.

This is not only true for new applications, but existing ones as well, that is, if you want to remain competitive and quite frankly, relevant. I really like the messaging behind this story from **Oded Shopen** concerning [Microservices](https://medium.com/@odedia/microservices-are-for-humans-not-machines-721a6a56344f). If you get a chance, also check out his [talk](https://springoneplatform.io/2019/sessions/microservices-are-for-humans-not-machines).

If one thing has become overwhelming apparent in the new cloud era, and more generally, in the never ending cycle that is technology, it is that we have now reached a new height in complexity. Too many layers: OS, Virtualization, Containers, App Servers, and underpinning all this, vendors selling you their \*aaSes (IaaS, PaaS, SaaS).

If anything, less is more and being able to do more with less.

SBDG is uniquely positioned to do that in part because Apache Geode was somewhat ahead of it’s time, designed from the ground up with a shared-nothing, scale-out architecture, which is so crucial to running smoothly in the cloud. Consistency is also preserved.

Then, Spring, and in particular, Spring Boot, is a technology well positioned to handle any use case, especially use cases suited for Microservices. The complexity problem stated above is what makes a framework in general, and Spring Boot in particular, so important, more than most will probably appreciate.

As a result, SBDG becomes subtly yet obvsiously compelling. It seamlessly blends these two powerful technologies together to handle modern as well as existing workloads without having to use every technology known to boot.

It isn’t only about the things you would normally think of, such as data access, but also things you don’t (initially) think about, such as Data Serialization or Security (both Auth and TLS), that SBDG auto-configures for you in a context-aware manner. For example, see [Issue #61](https://github.com/spring-projects/spring-boot-data-geode/issues/61).

Some of the other main themes that came out of the 1.2 series leading up to final GA were:

-   [Assigning specific users](https://docs.spring.io/spring-boot-data-geode-build/1.2.x/reference/html5/#cloudfoundry-cloudcache-security-auth-runtime-user-configuration), with non-arbitrary roles and permissions, to run your Spring Boot applications in PCF when using PCC.
    
-   Being able to [target a specific PCC service](https://docs.spring.io/spring-boot-data-geode-build/1.2.x/reference/html5/#cloudfoundry-cloudcache-serviceinstance-targeting) when your Spring Boot applications are possibly bound to multiple instances, or maybe even [use multiple instances](https://docs.spring.io/spring-boot-data-geode-build/1.2.x/reference/html5/#cloudfoundry-cloudcache-multiinstance-using) if necessary.
    
-   Support for [Hybrid Cloud Deployments](https://docs.spring.io/spring-boot-data-geode-build/1.2.x/reference/html5/#cloudfoundry-geode).
    
-   Support for multiple Caching Patterns: [Look-Aside](https://docs.spring.io/spring-boot-data-geode-build/1.2.x/reference/html5/guides/caching-look-aside.html), [Inline](https://docs.spring.io/spring-boot-data-geode-build/1.2.x/reference/html5/guides/caching-inline.html) and [Near Caching](https://docs.spring.io/spring-boot-data-geode-build/1.2.x/reference/html5/guides/caching-near.html) along with dedicated support for the most common form of caching, [HTTP Session Caching](https://docs.spring.io/spring-boot-data-geode-build/1.2.x/reference/html5/guides/caching-http-session.html).
    

See the [changelog](https://github.com/spring-projects/spring-boot-data-geode/blob/1.2.0.RELEASE/spring-geode/src/main/resources/changelog.txt#L7-L25) for specifics on the 1.2.0.RELEASE.

## [](#whats-next)[](#whats-next)What’s Next

Now that SBDG’s story is coming to fruition and is in alignment with Spring Boot’s release cadence, we want to expand on the existing features and make certain Cloud Data Access patterns even easier to accomplish. Some of the Cloud Data Access patterns beyond just Caching include:

-   Distributed Compute
    
-   Event Stream Processing & Messaging
    
-   Query + Search
    
-   System of Record
    

Look for more Guides and Examples on how to employ these patterns in your Cloud-Native, Spring Boot applications, and how SBDG with the power of Apache Geode makes short work of these patterns in practice.

## [](#feedback)[](#feedback)Feedback

Feedback is always welcomed and much appreciated. Please test out the new bits, let us know what you think.

[Issues](https://github.com/spring-projects/spring-boot-data-geode/issues) | [PR](https://github.com/spring-projects/spring-boot-data-geode/pulls) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-boot)