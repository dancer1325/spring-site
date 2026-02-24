---
title: Springing Ahead Toward The Open PaaS
source: https://spring.io/blog/2010/05/19/springing-ahead-toward-the-open-paas
scraped: 2026-02-24T08:57:45.243Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rod Johnson |  May 19, 2010 | 0 Comments
---

# Springing Ahead Toward The Open PaaS

_Engineering | Rod Johnson |  May 19, 2010 | 0 Comments_

A few weeks ago [I tweeted](http://twitter.com/springrod/status/13517777968) that—incredibly—SpringSource was executing faster within VMware than as a startup. Today we announce another exciting development bearing this out.

Following our VMforce partnership with SaaS leader salesforce.com, we are today [announcing a collaboration between VMware and Google](http://www.vmware.com/company/news/releases/vmware-google.html), centering around the Spring programming model and SpringSource IDE and RAD tooling. Today’s [announcement](http://blogs.vmware.com/console/2010/05/google-and-vmwares-open-paas-strategy.html) makes Spring the preferred programming model for [Google App Engine](http://code.google.com/appengine/). This is a tremendous endorsement of Spring as the best and most portable programming model for Java and opens up a new deployment opportunity for Spring developers. The demo in today’s keynote at [Google I/O](http://code.google.com/events/io/2010/) showcased the results from months of collaboration between SpringSource and Google engineers—most of which benefits Spring developers, regardless of where they wish to deploy their applications. The highlights: innovative, close integration between Spring and [Google Web Toolkit](http://code.google.com/webtoolkit/) (GWT) offering the ability to build rich applications with amazing speed; the ability to easily target Spring applications to App Engine; a compelling integration between [Spring Insight](http://www.springsource.com/products/tcserver/devedition) and [Google Speed Tracer](http://code.google.com/webtoolkit/speedtracer/) to provide insight into the performance of Spring applications from browser to database; and tight integration of all this with [SpringSource Tool Suite](http://www.springsource.com/products/sts) to provide a polished, productive experience.

## Goals

Before delving a little deeper into the technology, I’d like to reflect on the goals. This announcement highlights two core values of Spring that continue to guide us as we move forward: **Productivity** and **Portability**.

### Productivity

Spring owes its adoption to its ability to significantly and measurably improve Java productivity. SpringSource continues to invest heavily in productivity enhancement, and today’s announcement brings into focus some of the benefits, in the form of two jewels of the SpringSource portfolio: SpringSource Tool Suite (STS) and Spring Roo. Together, these provide the best productivity experience available for Java developers, and it’s exciting to see Google’s recognition of this.

-   [STS](http://www.springsource.com/products/springsource-google-download)—our free Eclipse distribution—is the best environment for developing Spring applications. Our goal here is ambitious: a single download that will provide all you need to build Java applications with optimum productivity.
-   [Spring Roo](http://www.springsource.org/roo) is a Spring project that helps build Spring applications faster than you would have thought possible. You’ve probably already heard of Roo—if you’re a Java developer and haven’t tried it yet, now is the time. It’s quite simply the fastest way to build quality Java applications. In a nutshell, Spring Roo is an interactive, round tripping code generator that ensures that you need to write only the lines of Java code that truly add value, while Roo takes on the busywork of creating and maintaining build scripts; persistence mappings; bootstrap configuration; JavaBean methods; toString() methods etc. Unlike typical code generators, Roo is intended for developers who want to write code—ensuring that they need only to write the right code. Its round tripping support extends to the UI layer, updating managed artifacts based on user code changes.

While we respect the fact that many in the Spring community wish to benefit from choice at a fine-grained level, we firmly believe that the productivity advantages of opinionated tools such as Spring Roo will become increasingly important. (While Roo targets developers who wish to write code in Java, Grails caters for who wish to program in Groovy. It’s important to note here that the Grails and Groovy community have already [demonstrated](http://blog.springsource.com/2009/05/14/grails-111-released-with-google-appengine-support/) the value of their technology on Google App Engine.)

Productivity is also about integration: making everything work together. With the SpringSource/Google collaboration, you will be able to [download STS](http://www.springsource.com/products/springsource-google-download), create a new Spring Roo project using a simple dialog box, and use the Roo shell to help you build a complete application. Within minutes you can create a real application (including data access), and have it running in the cloud. With Roo round tripping integrated with STS, you can add a new field to your entity, see Roo change the GWT scaffold app, press Refresh in GPE's DevMode, switch back to your browser and see that the entire app including database changes is usable after 2-3 seconds refresh time, with no server restart required.

### Portability

A core value of Spring has always been its ability to enable developers to write business logic that is not merely simpler, but cleanly decoupled from its deployment environment. In the early days of Spring this enabled developers to write applications that were portable between different servers such as WebSphere or Tomcat, avoiding (and enjoying a superior alternative to) environment-specific APIs such as EJB or JTA. Today the choice between deployment environments encompasses the choice between the traditional data center and the cloud. Spring portability is becoming the most important enabler for Java developers to move toward cloud computing.

Today, Spring portability is key to realizing our vision for an [Open PaaS](http://blogs.vmware.com/console/2010/05/google-and-vmwares-open-paas-strategy.html): As described by VMware CTO, Steve Herrod, “focusing on a particularly important choice… where you deploy and run your applications.” It’s exciting to see VMware embrace the core values to which Spring owes its success. It’s also pleasing to see Google share this commitment to portability.

## Technology Overview

I’ve mentioned the role of Spring Roo and STS. Other key technical elements include GWT and SpringSource and Google performance analysis tools. Shortly our engineers involved in this work will cover the specifics in far more technical detail—and the new [Roo 1.1.0.M1](http://blog.springsource.com/2010/05/19/spring-roo-1-1-0-m1-released/) and STS 2.3.3.M1 release will allow you to explore for yourself—but here’s a quick guide of what to expect.

### GWT

Google Web Toolkit is a powerful technology for developing rich internet applications, using modern technologies such as AJAX and HTML5 to create the most compelling end user experience on computers and non-traditional clients such as smart phones. As UI requirements change and non-traditional clients become more and more important, GWT is set to become increasingly important to Java developers.

Today we showcase deep integration between Spring, Spring Roo and GWT—the culmination of several months of collaboration between SpringSource and Google engineers, and answering one of the most frequent requests from the Spring community. This integration makes GWT applications far easier than ever to develop, and gives Spring developers a compelling new UI choice. GWT is open source and independent of deployment environment, so this integration will benefit all Spring users, regardless of whether they intend to target their applications to Google App Engine. With its knowledge of the domain model, Spring Roo is a match made in heaven for GWT. With today’s integration Spring Roo can generate and round trip GWT interfaces, making developers far more productive throughout the application lifecycle; and support easy deployment to App Engine from within the Roo shell.

We’ve also added easy installation of Google Plugins for Eclipse (GPE) through the STS Extension Install mechanism. GPE supports tools for GWT incl. DevMode and deployment to App Engine.

### Spring Insight/Google Speed Tracer

Spring Insight is a technology that gives developers insight into the performance of their applications without the need to write any special code or set up any configuration. Insight uses efficient AspectJ instrumentation and its knowledge of the Spring Framework (and hence, ability to make sense of application structure) to display detailed information about application performance, including what time is spent where. Insight is available in SpringSource tc Server. (tc Server Developer Edition is free, and is included with STS.

Google Speed Tracer is available as a Chrome extension that shows where time is being spent in your application. This includes problems caused by JavaScript parsing and execution, layout, CSS rendering, DOM event handling, resource loading etc.

Today we’re showing an integration between the two technologies. This enables Speed Tracer users to see Insight traces seamlessly inserted into their Speed Tracer screens, and drill down to specific server-side operations such as JDBC queries. The combination of Speed Tracer and Insight is unprecedented, and powerful. For the first time, it is possible to see browser and backend servers coordinating to show exactly what work a request did from a holistic perspective .

## What It All Means

What a difference a few weeks makes! Until the announcement of [VMforce](http://www.vmforce.com) and today’s announcement, Java developers lacked a PaaS destination to which they could easily deploy their applications. This was an important gap that threatened to become a danger to the long-term future of Java. I’m delighted that VMware/SpringSource is leading the charge to fill this gap.

Today’s announcement is great news for Spring developers. Spring skills have never been more valuable; the reach of the Spring ecosystem continues to grow; Spring’s core values continue to guide its evolution; and Spring is placed to grow the Java community and lead its charge into cloud computing. Whether you want to deploy Java applications in an existing data center, private Java cloud or public cloud, Spring is the best programming model. I’m excited, and hope you are, too.