---
title: Spring Framework 6.2.0-M1: all the little things
source: https://spring.io/blog/2024/04/11/spring-framework-6-2-0-m1-all-the-little-things
scraped: 2026-02-23T08:42:20.458Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Stéphane Nicoll |  April 11, 2024 | 5 Comments
---

# Spring Framework 6.2.0-M1: all the little things

_Engineering | Stéphane Nicoll |  April 11, 2024 | 5 Comments_

The Spring Framework team has been busy reviewing the issue tracker in anger and reducing the number of opened issues. This was long overdue, with a number of issues being invalid or superseded in the meantime. This helped the team focusing on a more manageable amount of issues and we used the opportunity to look at long standing issues that we haven’t had the time to address yet.

In this post, I’d like to walk you through a collection of those relatively small issues, sometimes highly voted, that are finally available in this milestone.

## [](#support-for-escaping-property-placeholders)Support for escaping property placeholders

Property placeholders are a way to replace a property from the environment in an arbitrary String. Assuming that `customer.name` is set to "John Smith" in the `Environment`, "Customer ${customer.name}" would resolve to "Customer John Smith".

There are corner cases where you’d like to retain the original value rather than having it resolved. [An issue](https://github.com/spring-projects/spring-framework/issues/9628) was created in 2008 with quite a bit of votes. Spring Framework `6.2.0-M1` allows you to escape a placeholder using a configurable escape character (backslash by default). Taking our previous example, "Customer \\${customer.name}" resolves now to "Customer ${customer.name}".

This looks like an innocent change, why did it take us so long to fix it?! It turns out we had to rewrite the parser from scratch, which has other positive side effects: default values are now lazily resolved and the exception message provides the chain of resolutions when resolving nested placeholders.

## [](#support-for-fallback-beans)Support for fallback beans

This [highly voted issue](https://github.com/spring-projects/spring-framework/issues/26241) has also been resolved and gives you more control when crafting configuration that may require a fallback bean. A fallback bean is used if no bean of that type has been provided. This is essentially a companion of `@Primary` without the trade-off of having to specify it.

Consider that a component requires `MyService` to be defined. You can provide a default implementation for the service but you’d like that if a user specifies one, it can be injected by type transparently. So far, the user had to configure their specific bean with `@Primary` to make sure it is used, since two beans of that type are defined now.

As of Spring Framework `6.2.0-M1` you can craft your configuration with `@Fallback`:

```java
Copy@Configuration
class MyConfiguration {

	@Bean
	MyComponent myComponent(MyService service) {
    	...
	}

	@Bean
	@Fallback
	MyService defaultMyService() {
    	...
	}

}
```

As you can guess, if no other `MyService` bean is defined, `defaultMyService` is used. Otherwise, the container will pick transparently the one that’s been defined externally.

## [](#bean-background-initialization)Bean Background Initialization

One of the most voted issues ever is [also resolved](https://github.com/spring-projects/spring-framework/issues/13410) in this milestone. Individual beans can be initialized in the background using the newly introduced `bootstrap` attribute.

```java
Copy@Configuration
class MyConfiguration {

    @Bean(bootstrap = BACKGROUND)
    MyExpensiveComponent myComponent() {
   	 ...
    }

}
```

Check the [reference guide](https://docs.spring.io/spring-framework/reference/6.2/core/beans/java/composing-configuration-classes.html#beans-java-startup-background) for more details about this new feature.

## [](#taskdecorator-support-for-scheduled-tasks)TaskDecorator support for scheduled tasks

Spring Framework `6.2.0-M1` allows using `TaskDecorator` for scheduled tasks as well, harmonizing task execution and scheduling in the process. See the [related issue](https://github.com/spring-projects/spring-framework/issues/23755) for more details.

## [](#assertj-support-for-mockmvc)AssertJ support for MockMvc

We love [AssertJ](https://assertj.github.io/doc/)! While Spring Boot has already jumped on that train a while ago and provides several testing facilities using it, the framework team has been more conservative. At the same time, [we recognize](https://github.com/spring-projects/spring-framework/issues/21178) that our Hamcrest support may not fit everyone’s needs: the use of static imports make the API less discoverable and writing custom assertions is harder.

Spring Framework `6.2.0-M1` provides an exhaustive support for testing your web application with MockMvc and AssertJ.

Building an `AssertableMockMvc` instance is more straightforward, with dedicated factory methods on the class itself. If you have a `WebApplicationContext` handy, this is as easy as `AssertableMockMvc.from(webApplicationContext)`. If you want to test only a controller in a unit test, you can do so as follows:

```java
CopyAssertableMockMvc mvc = AssertableMockMvc.of(List.of(new HelloController()), builder ->
    	builder.defaultRequest(get("/hello").accept(MediaType.APPLICATION_JSON)).build());
```

Once you have an instance you can perform your usual requests and wrap that in AssertJ’s standard `assertThat`:

```java
CopyassertThat(mvc.perform(get("/vehicle/{id}", "12").accept(MediaType.TEXT_PLAIN))).hasStatusOk()
    	.body().isEqualTo("Honda Civic");
```

This first milestone covers the same features as the existing Hamcrest matchers, and extend it with advanced JSON support, for instance:

```java
CopyassertThat(perform(get("/message"))).body().json()
    	.isLenientlyEqualTo(new ClassPathResource("samples/message.json"));
```

This is the first cut of the API and we expect community feedback to improve it.

## [](#there-is-more)There is more!

With more than [one hundred issues resolved](https://github.com/spring-projects/spring-framework/releases/tag/v6.2.0-M1), Spring Framework `6.2.0-M1` is packed with enhancements, expect more information in the coming weeks from us.

Until there is a Spring Boot 3.4 snapshot that is built against it, you’ll have to override the `spring-framework.version` to the milestone. Please give that a try and let us know how it goes.

Happy coding!