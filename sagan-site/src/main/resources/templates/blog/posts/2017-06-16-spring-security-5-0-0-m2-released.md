---
title: Spring Security 5.0.0 M2 Released
source: https://spring.io/blog/2017/06/16/spring-security-5-0-0-m2-released
scraped: 2026-02-23T16:28:58.093Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  June 16, 2017 | 3 Comments
---

# Spring Security 5.0.0 M2 Released

_Releases | Rob Winch |  June 16, 2017 | 3 Comments_

On behalf of the community, I’m pleased to announce the release of Spring Security 5.0.0 M2. This release includes bug fixes, new features, and is based off of Spring Framework 5.0.0 RC2.

A complete example of using Spring Security to secure a Spring WebFlux application can be found in the Spring Security samples at [hellowebflux](https://github.com/spring-projects/spring-security/blob/5.0.0.M2/samples/javaconfig/hellowebflux) and [hellowebfluxfn](https://github.com/spring-projects/spring-security/blob/5.0.0.M2/samples/javaconfig/hellowebfluxfn).

The highlights of the release include:

-   [Simplified Reactive Security Configuration](#simplified-reactive-security-configuration)
    
-   [WebTestClient Support](#webtestclient-support)
    

# [](#simplified-reactive-security-configuration)[](#simplified-reactive-security-configuration)Simplified Reactive Security Configuration

It is now very easy to setup a minimal Reactive Security Configuration. Add `@EnableWebFluxSecurity` and provide a `UserDetailsRepository`

```
Copy@EnableWebFluxSecurity
public class SecurityConfig {
    @Bean
    public UserDetailsRepository userDetailsRepository() {
        return new MapUserDetailsRepository(User.withUsername("user")
            .password("password")
            .roles("USER")
            .build()
        );
    }
}
```

We have added `UserDetailsManagerResourceFactoryBean` which provides a simple way to create a `UserDetailsRepository` using a properties file. For example:

```
Copy@Bean
public UserDetailsRepositoryResourceFactoryBean userDetailsService() {
    return UserDetailsRepositoryResourceFactoryBean
                  .fromResourceLocation("classpath:users.properties");
}
```

and `users.properties`

```
Copyuser=password,ROLE_USER
admin=password,ROLE_USER,ROLE_ADMIN
```

Note

For non reactive applications, there is a new `UserDetailsManagerResourceFactoryBean` to create an `InMemoryUserDetailsManager` from a properties file

# [](#webtestclient-support)[](#webtestclient-support)WebTestClient Support

This release also adds support for `WebTestClient`. For example, you can run as a test user using the following:

```
CopyExchangeMutatorWebFilter exchangeMutator = new ExchangeMutatorWebFilter();
WebTestClient mockRest = WebTestClient.bindToApplicationContext(this.context)
    .webFilter(exchangeMutator) // add the exchangeMutator
    .build();

mockRest
        // run only this request with a mocked user
    .filter(exchangeMutator.perClient(withUser()))
    .get()
    .uri("/principal")
    .exchange()
    .expectStatus().isOk();
```

[Project Site](http://projects.spring.io/spring-security/) | [Reference](http://docs.spring.io/spring-security/site/docs/5.0.0.M2/reference/htmlsingle/) | [Guides](http://docs.spring.io/spring-security/site/docs/current/guides/html5/) | [Help](http://stackoverflow.com/questions/tagged/spring-security)