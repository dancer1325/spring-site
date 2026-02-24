---
title: Spring IDE 1.2.5 Released
source: https://spring.io/blog/2006/01/11/spring-ide-1-2-5-released
scraped: 2026-02-24T09:38:21.462Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Torsten Juergeleit |  January 11, 2006 | 0 Comments
---

# Spring IDE 1.2.5 Released

_Releases | Torsten Juergeleit |  January 11, 2006 | 0 Comments_

Dear Spring Community,  
  
We are pleased to announce that Spring IDE 1.2.5 has been released.  
With this release of Spring IDE version 1.0.0 of the [BeansXmlEditor](http://springide.org/project/wiki/BeansXmlEditor) is shipped. Additionally a few bugfixes and usability enhancements are provided. For a complete list of bugfixes and enhancements included visit [http://springide.org/project/milestone/Release%201.2.5](http://springide.org/project/milestone/Release%201.2.5)

Changes:

-   XML parser [Xerces](http://xerces.apache.org/xerces2-j/) updated to version 2.7.1
-   bugs in [BeansConfigValidator](http://springide.org/project/wiki/BeansConfigValidator) fixed:
    -   check for no-arguments-constructor skipped for attribute 'autowire="constructor"'
    -   skipping placeholders in classes and property names
    -   init-method and destroy-method are validated now
    -   required default constructor are validated now
-   more suitable icons in the [BeansView](http://springide.org/project/wiki/BeansView) and the outline view of [BeansXmlEditor](http://springide.org/project/wiki/BeansXmlEditor)
-   new entry in [BeansView](http://springide.org/project/wiki/BeansView) context menu for opening the selected node in an text editor
-   changes to [BeansXmlEditor](http://springide.org/project/wiki/BeansXmlEditor):
    -   descriptive icons in outline view instead of verbose text
    -   new toolbar action in outline view for alphabetically sorting
    -   new entry in outline's context menu for toggeling the outline style between Spring-style and standard XML-style

More details are available from the project's site [http://springide.org/](http://springide.org/)  
  
This release is available from the project's Eclipse update site [http://springide.org/updatesite/](http://springide.org/updatesite/)  
  
For bug reports tickets can be opened via [http://springide.org/project/newticket](http://springide.org/project/newticket)