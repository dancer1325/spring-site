---
title: Spring Web Flow 2nd preview release is out
source: https://spring.io/blog/2005/04/11/spring-web-flow-2nd-preview-release-is-out
scraped: 2026-02-24T09:40:07.977Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Colin Sampaleanu |  April 11, 2005 | 0 Comments
---

# Spring Web Flow 2nd preview release is out

_Releases | Colin Sampaleanu |  April 11, 2005 | 0 Comments_

We are pleased to announce the 2nd preview release of Spring Web Flow for use with the Spring 1.2 release path.  This stable-for-development-use release offers the following major new features:  

-   Pluggable flow execution storage strategies, with out-of-the-box continuations support.  This means:
    -   You now have the option to persist an executing flow’s state to any backing data store, including the HttpSession (the default), a database, serialized files, etc.
    -   You can select to use a continuations based storage strategy, turning Spring Web Flow into a continuation-driven system providing proper browser navigational button behavior (back, next, refresh, and new window.) You can also choose between client-side or server-side continuation storage.  GZIP compression of flow execution state is also supported.
-   Support for OGNL transition criteria, with a TransitionCriteriaCreator strategy for easily integrating other expression languages or custom transition expressions as needed.
-   Portlet support, with the samples (Phonebook) illustrating Spring Web Flow in a portlet environment.
-   Support for a ‘validatorMethod’ action state property, specifying a validation method to invoke, for use with a FormAction with a configured Validator instance (to support easy piecemeal validation within a wizard)
-   Support for JDK 1.3.
-   Samples (Phonebook) illustrating how to write integration tests to verify the expected behavior of your flows.
-   Samples (Birthdate) illustrating Struts integration.
-   A brand new sample app (Sell Item), illustrating a validating wizard using continuations (providing proper browser navigational button use!) and conditional transitions (using OGNL expressions!).

There are also a number of bug fixes and other general improvements/polishing included in this release.  Note, for PR1 users: there are a few incompatible changes in PR2 with PR1.  Please see the Change Log on the WIKI for details.  

```
Copy          <br />
```

As always, with the Spring seal of quality you’ve come to expect, we offer:  

-   Quality documentation, both in the javadocs and WIKI docs  
    
-   Strong test coverage  
    
-   Careful attention to naming, packaging, and ease of use  
    
-   Exceptional error reporting
-   A feature set driven by end user needs

To download the preview release:  

```
Copy            <br />
```

1.  Access the [springframework project file list](http://sourceforge.net/project/showfiles.php?group_id=73357).  
    
    ```
    Copy        <br />
    ```
    
2.  Scroll down to the 'spring-webflow' release package and select
    

'spring-webflow-preview2.zip' for download.  

```
Copy            <br />
```

The release archive consists of two jars:  

-   spring-webflow.jar - the core web flow system (org.springframework.web.flow.\*)
-   spring-webflow-support.jar - supporting packages not yet released as part of the core Spring framework.

As the release archive does not ship with the Spring Framework, please download Spring 1.2 RC1 first if you have not done so already.  

```
Copy            <br />
```

Once downloaded, visit the [webflow space](http://opensource.atlassian.com/confluence/spring/display/WEBFLOW/Home) to review the module documentation and "Quick Start."    

```
Copy            <br />
```

To get a good feel for Spring Web Flow in action, checkout the samples in the release archive within the samples/webflow directory.  See the samples/webflow/readme.txt file on how to build and deploy the sample applications.  

```
Copy            <br />
```

We very much value your feedback—there is a lot of new, exciting stuff in this release so give it a try!  

```
Copy            <br />
```

Cheers,   

```
Copy            <br />
```

Keith Donald  

Erwin Vervaet