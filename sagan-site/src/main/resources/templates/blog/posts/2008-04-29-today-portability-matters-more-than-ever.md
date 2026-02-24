---
title: Today, Portability Matters More Than Ever
source: https://spring.io/blog/2008/04/29/today-portability-matters-more-than-ever
scraped: 2026-02-24T09:18:24.198Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Juergen Hoeller |  April 29, 2008 | 0 Comments
---

# Today, Portability Matters More Than Ever

_Engineering | Juergen Hoeller |  April 29, 2008 | 0 Comments_

Yesterday, I blogged about [how Spring helps maximize application portability](http://blog.springsource.com/main/2008/04/28/portability-at-the-framework-level). Even if the portability problem has been an ongoing topic in enterprise Java land for many years, that blog was timely. Today, [Oracle announced that its $6.7 billion acquisition of BEA Systems has closed](http://www.news.com/8301-10784_3-9931219-7.html?tag=nefd.blgs). There is substantial overlap between the product sets of the two companies, so this is bound to bring uncertainty to the WebLogic and OC4J customer bases. WebLogic and OC4J may both fall into the "J2EE server" category but they are very different products with very different characteristics.

Since many enterprise applications end up integrating very closely with the hosting environment, switching a J2EE server is never a trivial task. Quite on the contrary, it may turn out to cause as much pain as switching an operating system. Common J2EE APIs such as the Servlet API are usually less of a problem, despite subtleties in configuration etc. The real problems usually hide in transaction management setup, resource access semantics, integration with external messaging providers, application-wide authentication and authorization, etc. Even the very heart of J2EE, namely JNDI as lookup mechanism, can cause a lot of issues due to different setup rules, server-specific names for EJB components, etc.

Fortunately, the many WebLogic and OC4J customers who adopted the Spring programming model are in a comfortable position. They are not only enjoying Spring-style productivity, but are well placed to manage any server migration that may lie ahead. The Spring Framework in conjunction with key portfolio products such as Spring Security allows for handling many common concerns within an enterprise application's own boundaries. Environment services are used in typical Spring delegation style, in a more specific fashion than in a standard J2EE scenario. As a consequence, moving to a different hosting environment is usually much less intrusive from the application's perspective.

We also hear from Spring users on WebSphere who appreciate those same portability benefits in the migration scenarios that they are currently facing: between different generations of the WebSphere Application Server itself (5.1 / 6.0 / 6.1 / 6.1 with EE 5 feature packs), but also between the established WebSphere Application Server and the Geronimo-based WebSphere Community Edition (which are very different products under the common WebSphere naming umbrella).

I never thought that I would be in the insurance business ;-) - but it is satisfying to see Spring helping developers deal with the changing marketplace.