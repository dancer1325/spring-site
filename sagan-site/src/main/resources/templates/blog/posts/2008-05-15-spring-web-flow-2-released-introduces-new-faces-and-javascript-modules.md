---
title: Spring Web Flow 2 Released; Introduces New Faces and JavaScript Modules
source: https://spring.io/blog/2008/05/15/spring-web-flow-2-released-introduces-new-faces-and-javascript-modules
scraped: 2026-02-24T09:17:20.690Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Keith Donald |  May 15, 2008 | 0 Comments
---

# Spring Web Flow 2 Released; Introduces New Faces and JavaScript Modules

_Releases | Keith Donald |  May 15, 2008 | 0 Comments_

Dear Spring Community,

We are pleased to announce general availability of Spring Web Flow 2. [Download](/download#webflow) | [Documentation](/documentation#webflow)

Spring Web Flow is the project in the Spring Portfolio that focuses on providing the infrastructure for building and running rich web applications. As a Spring project, Web Flow builds on the Spring Web MVC framework to provide:

-   A domain-specific-language for defining reusable controller modules called [flows](http://static.springframework.org/spring-webflow/docs/2.0.x/reference/html/ch02s02.html)
-   An advanced controller engine for managing conversational state
-   First-class support for using Ajax to construct rich user interfaces
-   First-class support for using JavaServerFaces with Spring

The modules of the Web Flow 2 distribution and their relationship with the Spring Framework are illustrated below:

## What's in Web Flow 2

![Web Flow 2 Distribution Components](http://static.springframework.org/spring-webflow/images/spring-webflow2-distribution.png "Web Flow 2 Distribution Components")

### Spring Web MVC

The Spring Web MVC framework, a module of the Spring Framework distribution, provides the foundation for developing web applications with Spring using the proven ModelViewController paradigm. Each of the modules of the Web Flow distribution builds on this foundation.

### Spring Web Flow

The Web Flow module is a MVC extension that allows you to define Controllers using a [domain-specific-language](http://static.springframework.org/spring-webflow/docs/2.0.x/reference/html/ch02s04.html). This language is designed to model user interactions that require several requests into the server to complete, or may be invoked from different contexts.

### Spring JavaScript

[Spring JavaScript](http://static.springframework.org/spring-webflow/docs/2.0.x/reference/html/ch11.html) is a JavaScript abstraction framework that makes it easy to write unobtrusive JavaScript to progressively enhance a web page with behavior. The framework consists of a public JavaScript API along with an implementation that builds on the Dojo Toolkit. Spring.js aims to simplify the use of Dojo for common enterprise scenarios while retaining its full-power for advanced use cases.

Spring JavaScript can work with *any* server-side framework. The Web Flow 2 distribution includes convenient integration between Spring JavaScript and Spring Web MVC for processing Ajax requests.

### Spring Faces

The [Spring Faces](http://static.springframework.org/spring-webflow/docs/2.0.x/reference/html/ch12.html) module contains Spring's support for JavaServerFaces. This support allows you to use JSF as a View technology within a familiar Spring MVC and Web Flow Controller environment. With this architectural approach, you combine the benefits of the JSF UI component model with the benefits of a Web MVC architecture. Spring Faces also includes a lightweight component library built on Spring JavaScript for declaratively enabling Ajax and client-side validation behaviors in a progressive manner.

## Themes of the Web Flow 2 Release

In addition to introducing the new Spring Faces and Spring Javascript modules, the Web Flow 2 release effort addresses two major themes: Integration and Simplicity.

### Integration

Across each of the modules, the Web Flow 2 distribution adds a number of interesting integrations that allow you to enrich your web applications. These integrations support:

-   Using Spring Security to secure your flows in a declarative manner
-   Using Tiles for JSP page composition and Ajax partial-rendering
-   When using JSF, using Facelets for page composition and layout
-   When using JSF, using Apache Trindad and JBoss RichFaces component libraries
-   Using the Dojo widget system in a progressive and unobtrusive manner; a manner that degrades gracefully if JavaScript is not available on the client

### Simplicity

The flow definition language has been simplified tremendously in Web Flow 2 while becoming more powerful overall. These simplifications include:

-   An appoximate 50% overall reduction in lines-of-code when comparing a version 2 flow definition with its version 1 equivalent (example: [version 2](https://springframework.svn.sourceforge.net/svnroot/springframework/spring-webflow/tags/spring-webflow-2.0.1.RELEASE/spring-webflow-samples/booking-faces/src/main/webapp/WEB-INF/flows/booking/booking.xml) vs [version 1](https://springframework.svn.sourceforge.net/svnroot/springframework/spring-webflow/tags/spring-webflow-2.0-m1/spring-webflow-samples/booking-jsf/src/main/webapp/flow/booking/booking.xml))
-   A concise syntax for invoking actions using an Expression Language (EL), with support for both the Unified EL and OGNL
-   Declarative model binding and validation, with support for convention-over-configuration
-   Support for reuse at both the flow and state levels using flow definition inheritance
-   Enhanced modularity, allowing a flow and its dependent resources to be packaged together in a self-contained bundle

## Release Notes  

-   Web Flow 2 requires Java 1.4 or greater and runs on all major Java EE platforms including Tomcat, Jetty, Websphere, WebLogic, and JBoss.

-   Web Flow 2 requires Spring Framework 2.5.4 or greater.

-   Web Flow 2 has been certified by SpringSource as "Platform Ready" and is fit to run on the [SpringSource dm Server](http://www.springsource.com/products/suite/dmserver) in OSGi-enabled web applications.

## Getting Started

-   Get started using Web Flow by [downloading the release](/download#webflow) and [walking through the reference applications](/webflow-samples). Supplement with the [documentation](/documentation#webflow) as you go to familiarize yourself with the feature set.

-   To get started using a build system such as Maven or Ant+Ivy, access Web Flow artifacts from the [Maven Central Repository](http://static.springframework.org/spring-webflow/docs/2.0.x/reference/html/ch01s06.html).

-   To get started using Web Flow in an OSGi environment on the SpringSource Application Platform, [download the platform](http://www.springsource.com/web/guest/products/suite/applicationplatform) and get Web Flow bundles from the [SpringSource Enterprise Bundle Repository](http://static.springframework.org/spring-webflow/docs/2.0.x/reference/html/ch01s05.html).

## Additional Community Resources

-   Read the [interview with Keith Donald and Jeremy Grelle](http://www.infoq.com/news/2008/04/spring-webflow-2rc) of SpringSource describing what's new in the Web Flow 2 distribution in more detail

-   Watch the [Ajaxian.com interview](http://ajaxian.com/archives/spring-webflow-20-javascript-module-released) where the release and Spring JavaScript are discussed with Dion Almaer.

-   Get involved with the Web Flow 2 community on the [Spring Community Forums](http://forum.springframework.org)

-   Explore Spring Web reference applications on-line. The [Spring Travel](http://richweb.springframework.org/swf-booking-faces) application showcases the integrated Web Flow 2 feature set and is included in the distribution. The [SpringSource Enterprise Bundle Repository](http://www.springsource.com/repository) is a real-world application in production built on Spring 2.5 and Spring Web Flow 2.0.

-   If you are an existing Web Flow 1 user, review the [migration guide](http://static.springframework.org/spring-webflow/docs/2.0.x/reference/html/ch15.html) to help in upgrading to Web Flow 2. The WebFlowUpgrader tool automates the conversion of your flows to the version 2 syntax

-   Submit bug reports and requests for enhancement using the [Web Flow issue tracker](http://jira.springframework.org/browse/SWF)

-   Track updates to the Web Flow source repository with [Fisheye](https://fisheye.springframework.org/browse/spring-webflow)

-   Checkout the Web Flow source code from the [Spring Project SVN Repository](https://src.springframework.org/svn/spring-webflow/)

-   Watch for upcoming articles on Web Flow 2 by [subscribing](/node/feed) to springframework.org[](http://jira.springframework.org/browse/SWF)