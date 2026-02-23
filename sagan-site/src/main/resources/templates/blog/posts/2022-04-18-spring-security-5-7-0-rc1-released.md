---
title: Spring Security 5.7.0-RC1 released
source: https://spring.io/blog/2022/04/18/spring-security-5-7-0-rc1-released
scraped: 2026-02-23T12:44:38.813Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Marcus Hert Da Coregio |  April 18, 2022 | 0 Comments
---

# Spring Security 5.7.0-RC1 released

_Releases | Marcus Hert Da Coregio |  April 18, 2022 | 0 Comments_

On behalf of the community, I’m pleased to announce the release of Spring Security 5.7.0-RC1!

In addition to dependency upgrades, bug fixes, and minor enhancements, the release candidate contains a few noteworthy changes:

-   Introduced [SecurityContextHolderFilter](https://docs.spring.io/spring-security/reference/5.7/servlet/authentication/persistence.html#securitycontextholderfilter) - Ability to require explicit saving of the SecurityContext
    
-   Added DSL support for [Cross Origin Policies headers](https://docs.spring.io/spring-security/reference/5.7/servlet/exploits/headers.html#servlet-headers-cross-origin-policies)
    
-   Allow configuring [PKCE for confidential clients](https://github.com/spring-projects/spring-security/issues/6548)
    
-   Added SAML 2.0 Login & Single Logout XML support
    

This release candidate is a good opportunity to give feedback before the actual GA release in mid-May. We look forward to hearing from you.

You can find the complete details in the [release notes](https://github.com/spring-projects/spring-security/releases/tag/5.7.0-RC1).