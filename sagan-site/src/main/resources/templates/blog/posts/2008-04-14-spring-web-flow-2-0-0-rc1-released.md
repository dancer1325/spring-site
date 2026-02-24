---
title: Spring Web Flow 2.0.0.RC1 Released
source: https://spring.io/blog/2008/04/14/spring-web-flow-2-0-0-rc1-released
scraped: 2026-02-24T09:18:46.212Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Keith Donald |  April 14, 2008 | 0 Comments
---

# Spring Web Flow 2.0.0.RC1 Released

_Releases | Keith Donald |  April 14, 2008 | 0 Comments_

Dear Spring Community,

We are pleased to announce that Spring Web Flow 2.0.0.RC1 is now available. [Download](/download#webflow) | [Documentation](/documentation#webflow)  
  
2.0.0.RC1 introduces several new features, and fixes all known issues reported against previous milestones.

We recommend [upgrading](http://forum.springframework.org/showthread.php?t=52569) to 2.0.0.RC1 from previous Web Flow 2 milestones. We also recommend Web Flow 1 users begin evaluating their upgrade to Web Flow 2 at this time, as RC1 introduces comprehensive version 2 documentation, as well as a tool for automating the conversion of version 1 flows to the version 2 syntax.  
  
The best way to get started with Web Flow 2 is to evaluate the [reference applications](/webflow-samples) included in the distribution and supplement with the [reference guide](http://static.springframework.org/spring-webflow/docs/2.0.x/reference/html/index.html).  Spring Web Flow 2 requires Spring Framework 2.5.3 and Java 1.4 or above.   
  
Find the new and noteworthy in the 2.0.0 RC1 release below:  

### 2.0.0.RC1 New and Noteworthy

-   **Introduced the Web Flow 2 reference guide**, available in PDF and HTML format. The new guide is written in "quick reference" style with runnable code examples. Read it [on-line](http://static.springframework.org/spring-webflow/docs/2.0.x/reference/html/index.html), or download the printable [PDF](http://static.springframework.org/spring-webflow/docs/2.0.x/reference/pdf/spring-webflow-reference.pdf).

-   **Added support for upgrading from Web Flow 1 to 2**. Included in this distribution is a *WebFlowUpgrader* tool capable of converting flows from the version 1 syntax to the version 2 syntax. See the reference guide for instructions on how to use this tool

-   **Added support for flow definition inheritance**. With this feature, A flow may extend one or more flows. A flow state can also extend another state. This feature is used to facilitate reuse between flows and states that share a common structure.

-   **Introduced Spring Portlet MVC support**. See the Portlet section of the reference guide and the booking-mvc-portlet and booking-faces-portlet sample applications for examples.

-   **Formally introduced the new "Spring Javascript" module**, included within spring-js-2.0.0.RC1.jar. This module provides a Javascript abstraction framework for applying client-side behaviors such as form validation and Ajax in a consistent manner. It also bundles a ResourceServlet for serving Javascript and CSS from jars (a CSS framework is included as well). The default UI toolkit this framework builds upon is Dojo 1. Spring's JSF integration module called "Spring Faces" builds on spring-js to provide a lightweight JSF component library for form validation and Ajax.

-   **Added Spring Faces integration with the RichFaces JSF component library**. Rich Faces can be used with the Spring Faces component library or used standalone. A sample application illustrating this integration is available in our [JIRA system](: http://jira.springframework.org/browse/SWF-462).

-   **Added a "jsf-booking" reference application that offers a comparsion between a traditional JSF web application and a Spring web application that uses JSF** as the UI component model. Compare jsf-booking with booking-faces to see the differences in the architectural approach and implementation. This comparison is particularly relevant to JSF developers interested in learning more about Spring.

-   **Introduced support for automatic model binding and validation with Spring MVC**. This support provides a concise alternative to manual FormAction setupForm and bindAndValidate calls. This support also allows registration of data input Formatters application wide, reducing the need to manually register PropertyEditors on a view-by-view basis in many cases. Support for suppressing data binding for a event such as a cancel button click is provided. Support for invoking validators by convention is provided. See the booking-mvc sample for an example.

-   **Introduced view scope**. View scope is allocated when a view-state enters and destroyed when a view-state exits. The scope is useful for updating a model specific to one view over a series of Ajax requests. It is also the scope used to manage JSF component state.

-   **Added support for flow message bundles**. Create a messages.properties file in your flow's working directory for the Locales you need to support and off you go.

-   **Introduced configurable view-state history polices**. A view state can preserve its history to support backtracking, discard its history to prevent backtracking, and invalidate all previous history to disallow backtracking after a point of no return. See the new 'history' attribute on the view-state element.

-   **Refined the flow execution snapshotting process**. These refinements capture view-state form values on postback to support restoring those values when backtracking. This preserves edits when going back using the browser back button for data stored in flow scope.

-   **Simplified flow execution testing** by allowing you to jump to any state to begin a test case. See the booking-mvc and booking-faces for examples of flow test cases.  
    

-   **Improved booking-mvc as a reference application showing @Controllers together with Flows**. A new FlowHandler concept provides a clean bridge between Controllers and Flows, allowing the two types of handlers to interact in a structured manner. Also improved the organization of the reference application Spring configuration to illustrate best practice.  
    

2.0.0 Final is right around the corner! Enjoy!