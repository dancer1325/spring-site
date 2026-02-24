---
title: This Week in Spring  - March 27th, 2012
source: https://spring.io/blog/2012/03/28/this-week-in-spring-march-27th-2012
scraped: 2026-02-24T08:24:17.767Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  March 28, 2012 | 0 Comments
---

# This Week in Spring  - March 27th, 2012

_Engineering | Josh Long |  March 28, 2012 | 0 Comments_

Welcome to another installation of *This Week in Spring*. As usual, we have a lot to cover. As this post goes up, the [Cloud Foundry Open Tour](http://opentour.cloudfoundry.com/) is underway [in Beijing](http://opentour.cloudfoundry.com/2012/beijing), and coming to a city near you, soon. This show's a very unique opportunity to learn more about Cloud Foundry and Spring from the experts - don't miss out, register today.

1.  Spring web dude [Rossen Stoyanchev](http://www.springone2gx.com/conference/speaker/rossen_stoyanchev) announced that [Spring Web Flow 2.3.1 has been released](http://www.springsource.org/node/3516). This is a maintenance release featuring an upgrade to Spring 3.1.1, and JavaServer Faces 2.1.7 along with a number of bug fixes.
2.  SpringSource Tool Suite lead [Martin Lippert](http://www.springone2gx.com/conference/speaker/martin_lippert) announced the release of the [Cloud Foundry Integration for Eclipse 1.0](http://www.springsource.org/node/3515). This release brings a complete, cohesive [Cloud Foundry](http://www.cloudfoundry.org) integration for all Eclipse distributions, including the [SpringSource Tool Suite](http://www.springsource.com/developer/sts).
3.  [Martin](http://www.springone2gx.com/conference/speaker/martin_lippert) *also* announced the release of [SpringSource Tool Suite release, 2.9.1](http://www.springsource.org/node/3514), featuring new features and bug fixes.

```
Copy<LI>    <a href = "http://www.springone2gx.com/conference/speaker/mark_fisher">Mark Fisher</A> and <a href = "http://www.springone2gx.com/conference/speaker/thomas_risberg">Thomas Risberg</A>'s epic talk from <a href = "http://www.springone2gx.com">SpringOne 2GX 2011</A>  - <EM><A href = "http://www.infoq.com/presentations/Architecture-Choices-for-Scalable-Cloud-Apps">Architecture Choices for Scalable Cloud Apps</A></EM> -  that introduces how to build scalable architectures in the cloud using technologies like Spring Integration and Cloud Foundry is now up on InfoQ. 
	  </LI>
	
```

5.  Maciej Walkowiak has a blog that introduces how to use [Spring 3.1 profiles in conjunction with some custom Tomcat configuration to activate Spring profiles](http://maciejwalkowiak.pl/blog/2012/03/27/spring-3-1-profiles-and-tomcat-configuration/) without changing the deployed binary.
6.  Michal Jastak has put together a wonderful post introducing how to use [Spring MVC 3.1's support for *flash attributes*](http://java.dzone.com/articles/spring-mvc-flash-attributes).
7.  Tobias Flohre is at it again, this time with two posts on [Spring Batch](http://www.springsource.org/spring-batch). The first post introduces [the basics of transactions in Spring Batch](http://blog.codecentric.de/en/2012/03/transactions-in-spring-batch-part-1-the-basics/), and the second post introduces some of the [finer points of restarting cursor-based readers and writers](http://blog.codecentric.de/en/2012/03/transactions-in-spring-batch-part-2-restart-cursor-based-reading-and-listeners/).
    
    ```
    Copy </LI> 
    ```
    
8.  Artur Mkrtchyan has a great post introducing both how to install [Redis](http://redis.io/) (a fast, highly optimized data-structure server) and how to use [Spring Data Redis](http://www.springsource.org/spring-data/redis) (part of the Spring Data umbrella project that facilitates access to the wide varieties of so-called NoSQL and big-data stores) [to build Spring applications that talk to Redis](http://java.dzone.com/articles/spring-data-redis-0).
9.  Vijay Rawat has a detailed post introducing [how to use Memcached in your Spring applications to acheive session replication](http://xebee.xebia.in/2012/03/24/handling-session-failover-on-a-load-balanced-tomcat-using-memcached/#more-12863). This approach relies on the developer specifically delegating to Memcached for Session persistence in his code. While this works, I hope that users will take a look at more transparent options. Tomcat supports pluggable session storage engines. There are numerous available implementations, including a [Redis-based implementation](http://www.atlas365.com/blog/2011/redis-sessions-store-for-tomcat) and a [GemFire-based implementation](http://community.gemstone.com/display/gemfire/HTTP+Session+Management+Module).
10.  Speaking of Apache Tomcat, blogger Ramki has an interesting post introducing how to setup [virtual hosts ("vhosts") using Apache Tomcat, Apache and ModJK](http://www.ramkitech.com/2012/03/virtual-host-apache-httpd-server-tomcat.html).