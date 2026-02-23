---
title: Spring Integration 4.3.11 is Available
source: https://spring.io/blog/2017/07/20/spring-integration-4-3-11-is-available
scraped: 2026-02-23T16:26:57.780Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  July 20, 2017 | 0 Comments
---

# Spring Integration 4.3.11 is Available

_Releases | Artem Bilan |  July 20, 2017 | 0 Comments_

On behalf of the Spring Integration team, I am pleased to announce that the [4.3.11.RELEASE](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10121&version=16227) of Spring Integration is now available.

This release contains a few important bug fixes as well as a couple of improvements. In particular it contains a fix for the [Jackson Serialization Gadgets](https://pivotal.io/security/cve-2017-4995) vulnerability. Hence introduced in the [version 4.3.10](https://spring.io/blog/2017/06/08/spring-integration-4-3-10-is-available) custom `ObjectMapper` utility doesn’t allow now to deserialize objects in the untrusted packages. The set of trusted packages can be configured or you can use `*` to trust all. See `JacksonJsonUtils.messagingAwareMapper()` for more information.

Another useful fix is for (S)FTP Inbound Channel Adapters (and other remote file protocols, e.g. AWS S3) to rollback filtering for updated remote file when we can’t transfer it to the local copy.

This version is the default version with the Spring Boot `1.5.5` release.

[Project Page](http://projects.spring.io/spring-integration/) | [JIRA](https://jira.spring.io/browse/INT) | [Contributions](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.md) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)