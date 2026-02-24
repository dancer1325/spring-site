---
title: Spring Web Flow 1.0 RC1 Released
source: https://spring.io/blog/2006/05/03/spring-web-flow-1-0-rc1-released
scraped: 2026-02-24T09:37:30.537Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Keith Donald |  May 03, 2006 | 0 Comments
---

# Spring Web Flow 1.0 RC1 Released

_Releases | Keith Donald |  May 03, 2006 | 0 Comments_

[![Spring Web Flow Logo](http://opensource.atlassian.com/confluence/spring/download/attachments/1090/spring-webflow.jpg "Spring Web Flow Logo")](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=148517&release_id=414454)

Dear Spring Community,  
  
We are very pleased to announce that Spring Web Flow (SWF) 1.0 RC1 (Release Candidate 1) has been released.  [Download it](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=148517&release_id=414454).  
  
After over a year of hard development work, 29,000 downloads, 3,700 posts by 500 [forum users](http://forum.springframework.org/forumdisplay.php?f=36), [one book](/node/235), and [numerous](/node/235) [community](http://www.devx.com/webdev/Article/28041)\-[driven](http://java.sys-con.com/read/131756_1.htm) [articles](http://www.javalobby.org/articles/spring-webflow/), this release delivers the first 1.0 release candidate of Spring Web Flow.  Considered fit for production use, this release solidifies the 1.0 API which will remain backward compatible throughout the entire 1.x series.

To the Spring Web Flow early adopters and champions who have supported our product, thank you.  Spring Web Flow delivers one of the most innovative and powerful controller engines available today thanks to your feedback and support.  

The Spring Web Flow team expects one more release candidate before 1.0 final.  ***The new and noteworthy in 1.0 RC1 include...***  
  
**NEW AND NOTEWORTHY**  

**Improved support for managing stateful business components.**  Spring Web Flow now employs several techniques for managing instances of stateful middle-tier components that execute business logic as part of a task execution.  In most cases, state management is *completely transparent*.  You simply store your application state in instance variables and Spring Web Flow handles scoping that state within a conversation in a thread safe manner.

This support is illustrated by the simple **NumberGuess** sample application, where a "Game" component managed by the flow carries out the execution of game business logic.  The component itself has zero dependencies on Spring Web Flow APIs.

 To demonstrate, the business interface of the Game component could be defined as:

![Game interface](http://static.springframework.org/spring-webflow/announce/1.0-rc1/game-interface.jpg "Game interface")

The flow definition to carry out execution of a Game with a user could look like: 

 ******![Game flow](http://static.springframework.org/spring-webflow/announce/1.0-rc1/game-flow.jpg "Game flow")******

Lastly, the binding between the logical **game** action identifier and a Game implementation is made by Spring within **game-beans.xml**.  

 ![Game beans](http://static.springframework.org/spring-webflow/announce/1.0-rc1/game-beans.jpg "Game beans")

The HigherLowerGame implementation is also completely decoupled from Spring and Spring Web Flow APIs.   

**Enhanced support for flow variables, created automatically when a flow starts.**  Flow variable values may even be sourced from a backing bean factory, benefiting from full dependeny injection there.  The exact scope of the variable is configurable.  

**A new flow execution redirect response type, for redirecting to a unique "flow execution URL".**  Accessing a flow execution URL refreshes a  Flow at a previously entered ViewState, allowing continuation from there.  The URL remains valid while the conversation is active and the continuation point remains valid.  This allows for full use of back, next, refresh, and new window buttons without page caching.  

**Refinements in state exception handling, with convenient support for transition-executing state exception handlers.**  The core transition element now supports a on-exception attribute that drives a transition to a new state on the occurrence of an exception.  For example:

![Transition executing state exception handling](http://static.springframework.org/spring-webflow/announce/1.0-rc1/placeOrder-exception-handler.jpg "Transition executing state exception handling") 

... transitions the flow to the editAccount state if an AccountException is thrown by the placeOrder method.

**Improvements in flow attribute mapping support.**  Each flow may now be configured with an input-mapper to map input provided by callers that start the flow.  A flow may also be configured with an output-mapper to expose return values to callers who terminate the flow.  These enhancements allow a flow to be reused as a top-level flow and a subflow without change, as input and output attributes are mapped consistently for both cases.  

**Support for dynamic view name and target state expressions**, allowing for convenient runtime-based calculation of ViewState's logical view name, and a transition's target state, respectively.

**Enhanced JSF integration.**  The JSF integration now supports the logical redirect response types including FlowExecutionRedirect, ConversationRedirect, FlowRedirect, and ExternalRedirect.  In addition, enhancements to the FlowPhaseListener allow for a flow execution to be launched and refreshed without having to go through a formal navigation step.  1.0 RC2 is expected to add further JSF convenience and official support with JSF in a Portlet environment.

**ADDITIONAL RESOURCES and WHERE TO START**  

Spring Web Flow 1.0 RC1 further refines the reference manual, providing 50 focused pages on SWF usage.  The manual is available on-line in [HTML](http://static.springframework.org/spring-webflow/docs/1.0-rc1/reference/index.html) and [PDF](http://static.springframework.org/spring-webflow/docs/1.0-rc1/spring-webflow-reference.pdf) forms.  
  
One of the best ways to get started with Spring Web Flow is to review and walkthrough the sample applications.  We recommend reviewing all samples, supplementing with reference manual material as needed from the start.  Nine (9) sample applications ship with the 1.0 RC1 release, each demonstrating a distinct set of product features.  These samples are:  
  
1\. **Phonebook** - the original sample demonstrating most features (including subflows).  
2\. **Sellitem** - demonstrates a wizard with conditional transitions, flow execution redirects, conversational scope, and continuations.  
3\. **Flowlauncher** - demonstrates all the possible ways to launch and resume flows.  
4. **Itemlist** \- demonstrates REST-style URLs, conversational redirects to a refreshable conversation URL, and inline flows.  
5\. **Shippingrate** - demonstrates Spring Web Flow together with Ajax technology (thanks to Steven Devijver)  
5\. **NumberGuess** - demonstrates stateful beans  
6\. **Birthdate** - demonstrates Struts integration.  
7\. **Fileupload** \- demonstrates multipart file upload.  
8\. **Phonebook-Portlet** - the phonebook sample in a Portlet environment (notice how the flow definitions do not change)  
9\. **Sellitem-JSF** - the sellitem sample in a JSF environment (notice how the flow definition does not change)  
  
To build the sample applications for deployment in one step simply extract the release archive, access the **projects/build-spring-webflow** directory and execute the ant dist target.  See the release readme.txt and projects/spring-webflow-samples/readme.txt for more information on the release archive contents and samples, respectively.  **All sample projects are now [Spring IDE](http://www.springide.org) projects, directly importable into Eclipse.**  Watch for the Spring IDE Graphical Web Flow editor coming soon from the Spring IDE team.  
  
Thanks to everyone out there who has made Spring Web Flow what it is today—those using it, providing the feedback that makes it stronger.  Enjoy!  
  
Sincerely,  
  
The Spring Web Flow Team  
  
Keith Donald  
Erwin Vervaet  
Colin Sampaleanu  
Juergen Hoeller  
Rob Harrop