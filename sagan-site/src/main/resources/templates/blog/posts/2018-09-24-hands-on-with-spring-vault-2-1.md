---
title: Hands on with Spring Vault 2.1
source: https://spring.io/blog/2018/09/24/hands-on-with-spring-vault-2-1
scraped: 2026-02-23T15:11:39.044Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Paluch |  September 24, 2018 | 0 Comments
---

# Hands on with Spring Vault 2.1

_Engineering | Mark Paluch |  September 24, 2018 | 0 Comments_

Spring Vault 2.1 is already in sight. I would like to use this post to take a deeper look at the changes and features that are in the upcoming release.

The team has been working on a whole bunch of new features:

-   Extending infrastructure-based authentication to support Google Cloud IAM and Azure Managed Service Identity
    
-   Integrating Vault’s versioned Key-Value backend
    
-   Wrapping API support
    
-   Java 11 compatibility
    

Spring Vault supports HashiCorp Vault versions 0.5 up to 0.11. You can find the Spring Vault and Spring Cloud Vault [examples repository on GitHub](https://github.com/mp911de/spring-cloud-vault-config-samples). Now, let’s dive into the Spring Vault 2.1 features!

## [](#google-cloud-authentication)[](#google-cloud-authentication)Google Cloud Authentication

With version 0.8.1, Vault introduced authentication support for Google Cloud. GCP authentication uses GCP’s IAM service to use one of the following authentication workflows:

-   IAM Login using service account credentials to generate a signed token
    
-   GCE Login using GCP’s metadata service to retrieve a signed token
    

Spring Vault supports both methods. While using IAM authentication requires credentials to be set up (either through the environment or by using a credentials file), GCE authentication uses the platform as an identity provider, so GCE authentication has fewer requirements regarding the initial setup.

### [](#iam-login)[](#iam-login)IAM Login

IAM authentication uses Google’s IAM service to generate a signed token by using the signature from Google’s credentials. The signed token is passed on to Vault to verify the token. This authentication method requires credentials to be either provided through the `GOOGLE_APPLICATION_CREDENTIALS` environment variable or configured through `GcpIamAuthenticationOptions`. `GcpIamAuthentication` uses Google’s service API SDK (`google-api-services-iam`) to interact with IAM. A client configuration could look like the following code sample:

```
Copy@Configuration
class VaultConfiguration extends AbstractVaultConfiguration {

  @Override
  public ClientAuthentication clientAuthentication() {

    try {

      GcpIamAuthenticationOptions options = GcpIamAuthenticationOptions.builder()
        .role("my-role")
        .credential(GoogleCredential.getApplicationDefault())
        .build();
      return new GcpIamAuthentication(options, restOperations());

    } catch (IOException e) {
      throw new IllegalStateException(e);
    }
  }

  // …
}
```

By default, the IAM authentication method derives project ID and service account Id from the credential. You can also configure specific values if you want to authenticate on behalf of a specific service account.

For more information, see the [reference documentation](https://docs.spring.io/spring-vault/docs/2.1.0.RC1/reference/html/#vault.authentication.gcpiam).

### [](#gce-login)[](#gce-login)GCE Login

The GCE (Google Compute Engine) authentication workflow is suitable for VM instances. It uses the metadata service (compute metadata) to obtain a signed token. The signed identity is passed on to Vault to verify the VM instance. A client configuration could look like the following code sample:

```
Copy@Configuration
class VaultConfiguration extends AbstractVaultConfiguration {

  @Override
  public ClientAuthentication clientAuthentication() {

    GcpComputeAuthenticationOptions options = GcpComputeAuthenticationOptions
        .builder().path("my-role").build();

    return new GcpComputeAuthentication(options, restOperations());
  }

  // …
}
```

For more information, see the [reference documentation](https://docs.spring.io/spring-vault/docs/2.1.0.RC1/reference/html/#vault.authentication.gcpgce).

## [](#azure-authentication)[](#azure-authentication)Azure Authentication

With version 0.10.0, Vault introduced authentication support for Azure. Applications running on Azure virtual machines can authenticate against Vault by using [managed service identities](https://docs.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/overview). A managed service identity (MSI) can be activated for a virtual machine that does not require provisioning of upfront credentials.

Spring Vault obtains MSI credentials from the Azure Instance Metadata Service (IMDS). Vault requires additional details (subscriptionId, resource group name, VM name) to perform the authentication. By default, these values are also obtained from IMDS and passed on to Vault, along with the identity token. A possible client configuration could look like the following code sample:

```
Copy@Configuration
class VaultConfiguration extends AbstractVaultConfiguration {

  @Override
  public ClientAuthentication clientAuthentication() {

    AzureMsiAuthenticationOptions options = AzureMsiAuthenticationOptions.builder()
        .role("my-role").build();
    return new AzureMsiAuthentication(options, restOperations());
  }

  // …
}
```

For more information, see the [reference documentation](https://docs.spring.io/spring-vault/docs/2.1.0.RC1/reference/html/#vault.authentication.azuremsi).

## [](#key-value-api)[](#key-value-api)Key-Value API

Vault introduced with version 0.10 a versioned variant of its Key-Value backend (which was also known as the generic secret backend a few versions ago). This change introduces another backend type with a similar external API regarding its operations (list, get, put, delete) but a different API implementation.

To unify versioned and non-versioned API access, we introduced a common API with `VaultKeyValueOperations`. `VaultKeyValueOperations` exposes common functionality that you can use in a version-agnostic style if you do not want to interact with versioning metadata. The following example shows how you might use it:

```
CopyVaultOperations vaultOperations = …
VaultKeyValueOperations operations = vaultOperations.opsForKeyValue("secret", KeyValueBackend.unversioned());

Map<String, Object> secret = new HashMap<>();
secret.put("key", "value");
secret.put("ttl", "5");

operations.put("key", secret);

operations.put("key", new Person(…));

VaultResponseSupport<Person> person = operations.get("key", Person.class);
```

The variant shown above ignores versioning specifics even if they are provided by the targeted secret backend. You can obtain a versioned Key-Value API to interact with versions. `VaultVersionedKeyValueOperations` exposes version-specific operations such as retrieval of a specific secret version or compare-and-set. Take a look at the following example:

```
CopyVaultOperations vaultOperations = …
VaultVersionedKeyValueOperations operations = vaultOperations.opsForVersionedKeyValue("versioned");

Map<String, Object> secret = new HashMap<>();
secret.put("key", "value");
secret.put("ttl", "5");

Metadata metadata = operations.put("key", secret);

Versioned<Map<String, Object>> versioned = operations.get("key", Version.from(42));

Map<String, Object> update = new HashMap<>();
update.put("key", "new-key");
update.put("ttl", "5");

Versioned<Map<String, Object>> compareAndSet = Versioned.create(secret, versioned.getVersion());

operations.put("key", compareAndSet);

operations.delete("key", Version.from(42));
```

Requests and responses to versioned secrets wrap their content along with versioning metadata in a `Versioned` object to attach a versioning context.

## [](#wrapping-api-support)[](#wrapping-api-support)Wrapping API Support

A core concept in Vault is to wrap responses and return a token to obtain the actual response body. Response wrapping is now supported by a dedicated API with `VaultWrappingOperations`. Wrapping support allows lookup of wrapped responses. You can read these and rewrap the content. `VaultWrappingOperations` does not support response wrapping of Spring Vault API calls. You can use `RestTemplate` through `VaultOperations.doWithSession(…)` directly if you need to create wrapped responses.

The following example provides an overview of `VaultWrappingOperations` use:

```
CopyVaultOperations vaultOperations = …
VaultWrappingOperations operations = vaultOperations.opsForWrapping();

VaultToken wrappingToken = VaultToken.of(…);

// Metadata encapsulated TTL and Creation Time
WrappedMetadata lookup = operations.lookup(wrappingToken);

// Read the response as generic Map
VaultResponse response = operations.read(wrappingToken);

// Read the response applying a type hint.
VaultResponseSupport<SocialSecurityNumber> response = operations.read(
        wrappingToken, SocialSecurityNumber.class);

// You can also wrap user-supplied data and get a token in return
Map<String, String> map = Collections.singletonMap("key", "value");
WrappedMetadata metadata = wrappingOperations.wrap(map, Duration.ofSeconds(100));
```

## [](#java-11-compatibility)[](#java-11-compatibility)Java 11 Compatibility

Spring Vault fully supports Java 11 as its next long-term support release. In fact, we strongly recommend that you upgrade your Spring Vault version to the 2.1 release (in combination with Spring Framework 5.1) if you are developing for JDK 11, as it will give you a warning-free experience of Spring’s libraries. All HTTP client integrations have JDK 11 support.

## [](#outlook)[](#outlook)Outlook

We are working towards the next Spring Vault 2.2 release to ship with annotation-based configuration for the versioned Vault key-value backend. We keep observing the Vault project and continue to work to provide integrations for features that make sense from an application perspective. Cheers, and stay tuned!