---
title: Spring Web Flow 2.0 M4 Released
source: https://spring.io/blog/2008/03/11/spring-web-flow-2-0-m4-released
scraped: 2026-02-24T09:20:16.251Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Keith Donald |  March 11, 2008 | 0 Comments
---

# Spring Web Flow 2.0 M4 Released

_Releases | Keith Donald |  March 11, 2008 | 0 Comments_

Dear Spring Community,

We are pleased to announce that Spring Web Flow 2.0 M4 is now available.  [Download](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=148517&release_id=583063) | [Documentation](/documentation#webflow)

This release firms up the Web Flow 2 architectural model, including how SWF 2 integrates with Spring MVC, JavaServerFaces, and Ajax.  It also introduces many new features and improvements, including:

### 2.0 M4 New and Noteworthy

-   **The introduction of a simplified XML flow definition syntax.**   See the *Spring Travel* reference application for an example of the new syntax.

-   Use of the version 2 syntax reduces the size of a version 1 flow definition by up to 50%.  As an example, Spring Travel 1.0.5 consists of ~200 lines of flow-application code across six artifacts.  The latest 2.0 M4 version consists of 93 lines of code across two artifacts, a 50% reduction with four less files to maintain.   
    

-   Savings are achieved primarily by stronger Expression Language (EL) integration and simpler tags for action execution and data mapping.

-   **Spring Security integration**.  Full support for securing flows, states, and transitions is provided.  
    A new "currentUser" EL variable makes it easy to reference the authenticated Principal from a flow definition or view template.

-   **Flexible support for flow exception handling inside Spring MVC**, including default support for automatically restarting ended or expired flows.

-   **Support for handling Ajax events that do not change the current page.**  A new "render" element allows you to selectively re-render fragments of a page after handling an Ajax event.

-   **View variables.**  A view variable allocates when its containing view-state enters and goes out of scope when the state exits.  These variables provide a page context and are particularly useful for updating a model over a series of Ajax requests from the same page.

-   **@Autowired flow variables**.  Flow variables may now have their dependencies @Autowired by Spring, enabling them to hold references to Spring-managed @Services.   References to services are automatically re-wired for you between requests after variable deserialization.

-   **Support for popups**.  Mark a view-state with popup=true and it will render in a modal popup dialog when Javascript is enabled on the client.

-   **The factoring out of a Javascript abstraction layer called "Spring Javascript"** from Web Flow's JSF support.  Currently, Dojo and Ext based implementations of this layer are provided.  Spring.js provides:  
    

-   A common interface for Ajax, regardless of which toolkit is being used under the covers
-   An aspect-oriented-like API for decorating HTML DOM nodes with behaviors, including client-side validation behaviors.

-   **A small JSF component library** that uses Spring.js underneath to progressively enhance Spring web applications using JSF.  This library degrades if Javascript is not available on the client.  See the Spring Travel example for an illustration: turn Javascript off and compare the application to when Javascript is turned on.

-   **Support for rendering JSF views in a standard Spring MVC environment**.  This enables Facelets templates to be rendered by plain Spring MVC Controllers as well as Flows.

Please see the Spring Travel reference applications included in the release for practical demonstrations of all these features.  The reference projects are directly importable into Eclipse as Dynamic Web Projects.

### 1.x Compatibility

A special note to existing Web Flow users: The upcoming 2.0 RC1 will provide support for version 1 flows in a version 2 environment.  This will allow 1.0.x flows to run unchanged along side version 2 flows in the same application.  

For more information, see the full Web Flow 2 [ChangeLog](http://static.springframework.org/spring-webflow/docs/2.0.x/changelog.txt) and [RoadMap](http://jira.springframework.org/browse/SWF?report=com.atlassian.jira.plugin.system.project:roadmap-panel).  We also encourage you to visit our support forums and JIRA system to provide your feedback on M4 to the development team.  

Enjoy!  2.0 final is right around the corner.  

Keith Donald  
Web Flow Technical Lead  
SpringSource