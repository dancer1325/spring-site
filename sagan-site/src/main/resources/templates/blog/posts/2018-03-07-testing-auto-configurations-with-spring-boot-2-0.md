---
title: Testing auto-configurations with Spring Boot 2.0
source: https://spring.io/blog/2018/03/07/testing-auto-configurations-with-spring-boot-2-0
scraped: 2026-02-23T16:06:21.008Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Madhura Bhave |  March 07, 2018 | 7 Comments
---

# Testing auto-configurations with Spring Boot 2.0

_Engineering | Madhura Bhave |  March 07, 2018 | 7 Comments_

Auto-configuration is one of the most powerful features of Spring Boot. Tests for auto-configuration classes usually follow the same pattern. Most tests start up an `ApplicationContext` with the auto-configuration class under test and depending on the test, also load additional configuration to simulate user behavior. The recurrence of this pattern can add a lot of repetition in the code base.

Spring Boot 2.0 provides a suite of new test helpers for easily configuring an `ApplicationContext` to simulate auto-configuration test scenarios. The following example configures an `ApplicationContextRunner` to test the `UserServiceAutoConfiguration`:

```java
Copyprivate final ApplicationContextRunner contextRunner = new ApplicationContextRunner()
    .withConfiguration(AutoConfigurations.of(UserServiceAutoConfiguration.class));
```

Since most tests in a test class share similar configuration, `ApplicationContextRunner` is best used as a field of the test class that is set up with some common configuration.

Each test can further customize the `ApplicationContext` with the desired configuration and properties.

```java
Copy@Test
public void someTest() {
    this.contextRunner
        .withPropertyValues("user.my.property=test")
	    .withUserConfiguration(MyConfiguration.class)
	    .run(...);
}
```

In addition to invoking `UserServiceAutoConfiguration`, the example above registers `MyConfiguration` and sets the `user.my.property` property to `test`.

`ApplicationContextRunner` transparently replicates the configuration initialization order that Spring Boot uses (scanning user configuration first, then auto-configurations according to their defined order).

There is support for an `AssertableApplicationContext` which provides AssertJ style assertions on an `ApplicationContext`. You can also chain multiple assertions as shown in the following example:

```java
Copy@Test
public void someTest() {
    this.contextRunner.run((context) -> {
        assertThat(context).hasSingleBean(MyBean.class);
        assertThat(context).getBeanNames(UserRule.class).hasSize(2);
    });
}
```

Assertions can also be used on an `ApplicationContext` that has failed to start to check the cause of the failure. Regardless, the lifecycle of the context does not need to be managed by the test anymore, i.e the context is automatically closed.

For tests that require a `WebApplicationContext`, `WebApplicationContextRunner` or `ReactiveWebApplicationContextRunner` can be used.

An auto-configuration can also be affected by the presence of a particular `Class` on the classpath using the `@ConditionalOnClass` annotation. `ApplicationContextRunner` lets you test what happens when a given `Class` is not present at runtime. Spring Boot ships with a `FilteredClassLoader` that can easily be used by the runner. In the following example, we assert that if `UserService` is not present, the auto-configuration is properly disabled:

```java
Copy@Test
public void serviceIsIgnoredIfLibraryIsNotPresent() {
    this.contextRunner
        .withClassLoader(new FilteredClassLoader(UserService.class))
        .run((context) -> assertThat(context)
                .doesNotHaveBean("userService"));
}
```