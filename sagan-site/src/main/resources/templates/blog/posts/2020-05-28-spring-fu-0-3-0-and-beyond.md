---
title: Spring Fu 0.3.0 and beyond
source: https://spring.io/blog/2020/05/28/spring-fu-0-3-0-and-beyond
scraped: 2026-02-23T13:59:05.969Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Sébastien Deleuze |  May 28, 2020 | 4 Comments
---

# Spring Fu 0.3.0 and beyond

_Releases | Sébastien Deleuze |  May 28, 2020 | 4 Comments_

I am happy to announce that [Spring Fu](https://github.com/spring-projects-experimental/spring-fu/) 0.3.0 is available. As a reminder, Spring Fu is an incubator for Spring Boot programmatic configuration using [DSLs](https://en.wikipedia.org/wiki/Domain-specific_language) in order to configure it explicitly with code in a declarative way, achieving great discoverability thanks to auto-complete.

## [](#jafu-is-back)[](#jafu-is-back)JaFu is back!

This new milestone brings back [JaFu](https://github.com/spring-projects-experimental/spring-fu/tree/master/jafu) (the Java DSL) in addition to [KoFu](https://github.com/spring-projects-experimental/spring-fu/tree/master/kofu) (the Kotlin DSL). JaFu was removed in 0.1.0 because at that point, I had not the bandwidth to support both Java and Kotlin DSLs, and in term of API I was not sure that the Java variant was attractive enough to justify such effort, but I have changed my mind for various reasons:

-   I received a lot of requests to bring it back
    
-   Java as a language is moving faster
    
-   Getting more control on how configuration is applied is interesting for Java developers as well as Kotlin ones
    
-   Functional approach is naturally very efficient on the JVM and a good fit with [GraalVM native images](https://github.com/spring-projects-experimental/spring-graalvm-native)
    
-   2 great new contributors have join the team: [Audrey Neveu](https://spring.io/team/aneveu) with a focus on KoFu and [Arjen Poutsma](https://spring.io/team/apoutsma) with a focus on JaFu. Welcome to them!
    

## [](#other-improvements)[](#other-improvements)Other improvements

This new release is also the opportunity for various improvements like a [Spring Boot 2.3.0](https://spring.io/blog/2020/05/15/spring-boot-2-3-0-available-now) baseline or API improvements, see the detailed changelog [here](https://github.com/spring-projects-experimental/spring-fu/milestone/8?closed=1).

Spring Fu 0.3.0 also ships with additional optimizations which enable only the functional Web infrastructure, so on my laptop I get pretty fast startup time on OpenJDK 11: `Started Application in 0.673 seconds (JVM running for 0.898)`.

## [](#comparing-jafu-and-kofu)[](#comparing-jafu-and-kofu)Comparing JaFu and Kofu

Since Spring MVC is now usable in a functional way for both Java and Kotlin, let’s see what looks like a minimal Spring Boot web application configured with those DSLs.

With JaFu:

```
Copypublic class Application {

	public static JafuApplication app = webApplication(a -> a.beans(b -> b
		.bean(SampleHandler.class)
		.bean(SampleService.class))
		.enable(webMvc(w -> w
			.port(w.profiles().contains("test") ? 8181 : 8080)
			.router(router -> {
				SampleHandler handler = w.ref(SampleHandler.class);
				router
					.GET("/", handler::hello)
					.GET("/api", handler::json);
			}).converters(c -> c
				.string()
				.jackson(j -> j.indentOutput(true))))));

	public static void main (String[] args) {
		app.run(args);
	}
}
```

With KoFu:

```
Copyval app = webApplication {
	beans {
		bean<SampleService>()
		bean<SampleHandler>()
	}
	webMvc {
		port = if (profiles.contains("test")) 8181 else 8080
		router {
			val handler = ref<SampleHandler>()
			GET("/", handler::hello)
			GET("/api", handler::json)
		}
		converters {
			string()
			jackson {
				indentOutput = false
			}
		}
	}
}

fun main() {
	app.run()
}
```

## [](#configuration-slices)[](#configuration-slices)Configuration slices

The power of this configuration model lies in the fact that you can define your own configuration slices and assemble them as you want. For example, let’s define 3 configuration slices `webConfig`, `loggingConfig` and `myFeatureConfig`:

```
Copyval webConfig = configuration {
    webMvc {
        // ...
    }
}

val loggingConfig = configuration {
    logging {
        level = LogLevel.WARN
    }
}

val myFeatureConfig = configuration {
    beans {
        // ...
    }
    cassandra {
        // ...
    }
}
```

You can then use them all for your regular web application:

```
Copyval webApp = webApplication {
    enable(loggingConfig)
    enable(myFeatureConfig)
    enable(webConfig)
}

fun main() {
    webApp.run()
}
```

But you can also use just a subset for your integration tests for example:

```
Copy@Test
fun `My feature integration test`() {
    val testApp = application {
        enable(loggingConfig)
        enable(myFeatureConfig)
    }
    // ...
}
```

# [](#roadmap)[](#roadmap)Roadmap

In term of roadmap, the next [0.4.0 milestone](https://github.com/spring-projects-experimental/spring-fu/milestone/10) will focus on:

-   Replacing the [autoconfigure-adapter](https://github.com/spring-projects-experimental/spring-fu/tree/master/autoconfigure-adapter) module by leveraging [spring-init](https://github.com/spring-projects-experimental/spring-init/), an experimental project created by [Dave Syer](https://spring.io/team/dsyer) and [Andy Clement](https://spring.io/team/aclement) which automatically converts Spring Boot auto-configurations to functional bean registration.
    
-   GraalVM native support without reflection configuration (depends on [oracle/graal#2500](https://github.com/oracle/graal/issues/2500))
    
-   Refined DSL extensibility
    
-   Scale-to-zero application sample with JaFu, GraalVM native and [Knative](https://knative.dev/)
    
-   Leverage [Spring Framework 5.3 M1](https://github.com/spring-projects/spring-framework/milestone/222) to remove by default [XML](https://github.com/spring-projects/spring-framework/issues/25151) and [SpEL](https://github.com/spring-projects/spring-framework/issues/25153) support
    
-   Spring Security support via [Spring Security 5.3 official Kotlin DSL](https://docs.spring.io/spring-security/site/docs/current/reference/html5/#kotlin-config)
    

As usual, feedback is welcome. Be aware that we have for now mainly a focus on getting the right software design and APIs rather than an extensive coverage of more features.