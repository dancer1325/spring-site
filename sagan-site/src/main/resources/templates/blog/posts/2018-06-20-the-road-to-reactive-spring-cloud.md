---
title: The Road to Reactive Spring Cloud
source: https://spring.io/blog/2018/06/20/the-road-to-reactive-spring-cloud
scraped: 2026-02-23T15:20:54.631Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  June 20, 2018 | 3 Comments
---

# The Road to Reactive Spring Cloud

_Engineering | Josh Long |  June 20, 2018 | 3 Comments_

The new [Spring Cloud Finchley GA release](https://spring.io/blog/2018/06/19/spring-cloud-finchley-release-is-available) is jam-packed with good stuff and represents a major milestone in the journey to reactive microservices. I couldn't possibly list everything so I refer you to the fresh-from-the-oven release announcement by Spencer Gibb. Instead, in this post, I want to focus on the road we have taken to *reactive* Spring Cloud.

We released [Spring Framework 5 in September 2017](https://spring.io/blog/2017/09/28/spring-framework-5-0-goes-ga). This was the first release to introduce new Reactive programming support to help build more robust, scalable services. It builds upon the Pivotal Reactor project, our reactive streams compatible reactive runtime. Spring Framework 5 also includes a *ton* of new features, and I won't try to list them all, either, choosing instead to focus on reactive support here. What is reactive programming? Why does it matter? Well, it matters when you're building networked services.

In short, the fundamentals for of service integration in Spring have been refreshed to fully embrace Reactive Programming. So, what is "reactive programming"? Reactive programming is a recognition that, as soon as you start to conduct more data over the wire, to saturate your IO buffers with API calls, you spend more time in any given request doing IO.

IO isn't a problem in of itself. IO traditionally blocks - a thread must wait for an `InputStream` to produce new `byte`s. (typically in a while loop `read()` 'ing buffers of `byte`s). As a thread waits, it can't be repurposed for anything else. Threads are expensive!

Think about how a traditional server, implemented in Java or any other platform that has the same approach to threading, works. If you have 100 threads in your web server's threadpool, and 101 requests arrive, then that last extra request will not be served until one of the others finish processing their requests. If the others can finish (and thus free up the thread they're monopolizing) before that 101th request arrives, great! There's possibly no need for reactive programming. If you can free up threads faster than new requests arrive, and the time spent in those threads is mostly due to input/output, then there is no need for reactive programming.

As you move to a world of microservices, of big-data, and long-lived sessions (for example in websockets and server-sent events and any other long-lived server side state), then you will start to conduct more data over the wire.

