---
title: Spring Session for Apache Geode/Pivotal GemFire 2.0.5.RELEASE and 2.1.0.M1 Released!
source: https://spring.io/blog/2018/08/30/spring-session-for-apache-geode-pivotal-gemfire-2-0-5-release-and-2-1-0-m1-released
scraped: 2026-02-23T15:15:19.190Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | John Blum |  August 30, 2018 | 0 Comments
---

# Spring Session for Apache Geode/Pivotal GemFire 2.0.5.RELEASE and 2.1.0.M1 Released!

_Engineering | John Blum |  August 30, 2018 | 0 Comments_

On behalf of the team as well as the community, I am pleased to announce the release of Spring Session for Apache Geode & Pivotal GemFire (SSDG) `2.0.5.RELEASE` (**Apple**) and `2.1.0.M1` (**Bean**).

SSDG `2.0.5.RELEASE` is based on Spring Session `2.0.5.RELEASE`, Spring Data `Kay-SR9` and Spring Framework `5.0.8.RELEASE` and is available in [Maven Central](https://search.maven.org/search?q=spring-session-data-geode).

SSDG `2.1.0.M1` is based on Spring Session `2.1.0.M2`, Spring Data `Lovelace-RC2` and Spring Framework `5.1.0.RC2` and is available from Spring [libs-milestone](https://repo.spring.io/libs-milestone/org/springframework/session/spring-session-data-geode/).

Both releases bring with it a new way to configure Spring Session when using either [Apache Geode](http://geode.apache.org/) or [Pivotal GemFire](https://pivotal.io/pivotal-gemfire), or even [Pivotal Cloud Cache (PCC)](https://pivotal.io/platform/services-marketplace/data-management/pivotal-cloud-cache), to manage your Spring Boot Web application’s (HTTP) Session state.

Currently, to enable (HTTP) Session state management using Spring Session with either Apache Geode or Pivotal GemFire as your provider, you would include either `org.springframework.session:spring-session-data-geode` or `org.springframework.session:spring-session-data-gemfire` on your Spring Boot application classpath, and then declare `@EnableGemFireHttpSession` annotation on 1 of your application’s `@Configuration` classes, as follows:

```
Copy@SpringBootApplication
@EnableGemFireHttpSession(maxInactiveIntervalSeconds=600)
public class MyWebApplication {

  public static void main(String[] args) {
    SpringApplication.run(MyWebApplication.class, args);
  }
...
}
```

The [@EnableGemFireHttpSession](https://docs.spring.io/autorepo/docs/spring-session-data-geode-build/2.0.5.RELEASE/api/org/springframework/session/data/gemfire/config/annotation/web/http/EnableGemFireHttpSession.html) annotation includes several attributes to alter the configuration of your session management strategy (such as expiration; shown above) as well as the data management policies and indexes used by either Apache Geode or Pivotal GemFire to effectively manage session state.

However, all of these attributes must be hard coded. What if you want to change the configuration during deployment, based on the environment? Perhaps you want to vary the configuration using Spring profiles.

Well, now you can dynamically configure Spring Session when using either Apache Geode or Pivotal GemFire in 1 of 2 different ways.

### [](#configuration-with-properties)[](#geode-session-configuration-properties)Configuration with Properties

Spring Session for Apache Geode/Pivotal GemFire now gives you the ability to configure session management and Apache Geode or Pivotal GemFire using well-known, published properties.

The `@EnableGemFireHttpSession` annotation attributes document all the well-known, published properties itself.

By way of example, to change the session expiration timeout, you can specify the following property in a Spring Boot `application.properties` file, as follows:

```
Copy#application.properties

spring.session.data.gemfire.session.expiration.max-inactive-interval-seconds=600
...
```

More details about configuring SSDG with properties can be found in the [documentation](https://docs.spring.io/autorepo/docs/spring-session-data-geode-build/2.0.5.RELEASE/reference/html5/#httpsession-gemfire-configuration-properties).

### [](#configuration-with-a-configurer)[](#geode-session-configuration-configurer)Configuration with a Configurer

Like Spring Web MVC’s `WebMvcConfigurer` callback interface, Spring Session for Apache Geode/Pivotal GemFire provides the [`SpringSessionGemFireConfigurer`](https://docs.spring.io/autorepo/docs/spring-session-data-geode-build/2.0.5.RELEASE/api/org/springframework/session/data/gemfire/config/annotation/web/http/support/SpringSessionGemFireConfigurer.html) callback interface to adjust various aspects of the Spring Session configuration.

For example, to set the session expiration timeout, simply declare the following:

```
Copy@Configuration
class SpringSessionGemFireConfiguration {

  @Bean
  SpringSessionGemFireConfigurer sessionExpirationConfigurer() {

    return new SpringSessionGemFireConfigurer(
        @Value("${spring.session.timeout:600}") int sessionTimeout) {

      @Override
      public int getMaxInactiveIntervalInSeconds() {
        return sessionTimeout;
      }
    };
  }
  ...
}
```

As shown above, the configuration for the Configurer can even be derived from other properties using Spring’s `@Value` annotation. You can combine different Configurer bean definitions with different Spring profiles and so on and so forth.

More details about using Configurers to configure SSDG can be found in the [documentation](https://docs.spring.io/autorepo/docs/spring-session-data-geode-build/2.0.5.RELEASE/reference/html5/#httpsession-gemfire-configuration-configurer).

## [](#feedback)[](#geode.session.feedback)Feedback

Any feedback and/or contributions are always highly appreciated and welcomed. You can reach us through the usual channels: [Issues](https://github.com/spring-projects/spring-session-data-geode/issues) | [PR](https://github.com/spring-projects/spring-session-data-geode/pulls) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-session).

Thank you!