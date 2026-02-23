---
title: Kotlin DSLs in the world of Springdom
source: https://spring.io/blog/2023/03/16/kotlin-dsls-in-the-world-of-springdom
scraped: 2026-02-23T10:03:07.163Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  March 16, 2023 | 5 Comments
---

# Kotlin DSLs in the world of Springdom

_Engineering | Josh Long |  March 16, 2023 | 5 Comments_

Kotlin is a beautiful language that makes it trivial to take old Java libraries and make them much more concise, just by virtue of the Kotlin syntax itself. It shines, however, when you write DSLs.

Here's some inside baseball for you: the Spring teams do their level-headed best to be cohesive, to align on core themes, and to make Spring better than the sum of its parts. You see this in every major release: XML namespaces in Spring Framework 2.0. Java Config in 3.0. Conditionals and autoconfiguration when Spring Boot 1.0 first shipped alongside Spring Framework 4.0. Reactive programming with Spring Framework 5.0. And, of course, ahead-of-time compilation in Spring Framework 6.0. And whenever the baseline revisions of platform specifications like Java or Jakarta EE change, so do the minimums for all the projects building on the corresponding Spring Framework release. But not with Kotlin. It's one of those things that grew organically. There was no mandate from on high. It started in Spring Framework, and different teams, when they saw the opportunity, added appropriate support to their respective projects when they could, often in tandem with the community. Kotlin's awesome.

Kotlin has several features that make it easy to build DSLs:

-   functions that accept lambdsa can accept the lambas *outside* of the parenthesis for the funciton invocation'
-   if the only argument expected for the function happens to be a lambda, there's no need to specify the parenthesis at all
-   DSLs may be written so that the `this` reference-the *reciever*\-of the lambda can point to an arbitrary context object of the framework's choosing. So rather than having all DSLs look like this: `{ context -> context.a() } ` we can instead just write `{ a() }`.
-   extension functions are a typesafe way to add new functions to existing types without changing the source code for those types. This means types that work one way in Java can have alternative extended behavior in Kotlin.

