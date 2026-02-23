---
title: Testing improvements in Spring Boot 1.4
source: https://spring.io/blog/2016/04/15/testing-improvements-in-spring-boot-1-4
scraped: 2026-02-23T19:19:11.573Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Phil Webb |  April 15, 2016 | 79 Comments
---

# Testing improvements in Spring Boot 1.4

_Engineering | Phil Webb |  April 15, 2016 | 79 Comments_

One of the nice things about working for Pivotal is that they have a great agile development division called Pivotal Labs. The teams within Labs are big proponents of Lean and XP software methodologies such as pair programming and test-driven development. Their love of testing has had a particular impact on Spring Boot 1.4 as we've started to get great feedback on things that could be improved. This blog post highlights some of the new testing features that have just landed in the latest M2 release.

## [](#testing-without-spring)Testing without Spring

The easiest way to unit test any Spring `@Component` is to not involve Spring at all! It's always best to try and structure your code so that classes can be instantiated and tested directly. Usually that boils down to a few things:

-   Structure your code with clean separation of concerns so that individual parts can be unit tested. TDD is a good way to achieve this.
-   Use constructor injection to ensure that objects can be instantiated directly. Don't use field injection as it just makes your tests harder to write.

With Spring Framework 4.3 it's very easy to write components that use constructor injections as you no longer need to use `@Autowired`. As long as you have a single constructor, Spring will implicitly consider it an autowire target:

```java
Copy@Component
public class MyComponent {
    
    private final SomeService service;

    public MyComponent(SomeService service) {
        this.service = service;
    }

} 
```

Testing `MyComponent` is now as simple as directly creating it, and calling some methods:

```java
Copy@Test
public void testSomeMethod() {
    SomeService service = mock(SomeService.class);
    MyComponent component = new MyComponent(service);
    // setup mock and class component methods
}
```

## [](#spring-boot-13-recap)Spring Boot 1.3 recap

Of course, often you need to move a little further up the stack and start to write integration tests that *do* involve Spring. Luckily, Spring Framework has the `spring-test` module to help here, unluckily there a lot of different ways to use it with Spring Boot 1.3.

You might be using the `@ContextConfiguration` annotation in combination with `SpringApplicationContextLoader`:

```java
Copy@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes=MyApp.class, loader=SpringApplicationContextLoader.class)
public class MyTest {

    // ...

}
```

You might have chosen `@SpringApplicationConfiguration`:

```java
Copy@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(MyApp.class)
public class MyTest {

    // ...

}
```

You might have combined either of them with `@IntegrationTest`:

```java
Copy@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(MyApp.class)
@IntegrationTest
public class MyTest {

    // ...

}
```

Or with `@WebIntegrationTest` (or possibly `@IntegrationTest` + `@WebAppConfiguration`)

```java
Copy@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(MyApp.class)
@WebIntegrationTest
public class MyTest {

    // ...

}
```

You can also throw into the mix running your server on a random port (`@WebIntegrationTest(randomPort=true)`) and adding properties (using `@IntegrationTest("myprop=myvalue")` or `@TestPropertySource(properties="myprop=myvalue")`)

That's a lot of choice!

## [](#spring-boot-14-simplifications)Spring Boot 1.4 simplifications

With Spring Boot 1.4, things should get simpler. There is a single `@SpringBootTest` annotation to use for regular tests, as well as some specialized variants for testing slices of your application (more on that later).

A typical Spring Boot 1.4 integration test will look like this:

```java
Copy@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT)
public class MyTest {

    // ...
    
}
```

Here's a breakdown of what's happening:

-   `@RunWith(SpringRunner.class)` tells JUnit to run using Spring's testing support. `SpringRunner` is the new name for `SpringJUnit4ClassRunner`, it's just a bit easier on the eye.
-   `@SpringBootTest` is saying "bootstrap with Spring Boot's support" (e.g. load `application.properties` and give me all the Spring Boot goodness)
-   The `webEnvironment` attribute allows specific "web environments" to be configured for the test. You can start tests with a `MOCK` servlet environment or with a real HTTP server running on either a `RANDOM_PORT` or a `DEFINED_PORT`.
-   If we want to load a specific configuration, we can use the `classes` attribute of `@SpringBootTest`. In this example, we've omitted `classes` which means that the test will first attempt to load `@Configuration` from any inner-classes, and if that fails, it will search for your primary `@SpringBootApplication` class.

