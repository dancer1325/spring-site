---
title: Spring MVC Test with Geb
source: https://spring.io/blog/2014/04/15/spring-mvc-test-with-geb
scraped: 2026-02-24T07:28:06.733Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Winch |  April 15, 2014 | 1 Comment
---

# Spring MVC Test with Geb

_Engineering | Rob Winch |  April 15, 2014 | 1 Comment_

In my [third post](https://spring.io/blog/2014/03/26/spring-mvc-test-with-webdriver) I discussed how to use [WebDriver](http://docs.seleniumhq.org/projects/webdriver/) to make designing our tests easier with the Page Object Pattern. In this post, I'm going to discuss how to use [Geb](http://www.gebish.org/) to make our testing with `MockMvc` more Groovy.

## [](#why-geb-and-mockmvc)Why Geb and MockMvc

Geb is backed by WebDriver, so it offers many of the same benefits we got from WebDriver. However, Geb makes things even easier by taking care of some of the boiler plate code for us. Of course we want to use MockMvc so that we do no need to deploy our code to a server. The easiest way to understand the benefits of using Geb is to jump into an example.

---

**NOTE**: Another great feature of Geb is its [exceptional documentation](http://www.gebish.org/manual/current/).

---

## [](#updating-dependencies)Updating Dependencies

Before you use the project, you must ensure to update your dependencies. Instructions for both [Maven](https://github.com/spring-projects/spring-test-mvc-htmlunit#building-with-maven) and [Gradle](https://github.com/spring-projects/spring-test-mvc-htmlunit#building-with-gradle) can be found on the site documentation.

## [](#using-geb)Using Geb

Now that we have the correct dependencies, we can use Geb in our unit tests. The complete code sample for using Geb and Spring MVC Test can be found in [GebCreateMessagesSpec](https://github.com/spring-projects/spring-test-mvc-htmlunit/blob/master/mail-webapp/src/test/groovy/sample/geb/GebCreateMessagesSpec.groovy).

### [](#creating-a-mockmvc-instance)Creating a MockMvc instance

In order to use HtmlUnit and Spring MVC Test we must first create a `MockMvc` instance. There is plenty of documentation on how to create a `MockMvc` instance, but we will review how to create a `MockMvc` instance very quickly in this section.

The first step is to create a new `GebReportingSpec` class that is annotated as shown below:

```groovy
Copy@ContextConfiguration(classes=[WebMvcConfig,MockDataConfig])
@WebAppConfiguration
class GebCreateMessagesSpec extends GebReportingSpec {
  @Autowired
  WebApplicationContext context;

  WebDriver driver;

  ...
}
```

-   For this to work ensure to add the spock-spring dependency as illustrated in the [updating-dependencies](https://github.com/spring-projects/spring-test-mvc-htmlunit#updating-dependencies) section. This is why `@Autowired` annotations will be honored.
-   `@ContextConfiguration` tells Spring what configuration to load. You will notice that we are loading a mock instance of our data tier to improve the performance of our tests. If we wanted, we could optionally run the tests against a real database. However, this has the disadvantages we [mentioned previously](https://spring.io/blog/2014/03/19/introducing-spring-test-mvc-htmlunit#integration-testing-to-the-rescue).
-   `@WebAppConfiguration` indicates that a `WebApplicationContext` should be created rather than a `ApplicationContext`.

Next we need to create our `MockMvc` instance from the `context`. An example of how to do this has been provided below:

```java
Copydef setup() {
  MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(context).build()
  ...
}
```

Of course this is just one way to create a `MockMvc` instance. We could have decided to [add a Servlet Filter](http://docs.spring.io/spring/docs/3.2.x/spring-framework-reference/html/testing.html#spring-mvc-test-server-filters), use a [Standalone setup](http://docs.spring.io/spring/docs/3.2.x/spring-framework-reference/html/testing.html#spring-mvc-test-server-setup-options), etc. The important thing is that we need an instance of `MockMvc`. For additional information on creating a `MockMvc` instance refer to the [Spring MVC Test documentation](http://docs.spring.io/spring/docs/3.2.x/spring-framework-reference/html/testing.html#spring-mvc-test-framework).

### [](#initializing-webdriver)Initializing WebDriver

Now that we have created the `MockMvc` instance, we need to create a `MockMvcHtmlUnitDriver` which ensures we use the `MockMvc` instance we created in the previous step. We then use Geb's [explicit lifecycle](http://www.gebish.org/manual/current/driver.html#explicit_lifecycle) and set the driver on Geb's [Browser](http://www.gebish.org/manual/current/browser.html#the_browser) instance.

```java
CopyWebDriver driver;

def setup() {
  MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(context).build()
  driver = new MockMvcHtmlUnitDriver(mockMvc, true)
  browser.driver = driver
}

def destroy() {
  if(driver != null) {
    driver.close();
  }
}
```

### [](#using-geb-1)Using Geb

Now we can use Geb as we normally would, but without the need to deploy our application. For example, we can request the view to create a message with the following:

```groovy
Copyto CreateMessagePage
```

We can then fill out the form and submit it to create a message.

```groovy
Copyform.summary = expectedSummary
form.text = expectedMessage
submit.click(ViewMessagePage)
```

Any unrecognized method calls or property accesses/references that are not found will be forwarded to the current page object. This removes a lot of the boilerplate code we needed when using WebDriver directly.

Additionally, this improves on the design of our [HtmlUnit test](http://spring.io/blog/2014/03/21/spring-mvc-test-with-htmlunit). The most obvious change is that we are now using the Page Object Pattern. As we mentioned in [Why WebDriver?](#why-webdriver), we could use the Page Object Pattern with HtmlUnit, but it is much easier now.

Let's take a look at our `CreateMessagePage`.

```groovy
Copyclass CreateMessagePage extends Page {
  static url = 'messages/form'
  static at = { assert title == 'Messages : Create'; true }
  static content =  {
    submit { $('input[type=submit]') }
    form { $('form') }
    errors(required:false) { $('label.error, .alert-error')?.text() }
  }
}
```

The first thing you will notice is that our `CreateMessagePage` extends the `Page`. We won't go over the details of `Page`, but in summary it contains base functionality for all our pages.

The next thing you will notice is that we define a URL in which this page can be found. This allows us to navigate to the page with:

```groovy
Copyto CreateMessagePage
```

We also have a closure that determines if we are at the specified page. It should return true if we are on the correct page. This is why we can assert that we are on the correct page with:

---

**NOTE**: We use an assertion in the closure, so we can determine where things went wrong if we were at the wrong page.

---

```groovy
Copyat CreateMessagePage
```

We last create a content closure that specifies all the areas of interest within the page. We can use a [jQuery-ish Navigator API](http://www.gebish.org/manual/current/intro.html#the_jquery_ish_navigator_api) to select the content we are interested in.

Finally, we can verify that a new message was created successfully

```groovy
Copyat ViewMessagePage
success == 'Successfully created a new message'
id
date
summary == expectedSummary
message == expectedMessage
```

---

**Feedback please!**

If you have feedback on this blog series or the Spring Test MVC HtmlUnit, I encourage you to reach out via the comments below, [github issues](https://github.com/spring-projects/spring-test-mvc-htmlunit/issues), or ping me on twitter [@rob\_winch](https://twitter.com/rob_winch). Of course the best feedback comes in the form of [contributions](https://github.com/spring-projects/spring-test-mvc-htmlunit#contributing).