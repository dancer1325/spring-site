---
title: Introducing tc Server Developer Edition - with Spring Insight
source: https://spring.io/blog/2009/10/21/introducing-tc-server-developer-edition-with-spring-insight
scraped: 2026-02-24T09:02:59.147Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Jon Travis |  October 21, 2009 | 0 Comments
---

# Introducing tc Server Developer Edition - with Spring Insight

_Engineering | Jon Travis |  October 21, 2009 | 0 Comments_

We are proud to present the Spring community with a new tool which helps get their applications to production even faster: [tc Server Developer Edition](http://www.springsource.com/products/tcserver) is the standard 100% Tomcat you know and love, plus a new Spring Insight console.

Spring Insight gives deep visibility into your application’s real activity on a request-by-request basis. For any request you can see all the JDBC queries it made, how much time it took to render, or timings for any of your major Spring beans.

This fine grained information is very valuable when you are looking at a specific request in isolation, but it can be difficult to find a specific request in a mountain of millions. Fortunately, Spring Insight also has a 10k foot view and can quickly point you to problem areas.

Spring Insight’s Application Health screen works great in a performance-testing environment. It will show you which Spring MVC controllers are unhealthy and allow you to drill down into specific problem requests. With a few clicks you can navigate from the 10k foot view to a specific remote web-service call.

To see tc Server Developer Edition in action, just click on the image below to start the [screencast](http://s3.springsource.com/MRKT/spring-metrics/Spring_Insight_Preview-final2.mov):

[![tc Server Developer Edition Screencast](http://blog.springsource.com/wp-content/uploads/2009/10/tcServerDeveloperEditionScreenCast.png "tcServerDeveloperEditionScreenCast")](http://s3.springsource.com/MRKT/spring-metrics/Spring_Insight_Preview-final2.mov)

We think this tool is valuable for both developers and QA who want to get runtime visibility into the application’s inner workings. Spring Insight gives QA engineers a rear view mirror. They can test their application as normal, and when they experience a problem simply navigate to Spring Insight to see the cause.

## Now for some technical goodies..

Spring Insight uses AspectJ to load-time weave your web application. This means that you are not required to make any changes to your application to use Spring Insight. Zero.

Spring Insight collects its data in memory and does not require a database or disk access -- this makes it trivial to try out! When deploying an application to Spring Insight, you will need to give it more memory to accommodate the storage of traces, response times, etc. As the internal limits are reached, Spring Insight will discard traces to keep the memory footprint low. It provides configuration options to tune the memory footprint.

Spring Insight should not to be used in production. It has no concept of security and is able to display sensitive, low-level information.

The Application Health provides some very useful information about response times. All web requests are grouped by the Spring MVC controller which ultimately handled the request. These groupings are called Endpoints and represent the major points of entry into the application. The Preview release only supports Spring MVC endpoints, but we plan on adding a lot more types before the final release.

That brings me to a nice feature of the architecture: pluggability. The ability to analyze Hibernate or JDBC or Spring-MVC all comes from a set of plugins which get dropped into a directory within tc Server. We had numerous requests during SpringOne 2GX to open up this plugin architecture & give people access to write their own plugins. This is a high priority for us, and something we will work on for future releases.

The project is moving quickly and the feedback we’ve received has been excellent. Please [give it a shot](http://www.springsource.com/products/tc-server-developer-edition-preview) and [let us know what you think](http://forum.springsource.org/forumdisplay.php?f=71). Definitely let us know if it didn’t work with your application.

Performance insight, here we come!