---
title: Spring Web Flow 1st preview release is out
source: https://spring.io/blog/2005/03/30/spring-web-flow-1st-preview-release-is-out
scraped: 2026-02-24T09:40:12.359Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Colin Sampaleanu |  March 30, 2005 | 0 Comments
---

# Spring Web Flow 1st preview release is out

_Releases | Colin Sampaleanu |  March 30, 2005 | 0 Comments_

We are pleased to announce a preview release of Spring Web Flow for use with the Spring 1.2 release path.  With this release, we consider the web flow system fit for development use.  

```
Copy        <br />
```

Contained in this release are new features we expect to take web applications with demanding page flow requirements to the next level.  These include:  

-   The ability to capture the logical page flows of your application as self-contained modules reusable in multiple situations.
-   The ability to nest flows 'n' levels deep (as subflows), where each flow is a "black-box" adhering to a well-defined contract for input/output.
-   The ability to express page flows declaratively, with a pluggable flow definition format (currently Java-based and XML-based builder formats are provided.)
-   The ability to affect the path through a flow in a dynamic fashion by reasoning on contextual data in any supported scope.
-   The ability to track and respond to the lifecycle of a page flow.
-   Automatic state management with the ability to store model data in several scopes (event, request, flow)
-   The ability to centralize related action logic associated with a flow in one class.
-   Support for application transaction synchronization, using a token-based mechanism.
-   No hard-wired dependency on HTTP servlet request/response or any request URL, for use in other environments like Portlets, JSF, and Tapestry.
    
    -   An expired flow detector, for automatic cleanup of abandoned flows.
    -   Out of the box helper actions for
    
    form data binding and validation.
    
-   Out of the box Struts 1.x integration (sample forthcoming.)
-   Out of the box Spring MVC integration.
-   Designed for extensibility, with well-documented plug-in points for customization (custom state types, custom flow builders, etc.)  

  
And as always, with the Spring seal of quality you?ve come to expect, we offer:  

-   Quality documentation, both in the javadocs and forthcoming reference docs
-   Strong test coverage
-   Careful attention to naming, packaging, and ease of use
-   Exceptional error reporting
-   A feature set driven by end user needs  

  
To download the preview release:    

1.  Access the springframework project file [list](http://sourceforge.net/project/showfiles.php?group_id=73357)
2.  Scroll down to the 'spring-webflow' release package and select 'spring-webflow-preview1.zip' for download.  

The release archive consists of two jars:  

1.  spring-webflow.jar - the core web flow system (org.springframework.web.flow.\*)
2.  spring-webflow-support.jar - supporting packages not yet released as part of the core Spring framework.  

As the release archive does not ship with the Spring Framework, please download Spring 1.2 RC1 first if you have not done so already.    
  
Once downloaded, visit the [webflow space](http://opensource.atlassian.com/confluence/spring/display/WEBFLOW/Home) to review the module documentation and "Quick Start."    
  
To get a good feel for Spring Web Flow in action, checkout the samples in the release archive within the samples/webflow directory.  See the samples/webflow/readme.txt file on how to build and deploy the sample applications.   We very much value your feedback, and hope you enjoy using Spring Web Flow as much as we have enjoyed bringing it to you.    
  
Cheers,    
  
Keith Donald  
Erwin Vervaet