---
title: Countdown to Grails 2.0: Unit testing
source: https://spring.io/blog/2011/06/07/countdown-to-grails-2-0-unit-testing
scraped: 2026-02-24T08:40:37.822Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Peter Ledbrook |  June 07, 2011 | 0 Comments
---

# Countdown to Grails 2.0: Unit testing

_Engineering | Peter Ledbrook |  June 07, 2011 | 0 Comments_

The first milestone of Grails 1.4 (now 2.0) has now been released and we are on the last stages of the journey towards 1.4 2.0 final. As we approach that point, I will be writing a series of blog posts that cover the various new features and changes that the 1.4 2.0 version brings. I'll be starting with the new testing support.

Since the beginning, Grails has provided three levels of testing support for developers: unit, integration, and functional. Unit tests had and still have the benefit of running independently of Grails, but they typically required a fair bit of extra work in the form of mocking. The unit test framework introduced with Grails 1.1 helped with that mocking, but it still didn't cover all use cases and so developers needed to resort to integration tests, which run inside a bootstrapped Grails instance, earlier than was desirable.

Grails 2.0 introduces significant changes that improve the situation considerably:

-   the unit test support can be integrated into any test framework (no more base classes);
-   it has a full in-memory GORM implementation; and
-   it better supports testing REST actions, file uploads, and more.

So what do these changes look like to you as a user?

## The day inheritance died

The original unit testing support was provided as a hierarchy of classes that your own test cases had to extend, the root of which was GrailsUnitTestCase. This is a time-honoured pattern from the early days of JUnit and it is well understood. It also worked well for Grails initially. The problems started when people switched to testing frameworks other than JUnit 3 such as Spock, which also requires you to inherit a base class: spock.lang.Specification.

As we all know, Java doesn't support multiple inheritance and so the result for Spock was a duplication of the GrailsUnitTestCase hierarchy based on the Specification class. Not exactly ideal!

Grails 2.0 solves this problem by providing all the features originally supplied by GrailsUnitTestCase and its family via annotations. So for a simple controller unit test, you now have code like this:

```groovy
Copypackage org.example

import grails.test.mixin.*

@TestFor(PostController)
class PostControllerTests {
    void testIndex() {
        controller.index()
        assert "/post/list" == response.redirectedUrl
    }
    ...
}
```

As you can see, the addition of the TestFor annotation immediately makes controller and response variables (amongst others) available to your tests. And all without an extends in sight! Even better, with the latest Spock plugin you can also do:

```groovy
Copypackage org.example

import grails.test.mixin.*

@TestFor(PostController)
class PostControllerSpec extends spock.lang.Specification {
    def "Index action should redirect to list page"() {
        when: "The index action is hit"
        controller.index()

        then: "The user should be redirected to the list action"
        response.redirectedUrl == "/post/list"
    }
    ...
}
```

In other words, you can take advantage of any improvements to the unit test support straight away no matter which test framework you are using. You can still use the old GrailsUnitTestCase hierarchy if you want, but it doesn't support any of the new features. For that reason, we strongly recommend you migrate your tests to the annotation-based mechanism as soon as you can.

What new features am I talking about? How about a proper GORM implementation.

## In-memory GORM implementation

Since the unit test framework was introduced, it has supported the mocking of domain classes. This saved you the effort of explicitly mocking the various dynamic methods yourself, such as save() and list(). But it has never been a full GORM implementation and users had to know the limitations in order to use it effectively. In particular, criteria queries had to be mocked manually and new GORM methods typically lagged behind in the mock implementation.

The introduction of a GORM API changed things: it was now possible to implement this API and check that implementation against a TCK. As long as the TCK tests passed, the implementation was GORM-compliant. And as a result of the noSQL work for GORM, we now have an in-memory GORM implementation that can be used for unit testing.

So how do you go about using this GORM implementation in your tests? Easy! Just declare the domain classes that you want to test within a new annotation: @Mock. You can then interact with instances of those domain classes as you would in normal Grails code. For example, consider the list action of the PostController we're testing. This action will perform a query on the Post domain class and we want to make sure it's returning the appropriate domain instances. Here's how we do that with the new unit testing support:

```groovy
Copypackage org.example

import grails.test.mixin.*

@TestFor(PostController)
@Mock(Post)
class PostControllerTests {
    void testList() {
        new Post(message: "Test").save(validate: false)
        def model = controller.list()

        assert model.postInstanceList.size() == 1
        assert model.postInstanceList[0].message == "Test"
        assert model.postInstanceTotal == 1
    }
}
```

The two key lines are highlighted: the @Mock annotation and the Post.save() line. The former ensures that Post behaves like a normal domain class while the latter saves a new Post instance. That instance will then be picked up by the query executed by the index action. As you can see, no mockDomain() method is required, just straightforward, well-understood GORM code.

One question you may ask is why does the above example use the validate: false option when saving the new domain instance? You have to remember that you are working against a full GORM implementation and so validation takes effect by default. For a simple domain class this isn't a problem, but what if you have tens of properties and some required relationships too? Building a valid graph of domain instances can involve considerable effort and yet the method or action under test may only access one or two properties of the domain class. Disabling validation removes what would otherwise be an onerous requirement.

For example, imagine that the Post domain class had a required user property of type User. Now, the list action doesn't care about the user at all - it's just returning a list of posts. But with validation enabled, you would have to create a dummy User instance and attach it to the Post instance. Scale that up to a complex domain model and you can see that validation is not your friend in this particular case.

