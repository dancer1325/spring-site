---
title: Core Spring Resilience Features: @ConcurrencyLimit, @Retryable, and RetryTemplate
source: https://spring.io/blog/2025/09/09/core-spring-resilience-features
scraped: 2026-02-23T07:29:56.418Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Sam Brannen |  September 09, 2025 | 13 Comments
---

# Core Spring Resilience Features: @ConcurrencyLimit, @Retryable, and RetryTemplate

_Engineering | Sam Brannen |  September 09, 2025 | 13 Comments_

This is the first blog post in the [Road to GA](https://spring.io/blog/2025/09/02/road_to_ga_introduction) series, highlighting major features within the Spring portfolio for the [next major versions to be released in November](https://spring.io/blog/2024/10/01/from-spring-framework-6-2-to-7-0) of this year.

Today we are proud to announce the new *resilience* features coming in Spring Framework 7.0: **concurrency throttling** and **retry support**.

## [](#concurrency-throttling)Concurrency Throttling

For certain tasks and resources it may be desirable to limit the level of concurrency. Concurrency throttling effectively protects the target resource from being accessed from too many threads at the same time, similar to the effect of a pool size limit for a thread pool or a connection pool that blocks access if its limit is reached. Such limiting is particularly useful with Virtual Threads where there is generally no thread pool limit in place.

For asynchronous tasks, this can be constrained via the `concurrencyLimit` property on Spring Framework's `SimpleAsyncTaskExecutor`. For synchronous invocations, this can be constrained via the `concurrencyLimit` property on Spring Framework's `ConcurrencyThrottleInterceptor` which has existed since Spring Framework 1.0 for programmatic use with the AOP framework.

With Spring Framework 7.0, configuring a concurrency limit for a given method invocation has become much easier. Simply annotate a method in a Spring-managed component with `@ConcurrencyLimit` and annotate a `@Configuration` class with `@EnableResilientMethods` to enable automatic throttling. Alternatively, `@ConcurrencyLimit` can be declared at the type level to have it applied to all proxy-invoked methods in a given class hierarchy, and `@ConcurrencyLimit` can be explicitly enabled by defining a `ConcurrencyLimitBeanPostProcessor` bean in the context.

The following example sets the concurrency limit to 10 for the `sendNotification()` method.

```java
Copy@ConcurrencyLimit(10)
public void sendNotification() {
    this.jmsClient.destination("notifications").send(...);
}
```

You may optionally set the limit to 1, effectively locking access to the target bean instance.

```java
Copy@ConcurrencyLimit(1) // 1 is the default, but specifying it makes it clearer
public void sendNotification() {
    this.jmsClient.destination("notifications").send(...);
}
```

## [](#retry-support)Retry Support

As the [saying](https://en.wikipedia.org/wiki/William_Edward_Hickson) goes: *If at first you don't succeed, try, try, try again.*

Luckily, that sometimes applies to errors in software applications as well: certain categories of errors can often be successfully retried.

Historically, the Spring community has relied on the [Spring Retry](https://github.com/spring-projects/spring-retry) project for various forms of retry support. However, this year we decided to incorporate core retry support at the lowest level of the Spring portfolio, in Spring Framework itself. This support was naturally inspired by the Spring Retry project, but we completely redesigned it as a minimal set of core retry features in the `spring-core` and `spring-context` modules.

### [](#declaritive-retry-with-retryable)Declaritive Retry with @Retryable

For declarative retry support, you can annotate a method in a Spring-managed component with `@Retryable` and annotate a `@Configuration` class with `@EnableResilientMethods` to enable automatic retry support. Alternatively, `@Retryable` can be declared at the type level to have it applied to all proxy-invoked methods in a given class hierarchy, and `@Retryable` can be explicitly enabled by defining a `RetryAnnotationBeanPostProcessor` bean in the context.

By default, the method invocation will be retried for any exception thrown: with at most 3 retry attempts after an initial failure, and a delay of 1 second between attempts.

```java
Copy@Retryable
public void sendNotification() {
    this.jmsClient.destination("notifications").send(...);
}
```

You can optionally constrain the types of exceptions that trigger a retry via the `includes`, `excludes`, and implicit `value` attributes in `@Retryable`, as demonstrated below.

```java
Copy@Retryable(MessageDeliveryException.class)
public void sendNotification() {
    this.jmsClient.destination("notifications").send(...);
}
```

Note that `@Retryable(MessageDeliveryException.class)` is a shortcut for `@Retryable(includes = {MessageDeliveryException.class})`.

The following example demonstrates how to configure 5 retry attempts and an exponential back-off strategy with a bit of jitter.

```java
Copy@Retryable(
  includes = MessageDeliveryException.class,
  maxAttempts = 5,
  delay = 100,
  jitter = 10,
  multiplier = 2,
  maxDelay = 1000)
public void sendNotification() {
    this.jmsClient.destination("notifications").send(...);
}
```

> Some features of the core retry support in Spring Framework may differ from features that you are familar with in Spring Retry. For example, the value for the `maxAttempts` attribute in Spring Retry's `@Retryable` annotation applies to the initial invocation of the retryable operation as well as the retry attempts; whereas, `maxAttempts` in Spring Framework only applies to the actual *retry* attempts.

Last but not least, `@Retryable` in Spring Framework also works for reactive methods with a reactive return type, automatically decorating the pipeline with Reactor's retry capabilities.

```java
Copy@Retryable(maxAttempts = 5, delay = 100)
public Mono<Void> sendNotification() {
    return Mono.from(...); // This Mono will get decorated with a retry spec.
}
```

### [](#programmatic-retry-with-retrytemplate)Programmatic Retry with RetryTemplate

In contrast to `@Retryable` which provides a declarative approach for specifying retry semantics for individual methods, `RetryTemplate` provides a programmatic API for retrying arbitrary blocks of code. Specifically, a `RetryTemplate` executes and potentially retries a `Retryable` operation based on a configured `RetryPolicy`.

```java
Copy// Implicitly uses RetryPolicy.withDefaults()
var retryTemplate = new RetryTemplate();

retryTemplate.execute(() -> jmsClient.destination("notifications").send(...));
```

As with `@Retryable`, by default a `Retryable` operation will be retried for any exception thrown: with at most 3 retry attempts after an initial failure, and a delay of 1 second between attempts. If you only need to customize the number of retry attempts, you can use the `RetryPolicy.withMaxAttempts()` factory method as demonstrated below.

```java
Copyvar retryTemplate = new RetryTemplate(RetryPolicy.withMaxAttempts(5));

retryTemplate.execute(() -> jmsClient.destination("notifications").send(...));
```

If you need to narrow the types of exceptions to retry, that can be achieved via the `includes()`, `excludes()`, and `predicate()` builder methods.

```java
Copyvar retryPolicy = RetryPolicy.builder()
        .includes(MessageDeliveryException.class)
        // .excludes(...)
        // .predicate(...)
        .build();

var retryTemplate = new RetryTemplate(retryPolicy);

retryTemplate.execute(() -> jmsClient.destination("notifications").send(...));
```

And as with `@Retryable`, you also have the ability to fully configure a `RetryPolicy` – for example, with max retry attempts and an exponential back-off strategy.

```java
Copyvar retryPolicy = RetryPolicy.builder()
        .includes(MessageDeliveryException.class)
        .maxAttempts(5)
        .delay(Duration.ofMillis(100))
        .jitter(Duration.ofMillis(10))
        .multiplier(2)
        .maxDelay(Duration.ofSeconds(1))
        .build();

var retryTemplate = new RetryTemplate(retryPolicy);

retryTemplate.execute(() -> jmsClient.destination("notifications").send(...));
```

## [](#impacts-on-the-spring-portfolio)Impacts on the Spring Portfolio

When you upgrade to the upcoming major releases for various Spring portfolio projects, you will notice that several projects have already migrated from Spring Retry support to the new core retry support in Spring Framework. For details, see the related GitHub issues and pull requests for the following projects.

-   [Spring Boot](https://github.com/spring-projects/spring-boot/issues/46309)
-   [Spring Batch](https://github.com/spring-projects/spring-batch/issues/4868)
-   [Spring Integration](https://github.com/spring-projects/spring-integration/issues/10345)
-   [Spring AMQP](https://github.com/spring-projects/spring-amqp/pull/3167)
-   [Spring for Apache Kafka](https://github.com/spring-projects/spring-kafka/pull/4059)
-   [Spring for Apache Pulsar](https://github.com/spring-projects/spring-pulsar/issues/1224)

## [](#next-steps)Next Steps

We encourage you to try out these new features in your projects and provide us feedback!

For further details, please check out the [resilience features](https://docs.spring.io/spring-framework/reference/7.0-SNAPSHOT/core/resilience.html) section of the reference manual as well as the Javadoc in the [org.springframework.core.retry](https://docs.spring.io/spring-framework/docs/7.0.0-SNAPSHOT/javadoc-api/org/springframework/core/retry/package-summary.html) and [org.springframework.resilience.annotation](https://docs.spring.io/spring-framework/docs/7.0.0-SNAPSHOT/javadoc-api/org/springframework/resilience/annotation/package-summary.html) packages.