The `@SpringBootTest` annotation also has a `properties` attribute that can be used to specify any additional properties that should be defined in the `Environment`. Properties are now loaded in the exact same way as Spring's regular `@TestPropertySource` annotation.

Here's a more concrete example that actually hits a real REST endpoint:

```java
Copy@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT)
public class MyTest {
    
    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void test() {
        this.restTemplate.getForEntity(
            "/{username}/vehicle", String.class, "Phil");
    }

}
```

Note that `TestRestTemplate` is now available as bean whenever `@SpringBootTest` is used. It's pre-configured to resolve relative paths to `http://localhost:${local.server.port}`. We could have also used the `@LocalServerPort` annotation to inject the actual port that the server is running on into a test field.

## [](#mocking-and-spying)Mocking and spying

When you start testing real systems, you often find it's helpful to mock out specific beans. Common scenarios for mocking include simulating services that you can't use when running tests, or testing failure scenarios that are difficult to trigger in a live system.

With Spring Boot 1.4 you can easily create a Mockito mocks that can replace an existing bean, or create a new one:

```java
Copy@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class SampleTestApplicationWebIntegrationTests {

    @Autowired
    private TestRestTemplate restTemplate;

    @MockBean
    private VehicleDetailsService vehicleDetailsService;

    @Before
    public void setup() {
        given(this.vehicleDetailsService.
            getVehicleDetails("123")
        ).willReturn(
            new VehicleDetails("Honda", "Civic"));
    }

    @Test
    public void test() {
        this.restTemplate.getForEntity("/{username}/vehicle", 
            String.class, "sframework");
    }

}
```

In this example we're:

-   Creating a Mockito mock for `VehicleDetailsService`.
-   Injecting it into the `ApplicationContext` as a bean.
-   Injecting it into the field in the test.
-   Stubbing behavior in the `setup` method.
-   Trigger something that will ultimately call the mock.

