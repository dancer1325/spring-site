---
title: Spring Boot for Apache Geode & VMware GemFire 1.4.0-M2 and 1.3.3.RELEASE Available
source: https://spring.io/blog/2020/08/22/spring-boot-for-apache-geode-vmware-gemfire-1-4-0-m2-and-1-3-3-release-available
scraped: 2026-02-23T13:50:30.193Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | John Blum |  August 22, 2020 | 0 Comments
---

# Spring Boot for Apache Geode & VMware GemFire 1.4.0-M2 and 1.3.3.RELEASE Available

_Releases | John Blum |  August 22, 2020 | 0 Comments_

On behalf of the Spring, Apache Geode and VMware Tanzu GemFire communities, is it is my pleasure to announce the release of ***Spring Boot for Apache Geode & VMware GemFire*** (SBDG) `1.4.0-M2` & `1.3.3.RELEASE`.

SBDG `1.4.0-M2` builds on:

-   Spring Boot `2.4.0-M2`
    
-   Spring Framework `5.3.0-M2`
    
-   Spring Data for Apache Geode & VMware GemFire (SDG) `2020.0.0-M2` (Ockham-M2/2.4.0-M2)
    
-   Spring Session for Apache Geode & VMware GemFire (SSDG) `2020.0.0-M1` (2.4.0-M1)
    
-   Spring Test for Apache Geode & VMware GemFire (STDG) `0.0.18.RELEASE`
    

SBDG `1.3.3.RELEASE` builds on:

-   Spring Boot `2.3.3.RELEASE`
    
-   Spring Framework `5.2.8.RELEASE`
    
-   Spring Data for Apache Geode & VMware GemFire (SDG) `Neumann-SR3` (2.3.3.RELEASE)
    
-   Spring Session for Apache Geode & VMware GemFire (SSDG) `Dragonfruit-RELEASE` (2.3.0.RELEASE)
    
-   Spring Test for Apache Geode & VMware GemFire (STDG) `0.0.18.RELEASE`
    

