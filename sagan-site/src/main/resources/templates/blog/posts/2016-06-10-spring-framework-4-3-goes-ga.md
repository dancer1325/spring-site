---
title: Spring Framework 4.3 goes GA
source: https://spring.io/blog/2016/06/10/spring-framework-4-3-goes-ga
scraped: 2026-02-23T19:09:15.306Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  June 10, 2016 | 19 Comments
---

# Spring Framework 4.3 goes GA

_Releases | Juergen Hoeller |  June 10, 2016 | 19 Comments_

Dear Spring community,

I'm pleased to announce that Spring Framework 4.3 GA (a.k.a. 4.3.0.RELEASE) is now available from [repo.spring.io](https://repo.spring.io) as well as Maven Central!

In addition to the feature themes mentioned in my [4.3 RC1 announcement](https://spring.io/blog/2016/04/06/spring-framework-4-3-goes-rc1), the GA release covers compatibility with several recent third-party releases, in particular: Hibernate ORM 5.2, Jackson 2.8, Netty 4.1, Undertow 1.4, and Tomcat 8.5.2 / 9.0 M6. Also, please note that our Hibernate 3.x support is finally deprecated (even [Hibernate 4.x is not actively supported by Red Hat anymore](http://in.relation.to/2015/10/27/great-jira-cleanup-2015/)) and that Spring 4.3's Jackson support requires Jackson 2.6+ now.

Spring Framework 4.3 is designed as a straightforward upgrade for all 4.x users. We will keep supporting the 4.2.x line until the end of this year; however, we recommend an upgrade to 4.3 at your earliest convenience. As previously hinted at, *the 4.3.x line will enjoy an extended support life until 2019*, within the general Spring Framework 4 system requirements (JDK 6+, Servlet 2.5+) but with a focus on recent servers such as Tomcat 8 and WebSphere 8.

Next up: Spring Framework 5.0, with a first milestone to arrive towards the end of July, just in time for our [SpringOne Platform](https://springoneplatform.io/) conference in Las Vegas!

Cheers, Juergen