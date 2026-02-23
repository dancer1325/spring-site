---
title: Spring Authorization Server is on Spring Initializr!
source: https://spring.io/blog/2023/05/24/spring-authorization-server-is-on-spring-initializr
scraped: 2026-02-23T09:48:27.402Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Steve Riesenberg |  May 24, 2023 | 4 Comments
---

# Spring Authorization Server is on Spring Initializr!

_Engineering | Steve Riesenberg |  May 24, 2023 | 4 Comments_

Today, I'm excited to announce that you have a new superpower: creating applications with [Spring Authorization Server](https://spring.io/projects/spring-authorization-server) on [Spring Initializr](https://start.spring.io)!

That's right, it's time to begin your OAuth2 journey and become the hero you always knew you could be! In this post, I'll explain how you can get the most from your new superpower and where to go to learn more.

## [](#what-is-spring-authorization-server)What is Spring Authorization Server?

Spring Authorization Server is an open-source framework built on top of Spring Security that allows you to create your own standards-based OAuth2 Authorization Server or OpenID Connect Provider. It implements many of the protocol endpoints available in the various OAuth2 and OIDC-related specifications, allowing you to focus more on your applications and users and less on flows and specifications. Because it sits atop Spring Security, it can also be used to create an authentication hub for adapting other authentication protocols to OAuth2.

