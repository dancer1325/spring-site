---
title: The future of functional web testing?
source: https://spring.io/blog/2010/08/28/the-future-of-functional-web-testing
scraped: 2026-02-24T08:53:47.897Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Peter Ledbrook |  August 28, 2010 | 0 Comments
---

# The future of functional web testing?

_Engineering | Peter Ledbrook |  August 28, 2010 | 0 Comments_

The Groovy community is a productive bunch, which means there are a plethora of frameworks, libraries, and tools to make your life easier. The area of testing seems to be particularly fertile ground and I've recently been looking into a couple of tools that, when combined, promise a step change in your productivity when writing functional web tests.

Although my usual focus is Grails, you don't have to use Grails to reap the benefits of these tools: they will work with any web application and will integrate well with any Java-based project/build. As it happens they both have associated plugins that make using them from Grails pretty straightforward.

The first of the tools I want to talk about is [Spock](http://code.google.com/p/spock/). It's based on the [Behaviour Driven Development](http://behaviour-driven.org/) (BDD) paradigm which shifts the focus away from the tests themselves to thinking about your code in terms of *expected behaviour*. The test cases you write read as specifications, which not only makes them easier to read and understand but also to write. You can even integrate Spock into any Java project and run from your specifications from your IDE (as long as the IDE has Groovy support - the three major ones do).

The second tool is even newer. It's called [Geb](http://geb.codehaus.org/) and it uses [WebDriver](http://code.google.com/p/selenium/) to test web applications using either real browsers or the [HtmlUnit](http://htmlunit.sourceforge.net/) library. What sets Geb apart from the competition is the jQuery-like syntax for querying your HTML pages and its built-in support for the [Page Object pattern](http://code.google.com/p/selenium/wiki/PageObjects).

So why do I think these make a winning combination? Because they make writing functional web tests as easy as they can be! Let's look at the two of them in action.

## A simple example

Imagine you have a simple login page that you want to test. It accepts a username and password and has a 'Sign in' button. The HTML looks something like:

```html
Copy<html> 
<head> 
  <title>Login</title>
</head> 
<body>
  <form action="/wildcard-realm/auth/signIn" method="post" > 
    <input type="hidden" name="targetUri" value="" /> 
    <table> 
      <tbody> 
        <tr> 
          <td>Username:</td> 
          <td><input type="text" name="username" value="" /></td> 
        </tr> 
        <tr> 
          <td>Password:</td> 
          <td><input type="password" name="password" value="" /></td> 
        </tr> 
        <tr> 
          <td>Remember me?:</td> 
          <td>
            <input type="hidden" name="_rememberMe" />
            <input type="checkbox" name="rememberMe" id="rememberMe"  />
          </td> 
        </tr> 
        <tr> 
          <td /> 
          <td><input type="submit" value="Sign in" /></td> 
        </tr> 
      </tbody> 
    </table> 
  </form>
</body> 
</html> 
```

Now take a look at the following Spock specification and try to work out what behaviour it's testing for:

```groovy
Copyimport geb.spock.GebReportingSpec
import pages.*
 
class MySpec extends GebReportingSpec {
    String getBaseUrl() { "http://localhost:8080/wildcard-realm" }
    File getReportDir() { new File("target/reports/geb") }

    def "Test invalid password"() {
        given: "I'm at the login page"
        to LoginPage

        when: "I enter an invalid password for 'admin'"
        loginForm.username = "admin"
        loginForm.password = "sdfkjhk"
        signIn.click()

        then: "I'm redirected back to the login page with the password field empty and an error message"
        at LoginPage
        loginForm.username == "admin"
        !loginForm.password
        message.text() == "Invalid username and/or password"
    }

    def "Test valid login"() {
        given: "I'm at the login page"
        to LoginPage

        when: "I enter a valid username and password"
        loginForm.username = "admin"
        loginForm.password = "admin"
        signIn.click(HomePage)

        then: "I'm redirected to the home page, which displays my username"
        at HomePage
        $().text().contains("Welcome back admin!")
    }
}
```

I don't know about you, but I find it pretty easy to work out what the test is trying to do. Even if you don't know at this stage where the variables are coming from, you can effectively read the specification as natural language. That ease of comprehension is one of the great benefits of a BDD tool like Spock.

Let's look at the specification in more detail. Each test method (or "feature" method as Spock likes to call them) breaks down into several sections. The first one, given, contains any setup code and gives you the starting state for the test. You then declare a when block that initiates some behaviour in whatever you are testing, for example by submitting a form. You finish by checking the result of the stimulus in the then block, which contains the conditions you need to fully verify the expected behaviour. Unlike in a JUnit test, you don't need explicit assertions inside the then section because each expression is an implicit assertion.

It's a simple concept, but once you get used to writing specifications, you'll find that Spock makes writing tests easier. It's something I can't really explain. My best guess is that the syntax and structure match the way you formulate tests in your mind, so there is little impedance between thinking about what to test and writing the physical test case. But rather than take my word for it, I urge you to try. You can use Spock for unit testing as well as functional testing, so it's easy to play with.

Pretty much everything else in the test is Geb, including the to() and at() methods. Both of these work on page objects, which you have to write yourself. Fortunately that's easy enough as you can tell from the LoginPage class:

```groovy
Copypackage pages

import geb.Page

class LoginPage extends Page {
    static url = "auth/login"

    static at = { title == "Login" }

    static content = {
        loginForm { $("form") }
        message { $("div.message") }
        signIn { $("input", value: "Sign in") }
    }
}
```

Let's look at the static properties in this class individually:

-   url - the relative URL of the page; used by the to() method to determine which URL to send the HTTP request to.
-   at - a closure that indicates whether the current page is this one or not - called by the at() method; it should return a boolean, but you can also include assertions.
-   content - a description of the page content, allowing for easy access to the parts declared here.

So in the above example, you can see that the login page has a relative URL of "auth/login". Relative to what? To the test's baseUrl. Determining whether the current page is the login page, involves simply checking that the page's title is "Login" in the at closure. Finally, the content block provides direct access to the login form (which is the only form on the page), the info/error message "div", and the "Sign in" button - all via Geb's $() method.

If you look back at the test, you'll see that I was able to access the content elements such as loginForm as if they were properties of the test. This feature of Geb allows for very succinct and self-descriptive tests, but more importantly it promotes code reuse. Imagine that your HTML page changes and one of the expressions no longer matches what you want it to. If you didn't use page objects, you'd have to perform a potentially unreliable global search and replace. How much better it is to change that one reference in the page object instead!

The $() function isn't just limited to content blocks - you can use it directly from your test code if you want. Consider this test:

```groovy
Copy    ...
    def "Test authentication redirect with query string"() {
        when: "I access the book list page with a sort query string"
        login "admin", "admin", BookListPage, [sort: 'title', order: 'desc']

        then: "The list of books is displayed in the correct order"
        at BookListPage
        $("tbody tr").size() == 3
        $("tbody tr")*.find("td", 1)*.text() == [ "Misery", "Guns, Germs, and Steel", "Colossus" ]
    }
    ...
    /**
     * Logs into the application either via a target page that requires
     * authentication or by directly requesting the login page.
     */
    private login(username, password, targetPage = null, params = [:]) {
        if (targetPage) {
            to([*:params], targetPage)
            page LoginPage
        }
        else {
            to LoginPage
        }

        loginForm.username = username
        loginForm.password = password

        if (targetPage) signIn.click(targetPage)
        else signIn.click(HomePage)
    }
    ...
```

The jQuery-like syntax makes it very easy to match elements in an HTML page and extract attribute values and content. Its syntax is well covered in the [Geb manual](http://geb.codehaus.org/manual/latest/index.html), as are many of Geb's other features.

The previous example also demonstrates how you can factor out code from your tests into reusable methods. Because Spock's syntax is quite alien at first, you might not think this would be possible. But specifications are classes in the end, so you can treat them as such.

I could go on and on about the features of Spock and Geb and how to use them, but this article isn't a tutorial. It's more a taster to get you interested. If you want to see the full Spock specification from which I pulled the snippets above, then check out the [source code](http://svn.codehaus.org/grails-plugins/grails-shiro/trunk/test/projects/wildcard-realm/test/functional/MainFunctionalSpec.groovy) for it and the associated [page objects](http://svn.codehaus.org/grails-plugins/grails-shiro/trunk/test/projects/wildcard-realm/test/functional/pages/).

## What are you waiting for?

Spock and Geb are pretty young technologies at the moment (neither has reached 1.0), but they are already far enough along that people are actively using them on their projects. Even at this stage, they present a compelling case: functional web tests that are both relatively easy to write and comprehend.

This is no small matter. Automated functional tests are essential to ensure that web applications are behaving as they should, but current approaches (in the Java universe at least) are typically clunky and act as a disincentive to writing those tests. So teams end up relying on manual testing, which never gives you the reliability of coverage you really need.

Is it all roses? Of course not. But what we have here are two tools that make what should be easy to test, actually easy to test - no mean feat in the world of functional web testing. And they will continue to support you as the pages you need to test become more complicated. Perhaps the biggest issue is dealing with Javascript and triggering DOM events from your tests, but even there you'll find that Geb is evolving rapidly to help you out.

I haven't even mentioned Spock's built-in mocking framework or it's support for data-driven tests (check out the where clause in the project's documentation). Even the output from its assertions is a big bonus:

dateService.getMonthString(new Date().updated(month: month)) == expected
|           |              |          |              |       |  |
|           June           |          |              5       |  July
|                          |          |                      false
|                          |          |                      2 differences (50% similarity)
|                          |          |                      Ju(ne)
|                          |          |                      Ju(ly)
|                          |          Sun Jun 27 12:24:02 BST 2010
|                          Fri Aug 27 12:24:02 BST 2010
org.grails.util.DateService@527f58ef

On the Geb front, take a look at the modules feature, which allows you decompose a page object into reusable parts. Great for complex pages. And since it uses WebDriver under the hood, you can run the tests either with real browsers or in headless mode (via HtmlUnit).

Let me finish by reiterating that these are tools that will work just as well in Java projects as Groovy or Grails ones. Just because your web application is written in Java doesn't mean that your tests have to be as well. Also understand that Spock can be used for any type of Java project - for unit, integration and/or functional tests.

If there's one thing I've learned it's that writing tests has to be as easy as possible, otherwise they simply won't be written. That's why I think Geb and Spock are important developments in the field of testing and well worth investigating.