---
title: Spring Integration 4.3 GA is Available
source: https://spring.io/blog/2016/06/14/spring-integration-4-3-ga-is-available
scraped: 2026-02-23T19:13:25.997Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  June 14, 2016 | 1 Comment
---

# Spring Integration 4.3 GA is Available

_Releases | Artem Bilan |  June 14, 2016 | 1 Comment_

Dear Spring community,

I’m pleased to announce that Spring Integration Framework 4.3 GA is now available from [repo.spring.io](https://repo.spring.io), as well as Maven Central! Also the maintainance 4.2.8 version has been released, too. Together with an internal 4.2.7 release it includes some [important bug fixes](https://jira.spring.io/issues/?jql=project%20%3D%20%22Spring%20Integration%22%20AND%20fixVersion%20in%20\(%224.2.7%22%2C%20%224.2.8%22\)%20%20ORDER%20BY%20fixVersion%2C%20priority%20DESC).

In addition to the feature themes mentioned in [4.3 RC1 announcement](https://spring.io/blog/2016/05/12/spring-integration-4-3-0-release-candidate-available), the GA release includes several major changes:

-   Upgrade to Spring Framework 4.3 GA, Spring AMQP 1.6 GA, Spring Security 4.1 GA;
    
-   The `FtpRemoteFileTemplate` now provides `ExistsMode` option to control how an `exists()` operation should work;
    
-   The `FileSplitter` lets represent `FileMarker` object as a JSON string (`markersJson` option) to avoid an additional `spring-integration-file` dependency on the consumer applications in distributed environments;
    
-   A new `JdbcLockRegistry` feature has been introduced. Special thanks to [Dave Syer](https://spring.io/team/dsyer)!
    
-   The Integration `Graph` has been improved with generic gateway nodes and `LinkNode` now has a `type` (`input`, `output`, `error`, `discard`, `route`) property for better visualization experience;
    
-   Other minor improvements and simple and not only ([`WebSocketStompSessionManager.connect`](https://jira.spring.io/browse/INT-4044)) bug fixes.
    

The release addresses [over 150 JIRA issues](https://jira.spring.io/issues/?jql=project%20%3D%20%22Spring%20Integration%22%20AND%20fixVersion%20in%20\(%224.3%20M1%22%2C%20%224.3%20M2%22%2C%20%224.3%20RC1%22%2C%20%224.3%20GA%22\)%20%20ORDER%20BY%20fixVersion%2C%20priority%20DESC). Also see the [What’s New](http://docs.spring.io/spring-integration/docs/4.3.0.RELEASE/reference/html/whats-new.html) for a summary of the major changes. We are very grateful for a number of external contributions to the project - thank you all!.

And as a teaser, not related to the release, but a new cool feature from legendary [Andy Clement](https://spring.io/team/aclement) - [Spring Flo](https://github.com/spring-projects/spring-flo) for Spring Integration. This project is fully based on our latest Integration Graph JSON model and lets to visualize an integration model and refresh it at runtime:

![SpringFlo.png](https://lh3.googleusercontent.com/KDR2qQ9l-PmBe7gBzPHXaJ8n1WitlAq4n8GVUvt3SHBfMOvzWWGpsz8j1UN73u8ecPYKPVOuclP_sJ5bANPLeYSHBP2PhH0-xT-qgpzF6wvNGa80R_ng7xSMAQDUdm7sWMYIMaE9Orjr7ZmEEhpLQWzEwKYD1GkXtjiRC9ibxEkRWeI_TACTCEg-648ke-ZehC2glqTUYiBXp-k8q3AmacOnRlZMXrvbbskrNi3VaCpWFEMpQssPhHrk82gFe56rY8lydGaLTKwwRhtLfGyc0_uQQKYXJTkQaBKzU258tNbbpJ4fwhpB8gaL-f5Jk7yn-1EG-BReRtzWZVMEsxvkjUMlX6PDpaEoCDTQRaN2zh3B1alS_TNhi_QAYEkAGvuDshg-LBFaFadxRnAua-oSazvDpVuoLKXf_4aYR_gpIA1LrYFs4k598khDXareUElgFB62STFUPAXGEX1qbAT0_VAYI_qPVXso39VMlQ9hgUkFCPtjCyW5LlDjaDPvF9gKDyZR6fs1TAYc-9rN45zozMZ8KiGl3TMkGo4sn-5sWS3GCTmiHVb5ihdkfqoXOtr5IcTi0kLuN3oM58_0M-F4TQPGyYxWeW0=w1237-h691-no)

The work is still in progress, so stay tuned!

Spring Integration 4.3 is designed as a straightforward upgrade for all 4.x users. We will keep supporting the 4.2.x line until the end of this year; however, we recommend an upgrade to 4.3 at your earliest convenience. As previously hinted at, *the 4.3.x line will enjoy an extended support life until 2019*, within the general Spring Framework 4 system requirements (JDK 6+, Servlet 2.5+ etc.).

Next up: Spring Integration 5.0, with Spring Framework 5.0 foundation and some Reactive Streams support. Don’t miss [SpringOne Platform](https://springoneplatform.io/) conference this August in Las Vegas to hear from us about all the new features and future plans!

[Project Page](http://projects.spring.io/spring-integration/) | [JIRA](https://jira.spring.io/browse/INT) | [Contributions](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.md) | [StackOverflow](http://stackoverflow.com) (`spring-integration` tag)