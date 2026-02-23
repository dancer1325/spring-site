---
title: RestClient Support for OAuth2 in Spring Security 6.4
source: https://spring.io/blog/2024/10/28/restclient-support-for-oauth2-in-spring-security-6-4
scraped: 2026-02-23T08:09:42.155Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Steve Riesenberg |  October 28, 2024 | 6 Comments
---

# RestClient Support for OAuth2 in Spring Security 6.4

_Engineering | Steve Riesenberg |  October 28, 2024 | 6 Comments_

In Spring Security 6.2 and 6.3, we have worked to steadily improve configuration for applications using OAuth2 Client. Configuration for common use cases has been simplified by allowing applications to publish beans which are automatically included in the overall OAuth2 Client configuration during application startup. Recent improvements include:

-   Extension grant types can be enabled simply by publishing a bean of type `OAuth2AuthorizedClientProvider` (or `ReactiveOAuth2AuthorizedClientProvider`)
-   OAuth 2.0 Access Token Requests can be extended with custom parameters simply by publishing one or more beans of type `OAuth2AccessTokenResponseClient` (or `ReactiveOAuth2AccessTokenResponseClient`)
-   Spring Security automatically publishes a bean of type `OAuth2AuthorizedClientManager` (or `ReactiveOAuth2AuthorizedClientManager`) if one is not already published, requiring less boilerplate configuration when an application needs to obtain access tokens

In Spring Security 6.4, this theme continues with a round of improvements focused on `RestClient`, which is a new HTTP client introduced in Spring Framework 6.1. `RestClient` provides a fluent API that is incredibly similar to that of `WebClient` but is synchronous and does not depend on reactive libraries. This means that configuring an application to make protected resources requests using OAuth2 Client is much simpler and does not require any additional dependencies. Additionally, improvements have been made to provide consistency between servlet applications using `RestClient` and reactive applications using `WebClient` with the goal of aligning both stacks on a common configuration model.

Let's examine the new support for `RestClient` and other improvements for OAuth2 Client in detail.

## [](#a-brief-introduction-to-oauth2)A brief introduction to OAuth2

First, let's start by summarizing the relevant concepts in OAuth2 that we will be using.

In OAuth2 terms, making a *protected resources request* means including an access token in the `Authorization` header of an outbound request to a *resource server*. The originating application is called a *client* because it initiates these outbound requests. The destination application is called a *resource server* because it provides an API to access *resources* (e.g. data) that belong to a *resource owner* (e.g. user) and are protected by an *authorization server*. An *authorization server* is a system responsible for creating and managing access tokens representing an *authorization grant*, which it does in response to requests (called OAuth 2.0 Access Token requests) from a *client* on behalf of a *resource owner*.

## [](#make-protected-resources-requests-with-restclient)Make protected resources requests with `RestClient`

With that brief introduction, let's look at how we would set up an application to make protected resources requests using `RestClient` in Spring Security 6.4. Head on over to [Spring Initializr](https://start.spring.io/#!platformVersion=3.4.0-RC1&dependencies=web,oauth2-client) to create a new application. If you are updating an existing application with Spring Boot, you will need to add the following dependency:

```groovy
Copyimplementation 'org.springframework.boot:spring-boot-starter-oauth2-client'
```

The application requires at least one `ClientRegistration` to be configured through the use of a `ClientRegistrationRepository` bean. The `ClientRegistration` class is the domain model in Spring Security that contains the data for a particular OAuth2 client. Each client must be pre-registered with the authorization server, and this class contains details obtained from the authorization server such as `clientId` and `clientSecret`. It also contains the `authorizationGrantType` we would like to use, such as `authorization_code` or `client_credentials`, and several additional parameters which can be optionally configured as required.

The following example configures an `InMemoryClientRegistrationRepository` bean with a single `ClientRegistration` using Spring Boot configuration properties:

`application.yml`:

```yaml
Copyspring:
  security:
    oauth2:
      client:
        registration:
          messaging-client:
            provider: spring
            client-id: client1
            client-secret: my-secret
            authorization-grant-type: authorization_code
            scope: message.read,message.write
        provider:
          spring:
            issuer-uri: http://localhost:9000
```