This "mock" GORM implementation even extends to criteria queries, so you can now readily test those from within your unit test cases. And because we have the GORM TCK, any changes to GORM will be reflected in the mock implementation straight away. Unit testing with domain classes in Grails has never been easier!

Before I move on, there is one more thing to be aware of. The GORM implementation does not fully support transactions yet, so if you have any withTransaction blocks that you want to test, you will still have to rely on integration or functional tests. That doesn't mean you can't unit test code that uses withTransaction - you can - but you won't be able to reliably test the transactional semantics. For most people, particularly those that use transactional services instead, this won't be an issue at all.

GORM mocking is only one improvement to the unit testing support. Several other scenarios that used to be difficult have now been simplified.

## The rest

Did you ever try unit testing JSON responses? Grails filters? Tag libraries? Although each of these was possible, it wasn't particularly easy and often required a fair bit of mocking. Grails 2.0 brings in a host of changes that make such testing (and more) significantly easier. All the possibilities are documented in the [user guide](http://grails.org/doc/1.4.0.M1/guide/9.%20Testing.html#9.1%20Unit%20Testing), so I'll just focus on a few scenarios here to whet your appetite.

### Testing XML/JSON responses

With REST seemingly so widespread, more and more Grails applications will probably be using the "render as XML/JSON" options. But how do you unit test these? Let's say the list action of PostController looks like this:

```groovy
Copy    def list = {
        params.max = Math.min(params.max ? params.int('max') : 10, 100)

        def postList = Post.list(params)
        withFormat {
            html {
                [postInstanceList: postList, postInstanceTotal: Post.count()]
            }
            xml {
                render(contentType: "application/xml") {
                    for (p in postList) {
                        post(author: p.author, p.message)
                    }
                }
            }
            json {
                render(contentType: "application/json") {
                    posts = postList.collect { p ->
                        return { message = p.message; author = p.author }
                    }
                }
            }
        }
    }
```

First, you need to set the format you want to test so that withFormat picks the appropriate block of code. Then you have to somehow check that the correct JSON string is generated. Both of these can easily be achieved through the response property that is automatically injected into controller unit test cases:

```groovy
Copy    void testListWithJson() {
        new Post(message: "Test", author: "Peter").save()
        response.format = "json"
        controller.list()

        assert response.text == '{"posts":[{"message":"Test","author":"Peter"}]}'
    }
```

Of course, comparing strings is typically quite brittle. It's fine for small JSON responses like the one above, but what if the controller suddenly includes the dateCreated property in the JSON response? The above test will immediately fail. That may be what you want, but perhaps you're not interested in whether dateCreated is included or not?

Fortunately, you can also interrogate the JSON response as if it were a hierarchy of objects rather than a straight string. The response object has both json and xml properties that are object representations of the underlying JSON or XML:

```groovy
Copy    void testListWithJson() {
        ...
        assert response.json.posts.size() == 1
        assert response.json.posts[0].message == "Test"
    }
```

This can make your unit tests much more maintainable and robust and certainly makes it possible to test large responses by looking at only parts of the JSON or XML document.

### Tag libraries

When it comes to custom tags, life has definitely just got easier. You could test them before, but any call to another tag had to be manually mocked, for example via mockFor(). This was fine for simple tags, but it could quickly become a burden for more complex tags.

So what's changed? First of all, unit tests now look more like integration tests in that you use an applyTemplate() method with the markup form of the tag you're testing. Second, you don't have to mock calls to other custom tags. The standard Grails tags will just work and you can enable other tags by simply calling mockTagLib() with the relevant TagLib class.

As an example, consider these very simple tags:

```groovy
Copypackage org.example

class FirstTagLib {
    static namespace = "f"

    def styledLink = { attrs, body ->
        out << '<span class="mylink">' << s.postLink(attrs, body) << '</span>'
    }
}

class SecondTagLib {
    static namespace = "s"

    def postLink = { attrs, body ->
        out << g.link(controller: "post", action: "list", body)
    }
}
```

The <f:styledLink> tag calls the <s:postLink> one, which in turns calls the standard <g:link> tag. So if we want to test the <f:styledLink> tag, we mock SecondTagLib to ensure that <s:postLink> is operational and then execute applyTemplate() like so:

```groovy
Copypackage org.example

import grails.test.mixin.*

@TestFor(FirstTagLib)
class FirstTagLibTests {
    void testStyledLink() {
        mockTagLib(SecondTagLib)
        assert applyTemplate('<f:styledLink>Test</f:styledLink>') == '<span class="mylink"><a href="/post/list">Test</a></span>'
    }
}
```

As you can see, Grails does a lot of heavy lifting for you, ensuring that chains of tag calls will work as they would in the application. One thing you do need to bear in mind is that tags like <g:link> will assume a servlet context of "", hence why the above example checks for an href value of "/post/list" rather than "/my-app/post/list".

These are just two examples of the improved unit testing support. Others include:

-   Grails Filters
-   File uploads
-   Command objects
-   View and template rendering

As you can see, there are few areas of Grails code that can't now be unit tested.

## Conclusion

Testing has always been an important part of application development and the ease of testing has a direct impact on test coverage: the easier it is to write tests, the more likely developers are to write them. That's why the unit testing changes that come with the 2.0 release of Grails are so significant. They make it much easier to write unit tests for scenarios that used to be relatively tricky. With that, the test coverage of the average Grails application is likely to go up and developers will end up with more robust applications.

All of this makes the unit testing improvements one of the most significant features of Grails 2.0 and a compelling argument for upgrading. So download the latest 2.0 release and give it a whirl!