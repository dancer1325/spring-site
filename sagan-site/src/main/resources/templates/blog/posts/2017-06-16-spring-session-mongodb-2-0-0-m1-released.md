---
title: Spring Session MongoDB 2.0.0.M1 released
source: https://spring.io/blog/2017/06/16/spring-session-mongodb-2-0-0-m1-released
scraped: 2026-02-23T16:29:11.242Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Greg L. Turnquist |  June 16, 2017 | 0 Comments
---

# Spring Session MongoDB 2.0.0.M1 released

_Engineering | Greg L. Turnquist |  June 16, 2017 | 0 Comments_

Dear Spring Community,

Last month, Spring Session lead Rob Winch announced the release of [Spring Session 2.0.0.M1](https://spring.io/blog/2017/05/11/spring-session-2-0-0-m1-released) (notice the lack of MongoDB there?) In that post, he pared back Spring Session to officially supporting Redis, JDBC, and Hazelcast. No more MongoDB.

I’m here to announce that I’ve pick up the torch for **Spring Session MongoDB**. Managing both Spring Session *and* Spring Security (among other responsibilities), Rob couldn’t maintain high caliber support with too many data stores. Being a member of the Spring Data team, I felt better suited toward providing MongoDB support of Spring Session, so I reinstated it as a [separate project](https://github.com/spring-projects/spring-session-data-mongodb).

To catch you up on things, this release of Spring Session MongoDB is built against these key items:

-   [Spring Session 2.0.0.M2](https://spring.io/blog/2017/06/16/spring-session-2-0-0-m2-released)
    
-   [Spring Data Kay M4](https://spring.io/blog/2017/06/14/spring-data-release-train-kay-m4-released)
    
-   [Spring Framework 5.0.0.RC1](https://spring.io/blog/2017/05/08/spring-framework-5-0-goes-rc1)
    
-   [Spring Security 5.0.0.M1](https://spring.io/blog/2017/05/11/spring-security-5-0-0-m1)
    
-   Java 8
    

Important

The artifact coordinates have changed to `org.springframework.session:spring-session-data-mongodb` (notice the **db** appended to the name?)

I’m working with the Spring Boot team to have Spring Session MongoDB added to the vast collection of version-managed projects, targeting Boot 2.0. Stay tuned on that front.

In the meantime, you can get the bits today if you visit the project site, get the coordinates, and *include the version number* in your Spring Boot application.

[Project Site](http://projects.spring.io/spring-session-data-mongodb/) | [Reference](http://docs.spring.io/spring-session-data-mongodb/docs/2.0.0.M1/reference/htmlsingle/) | [Help](https://stackoverflow.com/questions/tagged/spring-session+mongodb)