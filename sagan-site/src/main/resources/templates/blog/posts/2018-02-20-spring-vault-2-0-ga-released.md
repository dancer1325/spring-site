---
title: Spring Vault 2.0 GA released
source: https://spring.io/blog/2018/02/20/spring-vault-2-0-ga-released
scraped: 2026-02-23T16:08:50.833Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  February 20, 2018 | 0 Comments
---

# Spring Vault 2.0 GA released

_Releases | Mark Paluch |  February 20, 2018 | 0 Comments_

On behalf of the community, I'm pleased to announce the general availability of Spring Vault 2.0. Since the first efforts for Spring Vault 2.0, it has been a 10 months ride until we reached this GA release. These are the most significant changes in Spring Vault 2.0:

-   Upgrade to Java 8 and Spring Framework 5.
-   Reactive Support.
-   Improved null-safety by providing JSR-305 annotated API.
-   Vault repository support through Spring Data KeyValue repositories.
-   Kubernetes, AWS ECS/IAM authentication.
-   RoleId/SecretId unwrapping for AppId authentication.
-   Spring Security integration with `VaultBytesEncryptor` and `VaultRandomBytesKeyGenerator`.

This release is compatible with Vault version from `0.5.2` up to `0.9.3` and will be picked up by Spring Cloud Vault `2.0 M6` for your convenience.

## [](#outlook)Outlook

We're aiming towards a 2.0 release with Spring Cloud Vault to provide full interoperability with the upcoming Spring Boot 2.0 release. Besides that, we want to support Google Cloud authentication and add support for the [JOSE/JWT backend](https://github.com/hashicorp/vault/issues/1986) once it arrives in Vault.

For a complete list of changes see the [changelog](http://docs.spring.io/spring-vault/docs/2.0.0.RELEASE/changelog.txt).

[Project Page](http://projects.spring.io/spring-vault/) | [GitHub](https://github.com/spring-projects/spring-vault) | [Issues](https://github.com/spring-projects/spring-vault/issues) | [Documentation](http://docs.spring.io/spring-vault/docs/2.0.0.RELEASE/reference/html/) | [Examples](https://github.com/mp911de/spring-cloud-vault-config-samples/) | [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-vault)