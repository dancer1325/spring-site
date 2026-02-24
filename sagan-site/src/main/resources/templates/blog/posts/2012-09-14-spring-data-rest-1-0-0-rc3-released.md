---
title: Spring Data REST 1.0.0.RC3 Released
source: https://spring.io/blog/2012/09/14/spring-data-rest-1-0-0-rc3-released
scraped: 2026-02-24T08:17:01.518Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Jon Brisbin |  September 14, 2012 | 0 Comments
---

# Spring Data REST 1.0.0.RC3 Released

_Releases | Jon Brisbin |  September 14, 2012 | 0 Comments_

I'm pleased to announce the release of Spring Data REST 1.0.0.RC3! This release includes a significant number of bug fixes, changes to the structure of the JSON representation, better integration of user-defined Jackson Modules that are bootstrapped into the internal ObjectMapper, as well integration with Spring HATEOAS. Also included in this release is support for extending the resource representation (e.g. to add links to other, related resources) using the Spring HATEOAS ResourceProcessor abstraction.

New functionality includes:

-   JSON output looks different in an effort to make property names consistent and structure clearer.
-   Pulls in any Jackson Module beans discovered and integrates user configuration with internal ObjectMapper.
-   Integration with Spring HATEOAS - Customize the outgoing JSON by adding or removing links or otherwise altering the resource.

[Starter Web Application](https://github.com/springsource/spring-data-rest-webmvc) | [Wiki](https://github.com/SpringSource/spring-data-rest/wiki/) | [Release Notes](https://jira.springsource.org/secure/ReleaseNote.jspa?projectId=10901&version=13598)

To learn more about the project, visit the Spring Data REST [homepage](http://www.springsource.org/spring-data/rest), or visit [the Github repository](https://github.com/SpringSource/spring-data-rest) to download the source.