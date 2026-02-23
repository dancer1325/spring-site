---
title: Security changes in Spring Boot 2.0 M4
source: https://spring.io/blog/2017/09/15/security-changes-in-spring-boot-2-0-m4
scraped: 2026-02-23T16:21:54.963Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Madhura Bhave |  September 15, 2017 | 12 Comments
---

# Security changes in Spring Boot 2.0 M4

_Engineering | Madhura Bhave |  September 15, 2017 | 12 Comments_

Milestone 4 of Spring Boot 2.0 brings important changes to the security auto-configuration provided by Spring Boot.

## [](#problem-statement)Problem Statement

Until Spring Boot 1.x, the default auto-configuration secured all of the application endpoints using basic authentication. If actuator was on the classpath, there was a separate security configuration that applied to the actuator endpoints. The way these two auto-configurations would turn on and off was completely independent. Because of this, users wanting to provide custom security found themselves fighting ordering issues with `WebSecurityConfigurerAdapter`s.

Additionally, for actuator endpoints, the effects of the `management.security.enabled` flag based on whether Spring Security was on the classpath or not was quite confusing.

There were a number of properties under `security.*` and `management.security.*` that were applicable only to the auto-configuration provided by Spring Boot. For example, if `security.basic.enabled` was set to `false`, setting `security.sessions` would have absolutely no effect and this turned out to be quite misleading.

## [](#improvements-in-20)Improvements in 2.0

In Spring Boot 2.0, our main goal was to greatly simplify the default security configuration and and make adding custom security easy.

### [](#simplified-default-configuration)Simplified default configuration

Providing sensible defaults for security is challenging. We've decided to opt for the most secure default, which is, secure everything, even public and static resources. By default, if Spring Security is on the classpath, Spring Boot will add `@EnableWebSecurity`, and rely on Spring Security's content-negotiation to decide which authentication mechanism to use. A default user with a generated password will be provided.

If actuator is on the classpath, the same default security configuration will also apply to actuator endpoints. In order to prevent actuators from exposing sensitive data accidentally, most web endpoints will be disabled by default (`status` and `info` are enabled by default however). Users need to take an explicit step to enable those web endpoints. This behavior is consistent, regardless of whether Spring Security is present on the classpath or not.

### [](#consistent-customization)Consistent customization

Once users decide that they want to add custom security, the default security configuration provided by Spring Boot will back off completely. At this point, users need to explicitly define all the bits they want to secure. This means security configuration is now in one place and avoids any kind of ordering issues with existing `WebSecurityConfigurerAdapter`s. We provide dedicated helpers to make your configuration more readable and explicit. For management endpoints and static resources, Spring Boot provides convenience factories that will supply the right `RequestMatcher`. For management endpoints, the `RequestMatcher` will be created based on the `management.context-path`. Using `RequestMatcher`s gives users the flexibility to secure the application using existing Spring Security expressions such as `permitAll`, `hasRole` etc.

Here is an example of a custom security:

```java
Copyhttp
    .authorizeRequests()
        // 1
        .requestMatchers(EndpointRequest.to("status", "info"))
            .permitAll()
        // 2
        .requestMatchers(EndpointRequest.toAnyEndpoint())
            .hasRole("ACTUATOR")
        // 3 
        .requestMatchers(StaticResourceRequest.toCommonLocations())
            .permitAll()
        // 4
        .antMatchers("/**")
            .hasRole("USER")
    .and()
  ... // additional configuration

```

1.  `/status` and `/info` endpoints do not require authentication.
2.  All other actuator endpoints are protected by the `ACTUATOR` role.
3.  Common static resource locations are open to all.
4.  All other application endpoints are protected by the `USER` role.

We have reduced `SecurityProperties` to a minimum so that there is no confusion about which properties are used only by the auto-configuration and which ones get used even if the default security is turned off. As mentioned before, Spring Boot provides a default user with a generated password. If you want to configure your own user, you can define a bean of type `UserDetailsService` as follows:

```java
Copy@Bean
public UserDetailsService userDetailsService() throws Exception {
    InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
    manager.createUser(User.withUsername("user").password("password")
        .roles("USER").build());
    return manager;
}
```

You can also provide your own `AuthenticationManager` bean or `AuthenticationProvider` bean, which will then be used.

### [](#additional-improvements)Additional improvements

#### [](#status-endpoint)Status endpoint

Previously, the health endpoint would decide whether to return just the status or expose full health details based on the presence of a role. Users who always wanted to expose full health details, would need to set the `management.security.flag` to `false` which was less than ideal as it would expose other actuators. As part of 2.0, we've added a separate status endpoint which returns just the status. The health endpoint always returns the full health details. Both endpoints are secure by default but it makes adding custom security rules for the two cases much easier.