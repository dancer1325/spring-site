---
title: Securing Spring Boot Applications With SSL
source: https://spring.io/blog/2023/06/07/securing-spring-boot-applications-with-ssl
scraped: 2026-02-23T09:44:28.442Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Scott Frederick |  June 07, 2023 | 37 Comments
---

# Securing Spring Boot Applications With SSL

_Engineering | Scott Frederick |  June 07, 2023 | 37 Comments_

Secure Sockets Layer (SSL) and Transport Layer Security (TLS) are key components of securing communications between systems in a layered or service-oriented architecture. Spring Boot applications in such an architecture often accept incoming network connections or create outgoing connections, and developers are tasked with configuring applications to work in such a secure environment.

If you've ever worked with the Java security and SSL APIs, you're probably aware that this is not a particularly fun task. It often involves multiple trips to [stackoverflow.com](https://stackoverflow.com) to copy and paste code. There are a few factors that make working with SSL painful.

First off, you might be provided trust material such as certificates and private keys for production use. You might need to generate different trust material for pre-production testing (often using self-signed certificate authorities). This trust material is typically in the form of Java keystore files in either the JKS or PKCS #12 format, or they might be PEM-encoded text files. Each of these file types require different handling.

Once you have the trust material, you need to transform it into something that can be passed to Java connection APIs. Things can get difficult here because connection APIs can be configured in a variety of ways:

-   Some want you to provide keystore and truststore `java.security.KeyStore` instances.
-   Some want you to provide `javax.net.ssl.KeyManager` and `javax.net.ssl.TrustManager` instances.
-   Some want you to provide a `javax.net.ssl.SSLContext` instance.

SSL is also pretty low-level, so you often need to peel back a few layers of abstraction to get to the thing that needs to be configured using objects from the `java.security` or `java.net.ssl` packages. For example, if you want to configure SSL on a Spring `RestTemplate` you need to get down to the `ClientHttpRequestFactory` that's backing it. For a typical Spring Boot application that could be an `HttpComponentsClientHttpRequestFactory`, `OkHttp3ClientHttpRequestFactory` or `SimpleClientHttpRequestFactory`. Each of these provide different configuration APIs.

Configuring connections to use SSL or TLS is not new to Spring Boot, but the team decided to take a holistic view of what was currently supported and look for opportunities to improve and expand support. We hope you will find that Spring Boot 3.1 makes SSL configuration much easier.

## [](#introducing-ssl-bundles)Introducing SSL Bundles

Spring Boot 3.1 introduces the concept of SSL bundles for configuring and consuming custom SSL trust material, such as keystores, certificates, and private keys. Once configured, a bundle can be applied to one or more connections using configuration properties or APIs.

### [](#configuring-ssl-bundles)Configuring SSL Bundles

Properties used to configure SSL trust material are under the `spring.ssl.bundle` prefix in an `application.yaml` or `application.properties` file. Two top-level groupings are available to reflect the unique information needed to configure trust material of different types.

-   `spring.ssl.bundle.jks` can be used to configure bundles using Java keystore files.
-   `spring.ssl.bundle.pem` can be used to configure bundles using PEM-encoded text files.

One or more bundles of each type can be configured, with each configured bundle given a user-provided name. The name is used when applying the bundle with properties or retrieving it with an API.

The following example `application.yaml` file shows the configuration of two SSL bundles. The first is named `server` and defines a Java Keystore file (in the PKCS #12 format) that could be used to secure an embedded web server. The second is named `client` and defines a trust store with a PEM-encoded certificate file that could be used to secure the client side of a connection to a server that requires client authentication.

```yaml
Copyspring:
  ssl:
    bundle:
      jks:
        server:
          key:
            alias: "server"
          keystore:
            location: "classpath:server.p12"
            password: "secret"
            type: "PKCS12"
      pem:
        client:
          truststore:
            certificate: "classpath:client.crt"
```

See the [Spring Boot reference documentation](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#features.ssl) as well as the [JksSslBundleProperties](https://github.com/spring-projects/spring-boot/blob/main/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/ssl/JksSslBundleProperties.java) and [PemSslBundleProperties](https://github.com/spring-projects/spring-boot/blob/main/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/ssl/PemSslBundleProperties.java) classes for more details on the available configuration properties.

### [](#using-auto-configured-ssl-bundles)Using Auto-configured SSL Bundles

Spring Boot uses the `spring.ssl.bundle` properties to create objects that provide access to the specified trust material.

As mentioned above, there are three levels of abstraction provided by the Java security and SSL APIs to expose trust material that has been read from either Java keystore or PEM files:

-   `java.security.KeyStore` instances used as keystores and truststores.
-   `javax.net.ssl.KeyManager` and `javax.net.ssl.TrustManager` instances.
-   `javax.net.ssl.SSLContext` instances.

At the lowest level you might need truststore and keystore objects to apply SSL to a connection. These can be accessed using an `SslStoreBundle` interface as shown here:

```java
Copypublic interface SslStoreBundle {

	KeyStore getKeyStore();

	String getKeyStorePassword();

	KeyStore getTrustStore();

}
```

`KeyManager` and `TrustManager` instances can be derived from a keystore and truststore. These can be accessed using an `SslManagerBundle` interface:

```java
Copypublic interface SslManagerBundle {

	KeyManager[] getKeyManagers();

	KeyManagerFactory getKeyManagerFactory();

	TrustManager[] getTrustManagers();

	TrustManagerFactory getTrustManagerFactory();

}
```

Finally, an `SSLContext` can be created from a `KeyManager` and `TrustManager` and accessed with a `createSslContext` factory method.

Putting all this together, we have an `SslBundle` interface with access to the various different configuration styles:

```java
Copypublic interface SslBundle {

	SslStoreBundle getStores();

	SslManagerBundle getManagers();

	SSLContext createSslContext() {

}
```

See the [source code](https://github.com/spring-projects/spring-boot/blob/main/spring-boot-project/spring-boot/src/main/java/org/springframework/boot/ssl/SslBundle.java) for the full list of methods in `SslBundle`.

The collection of configured `SslBundle`s are made available in an `SslBundles` bean that can be auto-wired into other Spring beans:

```java
Copypublic interface SslBundles {

	SslBundle getBundle(String bundleName) throws NoSuchSslBundleException;

}
```

An example of using `SslBundles` to retrieve and apply an `SSLContext` might look like this:

```java
Copy@Component
public class MyComponent {

    public MyComponent(SslBundles sslBundles) {
        SslBundle sslBundle = sslBundles.getBundle("client");
        SSLContext sslContext = sslBundle.createSslContext();
        // do something with the created sslContext
    }

}
```

## [](#securing-rest-clients)Securing REST Clients

An exciting new area of SSL capabilities that is enabled in Spring Boot 3.1 is the configuration of REST clients. Spring Boot support for customizing a `RestTemplate` or `WebClient` now includes the ability to apply an SSL bundle to secure the connection between the client and the REST service.

`RestTemplateBuilder` has a new `setSslBundle()` method that accepts an SSL bundle retrieved from the auto-configured `SslBundles`, as shown in this example:

```
Copy@Service
public class MyService {

    private final RestTemplate restTemplate;

    public MyService(RestTemplateBuilder restTemplateBuilder, SslBundles sslBundles) {
        this.restTemplate = restTemplateBuilder.setSslBundle(sslBundles.getBundle("mybundle")).build();
    }

}
```

A `WebClientSsl` interface lets an SSL bundle be retrieved and applied to a `WebClient.Builder`, as shown in this example:

```
Copy@Service
public class MyService {

    private final WebClient webClient;

    public MyService(WebClient.Builder webClientBuilder, WebClientSsl ssl) {
        this.webClient = webClientBuilder.baseUrl("https://example.org").apply(ssl.fromBundle("mybundle")).build();
    }

}
```

## [](#securing-data-service-connections)Securing Data Service Connections

Spring Boot makes it easy to configure client libraries used to connect from an application to data services. These client libraries are good examples of APIs that use any of the three levels of Java security and SSL APIs for configuration.

Prior to 3.1, some form of SSL configuration was available for many of the data services for which Spring Boot provides auto-configuration. However, the level of support and the properties used for configuration were inconsistent across services. Most data services auto-configuration properties now have similar `ssl` structures, providing a much higher level of consistency across services:

-   Cassandra - `spring.cassandra.ssl`
-   Couchbase - `spring.couchbase.env.ssl`
-   Elasticsearch - `spring.elasticsearch.restclient.ssl`
-   MongoDB - `spring.data.mongodb.ssl`
-   Redis - `spring.data.redis.ssl`

Most services have a `*.ssl.enabled` property which will enable SSL support in the client library using trust material contained in the Java runtime `cacerts`. A `*.ssl.bundle` property applies a named SSL bundle to enable client library SSL support with custom trust material from the bundle. This makes the configuration much more consistent and allows for the same trust material to be applied to multiple connections, reducing the amount of properties or YAML configuration.

To provide this level of consistency, some previous SSL-related properties have been deprecated. See the [configuration properties changelog](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.1.0-Configuration-Changelog) for more details.

JDBC connections are an obvious omission from this list. We plan to apply the SSL bundle approach to JDBC connections in an upcoming Spring Boot release.

## [](#securing-embedded-web-servers)Securing Embedded Web Servers

All embedded web servers supported by Spring Boot can be configured to secure incoming connections with SSL by using `server.ssl.*` properties. Java keystore files have been supported since the inception of Spring Boot, and PEM-encoded files have been supported since 2.7.

The number of properties under the `server.ssl` prefix has grown over time, and the lack of structure made it difficult to tell which properties could be used together and which were mutually exclusive. The previous `server.ssl.*` properties continue to be supported, but a new `server.ssl.bundle` property can be used to apply a configured SSL bundle to an embedded web server.

The following two examples are functionally the same:

```
Copyserver:
  ssl:
    key-alias: “server”
    key-password: “keysecret”
    key-store: "classpath:server.p12"
    key-store-password: "storesecret"
    client-auth: NEED    
```

```
Copyspring:
  ssl:
    bundle:
      jks:
        web-server:
          key:
            alias: "server"
            password: “keysecret”
          keystore:
            location: "classpath:server.p12"
            password: "storesecret"
server:
  ssl:
    bundle: “web-server”
    client-auth: NEED
```

The older structure is more concise, but the newer structure reduces the chance of mis-configuration and allows the same SSL bundle to be used on multiple connections.

Similar changes have been made to the `management.server.ssl` and `spring.rsocket.server.ssl` properties.

## [](#future-work)Future Work

We really hope you find SSL bundles a useful feature of Spring Boot 3.1. If you find any other technologies that you think we should add SSL support for, please raise a [GitHub issue](https://github.com/spring-projects/spring-boot/issues) and we'll consider it for a future release.