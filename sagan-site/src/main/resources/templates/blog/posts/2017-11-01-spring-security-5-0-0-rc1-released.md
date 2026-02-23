---
title: Spring Security 5.0.0.RC1 Released
source: https://spring.io/blog/2017/11/01/spring-security-5-0-0-rc1-released
scraped: 2026-02-23T16:16:26.339Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  November 01, 2017 | 11 Comments
---

# Spring Security 5.0.0.RC1 Released

_Releases | Rob Winch |  November 01, 2017 | 11 Comments_

On behalf of the community, I’m pleased to announce the release of Spring Security 5.0.0.RC1. This release resolves [150+](https://github.com/spring-projects/spring-security/milestone/103?closed=1) issues. Below are the highlights of this release:

-   WebFlux Security Highlights
    
    -   [ReactiveSecurityContextHolder](#reactivesecuritycontextholder)
        
    -   [Reactive CSRF Support added](https://github.com/spring-projects/spring-security/issues/4734)
        
-   OAuth 2.0 Highlights
    
    -   [OAuth 2.0 Client Support](#oauth-2-0-client-support)
        
    -   [OAuth2AuthorizedClient / Service](#oauth2authorizedclient-service)
        
    -   [What’s Up Next with OAuth 2.0 Support?](#what-s-up-next-with-oauth-2-0-support)
        
-   Core Highlights
    
    -   [Password Storage Updated](#password-storage-updated)
        
    -   [Add UnboundId LDAP inmemory support](https://github.com/spring-projects/spring-security/pull/4672)
        
    -   [Allow use of non-numeric (e.g. UUID) values for ObjectIdentity.getIdentifier()](https://github.com/spring-projects/spring-security/pull/4424)
        

# [](#reactivesecuritycontextholder)[](#reactivesecuritycontextholder)ReactiveSecurityContextHolder

Previously, Spring Security used the `ServerWebExchange.getPrincipal()` as the source of truth for who was authenticated. The authenticated user was copied to Reactor’s Context to support method security which used the Reactor Context as it’s source of truth. Having multiple sources of truth is obviously not ideal.

Spring Security now uses [Reactor’s Context](https://projectreactor.io/docs/core/snapshot/reference/#context) as the source of truth for who is authenticated. The user can still be accessed from `ServerWebExchange.getPrincipal()`, but this value comes from Reactor’s Context as well.

You can read and write the `SecurityContext` to Reactor’s Context using `ReactiveSecurityContextHolder`. For example, this demonstrates how to retrieve the currently logged in user’s message.

```
CopyAuthentication authentication =
    new TestingAuthenticationToken("user", "password", "ROLE_USER");

Mono<String> messageByUsername = ReactiveSecurityContextHolder.getContext()
  .map(SecurityContext::getAuthentication)
  .map(Authentication::getName)
  .flatMap(this::findMessageByUsername)
  // In a WebFlux application the `subscriberContext`
  // is automatically setup using `ReactorContextWebFilter`
  .subscriberContext(ReactiveSecurityContextHolder.withAuthentication(authentication));

StepVerifier.create(messageByUsername)
	.expectNext("Hi user")
	.verifyComplete();
```

with `this::findMessageByUsername` defined as:

```
CopyMono<String> findMessageByUsername(String username) {
	return Mono.just("Hi " + username);
}
```

# [](#oauth-20-client-support)[](#oauth-2-0-client-support)OAuth 2.0 Client Support

There have been many updates and polish applied to put the finishing touches on the new **OAuth 2.0 Login** feature. We are very excited to be releasing this to the Spring community in the next couple of weeks.

In addition to the updates, below are some new features that were added:

-   Spring Boot 2.0 auto-configuration for OAuth 2.0 Login
    
-   [ID Token Validation](http://openid.net/specs/openid-connect-core-1_0.html#IDTokenValidation)
    
-   Protection against token substitution attacks on the [UserInfo Response](http://openid.net/specs/openid-connect-core-1_0.html#UserInfoResponse) using `sub` claim verification
    
-   [Implicit Grant](https://tools.ietf.org/html/rfc6749#section-1.3.2) support via `ImplicitGrantConfigurer`
    

# [](#oauth2authorizedclient--service)[](#oauth2authorizedclient-service)OAuth2AuthorizedClient / Service

The `OAuth2AuthorizedClient` represents an ***Authorized Client***. A client is considered *"authorized"* when the End-User *(Resource Owner)* has granted authorization to the client to access its protected resources. This class serves the purpose of associating an `OAuth2AccessToken` to a `ClientRegistration` *(Client)* and *Resource Owner*, who is the `Principal` End-User that granted the authorization.

The primary role of the `OAuth2AuthorizedClientService` is to manage `OAuth2AuthorizedClient` instances. From a developer perspective, it provides the capability to lookup an `OAuth2AccessToken` associated to a Client so that it may be used to initiate a request to a *Resource Server*.

The `OAuth2AuthorizedClientService` may be registered as a `@Bean` in the `ApplicationContext` (although not required) so that the developer can lookup the `OAuth2AccessToken` associated to a Client.

For example:

```
Copy@Controller
public class GoogleCalendarController {

	@Autowired
	private OAuth2AuthorizedClientService authorizedClientService;

	@RequestMapping("/calendar")
	public String calendar(OAuth2AuthenticationToken authentication) {
		OAuth2AuthorizedClient authorizedClient =
			this.authorizedClientService.loadAuthorizedClient(
				"google", authentication.getName());

		OAuth2AccessToken accessToken = authorizedClient.getAccessToken();

		// ...

		return "calendar";
	}
}
```

# [](#whats-up-next-with-oauth-20-support)[](#what-s-up-next-with-oauth-2-0-support)What’s Up Next with OAuth 2.0 Support?

## [](#handlermethodargumentresolvers)[](#handlermethodargumentresolver-s)HandlerMethodArgumentResolver(s)

We will be providing an implementation of a `HandlerMethodArgumentResolver` for `OAuth2AuthorizedClient` and `OAuth2AccessToken`.

As an alternative to using `OAuth2AuthorizedClientService` directly, you’ll be able to resolve an `OAuth2AuthorizedClient` or `OAuth2AccessToken` as an argument to a `@Controller` method parameter.

## [](#resource-server-support)[](#resource-server-support)Resource Server support

Soon we will start planning our feature log to provide support for the ***OAuth 2.0 Resource Server*** role, so please stay tuned.

# [](#password-storage-updated)[](#password-storage-updated)Password Storage Updated

Password storage has undergone a major overhaul to provide more secure defaults and the ability to migrate how passwords are stored. The default `PasswordEncoder` is now [DelegatingPasswordEncoder](https://docs.spring.io/spring-security/site/docs/5.0.0.RC1/api/org/springframework/security/crypto/password/DelegatingPasswordEncoder.html) which is a non-passive change. This change ensures that passwords are now encoded using BCrypt by default, allows for validating passwords in old formats, and allows for upgrading the password storage in the future.

## [](#constructing-delegatingpasswordencoder)[](#constructing-delegatingpasswordencoder)Constructing DelegatingPasswordEncoder

You can easily construct an instance using `PasswordEncoderFactories`.

```
CopyPasswordEncoder passwordEncoder =
    PasswordEncoderFactories.createDelegatingPasswordEncoder();
```

Alternatively, you may create your own custom instance. For example:

```
CopyString idForEncode = "bcrypt";
Map encoders = new HashMap<>();
encoders.put(idForEncode, new BCryptPasswordEncoder());
encoders.put("noop", NoOpPasswordEncoder.getInstance());
encoders.put("pbkdf2", new Pbkdf2PasswordEncoder());
encoders.put("scrypt", new SCryptPasswordEncoder());
encoders.put("sha256", new StandardPasswordEncoder());

PasswordEncoder passwordEncoder =
    new DelegatingPasswordEncoder(idForEncode, encoders);
```

## [](#password-storage-format)[](#password-storage-format)Password Storage Format

The general format for a password is:

```
Copy{id}encodedPassword
```

Such that `id` is an identifier used to look up which `PasswordEncoder` should be used and `encodedPassword` is the original encoded password for the selected `PasswordEncoder`. The `id` must be at the beginning of the password, start with `{` and end with `}`. If the `id` cannot be found, the `id` will be null. For example, the following might be a list of passwords encoded using different `id`. All of the original passwords are "password".

```
Copy{bcrypt}$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG (1)
{noop}password (2)
{pbkdf2}5d923b44a6d129f3ddf3e3c8d29412723dcbde72445e8ef6bf3b508fbf17fa4ed4d6b99ca763d8dc (3)
{scrypt}$e0801$8bWJaSu2IKSn9Z9kM+TPXfOc/9bdYSrN1oD9qfVThWEwdRTnO7re7Ei+fUZRJ68k9lTyuTeUp4of4g24hHnazw==$OAOec05+bXxvuu/1qZ6NUR+xQYvYv7BeL1QxwRpY5Pc=  (4)
{sha256}97cde38028ad898ebc02e690819fa220e88c62e0699403e94fff291cfffaf8410849f27605abcbc0 (5)
```

1.  The first password would have a `PasswordEncoder` id of `bcrypt` and encodedPassword of `$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG`. When matching it would delegate to `BCryptPasswordEncoder`
    
2.  The second password would have a `PasswordEncoder` id of `noop` and encodedPassword of `password`. When matching it would delegate to `NoOpPasswordEncoder`
    
3.  The third password would have a `PasswordEncoder` id of `pbkdf2` and encodedPassword of `5d923b44a6d129f3ddf3e3c8d29412723dcbde72445e8ef6bf3b508fbf17fa4ed4d6b99ca763d8dc`. When matching it would delegate to `Pbkdf2PasswordEncoder`
    
4.  The fourth password would have a `PasswordEncoder` id of `scrypt` and encodedPassword of `$e0801$8bWJaSu2IKSn9Z9kM+TPXfOc/9bdYSrN1oD9qfVThWEwdRTnO7re7Ei+fUZRJ68k9lTyuTeUp4of4g24hHnazw==$OAOec05+bXxvuu/1qZ6NUR+xQYvYv7BeL1QxwRpY5Pc=` When matching it would delegate to `SCryptPasswordEncoder`
    
5.  The final password would have a `PasswordEncoder` id of `sha256` and encodedPassword of `97cde38028ad898ebc02e690819fa220e88c62e0699403e94fff291cfffaf8410849f27605abcbc0`. When matching it would delegate to `StandardPasswordEncoder`
    

## [](#password-encoding)[](#password-encoding)Password Encoding

The `idForEncode` passed into the constructor determines which `PasswordEncoder` will be used for encoding passwords. In the `DelegatingPasswordEncoder` we constructed above, that means that the result of encoding `password` would be delegated to `BCryptPasswordEncoder` and be prefixed with `{bcrypt}`. The end result would look like:

```
Copy{bcrypt}$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG
```

## [](#password-matching)[](#password-matching)Password Matching

Matching is done based upon the `id` and the mapping of the `id` to the `PasswordEncoder` provided in the constructor. Our example in [Password Storage Format](#password-storage-format) provides a working example of how this is done. By default, the result of invoking `matches(CharSequence, String)` with a password and an `id` that is not mapped (including a null id) will result in an `IllegalArgumentException`. This behavior can be customized using `DelegatingPasswordEncoder.setDefaultPasswordEncoderForMatches(PasswordEncoder)`.

By using the `id` we can match on any password encoding, but encode passwords using the most modern password encoding. This is important, because unlike encryption, password hashes are designed so that there is no simple way to recover the plaintext. Since there is no way to recover the plaintext, it makes it difficult to migrate the passwords. While it is simple for users to migrate `NoOpPasswordEncoder`, we chose to include it by default to make it simple for the getting started experience.

## [](#migrating-to-spring-security-5)[](#migrating-to-spring-security-5)Migrating to Spring Security 5

If you are not using an explicit `PasswordEncoder` or were relying on the old core `PasswordEncoder` you will need to migrate.

### [](#migrating-existing-passwords)[](#migrating-existing-passwords)Migrating Existing Passwords

If your passwords are stored in plaintext, upgrading the hash is as easy as taking the plaintext password and encoding it.

```
CopyString encoded = passwordEncoder.encode(plainTextPassword);
```

If your passwords are stored in another format, then you cannot update the hash. To migrate these passwords you must determine the algorithm that your passwords are stored in and prefix all passwords with `{id}`. For example, if passwords are hashed with `sha256`:

```
Copy97cde38028ad898ebc02e690819fa220e88c62e0699403e94fff291cfffaf8410849f27605abcbc0
```

ensure all passwords are prefixed with `{sha256}` like:

```
Copy{sha256}97cde38028ad898ebc02e690819fa220e88c62e0699403e94fff291cfffaf8410849f27605abcbc0
```

While this password is not stored in a secure format, it does allow for other passwords to be stored in a secure format. We can also request the users to change their password which would update the hash it was stored in.

For astute readers, it might be obvious that you can also migrate plain text passwords by prefixing them with `{noop}`. For example, with a password of

```
Copypassword
```

you can simply prefix the password with `{noop}` like:

```
Copy{noop}password
```

This will work, but it is **NOT SECURE** so it is not recommended for production environments.

### [](#passwordencoder-and-saltsource)[](#passwordencoder-and-saltsource)PasswordEncoder and SaltSource

If you were using the old and deprecated `PasswordEncoder` in core, this has been removed because it requied users to provide a salt and use a `SaltSource` (also removed). Each of the `PasswordEncoder` implementations in core have been migrated to the new crypto API with migration instructions in the Javadoc. An example is [MessageDigestPasswordEncoder](https://docs.spring.io/spring-security/site/docs/5.0.0.RC1/api/org/springframework/security/crypto/password/MessageDigestPasswordEncoder.html).

### [](#reverting-to-previous-behavior-insecure)[](#reverting-to-previous-behavior-insecure)Reverting to Previous Behavior (insecure)

While it is insecure, users can revert to the previous behavior, by providing a `NoOpPasswordEncoder` as a `@Bean`. If the application leverages `AuthenticationManagerBuilder` the `NoOpPasswordEncoder` must be explicitly provided to `AuthenticationManagerBuilder`. For example, if you have:

```
Copyauth
	.inMemoryAuthentication()
		.withUser("user").password("password").roles("USER");
```

you can revert to the previous behavior using:

```
Copyauth
	.inMemoryAuthentication()
		.passwordEncoder(NoOpPasswordEncoder.getInstance())
		.withUser("user").password("password").roles("USER");
```

### [](#getting-started-experience)[](#getting-started-experience)Getting Started Experience

If you are putting together a demo or a sample, it is a bit combersome to take time to hash the passwords of your users. There are convenience mechanisms to make this easier, but this is still not intended for production.

```
CopyUser user = User.withDefaultPasswordEncoder()
  .username("user")
  .password("password")
  .roles("user")
  .build();
System.out.println(user.getPassword());
// {bcrypt}$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG
```

If you are creating multiple users, you can also reuse the buider.

```
CopyUserBuilder users = User.withDefaultPasswordEncoder();
User user = users
  .username("user")
  .password("password")
  .roles("USER")
  .build();
User admin = users
  .username("admin")
  .password("password")
  .roles("USER","ADMIN")
  .build();
```

This does hash the password that is stored, but the passwords are still exposed in memory and in the compiled source code. Therefore, it is still not considered secure for a production environment. For production, you should hash your passwords externally.

## [](#automatic-password-migration-future)[](#automatic-password-migration-future)Automatic Password Migration (Future)

With `DelegatingPasswordEncoder` we will be able to update the password format after a user authenticates. We can add a default method to `PasswordEncoder` that returns a type (i.e. `PasswordMatch`) that states if the password was a match. When the password is a match and is using an old format, `PasswordMatch` would also have a member with an up-to-date encoding for the password. When Spring Security sees the suggestion on the new format, it can use an API to update the format of the user’s password.

[Project Site](http://projects.spring.io/spring-security/) | [Reference](http://docs.spring.io/spring-security/site/docs/5.0.0.RC1/reference/htmlsingle/) | [Help](http://stackoverflow.com/questions/tagged/spring-security)