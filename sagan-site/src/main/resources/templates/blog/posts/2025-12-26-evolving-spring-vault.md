---
title: Evolving Spring Vault: Introducing VaultClient
source: https://spring.io/blog/2025/12/26/evolving-spring-vault
scraped: 2026-02-22T22:03:43.280Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Paluch |  December 26, 2025 | 0 Comments
---

# Evolving Spring Vault: Introducing VaultClient

_Engineering | Mark Paluch |  December 26, 2025 | 0 Comments_

Back in September 2016, nearly a decade ago now, we introduced Spring Vault as a integration layer for HashiCorp Vault within Spring applications, complemented by Spring Cloud Vault for Spring Boot arrangements. The core idea has always been straightforward: Externalizing secrets to encrypted Vault storage to reduce application-side complexity considerably, especially by leveraging Vault's secure primitives for communication and authentication.

`VaultTemplate` and its reactive counterpart `ReactiveVaultTemplate` have served us well, providing a familiar Java-based programming interface for interacting with Vault's various secrets engines (Key/Value, PKI, Transit, Transform, and Wrapping support). The use of relative paths has been a key design element here, allowing the client to handle environment-specific configuration details while applications focus on the actual secrets being stored and retrieved.

## [](#revisiting-the-template-api-design)Revisiting the Template API Design

As with any API that evolves over time, we accumulated quite some functionality in the Template-based approach. Implementations build on top of `RestTemplate` for synchronous operations and `WebClient` for reactive scenarios, configured with a `UriBuilderFactory` and `VaultEndpointProvider` to determine the target Vault server.

While engine-specific APIs enforce path prefixes and prevent absolute path usage, the generic `VaultTemplate.read()`/`.write()` methods along with `doWithVault()`/`doWithSession()` callbacks operate typically on opaque path strings. Without introspecting each string (which isn't practical) there's no way to guarantee whether a given call targets a relative path within the configured Vault instance or represents an absolute URI to a an entirely different server. This isn't ideal from a security perspective.

There's another aspect worth considering: Callback methods expose the raw HTTP client directly, which fundamentally shifts abstraction levels from logical Vault operations down to HTTP-oriented request handling. While this design serves a escape hatch for low-level operations that are not covered by the Template API, it requires a context switch for application developers in terms of abstraction level. It demands a much higher degree of security awareness than should be necessary. A well-designed client library should guide developers toward secure usage patterns by default, catching unintended operations early rather than silently executing them.

These observations led us to reconsider the client architecture. The [fluent](https://poutsma-principles.com/blog/2025/06/03/fluent-apis-overview/), functional style embraced in modern Spring Framework components, particularly in the HTTP client evolution, provided clear inspiration for how a revised Vault client could look. A fluent API naturally reduces method proliferation on any given type while guiding developers through the component's intended usage patterns.

It's worth noting that `VaultTemplate` was built on `RestTemplate`, while `ReactiveVaultTemplate` has always used the fluent `WebClient` which itself reinforced the benefits of a fluent design approach for Vault interactions.

## [](#introducing-vaultclient)Introducing VaultClient

`VaultClient` and `ReactiveVaultClient` draw heavily from the `RestClient` and `WebClient` design primitives, enriching the fluent interface with Vault-specific concerns. If you're familiar with either of those clients, you'll feel right at home with `VaultClient`. Spring Vault 4.1 is an opportunity to introduce this new client architecture and elevate all Spring Vault functionality onto a more refined foundation.

The new `VaultClient` provides an intermediate abstraction layer enforcing relative path handling at its core, preventing unintended absolute path usage when configured with for a `VaultEndpoint`:

```java
CopyVaultClient client = VaultClient.create(VaultEndpoint.create("vault.example.com", 8200));

VaultResponse response = client.get()
    .path("secret/my-secret")
    .token(VaultToken.of(…))
    .namespace(…)
    .retrieve()
    .requiredBody();
```

Internally, `VaultClient` leverages `RestClient` with its connector infrastructure for SSL configuration, timeouts, retry handling, and other client concerns, while URL construction remains firmly within `VaultClient` itself. The synchronous as well as the reactive clients consistently throw `VaultClientResponseException`, a subclass of the generic `VaultException`, providing proper access to HTTP status codes, response headers, and error response bodies.

Most `ClientAuthentication` implementations require some form of Vault interaction to perform login operations. Typically, these implementations work directly with `RestTemplate` (or `WebClient` for `AuthenticationStepsOperator`). Cloud-specific authentication mechanisms such as GCP Compute, Azure MSI Instance Metadata also needed a `RestTemplate` to communicate with their respective platform services. Using the same client type for both Vault operations and platform-specific calls created potential for mixing up client instances, leading to requests being dispatched through improper channels.

Having a distinguished Vault client type eliminates an entire category of potential bugs.

## [](#migration-considerations)Migration Considerations

Introducing `VaultClient` is a step toward a more refined Spring Vault design. This change comes with deprecations of constructors and support classes operating at the `RestOperations` API level in favor of `VaultClient` and `ReactiveVaultClient` variants.

This revision happens also in preparation for Spring Framework's planned `RestTemplate` deprecation in Spring Framework 7.1, as we've outlined in our recent [HTTP clients roadmap](https://spring.io/blog/2025/09/30/the-state-of-http-clients-in-spring#the-future-of-http-clients-in-spring). The configuration infrastructure both in Spring Vault and Spring Cloud Vault continues for the time being to use `RestTemplate` alongside Spring Vault's `RestTemplateCustomizer`, with an additional `VaultClientCustomizer` now available. We will gradually migrate off `RestTemplate` towards `RestClient` and removal of deprecated API at a later stage.

We recommend migrating Vault-specific customizations from `RestTemplateCustomizer` to `VaultClientCustomizer`, while moving general HTTP client customizations to `RestClientCustomizer` (or their reactive equivalents as appropriate).

We are working towards providing dedicated interfaces for operations with the underlying `VaultClient` client, to cover Vault functionality not directly exposed through the Template API as direct replacements for `doWithVault()`/`doWithSession()` callback methods.

## [](#whats-next)What's next?

We're exploring several integrations for stateful components that would benefit from a Vault integration. For example, Vault's PKI secrets engine can serve as certificate authority for Spring Boot's SSL bundles, providing both trust anchors and certificate issuance for embedded web servers without the need to deploy certificates as files but rather obtaining certificates directly from Vault instead.

Another idea worth exploring is credentials rotation for database connections that presents a broad range of arrangements such as updating credentials for a pooling component or rotation of data sources.

As always, we [welcome feedback](https://github.com/spring-projects/spring-vault/issues) on these directions as Spring Vault evolves.