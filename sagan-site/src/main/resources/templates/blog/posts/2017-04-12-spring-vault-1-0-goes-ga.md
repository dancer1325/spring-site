---
title: Spring Vault 1.0 goes GA
source: https://spring.io/blog/2017/04/12/spring-vault-1-0-goes-ga
scraped: 2026-02-23T16:34:41.769Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  April 12, 2017 | 0 Comments
---

# Spring Vault 1.0 goes GA

_Releases | Mark Paluch |  April 12, 2017 | 0 Comments_

On behalf of the community, it's my pleasure to announce the general availability of Spring Vault 1.0 – the very first GA release of Spring Vault after almost a year of development.

The artifacts are available from Maven Central and Bintray.

```xml
Copy<dependency>
  <groupId>org.springframework.vault</groupId>
  <artifactId>spring-vault-core</artifactId>
  <version>1.0.0.RELEASE</version>
</dependency>
```

The release ships more than 50 tickets fixed in total. Here’s a very truncated list of the most important features shipping with the release:

-   Pluggable application authentication via AppRole, AWS-EC2, client certificates, Cubbyhole (wrapped tokens) and static tokens.
-   Support for renewable `@VaultPropertySource` with credentials rotation.
-   Lifecycle-aware session management with token renewal and re-login after terminal token expiry.
-   Template API to interact with Vault directly.
-   Compatibility with Vault 0.5 to 0.7.

## [](#contributions)Contributions

Without the community, we couldn’t be the successful project we are today. I’d like to thank everyone that created issues & provided feedback.

## [](#feedback-please)Feedback Please

If you have feedback on this release, I encourage you to reach out via [StackOverflow](http://stackoverflow.com/questions/tagged/spring-vault), [GitHub Issues](https://github.com/spring-projects/spring-vault/issues), or via the comments section. You can also ping me [@mp911](https://twitter.com/mp911de) or the [@SpringCloud](https://twitter.com/SpringCloud) team on Twitter.

## [](#next-steps)Next Steps

The upcoming Spring Cloud Vault Config 1.0 GA release will pick up Spring Vault GA and ship as part of the Spring Cloud Dalston release train.

Check out any of these links for more details:

-   [Spring Vault Project page](http://projects.spring.io/spring-vault/)
-   [Spring Vault Project documentation](http://docs.spring.io/spring-vault/docs/1.0.0.RELEASE/reference/html/)
-   [Examples](https://github.com/mp911de/spring-cloud-vault-config-samples)