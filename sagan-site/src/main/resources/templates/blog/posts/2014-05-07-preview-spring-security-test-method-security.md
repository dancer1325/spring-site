---
title: Preview Spring Security Test: Method Security
source: http://spring.io/blog/2014/05/07/preview-spring-security-test-method-security
scraped: 2026-02-23T22:30:16.332Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Winch |  May 07, 2014 | 25 Comments
---

# Preview Spring Security Test: Method Security

_Engineering | Rob Winch |  May 07, 2014 | 25 Comments_

\[callout title=Updated March 31 2015\]This blog is outdated and no longer maintained. Please refer to the [Test Section](http://docs.spring.io/spring-security/site/docs/4.0.x/reference/htmlsingle/#test) of the reference documentation for updated documentation. \[/callout\]

On Monday [I announced](http://spring.io/blog/2014/05/05/spring-security-4-0-0-m1-released) the release of Spring Security 4.0.0.M1. This is the first of a three part blog series introducing the Spring Security Testing support. The series outline can be seen below:

-   In this post we will discuss how spring-security-test makes method based security testing easier
-   Our [second post](http://spring.io/blog/2014/05/23/preview-spring-security-test-web-security) will demonstrate how to use spring-security-test with [Spring MVC Test](http://docs.spring.io/spring/docs/3.2.x/spring-framework-reference/html/testing.html#spring-mvc-test-framework)
-   Our [final post](http://spring.io/blog/2014/05/23/preview-spring-security-test-htmlunit) will demonstrate how to use spring-security-test with [Spring Test MVC HtmlUnit](https://github.com/spring-projects/spring-test-mvc-htmlunit)

## [](#testing-method-security)Testing Method Security

Testing method based security has always been fairly simple. However, that doesn't mean it couldn't be better. Let's explore a very simple sample to see how we can use Spring Security Test support to make method based security testing easier.

We first introduce a `MessageService` that requires the user to be authenticated in order to access it.

\[callout title=Source Code\]You can find the complete source code for this blog series [on github](https://github.com/rwinch/spring-security-test-blog) \[/callout\]

```java
Copypublic class HelloMessageService implements MessageService {

	@PreAuthorize("authenticated")
	public String getMessage() {
		Authentication authentication = SecurityContextHolder.getContext()
                                                             .getAuthentication();
		return "Hello " + authentication;
	}
}
```

The result of `getMessage` is a String saying "Hello" to the current Spring Security `Authentication`. An example of the output is displayed below.

```text
CopyHello org.springframework.security.authentication.UsernamePasswordAuthenticationToken@ca25360: Principal: org.springframework.security.core.userdetails.User@36ebcb: Username: user; Password: [PROTECTED]; Enabled: true; AccountNonExpired: true; credentialsNonExpired: true; AccountNonLocked: true; Granted Authorities: ROLE_USER; Credentials: [PROTECTED]; Authenticated: true; Details: null; Granted Authorities: ROLE_USER
```

### [](#security-test-setup)Security Test Setup

Before we can use Spring Security Test support, we must perform some setup. An example can be seen below:

```java
Copy@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
@TestExecutionListeners(listeners={ServletTestExecutionListener.class,
		DependencyInjectionTestExecutionListener.class,
		DirtiesContextTestExecutionListener.class,
		TransactionalTestExecutionListener.class,
		WithSecurityContextTestExcecutionListener.class})
public class WithMockUserTests {
```

This is a basic example of how to setup Spring Security Test. The highlights can be seen well:

-   `@RunWith` instructs the spring-test module that it should create an ApplicationContext This is no different than using the existing Spring Test support. For additional information, refer to the [Spring Reference](http://docs.spring.io/spring-framework/docs/4.0.x/spring-framework-reference/htmlsingle/#integration-testing-annotations-standard)
-   `@ContextConfiguration` instructs the spring-test the configuration to use to create the `ApplicationContext`. Since no configuration is specified, the default configuration locations will be tried. This is no different than using the existing Spring Test support. For additional information, refer to the [Spring Reference](http://docs.spring.io/spring-framework/docs/4.0.x/spring-framework-reference/htmlsingle/#testcontext-ctx-management)
-   `@TestExecutionListeners` instructs the spring-test module to, in addition to the default listeners, use the `WithSecurityContextTestExcecutionListener` which will ensure our tests are ran with the correct user. It does this by populating the `SecurityContextHolder` prior to running our tests. After the test is done, it will clear out the `SecurityContextHolder`.

\[callout title=NOTE\]

It is understood that the `@TestExecutionListeners` is quite verbose and there are a number of existing JIRA's that should hopefully improve on this in the future. See [SEC-2585](https://jira.spring.io/browse/SEC-2585) to keep up to date on this.

\[/callout\]

Remember we added the `@PreAuthorize` annotation to our `HelloMessageService` and so it requires an authenticated user to invoke it. If we ran the following test, we would expect the following test will pass:

```java
Copy@Test(expected = AuthenticationCredentialsNotFoundException.class)
public void getMessageUnauthenticated() {
    messageService.getMessage();
}
```

### [](#withmockuser)@WithMockUser

The question is how could we most easily run the test as a specific user. Since we are using `WithSecurityContextTestExcecutionListener`, the following test will be ran as a user with the username "user", the password "password", and the roles "ROLE\_USER".

```java
Copy@Test
@WithMockUser
public void getMessageWithMockUser() {
  String message = messageService.getMessage();
  ...
}
```

Specifically the following is true:

-   The user with the username "user" does not have to exist since we are mocking the user
-   The `Authentication` that is populated in the `SecurityContext` is of type `UsernamePasswordAuthenticationToken`
-   The principal on the `Authentication` is a `User`
-   The `User` will have the username of "user", the password "password", and the `GrantedAuthority`s are a single one named "ROLE\_USER".

Our example is nice because it provides a lot of defaults. What if we wanted to run the test with a different username? The following test would run with the username "customUser". Again, the user does not need to actually exist.

```java
Copy@Test
@WithMockUser("customUsername")
public void getMessageWithMockUserCustomUsername() {
	String message = messageService.getMessage();
  ...
}
```

We can also easily customize the roles. For example, this test will be invoked with the username "admin" and the roles "ROLE\_USER" and "ROLE\_ADMIN".

```java
Copy@Test
@WithMockUser(username="admin",roles={"USER","ADMIN"})
public void getMessageWithMockUserCustomUser() {
	String message = messageService.getMessage();
	...
}
```

Of course it can be a bit tedious placing the annotation on every test method. Instead, we can place the annotation at the class level and every test will use the specified user. For example, the following would run every test with a user with the username "admin", the password "password", and the roles "ROLE\_USER" and "ROLE\_ADMIN".

```java
Copy@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
@TestExecutionListeners(listeners={ServletTestExecutionListener.class,
    DependencyInjectionTestExecutionListener.class,
    DirtiesContextTestExecutionListener.class,
    TransactionalTestExecutionListener.class,
    WithSecurityContextTestExcecutionListener.class})
@WithMockUser(username="admin",roles={"USER","ADMIN"})
public class WithMockUserTests {
```

### [](#withuserdetails)@WithUserDetails

While `@WithMockUser` is a very convenient way to get started, it may not work in all instances. For example, it is common for applications to expect that the `Authentication` principal be of a specific type. This is done so that the application can refer to the principal as the custom type and reduce coupling on Spring Security.

The custom principal is often times returned by a custom `UserDetailsService` that returns an object that implements both `UserDetails` and the custom type. For situations like this, it is useful to create the test user using the custom `UserDetailsService`. That is exactly what `@WithUserDetails` does.

Assuming we have a `UserDetailsService` exposed as a bean, the following test will be invoked with an `Authentication` of type `UsernamePasswordAuthenticationToken` and a principal that is returned from the `UserDetailsService` with the username of "user".

```java
Copy@Test
@WithUserDetails
public void getMessageWithUserDetails() {
	String message = messageService.getMessage();
	...
}
```

We can also customize the username used to lookup the user from our `UserDetailsService`. For example, this test would be executed with a principal that is returned from the `UserDetailsService` with the username of "customUsername".

```java
Copy@Test
@WithUserDetails("customUsername")
public void getMessageWithUserDetailsCustomUsername() {
	String message = messageService.getMessage();
	...
}
```

Like `@WithMockUser` we can also place our annotation at the class level so that every test uses the same user. However unlike `@WithMockUser`, `@WithUserDetails` requires the user to exist.

### [](#withsecuritycontext)@WithSecurityContext

We have seen that `@WithMockUser` is an excellent choice if we are not using a custom `Authentication` principal. Next we discovered that `@WithUserDetails` would allow us to use a custom `UserDetailsService` to create our `Authentication` principal but required the user to exist. We will now see an option that allows the most flexibility.

We can create our own annotation that uses the `@WithSecurityContext` to create any `SecurityContext` we want. For example, we might create an annotation named `@WithMockCustomUser` as shown below:

```java
Copy@WithSecurityContext(factory = WithMockCustomUserSecurityContextFactory.class)
public @interface WithMockCustomUser {

	String username() default "rob";

	String name() default "Rob Winch";
}
```

You can see that `@WithMockCustomUser` is annotated with the `@WithSecurityContext` annotation. This is what signals to Spring Security Test support that we intend to create a `SecurityContext` for the test. The `@WithSecurityContext` annotation requires we specify a `SecurityContextFactory` that will create a new `SecurityContext` given our `@WithMockCustomUser` annotation. You can find our `WithMockCustomUserSecurityContextFactory` implementation below:

```java
Copypublic class WithMockCustomUserSecurityContextFactory implements WithSecurityContextFactory<WithMockCustomUser> {
	@Override
	public SecurityContext createSecurityContext(WithMockCustomUser customUser) {
		SecurityContext context = SecurityContextHolder.createEmptyContext();

		CustomUserDetails principal =
			new CustomUserDetails(customUser.name(), customUser.username());
		Authentication auth =
			new UsernamePasswordAuthenticationToken(principal, "password", principal.getAuthorities());
		context.setAuthentication(auth);
		return context;
	}
}
```

We can now annotate a test class or a test method with our new annotation and Spring Security's `WithSecurityContextTestExcecutionListener` will ensure that our `SecurityContext` is populated appropriately.

When creating your own `WithSecurityContextFactory` implementations, it is nice to know that they can be annotated with standard Spring annotations. For example, the `WithUserDetailsSecurityContextFactory` uses the `@Autowired` annotation to acquire the `UserDetailsService`:

```java
Copyfinal class WithUserDetailsSecurityContextFactory implements WithSecurityContextFactory<WithUserDetails> {

    private UserDetailsService userDetailsService;

    @Autowired
    public WithUserDetailsSecurityContextFactory(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    public SecurityContext createSecurityContext(WithUserDetails withUser) {
        String username = withUser.value();
        Assert.hasLength(username, "value() must be non empty String");
        UserDetails principal = userDetailsService.loadUserByUsername(username);
        Authentication authentication = new UsernamePasswordAuthenticationToken(principal, principal.getPassword(), principal.getAuthorities());
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authentication);
        return context;
    }
}
```

## [](#to-the-web-)To the web ...

In this post we demonstrated how Spring Security Test can make testing method based security much easier. However, the best is is yet to come. In our [next post](http://spring.io/blog/2014/05/23/preview-spring-security-test-web-security), we will demonstrate how Spring Security Test can make testing our applications with Spring MVC Test easier.

\[callout title=Feedback please!\] If you have feedback on this blog series or the Spring Security Test support, I encourage you to reach out via [JIRA](https://jira.spring.io/browse/SEC), via the comments section, or ping me on twitter [@rob\_winch](https://twitter.com/rob_winch). Of course the best feedback comes in the form of [contributions](https://github.com/spring-projects/spring-security/blob/master/CONTRIBUTING.md). \[/callout\]