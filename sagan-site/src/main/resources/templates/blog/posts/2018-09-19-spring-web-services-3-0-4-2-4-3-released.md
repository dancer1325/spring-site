---
title: Spring Web Services 3.0.4 / 2.4.3 released!
source: https://spring.io/blog/2018/09/19/spring-web-services-3-0-4-2-4-3-released
scraped: 2026-02-23T15:13:34.700Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Greg L. Turnquist |  September 19, 2018 | 0 Comments
---

# Spring Web Services 3.0.4 / 2.4.3 released!

_Engineering | Greg L. Turnquist |  September 19, 2018 | 0 Comments_

Greetings Spring community,

The Spring Web Services team is releasing two version at the same time. **3.0.4.RELEASE** as the main branch of development along with **2.4.3.RELEASE** for maintenance.

3.0.4.RELEASE comes with a handful of features listed further below. It also comes with new support for **Java 11**, the next long term supported version of Java.

## [](#java-11-and-beyond)[](#java-11-and-beyond)Java 11 and beyond

Starting in Java 9, several key Java EE packages had their visibility reduced. These included core XML and SOAP-based packages. In Java 11, these packages have been removed altogether. Since Java 11 is the first long term release since Java 8, it’s the version Spring Web Services aligns with for corresponding long term support.

What does this mean for you? To use Spring Web Services on Java 9+, you can no longer depend on the JDK providing key XML and SOAP-based libraries. Never fear, the solution is right here!

If you visit the project’s build file, you’ll discover a new [Java 11 profile](https://github.com/spring-projects/spring-ws/blob/master/pom.xml#L656-L711). This profile contains the extra dependencies you must add to your own build file in order to use Spring Web Services (or any XML/SOAP-based library for that matter).

Spring Web Services does not ship these dependencies so you’ll have to add them to your own build file. But once you do, you won’t have to worry about again (except for when newer versions of those APIs are released).

Still using Spring Web Services 2.x maintenance branch? We’ve got you covered. Without breaking backward compatibility, the 2.4.3.RELEASE [also supports Java 11](https://github.com/spring-projects/spring-ws/blob/2.x/pom.xml#L588-L644). It just uses a slightly older version of the SOAP API (1.3.8 instead of 1.4.0). Nothing is forced upon you, so you can continue using the same versions of everything else.

Whether or not Java 11 breaks any parts of your application outside of Spring Web Services, of course, is up to you.

For more details, read the following release notes for each version:

## [](#release-notes---spring-web-services---version-304release)[](#release-notes-spring-web-services-version-3-0-4-release)Release Notes - Spring Web Services - Version 3.0.4.RELEASE

### [](#bug)[](#bug)Bug

-   [SWS-1018](https://jira.spring.io/browse/SWS-1018) - SaajSoapMessage created with default (empty) SoapEnvelope
    
-   [SWS-1036](https://jira.spring.io/browse/SWS-1036) - SimpleXsdSchema not initialized property produces NullPointerException
    

### [](#improvement)[](#improvement)Improvement

-   [SWS-1030](https://jira.spring.io/browse/SWS-1030) - Resolve version conflicts
    
-   [SWS-1033](https://jira.spring.io/browse/SWS-1033) - Ehcache - OWASP Dependency Check issues
    
-   [SWS-1034](https://jira.spring.io/browse/SWS-1034) - Switch to Java 11 for future JDK support
    
-   [SWS-1037](https://jira.spring.io/browse/SWS-1037) - Make SimpleXsdSchema give a more productive error message
    
-   [SWS-1038](https://jira.spring.io/browse/SWS-1038) - Polish documentation
    
-   [SWS-1039](https://jira.spring.io/browse/SWS-1039) - Upgrade to latest version of Spring
    

## [](#release-notes---spring-web-services---version-243)[](#release-notes-spring-web-services-version-2-4-3)Release Notes - Spring Web Services - Version 2.4.3

### [](#bug-1)[](#bug-2)Bug

-   [SWS-1018](https://jira.spring.io/browse/SWS-1018) - SaajSoapMessage created with default (empty) SoapEnvelope
    
-   [SWS-1036](https://jira.spring.io/browse/SWS-1036) - SimpleXsdSchema not initialized property produces NullPointerException
    

### [](#improvement-1)[](#improvement-2)Improvement

-   [SWS-1012](https://jira.spring.io/browse/SWS-1012) - Upgrade to latest Spring Framework and Spring Security versions
    
-   [SWS-1033](https://jira.spring.io/browse/SWS-1033) - Ehcache - OWASP Dependency Check issues
    
-   [SWS-1034](https://jira.spring.io/browse/SWS-1034) - Switch to Java 11 for future JDK support
    

LInks: [Project Page](http://projects.spring.io/spring-ws/) | [GitHub](https://github.com/spring-projects/spring-ws) | [Issues](https://jira.spring.io/browse/SWS)

The artifacts are staged on maven central and [http://repo.spring.io/](http://repo.spring.io/).

## [](#springone-platform)[](#springone-platform)SpringOne Platform

The hottest Spring conference is right around the corner. In less than a week thousands of Spring developers from around the globe will gather in Washington, D.C. It’s still not too late to [register](https://springoneplatform.io/register).