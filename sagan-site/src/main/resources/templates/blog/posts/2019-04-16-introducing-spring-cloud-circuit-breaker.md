---
title: Introducing Spring Cloud Circuit Breaker
source: https://spring.io/blog/2019/04/16/introducing-spring-cloud-circuit-breaker
scraped: 2026-02-23T14:50:52.407Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ryan Baxter |  April 16, 2019 | 32 Comments
---

# Introducing Spring Cloud Circuit Breaker

_Engineering | Ryan Baxter |  April 16, 2019 | 32 Comments_

# [](#background)Background

When using a microservices architecture to build our applications, it is very common to end up with a pretty complex dependency tree amongst services. If the service down the dependency tree encounters an issue that causes it to start to respond slowly, it ends up causing a set of issues that cascade up the dependency tree. As more and more requests come in to the application, more and more resources may be consumed by waiting for the slow service to respond. Even worse, the additional load being put on the slow service may exacerbate the problem. To help alleviate the effect of these types of cascading failures, it is common practice to use [circuit breakers](https://microservices.io/patterns/reliability/circuit-breaker.html) as part of microservice applications.

Spring Cloud has [let developers add circuit breakers](https://spring.io/guides/gs/circuit-breaker/) to their application by using [Netflix Hystrix](https://github.com/Netflix/Hystrix) as part of the [Spring Cloud Netflix project](https://github.com/spring-cloud/spring-cloud-netflix). In addition to Hystrix, Spring Cloud developers may want to use other circuit breaker implementations. To help Spring Cloud developers add circuit breakers to their applications in a consistent manner, we have introduced the [Spring Cloud Circuit Breaker project](https://github.com/spring-cloud-incubator/spring-cloud-circuitbreaker) as part of the Spring Cloud incubator.

# [](#about)About

The Spring Cloud Circuit Breaker project provides an abstraction API for adding circuit breakers to your application. At the time of this blog post, there are four supported implementations:

-   [Hystrix](https://github.com/Netflix/Hystrix)
-   [Resilience4J](https://github.com/resilience4j/resilience4j)
-   [Sentinel](https://github.com/alibaba/Sentinel)
-   [Spring Retry](https://github.com/spring-projects/spring-retry)

To use a given implementation, add the appropriate [starter](https://github.com/spring-cloud-incubator/spring-cloud-circuitbreaker/tree/master/spring-cloud-starter-circuitbreaker) to your application's classpath.

# [](#using-spring-cloud-circuit-breaker)Using Spring Cloud Circuit Breaker

Currently, Spring Cloud Circuit Breaker is not part of the Spring Cloud BOM and is being published only to our [snapshot repo](https://repo.spring.io/snapshot/org/springframework/cloud/spring-cloud-circuitbreaker/). You need to add our snapshot repo to your Maven or Gradle file. The following example uses Maven:

```
Copy<repositories>
    <repository>
        <id>spring-snapshots</id>
        <name>Spring Snapshots</name>
        <url>https://repo.spring.io/libs-snapshot-local</url>
        <snapshots>
            <enabled>true</enabled>
        </snapshots>
        <releases>
            <enabled>false</enabled>
        </releases>
    </repository>
</repositories>
```

Next, you need to add the Spring Cloud Circuit Breaker dependency to your application. Again, the following example uses Maven:

```
Copy<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>
            spring-cloud-starter-circuitbreaker-resilience4j
       </artifactId>
        <version>0.0.1.BUILD-SNAPSHOT</version>
    </dependency>
</dependencies>
```

Spring Cloud Circuit Breaker auto-configures an implementation of `CircuitBreakerFactory`, based on the starter on your application's classpath. You can then inject this interface into any class you want. The following example shows how to do so:

```
Copy@Service
public static class DemoControllerService {
	private RestTemplate rest;
	private CircuitBreakerFactory cbFactory;

	public DemoControllerService(RestTemplate rest, 
                CircuitBreakerFactory cbFactory) {
		this.rest = rest;
		this.cbFactory = cbFactory;
	}

	public String slow() {
		return cbFactory.create("slow").run(() -> 
                rest.getForObject("/slow", String.class),
                throwable -> "fallback");
	}
}
```

Most implementations also support Reactive APIs. Currently, Spring Retry is the only implementation that does not have a reactive implementation. If you want to wrap some reactive code in a circuit breaker ,you need to use `ReactiveCircuitBreakerFactory`. The following example shows how to do so:

```
Copy@Service
public static class DemoControllerService {
	private ReactiveCircuitBreakerFactory cbFactory;
	private WebClient webClient;

	public DemoControllerService(WebClient webClient, 
                ReactiveCircuitBreakerFactory cbFactory) {
		this.webClient = webClient;
		this.cbFactory = cbFactory;
	}

	public Mono<String> slow() {
		return webClient.get().uri("/slow").retrieve()
                .bodyToMono(String.class).transform(it -> {
			CircuitBreaker cb = cbFactory.create("slow");
			return cb.run(it, throwable -> 
                            Mono.just("fallback"));
                });
	}
}
```

# [](#configuring-circuit-breakers)Configuring Circuit Breakers

In most cases, you are going to want to configure the behavior of your circuit breakers. To do so, you can create beans of type `Customizer`. Spring Cloud Circuit Breaker lets you provide a default configuration for all circuit breakers as well as configuration for specific circuit breakers. For example, to provide a default configuration for all circuit breakers when using Resilience4J you could add the following bean to a configuration class:

```
Copy@Bean
public Customizer<Resilience4JCircuitBreakerFactory> defaultCustomizer() {
	return factory -> factory.configureDefault(
            id -> new Resilience4JConfigBuilder(id)
            .timeLimiterConfig(TimeLimiterConfig.custom()
                .timeoutDuration(Duration.ofSeconds(4)).build())
            .circuitBreakerConfig(CircuitBreakerConfig.ofDefaults())
            .build());
}
```

The code to configure an individual circuit breaker would look very similar, except you would provide a circuit breaker ID in your `Customizer`, as follows:

```
Copy@Bean
public Customizer<Resilience4JCircuitBreakerFactory> slowCustomizer() {
	return factory -> factory.configure(builder -> {
		return builder
			.timeLimiterConfig(TimeLimiterConfig.custom()
                            .timeoutDuration(Duration.ofSeconds(2)).build())
			.circuitBreakerConfig(
                            CircuitBreakerConfig.ofDefaults());
	}, "slow");
}
```

# [](#feedback)Feedback

We look forward to hearing what you think about this new project. Check out the [GitHub project](https://github.com/spring-cloud-incubator/spring-cloud-circuitbreaker) as well as the [documentation](https://spring-cloud-incubator.github.io/spring-cloud-circuitbreaker/spring-cloud-circuitbreaker.html) for more information. As always, you can reach out to us on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud) and [Gitter](https://gitter.im/spring-cloud/spring-cloud) or by creating a [GitHub issue](https://github.com/spring-cloud-incubator/spring-cloud-circuitbreaker/issues).