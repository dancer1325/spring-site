---
title: Spring Framework 6.2.0-M1: Overriding Beans in Tests
source: https://spring.io/blog/2024/04/16/spring-framework-6-2-0-m1-overriding-beans-in-tests
scraped: 2026-02-23T08:42:27.630Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Simon Baslé |  April 16, 2024 | 6 Comments
---

# Spring Framework 6.2.0-M1: Overriding Beans in Tests

_Engineering | Simon Baslé |  April 16, 2024 | 6 Comments_

Spring Framework `6.2.0-M1` has been released, including changes that resolve more than one hundred issues. Among those are a range of new features in Spring's testing support.

In this post, I’d like to walk you through one of these new testing features: Bean Overriding support.

# [](#the-previous-state-of-affairs)The previous state of affairs

Using the Spring TestContext Framework, you can easily verify the correct wiring of your Spring application within integration tests using an annotation-driven model.

In unit testing, dependency injection and Spring design principles make your code less dependent on the container and make it easier to manually stub or mock dependencies of a component in order to test it in isolation. In integration testing this is less relevant, as the tests intend to cover the correct wiring of the components. Though you may find cases where where you need to replace a bean in integration tests.

The Spring Framework team doesn't generally recommend redefining beans. Although this is currently possible in the default implementation of `BeanDefinitionRegistry` via a flag, we plan on deprecating it and Spring Boot already opts out by turning bean overriding off by default.

However, this is more of a concern in production code and we recognize that overriding a bean in a test is useful and legitimate. As a result, we aim to have first-class arrangements for common overriding scenarios in that space.

In Spring Framework `6.2.0-M1`, we introduce an extensible bean overriding feature that will allow you to precisely and explicitly replace one or more bean definitions in integration tests while guarding against such unintended changes in production code or in other parts of your tests.

# [](#simple-method-based-overriding-with-testbean)Simple method-based overriding with `@TestBean`

The Spring TestContext Framework now comes with a simple implementation of Bean Overriding support: the `@TestBean` annotation.

Overriding a bean named `example` is done in three steps: adding a field named after the bean, annotating it with `@TestBean`, and adding a 0-argument `static` factory method named `exampleTestOverride`. In that factory method you could for instance return a simplified implementation if the bean type is an interface, like in the following example:

```
Copy@Configuration
class ProdConfiguration {

  @Bean
  MyService customService() {
    return new ProdServiceImpl();
  }
}

@SpringJUnitConfig
class MyServiceIntegrationTests {

  @TestBean
  MyService customService;

  static MyService customServiceTestOverride() {
    return new SimplifiedServiceImpl();
  }

  @Test
  void test(ApplicationContext context) {
    assertThat(context.getBean("customService")
      .isSameAs(this.customService)
      .isInstanceOf(SimplifiedServiceImpl.class);
    //...
  }
}
```

The annotated field's name is interpreted to be the target bean's name unless a `beanName` attribute is provided to the `@TestBean` annotation.

The `methodName` parameter can also be used to point to a factory method which doesn't follow the default naming convention of `{beanName}TestOverride`.

The Bean Overriding mechanism is responsible for parsing this annotation and for replacing the existing bean definition in the registry. The `customService` field in the test class is also injected with the overriding instance produced by the `customServiceTestOverride` factory method.

# [](#mockito-based-overriding-with-mockitobean-and-mockitospybean)Mockito-based overriding with `@MockitoBean` and `@MockitoSpyBean`

This second bean overriding implementation is based on the [Mockito](https://site.mockito.org/) library. It comes with two annotations: `@MockitoBean` for automatically replacing the targeted singleton bean with a mock and `@MockitoSpyBean` to wrap the bean in a spy instead.

Each of these annotations has attributes that are specific to Mockito in order to further configure how the target bean should be mocked. This includes support for specifying how the mocks should be reset between tests, as demonstrated in the following example:

```
Copy@Configuration
class ProdConfiguration {

  @Bean
  MyService customService() {
    return new ProdService();
  }
}

@SpringJUnitConfig
class MyServiceIntegrationTests {

  @MockitoSpyBean(reset = MockReset.NONE)
  MyService customService;

  @Test
  void test() {
    //...
  }
}
```

In the above example, the spy will *not* be reset between tests. By default, mocks and spies are reset *after* a test method runs.

Note that in order to spy on a bean, an actual instance of the spied class must exist in the first place. The Bean Overriding feature supports this special case and allows to create the override from the metadata once a bean is instantiated, in addition to the more common case of replacing the bean definition.

# [](#extending-with-your-own-implementation)Extending with your own implementation

The new Bean Overriding in Test support comes in the shape of an annotation-based model applicable to fields in your test classes. It is extensible and customizable, and the 3 annotations introduced above are just the default implementations that we provide out of the box.

Implementing your own flavor of Bean Overriding is as easy as implementing the following:

-   An annotation that is meta-annotated with `@BeanOverride` which defines the `BeanOverrideProcessor` to use.
-   The `BeanOverrideProcessor` implementation itself.
-   One or more concrete `OverrideMetadata` implementations provided by the processor.

The Spring TestContext Framework parses test classes looking for any field meta-annotated with `@BeanOverride` and instantiates the relevant `BeanOverrideProcessor` in order to register an instance of `OverrideMetadata`.

A `BeanFactoryPostProcessor` will then use that information to alter the context, registering and replacing bean definitions as defined by each metadata.

# [](#conclusion)Conclusion

The Spring TestContext Framework now provides two means of overriding beans in tests without the risk of unintended side effects. The bean overriding mechanism is extensible, which can come in handy, for example, if you prefer to use a mocking library other than Mockito.

We look forward to community feedback on this feature, including suggestions for improvement on this first iteration.

In the meantime, happy coding!