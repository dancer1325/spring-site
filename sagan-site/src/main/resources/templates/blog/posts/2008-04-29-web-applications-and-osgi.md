---
title: Web Applications and OSGi
source: https://spring.io/blog/2008/04/29/web-applications-and-osgi
scraped: 2026-02-24T09:18:19.828Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Costin Leau |  April 29, 2008 | 1 Comment
---

# Web Applications and OSGi

_Engineering | Costin Leau |  April 29, 2008 | 1 Comment_

Since the first milestones of Spring Dynamic Modules, requests for running web applications in OSGi started to come in. It has been probably one of the most requested features and no wonder, once 1.0 final was released, web support has been the main focus of the 1.1 branch. I am pleased to report that, with the just [released](http://www.springframework.org/node/646) M2, as already [hinted](http://blog.springsource.com/main/2008/04/28/portability-at-the-framework-level/) by [Juergen](http://blog.springsource.com/main/author/juergenh/), Spring-DM supports not just vanilla wars (available since 1.1.0 M1) but also Spring-MVC applications running inside OSGi. In this entry, I would like to briefly discuss the typical OSGi web scenario and Spring-DM's approach. But first,

## Why deploy WARs in OSGi?

Easy question: OSGi *natively* provides versioning, package wiring and hot reloading. Imagine taking advantage of these features within your applications: you can stop embedding libraries under WEB-INF/lib and start sharing them between your web apps, avoid taglibs duplications (while keeping multiple versions running) and update, at runtime, only certain parts of your application. This is especially useful as web applications tend to be tiered and thus subject to a significant number of changes during their life cycle.

## Why are web applications in OSGi problematic?

The Servlet specification revolves around the idea of a *web container*: a runtime environment for web components that provides standard services such as life cycle management (object creation and disposal, thread allocation), concurrency, HTTP request handling and so on. The OSGi platform on the other hand, acts also as a managed environment with its Service Registry, package wiring and versioning (to name just a few). To deal with this problem, the OSGi committee designed, part of the compendium specification, the [Http Service](http://www2.osgi.org/javadoc/r4/org/osgi/service/http/HttpService.html).

*As a side note, when dealing with two managed environments, one is facing an interesting problem: what deployment model to use? That is which is be the bootstrapping platform and which one embedded? In our case, one can either deploy the OSGi platform as a WAR or deploy the web container (under some form of service), inside the OSGi platform. More about this though, in a future entry.*

This optional service provides a simple API for registering Servlets and static resources which are mapped to incoming HTTP requests. In order to have a Servlet serving requests inside OSGi, one must **programmatically** create the Servlet instance and registered it through the aforementioned API. Further more, the Http service supports only the Servlet 2.1 specification which can be quite inconvenient since filters and listeners (used by virtually all of the web frameworks today) are not available. Most (if not all) of the solutions available today (that I am aware of), for running web applications in OSGi, rely on the Http Service for their functionality. Some address the problems mentioned above using one of the following techniques (as far as I know):

-   eliminate the need for code by imposing new or translating existing declarative approaches (such as web.xml) into calls to the Http Service
-   provide Servlet 2.1+ features by building on top of the 2.1 API (for example a filter can be implemented by decorating a Servlet instance) or by extending the standard API

Both of these methods can be successful and go a long way however, in Spring-DM, we opted for a different, unique approach by:

## Integrating directly with the web container

In Spring-DM, the OSGi and container space are bridged: the WARs, deployed as usual to the web container, use the OSGi space for their class path and resource lookups. The main advantage of this approach is that to both the OSGi platform and the web container, nothing major has changed - it is just "business as usual".

With Spring-DM one gets:

-   full Servlet 2.4/2.5, JSP 2.0/2.1 spec support
-   availability of the container capabilities (blocking vs non-blocking IO, allocated threads in the thread pool and so on)
-   complete access to web.xml syntax whether it's about filters, listeners, mapping declaration, security or even jndi references. This is especially useful in cases where the container is integrated with a JTA Transaction Manager or a JMS queue. Note that Spring-DM does no parsing (we figured the container does this a *lot* better then we can)
-   container specific configuration files (such as Tomcat's META-INF/context.xml)

All of the above and much more are possible since Spring-DM deploys bundles **natively** to the chosen web container (currently Apache Tomcat 5.5.x/6.0.x and Jetty 6.1.x+ are supported out of the box). This means that it's the web container that instantiates and manages the web application and thus pretty much everything that the container supports is available to the OSGi bundles.

Though 1.1 is not yet final, I encourage you to give [M2](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=227224) a try. The [API](http://static.springframework.org/osgi/docs/current/api/)s are pretty much stable and the new features [documented](http://static.springframework.org/osgi/docs/current/reference/html/what-is-new.html#dm-1.1.x) (more to come as we approach the GA release) - if you need help, check out the Spring-DM [forum](http://forum.springframework.org/forumdisplay.php?f=43) (yes, we finally have one) and the mailing [list](http://groups.google.com/group/spring-osgi). Additionally, if you happen to be at JavaOne, stop by the SpringSource [booth](http://www.springframework.org/node/634) and you will get the answers from the source.