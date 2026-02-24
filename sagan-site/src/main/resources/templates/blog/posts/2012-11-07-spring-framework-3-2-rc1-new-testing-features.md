---
title: Spring Framework 3.2 RC1: New Testing Features
source: https://spring.io/blog/2012/11/07/spring-framework-3-2-rc1-new-testing-features
scraped: 2026-02-24T08:13:51.110Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Sam Brannen |  November 07, 2012 | 4 Comments
---

# Spring Framework 3.2 RC1: New Testing Features

_Engineering | Sam Brannen |  November 07, 2012 | 4 Comments_

As [Juergen Hoeller](http://blog.springsource.org/author/juergenh/ "Juergen Hoeller") mentioned in his post announcing the [release of Spring Framework 3.2 RC1](http://blog.springsource.org/2012/11/05/spring-framework-3-2-rc1-released/ "Spring Framework 3.2 RC1 released"), the Spring Team has introduced some exciting new features in terms of testing support. Most importantly, we've added first-class support for testing web applications. *\[1\]*

      Please note: this is a [cross post](http://www.swiftmind.com/de/2012/11/07/spring-framework-3-2-rc1-new-testing-features/ "Spring Framework 3.2 RC1: New Testing Features") from my [Swiftmind](http://www.swiftmind.com "Swiftmind") company blog.

In this post we'll first take a look at some of the general new testing features in the Spring Framework, and then we'll go into detail regarding support for testing with a `WebApplicationContext` as well as *request* and *session* scoped beans. We'll close with a look at support for `ApplicationContextInitializers` and a brief discussion of the road map for testing with application context hierarchies.

[Rossen Stoyanchev](http://blog.springsource.org/author/rstoyanchev/ "Rossen Stoyanchev") will later follow up with a detailed post on the new *Spring MVC Test* framework that provides first-class support for testing Spring MVC applications. So be sure to stay tuned for that as well, since it builds on the basic web testing support discussed later in this post.

---

  

# General New Features and Updates

  

## Build and Dependencies

The `spring-test` module now builds against and supports JUnit 4.10 and TestNG 6.5.2, and `spring-test` now depends on the `junit:junit-dep` Maven artifact instead of `junit:junit` which means that you have full control over your dependencies on Hamcrest libraries (e.g., `hamcrest-core`, `hamcrest-all`, etc.).

## Generic Factory Methods

*Generic factory methods* are methods that implement the [Factory Method Design Pattern](http://en.wikipedia.org/wiki/Factory_method_pattern "Factory Method Design Pattern") using Java Generics. Here are some example signatures of generic factory methods:

```java
Copy
public static <T> T mock(Class<T> clazz) { ... }

public static <T> T proxy(T obj) { ... }
```

The use of *generic factory methods* in Spring configuration is by no means specific to testing, but generic factory methods such as `EasyMock.createMock(MyService.class)` or `Mockito.mock(MyService.class)` are often used to create dynamic mocks for Spring beans in a test application context. For example, prior to Spring Framework 3.2 the following configuration could fail to autowire the `OrderRepository` into the `OrderService`. The reason is that, depending on the order in which beans are initialized in the application context, Spring would potentially infer the type of the `orderRepository` bean to be `java.lang.Object` instead of `com.example.repository.OrderRepository`.

```xml
Copy
<beans>

  <!-- OrderService is autowired with OrderRepository -->
  <context:component-scan base-package="com.example.service"/>

  <bean id="orderRepository" class="org.easymock.EasyMock"
      factory-method="createMock"
      c:_="com.example.repository.OrderRepository" />

</beans>
```

In Spring 3.2, generic return types for factory methods are now properly inferred, and *autowiring by type* for mocks should work as expected. As a result, custom work-arounds such as a `MockitoFactoryBean`, `EasyMockFactoryBean`, or [Springockito](https://bitbucket.org/kubek2k/springockito/wiki/Home "Springockito") are likely no longer necessary.

## Mock Objects

We've introduced `MockEnvironment` which complements the existing `MockPropertySource` to complete support for mocking out the environment and property source abstractions introduced in Spring 3.1.

Regarding unit testing support for web components, we've added new features to existing Servlet API mocks such as `MockServletContext`, `MockHttpSession`, `MockFilterChain`, and `MockRequestDispatcher`, and we've introduced new mocks related to REST Web Services: `MockClientHttpRequest` and `MockClientHttpResponse` for the client side as well as `MockHttpInputMessage` and `MockHttpOutputMessage` for the server side.

## JDBC Testing Support

In Spring 3.2 we've deprecated `SimpleJdbcTestUtils` in favor of the improved `JdbcTestUtils` class which offers new `countRowsInTableWhere()` and `dropTables()` utility methods in addition to everything that `SimpleJdbcTestUtils` previously offered. These changes help to avoid the compiler warnings associated with the use of the deprecated `SimpleJdbcTemplate` and provide a convenient means for counting the number of rows in a table using a `WHERE` clause and for dropping a list of tables. On a similar note, `AbstractTransactionalJUnit4SpringContextTests` and `AbstractTransactionalTestNGSpringContextTests` have been retrofitted with a `jdbcTemplate` instance variable as well as `countRowsInTableWhere()` and `dropTables()` methods which delegate to their counterparts in `JdbcTestUtils`.

## Transaction Manager Configuration

If you're familiar with the support for transactional integration tests in the *Spring TestContext Framework*, then you're probably aware that the transaction manager used for tests must be called *"transactionManager"* by convention. Since Spring 2.5, this has been overridable via the `@TransactionConfiguration` annotation (e.g., `@TransactionConfiguration(transactionManager="txMgr")`); however, the use of this annotation is no longer necessary if there is a single `PlatformTransactionManger` present in the application context. In other words, as long as there is only one transaction manager defined in the context, there's no longer a need to *qualify* what the name of that transaction manager is: if there's only one, the TestContext framework will simply use it.

Spring 3.1 introduced the `TransactionManagementConfigurer` interface for programmatically specifying the transaction manager to use with `@Transactional` methods when using `@Configuration` classes in conjunction with `@EnableTransactionManagement` (i.e., as opposed to using XML configuration with `<tx:annotation-driven />`). So as of Spring 3.2, if one of your components (i.e., typically an `@Configuration` class) implements `TransactionManagementConfigurer`, the TestContext framework will use the transaction manager specified by that component.

---

  

# The Spring TestContext Framework

  

*The rest of this post deals explicitly with new features in the Spring TestContext Framework. If you're already familiar with the TestContext framework, feel free to skip to the next section. Otherwise, you might want to first familiarize yourself with the information provided via the links in the following paragraphs.*

In Spring 2.5 we introduced the [*Spring TestContext Framework*](http://static.springsource.org/spring/docs/3.2.0.RC1/reference/html/testing.html#testcontext-framework "Spring TestContext Framework") which provides annotation-driven integration testing support that can be used with JUnit or TestNG. The examples in this post will focus on JUnit-based tests, but all features used here apply to TestNG as well.

In Spring 3.1 we revised the *Spring TestContext Framework* with added support for [testing with `@Configuration` classes and environment profiles](http://www.swiftmind.com/de/2011/06/22/spring-3-1-m2-testing-with-configuration-classes-and-profiles/ "Spring 3.1 M2: Testing with @Configuration Classes and Profiles").

---

  

# Loading a WebApplicationContext

  

-   **Question**: How do you tell the TestContext framework to load a `WebApplicationContext`?
-   **Answer**: Just annotate your test class with `@WebAppConfiguration`.

That's really all there is to it. The presence of `@WebAppConfiguration` on your test class instructs the TestContext framework (TCF) that a `WebApplicationContext` (WAC) should be loaded for your integration tests. In the background the TCF makes sure that a `MockServletContext` is created and supplied to your test's WAC. By default the base resource path for your `MockServletContext` will be set to *"src/main/webapp"*. This is interpreted as a path relative to the root of your JVM (i.e., normally the path to your project). If you're familiar with the directory structure of a web application in a Maven project, you'll know that *"src/main/webapp"* is the default location for the root of your WAR. If you need to override this default, simply provide an alternate path to the `@WebAppConfiguration` annotation (e.g., `@WebAppConfiguration("src/test/webapp")`). If you wish to reference a base resource path from the classpath instead of the file system, just use Spring's *classpath:* prefix.

Please note that Spring's testing support for `WebApplicationContexts` is on par with its support for standard `ApplicationContexts`. When testing with a `WebApplicationContext` you are free to declare either XML configuration files or `@Configuration` classes via `@ContextConfiguration`. You are of course also free to use any other test annotations such as `@TestExecutionListeners`, `@TransactionConfiguration`, `@ActiveProfiles`, etc.

Let's take a look at some examples...

`Conventions`

```java
Copy
@RunWith(SpringJUnit4ClassRunner.class)

// defaults to "file:src/main/webapp"
@WebAppConfiguration

// detects "WacTests-context.xml" in same package
// or static nested @Configuration class
@ContextConfiguration

public class WacTests {
	//...
}
```

The above example demonstrates the TestContext framework's support for *convention over configuration*. If you annotate a test class with `@WebAppConfiguration` without specifying a resource base path, the resource path will effectively default to *"file:src/main/webapp"*. Similarly, if you declare `@ContextConfiguration` without specifying resource `locations`, annotated `classes`, or context `initializers`, Spring will attempt to detect the presence of your configuration using conventions (i.e., *"WacTests-context.xml"* in the same package as the `WacTests` class or static nested `@Configuration` classes).

`Default Resource Semantics`

```java
Copy
@RunWith(SpringJUnit4ClassRunner.class)

// file system resource
@WebAppConfiguration("webapp")

// classpath resource
@ContextConfiguration("/spring/test-servlet-config.xml")

public class WacTests {
	//...
}
```

This example demonstrates how to explicitly declare a resource base path with `@WebAppConfiguration` and an XML resource location with `@ContextConfiguration`. The important thing to note here is the different semantics for paths with these two annotations. By default, `@WebAppConfiguration` resource paths are file system based; whereas, `@ContextConfiguration` resource locations are classpath based.

`Explicit Resource Semantics`

```java
Copy
@RunWith(SpringJUnit4ClassRunner.class)

// classpath resource
@WebAppConfiguration("classpath:test-web-resources")

// file system resource
@ContextConfiguration(
    "file:src/main/webapp/WEB-INF/servlet-config.xml")

public class WacTests {
	//...
}
```

In this third example, we see that we can override the default resource semantics for both annotations by specifying a Spring resource prefix. Contrast the comments in this example with the previous example.

---

  

# Working with Web Mocks

  

To provide comprehensive web testing support, Spring 3.2 introduces a new `ServletTestExecutionListener` that is enabled by default. When testing against a `WebApplicationContext` this [TestExecutionListener](http://static.springsource.org/spring/docs/3.2.0.RC1/reference/html/testing.html#testcontext-key-abstractions "TestExecutionListener") sets up default thread-local state via Spring Web's `RequestContextHolder` before each test method and creates a `MockHttpServletRequest`, `MockHttpServletResponse`, and `ServletWebRequest` based on the base resource path configured via `@WebAppConfiguration`. `ServletTestExecutionListener` also ensures that the `MockHttpServletResponse` and `ServletWebRequest` can be injected into the test instance, and once the test is complete it cleans up thread-local state.

Once you have a `WebApplicationContext` loaded for your test you might find that you need to interact with the web mocks — for example, to set up your test fixture or to perform assertions after invoking your web component. The following example demonstrates which mocks can be autowired into your test instance. Note that the `WebApplicationContext` and `MockServletContext` are both cached across the test suite; whereas, the other mocks are managed per test method by the `ServletTestExecutionListener`.

`Injecting Mocks`

```java
Copy
@WebAppConfiguration
@ContextConfiguration
public class WacTests {
	
	@Autowired WebApplicationContext wac; // cached
	
	@Autowired MockServletContext servletContext; // cached
	
	@Autowired MockHttpSession session;
	
	@Autowired MockHttpServletRequest request;
	
	@Autowired MockHttpServletResponse response;
	
	@Autowired ServletWebRequest webRequest;
	
	//...
}
```

---

  

# Request and Session Scoped Beans

  

[Request and session scoped beans](http://static.springsource.org/spring/docs/3.2.0.RC1/reference/html/beans.html#beans-factory-scopes-other "Request, session, and global session scopes") have been supported by Spring for several years now, but it's always been a bit non-trivial to test them. As of Spring 3.2 it's now a breeze to test your request-scoped and session-scoped beans by following these steps:

1.  Ensure that a `WebApplicationContext` is loaded for your test by annotating your test class with `@WebAppConfiguration`.
2.  Inject the mock request or session into your test instance and prepare your test fixture as appropriate.
3.  Invoke your web component that you retrieved from the configured `WebApplicationContext` (i.e., via dependency injection).
4.  Perform assertions against the mocks.

The following code snippet displays the XML configuration for a login use case. Note that the `userService` bean has a dependency on a request-scoped `loginAction` bean. Also, the `LoginAction` is instantiated using [SpEL expressions](http://static.springsource.org/spring/docs/3.2.0.RC1/reference/html/expressions.html "Spring Expression Language") that retrieve the username and password from the current HTTP request. In our test, we will want to configure these request parameters via the mock managed by the TestContext framework.

`Request-scoped Bean Config`

```xml
Copy
<beans>

  <bean id="userService"
      class="com.example.SimpleUserService"
      c:loginAction-ref="loginAction" />

  <bean id="loginAction" class="com.example.LoginAction"
      c:username="#{request.getParameter('user')}"
      c:password="#{request.getParameter('pswd')}"
      scope="request">
    <aop:scoped-proxy />
  </bean>
	
</beans>
```

In `RequestScopedBeanTests` we inject both the `UserService` (i.e., the subject under test) and the `MockHttpServletRequest` into our test instance. Within our `requestScope()` test method we set up our test fixture by setting request parameters in the provided `MockHttpServletRequest`. When the `loginUser()` method is invoked on our `userService` we are assured that the user service has access to the request-scoped `loginAction` for the current `MockHttpServletRequest` (i.e., the one we just set parameters in). We can then perform assertions against the results based on the known inputs for the username and password.

`Request-scoped Bean Test`

```java
Copy
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
@WebAppConfiguration
public class RequestScopedBeanTests {
	
	@Autowired UserService userService;
	@Autowired MockHttpServletRequest request;
	
	@Test
	public void requestScope() {
		
		request.setParameter("user", "enigma");
		request.setParameter("pswd", "$pr!ng");
		
		LoginResults results = userService.loginUser();
		
		// assert results
	}
}
```

The following code snippet is similar to the one we saw above for a request-scoped bean; however, this time the `userService` bean has a dependency on a session-scoped `userPreferences` bean. Note that the `UserPreferences` bean is instantiated using a SpEL expression that retrieves the *theme* from the current HTTP session. In our test, we will need to configure a theme in the mock session managed by the TestContext framework.

`Session-scoped Bean Config`

```xml
Copy
<beans>

  <bean id="userService"
      class="com.example.SimpleUserService"
      c:userPreferences-ref="userPreferences" />

  <bean id="userPreferences"
      class="com.example.UserPreferences"
      c:theme="#{session.getAttribute('theme')}"
      scope="session">
    <aop:scoped-proxy />
  </bean>

</beans>
```

In `SessionScopedBeanTests` we inject the `UserService` and the `MockHttpSession` into our test instance. Within our `sessionScope()` test method we set up our test fixture by setting the expected "theme" attribute in the provided `MockHttpSession`. When the `processUserPreferences()` method is invoked on our `userService` we are assured that the user service has access to the session-scoped `userPreferences` for the current `MockHttpSession`, and we can perform assertions against the results based on the configured theme.

`Session-scoped Bean Test`

```java
Copy
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
@WebAppConfiguration
public class SessionScopedBeanTests {

  @Autowired UserService userService;
  @Autowired MockHttpSession session;

  @Test
  public void sessionScope() throws Exception {

    session.setAttribute("theme", "blue");

    Results results = userService.processUserPreferences();

    // assert results
  }
}
```

---

  

# Application Context Initializers

  

Spring 3.1 introduced the `ApplicationContextInitializer` interface that allows for programmatic initialization of a `ConfigurableApplicationContext` — for example, to register property sources or activate bean definition profiles against the Spring `Environment` abstraction. Initializers can be configured in `web.xml` by specifying `contextInitializerClasses` via a `context-param` for the `ContextLoaderListener` and via an `init-param` for the `DispatcherServlet`.

To use context initializers in integration tests, simply declare the initializer classes in `@ContextConfiguration` via the new `initializers` attribute introduced in Spring 3.2. Inheritance of initializers across a test class hierarchy can be controlled via the `inheritInitializers` attribute which is `true` by default. Since an `ApplicationContextInitializer` provides a fully programmatic approach to initializing an application context, an initializer may optionally configure the entire context. In other words, XML resource locations or annotated classes are no longer absolutely required in integration tests that are configured via `@ContextConfiguration` if initializers have been declared. Last but not least, context initializers are *ordered* based on Spring's `Ordered` interface or the `@Order` annotation.

The following code examples demonstrate the various ways that context initializers can be used in integration tests. The first shows how to configure a single initializer in conjunction with XML resource locations. The next example declares multiple context initializers. The third listing demonstrates the use of initializers in a class hierarchy where the list of context initializers declared in the `ExtendedTest` will be merged with those declared in the `BaseTest`. Recall that invocation order of initializers is influenced based on the implementation of Spring's `Ordered` interface or the presence of the `@Order` annotation. The fourth example is identical to the third example except that the `inheritInitializers` attribute in `@ContextConfiguration` has been set to `false`. The result is that any context initializers declared in parent classes will be ignored (i.e., overridden). The final listing demonstrates that an `ApplicationContext` can be loaded solely from context initializers without the need to declare XML resource locations or annotated classes.

`Single Initializer`

```java
Copy
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(
    locations = "/app-config.xml",
    initializers = CustomInitializer.class)
public class ApplicationContextInitializerTests {}
```

`Multiple Initializers`

```java
Copy
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(
  locations = "/app-config.xml",
  initializers = {
    PropertySourceInitializer.class,
    ProfileInitializer.class
  })
public class ApplicationContextInitializerTests {}
```

`Merged Initializers`

```java
Copy
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(
    classes = BaseConfig.class,
    initializers = BaseInitializer.class)
public class BaseTest {}

@ContextConfiguration(
    classes = ExtendedConfig.class,
    initializers = ExtendedInitializer.class)
public class ExtendedTest extends BaseTest {}
```

`Overridden Initializers`

```java
Copy
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(
    classes = BaseConfig.class,
    initializers = BaseInitializer.class)
public class BaseTest {}

@ContextConfiguration(
    classes = ExtendedConfig.class,
    initializers = ExtendedInitializer.class,
    inheritInitializers = false)
public class ExtendedTest extends BaseTest {}
```

`Initializer without Resources`

```java
Copy
// does not declare 'locations' or 'classes'
@ContextConfiguration(
    initializers = EntireAppInitializer.class)
public class InitializerWithoutConfigFilesOrClassesTest {}
```

---

  

# Context Caching

  

Once the TestContext framework loads an `ApplicationContext` for a test, that context will be cached and reused for **all** subsequent tests that declare the same unique context configuration within the same test suite. The important thing to keep in mind here is that an `ApplicationContext` is uniquely identified by its *context cache key* (i.e., the combination of configuration parameters that are used to load it).

As of Spring 3.2 `ApplicationContextInitializer` classes are also included the *context cache key*. Furthermore, if the context is a `WebApplicationContext` its base resource path (defined via `@WebAppConfiguration`) will also be included in the *context cache key*. For further details on caching, consult the [Context caching](http://static.springsource.org/spring/docs/3.2.0.RC1/reference/html/testing.html#testcontext-ctx-management-caching "Context caching") section of the reference manual.

---

  

# Application Context Hierarchies

  

**NOTE**: *As of Spring Framework 3.2 RC1, support for context hierarchies has not yet been implemented.*

In integration tests managed by the Spring TestContext Framework, currently only flat, non-hierarchical contexts are supported. In other words, there is no easy way to create contexts with parent-child relationships for tests. But context hierarchies are supported in production deployments. So it would be nice to be able to test them.

With that in mind, the Spring Team would like to introduce integration testing support for loading a test application context with a parent context, and ideally the following common hierarchies would be supported.

-   Root `WebApplicationContext` ← Dispatcher `WebApplicationContext`
-   EAR ← Root `WebApplicationContext` ← Dispatcher `WebApplicationContext`

The current proposal includes the introduction of a new `@ContextHierarchy` annotation that would contain nested `@ContextConfiguration` declarations plus a new `name` attribute in `@ContextConfiguration` that could be used for *merging* or *overriding* named configuration in the context hierarchy.

To shed some light on the proposal, let's take a look at a few examples...

`AppCtxHierarchyTests` demonstrates a parent-child context hierarchy declared within a single test class, where the contexts are standard contexts (i.e., non-web).

`Single Test with Context Hierarchy`

```java
Copy
@RunWith(SpringJUnit4ClassRunner.class)

@ContextHierarchy({
	@ContextConfiguration("parent.xml"),
	@ContextConfiguration("child.xml")
})
public class AppCtxHierarchyTests {}
```

`ControllerIntegrationTests` demonstrates a parent-child context hierarchy declared within a single test class, where the contexts are `WebApplicationContexts` and model a typical Spring MVC deployment.

`Root WAC & Dispatcher WAC`

```java
Copy
@RunWith(SpringJUnit4ClassRunner.class)

@WebAppConfiguration

@ContextHierarchy({
    @ContextConfiguration(
		name = "root",
		classes = WebAppConfig.class),
    @ContextConfiguration(
		name = "dispatcher",
		locations = "/spring/dispatcher-config.xml")
})
public class ControllerIntegrationTests {}
```

The following code listing demonstrates how a context hierarchy could be built up across a test class hierarchy, where each level in the test class hierarchy is responsible for configuring its own level in the context hierarchy. Executing tests in both of these subclasses would result in three application contexts being loaded (and cached) and two distinct context hierarchies.

`Class & Context Hierarchies`

```java
Copy
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(
  "file:src/main/webapp/WEB-INF/applicationContext.xml")
public abstract class AbstractWebTests{}

@ContextHierarchy(@ContextConfiguration("/spring/soap-ws-config.xml"))
public class SoapWebServiceTests extends AbstractWebTests{}

@ContextHierarchy(@ContextConfiguration("/spring/rest-ws-config.xml"))
public class RestWebServiceTests extends AbstractWebTests{}
```

### Feedback is Welcome

If you are interested in further information on the proposal for context hierarchies or want to take part in the discussion, please feel free to *watch* the following JIRA issues and provide us your feedback.

-   [SPR-5613](https://jira.springsource.org/browse/SPR-5613 "SPR-5613"): context hierarchy support
-   [SPR-9863](https://jira.springsource.org/browse/SPR-9863 "SPR-9863"): web context hierarchy support

---

  

# Summary

  

Spring Framework 3.2 introduces several new testing features with a strong focus on first-class support for testing web applications. We encourage you to try out these features as soon as you can and give us feedback. Also, stay tuned for [Rossen Stoyanchev's](http://blog.springsource.org/author/rstoyanchev/ "Rossen Stoyanchev") follow-up post on the new *Spring MVC Test* framework. And if you find any bugs or have any suggestions for improvements, now is the time to [take action](https://jira.springsource.org/browse/SPR "Spring JIRA issue tracker")!

---

  

*\[1\] The reference manual has not yet been updated to reflect testing support for web applications, but these features will certainly be well documented by Spring 3.2 GA.*

---