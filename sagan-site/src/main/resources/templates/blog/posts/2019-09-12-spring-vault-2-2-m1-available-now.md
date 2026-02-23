---
title: Spring Vault 2.2 M1 available now
source: https://spring.io/blog/2019/09/12/spring-vault-2-2-m1-available-now
scraped: 2026-02-23T14:36:42.268Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  September 12, 2019 | 0 Comments
---

# Spring Vault 2.2 M1 available now

_Releases | Mark Paluch |  September 12, 2019 | 0 Comments_

On behalf of the community, I’m excited to announce the availability of Spring Vault 2.2 M1. This release ships with over 90 fixed tickets in total, containing several features, bug fixes, and dependency upgrades.

The most notable new changes are:

-   Support for PCF-based authentication by using instance identity certificates.
    
-   Kotlin extensions.
    
-   Builders for `RestTemplate` and `WebClient` to customize interceptors, filter functions, and default headers.
    
-   Vault namespace support (Vault Enterprise edition only).
    
-   `@VaultPropertySource` now supports versioned key-value backends.
    
-   Added listener and events support to `LifecycleAwareSessionManager`.
    
-   Support for the Jetty HTTP Client as an alternative reactive HTTP client.
    
-   Reactive support for AWS IAM authentication.
    

For a complete list of changes, see the [changelog](http://docs.spring.io/spring-vault/docs/2.2.0.M1/changelog.txt). Spring Vault 2.2 M1 is going to be picked up by Spring Cloud Vault 2.2 M3 for your convenience.

We are working towards Spring Vault 2.2 RC1, which will be available in a few weeks. We are aiming for a 2.2 GA release later this year.

[Project Page](http://projects.spring.io/spring-vault/) | [GitHub](https://github.com/spring-projects/spring-vault) | [Issues](https://github.com/spring-projects/spring-vault/issues) | [Documentation for 2.2.0.M1](http://docs.spring.io/spring-vault/docs/2.2.0.M1/reference/html/) | [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-vault)