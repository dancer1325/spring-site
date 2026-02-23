---
title: Token Exchange support in Spring Security 6.3.0-M3
source: https://spring.io/blog/2024/03/19/token-exchange-support-in-spring-security-6-3-0-m3
scraped: 2026-02-23T08:50:37.780Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Steve Riesenberg |  March 19, 2024 | 10 Comments
---

# Token Exchange support in Spring Security 6.3.0-M3

_Engineering | Steve Riesenberg |  March 19, 2024 | 10 Comments_

I'm excited to share that there will be support for the OAuth 2.0 Token Exchange Grant ([RFC 8693](https://datatracker.ietf.org/doc/html/rfc8693 "OAuth 2.0 Token Exchange")) in Spring Security 6.3, which is available for preview now in the latest milestone ([6.3.0-M3](https://github.com/spring-projects/spring-security/releases/tag/6.3.0-M3)). This support provides the ability to use Token Exchange with [OAuth2 Client](https://docs.spring.io/spring-security/reference/servlet/oauth2/index.html). Similarly, server-side support is also shipping with [Spring Authorization Server](https://docs.spring.io/spring-authorization-server/reference/index.html) in 1.3 and is available for preview now in the latest milestone ([1.3.0-M3](https://github.com/spring-projects/spring-authorization-server/releases/tag/1.3.0-M3)).

OAuth2 Client features of Spring Security allow us to easily make protected resources requests to an API secured with OAuth2 bearer tokens. Similarly, OAuth2 Resource Server features of Spring Security allow us to secure an API with OAuth2. Let's take a look at how we can use the new support to build OAuth2 flows with Token Exchange.

## [](#an-example)An example

Let's imagine we have a resource server called `user-service` providing an API to access user information. In order to make requests to `user-service`, clients must provide an access token. Let's assume tokens must have an audience (`aud` claim) of `user-service`. This might look like the following as Spring Boot configuration properties:

```yaml
Copyspring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: https://my-auth-server.com
          audiences: user-service
```

Now let's imagine we want to introduce a new resource server called `message-service` and call it from `user-service`. Let's assume then that tokens for this new service must have an audience of `message-service`. Clearly we can't re-use the token from a request to `user-service` in a request to `message-service`. However, we'd like the identity of the user from the original request to be preserved. How would we accomplish this?

