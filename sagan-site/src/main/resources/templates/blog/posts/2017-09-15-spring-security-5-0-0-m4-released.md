---
title: Spring Security 5.0.0 M4 Released
source: https://spring.io/blog/2017/09/15/spring-security-5-0-0-m4-released
scraped: 2026-02-23T16:21:59.859Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  September 15, 2017 | 5 Comments
---

# Spring Security 5.0.0 M4 Released

_Releases | Rob Winch |  September 15, 2017 | 5 Comments_

On behalf of the community, I’m pleased to announce the release of Spring Security 5.0.0 M4. This release includes bug fixes, new features, and is based off of Spring Framework 5.0.0 RC4. You can find complete details in the [changelog](https://github.com/spring-projects/spring-security/milestone/101?closed=1). The highlights of the release include:

-   [OAuth2 / OIDC](#oauth2-oidc)
    
    -   [OAuth2 Login Java Config](#oauth2-login-java-config)
        
    -   [Security Token Repository](#security-token-repository)
        
    -   [ID Token and Claims](#id-token-and-claims)
        
    -   [Authorization Request Improvements](#authorization-request-improvements)
        
    -   [OAuth2 Client Properties](#oauth2-client-properties)
        
    
-   [Reactive Security](#reactive-security)
    
    -   [Reactive Method Security](#reactive-method-security)
        
    -   [WebFlux Form Log In](#webflux-form-log-in)
        
    -   [WebFlux Content Negotiation](#webflux-content-negotiation)
        
    -   [WebFlux Session Optimizations](#webflux-session-optimizations)
        
    

# [](#oauth2-oidc)OAuth2 / OIDC

## [](#oauth2-login-java-config)OAuth2 Login Java Config

There are a number of improvements to the `HttpSecurity.oauth2Login()` DSL.

You can now configure the *Token Endpoint* with a custom implementation of an `AuthorizationGrantTokenExchanger` or `SecurityTokenRepository<AccessToken>`, as follows:

```java
Copyprotected void configure(HttpSecurity http) throws Exception {
  http
    .authorizeRequests()
      .anyRequest().authenticated()
      .and()
    .oauth2Login()
      .tokenEndpoint()
        .authorizationCodeTokenExchanger(this.authorizationCodeTokenExchanger())
	.accessTokenRepository(this.accessTokenRepository());
}
```

We’ve also added the capability of customizing the request paths for the *Authorization Endpoint* and *Redirection Endpoint*:

```java
Copyprotected void configure(HttpSecurity http) throws Exception {
  http
    .authorizeRequests()
      .anyRequest().authenticated()
      .and()
    .oauth2Login()
      .authorizationEndpoint()
        .requestMatcher(new AntPathRequestMatcher("/custom-path/{clientAlias}"))
        .and()
      .redirectionEndpoint()
        .requestMatcher(new AntPathRequestMatcher("/custom-path/callback/{clientAlias}"));
}
```

As with all `AbstractAuthenticationProcessingFilter` 's in Spring Security, you can also set a custom `AuthenticationSuccessHandler` and `AuthenticationFailureHandler`:

```java
Copyprotected void configure(HttpSecurity http) throws Exception {
  http
    .authorizeRequests()
      .anyRequest().authenticated()
      .and()
     .oauth2Login()
       .successHandler(this.customAuthenticationSuccessHandler())
       .failureHandler(this.customAuthenticationFailureHandler());
}
```

## [](#security-token-repository)Security Token Repository

We’ve introduced the `SecurityTokenRepository<T extends SecurityToken>` abstraction, which is responsible for the persistence of `SecurityToken` 's.

The initial implementation `InMemoryAccessTokenRepository` provides the persistence of `AccessToken` 's. In an upcoming release we’ll also provide an implementation that supports the persistence of *Refresh Token’s*.

## [](#id-token-and-claims)ID Token and Claims

A couple of minor improvements were introduced to the `IdToken` along with some final implementation details for `JwtClaimAccessor`, `StandardClaimAccessor` and `IdTokenClaimAccessor`, which provide convenient access to `claims` in their associated constructs, for example, `Jwt`, `IdToken`, `UserInfo`.

## [](#authorization-request-improvements)Authorization Request Improvements

We’ve added the capability for an `AuthorizationRequestRepository` to persist the *Authorization Request* to a `Cookie`. The current default implementation persists in the `HttpSession`, however, a custom implementation may be provided to persist to a `Cookie` instead.

Support was also added for `URI` variables configured in the `redirect-uri` for the `AuthorizationCodeRequestRedirectFilter`.

## [](#oauth2-client-properties)OAuth2 Client Properties

There were a couple of minor updates to the properties for configuring an OAuth 2.0 Client. The configuration below outlines the current structure. You will notice that there is support for configuring multiple clients, for example, google, github, okta, etc.

```yml
Copysecurity:
  oauth2:
    client:
      google:
        client-id: your-app-client-id
        client-secret: your-app-client-secret
        client-authentication-method: basic
        authorization-grant-type: authorization_code
        redirect-uri: "{scheme}://{serverName}:{serverPort}{contextPath}/oauth2/authorize/code/{clientAlias}"
        scope: openid, profile, email, address, phone
        authorization-uri: "https://accounts.google.com/o/oauth2/v2/auth"
        token-uri: "https://www.googleapis.com/oauth2/v4/token"
        user-info-uri: "https://www.googleapis.com/oauth2/v3/userinfo"
        user-name-attribute-name: "sub"
        jwk-set-uri: "https://www.googleapis.com/oauth2/v3/certs"
        client-name: Google
        client-alias: google
      github:
        ...
      okta:
        ...
```

---

A complete example for using the new Spring Security OAuth 2.0 / OpenID Connect 1.0 login feature can be found in the Spring Security samples at [oauth2login](https://github.com/spring-projects/spring-security/tree/5.0.0.M4/samples/boot/oauth2login). The guide will walk you through the steps for setting up the sample application for OAuth 2.0 login using an external OAuth 2.0 or OpenID Connect 1.0 Provider.

# [](#reactive-security)Reactive Security

## [](#reactive-method-security)Reactive Method Security

Spring Security’s Reactive support now includes method security by leveraging Reactor’s Context. The highlights are below, but you can find a complete example of it in action in [samples/javaconfig/hellowebflux-method](https://github.com/spring-projects/spring-security/tree/5.0.0.M4/samples/javaconfig/hellowebflux-method)

The first step is to use `@EnableReactiveMethodSecurity` to enable support for `@PreAuthorize` and `@PostAuthorize` annotations. This step ensures that the objects are properly proxied.

```java
Copy@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
public class SecurityConfig {
```

The next step is to create a service that is annotated with `@PreAuthorize` or `@PostAuthorize`. For example:

```java
Copy@PreAuthorize("hasRole('ADMIN')")
public Mono<String> findMessage() {
```

Spring Security’s WebFlux support will then ensure that the Reactor Context will be populated with the current user which is used to determine if access is granted or denied.

Spring Security’s standard `@WithMockUser` and [related annotations](https://docs.spring.io/spring-security/site/docs/current/reference/htmlsingle/#test-method) has been updated to work with Reactive Method Security. For example:

```java
Copy@RunWith(SpringRunner.class)
// ...
public class HelloWorldMessageServiceTests {
  @Autowired
  HelloWorldMessageService messages;
@Test
public void messagesWhenNotAuthenticatedThenDenied() {
StepVerifier.create(this.messages.findMessage())
.expectError(AccessDeniedException.class)
.verify();
}
@Test
@WithMockUser
public void messagesWhenUserThenDenied() {
StepVerifier.create(this.messages.findMessage())
.expectError(AccessDeniedException.class)
.verify();
}
```

The test support also works nicely with `TestWebClient`. For example:

```java
Copy@RunWith(SpringRunner.class)
// ...
public class HelloWebfluxMethodApplicationTests {
  @Autowired
  ApplicationContext context;
WebTestClient rest;
@Before
public void setup() {
this.rest = WebTestClient
.bindToApplicationContext(this.context)
// Setup Spring Security Test Support
.apply(springSecurity())
.configureClient()
.filter(basicAuthentication())
.build();
}
@Test
public void messageWhenNotAuthenticated() throws Exception {
this.rest
.get()
.uri("/message")
.exchange()
.expectStatus().isUnauthorized();
}
// --- authenticate with HTTP Basic ---
@Test
public void messageWhenUserThenForbidden() throws Exception {
this.rest
.get()
.uri("/message")
.attributes(robsCredentials())
.exchange()
.expectStatus().isEqualTo(HttpStatus.FORBIDDEN)
.expectBody().isEmpty();
}
@Test
public void messageWhenAdminThenOk() throws Exception {
this.rest
.get()
.uri("/message")
.attributes(adminCredentials())
.exchange()
.expectStatus().isOk()
.expectBody(String.class).isEqualTo("Hello World!");
}
// --- Use @WithMockUser ---
@Test
@WithMockUser
public void messageWhenWithMockUserThenForbidden() throws Exception {
this.rest
.get()
.uri("/message")
.exchange()
.expectStatus().isEqualTo(HttpStatus.FORBIDDEN)
.expectBody().isEmpty();
}
@Test
@WithMockUser(roles = "ADMIN")
public void messageWhenWithMockAdminThenOk() throws Exception {
this.rest
.get()
.uri("/message")
.exchange()
.expectStatus().isOk()
.expectBody(String.class).isEqualTo("Hello World!");
}
// --- Use mutateWith ---
@Test
public void messageWhenMockUserThenForbidden() throws Exception {
this.rest
.mutateWith(mockUser())
.get()
.uri("/message")
.exchange()
.expectStatus().isEqualTo(HttpStatus.FORBIDDEN)
.expectBody().isEmpty();
}
@Test
public void messageWhenMockAdminThenOk() throws Exception {
this.rest
.mutateWith(mockUser().roles("ADMIN"))
.get()
.uri("/message")
.exchange()
.expectStatus().isOk()
.expectBody(String.class).isEqualTo("Hello World!");
}
// ...
```

## [](#webflux-form-log-in)WebFlux Form Log In

WebFlux security now supports form based log in and provides a default log in page to ease getting started. For example, the [samples/javaconfig/hellowebflux\[samples/javaconfig/hellowebflux](https://github.com/spring-projects/spring-security/tree/5.0.0.M4/samples/javaconfig/hellowebflux-method) allows users to authenticate using form based log in with a default log in page.

```java
Copy@EnableWebFluxSecurity
public class HelloWebfluxSecurityConfig {
```

We decided to make the default log in page link to an external CSS file to make it look nicer without needing to bundle CSS. What do you think?

![Default Log In Page](https://user-images.githubusercontent.com/362503/30441057-e755170a-993d-11e7-9709-b100dd1432ce.png)

If you are not connected to the internet, the log in page falls back to an unstyled page. Of course, you can provide your own custom log in page as well.

## [](#webflux-content-negotiation)WebFlux Content Negotiation

Similar to the servlet world, we have also added content negotiation support for WebFlux security. For example, when requesting a protected resource without being authenticated our minimal example from [WebFlux Form Log In](#webflux-form-log-in) will produce a log in page in a web browser and a `WWW-Authenticate` response from a command line.

```http
Copy---
HTTP/1.1 401 Unauthorized
Cache-Control: no-cache, no-store, max-age=0, must-revalidate
Expires: 0
Pragma: no-cache
WWW-Authenticate: Basic realm="Realm"
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1 ; mode=block
content-length: 0
```

---

## [](#webflux-session-optimizations)WebFlux Session Optimizations

We have refined the way WebFlux authentication and session management works to give greater flexability than the servlet counterpart. For example, our minimal example from [WebFlux Form Log In](#webflux-form-log-in) will produce the following result when authenticating using form based log in:

```http
CopyPOST /login HTTP/1.1
Accept: */*
Accept-Encoding: gzip, deflate
Connection: keep-alive
Content-Length: 27
Content-Type: application/x-www-form-urlencoded; charset=utf-8
Host: localhost:8080
```

username=user&password=user

HTTP/1.1 302 Found Cache-Control: no-cache, no-store, max-age=0, must-revalidate Expires: 0 Location: / Pragma: no-cache X-Content-Type-Options: nosniff X-Frame-Options: DENY X-XSS-Protection: 1 ; mode=block content-length: 0 set-cookie: SESSION=1e04aa3c-5a15-42ed-9e25-933fd0e44b2a; HTTPOnly

However, the very same code will produce the following response for HTTP Basic authentication

```http
CopyGET / HTTP/1.1
Accept: */*
Accept-Encoding: gzip, deflate
Authorization: Basic dXNlcjp1c2Vy
Connection: keep-alive
Host: localhost:8080
HTTP/1.1 200 OK
Cache-Control: no-cache, no-store, max-age=0, must-revalidate
Content-Type: application/json;charset=UTF-8
Expires: 0
Pragma: no-cache
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1 ; mode=block
transfer-encoding: chunked
```

Notice that the form based login has a SESSION cookie in the response, but HTTP Basic does not. This is done with a single `HttpSecurity` configuration (we are splitting the application into slices).

## [](#feedback-please)Feedback Please

If you have feedback on this release, I encourage you to reach out via [StackOverflow](http://stackoverflow.com/questions/tagged/spring-security), [GitHub Issues](https://github.com/spring-projects/spring-security/issues), or via the comments section. You can also ping me [@rob\_winch](https://twitter.com/rob_winch) or Joe [@joe\_grandja](https://twitter.com/joe_grandja) on Twitter.

Of course the best feedback comes in the form of [contributions](https://github.com/spring-projects/spring-security/blob/5.0.0.M4/CONTRIBUTING.md).

[Project Site](http://projects.spring.io/spring-security/) | [Reference](http://docs.spring.io/spring-security/site/docs/5.0.0.M4/reference/htmlsingle/) | [Guides](http://docs.spring.io/spring-security/site/docs/current/guides/html5/) | [Help](http://stackoverflow.com/questions/tagged/spring-security)