---
title: Spring Vault 2.3.0 RC1 available
source: https://spring.io/blog/2020/12/10/spring-vault-2-3-0-rc1-available
scraped: 2026-02-23T13:38:59.277Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  December 10, 2020 | 0 Comments
---

# Spring Vault 2.3.0 RC1 available

_Releases | Mark Paluch |  December 10, 2020 | 0 Comments_

On behalf of the community, I’d like to announce the availability of the first Spring Vault release candidate `2.3.0-RC1`.

This release contains a series of changes:

-   Updated `SecretLeaseContainer` endpoints using now `/sys/leases` instead of `/sys/revoke` and `/sys/renew`.
    
-   Introduction of `AuthenticationStepsOperator` which allows non-blocking access to `Resource`. This change also introduces a reloading capability for authentication mechanisms for PCF and Kubernetes authentication to obtain the latest credentials when attempting a Vault login.
    
-   Support for KV Patch in `VaultTemplate`
    
-   Upgrade to Spring Framework 5.3, Spring Data 2020.0, and Project Reactor 2020.0
    

For a complete list of changes, see the [`2.3.0-RC1` changelog](https://github.com/spring-projects/spring-vault/releases/tag/2.3.0-RC1). We are working towards a GA release

[Project Page](http://projects.spring.io/spring-vault/) | [GitHub](https://github.com/spring-projects/spring-vault) | [Issues](https://github.com/spring-projects/spring-vault/issues) | [Release `2.3.0-RC1` on GitHub](https://github.com/spring-projects/spring-vault/releases/tag/2.3.0-RC1) | [Documentation for `2.3.0-RC1`](http://docs.spring.io/spring-vault/docs/2.3.0-RC1/reference/html/) | [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-vault)