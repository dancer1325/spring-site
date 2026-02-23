---
title: Spring Cloud Data Flow 1.1 GA released
source: https://spring.io/blog/2016/11/23/spring-cloud-data-flow-1-1-ga-released
scraped: 2026-02-23T18:42:54.336Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  November 23, 2016 | 1 Comment
---

# Spring Cloud Data Flow 1.1 GA released

_Releases | Mark Pollack |  November 23, 2016 | 1 Comment_

On behalf of the team, I am pleased to announce the GA release of Spring Cloud Data Flow 1.1. Follow the links in the [getting started guide](http://docs.spring.io/spring-cloud-dataflow/docs/1.1.0.RELEASE/reference/htmlsingle/#getting-started) to download the local server implementation and shell to create Stream and Tasks.

General highlights of the 1.1 GA Release include:

-   Builds upon Spring Boot 1.4, Spring Cloud Camden SR2, Spring Integration 4.3 and Spring Cloud Task 1.1 release improvements.
    
-   Adds [LDAP](http://docs.spring.io/spring-cloud-dataflow/docs/1.1.0.RELEASE/reference/htmlsingle/#configuration-security-ldap-authentication), [Basic](http://docs.spring.io/spring-cloud-dataflow/docs/1.1.0.RELEASE/reference/htmlsingle/#configuration-security-basic-authentication) and [File](http://docs.spring.io/spring-cloud-dataflow/docs/1.1.0.RELEASE/reference/htmlsingle/#configuration-security-file-based-authentication) based backend authentication
    
-   Improvements to [OAUTH backed authentication](http://docs.spring.io/spring-cloud-dataflow/docs/1.1.0.RELEASE/reference/htmlsingle/#configuration-security-oauth2)
    
-   [LDAP authentication](http://docs.spring.io/spring-cloud-dataflow/docs/1.1.0.RELEASE/reference/htmlsingle/#_ldap_transport_security) is now supported with SSL
    
-   Adds a form-based login page for non-OAUTH backend authentication methods such as the LDAP, Basic and File-based options
    
-   Adds the ability to [pass application specific properties via YAML file](http://docs.spring.io/spring-cloud-dataflow/docs/1.1.0.RELEASE/reference/htmlsingle/#_inline_vs_file_reference_properties_2). This is particularly useful when deploying streams that require many deployment properties to be set.
    
-   Portable deployment properties for memory, disk and cpu are in place for support across various runtime implementations.
    
-   Documentation for the core [REST API](http://docs.spring.io/spring-cloud-dataflow/docs/1.1.0.RELEASE/reference/htmlsingle/#api-guide)
    
-   Updated reference documentation showing how to integrate with [Spring Boot Admin to visualize server metrics](http://docs.spring.io/spring-cloud-dataflow/docs/1.1.0.RELEASE/reference/htmlsingle/#_spring_boot_admin) and how to [export Stream/Task application metrics to external application monitoring tools](http://docs.spring.io/spring-cloud-dataflow/docs/1.1.0.RELEASE/reference/htmlsingle/#_monitoring_deployed_applications).
    

UI Highlights include:

-   Bulk import and registration of stream and task app-starters
    
-   Bulk import support for Task definitions. This allows importing task definitions from a file or the ability to add multiple task-definitions using the Flo-editor
    
-   Adds Flo’s visual representation of running streams
    
-   Add visual representation for related streams. This representation also includes nested TAPs and the downstream processing nodes in an overall topology view.
    

![Visualization of Taps](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/master/spring-cloud-dataflow-docs/src/main/asciidoc/images/dataflow-nested-tap-streams.png)

-   List pages now support sorting
    
-   Server-side search support for stream and task list pages
    

For the complete list of features, bug-fixes, and improvements, please refer to the [closed 1.1 family of GitHub issues](https://github.com/spring-cloud/spring-cloud-dataflow/milestones?state=closed).

We welcome feedback and contributions! If you have any questions, comments or suggestions, please let us know via [GitHub Issues](https://github.com/spring-cloud/spring-cloud-dataflow/issues), [StackOverflow](http://stackoverflow.com/tags/spring-cloud-dataflow), or using the #SpringCloudDataFlow hashtag on Twitter.