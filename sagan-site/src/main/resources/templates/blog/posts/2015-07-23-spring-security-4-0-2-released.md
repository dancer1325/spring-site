---
title: Spring Security 4.0.2 Released
source: https://spring.io/blog/2015/07/23/spring-security-4-0-2-released
scraped: 2026-02-23T19:46:41.885Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  July 23, 2015 | 7 Comments
---

# Spring Security 4.0.2 Released

_Releases | Rob Winch |  July 23, 2015 | 7 Comments_

I'm pleased to announce the release of Spring Security 4.0.2.RELEASE. This release is the second maintenance release of the 4.0 line and focusses on fixing any major issues that were found in the new release. For complete details on the release, refer to the [Change Log](https://jira.spring.io/issues/?jql=project%20%3D%20SEC%20AND%20fixVersion%20%3D%204.0.2).

Along with **lots of bug fixes**, the highlights of this release include:

## [](#support-for-spring-framework-42)Support for Spring Framework 4.2

Spring Framework 4.2 GA is just around the corner. Spring Security 4.0.2 fixes some issues when running with Spring Framework 4.2. We are also rerunning our entire test suite using Spring Framework 4.2.

## [](#minor-improvements-to-spring-security-test)Minor Improvements to Spring Security Test

Previously, Spring Security's test support would fail if there was no ApplicationContext. This was inconvenient if you were just wanting to run tests as a specific user. What's more it was inconvenient to disable other features (i.e. loading an ApplicationContext) of Spring Test. The updates in Spring Security 4.0.2 allow running tests as a specific user with:

```java
Copy@SecurityTestExecutionListeners
@RunWith(SpringJUnit4ClassRunner.class)
public class MyTests {

    @WithMockUser
    @Test
    public void runsAsUserWithNoApplicationContext() {

    }
}
```

The SecurityTestExecutionListeners is a meta annotation that signals to Spring's Test Framework to only use Spring Security related TestExecutionListeners and not to try loading the ApplicationContext.

## [](#httpstatusreturninglogoutsuccesshandler)HttpStatusReturningLogoutSuccessHandler

Spring Security 4.0.2 includes a [HttpStatusReturningLogoutSuccessHandler](http://docs.spring.io/spring-security/site/docs/current/reference/htmlsingle/#jc-logout-success-handler) which allows returning an HTTP status code when the user has successfully logged out making it easy to signal to a REST client authentication was successful.

You an use it with the following Java Based Configuration:

```java
Copy
http
    .logout()
        .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler())
```

If you are using XML Namespace configuration, you can use the [logout@success-handler-ref](http://docs.spring.io/spring-security/site/docs/current/reference/htmlsingle/#nsa-logout-attributes) :

```xml
Copy<b:bean id="successHandler"
    class="org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler"/>
<http ...>
    <logout success-handler-ref="successHandler"/>
</http>
```

## [](#changes-for-spring-cloud-security)Changes for Spring Cloud Security

The release includes changes for Spring Cloud Security (i.e. AES/GCM support).

[Project Site](http://projects.spring.io/spring-security/) | [Reference](http://docs.spring.io/spring-security/site/docs/4.0.2.RELEASE/reference/htmlsingle/) | [Guides](http://docs.spring.io/spring-security/site/docs/4.0.2.RELEASE/guides/html5/)