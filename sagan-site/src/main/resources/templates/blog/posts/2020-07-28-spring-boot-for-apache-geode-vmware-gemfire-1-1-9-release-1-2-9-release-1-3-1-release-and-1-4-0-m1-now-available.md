---
title: Spring Boot for Apache Geode & VMware GemFire 1.1.9.RELEASE, 1.2.9.RELEASE, 1.3.1.RELEASE and 1.4.0-M1 now available!
source: https://spring.io/blog/2020/07/28/spring-boot-for-apache-geode-vmware-gemfire-1-1-9-release-1-2-9-release-1-3-1-release-and-1-4-0-m1-now-available
scraped: 2026-02-23T13:53:44.024Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | John Blum |  July 28, 2020 | 0 Comments
---

# Spring Boot for Apache Geode & VMware GemFire 1.1.9.RELEASE, 1.2.9.RELEASE, 1.3.1.RELEASE and 1.4.0-M1 now available!

_Releases | John Blum |  July 28, 2020 | 0 Comments_

On behalf of the Spring, Apache Geode and VMware GemFire communities, it is my pleasure to announce new releases of *Spring Boot for Apache Geode & VMware GemFire* (SBDG).

SBDG `1.1.9.RELEASE` is now available and builds on Spring Boot `2.1.16.RELEASE`, Spring Data `Lovelace-SR19` and Spring Session `Bean-SR11`.

SBDG `1.2.9.RELEASE` is now available and builds on Spring Boot `2.2.9.RELEASE`, Spring Data `Moore-SR9` and Spring Session `Corn-SR3`.

SBDG `1.3.1.RELEASE` is now available and builds on Spring Boot `2.3.1.RELEASE`, Spring Data `Neumann-SR2` and Spring Session `Dragonfruit-RELEASE`. In addition, this release pulls in the new *Spring Test for Apache Geode & VMware GemFire* (STDG) `0.0.17.RELEASE` with some nice additions there, discussed under [What’s New](#whats-new).

Finally, SBDG `1.4.0-M1` is now available and builds on Spring Boot `2.4.0-M1`, Spring Data `2020.0.0-M1` (codename: *Ockham*) and Spring Session `2020.0.0-M1`.

You can get a complete break down of all direct dependency versions in the [Version Compatibility Matrix](https://github.com/spring-projects/spring-boot-data-geode/wiki/Spring-Boot-for-Apache-Geode-and-Pivotal-GemFire-Version-Compatibility-Matrix#version-compatibility-matrix).

As always you can begin any Spring Boot project using Apache Geode from [start.spring.io](https://start.spring.io).

-   Select your desired Spring Boot version
    
-   Click "Add Dependencies"
    
-   Type "Geode"
    
-   Select "*Spring for Apache Geode*"
    
-   Click "*GENERATE*"
    

And, the way you go!

## [](#whats-new)[](#whats-new)What’s New

While `1.1.9.RELEASE`, `1.2.9.RELEASE` and `1.4.0-M1` releases were primarily focused on aligning with dependencies and picking up new bits, the SBDG `1.3.1.RELEASE` rounds out the *Import/Export* functionality in [Using Data](https://docs.spring.io/spring-boot-data-geode-build/1.3.x/reference/html5/#geode-data-using).

Much like Spring Boot’s support for [SQL database initialization](https://docs.spring.io/spring-boot/docs/current/reference/html/howto.html#howto-initialize-a-database-using-spring-jdbc), SBDG allows you to place 1 or more JSON files on the application classpath to load GemFire/Geode Regions with data on startup.

Unlike Spring Boot, SBDB allows you to subsequently [export data](https://docs.spring.io/spring-boot-data-geode-build/1.3.x/reference/html5/#geode-data-using-export) from your Regions when the Spring Boot application is shutdown. This is convenient if you want to move data from QA to DEV in order to reproduce and debug an issue.

In `1.3.1.RELEASE`, SBDG further delineates the primary concerns of importing and exporting data:

-   Data Format (e.g. JSON vs. XML vs. other)
    
-   Resource Resolution (e.g. classpath, filesystem, URL)
    
-   Resource Reading/Writing
    

By default, SBDG imports JSON from the classpath and exports JSON to the filesystem. However, with each of the concerns above broken out, you could import JSON from a Web Service and export XML to an FTP site.

To see an example of changing the Resource Resolution, Reading, and Writing strategies, see the [`RestServiceCacheDataImportExportIntegrationTests`](https://github.com/spring-projects/spring-boot-data-geode/blob/master/spring-geode-autoconfigure/src/test/java/org/springframework/geode/boot/autoconfigure/data/RestServiceCacheDataImportExportIntegrationTests.java) test class in SBDG’s test suite.

You can learn more in the [reference documentation](https://docs.spring.io/spring-boot-data-geode-build/1.3.x/reference/html5/#geode-data-using-import-export-api-extensions).

In addition, SBDG `1.3.1.RELEASE` (and `1.4.0-M1`) pulls in *Spring Test for Apache Geode & VMware GemFire* (STDG) `0.0.17.RELEASE`, which includes a few new notable additions:

-   [How-To](https://github.com/spring-projects/spring-test-data-geode#mock-object-scope%E2%80%94%E2%80%8Blifecycle-management) control the GemFire/Geode mock objects scope and lifecycle.
    
-   [How-To](https://github.com/spring-projects/spring-test-data-geode#mocking-unsupported-region-operations) mock additional, GemFire/Geode mock object operations (e.g. `Region.putIfAbsent(key, value)`) not supported by STDG, OOTB.
    
-   [How-To](https://github.com/spring-projects/spring-test-data-geode#cleaning-up-after-gemfiregeode-during-integration-tests) perform GemFire/Geode resource and artifact cleanup when *Integration Testing*.
    

To use STDG in your Spring Boot application when *Unit or Integration Testing* with either Apache Geode or VMware, simply add `org.springframework.geode:spring-geode-starter-test` to your test compile classpath.

## [](#whats-next)[](#whats-next)What’s Next

For `1.3.2.RELEASE` (tentatively [scheduled](https://spring-calendar.cfapps.io/) for **Thurs, Aug 6th**) we plan to improve on the documentation with more details on how to use security (Auth, TLS) in your Spring Boot applications with Apache Geode or VMware GemFire. See and follow [PR #81](https://github.com/spring-projects/spring-boot-data-geode/pull/81) for more information.

In the SBDG `1.4` release line, the focus will be on adding support for Async (i.e. *Write Behind*), *Inline Caching* capabilities on top of the existing [synchronous (*Read/Write Through*) Inline Caching](https://docs.spring.io/spring-boot-data-geode-build/1.3.x/reference/html5/#geode-caching-provider-inline-caching) capabilities, present today. See and follow [Issue #58](https://github.com/spring-projects/spring-boot-data-geode/issues/58) for more details.

## [](#conclusion)[](#conclusion)Conclusion

As always, any feedback is appreciated.

[Issues](https://github.com/spring-projects/spring-boot-data-geode/issues) | [PR](https://github.com/spring-projects/spring-boot-data-geode/pulls) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-boot)