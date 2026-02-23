---
title: Access API Moves to Spring Security Access
source: https://spring.io/blog/2025/09/09/access-api-moves-to-spring-security-access
scraped: 2026-02-23T07:31:32.818Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Cummings |  September 09, 2025 | 0 Comments
---

# Access API Moves to Spring Security Access

_Engineering | Josh Cummings |  September 09, 2025 | 0 Comments_

[Five years ago](https://github.com/spring-projects/spring-security/commit/34b4b1054fe11f43436dec9c93623db8338b3ac9), Spring Security began the journey of modernizing [its authorization API](https://docs.spring.io/spring-security/reference/features/authorization/index.html). This has paved the way for a number of exciting features like [Authorized POJOs](https://docs.spring.io/spring-security/reference/servlet/authorization/method-security.html#authorize-object), [value masking](https://docs.spring.io/spring-security/reference/servlet/authorization/method-security.html#fallback-values-authorization-denied), and, planned for Spring Security 7, [Multi-Factor Authentication](https://github.com/spring-projects/spring-security/pull/17775).

This also deprecated the majority of the Access API. The Access API comprises the family of components in the Spring Security `access` packages; for example, `AccessDecisionManager`, `AccessDecisionVoter`, and `FilterSecurityInterceptor`. It also includes `@EnableGlobalMethodSecurity` and other related configuration components.

The numerous benefits to this evolution are detailed on Spring Security's reference guide. It also includes [a number of](https://docs.spring.io/spring-security/reference/servlet/authorization/authorize-http-requests.html#migrate-authorize-requests) [migration hints](https://docs.spring.io/spring-security/reference/servlet/authorization/method-security.html#migration-enableglobalmethodsecurity) for moving from one API to the other.

In order to give more time to organizations to migrate while also further encouraging updating to the latest, Spring Security 7.0.0-M3 will introduce a new module, `spring-security-access`, which will contain the deprecated portions of the Access API.

This is an optional dependency, and is only needed if you are still using `AccessDecisionManager`, `AccessDecisionVoter`, `FilterSecurityInterceptor`, `@EnableGlobalMethodSecurity` and the like. In this case, you can add `spring-security-access` as a dependency in your POM:

```xml
Copy<dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-access</artifactId>
</dependency>
```

If you are already using `AuthorizationManager`, then your application needn't change.