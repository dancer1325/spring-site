---
title: Spring MVC Test with WebDriver
source: http://spring.io/blog/2014/03/26/spring-mvc-test-with-webdriver
scraped: 2026-02-24T07:36:41.264Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Winch |  March 26, 2014 | 13 Comments
---

# Spring MVC Test with WebDriver

_Engineering | Rob Winch |  March 26, 2014 | 13 Comments_

In my [second post](http://spring.io/blog/2014/03/21/spring-mvc-test-with-htmlunit) I described how to use Spring MVC Test with HtmlUnit. In this post we will leverage additional abstractions within [WebDriver](http://docs.seleniumhq.org/projects/webdriver/) to make things even easier.

## [](#why-webdriver)Why WebDriver?

We can already use HtmlUnit and MockMvc, so why would we want to use WebDriver? WebDriver provides a very elegant API and allows us to easily organize our code. To better understand, let's explore an example.

---

**NOTE** Despite being a part of [Selenium](http://docs.seleniumhq.org/), WebDriver does not require a Selenium Server to run your tests.

---

Suppose we need to ensure that a message is created properly. The tests involve finding the html inputs, filling them out, and making various assertions.

There are many tests because we want to test error conditions as well. For example, we want to ensure that if we fill out only part of the form we get an error. If we fill out the entire form, the newly created message is displayed afterwards.

If one of the fields was named "summary", then we might have something like the following repeated everywhere within our tests:

```java
CopyHtmlTextInput summaryInput = createMsgFormPage.getHtmlElementById("summary");
summaryInput.setValueAttribute("Spring Rocks");
```

So what happens if we change the id to be "smmry". This means we would have to update all of our tests! Instead we would hope that we wrote a bit more elegant code where filling out the form was in its own method:

```java
Copypublic HtmlPage createMessage(HtmlPage currentPage, String summary, String text) {
  ...
  setSummary(currentPage, summary);
  ...
}

public void setSummary(HtmlPage currentPage, String summary) {
  HtmlTextInput summaryInput = currentPage.getHtmlElementById("summary");
  summaryInput.setValueAttribute(summary);
}
```

This ensures that if we change the UI we do not have to update all of our tests.

We might take it a step further and place this logic within an Object that represents the `HtmlPage` we are currently on.

```java
Copypublic class CreateMessagePage {
  private final HtmlPage currentPage;

  ...

  public T createMessage(Class<T> resultPage, String summary, String text) {
    ...
    setSummary(currentPage, summary);
    ...
    HtmlPage result = submit.click();
    ...
    return (T) error ? new CreateMessagePage(result) : new ViewMessagePage(result);
  }

  public void setSummary(String summary) {
    HtmlTextInput summaryInput = currentPage.getHtmlElementById("summary");
    summaryInput.setValueAttribute(summary);
  }
}
```

Formerly, this pattern is known as the [Page Object Pattern](https://code.google.com/p/selenium/wiki/PageObjects). While we can certainly do this with HtmlUnit, WebDriver provides some tools that we will explore in the following sections make this pattern much easier.

## [](#updating-dependencies)Updating Dependencies

Before you use the project, you must ensure to update your dependencies. Instructions for both [Maven](https://github.com/spring-projects/spring-test-mvc-htmlunit#building-with-maven) and [Gradle](https://github.com/spring-projects/spring-test-mvc-htmlunit#building-with-gradle) can be found on the site documentation.

## [](#using-webdriver)Using WebDriver

Now that we have the correct dependencies, we can use WebDriver in our unit tests. Our example assumes you already have JUnit as a dependency. If you have not added it, please update your classpath accordingly. The complete code sample for using WebDriver and Spring MVC Test can be found in [MockMvcHtmlUnitDriverCreateMessageTests](https://github.com/spring-projects/spring-test-htmlunit/blob/160eb458f8ba01d4fb6b35006c7cc750104599be/mail-webapp/src/test/java/sample/webdriver/MockMvcHtmlUnitDriverCreateMessageTests.java).

### [](#creating-mockmvc)Creating MockMvc

In order to use WebDriver and Spring MVC Test we must first create a `MockMvc` instance. There is plenty of documentation on how to create a `MockMvc` instance, but we will review how to create a `MockMvc` instance very quickly in this section.

The first step is to create a new JUnit class that is annotated as shown below:

```java
Copy@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {WebMvcConfig.class, MockDataConfig.class})
@WebAppConfiguration
public class MockMvcHtmlUnitDriverCreateMessageTests {

  @Autowired
  private WebApplicationContext context;

  ...
}
```

-   `@RunWith(SpringJUnit4ClassRunner.class)` allows Spring to perform dependency injection on our `MockMvcHtmlUnitDriverCreateMessageTests`. This is why our `@Autowired` annotations will be honored.
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

### [](#initializing-webdriver)Initializing WebDriver

Now that we have created the `MockMvc` instance, we need to create a `MockMvcHtmlUnitDriver` which ensures we use the `MockMvc` instance we created in the previous step.

```java
Copyprivate WebDriver driver;

@Before
public void setup() {
	MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
	driver = new MockMvcHtmlUnitDriver(mockMvc, true);
}
```

### [](#using-webdriver-1)Using WebDriver

Now we can use WebDriver as we normally would, but without the need to deploy our application. For example, we can request the view to create a message with the following:

```java
CopyCreateMessagePage messagePage = CreateMessagePage.to(driver);
```

We can then fill out the form and submit it to create a message.

```java
CopyViewMessagePage viewMessagePage = 
    messagePage.createMessage(ViewMessagePage.class, expectedSummary, expectedText);
```

This improves on the design of our [HtmlUnit test](http://spring.io/blog/2014/03/21/spring-mvc-test-with-htmlunit) by leveraging the Page Object Pattern. As we mentioned in [Why WebDriver?](#why-webdriver), we could use the Page Object Pattern with HtmlUnit, but it is much easier now. Let's take a look at our `CreateMessagePage`.

```java
Copypublic class CreateMessagePage extends AbstractPage {
    private WebElement summary;

    private WebElement text;

    @FindBy(css = "input[type=submit]")
    private WebElement submit;

    public CreateMessagePage(WebDriver driver) {
        super(driver);
    }

    public <T> T createMessage(Class<T> resultPage, String summary, String details) {
        this.summary.sendKeys(summary);
        this.text.sendKeys(details);
        this.submit.click();
        return PageFactory.initElements(driver, resultPage);
    }

    public static CreateMessagePage to(WebDriver driver) {
        driver.get("http://localhost:9990/mail/messages/form");
        return PageFactory.initElements(driver, CreateMessagePage.class);
    }
}
```

The first thing you will notice is that our `CreateMessagePage` extends the `AbstractPage`. We won't go over the details of `AbstractPage`, but in summary it contains all the common functionality of all our pages. For example, if your application has a navigational bar, global error messages, etc. This logic can be placed in a shared location.

The next thing you will find is that we have a member variable for each of the parts of the HTML, `WebElement`, we are interested in. `WebDriver`'s [PageFactory](https://code.google.com/p/selenium/wiki/PageFactory) allows us to remove a lot of code from HtmlUnit version of `CreateMessagePage` by automatically resolving each `WebElement`.

The `PageFactory#initElements` method will automatically resolve each `WebElement` by using the field name and trying to look it up by id or name of the element on the HTML page. We can also use the [@FindBy annotation](https://code.google.com/p/selenium/wiki/PageFactory#Making_the_Example_Work_Using_Annotations) to override the default. Our example demonstrates how we can use the `@FindBy` annotation to lookup our submit button using the css selector of *input\[type=submit\]*.

Finally, we can verify that a new message was created successfully

```java
CopyassertThat(viewMessagePage.getMessage()).isEqualTo(expectedMessage);
assertThat(viewMessagePage.getSuccess()).isEqualTo("Successfully created a new message");
```

We can see that our `ViewMessagePage` can return a `Message` object in addition to the individual `Message` properties. This allows us to easily interact with our rich domain objects instead of just a `String`. We can then leverage the rich domain objects in our assertions. We do this by creating a [custom fest assertion](https://github.com/alexruiz/fest-assert-2.x/wiki/Creating-specific-assertions) that allows us to verify all the properties of the actual `Message` are equal to the expected `Message`. You can view the details of the custom assertion in [Assertions](https://github.com/spring-projects/spring-test-mvc-htmlunit/blob/master/mail-webapp/src/test/java/sample/fest/Assertions.java) and [MessageAssert](https://github.com/spring-projects/spring-test-mvc-htmlunit/blob/master/mail-webapp/src/test/java/sample/fest/MessageAssert.java)

Last, don't forget to close the `WebDriver` instance when we are done.

```java
Copy@After
public void destroy() {
	if(driver != null) {
		driver.close();
	}
}
```

For additional information on using WebDriver, refer to the [WebDriver documentation](https://code.google.com/p/selenium/wiki/GettingStarted).

## [](#making-it-all-groovy)Making it all Groovy...

`WebDriver` has the same benefits of using HtmlUnit with the added benefit of easy support of using the Page Object pattern. However, there is quite a bit of boiler plate code that could be improved on. In our next post, we will see how we can use Geb to make our tests more Groovy.

---

**Feedback please!**

If you have feedback on this blog series or the Spring Test MVC HtmlUnit, I encourage you to reach out via [github issues](https://github.com/spring-projects/spring-test-mvc-htmlunit/issues) or ping me on twitter [@rob\_winch](https://twitter.com/rob_winch). Of course the best feedback comes in the form of [contributions](https://github.com/spring-projects/spring-test-mvc-htmlunit#contributing).