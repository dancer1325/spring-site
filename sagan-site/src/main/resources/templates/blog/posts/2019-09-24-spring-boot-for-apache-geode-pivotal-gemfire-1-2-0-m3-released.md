---
title: Spring Boot for Apache Geode & Pivotal GemFire 1.2.0.M3 Released
source: https://spring.io/blog/2019/09/24/spring-boot-for-apache-geode-pivotal-gemfire-1-2-0-m3-released
scraped: 2026-02-23T14:35:53.042Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | John Blum |  September 24, 2019 | 1 Comment
---

# Spring Boot for Apache Geode & Pivotal GemFire 1.2.0.M3 Released

_Releases | John Blum |  September 24, 2019 | 1 Comment_

On behalf of the Spring and Apache Geode communities, it is my pleasure to announce the release of *Spring Boot for Apache Geode & Pivotal GemFire* (SBDG) `1.2.0.M3`.

SBDG `1.2.0.M3` continues to be based on the same bits as the 1.2.0.M2 release: primarily:

-   *Spring Framework* 5.2.0.RC2
    
-   *Spring Boot* 2.2.0.M6
    
-   *Spring Data* Moore-RC3
    
-   *Spring Session* Corn-M4
    
-   *Spring Test for Apache Geode & Pivotal GemFire* (STDG) 0.0.8.RELEASE
    

The SBDG `1.2.0.M3` bits may be acquired from the Spring [Milestone](https://repo.spring.io/libs-milestone/org/springframework/geode/spring-geode-starter/1.2.0.M3/) Repository as well as [*Spring Initializer*](https://start.spring.io).

## [](#whats-new)[](#whats-new)What’s New

We now include support for switching between environments with NO CODE or CONFIGURATION changes necessary.

Again, we making and improving on SBDG’s primary directive, which is to:

1.  Switch between *Open Source* ([Apache Geode](https://geode.apache.org/)) and *Commercial* ([Pivotal Cloud Cache](https://pivotal.io/pivotal-cloud-cache) (PCC)).
    
2.  Switch between *Non-Managed* (Standalone or Externally Managed) to *Managed* environments (e.g. [Pivotal Platform](https://pivotal.io/platform))
    
3.  With **little** to **no code or configuration** changes necessary. It simply just works!
    

Note

It is also be possible to go back, i.e. from Managed to Non-Managed environments and from Commercial back to Open Source if the need arises. The framework will not lock you in. It is your choice.

This capability is made possible by the **new** `@EnableClusterAware` annotation, which can be used on your main `@SpringBootApplication` class as follows:

Using `@EnableClusterAware`

```
Copy@SpringBootApplication
@EnableClusterAware
class MySpringBootApacheGeodeClientCacheApplication { ... }
```

This **new** annotation comes with even more power. For more details you can read about it in the [documentation](https://docs.spring.io/spring-boot-data-geode-build/1.2.x/reference/html5/#geode-configuration-declarative-annotations-productivity-enableclusteraware).

In addition, we have wrote new and dedicated chapters on ["*Auto-configuration*"](https://docs.spring.io/spring-boot-data-geode-build/1.2.x/reference/html5/#geode-configuration-auto) applied by SBDG as well as what ["*Declarative Configuration*"](https://docs.spring.io/spring-boot-data-geode-build/1.2.x/reference/html5/#geode-configuration-declarative) (or explicit configuration) is still required.

Often times users ask what does SBDG auto-configure and what Apache Geode or PCC features must I configure myself? These chapters answer that question and much more.

Also be sure to check out the [section](https://docs.spring.io/spring-boot-data-geode-build/1.2.x/reference/html5/#geode-configuration-declarative-annotations-productivity) in the "*Declarative Configuration*" chapter that we are calling the "Productivity" based annotations.

In addition to these 2 new features, we also fixed a [bug](https://github.com/spring-projects/spring-boot-data-geode/issues/55) that left autowiring auto-configured `GemfireTemplates` into your application components incomplete and broken in some cases.

Thank you [Udo Kohlmeyer](https://github.com/kohlmu-pivotal) and [Mark Secrist](https://github.com/msecrist) for finding and raising this issue!

For a complete list of changes in `1.2.0.M3`, please see the [changelog](https://github.com/spring-projects/spring-boot-data-geode/blob/1.2.0.M3/spring-geode/src/main/resources/changelog.txt#L7-L22).

## [](#whats-next)[](#whats-next)What’s Next

This wraps up the feature set for SBDG `1.2`. There will be a SBDG 1.2 RC1 release coming up (tentatively) next week, right after *Spring Boot* 2.2 RC1, which will rebase SBDG `1.2.0.RC1` on *Spring Boot* `2.2.0.RC1` bits.

In this release we will also take a step backwards and start from the beginning. Meaning, we will focus on the "*getting started*" experience…​ using SBDG to create Apache Geode or Pivotal Cloud Cache (PCC) applications with Spring Boot from the ground up.

That experience actually (now) begins at [start.spring.io](https://start.spring.io) using the *Spring Initializer*, thanks to the *Spring Initializer* team!

Thank you ***Spring Initializer team*** and special thanks to [Stephane Nicole](https://spring.io/team/snicoll) for guiding us through the process. Much appreciated.

## [](#feedback)[](#feedback)Feedback

As always, feedback is highly appreciated and welcomed. Please give the new bits a try and let us know what you think.

[Issues](https://github.com/spring-projects/spring-session-data-geode/issues) | [PR](https://github.com/spring-projects/spring-boot-data-geode/pulls) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-boot)