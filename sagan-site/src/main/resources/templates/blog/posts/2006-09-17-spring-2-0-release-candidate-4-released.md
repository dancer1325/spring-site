---
title: Spring 2.0 Release Candidate 4 Released
source: https://spring.io/blog/2006/09/17/spring-2-0-release-candidate-4-released
scraped: 2026-02-24T09:34:46.491Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  September 17, 2006 | 0 Comments
---

# Spring 2.0 Release Candidate 4 Released

_Releases | Juergen Hoeller |  September 17, 2006 | 0 Comments_

We are pleased to announce that Spring 2.0 RC4 has been released.  [Download](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=173644&release_id=446422) | [Documentation](http://static.springframework.org/spring/docs/2.0-rc4/reference/index.html) | [Changelog](http://static.springframework.org/spring/docs/2.0-rc4/changelog.txt)  

This is the last release candidate before Spring 2.0 final.  RC4 includes many further bug fixes and refinements in various areas, as well as minor new features (for example in the JMS support). Please see the changelog and [JIRA](http://opensource.atlassian.com/projects/spring/secure/IssueNavigator.jspa?reset=true&pid=10000&fixfor=10291) issue list for all the details.  The most notable changes include...  

**New and Noteworthy  
**

-   This release introduces versioned file names for the 2.0 DTD and XSDs. Please adapt your bean definition files if they build on the 2.0 XSDs on or 2.0-specific DTD features.  For example:  
    

> <?xml version="1.0" encoding="UTF-8"?>  
> <beans xmlns="http://www.springframework.org/schema/beans"  
>             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
>             xsi:schemaLocation="  
>                 http://www.springframework.org/schema/beans  
>                 http://www.springframework.org/schema/beans/spring-beans-**2.0**.xsd">  
>   
>     <!-- Define your beans here -->  
>   
> </beans>

-   As you would expect, the Spring 1.2 DTD is still fully supported under its established spring-beans DTD file name.

-   2.0 XML configuration elements and attributes are now fully documented for each schema we support.  Special thanks to Rick Evans for his contribution in this area.  
    

-   Apache OJB support (org.springframework.orm.ojb) is no longer shipped with the core Spring distribution as of this release. It is now available from the [Spring Modules](https://springmodules.dev.java.net/) project.

-   Spring's JPA support is now fully tested against Oracle TopLink Essentials v2 b16 as well as Hibernate EntityManager 3.2.0 CR2. Our extensive integration test suite fully passes for both of those JPA providers now. We are currently in the process of covering OpenJPA in the same fashion.  
    

We look forward to your feedback on this release.

Enjoy,

Juergen Hoeller  
Lead of Spring Framework Development