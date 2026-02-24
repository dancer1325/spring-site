---
title: Spring Integration 4.0 Milestone 2 is Now Available
source: https://spring.io/blog/2013/12/18/spring-integration-4-0-milestone-2-is-now-available
scraped: 2026-02-24T07:48:43.049Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gary Russell |  December 18, 2013 | 0 Comments
---

# Spring Integration 4.0 Milestone 2 is Now Available

_Releases | Gary Russell |  December 18, 2013 | 0 Comments_

Following the recent [3.0.0.RELEASE](https://spring.io/blog/2013/12/16/spring-integration-3-0-release-is-now-available), we are pleased to announce that the second (first public) milestone of Spring Integration 4.0 is now available.

As mentioned in the [3.0 Release Candidate Announcement](https://spring.io/blog/2013/11/27/spring-integration-3-0-release-candidate-1-is-now-available) the recent Spring Integration 3.0 release is fully compatible with Spring Framework 4.0, but it does not use the **spring-messaging** module. This allows Spring Integration 3.0 to be used with earlier versions of Spring Framework.

The 4.0 stream from which this milestone is built replaces all the core Spring Integration messaging abstractions with those in the spring-messaging module. The reason for another major release so soon after 3.0 is based on the fact that existing applications that directly use the affected SI classes in their code will need to convert to the Spring Framework abstractions. For the most part, this just means package changes in *import* statements, but full details are provided in the [Migration Guide](https://github.com/spring-projects/spring-integration/wiki/Spring-Integration-3.0-to-4.0-Migration-Guide). Users who don't directly reference the classes, and use the namespace support for all configuration, will not be affected.

This early milestone is functionally equivalent to the recent [3.0.0.RELEASE](https://spring.io/blog/2013/12/16/spring-integration-3-0-release-is-now-available) and is provided for those users that want to develop against Spring Framework 4 and/or directly process STOMP messages with a Spring Integration flow.

Changes since 3.0.0.RELEASE can be seen in the [release notes](https://jira.springsource.org/secure/ReleaseNote.jspa?projectId=10121&version=14287).

The master [Github branch](https://github.com/spring-projects/spring-integration) is now for 4.0 development; the 3.0 code base can be found on the [3.0.x branch](https://github.com/spring-projects/spring-integration/commits/3.0.x).