The above configuration allows Spring Security to obtain access tokens via the `authorization_code` grant using a [local authorization server](https://spring.io/projects/spring-authorization-server).

Spring Security provides implementations of `OAuth2AuthorizedClientManager`, which is a component that can be used to obtain access tokens (such as a JWT). An instance of this component is automatically published as a bean by Spring Security, meaning we simply need to inject it into our own configuration in order to set up a `RestClient` for making protected resources requests in our application. The following example configures a minimal `RestClient` and publishes it as a bean:

```java
Copy@Configuration
public class RestClientConfig {

	@Bean
	public RestClient restClient(RestClient.Builder builder, OAuth2AuthorizedClientManager authorizedClientManager) {
		OAuth2ClientHttpRequestInterceptor requestInterceptor =
			new OAuth2ClientHttpRequestInterceptor(authorizedClientManager);

		return builder.requestInterceptor(requestInterceptor).build();
	}

}
```

We can now make protected resources requests in our own application. The following example demonstrates doing this in a Spring MVC controller:

```java
Copyimport static org.springframework.security.oauth2.client.web.client.RequestAttributeClientRegistrationIdResolver.clientRegistrationId;

@RestController
public class MessagesController {

	private final RestClient restClient;

	public MessagesController(RestClient restClient) {
		this.restClient = restClient;
	}

	@GetMapping("/messages")
	public ResponseEntity<List<Message>> messages() {
		Message[] messages = this.restClient.get()
			.uri("http://localhost:8090/messages")
			.attributes(clientRegistrationId("messaging-client"))
			.retrieve()
			.body(Message[].class);

		return ResponseEntity.ok(Arrays.asList(messages));
	}

	public record Message(String message) {
	}

}
```

The above example makes use of a static method to provide the `registrationId` of `"messaging-client"` to the interceptor through attributes. The value provided matches the value in the yaml configuration provided earlier, which is how Spring Security is able to know which client id, secret, grant type, scopes and other information to use when obtaining an access token.

Of course, this is just an example and you are not restricted to simply returning the results in an endpoint. You can do this in any part of your application that you wish, such as an `@Service` or `@Component` that is responsible for making protected resources requests and returning the results to your application.

## [](#make-oauth-20-access-token-requests-with-restclient)Make OAuth 2.0 Access Token requests with `RestClient`

Prior to Spring Security 6.4, the default HTTP client for the servlet stack was `RestTemplate`. Customizing OAuth 2.0 Access Token requests for servlet applications using `RestTemplate` is quite different from customizing reactive applications that use `WebClient` due to differences in the API between `RestTemplate` and `WebClient`.

With the introduction of `RestClient` in Spring Framework 6.1, it is now possible to align both stacks with very similar configuration models by utilizing `RestClient` and `WebClient` as the underlying HTTP clients for each stack, respectively. If needed, a `RestClient` can be created from `RestTemplate` using `RestClient.create(RestTemplate)`, providing a clear migration path for aligning the servlet and reactive stacks on a common configuration model, which is a goal for Spring Security 7.

Spring Security 6.4 introduces new implementations of `OAuth2AccessTokenResponseClient` for this purpose. If desired, you can opt-in to using `RestClient` as the HTTP client for all OAuth2 Client features in a servlet application. The following example demonstrates a minimal configuration for opting into the new support with a customized instance of `RestClient`:

```java
Copy@Configuration
@EnableWebSecurity
public class SecurityConfig {

	private final RestClient restClient;

	@PostConstruct
	void initialize() {
		this.restClient = RestClient.builder()
			.messageConverters((messageConverters) -> {
				messageConverters.clear();
				messageConverters.add(new FormHttpMessageConverter());
				messageConverters.add(new OAuth2AccessTokenResponseHttpMessageConverter());
			})
			.defaultStatusHandler(new OAuth2ErrorResponseErrorHandler())
			// TODO: Customize the instance of RestClient as needed...
			.build();
	}

	@Bean
	public OAuth2AccessTokenResponseClient<OAuth2AuthorizationCodeGrantRequest> authorizationCodeAccessTokenResponseClient() {
		RestClientAuthorizationCodeTokenResponseClient accessTokenResponseClient =
			new RestClientAuthorizationCodeTokenResponseClient();
		accessTokenResponseClient.setRestClient(this.restClient);

		return accessTokenResponseClient;
	}

	@Bean
	public OAuth2AccessTokenResponseClient<OAuth2RefreshTokenGrantRequest> refreshTokenAccessTokenResponseClient() {
		RestClientRefreshTokenTokenResponseClient accessTokenResponseClient =
			new RestClientRefreshTokenTokenResponseClient();
		accessTokenResponseClient.setRestClient(this.restClient);

		return accessTokenResponseClient;
	}

	@Bean
	public OAuth2AccessTokenResponseClient<OAuth2ClientCredentialsGrantRequest> clientCredentialsAccessTokenResponseClient() {
		RestClientClientCredentialsTokenResponseClient accessTokenResponseClient =
			new RestClientClientCredentialsTokenResponseClient();
		accessTokenResponseClient.setRestClient(this.restClient);

		return accessTokenResponseClient;
	}

	@Bean
	public OAuth2AccessTokenResponseClient<OAuth2PasswordGrantRequest> passwordAccessTokenResponseClient() {
		return (grantRequest) -> {
			throw new UnsupportedOperationException("The `password` grant type is not supported.");
		};
	}

	@Bean
	public OAuth2AccessTokenResponseClient<JwtBearerGrantRequest> jwtBearerAccessTokenResponseClient() {
		RestClientJwtBearerTokenResponseClient accessTokenResponseClient =
			new RestClientJwtBearerTokenResponseClient();
		accessTokenResponseClient.setRestClient(this.restClient);

		return accessTokenResponseClient;
	}

	@Bean
	public OAuth2AccessTokenResponseClient<TokenExchangeGrantRequest> tokenExchangeAccessTokenResponseClient() {
		RestClientTokenExchangeTokenResponseClient accessTokenResponseClient =
			new RestClientTokenExchangeTokenResponseClient();
		accessTokenResponseClient.setRestClient(this.restClient);

		return accessTokenResponseClient;
	}

}
```

> NOTE: There is no implementation for the `password` grant type with the new support, since existing support for this grant type is deprecated and scheduled to be removed in Spring Security 7.

## [](#override-or-omit-default-parameters)Override or omit default parameters

Spring Security provides support for several grant types through implementations of the `OAuth2AccessTokenResponseClient` (or `ReactiveOAuth2AccessTokenResponseClient`) interface. A common requirement is being able to customize the parameters of an OAuth 2.0 Access Token request, which is typical when the authorization server has specific requirements or provides features not covered in a supported specification.

In Spring Security 6.3 and earlier, it was not possible for reactive applications to override or omit parameter values set by Spring Security, requiring workarounds to customize the application for such use cases. Overriding parameters is now possible for both reactive applications (using `WebClient`) and servlet applications (using `RestClient`) via the `setParametersConverter()` customization hook. In this case, it's important to note that all grant-type specific and default parameters will be set first. Any parameters provided by your custom `parametersConverter` will override existing parameters.

In addition to overriding parameters, it is now possible to omit parameters that may be rejected by the authorization server. For example, when the `ClientRegistration#clientAuthenticationMethod` is set to `private_key_jwt`, we can provide client authentication using a client assertion containing a generated JWT. Some authorization servers may choose to reject requests that contain both the `client_id` *and* `client_assertion` parameters. In this case, because `client_id` is a default parameter provided by Spring Security, we need a way to omit this parameter based on the knowledge that we will be providing client authentication using a client assertion.

Spring Security 6.4 provides the ability to omit parameters of the OAuth 2.0 Access Token request using the `setParametersCustomizer()` customization hook. The following example shows how to omit the `client_id` parameter when using a client assertion for client authentication with the `client_credentials` grant:

```java
Copy@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

	@Bean
	public ReactiveOAuth2AccessTokenResponseClient<OAuth2ClientCredentialsGrantRequest> clientCredentialsAccessTokenResponseClient() {
		WebClientReactiveClientCredentialsTokenResponseClient accessTokenResponseClient =
			new WebClientReactiveClientCredentialsTokenResponseClient();
		accessTokenResponseClient.addParametersConverter(
			new NimbusJwtClientAuthenticationParametersConverter<>(jwkResolver()));
		accessTokenResponseClient.setParametersCustomizer((parameters) -> {
			if (parameters.containsKey(OAuth2ParameterNames.CLIENT_ASSERTION)) {
				parameters.remove(OAuth2ParameterNames.CLIENT_ID);
			}
		});

		return accessTokenResponseClient;
	}

	private Function<ClientRegistration, JWK> jwkResolver() {
		// ...
	}

}
```

> TIP: You can provide equivalent configuration for servlet applications when using the `RestClientClientCredentialsTokenResponseClient` (or alternate implementations for other grant types) as well.

## [](#conclusion)Conclusion

Spring Security 6.4 is an exciting release full of improvements for applications secured with OAuth2, and contains many other exciting features as well. In this post, we examined three new features from the upcoming release. First, we discussed making protected resources requests with `RestClient` in non-reactive applications without requiring additional dependencies. Next, we looked at opting into using `RestClient` everywhere and enjoying streamlined and more consistent configuration that is aligned with the reactive stack. Finally, we learned how to override or omit default parameters in OAuth 2.0 Access Token requests, which unlocks advanced scenarios that were previously difficult to account for.

I hope you are as excited as I am about this new round of improvements and all the other features available with Spring Security 6.4. These features and more are available for pre-release in Spring Security `6.4.0-RC1`, so please try them out. We'd love to hear your feedback!