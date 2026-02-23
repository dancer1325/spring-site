---
title: Spring Vault 1.0 RC1 is now available
source: https://spring.io/blog/2017/03/16/spring-vault-1-0-rc1-is-now-available
scraped: 2026-02-23T16:36:33.458Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  March 16, 2017 | 2 Comments
---

# Spring Vault 1.0 RC1 is now available

_Releases | Mark Paluch |  March 16, 2017 | 2 Comments_

On behalf of the community, I am pleased to announce Spring Vault 1.0 RC1.

The artifacts are available in the [Milestone repo](http://repo.spring.io/libs-milestone).

Spring Vault includes [15 fixes, improvements and dependency upgrades](https://github.com/spring-projects/spring-vault/milestone/5?closed=1).

Here’s a short-list of the most important features shipping with the release:

-   Support for renewable `@VaultPropertySource` with credentials rotation
-   Reshaping APIs dropping `VaultClient` and using `RestTemplate` instead
-   Added `EnvironmentVaultConfiguration` for simplified configuration without the need to create a derived configuration class.

## [](#contributions)Contributions

Without the community, we couldn’t be the successful project we are today. I’d like to thank everyone that created issues & provided feedback.

## [](#feedback-please)Feedback Please

If you have feedback on this release, I encourage you to reach out via [StackOverflow](http://stackoverflow.com/questions/tagged/spring-vault), [GitHub Issues](https://github.com/spring-projects/spring-vault/issues), or via the comments section. You can also ping me [@mp911](https://twitter.com/mp911de) or the [@SpringCloud](https://twitter.com/SpringCloud) team on Twitter.

## [](#next-steps)Next Steps

The upcoming Spring Cloud Vault Config 1.0 RC release will depend on Spring Vault RC1 and will be shipped as part of the upcoming Spring Cloud Dalston RC1 release train. Expect a GA release soon.

Check out any of these links for more details:

-   [Spring Vault Project page](http://projects.spring.io/spring-vault/)
-   [Spring Vault Project documentation](http://docs.spring.io/spring-vault/docs/1.0.0.RC1/reference/html/)
-   [Examples](https://github.com/mp911de/spring-cloud-vault-config-samples)