---
title: Liveness and Readiness Probes with Spring Boot
source: https://spring.io/blog/2020/03/25/liveness-and-readiness-probes-with-spring-boot
scraped: 2026-02-23T14:05:57.686Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Brian Clozel |  March 25, 2020 | 33 Comments
---

# Liveness and Readiness Probes with Spring Boot

_Engineering | Brian Clozel |  March 25, 2020 | 33 Comments_

**Update:** this blog post has been updated for changes released in Spring Boot 2.3.0.RC1

The Spring Boot team is actively working on a Kubernetes theme for the next 2.3.0 release. After [Docker images creation](https://spring.io/blog/2020/01/27/creating-docker-images-with-spring-boot-2-3-0-m1) and [Graceful Shutdown support](https://docs.spring.io/spring-boot/docs/2.3.0.RELEASE/reference/html/spring-boot-features.html#boot-features-graceful-shutdown), it’s now time to introduce Liveness and Readiness probes support.

With our 2.2.0 release, Spring Boot shipped with [the Health Groups support](https://docs.spring.io/spring-boot/docs/2.2.x/reference/html/production-ready-features.html#health-groups), allowing developers to select a subset of health indicators and group them under a single, correlated, health status.

Even with this new feature, we’ve found that we could provide more to the Spring community, with more opinions and guidance when it comes to Kubernetes.

## [](#liveness-and-readiness-in-kubernetes)[](#liveness-and-readiness-in-kubernetes)Liveness and Readiness in Kubernetes

In Kubernetes, the [Liveness and Readiness Kubernetes concepts](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/) represent facets of the application state.

The Liveness state of an application tells whether the internal state is valid. If Liveness is broken, this means that the application itself is in a failed state and cannot recover from it. In this case, the best course of action is to restart the application instance. For example, an application relying on a local cache should fail its Liveness state if the local cache is corrupted and cannot be repaired.

The Readiness state tells whether the application is ready to accept client requests. If the Readiness state is unready, Kubernetes should not route traffic to this instance. If an application is too busy processing a task queue, then it could declare itself as busy until its load is manageable again.

## [](#promoting-liveness-and-readiness-as-core-spring-boot-concepts)[](#promoting-liveness-and-readiness-as-core-spring-boot-concepts)Promoting Liveness and Readiness as core Spring Boot concepts

These Liveness and Readiness concepts are not only applicable to Kubernetes and they are generally useful, regardless of the deployment platform. We’re introducing `LivenessState` and `ReadinessState`, which are immutable representations of those concepts. You can get them at any time from the `ApplicationAvailability`:

```
Copy// Available as a component in the application context
ApplicationAvailability availability;

LivenessState livenessState = availabilityProvider.getLivenessState();
ReadinessState readinessState = availabilityProvider.getReadinessState()
```

**A polling-only model where you need to exercise checks to know the state of the application is incomplete**. Only the application knows about its lifecycle (startup, shutdown) or can provide context about runtime errors (ending in a broken state while processing tasks). The Spring Boot application context is natively publishing those events during the lifecycle of the application; your application code should also be able to contribute to this.

This is why we chose to use the Spring Application Event model to change the availability state and listen for updates:

```
Copy/**
 * Component that checks that the local cache is in a valid state.
 */
@Component
public class LocalCacheVerifier {

    private final ApplicationEventPublisher eventPublisher;

    public LocalCacheVerifier(ApplicationEventPublisher eventPublisher) {
        this.eventPublisher = eventPublisher;
    }

    public void checkLocalCache() {
        try {
            //...
        }
        catch (CacheCompletelyBroken ex) {
            AvailabilityChangeEvent.publish(this.eventPublisher, ex, LivenessState.BROKEN);
        }
    }

}
```

Components can also listen for those events with `@EventListener` (or by implementing `ApplicationListener`). Check out [the reference documentation for more information](https://docs.spring.io/spring-boot/docs/2.3.0.RELEASE/reference/html/spring-boot-features.html#boot-features-application-availability-managing).

This support ships with the `spring-boot` module directly and is activated for all Spring Boot applications; this makes it available for all types of applications (web, batch, etc) and allows you to implement Probes that aren’t necessarily tied to HTTP.

## [](#exposing-kubernetes-probes-with-spring-boot-actuator)[](#exposing-kubernetes-probes-with-spring-boot-actuator)Exposing Kubernetes Probes with Spring Boot Actuator

You’ll probably be interested in a very common use case: deploying a web application on Kubernetes and configuring HTTP Probes. Adding the Spring Boot Actuator dependency to your application is the only requirement! Actuator will use the Health support to configure [Liveness and Readiness HTTP Probes](https://docs.spring.io/spring-boot/docs/2.3.0.RELEASE/reference/html/production-ready-features.html#production-ready-kubernetes-probes).

Actuator will gather the "Liveness" and "Readiness" information from the `ApplicationAvailability` and use that information in dedicated Health Indicators: `LivenessStateHealthIndicator` and `ReadinessStateHealthIndicator`. These indicators will be shown on the global health endpoint (`"/actuator/health"`). They will also be exposed as separate HTTP Probes using Health Groups: `"/actuator/health/liveness"` and `"/actuator/health/readiness"`.

An application running on Kubernetes will show the following health report:

```
Copy// http://localhost:8080/actuator/health
// HTTP/1.1 200 OK

{
  "status": "UP",
  "components": {
    "diskSpace": {
      "status": "UP",
      "details": { //...
      }
    },
    "livenessProbe": {
      "status": "UP"
    },
    "ping": {
      "status": "UP"
    },
    "readinessProbe": {
      "status": "UP"
    }
  },
  "groups": [
    "liveness",
    "readiness"
  ]
}
```

Kubernetes will get the following when calling the Liveness group:

```
Copy// http://localhost:8080/actuator/health/liveness
// HTTP/1.1 200 OK

{
  "status": "UP",
  "components": {
    "livenessstate": {
      "status": "UP"
    }
  }
}
```

An application marked as unready will report the following for the Readiness group:

```
Copy// http://localhost:8080/actuator/health/readiness
// HTTP/1.1 503 SERVICE UNAVAILABLE

{
  "status": "OUT_OF_SERVICE",
  "components": {
    "readinessstate": {
      "status": "OUT_OF_SERVICE"
    }
  }
}
```

HTTP Probes are only configured for applications running on Kubernetes. You can give it a try locally by manually enabling the probes with the `management.health.probes.enabled=true` configuration property. Because Probes are Health Groups, you’ll get many additional features such as configuring HTTP status mappers, security, details visibility…

You can of course configure additional Health Indicators to be part of the Probes, checking for the state of external systems: a database, a Web API, a shared cache. Given an existing `CacheCheckHealthIndicator`, you can augment the liveness Probe with:

```
Copymanagement.endpoint.health.group.liveness.include=livenessstate,cacheCheck
```

You should carefully consider tying external state to Liveness or Readiness and this is why Spring Boot is not adding any by default. Each application and deployment is different, but **we’re committed to providing guidance and adapt defaults with the help of the community** - check out [the "Checking external state with Kubernetes Probes" section in our reference documentation](https://docs.spring.io/spring-boot/docs/2.3.0.RELEASE/reference/html/production-ready-features.html#production-ready-kubernetes-probes-external-state).

## [](#available-in-spring-boot-230rc1)[](#available-in-spring-boot-2-3-0-rc1)Available in Spring Boot 2.3.0.RC1

Coupled with Graceful Shutdown, this feature will help you with the lifecycle of applications and containers in Kubernetes - we’ve started providing guidance around [Kubernetes deployment and configuration in the reference documentation](https://docs.spring.io/spring-boot/docs/2.3.0.RELEASE/reference/html/deployment.html#cloud-deployment-kubernetes).

This new feature will be available with [our upcoming 2.3 milestone](https://github.com/spring-projects/spring-boot/milestone/166); and we can’t wait to hear from you!