You can review the [Version Compatibility Matrix](https://github.com/spring-projects/spring-boot-data-geode/wiki/Spring-Boot-for-Apache-Geode-and-Pivotal-GemFire-Version-Compatibility-Matrix#version-compatibility-matrix) for complete details (Scroll the table to the right to see all dependencies).

The best way to get started, building Spring Boot applications using Apache Geode is with the Spring Initializer at [start.spring.io](https://start.spring.io9). Just click on this [link](https://start.spring.io/#!platformVersion=2.4.0-M2&dependencies=geode) to get started.

## [](#whats-new)[](#whats-new)What’s New

SBDG 1.4 M2 adds dedicated support for [Asynchronous (Write-Behind), Inline Caching](https://docs.spring.io/spring-boot-data-geode-build/1.4.x/reference/html5/#geode-caching-provider-inline-caching-asynchronous)!

By applying the *Inline Caching* pattern to your Spring Boot applications, Apache Geode will *Read-Through* on cache misses and *Write-Through* (sync), or *Write-Behind* (async), on cache updates, automatically, without requiring you to do anything special in your application.

You should use asynchronous, *Write-Behind* Inline Caching if strong consistency is not required and you desire better throughput.

Tip

SBDG already supported [Synchronous (Read/Write-Through) Inline Caching](https://docs.spring.io/spring-boot-data-geode-build/1.4.x/reference/html5/#geode-caching-provider-inline-caching-synchronous). Also see the associated Sample [Guide](https://docs.spring.io/spring-boot-data-geode-build/1.4.x/reference/html5/guides/caching-inline.html) and [Example Code](https://github.com/spring-projects/spring-boot-data-geode/tree/1.4.0-M2/spring-geode-samples/caching/inline).

Tip

SBDG also supports the [Look-Aside](https://docs.spring.io/spring-boot-data-geode-build/1.4.x/reference/html5/#geode-caching-provider-look-aside-caching), [Near](https://docs.spring.io/spring-boot-data-geode-build/1.4.x/reference/html5/#geode-caching-provider-near-caching) and [Multi-Site](https://docs.spring.io/spring-boot-data-geode-build/1.4.x/reference/html5/guides/caching-multi-site.html) Caching patterns.

Note

When most people think of caching, they are technically referring to the *Look-Aside Caching* pattern. But, did you know, there are several patterns of caching: *Look-Aside*, *Near Caching*, *Inline Caching* (Sync & Async) and *Multi-Site Caching*. Do not confuse the "pattern" of caching (how it is applied) with the "use case" for caching (what it is used for), e.g. (HTTP) Session state caching. Yes, there are many more "uses" for caching, but very specific patterns with architectural pros and cons that are applicable to a use case or not. "*The more you know…​*"

Both SBDG 1.4 M2 and 1.3.3.RELEASE include the new `spring-geode-bom` module. Given SBDG consists of the following modules:

-   `spring-geode-starter`
    
-   `spring-geode-starter-actuator`
    
-   `spring-geode-starter-session`
    
-   `spring-geode-starter test`
    

By using the new Maven BOM file, you can collectively and consistently manage the versions of SBDG’s modules required by your application simply by declaring dependency management in your Spring Boot Gradle or Maven POM project build files.

For example:

```
Copy<properties>
    <spring-geode.version>1.4.0-M2</spring-geode.version>
</properties>

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.geode</groupId>
            <artifactId>spring-geode-bom</artifactId>
            <version>${spring-geode.version}</version>
            <scope>import</scope>
            <type>pom</type>
        </dependency>
    </dependencies>
</dependencyManagement>

<dependencies>
    <dependency>
        <groupId>org.springframework.geode</groupId>
        <artifactId>spring-geode-starter</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.geode</groupId>
        <artifactId>spring-geode-starter-actuator</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.geode</groupId>
        <artifactId>spring-geode-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

We will be requesting changes to Spring Initializer to declare the new `spring-geode-bom` Maven BOM when generating Spring Boot Gradle/Maven projects using Apache Geode.

Other notable changes included in this release:

-   Updated the "*Getting Started*" Sample [Guide](https://docs.spring.io/spring-boot-data-geode-build/1.4.x/reference/html5/guides/getting-started.html) with a Section called "*Matching Client/Server Versions*" under ["Run the Application in a Cloud Platform Environment"](https://docs.spring.io/spring-boot-data-geode-build/1.4.x/reference/html5/guides/getting-started.html#spring-geode-samples-getting-started-run-app-cloudplatform) to help users navigate the version compatibility requirements of Spring Boot, Apache Geode, VMware/Pivotal GemFire and Pivotal Cloud Cache (now known as VMware Tanzu GemFire for VMs - BOSH)…​ phew!
    
-   Included a new Sample [Guide](https://docs.spring.io/spring-boot-data-geode-build/1.4.x/reference/html5/guides/boot-security.html) and [Example Code](https://github.com/spring-projects/spring-boot-data-geode/tree/1.4.0-M2/spring-geode-samples/boot/security) on Security, i.e. securing your GemFire/Geode client and server with Spring Boot when running in both local and managed (e.g. cloud platform) environments.
    

See the [changelog](https://github.com/spring-projects/spring-boot-data-geode/blob/master/spring-geode/src/main/resources/changelog.txt#L7-L53) for complete details.

## [](#whats-next)[](#whats-next)What’s Next

We will probably round out the SBDG 1.4 releases up to GA with another Sample Guide and Code on Asynchronous (Write-Behind) Inline Caching and double down on making the existing features more robust and reliable.

1 of the projects other overarching goals is to make it hard to do the wrong thing. We still have a ways to go, but each step along the way I am more confident things are moving in the right direction.

## [](#conclusion)[](#conclusion)Conclusion

As always, feedback and contributions are welcomed and appreciated.

[Issues](https://github.com/spring-projects/spring-boot-data-geode/issues) | [PR](https://github.com/spring-projects/spring-boot-data-geode/pulls) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-boot)