In this blog, I want to introduce some examples of DSLs across the wide and wonderful world of Springdom, highlighting some (but not all!) of my favorite DSLs. The code for all these examples and the corresponding Kotlin-language Gradle build files [is here](https://github.com/coffee-software-show/lets-code-kotlin) if you want to follow along at home. Inspect the `dsls` folder for the examples we'll look at in this blog.

Let's dive right in.

## [](#spring-framework-functional-bean-registrations)Spring Framework Functional Bean Registrations

We introduced functional bean registration in Spring Framework 5.0 way back in 2017. It's a way to programmatically register beans with the Spring Framework in an `ApplicationContextInitializer`. It sidesteps some of the reflection and component scanning required for Javca configuration. We quite like the approach, and indeed, when you use Spring's GraalVM native image support, we *transpile*, sort of, your `@Configuration` Java configuration classes into functional bean registrations before feeding the whole thing to the GraalVM native image compiler. It's a nice DSL, but I love how it pulls together when using Kotlin. I don't have a standalone example of this in the sample code, but in most of the examples, I use the functional style, so I want to get it out of the way:

```kotlin
Copypackage com.example.beans

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.support.beans
import org.springframework.web.servlet.function.ServerResponse
import org.springframework.web.servlet.function.router

@SpringBootApplication
class FunctionalBeanRegistrationApplication

fun main(args: Array<String>) {
    runApplication<FunctionalBeanRegistrationApplication>(*args) {
        addInitializers(beans {
            bean {
            	val db = ref<javax.sql.DataSource>()
                CustomerService(db)
            }
        })
    }
}
```

There are a few other niceties there, too: notice that when using Spring Boot, you're not using the normal `SpringApplication.run(Class, String[] args)`, but instead, use `runApplication`. The last parameter of `runApplication` is a lambda that has as its receiver a reference to the `GenericApplicationContext` that gets created when calling `SpringApplication#run`. This gives us a chance to post-process the `GenericApplicationContext` and to call `addInitializers`.

Then, we use the convenient `beans` DSL, rather than writing an implementation of `ApplicationContextInitializer<GenericApplicationContext>` ourselves.

We can also use the `ref` method and the reified generics for the bean type to look up and inject another bean (of type `javax.sql.DataSource`).

Remember that Spring doesn't care how you furnish your bean definitions: use XML, Java Configuration, component scanning, functional bean registration, etc., and Spring is happy either way. Of course, you can also see all of them in the sample application from Java or Kotlin. But, again, it doesn't matter: they all end up as canonicalized `BeanDefinition`s that then get wired together to form the final, running application. So you can mix and match. I often do!

## [](#functional-http-endpoints-with-spring-mvc-and-spring-webflux)Functional HTTP Endpoints with Spring MVC and Spring Webflux

Everybody knows Spring's `@Controller` abstraction. Still, many other frameworks support an alternative syntax, a la Ruby's Sinatra, where a lambda is associated with a predicate describing how to match an incoming request. Spring finally got one in Spring Framework 5. The DSL in Java is concise but even more admirable in Kotlin. This functional endpoint style is implemented for both Spring MVC *and* Sprihng Webflux. However, the MVC implementation came later, so some folks may not have tried it out yet.

```kotlin
Copypackage com.example.fnmvc

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.support.beans
import org.springframework.web.servlet.function.ServerResponse
import org.springframework.web.servlet.function.router

@SpringBootApplication
class FnMvcApplication

fun main(args: Array<String>) {
    runApplication<FnMvcApplication>(*args) {
        addInitializers(beans {
            bean {
                router {
                    GET("/hello") {
                        ServerResponse.ok().body(mapOf("greeting" to "Hello, world!"))
                    }
                }
            }
        })
    }
}
```

Pretty straightforward: when an HTTP `GET` request arrives, produce a response, which in this case is a `Map<String, String>`. Spring MVC will, in turn, serialize that, just as if you had returned a `Map<String, String>` from a Spring MVC `@Controller` handler method. Nice!

## [](#corouitines)Corouitines

Coroutines are one of the most powerful ways to describe scalable, concurrent code in Kotklin without muddying the code with chains of invocations (à la Promises in Javascript or `Publisher<T>s` in Reactor), or callbacks, or the like. If you're using the reactive stack in Spring, then you're already set to use coroutines, as we've worked to make it so that everywhere you would've used a reactive type can also be `await-ed`. You just need to see it to believe it:

```kotlin
Copypackage bootiful.reactive

import kotlinx.coroutines.flow.Flow
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.support.beans
import org.springframework.data.annotation.Id
import org.springframework.data.repository.kotlin.CoroutineCrudRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.reactive.function.server.ServerResponse
import org.springframework.web.reactive.function.server.bodyAndAwait
import org.springframework.web.reactive.function.server.coRouter

@SpringBootApplication
class ReactiveApplication

fun main(args: Array<String>) {
    runApplication<ReactiveApplication>(*args) {
        addInitializers(beans {
            bean {
                val repo = ref<CustomerRepository>()
                coRouter {
                    GET("/customers") {
                        val customers : Flow<Customer> = repo.findAll()
                        ServerResponse.ok().bodyAndAwait(customers)
                    }
                }
            }
        })
    }
}

@RestController
class CustomerHttpController(private val repo: CustomerRepository) {

    @GetMapping("/customers/{id}")
    suspend fun customersById(@PathVariable id: Int): Customer {
        val customer:Customer = this.repo.findById(id) !!
        println("the id is ${customer.id} and the name is ${customer.name}")
        return customer
    }
}

data class Customer(@Id val id: Int, val name: String)

interface CustomerRepository : CoroutineCrudRepository<Customer, Int>

```

The code looks pretty straightforward, I hope, but behind the scenes, the library and the Kotlin runtime are doing a special kind of sorcery that means that, while there is no data available from the sockets returning the data requested from the http server or the underlying database, the thread that was reading that data isn't waiting for it. The thread is free for reuse in the rest of the stack, granting much greater scalability. All we had to do was switch to `CoroutineCrudRepository` and - if doing functional HTP endpoints - make sure we have switched on the `coRouter` instead of `router`. Magic. Delicious magic. But magic, nonetheless. "I can't believe it's not blocking imperative inefficient code!" -Fabio

## [](#spring-security)Spring Security

This example looks at the custom Spring Security DSL.

```kotlin
Copypackage com.example.security

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.support.beans
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.invoke
import org.springframework.security.core.userdetails.User
import org.springframework.security.provisioning.InMemoryUserDetailsManager
import org.springframework.web.servlet.function.ServerResponse
import org.springframework.web.servlet.function.router

@SpringBootApplication
@EnableWebSecurity
class SecurityApplication

fun main(args: Array<String>) {
    runApplication<SecurityApplication>(*args) {
        addInitializers(beans {
            bean {
                val http = ref<HttpSecurity>()
                http {
                    httpBasic {}
                    authorizeRequests {
                        authorize("/hello/**", hasAuthority("ROLE_ADMIN"))
                    }
                }
                .run { http.build() }
            }

            bean {
                InMemoryUserDetailsManager(
                    User.withDefaultPasswordEncoder()
                        .username("user")
                        .password("password")
                        .roles("ADMIN")
                        .build()
                )
            }

            bean {
                router {
                    GET("/hello") {
                        ServerResponse.ok().body(mapOf("greeting" to "Hello, world!"))
                    }
                }
            }
        })
    }
}

```

The example uses functional bean registration. Most of this is familiar. What may be novel is the fact that we're using the injected `HttpSecurity` reference and implicitly calling an extension method, `invoke`, that gives us a DSL in which we can configure things like the fact that we want HTTP BASIC, we want to authorize specific endpoints, etc. We're defining a bean, so we need to return a value.

Very convenient!

## [](#spring-data-mongodb-type-safe-queries)Spring Data MongoDB Type Safe Queries

Countless third-party data access libraries ship with an annotation processor that performs code generation so that you can access your domain model in a typesafe fashion, with checks guaranteed by the compiler. In Kotlin, it is possible to do much of that without an extra tool beyond the Kotlin compiler and language.

Here's a simple example that writes some data to the database, then queries it using Kotlin's field reference mechanism:

```kotlin
Copypackage com.example.mongodb

import org.springframework.boot.ApplicationRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.MongoOperations
import org.springframework.data.mongodb.core.find
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.mongodb.core.query.isEqualTo
import org.springframework.data.repository.CrudRepository

@SpringBootApplication
class MongodbApplication

fun main(args: Array<String>) {
    runApplication<MongodbApplication>(*args)
}

@Configuration
class TypeSafeQueryExampleConfiguration {

    @Bean
    fun runner(cr: CustomerRepository, mongoOperations: MongoOperations) = ApplicationRunner {
        cr.deleteAll()
        cr.save(Customer(null, "A"))
        cr.save(Customer(null, "B"))
        cr.findAll().forEach {
            println(it)
        }
        val customers: List<Customer> = mongoOperations.find<Customer>(
            Query(Customer::name isEqualTo "B")
        )
        println(customers)
    }
}

data class Customer(@Id val id: String?, val name: String)

interface CustomerRepository : CrudRepository<Customer, String>

```

It's a typical application otherwise: we have a Spring Data repository, an entity, etc. We even use one of Spring's well-known `\*Template` variants! The only thing exceptional here is that query in the `find()` call where we say `Customer::name isEqualTo "B"`.

## [](#go-with-the-flow-with-spring-integration)Go with the Flow with Spring Integration

Spring Integration is one of the oldest SPring projects and offers a fit-for-purpose way to describe integration pipelines - we call them *flows* - to act on events (we model them as `Mesasage<T>`s). These pipelines can have many operations, each chained together. Spring Integration provides a lovely `IntegrationFlow` DSL that uses context objects to provide the DSL. But, at least it feels much cleaner when expressed in Kotlin.

```kotlin
Copypackage com.example.integration

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.support.beans
import org.springframework.integration.dsl.integrationFlow
import org.springframework.integration.file.dsl.Files
import org.springframework.integration.file.transformer.FileToStringTransformer
import java.io.File

@SpringBootApplication
class IntegrationApplication

fun main(args: Array<String>) {
    runApplication<IntegrationApplication>(*args) {
        addInitializers(beans {
            bean {
                integrationFlow(
                    Files.inboundAdapter(File("/Users/jlong/Desktop/in")),
                    { poller { it.fixedDelay(1000) } }
                ) {
                    transform(FileToStringTransformer())
                    transform<String> { it.uppercase() }
                    handle {
                        println("new message: ${it.payload}")
                    }
                }
            }
        })
    }
}

```

Does this inbound flow make sense to you? It says: scan the directory (my computer's `$HOME/Desktop/in` folder) every 1000 milliseconds (a second), and when there's a new `java.io.File` detected, pass it to the `transform` operation, which will turn the `File` into a `String`. The `String` is then sent to the next `transform` operation, which uppercases the text. That uppercased text is then sent to the last operation, `handle`, where I print out the uppercased text.

## [](#easy-microproxies-with-spring-cloud-gateway)Easy Microproxies with Spring Cloud Gateway

Spring Cloud Gateway is one of my favorite Spring Cloud modules. It makes it trivial to handle cross-cutting concerns at the HTTP and service levels. There's also integration for things like GRPC and wesockets. It's pretty easy to understand: you use the `RouteLocatorBuilder` to define `routes`, which have predicates matching incoming requests. If they're matched, you can apply zero or more filters to the request before sending it to the final `uri` you specify. It's a functional pipeline, so it shouldn't be surprising it expresses nicely in a Kotlin DSL. Let's look at an example.

```kotlin
Copy
package com.example.gateway

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder
import org.springframework.cloud.gateway.route.builder.filters
import org.springframework.cloud.gateway.route.builder.routes
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpHeaders

@SpringBootApplication
class GatewayApplication

fun main(args: Array<String>) {
    runApplication<GatewayApplication>(*args)
}

@Configuration
class GatewayConfiguration {

    @Bean
    fun gateway(rlb: RouteLocatorBuilder) = rlb
        .routes {
            route {
                path("/proxy")
                filters {
                    setPath("/bin/astro.php")
                    addResponseHeader(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "*")
                }
                uri("https://www.7timer.info/")
            }
        }
}
```

This example matches the request bound for `localhost:8080/proxy` and forwards the request to a random open HTTP web service I found on the internet that is supposed to give you weather reports. I use the filter to augment the response, adding custom headers, `ACCESS_CONTROL_ALLOW_ORIGIN`, to the response. Try it out in the browser, as I think the default response without any of the parameters is some binary data - an image.

## [](#kotlin-and-spring-are-a-win-win)Kotlin and Spring are a win-win

I've only touched on some of the fantastic DSLs present in Spring and across the portfolio that provide new types to do the same things as were possible in the Java DSLs. There's also a whole host of existing libraries for which we've written extension functions - essentially adding new paint onto old structures to make them more idiomatic for Kotlin developers. My favorite example of this is the `JdbcTemplate`, which has been around in some form or another for 20+ years, yet it feels like it was written yesterday with Kotlin in mind!

You can get started, as usual, by checking out the [Spring Initializer](https://start.spring.io). Make sure to choose `Kotlin` as your language. You can even ask for a Kotlin-language Gradle build, too!

There are plenty of great (and mostly free) resources, [including the guides](https://spring.io/guides) - which provide text-centric walkthroughs, and the Spring Academy (which are video guided walkthroughs, and they even provide a path to certification!) introducing the various APIs and projects we introduced in this blog, albeit in Java. Kotlin itself is a nice language and easy enough to learn. I've got a ton of content over on my channel looking [at Kotlin (and other things)](https://youtube.com/@coffeesoftware).

And of course, if you can swing the cash, we're having our big tentpole event, [SpringOne@VMWare Explore](https://www.vmware.com/explore/us.html), this August in Las Vegas. Join us. The CFP is open [until the end of March](https://event.vmware.com/flow/vmware/explore2023lv/cfp/cfpHome), too, so feel free to submit. We'd love to see you in Las Vegas!