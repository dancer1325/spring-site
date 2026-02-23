---
title: Bootiful Spring Boot 3.4: Spring Security
source: https://spring.io/blog/2024/11/24/bootiful-34-security
scraped: 2026-02-23T08:03:27.930Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  November 24, 2024 | 0 Comments
---

# Bootiful Spring Boot 3.4: Spring Security

_Engineering | Josh Long |  November 24, 2024 | 0 Comments_

Spring Security 6.4.1 is your one-stop shop for authenticated and authorized items, and this release is a *doozie*! The release notes [brim with the possibilities](https://docs.spring.io/spring-security/reference/whats-new.html)!

The release notes are a lie!

I mean, they’re not a lie. They just don’t do a good job of capturing and conveying how awesome this release is. There are more user-facing toys in this release than in many previous releases. This might be my favorite Spring Security release since at least it sprouted a Java configuration DSL!

Look at those release notes. See those puny sections on ***Passkeys*** and ***One-Time Token Login***? Yah. That’s the lie. These things deserve their chapters! We’ll return to them. I promise. Let’s quickly look at the other bits. So many different bits.

-   huge improvements in method security and the Spring Security component model, including improved support for Spring Framework’s meta-annotation mechanism and annotation templates.
-   AOT and GraalVM native image-based applications work correctly now with Spring Security’s `@AuthorizeReturnObject` feature and may reference beans in the `@PreAuthorize` and `@PostAuthorize` lifecycle callbacks.
-   a convenient `SecurityAnnotationScanners` API offers a way to scan for security annotations to add Spring Security’s selection and templating features to custom annotations.
-   OAuth 2.0 support has gotten even better! the `oauth2Login()` method now accepts `OAurth2AuthorizationRequestResolver` as a `@Bean`.
-   `ClientRegistrations` now supports externally obtained configuration.
-   The reactive Spring Security DSL now supports `login page()`
-   OIDC back-channel support now accepts logout tokens of type `logout+jwt`
-   The Spring `RestClient` can now be configured with `OAuth2ClientHttpRequestInterceptor` to make protected resource requests. You can have it supply your token to a downstream service when making an HTTP request.
-   token exchange now supports refresh tokens
-   SAML 2.0 support has also improved by leaps and bounds! OpenSAML 5 support is here. EntityIDs' `registrationId` is simplified.
-   Asserting Parties can now be refreshed in the background according to the metadata’s expiry.
-   you can now sign relying party metadata
-   To align with the SAML 2.0 standard, the metadata endpoint uses the `application/samlmetadata+xml` MIME type, too.
-   in plain 'ol Spring Web applications, we have CSRF BREACH token support.
-   and more customizable `Remember Me` cookies
-   and the Spring Security filter chain flags more invalid configurations.
-   and the ServerHttpSecurity now picks up `ServerWebExchangeFirewall` objects as beans.
-   This release also brings improved and more course-grained integration for observability for authorization, authentication, and request observations separately.
-   The `AclAuthorizationStrategyImpl` supports the `RoleHierarchy` type, which is fairly new, too!
-   Kotlin support has improved considerably, too!
-   Technically, the Spring Authorization Server isn’t part of Spring Security, but I’ll mention it here for simplicity. It includes many new features, including a markedly more consistent and concise DSL configuration. Getting a whole OAuth IDP up and running with one line of Java code in a typical Spring Security application and a few configuration lines in your properties or YAML file is possible. SO NICE.

Now, let’s return to the discussion of Paskeys and One-time tokens.

### [](#better-passwords)Better Passwords

Let’s take a look at a simple application.

We’ll have an HTTP controller we want to lock down:

```java
Copypackage com.example.bootiful_34.security;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.security.Principal;
import java.util.Map;

@Controller
@ResponseBody
class SecuredController {

	@GetMapping("/admin")
	Map<String, String> admin(Principal principal) {
		return Map.of("admin", principal.getName());
	}

	@GetMapping("/")
	Map<String, String> hello(Principal principal) {
		return Map.of("user", principal.getName());
	}

}

```

To lock it down, we’ll need to define a `SecurityFilterChain` with some of the usual suspects: HTTP form login, some authorization rules, etc.

```java
Copy
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
				.authorizeHttpRequests(requests -> requests
                        .requestMatchers("/admin").hasRole("ADMIN")
                        .requestMatchers("/error").permitAll()
                        .anyRequest().authenticated()
                )
                .formLogin(Customizer.withDefaults())
                // ...
                .build();
	}

```

We’ll need to teach Spring Security about the users in our system, so let’s provide a `UserDetailsService`:

```java
Copypackage com.example.bootiful_34.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportRuntimeHints;
import org.springframework.http.MediaType;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@ImportRuntimeHints(UiResourcesRuntimeHintsRegistrar.class)
class SecurityConfiguration {

	@Bean
	UserDetailsService userDetailsService() {
		var josh = User.withUsername("josh").password("pw").roles("USER").build();
		var rob = User.withUsername("rob").password("pw").roles("USER", "ADMIN").build();
		return new InMemoryUserDetailsManager(josh, rob);
	}
	
	// ...
	
}
```

This application has two users: `josh` and `rob`. `josh` has one role `USER`, and `rob` has both `ADMIN` and `USER`.

In a non-trivial application, you’d want to use an alternative \`UserDetailsService implementation that points to an identity provider. Or, at the very least, an SQL database with encoded passwords never stored in plaintext. I’m registering users and their passwords here, but a well-designed system will minimize the use of passwords as much as possible. Your common sense received wisdom about passwords is probably wrong. The National Institute of Standards and Technology (a US Department of Commerce organization) [released its updated guidelines for password definition last year (2024)](https://pages.nist.gov/800-63-3/sp800-63b.html).

The NIST Special Publication 800-63B provides specific guidance on crafting, handling, renewing, and storing passwords (referred to as “memorized secrets”) and outlines recommendations for alternatives like one-time tokens and hardware-based authenticators (e.g., YubiKeys/WebAuthn). Let’s take a look at some of their recommendations.

#### [](#crafting-sufficient-passwords)Crafting Sufficient Passwords

If your system will have passwords, there’s a lot to know. Mercifully, Spring Security can do most (all?) of the following guidance for you.

Subscriber-chosen passwords must be at least eight characters long, and passwords randomly generated by a CSP (Credential Service Provider) must be at least six characters. Complexity rules (e.g., requiring mixed-case, numbers, and symbols) are discouraged. Passwords should not be arbitrarily restricted (e.g., limiting maximum length or excluding certain characters). Passwords must be checked against a list of commonly used, compromised, or expected passwords (e.g., dictionary words, repetitive patterns, service-specific terms). The user must choose a more robust alternative if a password is flagged as weak. Password strength meters or feedback are recommended to help users create robust passwords. The guidance suggests allowing copy-paste functionality to encourage password manager use and to offer an optional display of entered passwords to minimize entry errors. The document suggests limiting consecutive failed login attempts to no more than 100 and implementing CAPTCHA, increasing time delays, or other adaptive measures to prevent account lockouts due to abuse. Interestingly, it suggests that reauthentication policies should vary by assurance level (e.g., reauthentication is required every 12 hours or after 30 minutes of inactivity for high assurance levels). On the other hand, password changes should **not** be required arbitrarily or periodically. A change should only be enforced if there is evidence of compromise. It suggests passwords should be hashed and salted using one-way essential derivation functions (e.g., PBKDF2, BCrypt, or Argon2). Spring Security uses BCrypt by default.

### [](#the-best-password-is-no-password)The Best Password is No Password

NIST suggests alternatives to passwords like one-time Tokens (OTPs). Single-factor OTP Devices generate time-based or counter-based OTPs. OTPs must be cryptographically secure and have at least 20 bits of entropy. Multi-factor OTP Devices Require a second authentication factor (e.g., a PIN or biometric) before generating an OTP. Out-of-band authentication leverages secondary communication channels (e.g., mobile devices) for OTP delivery or confirmation, which requires secure channels and restricts weak methods. Hardware-based authenticators (e.g., YubiKeys, WebAuthn) are also encouraged. WebAuthn is part of the FIDO alliance and is encouraged as a robust and phishing-resistant authentication method. Hardware authenticators like YubiKeys use cryptographic protocols to ensure security. Multi-factor cryptographic Devices must combine “something you have” (e.g., a YubiKey) with “something you know” (e.g., PIN) or “something you are” (e.g., biometric). Keys should remain within tamper-resistant hardware and be inaccessible for extraction.

By prioritizing these methods, NIST emphasizes transitioning toward multi-factor authentication (MFA) and cryptographic solutions as more secure alternatives to traditional passwords.

### [](#going-passwordless-with-one-time-tokens-otts)Going Passwordless with One Time Tokens (OTTs)

So, in a Spring Security application context, a one-time token authenticates a user by relying upon an out-of-band factor that only they could have—perhaps the user’s ability to receive text messages, access their email, etc. You’ve probably used this feature before somewhere else. You hit a website, enter your username, and the site sends you an email with a link you can click to log in. These are sometimes called "magic links."

Spring Security doesn’t provide the integration with, e.g., your email provider or preferred messaging application. You might use Sendgrid, Twilio, or any of a million other services for that. But Spring Security does provide the plumbing to create and authenticate with a link.

Here’s the one little stanza we must add to the Spring Security configuration to get it to print

```java
Copy
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
				// ..
				.oneTimeTokenLogin(configurer -> configurer.tokenGenerationSuccessHandler(
                        (request, response, oneTimeToken) -> {
                            var msg = "go to http://localhost:8080/login/ott?token=" + oneTimeToken.getTokenValue();
                            System.out.println(msg);
                            response.setContentType(MediaType.TEXT_PLAIN_VALUE);
                            response.getWriter().print("you've got console mail!");
                        }))
                // ..                        
                .build();
	}

