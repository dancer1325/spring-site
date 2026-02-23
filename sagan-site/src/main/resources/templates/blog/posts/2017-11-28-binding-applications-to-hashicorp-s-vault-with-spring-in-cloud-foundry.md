---
title: Binding applications to HashiCorp\'s Vault with Spring in Cloud Foundry
source: https://spring.io/blog/2017/11/28/binding-applications-to-hashicorp-s-vault-with-spring-in-cloud-foundry
scraped: 2026-02-23T16:13:54.807Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Paluch |  November 28, 2017 | 0 Comments
---

# Binding applications to HashiCorp's Vault with Spring in Cloud Foundry

_Engineering | Mark Paluch |  November 28, 2017 | 0 Comments_

In this article, we will dive in how to bind a Spring application to [HashiCorp’s Vault service broker on Cloud Foundry](https://github.com/hashicorp/vault-service-broker).

Spring Boot provides a lot of autoconfiguration and external binding features, some of which are relevant to Cloud Foundry, and many of which are not. [Spring Cloud Connectors](http://cloud.spring.io/spring-cloud-connectors/) is a library that you can use in your application if you want to create your own components programmatically, but it doesn’t do anything “magical” by itself.

Spring Cloud Connectors lays the foundation for connectors that integrate with various Cloud services. It has ships components that allow correct middleware configuration. Using CloudFoundry’s java buildpack comes with an “auto-reconfiguration” feature that tries to ease the burden of moving simple applications to the cloud.

The key to correctly configuring middleware services, like HashiCorp’s Vault, is to understand what each of these tools provides, how they influence each other at runtime. The goal should be a smooth transition from local execution of an application on a developer’s desktop to a test environment in Cloud Foundry, and ultimately to production in CloudFoundry (or otherwise) with no changes in source code or packaging, per the twelve-factor application guidelines.

## [](#the-libraries)[](#the-libraries)The libraries

Spring Cloud Vault connectors ship with four libraries:

-   `spring-cloud-vault-connector-core` provides common bits used by the other three libraries.
    
-   `spring-cloud-vault-spring-connector` configures Spring Framework and Spring Boot (Spring Cloud)-based applications with a Vault connector.
    
-   `spring-cloud-vault-cloudfoundry-connector` is required to pick up CloudFoundry’s service configuration and provide the service configuration to the actual Spring connector.
    
-   `spring-cloud-vault-localconfig-connector` lets you provide a property-based configuration if you want to configure the service yourself, e.g. within a CI or local runtime environment without providing additional code to distinguish between cloud and non-cloud runtimes.
    
    io.pivotal.spring.cloud spring-cloud-vault-connector-core 1.0.0.RELEASE io.pivotal.spring.cloud spring-cloud-vault-spring-connector 1.0.0.RELEASE io.pivotal.spring.cloud spring-cloud-vault-cloudfoundry-connector 1.0.0.RELEASE io.pivotal.spring.cloud spring-cloud-vault-localconfig-connector 1.0.0.RELEASE

## [](#your-application)[](#your-application)Your application

If you’re using Spring Boot and Spring Cloud Vault, then you can actually get away with not doing anything else besides dropping in the Spring and CloudFoundry connector.

The Spring connector comes with a [bootstrap configuration](https://github.com/pivotal-cf/spring-cloud-vault-connector/blob/e675cfbb0ae2fa3e83bcb2d4f49589ff6be9bdf9/spring-cloud-vault-spring-connector/src/main/java/io/pivotal/spring/cloud/vault/config/java/VaultConnectorBootstrapConfiguration.java) that uses the token and endpoint from the service configuration to configure Spring’s Vault client. Spring Cloud Vault configures a property source by default that points to `${spring.application.name}/${profile-name}`. HashiCorp’s service broker configures generic backends in the application, space and organization namespace. The connector picks up the backends and shared backends (in the mentioned order) to obtain its configuration properties from these backends.

```
Copy@SpringBootApplication
public class HelloWorldApplication {

  public static void main(String[] args) {
    SpringApplication.run(HelloWorldApplication.class, args);
  }

  static class MyComponent {

    public MyComponent(@Value("${some-property}") String someProperty, (1)
                        VaultOperations vaultOperations) {             (2)
      // …
    }
  }
}
```

1.  Inject a configuration property directly. Spring attempts to resolve the property from its `Environment` that is configured with Vault’s `PropertySource`s.
    
2.  Inject `VaultOperations` configured to use the connected Vault service.
    

If your application is purely Spring Framework-based or a Spring Boot application without Spring Cloud Vault, then enabling `@ServiceScan` on one of your configuration classes is sufficient to pick up authentication and endpoint.

```
Copypublic class CloudFoundryApplication {

  @Configuration
  @ServiceScan                                                            (1)
  static class VaultConfig {
  }

  public static void main(String[] args) {

    GenericApplicationContext ctx =
                    new AnnotationConfigApplicationContext(VaultConnectorsConfig.class,
                                            VaultConfig.class);

    ctx.start();

    VaultOperations vaultOperations = ctx.getBean(VaultOperations.class); (2)

    ctx.stop();
  }
}
```

1.  `@ServiceScan` enables scanning for services that are bound to your application. It creates beans for all found services.
    
2.  `VaultOperations` was created by the service scan so you can use it directly in your application.
    

Do you rather want to configure your bean yourself without activating `@ServiceScan` or your want to provide a customized client configuration? Then use `Cloud` directly. The `Cloud` object gives you access to the service information and lets you create `VaultTemplate`.

```
Copy@Configuration
class VaultConfig {

  @Bean
  public Cloud cloud() {                                                  (1)
    return new CloudFactory().getCloud();
  }

  @Bean
  public SslConfiguration sslConfiguration() {                            (2)
    return SslConfiguration.forTrustStore(…);
  }

  @Bean
  VaultOperations vaultOperations() {                                     (3)

    VaultServiceInfo vaultServiceInfo = (VaultServiceInfo) cloud()
          .getServiceInfos(VaultOperations.class).get(0);

    VaultServiceConnectorConfig config = VaultServiceConnectorConfig.builder()
                .sslConfiguration(sslConfiguration())
                .build();

    return cloud().getSingletonServiceConnector(VaultOperations.class, config);
  }
}
```

1.  The `Cloud` object parses bound service. Registering it as bean requires parsing onlly once without the need to re-parse the services each time you need a `Cloud` object.
    
2.  Going forward with your configuration, it can be required to customize SSL or client configuration options. Here’s an example how to supply a trust store for Spring’s Vault client.
    
3.  The cloud object exposes methods to create service connectors. Pass the `VaultServiceConnectorConfig` along the `VaultOperations` service type to these methods to create a template API instance. The `Cloud` object gives you also access to the service information carrying details about authentication and the managed Vault backends.
    

## [](#hashicorps-vault-service-broker)[](#hashicorp-s-vault-service-broker)HashiCorp’s Vault service broker

HashiCorp provides a [service broker to configure Vault services](https://github.com/hashicorp/vault-service-broker) that can be bound to your application. It uses Token-based authentication and spins up a couple of backends. These are, in particular:

-   a `generic` secret backend exclusive to the application instances
    
-   a `transit` backend exclusive to the application instances
    
-   a shared `generic` secret backend in the scope of your space
    
-   a shared `generic` secret backend in the scope of your organization
    
-   a set of policies per application to e.g. restrict the shared org backend to read-only for the application.
    

Details about the service instance are provided via `VCAP_SERVICES`, an environment variable visible to your application. Typically, it would look like:

```
Copy{
"hashicorp-vault": [
    {
    "credentials": {
      "address": "https://your-server:8200/",
      "auth": {
          "token": "00000000-0000-0000-0000-000000000000"
      },
      "backends": {
          "generic": "cf/20fffe9d-d8d1-4825-9977-1426840a13db/secret",
          "transit": "cf/20fffe9d-d8d1-4825-9977-1426840a13db/transit"
      },
      "backends_shared": {
          "organization": "cf/1a558498-59ad-488c-b395-8b983aacb7da/secret",
          "space": "cf/d007583f-5617-4b02-a5a7-550648827cfa/secret"
      }
    },
    "label": "hashicorp-vault",
    "name": "hashicorp-vault",
    }
]
}
```

The token is managed and refreshed by the service broker and should not be touched by the application. Revoking the token will shut down access of all your application instances within the bound application.

## [](#wait-what-about-localconfig)[](#wait-what-about-localconfig)Wait, what about LocalConfig?

Oh, right, thanks for the reminder. Once in a while you want to test your application locally before deploying it to the Cloud or you don’t want to use the service bindings. Spring Cloud Vault LocalConfig Connector fits exactly this purpose. It allows you to specify a configuration property that is picked up by the connector and provides the same set of configuration keys as `VCAP_SERVICES` on CloudFoundry.

Bootstrap configuration requires at least two keys set:

-   `spring.cloud.appId`: Application identifier name. Any descriptive application name (maybe even `${spring.application.name}`) will do the job.
    
-   A key below the `spring.cloud.` namespace set to a HTTP/HTTPS url.
    
    spring.application.name=…
    
    spring.cloud.appId=your-app-id spring.cloud.my-vault-service=[http://localhost:8200?token=my-token](http://localhost:8200?token=my-token) &backend.generic=cf/secret &backend.transit=cf/transit &shared\_backend.space=cf/space
    

Or written as YAML:

```
Copyspring.application.name: …

spring.cloud:
    appId: your-app-id
    my-vault-service: http://localhost:8200?token=my-token
                      &backend.generic=cf/secret
                      &backend.transit=cf/transit
                      &shared_backend.space=cf/space
```

You might have noticed that the URL looks a bit different than your usual Vault endpoint prefix URL. The connector requires additional configuration options which are represented as query parameters. The connector only uses scheme, host and port to configure the endpoint. The additional query parameters represent the keys which are usually transported via `VCAP_SERVICES`:

-   `token` the authentication token (required)
    
-   `backend.(.*)` Context path to a dedicated backend. The property key after `backend.` represents the dedicated backend name.
    
-   `shared_backend.(.*)` Context path to a shared backend. The property key after `shared_backend.` represents the shared backend name.
    

You can configure multiple backends and shared backends.

## [](#can-i-connect-to-hashicorps-vault-without-connector-libraries)[](#can-i-connect-to-hashicorp-s-vault-without-connector-libraries)Can I connect to HashiCorp’s Vault without connector libraries?

Yes, you can! In scenarios where you want to keep more control over what’s going on, or you want to omit additional dependencies there’s another possibility how you can connect to Vault. Spring Boot ships with [`CloudFoundryVcapEnvironmentPostProcessor`](https://docs.spring.io/spring-boot/docs/current/api/org/springframework/boot/cloud/CloudFoundryVcapEnvironmentPostProcessor.html) that exports CloudFoundry’s `VCAP` variables through property sources to your application. These properties are prefixed with `vcap.application` for `VCAP_APPLICATION` respective `vcap.services` for `VCAP_SERVICES`. You can reference VCAP properties in your configuration like any other property.

Configuring a Vault connection through `VCAP_SERVICES` requires knowledge over the [actual structure of `VCAP_SERVICES`](#vcap). Configuring the URL and token authentication are the only two properties required to get Spring Boot with Spring Cloud Vault working. From the example [above](#vcap), your bootstrap configuration would look like:

```
Copyspring.application.name=…

spring.cloud.vault.url=${vcap.services.hashicorp-vault.credentials.address}
spring.cloud.vault.token=${vcap.services.hashicorp-vault.auth.token}
spring.cloud.vault.generic.backend=${vcap.services.hashicorp-vault.credentials.backend.generic}
```

Or written as YAML:

```
Copyspring.application.name: …

spring.cloud.vault:
    url: ${vcap.services.hashicorp-vault.credentials.address}
    token: ${vcap.services.hashicorp-vault.auth.token}
    generic.backend: ${vcap.services.hashicorp-vault.credentials.backend.generic}
```

You have full control without any additional auto-configuration library. Using properties allows you to leverage profiles for conditional activation.

## [](#further-resources)[](#further-resources)Further resources

-   Spring Vault: [https://projects.spring.io/spring-vault/](https://projects.spring.io/spring-vault/)
    
-   Spring Cloud Vault: [https://cloud.spring.io/spring-cloud-vault/](https://cloud.spring.io/spring-cloud-vault/)
    
-   Spring Cloud Connectors: [http://cloud.spring.io/spring-cloud-connectors/](http://cloud.spring.io/spring-cloud-connectors/)
    
-   Spring Vault and Spring Cloud Vault samples: [https://github.com/mp911de/spring-cloud-vault-config-samples](https://github.com/mp911de/spring-cloud-vault-config-samples)
    
-   Project repository: [https://github.com/pivotal-cf/spring-cloud-vault-connector](https://github.com/pivotal-cf/spring-cloud-vault-connector)
    
-   [Dave Syer](https://spring.io/team/dsyer)'s excellent article aboud bound data services on CloudFoundry: [https://spring.io/blog/2015/04/27/binding-to-data-services-with-spring-boot-in-cloud-foundry](https://spring.io/blog/2015/04/27/binding-to-data-services-with-spring-boot-in-cloud-foundry)