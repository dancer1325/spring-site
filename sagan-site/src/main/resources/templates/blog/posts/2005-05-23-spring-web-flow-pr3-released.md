---
title: Spring Web Flow PR3 Released
source: https://spring.io/blog/2005/05/23/spring-web-flow-pr3-released
scraped: 2026-02-24T09:39:36.229Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Colin Sampaleanu |  May 23, 2005 | 0 Comments
---

# Spring Web Flow PR3 Released

_Releases | Colin Sampaleanu |  May 23, 2005 | 0 Comments_

Spring Web Flow PR3 has been released. Here's Keith's mailing list announcement: 

\--- 

Dear Spring Community,

I’m pleased to announce the release of Spring Web Flow Preview 3.  This is a major new release with a substantial number of new features: both in terms of power and convenience.  This release is considered stable for development use.

To download, access: [http://sourceforge.net/project/showfiles.php?group\_id=73357&package\_id=148517](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=148517)  

Note: there are a few incompatible changes between PR2 and PR3.  For a listing and a porting guide, access the change log here: [http://opensource.atlassian.com/confluence/spring/display/WEBFLOW/Change+Log](http://opensource.atlassian.com/confluence/spring/display/WEBFLOW/Change+Log)  

Contained within this release are a number of new and noteworthy enhancements.  Here are some of them:  

**View State Enhancements**

-   Each view state may now be configured with one or more setup actions.  This action is executed after the state is entered but before control is returned to the client for response rendering.  This reduces (and in many cases eliminates) the need for setup action states, making for more concise flow definitions.
-   Each view state may now select the view to render and all supporting model data in a fully dynamic, pluggable fashion using the new ViewDescriptorCreator strategy.
-   Powerful redirect expressions are now supported, with full-support for resolving redirect parameters in a dynamic fashion from the flow RequestContext.

**Here is an example of these new features in action:**

**Setup actions:**

 <view-state id="displayCriteria" view="criteriaView">  
            <setup bean="searchFormAction" method="setupForm"/>  
            <transition on="submit" to="executeQuery">  
                  <action bean="searchFormAction" method="bindAndValidate"/>  
            </transition>  
</view-state>

**Redirect expressions:**

<end-state id="end" view="redirect:/myFlow.htm?input=${flowScope.input}"/>

**Subflow Attribute Mapping Enhancements**

-   Subflow input and output mapping policies are now fully configurable via a XML flow definition.
-   Expressions may also be specified that resolve subflow input attribute values in a dynamic fashion.

**For example:**

<attribute-mapper>  
            <input value="${sourceEvent.parameters.id}" as="id" type="long"/>  
</attribute-mapper>

The expression language used is also pluggable – by default web flow will try OGNL, if it’s not found on the classpath it’ll use Spring’s BeanWrapper.

**Annotated Definition Objects**

-   In addition to action execution parameters, each core definition object in the system--Flow, State, and Transition---can now be annotated with arbitrary property metadata.  Such properties are specifiable in the webflow xml definition using the “property” element, with full support for from-string type conversion with convenient type aliasing.

**For example:**

<transition on="submit" to="executeQuery">  
            <property name="submitPressed" value="true" type="boolean"/>  
</transition>

In this case this ‘submitPressed’ boolean property would be made available to this transition’s target state after entering for reasoning.

**Enhanced Flow Execution Listener Callbacks**

-   Listeners responding to the lifecycle of an executing flow now have more hooks to insert custom logic—notification now happens when a flow is starting, started, paused, resumed, entering a new state, entered a new state, or ended---with veto capability for proposed flow state changes (to facilitate state precondition checks, for example).

**\---**

These are just some of the new features of this release.  For a full list of changes, see [http://opensource.atlassian.com/confluence/spring/display/WEBFLOW/Change+Log](http://opensource.atlassian.com/confluence/spring/display/WEBFLOW/Change+Log)

As always, we very much value your feedback.  One or two more PR releases to go and we’ll be at 1.0 final!

Cheers,

Keith Donald  
Erwin Vervaet