```

See that? It’s just a single lambda, in which you give context enough to craft and send a link to the user that, once clicked, will let them log in. Easy! In this example, I’m simply logging in by clicking on the link in my console. Again, you might send them an email or something more realistic instead.

This is super convenient and keeps the users from worrying about or—worse—sharing two passwords. Hopefully, they’ve locked down their email passwords! I’d rather they have one good password that they don’t share across sites than a dozen poor and shared passwords.

Another approach - another layer of security - might involve something even more complex than a text link for a would-be hacker to lay hands on. Something like your fingerprint, face ID scan, or a separate hardware dongle. The question is: How does one integrate those sorts of things where they are needed? For them to work, we’d need to modify browsers, server-side handling logic, operating systems, etc., to all speak a standard protocol.

And you’ll be happy to know that’s what’s been done by almost everybody. The protocol in question is called WebAuthn, and the group behind it is called the FIDO Alliance. The FIDO Alliance enjoys ubiquitous support! Here are some of its [most prominent members](https://fidoalliance.org/members/). The list includes DELL, Apple, Google, Intuit, NTT DOCOMO, Microsoft, meta, LastPass, DashLane, Bank Of America, 1Password, Intel, CISCO, CVS Health, American Express, VISA, and countless others besides. The point is that people with real money on the line are backing this approach. And so are the browsers! All the major browsers - Chrome, Safari, Edge, Firefox, Safari on iOS, Chrome on Android, Chrome on iOS, and Edge on iOS - all support it. It’s everywhere! And now, thanks to this release of Spring Security, it can easily be in your application, too.

Here is the relevant configuration in our Spring Security Filter chain example:

```java
Copy
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                // ... 
                .webAuthn(c -> c
                        .rpId("localhost")
                        .rpName("bootiful passkeys")
                        .allowedOrigins("http://localhost:8080")
                )
                // ...
                .build();
	}

```

Restart your application, then login to `localhost:8080/webauthn/register`. Register your Passkey. I’m in the Apple ecosystem, so it prompts me to do a FaceID on my iPhone or to use my TouchID on my macOS Apple Silicon laptop. Then, the browser stores the passkey in the operating system keychain. It’s now federated across iCloud. So, not only do I have a valid way to log in, but it’s tied to my iCloud account, so I can log in using my Face ID on one device and my Touch ID on another. No extra work is required!

To see it in action, logout: `localhost:8080/logout`.

Security that’s not only very good but also easier for the users! How cool is that?