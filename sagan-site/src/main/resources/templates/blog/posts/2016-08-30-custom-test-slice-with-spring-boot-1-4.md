---
title: Custom test slice with Spring Boot 1.4
source: https://spring.io/blog/2016/08/30/custom-test-slice-with-spring-boot-1-4
scraped: 2026-02-23T19:06:25.015Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Stéphane Nicoll |  August 30, 2016 | 16 Comments
---

# Custom test slice with Spring Boot 1.4

_Engineering | Stéphane Nicoll |  August 30, 2016 | 16 Comments_

Spring Boot 1.4 includes a major overhaul of testing support and one of these features is *test slicing*. I'd like to take the opportunity in this blog post to further explain what it is and how you can easily create your own slices.

Test slicing is about segmenting the `ApplicationContext` that is created for your test. Typically, if you want to test a controller using `MockMvc`, surely you don't want to bother with the data layer. Instead you'd probably want to *mock* the service that your controller uses and validate that all the web-related interaction works as expected. This can be summarized in the example below:

```java
Copy@RunWith(SpringRunner.class)
@WebMvcTest(UserVehicleController.class)
public class UserVehicleControllerTests {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private UserVehicleService userVehicleService;

    @Test
    public void testExample() throws Exception {
        given(this.userVehicleService.getVehicleDetails("sboot"))
                .willReturn(new VehicleDetails("Honda", "Civic"));
        this.mvc.perform(get("/sboot/vehicle").accept(MediaType.TEXT_PLAIN))
                .andExpect(status().isOk()).andExpect(content().string("Honda Civic"));
    }

}
```

