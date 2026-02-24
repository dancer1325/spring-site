---
title: Spring MVC 3 Showcase
source: https://spring.io/blog/2010/07/22/spring-mvc-3-showcase
scraped: 2026-02-24T08:55:02.517Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Keith Donald |  July 22, 2010 | 5 Comments
---

# Spring MVC 3 Showcase

_Engineering | Keith Donald |  July 22, 2010 | 5 Comments_

Since the big Spring 3 release last year, I've been working on a number of application development projects and extracting "showcases" of various framework features. These "showcases" are not reference applications or tutorials, they're more like acceptance tests for specific framework capabilities. After seeing a showcase, you should have a good idea of what the technology can do.

The first showcase I've put together is for Spring MVC 3, our web framework. It includes a sample project, along with a supporting slide presentation and screencast. After digging in, you should have a good understanding of what Spring MVC can do and get a feel for how easy it is to use.

## mvc-showcase

In this showcase you'll see the following in action:

-   The simplest possible @Controller
-   Mapping Requests
-   Obtaining Request Data
-   Generating Responses
-   Message Converters
-   Rendering Views
-   Type Conversion
-   Validation
-   Forms
-   File Upload
-   Exception Handling

I use jQuery to drive feature illustration by applying progressive Ajax techniques. I highly recommend using Firebug or equivalent to gain insight into the client/server interactions. I find it very educational to inspect the request and response details from the client-side, then jump to the code that executed on the server-side.

Get the code by cloning the [spring-mvc-showcase](https://github.com/SpringSource/spring-mvc-showcase) project over at Github. Simply import the project into [STS](http://www.springsource.com/products/sts) as a Maven Project, then drag-n-drop the project onto the "SpringSource tc Server Developer Edition" Server to run.

View the supporting slide show:

[![Spring MVC 3 Showcase Slideshow](http://s3.springsource.org/MVC/mvc-showcase-slides.png "Spring MVC 3 Showcase Slideshow")](https://github.com/SpringSource/spring-mvc-showcase/blob/master/MasteringSpringMVC3.pdf?raw=true)

See the showcase live in this 8 minute screencast:

[![Spring MVC 3 Showcase Screencast](http://s3.springsource.org/MVC/play-mvc-showcase.png "Spring MVC 3 Showcase Screencast")](http://s3.springsource.org/MVC/mvc-showcase-screencast.mov)

The mvc-showcase screencast contains music by the band The Smashing Pumpkins. The mvc-showcase screencast is not affiliated with or endorsed by The Smashing Pumpkins. All audio in the screencast is licensed for non-profit use per the terms and conditions of the [live music archive](http://www.archive.org/details/tsp2010-07-12.dab.flac16) at [archive.org](http://www.archive.org).

## Summary

I hope you find spring-mvc-showcase useful and discover some "hidden gems" you might not have known about before. Please let me know also if you'd like to contribute your own additions. spring-mvc-showcase covers a lot of ground today, but there's always opportunity to cover more!