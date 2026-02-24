---
title: Spring Security OAuth 2.0.0.RC1 Available
source: https://spring.io/blog/2014/04/18/spring-security-oauth-2-0-0-rc1-available
scraped: 2026-02-24T07:27:53.662Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Dave Syer |  April 18, 2014 | 12 Comments
---

# Spring Security OAuth 2.0.0.RC1 Available

_Releases | Dave Syer |  April 18, 2014 | 12 Comments_

[Spring Security OAuth](https://github.com/spring-projects/spring-security-oauth) 2.0.0.RC1 is available now from the [Spring Repo](http://repo.spring.io). This is a huge step in the direction of modernisation and ease of use for OAuth server and client apps on Spring.

The headline feature is support for `@Configuration`(for OAuth2 only) and if you use Spring Boot to write your app you can serve tokens and protect the API resources in about 25 lines of code:

```java
Copy@Configuration
@EnableAutoConfiguration
@EnableResourceServer
@RestController
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@RequestMapping("/")
	public String home() {
		return "Hello World";
	}

	@Configuration
	@EnableAuthorizationServer
	protected static class OAuth2Config extends AuthorizationServerConfigurerAdapter {

		@Autowired
		private AuthenticationManager authenticationManager;
		
		@Override
		public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
			endpoints.authenticationManager(authenticationManager);
		}
		
		@Override
		public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
		 	clients.inMemory()
		        .withClient("my-trusted-client")
		            .authorizedGrantTypes("password", "authorization_code", "refresh_token")
		            .authorities("ROLE_CLIENT", "ROLE_TRUSTED_CLIENT")
		            .scopes("read", "write", "trust")
		            .resourceIds("oauth2-resource")
		            .secret("secret");
		}

	}

}
```

We now support JSON Web Token (JWT) tokens out of the box, and also there is an explicit Approvals domain for managing and persisting user approvals. These features draw heavily on the [CloudFoundry UAA](https://github.com/cloudfoundry/uaa) work.

The Authorization Server APIs have been refactored a lot to enable new use cases to be easily added: for example OpenID Connect (OIDC), MAC tokens, or the new Token Revocation standard are easy to add. I know of at least one OIDC implementation that use Spring OAuth2 2.0 already.

There are plenty of people to thank for their help in this work, but our own Rob Winch deserves a big shout out for getting the ball rolling with the `@Configuration` work. During the work on 2.0 we moved everything including issue tracking to github, and I think the result has been more community engagement, so many of the contributors this time are directly from people using the software, which is great. Thanks to everyone who helped!