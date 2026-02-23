---
title: Introducing Spring Cloud Square
source: https://spring.io/blog/2021/04/13/introducing-spring-cloud-square
scraped: 2026-02-23T13:27:10.134Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Olga Maciaszek-Sharma |  April 13, 2021 | 4 Comments
---

# Introducing Spring Cloud Square

_Releases | Olga Maciaszek-Sharma |  April 13, 2021 | 4 Comments_

We are happy to announce that we have released the first publicly available milestone version of the Spring Cloud Square incubator project. The project provides [Spring Cloud LoadBalancer](https://docs.spring.io/spring-cloud-commons/docs/current/reference/html/#spring-cloud-loadbalancer) integration for [OkHttpClient](https://square.github.io/okhttp/) and [Retrofit](https://square.github.io/retrofit/), as well as non-blocking [WebClient](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-webclient)\-backed Retrofit clients. Retrofit is a declarative HTTP client from Square.

You can find more information on how to get started with the project below. You can also check the [project repository](https://github.com/spring-cloud-incubator/spring-cloud-square) and [project documentation](https://spring-cloud-incubator.github.io/spring-cloud-square/docs/current/reference/html/index.html) .

## [](#okhttpclient-spring-cloud-loadbalancer-integration)OkHttpClient Spring Cloud LoadBalancer Integration

An application interceptor is added to the `OkHttpClient` created by auto-configuration. It resolves the scheme, host, and port from Spring Cloud LoadBalancer and rewrites the URL.

To use SC LoadBalancer to resolve and select instances to send requests to, add the `spring-cloud-square-okhttp` dependency to your project:

```xml
Copy<dependency>
		<groupId>org.springframework.cloud</groupId>
		<artifactId>spring-cloud-square-okhttp</artifactId>
		<version>0.4.0-M1</version>
</dependency>
```

Then create a `@LoadBalanced`\-annotated `OkHttpClient.Builder` bean:

```java
Copy@Configuration
class OkHttpClientConfig{
@Bean
@LoadBalanced
public OkHttpClient.Builder okHttpClientBuilder() {
    return new OkHttpClient.Builder();
    }
}
```

Now you can use the `serviceId` or virtual hostname rather than an actual `host:port` in your requests. SC LoadBalancer resolves it by selecting one of available service instances.

```java
CopyRequest request = new Request.Builder()
                        .url("http://serviceId/hello").build();
Response response = builder.build().newCall(request).execute();
```

## [](#retrofit-with-okhttpclient-and-spring-cloud-loadbalancer)Retrofit with OkHttpClient and Spring Cloud LoadBalancer

We also use load-balanced `OkHttpClient` instances to run Retrofit calls.

To use Retrofit with Spring Cloud LoadBalancer-backed `OkHttpClient`, add the `spring-cloud-square-retrofit` and `spring-cloud-square-okhttp` dependencies to your project:

```xml
Copy<dependencies>
    <dependency>
		<groupId>org.springframework.cloud</groupId>
		<artifactId>spring-cloud-square-retrofit</artifactId>
		<version>0.4.0-M1</version>
    </dependency>
    <dependency>
		<groupId>org.springframework.cloud</groupId>
		<artifactId>spring-cloud-square-okhttp</artifactId>
		<version>0.4.0-M1</version>
    </dependency>
</dependencies>
```

Use the `@EnableRetrofitClients` annotation to let us automatically instantiate and inject Retrofit clients for you. Then create a `@LoadBalanced`\-annotated `OkHttpClient.Builder` bean to be used under the hood:

```java
Copy@Configuration
@EnableRetrofitClients
class OkHttpClientConfig {

@Bean
@LoadBalanced
public OkHttpClient.Builder okHttpClientBuilder() {
    return new OkHttpClient.Builder();
    }
}
```

Create a Retrofit client and annotate it with `@RetrofitClient`, passing the `serviceId` of your service as an argument (you can also use the annotation to pass a custom configuration that contains user-crated interceptors for the Retrofit client):

```java
Copy@RetrofitClient("serviceId")
interface HelloClient {
	@GET("/")
	Call<String> hello();
}
```

Make sure to use Retrofit method annotations, such as `@GET("/")`. You can now inject the Retrofit client and use it to run load-balanced calls (using `serviceId` instead of actual `host:port`):

```java
Copyclass AService {

    @Autowired
    HelloClient client;

	public String hello() throws IOException {
		return client.hello().execute().body();
	}
}
```

We created a [full sample for load-balanced-OkHttpClient-based Retrofit clients](https://github.com/spring-cloud-samples/spring-cloud-square-retrofit-web).

## [](#retrofit-with-webclient-and-spring-cloud-loadbalancer)Retrofit with WebClient and Spring Cloud LoadBalancer

We also use adapters to provide WebClient support for Retrofit.

To use Retrofit with a Spring Cloud LoadBalancer-backed `WebClient`, add the `spring-cloud-square-retrofit` and `spring-boot-starter-webflux` starter dependencies to your project:

```xml
Copy<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-webflux</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
	<artifactId>spring-cloud-square-retrofit-webclient</artifactId>
	<version>0.4.0-M1</version>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
	<artifactId>spring-cloud-starter-loadbalancer</artifactId>
    </dependency>
</dependencies>
```

Use the `@EnableRetrofitClients` annotation to let us automatically instantiate and inject Retrofit clients for you. Then create a [`@LoadBalanced`\-annotated `WebClient.Builder` bean](https://docs.spring.io/spring-cloud-commons/docs/current/reference/html/#webclinet-loadbalancer-client) to be used under the hood:

```java
Copy@Configuration
@EnableRetrofitClients
class OkHttpClientConfig {

@Bean
@LoadBalanced
public WebClient.Builder webClientBuilder() {
    return WebClient.builder();
    }
}
```

Create a Retrofit client and annotate it with `@RetrofitClient`, passing the `serviceId` of your service as argument:

```java
Copy@RetrofitClient("serviceId")
interface HelloClient {
	@GET("/")
	Mono<String> hello();
}
```

Make sure to use Retrofit method annotations, such as `@GET("/")`. You can now inject the Retrofit client and use it to run load-balanced calls (using `serviceId` instead of actual `host:port`):

```java
Copyclass AService {

    @Autowired
    HelloClient client;

	public Mono<String> hello() throws IOException {
		return client.hello();
	}
}
```

We created a [full sample for load-balanced-WebClient-based Retrofit clients](https://github.com/spring-cloud-samples/spring-cloud-square-retrofit-webclient).

### [](#note)NOTE:

As the currently available release is a milestone, you need to add the Spring Milestone repository link to your projects for all the examples presented in this blog entry:

```xml
Copy<repositories>
    <repository>
        <id>spring-milestones</id>
        <url>https://repo.spring.io/milestone</url>
    </repository>
</repositories>
```

We recommend using dependency management for other Spring Cloud dependencies:

```xml
Copy<dependencyManagement>
		<dependencies>
			<dependency>
				<groupId>org.springframework.cloud</groupId>
				<artifactId>spring-cloud-dependencies</artifactId>
				<version>${spring-cloud.version}</version>
				<type>pom</type>
				<scope>import</scope>
			</dependency>
		</dependencies>
</dependencyManagement>
```