---
title: Spring Vault 1.1.0 M1 and 2.0.0 M2 available
source: https://spring.io/blog/2017/07/27/spring-vault-1-1-0-m1-and-2-0-0-m2-available
scraped: 2026-02-23T16:25:24.812Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Paluch |  July 27, 2017 | 0 Comments
---

# Spring Vault 1.1.0 M1 and 2.0.0 M2 available

_Releases | Mark Paluch |  July 27, 2017 | 0 Comments_

On behalf of the community, I would like to announce two new Spring Vault milestones: 1.1.0 M1 and 2.0.0 M2. Release 1.1.0 M1 ships with 24 tickets completed and 2.0.0 M2 with 7 resolved tickets and are available from the milestone repository.

Since the previous releases, these features have made it into the current milestones:

-   Vault login using via AWS IAM
    
-   Rotation of generic secrets based on their lease duration
    
-   Introduction of `VaultEndpointProvider` to configure endpoints dynamically
    

additionally, 2.0.0 M2 ships with:

-   Authentication DSL to declare authentication flows
    
-   Reactive support based on Spring Framework 5 `WebClient` and [Project Reactor](https://projectreactor.io/)
    
-   Enhanced tooling support by adding `@NonNullApi` and `@Nullable` annotations to be picked up by your favorite IDE
    

### [](#authentication-dsl)[](#authentication-dsl)Authentication DSL

Authentication steps provide reusability of common authentication activity. Steps created via `AuthenticationSteps` describe an authentication flow in a functional style leaving the actual authentication execution to specific executors.

```
Copy// Static token use
AuthenticationSteps.just(VaultToken.of(…));

// AppRole authentication
AuthenticationSteps.fromSupplier(

    // Construct login body
    () -> Collections.singletonMap("role_id", options.getRoleId()))

    // post the payload to Vault to log in
    .login("auth/{mount}/login", options.getPath());
```

Authentication flows require an executor to perform the actual login. We provide two executors for according to the supported execution models:

-   `AuthenticationStepsExecutor` as a drop-in replacement for synchronous `ClientAuthentication`.
    
-   `AuthenticationStepsOperator` for reactive execution.
    

`ClientAuthentication`'s come with static factory methods to create `AuthenticationSteps` for their authentication-specific options:

```
CopyCubbyholeAuthenticationOptions options = …
RestOperations restOperations = …

AuthenticationSteps steps = CubbyholeAuthentication.createAuthenticationSteps(options);

AuthenticationStepsExecutor executor = new AuthenticationStepsExecutor(steps, restOperations);

VaultToken token = executor.login();
```

Authentication DSL is a pre-requisite for a reactive Vault client to decouple the authentication steps from their actual execution.

### [](#reactive-vault-client)[](#reactive-vault-client)Reactive Vault client

Spring Vault’s reactive client support is built on top of Authentication DSL and Spring Framework 5’s `WebClient`. Reactive support covers read/write/list and delete actions via `ReactiveVaultTemplate` and a caching `VaultToken` supplier for session management. You can use almost all authentication mechanisms to obtain a Vault token. The following mechanisms implement `AuthenticationStepsFactory` and provide `AuthenticationSteps` for non-blocking login:

-   AppId
    
-   AppRole
    
-   AWS-EC2
    
-   Client certificates
    
-   Cubbyhole
    
-   Static tokens
    

Create a configuration class to get started with reactive support:

```
Copypublic class Foo extends AbstractReactiveVaultConfiguration {

	@Override
	public VaultEndpoint vaultEndpoint() {
		return VaultEndpoint.from(URI.create("https://localhost:8200"));
	}

	@Override
	public ClientAuthentication clientAuthentication() {
		return new AwsEc2Authentication(restOperations());
	}
}
```

Configuration support for `AbstractReactiveVaultConfiguration` adapts authentications which implement `AuthenticationStepsFactory` to a reactive authentication method and configures both, the imperative and reactive, clients. Sessions are not shared between the two clients but that’s a future task. Ypu can use `ReactiveVaultTemplate` standalone:

```
CopyreactiveVaultTemplate.write("secret/mykey", Collections.singletonMap("hello", "world"))
		.thenMany(vaultOperations.list("secret"))
		.subscribe(item -> System.out.println(item));
```

or within a reactive runtime infrastructure such as Spring WebFlux:

```
Copy@RestController
public class SecretsController {

  private final ReactiveVaultOperations operations;

  // Constructor omitted for brevity

  @GetMapping("secrets")
  Flux<List> listSecrets() {
    return vaultOperations.list("secret");
  }
}
```

### [](#contributions)[](#contributions)Contributions

Without the community, we couldn’t be the successful project we are today. I’d like to thank everyone that created issues & provided feedback.

For a complete list of changes see the changelogs of [1.1.0 M1](http://docs.spring.io/spring-vault/docs/1.1.0.M1/changelog.txt) and [2.0.0 M2](http://docs.spring.io/spring-vault/docs/2.0.0.M2/changelog.txt).

[Project Page](http://projects.spring.io/spring-vault/) | [GitHub](https://github.com/spring-projects/spring-vault) | [Issues](https://github.com/spring-projects/spring-vault/issues) | [Documentation for 1.1.0 M1](http://docs.spring.io/spring-vault/docs/1.1.0.M1/reference/html/) | [Documentation for 2.0.0 M2](http://docs.spring.io/spring-vault/docs/2.0.0.M2/reference/html/) | [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-vault)