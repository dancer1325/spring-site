---
title: @DynamicPropertySource in Spring Framework 5.2.5 and Spring Boot 2.2.6
source: https://spring.io/blog/2020/03/27/dynamicpropertysource-in-spring-framework-5-2-5-and-spring-boot-2-2-6
scraped: 2026-02-23T14:06:19.341Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Andy Wilkinson |  March 27, 2020 | 14 Comments
---

# @DynamicPropertySource in Spring Framework 5.2.5 and Spring Boot 2.2.6

_Engineering | Andy Wilkinson |  March 27, 2020 | 14 Comments_

Recently, when talking about testing Spring Boot applications at Spring IO and SpringOne Platform, I've mentioned [Testcontainers](https://www.testcontainers.org) and [discussed](https://youtu.be/Wpz6b8ZEgcU?t=2077) the boilerplate involved in configuring your tests to use the service running inside the container. I'm delighted to say that, with the [recent Spring Framework 5.2.5 release](https://spring.io/blog/2020/03/24/spring-framework-5-2-5-available-now), that boilerplate is no more.

Prior to the changes that we've just released, your integration test would look similar to the following:

```
Copy@SpringBootTest
@Testcontainers
@ContextConfiguration(initializers = ExampleIntegrationTests.Initializer.class)
class ExampleIntegrationTests {

    @Container
    static Neo4jContainer<?> neo4j = new Neo4jContainer<>();

    static class Initializer implements
            ApplicationContextInitializer<ConfigurableApplicationContext> {

        @Override
        public void initialize(ConfigurableApplicationContext context) {
            TestPropertyValues.of("spring.data.neo4j.uri=" + neo4j.getBoltUrl())
                    .applyTo(context.getEnvironment());
        }

    }

}
```

Here we are using `@ContextConfiguration` to specify an `ApplicationContextInitializer`. The initializer is configuring the `spring.data.neo4j.uri` property with the value of the Neo4j container's bolt URL. This allows Neo4j-related beans in our application to communicate with Neo4j running inside the Testcontainers-managed Docker container.

Thanks to [the changes made in Spring Framework 5.2.5](https://github.com/spring-projects/spring-framework/issues/24540), the use of `@ContextConfiguration` and the `ApplicationContextInitializer` can be replaced with a static `@DynamicPropertySource` method that serves the same purpose. If we make these changes to the integration test class shown above, it now looks like the following:

```
Copy@SpringBootTest
@Testcontainers
class ExampleIntegrationTests {

    @Container
    static Neo4jContainer<?> neo4j = new Neo4jContainer<>();

    @DynamicPropertySource
    static void neo4jProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.data.neo4j.uri", neo4j::getBoltUrl);
    }

}
```

We've reduced the amount of code by a third and the intent is hopefully much clearer as well.

While the new feature was inspired by making Testcontainers easier to use in a Spring Boot integration test, it should be useful in any Spring-based integration test where a property's value isn't known up front. You can learn more about `@DynamicPropertySource` in the [Spring Framework reference documentation](https://docs.spring.io/spring-framework/docs/5.2.5.RELEASE/spring-framework-reference/testing.html#testcontext-ctx-management-dynamic-property-sources).

Happy integration testing!