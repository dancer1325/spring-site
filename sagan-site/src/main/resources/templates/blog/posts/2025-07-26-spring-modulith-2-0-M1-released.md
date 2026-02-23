---
title: Spring Modulith 2.0 M1 released
source: https://spring.io/blog/2025/07/26/spring-modulith-2-0-M1-released
scraped: 2026-02-23T07:34:34.525Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  July 26, 2025 | 0 Comments
---

# Spring Modulith 2.0 M1 released

_Releases | Oliver Drotbohm |  July 26, 2025 | 0 Comments_

I am excited to announce the release of Spring Modulith 2.0 M1. It marks the starting point of a new generation and is thus based on the latest Spring Boot 4 M1 release and Spring Framework 7.0 M7. The main feature of the upcoming generation of Spring Modulith will be the revamped Event Publication Registry that'll address many of [the limitations of the current version](https://github.com/spring-projects/spring-modulith/issues/796).

Spring Modulith 2.0 M1 ships the major changes anticipated for the registry, and the JDBC implementation is tweaked to support the new event publication status model. All other store modules have been updated to still work but turn the new state transitions into no-ops so that existing applications will continue to work as is. If you'd like to play with the new registry, here are some details about it.

## [](#revamped-event-publication-registry)Revamped Event Publication Registry

The new event publication registry introduces new states an event publication can be in. We introduced dedicated states “published”, “processing”, “failed” and “resubmitted” as you can see below.

The primary challenge of our previous model was that we were unable to differentiate between publications that are currently processed and had ones that had failed already. The resubmission functionality had its challenges, too. The new model allows us to detect individual states explicitly and even support multi-instance application deployments without the need for distributed locking.

The `EventPublicationRegistry` implementation has been updated to make use of the new states. We've also introduced a staleness monitor to make sure that any event publications that might get stuck in a certain state can be considered failed after a particular duration. A new property namespace `spring.modulith.events.staleness.…` namespace has been introduced to control after which duration publications in certain states are considered failed.

The first module shipping support for the new model is the JDBC one. While we originally started with the idea of the event publication registry implementation technology being aligned with the general persistence mechanism of the application, we also encourage all JPA projects to give the JDBC-based registry a try. It should work seamlessly as the data model is completely independent from your application one. Make sure that you tweak your database migration tool to alter the database tables to end up at the [new schemas described in the reference documentation](https://docs.spring.io/spring-modulith/reference/2.0/appendix.html#schemas). The [originally announcing comment](https://github.com/spring-projects/spring-modulith/issues/796#issuecomment-3010188211) in the ticket contains sample logging output of the new registry working.

If you'd solely like to upgrade to Spring Modulith 2.0 M1 but still work with the legacy registry schema, you can set `spring.modulith.events.jdbc.use-legacy-structure` to `true`. The full change log is available [here](https://github.com/spring-projects/spring-modulith/releases/tag/2.0.0-M1). We urge you to give the milestone a try and report any feedback you have.