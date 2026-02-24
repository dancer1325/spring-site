---
title: Spring Web Flow 1.0 RC3 Released
source: https://spring.io/blog/2006/06/26/spring-web-flow-1-0-rc3-released
scraped: 2026-02-24T09:36:39.526Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Keith Donald |  June 26, 2006 | 0 Comments
---

# Spring Web Flow 1.0 RC3 Released

_Releases | Keith Donald |  June 26, 2006 | 0 Comments_

![](http://opensource.atlassian.com/confluence/spring/download/attachments/1090/spring-webflow.jpg)   

Dear Spring Community,  
  
We are pleased to announce that [Spring Web Flow](/webflow) (SWF) 1.0 RC3 (Release Candidate 3) has been released.  [Download](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=148517) | [Documentation](http://static.springframework.org/spring-webflow/docs/1.0-rc3/reference) | [Changelog](http://static.springframework.org/spring-webflow/docs/1.0-rc3/changelog.txt)

This stable release contains bug fixes and minor improvements.   At this time we expect this to be the last release candidate before Spring Web Flow 1.0 final, which is just around the corner.  The noteworthy include...  

**NOTEWORTHY IMPROVEMENTS  
**

**Improved flow exception hierarchy.**  Overall the exception hierarchy now more clearly organizes the categories of failure from flow definition access (FlowLocatorException) to runtime flow execution (FlowExecutionException) and execution persistence (FlowExecutionRepositoryException).  

> ![](http://static.springframework.org/spring-webflow/announce/1.0-rc3/swf-exception-hierarchy.png) 

**Improved support for BACK button use within a Portlet environment.**  Combined with a continuation-based repository SWF supports full use of browser navigational buttons (back, refresh) within a Portlet environment while the flow remains active.  When a flow execution terminates a browser refresh will trigger a new execution to be launched automatically.  
  
**Simpler default JSF view mapping.**  Now by default SWF view names are expected to correspond to JSF view ids exactly. You'll see this default in play within the sellitem-jsf sample--note how views are referenced like "/priceAndItemCountForm.jsp" like a standard JSF navigation handler.  This allows natural support for other JSF view technologies such as Facelets and is a more natural default for JSF developers.  If you require a custom mapping SWF to JSF view mapping, plug a custom ViewIdMapper into your FlowPhaseListener.

**Sample application simplifications**.  We've simplified the fileupload, flowlauncher, birthdate, and sellitem samples to take advantage of the latest features and best practices of Spring Web Flow.  
  
**POTENTIAL USER AFFECTING CHANGES**  
  
With 1.0 RC3 there are a few potential user-affecting changes on the road to 1.0 final.  The following section notes them:  
  
**The FormAction property "validateUsingValidatorMethod" was removed for simplicity**.  Experience has shown this property to be a source of confusion for new users.  As a better alternative, to execute a data binding operation without validation simply invoke the "bind" action method from your flow definition.  When you require piecemeal Validator validation, simply invoke "bindAndValidate" or "validate" with the "validatorMethod" attribute set to the specific validator method.  See sellitem for an example.  

**StateExceptionHandler was renamed "FlowExecutionExceptionHandler".** This affects custom handler implementations.  To upgrade, simply implement the new interface; the signature is logically the same.  
  
**FlowExecutorImpl's "redirectOnPause" attribute now accepts a boolean value instead of a RedirectType enum.**  There is only one redirect type in SWF as of 1.0 RC2--the flow execution redirect.  Setting this flag to 'true' triggers it each time a flow execution pauses by entering a view state.  See Numberguess or sellitem for an example.  
\--------  

One of the best ways to get started with Spring Web Flow is to review and walkthrough the sample applications.  We recommend reviewing all samples, supplementing with reference manual material as needed from the start. Ten sample applications ship with the 1.0 RC3 release, each demonstrating a distinct set of product features.  These samples are:  

1\. Phonebook - the original sample demonstrating most features (including subflows)  
2\. Sellitem - demonstrates a wizard with conditional transitions, flow execution redirects, conversational scope, and continuations  
3\. Flowlauncher - demonstrates all the possible ways to launch and resume flows  
4\. Itemlist - demonstrates REST-style URLs and inline flows  
5\. Shippingrate - demonstrates Spring Web Flow together with Ajax technology (thanks to Steven Devijver)  
6\. NumberGuess - demonstrates stateful beans and "single key" flow execution redirects.  
7\. Birthdate - demonstrates Struts integration  
8\. Fileupload - demonstrates multipart file upload  
9\. Phonebook-Portlet - the phonebook sample in a Portlet environment  
(notice how the flow definitions do not change)  
10\. Sellitem-JSF - the sellitem sample in a JSF environment

Enjoy!

The Spring Web Flow Team

Keith Donald  
Erwin Vervaet  
Juergen Hoeller  
Colin Sampaleanu  
Rob Harrop