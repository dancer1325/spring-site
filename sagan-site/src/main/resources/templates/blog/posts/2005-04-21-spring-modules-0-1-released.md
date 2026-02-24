---
title: Spring Modules 0.1 Released
source: https://spring.io/blog/2005/04/21/spring-modules-0-1-released
scraped: 2026-02-24T09:39:59.161Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Colin Sampaleanu |  April 21, 2005 | 0 Comments
---

# Spring Modules 0.1 Released

_Releases | Colin Sampaleanu |  April 21, 2005 | 0 Comments_

We are pleased to announce that Spring Modules 0.1 has just been released.

Downloads can be found at: [](http://springmodules.dev.java.net/ "Visit page outside Confluence")[http://springmodules.dev.java.net](http://springmodules.dev.java.net)![](http://opensource.atlassian.com/confluence/spring/images/icons/linkext7.gif).

This release includes:

-   Integration with HiveMind, allowing for HiveMind services to be exposed as Spring beans
-   Spring-style integration classes for JSR-94 rules engines such as Jess and Drools
-   Spring-style configuration for OSWorkflow
-   Integration classes for Commons Validator (taken from Spring sandbox)

For a detailed list of features, see the changelog.

The HiveMind and Commons Validator support classes are considered to be stable and ready for use in production. Modifications to the JavaScripthandling in Commons Validator will appear in 0.2.

The OSWorkflow configuration support is ready for use in production, but 0.2 will introduce the OSWorkflowTemplate, which will bring full Spring semantics to workflow usage.

We have successfully used the JSR-94 integration classes in a production setting, but are planning to overhaul session handling in 0.2.

We are planning to release 0.2 within the next three weeks, hopefully just after Spring 1.2 goes final. This is in keeping with our plan to release new features as often as possible.

The full roadmap can be found at: [](http://opensource.atlassian.com/projects/spring/secure/BrowseProject.jspa?id=10030&report=roadmap)[http://opensource.atlassian.com/projects/spring/secure/BrowseProject.jspa?id=10030&amp;report=roadmap](http://opensource.atlassian.com/projects/spring/secure/BrowseProject.jspa?id=10030&amp;report=roadmap)![](http://opensource.atlassian.com/confluence/spring/images/icons/linkext7.gif).

We are still looking to recruit more developers to work on more modules, and any feedback on new or existing features will be much appreciated.