---
title: Update on EOL for Spring Security OAuth
source: https://spring.io/blog/2021/11/08/update-on-eol-for-spring-security-oauth
scraped: 2026-02-23T13:05:29.696Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Joe Grandja |  November 08, 2021 | 8 Comments
---

# Update on EOL for Spring Security OAuth

_Engineering | Joe Grandja |  November 08, 2021 | 8 Comments_

In May 2020, we [announced](https://spring.io/blog/2020/05/07/end-of-life-for-spring-security-oauth) that the [Spring Security OAuth](https://spring.io/projects/spring-security-oauth) (legacy) project will reach end-of-life in May 2022. The same end-of-life timeline applies to the [Spring Boot 2 auto-configuration project](https://github.com/spring-projects/spring-security-oauth2-boot).

We are now 6 months away from the EOL date, and the currently supported version branch is 2.5.x, which is limited to security fixes only.

We recently [announced](https://spring.io/blog/2021/08/19/spring-authorization-server-goes-to-production) the release of Spring Authorization Server 0.2.0, which is the first officially supported production-ready version backed by our new [support policy](https://github.com/spring-projects/spring-authorization-server/blob/main/SUPPORT_POLICY.adoc).

We encourage users to migrate their applications to Spring Authorization Server 0.2.0, as it is a direct replacement for the OAuth 2.0 Authorization Server support provided by Spring Security OAuth (legacy).