This coupling, of threads to IO, is unnecessary. Your operating system has had support for 'backgrounding' IO, and notifying you when you should be involved, for decades. Indeed, [Java 1.4 (from the early 2000s) supports NIO (Channels)](https://www.ibm.com/developerworks/java/tutorials/j-nio/j-nio.html) which give us this asynchronous IO mechanism.

In this world, something manages the IO and calls your code back when it should be involved. If there's any latency, that thread is free to move on and handle other requests. It's not blocking. Instead of your code *pulling* bytes out of an `InputStream`, the bytes will be *pushed* to it asynchronously. You invert, effectively, the interaction with the source of data.

Lots of projects, like RxJava from @NetflixOSS, @ProjectReactor from @Pivotal, @vertx\_project from Eclipse, and @akkateam from @lightbend , have seek to provide a programming model that supports this new asynchronous reality. There's common ground and out of ths common ground was born the Reactive Streams spec, which these projects support all support.

The Reactive Streams specification supports the `Publisher` type which publishes items to subscribers. `Subscribers` consume items when their `onNextIT)` method is called. When a subscriber subscribes, it's given a `Subscription`, which it can use to signal how many records it can handle. This last bit-the ability to specify exactly how many records a subscriber is prepared to handle at once-is *flow control*. The `Publisher` can't overwhelm the `Subscriber`. This promotes stability. In the context of reactive programming, flow control is called *backpressure*.

There's a final interface, `Processor`, which is simply a bridge; it implements both `Publisher` and a `Subscriber`. Project Reactor supports two `Publisher` specializations: `Flux`, which emits 0-N items, and `Mono`, which emits a single item, or no item.

This is a fundamental re-thinking of the way IO happens and as such it requires integration at every layer above; in the data access layer, the security layer, in Boot and in the microservices layer.

Spring Framework 5 also includes a net-new reactive web runtime (and even supports the Netty project) called Spring WebFlux. It even includes new, functional reactive endpoints. I did a Spring Tips video on this waaaay back in 2016!

Spring WebFlux builds upon the reactive streams specification and so can interoperate with any other supporting library. Here's a Spring Tips video in which I demonstrate using reactive Spring Webflux with Lightbend's Akka Streams (and Scala).

The new Spring WebFlux component model is reactive and asynchronous, first. It supports the asynchronous case, like websockets and server sent events, in the same way as you might traditionally handle the synchronous case. You end up having one kind of thing. Want to send a short JSON stanza with 10 records in a few nano seconds? Use a `Publisher`! Want to produce server-sent events Here's a Spring Tips video on server sent events.

And here's a Spring Tips video on reactive websockets.

The new release also includes a new reactive HTTP client, called `WebClient`. I did a Spring Tips video on this, as well!

[Spring Data Kay](https://spring.io/blog/2017/10/02/spring-data-release-train-kay-goes-ga) supports reactive data-access through templates and repositories for the data access technologies that have asynchronous IO support. Here's an example using Reactive Spring Data MongoDB.

```Java
Copy
interface ReservationRepository extends ReactiveMongoRepository<Reservation, String> {

		Flux<Reservation> findByEmail(String email);
}

@Document
@AllArgsConstructor
@NoArgsConstructor
@Data
class Reservation {
		@Id
		private String id;
		private String email;
}
```

[Spring Security 5](https://spring.io/blog/2017/11/28/spring-security-5-0-0-release-released) supports reactive authentication and authorization for traditional use cases (as demonstrated below) and OAuth:

```java
Copy
  @Bean
  MapReactiveUserDetailsService authentication() {
    // don't do this! this is a hardcoded username and password and it
    // would literally pain Spring Security lead @rob_winch to see this!
    //
    return new MapReactiveUserDetailsService(
      User.withDefaultPasswordEncoder().username("user").password("pw").roles("USER").build());
  }

  @Bean
  SecurityWebFilterChain authorization(ServerHttpSecurity security) {
  //@formatter:off
  return security
  .csrf().disable()
  .httpBasic()
  .and()
  .authorizeExchange()
    .pathMatchers("/proxy").authenticated()
    .anyExchange().permitAll()
  .and()
  .build();
  //@formatter:on
  }

```

[Spring Boot 2](https://spring.io/blog/2018/03/01/spring-boot-2-0-goes-ga) pulls all of that together so that things like building REST endpoints, using the Actuator, managing security, and everything else "just works" whether you choose to use Spring WebFlux or Spring MVC.

It also means a lot of shaky ground, from a codebase change perspective, for the Spring Cloud team to navigate, which is what makes this release SO momentous.

Thew new release strings reactive programming in seamlessly across existing concerns: service registration, discovery, security, CDC(T) and testing, messaging, micro-proxy support, circuit breakers, and so much more. Let's look at some examples.

You can use the new reactive `WebClient` and have it resolve hosts using any of the service registries supported by Spring Cloud's `DiscoveryClient` abstraction (Netflix Eureka, Hashicorp Consul, Apache Zookeeper, Cloud Foundry, etc.).

```java
Copy
@Bean
WebClient client(LoadBalancerExchangeFilterFunction eff) {
  return WebClient.builder().filter(eff).build();
}
```

You can then use that reactive, service-registry aware `WebClient`. In the following example, `reservation-service` is a service registered in the service registry, not an actual hostname.

```java
Copy
Publisher<String> emails = client
	.get()
	.uri("http://reservation-service/reservations")
	.retrieve()
	.bodyToFlux(Reservation.class)
	.map(Reservation::getEmail);

```

You can consume messages coming off a topic or queue in Kafka or RabbitMQ, respectively, using the reactive support in Spring Cloud Stream, too.

```Java
Copy
@Configuration  
@EnableBinding(Sink.class)
public class MyStreamListener {

  @StreamListener
  public void incoming (@Input(Sink.INPUT) Flux<String> names ) {
    names
     .map ( x-> new Reservation( null, x))
     .flatMap ( this.reservationRepository::save )
     .subscribe( x -> log.info( "saved " + x.toString()));
   }
 }

```

You can protect and isolate potentially errant service calls using the Hystrix circuit breaker with reactive `Publisher`s. In the following example, I make an HTTP call using the reactive `WebClient` that *may* fail. If it fails, I want to be able to provide a fallback `Publisher` to return, instead. That's what will happen. It's almost as important as what *doesn't* happen. My code doesn't throw an exception. It degrades gracefully. That circuit breaker has smarts. It has state. If enough successive attempts to make that call should fail, the circuit breaker will eventually switch to the fallback Publisher, directly. If the downstream service should come back online (which it will if you use Cloud Foundry), then it'll eventually re-register itself with the registry, the registry will send out a heartbeat event and the heartbeat event will be used to invalidate the local *view* of the services in th registry. The client will see that there are new instances in the registry and it'll reset the circuit breaker, to closed, and allow the next call to go through which, hopefully, will succeed.

```Java
Copy

Publisher<String> emails = client
  .get()
  .uri("http://reservation-service/reservations")
  .retrieve()
  .bodyToFlux(Reservation.class)
  .map(Reservation::getEmail);

Publisher<String> fallback = HystrixCommands
  .from( emails )
  .eager()
  .commandName("emails")
  .fallback ( Flux.just ("EEK!") )
  .build();

```

While it's nice to be able to use these existing technologies in a reactive context, what's most exciting is what new possibilities reactive programming opens up! Two new projects, Spring Cloud Gateway and Spring Cloud Function, both benefit immensely from it.

Let's look at those, even if ever so briefly.

[Spring Cloud Gateway](https://cloud.spring.io/spring-cloud-gateway/) is our net-new reactive API gateway. It builds on top of the reactive support in Spring. After all, its job is to conduct requests from clients to downstream services. This is a perfect use case (and demand) for reactive programming. I did a Spring Tips video on it, as well.

Here's an example of using Spring Cloud Gateway to proxy a request from `:9999/proxy` to a service (resolved and load-balanced through the service registry) and rate limited. (NB: this config could live in (refreshable) configuration in the Spring Cloud Config Server or really any source for which you can create a `Flux<Route>`.)

This example limits each *authenticated* user to 100 requests per second. You don't need Spring Security to use the gateway, but as configured it's implied.

```Java
Copy@Bean
RouteLocator gateway (RouteLocatorBuilder rlb, RedisRateLimiter rrl) {
  return rlb
    .routes()
    .route( spec ->
      spec
       .path("/rl")
       .flters( fs -> fs
         .requestRateLimiter( c -> c.setRateLimiter( this.redisRateLimiter() ))
         .setPath("/reservations")
       )
       .uri("lb://reservation-service/")
    )
    .build();
}

@Bean // 100 reqs per second, burstable to 150
RedisRateLimiter redisRateLimiter (){
  return new RedisRateLimiter(100, 150);
}
```

[Spring Cloud Function](https://cloud.spring.io/spring-cloud-function/) is our new function-as-a-service abstraction. It adapts plain-'ol-functions into the types required by different function-as-a-service runtimes. It can be used on, among many others, AWS Lambda, Microsoft Azure, and of course our very own [Project Riff](http://projectRiff.io). Project Riff is an Apache 2 licensed, Kubernetes-based polyglot function-as-a-service runtime. I did a Spring Tips video on both Spring Cloud Function and Project Riff, as well.

Using it couldn't be easier! You need to create `java.util.function.Function<I,O>` instances. both `I` and `O`, in this case, could be `Publisher<X>`s!

```
Copypackage com.example.uppercase;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import reactor.core.publisher.Flux;

import java.util.function.Function;

@SpringBootApplication
public class UppercaseApplication {

		@Bean
		Function<Flux<String>, Flux<String>> uppercase() {
				return incoming -> incoming.map(String::toUpperCase);
		}

		public static void main(String[] args) {
				SpringApplication.run(UppercaseApplication.class, args);
		}
}
```

As you have hopefully gathered by now, reactive programming has well and truly arrived in Spring! Spring Cloud is the last major project that needed to support it for a holistic discussion of reactive programming. But this is not the end of the story, at all. Indeed, we're JUST getting started! Stay tuned. :-)

We'll be talking about reactive programming and reactive Spring Cloud-based microservices, among many other things, at the upcoming SpringOne Platform event. [Join us](https://springoneplatform.io/)!