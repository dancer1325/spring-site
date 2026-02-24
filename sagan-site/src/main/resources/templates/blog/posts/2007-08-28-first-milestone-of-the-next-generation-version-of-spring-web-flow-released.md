---
title: First Milestone of the Next Generation Version of Spring Web Flow Released
source: https://spring.io/blog/2007/08/28/first-milestone-of-the-next-generation-version-of-spring-web-flow-released
scraped: 2026-02-24T09:25:23.480Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Keith Donald |  August 28, 2007 | 0 Comments
---

# First Milestone of the Next Generation Version of Spring Web Flow Released

_Releases | Keith Donald |  August 28, 2007 | 0 Comments_

Dear Spring Community,

We are pleased to announce that the first milestone of the next generation version of Spring Web Flow is now available.  Spring Web Flow 2.0 M1 introduces several major new features, including support for flow-managed persistence contexts, improved support for Java Server Faces, full unified expression language (EL) support, and a more comprehensive [sample web application](http://spring.ervacon.com/swf-booking-jsf).  

[![](http://static.springframework.org/spring-webflow/images/spring-webflow.png)](/webflow)

[Download](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=148517&release_id=533772) | [Practical Introduction](http://www.ervacon.com/products/swf/intro/index.html) | [Samples](http://spring.ervacon.com) | [Reference Manual](http://static.springframework.org/spring-webflow/docs/2.0-m1/reference/index.html) | [Changelog](http://static.springframework.org/spring-webflow/docs/2.0-m1/changelog.txt)  

> Spring Web Flow 2.0 is a next generation framework for developing Java web application controllers.  The framework offers a *unified* runtime for executing stateless *and* stateful client interactions across a variety of environments.

**Goal of the Web Flow 2.0 Release**

Today, most application developers use Spring Web Flow to implement linear page flows, such as wizards, by plugging Web Flow into their "base" web framework such as Spring MVC.  Such page flows exhibit linear navigational rules, are stateful, and form dynamic, self-contained modules of web application functionality.  A good example is a loan application process: Web Flow's unique *flow definition language* provides a natural programming model for implementing these types of processes.  

The overall goal of Spring Web Flow 2.0 is to formally take the product from what it is today, a framework used primarily to implement linear wizards, to what it was always designed to become: a *universal application controller engine* for powering all types of client interactions.  Such interactions include wizards, stateless "RESTful" interactions, and finer-grained, non-linear/asynchronous interactions often present in a "web 2.0" application.  

Spring Web Flow 2.0 will provide the Spring community with a *unified* application controller framework and runtime, suitable for executing all types of client interactions, and capable of integrating a variety of view rendering technologies and UI component models.  This unified runtime will enable consistent application of management instrumentation, security, AJAX, and managed persistence, among other unique features.  

View the complete [Spring Web Flow 2.0 Roadmap](http://opensource.atlassian.com/projects/spring/browse/SWF?report=com.atlassian.jira.plugin.system.project:roadmap-panel).  

**Web Flow 2.0 M1 New and Noteworthy**

The first 2.0 release milestone introduces several major new features on the road to 2.0 final.  These features are described below. 

**Flow Managed Persistence Contexts with JPA and Hibernate**  

Spring Web Flow 2.0 M1 introduces support for *Flow Managed Persistence Contexts* with Hibernate and JPA.  The new [Hotel Booking Sample application](http://spring.ervacon.com/swf-booking-jsf/) included in the release demonstrates this feature.  Here is how it works in the context of the booking sample:  

-   When a new hotel booking flow begins, a persistence context is created for you automatically.
-   As you progress through the flow, the persistence context is used for all data access operations automatically.   You do not have to worry about locating the flow-bound EntityManager instance, or managing it in any way.
-   When you authorize a booking, all changes to managed persistent entities are committed and flushed back to the database automatically.  If you choose to cancel your booking, none of your changes are committed.  
    

The graphical [Spring IDE](http://springide.org) view of this Hotel Booking flow is shown below:

![Booking Flow](http://static.springframework.org/spring-webflow/announce/2.0-m1/booking-flow.png "Booking Flow") 

**Improved Support for Java Server Faces (JSF)  
**

Spring Web Flow 2.0 M1 introduces the *Spring Faces* module (spring-faces-2.0-m1.jar), a component shipped with the Web Flow distribution that contains first-class support for organizations developing web applications with Java Server Faces.  The pre-existing Web Flow + JSF integration has been factored out to this project, and this project will be the home of all future JSF integration work.  

The Spring Faces module provides the Spring community a dedicated project for exploring additional JSF integration opportunities.  The initial work in 2.0 M1 introduces integration with [Ext](http://www.extjs.com), a popular Javascript GUI widget framework.  Several lightweight JSF UI Components are provided that encapsulate the rendering of rich Ext widgets.  The approach we took allows Ext widgets to *decorate* standard JSF components, adding a desktop-like look-and-feel and additional UI behaviors such as client-side validation.  The following Ext component decorators are provided in 2.0 M1:  

-   A date validator component that performs rich client-side validation on a date text field, with a great-looking date chooser control.
-   A text validator that performs rich client-side validation on a free-form text input field.
-   A number validator that performs rich client-side validation on number text fields.

A screen-shot of the date validator control, also used in the Hotel Booking sample application, is shown below:

![](http://static.springframework.org/spring-webflow/announce/2.0-m1/data-validator.png) 

Ext controls look great, and because all UI behaviors execute client side the responsiveness of the UI is excellent.  We will be adding further support in this area in future Web Flow release milestones, as part of the Spring Faces module.  

Having a dedicated Spring Faces module also simplifies the process of setting up Spring Web Flow in a JSF environment.  Before 2.0 M1, developers were required to modify *faces-config.xml* manually to setup the boilerplate Spring/SWF integration plumbing.  With 2.0 m1, this setup is done for you automatically simply by including spring-faces-2.0-m1.jar in your classpath.  

**Unified Expression Language (EL) Support**

Also new in this release is full support for the Unified EL, which provides an alternative to the OGNL-based expression parser currently used by default in Spring Web Flow.  Use of the unified EL is now recommended for a JSF environment, and will become the default for JSF developers in future milestones.

An example EL expression used within the Hotel Booking flow definition is shown below: 

![](http://static.springframework.org/spring-webflow/announce/2.0-m1/el-example-1.png) 

The "id" expression above evaluates the current hotel identifier stored in Flow Scope.  Note how there is no need for any explicit flowScope prefix here.  The developer simply references the variable by its name, and the ELExpressionEvaluator handles resolving the variable by searching through the various scopes.  This makes managed-bean references in Web Flow definitions 100% consistent with references in JSF views used for model binding expressions.  For example, see the following snippet from the bookingForm.xhtml view:

 ![](http://static.springframework.org/spring-webflow/announce/2.0-m1/el-example-2.png)

****************************************2.0 Release Notes****************************************

Spring Web Flow 2.0 requires Spring 2.0 or greater and Java 1.4 or greater.

Spring Web Flow 2.0 will retain backwards compatability with the 1.0.x XML-based flow definition language as far as possible.  It is expected that some SWF SPIs will change in future Web Flow 2.x milestones, as Web Flow evolves into a complete controller framework.

Future milestones of Spring Web Flow 2.0 will introduce new dialects for defining flows in real programming languages, providing more powerful alternatives to the current XML-based flow definition syntax.  A POJO-based Java flow definition syntax is in the works, as is a Groovy-based approach.  Also, high-level flow dialects for implementing REST-ful and CRUD flows will be introduced.  *Because the Web Flow definition API and execution runtime are separate from any concrete flow definition syntax, we can naturally introduce new syntaxes that engineer application controllers at runtime in different ways.*  

For JSF users, Spring Web Flow 2.0 and Spring Faces run on JSF 1.1 and JSF 1.2.  The UI component libraries in the Spring Faces module are independent of the Web Flow runtime and may also be used with JSF's default navigation handlers.  

Spring Web Flow 2.0 will continue to provide full support for Servlet 2.4 or greater, Portlet 1.0 or greater, and JUnit 3.8.1 or greater environments. 

Spring Web Flow 2.0 will continue to run in Struts 1.2 or greater and Spring MVC 2.0 or greater environments, and will also be usable as a standalone web application controller framework by 2.0 final.