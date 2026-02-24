---
title: Preview Spring Security Test: Web Security
source: https://spring.io/blog/2014/05/23/preview-spring-security-test-web-security
scraped: 2026-02-23T22:30:11.939Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Winch |  May 23, 2014 | 15 Comments
---

# Preview Spring Security Test: Web Security

_Engineering | Rob Winch |  May 23, 2014 | 15 Comments_

\[callout title=Updated March 31 2015\]This blog is outdated and no longer maintained. Please refer to the [Test Section](http://docs.spring.io/spring-security/site/docs/4.0.x/reference/htmlsingle/#test) of the reference documentation for updated documentation. \[/callout\]

In my [previous blog](http://spring.io/blog/2014/05/07/preview-spring-security-test-method-security) we demonstrated how the new Spring Security testing support can ease testing method based security. In this blog we will explore how we can use the testing support with Spring MVC Test.

## [](#setting-up-mockmvc-and-spring-security)Setting Up MockMvc and Spring Security

In order to use Spring Security with Spring MVC Test it is necessary to add the Spring Security `FilterChainProxy` as a `Filter`. For example:

```java
Copy@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
@WebAppConfiguration
public class CsrfShowcaseTests {

  @Autowired
  private WebApplicationContext context;

  @Autowired
  private Filter springSecurityFilterChain;

  private MockMvc mvc;

  @Before
  public void setup() {
      mvc = MockMvcBuilders
              .webAppContextSetup(context)
              .addFilters(springSecurityFilterChain)
              .build();
  }

  ...
```

\[callout title=Source Code\]You can find the complete source code for this blog series [on github](https://github.com/rwinch/spring-security-test-blog) \[/callout\]

## [](#securitymockmvcrequestpostprocessors)SecurityMockMvcRequestPostProcessors

Spring MVC Test provides a convenient interface called a `RequestPostProcessor` that can be used to modify a request. Spring Security provides a number of `RequestPostProcessor` implementations that make testing easier. In order to use Spring Security's `RequestPostProcessor` implementations ensure the following static import is used:

```java
Copyimport static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;
```

### [](#testing-with-csrf-protection)Testing with CSRF Protection

When testing any non safe HTTP methods and using Spring Security's CSRF protection, you must be sure to include a valid CSRF Token in the request. Prior to the Spring Security testing support this was quite challenging. Now you can specify a valid CSRF token as a request parameter using the following:

```java
Copymvc
    .perform(post("/").with(csrf()))
```

If you like you can include CSRF token in the header instead:

```java
Copymvc
    .perform(post("/").with(csrf().asHeader()))
```

You can also test providing an invalid CSRF token using the following:

```java
Copymvc
    .perform(post("/").with(csrf().useInvalidToken()))
```

### [](#running-a-test-as-a-user)Running a Test as a User

It is often desirable to run tests as a specific user. Prior to the Spring Security testing support this was challenging in web based tests since the `SecurityContextHolder` is modified by the `SecurityContextRepositoryFilter`.

There are now two simple ways of populating the user:

-   [Populating a Test User with a RequestPostProcessor](#user-content-populating-a-test-user-with-a-requestpostprocessor)
-   [Populating a Test User with Annotations](#user-content-populating-a-test-user-with-annotations)

\[callout title=NOTE\] The testing support to run as a current user does not currently work when using Spring Security's stateless mode. This is being tracked at [SEC-2593](https://jira.spring.io/browse/SEC-2593). \[/callout\]

#### [](#populating-a-test-user-with-a-requestpostprocessor)Populating a Test User with a RequestPostProcessor

There are a number of options available to populate a test user. For example, the following will run as a user (which does not need to exist) with the username "user", the password "password", and the role "ROLE\_USER":

```java
Copymvc
    .perform(get("/").with(user("user")))
```

You can easily make customizations. For example, the following will run as a user (which does not need to exist) with the username "admin", the password "pass", and the roles "ROLE\_USER" and "ROLE\_ADMIN".

```java
Copymvc
    .perform(get("/admin").with(user("admin").password("pass").roles("USER","ADMIN")))
```

If you have a custom `UserDetails` that you would like to use, you can easily specify that as well. For example, the following will use the specified `UserDetails` (which does not need to exist) to run with a `UsernamePasswordAuthenticationToken` that has a principal of the specified `UserDetails`:

```java
Copymvc
    .perform(get("/").with(user(userDetails)))
```

If you want a custom `Authentication` (which does not need to exist) you can do so using the following:

```java
Copymvc
    .perform(get("/").with(authentication(authentication)))
```

You can even customize the `SecurityContext` using the following:

```java
Copymvc
    .perform(get("/").with(securityContext(securityContext)))
```

We can also ensure to run as a specific user for every request by using `MockMvcBuilders`'s default request. For example, the following will run as a user (which does not need to exist) with the username "admin", the password "password", and the role "ROLE\_ADMIN":

```java
Copymvc = MockMvcBuilders
        .webAppContextSetup(context)
        .defaultRequest(get("/").with(user("user").roles("ADMIN")))
        .addFilters(springSecurityFilterChain)
        .build();
```

If you find you are using the same user in many of your tests, it is recommended to move the user to a method. For example, you can specify the following in your own class named `CustomSecurityMockMvcRequestPostProcessors`:

```java
Copypublic static RequestPostProcessor rob() {
	return user("rob").roles("ADMIN");
}
```

Now you can perform a static import on `SecurityMockMvcRequestPostProcessors` and use that within your tests:

```java
Copyimport static sample.CustomSecurityMockMvcRequestPostProcessors.*;

...

mvc
    .perform(get("/").with(rob()))
```

#### [](#populating-a-test-user-with-annotations)Populating a Test User with Annotations

As an alternative to using a `RequestPostProcessor` to create your user, you can use annotations described in my previous [blog post](http://spring.io/blog/2014/05/07/preview-spring-security-test-method-security). However, for this to work, you must specify a `RequestPostProcessor` runs the request with the user from the annotations as shown below:

```java
Copymvc = MockMvcBuilders
        .webAppContextSetup(context)
        .addFilters(springSecurityFilterChain)
        .defaultRequest(get("/").with(testSecurityContext()))
        .build();
```

\[callout title=NOTE\] Do not forget to specify the `WithSecurityContextTestExcecutionListener` as described in the previous blog. \[/callout\]

Now you can run a test with any of the approaches described in Method Based Security Testing. For example, the following will run the test with the user with username "user", password "password", and role "ROLE\_USER":

```java
Copy@Test
@WithMockUser
public void requestProtectedUrlWithUser() throws Exception {
  mvc
      .perform(get("/"))
      ...
}
```

Alternatively, the following will run the test with the user with username "user", password "password", and role "ROLE\_ADMIN":

```java
Copy@Test
@WithMockUser(roles="ADMIN")
public void requestProtectedUrlWithUser() throws Exception {
  mvc
      .perform(get("/"))
      ...
}
```

For additional information on how to use the annotations, refer to my [previous blog](http://spring.io/blog/2014/05/07/preview-spring-security-test-method-security).

### [](#testing-http-basic-authentication)Testing HTTP Basic Authentication

While it has always been possible to authenticate with HTTP Basic, it was a bit tedious to remember the header name, format, and encode the values. Now this can be done using Spring Security's `httpBasic` `RequestPostProcessor`. For example, the snippet below:

```java
Copymvc
    .perform(get("/").with(httpBasic("user","password")))
```

will attempt to use HTTP Basic to authenticate a user with the username "user" and the password "password" by ensuring the following header is populated on the HTTP Request:

```text
CopyAuthorization: Basic dXNlcjpwYXNzd29yZA==
```

## [](#securitymockmvcrequestbuilders)SecurityMockMvcRequestBuilders

Spring MVC Test also provides a `RequestBuilder` interface that can be used to create the `MockHttpServletRequest` used in your test. Spring Security provides a few `RequestBuilder` implementations that can be used to make testing easier. In order to use Spring Security's `RequestBuilder` implementations ensure the following static import is used:

```java
Copyimport static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders.*;
```

### [](#testing-form-based-authentication)Testing Form Based Authentication

You can easily create a request to test a form based authentication using Spring Security's testing support. For example, the following will submit a POST to "/login" with the username "user", the password "password", and a valid CSRF token:

```java
Copymvc
    .perform(formLogin())
```

It is easy to customize the request. For example, the following will submit a POST to "/auth" with the username "admin", the password "pass", and a valid CSRF token:

```java
Copymvc
    .perform(formLogin("/auth").user("admin").password("pass"))
```

We can also customize the parameters names that the username and password are included on. For example, this is the above request modified to include the username on the HTTP parameter "u" and the password on the HTTP parameter "p".

```java
Copymvc
    .perform(formLogin("/auth").user("a","admin").password("p","pass"))
```

### [](#testing-logout)Testing Logout

While fairly trivial using standard Spring MVC Test, you can use Spring Security's testing support to make testing log out easier. For example, the following will submit a POST to "/logout" with a valid CSRF token:

```java
Copymvc
    .perform(logout())
```

You can also customize the URL to post to. For example, the snippet below will submit a POST to "/signout" with a valid CSRF token:

```java
Copymvc
    .perform(logout("/signout"))
```

## [](#securitymockmvcresultmatchers)SecurityMockMvcResultMatchers

At times it is desirable to make various security related assertions about a request. To accommodate this need, Spring Security Test support implements Spring MVC Test's `ResultMatcher` interface. In order to use Spring Security's `ResultMatcher` implementations ensure the following static import is used:

```java
Copyimport static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers.*;
```

### [](#unauthenticated-assertion)Unauthenticated Assertion

At times it may be valuable to assert that there is no authenticated user associated with the result of a `MockMvc` invocation. For example, you might want to test submitting an invalid username and password and verify that no user is authenticated. You can easily do this with Spring Security's testing support using something like the following:

```java
Copymvc
    .perform(formLogin().password("invalid"))
    .andExpect(unauthenticated());
```

### [](#authenticated-assertion)Authenticated Assertion

It is often times that we must assert that an authenticated user exists. For example, we may want to verify that we authenticated successfully. We could verify that a form based login was successful with the following snippet of code:

```java
Copymvc
    .perform(formLogin())
    .andExpect(authenticated());
```

If we wanted to assert the roles of the user, we could refine our previous code as shown below:

```java
Copymvc
    .perform(formLogin().user("admin"))
    .andExpect(authenticated().withRoles("USER","ADMIN"));
```

Alternatively, we could verify the username:

```java
Copymvc
    .perform(formLogin().user("admin"))
    .andExpect(authenticated().withUsername("admin"));
```

We can also combine the assertions:

```java
Copymvc
    .perform(formLogin().user("admin").roles("USER","ADMIN"))
    .andExpect(authenticated().withUsername("admin"));
```

## [](#with-htmlunit)With HtmlUnit

We have now seen how Spring Security Test support can make testing with Spring MVC Test easier. In our [next blog](http://spring.io/blog/2014/05/23/preview-spring-security-test-htmlunit), we will explore how to use Spring Security Testing support with [Spring Test MVC HtmlUnit](https://github.com/spring-projects/spring-test-mvc-htmlunit).

\[callout title=Feedback please!\] If you have feedback on this blog series or the Spring Security Test support, I encourage you to reach out via [JIRA](https://jira.spring.io/browse/SEC), via the comments section, or ping me on twitter [@rob\_winch](https://twitter.com/rob_winch). Of course the best feedback comes in the form of [contributions](https://github.com/spring-projects/spring-security/blob/master/CONTRIBUTING.md). \[/callout\]