`@WebMvcTest` is the web test slice in Spring Boot 1.4. When it is present, you instruct Spring Boot that a web environment is required and that only the specified controller(s) should be instantiated. Because it knows about the nature of the test, it can take additional smart decisions for you (e.g. auto-configure `MockMvc` so that all that's left is to inject it). Also, your controller has a dependency towards `UserVehicleService` so starting the context would lead to a failure because the `ApplicationContext` doesn't know about it (remember, only the web infrastructure and `UserVehicleController` are known). `@MockBean` is used here to register a `UserVehicleService` mock so that it can be transparently injected in the controller.

Let's now have a look to the implementation to better understand how Spring Boot manages this for you. Our first stop is `@WebMvcTest` (removing `@Target` and friends for brievety):

```java
Copy@BootstrapWith(WebMvcTestContextBootstrapper.class)
@OverrideAutoConfiguration(enabled = false)
@TypeExcludeFilters(WebMvcTypeExcludeFilter.class)
@AutoConfigureCache
@AutoConfigureWebMvc
@AutoConfigureMockMvc
@ImportAutoConfiguration
public @interface WebMvcTest { ... }
```

This declaration can be split in 3 areas:

-   Auto-configuration customizations
-   Classpath scanning tuning
-   Test bootstrap

## [](#auto-configuration-customizations)Auto-configuration customizations

Spring Boot 1.4 now defines a `spring-boot-test-autoconfigure` module that provides a collection of test-related auto-configurations. These auto-configurations are composable and can help you crafting your own infrastructure easily.

Back to `@WebMvcTest`, the first thing we want to do is to disable the default auto-configuration: `OverrideAutoConfiguration` does that. Because the default auto-configuration is now disabled, you have to opt-in for the relevant auto-configurations you want to include. The three `AutoConfigure` annotations do that for us: they make sure that a web environment is available, `MockMvc` is configured and a no-op cache manager is available. Let's have a look to an excerpt of `AutoconfigureMockMvc`:

```java
Copy@ImportAutoConfiguration
@PropertyMapping("spring.test.mockmvc")
public @interface AutoConfigureMockMvc {

    boolean addFilters() default true;

    @PropertyMapping("webclient.enabled")
    boolean webClientEnabled() default true;

    ...
}
```

`@ImportAutoConfiguration` is an annotation that lists the auto-configurations that should be included. Alternatively, you can provide the list in `META-INF/spring.factories` using the fully qualified name of the annotation for the key. This is what's defined for `AutoConfigureMockMvc`:

```
Copyorg.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc=\
org.s.boot.test.autoconfigure.web.servlet.MockMvcAutoConfiguration,\
org.s.boot.test.autoconfigure.web.servlet.MockMvcSecurityAutoConfiguration,\
org.s.boot.test.autoconfigure.web.servlet.MockMvcWebClientAutoConfiguration,\
org.s.boot.test.autoconfigure.web.servlet.MockMvcWebDriverAutoConfiguration
```

You get the idea: each annotation brings some auto-configurations and you can compose them any way you want. You'll notice that `WebMvcTest` has also a `ImportAutoConfiguration` but there's no entry in `spring.factories` for it. Spring Boot will scan all `spring.factories` in the classpath and *merge* the content if necessary. If a module of yours wants to add additional behaviour to `@WebMvcTest` (or `@AutoConfigureMockMvc`), all that's required is to create a `META-INF/spring.factories` and register additional auto-configuration classes. You can also use `@AutoconfigureBefore` and `@AutoconfigureAfter` to order them.

Test auto-configurations are configurable as usual: the `@PropertyMapping` annotation at class-level maps the attributes of the annotation to the `Environment` so that the auto-configuration code can extract the value and adapt the configuration accordingly. We can see the `webClientEnabled` attribute above is transparently used in the auto-configuration:

```java
Copy@ConditionalOnProperty(prefix = "spring.test.mockmvc.webclient", 
        name = "enabled", matchIfMissing = true)
public class MockMvcWebClientAutoConfiguration { ... }
```

## [](#classpath-scanning-tuning)Classpath scanning tuning

`TypeExcludeFilters` is a way to tune classpath scanning. In the case of `@WebMvcTest` we're only going to [include certain web-related components](https://github.com/spring-projects/spring-boot/blob/bbc91cc03f5df31c1985811d07abe4f9a906355e/spring-boot-test-autoconfigure/src/main/java/org/springframework/boot/test/autoconfigure/web/servlet/WebMvcTypeExcludeFilter.java) and ignore all the rest. This is quite powerful as you can use classpath scanning the usual way and only include what's required for your slice.

## [](#test-bootstrap)Test bootstrap

Finally, the new test bootstrap makes sure to identify the `@SpringBootApplication` annotated class in your project (unless one is specified). This is a nice default as you don't have to specify it anymore and classpath scanning will be right *by default*.

## [](#creating-your-own-slice)Creating your own slice

Based on this knowledge, creating your own slice is actually pretty easy. An example of such slice could be a new `DataJdbcTest`, a slice similar to `DataJpaTest` that only configures `JdbcTemplate` and does not use JPA. If you want to play with the code right the way, check the [github repository](https://github.com/snicoll-scratches/demo-data-jdbc-test) for more details.

Our first step is to create `@AutoconfigureDataJdbc`

```java
Copypackage com.example.test.autoconfigure.jdbc;

import java.lang.annotation.*;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@ImportAutoConfiguration
public @interface AutoconfigureDataJdbc {
}
```

and register the relevant auto-configurations to apply when this annotation is present. Again, create a `META-INF/spring.factories` resource:

```
Copycom.example.test.autoconfigure.jdbc.AutoconfigureDataJdbc=\
org.s.boot.autoconfigure.flyway.FlywayAutoConfiguration,\
org.s.boot.autoconfigure.jdbc.DataSourceAutoConfiguration,\
org.s.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration,\
org.s.boot.autoconfigure.jdbc.JdbcTemplateAutoConfiguration,\
org.s.boot.autoconfigure.liquibase.LiquibaseAutoConfiguration,\
org.s.boot.autoconfigure.transaction.TransactionAutoConfiguration
```

Once that reusable infrastructure is in place, you can create your test slice and simply specify that you need a database and jdbc:

```java
Copy@BootstrapWith(SpringBootTestContextBootstrapper.class)
@OverrideAutoConfiguration(enabled = false)
@TypeExcludeFilters(DataJdbcTypeExcludeFilter.class)
@Transactional
@AutoConfigureCache
@AutoconfigureDataJdbc
@AutoConfigureTestDatabase
@ImportAutoConfiguration
public @interface DataJdbcTest { }
```

[`DataJdbcTypeExcludeFilter`](https://github.com/snicoll-scratches/demo-data-jdbc-test/blob/d0c0eaaecfc048a7543a86f3e9c91804eabad6e0/src/main/java/com/example/test/autoconfigure/jdbc/DataJdbcTypeExcludeFilter.java#L13) makes sure to exclude all your other services as such test shouldn't require any of your beans by default. It could be improve to allow services to be defined as a parameter of the annotation, pretty much like `WebMvcTest` adds specified controller(s).

Once you've done that, you only need to add your annotation and your `JdbcTemplate` is auto-configured for you with a test database:

```java
Copy@RunWith(SpringRunner.class)
@DataJdbcTest
public class DataJdbcSampleTests {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    ...
}
```

## [](#summary)Summary

Spring Boot 1.4 brings auto-configuration to your tests and allows you to easily compose your own test annotations. In this article we've seen how `WebMvcTest` works and how you could create your own "jdbc" slice. We're actually [considering adding that annotation in the next release](https://github.com/spring-projects/spring-boot/issues/6563) so please [keep the feedback coming](gitter.im/spring-projects/spring-boot)!