---
title: Spring Session for Apache Geode/Pivotal GemFire 2.0.6.RELEASE and 2.1.0.RELEASE Available!
source: https://spring.io/blog/2018/10/26/spring-session-for-apache-geode-pivotal-gemfire-2-0-6-release-and-2-1-0-release-available
scraped: 2026-02-23T15:09:11.938Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | John Blum |  October 26, 2018 | 0 Comments
---

# Spring Session for Apache Geode/Pivotal GemFire 2.0.6.RELEASE and 2.1.0.RELEASE Available!

_Engineering | John Blum |  October 26, 2018 | 0 Comments_

Good things come in pairs, so I am happy to announce the availability of ***Spring Session for Apache Geode & Pivotal GemFire*** (SSDG) `2.0.6.RELEASE` and `2.1.0.RELEASE`.

SSDG `2.0.6.RELEASE`, based on Spring Framework `5.0.10.RELEASE`, Spring Data `Kay-SR11` and Spring Session core `2.0.7.RELEASE` mainly contains dependency updates.

SSDG `2.1.0.RELEASE`, on the other hand, has been upgraded to Spring Framework `5.1.1.RELEASE`, Spring Data `Lovelace-SR1` and Spring Session core `2.1.0.RELEASE`, and additionally includes support for custom Session expiration policies and rules.

## [](#custom-session-expiration-configuration)[](#custom-session-expiration-configuration)Custom Session Expiration Configuration

Spring Session for Apache Geode & Pivotal GemFire now provides a new *Strategy* interface, [`SessionExpirationPolicy`](https://docs.spring.io/autorepo/docs/spring-session-data-geode-build/2.1.0.RELEASE/api/org/springframework/session/data/gemfire/expiration/SessionExpirationPolicy.html) that allows users to customize the rules around exactly how and when the Session should expire.

The interface is roughly defined as:

SessionExpirationPolicy interface

```
Copyimport java.time.Duration;

@FunctionalInterface
interface SessionExpirationPolicy {

  Optional<Duration> determineExpirationTimeout(Session session);

  default ExpirationAction getExpirationAction() {
    return ExpirationAction.INVALIDATE;
  }
}
```

A user only need implement the `determineExpirationTimeout` method, which returns an `Optional` `java.time.Duration` indicating the length of time until the Session will expire.

`Duration` is optional so that, in certain cases, if the expiration timeout cannot be determined for a particular Session by your custom policy, then returning `Optional.empty()` will indicate to either Apache Geode or Pivotal GemFire that the default, entry idle timeout expiration policy configured for the Region managing your application Session state should apply. The default idle timeout is 30 minutes, which you can change by setting the [maxInactiveIntervalInSeconds](https://docs.spring.io/autorepo/docs/spring-session-data-geode-build/2.1.0.RELEASE/api/org/springframework/session/data/gemfire/config/annotation/web/http/EnableGemFireHttpSession.html#maxInactiveIntervalInSeconds--) attribute of the [@EnableGemFireHttpSession](https://docs.spring.io/autorepo/docs/spring-session-data-geode-build/2.1.0.RELEASE/api/org/springframework/session/data/gemfire/config/annotation/web/http/EnableGemFireHttpSession.html) annotation.

Tip

Alternatively, you can set the `spring.session.data.gemfire.session.expiration.max-inactive-interval-seconds` property in Spring Boot’s `application.properties`, or declare bean of type [SpringSessionGemFireConfigurer](https://docs.spring.io/autorepo/docs/spring-session-data-geode-build/2.1.0.RELEASE/api/org/springframework/session/data/gemfire/config/annotation/web/http/support/SpringSessionGemFireConfigurer.html) in the Spring container and override the [getMaxInactiveIntervalInSeconds()](https://docs.spring.io/autorepo/docs/spring-session-data-geode-build/2.1.0.RELEASE/api/org/springframework/session/data/gemfire/config/annotation/web/http/support/SpringSessionGemFireConfigurer.html#getMaxInactiveIntervalInSeconds--) method.

Then, you simply declare your custom `SessionExpirationPolicy` instance as a bean in the Spring container and then make sure Spring Session for Apache Geode or Pivotal GemFire knows about it by setting the `sessionExpirationPolicyBeanName` attribute of the `@EnableGemFireHttpSession` annotation, like so:

```
Copy@SpringBootApplication
@EnableGemFireHttpSession(
  sessionExpirationPolicyBeanName = "customExpirationPolicy"
)
class MySpringSessionApplication {

  @Bean
  SessionExpirationPolicy customExpirationPolicy(..) {
    return new CustomExpirationPolicy(..);
  }

  ...
}
```

Because the `SessionExpirationPolicy` instance is a bean just like any other managed bean in the Spring container, you can configure it, however you like, injecting references to other beans and so on.

Tip

Again, the bean name of the custom `SessionExpirationPolicy` can be set in Spring Boot `application.properties` using `spring.session.data.gemfire.session.expiration.bean-name` or by declaring an instance of `SprinSessionGemFireConfigurer` in the Spring container and overriding the `getSessionExpirationPolicyBeanName()` method.

More details can be found in the [docs](https://docs.spring.io/autorepo/docs/spring-session-data-geode-build/2.1.0.RELEASE/reference/html5/#httpsession-gemfire-expiration).

## [](#fixed-duration-expiration)[](#fixed-duration-expiration)Fixed Duration Expiration

In addition to allowing custom Session expiration policies and rules, out-of-the-box, Spring Session for Apache Geode & Pivotal GemFire provides an implementation of this interface to support fixed duration expiration timeouts.

This is useful in situations where the Session should timeout, no matter what, after a fixed duration of time, perhaps 1 hour, only if the Session has not already idled out.

This request actually came up in core Spring Session [Issue #922](https://github.com/spring-projects/spring-session/issues/922) - "*Absolute session timeouts*" awhile back.

While this capability is not possible in all store providers for Spring Session, it is possible with Apache Geode or Pivotal GemFire.

Simple enable the following:

```
Copyimport org.springframework.session.data.gemfire.expiration.support.FixedTimeoutSessionExpirationPolicy;

@SpringBootApplication
@EnableGemFireHttpSession(
  sessionExpirationPolicyBeanName = "fixedTimeoutExpirationPolicy"
)
class MySpringSessionApplication {

  @Bean
  SessionExpirationPolicy fixedDurationExpirationPolicy() {
    return new FixedTimeoutSessionExpirationPolicyt(Duration.ofMinutes(60L));
  }

  ...
}
```

Of course, Spring Session for Apache Geode & Pivotal GemFire is careful to respect the idle timeout of the Session was well. As such, the Session will expire whenever the idle timeout or the fixed timeout has elapsed, which ever happens first.

Again, more details can be found in the [docs](https://docs.spring.io/autorepo/docs/spring-session-data-geode-build/2.1.0.RELEASE/reference/html5/#httpsession-gemfire-expiration-fixed-timeout-configuration).

## [](#conclusion)[](#conclusion)Conclusion

As always, feedback is very much appreciated. Until next time, happy coding!

[Project Page](https://github.com/spring-projects/spring-session-data-geode) | [Issues](https://github.com/spring-projects/spring-session-data-geode/issues) | [PR](https://github.com/spring-projects/spring-session-data-geode/pulls) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-session)