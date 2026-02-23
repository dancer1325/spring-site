---
title: Spring Security 5.1.0.RC1 Released
source: https://spring.io/blog/2018/08/21/spring-security-5-1-0-rc1-released
scraped: 2026-02-23T15:16:11.284Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Josh Cummings |  August 21, 2018 | 3 Comments
---

# Spring Security 5.1.0.RC1 Released

_Releases | Josh Cummings |  August 21, 2018 | 3 Comments_

On behalf of the community I am pleased to announce the release of Spring Security 5.1.0.RC1. This release comes with [50+ tickets](https://github.com/spring-projects/spring-security/milestone/113?closed=1) closed.

As always we look forward to hearing your [feedback](https://github.com/spring-projects/spring-security/issues)! You can find the highlights below:

# [](#table-of-contents)[](#table-of-contents)Table of Contents

-   [Servlet](#servlet)
    
    -   [OAuth2 Resource Server](#oauth2-resource-server)
        
        -   [Open ID Provider Configuration](#open-id-provider-configuration)
            
        -   [Claim Validation](#claim-validation)
            
        -   [GrantedAuthority Extraction](#grantedauthority-extraction)
            
    -   [OAuth2 Client Credentials Grant](#oauth2-client-credentials-grant)
        
    -   [Feature-Policy Secure Header](#feature-policy-secure-header)
        
-   [WebFlux](#webflux)
    
    -   [OAuth2 Resource Servers](#oauth2-resource-servers)
        
    -   [OAuth2 Login/Client](#oauth2-login-client)
        
        -   [Authorization Code Grant](#authorization-code-grant)
            
        -   [Authorization Request Resolver](#authorization-request-resolver)
            
        -   [Authorized Client Repository](#authorized-client-repository)
            
    -   [Hardening Your Application](#hardening-your-application)
        
        -   [Secure Headers](#secure-headers)
            
        -   [CORS](#cors)
            
-   [Dependency Updates](#dependency-updates)
    

# [](#servlet)[](#servlet)Servlet

## [](#oauth2-resource-server)[](#oauth2-resource-server)OAuth2 Resource Server

### [](#open-id-provider-configuration)[](#open-id-provider-configuration)Open ID Provider Configuration

Resource Server is now configurable via any issuer endpoint that supports [Open Id Provider Configuration](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfig):

```
Copy@Bean
JwtDecoder jwtDecoder() {
    return JwtDecoders.createDefaultFromIssuer("https://issuer-endpoint");
}
```

### [](#claim-validation)[](#claim-validation)Claim Validation

Users can add their own validation rules to apply to a `Jwt` by exposing a `JwtDecoder` bean:

```
Copy@Bean
JwtDecoder jwtDecoder() {
    String jwkSetUri = "https://issuer-endpoint/.well-known/jwks.json";
    NimbusJwtDecoderJwkSupport jwtDecoder =
      new NimbusJwkDecoderJwkSupport(jwkSetUri);
    OAuth2TokenValidator<Jwt> validator =
      new DelegatingOAuth2TokenValidator(
        JwtValidators.createDefault(),
        new MyCustomValidator());
    jwtDecoder.setJwtValidator(validator);
    return jwtDecoder;
}
```

### [](#grantedauthority-extraction)[](#grantedauthority-extraction)GrantedAuthority Extraction

Users can customize how `GrantedAuthority` s are derived from a `Jwt`:

```
Copy@Bean
JwtDecoder jwtDecoder() {
    String jwkSetUri = "https://issuer-endpoint/.well-known/jwks.json";
    NimbusJwtDecoderJwkSupport jwtDecoder =
      new NimbusJwkDecoderJwkSupport(jwkSetUri);
    JwtAuthenticationConverter jwtAuthenticationConverter =
      new JwtAuthenticationConverter() {
        protected Collection<GrantedAuthority> extractAuthorities(Jwt jwt) {
          return Arrays.asList(new SimpleGrantedAuthority("app:read"));
        }
    };
    jwtDecoder.setJwtAuthenticationConverter(jwtAuthenticationConverter);
    return jwtDecoder;
}
```

## [](#oauth2-client-credentials-grant)[](#oauth2-client-credentials-grant)OAuth2 Client Credentials Grant

Basic [Support for the Client Credentials Grant Type](https://github.com/spring-projects/spring-security/issues/4982) has been added.

## [](#feature-policy-secure-header)[](#feature-policy-secure-header)Feature-Policy Secure Header

Basic support for the [Feature-Policy](https://developers.google.com/web/updates/2018/06/feature-policy) has been added:

```
Copyhttp
    .headers()
        .featurePolicy("geolocation 'none'");
```

# [](#webflux)[](#webflux)WebFlux

## [](#oauth2-resource-servers)[](#oauth2-resource-servers)OAuth2 Resource Servers

Basic support for Reactive-based OAuth2 Resource Servers has been added. See [oauth2resourceserver-webflux](https://github.com/spring-projects/spring-security/tree/5.1.0.RC1/samples/boot/oauth2resourceserver-webflux)

## [](#oauth2-loginclient)[](#oauth2-login-client)OAuth2 Login/Client

### [](#authorization-code-grant)[](#authorization-code-grant)Authorization Code Grant

Basic support for Reactive-based Authorization Code Grant flow has been added. See [authcodegrant-webflux](https://github.com/spring-projects/spring-security/tree/5.1.0.RC1/samples/boot/authcodegrant-webflux)

### [](#authorization-request-resolver)[](#authorization-request-resolver)Authorization Request Resolver

[Support for customizing the authentication request made to the Authorization Server](https://github.com/spring-projects/spring-security/issues/5610) has been added. [This](https://github.com/spring-projects/spring-security/blob/master/oauth2/oauth2-client/src/main/java/org/springframework/security/oauth2/client/web/server/ServerOAuth2AuthorizationRequestResolver.java) is handy if, for example, the authorization server requires a custom parameter to be sent. It is also helpful in multi-tenant scenarios where elements of the request like the hostname may change how the request to an authorization server is made.

### [](#authorized-client-repository)[](#authorized-client-repository)Authorized Client Repository

Support for customizing the persistence of authorized clients between requests has been added:

```
Copyhttp
    .oauth2()
        .client()
            .authorizedClientRepository(new MyCookieBasedClientRepository());
```

## [](#hardening-your-application)[](#hardening-your-application)Hardening Your Application

### [](#secure-headers)[](#secure-headers)Secure Headers

Support for the following secure headers has been added to WebFlux:

-   Content-Security-Policy
    
-   Referrer-Policy
    
-   Feature-Policy
    

### [](#cors)[](#cors)CORS

Support for CORS has been added to Webflux.

# [](#dependency-updates)[](#dependency-updates)Dependency Updates

We have updated our dependencies to be on the latest and greatest to ensure our transitive dependencies are up to date.

[Project Site](http://projects.spring.io/spring-security/) | [Reference](http://docs.spring.io/spring-security/site/docs/5.1.0.RC1/reference/htmlsingle/) | [Help](http://stackoverflow.com/questions/tagged/spring-security)