---
title: Spring Security Configuration with Scala
source: https://spring.io/blog/2011/08/01/spring-security-configuration-with-scala
scraped: 2026-02-24T08:37:30.802Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Luke Taylor |  August 01, 2011 | 0 Comments
---

# Spring Security Configuration with Scala

_Engineering | Luke Taylor |  August 01, 2011 | 0 Comments_

In a previous article, [Behind the Spring Security Namespace](http://blog.springsource.com/2010/03/06/behind-the-spring-security-namespace/), I talked about how the Spring Security namespace has been very successful in providing a simple alternative to plain Spring bean configuration, but how there is still a steep learning curve when you want to start customizing its behaviour. Behind the XML elements and attributes, various filters and helper strategies are created and wired together, but, short of reading the code which handles the XML parsing, there is no easy way of working out which classes are involved or the details of how they interact.

For some time now, we've been trying to come up with an alternative Java-based solution using [Spring's `@Configuration` classes](http://static.springsource.org/spring/docs/3.0.x/spring-framework-reference/html/beans.html#beans-java) that retains the simplicity of the XML namespace but also makes the underlying behavior more transparent and easier to customize. While theoretically possible, no Java-based solution seemed to meet the goals we set out to achieve, mainly due to the range of options available in Spring Security.

In this post, I'll give an overview of how Scala provides an elegant solution to the problem, with a syntax which is very readable to someone who is already familiar with the XML namespace. The code is available on [github](https://github.com/tekul/scalasec/), It's a work in progress and I'm still a Scala novice, so any feedback or suggestions from experts out there would be most welcome.

The references to Spring Security here apply to the forthcoming 3.1 release. Also, if you haven't used Spring's Java-based configuration before, you might want to check out [this blog post](http://blog.springsource.com/2009/12/22/configuration-simplifications-in-spring-3-0/) by Chris Beams.

## The Problem

Let's first briefly run over how the namespace configuration works, focusing on the web part, which is the most complex. Suppose our configuration contains the following:

```xml
Copy
    <http use-expressions="true">
        <intercept-url pattern="/secure/extreme/**" access="hasRole('Admin')" />
        <intercept-url pattern="/**" access="hasRole('User')" />
        <form-login />
        <logout  />
    </http>
```

The `http` element creates a `SecurityFilterChain` which is used to configure an instance of Spring Security's `FilterChainProxy` (the target bean which we usually refer to as "springSecurityFilterChain" in our `web.xml` files).

By itself, `http` creates several standard filters (including a `SecurityContextPeristenceFilter`, `ExceptionTranslationFilter` and `FilterSecurityInterceptor`). The `intercept-url` elements describe the access rules which are used by the `FilterSecurityInterceptor` to decide whether access should be granted for a particular request.

As we add other XML elements, additional features are "mixed in" to the filter chain. The `form-login` element adds a `UsernamePasswordAuthenticationFilter` and `logout` adds a `LogoutFilter`. If you added a `remember-me` element, you would get a `RememberMeAuthenticationFilter` and `RememberMeServices` implementation, the specific type of which depends on the additional XML attributes used.

In Spring Security 3.1, you will be able to use more than one `http` element to create multiple filter chains. Each chain handles different paths within the application, for example a stateless API under the URL `/rest/**` and a stateful web application configuration for all other requests.

So the namespace offers a lot of different possibities. How can we achieve something like this using an `@Configuration` model, retaining the simplicity of the XML mix-in approach, but exposing the underlying implementation as part of the syntax?

## Scala Traits as Configuration Mixins

Ideally, we'd like to be able to write something like:

```scala
Copy
@Configuration
class SecurityConfiguration {

  @Bean
  def filterChainProxy = new FilterChainProxy(formLoginFilterChain)

  @Bean
  def formLoginFilterChain = 
    new FilterChain with FormLogin with Logout {
      interceptUrl("/secure/**", hasRole("Admin"))
      interceptUrl("/**", hasRole("User"))
    }
}
```

where `FormLogin` and `Logout` are types we can inspect in our code editor to see exactly what they do. It turns out that by using Scala we can do just that. The configuration snippet above is 100% pure Scala code and apart from a couple of minor requirements (such as the need for an `AuthenticationManager`), it could be used directly in an existing Java web application.

We've used [Scala traits](http://www.scala-lang.org/node/126) here to mix in the form-login and logout behaviour to a basic filter chain class (see the highlighted line in the above snippet). In Java, we are limited to single-inheritance and the use of interfaces. Traits are a bit like interfaces, but can contain implementations of methods and even additional fields which will become part of the class into which they are mixed, so they can easily encapsulate the functionality required by a particular feature. They can also override the built-in behaviour of the class (or indeed other mixed-in traits). Traits can take a bit of getting your head round at first. I'd recommend reading the traits chapter in [Programming in Scala](http://www.artima.com/shop/programming_in_scala_2ed) as a good introduction.

The `FilterChain` class here is analogous to the `http` element from the XML namespace, providing a basic configuration into which the traits can be mixed. It extends a base class, `StatelessFilterChain` which provides the bare configuration to handle stateless requests and `FilterChain` then overrides and augments it with the beans and filters that are appropriate for stateful requests which make use of an `HttpSession`. Of course you can override or manipulate any of the references (from either the class or the mixed-in traits) directly in your configuration. You can find more detail on how these classes work together in the [project wiki on github](https://github.com/tekul/scalasec/wiki).

A major benefit of the Scala approach is that you can immediately find out what each of the traits does. Since Scala has static typing, both Eclipse and IntelliJ IDEA will let you navigate directly to the implementation:

![Image of IDE highlighting](http://blog.springsource.com/wp-content/uploads/2011/07/scalaConfigFormLogin.png "Syntax highlighting of Logout trait")

Syntax highlighting of Logout trait

So, for example you can navigate to the `FormLogin` trait and see that it must be mixed into a `StatelessFilterChain` instance (the "extends" clause) and that it adds a reference to a `UsernamePasswordAuthenticationFilter`:

```scala
Copy
trait FormLogin extends StatelessFilterChain with LoginPage with FilterChainAuthenticationManager {
  lazy val formLoginFilter = {
    val filter = new UsernamePasswordAuthenticationFilter
    filter.setAuthenticationManager(authenticationManager)
    filter.setRememberMeServices(rememberMeServices)
    filter
  }

  ...
}
```

You can also see that it mixes in a couple of additional traits. The code for `LoginPage` is:

```scala
Copy
private[scalasec] trait LoginPage extends StatelessFilterChain {
  val loginPage: String

  override def entryPoint : AuthenticationEntryPoint = {
    new LoginUrlAuthenticationEntryPoint(loginPage)
  }
}
```

So this adds an *abstract* value called `loginPage` and uses it to override the `AuthenticationEntryPoint` which is defined in `StatelessFilterChain`. The `FilterChainAuthenticationManager` trait also defines an abstract value called `authenticationManager`. Looking back at the code-highlighting example above, you might wonder why "`FilterChain`" is underlined in red. In fact, this code won't compile as it stands.

```source
Copyerror] value loginPage in trait LoginPage of type String is not defined
[error] value authenticationManager in trait FilterChainAuthenticationManager of type org.springframework.security.authentication.AuthenticationManager is not defined
[error]     new FilterChain with FormLogin with Logout {
[error]         ^
```

So we will get an error even before we try to run the application unless we supply values for the abstract values `loginPage` and `authenticationManager`. A working configuration would be:

```scala
Copy
@Configuration
class SecurityConfiguration {

  @Bean
  def filterChainProxy = new FilterChainProxy(formLoginFilterChain)

  @Bean
  def formLoginFilterChain = {
    new FilterChain with FormLogin with Logout {
      override val loginPage = "/login.jsp"
      override val authenticationManager = testAuthenticationManager
      interceptUrl("/secure/extreme/**", hasRole("Admin"))
      interceptUrl("/**", hasRole("User"))
    }
  }

  @Bean
  def testAuthenticationManager = new TestAuthenticationManager()
}
```

We've defined the `AuthenticationManager` instance using standard `@Bean` syntax. In a real application you would most likely use an instance of Spring Security's `ProviderManager` injected with a list of `AuthenticationProvider`s.

## Scala Functions as an Alternative to Expression-Language (EL)

Spring Security 3.0 introduced support for EL expressions for access-control. However, since Scala supports first-class functions, why use an untyped string when you can just pass a function directly? This is something else that takes a bit of getting used to if you haven't seen it before. I'd recommend reading up on Scala's support for partial functions and [currying](http://www.scala-lang.org/node/135) to understand fully how this works.

Consider the line:

```scala
Copy
     interceptUrl("/**", hasRole("User"))
```

The second argument to the `interceptUrl` method is a function of type `(Authentication, HttpServletRequest) => Boolean`, which means it must accept an `Authentication` object and an `HttpServletRequest` and return a boolean. When a request is received which matches this rule, the function will be invoked passing in the user's `Authentication` object and the request. This is exactly the same as using EL rules but is much more powerful, and is also statically typed. You can pass in any function with this signature, so you can code all your access rules directly in Scala and easily unit test them in isolation. The example code has some functions which mimic the current EL support. Again, you can navigate directly to the implementations in your IDE:

```scala
Copy
  def permitAll(a: Authentication, r: HttpServletRequest) = true

  def denyAll(a: Authentication, r: HttpServletRequest) = false

  def hasRole(role: String)(a: Authentication, r: HttpServletRequest) = a.getAuthorities.exists(role == _.getAuthority)

  ...
```

Note that `hasRole` has two parameter groups (another Scala feature), which allows us to use `hasRole("someRole")` as a function of the required type to pass to the `interceptUrl` method. This is only a very basic illustration of what's possible. You can write any function you want and use it directly without any extra configuration requirements.

## Conclusion

Overall, I was very impressed with Scala and how well the use of traits fits this problem, without the need for a special DSL. It's trivially easy to write `@Configuration` classes directly in Scala and with some simple implicit conversions and the use of traits, the syntax is just as concise as the XML namespace, but without the obfuscation issues that the latter suffers from. When coding with the pre-defined traits and filter chain classes, you are a step away from the Spring Security objects which make up the configuration and can easily modify or replace them, so you have all the power of a traditional Spring bean configuration but without the verbosity. Being able to use Scala functions directly as security access rules is also a really nice bonus as an alternative to EL.

This has really just been an overview rather than an in-depth discussion. I'd encourage you to take a look at the code on github and experiment with different configurations. Even though some of the implementation details of the configuration traits and their supporting classes might initially be a bit tricky for a beginner, you don't need to know a lot of Scala to use them to build configurations. The github project is also a simple webapp which uses the `@Configuration` class [ScalaSecurityConfiguration.scala](https://github.com/tekul/scalasec/blob/master/src/main/scala/sample/config/ScalaSecurityConfiguration.scala). This is a good place to start as it contains several example configurations.

Support for Scala in IDEs is improving all the time. STS users can install Scala support from the STS extentions tab (I tested this in STS 2.7.1). While you are at it you could also install Gradle support and [import the project as a gradle build](http://static.springsource.org/sts/docs/2.7.0.M1/reference/html/gradle/gradle-sts-tutorial.html#import). Just add the Scala nature to the project once you've imported it. The latest versions of the Intellij IDEA [Scala plugin](http://blog.jetbrains.com/scala/) are also very usable, though you might want to try one of the nightly builds to get the latest features and fixes.