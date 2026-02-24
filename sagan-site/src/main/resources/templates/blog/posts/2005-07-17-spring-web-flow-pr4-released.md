---
title: Spring Web Flow PR4 Released
source: https://spring.io/blog/2005/07/17/spring-web-flow-pr4-released
scraped: 2026-02-24T09:39:18.675Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Keith Donald |  July 17, 2005 | 0 Comments
---

# Spring Web Flow PR4 Released

_Releases | Keith Donald |  July 17, 2005 | 0 Comments_

Dear Spring Community,

I'm pleased to announce the release of Spring Web Flow Preview 4 (PR4). This release aligns Spring Web Flow for use with Spring 1.2.2+.

This will be the last Web Flow preview release; the next release will be 1.0 RC1. To download, access: [http://sourceforge.net/project/showfiles.php?group\_id=73357&package\_id=148517](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=148517 "http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=148517")

Note: there are some incompatible changes between PR3 and PR4. This includes a root package rename from **org.springframework.web.flow** to **org.springframework.webflow**, noting Web Flow's status as a standalone module deserving of a top-level package.  For a complete list of changes, access the change log here: [http://opensource.atlassian.com/confluence/spring/display/WEBFLOW/Change+Log](http://opensource.atlassian.com/confluence/spring/display/WEBFLOW/Change+Log "http://opensource.atlassian.com/confluence/spring/display/WEBFLOW/Change+Log")

Special note for WebFlow Portlet users: PR4 does not ship Portlet MVC integration.  Portlet MVC users will need to wait for Web Flow RC1 in a few weeks when Portlet MVC has been integrated for shipment with Spring 1.3. We apologize for any short-term inconvenience here: expect better Portlet MVC integration + the sample app to be back in the coming weeks.

Contained within this PR4 release are a number of new and noteworthy enhancements. Here are some of them:

**State entry actions**

Any instance of any State type may be configured with an entry action that will be executed when the state is entered.  This facilitates generic state setup logic. For example, a ViewState could set an entry action to execute arbitrary pre-render logic. Such pre-render logic might load reference data to populate form drop downs.  Any number of actions may be executed in order as part of a composite state entry action:

<view-state id="displayCriteria" view="searchCriteria">  
      <entry>  
            <action bean="searchFormAction" method="setupForm"/>  
            <action bean="searchFormAction" method="setupReferenceData"/>  
      </entry>  
  
      <transition on="search" to="executeSearch">  
            <action bean="searchFormAction" method="bindAndValidate"/>  
      </transition>  
</view-state>  

**TransitionableState exit actions**

Any instance of any TransitionableState type may be configured with an exit action that will be executed when the state is exited. This facilities generic state tear-down logic.  Multiple actions may again be specified and they will automatically be wrapped in a CompositeAction.

<action-state id="executeSearch">  
      <action bean="searchAction"/>  
      <transition on="success" to="displayResults"/>  
      <exit>  
            <action bean="auditAction" method="logResults"/>        
      </exit>  
</action-state>  

**Flow Execution Listener Criteria**

Before PR4 there was no easy way to define for a set of flow definitions which listeners should observe launched flow executions.  The new FlowExecutionListenerCriteria provides a pluggable strategy where the set of applicable listeners for executions for a given Flow definition is calculated on a per-request basis.

<bean id="flowExecutionManager"  
class="org.springframework.webflow.execution.servlet.ServletFlowExecutionManager">  
      <property name="listenerMap">  
            <map>  
                  <entry value="\*">  
                        <key>  
                              <list>  
                                    <bean class="example.Listener1"/>  
                                    <bean class="example.Listener2"/>  
                              </list>  
                        </key>  
                  </entry>  
  
                  <entry value="sampleFlowA">  
                        <key>  
                              <list>  
                                    <bean class="example.Listener3"/>  
                              </list>  
                        </key>  
                  </entry>  
            </map>  
      </property>  
      ...  
</bean>  

The above Spring configuration attaches Listener 1 and 2 to executions of all flows (\*), while Listener 3 is only attached to "sampleFlowA".

**Greatly enhanced expression language support**

One of the real strengths in this release is the continued progress with the new Spring data binding module.  Contained within spring-binding is an expression parsing and evaluation abstraction seamlessly integrated with a robust type conversion facility.  These two in combination allow for arbitrary strings representing one or more expressions like “Announcement: ${org} ${product} ${release} is out!” to be consumed and converted to evaluateable expressions utilizing any expression language, with OGNL being the default.  Spring Web Flow leverages this machinery in several places including redirect expressions, transition expressions, and attribute mapping expressions:

1.  For redirect expressions that evaluate against the request context, for example:
    
    redirect:/${sourceEvent.parameters.url}?attribute1=${flowScope.foo}&attribute  
    2=${requestScope.bar}"  
    
2.  For transition expressions that drive dynamic state transition decisions:
    
    <transition on="${result == 'success' && ${flowScope.selectedItinerary.price} > 500.0" to="requireCreditCheck"/>  
    
3.  For attribute mapping expressions that map attributes between two sources:
    
    <subflow-state id="browseDetails" flow="detailFlow">  
        <attribute-mapper>  
            <input value="${sourceEvent.parameters.id}" as="someBean.id" from="string" to="long"/>  
        </attribute-mapper>  
        ...  
    </subflow-state>  
    

**Enhanced attribute-mapper type-conversion support**

The ”from” and “to” attributes of input and output mapping elements can be used to specify type conversion rules.  So the definition:

<input value="${sourceEvent.parameters.id}" as="someBean.id" from="string" to="long"/>  

says:

Convert the value of ${sourceEvent.parameters.id} from a string to a long and set the long result at someBean.id.

**Session-based TransactionSynchronizer strategy**

A new TransactionSynchronizer that manages a transaction token in HTTP-session scoped storage is new for PR4.  It is ideal for working with flows that are leveraging continuations and need to prevent duplicate application transactions from occurring.

**New convenience action implementations**

The webflow.action package now sports several new action implementations including: CompositeAction, DelegatingAction, and GuardedAction.

**JMX-enabled flow execution statistics**

The sellitem sample now demonstrates the capability to collect global statistics on all Web Flows using the JMX management protocol, and monitor those statistics using any JMX client like the JDK 1.5 JConsole.  Future web flow releases will enhance this capability to allow for management and monitoring on a per flow execution basis.

**Simplified and improved Struts integration**

Struts 1.x integration has been greatly simplified with PR4 and aligned with Spring 1.2.2’s introduction of the SpringBindingActionForm.  There is no longer a need for a special FlowActionMapping as all webflow-specific configuration is now managed by Spring.  See the birthdate sample application for a concrete example.

**Other:**

**Improved javadoc, error messages, and logging**

**Much improved build system with “one-step” sample application build/deployment**

Erwin and I must thank Colin Sampaleanu for putting together one heck of a build system to manage the overall development and release process.  You will find when you download PR4 that building and deploying the sample applications, as well as any component of Spring Web Flow (such as the project itself or the binding module) to be simple and easy, with careful, automatic jar file management.  This “common-build” system is Ant 1.6.x based and leverages Ivy for jar dependency management**\--**

These are just some of the new features of this release.  For a full list of changes, see http://opensource.atlassian.com/confluence/spring/display/WEBFLOW/Change+Log

As always, we very much value your feedback.  Expect Web Flow 1.0 RC1 by the end of July with Portlet MVC and JSF integration.

Cheers,

Keith Donald  
Erwin Vervaet