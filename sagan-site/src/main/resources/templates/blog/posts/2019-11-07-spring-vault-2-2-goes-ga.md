---
title: Spring Vault 2.2 goes GA
source: https://spring.io/blog/2019/11/07/spring-vault-2-2-goes-ga
scraped: 2026-02-23T14:26:49.961Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  November 07, 2019 | 0 Comments
---

# Spring Vault 2.2 goes GA

_Releases | Mark Paluch |  November 07, 2019 | 0 Comments_

On behalf of the community, I’m excited to announce that Spring Vault 2.2 is generally available from [repo.spring.io](https://repo.spring.io) as well as Maven Central. This release ships with several refinements and new features.

The most notable changes are:

-   Support for PCF-based authentication by using instance identity certificates.
    
-   Extensions for a seamless Kotlin 1.3 experience and Kotlin Coroutines support.
    
-   Builders for `RestTemplate` and `WebClient` to customize interceptors, filter functions, and default headers.
    
-   Vault namespace support (Vault Enterprise edition only).
    
-   A revised `@VaultPropertySource` supporting versioned key-value backends.
    
-   Added listener and events support to `LifecycleAwareSessionManager`.
    
-   Support for the Jetty HTTP Client as an alternative reactive HTTP client.
    
-   Reactive support for AWS IAM authentication.
    

Spring Vault 2.2 will be picked up by Spring Cloud Vault as part of the [Hoxton release train](https://github.com/spring-cloud/spring-cloud-release/milestone/78) for your convenience.

[Project Page](http://projects.spring.io/spring-vault/) | [GitHub](https://github.com/spring-projects/spring-vault) | [Issues](https://github.com/spring-projects/spring-vault/issues) | [Documentation](http://docs.spring.io/spring-vault/docs/2.2.0.RELEASE/reference/html/) | [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-vault)