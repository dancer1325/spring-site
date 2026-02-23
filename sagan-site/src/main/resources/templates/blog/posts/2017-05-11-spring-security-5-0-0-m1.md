---
title: Spring Security 5.0.0 M1
source: https://spring.io/blog/2017/05/11/spring-security-5-0-0-m1
scraped: 2026-02-23T16:31:59.398Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  May 11, 2017 | 11 Comments
---

# Spring Security 5.0.0 M1

_Releases | Rob Winch |  May 11, 2017 | 11 Comments_

On behalf of the community, I'm pleased to announce the release of Spring Security 5.0.0 M1. This release includes bug fixes, new features, and is based off of Spring Framework 5.0.0 RC1. The highlights of the release include:

-   [Initial Support for Reactive Web Applications](#initial-support-for-reactive-web-applications)
-   [New Support for OAuth 2.0 and OpenID Connect 1.0](#new-support-for-oauth-2-0-and-openid-connect-1-0)

# [](#initial-support-for-reactive-web-applications)Initial Support for Reactive Web Applications

Following one of the primary themes of Spring Framework 5.0, Spring Security 5.0 will add support for Reactive applications by building on top of Spring's reactive support. The first milestone focused on getting primary infrastructure in place.

A complete example of using Spring Security to secure a Spring WebFlux application can be found in the Spring Security samples at [hellowebflux](https://github.com/spring-projects/spring-security/blob/5.0.0.M1/samples/javaconfig/hellowebflux).

A quick highlight of the code can be found below:

```java
Copy@Bean
WebFilter springSecurityFilterChain(ReactiveAuthenticationManager manager) {
  HttpSecurity http = http();
  http.authenticationManager(manager);
  http.httpBasic();

  AuthorizeExchangeBuilder authorize = http.authorizeExchange();
  authorize.antMatchers("/admin/**").hasRole("ADMIN");
  authorize.antMatchers("/users/{user}/**").access(this::currentUserMatchesPath);
  authorize.anyExchange().authenticated();
  return http.build();
}
```

The code should look familiar if you have used Spring Security's web based authorization support.

One important thing to notice is that in reactive applications `access` allows for an interface to be injected rather than a `String`. This allows for lambda's or method references to be used for custom authorization logic. For example, `currentUserMatchesPath` looks like this:

```java
CopyMono<AuthorizationDecision> currentUserMatchesPath(
    Mono<Authentication> authentication, AuthorizationContext context) {
  return authentication
    .map( a -> context.getVariables().get("user").equals(a.getName()))
    .map( granted -> new AuthorizationDecision(granted));
}
```

Obviously we could have just used a lambda rather than a method reference, but this is a little easier to read (especially when there might be more rules).

# [](#new-support-for-oauth-20-and-openid-connect-10)New Support for OAuth 2.0 and OpenID Connect 1.0

We are very excited to introduce new support for [OAuth 2.0 Authorization Framework](https://tools.ietf.org/html/rfc6749) and [OpenID Connect 1.0](http://openid.net/connect/) in Spring Security 5. The initial support in M1 is primarily focused on the **OAuth Client** role, providing the capability for authenticating the end-user against an OAuth 2.0 Provider (for example, Facebook) or an OpenID Connect 1.0 Provider (for example, Google).

The **OAuth 2.0 Login** feature essentially realizes the use case *"Login with Google"* or *"Login with Facebook"* and is implemented by leveraging the [Authorization Code Grant](https://tools.ietf.org/html/rfc6749#section-4.1) flow, as specified in the [OAuth 2.0 Authorization Framework](https://tools.ietf.org/html/rfc6749).

The best place to start learning on how to use *OAuth 2.0 Login* is to follow the [guide](https://github.com/spring-projects/spring-security/blob/5.0.0.M1/samples/boot/oauth2login/README.adoc) and associated [sample](https://github.com/spring-projects/spring-security/tree/5.0.0.M1/samples/boot/oauth2login). The guide will walk you through setting up *OAuth 2.0 Login* with Google, GitHub, Facebook and Okta.

## [](#the-future-of-oauth-in-spring-security)The Future of OAuth in Spring Security

Support for OAuth is currently spread out in the following Spring projects:

-   [Spring Security OAuth](http://projects.spring.io/spring-security-oauth/)
-   [Spring Social](http://projects.spring.io/spring-social/)
-   [Spring Cloud Security](http://cloud.spring.io/spring-cloud-security/)
-   [Spring Boot's OAuth2 SSO Support](http://docs.spring.io/spring-boot/docs/1.5.3.RELEASE/reference/htmlsingle/#boot-features-security-oauth2-single-sign-on)

With Spring Security 5, the main direction going forward is to build first-class support for [OAuth 2.0 Authorization Framework](https://tools.ietf.org/html/rfc6749), [OpenID Connect 1.0](http://openid.net/connect/), [JWT](https://tools.ietf.org/search/rfc7519), and JOSE ([JWS](https://tools.ietf.org/html/rfc7515)/[JWE](https://tools.ietf.org/html/rfc7516)/[JWK](https://tools.ietf.org/html/rfc7517)) into Spring Security proper. The goal is to have Spring Security *"house"* the core logic for the lower-level protocol flows, for example, the *"authorization code grant"* flow, which would then be reused by the various Spring projects requiring it, such as, Spring Social. A lot of the protocol flow logic has already been implemented in Spring Security OAuth, however, the decision was made to do a re-write as we incorporate it into Spring Security proper. That being said, the Spring Security OAuth project is in maintenance mode as we are limiting new features and focusing on bug fixes and minor enhancements only. Our efforts going forward will be focused on building out the support within Spring Security.

The ultimate goal with the new support for OAuth 2.0 and OpenID Connect 1.0 is to provide an easy-to-use abstraction on top of the lower-level protocol flows that are inherently complex. In order to move quickly and stay current, we are leveraging [Nimbus OAuth 2.0 and OIDC SDK](https://connect2id.com/products/nimbus-oauth-openid-connect-sdk) for our internal implementation. As a key preliminary step before we proceeded with the re-write, we researched and evaluated existing OAuth 2.0 and OpenID Connect 1.0 Java libraries available in the open source community and documented our findings [here](https://github.com/spring-projects/spring-security/issues/3907#issuecomment-257600002). As a result of this evaluation phase, we found Nimbus OAuth 2.0 and OIDC SDK to be the most mature and comprehensive Java library available today as it provides extensive support for all the relevant [specifications](https://connect2id.com/products/nimbus-oauth-openid-connect-sdk#related-specifications).

---

In the upcoming 5.0.0 M2 release we plan to build further support for reactive based security and OAuth 2.0 and OpenID Connect 1.0. We would greatly appreciate any feedback on these new features and if you have anything that you would like prioritized, please create an [issue](https://github.com/spring-projects/spring-security/issues).

[Project Site](http://projects.spring.io/spring-security/) | [Reference](http://docs.spring.io/spring-security/site/docs/5.0.0.M1/reference/htmlsingle/) | [Guides](http://docs.spring.io/spring-security/site/docs/current/guides/html5/) | [Help](http://stackoverflow.com/questions/tagged/spring-security)