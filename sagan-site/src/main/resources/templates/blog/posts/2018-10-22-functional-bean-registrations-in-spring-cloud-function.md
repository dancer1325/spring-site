---
title: Functional Bean Registrations in Spring Cloud Function
source: https://spring.io/blog/2018/10/22/functional-bean-registrations-in-spring-cloud-function
scraped: 2026-02-23T14:54:54.383Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Dave Syer |  October 22, 2018 | 7 Comments
---

# Functional Bean Registrations in Spring Cloud Function

_Engineering | Dave Syer |  October 22, 2018 | 7 Comments_

[Spring Cloud Function](https://github.com/spring-cloud/spring-cloud-function) has a couple of new features in 2.0 (still in milestone phase), and possibly the most dramatic is the ability to go "fully functional". This is made possible by changes in Spring Boot 2.1 together with Spring Framework 5.1, and it means a different way of thinking about bean definitions in Spring applications, but also significant improvements in startup performance.

## [](#aws-cost-savings)[](#aws-cost-savings)AWS Cost Savings

It’s always good to start with a picture, especially if it tells a story. Here’s a graph that shows the improvement in Spring Cloud Function 2.0 over 1.0, comparing the cost of cold starts in AWS:

![Memory Cost](https://docs.google.com/spreadsheets/d/e/2PACX-1vQRWYdp_BpzQg7nA9P7xi9bjTapxu6cYrLi7PFvBmnnKM2zCuVuYzAh25KpFuz0hX0fqJyo1nJO5fyN/pubchart?oid=459598255&format=image)

The x-axis is memory in MB, and the y-axis is cost of a cold start in GBsec. The most dramatic effect is for low memory containers, where the cost is almost 4 times lower with 2.0. The "Custom" function is even faster (10x over Spring Cloud Function 1.0) - it’s a [custom AWS runtime](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-custom.html) using Spring Cloud Function with functional beans. The origin of the improvement is in dramatically shorter startup times, which in turn come from using the functional form of bean definitions in the application. Josh made a [video](https://www.youtube.com/watch?v=Q_P28p7XsbQ) about functional bean registration a while ago if you need an introduction (it’s on YouTube). Now let’s have a closer look at how it works in Spring Cloud Function.

## [](#comparing-functional-with-traditional-bean-definitions)[](#comparing-functional-with-traditional-bean-definitions)Comparing Functional with Traditional Bean Definitions

Here’s a Spring Cloud Function application from version 1.0, with the familiar `@Configuration` and `@Bean` declaration style:

```
Copy@SpringBootApplication
public class DemoApplication {

  @Bean
  public Function<String, String> uppercase() {
    return value -> value.toUpperCase();
  }

  public static void main(String[] args) {
    SpringApplication.run(DemoApplication.class, args);
  }

}
```

You can run it in AWS Lambda (for instance) by jarring it up with all its dependencies and uploading it to Amazon. There is also support for [Azure Functions](https://azure.microsoft.com/en-gb/services/functions) and [Apache OpenWhisk](https://openwhisk.apache.org/) in the project. Other serverless providers, e.g. [Oracle Fn](https://fnproject.io/) and [Riff](https://projectriff.io/), maintain their own bindings.

You can also run the app above in its own HTTP server just by including `spring-cloud-function-starter-web` on the classpath. Running the main method would expose an endpoint that you can use to ping that `uppercase` function:

```
Copy$ curl localhost:8080 -d foo
FOO
```

The web adapter in 1.0 was implemented using Spring MVC, so you needed a Servlet container. In Spring Cloud Function 2.0 you can also use Webflux and the default server is netty (even though you can still use Servlet containers if you want to) - just include the `spring-cloud-starter-function-webflux` dependency instead. The functionality is the same, and the user application code can be used in both.

In 2.0 though, the user application code can be recast into "functional" form, like this:

```
Copy@SpringBootConfiguration
public class DemoApplication
    implements ApplicationContextInitializer<GenericApplicationContext> {

  public static void main(String[] args) {
    FunctionalSpringApplication.run(DemoApplication.class, args);
  }

  public Function<String, String> uppercase() {
    return value -> value.toUpperCase();
  }

  @Override
  public void initialize(GenericApplicationContext context) {
    context.registerBean("demo", FunctionRegistration.class,
        () -> new FunctionRegistration<>(uppercase())
            .type(FunctionType.from(String.class).to(String.class)));
  }

}
```

The main differences are:

-   The main class is an `ApplicationContextInitializer`.
    
-   The `@Bean` methods have been converted to calls to `context.registerBean()`
    
-   The `@SpringBootApplication` has been replaced with `@SpringBootConfiguration` to signify that we are not enabling Spring Boot autoconfiguration, and yet still marking the class as an "entry point".
    
-   The `SpringApplication` from Spring Boot has been replaced with a `FunctionalSpringApplication` from Spring Cloud Function (it’s a subclass).
    

The business logic beans that you register in a Spring Cloud Function app are of type `FunctionRegistration`. This is a wrapper that contains both the function and information about the input and output types. In the `@Bean` form of the application that information can be derived reflectively, but in a functional bean registration some of it is lost unless we use a `FunctionRegistration`.

An alternative to using an `ApplicationContextInitializer` and `FunctionRegistration` is to make the application itself implement `Function` (or `Consumer` or `Supplier`). Example (equivalent to the above):

```
Copy@SpringBootConfiguration
public class DemoApplication implements Function<String, String> {

  public static void main(String[] args) {
    FunctionalSpringApplication.run(DemoApplication.class, args);
  }

  @Override
  public String apply(String value) {
    return value.toUpperCase();
  }

}
```

It would also work to add a separate, standalone class of type `Function` and register it with the `SpringApplication` using an alternative form of the `run()` method. The main thing is that the generic type information is available at runtime through the class declaration.

The app runs in its own HTTP server if you add `spring-cloud-starter-function-webflux` (it won’t work with the MVC starter at the moment because the functional form of the embedded Servlet container hasn’t been implemented). The app also runs just fine in AWS Lambda or Azure Functions, and the improvements in startup time are dramatic (as shown in the graph above). Here are the startup times in another graph (startup time in seconds on the y-axis):

![Memory Startup Time](https://docs.google.com/spreadsheets/d/e/2PACX-1vQRWYdp_BpzQg7nA9P7xi9bjTapxu6cYrLi7PFvBmnnKM2zCuVuYzAh25KpFuz0hX0fqJyo1nJO5fyN/pubchart?oid=1202364356&format=image)

## [](#testing-functional-applications)[](#testing-functional-applications)Testing Functional Applications

Spring Cloud Function 2.0 also has some utilities for integration testing that will be very familiar to Spring Boot users. For example, here is an integration test for the HTTP server wrapping the app above:

```
Copy@RunWith(SpringRunner.class)
@FunctionalSpringBootTest
@AutoConfigureWebTestClient
public class FunctionalTests {

	@Autowired
	private WebTestClient client;

	@Test
	public void words() throws Exception {
		client.post().uri("/").body(Mono.just("foo"), String.class)
                    .exchange().expectStatus().isOk()
                          .expectBody(String.class).isEqualTo("FOO");
	}

}
```

This test is almost identical to the one you would write for the `@Bean` version of the same app - the only difference is the `@FunctionalSpringBootTest` annotation, instead of the regular `@SpringBootTest`. All the other pieces, like the `@Autowired` `WebTestClient`, are standard Spring Boot features.

## [](#functional-bean-definitions-in-mainstream-spring-boot-applications)[](#functional-bean-definitions-in-mainstream-spring-boot-applications)Functional Bean Definitions in Mainstream Spring Boot Applications

Spring Boot works just fine with functional bean registrations - Spring Cloud Function builds and runs on Spring Boot - but some of the most useful features in Spring Boot, the autoconfigurations, are all coded in the non-functional style. Most Spring Cloud Function apps have a relatively small scope compared to the whole of Spring Boot, so we are able to adapt it to these functional bean definitions easily. If you step outside that limited scope, you can extend your Spring Cloud Function app by switching back to `@Bean` style configuration, or by using a hybrid approach. It will take a little longer to extend the same kind of features to the rest of the Spring Boot ecosystem, but it is something we are working on quite actively. Please take Spring Cloud Function 2.0 for a spin and provide us with some feedback if you have a moment - the GA release will be coming soon.