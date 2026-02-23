---
title: Spring Vault 1.1.0 GA and 2.0.0 M3 available
source: https://spring.io/blog/2017/10/06/spring-vault-1-1-0-ga-and-2-0-0-m3-available
scraped: 2026-02-23T16:19:40.434Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  October 06, 2017 | 0 Comments
---

# Spring Vault 1.1.0 GA and 2.0.0 M3 available

_Releases | Mark Paluch |  October 06, 2017 | 0 Comments_

On behalf of the community, I’m pleased to announce the general availability of Spring Vault 1.1.0 and the third milestone of Spring Vault 2.0, available from Maven Cental respective the milestone repository.

Highlights of Spring Vault 1.1 GA release are:

-   Pull-mode support for AppRole authentication.
    
-   Vault login using via AWS IAM.
    
-   Support of batch transit operations.
    
-   Rotation of generic secrets based on their lease duration.
    
-   Introduction of `VaultEndpointProvider` to configure endpoints dynamically.
    

Looking at Spring Vault 2.0 M3 you will find the following enhancements:

-   [Vault repositories](https://docs.spring.io/spring-vault/docs/2.0.0.M3/reference/html/#vault.repositories) via `@EnableVaultRepositories` built on top of Spring Data KeyValue.
    
-   Support to create and modify Vault’s policies represented as JSON.
    

### [](#whats-next)[](#what-s-next)What’s next?

We’re shifting development towards the 2.x branch line resulting in Spring Vault 1.1 GA to be the last minor release of the 1.x branch. Spring Vault 1.1 will see maintenance releases until reaching its end of life. We will polish up the reactive support in the next Spring Vault 2.0 milestone, that will be actually a release candidate.

For a complete list of changes see the changelogs of [1.1.0 RELEASE](http://docs.spring.io/spring-vault/docs/1.1.0.RELEASE/changelog.txt) and [2.0.0 M3](http://docs.spring.io/spring-vault/docs/2.0.0.M3/changelog.txt).

[Project Page](http://projects.spring.io/spring-vault/) | [GitHub](https://github.com/spring-projects/spring-vault) | [Issues](https://github.com/spring-projects/spring-vault/issues) | [Documentation for 1.1.0 RELEASE](http://docs.spring.io/spring-vault/docs/1.1.0.RELEASE/reference/html/) | [Documentation for 2.0.0 M3](http://docs.spring.io/spring-vault/docs/2.0.0.M3/reference/html/) | [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-vault)