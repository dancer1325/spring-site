---
title: Spring Roo 2.0.0M2 released
source: https://spring.io/blog/2016/05/18/spring-roo-2-0-0m2-released
scraped: 2026-02-23T18:55:25.862Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Pieter Humphrey |  May 18, 2016 | 3 Comments
---

# Spring Roo 2.0.0M2 released

_News | Pieter Humphrey |  May 18, 2016 | 3 Comments_

On behalf on the Spring Roo team at DISID Corporation, I'm pleased to announce that Spring Roo 2.0.0.M2 has been released!

The main goal of this Spring Roo version was to update code generation to use latest Spring technologies:

-   Use Spring IO Platform to manage dependency versions and be able to use latest Spring technologies.
-   Update code generation to use the latest Spring framework versions (4.x)
-   Update code generation to include Spring Boot on generated projects.
-   Remove all generated configuration based on XML files and use Spring Boot auto-configuration.
-   Remove Active Record data model in favor of the Repository (Spring Data) based one.
-   Generate application architecture based on service layer pattern by default

Also, the Spring Roo shell has improved its usability:

-   More intuitive commands that provides only the necessary parameters.
-   New commands to configure Spring Roo behavior.
-   Multi-module projects improvement.
-   Push-in operations using Spring Roo Shell.

Finally, the presentation layer generation engine has been refactored:

-   Different response types are allowed in the same controller (JSON, THYMELEAF, etc...)
-   Views could be generated using THYMELEAF.
-   View layer generation engine is based on FreeMarker templates that could be installed and customized by developers.
-   Dojo has been replaced with HTML5, CSS3, Bootstrap and jQuery components. (Datatables, Select2, etc...)
-   New amazing Spring Roo Responsive Theme!
-   ... and much more!

As always, new version of Spring Roo, includes some bug fixes and improvements reported by the community.

For full details on the changes made in the new Spring Roo version, please refer to the [Spring Roo 2.0.0.M2 Release Notes](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10340&version=15212)

Additionally Spring Tool Suite (STS) team is working in releasing the STS 3.8.x which will include the Spring IDE Roo Support for Roo 2.0.0.M2.

If you want to install the updated Roo components before, you would do it manually via the Spring IDE nightly update site, but remember that you will get an unstable version of STS that could contains errors.

Thanks to all awesome users who came up with useful bug reports and suggestions.

For more specific information about Spring Roo project please see the [Project Page](http://projects.spring.io/spring-roo/) | [GitHub](https://github.com/spring-projects/spring-roo)

As always, you'll also find Roo on Twitter - either follow [@SpringRoo](http://www.twitter.com/springroo) or just include #SpringRoo in your tweets.

Stay tuned to Spring Roo news!