---
title: Spring Boot for Apache Geode & Pivotal GemFire 1.1.1.RELEASE & 1.2.0.M2 Available!
source: https://spring.io/blog/2019/09/13/spring-boot-for-apache-geode-pivotal-gemfire-1-1-1-release-1-2-0-m2-available
scraped: 2026-02-23T14:36:29.034Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | John Blum |  September 13, 2019 | 0 Comments
---

# Spring Boot for Apache Geode & Pivotal GemFire 1.1.1.RELEASE & 1.2.0.M2 Available!

_Releases | John Blum |  September 13, 2019 | 0 Comments_

On behalf of the Spring and Apache Geode communities, it is my pleasure to announce the release of *Spring Boot for Apache Geode & Pivotal GemFire* (SBDG) `1.1.1.RELEASE` as well as `1.2.0.M2`.

Bits for `1.1.1.RELEASE` are available in [Maven Central](https://search.maven.org/search?q=spring-geode-starter).

Bits for the `1.2.0.M2` release are available in the Spring [Milestone](https://repo.spring.io/milestone/org/springframework/geode/spring-geode-starter/1.2.0.M2/) Repository.

## [](#whats-new)[](#whats-new)What’s New

SBDG `1.1.1.RELEASE` has been upgraded to *Spring Boot* `2.1.8.RELEASE` while SBDG `1.2.0.M2` has been upgraded to *Spring Boot* `2.2.0.M6`.

Additionally, both `1.2.0.M2` and `1.1.1.RELEASE` now support running your *Spring Boot*, Apache Geode `ClientCache` applications in [Pivotal Platform](https://pivotal.io/platform) using [Pivotal Cloud Cache (PCC)](https://pivotal.io/pivotal-cloud-cache) as a specific user.

> See [Issue-44](https://github.com/spring-projects/spring-boot-data-geode/issues/44) for more details.

This is useful if you are deploying *Spring Boot* applications to Platform using PCC and the app needs read-only access.

In the words of the PCC product director, **Pulkit Chandra**, "*With v1.9.0 we are introducing the concept of "shared service instances", which means an app in Space A can access a Cloud Cache cluster in Space B, but will only be able to "read" the data. This ensures for a healthy pattern of isolation for each domain cluster, where one space has the "read/write" access while others only have "read" access.*"

This capability and 1.9 are still in development, so this feature is tentatively planned for 1.9. However, in anticipation for this UC in Pivotal Platform, SBDG has you covered.

This feature is not limited to only being used when deploying your Spring Boot apps to Pivotal Platform. SBDG’s support for a specific runtime user works equally well when running your Spring Boot apps off Platform, connected to an externally managed Apache Geode cluster.

See the [documentation](https://docs.spring.io/spring-boot-data-geode-build/1.1.x/reference/html5/#cloudfoundry-cloudcache-security-auth-runtime-user-configuration) for more details.

For a complete list of changes in the `1.1.1.RELEASE` see the [changelog](https://github.com/spring-projects/spring-boot-data-geode/blob/1.1.1.RELEASE/spring-geode/src/main/resources/changelog.txt#L7-L24).

For a complete list of changes in the `1.2.0.M2` release, see the [changelog](https://github.com/spring-projects/spring-boot-data-geode/blob/1.2.0.M2/spring-geode/src/main/resources/changelog.txt#L7-L48).

## [](#whats-next)[](#whats-next)What’s Next

All efforts are now focused on getting to `1.2.0.M3`.

In the next release you will be able to annotate your *Spring Boot*, Apache Geode or Pivotal Cloud Cache based applications with the **new** `@EnableClusterAware` annotation and your app will seamlessly switch between local-only environments and a *client/server* environment depending on whether a server or cluster of servers can be detected by SBDG.

Preview:

Cluster-Aware, Spring Boot Apache Geode application

```
Copy@SpringBootApplication
@EnableClusterAware
class MySpringBootApacheGeodeClientCacheApplication { ... }
```

When a cluster is present in your runtime environment, then the `@EnableClusterAware` annotation (which is also meta-annotated with SDG’s `@EnableClusterConfiguration` annotation) will additionally push configuration metadata from your client to the server.

For example, if you have any client Regions defined in your application (very common) that need to have server-side Regions by the same name, then SBDG will handle this for you.

We think this will be a useful feature at development-time when you are potentially switching environments very rapidly, iterating on your application in order to get feedback quickly, such as being able to run tests and debug locally, and then push back to your test/staging environment for higher level acceptance and integration testing.

A preview of this feature can already be found in the [documentation](https://docs.spring.io/spring-boot-data-geode-build/1.2.x-SNAPSHOT/reference/html5/#geode-configuration-declarative-annotations-productivity) for the `1.2.0.BUILD-SNAPSHOT`. Give it a try!

`1.2.0.M3` is tentatively scheduled for **Tuesday, September 24th**.

## [](#feedback)[](#feedback)Feedback

As always, your feedback is most welcomed and appreciated.

[Issues](https://github.com/spring-projects/spring-boot-data-geode/issues) | [PR](https://github.com/spring-projects/spring-boot-data-geode/pulls) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-boot)