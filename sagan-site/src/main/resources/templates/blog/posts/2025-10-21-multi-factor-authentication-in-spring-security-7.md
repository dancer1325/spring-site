---
title: Multi-Factor Authentication in Spring Security 7
source: https://spring.io/blog/2025/10/21/multi-factor-authentication-in-spring-security-7
scraped: 2026-02-23T07:25:14.958Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Cummings |  October 21, 2025 | 0 Comments
---

# Multi-Factor Authentication in Spring Security 7

_Engineering | Josh Cummings |  October 21, 2025 | 0 Comments_

In 2013, it was proposed to [add multi-factor authentication](https://github.com/spring-projects/spring-security/issues/2603) into Spring Security. That was the year that “selfie” was added to the English dictionary and “What Does the Fox Say?” was a viral YouTube hit.

Needless to say, one of the biggest features in Spring Security 7 is a long time coming, and is our next stop along our [Road to GA](https://spring.io/blog/2025/09/02/road_to_ga_introduction).

## [](#what-is-multi-factor-authentication-mfa)What is Multi-Factor Authentication (MFA)?

[Multi-Factor Authentication](https://docs.spring.io/spring-security/reference/7.0-SNAPSHOT/servlet/authentication/mfa.html) is an authentication strategy by which your identity is determined on a website by more than one means of verification, or *factor*. Common factors fall into one of a few categories:

-   Something you **know**; like a password or an answer to a security question
-   Something you **have**; like an app on your cell phone
-   Something you **are**; like a thumbprint or other biometric

For example, when you give your username and password, and then are asked to enter a code sent to your email, that’s multi-factor authentication. The username and password are things you **know**, and your email is something you **have**.

Multi-factor authentication increases the confidence an application can have that the user is who they claim to be.

## [](#mfa-features-that-spring-security-supports)MFA Features that Spring Security Supports

As of this writing, Spring Security supports several important MFA use cases:

-   **Globally requiring multiple factors** of a user in a specified order
-   **Conditionally requiring multiple factors**, configurable by web endpoint or method signature
-   **Time-based authentication** so that you can require users re-authenticate for certain endpoints after a given time
-   **User-based authentication** so that you can take care of opt-in scenarios where not all of your users are using MFA yet
-   **Integration with Custom `AuthenticationProvider`s**

In this blog post, we’ll take a look at each one of these. First, though, let’s understand how MFA is modeled in Spring Security

## [](#how-spring-security-models-mfa-through-progressive-authorization)How Spring Security Models MFA Through Progressive Authorization

The key insight to bringing MFA into Spring Security is the humble `GrantedAuthority`.

Initially, it may seem odd to describe an authentication strategy in terms of authorization until you consider that authorization rules can and often do take into consideration the way authentication was obtained.

For example, a website may only authorize requests to a portion of their website if you have authenticated in the last 5 minutes, if you have verified your email address, or if you were authorized by a particular OAuth 2.0 issuer.

To facilitate this, Spring Security 7 issues a *factor* `GrantedAuthority` for each successful authentication.

With this simple change, MFA in Spring Security becomes the progressive granting of authorities; one granted with each successful authentication. You get to write authorization rules that state which authentication factors matter to you where.

Then, when a factor authority is missing, Spring Security redirects the end user to the endpoint where that authority can be obtained. For example, a rule that requires `FACTOR_PASSWORD` will cause Spring Security to redirect to the `/login` page to obtain the user’s username and password.

Imagine an authorization rule like this one:

```java
Copy@PreAuthorize("hasAllAuthorities('FACTOR_PASSWORD', 'FACTOR_X509', 'ROLE_ADMIN')")
```

This rule states that the end user must be an admin, but also must have provided their username, password (which issues a `FACTOR_PASSWORD` authority), and an X.509 certificate (which issues a `FACTOR_X509` authority) to identify themselves.

Using authorities provides a simple and effective short-hand for requiring multiple types of authentication for any given endpoint or method invocation.

## [](#enabling-mfa-globally)Enabling MFA Globally

Now, while the above `@PreAuthorize` rule will work, specifying each factor for every authorization rule can get tedious. And less repetition with authorization rules means fewer coding mistakes in sensitive code.

To that end, you can enable MFA in Spring Security by listing the required authorities in the `@EnableMultiFactorAuthentication` annotation:

```java
Copy@EnableMultiFactorAuthentication(FactorGrantedAuthority.PASSWORD_AUTHORITY, FactorGrantedAuthority.X509_AUTHORITY)
```

This will add an implicit check to all authorization rules to require that the user provide their username and password (something they know) and an X.509 certificate (something they have) before showing any page that requires authentication.

The only thing left is to declare the appropriate configurations for each authentication mechanism:

```java
Copy@EnableMultiFactorAuthentication(authorities = {
	FactorGrantedAuthority.PASSWORD_AUTHORITY, FactorGrantedAuthority.X509_AUTHORITY
})
@EnableWebSecurity
@EnableMethodSecurity
class SecurityConfig {

    @Bean 
    Customizer<HttpSecurity> formLogin() {
        return (http) -> http.formLogin(Customizer.withDefaults());
    }
    
    @Bean 
    Customizer<HttpSecurity> x509Login() {
        return (http) -> http.x509(Customizer.withDefaults());
    }
    
    @Bean 
    UserDetailsService users() {
        return new InMemoryUserDetailsManager(myTestUser);
    }

}
```

This changes the earlier `@PreAuthorize` rule back to:

```java
Copy@PreAuthorize("hasAuthority('ROLE_ADMIN')")
```

In this way, if the end user has an X.509 certificate installed in their browser, they will also be redirected to `/login` to provide the username/password factor.

When MFA is not activated, activating the two mechanisms means the end user can authenticate using X.509 OR a username and password.

\[TIP\] Did you notice Spring Security’s new support for [customizing `HttpSecurity`](https://docs.spring.io/spring-security/reference/7.0-SNAPSHOT/servlet/configuration/java.html#httpsecurity-customizer-bean)?

## [](#fine-grained-mfa-control-with-authorizationmanagerfactory)Fine-Grained MFA Control with `AuthorizationManagerFactory`

There are a number of cases where you may not want to require multiple factors for every endpoint and method invocation. In this case, you can use Spring Security’s `AuthorizationManagerFactory` to build-in the appropriate multi-factor rules programmatically.

To do this, begin by creating an `AuthorizationManagerFactory` instance, declaring your multiple factors:

```java
CopyAuthorizationManagerFactory<Object> mfa = AuthorizationManagerFactories.multiFactor()
        .requireFactors(FactorGrantedAuthority.PASSWORD_AUTHORITY, FactorGrantedAuthority.X509_AUTHORITY)
        .build();
```

This is the same component that `@EnableMultiFactorAuthentication` creates and publishes as a bean.

In our case, we’ll use it when describing our authorization rules:

```java
Copy@Bean
Customizer<HttpSecurity> authz() {
    AuthorizationManagerFactory<Object> mfa = AuthorizationManagerFactories.multiFactor()
        .requireFactors(
            FactorGrantedAuthority.PASSWORD_AUTHORITY,
            FactorGrantedAuthority.X509_AUTHORITY).build();
    return (http) -> http.authorizeHttpRequests((authorize) -> authorize
        .requestMatchers("/admin/**”).access(mfa.hasRole(“ADMIN”))
        .anyRequest().authenticated());
}
```

The authorization rules in this application for `/admin/**` will require a username and password, an X.509 certificate, and that the user have ROLE\_ADMIN. The rest of the application will only require one factor.

## [](#time-based-authorization-rules)Time-Based Authorization Rules

Each time an authentication is completed, Spring Security issues the commensurate `FactorGrantedAuthority` with a name and a timestamp. This means that I can also write time-based authorization rules, like the ones you see on websites where, to get to a particular part of the site, they want you to log in again, if you haven’t in the last five minutes.

We can use `AuthorizationManagerFactory` for this again, this time specifying the time needed for a given factor:

```java
Copy@Bean
Customizer<HttpSecurity> authz() {
    AuthorizationManagerFactory<Object> recentLogin = AuthorizationManagerFactories.multiFactor()
        .requireFactor((f) -> f.passwordAuthority().validDuration(Duration.ofMinutes(5)))
        .requireFactor((f) -> f.x509Authority())
        .build();
    return (http) -> http.authorizeHttpRequests((authorize) -> authorize
        .requestMatchers("/profile/**").access(recentLogin.authenticated())
        .anyRequest().authenticated());
}
```

In this way, the user can log in, navigate the site as normal, and be asked to re-authenticate when they go to the `/profile/me` page.

## [](#user-based-authorization-rules)User-Based Authorization Rules

Business rules for multi-factor may also take into account only certain users, like those who have opted in to using MFA for their account.

Consider an application that is using [One-Time-Token Login](https://docs.spring.io/spring-security/reference/7.0-SNAPSHOT/servlet/authentication/onetimetoken.html#page-title) with Spring Security, sending tokens to the user’s email address (something they have), in addition to using Username/Password Login.

This time, we’ll create a custom `AuthorizationManager` that looks at the current `Authentication` programmatically. For example, let’s say that we want to require that the `admin` user uses both factors; this may look something like the following:

```java
Copy@Component
class AdminMfaAuthorizationManager implements AuthorizationManager<Object> {
    private final AuthorizationManager<Object> mfa = AllAuthoritiesAuthorizationManager
            .hasAllAuthorities(FactorGrantedAuthority.OTT_AUTHORITY, FactorGrantedAuthority.PASSWORD_AUTHORITY);

    @Override
    public AuthorizationResult authorize(
        Supplier<? extends @Nullable Authentication> authentication, Object context) {
        if ("admin".equals(authentication.get().getName())) {
            return this.mfa.authorize(authentication, context);
        } else {
            return new AuthorizationDecision(true);
        }
    }
}
```

Then, we can now use Spring Security’s default implementation of `DefaultAuthorizationManagerFactory` and instruct it to append this authorization manager to all authorization rules:

```java
Copy@Bean
AuthorizationManagerFactory<Object> authorizationManagers(AdminMfaAuthorizationManager admins) {
    DefaultAuthorizationManagerFactory<Object> defaults = new DefaultAuthorizationManagerFactory<>();
    defaults.setAdditionalAuthorization(admins);
    return defaults;
}
```

Now, all web and method security rules will implicitly check this authorization manager as well.

## [](#issuing-authorities-yourself)Issuing Authorities Yourself

Your custom authentication mechanisms can seamlessly participate as well. All that is needed is for your `AuthenticationProvider` to issue a `FactorGrantedAuthority` with a name that rules can use to identify it.

Consider a biometric authentication provider like this one:

```java
Copyclass MyBiometricAuthenticationProvider implements AuthenticationProvider {
    @Override
    public Authentication authenticate(Authentication authentication) {
        // ..,.
        UserDetails user = this.users.findUserByUsername(username);
        Collection<GrantedAuthority> authorities = new HashSet<>(user.getAuthorities());
        return new UsernamePasswordAuthenticationToken(username, null, authorities);
    }
}
```

In addition to any user-level authorities you grant, you can also grant an infrastructural authority of your own:

```java
Copyclass MyBiometricAuthenticationProvider implements AuthenticationProvider {
    @Override
    public Authentication authenticate(Authentication authentication) {
        // ..,.
        UserDetails user = this.users.findUserByUsername(username);
        Collection<GrantedAuthority> authorities = new HashSet<>(user.getAuthorities());
        authorities.add(FactorGrantedAuthority.withFactor("THUMBPRINT").build());
        return new UsernamePasswordAuthenticationToken(username, null, authorities);
    }
}
```

Now, you can add authorization rules of your own that require that the user provide a thumbprint to access a given resource.

## [](#going-passwordless)Going Passwordless

MFA plays a large role in allowing applications to go passwordless. You can, for example, now require a [Passkey](https://docs.spring.io/spring-security/reference/7.0-SNAPSHOT/servlet/authentication/passkeys.html#page-title) and a Biometric scan with a few simple configurations.

Begin with adding the annotation:

```java
Copy@EnableMultiFactorAuthentication(authorities = {
    FactorGrantedAuthority.WEBAUTHN_AUTHORITY,
    "FACTOR_THUMBPRINT"
})
```

\[NOTE\] Notice that this example is using a custom authentication provider that verifies the user’s biometric data.

Then, add the authentication mechanisms:

```java
Copy@Bean
Customizer<HttpSecurity> webAuthn() {
    return (http) -> http
        .webAuthn((webAuthn) -> webAuthn
            .rpName("Spring Security Relying Party")
            .rpId("example.com")
            .allowedOrigins("https://example.com"));
}

@Bean
Customizer<HttpSecurity> biometrics() {
    return (http) -> http.authenticationProvider(new MyBiometricsAuthenticationProvider());
}
```

And that’s it!

## [](#wrapping-up)Wrapping Up

Let’s wrap up. Multi-Factor Authentication is a powerful new feature in Spring Security 7 that allows you to require more than one factor based on authorization rules that specify which factors they require. You can use `@EnableMultiFactorAuthentication` to specify factor rules that apply globally or `AuthorizationManagerFactory` for rules that apply, given some condition. And your custom authentication mechanisms can play along as well by adding a `FactorGrantedAuthority` instance into their `Authentication`’s list of granted authorities.

To learn more, check out the [sample code in `spring-security-samples`](https://github.com/spring-projects/spring-security-samples/tree/main/servlet/spring-boot/java/authentication/mfa) and the [reference documentation](https://docs.spring.io/spring-security/reference/7.0-SNAPSHOT/servlet/authentication/mfa.html).