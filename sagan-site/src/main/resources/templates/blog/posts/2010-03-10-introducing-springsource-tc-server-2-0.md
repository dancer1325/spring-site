---
title: Introducing SpringSource tc Server 2.0
source: https://spring.io/blog/2010/03/10/introducing-springsource-tc-server-2-0
scraped: 2026-02-24T08:59:20.697Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Bruce Snyder |  March 10, 2010 | 0 Comments
---

# Introducing SpringSource tc Server 2.0

_Engineering | Bruce Snyder |  March 10, 2010 | 0 Comments_

In the very near future, SpringSource tc Server 2.0™ will be released including a new Spring Edition, representing some big changes for the product and a big step ahead for web application development. This also continues SpringSource's commitment to tc Server being a 100% compatible drop-in replacement for Apache Tomcat that provides the best place to build and run your Spring applications and is ideally suited for modern virtual environments.

Based on the Tomcat server that we all know and love, tc Server adds advanced diagnostics, operational management and mission-critical support capabilities. These features dramatically cut costs and complexity while increasing productivity in comparison to traditional Java EE application servers. SpringSource tc Server is now made available in three different editions: the Spring Edition, the Standard Edition and the Developer Edition. These three editions of tc Server ensure easy access for your development team and provide market leading, enterprise class, production capabilities for both Spring and non-Spring based applications.

## Spring Edition

The big news around tc Server is the new distribution we're making available in [tc Server Spring Edition](http://www.springsource.com/products/tcserver#SpringEdition). The majority of Tomcat applications out there continue to utilize the Spring Framework, and that’s more true for users of tc Server. For Spring applications running in production, the SpringSource tc Server Spring Edition is the best choice. The advantage of the Spring Edition is the inclusion of the instrumented Spring jars that provide reporting and management via Hyperic HQ, including:

-   Deep visibility into the health and performance of Spring applications
-   Performance and SLA management of Spring applications provides the insight required to ensure application operation
-   Automatically monitor application, data access and custom components
-   Monitor performance inside of Spring and execute control operations in response to changing execution conditions
-   Monitor application server status, health and response times

![tc-server-Spring-Edition-Resources-annotated](http://blog.springsource.com/wp-content/uploads/2010/03/tc-server-Spring-Edition-Resources-annotated.png "tc-server-Spring-Edition-Resources-annotated")

The Spring Edition builds on top of the new features that have been included in the Standard Edition of tc Server.

## Standard Edition

SpringSource [tc Server Standard Edition](http://www.springsource.com/products/tcserver) takes a major operational step forward through its integration with the [SpringSource Hyperic HQ 4.2 Enterprise](http://www.hyperic.com/products/enterprise-systems-monitoring) monitoring and management system which includes a couple of important enhancements:

-   Rich alert definition, workflows, and flexible control actions for dev-ops to proactively manage application issues
-   Group availability and event dashboards make it easy to see the problem areas and possible root causes of issues

The tc Server Standard Edition also provides the ability to manage and monitor your tc Server applications from the same dashboard that you use to manage and monitor your distributed data center. This gives you a comprehensive view into your data center and allows you to correlate views over a wide variety of metric data. Below is a screenshot depicting a group of tc Server instances being monitored:

![tc-server-group-monitor-annotated](http://blog.springsource.com/wp-content/uploads/2010/03/tc-server-group-monitor-annotated.png "tc-server-group-monitor-annotated")

In addition, the tc Server Standard Edition offers a download of just the tc Server Runtime, without the extra add-ons. This allows us to provide the leanest possible package of the runtime container.

## Developer Edition

[SpringSource tc Server Developer Edition](http://www.springsource.com/products/tcserver/devedition) is provided as a free development download of the tc Server Runtime. It includes:

-   100% Apache Tomcat compatibility - use it wherever you use Tomcat
-   Built on the latest production ready Apache Tomcat release at its core
-   Including bug fixes contributed to the Tomcat project by SpringSource
-   Application templating allows you to easily create templates from existing applications which then allow you to easily and quickly spin up new, similar applications in a matter of minutes.
-   Spring Insight performance dashboard for extensive awareness when developing web applications. A screenshot of Spring Insight is provided below, but there's no substitute for trying out the real thing with your own webapp. [Download the Developer Edition](http://www.springsource.com/products/tc-server-developer-edition-preview) to take it for a spin and see for yourself.

![SpringInsight-recent_activity_screen_with_labels](http://blog.springsource.com/wp-content/uploads/2010/03/SpringInsight-recent_activity_screen_with_labels.png "SpringInsight-recent_activity_screen_with_labels") ![SpringInsight-trace_details_with_labels](http://blog.springsource.com/wp-content/uploads/2010/03/SpringInsight-trace_details_with_labels.png "SpringInsight-trace_details_with_labels")

SpringSource tc Server Developer Edition is also bundled within the [SpringSource Tool Suite](http://www.springsource.com/products/sts) (STS), an Eclipse-based development environment. STS provides visual tools for rapidly building modern applications using Spring, Spring Roo and Groovy/Grails. This allows developers to easily deploy and test their applications with tc Server without leaving STS. Instead of trying to squeeze an image of STS into this blog post, **I highly suggest you check out Jon's [tc Server and Spring Insight screencast](http://s3.springsource.com/MRKT/spring-metrics/Spring_Insight_Preview-final2.mov) as well as Stefan's [Roo, STS and tc Server screencast](http://s3.springsource.com/MRKT/roo/2010-01-Five_Minutes_Roo.mov)**. These two screencasts really give you a good perspective of these products in action and show how powerful they really are, so be sure to check them out.

The free Developer Edition offers tremendous value to the developer.

## Future

We are already deep into planning for the next release of tc Server and we welcome your suggestions via the [tc Server Forum](http://forum.springsource.org/forumdisplay.php?f=64) . So grab the new version of tc Server and take it for a spin. You won't be disappointed.