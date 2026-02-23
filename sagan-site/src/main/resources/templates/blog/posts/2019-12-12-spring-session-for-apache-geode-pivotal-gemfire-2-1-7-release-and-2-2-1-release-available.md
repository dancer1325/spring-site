---
title: Spring Session for Apache Geode & Pivotal GemFire 2.1.7.RELEASE and 2.2.1.RELEASE Available
source: https://spring.io/blog/2019/12/12/spring-session-for-apache-geode-pivotal-gemfire-2-1-7-release-and-2-2-1-release-available
scraped: 2026-02-23T14:18:39.430Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | John Blum |  December 12, 2019 | 0 Comments
---

# Spring Session for Apache Geode & Pivotal GemFire 2.1.7.RELEASE and 2.2.1.RELEASE Available

_Releases | John Blum |  December 12, 2019 | 0 Comments_

On behalf of the Spring, Apache Geode and Pivotal GemFire communities, it is my pleasure to announce the release of *Spring Session for Apache Geode & Pivotal GemFire* (SSDG) `2.1.7.RELEASE` as well as `2.2.1.RELEASE`.

Both releases are available in [Maven Central](https://search.maven.org/artifact/org.springframework.session/spring-session-data-geode).

## [](#whats-new)[](#whats-new)What’s New

While SSDG `2.1.7.RELASE` primarily aligns with the latest Spring bits in its respective line:

-   Spring Framework `5.1.12.RELEASE`
    
-   Spring Boot `2.1.11.RELEASE`
    
-   Spring Data `Lovelace-SR14/2.1.14.RELEASE`
    
-   Spring Session `Bean-SR8/2.1.9.RELEASE`
    

And SSDG `2.2.1.RELEASE` aligns with:

-   Spring Framework `5.2.2.RELEASE`
    
-   Spring Boot `2.2.2.RELEASE`
    
-   Spring Data `Moore-SR3/2.2.3.RELEASE`
    
-   Spring Session `Corn-RELEASE/2.2.0.RELEASE`
    

SSDG `2.2.1.RELEASE` additionally includes the following improvements:

-   Converts all Spring Session OQL Indexes from HASH to FUNCTIONAL (RANGE) Indexes.
    
-   Adds support to disable OQL Indexes created by SSDG.
    
-   And enhances the PdxSerializableSessionSerializer to mark the PDX identity field using the Session ID.
    

See [here](https://github.com/spring-projects/spring-session-data-geode/milestone/20?closed=1) for full details.

## [](#whats-next)[](#whats-next)What’s Next

Heading into the New Year (2020), we plan to tackle much of what is in our [backlog](https://github.com/spring-projects/spring-session-data-geode/issues).

## [](#conclusion)[](#conclusion)Conclusion

As always, feedback is welcomed and appreciated.

[Issues](https://github.com/spring-projects/spring-session-data-geode/issues) | [PR](https://github.com/spring-projects/spring-session-data-geode/pulls) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-session)