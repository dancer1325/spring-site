---
title: Spring Boot for Apache Geode & Pivotal GemFire 1.1.0.RELEASE & 1.2.0.M1 Released!
source: https://spring.io/blog/2019/08/23/spring-boot-for-apache-geode-pivotal-gemfire-1-1-0-release-1-2-0-m1-released
scraped: 2026-02-23T14:38:23.274Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | John Blum |  August 23, 2019 | 0 Comments
---

# Spring Boot for Apache Geode & Pivotal GemFire 1.1.0.RELEASE & 1.2.0.M1 Released!

_Releases | John Blum |  August 23, 2019 | 0 Comments_

On behalf of the Spring and Apache Geode communities, it is my pleasure to announce the release of *Spring Boot for Apache Geode & Pivotal GemFire* (SBDG) `1.1.0.RELEASE` and the `1.2.0.M1` release.

SBDG `1.1.0.RELEASE` is available in [Maven Central](https://search.maven.org/search?q=spring-geode-starter).

SBDG `1.2.0.M1` is available in the [Spring Milestone](https://repo.spring.io/milestone/org/springframework/geode/spring-geode-starter/1.2.0.M1/) repository.

# [](#whats-new-in-120m1)[](#whats-new-120M1)What’s New in `1.2.0.M1`

*Spring Boot for Apache Geode & Pivotal GemFire* (SBDG) `1.2.0.M1` was a baseline release to align SBDG on latest GemFire/Geode and Spring bits:

-   Spring Framework 5.2.0.RC1
    
-   Spring Boot 2.2.0.M5
    
-   Spring Data Moore-RC2/2.2.0.RC2
    
-   Spring Session Corn-M3/2.2.0.M3
    

With Spring Data Moore, this additionally pulls in:

-   Apache Geode 1.9.0
    
-   Pivotal GemFire 9.8.3
    

# [](#looking-back)[](#looking-back)Looking Back

*Spring Boot for Apache Geode & Pivotal GemFire* (SBDG) `1.1` covered a lot of ground. In this release line we included many important changes and features to help developers stay productive and solve important and relevant problems.

Let’s have a look back at a few highlights and worthy mentions.

#### [](#new-dependencies)[](#oneone-dependencies)New Dependencies

SBDG `1.1` is based on:

-   Spring Framework 5.1.9.RELEASE
    
-   Spring Boot 2.1.7.RELEASE
    
-   Spring Data Lovelace-SR10/2.1.10.RELEASE
    
-   Spring Session Bean-SR7/2.1.7.RELEASE
    

With Spring Data Lovelace, this pulls in:

-   Apache Geode 1.6.0
    
-   Pivotal GemFire 9.5.4
    

See the SBDG [Version Compatibility Matrix](https://github.com/spring-projects/spring-boot-data-geode/wiki/Spring-Boot-for-Apache-Geode-and-Pivotal-GemFire-Version-Compatibility-Matrix) for more details with regard to versions.

#### [](#support-for-caching-use-cases--patterns)[](#caching)Support for Caching Use Cases & Patterns

SBDG `1.1` now includes dedicated support for 3 of the most common [Caching Design Patterns](https://docs.spring.io/spring-boot-data-geode-build/1.1.x/reference/html5/#geode-caching-provider-look-aside-near-inline):

-   [Look-Aside Caching](https://docs.spring.io/spring-boot-data-geode-build/1.1.x/reference/html5/#geode-caching-provider-look-aside-caching) along with a [Guide](https://docs.spring.io/spring-boot-data-geode-build/1.1.x/reference/html5/guides/caching-look-aside.html) and [Example Code](https://github.com/spring-projects/spring-boot-data-geode/tree/1.1.0.RELEASE/spring-geode-samples/caching/look-aside) to help you apply this pattern.
    
-   [Inline Caching](https://docs.spring.io/spring-boot-data-geode-build/1.1.x/reference/html5/#geode-caching-provider-inline-caching), combined with the amazing power of [Spring Data Repositories](https://docs.spring.io/spring-boot-data-geode-build/1.1.x/reference/html5/#geode-caching-provider-inline-caching-using-spring-data-repositories), also complete with a [Guide](https://docs.spring.io/spring-boot-data-geode-build/1.1.x/reference/html5/guides/caching-inline.html) and [Example Code](https://github.com/spring-projects/spring-boot-data-geode/tree/1.1.0.RELEASE/spring-geode-samples/caching/inline) to help you apply this pattern.
    
-   [Near Caching](https://docs.spring.io/spring-boot-data-geode-build/1.1.x/reference/html5/#geode-caching-provider-near-caching) along with a [Guide](https://docs.spring.io/spring-boot-data-geode-build/1.1.x/reference/html5/guides/caching-near.html) and [Example Code](https://github.com/spring-projects/spring-boot-data-geode/tree/1.1.0.RELEASE/spring-geode-samples/caching/near) to help you apply this pattern.
    
-   In addition, we cover 1 of the most common use cases for caching, [HTTP Session State Caching](https://docs.spring.io/spring-boot-data-geode-build/1.1.x/reference/html5/#geode-session), which again, includes a [Guide](https://docs.spring.io/spring-boot-data-geode-build/1.1.x/reference/html5/guides/caching-http-session.html) and [Example Code](https://github.com/spring-projects/spring-boot-data-geode/tree/1.1.0.RELEASE/spring-geode-samples/caching/http-session).
    

It’s hard to argue that with the proliferation of Microservices in a Cloud context, caching will be 1 of the most common and important patterns used for Cloud-Native development.

No longer is caching only needed to improve on performance when accessing data from a relational database. Caching will be increasingly common and critical when a Microservice becomes the **new** data source by which your application accesses information.

This is because networks are inherently prone to failures and incur a significant latency penalty anytime a network-hop happens. This can prove to be fatal for applications under intense load, leading to all sorts of cascading failures (e.g. memory problems). The goal is to minimize the unnecessary network calls as much as possible, which is quite easy to do especially when the proportion of reads far exceeds writes.

Caching (HTTP) Session state will continue to be the most common form of caching. Fortunately, the awesome power of [Spring Session](https://spring.io/projects/spring-session), and in particular [Spring Session for Apache Geode & Pivotal GemFire](https://github.com/spring-projects/spring-session-data-geode#spring-session-for-apache-geode%E2%80%94%E2%80%8Bpivotal-gemfire), to manage your Spring Boot application’s Session state, for all types of Sessions (HTTP, *WebSockets* and *WebSessions* (Reactive)) is really simple. Plus, [Spring Session](https://spring.io/projects/spring-session), with its support for a wide variety of backing stores (**JDBC**, **Redis**, **MongoDB**, **Hazelcast**, and of course, **GemFire/Geode**) makes it stupid simple to switch providers if/when your requirements change.

#### [](#hybrid-cloud-deployments)[](#hybrid-cloud)Hybrid Cloud Deployments

With SBDG `1.1`, you can now deploy your Spring Boot applications to [Pivotal CloudFoundry (PCF)](https://pivotal.io/platform), yet still connect those apps to external data sources.

Hybrid Cloud arrangements are common when data must be protected and kept on-prem. It is also a very common intermediate step for companies trying to migrate to the cloud and modernize their stack. Hybrid deployments enable companies to take an incremental approach to cloud adoption as opposed to an all or nothing approach.

Therefore SBDG includes [first-class support](https://docs.spring.io/spring-boot-data-geode-build/1.1.x/reference/html5/#cloudfoundry-geode) for running your Spring Boot applications in PCF, yet connect those apps to externally managed, standalone Apache Geode or Pivotal GemFire clusters.

On a related note, in addition to Hybrid Cloud Deployments, SBDG additionally supports:

-   [Connecting to Multiple Pivotal Cloud Cache Instances](https://docs.spring.io/spring-boot-data-geode-build/1.1.x/reference/html5/#cloudfoundry-cloudcache-multi-instance-using)
    
-   [Pivotal Cloud Cache Instance Targeting](https://docs.spring.io/spring-boot-data-geode-build/1.1.x/reference/html5/#cloudfoundry-cloudcache-multi-instance-target)
    

#### [](#making-the-switch)[](#making-the-switch)Making the Switch

SBDG `1.1` (even before 1.1), has been focused on *developer productivity*: helping users **get up and running** as **easily** and **quickly** and **reliably** as possible!

Part of the strategy is rooted in helping users and customers:

1.  Switch from *Open Source* ([Apache Geode](https://geode.apache.org/)) to *Commercial* ([Pivotal Cloud Cache](https://pivotal.io/pivotal-cloud-cache))
    
2.  Move from *Non-Managed* (*Standalone, External*) to *Managed* environments ([Pivotal Cloud Foundry](https://pivotal.io/platform))
    
3.  With **Little** to **No** *code or configuration* changes; It should just work!
    

In fact, it is equally important that you can move both ways. From *Managed* back to *Standalone* environments and from *Commercial* back to *Open Source*. Again, it should just work!

That is what the [switch](https://docs.spring.io/spring-boot-data-geode-build/1.1.x/reference/html5/#geode-gemfire-switch) is all about…​ "*choice*", and specifically, "your" *choice*.

#### [](#many-more-changes)[](#more-changes)Many More Changes

Along with the changes mentioned above, there were several other changes that went into SBDG `1.1` as well. See the [changelog](https://github.com/spring-projects/spring-boot-data-geode/blob/master/spring-geode/src/main/resources/changelog.txt#L22-L128) for complete details.

# [](#whats-next)[](#whats-next)What’s Next

All focus now shifts to SBDG `1.2`. There are several areas we will continue to invest in.

-   First and foremost, *developer productivity*, which cannot be overstated.

What does this mean technically?

We are planning to introduce a new annotation, `@EnableClusterAware`, that when declared along with your `@SpringBootApplication` class, will enable you to move from a local development context (e.g. your IDE) to *client/server* without needing to worry about connections details and configuration of your cluster. SBDG will figure it out for you! This will make "*switching*" between environments (e.g. DEV & TEST/STAGING) even easier, especially as you are quickly iterating in development when debugging and testing your code.

-   *Targeted Runtime User Support* (See [Issue #44](https://github.com/spring-projects/spring-boot-data-geode/issues/44))

Additionally, we will enable developers in a PCF context to assign users with specific roles to their deployed Spring Boot applications when running the app. This is important for certain UCs where the application must be ran in *read-only* mode, where the app can only read data, but not modify it.

-   *Multi-Site Caching*

To compliment the *Look-Aside*, *Inline* and *Near Caching Patterns*, we will provide another Guide along with Example Code showcasing the power of Multi-Site, WAN topologies as applied to caching, and how this helps further increase the availability and resilience of your application architecture (think *Active-Active*, *Active-Passive* , *Availability Zones*, etc).

-   Inclusion on *Spring Initializer*

SBDG `1.2` bits are making their way to [start.spring.io](https://start.spring.io). In the near future, you will be able to select Apache Geode as an option when developing Spring Boot applications, which will conveniently provide you with the `spring-geode-starter` dependency.

All this and much more to come.

# [](#feedback)[](#feedback)Feedback

As always your continued feedback is highly appreciated and welcomed. It is your contributions that make SBDG a valuable project. Thank you.

[Issues](https://github.com/spring-projects/spring-boot-data-geode/issues) | [PR](https://github.com/spring-projects/spring-boot-data-geode/pulls) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-boot)

P.S. Don’t miss your opportunity to learn from the very best at this year’s [SpringOne Platform 2019](https://springoneplatform.io/) in **Austin, TX** from **October 7th** to the **10th**. Looking forward to seeing all of you there!