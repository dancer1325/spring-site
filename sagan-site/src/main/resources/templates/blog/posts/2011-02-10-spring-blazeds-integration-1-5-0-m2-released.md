---
title: Spring BlazeDS Integration 1.5.0.M2 Released
source: https://spring.io/blog/2011/02/10/spring-blazeds-integration-1-5-0-m2-released
scraped: 2026-02-24T08:47:02.013Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Jeremy Grelle |  February 10, 2011 | 0 Comments
---

# Spring BlazeDS Integration 1.5.0.M2 Released

_Releases | Jeremy Grelle |  February 10, 2011 | 0 Comments_

Dear Spring Community,

I'm pleased to announce that the 1.5.0.M2 milestone release of [Spring BlazeDS Integration](/spring-flex), the open source solution for building Spring-powered RIAs with Adobe Flex, is now available.

[Download](http://www.springsource.com/download/community?project=Spring%20BlazeDS%20Integration) | [Reference Documentation](http://static.springframework.org/spring-flex/docs/1.5.x/reference/html/index.html) | [JavaDocs](http://static.springframework.org/spring-flex/docs/1.5.x/javadoc-api/index.html) | [Changelog](http://static.springframework.org/spring-flex/docs/1.5.x/changelog.txt)

Highlights of the significant new features and enhancements in this release include:

-   Support for reading and writing AMF content with RESTful Spring MVC @Controllers. This serves as a nice alternative to the direct RPC approach of the Remoting Service, reducing duplication of effort in applications that need to support multiple client types. (See the updated Test Drive for usage examples.)  
      
    
-   A major refactoring of the Spring Security 3 support, resulting in easier integration of Flex apps with various Spring Security features such as Remember Me, Session Fixation Protection, and Concurrent Session Control.  
      
    
-   Further evolution of the Hibernate serialization support introduced in 1.5.0.M1, including the option to use direct field mapping instead of property-based mapping.  
      
    
-   Easier customization and namespace-supported configuration of framework-provided services such as the LoginCommand and MessageInterceptors.  
      
    
-   Upgraded compatibility with Spring Integration 2.0.x  
      
    
-   A complete revision of the Maven-based Test Drive samples, including an update across the board to use Flex 4, and a brand new sample to demonstrate the RESTful programming model.

One additional item to note is that the Flex Addon for Spring Roo is no longer part of the project distribution. Instead, version 1.0.0.M2 of the Flex Addon will be released separately in the coming weeks and will be available to Spring Roo 1.1.1 users through Roo's Addon Discovery mechanism. If you'd like to try out the nightly builds of the Flex Addon (which are necessary for compatibility with Roo 1.1 and above), I encourage you to [reach out to the community for guidance](http://forum.springsource.org/forumdisplay.php?f=61).

As always, I encourage anyone interested to get involved by trying out the release and giving us feedback in the [community forum](http://forum.springsource.org/forumdisplay.php?f=61) and [Jira](http://jira.springframework.org/browse/flex), as we are fast approaching 1.5.0.RC1. We continually get great feedback from people having success with Spring BlazeDS Integration in their projects, and we look forward to hearing more about your experiences.

  
Jeremy Grelle  
Spring Flex Lead