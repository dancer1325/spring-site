---
title: Introducing Actuator Endpoints in Spring Boot 2.0
source: https://spring.io/blog/2017/08/22/introducing-actuator-endpoints-in-spring-boot-2-0
scraped: 2026-02-23T16:22:23.556Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Stéphane Nicoll |  August 22, 2017 | 25 Comments
---

# Introducing Actuator Endpoints in Spring Boot 2.0

_Engineering | Stéphane Nicoll |  August 22, 2017 | 25 Comments_

Spring Boot 2 brings important changes to Actuator and I am pleased, on behalf of the team, to give you a sneak peek to what’s coming in `2.0.0.M4`.

Working on a major new release gives us the opportunity to revisit some of the public contracts and improve them. We quickly felt that the endpoint infrastructure was one of them: currently, the web endpoints in the Actuator are only supported with Spring MVC (no JAX-RS support). Also, creating a new endpoint that exposes several operations requires writing quite a lot of boiler plate: you need to write a main endpoint, the Spring MVC extension (as a `@RestController`), a JMX MBean and the necessary auto-configuration. As of Spring Boot 2 support for a "reactive" actuator became an obvious requirement that also brings several new challenges.

## [](#endpoint-infrastructure)[](#endpoint-infrastructure)Endpoint infrastructure

Spring Boot 2 brings a brand new endpoint infrastructure that allows you to define one or several operations in a technology independent fashion with support for Spring MVC, Spring WebFlux and Jersey! Spring Boot 2 will have native support for Jersey and writing an adapter for another JAX-RS implementation should be easy as long as there is a way to programmatically register resources.

