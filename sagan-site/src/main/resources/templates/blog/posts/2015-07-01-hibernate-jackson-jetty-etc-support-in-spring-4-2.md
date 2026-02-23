---
title: Hibernate, Jackson, Jetty etc support in Spring 4.2
source: https://spring.io/blog/2015/07/01/hibernate-jackson-jetty-etc-support-in-spring-4-2
scraped: 2026-02-23T19:47:49.014Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  July 01, 2015 | 9 Comments
---

# Hibernate, Jackson, Jetty etc support in Spring 4.2

_Releases | Juergen Hoeller |  July 01, 2015 | 9 Comments_

Spring is well-known to actively support the latest versions of common open source projects out there, e.g. [Hibernate](http://hibernate.org/) and [Jackson](https://github.com/FasterXML/jackson) but also common server engines such as [Tomcat](http://tomcat.apache.org/) and [Jetty](http://www.eclipse.org/jetty/). We usually do this in a backwards-compatible fashion, supporting older versions at the same time - either through reflective adaptation or through separate support packages. This allows for applications to selectively decide about upgrades, e.g. upgrading to the latest Spring and Jackson versions while preserving an existing Hibernate 3 investment.

With the upcoming Spring Framework 4.2, we are taking the opportunity to support quite a list of new open source project versions, including some rather major ones:

-   Hibernate ORM 5.0
-   Hibernate Validator 5.2
-   Undertow 1.2 / WildFly 9
-   Jackson 2.6
-   Jetty 9.3
-   Reactor 2.0
-   SockJS 1.0 final
-   Moneta 1.0 (the JSR-354 Money & Currency reference implementation)

While early support for the above is shipping in the Spring Framework 4.2 RCs already, the ultimate point that we're working towards is of course [4.2 GA - rescheduled for July 30th](https://jira.spring.io/browse/SPR/fixforversion/14954). At this point, we're eagerly waiting for Hibernate ORM 5.0 and Hibernate Validator 5.2 to GA (both of them are currently at RC1), as well as WildFly 9.0 (currently at RC2) and Jackson 2.6 (currently at RC3). Tight timing... By our own 4.2 GA on July 30th, we'll keep supporting the latest release candidates, rolling any remaining GA support into our 4.2.1 if necessary.

If you'd like to give some of those current release candidates a try with Spring, let us know how it goes. Now is a perfect time for such feedback towards Spring Framework 4.2 GA!

**Update: WildFly 9.0 is final now. If you have a chance to test Spring Framework 4.2 RC2 on it, please let us know how it goes in time for our 4.2 RC3 (July 15)! Hibernate ORM 5.0 RC2 is available in the meantime as well, with our 4.2 RC3 shipping against it.**

*P.S.: Note that you may of course keep using e.g. Hibernate ORM 3.6+ and Hibernate Validator 4.3+ even with Spring Framework 4.2. A migration to Hibernate ORM 5.0 in particular is likely to affect quite a bit of your setup, so we only recommend it in a major revision of your application, whereas Spring Framework 4.2 itself is designed as a straightforward upgrade path with no impact on existing code and therefore immediately recommended to all users.*