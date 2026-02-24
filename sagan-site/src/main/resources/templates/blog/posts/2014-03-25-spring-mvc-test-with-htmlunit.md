---
title: Spring MVC Test with HtmlUnit
source: https://spring.io/blog/2014/03/25/spring-mvc-test-with-htmlunit
scraped: 2026-02-24T07:36:09.537Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Winch |  March 25, 2014 | 4 Comments
---

# Spring MVC Test with HtmlUnit

_Engineering | Rob Winch |  March 25, 2014 | 4 Comments_

In my [previous post](https://spring.io/blog/2014/03/19/introducing-spring-test-mvc-htmlunit) I introduced Spring Test MVC HtmlUnit and explained the motivation behind the project. In this post I will describe how to use Spring MVC Test with [HtmlUnit](http://htmlunit.sourceforge.net/).

## [](#updating-dependencies)Updating Dependencies

Before you use the project, you must ensure to update your dependencies. Instructions for both [Maven](https://github.com/spring-projects/spring-test-mvc-htmlunit#building-with-maven) and [Gradle](https://github.com/spring-projects/spring-test-mvc-htmlunit#building-with-gradle) can be found on the site documentation.

## [](#using-htmlunit)Using HtmlUnit

Now that we have the correct dependencies, we can use HtmlUnit in our unit tests. Our example assumes you already have JUnit as a dependency. If you have not added it, please update your classpath accordingly. The complete code sample for using HtmlUnit and Spring MVC Test can be found in [MockMvcHtmlUnitCreateMessageTest](https://github.com/spring-projects/spring-test-mvc-htmlunit/blob/master/mail-webapp/src/test/java/sample/htmlunit/MockMvcHtmlUnitCreateMessageTest.java).

### [](#creating-mockmvc)Creating MockMvc

In order to use HtmlUnit and Spring MVC Test we must first create a `MockMvc` instance. There is plenty of documentation on how to create a `MockMvc` instance, but we will review how to create a `MockMvc` instance very quickly in this section.

The first step is to create a new JUnit class that is annotated as shown below:

```java
Copy@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {WebMvcConfig.class, MockDataConfig.class})
@WebAppConfiguration
public class MockMvcHtmlUnitCreateMessageTest {

  @Autowired
  private WebApplicationContext context;

  ...
}
```

-   `@RunWith(SpringJUnit4ClassRunner.class)` allows Spring to perform dependency injection on our `MockMvcHtmlUnitCreateMessageTest`. This is why our `@Autowired` annotations will be honored.
-   `@ContextConfiguration` tells Spring what configuration to load. You will notice that we are loading a mock instance of our data tier to improve the performance of our tests. If we wanted, we could optionally run the tests against a real database. However, this has the disadvantages we [mentioned previously](https://spring.io/blog/2014/03/19/introducing-spring-test-mvc-htmlunit#integration-testing-to-the-rescue).
-   `@WebAppConfiguration` indicates to `SpringJUnit4ClassRunner` that it should create a `WebApplicationContext` rather than a `ApplicationContext`.

Next we need to create our `MockMvc` instance from the `context`. An example of how to do this has been provided below:

```java
Copy@Before
public void setup() {
  MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
  ...
}
```

Of course this is just one way to create a `MockMvc` instance. We could have decided to [add a Servlet Filter](http://docs.spring.io/spring/docs/3.2.x/spring-framework-reference/html/testing.html#spring-mvc-test-server-filters), use a [Standalone setup](http://docs.spring.io/spring/docs/3.2.x/spring-framework-reference/html/testing.html#spring-mvc-test-server-setup-options), etc. The important thing is that we need an instance of `MockMvc`. For additional information on creating a `MockMvc` instance refer to the [Spring MVC Test documentation](http://docs.spring.io/spring/docs/3.2.x/spring-framework-reference/html/testing.html#spring-mvc-test-framework).

### [](#initializing-htmlunit)Initializing HtmlUnit

Now that we have created the `MockMvc` instance, we need to create an HtmlUnit `WebClient`. We use the `MockMvcWebConnection` to ensure that HtmlUnit utilizes the `MockMvc` instance we created in the previous step.

```java
Copyprivate WebClient webClient;

@Before
public void setup() {
  MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(context).build();

  webClient = new WebClient();
  webClient.setWebConnection(new MockMvcWebConnection(mockMvc));
}
```

### [](#using-htmlunit-1)Using HtmlUnit

Now we can use HtmlUnit as we normally would, but without the need to deploy our application. For example, we can request the view to create a message with the following:

```java
CopyHtmlPage createMsgFormPage = 
    webClient.getPage("http://localhost/mail/messages/form");
```

---

**NOTE** The first path segment, `/mail`, after the host is treated as the context root. A context root of `/` is not currently supported See [spring-test-mvc-htmlunit/issues/20](https://github.com/spring-projects/spring-test-mvc-htmlunit/issues/20) to get updates about this.

---

We can then fill out the form and submit it to create a message.

```java
CopyHtmlForm form = createMsgFormPage.getHtmlElementById("messageForm");
HtmlTextInput summaryInput = createMsgFormPage.getHtmlElementById("summary");
summaryInput.setValueAttribute("Spring Rocks");
HtmlTextArea textInput = createMsgFormPage.getHtmlElementById("text");
textInput.setText("In case you didn't know, Spring Rocks!");
HtmlSubmitInput submit = 
    form.getOneHtmlElementByAttribute("input", "type", "submit");
HtmlPage newMessagePage = submit.click();
```

Finally, we can verify that a new message was created successfully

```java
CopyassertThat(newMessagePage.getUrl().toString()).endsWith("/messages/123");
String id = newMessagePage.getHtmlElementById("id").getTextContent();
assertThat(id).isEqualTo("123");
String summary = newMessagePage.getHtmlElementById("summary").getTextContent();
assertThat(summary).isEqualTo("Spring Rocks");
String text = newMessagePage.getHtmlElementById("text").getTextContent();
assertThat(text).isEqualTo("In case you didn't know, Spring Rocks!");
```

This improves on our [MockMvc test](https://spring.io/blog/2014/03/19/introducing-spring-test-mvc-htmlunit#why-spring-test-mockmvc-htmlunit) in a number of ways. First we no longer have to explicitly verify our form and then create a request that looks like the form. Instead, we request the form, fill it out, and submit it. This reduces the overhead significantly.

Another important factor is that [HtmlUnit uses Mozilla Rhino engine](http://htmlunit.sourceforge.net/javascript.html) to evaluate JavaScript on your pages. This means, that we can verify our JavaScript methods as well!

For the complete example, please refer to [MockMvcHtmlUnitCreateMessageTest](https://github.com/spring-projects/spring-test-mvc-htmlunit/blob/master/mail-webapp/src/test/java/sample/htmlunit/MockMvcHtmlUnitCreateMessageTest.java). Refer to the [HtmlUnit documentation](http://htmlunit.sourceforge.net/gettingStarted.html) for additional information about using HtmlUnit.

## [](#but-theres-more)But there's more...

`HtmlUnit` drastically increases our productivity and the scope of our tests. However, we can still improve our tests by adding a higher level of abstraction. In our [next post](http://spring.io/blog/2014/03/26/spring-mvc-test-with-webdriver), we will see how we can use `WebDriver` with `MockMvc` to make our test code more reusable.

---

**Feedback please!**

If you have feedback on this blog series or the Spring Test MVC HtmlUnit, I encourage you to reach out via [github issues](https://github.com/spring-projects/spring-test-mvc-htmlunit/issues) or ping me on twitter [@rob\_winch](https://twitter.com/rob_winch). Of course the best feedback comes in the form of [contributions](https://github.com/spring-projects/spring-test-mvc-htmlunit#contributing).