---
title: Spring Modulith 2.1 M2, 2.0.4, and 1.4.8 released
source: https://spring.io/blog/2026/02/19/spring-modulith-2-1-m2-2-0-3-and-1-4-8-released
scraped: 2026-02-23T12:33:20.340Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  February 19, 2026 | 1 Comment
---

# Spring Modulith 2.1 M2, 2.0.4, and 1.4.8 released

_Releases | Oliver Drotbohm |  February 19, 2026 | 1 Comment_

On behalf of the community, I am excited to announce the availability of Spring Modulith 2.1 M2, 2.0.4, and 1.4.8. The bug fix releases primarily ship the usual dependency upgrades. Besides the usual platform upgrades (Spring Boot 2.1 M2), the second milestone of the 2.1 release is packed with new features:

-   Support for an outbox-based event externalization – As an alternative to the built-in, asynchronous, event-listener-based externalization, we now support the externalization through [Namastack Outbox](https://outbox.namastack.io/), supporting multi-instance, order-preserving publication. Find an example [here](https://github.com/spring-projects/spring-modulith/tree/2.1.0-M2/spring-modulith-examples/spring-modulith-example-outbox). Big thanks to Roland Beisel, the lead of Namastack Outbox, for the contribution! [#1517](https://github.com/spring-projects/spring-modulith/issues/1517)
    
-   The ability to run an application module integration test is now combinable with Spring Boot's horizontal slice test capabilities. [#1573](https://github.com/spring-projects/spring-modulith/issues/1573)
    
-   The events captured in `PublishedEvents` and `Scenario` are bound from the entire application (previously thread-bound). This enables tests to see events from independent thread pools, such as the one used by the outbox integration mentioned above. [#1564](https://github.com/spring-projects/spring-modulith/issues/1564)
    
-   We revamped the metrics we publish in our observability support for more consistent naming and the ability to customize the publication. To support that, we split up the artifacts into API and Core for better alignment with compile and runtime classpaths. This is transparent for users of the insight starter. [#1567](https://github.com/spring-projects/spring-modulith/issues/1567) [#1559](https://github.com/spring-projects/spring-modulith/issues/1559)
    
-   The JDBC-based Event Publication Repository now initializes schemas by default, still honoring other database initialization techniques, such as Flyway, Liquibase, or Spring Boot's schema file support. [#1563](https://github.com/spring-projects/spring-modulith/issues/1563) [#1568](https://github.com/spring-projects/spring-modulith/issues/1568)
    

Find more details about the releases in the full changelog for [2.1 M2](https://github.com/spring-projects/spring-modulith/releases/tag/2.1.0-M2), [2.0.3](https://github.com/spring-projects/spring-modulith/releases/tag/2.0.3), and [1.4.8](https://github.com/spring-projects/spring-modulith/releases/tag/1.4.8).