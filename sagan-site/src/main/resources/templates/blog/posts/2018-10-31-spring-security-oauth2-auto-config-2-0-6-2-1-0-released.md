---
title: Spring Security OAuth2 Auto-config 2.0.6 & 2.1.0 Released
source: https://spring.io/blog/2018/10/31/spring-security-oauth2-auto-config-2-0-6-2-1-0-released
scraped: 2026-02-23T15:07:54.149Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Josh Cummings |  October 31, 2018 | 0 Comments
---

# Spring Security OAuth2 Auto-config 2.0.6 & 2.1.0 Released

_Releases | Josh Cummings |  October 31, 2018 | 0 Comments_

I’m pleased to announce on behalf of the community [Spring Security OAuth2 Boot Auto-config](https://github.com/spring-projects/spring-security-oauth2-boot) 2.0.6 and 2.1.0.

Both releases primarily deliver bug fixes and dependency version updates along with some minor improvements. Of particular note is that these align with [recent](https://github.com/spring-projects/spring-boot/releases/tag/v2.1.0.RELEASE) [releases](https://github.com/spring-projects/spring-boot/releases/tag/v2.0.6.RELEASE) of Spring Boot.

Note that for 2.1.0, gaps in configuration of keys between Resource Server and Authorization Server were brought into parity. Now, it’s possible on the Authorization Server side [to configure a single key](https://github.com/spring-projects/spring-security-oauth2-boot/issues/56):

```
Copysecurity:
  oauth2:
    authorization:
      jwt:
        key-value: ${PRIVATE_KEY}
```

similar to Resource Server configuration.

Also, some [basic support for configuring a key store](https://github.com/spring-projects/spring-security-oauth2-boot/issues/18) was added to both Resource Server and Authorization Server.

For a complete list of changes, please refer to the 2.0.6 [changelog](https://github.com/spring-projects/spring-security-oauth2-boot/milestone/14), the 2.1.0.RC1 [changelog](https://github.com/spring-projects/spring-security-oauth2-boot/milestone/12?closed=1) and the 2.1.0 [changelog](https://github.com/spring-projects/spring-security-oauth2-boot/milestone/5?closed=1).

[Project Site](https://projects.spring.io/spring-security/) | [Reference](https://docs.spring.io/spring-security-oauth2-boot/docs/current/reference/htmlsingle/) | [Help](https://stackoverflow.com/questions/tagged/spring-security)