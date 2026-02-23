---
title: Spring Security 5.1.0.M2 Released
source: https://spring.io/blog/2018/07/30/spring-security-5-1-0-m2-released
scraped: 2026-02-23T15:17:50.597Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  July 30, 2018 | 0 Comments
---

# Spring Security 5.1.0.M2 Released

_Releases | Rob Winch |  July 30, 2018 | 0 Comments_

On behalf of the community I am pleased to announce the release of Spring Security 5.1.0.M2. This release comes with [100+ tickets](https://github.com/spring-projects/spring-security/milestone/106) closed.

As always we look forward to hearing your [feedback](https://github.com/spring-projects/spring-security/issues)! You can find the highlights below:

# [](#oauth2)[](#oauth2)OAuth2

## [](#oauth2-resource-server)[](#oauth2-resource-server)OAuth2 Resource Server

Basic support for OAuth2 Resource Servers has been added. See [oauth2resourceserver](https://github.com/spring-projects/spring-security/tree/5.1.0.M2/samples/boot/oauth2resourceserver)

## [](#authorization-code-flow)[](#authorization-code-flow)Authorization Code Flow

User’s can now obtain an access token using the OAuth 2.0 Authorization Code grant. See the [authcodegrant](https://github.com/spring-projects/spring-security/tree/5.1.0.M2/samples/boot/authcodegrant) sample.

## [](#webclient-and-oauth2-support)[](#webclient-and-oauth2-support)WebClient and OAuth2 Support

There is now built in support for OAuth2 and WebClient support. The support allows:

-   Adding the access token to the request
    
-   Automatic refreshing of the access token when it expires
    
-   Resolving the access token to use
    

For example, in a Servlet environment you can configure a Bean like this:

```
Copy@Bean
WebClient webClient(OAuth2AuthorizedClientRepository repository) {
    ServletOAuth2AuthorizedClientExchangeFilterFunction filter =
        new ServletOAuth2AuthorizedClientExchangeFilterFunction(repository);
    return WebClient.builder()
        .filter(new OAuth2AuthorizedClientExchangeFilterFunction())
        .apply(filter.oauth2Configuration())
        .build();
 }
```

Now you can add the OAuth token in a number of different ways. If you want you can resolve the `OAuth2AuthorizedClient` using the Spring MVC support. If the authorization server returned a refresh token and the access token is about to expire, Spring Security will transparently update the access token and submit the updated access token instead.

```
Copy@GetMapping("/users")
Mono<String> users(@RegisteredOAuth2AuthorizedClient("client-id")
        OAuth2AuthorizedClient authorizedClient) {
    return this.webClient.get()
        .uri("https://api.example.com/user")
        .attributes(oauth2AuthorizedClient(authorizedClient))
        .retrieve()
        .bodyToMono(String.class);
}
```

You can also resolve the access token through the `WebClient`. Fore example:

```
CopyMono<String> users() {
    return this.webClient.get()
        .uri("https://api.example.com/user")
        .attributes(clientRegistrationId("client-id"))
        .retrieve()
        .bodyToMono(String.class);
}
```

If you authenticated using OAuth2 Log In or OIDC, then a default access token can be applied with no user interaction.

```
CopyMono<String> users() {
    // if Authenticated with OIDC
    // OAuth2 Log In use the access token associated to log in
    return this.webClient.get()
        .uri("https://api.example.com/user")
        .retrieve()
        .bodyToMono(String.class);
}
```

## [](#webflux-oauth2-log-in-supports-oidc)[](#webflux-oauth2-log-in-supports-oidc)WebFlux OAuth2 Log In Supports OIDC

WebFlux applications can now authenticate with both OAuth2 and OIDC. See [oauth2login-webflux](https://github.com/spring-projects/spring-security/tree/master/samples/boot/oauth2login-webflux) for a sample.

## [](#ability-to-create-clientregistration-from-oidc-discovery)[](#ability-to-create-clientregistration-from-oidc-discovery)Ability to Create ClientRegistration from OIDC Discovery

Previously users wanting to integrate with an OIDC provider needed to configure all of the endpoints. For example, in Spring Boot it looked like:

```
Copyspring:
  security:
    oauth2:
      client:
        registration:
          okta:
            client-id: okta-client-id
            client-secret: okta-client-secret
        provider:
          okta:
            authorization-uri: https://foo.oktapreview.com/oauth2/v1/authorize
            token-uri: https://foo.oktapreview.com/oauth2/v1/token
            user-info-uri: https://foo.oktapreview.com/oauth2/v1/userinfo
            user-name-attribute: sub
            jwk-set-uri: https://foo.oktapreview.com/oauth2/v1/keys
```

Now users can just configure the issuer uri. For example:

```
Copyspring:
  security:
    oauth2:
      client:
        registration:
          okta:
            client-id: okta-client-id
            client-secret: okta-client-secret
        provider:
          okta:
            issuer-uri: https://foo.oktapreview.com/oauth2/default/
```

## [](#support-custom-authorization-requests)[](#support-custom-authorization-requests)Support Custom Authorization Requests

Support for custom authorization requests has been added with the addition of `OAuth2AuthorizationRequestResolver`. For example, if a user wants to add/remove scopes from the request they can easily do so now.

## [](#single-clientregistration-now-redirects-on-log-in)[](#single-clientregistration-now-redirects-on-log-in)Single ClientRegistration Now Redirects on Log In

When OAuth2 / OIDC log in is configured with a single provider, rather than displaying only one provider the default has been changed to redirect to the provider immediately.

# [](#configuration-improvements)[](#configuration-improvements)Configuration Improvements

## [](#modernize-the-default-log-in-page)[](#modernize-the-default-log-in-page)Modernize the Default Log In Page

The default log in page has been modernized to html5 to look more visually appealing.

## [](#default-log-out-page)[](#default-log-out-page)Default Log Out Page

Since the addition of CSRF log out protection, the default application has no way to log out. Now if the default log in page is being used (i.e. no log in page has been configured), then there is also a default log out page that presents a log out form.

## [](#simplify-requestcache-configuration)[](#simplify-requestcache-configuration)Simplify RequestCache Configuration

User’s can now configure the default RequestCache that is used by exposing it as a `@Bean`. The `HttpSessionRequestCache` has been updated to no longer require the value to be a `DefaultRequestCache`.

# [](#hardening-your-application)[](#hardening-your-application)Hardening Your Application

## [](#cross-site-tracing--http-verb-tampering-protection)[](#cross-site-tracing-http-verb-tampering-protection)Cross Site Tracing & HTTP Verb Tampering Protection

Spring Security 5.1 adds [cross site tracing](https://www.owasp.org/index.php/Cross_Site_Tracing) and [HTTP Verb Tampering](https://www.owasp.org/index.php/Testing_for_HTTP_Verb_Tampering_\(OTG-INPVAL-003\)) protection to Spring Security.

## [](#password-encoding-upgrades)[](#password-encoding-upgrades)Password Encoding Upgrades

User’s can implement [UserDetailsPasswordService](https://docs.spring.io/spring-security/site/docs/5.1.0.M2/api/org/springframework/security/core/userdetails/UserDetailsPasswordService.html) and expose it as a `@Bean` and on authentication success Spring Security’s `DaoAuthenticationProvider` will:

-   Check to see if the password storage mechanism needs updated using the new [PasswordEncoder.upgradeEncoding](https://docs.spring.io/spring-security/site/docs/5.1.0.M2/api/org/springframework/security/crypto/password/PasswordEncoder.html#upgradeEncoding-java.lang.String-) method. For example, if it is encoded in sha256, then by default Spring Security would advise it is upgraded to BCrypt.
    
-   If the password encoding needs to be upgraded, it will encode the password using the current `PasswordEncoder`
    
-   The `UserDetails` and new password will be passed to the `UserDetailsPasswordService` so it can be saved with the upgraded password encoding.
    

## [](#dependency-updates)[](#dependency-updates)Dependency Updates

We have updated our dependencies to be on the latest and greatest to ensure our transitive dependencies are up to date.

[Project Site](http://projects.spring.io/spring-security/) | [Reference](http://docs.spring.io/spring-security/site/docs/5.1.0.M2/reference/htmlsingle/) | [Help](http://stackoverflow.com/questions/tagged/spring-security)