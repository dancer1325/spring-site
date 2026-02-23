---
title: Spring Web Services 2.4.1.RELEASE / 3.0.0.RC1 released
source: https://spring.io/blog/2017/10/17/spring-web-services-2-4-1-release-3-0-0-rc1-released
scraped: 2026-02-23T16:17:26.329Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Greg L. Turnquist |  October 17, 2017 | 0 Comments
---

# Spring Web Services 2.4.1.RELEASE / 3.0.0.RC1 released

_Engineering | Greg L. Turnquist |  October 17, 2017 | 0 Comments_

Greetings Spring community,

[Spring Web Services](http://projects.spring.io/spring-ws/) now official has two branches: **master** (3.0+) and **2.x** (maintenance of the old 2.x series). The 2.x series will be maintained as long as Spring Framework 4.x is supported, yet any new work will be conducted on the master branch.

2.4.1.RELEASE is a minor patch release while 3.0.1.RC1 is a major upgrade. The links below include related tickets.

[2.4.1 Release Notes](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=10060&version=15717) | [2.4.1 Documentation](http://docs.spring.io/spring-ws/docs/2.4.1.RELEASE/reference/).

[3.0.0.RC1 Release Notes](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10060&version=15247) | [3.0.0.RC1 Documentation](http://docs.spring.io/spring-ws/docs/3.0.0.RC1/reference/).

-   3.0.0.RC1:
    
    -   Rebases Spring Web Services to run on Spring Framework 5.0 and Java 8
        
    -   Drops support for the older Apache WSS4J 1.x line covered by the **org.springframework.ws.soap.security.wss4j** package. Instead, we only support WSS4J 2.x (in the **org.springframework.ws.soap.security.wss4j2** package).
        
    -   Upgrades our XMPP library Smack support to 4.2.
        
    -   This version is planned to be picked up by Spring Boot 2.0 as well as Spring IO Platform Cairo.
        
-   2.4.1.RELEASE:
    
    -   Maintains our existing baseline of dependencies, making movements on latest supported versions of Spring Framework and Spring Security
        
    -   We’ll maintain the 2.x version as long as Spring Framework 4.x is supported.
        
    -   Based on several of the gaps between Spring Framework 4.x and 5.x, there will be no more compatibility checks of our 2.x branch against Spring Framework 5.x If you need Spring Framework 5, you really need to upgrade to our 3.x branch.
        

We’ve also adopted [CircleCI](https://circleci.com/gh/spring-projects/spring-ws) as our continuous integration solution, ensuring we can run precise versions of Java against these different versions of Spring WS. As stated in a [previous blog post](https://spring.io/blog/2016/08/29/spring-web-services-2-3-1-2-4-0-are-released), you can sleep at night know the code has been tested against your favorite version of Spring. Easy migration paths are a must for the Spring community.

The reference documentation has been migrated to Asciidoctor, meaning it’s easier than ever to make contributions on that front (for both versions). Also, the build process was moved to Maven. This may seem awkward, but the need for several profiles is critical, and with Maven, they are a first class citizen.

Note

Spring IO Platform testing is a critical component, so we are still working on migrating that phase of our acceptance testing.

[Project Page](http://projects.spring.io/spring-ws/) | [GitHub](https://github.com/spring-projects/spring-ws) | [Issues](https://jira.spring.io/browse/SWS)

The artifacts are staged on maven central and [http://repo.spring.io/](http://repo.spring.io/).

Cheers!