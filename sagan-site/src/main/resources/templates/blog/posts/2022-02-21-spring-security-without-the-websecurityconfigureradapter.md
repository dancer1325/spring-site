---
title: Spring Security without the WebSecurityConfigurerAdapter
source: https://spring.io/blog/2022/02/21/spring-security-without-the-websecurityconfigureradapter
scraped: 2026-02-23T12:47:40.334Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Eleftheria Stein-Kousathana |  February 21, 2022 | 117 Comments
---

# Spring Security without the WebSecurityConfigurerAdapter

_Engineering | Eleftheria Stein-Kousathana |  February 21, 2022 | 117 Comments_

In Spring Security 5.7.0-M2 we [deprecated](https://github.com/spring-projects/spring-security/issues/10822) the `WebSecurityConfigurerAdapter`, as we encourage users to move towards a component-based security configuration.

To assist with the transition to this new style of configuration, we have compiled a list of common use-cases and the suggested alternatives going forward.

In the examples below we follow best practice by using the Spring Security lambda DSL and the method `HttpSecurity#authorizeHttpRequests` to define our authorization rules. If you are new to the lambda DSL you can read about it in [this blog post](https://spring.io/blog/2019/11/21/spring-security-lambda-dsl). If you would like to learn more about why we choose to use `HttpSecurity#authorizeHttpRequests` you can check out the [reference documentation](https://docs.spring.io/spring-security/reference/servlet/authorization/authorize-http-requests.html).

### [](#configuring-httpsecurity)Configuring HttpSecurity

In Spring Security 5.4 we [introduced](https://github.com/spring-projects/spring-security/issues/8804) the ability to configure `HttpSecurity` by creating a `SecurityFilterChain` bean.

Below is an example configuration using the `WebSecurityConfigurerAdapter` that secures all endpoints with HTTP Basic:

```
Copy@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests((authz) -> authz
                .anyRequest().authenticated()
            )
            .httpBasic(withDefaults());
    }

}
```

Going forward, the recommended way of doing this is registering a `SecurityFilterChain` bean:

```
Copy@Configuration
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests((authz) -> authz
                .anyRequest().authenticated()
            )
            .httpBasic(withDefaults());
        return http.build();
    }

}
```

### [](#configuring-websecurity)Configuring WebSecurity

In Spring Security 5.4 we also [introduced](https://github.com/spring-projects/spring-security/issues/8978) the `WebSecurityCustomizer`.

The `WebSecurityCustomizer` is a callback interface that can be used to customize `WebSecurity`.

Below is an example configuration using the `WebSecurityConfigurerAdapter` that ignores requests that match `/ignore1` or `/ignore2`:

```
Copy@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Override
    public void configure(WebSecurity web) {
        web.ignoring().antMatchers("/ignore1", "/ignore2");
    }

}
```

Going forward, the recommended way of doing this is registering a `WebSecurityCustomizer` bean:

```
Copy@Configuration
public class SecurityConfiguration {

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().antMatchers("/ignore1", "/ignore2");
    }

}
```

**WARNING**: If you are configuring `WebSecurity` to ignore requests, consider using `permitAll` via [HttpSecurity#authorizeHttpRequests](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/config/annotation/web/builders/HttpSecurity.html#authorizeRequests%25%29) instead. See the `configure` [Javadoc](https://docs.spring.io/spring-security/site/docs/5.7.0-M2/api/org/springframework/security/config/annotation/web/configuration/WebSecurityConfigurerAdapter.html#configure%25org.springframework.security.config.annotation.web.builders.WebSecurity%29) for additional details.

### [](#ldap-authentication)LDAP Authentication

In Spring Security 5.7 we [introduced](https://github.com/spring-projects/spring-security/pull/10138) the `EmbeddedLdapServerContextSourceFactoryBean`, `LdapBindAuthenticationManagerFactory` and `LdapPasswordComparisonAuthenticationManagerFactory` which can be used to create an embedded LDAP Server and an `AuthenticationManager` that performs LDAP authentication.

Below is an example configuration using `WebSecurityConfigurerAdapter` the that creates an embedded LDAP server and an `AuthenticationManager` that performs LDAP authentication using bind authentication:

```java
Copy@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
            .ldapAuthentication()
            .userDetailsContextMapper(new PersonContextMapper())
            .userDnPatterns("uid={0},ou=people")
            .contextSource()
            .port(0);
    }

}
```

Going forward, the recommended way of doing this is using the new LDAP classes:

```java
Copy@Configuration
public class SecurityConfiguration {
    @Bean
    public EmbeddedLdapServerContextSourceFactoryBean contextSourceFactoryBean() {
        EmbeddedLdapServerContextSourceFactoryBean contextSourceFactoryBean =
            EmbeddedLdapServerContextSourceFactoryBean.fromEmbeddedLdapServer();
        contextSourceFactoryBean.setPort(0);
        return contextSourceFactoryBean;
    }

    @Bean
    AuthenticationManager ldapAuthenticationManager(
            BaseLdapPathContextSource contextSource) {
        LdapBindAuthenticationManagerFactory factory = 
            new LdapBindAuthenticationManagerFactory(contextSource);
        factory.setUserDnPatterns("uid={0},ou=people");
        factory.setUserDetailsContextMapper(new PersonContextMapper());
        return factory.createAuthenticationManager();
    }
}
```

### [](#jdbc-authentication)JDBC Authentication

Below is an example configuration using the `WebSecurityConfigurerAdapter` with an embedded `DataSource` that is initialized with the default schema and has a single user:

```
Copy@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    @Bean
    public DataSource dataSource() {
        return new EmbeddedDatabaseBuilder()
            .setType(EmbeddedDatabaseType.H2)
            .build();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        UserDetails user = User.withDefaultPasswordEncoder()
            .username("user")
            .password("password")
            .roles("USER")
            .build();
        auth.jdbcAuthentication()
            .withDefaultSchema()
            .dataSource(dataSource())
            .withUser(user);
    }
}
```

The recommended way of doing this is registering a `JdbcUserDetailsManager` bean:

```
Copy@Configuration
public class SecurityConfiguration {
    @Bean
    public DataSource dataSource() {
        return new EmbeddedDatabaseBuilder()
            .setType(EmbeddedDatabaseType.H2)
            .addScript(JdbcDaoImpl.DEFAULT_USER_SCHEMA_DDL_LOCATION)
            .build();
    }

    @Bean
    public UserDetailsManager users(DataSource dataSource) {
        UserDetails user = User.withDefaultPasswordEncoder()
            .username("user")
            .password("password")
            .roles("USER")
            .build();
        JdbcUserDetailsManager users = new JdbcUserDetailsManager(dataSource);
        users.createUser(user);
        return users;
    }
}
```

**Note**: In these examples, we use the method `User.withDefaultPasswordEncoder()` for readability. It is not intended for production and instead we recommend hashing your passwords externally. One way to do that is to use the Spring Boot CLI as described in the [reference documentation](https://docs.spring.io/spring-security/reference/features/authentication/password-storage.html#authentication-password-storage-boot-cli).

### [](#in-memory-authentication)In-Memory Authentication

Below is an example configuration using the `WebSecurityConfigurerAdapter` that configures an in-memory user store with a single user:

```
Copy@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        UserDetails user = User.withDefaultPasswordEncoder()
            .username("user")
            .password("password")
            .roles("USER")
            .build();
        auth.inMemoryAuthentication()
            .withUser(user);
    }
}
```

The recommended way of doing this is registering an `InMemoryUserDetailsManager` bean:

```
Copy@Configuration
public class SecurityConfiguration {
    @Bean
    public InMemoryUserDetailsManager userDetailsService() {
        UserDetails user = User.withDefaultPasswordEncoder()
            .username("user")
            .password("password")
            .roles("USER")
            .build();
        return new InMemoryUserDetailsManager(user);
    }
}
```

**Note**: In these examples, we use the method `User.withDefaultPasswordEncoder()` for readability. It is not intended for production and instead we recommend hashing your passwords externally. One way to do that is to use the Spring Boot CLI as described in the [reference documentation](https://docs.spring.io/spring-security/reference/features/authentication/password-storage.html#authentication-password-storage-boot-cli).

### [](#global-authenticationmanager)Global AuthenticationManager

To create an `AuthenticationManager` that is available to the entire application you can simply register the `AuthenticationManager` as a `@Bean`.

This type of configuration is shown above in the [LDAP Authentication example](#ldap-authentication).

### [](#local-authenticationmanager)Local AuthenticationManager

In Spring Security 5.6 we [introduced](https://github.com/spring-projects/spring-security/issues/10040) the method [HttpSecurity#authenticationManager](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/config/annotation/web/builders/HttpSecurity.html#authenticationManager%25org.springframework.security.authentication.AuthenticationManager%29) that overrides the default `AuthenticationManager` for a specific `SecurityFilterChain`. Below is an example configuration that sets a custom `AuthenticationManager` as the default:

```
Copy@Configuration
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests((authz) -> authz
                .anyRequest().authenticated()
            )
            .httpBasic(withDefaults())
            .authenticationManager(new CustomAuthenticationManager());
        return http.build();
    }

}
```

### [](#accessing-the-local-authenticationmanager)Accessing the local AuthenticationManager

The local `AuthenticationManager` can be accessed in a [custom DSL](https://docs.spring.io/spring-security/reference/5.7.0-M2/servlet/configuration/java.html#jc-custom-dsls). This is actually how Spring Security internally implements methods like `HttpSecurity.authorizeRequests()`.

```
Copypublic class MyCustomDsl extends AbstractHttpConfigurer<MyCustomDsl, HttpSecurity> {
    @Override
    public void configure(HttpSecurity http) throws Exception {
        AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);
        http.addFilter(new CustomFilter(authenticationManager));
    }

    public static MyCustomDsl customDsl() {
        return new MyCustomDsl();
    }
}
```

The custom DSL can then be applied when building the `SecurityFilterChain`:

```
Copy@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    // ...
    http.apply(customDsl());
    return http.build();
}
```

### [](#getting-involved)Getting Involved

We are excited to share these updates with you and we look forward to further enhancing Spring Security with your feedback! If you are interested in contributing, you can find us on [GitHub](https://github.com/spring-projects/spring-security).