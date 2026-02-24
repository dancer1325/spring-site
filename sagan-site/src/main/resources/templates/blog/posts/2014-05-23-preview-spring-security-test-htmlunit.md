---
title: Preview Spring Security Test: HtmlUnit
source: https://spring.io/blog/2014/05/23/preview-spring-security-test-htmlunit
scraped: 2026-02-23T22:30:20.663Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Winch |  May 23, 2014 | 3 Comments
---

# Preview Spring Security Test: HtmlUnit

_Engineering | Rob Winch |  May 23, 2014 | 3 Comments_

\[callout title=Updated March 31 2015\]This blog is outdated and no longer maintained. Please refer to the [Test Section](http://docs.spring.io/spring-security/site/docs/4.0.x/reference/htmlsingle/#test) of the reference documentation for updated documentation. \[/callout\]

In my [previous blog](http://spring.io/blog/2014/05/07/preview-spring-security-test-method-security) we explored how we can use the testing support with Spring MVC Test. We will now see how the same support works with [Spring Test MVC HtmlUnit](https://github.com/spring-projects/spring-test-mvc-htmlunit).

\[callout title=Minimum Versions\]The Spring Security testing support does not work with spring-test-mvc-htmlunit-1.0.0.M1.jar. Instead, you just use the latest snapshot. This is due to some slight modifications to allow Spring Security and the MockMvcHtmlUnitDriver to work together. \[/callout\]

## [](#setting-up-htmlunit-and-spring-security)Setting Up HtmlUnit and Spring Security

The setup for `HtmlUnit` and Spring Security integration is very similar to that of [using Spring MVC Test and HtmlUnit](https://github.com/spring-projects/spring-test-mvc-htmlunit#creating-mockmvc). Below we highlight the differences:

```java
Copy@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {WebMvcConfig.class, WebSecurityConfig.class, MockDataConfig.class})
@WebAppConfiguration
@TestExecutionListeners(listeners={ServletTestExecutionListener.class,
        DependencyInjectionTestExecutionListener.class,
        DirtiesContextTestExecutionListener.class,
        TransactionalTestExecutionListener.class,
        WithSecurityContextTestExcecutionListener.class})
@WithMockUser
public class MockMvcHtmlUnitCreateMessageTest {
  @Autowired
  private Filter springSecurityFilterChain;

  @Autowired
  private WebApplicationContext context;

  private WebClient webClient;

  @Before
  public void setup() {
      MockMvc mockMvc = MockMvcBuilders
              .webAppContextSetup(context)
              .addFilters(springSecurityFilterChain)
              .build();
      driver = new MockMvcHtmlUnitDriver(mockMvc, true);
  }
}
```

\[callout title=Source Code\]You can find the complete source code for this blog [on github](https://github.com/rwinch/spring-security-test-blog) \[/callout\]

-   The first difference is to ensure we add our Security configuration, `WebSecurityConfig`, to the `@ContextConfiguration`
-   The next difference is to ensure to add the `WithSecurityContextTestExcecutionListener` just as we did when [testing method based security](https://spring.io/blog/2014/05/07/preview-spring-security-test-method-security#user-content-security-test-setup).
-   We then need to use a Spring Security `WithSecurityContext` annotation. In this instance we used [@WithMockUser](https://spring.io/blog/2014/05/07/preview-spring-security-test-method-security#user-content-withmockuser), but any of the annotations used in the method security section can be leveraged.
-   We need to get the `springSecurityFilterChain` and add it to the `MockMvcBuilders` filters.

Now we can run our tests assuming we are authenticated with the username "user" and the role "ROLE\_USER". Of course, just as we did in method security, we could easily change the annotation to reflect the user we want to run as.

Without needing to explicitly authenticate before our tests we can be sure to isolate our tests more easily. By simply running as a user we drastically simplify testing (this is especially true when authentication is complex like a SSO workflow). We also drastically speed up our tests by eliminating the need to actually authenticate. What's more, we can integrate Spring Security Test support with [HtmlUnit/WebDriver](https://github.com/spring-projects/spring-test-mvc-htmlunit#mockmvc-and-webdriver) or [HtmlUnit/Geb](https://github.com/spring-projects/spring-test-mvc-htmlunit#mockmvc-and-geb) using the same steps outlined above.

## [](#conclusion)Conclusion

We have now gone over how Spring Security Testing support can make testing of method security, web security, and HtmlUnit based testing easier. We hope you enjoyed this blog series.

If you have feedback on this blog series or the Spring Security Test support, I encourage you to reach out via [JIRA](https://jira.spring.io/browse/SEC%22), via the comments section, or ping me on twitter [@rob\_winch](https://twitter.com/rob_winch). Of course the best feedback comes in the form of [contributions](https://github.com/spring-projects/spring-security/blob/master/CONTRIBUTING.md).