---
title: Spring Security - Lambda DSL
source: https://spring.io/blog/2019/11/21/spring-security-lambda-dsl
scraped: 2026-02-23T12:50:51.004Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Eleftheria Stein-Kousathana |  November 21, 2019 | 7 Comments
---

# Spring Security - Lambda DSL

_Engineering | Eleftheria Stein-Kousathana |  November 21, 2019 | 7 Comments_

## [](#overview-of-lambda-dsl)Overview of Lambda DSL

The [release](https://spring.io/blog/2019/10/01/spring-security-5-2-goes-ga) of Spring Security 5.2 includes enhancements to the DSL, which allow HTTP security to be configured using lambdas.

It is important to note that the prior configuration style is still valid and supported. The addition of lambdas is intended to provide more flexibility, but their usage is optional.

You may have seen this style of configuration in the Spring Security [documentation](https://docs.spring.io/spring-security/site/docs/current/reference/htmlsingle/) or [samples](https://github.com/spring-projects/spring-security/tree/master/samples). Let us take a look at how a lambda configuration of HTTP security compares to the previous configuration style.

**Configuration using lambdas**

```
Copy@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests(authorizeRequests ->
                authorizeRequests
                    .antMatchers("/blog/**").permitAll()
                    .anyRequest().authenticated()
            )
            .formLogin(formLogin ->
                formLogin
                    .loginPage("/login")
                    .permitAll()
            )
            .rememberMe(withDefaults());
    }
}
```

**Equivalent configuration without using lambdas**

```
Copy@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .antMatchers("/blog/**").permitAll()
                .anyRequest().authenticated()
                .and()
            .formLogin()
                .loginPage("/login")
                .permitAll()
                .and()
            .rememberMe();
    }
}
```

## [](#lambda-dsl-configuration-tips)Lambda DSL configuration tips

When comparing the two samples above, you will notice some key differences:

-   In the Lambda DSL there is no need to chain configuration options using the `.and()` method. The `HttpSecurity` instance is automatically returned for further configuration after the call to the lambda method.
-   `withDefaults()` enables a security feature using the defaults provided by Spring Security. This is a shortcut for the lambda expression `it -> {}`.

## [](#webflux-security)WebFlux Security

You may also configure WebFlux security using lambdas in a similar manner. Below is an example configuration using lambdas.

```
Copy@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean
    SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        http
            .authorizeExchange(exchanges ->
                exchanges
                    .pathMatchers("/blog/**").permitAll()
                    .anyExchange().authenticated()
            )
            .httpBasic(withDefaults())
            .formLogin(formLogin ->
                formLogin
                    .loginPage("/login")
            );
        return http.build();
    }
}
```

## [](#goals-of-the-lambda-dsl)Goals of the Lambda DSL

The Lambda DSL was created to accomplish to following goals:

-   Automatic indentation makes the configuration more readable.
-   The is no need to chain configuration options using `.and()`.
-   The Spring Security DSL has a similar configuration style to other Spring DSLs such as Spring Integration and Spring Cloud Gateway.