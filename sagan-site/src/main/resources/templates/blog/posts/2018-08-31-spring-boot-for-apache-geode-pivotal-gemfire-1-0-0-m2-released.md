---
title: Spring Boot for Apache Geode & Pivotal GemFire 1.0.0.M2 Released!
source: https://spring.io/blog/2018/08/31/spring-boot-for-apache-geode-pivotal-gemfire-1-0-0-m2-released
scraped: 2026-02-23T15:15:14.786Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | John Blum |  August 31, 2018 | 0 Comments
---

# Spring Boot for Apache Geode & Pivotal GemFire 1.0.0.M2 Released!

_Engineering | John Blum |  August 31, 2018 | 0 Comments_

On behalf of the team and the community, I am pleased to announce the release of Spring Boot for Apache Geode and Pivotal GemFire `1.0.0.M2`.

In summary this release brings the following improvements:

-   Auto-configuration support for Spring Session when using [Apache Geode](http://geode.apache.org), [Pivotal GemFire](https://pivotal.io/pivotal-gemfire) or [Pivotal Cloud Cache (PCC)](https://pivotal.io/platform/services-marketplace/data-management/pivotal-cloud-cache) to manage and store your Spring Boot application’s (HTTP) Session state.
    
-   Recognition of `spring.cache.type` when using Spring’s [Cache Abstraction](https://docs.spring.io/spring/docs/current/spring-framework-reference/integration.html#cache) auto-configured with Spring Boot.
    
-   Additions and improvements to the documentation.
    
-   Upgrades to Spring Framework `5.0.8.RELEASE`, Spring Boot `2.0.4.RELEASE` and Spring Data `Kay-SR9`
    

This release builds on the [recently minted](https://spring.io/blog/2018/08/30/spring-session-for-apache-geode-pivotal-gemfire-2-0-5-release-and-2-1-0-m1-released) Spring Session for Apache Geode/Pivotal GemFire (SSDG) `2.0.5.RELEASE`.

1 of the key additions to SSDG was to enable dynamic configuration of Spring Session with Apache Geode/Pivotal GemFire/PCC using Properties along with a new `SpringSessionGemFireConfigurer` callback interface. That way, even in the context of Spring Boot’s auto-configuration, users have the ability to customize the configuration to meet their application requirements.

### [](#configuration-with-properties)[](#geode.boot-session-properties)Configuration with Properties

In addition to the Properties discussed [here](https://spring.io/blog/2018/08/30/spring-session-for-apache-geode-pivotal-gemfire-2-0-5-release-and-2-1-0-m1-released#geode-session-configuration-properties) and documented [here](https://docs.spring.io/autorepo/docs/spring-session-data-geode-build/2.0.5.RELEASE/reference/html5/#httpsession-gemfire-configuration-properties), Spring Boot for Apache Geode & Pivotal GemFire additionally recognizes the following properties:

-   `spring.session.timeout`
    
-   `server.servlet.session.timeout`
    

Still, `spring.session.data.gemfire.session.expiration.max-inactive-interval-seconds` takes precedence over `spring.session.timeout`, which takes precedence over `server.servlet.session.timeout` if any combination of these properties are set.

Spring Boot for Apache Geode/Pivotal GemFire additionally recognizes and respects `spring.session.store-type`. However, and unfortunately, this property cannot be set to either `gemfire` or `geode` as these values are not recognized as a valid ([enumerated](https://docs.spring.io/spring-boot/docs/current/api/org/springframework/boot/autoconfigure/session/StoreType.html)) values by Spring Boot itself.

### [](#configuration-using-a-configurer)[](#geode-boot-session-configurer)Configuration using a Configurer

Spring Boot for Apache Geode & Pivotal GemFire adds nothing beyond what is already provided by Spring Session for Apache Geode/Pivotal GemFire with respect to the new `SpringSessionGemFireConfigurer` call back interface, as discussed [here](https://spring.io/blog/2018/08/30/spring-session-for-apache-geode-pivotal-gemfire-2-0-5-release-and-2-1-0-m1-released#geode-session-configuration-configurer) and documented [here](https://docs.spring.io/autorepo/docs/spring-session-data-geode-build/2.0.5.RELEASE/reference/html5/#httpsession-gemfire-configuration-configurer).

## [](#whats-next)[](#geode-boot-next)What’s Next

Next up, Spring Boot for Apache Geode & Pivotal GemFire will provide OOTB `HealthIndicators` to assess and monitor the runtime health of your Apache Geode/Pivotal GemFire powered Spring Boot applications.

More information about Spring Boot `HealthIndicators` can be found [here](https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-endpoints.html#production-ready-health).

This will be available in next release, `1.0.0.M3`.

Even longer term, we are planning to add support for Spring Boot Actuator. There is an effort underway to retrofit Apache Geode/Pivotal GemFire’s Stats architecture with [Micrometer](https://micrometer.io/). This will serve as the basis for Spring Boot for Apache Geode & Pviotal GemFire’s Actuator support. This will most likely be available in SBDG 1.1.

## [](#feedback)[](#geode-boot-feedback)Feedback

Try it out!

You can get the new Spring Boot for Apache Geode or Pivotal GemFire bits from Spring’s [libs-milestone](http://repo.spring.io/libs-milestone/org/springframework/geode/spring-geode-starter/1.0.0.M2/) Repository and begin building Apache Geode/Pivotal GemFire powered Spring Boot applications by including the following dependency:

-   `org.springframework.geode:spring-geode-starter` (Apache Geode)
    
-   `org.springframework.geode:spring-gemfire-starter` (Pivotal GemFire/PCC)
    

Any feedback and/or contributions are always welcomed and appreciated: [Issues](https://github.com/spring-projects/spring-boot-data-geode/issues) | [PR](https://github.com/spring-projects/spring-boot-data-geode/pulls) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-boot).

---

Also be sure to checkout [SpringOne Platform](https://springoneplatform.io/) this year. There is a lot of great [content](https://springoneplatform.io/2018/sessions) and [speakers](https://springoneplatform.io/2018/speakers). Plus, **Luke Shannon** and I will be presenting on ["*Scaling Spring Boot Application in Real-Time*"](https://springoneplatform.io/2018/sessions/scaling-spring-boot-applications-in-real-time), where we will be showcasing this project and much more.