You can learn more about Spring Authorization Server in the [Overview](https://docs.spring.io/spring-authorization-server/docs/current/reference/html/overview.html) on the [Reference Guide](https://docs.spring.io/spring-authorization-server/docs/current/reference/html/index.html).

## [](#getting-started)Getting Started

The journey to save the world from an evil creature attempting to extinguish all life has to start somewhere, and your journey to becoming an OAuth2 hero is no different! To get started, download this [sample application](https://start.spring.io/#!type=gradle-project&language=java&packaging=jar&groupId=io.spring&artifactId=demo-authorizationserver&name=Demo%20Authorization%20Server&description=Demo%20authorization%20server%20using%20Spring%20Boot%20and%20Spring%20Authorization%20Server.&packageName=io.spring&dependencies=oauth2-authorization-server) or head to [start.spring.io](https://start.spring.io) and add the OAuth2 Authorization Server dependency to your project.

Then, open the project in your favorite IDE and add the following to `application.properties`:

```properties
Copyspring.security.oauth2.authorizationserver.client.client-1.registration.client-id=admin-client
# the client secret is "secret" (without quotes)
spring.security.oauth2.authorizationserver.client.client-1.registration.client-secret={bcrypt}$2a$10$jdJGhzsiIqYFpjJiYWMl/eKDOd8vdyQis2aynmFN0dgJ53XvpzzwC
spring.security.oauth2.authorizationserver.client.client-1.registration.client-authentication-methods=client_secret_basic
spring.security.oauth2.authorizationserver.client.client-1.registration.authorization-grant-types=client_credentials
spring.security.oauth2.authorizationserver.client.client-1.registration.scopes=user.read,user.write
```

Alternatively, you can rename `application.properties` to `application.yml` and add the following:

```yaml
Copyspring:
  security:
    oauth2:
      authorizationserver:
        client:
          client-1:
            registration:
              client-id: "admin-client"
              # the client secret is "secret" (without quotes)
              client-secret: "{bcrypt}$2a$10$jdJGhzsiIqYFpjJiYWMl/eKDOd8vdyQis2aynmFN0dgJ53XvpzzwC"
              client-authentication-methods: "client_secret_basic"
              authorization-grant-types: "client_credentials"
              scopes: "user.read,user.write"
```

To start the application, run the following command:

```shell
Copy./gradlew bootRun
```

This gives you an application with the following features out of the box:

-   A servlet-based web application secured with Spring Security
-   A standards-compliant authorization server with a Token Endpoint for obtaining an OAuth2 Access Token (JWT)
-   A generated in-memory RSA keypair that will be used to sign a JWT
-   A JWK-Set Endpoint[1](#fn-1) for obtaining the generated public key
-   An OAuth2 Authorization Server Metadata Endpoint[2](#fn-2) for discovering authorization server configuration
-   An OpenID Connect Provider Configuration Endpoint[3](#fn-3) for discovering OIDC provider configuration
-   An OAuth2 Introspection Endpoint for using opaque tokens or getting info about a token (including a JWT)
-   An OAuth2 Revocation Endpoint for revoking refresh tokens (or opaque access tokens)
-   A single in-memory client (with [pre-hashed secret](https://docs.spring.io/spring-boot/docs/current/reference/html/cli.html#cli.using-the-cli)) registered with the authorization server to support the Client Credentials flow

Of course, there's more than this but you can check the [feature list](https://docs.spring.io/spring-authorization-server/docs/current/reference/html/overview.html#feature-list) for the complete list.

## [](#getting-an-access-token)Getting an Access Token

So what can we do with this? Using the above example, we'll start with the Client Credentials flow which is the easiest to understand. I'll use [HTTPie](https://httpie.io/cli) on the command line to demonstrate, and you can follow along at home (or work).

Run the following command:

```shell
Copyhttp -f POST :8080/oauth2/token grant_type=client_credentials scope='user.read' -a admin-client:secret
```

This produces a response similar to the following:

```json
Copy{
    "access_token": "eyJraWQiOiJhMWZjM2JhOC0zY2IwLTRkZjAtYTQwNS03ZDhhY2YxYTY4NGIiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbi1jbGllbnQiLCJhdWQiOiJhZG1pbi1jbGllbnQiLCJuYmYiOjE2ODQ1MjYzOTgsInNjb3BlIjpbInVzZXIucmVhZCJdLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAiLCJleHAiOjE2ODQ1MjY2OTgsImlhdCI6MTY4NDUyNjM5OH0.sHDGoQGDpdBuhvdiIpFeeCtTUeU860FBeV23rS6Zqb8tjq_Pytj_Y4Xl6pBB2R5rTAZdMg0cwLvICVYBz-x-hGz2UbHFtYGmo24byb3iKGqBb2BjtY5mMuYQOdnW_PgUVV4vtElhTYkkN_uET4CZ3zxIhgPEc2Yvtt0-d2lGwXzkDiHb_US1zDSUO36nqs4cesMD-yzy5tVmr1e2c6Klojyv6nFN1edfTn7Ci5GvEeB4lDnQdm3ZJr4fyxSiSrq7T34ghj6fMqYn_-lazpoc-wWPB5I35NM0TkUyDw2e_XobqIm6oXG0tBDujL2SK6P05n5MDKkGhgsQlT_ER9gmqA",
    "expires_in": 299,
    "scope": "user.read",
    "token_type": "Bearer"
}
```

The `access_token` in the response is a signed JWT that can be used to make an authenticated request to an OAuth2 resource server with the `user.read` scope to access protected resources. In other words, with a Spring Boot app and just a few properties, we are able to easily mint signed JWTs and begin securing applications with OAuth2. Of course, it's equally trivial to set up a resource server with Spring Security, but I'll leave that up to you as a test of the superpowers you didn't know you had.

## [](#introspecting-an-access-token)Introspecting an Access Token

To keep things simple, let's test this token out using the Introspection Endpoint.

NOTE: Keep in mind that the token will expire after 5 minutes.

Run the following commands, making sure to paste the actual `access_token` in place of the example:

```shell
Copyexport TOKEN=eyJraW...
http -f POST :8080/oauth2/introspect token=$TOKEN -a admin-client:secret
```

This produces a response similar to the following:

```json
Copy{
    "active": true,
    "aud": [
        "admin-client"
    ],
    "client_id": "admin-client",
    "exp": 1684526698,
    "iat": 1684526398,
    "iss": "http://localhost:8080",
    "nbf": 1684526398,
    "scope": "user.read",
    "sub": "admin-client",
    "token_type": "Bearer"
}
```

If instead you see this response:

```json
Copy{
    "active": false
}
```

then the token likely expired.

If you'd like to dive a little deeper and explore what's happening, you can enable trace logging to get additional debugging details. You can also shorten the expiration time of the token to something extremely short, like 30 seconds, to make it easier to get an expired token.

Add the following to your `application.properties`:

```properties
Copylogging.level.org.springframework.security=trace
spring.security.oauth2.authorizationserver.client.client-1.token.access-token-time-to-live=30s
```

Or if you're using `application.yml`, add the following:

```yaml
Copylogging:
  level:
    org.springframework.security: trace

spring:
  security:
    oauth2:
      authorizationserver:
        client:
          client-1:
            registration:
              ...
            token:
              access-token-time-to-live: 30s
```

Then restart the application, and try the above steps again. After making the introspection request, you will see lines like:

```
CopyFilterChainProxy : Trying to match request against DefaultSecurityFilterChain [...] (1/2)
FilterChainProxy : Securing POST /oauth2/introspect
FilterChainProxy : Invoking DisableEncodeUrlFilter (1/25)
...
```

There are two interesting things happening. Several lines later in the logs, you will see output like the following:

```
Copy...
FilterChainProxy                   : Invoking OAuth2ClientAuthenticationFilter (14/25)
ProviderManager                    : Authenticating request with JwtClientAssertionAuthenticationProvider (1/18)
ProviderManager                    : Authenticating request with ClientSecretAuthenticationProvider (2/18)
ClientSecretAuthenticationProvider : Retrieved registered client
ClientSecretAuthenticationProvider : Validated client authentication parameters
ClientSecretAuthenticationProvider : Authenticated client secret
OAuth2ClientAuthenticationFilter   : Set SecurityContextHolder authentication to OAuth2ClientAuthenticationToken
...
```

This tells us that the client (our own CLI) successfully authenticated with HTTP basic authentication via the `ClientSecretAuthenticationProvider`. This is why we receive a `200 OK` response, but it would be nice to confirm via the logs that the token introspection request was successful. Several lines later, you will see output like this:

```
Copy...
FilterChainProxy                         : Invoking OAuth2TokenIntrospectionEndpointFilter (22/25)
ProviderManager                          : Authenticating request with OAuth2TokenIntrospectionAuthenticationProvider (1/18)
TokenIntrospectionAuthenticationProvider : Retrieved authorization with token
TokenIntrospectionAuthenticationProvider : Did not introspect token since not active
...
```

Here we see the `OAuth2TokenIntrospectionAuthenticationProvider` processing the request, but the token was not active. So, we can confirm that the request was successful and the token is expired.

## [](#whats-next)What's Next?

We've only scratched the surface of what you can do with your new superpower! The main thing I hope you take away is that you can now use Spring Initializr to create your own personal OAuth2 and OpenID Connect playground with Spring Authorization Server.

When you're ready, I'd encourage you to read the [Reference Guide](https://docs.spring.io/spring-authorization-server/docs/current/reference/html/index.html) which contains detailed information on each and every feature and configuration option available. I'd particularly recommend the guide [How-to: Authenticate with Social Login](https://docs.spring.io/spring-authorization-server/docs/current/reference/html/guides/how-to-social-login.html) as a great way to learn and explore.

Perhaps the best way to learn about OAuth2 and Spring Authorization Server is to build a sample OAuth2 architecture with (at least) three apps:

1.  OAuth2 Client (using OpenID Connect)
2.  OAuth2 Resource Server
3.  OAuth2 Authorization Server

Take a look at the available [samples](https://github.com/spring-projects/spring-authorization-server/tree/main/samples) which demonstrate all three of these apps, and try to build your own using nothing but Spring Initializr! Once you've accomplished that, the future is really up to you!

Now go save the world!

[Project Page](https://spring.io/projects/spring-authorization-server) | [GitHub Issues](https://github.com/spring-projects/spring-authorization-server/issues) | [ZenHub Board](https://app.zenhub.com/workspaces/authorization-server-5e8f3182b5e8f5841bfc4902/board?repos=248032165)

Notes:

---

1.  The JWK-Set Endpoint is available at [http://localhost:8080/oauth2/jwks](http://localhost:8080/oauth2/jwks) when the application is running.[↩](#fnref-1)
2.  The OAuth2 Authorization Server Metadata Endpoint is available at [http://localhost:8080/.well-known/oauth-authorization-server](http://localhost:8080/.well-known/oauth-authorization-server) when the application is running.[↩](#fnref-2)
3.  The OpenID Connect Provider Configuration Endpoint is available at [http://localhost:8080/.well-known/openid-configuration](http://localhost:8080/.well-known/openid-configuration) when the application is running.[↩](#fnref-3)