In order to obtain the necessary access token for `message-service`, the resource server `user-service` must become a client and exchange an existing token for a new one that retains the identity (user) of the original token. This is called ["impersonation"](https://datatracker.ietf.org/doc/html/rfc8693#name-delegation-vs-impersonation) and is exactly the kind of scenario OAuth 2.0 Token Exchange is designed for.

## [](#configuring-the-resource-server-as-a-client)Configuring the resource server as a client

To enable Token Exchange, we need to configure `user-service` to act as both a resource server *and* a client that can use Token Exchange, as the following Spring Boot configuration properties show:

```yaml
Copyspring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: https://my-auth-server.com
          audiences: user-service
      client:
        registration:
          my-token-exchange-client:
            provider: my-auth-server
            client-id: token-client
            client-secret: token
            authorization-grant-type: urn:ietf:params:oauth:grant-type:token-exchange
            client-authentication-method: client_secret_basic
            scope:
                - message.read
        provider:
          my-auth-server:
            issuer-uri: https://my-auth-server.com
```

We also need to enable the use of the new grant type in Spring Security, which we can do by publishing the following bean:

```java
Copy    @Bean
    public OAuth2AuthorizedClientProvider tokenExchange() {
        return new TokenExchangeOAuth2AuthorizedClientProvider();
    }
```

This is all that is required to begin using Token Exchange. However, if we want to request a specific `audience` or `resource` value, we need to configure additional parameters as part of the token request, as the following example shows:

```java
Copy    @Bean
    public OAuth2AuthorizedClientProvider tokenExchange() {
        var requestEntityConverter = new TokenExchangeGrantRequestEntityConverter();
        requestEntityConverter.addParametersConverter((grantRequest) -> {
            var parameters = new LinkedMultiValueMap<String, String>();
            parameters.add(OAuth2ParameterNames.AUDIENCE, "message-service");
            parameters.add(OAuth2ParameterNames.RESOURCE, "https://example.com/messages");

            return parameters;
        });

        var accessTokenResponseClient = new DefaultTokenExchangeTokenResponseClient();
        accessTokenResponseClient.setRequestEntityConverter(requestEntityConverter);

        var authorizedClientProvider = new TokenExchangeOAuth2AuthorizedClientProvider();
        authorizedClientProvider.setAccessTokenResponseClient(accessTokenResponseClient);

        return authorizedClientProvider;
    }
```

With this configuration in place, we can obtain an access token in one resource server and use it as a `Bearer` token in a protected resources request to another resource server. The original bearer token passed to the resource server in the `Authorization` header will be used by default to obtain the new access token.

> **TIP**: See [Authorized Client Features](https://docs.spring.io/spring-security/reference/servlet/oauth2/client/authorized-clients.html) in the reference documentation for more information on how to obtain an access token and make a protected resources request with this configuration.

## [](#enabling-token-exchange-on-the-server)Enabling Token Exchange on the server

To complete the picture, let's build a brand new authorization server application with Spring Authorization Server to support this flow.

Using [Spring Initializr](https://start.spring.io/) with the [OAuth2 Authorization Server](https://start.spring.io/#!type=gradle-project&language=java&packaging=jar&groupId=com.example&artifactId=auth-server&name=auth-server&description=Demo%20Spring%20Authorization%20Server%20project&packageName=com.example&dependencies=oauth2-authorization-server) dependency, we can configure a fully functional authorization server using the following Spring Boot configuration properties:

```yaml
Copyspring:
  security:
    user:
      name: sally
      password: password
    oauth2:
      authorizationserver:
        client:
          test-client:
            registration:
              client-id: test-client
              client-secret: {noop}secret
              client-authentication-methods:
                - client_secret_basic
              authorization-grant-types:
                - authorization_code
                - refresh_token
              scopes:
                - user.read
          token-client:
            registration:
              client-id: token-client
              client-secret: {noop}token
              client-authentication-methods:
                - client_secret_basic
              authorization-grant-types:
                - urn:ietf:params:oauth:grant-type:token-exchange
              scopes:
                - message.read
```

As with the client, we may want to support specific request parameters for Token Exchange such as `audience` or `resource`, which we can do by publishing the following bean:

```java
Copy	@Bean
	public OAuth2TokenCustomizer<JwtEncodingContext> accessTokenCustomizer() {
		return (context) -> {
			if (AuthorizationGrantType.TOKEN_EXCHANGE.equals(context.getAuthorizationGrantType())) {
				OAuth2TokenExchangeAuthenticationToken tokenExchangeAuthentication = context.getAuthorizationGrant();
				Set<String> resources = tokenExchangeAuthentication.getResources();
				// TODO: Validate resource value(s) and map to the
				//  appropriate audience value(s) if needed...

				context.getClaims().audience(...);
			}
		};
	}
```

With this configuration in place, the authorization server supports the Token Exchange grant with the optional `resource` parameter of the OAuth 2.0 Token Request, and is able to issue tokens allowing a resource server to act as a client and impersonate an end user.

## [](#conclusion)Conclusion

In this blog post, we have discussed the "impersonation" use case for Token Exchange and explored a simple configuration for both a resource server (acting as a client) and an authorization server.

> **TIP**: See [Appendix A](https://datatracker.ietf.org/doc/html/rfc8693#section-appendix.a) of [RFC 8693](https://datatracker.ietf.org/doc/html/rfc8693) for additional examples including an example of an additional use case called "delegation" which is also supported.

I hope you are as excited as I am about this new support! I encourage you to try out the [samples](https://github.com/spring-projects/spring-authorization-server/tree/main/samples) in Spring Authorization Server which includes a working example of this blog post. Please also try the milestones of both Spring Security and Spring Authorization Server in your own project. We would love your feedback!