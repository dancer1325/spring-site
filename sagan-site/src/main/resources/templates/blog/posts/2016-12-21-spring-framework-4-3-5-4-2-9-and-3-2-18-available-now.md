---
title: Spring Framework 4.3.5, 4.2.9 and 3.2.18 available now
source: https://spring.io/blog/2016/12/21/spring-framework-4-3-5-4-2-9-and-3-2-18-available-now
scraped: 2026-02-23T18:53:31.390Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Stéphane Nicoll |  December 21, 2016 | 3 Comments
---

# Spring Framework 4.3.5, 4.2.9 and 3.2.18 available now

_Releases | Stéphane Nicoll |  December 21, 2016 | 3 Comments_

It is my pleasure to announce that the Spring Framework [4.3.5](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=10000&version=15779), [4.2.9](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=10000&version=15723) and [3.2.18](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=10000&version=15566) maintenance releases [are available now](http://projects.spring.io/spring-framework).

4.3.5 is a significant refinement release with 37 enhancements (including e.g. WebSocket support for the recently released Jetty 9.4) and several bug fixes, serving as the basis for the upcoming Spring Boot 1.4.3 release.

Please note that the 4.2.9 and 3.2.18 bug fix releases are the last in their respective line, with 4.2.x being superseded by 4.3.x now and 3.2.x reaching its EOL point. Going forward, we expect all users to upgrade to 4.3.5+ for further support.

All three releases also fix a path traversal vulnerability (CVE-2016-9878) in `ResourceServlet`. If you happen to be among its rare users, please upgrade ASAP. Note that this functionality has been superseded for years already and will get removed in 5.0, so we actually recommend a migration to Spring MVC's resource handling features within a `DispatcherServlet` setup.

[Project Page](http://projects.spring.io/spring-framework/) | [GitHub](https://github.com/spring-projects/spring-framework) | [Issues](https://jira.spring.io/browse/SPR) | [Documentation](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/htmlsingle/)