---
title: Spring Vault and Spring Cloud Vault 1.0.0.M1 are now available
source: https://spring.io/blog/2016/10/28/spring-vault-and-spring-cloud-vault-1-0-0-m1-are-now-available
scraped: 2026-02-23T19:00:06.132Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  October 28, 2016 | 0 Comments
---

# Spring Vault and Spring Cloud Vault 1.0.0.M1 are now available

_Releases | Mark Paluch |  October 28, 2016 | 0 Comments_

On behalf of the community, I am pleased to announce the first milestone releases of Spring Vault and Spring Cloud Vault `1.0.0.M1`.

The artifacts are available in the [Milestone repo](http://repo.spring.io/libs-milestone).

# [](#what-is-spring-vault-and-spring-cloud-vault)What is Spring Vault and Spring Cloud Vault?

Spring Vault is a client for [HashiCorp Vault](https://www.vaultproject.io/) that provides familiar Spring abstractions. It comes with `@VaultPropertySource` that exposes encrypted properties from Vault the `Environment` and `VaultTemplate` to access secrets stored and encrypted inside Vault.

```java
Copy@Configuration
@VaultPropertySource("secret/my-application")
public class AppConfig extends AbstractVaultConfiguration {

    /**
     * Specify an endpoint for connecting to Vault.
     */
    @Override
    public VaultEndpoint vaultEndpoint() {
        return VaultEndpoint.create("localhost", 8200);
    }

    /**
     * Configure a client authentication.
     */
    @Override
    public ClientAuthentication clientAuthentication() {
        return new TokenAuthentication("…");
    }
}
```

Spring Cloud Vault uses Spring Vault to provide a configuration integration for Spring Boot-based applications. Spring Cloud Vault provides configuration data to applications that is encrypted inside Vault. Applications using Spring Cloud Vault can request generated credentials from Vault for various database and service integrations, like MySQL, MongoDB, Consul, AWS, and many more. On application shutdown, these credentials are revoked and no longer valid.

Adding the `spring-cloud-vault-starter-config` dependency and supplying Vault connection details to the `bootstrap` configuration is sufficient to get started with Spring Cloud Vault.

```xml
Copy<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-vault-starter-config</artifactId>
        <version>1.0.0.M1</version>
    </dependency>
</dependencies>
```

```yaml
Copyspring.cloud.vault:
    host: localhost
    authentication: (TOKEN|APPROLE|AWS_EC2|CERT|…)
    token: …
```

## [](#contributions)Contributions

Without the community, we couldn’t be the successful project we are today. I’d like to thank everyone that created issues & provided feedback.

## [](#feedback-please)Feedback Please

If you have feedback on this release, I encourage you to reach out via [StackOverflow](http://stackoverflow.com/questions/tagged/spring-vault), [GitHub Issues](https://github.com/spring-projects/spring-vault/issues), or via the comments section. You can also ping me [@mp911](https://twitter.com/mp911de) or the [@SpringCloudOSS](https://twitter.com/SpringCloudOSS) team on Twitter.

Check out any of these links for more details:

-   [Spring Vault Project page](http://projects.spring.io/spring-vault/)
-   [Spring Vault Project documentation](http://docs.spring.io/spring-vault/docs/1.0.0.M1/reference/html/)
-   [Spring Cloud Vault Project page](http://cloud.spring.io/spring-cloud-vault-config/)
-   [Spring Cloud Vault Project documentation](http://cloud.spring.io/spring-cloud-vault-config/spring-cloud-vault-config.html)
-   [Examples](https://github.com/mp911de/spring-cloud-vault-config-samples)