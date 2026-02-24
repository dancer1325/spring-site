---
title: This Week in Spring - May 14, 2013
source: https://spring.io/blog/2013/05/15/this-week-in-spring-may-14-2013
scraped: 2026-02-24T08:05:29.568Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  May 15, 2013 | 0 Comments
---

# This Week in Spring - May 14, 2013

_Engineering | Josh Long |  May 15, 2013 | 0 Comments_

Welcome to another installment of *This Week in Spring*! Some rather exciting projects have been announced this week, and if you can believe it, we're almost out of [SpringOne 2012 replay content](https://springone2gx.com/conference/washington/2012/10/video_list)! Good thing the SpringOne 2013 agenda grid is going live very soon, so we'll be able to look ahead. As usual, we've got a *lot* to cover so let's get to it!

In preparation for the agenda grid going live, a lot of new SpringOne 2013 sessions have been accepted:

-   [Getting Started with Spring Security 3.2](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29451) (Rob Winch)
-   [Performance-tuning the Spring Petclinic sample application](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29447) (Julien Dubois - Ippon Technologies)
-   [Spring with Immutability](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29448) (Matt Stine)
-   [Going Beyond Dependency Injection](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29449) (Mark Secrist)
-   [Tooling for Spring's next generatio](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29450)n (Martin Lippert, Andy Clement)
-   [Futures and Rx Observables: powerful abstractions for consuming web services asynchronously](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29446) (Chris Richardson)
-   [Making Connections with Spring Social](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29416) (Craig Walls)
-   [Troubleshooting Live Java Web Applications](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29417) (Ashley Puls - New Relic)
-   [Spring and Sencha - A Match Made In Heaven, or at least the Cloud](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29430) - (Jay Marshall + TBA, Sencha)
-   [In-memory data and compute on top of Hadoop](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29424) (Jags Ramnarayan)
-   [Getting started with Spring Data and Apache Hadoop](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29423) (Thomas Risberg)
-   [Inside Cloud Foundry: An Architectural Review](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29427) - (Dekel Tankel)
-   [Build Your Very Own Private Cloud Foundry](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29426) (Matt Stine)
-   [Thymeleaf: improving your Spring view layer with natural templates](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29453) (Emanuel Rabina - HP)

1.  [Jon Brisbin announced the Reactor project](http://blog.springsource.org/2013/05/13/reactor-a-foundation-for-asynchronous-applications-on-the-jvm/). The Reactor project aims to provide a solid foundation for asynchronous IO-based applications, on top of which it is natural to provide integrations for technologies like Grails and Spring. Reactor already features a good multi-language story with support for Groovy and Java (and, particularly, the upcoming Java 8 release!) Be sure to check this out, especially the comments section if you have questions about how this compares to other asynch technology!
2.  Spring Security lead [Rob Winch](http://twitter.com/rob_winch) has been busily enhancing the Spring Security and Spring Security OAuth Java Configuration story. He's got a [first cut of the Spring Security OAuth Java Configuration API](https://github.com/SpringSource/spring-security-javaconfig/tree/master/spring-security-oauth2-javaconfig) available, and I'm sure he'd appreciate any feedback on the new DSL, so definitely be sure to check it out! Nice work, Rob!
3.  **Webinar on Thursday May 16th with Chris Richardson, author of POJOs in Action**, on Decomposing Application for Deployability and Scalabilty. [Register Now!](http://www.springsource.org/node/22601)

-   This is an essential talk to understanding the [new application architectures discussed in the SpringOne 2012 keynote](http://www.youtube.com/watch?v=8WCSfTE-X38) - how to break down large applications into small, scalable, discrete services. It's tough not to use [NetFlix's Asgard](http://www.slideshare.net/joesondow/asgard-the-grails-app-that-deploys-netflix-to-the-cloud) as a great example of this done well, an example that many of you may recognize.

5.  Join Broadleaf Commerce's Andre Azzolini for a Webinar on Tuesday, May 28th as they discuss their [Lessons Learned Moving from GWT to SpringMVC](http://www.springsource.org/node/22602).
6.  Paul Chapman introduces some of [the diverse support for content negotiation in Spring MVC](http://blog.springsource.org/2013/05/11/content-negotiation-using-spring-mvc/) on the SpringSource blog.
7.  Chris Harris's talk, the [Spring Data MongoDB Project](http://www.springsource.org/node/22607), from SpringOne2GX 2012 is now available in HD on YouTube!
8.  Lee Faus's talk, [Extreme Makeover - Application Edition](http://www.springsource.org/node/22607), from SpringOne2GX 2012 is now available HD on YouTube!
9.  The *JIWHIZ* blog, and blogger Yuan Ji, has put together a nice post introducing [Spring's Java configuration support](http://www.jiwhiz.com/post/2013/5/Spring_Application_without_XML_Config).
10.  This post - from blogger Chris Wong in a January post called "*[`JmsTemplate` is not evil](http://chriswongdevblog.blogspot.com/2013/01/jmstemplate-is-not-evil.html)*" - explains some of the subtleties of using Spring's `CachingConnectionFactory` with a raw `ConnectionFactory` and then, for *extra* points, introduces one approach to dramatically speeding up [ActiveMQ](http://activemq.apache.org), in particular.  
     
11.  The HMKcode blog has a nice, exhaustive post introducing how to use the [`jQuery-file-upload` plugin with Spring MVC](http://hmkcode.com/spring-mvc-jquery-file-upload-multiple-dragdrop-progress/).
12.  Have you taken a look at [HATEOAS](http://en.wikipedia.org/wiki/HATEOAS) yet? HATEOAS is a design pattern, an approach, for building better RESTful web services. Spring HATEOAS makes doing so dead simple atop Spring MVC, and [this blog by Geraint Jones introduces Spring HATEAOS very nicely](http://city81.blogspot.com/2013/05/spring-mvc-and-hateoas-constraint.html)
13.  Blogger Alexey Zvolinskiy answers a common question: how do [I bind checkboxes to the model object that's sent back and forth to the server in Spring MVC](http://www.javacodegeeks.com/2013/05/spring-mvc-form-handling-vol-3-checkboxes-processing.html)?
14.  Our friend [@baeldung](https://twitter.com/baeldung) maintains a daily Twitter feed of awesome posts about [Spring on StackOverflow](https://twitter.com/SpringAtSO), and I think he's dug up some absolutely amazing content. One post answers a question I am frequently asked: [*how do I enumerate all the Spring MVC `@Controller`\-annotated beans at runtime?*](http://stackoverflow.com/questions/10898056/how-to-find-all-controllers-in-spring-mvc)
15.  Another great post that I found while trawling through the @SpringAtSO handle was this post, explaining how to propagate request-scoped attributes beyond the thread of the current request. This post applies generally to any situation where [a request-scoped attribute needs to propagate beyond its original thread and request](http://stackoverflow.com/questions/1528444/accessing-scoped-proxy-beans-within-threads-of).