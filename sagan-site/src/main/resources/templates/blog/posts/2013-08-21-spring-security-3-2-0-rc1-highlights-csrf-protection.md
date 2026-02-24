---
title: Spring Security 3.2.0.RC1 Highlights: CSRF Protection
source: https://spring.io/blog/2013/08/21/spring-security-3-2-0-rc1-highlights-csrf-protection
scraped: 2026-02-24T07:59:49.950Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Winch |  August 21, 2013 | 42 Comments
---

# Spring Security 3.2.0.RC1 Highlights: CSRF Protection

_Engineering | Rob Winch |  August 21, 2013 | 42 Comments_

\[callout title=Update\]

This blog post is no longer maintained. Refer to the [CSRF documentation](http://docs.spring.io/spring-security/site/docs/3.2.x/reference/htmlsingle/#csrf) for up to date information about Spring Security and CSRF protection.

\[/callout\]

On Monday I announced the [release of Spring Security 3.2.0.RC1](http://www.springsource.org/node/22675). This is the first of a two part blog series going over the new features found in Spring Security 3.2.0.RC1.

In this first entry, I will go over Spring Security's CSRF support. In the [next post](http://blog.springsource.org/2013/08/23/spring-security-3-2-0-rc1-highlights-security-headers/), I will go over the various security headers that have been added.

## [](#csrf-attacks)CSRF Attacks

Spring Security has added protection against [Cross Site Request Forgery (CSRF) attacks](http://en.wikipedia.org/wiki/Cross-site_request_forgery). Great, but what is a CSRF attack and how can Spring Security protect me against it? Let's take a look at a concrete example to get a better understanding.

Assume that your bank's website provides a form that allows transferring money from the currently logged in user to another bank account. For example, the HTTP request might look like:

```
CopyPOST /transfer HTTP/1.1
Host: bank.example.com
Cookie: JSESSIONID=randomid; Domain=bank.example.com; Secure; HttpOnly
Content-Type: application/x-www-form-urlencoded

amount=100.00&routingNumber=1234&account=9876
```

Now pretend you authenticate to your bank's website and then, without logging out, visit an evil website. The evil website contains an HTML page with the following form:

```html
Copy<form action="https://bank.example.com/transfer" method="post">
  <input type="hidden"
      name="amount"
      value="100.00"/>
  <input type="hidden"
      name="routingNumber"
      value="evilsRoutingNumber"/>
  <input type="hidden"
      name="account"
      value="evilsAccountNumber"/>
  <input type="submit"
      value="Win Money!'/>
</form>
```

You like to win money, so you click on the submit button. In the process, you have unintentionally transferred $100 to a malicious user. This happens because, while the evil website cannot see your cookies, the cookies associated with your bank are still sent along with the request.

Worst yet, this whole process could have been automated using JavaScript. This means you didn't even need to click on the button. So how do we protect ourselves from such attacks?

## Synchronizer Token Pattern

The issue is that the HTTP request from the bank's website and the request from the evil website are exactly the same. This means there is no way to reject requests coming from the evil website and allow requests coming from the bank's website. To protect against CSRF attacks we need to ensure there is something in the request that the evil site is unable to provide.

One solution is to use the [Synchronizer Token Pattern](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_\(CSRF\)_Prevention_Cheat_Sheet#General_Recommendation:_Synchronizer_Token_Pattern). This solution is to ensure that each request requires, in addition to our session cookie, a randomly generated token as an HTTP parameter. When a request is submitted, the server must look up the expected value for the parameter and compare it against the actual value in the request. If the values do not match, the request should fail.

We can relax the expectations to only require the token for each HTTP request that updates state. This can be safely done since the [same origin policy](http://en.wikipedia.org/wiki/Same-origin_policy) ensures the evil site cannot read the response. Additionally, we do not want to include the random token in HTTP GET as this can [cause the tokens to be leaked](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_\(CSRF\)_Prevention_Cheat_Sheet#Disclosure_of_Token_in_URL).

Let's take a look at how our example would change. Assume the randomly generated token is present in an HTTP parameter named \_csrf. For example, the request to transfer money would look like this:

```
CopyPOST /transfer HTTP/1.1
Host: bank.example.com
Cookie: JSESSIONID=randomid; Domain=bank.example.com; Secure; HttpOnly
Content-Type: application/x-www-form-urlencoded

amount=100.00&routingNumber=1234&account=9876&_csrf=<secure-random>
```

You will notice that we added the `_csrf` parameter with a random value. Now the evil website will not be able to guess the correct value for the \_csrf parameter (which must be explicitly provided on the evil website) and the transfer will fail when the server compares the actual token to the expected token.

## [](#using-spring-security-csrf-support)Using Spring Security CSRF Support

So what are the steps necessary to use Spring Security's to protect our site against CSRF attacks? The steps to using Spring Security's CSRF protection are outlined below:

-   [Use proper HTTP verbs](#use-proper-http-verbs)
-   [Configure CSRF Protection](#configure-csrf-protection)
-   [Include CSRF Token](#include-csrf-token)

### [](#use-proper-http-verbs)Use proper HTTP Verbs

The first step to protecting against CSRF attacks is to ensure your website uses proper HTTP verbs. Specifically, before Spring Security's CSRF support can be of use, you need to be certain that your application is using PATCH, POST, PUT, and/or DELETE for anything that modifies state. This is not a limitation of Spring Security's support, but instead a general requirement for proper CSRF prevention.

### [](#configuring-csrf-protection)Configuring CSRF Protection

The next step is to include Spring Security's CSRF protection within your application. If you are using the XML configuration, this can be done using the [`<csrf />`](http://static.springsource.org/spring-security/site/docs/3.2.0.RELEASE/reference/htmlsingle/appendix-namespace.html#nsa-csrf) element:

```xml
Copy<http ...>
    ...
    <csrf />
</http>
```

CSRF protection is enabled by default with Java configuration. If you would like to disable CSRF, the corresponding Java configuration can be seen below:

```java
Copy@EnableWebSecurity
@Configuration
public class WebSecurityConfig extends
   WebSecurityConfigurerAdapter {

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
      .csrf().disable()
      ...;
  }
}
```

## [](#include-csrf-token)Include CSRF token

#### [](#form-submissions)Form Submissions

If you are using Spring MVC [form:form](form:form) tag, the CsrfToken is automatically included for you using the [CsrfRequestDataValueProcessor](http://static.springsource.org/spring-security/site/docs/3.2.x/apidocs/org/springframework/security/web/servlet/support/csrf/CsrfRequestDataValueProcessor.html).

Also of interest is that once [issue 7](https://github.com/thymeleaf/thymeleaf-spring3/issues/7) is resolved, Thymeleaf should have automatic integration.

The last step is to ensure that you include the CSRF token in all PATCH, POST, PUT, and DELETE methods. This can be done using the \_csrf request attribute to obtain the current [CsrfToken](http://static.springsource.org/spring-security/site/docs/3.2.0.RC1/apidocs/org/springframework/security/web/csrf/CsrfToken.html). An example of doing this with a JSP is shown below:

```xml
Copy
<c:url var="logoutUrl" value="/logout"/>
<form action="${logoutUrl}"
    method="post">
  <input type="submit"
    value="Log out" />
  <input type="hidden"
    name="${_csrf.parameterName}"
    value="${_csrf.token}"/>
</form>
```

#### [](#ajax-requests)AJAX Requests

If you using JSON, then it is not possible to submit the CSRF token within an HTTP parameter. Instead you can submit the token within a HTTP header. A typical pattern would be to include the CSRF token within your meta tags:

```xml
Copy<html>
  <head>
    <meta name="_csrf" content="${_csrf.token}"/>
    <!-- default header name is X-CSRF-TOKEN -->
    <meta name="_csrf_header" content="${_csrf.headerName}"/>
    ...
  </head>
  ...
```

You can then include the token within all your AJAX requests. If you were using JQuery, this could be done with the following:

```javascript
Copy$(function () {
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    $(document).ajaxSend(function(e, xhr, options) {
        xhr.setRequestHeader(header, token);
    });
});
```

### [](#csrf-caveats)CSRF Caveats

There are a few caveats when implementing CSRF.

#### [](#timeouts)Timeouts

> #### [](#csrf-in-cookies)CSRF in Cookies
> 
> One might ask why the CsrfToken isn't stored in a cookie. This is because there are known exploits in which headers (i.e. set cookies) can be set by another domain. Another disadvantage is that by removing the state (i.e. the timeout) you lose the ability to forcibly terminate the token if something got compromised.

One issue is that the expected CSRF token is stored in the HttpSession, so as soon as the HttpSession expires your configured AccessDeniedHandler will receive a `InvalidCsrfTokenException`. If you are using the default `AccessDeniedHandler`, the browser will get an HTTP 403 and display a poor error message.

A simple way to mitigate an active user experiencing a timeout is to have some JavaScript that lets the user know their session is about to expire. The user can click a button to continue and refresh the session.

Alternatively, specifying a custom AccessDeniedHandler allows you to process the `InvalidCsrfTokenException` anyway you like. For an example of how to customize the AccessDeniedHandler refer to the provided links for both [xml](http://static.springsource.org/spring-security/site/docs/3.2.0.RELEASE/reference/htmlsingle/#nsa-access-denied-handler) and [Java configuration](https://github.com/SpringSource/spring-security/blob/3.2.0.RC1/config/src/test/groovy/org/springframework/security/config/annotation/web/configurers/NamespaceHttpAccessDeniedHandlerTests.groovy#L64).

#### [](#logging-in)Logging In

In order to protect against [forging log in requests](http://en.wikipedia.org/wiki/Cross-site_request_forgery#Forging_login_requests) the log in form should be protected against CSRF attacks too. Since the CsrfToken is stored in HttpSession, this means an HttpSession will be created immediately. While this sounds bad in a RESTful / stateless architecture the reality is that state is necessary to implement practical security. Without state, we have nothing we can do if a token is compromised. Practically speaking, the CSRF token is quite small in size and should have a negligible impact on our architecture.

#### [](#logging-out)Logging out

Adding CSRF will update the LogoutFilter to only use HTTP POST. This ensures that log out requires a CSRF token and that a malicious user cannot forcibly log out your users.

One approach is to use a form for log out. If you really want a link, you can use JavaScript to have the link perform a POST (i.e. maybe on a hidden form). For browsers with JavaScript that is disabled, you can optionally have the link take the user to a log out confirmation page that will perform the POST.

#### [](#hiddenhttpmethodfilter)HiddenHttpMethodFilter

The `HiddenHttpMethodFilter` should be placed before the Spring Security filter. In general this is true, but it could have additional implications when protecting against CSRF attacks.

Note that the HiddenHttpMethodFilter only overrides the HTTP method on a POST, so this is actually unlikely to cause any real problems. However, it is still best practice to ensure it is placed before Spring Security's filters.

### [](#overriding-defaults)Overriding Defaults

Spring Security's goal is to provide defaults that protect your users from exploits. This does not mean that you are forced to accept all of its defaults.

For example, you can provide a custom [CsrfTokenRepository](http://static.springsource.org/spring-security/site/docs/3.2.0.RELEASE/reference/htmlsingle/#nsa-csrf-token-repository-ref) to override the way in which the CsrfToken is stored.

You can also specify a custom [RequestMatcher](http://static.springsource.org/spring-security/site/docs/3.2.0.RELEASE/reference/htmlsingle/#nsa-csrf-request-matcher-ref) to determine which requests are protected by CSRF (i.e. perhaps you don't care if log out is exploited). In short, if Spring Security's CSRF protection doesn't behave exactly as you want it, you are able to customize the behavior.

## [](#conclusion)Conclusion

You should now have a good idea what CSRF is and how to use Spring Security to protect your application from CSRF exploits.

In the [next post](http://blog.springsource.org/2013/08/23/spring-security-3-2-0-rc1-highlights-security-headers/), I will discuss how to use Spring Security's headers support can protect your application from exploits like clickjacking.