Mocks will be automatically reset across tests. They also form part of the cache key used by Spring Test (so there's no need to add `@DirtiesContext`)

Spies work in a similar way. Simply annotate a test field with `@SpyBean` to have a spy wrap any existing bean in the `ApplicationContext`.

## [](#json-assertions)JSON Assertions

If you use the `spring-boot-starter-test` POM to import test dependencies, starting with 1.4 you will get the excellent [AssertJ](http://joel-costigliola.github.io/assertj/) library. AssertJ provides a fluent assertion API that replaces JUnit's somewhat basic `org.junit.Assert` class. If you've not seen it before, a basic AssertJ call looks something like this:

```java
CopyassertThat(library.getName()).startsWith("Spring").endsWith("Boot");
```

Spring Boot 1.4 offers extended assertions that you can use to check JSON marshalling and unmarshalling. JSON testers are available for both Jackson and Gson.

```java
Copypublic class VehicleDetailsJsonTests {

    private JacksonTester<VehicleDetails> json;

    @Before
    public void setup() {
        ObjectMapper objectMapper = new ObjectMapper(); 
        // Possibly configure the mapper
        JacksonTester.initFields(this, objectMapper);
    }

    @Test
    public void serializeJson() {
        VehicleDetails details = 
            new VehicleDetails("Honda", "Civic");

        assertThat(this.json.write(details))
            .isEqualToJson("vehicledetails.json");

        assertThat(this.json.write(details))
            .hasJsonPathStringValue("@.make");

        assertThat(this.json.write(details))
            .extractingJsonPathStringValue("@.make")
            .isEqualTo("Honda");
    }

    @Test
    public void deserializeJson() {
        String content = "{\"make\":\"Ford\",\"model\":\"Focus\"}";

        assertThat(this.json.parse(content))
            .isEqualTo(new VehicleDetails("Ford", "Focus"));

        assertThat(this.json.parseObject(content).getMake())
            .isEqualTo("Ford");
    }

}

```

JSON comparisons are actually performed using [JSONassert](https://github.com/skyscreamer/JSONassert), so only the logical structure of the JSON needs to to match. You can also see in the example above how [JsonPath](https://github.com/jayway/JsonPath) expressions can be used to test or extract data.

## [](#testing-application-slices)Testing application slices

Spring Boot's auto-configuration feature is great for configuring all the things that an application needs to run. Unfortunately, full auto-configuration can sometimes be a little overkill for tests. Sometimes you just want to configure a "slice" of your application -- Is Jackson configured correctly? Do my MVC controllers return the correct status code? Are my JPA queries going to run?

With Spring Boot 1.4 these common scenarios are now easy to test. We've also made it easier to build your own annotations that apply only the auto-configuration classes that you need.

### [](#testing-the-jpa-slice)Testing the JPA slice

To test the JPA slice of your application (Hibernate + Spring Data) you can use the `@DataJpaTest` annotation. A `@DataJpaTest` will:

-   Configure an in-memory database.
-   Auto-configure Hibernate, Spring Data and the DataSource.
-   Perform an `@EntityScan`.
-   Turn on SQL logging

A typical test looks like this:

```java
Copy@RunWith(SpringRunner.class)
@DataJpaTest
public class UserRepositoryTests {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserRepository repository;

    @Test
    public void findByUsernameShouldReturnUser() {
        this.entityManager.persist(new User("sboot", "123"));
        User user = this.repository.findByUsername("sboot");
        
        assertThat(user.getUsername()).isEqualTo("sboot");
        assertThat(user.getVin()).isEqualTo("123");
    }

}
```

The `TestEntityManager` in the above test is provided by Spring Boot. It's an alternative to the standard JPA `EntityManager` that provides methods commonly used when writing tests.

### [](#testing-the-spring-mvc-slice)Testing the Spring MVC slice

To test the Spring MVC slice of your application you can use the `@WebMvcTest` annotation. This will:

-   Auto-configure Spring MVC, Jackson, Gson, Message converters etc.
-   Load relevant components (`@Controller`, `@RestController`, `@JsonComponent` etc)
-   Configure MockMVC

Here's a typical example that tests a single controller:

```java
Copy@RunWith(SpringRunner.class)
@WebMvcTest(UserVehicleController.class)
public class UserVehicleControllerTests {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private UserVehicleService userVehicleService;

    @Test
    public void getVehicleShouldReturnMakeAndModel() {
        given(this.userVehicleService.getVehicleDetails("sboot"))
            .willReturn(new VehicleDetails("Honda", "Civic"));

        this.mvc.perform(get("/sboot/vehicle")
            .accept(MediaType.TEXT_PLAIN))
            .andExpect(status().isOk())
            .andExpect(content().string("Honda Civic"));
    }

}
```

If you prefer HtmlUnit, you can also use a `WebClient` instead of `MockMvc`. If selenium is more your thing, you can switch to a `WebDriver`.

### [](#testing-the-json-slice)Testing the JSON slice

If you need to test that JSON serialization is working as expected, you can use `@JsonTest`. This will:

-   Auto-configure Jackson and/or Gson
-   Add any `Module` or `@JsonComponent` beans that you've defined
-   Trigger initialization of any `JacksonTester` or `GsonTester` fields

Here's an example:

```java
Copy@RunWith(SpringRunner.class)
@JsonTest
public class VehicleDetailsJsonTests {

    private JacksonTester<VehicleDetails> json;

    @Test
    public void serializeJson() {
        VehicleDetails details = new VehicleDetails(
            "Honda", "Civic");

        assertThat(this.json.write(details))
            .extractingJsonPathStringValue("@.make")
            .isEqualTo("Honda");
    }

}
```

## [](#summary)Summary

If you want to try out the new testing features in Spring Boot 1.4 you can grab M2 from [http://repo.spring.io/snapshot/](http://repo.spring.io/snapshot/). There's also a sample project [available on GitHub](https://github.com/spring-projects/spring-boot/tree/v1.4.0.M2/spring-boot-samples/spring-boot-sample-test) as well as the [updated documentation](http://docs.spring.io/spring-boot/docs/1.4.0.M2/reference/htmlsingle/#boot-features-testing). If you've got any suggestions for addition "slices" that we should support, or any further improvements that you'd like to see, [please raise an issue](https://github.com/spring-projects/spring-boot/issues/new).