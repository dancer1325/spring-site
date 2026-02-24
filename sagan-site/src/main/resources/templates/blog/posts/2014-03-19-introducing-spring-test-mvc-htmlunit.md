---
title: Introducing Spring Test MVC HtmlUnit
source: http://spring.io/blog/2014/03/19/introducing-spring-test-mvc-htmlunit
scraped: 2026-02-24T07:37:16.687Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Winch |  March 19, 2014 | 0 Comments
---

# Introducing Spring Test MVC HtmlUnit

_Engineering | Rob Winch |  March 19, 2014 | 0 Comments_

On Monday [I announced](http://spring.io/blog/2014/03/17/spring-test-mvc-htmlunit-1-0-0-m1-released) the release of the first milestone of [Spring Test MVC HtmlUnit](https://github.com/spring-projects/spring-test-mvc-htmlunit) with the promise of a blog series that would introduce it. This is the first of a four part blog series introducing Spring Test MVC HtmlUnit. The series outline can be seen below:

-   In this first post we will explore the motivation behind Spring Test MVC HtmlUnit.
-   The [second post](http://spring.io/blog/2014/03/21/spring-mvc-test-with-htmlunit) will demonstrate how we can integrate [Spring MVC Test](http://docs.spring.io/spring/docs/3.2.x/spring-framework-reference/html/testing.html#spring-mvc-test-framework) and [HtmlUnit](http://htmlunit.sourceforge.net/).
-   Our [third post](http://spring.io/blog/2014/03/26/spring-mvc-test-with-webdriver) will demonstrate how we can integrate Spring MVC Test with [WebDriver](http://docs.seleniumhq.org/projects/webdriver/).
-   Finally, we will demonstrate how we can integrate Spring MVC Test with [Geb](http://www.gebish.org/).

## [](#why-spring-test-mockmvc-htmlunit)Why Spring Test MockMvc HtmlUnit?

The most obvious question that comes to mind is "Why do I need this?" The answer is best found by exploring a very basic [sample application](https://github.com/spring-projects/spring-test-mvc-htmlunit/tree/master/mail-webapp). Assume you have a Spring MVC web application that allows CRUD operations on a [Message](https://github.com/spring-projects/spring-test-mvc-htmlunit/blob/master/mail-webapp/src/main/java/sample/data/Message.java) object. The application also allows paging through all messages. How would you go about testing it?

With Spring MVC Test, we can easily test if we are able to create a `Message`.

```java
CopyMockHttpServletRequestBuilder createMessage = post("/messages/")
	.param("summary", "Spring Rocks")
	.param("text", "In case you didn't know, Spring Rocks!");

mockMvc.perform(createMessage)
	.andExpect(status().is3xxRedirection())
	.andExpect(redirectedUrl("/messages/123"));
```

What if we want to test our form view that allows us to create the message? For example, assume our form looks like the following snippet:

```xml
Copy<form id="messageForm" action="/messages/" method="post">
  <div class="pull-right"><a href="/messages/">Messages</a></div>

  <label for="summary">Summary</label>
  <input type="text" class="required" id="summary" name="summary" value="" />

  <label for="text">Message</label>
  <textarea id="text" name="text"></textarea>

  <div class="form-actions">
    <input type="submit" value="Create" />
  </div>
</form>
```

How do we ensure that our form will produce the correct request to create a new message? A naive attempt would look like this:

```java
CopymockMvc.perform(get("/messages/form"))
	.andExpect(xpath("//input[@name='summary']").exists())
	.andExpect(xpath("//textarea[@name='text']").exists());
```

This test has some obvious problems. If we updated our controller to use the parameter "message" instead of "text", our test would would incorrectly pass. To resolve this we could combine our two tests:

```java
CopyString summaryParamName = "summary";
String textParamName = "text";
mockMvc.perform(get("/messages/form"))
	.andExpect(xpath("//input[@name='" + summaryParamName + "']").exists())
	.andExpect(xpath("//textarea[@name='" + textParamName + "']").exists());

MockHttpServletRequestBuilder createMessage = post("/messages/")
	.param(summaryParamName, "Spring Rocks")
	.param(textParamName, "In case you didn't know, Spring Rocks!");

mockMvc.perform(createMessage)
	.andExpect(status().is3xxRedirection())
	.andExpect(redirectedUrl("/messages/123"));
```

This would reduce the risk of our test incorrectly passing, but there are still some problems:

-   What if we had multiple forms on our page? Admittedly we could update our xpath expressions, but they get more complicated the more factors we take into account (are the fields the correct type, are the fields enabled, etc).
-   Another issue is that we are doing double the work we would expect. We must first verify the view and then we submit the view with the same parameters we just verified. Ideally this could be done all at once.
-   Last, there are some things that we still cannot account for. For example, what if the form has JavaScript validation that we wish to validate too?

The overall problem is that testing a web page is not a single interaction. Instead, it is a combination of how the user interacts with a web page and how that web page interacts with other resources. For example, the result of form view is used as an input to a user for creating a message. Another example is that our form view utilizes additional resources, like JavaScript validation, that impact the behavior of the page.

## [](#integration-testing-to-the-rescue)Integration testing to the rescue?

To resolve the issues above we could perform integration testing, but this has some obvious drawbacks. Consider testing the view that allows us to page through the messages. We might need the following tests:

-   Does our page display a message to the user indicating that no results are available when the messages are empty?
-   Does our page properly display a single message?
-   Does our page properly support paging?

To set these tests up we would need to ensure our database contained the proper messages in it. This leads to a number of problems:

-   Ensuring the proper messages are in the database can be tedious (think possible foreign keys).
-   Testing would be slow since each test would require ensuring the database was in the correct state.
-   Since our database needs to be in a specific state, we cannot run the test in parallel.
-   Assertions on things like auto generated ids, timestamps, etc can be challenging.

These problems do not mean that we should abandon integration testing all together. Instead, we can reduce the number of integration tests by moving our detailed tests to use mock services which will perform much faster. We can then use fewer integration tests that validate simple workflows to ensure that everything works together properly.

## [](#enter-spring-test-mvc-htmlunit)Enter Spring Test MVC HtmlUnit

So how can we provide a balance between testing the interactions of our pages and still get performance? I'm sure you already guessed it...Spring Test MVC HtmlUnit will allow us to:

-   Easily test our pages using tools (i.e. HtmlUnit, WebDriver, & Geb) that we already use for integration testing without starting an application server
-   Support testing of JavaScript
-   Optionally test using mock services to speed up testing.

> **NOTE**: Just as with Spring MVC Test, the HtmlUnit integration will work with templating technologies that do not rely on a Servlet Container (i.e. Thymeleaf, Freemarker, Velocity, etc). It does not work with JSPs since they rely on the Servlet Container.

## [](#up-next)Up next...

I hope this post excites you for my [next post](http://spring.io/blog/2014/03/21/spring-mvc-test-with-htmlunit) which discusses how we can solve some of these problems by integrating Spring Test MVC and HtmlUnit.

---

**Feedback please!**

If you have feedback on this blog series or the Spring Test MVC HtmlUnit, I encourage you to reach out via [github issues](https://github.com/spring-projects/spring-test-mvc-htmlunit/issues) or ping me on twitter [@rob\_winch](https://twitter.com/rob_winch). Of course the best feedback comes in the form of [contributions](https://github.com/spring-projects/spring-test-mvc-htmlunit#contributing).