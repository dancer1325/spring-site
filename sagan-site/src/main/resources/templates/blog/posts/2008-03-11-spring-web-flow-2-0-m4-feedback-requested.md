---
title: Spring Web Flow 2.0 M4 - Feedback Requested
source: https://spring.io/blog/2008/03/11/spring-web-flow-2-0-m4-feedback-requested
scraped: 2026-02-24T09:20:20.729Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Keith Donald |  March 11, 2008 | 0 Comments
---

# Spring Web Flow 2.0 M4 - Feedback Requested

_Engineering | Keith Donald |  March 11, 2008 | 0 Comments_

The Web Flow team has been working hard on Web Flow 2. We just reached our [4th milestone](http://www.springframework.org/node/604) and will enter release candidate status as early as next week. The 2.0 final release is scheduled for the end of the month.

Between now and 2.0 final, we'd like your feedback! If you are an application developer currently using Web Flow 1.x, or evaluating Web Flow for use in your project, please [give 2.0 M4 an evaluation](http://www.springframework.org/download#webflow) and [let us know what you think](http://forum.springframework.org/forumdisplay.php?f=36). If you are a web framework provider integrating the Web Flow engine into your framework, we encourage you to evaluate the refined hooks in 2.0 M4 and give us a shout out.

In the next few paragraphs, I'll provide 2.0 M4 highlights for application developers using Web Flow and framework developers integrating it into their own web frameworks:

##### Application Developers

First, by far the best way to evaluate the latest Web Flow feature set is to take the reference applications included in the distribution for a spin. There are two reference apps in 2.0 M4, both flavors of a "Spring Travel" trip booking application. One flavor shows Web Flow integrated into Spring MVC with JSP views, the other shows Web Flow integrated into Spring MVC with JSF views. (see: [How to Deploy](http://www.springframework.org/webflow-samples))

One of the major themes of the 2.0 release is ease of use. Web Flow 2.0 M4 introduces many new features that simplify implementing flows, and we would love your feedback on those. Specifically:

-   We have introduced a simplified XML flow definition syntax. Take the latest Spring Travel reference application for a test drive to see it, or compare the [old version](https://springframework.svn.sourceforge.net/svnroot/springframework/spring-webflow/tags/spring-webflow-2.0-m2/spring-webflow-samples/booking-mvc/src/main/webapp/flow/booking/booking.xml) of one of our example flows to the [latest version](https://springframework.svn.sourceforge.net/svnroot/springframework/spring-webflow/tags/spring-webflow-2.0-m4/spring-webflow-samples/booking-faces/src/main/webapp/WEB-INF/flows/booking/booking.xml). What do you think? Much of the simplification comes from enhanced use of EL and simpler tags for executing actions. For example, you can now use EL to execute any method on any Spring bean, in addition to any flow variable.
-   We have introduced integration with Spring Security 2. The Spring Travel reference app shows how to secure a flow using the "secured" element. You can also secure states and transition elements as well.
-   There are several new "rich web" features in 2.0 M4. You can mark a view-state a "popup" and its view will be rendered inside a popup dialog for you (a Dojo popup by default). You can also use the new "render" tag inside a transition block to request partial rendering of a page after processing an Ajax event. Finally, try turning Javascript off in the Spring Travel application and notice how the application continues to work. We've worked hard to build in support for degradation, which is important for our customers that cannot rely on Javascript being available on the client.
-   We have significantly reduced the length of a FlowExecution key. The 1.x key format had flow execution URls looking something like this: http://localhost/booking?\_flowExecutionKey=\_c1E11178E-485F-3913-98BA-86E17A09FA3D\_kE977CB0B-47FE-3319-A688-FE4F4FFFCE2. The default 2.0 format gives you simpler URLs like: http://localhost/booking?execution=**c1v1**, where the first number is your conversationId and the second number is your view (or continuation) id. The URL format is still configurable of course.
-   There is more to checkout; see the [release announcement](http://www.springframework.org/node/604) for a description of additional new features.

##### Framework Developers

One of the goals of Web Flow has always been "make it focused on doing one thing really well \[implementing flows\], and make it easy to extend". The core of Web Flow plays the heavy-lifting role of providing the most complete flow engine available. In this role, we encourage other framework providers to build on our work and for them to let us know if integration is not as easy as it should be. The Grails community is already doing this, having incorporated Web Flow into Grails for implementing flows in Groovy (Grails is built on Spring MVC, and Web Flow is a natural MVC extension, so the fit is there).

There are a couple of things we are doing in Web Flow to make it easier to integrate for framework developers. First off, there are essentially three main extension points:

1.  The FlowExecutor SPI allows the Web Flow engine to be embedded in another environment, such as a web framework. This is how Web Flow integrates into Spring MVC, for example. We view Spring MVC as the definitive Java-based MVC platform, but if you cannot use it as a base this hook is there for you.
2.  The FlowBuilder SPI allows you to incorporate another syntax for defining flows. Our XmlFlowBuilder ships with the Web Flow distribution. Graeme Rocher developed a Groovy-based flow builder for Grails.
3.  The ViewFactory SPI allows you to integrate a view framework into Web Flow for rendering views within a flow. This is how Spring Faces provides JSF support for Web Flow, and also how the RSF team at The University of Cambridge is integrating Web Flow with their framework. Other candidates for integration using this extension point I can think of include Wicket, Flex, and perhaps GWT.
Each of these extension points has been simplified in version 2, and the ViewFactory extension point is new. 2.0 M4 also introduces a new "AjaxHandler" extension point for integrating Ajax request/response handing, with a implementation that works with Spring Javascript. We're also currently working with the IceFaces team on integration with their Ajax component library in time for 2.0 final.

The generally available release of Web Flow 2 is right around the corner. Help us make it as easy to use and extend as possible!