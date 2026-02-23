---
title: Migrating OAuth2 Apps from Spring Boot 1.2 to 1.3
source: https://spring.io/blog/2015/11/30/migrating-oauth2-apps-from-spring-boot-1-2-to-1-3
scraped: 2026-02-23T19:34:25.592Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Dave Syer |  November 30, 2015 | 6 Comments
---

# Migrating OAuth2 Apps from Spring Boot 1.2 to 1.3

_Engineering | Dave Syer |  November 30, 2015 | 6 Comments_

There are some new features in [Spring Boot](http://projects.spring.io/spring-boot/) 1.3 to do with [OAuth2](https://tools.ietf.org/html/rfc6749) clients and servers and [Spring Security OAuth2](http://projects.spring.io/spring-security-oauth/). Some of those features were ported from [Spring Cloud Security](http://cloud.spring.io/spring-cloud-Security/,) and hence were in the Angel release train of [Spring Cloud](http://projects.spring.io/spring-cloud/), but are not in the Brixton release train. This article helps you navigate the changes and update any existing apps to use the new features.

## [](#dependency-management)Dependency Management

If you are not using Spring Cloud you should be able to just change the version number of your Spring Boot dependency. Since some of the OAuth2 features migrated from Spring Cloud Security to Spring Boot in 1.3, it is likely that things are slightly more complicated than that. A [separate article](https://spring.io/blog/2015/11/25/migrating-spring-cloud-apps-from-spring-boot-1-2-to-1-3) deals with upgrading Spring Cloud apps from Spring Boot 1.2 to 1.3. If you are using the Spring Cloud Angel release train then you should consult that article for details of how to manage the dependencies (independent of any specific features).

## [](#authorization-server)Authorization Server

An OAuth2 Authorization Server is responsible first and foremost for issuing access tokens. To do this it must be able to authenticate client apps and (optionally) users.

A very simple OAuth2 Authorization Server with a single client can be implemented by convention and some configuration properties in Spring Boot 1.3. So a really basic example like the vanilla auth server from the [Angular JS Spring Securrity Tutorial](https://spring.io/guides/tutorials/spring-security-and-angular-js/#_sso_with_oauth2_angular_js_and_spring_security_part_v) from spring.io can be simplified quite a bit. In Spring Boot 1.2 we have:

```java
Copy@SpringBootApplication
@RestController
@EnableResourceServer
public class AuthserverApplication {
       
  @Configuration
  @EnableAuthorizationServer
  protected static class OAuth2Config extends AuthorizationServerConfigurerAdapter {

    @Autowired
    private AuthenticationManager authenticationManager;
         
    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Excep
      endpoints.authenticationManager(authenticationManager);
    }

    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
      clients.inMemory()
        .withClient("acme")
          .secret("acmesecret")
          .authorizedGrantTypes("authorization_code", "refresh_token",
              "password")
          .scopes("openid").autoApprove(true);
    }

  }

  ...
}
```

In Spring Boot 1.3 we have just:

```java
Copy@SpringBootApplication
@RestController
@EnableResourceServer
@EnableAuthorizationServer
public class AuthserverApplication {
  ...
}
```

and in `application.properties`:

```
Copysecurity.oauth2.client.clientId: acme
security.oauth2.client.clientSecret: acmesecret
security.oauth2.client.authorized-grant-types: authorization_code,refresh_token,password
security.oauth2.client.scope: openid
```

This is a general purpose Authorization Server, great for demos, but not very realistic in practice because it only has one client ("acme"). Nevertheless, as a way to get started quickly with OAuth2 it's nice to be able to do so much with so little.

To extend the basic sample and take control of the Authorization Server features you only have to go back to the old Spring Boot 1.2 version (any app with its own `AuthorizationServerConfigurer` switches off the autoconfigured features).

## [](#resource-server)Resource Server

A Resource Server protects its endpoints by requiring a valid access token (as created by the Authorization Server).

Similarly to the Authorization Server, a Resource Server can be implemented by convention and some configuration properties in Spring Boot 1.3, and also with Spring Boot 1.2 in conjunction with Spring Cloud Security. As an example consider the vanilla resource server [Angular JS Spring Security Tutorial](https://spring.io/guides/tutorials/spring-security-and-angular-js/#_sso_with_oauth2_angular_js_and_spring_security_part_v) from spring.io.

With Spring Boot 1.2 we had to use Spring Cloud Security for the `@EnableOAuth2Resource` annotation:

```groovy
Copy@SpringBootApplication
@RestController
@EnableOAuth2Resource
class ResourceApplication {
  ...
}
```

and some configuration to help decode the access tokens in `application.properties`

```
Copyspring.oauth2.resource.userInfoUri: http://localhost:9999/uaa/user
```

With Spring Boot 1.3 the Spring Cloud dependency can be removed and the annotation replaced with a vanilla `@EnableResourceServer` annotation from Spring Security OAuth2:

```groovy
Copy@SpringBootApplication
@RestController
@EnableResourceServer
class ResourceApplication {
  ...
}
```

To finish the app there is a slightly different configuration (note the key prefix change from `spring.oauth2` to `security.oauth2`):

```
Copysecurity.oauth2.resource.userInfoUri: http://localhost:9999/uaa/user
```

## [](#client-application)Client Application

In OAuth2 a client is an agent (usually an application) that acquires a token, often on behalf of a user. Single Sign On can be implemented by having a single Authorization Server and dependent authenticating apps that are OAuth2 clients.

### [](#vanilla-single-sign-on)Vanilla Single Sign On

On the client side in Spring Boot 1.3 you can implement the Single Sign On pattern with an annotation and some configuration properties. You can do the same with Spring Boot 1.2 is you use Spring Cloud Security as well.

A really generic example with Spring Boot 1.2 and Spring Cloud Angel would use a single `@EnableOAuth2Sso` annotation:

```java
Copy@SpringBootApplication
@EnableOAuth2Sso
public class SsoApplication {
  ...
}
```

and some configuration for the client in `application.yml` (or equivalently `application.properties`). Here's an example for authentication with Facebook for an app running on localhost:8080:

```yaml
Copyspring:
  oauth2:
    client:
      clientId: 233668646673605
      clientSecret: 33b17e044ee6a4fa383f46ec6e28ea1d
      accessTokenUri: https://graph.facebook.com/oauth/access_token
      userAuthorizationUri: https://www.facebook.com/dialog/oauth
      tokenName: oauth_token
      authenticationScheme: query
      clientAuthenticationScheme: form
    resource:
      userInfoUri: https://graph.facebook.com/me
```

The same app looks almost identical in Spring Boot 1.3 but there is no need for Spring Cloud Security. Also the annotation moved to a different package, and the configuration prefix changed. So removing the Cloud dependency, changing the import for the annotation and switching the prefix in `application.yml` from `spring` to `security` is all that is needed to migrate this app.

### [](#single-sign-on-and-custom-access-rules)Single Sign On and Custom Access Rules

In Spring Cloud Security 1.0 (from the Angel release train) users can customize the request matching and access rules using a combination of a special callback `OAuth2ClientConfigurer` and some configuration properties in `spring.oauth2.sso.*`. So for example, the vanilla client app in the [Angular JS Spring Security Tutorial](https://spring.io/guides/tutorials/spring-security-and-angular-js/#_sso_with_oauth2_angular_js_and_spring_security_part_v) from spring.io has this general pattern of implementation in Spring Boot 1.2:

```java
Copy@SpringBootApplication
@EnableOAuth2Sso
public class UiApplication {

  @Configuration
  protected static class SecurityConfiguration extends OAuth2SsoConfigurerAdapter {

    @Override
    public void match(RequestMatchers matchers) {
      matchers.anyRequest();
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
      http
        .authorizeRequests()
          .antMatchers("/index.html", "/home.html", "/").permitAll()
          .anyRequest().authenticated()
        .and().csrf()
          .csrfTokenRepository(csrfTokenRepository())
        .and()
          .addFilterAfter(csrfHeaderFilter(), CsrfFilter.class);
    }

  }

  ...
  
}
```

and a similar `application.yml` to the vanilla sample:

```yaml
Copyspring:
   oauth2:
    sso:
      home:
        secure: false
        path: /,/**/*.html
     client:
       accessTokenUri: http://localhost:9999/uaa/oauth/token
       userAuthorizationUri: http://localhost:9999/uaa/oauth/authorize
     resource:
       userInfoUri: http://localhost:9999/uaa/user
```

With Spring Boot 1.3 there is no need for Spring Cloud Security, and the customizations don't need the obsolete `OAuth2SsoConfigurerAdapter`. Instead they just need all of the same code, plus a request matcher, in a regular `WebSecurityConfigurerAdapter` carrying the `@EnableOAuth2Sso` annotation:

```java
Copy@SpringBootApplication
@EnableZuulProxy
@EnableOAuth2Sso
public class UiApplication extends WebSecurityConfigurerAdapter {

  @Override
  public void configure(HttpSecurity http) throws Exception {
    http.antMatcher("/**")
      .authorizeRequests()
        .antMatchers("/index.html", "/home.html", "/").permitAll()
        .anyRequest().authenticated()
      .and().csrf()
        .csrfTokenRepository(csrfTokenRepository())
      .and()
        .addFilterAfter(csrfHeaderFilter(), CsrfFilter.class);
  }
  
  ...

}
```

The configuration properties in the updated version are mostly the same: there is a prefix change from `spring.oauth2` to `security.oauth2` and there is no need for the `*.oauth2.sso.*` properties because they are explicitly configured by the user in the `WebSecurityConfigurerAdapter`.

### [](#single-sign-on-and-zuul-proxy)Single Sign On and Zuul Proxy

The actual client app in the [Angular JS Spring Security Tutorial](https://spring.io/guides/tutorials/spring-security-and-angular-js/#_sso_with_oauth2_angular_js_and_spring_security_part_v) from spring.io is similar to the customized one above, but it is also a Zuul proxy, responsible for forwarding requests from the browser client to back-end services. In Spring Boot 1.3, this app still needs Spring Cloud Security for the token relay (it wants to send the access tokens used for authentication to the back end resources), but it doesn't need it for the basic SSO features, so the implementation is identical to the previous sample with the addition of an `@EnableZuulProxy` annotation.

> NOTE: a bug in Spring Boot 1.3.0 leads to a workaround in the current implementation (at time of writing) of the client app in the [Angular JS Spring Security Tutorial](https://spring.io/guides/tutorials/spring-security-and-angular-js/#_sso_with_oauth2_angular_js_and_spring_security_part_v). The workaround is only needed because it is using Spring Cloud Security, and will also be redundant in Spring Boot 1.3.1:
> 
> ```
> Copy@Component
> @Order(Ordered.HIGHEST_PRECEDENCE)
> class WorkaroundRestTemplateCustomizer implements UserInfoRestTemplateCustomizer {
> 
>   public void customize(OAuth2RestTemplate template) {
>     template.setInterceptors(new ArrayList<>(template.getInterceptors()));
>   }
> 
> }
> ```

## [](#single-sign-one-in-cloud-foundry)Single Sign One in Cloud Foundry

With Spring Boot 1.2 and Spring Cloud Security in the Angel release train, an app is able to configire itself for OAuth2 SSO if you bind to a service with the right credentials. E.g. you can create a User Provided Service like this:

```
Copycf create-user-provided-service sso -p '{"userInfoUri":"https://uaa.run.pivotal.io/userinfo", "tokenUri":"login.run.pivotal.io/oauth/token", "authorizationUri":"login.run.pivotal.io/oauth/authorize", "clientId":"[client]", "clientSecret":"[secret]"}'
```

Then an app with `@EnableOAuth2Sso` which is bound to the service will bind the configuration needed for the SSO without the user having to change any configuration.

The same feature is available in Spring Boot 1.3 and Spring Cloud Brixton, but instead of Spring Cloud Security you need to use the new `spring-cloud-cloudfoundry-web` library to get the SSO configuration binding behaviour. You can also use the built-in SSO service in Cloud Foundry instead of a User Provided Service (available in Pivotal Web Services for selected accounts or in Pivotal Cloud Foundry).

## [](#conclusion)Conclusion

If you are using Spring Boot and maybe Spring Cloud with OAuth2, hopefully you will now be able to upgrade smoothly from Spring Boot 1.2 to 1.3, or at worst you will have some tools to help you think about what is going on when you hit the bumps. Spring Boot 1.3 has nearly all the features of Spring Cloud Security 1.0, so the main thing you need to think about is the dependencies. In addition there are a few new features in Spring Boot, like autoconfiguration of an Authorization Server, for instance. As usual with Spring Boot, you can (and should) take the default bevaviour until you need to change it, at which point there should be no barriers to doing so.

The sample apps in the Spring Guides have all been updated to Spring Boot 1.3 now, even if that means they depend on a milestone of Spring Cloud (this only applies to the Zuul proxy sample). Many do not need Spring Cloud any more. If you need a GA version of Spring Cloud you need to stay with Spring Boot 1.2 right now. The samples for that combination can be lifted from git history.