---
title: Spring Framework 3.2 RC1: Spring MVC Test Framework
source: https://spring.io/blog/2012/11/12/spring-framework-3-2-rc1-spring-mvc-test-framework
scraped: 2026-02-24T08:13:42.321Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rossen Stoyanchev |  November 12, 2012 | 6 Comments
---

# Spring Framework 3.2 RC1: Spring MVC Test Framework

_Engineering | Rossen Stoyanchev |  November 12, 2012 | 6 Comments_

\[callout title=Update Dec 19, 2012\] The final Spring Framework reference documentation contains [guidance on migration](http://docs.spring.io/spring-framework/docs/3.2.x/spring-framework-reference/htmlsingle/#migration-3.2-compatibility-spring-mvc-test) as well as [a complete section](http://docs.spring.io/spring-framework/docs/current/spring-framework-reference/html/integration-testing.html#spring-mvc-test-framework) on Spring MVC Test. \[/callout\]

Last week [Juergen Hoeller](https://twitter.com/springjuergen) announced the release of Spring Framework 3.2 RC1 and [Sam Brannen](https://twitter.com/sam_brannen) discussed exciting [additions in its spring-test](http://blog.springsource.org/2012/11/07/spring-framework-3-2-rc1-new-testing-features/) module such as support for `WebApplicationContext`'s and upcoming plans for loading a hierarchy of contexts. Today I will continue this subject and describe another exciting `spring-test` addition. In 3.2 RC1 we've added first class support for testing Spring MVC applications both client-side and server-side.

### [](#background)Background

The Spring MVC Test framework discussed here originates from a [standalone project](https://github.com/spring-projects/spring-test-mvc) on Github, where features evolved for over a year with continuous feedback from many users. Thanks to all the early adopters, everyone who [contributed](https://github.com/spring-projects/spring-test-mvc/graphs/contributors), [reported issues](https://github.com/spring-projects/spring-test-mvc/issues?page=1&state=closed), commented, and everyone who blogged or spoke about it.

As of Spring 3.2 RC1, the code from the standalone project has been [added to the Spring Framework](https://github.com/spring-projects/spring-framework/commit/22bcb54ab66c952d1c122526729b64d77a77280b) and is available in the `spring-test` module, under slightly modified package names, and with support for 3.2 specific features such as async requests and others. The standalone project will continue to exist for applications testing against Spring MVC 3.1.

With that out of the day, let's have a closer, more detailed look.

### [](#server-side-support)Server-Side Support

How do you test a Spring MVC controller today? Most likely through a simple unit test, possibly involving the `MockHttpServletRequest` and `-Response`. Pretty trivial to do but it doesn't test enough. Controllers have annotations that express how they are mapped, what request data needs to be extracted, converted, and validated, whether to write to the body of the response, how to handle exceptions, and on and on. All of what the framework does as a result of these annotations, remains untested if you only write simple unit tests.

What if you could re-write these controller unit tests but instead of invoking controllers directly, it would be done through the DispatcherServlet, just as it happens at runtime? And what if you could use a fluent API to specify the request to perform and the response you expect? All of that without the need for a servlet container. That's what Spring MVC Test does. Here is an example:

```java
Copy
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration("servlet-context.xml")
public class SampleTests {

  @Autowired
  private WebApplicationContext wac;

  private MockMvc mockMvc;

  @Before
  public void setup() {
    this.mockMvc = webAppContextSetup(this.wac).build();
  }

  @Test
  public void getFoo() throws Exception {
    this.mockMvc.perform(get("/foo").accept("application/json"))
        .andExpect(status().isOk())
        .andExpect(content().mimeType("application/json"))
        .andExpect(jsonPath("$.name").value("Lee"));
  }
}
```

\[callout title=Static Imports\]The fluent API relies on these static imports: `MockMvcBuilders.*` `MockMvcRequestBuilders.*` `MockMvcResultMatchers.*` For code completion assistance, add them as "favorite types" in the Eclipse preferences, or simply remember classes starting with `MockMvc*`.\[/callout\]

As you can see we're using the new `@WebAppConfiguration` annotation to load our Spring MVC configuration. Then we inject the resulting `WebApplicationContext` into a test class field and use it to create a `MockMvc`, which in turn is used perform requests and define expectations.

\[callout title=Context Caching\]The TestContext framework caches the loaded Spring configuration across the test suite and even across the JVM. Therefore the speed of the tests should be very optimal.\[/callout\]

Just like with existing controller unit tests, Spring MVC Test builds on the mock request and response from `spring-test` and does not require a running servlet container. The main difference is that actual Spring MVC configuration is loaded through the TestContext framework and that the request is performed by actually invoking the `DispatcherServlet` and all the same Spring MVC infrastructure that is used at runtime.

Also similar to existing controller unit tests, you may consider injecting controllers with mock services in order to focus on testing the web layer and avoid hitting a database for example. So instead of loading actual business and persistence services, you can load configuration that creates mocks. For example:

```java
Copy
@Configuration
public class MyConfig {

    @Bean
    public FooService fooService() {
        return Mockito.mock(FooService.class);
    }

}
```

or in XML configuration:

```xml
Copy
<bean class="org.mockito.Mockito" factory-method="mock">
    <constructor-arg value="org.example.FooService"/>
</bean>
```

Given that we're not running in an actual servlet container, just how much will and will not work? For the most part everything will work just like it does at runtime. You can even register Servlet filters, enabling things like Spring Security. Most rendering technologies like JSON/XML, Freemarker, Velocity, Thymeleaf, Excel, PDF, etc. All of that will work. The only rendering technology excluded is JSPs since since that requires a servlet container. For JSPs you can still verify the JSP the request was forwarded, what attributes are in the model, whether any exception was raised, and so on.

### [](#client-side-rest-tests)Client-side REST Tests

What's the idea behind client-side REST tests? If you have code using the `RestTemplate`, you'll probably want to test it and to that you can target a running server or mock the RestTemplate. The client-side REST test support offers a third alternative, which is to use the actual `RestTemplate` but configure it with a custom `ClientHttpRequestFactory` that checks expectations against actual requests and returns stub responses.

```java
Copy
RestTemplate restTemplate = new RestTemplate();
MockRestServiceServer mockServer = MockRestServiceServer.createServer(restTemplate);

mockServer.expect(requestTo("/greeting"))
  .andRespond(withSuccess("Hello world", "text/plain"));

// use RestTemplate ...

mockServer.verify();
```

\[callout title=Static Imports\]The fluent API requires static imports:  
`MockRestRequestMatchers.*` `MockRestResponseCreators.*` For code completion assistance, add them as "favorite types" in the Eclipse preferences, or simply remember classes starting with `"MockRest*"`.\[/callout\]

As you can see we create an instance of `RestTemplate` and pass it to `MockRestServiceServer` to be configured. Then we define the characteristics of an expected request and provide a stub response to be returned. We could define any number of expected requests and stub responses. At the end of testing we can use the `verify` method to check if all expected requests were executed.

### [](#next-steps)Next Steps

There is a lot more we could discuss but it's probably best if you give it a try with your own project either using Spring Framework 3.2 RC1 or the [standalone project](https://github.com/spring-projects/spring-test-mvc) on Github, which works with Spring Framework 3.1.

Recently I went through the exercise myself by adding a [comprehensive set of tests](https://github.com/spring-projects/spring-mvc-showcase/tree/master/src/test/java/org/springframework/samples/mvc) for all controller methods of the spring-mvc-showcase. It was a useful exercise since it helped me find one bug. Therefore I expect it to be useful for others as well.

There are also many [demo tests](https://github.com/spring-projects/spring-framework/tree/master/spring-test/src/test/java/org/springframework/test/web/servlet/samples) in the Spring Framework if you want more examples including [tests with async requests](https://github.com/spring-projects/spring-framework/blob/master/spring-test/src/test/java/org/springframework/test/web/servlet/samples/standalone/AsyncTests.java#L46), [tests with filters](https://github.com/spring-projects/spring-framework/blob/master/spring-test/src/test/java/org/springframework/test/web/servlet/samples/standalone/FilterTests.java), [JSON responses](https://github.com/spring-projects/spring-framework/blob/master/spring-test/src/test/java/org/springframework/test/web/servlet/samples/standalone/resultmatchers/JsonPathAssertionTests.java), [XML responses](https://github.com/spring-projects/spring-framework/blob/master/spring-test/src/test/java/org/springframework/test/web/servlet/samples/standalone/resultmatchers/XpathAssertionTests.java), and many others.