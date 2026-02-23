---
title: Spring Boot for Apache Geode & Pivotal GemFire 1.1.2.RELEASE and 1.2.0.RC1 Available
source: https://spring.io/blog/2019/10/03/spring-boot-for-apache-geode-pivotal-gemfire-1-1-2-release-and-1-2-0-rc1-available
scraped: 2026-02-23T14:33:12.407Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | John Blum |  October 03, 2019 | 1 Comment
---

# Spring Boot for Apache Geode & Pivotal GemFire 1.1.2.RELEASE and 1.2.0.RC1 Available

_Releases | John Blum |  October 03, 2019 | 1 Comment_

On behalf of the Spring, Apache Geode, Pivotal GemFire and Pivotal Cloud Cache communities, I am pleased to announce the release of *Spring Boot for Apache Geode*, Pivotal GemFire and Pivotal Cloud Cache (PCC) `1.1.2.RELEASE` as well as `1.2.0.RC1`.

SBDG `1.1.2.RELEASE` builds on Spring Boot `2.1.9.RELEASE` and is available in [Maven Central](https://search.maven.org/search?q=spring-geode-starter).

SBDG `1.2.0.RC1` builds on Spring Boot `2.2.0.RC1` and is available in the Spring [Milestone](https://repo.spring.io/milestone/org/springframework/geode/spring-geode-starter/1.2.0.RC1) Repository.

Additionally, SBDG `1.2.0.RC1` bits can be included in a project generated with the ***Spring Initializer*** at [https://start.spring.io](https://start.spring.io). Simply type "*Geode*" in the "*Search dependencies to add*" input field and you will see the "***Spring for Apache Geode***" dependency appear as an option you can add. This includes the `spring-geode-starter` dependency in your project Maven or Gradle build files when you generate a project using the Initializer. Check it out!

## [](#whats-new)[](#whats-new)What’s New

Both SBDG `1.1.2.RELEASE` and `1.2.0.RC1` fix a critical issue in the *auto-configuration* support for automatically configuring a `GemfireTemplate` instance per Region declared in the Spring context as a bean. See [Issue #55](https://github.com/spring-projects/spring-boot-data-geode/issues/55).

Additionally, SBDG `1.1.2.RELEASE` includes:

-   Upgrades to Spring Framework 2.1.10.RELEASE
    
-   Upgrades to Spring Boot 2.1.9.RELEASE
    
-   Upgrades to Spring Data Lovelace-SR11/2.1.11.RELEASE
    
-   Upgrades to Spring Session Bean-SR8
    
-   Upgrades to Spring Session for Apache Geode & Pivotal GemFire 2.1.6.RELEASE.
    

See the SBDG `1.1.2.RELEASE` [changelog](https://github.com/spring-projects/spring-boot-data-geode/blob/1.1.2.RELEASE/spring-geode/src/main/resources/changelog.txt#L7-L22) for more details.

SBDG `1.2.0.RC1` includes:

-   New Sample with [Guide](https://docs.spring.io/spring-boot-data-geode-build/1.2.x/reference/html5/guides/getting-started.html) and [Example Code](https://github.com/spring-projects/spring-boot-data-geode/tree/1.2.0.RC1/spring-geode-samples/intro/getting-started) on "*Getting Started*" with SBDG. The guide walks you through creating an SBDG application with *\*Spring Initializer\**, first using Apache Geode locally, then running in a client/server topology, and finally deploying the application to a Pivotal Platform environment using Pivotal Cloud Cache without any code or configuration changes.
    
-   Includes a new Smoke Tests test suite to ensure common use cases and functions with SBDG work correctly.
    
-   Upgrades to Spring Framework 5.2.0.RELEASE
    
-   Upgrades to Spring Boot 2.2.0.RC1
    
-   Upgrades to Spring Data Moore-RELEASE/2.2.0.RELEASE
    
-   Upgrades to Spring Session Corn-RC1
    
-   Upgrades to Spring Session for Apache Geode & Pivotal GemFire 2.2.0.RC1
    

See the SBDG `1.2.0.RC1` [changelog](https://github.com/spring-projects/spring-boot-data-geode/blob/1.2.0.RC1/spring-geode/src/main/resources/changelog.txt#L7-L28) for more details.

## [](#whats-next)[](#whats-next)What’s Next

All roads lead to a SBDG 1.2 GA release (i.e. `1.2.0.RELEASE`) now, just after *Spring Boot* 2.2 GAs in mid-October. So, feedback between now and then is important if you would like to see something in SBDG 1.2 before final GA.

After that, SBDG 1.3 will be in development and we are planning a bit of project reorganization to more closely align with Spring Boot’s GitHub project organization, making the project more intuitive to find things.

## [](#feedback)[](#feedback)Feedback

We want to hear from you! Your feedback is crucial to the development of this project, and it is definitely most welcomed and appreciated. So, give the new bits a try and let us know what you think.

[Issues](https://github.com/spring-projects/spring-boot-data-geode/issues) | [PR](https://github.com/spring-projects/spring-boot-data-geode/pulls) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-boot)