Let’s illustrate the new API with the [existing `/application/loggers` MVC endpoint](https://github.com/spring-projects/spring-boot/blob/c73fde31ec87dbcdbf2e8597e5d86cab6e5d1ff6/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/endpoint/mvc/LoggersMvcEndpoint.java) that allows you to control your logging configuration at runtime. This endpoint has three operations:

-   A main operation to list the current configuration.
    
-   A more narrowed operation to provide the configuration of a logger by name
    
-   A write operation to update the configuration of a particular logger.
    

This is how that endpoint looks like as of Spring Boot 2:

```
Copy@Endpoint(id = "loggers")
public class LoggersEndpoint {

    @ReadOperation
    public Map<String, Object> loggers() { ... }

    @ReadOperation
    public LoggerLevels loggerLevels(@Selector String name) { ... }

    @WriteOperation
    public void configureLogLevel(@Selector String name, LogLevel configuredLevel) { ... }

}
```

The new `@Endpoint` annotation declares this type to be an endpoint with a mandatory, unique id. As we will see later, a bunch of properties will be automatically inferred from that. No additional code is required to expose this endpoint at `/applications/loggers` or as a `org.springframework.boot:type=Endpoint,name=Loggers` JMX MBean. Let’s find out why.

### [](#web-endpoint)[](#web-endpoint)Web endpoint

This endpoint exposes three operations:

-   `GET` on `/application/loggers`: the configuration of all loggers (as it has no "selector" parameter):
    
-   `GET` on `/application/loggers/{name}`: the configuration of a named logger (using the `name` [`@Selector`](https://github.com/spring-projects/spring-boot/blob/2f513400475306ff34da81ab24f97ebfe6b8d433/spring-boot/src/main/java/org/springframework/boot/endpoint/Selector.java)).
    
-   `POST` on `/application/loggers/{name}`: update the configuration of a named logger. This operation has an additional parameter that needs to be resolved as it is not used to further select the resource to update. In this particular case, a request body with a `configuredLevel` JSON attribute is expected, something like:
    

```
Copy{
    "configuredLevel": "WARN"
}
```

Additional parameters of read operations will be automatically mapped from request attributes.

### [](#jmx-mbean)[](#jmx-mbean)JMX MBean

No additional code is required to expose that endpoint as a JMX MBean. Because a typical JMX client (e.g. `JConsole`) does not have access to third party libraries, any non core types are automatically translated. In particular, `LogLevel` is an enum that is exposed as a String in the `configureLogLevel` JMX operation.

### [](#cross-cutting-features)[](#cross-cutting-features)Cross-cutting features

The infrastructure allows us to provide cross-cutting features such as endpoint caching. At the moment, we offer a way to cache the result of the main operation (i.e. the `loggers` method above). Endpoint security is also in the works.

### [](#extensions)[](#extensions)Extensions

If you need to express something in a technology-specific manner, you can write an extension for it. An example of that is the health endpoint that needs to change the response’s HTTP status code based on the computed `Health`. The `health` endpoint is [pretty much what you would expect](https://github.com/spring-projects/spring-boot/blob/2f513400475306ff34da81ab24f97ebfe6b8d433/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/endpoint/HealthEndpoint.java):

```
Copy@Endpoint(id = "health")
public class HealthEndpoint {

    @ReadOperation
    public Health health() { ... }

}
```

The `HealthWebEndpointExtension` [overrides the main read operation](https://github.com/spring-projects/spring-boot/blob/2f513400475306ff34da81ab24f97ebfe6b8d433/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/endpoint/web/HealthWebEndpointExtension.java) to produce a `WebEndpointResponse<Health>` rather that `Health`. This gives a chance to the web extension to provide web specific attributes to the response:

```
Copy@WebEndpointExtension(endpoint = HealthEndpoint.class)
public class HealthWebEndpointExtension {

    private final HealthEndpoint delegate;

    public HealthWebEndpointExtension(HealthEndpoint delegate) { ... }

    @ReadOperation
    public WebEndpointResponse<Health> getHealth() {
        Health health = this.delegate.health();
        Integer status = // get http status based on current health
        return new WebEndpointResponse<>(health, status);
    }

}
```

### [](#configuration)[](#configuration)Configuration

Each endpoint gets automatically a dedicated configuration namespace at endpoints.. The `spring-boot-configuration-processor` has been updated to automatically detect `@Endpoint` classes:

![T0HFTViTS1C39qipMg Mhg](https://image.prntscr.com/image/T0HFTViTS1C39qipMg-Mhg.png)

To configure an endpoint, all that’s required really is to expose it as a `@Bean`. There is a new `@ConditionalOnEnabledEndpoint` that makes sure that the endpoint is not created (or exposed) according to the current configuration:

```
Copy@Bean
@ConditionalOnBean(LoggingSystem.class)
@ConditionalOnMissingBean
@ConditionalOnEnabledEndpoint
public LoggersEndpoint loggersEndpoint(LoggingSystem loggingSystem) {
	return new LoggersEndpoint(loggingSystem);
}
```

So, for instance, if `endpoints.loggers.enabled=false` is present in the environment, the condition will not match and the endpoint will not be exposed at all.

## [](#whats-next)[](#whats-next)What’s next?

Because we now have a centralized infrastructure, we can be smarter as what to do depending on the runtime environment. If you’re running Actuator with WebFlux, it doesn’t necessarily assume that everything is non-blocking. In fact, operations that don’t return a `Publisher` (i.e. `Mono` or `Flux`) will be run on a dedicated thread pool so that they don’t block reactive operations. This work should land in master early next week.

We are also working on some reactive-specific contract for the actuator, i.e. a reactive `Health` endpoint that can execute the available `HealthIndicators` in a reactive fashion:

```
Copypublic interface ReactiveHealthIndicator {

    Mono<Health> health();

}
```

We are also considering migrating from a R/W model to a CRUD model (i.e. support for delete and create operations), please watch [#10023](https://github.com/spring-projects/spring-boot/issues/10023) if you are interested.

If you want to give this new endpoint infrastructure a try we’d love to hear from you. To get started, generate an app on start.spring.io with Spring Boot `2.0.0.BUILD-SNAPSHOT`.