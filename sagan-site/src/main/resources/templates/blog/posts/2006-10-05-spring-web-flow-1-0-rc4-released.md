---
title: Spring Web Flow 1.0 RC4 Released
source: https://spring.io/blog/2006/10/05/spring-web-flow-1-0-rc4-released
scraped: 2026-02-24T09:34:06.599Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Keith Donald |  October 05, 2006 | 0 Comments
---

# Spring Web Flow 1.0 RC4 Released

_Releases | Keith Donald |  October 05, 2006 | 0 Comments_

Dear Spring Community,

We are pleased to announce that [Spring Web Flow](/webflow) 1.0 RC4 has been released.

![](http://static.springframework.org/spring-webflow/images/spring-webflow.png)  

[Download](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=148517&release_id=452978) | [Documentation](http://static.springframework.org/spring-webflow/docs/1.0-rc4/reference/index.html) | [Changelog](http://static.springframework.org/spring-webflow/docs/1.0-rc4/changelog.txt) | [Upgrade Guide](http://static.springframework.org/spring-webflow/docs/1.0-rc4/upgrade-guide.pdf)  

> Spring Web Flow is a product of the Spring community focused on the orchestration of user interface flow within a web application.

This release contains many improvements and several exciting new features.  We consider it the most stable release to-date and, at last, the release that makes the Spring Web Flow 1.0 final roadmap feature complete.  Spring Web Flow 1.0 final will be released next week with minimal changes.  Between now and then we encourage you to test 1.0 RC4 to help catch any remaining issues before the big 1.0 launch.  

Note there are user-affecting changes in this release.  1.0 RC3 or earlier users should review the [upgrade guide](http://static.springframework.org/spring-webflow/docs/1.0-rc4/upgrade-guide.pdf) which outlines these changes in detail.

The new and noteworthy in 1.0 RC4 is an exciting list, including: 

**New and Noteworthy  
**

As the final release candidate before Spring Web Flow 1.0 final, Spring Web Flow 1.0 RC4 introduces powerful new features such as render actions (1), evaluate actions (2), set actions (3), flash scope (4), flow execution attributes (5), and always redirect on pause (6). It provides enhanced documentation, better flow definition validation, smart defaults, and a complete custom Spring 2.0 configuration schema (7) for configuring the flow execution engine.

-   **(1) Render actions execute application behavior before a response is rendered.**  A render action is invoked when a view-state is asked to make a renderable view selection, on entry or on a refresh triggered by a redirect or brower refresh button.  The following example shows a render-action that executes a search of the phonebook before the results view is rendered.

>     <view-state id="displayResults" view="searchResults">  
>         <render-actions>  
>             <bean-action bean="phonebook" method="search">  
>                 <method-arguments>  
>                     <argument expression="flowScope.searchCriteria"/>            
>                 </method-arguments>  
>                 <method-result name="results"/>  
>             </bean-action>  
>         </render-actions>  
>         <transition on="newSearch" to="enterCriteria"/>  
>         <transition on="select" to="browseDetails"/>  
>     </view-state>  

-   **(2) Evaluate actions evaluate expressions against flow execution state.**  The expression (OGNL-based by default) can be against any object reachable from the flow execution's root RequestContext, including objects in any scope such as flow scope.  The following example shows an evaluate-action that invokes the "makeGuess" method on the "game" flow-scoped bean:

>     <action-state id="makeGuess">  
>         <evaluate-action expression="flowScope.game.makeGuess(requestParameters.guess)">  
>             <evaluation-result name="guessResult"/>  
>         </evaluate-action>  
>         <transition on="CORRECT" to="showAnswer"/>  
>         <transition on="\*" to="enterGuess"/>  
>         <transition on-exception="java.lang.NumberFormatException" to="enterGuess"/>  
>     </action-state>  

-   **(3) Set actions set attribute values in scope types such as flow scope.**  The attribute may be a top-level attribute or a property at a nested property path.  The following example shows a set-action that sets the "fileUploaded" attribute to "true" in flash scope.

>     <action-state id="uploadFile">  
>         <action bean="uploadAction" method="uploadFile"/>  
>         <transition on="success" to="selectFile">  
>             <set attribute="fileUploaded" scope="flash" value="true"/>  
>         </transition>  
>     </action-state>  

-   **(4)** **Flash scope is a new scope type for persisting attributes across a redirect and any refreshes of the view.**  When an event is signaled to transition out of the view flash scope is cleared.  The following complete flow definition example shows use of flash scope to expose a "fileUploaded" attribute to the selectFile view-state for displaying a success message after a successful upload.

>     <flow xmlns="http://www.springframework.org/schema/webflow"  
>             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
>             xsi:schemaLocation="http://www.springframework.org/schema/webflow  
>                                            http://www.springframework.org/schema/webflow/spring-webflow-1.0.xsd">  
>      
>         <start-state idref="selectFile"/>  
>          
>         <view-state id="selectFile" view="fileForm">  
>             <transition on="submit" to="uploadFile"/>  
>         </view-state>  
>      
>         <action-state id="uploadFile">  
>             <action bean="uploadAction" method="uploadFile"/>  
>             <transition on="success" to="selectFile">  
>                 <set attribute="fileUploaded" scope="flash" value="true"/>  
>             </transition>  
>         </action-state>  
>          
>     </flow>  

-   **(5)** **Flow execution attributes allow you to set custom attributes that can influence flow execution behavior.**  The following example shows an instruction to set the "alwaysRedirectOnPause" attribute to false in a Portlet environment (where redirecting doesn't tend to apply).

>     <flow:executor id="flowExecutor" registry-ref="flowRegistry">  
>         <flow:execution-attributes>  
>             <flow:alwaysRedirectOnPause value="false"/>  
>         </flow:execution-attributes>  
>     </flow:executor>  

-   **(6) "Always redirect on pauses" gives you default POST+REDIRECT+GET behavior with no special coding.** Now by default, when a view state is entered a redirect is issued automatically.  This triggers a refresh to a flow execution URL that remains stable while the conversation is active.  
    

-   **(7) The new Spring 2.0 Configuration Dialect greatly simplifies system configuration and provides strong validation and tools support**.  Configuring webflow's infrastructure is now as simple as defining two elements, as shown in a complete manner below:  
    

>     <?xml version="1.0" encoding="UTF-8"?>  
>     <beans xmlns="http://www.springframework.org/schema/beans"  
>            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
>            xmlns:flow="http://www.springframework.org/schema/webflow-config"  
>            xsi:schemaLocation="  
>                http://www.springframework.org/schema/beans  
>                http://www.springframework.org/schema/beans/spring-beans-2.0.xsd  
>                http://www.springframework.org/schema/webflow-config  
>                http://www.springframework.org/schema/webflow-config/spring-webflow-config-1.0.xsd">  
>      
>         <!-- Launches new flow executions and resumes existing executions. -->     
>         <flow:executor id="flowExecutor" registry-ref="flowRegistry"/>  
>          
>         <!-- Creates the registry of flow definitions for this application -->  
>         <flow:registry id="flowRegistry">  
>             <flow:location path="/WEB-INF/flows/\*\*-flow.xml"/>  
>         </flow:registry>  
>          
>     </beans>  

See the reference manual for more information on these features.  Spring Web Flow 1.0 RC4 further refines the reference documentation, providing 70 pages on SWF usage.  The manual is available on-line in [HTML](http://static.springframework.org/spring-webflow/docs/1.0-rc4/reference/index.html) and [PDF](http://static.springframework.org/spring-webflow/docs/1.0-rc4/spring-webflow-reference.pdf) forms.  

**Getting Started**  

One of the best ways to get started with Spring Web Flow is to review and walkthrough the sample applications.  We recommend reviewing all samples, supplementing with reference manual material as needed from the start. Ten sample applications ship with the  release, each demonstratinga distinct set of product features.  These samples are:  

1.  Phonebook - the original sample demonstrating most features (including subflows)
2.  Sellitem - demonstrates a wizard with conditional transitions, flow execution redirects, custom text field formatting, and continuations
3.  Flowlauncher - demonstrates all the possible ways to launch and resume flows
4.  Itemlist - demonstrates REST-style URLs and inline flows
5.  Shippingrate - demonstrates Spring Web Flow together with Ajax technology
6.  NumberGuess - demonstrates stateful beans, evaluate actions, and "single key" flow execution redirects.
7.  Birthdate - demonstrates Struts integration
8.  Fileupload - demonstrates multipart file upload, set actions, and flash scope
9.  Phonebook-Portlet - the phonebook sample in a Portlet environment (notice how the flow definitions do not change)
10.  Sellitem-JSF - the sellitem sample in a JSF environment  
     

To build the sample applications for quick evaluation simply:

1.  Extract the spring-webflow-1.0-rc4.zip release archive
2.  Access the projects/spring-webflow/build-spring-webflow directory
3.  Execute the "ant dist" target.
4.  See the "target/artifacts" directory for deployable .war files for each sample as well as expanded war directories.

See the release readme.txt and projects/spring-webflow/spring-webflow-samples/readme.txt for more information on the release archive contents and samples, respectively.  

All sample projects are Spring IDE projects directly importable into Eclipse.  
  
Thanks to everyone out there who supported this release.  Spring Web Flow 1.0 is now... finally... just around the corner.  
  
Enjoy!  

The Spring Web Flow Team