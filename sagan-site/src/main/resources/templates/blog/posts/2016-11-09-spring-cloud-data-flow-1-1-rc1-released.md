---
title: Spring Cloud Data Flow 1.1 RC1 Released
source: https://spring.io/blog/2016/11/09/spring-cloud-data-flow-1-1-rc1-released
scraped: 2026-02-23T18:58:47.787Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  November 09, 2016 | 0 Comments
---

# Spring Cloud Data Flow 1.1 RC1 Released

_Releases | Mark Pollack |  November 09, 2016 | 0 Comments_

On behalf of the team, I am pleased to announce the first release candidate of Spring Cloud Data Flow 1.1. Follow the links in the [getting started guide](http://docs.spring.io/spring-cloud-dataflow/docs/1.1.0.RC1/reference/htmlsingle/#getting-started) to download the local server implementation and shell to create Stream and Tasks.

The 1.1 RC1 release includes the following new features and improvements:

-   Builds upon Camden.SR2 release improvements
    
-   [LDAP authentication](http://docs.spring.io/spring-cloud-dataflow/docs/1.1.0.RC1/reference/htmlsingle/#_ldap_transport_security) is now supported with SSL
    
-   Portable deployment properties for memory and cpu are in place for support across various runtime implementations
    
-   Passing Java Options to the local JVM when launching application is now supported
    
-   UI Improvements
    
    -   List pages now support sorting
        
    -   Server-side search support for stream and task list pages
        
    -   Content-assist for bulk task definitions including the support for incremental validations of task application properties
        
-   Add content assist support for tasks in the shell
    
-   Thanks to the community for adding DB2 support for the TaskRepository
    
-   [Documentation on how to use Spring Boot Admin](http://docs.spring.io/spring-cloud-dataflow/docs/1.1.0.RC1/reference/htmlsingle/#_spring_boot_admin) to visualize server metrics
    

Stay tuned for some more additions to the reference guide for stream monitoring as well as the upcoming release train of new stream application starters, now structured as a [github organization](https://github.com/spring-cloud-stream-app-starters) with independent repositories for each application.

Review the [1.1.0.RC1 release marker](https://github.com/spring-cloud/spring-cloud-dataflow/milestone/9?closed=1) to learn more about the incremental improvements.