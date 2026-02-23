---
title: Creating a custom Spring Cloud Gateway Filter
source: https://spring.io/blog/2022/08/26/creating-a-custom-spring-cloud-gateway-filter
scraped: 2026-02-23T10:42:55.665Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Fredrich Ombico |  August 27, 2022 | 1 Comment
---

# Creating a custom Spring Cloud Gateway Filter

_Engineering | Fredrich Ombico |  August 27, 2022 | 1 Comment_

In this article, we look into writing a custom extension for Spring Cloud Gateway. Before we get started, let’s go over how Spring Cloud Gateway works:

![Spring Cloud Gateway diagram](https://static.spring.io/blog/fombico/20220826/spring-cloud-gateway-diagram.png)

1.  First, a client makes a network request to the Gateway
2.  The Gateway is defined with a number of routes, each with Predicates to match the request to the route. For example, you can match on the path segment of the URL or the HTTP method of the request.
3.  Once matched, the Gateway executes pre-request logic on each of the filters applied to the route. For example, you might want to add query parameters to your request
4.  A proxy filter routes the request to the proxied service
5.  The service executes and returns a response
6.  The gateway receives the response and executes post-request logic on each filter before returning the response. For example, you could remove unwanted response headers before returning to the client.

Our extension will be hashing the request body, adding the value as a request header called `X-Hash`. This corresponds to Step 3 in the diagram above. Note: as we are reading the request body, the gateway will be memory constrained.

First, we create a project at [start.spring.io](https://start.spring.io/) with the Gateway dependency. In this example, we’ll be using a Gradle project in Java with JDK 17 and Spring Boot 2.7.3. Download, unzip, and open the project in your favorite IDE and run it to ensure you are set up for local development.

Next let’s create the GatewayFilter Factory, which is a filter scoped to a particular route, that allows us to modify an incoming HTTP request or outgoing HTTP response in some manner. In our case, we’ll be modifying the incoming HTTP request with an additional header:

```java
Copypackage com.example.demo;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Collections;
import java.util.List;

import org.bouncycastle.util.encoders.Hex;
import reactor.core.publisher.Mono;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.cloud.gateway.support.ServerWebExchangeUtils;
import org.springframework.http.codec.HttpMessageReader;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;
import org.springframework.web.reactive.function.server.HandlerStrategies;
import org.springframework.web.reactive.function.server.ServerRequest;

import static org.springframework.cloud.gateway.support.ServerWebExchangeUtils.CACHED_SERVER_HTTP_REQUEST_DECORATOR_ATTR;

/**
 * This filter hashes the request body, placing the value in the X-Hash header.
 * Note: This causes the gateway to be memory constrained.
 * Sample usage: RequestHashing=SHA-256
 */
@Component
public class RequestHashingGatewayFilterFactory extends
        AbstractGatewayFilterFactory<RequestHashingGatewayFilterFactory.Config> {

    private static final String HASH_ATTR = "hash";
    private static final String HASH_HEADER = "X-Hash";
    private final List<HttpMessageReader<?>> messageReaders =
            HandlerStrategies.withDefaults().messageReaders();

    public RequestHashingGatewayFilterFactory() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        MessageDigest digest = config.getMessageDigest();
        return (exchange, chain) -> ServerWebExchangeUtils
                .cacheRequestBodyAndRequest(exchange, (httpRequest) -> ServerRequest
                    .create(exchange.mutate().request(httpRequest).build(),
                            messageReaders)
                    .bodyToMono(String.class)
                    .doOnNext(requestPayload -> exchange
                            .getAttributes()
                            .put(HASH_ATTR, computeHash(digest, requestPayload)))
                    .then(Mono.defer(() -> {
                        ServerHttpRequest cachedRequest = exchange.getAttribute(
                                CACHED_SERVER_HTTP_REQUEST_DECORATOR_ATTR);
                        Assert.notNull(cachedRequest, 
                                "cache request shouldn't be null");
                        exchange.getAttributes()
                                .remove(CACHED_SERVER_HTTP_REQUEST_DECORATOR_ATTR);

                        String hash = exchange.getAttribute(HASH_ATTR);
                        cachedRequest = cachedRequest.mutate()
                                .header(HASH_HEADER, hash)
                                .build();
                        return chain.filter(exchange.mutate()
                                .request(cachedRequest)
                                .build());
                    })));
    }

    @Override
    public List<String> shortcutFieldOrder() {
        return Collections.singletonList("algorithm");
    }

    private String computeHash(MessageDigest messageDigest, String requestPayload) {
        return Hex.toHexString(messageDigest.digest(requestPayload.getBytes()));
    }

    static class Config {

        private MessageDigest messageDigest;

        public MessageDigest getMessageDigest() {
            return messageDigest;
        }

        public void setAlgorithm(String algorithm) throws NoSuchAlgorithmException {
            messageDigest = MessageDigest.getInstance(algorithm);
        }
    }
}

```

Let’s take a more detailed look at the code:

-   We added the `@Component` annotation to the class. Spring Cloud Gateway needs to be able to detect this class in order to use it. Alternatively, we could define an instance with `@Bean`
-   In our class name, we use `GatewayFilterFactory` as a suffix. When adding this filter in the `application.yaml` we do not include the suffix, just `RequestHashing`. This is a Spring Cloud Gateway filter naming convention.
-   Our class also extends the `AbstractGatewayFilterFactory` similar to all other Spring Cloud Gateway filters. We also specify a class to configure our filter, a nested static class called `Config` helps keep things simple. The configuration class allows us to set which hashing algorithm to use.
-   The overridden `apply` method is where all the work takes place. In the parameter, we are given an instance of our configuration class, where we can access the `MessageDigest` instance for hashing. Next, we see `(exchange, chain)`, a lambda of the `GatewayFilter` interface class being returned. The exchange, which is an instance of `ServerWebExchange`, provides Gateway filters access to the HTTP request and response. For our case, we want to modify the HTTP request, and this requires us to mutate the exchange.
-   We need to read the request body to produce the hash, however, as the body is stored in a byte buffer, it can only be read once in the filter. By using `ServerWebExchangeUtils` we cache the request as an attribute in the exchange. Attributes provide a way to share data for a particular request across a filter chain. We’ll also store the computed hash of the request body.
-   We use the exchange attributes to acquire the cached request and the computed hash. We then mutate the exchange by adding the hash header before finally sending it off to the next filter in the chain.
-   The `shortcutFieldOrder` method helps to map the number and order of arguments to the filter. The `algorithm` string matches to the setter in the `Config` class.

To test the code, we’ll be using WireMock. Add the dependency to your `build.gradle` file:

```
CopytestImplementation 'com.github.tomakehurst:wiremock:2.27.2'
```

Here we have one test checking the presence and value of the header, and another test to check the header is absent if there is no request body:

```java
Copypackage com.example.demo;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import com.github.tomakehurst.wiremock.WireMockServer;
import com.github.tomakehurst.wiremock.client.WireMock;
import com.github.tomakehurst.wiremock.core.WireMockConfiguration;
import org.bouncycastle.jcajce.provider.digest.SHA512;
import org.bouncycastle.util.encoders.Hex;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.reactive.server.WebTestClient;

import static com.example.demo.RequestHashingGatewayFilterFactory.*;
import static com.example.demo.RequestHashingGatewayFilterFactoryTest.*;
import static com.github.tomakehurst.wiremock.client.WireMock.equalTo;
import static com.github.tomakehurst.wiremock.client.WireMock.postRequestedFor;
import static com.github.tomakehurst.wiremock.client.WireMock.urlEqualTo;
import static com.github.tomakehurst.wiremock.core.WireMockConfiguration.wireMockConfig;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

@SpringBootTest(
        webEnvironment = RANDOM_PORT,
        classes = RequestHashingFilterTestConfig.class)
@AutoConfigureWebTestClient
class RequestHashingGatewayFilterFactoryTest {

    @TestConfiguration
    static class RequestHashingFilterTestConfig {

        @Autowired
        RequestHashingGatewayFilterFactory requestHashingGatewayFilter;

        @Bean(destroyMethod = "stop")
        WireMockServer wireMockServer() {
            WireMockConfiguration options = wireMockConfig().dynamicPort();
            WireMockServer wireMock = new WireMockServer(options);
            wireMock.start();
            return wireMock;
        }

        @Bean
        RouteLocator testRoutes(RouteLocatorBuilder builder, WireMockServer wireMock)
                throws NoSuchAlgorithmException {
            Config config = new Config();
            config.setAlgorithm("SHA-512");

            GatewayFilter gatewayFilter = requestHashingGatewayFilter.apply(config);
            return builder
                    .routes()
                    .route(predicateSpec -> predicateSpec
                            .path("/post")
                            .filters(spec -> spec.filter(gatewayFilter))
                            .uri(wireMock.baseUrl()))
                    .build();
        }
    }

    @Autowired
    WebTestClient webTestClient;

    @Autowired
    WireMockServer wireMockServer;

    @AfterEach
    void afterEach() {
        wireMockServer.resetAll();
    }

    @Test
    void shouldAddHeaderWithComputedHash() {
        MessageDigest messageDigest = new SHA512.Digest();
        String body = "hello world";
        String expectedHash = Hex.toHexString(messageDigest.digest(body.getBytes()));

        wireMockServer.stubFor(WireMock.post("/post").willReturn(WireMock.ok()));

        webTestClient.post().uri("/post")
                .bodyValue(body)
                .exchange()
                .expectStatus()
                .isEqualTo(HttpStatus.OK);

        wireMockServer.verify(postRequestedFor(urlEqualTo("/post"))
                .withHeader("X-Hash", equalTo(expectedHash)));
    }

    @Test
    void shouldNotAddHeaderIfNoBody() {
        wireMockServer.stubFor(WireMock.post("/post").willReturn(WireMock.ok()));

        webTestClient.post().uri("/post")
                .exchange()
                .expectStatus()
                .isEqualTo(HttpStatus.OK);

        wireMockServer.verify(postRequestedFor(urlEqualTo("/post"))
                .withoutHeader("X-Hash"));
    }
}

```

To use the filter in our gateway, we add the `RequestHashing` filter to a route in `application.yaml`, using SHA-256 as the algorithm:

```yml
Copyspring:
  cloud:
    gateway:
      routes:
        - id: demo
          uri: https://httpbin.org
          predicates:
            - Path=/post/**
          filters:
            - RequestHashing=SHA-256
```

We’re using [https://httpbin.org](https://httpbin.org) as it shows our request headers in its returned response. Run the app and make a curl request to see the result:

```
Copy$> curl --request POST 'http://localhost:8080/post' \
--header 'Content-Type: application/json' \
--data-raw '{
    "data": {
        "hello": "world"
    }
}'

{
  ...
  "data": "{\n    \"data\": {\n        \"hello\": \"world\"\n    }\n}",
  "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Length": "48",
        "Content-Type": "application/json",
        "Forwarded": "proto=http;host=\"localhost:8080\";for=\"[0:0:0:0:0:0:0:1]:55647\"",
        "Host": "httpbin.org",
        "User-Agent": "PostmanRuntime/7.29.0",
        "X-Forwarded-Host": "localhost:8080",
        "X-Hash": "1bd93d38735501b5aec7a822f8bc8136d9f1f71a30c2020511bdd5df379772b8"
    },
  ...
}
```

In summary, we saw how to write a custom extension for Spring Cloud Gateway. Our filter read the body of the request to produce a hash that we added as a request header. We also wrote tests for the filter using WireMock to check the header value. Finally, we ran a gateway with the filter to verify the result.

If you're planning to deploy Spring Cloud Gateway on a Kubernetes cluster, be sure to checkout [VMware Spring Cloud Gateway for Kubernetes](https://docs.vmware.com/en/VMware-Spring-Cloud-Gateway-for-Kubernetes/index.html). In addition to supporting open-source Spring Cloud Gateway filters and custom filters, such as the one we wrote above, it comes with [even more built-in filters](https://docs.vmware.com/en/VMware-Spring-Cloud-Gateway-for-Kubernetes/1.1/scg-k8s/GUID-route-filters.html) to manipulate your request and responses. Spring Cloud Gateway for Kubernetes handles cross-cutting concerns on behalf of API development teams, such as: Single Sign-On (SSO), access control, rate limiting, resiliency, security, and more.