---
title: Bootiful Spring Boot 3.4: Spring Framework
source: https://spring.io/blog/2024/11/24/bootiful-34-framework
scraped: 2026-02-23T08:03:03.070Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  November 24, 2024 | 0 Comments
---

# Bootiful Spring Boot 3.4: Spring Framework

_Engineering | Josh Long |  November 24, 2024 | 0 Comments_

The Spring Framework 6.2 release notes provide a much more detailed look at all the new features. I won’t rehash all of them here, but here are some of the features that caught my eye:

-   Improved generic type safety in auto wiring sorting.
-   Smarter, more optimized Spring Expression Language expressions.
-   More efficient handling of resources in web applications, as well as in the WebJars support.
-   Refinements to Spring’s JMS support and STOMP-over-WebSocket support.
-   Improved testing support with the new HTMLUnit dependency, AssertJ-style `MvcTester` for Spring MVC tests, and much improved mocked beans in tests.
-   Support the concept of `@Fallback` beans, essentially the mirror image of `@Primary` beans.
-   Background bean initialization.
-   Improved binding of data to constructors.
-   Fragment rendering! This one is for you HTMX enjoyers! You can now render multiple views in one request or create a stream of rendered views.
-   @ExceptionHandler improvements to support content negotiation.
-   Refined URL parsing and handling.
-   Easier reflection of non-Spring-managed beans with @Reflective and the new @ReflectiveScan annotation.

I’ve eagerly awaited `@ReflectiveScan`, fragment rendering, the improved testing support, and `@Fallback`. Let’s take a look at some of these in action!

### [](#fallback-beans)`@Fallback` beans

So, let’s say you’ve got two beans of type `Foo`, and you want to inject them somewhere. If you know that you prefer one of them injected over the other, you can specify that that bean is the `@Primary` bean, and Spring will pick it from among the two (or three, or however many) alternatives so long as there is only one `@Primary`. But how do you do the opposite? How do you tell Spring to pick something *only* if nothing else is available? Why would there be a dynamic number of beans, you ask? Suppose you have beans only available when profiles are activated or via `@Conditional` tests. You could designate a bean as being a *fallback* bean; if Spring has no better choice - something not marked with `@Fallback` or something marked as `@Primary` - then it’ll choose the *fallback* bean.

The `@Fallback` algorithm influences the algorithm at *injection* time. So, if you have more than one `Foo`, but want to inject just one, you’ll need to use either `@Primary` or the new `@Fallback`. But this doesn’t change how many beans are available in the `ApplicationContext`. If you inject all instances of `Foo`, (as with `Foo[] foos` or `Map<String,Foo> beansByNameAndInstance`), then that will reflect all the instances, including those marked with `@Primary`, `@Fallback`, etc.

An example:

```java
Copypackage com.example.bootiful_34.framework;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Fallback;
import org.springframework.context.annotation.Primary;

@Configuration
class FallbackDemoConfiguration {

	@Bean
	@Fallback
	DefaultNoOpMessageProvider defaultNoOpFoo() {
		return new DefaultNoOpMessageProvider();
	}

	@Bean
	SimpleMessageProvider foo() {
		return new SimpleMessageProvider();
	}

	@Bean
	@Primary
	SophisticatedMessageProvider sophisticatedFoo() {
		return new SophisticatedMessageProvider();
	}

	@Bean
	ApplicationRunner fallbackDemoConfigurationRunner(MessageProvider messageProvider) {
		return args -> System.out.println(messageProvider.message());
	}

}

class DefaultNoOpMessageProvider implements MessageProvider {

	@Override
	public String message() {
		return "default noop implementation";
	}

}

class SimpleMessageProvider implements MessageProvider {

	@Override
	public String message() {
		return "simple implementation";
	}

}

class SophisticatedMessageProvider implements MessageProvider {

	@Override
	public String message() {
		return "\uD83E\uDD14 + \uD83C\uDFA9";
	}

}

```

In this example, there are three beans of type `MessageProvider,` and Spring needs to discriminate among them to choose only one for injection into the `ApplicationRunner.` In this case, Spring would choose the `SophisticatedMessageProvider` as written. Comment out the `SophisticatedMessageProvider` bean definition and add a `@Profile("foo")` to the `SimpleMessageProvider`, and Spring will choose the `DefaultNoOpMessageProvider` instance. Uncomment the `SimpleMessageProvider`, and Spring immediately chooses it again. Nice.

