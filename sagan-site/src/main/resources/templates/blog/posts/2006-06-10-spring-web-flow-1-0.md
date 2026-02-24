---
title: Spring Web Flow 1.0
source: https://spring.io/blog/2006/06/10/spring-web-flow-1-0
scraped: 2026-02-24T09:36:58.294Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Keith Donald |  June 10, 2006 | 0 Comments
---

# Spring Web Flow 1.0

_Releases | Keith Donald |  June 10, 2006 | 0 Comments_

![](http://static.springframework.org/spring-webflow/images/spring-webflow.png)

**Product Leads**

Keith Donald, [SpringSource](http://www.interface21.com/)

Erwin Vervaet, [Ervacon](http://ervacon.com/)  

 

[Download](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=148517&release_id=544006) | [Practical Introduction](http://www.ervacon.com/products/swf/intro/index.html) | [Samples](http://spring.ervacon.com/) | [Reference Manual](http://static.springframework.org/spring-webflow/docs/current/reference/index.html) | [Changelog](http://static.springframework.org/spring-webflow/docs/current/changelog.txt) | [1.0 Upgrade Guide](http://static.springframework.org/spring-webflow/docs/1.0.0/upgrade-guide.pdf)

[](http://static.springframework.org/spring-webflow/docs/1.0.0/upgrade-guide.pdf)

> Spring Web Flow is a next generation Java web application controller framework that allows developers to model user actions as high-level modules called flows that are runnable in any environment.  The framework delivers improved productivity and testability while providing a strong solution to enforcing navigation rules and managing application state.  

## The Big Picture

Spring Web Flow allows developers to build reusable, self-contained controller modules called flows. A flow defines a user dialog that responds to user events to drive the execution of application code to complete a business goal.  Consider this graphical view of a flow definition that carries out a search process with the user:

![Seach Flow](http://static.springframework.org/spring-webflow/docs/1.0.x/reference/images/flow-search.png "Seach Flow") 

Flows such as the one above are defined declaratively using a rich domain-specific language (DSL).  The XML (XSD) form of this language is the most popular with users.  Once defined, a flow is testable in isolation, may be embedded within other flows as a subflow, and may be deployed for execution across multiple environments including Java EE Servlet and Portlet (JSR 168) without change.

[See this simple search flow in action](http://spring.ervacon.com/swf-phonebook/phonebook.htm?_flowId=search-flow) and [review the complete flow definition](http://springframework.svn.sourceforge.net/viewvc/springframework/spring-webflow/tags/spring-webflow-1.0.5/spring-webflow-samples/phonebook/src/main/webapp/WEB-INF/flows/search-flow.xml?revision=8418&view=markup).

## Product Highlights

Spring Web Flow contains a number of innovative features that are popular with our users. These include the ability to:  

-   Define all controller logic for an application task, such as a search process, in one place, instead of scattering that logic across many places.
-   Compose flows together to create rich controller modules from simple parts.
-   Enforce strict user navigation rules with a natural, object-oriented linear programming model and without coding verbose if/else blocks.
-   Have memory you allocate during flow execution automatically clean itself up when execution ends or expires.
-   Deploy a flow for execution in a Servlet environment using your base web framework of choice.  Spring Web Flow ships convenient integration with leading web frameworks Struts, Spring MVC, and Java Server Faces.  
    
-   Change Web frameworks, going from Struts to Spring MVC for example, without changing your flow definitions.
-   Change environments all together, going from JUnit test to Portlet for example, without changing your flow definitions.
-   Evolve your application's navigation rules on-the-fly at development time without a container restart.  
    
-   Receive automatic browser button support (back, forward, refresh) with no custom coding.
-   Store task data in any of four managed scopes: request, flash, flow, and conversation; each with their own distinct semantics.  
    
-   Test flows in isolation without the container.  Ensure your application control logic works before you deploy.
-   Visualize and edit your flow navigation logic graphically with [Spring IDE 2.0](/node/429).  
    

## Getting Started

The best way to get started with Spring Web Flow is read [Erwin's practical introduction](http://www.ervacon.com/products/swf/intro/index.html) and to walk through the sample applications.  We recommend reviewing all samples, supplementing with [reference manual](http://static.springframework.org/spring-webflow/docs/1.0.x/reference/index.html) material as needed from the start. Ten sample applications ship with the release, each demonstrating a distinct set of features.  The samples are:

1.  [Phonebook](http://spring.ervacon.com/swf-phonebook/) - the original sample demonstrating most features (including subflows)
2.  [Sellitem](http://spring.ervacon.com/swf-sellitem/) - demonstrates a wizard with conditional transitions, flow execution redirects, custom text field formatting, and continuations
3.  [Flowlauncher](http://spring.ervacon.com/swf-flowlauncher/) - demonstrates all the possible ways to launch and resume flows
4.  [Itemlist](http://spring.ervacon.com/swf-itemlist/) - demonstrates REST-style URLs and inline flows
5.  [Shippingrate](http://spring.ervacon.com/swf-shippingrate/) \- demonstrates Spring Web Flow together with Ajax technology
6.  [NumberGuess](http://spring.ervacon.com/swf-numberguess) - demonstrates stateful beans, evaluate actions, and "single key" flow execution redirects.
7.  [Birthdate](http://spring.ervacon.com/swf-birthdate/) - demonstrates Struts integration
8.  [Fileupload](http://spring.ervacon.com/swf-fileupload) - demonstrates multipart file upload, set actions, and flash scope
9.  Phonebook-Portlet - the phonebook sample in a Portlet environment (notice how the flow definitions do not change)
10.  [Sellitem-JSF](http://spring.ervacon.com/swf-sellitem-jsf) - the sellitem sample in a JSF environment
11.  [Booking-Faces](http://richweb.springframework.org/swf-booking-faces) - a more comprehensive Spring Web Flow + JSF application.  
     

All sample projects are Spring IDE projects directly importable into Eclipse as "Dynamic Web Projects" that can also be deployed inside the Eclipse IDE with Eclipse Web Tools.

For in-depth and thorough coverage of the entire Spring Web Flow feature set, your best bet is to read [Working with Spring Web Flow](http://www.ervacon.com/products/swfbook/index.html).

## Current Release Notes

-   Spring Web Flow 1.0.x is proven software fit for production use.

-   Spring Web Flow runs on Java SE 1.3 or greater, and Java EE 1.3 (Servlet 2.3, Portlet 1.0) or greater.  Spring Web Flow runs on all major application server platforms.  
    

-   Spring 1.2.7 or greater is required for the Spring 1.x series, Spring 2.0 or > is required for the Spring 2.x series.

-   Struts Classic (1.2.9), Spring MVC, and JSF integration is shipped out-of-the-box.

-   The 1.0 release signifies that public API and XSD backwards compatability will be preserved throughout the 1.x series.

## Upcoming Release Notes  

-   Spring Web Flow 2.0 is the next major release of the framework, focusing on enhanced integration and ease-of-use.  
    

-   Spring Web Flow 2.0 final is due out in April of 2008.  
    

## Community  

-   Join our [forums](http://forum.springframework.org) for lively discussions about Spring Web Flow usage and architecture.  This is the best way to get involved in the Web Flow community.

-   Submit bug reports, enhancement requests, and patches using our [JIRA issue tracking system](http://opensource.atlassian.com/projects/spring/browse/SWF).

-   Access our [SVN source code repository](https://springframework.svn.sourceforge.net/svnroot/springframework/spring-webflow/) to follow along with Spring Web Flow development.

-   Try out the latest features by downloading a [nightly build](http://static.springframework.org/downloads/nightly/snapshot-download.php?project=SWF).  
    

## Essential Resources

-   Explore the Web Flow team's journey by reviewing previous release announcements.

-   [1.0.4](/node/484)  
    
-   [1.0.3](/node/451)  
    
-   [1.0.2  
    ](/node/444)
-   [1.0.1](/node/400)
-   [1.0](/go-webflow)
-   [1.0 RC4](/webflow-1.0-rc4)
-   [1.0 RC3](/node/301)
-   [1.0 RC2](/node/293)
-   [1.0 RC1](/node/267)
-   [1.0 EA](/node/239)
-   [PR5](/node/147)

-   If you're looking for in-depth and thorough coverage of the entire Spring Web Flow feature set, your best bet is to read [Working with Spring Web Flow](http://www.ervacon.com/products/swfbook/index.html).  
    
-   Read Spring Web Flow Tips and Tricks at the [Ervacon Spring Web Flow Portal](http://www.ervacon.com/products/swf/index.html).
    

-   Read [What Spring Web Flow Offers JSF Developers](http://blog.interface21.com/main/2007/04/21/what-spring-web-flow-offers-jsf-developers/) at the [Interface21 Team Blog](http://blog.interface21.com/).

-   Buy professional product support from [SpringSource](http://www.springsource.com/) or [Ervacon](http://www.ervacon.com/).