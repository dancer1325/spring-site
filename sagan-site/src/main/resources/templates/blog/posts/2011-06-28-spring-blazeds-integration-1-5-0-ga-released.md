---
title: Spring BlazeDS Integration 1.5.0 GA Released
source: https://spring.io/blog/2011/06/28/spring-blazeds-integration-1-5-0-ga-released
scraped: 2026-02-24T08:39:22.448Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Jeremy Grelle |  June 28, 2011 | 0 Comments
---

# Spring BlazeDS Integration 1.5.0 GA Released

_Releases | Jeremy Grelle |  June 28, 2011 | 0 Comments_

Dear Spring Community,

I'm pleased to announce that the 1.5.0 GA release of [Spring BlazeDS Integration](/spring-flex), the open source solution for building Spring-powered RIAs with Adobe Flex, is now available.

[Download](http://www.springsource.com/download/community?project=Spring%20BlazeDS%20Integration) | [Reference Documentation](http://static.springframework.org/spring-flex/docs/1.5.x/reference/html/index.html) | [JavaDocs](http://static.springframework.org/spring-flex/docs/1.5.x/javadoc-api/index.html) | [Changelog](http://static.springframework.org/spring-flex/docs/1.5.x/changelog.txt)

This release includes just a few bug-fixes needed since the release candidate. To recap from the previous milestone releases, the major features included in 1.5.0 are:

-   Enhanced AMF serialization support, with proper handling of Hibernate lazy properties and collections, the option to use direct field mapping instead of property-based mapping, and support for specifying alternate constructors to default no-arg constructor.  
      
    
-   A major refactoring of the Spring Security support, resulting in easier integration of Flex apps with various Spring Security features such as Remember Me, Session Fixation Protection, and Concurrent Session Control.  
      
    
-   Easier customization and namespace-supported configuration of framework-provided services such as the LoginCommand and MessageInterceptors.  
      
    
-   Support for reading and writing AMF content with RESTful Spring MVC @Controllers. This serves as a nice alternative to the direct RPC approach of the Remoting Service, reducing duplication of effort in applications that need to support multiple client types. (See the updated Test Drive for usage examples.)  
      
    
-   Upgraded minimum dependencies to Spring 3.0, BlazeDS 4.0, Spring Security 3.0, and Spring Integration 2.0  
      
    
-   A complete revision of the Maven-based Test Drive samples, including an update across the board to use Flex 4, and a new sample to demonstrate the RESTful programming model.

As always, I encourage anyone interested to get involved by trying out the release and giving us feedback in the [community forum](http://forum.springsource.org/forumdisplay.php?f=61) and [Jira](http://jira.springframework.org/browse/flex). We continually get great feedback from people having success with Spring BlazeDS Integration in their projects, and we look forward to hearing more about your experiences.

  
Jeremy Grelle  
Spring Flex Lead