### [](#testing-with-dynamic-properties)Testing with Dynamic Properties

Tests sometimes need different properties in the Spring `Environment` abstraction to vary the behavior supporting the test. So, Spring’s long provided a mechanism - static methods annotated with `@DynamicPropertySource` - by which you can contribute to the Spring `Environment` before Spring’s test support spins up your bean configuration so that it’s correctly configured during your test. Here’s an example of that.

```java
Copypackage com.example.bootiful_34.testing;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;

import static com.example.bootiful_34.testing.Messages.ONE;
import static com.example.bootiful_34.testing.Messages.TWO;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@Import(PropertiesConfiguration.class)
class PropertyTest {

	@DynamicPropertySource
	static void configureProperties(DynamicPropertyRegistry registry) {
		registry.add("dynamic.message.one", () -> ONE);
	}

	@Test
	void properties(@Autowired ApplicationContext ac) {
		var environment = ac.getEnvironment();
		assertEquals(ONE, environment.getProperty("dynamic.message.one"));
		assertEquals(TWO, environment.getProperty("dynamic.message.two"));
	}

}

```

In this class, we contribute the value for `dynamic.message.one` and point it to some static variables defined in `Messages`:

```java
Copypackage com.example.bootiful_34.testing;

class Messages {

	static final String ONE = "this is a first message";

	static final String TWO = "this is a second message";

}

```

But what about `dynamic.message.two`? That’s defined using the *new* thing:

```java
Copypackage com.example.bootiful_34.testing;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.DynamicPropertyRegistrar;
import org.springframework.test.context.DynamicPropertyRegistry;

import static com.example.bootiful_34.testing.Messages.TWO;

@TestConfiguration
class PropertiesConfiguration {

	@Bean
	SimplePropertyRegistrar simplePropertyRegistrar() {
		return new SimplePropertyRegistrar();
	}

	static class SimplePropertyRegistrar implements DynamicPropertyRegistrar {

		@Override
		public void accept(DynamicPropertyRegistry registry) {
			registry.add("dynamic.message.two", () -> TWO);
		}

	}

}

```

Isn’t that nice? Any bean registered in the test context that implements `DynamicPropertyRegistrar` can contribute values to the test context’s `Environment`. Simple and elegant.

### [](#assertj-compatible-mockmvc-tests-and-more-ingenious-bean-substitution)AssertJ compatible `MockMvc` tests and more ingenious bean substitution

I love Spring’s `MockMvc` class, which lets me easily test - with a fluent DSL, no less - a given Spring MVC HTTP endpoint. However, it was always a bit of a drag that it didn’t feel like, or work with, AssertJ, and its DSL was more fluid. These tests felt like islands in a sea of AssertJ tests. But that’s changed now. Introducing the `MockMvcTester`!

```java
Copypackage com.example.bootiful_34.testing;

import com.example.bootiful_34.framework.MessageProvider;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.test.context.DynamicPropertyRegistrar;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.context.bean.override.convention.TestBean;
import org.springframework.test.web.servlet.assertj.MockMvcTester;
import org.springframework.web.context.WebApplicationContext;

@SpringBootTest
@SuppressWarnings("unused")
class GreetingsControllerTest {

	private static final String TEST_MESSAGE = "this is a first message";

	private final MockMvcTester mockMvc;

	@TestBean
	private MessageProvider messageProvider;

	GreetingsControllerTest(@Autowired WebApplicationContext wac) {
		this.mockMvc = MockMvcTester.from(wac);
	}

	static MessageProvider messageProvider() {
		return () -> TEST_MESSAGE;
	}

	@Test
	void message() throws Exception {
		var mvcTestResult = this.mockMvc.get().uri("/hello").accept(MediaType.APPLICATION_JSON).exchange();
		Assertions.assertThat(mvcTestResult.getResponse().getContentAsString()).contains(TEST_MESSAGE);
	}

}

```

You can create one normally by instantiating and passing in a controller instance directly or initializing it with the `ApplicationContext`. In this example, we take the latter approach.

To make this example cleaner, I also use one - `@TestBean` - of the three new annotations for replacing beans. By the way, these annotations are in Spring Framework and no longer exclusive to Spring Boot! `@TestBean` tells Spring you intend to replace a given bean with another of your specifications. It derives that instance by invoking a `static` method whose name is the same as the field annotated with `@TestBean` in the same class.