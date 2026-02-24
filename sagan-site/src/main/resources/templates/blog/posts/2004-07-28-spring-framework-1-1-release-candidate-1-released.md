---
title: Spring Framework 1.1 Release Candidate 1 Released
source: https://spring.io/blog/2004/07/28/spring-framework-1-1-release-candidate-1-released
scraped: 2026-02-24T09:41:00.692Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  July 28, 2004 | 0 Comments
---

# Spring Framework 1.1 Release Candidate 1 Released

_Releases | Thomas Risberg |  July 28, 2004 | 0 Comments_

The Spring team are happy to announce the first release candidate of Spring 1.1.

  
  
New features and enhancements in Spring 1.1 RC1 include:  

-   IoC container supports Method Injection: the overriding of concrete or abstract methods, typically to look up a dependency managed by the container. This means even less need to implement Spring-specific interfaces such as BeanFactoryAware.
-   The IoC container can now obtain objects from static factory methods as well as constructors. This enhancement allows excellent AspectJ integration: it is now possible to configure AspectJ aspects using Spring Dependency Injection, like any object. We plan to provide examples of AspectJ integration before 1.1 final.
-   Support for sending and receiving JMS messages
-   Support for Apache OJB as an ORM alternative, within Spring's consistent data access abstraction
-   Significantly improved JDO support
-   Greater flexibility in translating SQLExceptions, and other JDBC enhancements
-   Support for nested transactions and savepoints when working with JDBC. Declarative transaction management can support nested transactions.
-   AOP proxies are now serializable if all Advisors and target are serializable
-   Improved Velocity and FreeMarker support
-   Reworked parent/child bean definition concept: a child can now override any inherited settings. This can be used to simplify configuration.

Spring 1.1 final is scheduled for release in mid August, and will be 100% backward compatible with Spring 1.0.2. As Spring aims to minimize dependency of application code on the framework, and because changes are backward compatible, we do not expect that existing applications will require any code changes to migrate to Spring 1.1.  
  
The main focus between now and the 1.1 final release will be on documentation and examples.  
  
See the [changelog](/docs/changelog.txt) for details.  
  
The release can be downloaded [here](http://sourceforge.net/project/showfiles.php?group_id=73357)