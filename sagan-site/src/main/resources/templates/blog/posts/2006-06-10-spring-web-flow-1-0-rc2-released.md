---
title: Spring Web Flow 1.0 RC2 Released
source: https://spring.io/blog/2006/06/10/spring-web-flow-1-0-rc2-released
scraped: 2026-02-24T09:36:53.187Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Keith Donald |  June 10, 2006 | 0 Comments
---

# Spring Web Flow 1.0 RC2 Released

_Releases | Keith Donald |  June 10, 2006 | 0 Comments_

![](http://opensource.atlassian.com/confluence/spring/download/attachments/1090/spring-webflow.jpg)   

Dear Spring Community,  
  
We are pleased to announce that [Spring Web Flow](/webflow) (SWF) 1.0 RC2 (Release Candidate 2) has been released.  [Download](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=148517&release_id=423416) | [Documentation](http://static.springframework.org/spring-webflow/docs/1.0-rc2/reference) | [Changelog](http://static.springframework.org/spring-webflow/docs/1.0-rc2/changelog.txt)[](http://static.springframework.org/spring/docs/2.0.x/changelog.txt)

This release contains bug fixes and minor improvements.   The new and noteworthy of 1.0 RC2 include...  

**NEW AND NOTEWORTHY  
**

**Support for passing newly launched flow executions input from their calling environment in a configurable manner.**  By default all request parameters are exposed as input.  The flow may then choose to map this input into its own local scope using its input mapper.  This mapper defines the input contract for the flow which is consistent regardless of whether the flow is started as a top-level flow  or as a subflow.  

Consider the following request URL as an example:  

> http://localhost:8080/flights/search-flow?flightNumber=12345

By default, when this URL is accessed the backing FlowExecutor will place the "flightNumber" request parameter into an "input map".  The input map is then passed to a new execution of the "search-flow".  
  
Within the search-flow definition:  

> <flow start-state="executeSearch">  
>     <input-mapper>  
>         <mapping source="flightNumber" target="flowScope.flightNumber"/>  
>     </input-mapper>  
>   
>     ...  
> </flow>

The <input-mapper> above defines the flow's input contract, stating this flow supports a "flightNumber" input attribute.  When a flightNumber is provided at startup it will be mapped into "flowScope" under the name "flightNumber".  The mapper is also capable of performing a type conversion during the mapping operation.

To customize flow execution input map population, for example, to pull attributes from the request path or some other external source, configure the "FlowExecutorImpl.inputMapper" property.  

**Support for flow execution and external redirects within a JSR168 Portlet environment.**  Combined with a continuation-based repository this allows use of browser navigational buttons (back, refresh) within a Portlet environment.  Also in a Portlet environment we now expose a "globalSessionMap" property for accessing attributes in Portlet Session APPLICATION\_SCOPE.  
  
**A new repository factory named "SingleKeyFlowExecutionRepositoryFactory".** This implementation generates a single unique identifier for each persistent flow execution.  It is useful for achieving 1.0 EA "conversation redirect" semantics--the case where after every POST a REDIRECT-GET hits a stable "flow execution URL" which embeds the constant flow execution key.  See the NumberGuess sample for an illustration.  
  
**Introduction of a standalone "conversation" subsystem**, which the provided flow execution repository implementations delegate to for demarcating logical conversations that manage flow execution state.  *This conversation subsystem is fully decoupled from the rest of Spring Web  
Flow, is usable outside of SWF, and may evolve into its own independent module over time.*  The central service interface consists of:

> public interface ConversationService {  
>     public Conversation beginConversation(ConversationParameters parameters);  
>     public Conversation getConversation(ConversationId id);  
>     public ConversationId parseConversationId(String encodedId);  
> }  
>   
>   
> public interface Conversation {  
>     public ConversationId getId();  
>     public void lock();  
>     public void end();  
>     public Object getAttribute(String name);  
>     public void setAttribute(String name, Object value);  
>     public void removeAttribute(String name);  
>     public void unlock();  
> }

When a new flow execution is launched and needs to be persisted beyond one request the repository calls "beginConversation" to start a new logical  
conversation and places attributes in conversation scope to track execution state.  Likewise, when a flow execution ends the governing conversation also ends and any allocated state is cleaned up.

In the future we expect to offer robust features within this system, including conversation monitoring and management via JMX as well as conversation history and statistics.  We also expect to prove its applicability to other environments outside of Spring Web Flow.  Special thanks to Juergen Hoeller and Ben Hale for their help in the design of this portable conversation service abstraction.  

  
**POTENTIAL USER AFFECTING CHANGES**  
  
With 1.0 RC2 there are a few potential user-affecting changes on the road to 1.0 final.  The following section notes them:  
  
In spring-webflow-dtd, **we renamed 'resultName' and 'resultScope' <action/> element attributes to 'result-name' and 'result-scope'**, respectively, for consistency with other attribute and element names.  
  
**The FormAction properties "bindOnSetupForm" and "validateOnBinding" were removed for simplicity**.  Experience has shown these properties are rarely used  and have been a source of confusion for new users.  As a better alternative, to execute a data binding operation before entering a view state simply invoke the "bind" action method from your flow definition.  To calculate if validation should occur for a bindAndValidate attempt, override the single "validationEnabled(RequestContext)" hook.  
  
**The FormAction "exposeFormObject" action method was removed.**  Simply use "setupForm" which is preferred.  
  
**The FlowExecutionRepository and FlowExecutor SPI interfaces were simplified.**  More logic is now encapsulated behind a FlowExecutionRepository including the structure and format of generated FlowExecutionKeys.  In addition, the FlowExecutionRepository is now strictly responsible for managing persistent flow executions and nothing else.  The additional concept of a "conversation" is no longer known to the SWF core.  This means several things:  

-   The overall repository interface is simpler, making it easier to create custom FlowExecutionRepositories with custom FlowExecutionKeys.
-   The SWF core lexicon is stronger: flow executors invoke flow executions to execute flows.  Executions that remain active beyond one request are persisted to a repository.
-   The default repository implementations choose to delegate to a distinct "conversation subsystem" for tracking conversational state driven by the execution system, but the dependency on this system is fully encapsulated and is optional.  
    

The FlowExecutor interface, the entry point into SWF, was also simplified for callers.  It now encapsulates knowledge of complex internal types such  
as EventIds and FlowExecutionKeys and thus is overall easier to use.  
  
Along the same lines, **support for the explicit "conversationRedirect" was removed**.  This represents removal of the "conversationRedirect:"  
'view' prefix and the "CONVERSATION" RedirectType.  To achieve the same logical redirect semantics with 1.0 RC2 simply configure a FlowExecutor with redirectOnPause type FLOW\_EXECUTION and a repositoryFactory of  
SingleKeyFlowExecutionRepositoryFactory.  
\--  
  
Spring Web Flow 1.0 RC2 further refines the reference manual, providing 50 pages on SWF usage.  The manual is available on-line in HTML and PDF forms.  
  
One of the best ways to get started with Spring Web Flow is to review and walkthrough the sample applications.  We recommend reviewing all samples, supplementing with reference manual material as needed from the start. Ten sample applications ship with the 1.0 RC2 release, each demonstratinga distinct set of product features.  These samples are:  
  
1\. Phonebook - the original sample demonstrating most features (including subflows)  
2\. Sellitem - demonstrates a wizard with conditional transitions, flow execution redirects, conversational scope, and continuations  
3\. Flowlauncher - demonstrates all the possible ways to launch and resume flows  
4\. Itemlist - demonstrates REST-style URLs and inline flows  
5\. Shippingrate - demonstrates Spring Web Flow together with Ajax  
technology (thanks to Steven Devijver)  
6\. NumberGuess - demonstrates stateful beans and "single key" flow  
execution redirects.  
7\. Birthdate - demonstrates Struts integration  
8\. Fileupload - demonstrates multipart file upload  
9\. Phonebook-Portlet - the phonebook sample in a Portlet environment  
(notice how the flow definitions do not change)  
10\. Sellitem-JSF - the sellitem sample in a JSF environment  
  
To build the sample applications for deployment in one step simply extract the release archive, access the projects/spring-webflow/build-spring-webflow directory and execute the "ant dist" target.  See the release readme.txt and  
projects/spring-webflow/spring-webflow-samples/readme.txt for more information on the release archive contents and samples, respectively.  
All sample projects are Spring IDE projects directly importable into Eclipse.  
  
Thanks to everyone out there who supported this release.  At this time we expect the next release of SWF to be 1.0 final targeting the late June  
timeframe.  There is still the possibility we will have another 1.0 release candidate if warranted.  Be sure to monitor the SWF homepage and  
forums for updates.  
  
Enjoy!  
  
The Spring Web Flow Team