---
title: Spring Vault 2.3 M1 available
source: https://spring.io/blog/2020/09/15/spring-vault-2-3-m1-available
scraped: 2026-02-23T13:48:35.470Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  September 15, 2020 | 0 Comments
---

# Spring Vault 2.3 M1 available

_Releases | Mark Paluch |  September 15, 2020 | 0 Comments_

On behalf of the community, I’d like to announce the availability of the first Spring Vault milestone release `2.3.0-M1` of the 2.3 development line.

Most notable changes in this release are:

-   Support for Vault’s [Transform secrets backend](https://www.vaultproject.io/docs/secrets/transform). Please note that this is an enterprise feature.
    
-   A `ReactiveVaultEndpointProvider` for non-blocking lookup of `VaultEndpoint` that can be used for reactive service discovery.
    
-   `VaultKeyValueMetadataOperations` for Key-Value metadata interaction.
    
-   Updates to our documentations specifically on how to use Vault’s various secret backends with Spring Vault.
    

For a complete list of changes see the [2.3.0-M1 changelog](http://docs.spring.io/spring-vault/docs/2.3.0-M1/changelog.txt).

[Project Page](http://projects.spring.io/spring-vault/) | [GitHub](https://github.com/spring-projects/spring-vault) | [Issues](https://github.com/spring-projects/spring-vault/issues) | [Documentation for 2.3.0-M1](http://docs.spring.io/spring-vault/docs/2.3.0-M1/reference/html/) | [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-vault)