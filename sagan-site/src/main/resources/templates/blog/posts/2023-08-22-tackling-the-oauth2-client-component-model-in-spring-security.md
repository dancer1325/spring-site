---
title: Tackling the OAuth2 Client component model in Spring Security
source: https://spring.io/blog/2023/08/22/tackling-the-oauth2-client-component-model-in-spring-security/
scraped: 2026-02-23T09:16:06.799Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Steve Riesenberg |  August 22, 2023 | 3 Comments
---

# Tackling the OAuth2 Client component model in Spring Security

_Engineering | Steve Riesenberg |  August 22, 2023 | 3 Comments_

In Spring Security 5, we saw many developments in the OAuth2 story with the introduction of OAuth2 Resource Server and OAuth2 Client into the framework.

Today, it is quite convenient to develop applications that are secured by OAuth2 using the features available in OAuth2 Resource Server. Additionally, we can take advantage OAuth2 Client features to integrate with OAuth 2.0 and OpenID Connect 1.0 providers, making it possible to authenticate users with OAuth2 Login and/or make protected requests to applications secured by OAuth2.

However, the OAuth2 landscape is very complex, and customization is often required to integrate with third parties that have inflexible or even non-compliant implementations of various OAuth2-related standards. With all of this complexity, Spring Security's OAuth2 Client components were developed with extreme flexibility in mind. This flexibility comes with tradeoffs, particularly in the area of configuration.

We have listened to feedback from the community regarding configuration, and a common theme is simplifying configuration of the various OAuth2 Client components. Let's take a look at how configuration has been simplified in the latest Spring Security milestone, [6.2.0-M2](https://github.com/spring-projects/spring-security/releases/tag/6.2.0-M2).

