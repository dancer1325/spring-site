---
title: Spring BlazeDS Integration 1.0.0.RC1 Released
source: https://spring.io/blog/2009/05/06/spring-blazeds-integration-1-0-0-rc1-released
scraped: 2026-02-24T09:08:16.858Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Jeremy Grelle |  May 06, 2009 | 0 Comments
---

# Spring BlazeDS Integration 1.0.0.RC1 Released

_Releases | Jeremy Grelle |  May 06, 2009 | 0 Comments_

Dear Spring Community,

I'm pleased to announce that the first release candidate of [Spring BlazeDS Integration](/spring-flex), the newest of the open source Spring web projects, is now available.

[Download](http://www.springsource.com/download/community?project=Spring%20BlazeDS%20Integration) | [Reference Documentation](http://static.springframework.org/spring-flex/docs/1.0.x/reference/html/index.html) | [JavaDocs](http://static.springframework.org/spring-flex/docs/1.0.x/javadoc-api/index.html) | [Changelog](http://static.springframework.org/spring-flex/docs/1.0.x/changelog.txt)

In addition to a number of bug fixes and some general refactoring, the main features of note that have been added in this release are:

-   Annotation-based configuration of remote destinations
-   Numerous customization hooks for things such as exception translation and incorporating third-party adapters
-   Full integration with the BlazeDS Message Service, including support for AMF, JMS, and Spring Integration messaging transports

For those upgrading from M2, take note that the <flex:remote-service> tag has been renamed to <flex:remoting-destination> to be more consistent with the BlazeDS nomenclature. Other than that change, the upgrade process from M2 to RC1 should be smooth.

The community has provided us with excellent feedback throughout the development process, and I encourage anyone interested to get involved by trying out the new functionality and giving us feedback in the [community forum](http://forum.springframework.org/forumdisplay.php?f=61) and [Jira](http://jira.springframework.org/browse/flex) as we push quickly towards a full-fledged 1.0.

Leading up to the 1.0 release, SpringSource and Adobe will be hosting another joint eSeminar on May 14th covering how to get up and running building Spring-powered RIAs with Adobe Flex and Spring BlazeDS Integration. You can [sign up here](http://www.adobe.com/cfusion/event/index.cfm?event=detail&id=462539&loc=en_us) for this free eSeminar.  
  
Jeremy Grelle  
Spring BlazeDS Integration Lead