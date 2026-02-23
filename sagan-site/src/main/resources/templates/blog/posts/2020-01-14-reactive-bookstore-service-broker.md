---
title: Reactive BookStore Service Broker
source: https://spring.io/blog/2020/01/14/reactive-bookstore-service-broker
scraped: 2026-02-23T14:15:45.738Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Roy Clarkson |  January 14, 2020 | 0 Comments
---

# Reactive BookStore Service Broker

_Engineering | Roy Clarkson |  January 14, 2020 | 0 Comments_

Happy belated new year to the Spring community! As we start another amazing year of development and advancement within the Spring project ecosystem, I want to share with you an updated sample application that represents some of the progress we have made across the portfolio to support a Reactive programming model.

The [BookStore Service Broker](https://github.com/spring-cloud-samples/bookstore-service-broker) sample application has been updated to demonstrate the integration of several of the various Spring projects, including Spring Cloud Open Service Broker, Spring Data, Spring Security, Spring HATEOAS, and of course Spring WebFlux and Spring Boot. All of these projects have GA versions that include Reactive support and are ready for production in your own applications and services.

For simplicity, the app itself functions as both a service broker and service instance. While service brokers themselves adhere to the Open Service Broker API, the services that they provision are more abstractly defined. Services can do or be almost anything. In the case of this app, a new set of credentials is created for each provisioned service instance. These credentials are used in requests to the service instance. The url of the new service instance is configured to be the same as the route to the service broker itself. In this way, the credetentials are used to differentiate requests to the various service instances. The goal was to design a self-contained, comprehensive example that demonstrates many parts of the Spring portfolio.

### [](#spring-cloud-open-service-broker-31)[](#spring-cloud-open-service-broker-3-1)Spring Cloud Open Service Broker 3.1

[Spring Cloud Open Service Broker](https://spring.io/projects/spring-cloud-open-service-broker) is a framework for building Spring Boot applications that implement the Open Service Broker API, which allows developers to deliver services to applications running within cloud native platforms such as Cloud Foundry, Kubernetes, and OpenShift. Since version 3.0, Spring Cloud Open Service Broker has supported both Spring WebFlux and Spring MVC web frameworks via Reactive types in the controller and service interfaces.

To get started with Spring Cloud Open Service Broker, include the Spring Boot starter in your application:

```
Copyimplementation('org.springframework.cloud:spring-cloud-starter-open-service-broker:3.1.0.RELEASE')
```

Next, implement the `ServiceInstanceService` and `ServiceInstanceBindingService`. The following code illustrates the required API. View the sample app for full details.

```
Copy@Service
public class BookStoreServiceInstanceService
		implements ServiceInstanceService {

	@Override
	public Mono<CreateServiceInstanceResponse> createServiceInstance(
		CreateServiceInstanceRequest request) {...}

	@Override
	public Mono<GetServiceInstanceResponse> getServiceInstance(
		GetServiceInstanceRequest request) {...}

	@Override
	public Mono<DeleteServiceInstanceResponse> deleteServiceInstance(
		DeleteServiceInstanceRequest request) {...}

}
```

### [](#spring-data-moore)[](#spring-data-moore)Spring Data Moore

The [Spring Data](https://spring.io/projects/spring-data) release train originally introduced Reactive support in [Spring Data Kay](https://spring.io/blog/2016/11/28/going-reactive-with-spring-data). Spring Data R2DBC recently announced a GA release, however Spring Boot does not yet have a GA release with Spring Data R2DBC integration. This example uses MongoDB as the backing data store.

To get started with Reactive MongoDB, add the Spring Boot starter:

```
Copyimplementation('org.springframework.boot:spring-boot-starter-data-mongodb-reactive')
```

For demonstration purposes, add an embedded MongoDB server:

```
Copyimplementation('de.flapdoodle.embed:de.flapdoodle.embed.mongo')
```

Next, configure the Reactive repositories:

```
Copy@Configuration
@EnableReactiveMongoRepositories(basePackageClasses = {
		ServiceBrokerRepositoryPackageMarker.class,
		WebRepositoryPackageMarker.class
})
public class ApplicationRepositoryConfiguration {
}
```

Finally, define a `ReactiveCrudRepository`. The following interface is one example from the sample app:

```
Copypublic interface ServiceInstanceRepository extends ReactiveCrudRepository<ServiceInstance, String> {
}
```

### [](#spring-security-52)[](#spring-security-5-2)Spring Security 5.2

Reactive support was originally included in [Spring Security](https://spring.io/projects/spring-security) 5, and the integration with Spring Boot and Spring Framework continues to mature.

To use Spring Security, include the Spring Boot starter:

```
Copyimplementation('org.springframework.boot:spring-boot-starter-security')
```

Next, define a security configuration with `@EnableWebFluxSecurity`. This code illustrates how the one app is securing both the service broker endpoints at `/v2`, as well as the `/bookstores` endpoints that respond to the requests to the service instances:

```
Copy@Configuration
@EnableWebFluxSecurity
public class SecurityConfiguration {

	@Bean
	public SecurityWebFilterChain securityWebFilterChain(
		ServerHttpSecurity http) {
		return http
				.csrf().disable()
				.httpBasic()
				.and().authorizeExchange()
				.pathMatchers("/bookstores/**").authenticated()
				.pathMatchers("/v2/**").hasAuthority(
					SecurityAuthorities.ADMIN)
				.matchers(EndpointRequest.to("info", "health")).permitAll()
				.matchers(EndpointRequest.toAnyEndpoint()).hasAuthority(
					SecurityAuthorities.ADMIN)
				.and().build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
```

Next, implement a `ReactiveUserDetailsService`:

```
Copy@Service
public class RepositoryUserDetailsService implements
		ReactiveUserDetailsService {

	private final UserRepository userRepository;

	public RepositoryUserDetailsService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

}
```

Finally, permission evaluators are not supported in WebFlux controllers, but we can accomplish similar functionality by calling out to a bean in the SpEL expression and passing the Authentication object:

```
Copy@GetMapping("/{bookStoreId}")
@PreAuthorize("hasAnyRole('ROLE_FULL_ACCESS','ROLE_READ_ONLY') and
@bookStoreIdEvaluator.canAccessBookstore(authentication, #bookStoreId)")
public Mono<ResponseEntity<BookStoreResource>> getBooks(
	@PathVariable String bookStoreId) {
	return bookStoreService.getBookStore(bookStoreId)
			.flatMap(this::createResponse);
}
```

In this example, the authority is parsed to determine the presence of the book store ID:

```
Copypublic boolean canAccessBookstore(Authentication authentication,
		String bookStoreId) {
	return authentication.getAuthorities().stream()
			.filter(authority -> authority.getAuthority()
					.startsWith(BOOK_STORE_ID_PREFIX))
			.map(authority -> {
				String serviceInstanceId = authority.getAuthority()
						.substring(BOOK_STORE_ID_PREFIX.length());
				return serviceInstanceId.equals(bookStoreId);
			})
			.findFirst()
			.orElse(true);
}
```

### [](#spring-hateoas-10)[](#spring-hateoas-1-0)Spring HATEOAS 1.0

[Spring HATEOAS](https://spring.io/projects/spring-hateoas) 1.0 GA was recently released and includes Reactive support for link creation and representation modeling.

Include the Spring HATEOAS starter in order to active the Spring Boot auto-configuration. Because we are building a Reactive Spring WebFlux application, we need to exclude the Spring Web starter:

```
Copyimplementation('org.springframework.boot:spring-boot-starter-hateoas') {
		exclude group: 'org.springframework.boot', module: 'spring-boot-starter-web'
}
```

Next, you can use the `WebFluxLinkBuilder` to assemble Hypermedia resources:

```
Copypublic Mono<BookResource> toModel(Book book, String bookStoreId) {
		return Mono.just(new BookResource(book))
				.flatMap(bookResource -> linkTo(methodOn(
					BookController.class).getBook(bookStoreId, book.getId()))
						.withSelfRel()
						.toMono()
						.flatMap(link -> Mono.just(bookResource.add(link)))
						.thenReturn(bookResource));
	}
```

Then you can use that resource in the response body from the controller:

```
Copyreturn new BookStoreResourceAssembler().toModel(bookStore)
		.flatMap(bookStoreResource -> Mono.just(new ResponseEntity<>(bookStoreResource, HttpStatus.OK)));
```

### [](#spring-framework-52)[](#spring-framework-5-2)Spring Framework 5.2

[Spring Framework](https://spring.io/projects/spring-framework) 5 originally offered Reactive support in the new Spring WebFlux web framework. Additionally, the new `WebClient` and `WebTestClient` include support for consuming and testing Spring WebFlux applications.

To make use of these, simply include Spring Boot starters:

```
Copyimplementation('org.springframework.boot:spring-boot-starter-webflux')
testImplementation('org.springframework.boot:spring-boot-starter-test') {
	exclude group: 'org.junit.vintage', module: 'junit-vintage-engine'
}
```

For example, use the `WebTestClient` to verify conroller functionality:

```
Copythis.client.get().uri("/bookstores/{bookStoreId}", bookStoreId)
		.accept(MediaType.APPLICATION_JSON)
		.exchange()
		.expectStatus().isEqualTo(HttpStatus.OK);
```

### [](#spring-boot-22)[](#spring-boot-2-2)Spring Boot 2.2

[Spring Boot](https://spring.io/projects/spring-boot) brings all of these projects together by offering auto-configuration for the Reactive support in Spring WebFlux, Spring Data, Spring Security, Spring HATEOAS, as well as the testing facilities. In many cases an implementation requires only to include the specific Spring Boot Starters or related dependencies in order to activate the functionality.

### [](#conclusion)[](#conclusion)Conclusion

This post includes a brief introduction into the Reactive support in some of the Spring projects. As the wider Spring portfolio continues to adopt and support Reactive APIs, developers will gain more choice in whether to use imperative or reactive style programming in their applications. Additionally, this sample app demonstrates only a subset of the Spring projects that now offer Reactive support. Look for more in the future! If you have questions or issues with a specific Spring project, then please contact the maintainers on the relevant project GitHub page.