**Update:** The [OAuth2](https://docs.spring.io/spring-security/reference/6.2-SNAPSHOT/servlet/oauth2/index.html) page of the reference documentation has been updated to include an overview of [OAuth2 Client](https://docs.spring.io/spring-security/reference/6.2-SNAPSHOT/servlet/oauth2/index.html#oauth2-client) with examples based on this article.

## [](#getting-started)Getting Started

Let's start with a simple application from [start.spring.io](https://start.spring.io/#!type#gradle-project&language#java&platformVersion#3.2.0-M2&packaging#jar&jvmVersion#17&groupId#com.example&artifactId#client&name#client&description#Demo%20project%20for%20Spring%20Boot&packageName#com.example.client&dependencies#web,oauth2-client) that we can build on for various use cases we might encounter. The following configuration is equivalent to the default arrangement provided by Spring Boot:

```java
Copy@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			.authorizeHttpRequests((authorize) -> authorize
				.anyRequest().authenticated()
			)
			.oauth2Client(Customizer.withDefaults())
			.oauth2Login(Customizer.withDefaults());

		return http.build();
	}

}
```

All that is required is a `ClientRegistration` in `application.yml`, such as the following:

```yaml
Copyspring:
  security:
    oauth2:
      client:
        registration:
          my-oauth2-client:
            provider: my-auth-server
            client-id: my-client-id
            client-secret: my-client-secret
            authorization-grant-type: authorization_code
            client-authentication-method: client_secret_basic
            scope: openid,profile,message.read,message.write
        provider:
          my-auth-server:
            issuer-uri: https://my-auth-server.com
```

## [](#use-cases)Use Cases

With the above configuration in mind, let's consider the following use cases:

### [](#use-case-i-want-to-customize-token-request-parameters)Use-case: I want to customize token request parameters

One common use case is the need to customize request parameters when obtaining an `access_token`. For example, let's say we want to add a custom `audience` parameter to the token request because the provider requires this parameter for the `authorization_code` grant.

Previously, we had to ensure that this customization was applied for both OAuth2 Login (if we are using this feature) and OAuth2 Client components using the Spring Security DSL. Here's what the configuration might have looked like:

```java
Copy@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		OAuth2AuthorizationCodeGrantRequestEntityConverter requestEntityConverter =
			new OAuth2AuthorizationCodeGrantRequestEntityConverter();
		requestEntityConverter.addParametersConverter(parametersConverter());

		DefaultAuthorizationCodeTokenResponseClient accessTokenResponseClient =
			new DefaultAuthorizationCodeTokenResponseClient();
		accessTokenResponseClient.setRequestEntityConverter(requestEntityConverter);

		http
			.authorizeHttpRequests((authorize) -> authorize
				.anyRequest().authenticated()
			)
			.oauth2Client((oauth2Client) -> oauth2Client
				.authorizationCodeGrant((authorizationCode) -> authorizationCode
					.accessTokenResponseClient(accessTokenResponseClient)
				)
			)
			.oauth2Login((oauth2Login) -> oauth2Login
				.tokenEndpoint((tokenEndpoint) -> tokenEndpoint
					.accessTokenResponseClient(accessTokenResponseClient)
				)
			);

		return http.build();
	}

	private static Converter<OAuth2AuthorizationCodeGrantRequest, MultiValueMap<String, String>> parametersConverter() {
		return (grantRequest) -> {
			MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
			parameters.set("audience", "xyz_value");

			return parameters;
		};
	}

}
```

In the latest milestone, we can simply publish a bean of type `OAuth2AccessTokenResponseClient<T>` (where `T` is `OAuth2AuthorizationCodeGrantRequest`) and it will be picked up automatically. This configuration can now be simplified to:

```java
Copy@Configuration
public class SecurityConfig {

	@Bean
	public DefaultAuthorizationCodeTokenResponseClient authorizationCodeAccessTokenResponseClient() {
		OAuth2AuthorizationCodeGrantRequestEntityConverter requestEntityConverter =
			new OAuth2AuthorizationCodeGrantRequestEntityConverter();
		requestEntityConverter.addParametersConverter(parametersConverter());

		DefaultAuthorizationCodeTokenResponseClient accessTokenResponseClient =
			new DefaultAuthorizationCodeTokenResponseClient();
		accessTokenResponseClient.setRequestEntityConverter(requestEntityConverter);

		return accessTokenResponseClient;
	}

	private static Converter<OAuth2AuthorizationCodeGrantRequest, MultiValueMap<String, String>> parametersConverter() {
		// ...
	}

}
```

**NOTE:** Notice that because this was the only customization we performed, we can actually omit the `SecurityFilterChain` bean entirely and use the default provided by Spring Boot. This may not always be the case if we need to configure other things, but is worth considering as our configuration is simpler either way.

We can publish similar beans for other grant types as well. For example, to customize token requests for the `client_credentials` grant we can publish the following bean:

```java
Copy@Configuration
public class SecurityConfig {

	@Bean
	public DefaultClientCredentialsTokenResponseClient clientCredentialsAccessTokenResponseClient() {
		OAuth2ClientCredentialsGrantRequestEntityConverter requestEntityConverter =
			new OAuth2ClientCredentialsGrantRequestEntityConverter();
		requestEntityConverter.addParametersConverter(parametersConverter());

		DefaultClientCredentialsTokenResponseClient accessTokenResponseClient =
				new DefaultClientCredentialsTokenResponseClient();
		accessTokenResponseClient.setRequestEntityConverter(requestEntityConverter);

		return accessTokenResponseClient;
	}

	private static Converter<OAuth2ClientCredentialsGrantRequest, MultiValueMap<String, String>> parametersConverter() {
		// ...
	}

}
```

### [](#use-case-i-want-to-customize-the-restoperations-used-by-oauth2-client-components)Use-case: I want to customize the `RestOperations` used by OAuth2 Client components

Another common use case is the need to customize the `RestOperations` (or `WebClient` for reactive applications) used when obtaining an `access_token`. We might need to do this to customize processing of the response (via a custom `HttpMessageConverter`) or to apply proxy settings for a corporate network (via a customized `ClientHttpRequestFactory`).

Let's imagine we want to customize multiple grant types simultaneously. Previously, we had to ensure this customization was applied to both OAuth2 Login (if we are using this feature) and OAuth2 Client components. We had to use both the Spring Security DSL (for the `authorization_code` grant) and publish a bean of type `OAuth2AuthorizedClientManager` for other grant types, which required very verbose configuration. Here's what the configuration might have looked like:

```java
Copy@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		DefaultAuthorizationCodeTokenResponseClient accessTokenResponseClient =
			new DefaultAuthorizationCodeTokenResponseClient();
		accessTokenResponseClient.setRestOperations(restTemplate());

		http
			.authorizeHttpRequests((authorize) -> authorize
				.anyRequest().authenticated()
			)
			.oauth2Client((oauth2Client) -> oauth2Client
				.authorizationCodeGrant((authorizationCode) -> authorizationCode
					.accessTokenResponseClient(accessTokenResponseClient)
				)
			)
			.oauth2Login((oauth2Login) -> oauth2Login
				.tokenEndpoint((tokenEndpoint) -> tokenEndpoint
					.accessTokenResponseClient(accessTokenResponseClient)
				)
			);

		return http.build();
	}

	@Bean
	public OAuth2AuthorizedClientManager authorizedClientManager(
			ClientRegistrationRepository clientRegistrationRepository,
			OAuth2AuthorizedClientRepository authorizedClientRepository) {

		DefaultRefreshTokenTokenResponseClient refreshTokenAccessTokenResponseClient =
			new DefaultRefreshTokenTokenResponseClient();
		refreshTokenAccessTokenResponseClient.setRestOperations(restTemplate());

		DefaultClientCredentialsTokenResponseClient clientCredentialsAccessTokenResponseClient =
			new DefaultClientCredentialsTokenResponseClient();
		clientCredentialsAccessTokenResponseClient.setRestOperations(restTemplate());

		DefaultPasswordTokenResponseClient passwordAccessTokenResponseClient =
			new DefaultPasswordTokenResponseClient();
		passwordAccessTokenResponseClient.setRestOperations(restTemplate());

		OAuth2AuthorizedClientProvider authorizedClientProvider =
			OAuth2AuthorizedClientProviderBuilder.builder()
				.authorizationCode()
				.refreshToken((refreshToken) -> refreshToken
					.accessTokenResponseClient(refreshTokenAccessTokenResponseClient)
				)
				.clientCredentials((clientCredentials) -> clientCredentials
					.accessTokenResponseClient(clientCredentialsAccessTokenResponseClient)
				)
				.password((password) -> password
					.accessTokenResponseClient(passwordAccessTokenResponseClient)
				)
				.build();

		DefaultOAuth2AuthorizedClientManager authorizedClientManager =
			new DefaultOAuth2AuthorizedClientManager(
				clientRegistrationRepository, authorizedClientRepository);
		authorizedClientManager.setAuthorizedClientProvider(authorizedClientProvider);

		return authorizedClientManager;
	}

	@Bean
	public RestTemplate restTemplate() {
		// ...
	}

}
```

In the latest milestone, we can simply publish beans for each of the `OAuth2AccessTokenResponseClient<T>` (where `T` is a grant type supported out-of-the-box in Spring Security). This configuration can now be simplified to:

```java
Copy@Configuration
public class SecurityConfig {

	@Bean
	public DefaultAuthorizationCodeTokenResponseClient authorizationCodeAccessTokenResponseClient() {
		DefaultAuthorizationCodeTokenResponseClient accessTokenResponseClient =
			new DefaultAuthorizationCodeTokenResponseClient();
		accessTokenResponseClient.setRestOperations(restTemplate());

		return accessTokenResponseClient;
	}

	@Bean
	public DefaultRefreshTokenTokenResponseClient refreshTokenAccessTokenResponseClient() {
		DefaultRefreshTokenTokenResponseClient accessTokenResponseClient =
				new DefaultRefreshTokenTokenResponseClient();
		accessTokenResponseClient.setRestOperations(restTemplate());

		return accessTokenResponseClient;
	}

	@Bean
	public DefaultClientCredentialsTokenResponseClient clientCredentialsAccessTokenResponseClient() {
		DefaultClientCredentialsTokenResponseClient accessTokenResponseClient =
				new DefaultClientCredentialsTokenResponseClient();
		accessTokenResponseClient.setRestOperations(restTemplate());

		return accessTokenResponseClient;
	}

	@Bean
	public DefaultPasswordTokenResponseClient passwordAccessTokenResponseClient() {
		DefaultPasswordTokenResponseClient accessTokenResponseClient =
				new DefaultPasswordTokenResponseClient();
		accessTokenResponseClient.setRestOperations(restTemplate());

		return accessTokenResponseClient;
	}

	@Bean
	public RestTemplate restTemplate() {
		// ...
	}

}
```

In fact, we can even opt-in to the extension grant type `jwt-bearer` simply by publishing the corresponding `OAuth2AccessTokenResponseClient` bean:

```java
Copy@Bean
public DefaultJwtBearerTokenResponseClient jwtBearerAccessTokenResponseClient() {
	DefaultJwtBearerTokenResponseClient accessTokenResponseClient =
			new DefaultJwtBearerTokenResponseClient();
	accessTokenResponseClient.setRestOperations(restTemplate());

	return accessTokenResponseClient;
}
```

**NOTE:** Notice that we did not need to publish a bean of type `OAuth2AuthorizedClientManager`. One will now be published for us by Spring Security.

We can now use the fully configured `OAuth2AuthorizedClientManager` via dependency injection, like so:

```java
Copy@RestController
class MyController {
	private final OAuth2AuthorizedClientManager authorizedClientManager;

	MyController(OAuth2AuthorizedClientManager authorizedClientManager) {
		this.authorizedClientManager = authorizedClientManager;
	}

	// ...
}
```

### [](#use-case-i-want-to-enable-an-extension-grant-type)Use-case: I want to enable an extension grant type

Another use case involves enabling and/or configuring an extension grant type. For example, Spring Security provides support for the `jwt-bearer` grant type, but does not enable it by default.

Previously, we had to publish a bean of type `OAuth2AuthorizedClientManager` and ensure we re-enabled default grant types as well, which required some verbose configuration. Here's what the configuration might have looked like:

```java
Copy@Configuration
public class SecurityConfig {

	@Bean
	public OAuth2AuthorizedClientManager authorizedClientManager(
			ClientRegistrationRepository clientRegistrationRepository,
			OAuth2AuthorizedClientRepository authorizedClientRepository) {

		OAuth2AuthorizedClientProvider authorizedClientProvider =
			OAuth2AuthorizedClientProviderBuilder.builder()
				.authorizationCode()
				.refreshToken()
				.clientCredentials()
				.password()
				.provider(new JwtBearerOAuth2AuthorizedClientProvider())
				.build();

		DefaultOAuth2AuthorizedClientManager authorizedClientManager =
			new DefaultOAuth2AuthorizedClientManager(
				clientRegistrationRepository, authorizedClientRepository);
		authorizedClientManager.setAuthorizedClientProvider(authorizedClientProvider);

		return authorizedClientManager;
	}

}
```

In the latest milestone, we can simply publish a bean for one or more `OAuth2AuthorizedClientProvider` and they will be picked up automatically. This configuration can now be simplified to:

```java
Copy@Configuration
public class SecurityConfig {

	@Bean
	public OAuth2AuthorizedClientProvider jwtBearer() {
		return new JwtBearerOAuth2AuthorizedClientProvider();
	}

}
```

**NOTE:** Any published bean of type `OAuth2AuthorizedClientProvider` that is not provided by Spring Security will also be picked up, and applied after the default grant types.

This also provides the opportunity for customizing an existing grant type without the need to re-define the defaults. For example, if we want to customize the clock skew of the `OAuth2AuthorizedClientProvider` for the `client_credentials` grant, we can simply publish a bean like so:

```java
Copy@Configuration
public class SecurityConfig {

	@Bean
	public OAuth2AuthorizedClientProvider clientCredentials() {
		ClientCredentialsOAuth2AuthorizedClientProvider authorizedClientProvider =
				new ClientCredentialsOAuth2AuthorizedClientProvider();
		authorizedClientProvider.setClockSkew(Duration.ofMinutes(5));

		return authorizedClientProvider;
	}

}
```

## [](#conclusion)Conclusion

I hope you are as excited as I am about the simplified approach to configuring OAuth2 Client components in Spring Security simply by publishing a `@Bean`. If you want to get involved, please try out the milestone and [give us feedback](https://github.com/spring-projects/spring-security/issues/new/choose)! We are continuing to listen and look for opportunities to simplify configuration for users of Spring Security.