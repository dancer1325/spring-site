---
title: Spring Framework 3.2 and the SpringSource EBR
source: https://spring.io/blog/2013/08/23/spring-framework-3-2-and-the-springsource-ebr
scraped: 2026-02-24T07:59:40.775Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Pieter Humphrey |  August 23, 2013 | 2 Comments
---

# Spring Framework 3.2 and the SpringSource EBR

_News | Pieter Humphrey |  August 23, 2013 | 2 Comments_

Beginning with version 3.2, [Spring Framework](http://projects.spring.io/spring-framework) JAR files such as spring-core, spring-context, and spring-webmvc no longer contain MANIFEST.MF files with OSGi metadata. Likewise, builds are not automatically promoted to the [SpringSource EBR](http://ebr.springsource.com/repository/app/faq). To ensure that OSGi users are able to upgrade to Spring Framework 3.2, SpringSource will create and publish bundles for Spring Framework 3.2 GA to the EBR in a separate process shortly following the GA release. At least one 3.2 milestone or release candidate will also be published such that the community can validate the OSGi metadata prior to going GA. Note that any future releases in the Spring Framework 3.1.x line will continue to contain OSGi metadata and will be published immediately to the EBR as per usual. Interested users may want to place a watch on [SPR-8903](https://jira.springsource.org/browse/SPR-8903) to be notified of further updates, e.g. when Spring Framework 3.2 bundles are published to the EBR.