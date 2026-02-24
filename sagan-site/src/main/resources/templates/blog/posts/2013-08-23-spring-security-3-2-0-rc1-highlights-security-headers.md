---
title: Spring Security 3.2.0.RC1 Highlights: Security Headers
source: https://spring.io/blog/2013/08/23/spring-security-3-2-0-rc1-highlights-security-headers
scraped: 2026-02-24T07:59:32.059Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Winch |  August 23, 2013 | 5 Comments
---

# Spring Security 3.2.0.RC1 Highlights: Security Headers

_Engineering | Rob Winch |  August 23, 2013 | 5 Comments_

# [](#update)UPDATE

**NOTE** This blog post is no longer maintained. Refer to the [Headers documentation](http://docs.spring.io/spring-security/site/docs/3.2.x-SNAPSHOT/reference/html/headers.html) for up to date information about Spring Security's Headers.

# [](#original-article)Original Article

This is my last post in a two part series on Spring Security 3.2.0.RC1. My [previous post](http://blog.springsource.org/2013/08/21/spring-security-3-2-0-rc1-highlights-csrf-protection/) discussed Spring Security's CSRF protection. In this post we will discuss how to use Spring Security to add various response headers to help secure your application.

## Security Headers

Many of the new Spring Security features in 3.2.0.RC1 are implemented by adding headers to the response. The foundation for these features came from hard work from [Marten Deinum](https://twitter.com/mdeinum). If the name sounds familiar, it may because one of his 10K+ posts on the Spring Forums has helped you out.

If you are using XML configuration, you can add all of the default headers using Spring Security's [](http://static.springsource.org/spring-security/site/docs/3.2.x-SNAPSHOT/reference/html/ns-config.html#ns-headers)element with no child elements to add all the default headers to the response:

```xml
Copy<http ...>
    ...
    <headers />
</http>
```

If you are using Spring Security's Java configuration, all of the default security headers are added by default. They can be disabled using the Java configuration below:

\`\`\`xml @EnableWebSecurity @Configuration public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

@Override protected void configure(HttpSecurity http) throws Exception { http .headers().disable() ...; } }

````
Copy
<p>The remainder of this post will discuss each of the default headers in more detail:</p>
<ul>
<li><a href="#cache-control">Cache Control</a></li>
<li><a href="#content-type-options">Content Type Options</a></li>
<li><a href="#hsts">HTTP Strict Transport Security</a></li>
<li><a href="#x-frame-options">X-Frame-Options</a></li>
<li><a href="#x-xss-protection">X-XSS-PROTECTION</a></li>
</ul>
<p><a name="cache-control"></a></p>
<h3>Cache Control</h3>
<p>In the past Spring Security required you to provide your own cache control for your web application. This seemed reasonable at the time, but browser caches have evolved to include caches for secure connections as well. This means that a user may view an authenticated page, log out, and then a malicious user can use the browser history to view the cached page. To help mitigate this Spring Security has added cache control support which will insert the following headers into you response.</p>

```xml
Cache-Control: no-cache, no-store, max-age=0, must-revalidate
Pragma: no-cache
````

Simply adding the element with no child elements will automatically add Cache Control and quite a few other protections. However, if you only want cache control, you can enable this feature using Spring Security's XML namespace with the [](http://static.springsource.org/spring-security/site/docs/3.2.x-SNAPSHOT/reference/html/appendix-namespace.html#nsa-cache-control)element.

```xml
Copy<http ...>
    ...
    <headers>
        <cache-control />
    </headers>
</http>
```

Similarly, you can enable only cache control within Java Configuration with the following:

```java
Copy@EnableWebSecurity
@Configuration
public class WebSecurityConfig extends
   WebSecurityConfigurerAdapter {

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
      .headers()
        .cacheControl()
        .and()
      ...;
  }
}
```

If you actually want to cache specific responses, your application can selectively invoke [HttpServletResponse.setHeader(String,String)](http://docs.oracle.com/javaee/6/api/javax/servlet/http/HttpServletResponse.html#setHeader\(java.lang.String, java.lang.String\)) to override the header set by Spring Security. This is useful to ensure things like CSS, JavaScript, and images are properly cached.

When using Spring Web MVC, this is typically done within your configuration. For example, the following configuration will ensure that the cache headers are set for all of your resources:

```java
Copy@EnableWebMvc
public class WebMvcConfiguration extends WebMvcConfigurerAdapter {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
            .addResourceHandler("/resources/**")
            .addResourceLocations("/resources/")
            .setCachePeriod(31556926);
    }

    // ...
}
```

### Content Type Options

Uploading Files

There are many additional things one should do (i.e. only display the document in a distinct domain, ensure Content-Type header is set, sanitize the document, etc) when allowing content to be uploaded. However, these measures are out of the scope of what Spring Security provides. It is also important to point out when disabling content sniffing, you must specify the content type in order for things to work properly.

Historically browsers, including Internet Explorer, would try to guess the content type of a request using [content sniffing](http://en.wikipedia.org/wiki/Content_sniffing). This allowed browsers to improve the user experience by guessing the content type on resources that had not specified the content type. For example, if a browser encountered a JavaScript file that did not have the content type specified, it would be able to guess the content type and then execute it.

The problem with content sniffing is that this allowed malicious users to use polyglots (i.e. a file that is valid as multiple content types) to execute XSS attacks. For example, some sites may allow users to submit a valid postscript document to a website and view it. A malicious user might create a [postscript document that is also a valid JavaScript file](http://webblaze.cs.berkeley.edu/papers/barth-caballero-song.pdf) and execute a XSS attack with it.

Content sniffing can be disabled by adding the following header to our response:

```plain
CopyX-Content-Type-Options: nosniff
```

Just as with the cache control element, the nosniff directive is added by default when using the element with no child elements. However, if you want more control over which headers are added you can use the [](http://static.springsource.org/spring-security/site/docs/3.2.x-SNAPSHOT/reference/html/appendix-namespace.html#nsa-content-type-options)element as shown below:

```xml
Copy<http ...>
    ...
    <headers>
        <content-type-options />
    </headers>
</http>
```

The X-Content-Type-Options header is added by default with Spring Security Java configuration. If you want more control over the headers, you can explicitly specify the content type options with the following:

```java
Copy@EnableWebSecurity
@Configuration
public class WebSecurityConfig extends
   WebSecurityConfigurerAdapter {

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
      .headers()
        .contentTypeOptions()
        .and()
      ...;
  }
}
```

### HTTP Strict Transport Security (HSTS)

When you type in your bank's website, do you enter mybank.example.com or do you enter https://mybank.example.com? If you omit the https protocol, you are potentially vulnerable to [Man in the Middle attacks](http://en.wikipedia.org/wiki/Man-in-the-middle_attack). Even if the website performs a redirect to https://mybank.example.com a malicious user could intercept the initial HTTP request and manipulate the response (i.e. redirect to https://mibank.example.com and steal their credentials).

Many users omit the https protocol and this is why [HTTP Strict Transport Security (HSTS)](http://tools.ietf.org/html/rfc6797) was created. Once mybank.example.com is added as a [HSTS host](http://tools.ietf.org/html/rfc6797#section-5.1), a browser can know ahead of time that any request to mybank.example.com should be interpreted as https://mybank.example.com. This greatly reduces the possibility of a Man in the Middle attack occurring.

HSTS Notes

In accordance with [RFC6797](http://tools.ietf.org/html/rfc6797#section-7.2), the HSTS header is only injected into HTTPS responses. In order for the browser to acknowledge the header, the browser must first trust the CA that signed the SSL certificate used to make the connection (not just the SSL certificate).  

One way for a site to be marked as a HSTS host is to have the host preloaded into the browser. Another is to add the "Strict-Transport-Security" header to the response. For example the following would instruct the browser to treat the domain as an HSTS host for a year (there are approximately 31536000 seconds in a year):

```plain
CopyStrict-Transport-Security: max-age=31536000 ; includeSubDomains
```

The optional includeSubDomains directive instructs Spring Security that subdomains (i.e. secure.mybank.example.com) should also be treated as an HSTS domain.

As with the other headers, Spring Security adds the previous header to the response when the element is specified with no child elements. It is also automatically added when you are using Java Configuration. You can also only use HSTS headers with the [](http://static.springsource.org/spring-security/site/docs/3.2.x-SNAPSHOT/reference/html/appendix-namespace.html#nsa-hsts)element as shown below:

```xml
Copy<http ...>
    ...
    <headers>
        <hsts />
    </headers>
</http>
```

Similarly, you can enable only HSTS headers with Java Configuration:

```java
Copy@EnableWebSecurity
@Configuration
public class WebSecurityConfig extends
   WebSecurityConfigurerAdapter {

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
      .headers()
        .hsts()
        .and()
      ...;
  }
}
```

### X-Frame-Options

Content Security Policy

Another modern approach to dealing with clickjacking is using a [Content Security Policy](http://www.w3.org/TR/CSP/). Spring Security does not provide support for this as the specification is not released and it is quite a bit more complicated. To stay up to date with this issue and to see how you can implement it with Spring Security refer to [SEC-2117](https://jira.springsource.org/browse/SEC-2117)  

Allowing your website to be added to a frame can be a security issue. For example, using clever CSS styling users could be tricked into clicking on something that they were not intending ([video demo](http://www.youtube.com/watch?v=3mk0RySeNsU)). For example, a user that is logged into their bank might click a button that grants access to other users. This sort of attack is known as [Clickjacking](http://en.wikipedia.org/wiki/Clickjacking).

There are a number ways to mitigate clickjacking attacks. For example, to protect legacy browsers from clickjacking attacks you can use [frame breaking code](https://www.owasp.org/index.php/Clickjacking_Defense_Cheat_Sheet#Best-for-now_Legacy_Browser_Frame_Breaking_Script). While not perfect, the frame breaking code is the best you can do for the legacy browsers.

A more modern approach to address clickjacking is to use [X-Frame-Options](https://developer.mozilla.org/en-US/docs/HTTP/X-Frame-Options) header:

```plain
CopyX-Frame-Options: DENY
```

The X-Frame-Options response header instructs the browser to prevent any site with this header in the response from being rendered within a frame. As with the other response headers, this is automatically included when the element is specified with no child elements. You can also explicitly specify the [](http://static.springsource.org/spring-security/site/docs/3.2.x-SNAPSHOT/reference/html/appendix-namespace.html#nsa-frame-options)element to control which headers are added to the response.

```xml
Copy<http ...>
    ...
    <headers>
        <frame-options />
    </headers>
</http>
```

Similarly, you can enable only frame options within Java Configuration with the following:

```java
Copy@EnableWebSecurity
@Configuration
public class WebSecurityConfig extends
   WebSecurityConfigurerAdapter {

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
      .headers()
        .frameOptions()
        .and()
      ...;
  }
}
```

### X-XSS-Protection

Some browsers have built in support for filtering out [reflected XSS attacks](https://www.owasp.org/index.php/Testing_for_Reflected_Cross_site_scripting_\(OWASP-DV-001\)). This is by no means full proof, but does assist in XSS protection.

The filtering is typically enabled by default, so adding the header typically just ensures it is enabled and instructs the browser what to do when a XSS attack is detected. For example, the filter might try to change the content in the least invasive way to still render everything. At times, this type of replacement can become a [XSS vulnerability](http://hackademix.net/2009/11/21/ies-xss-filter-creates-xss-vulnerabilities/) in itself. Instead, it is best to block the content rather than attempt to fix it. To do this we can add the following header:

```plain
CopyX-XSS-Protection: 1; mode=block
```

This header is included by default when the element is specified with no child elements. We can explicitly state it using the [](http://static.springsource.org/spring-security/site/docs/3.2.x-SNAPSHOT/reference/html/appendix-namespace.html#nsa-xss-protection)element as shown below:

```xml
Copy<http ...>
    ...
    <headers>
        <xss-protection />
    </headers>
</http>
```

Similarly, you can enable only xss protection within Java Configuration with the following:

```java
Copy@EnableWebSecurity
@Configuration
public class WebSecurityConfig extends
   WebSecurityConfigurerAdapter {

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
      .headers()
        .xssProtection()
        .and()
      ...;
  }
}
```

## Feedback Please

If you encounter a bug, have an idea for improvement, etc please do not hesitate to bring it up! We want to hear your thoughts so we can ensure we get it right before the code is generally available. Trying out new features early is a good and simple way to give back to the community. This also ensures that the features you want are present and working as you think they should.

Please log any issues or feature requests to the [Spring Security JIRA](https://jira.springsource.org/browse/SEC). After logging a JIRA, we encourage (but do not require) you to submit your changes in a pull request. You can read more about how to do this in the [Contributor Guidelines](https://github.com/SpringSource/spring-security/blob/master/CONTRIBUTING.md)

If you have questions on how to do something, please use the [Spring Security forums](http://forum.springsource.org/forumdisplay.php?33-Security) or [Stack Overflow with the tag spring-security](http://stackoverflow.com/questions/tagged/spring-security) (I will be monitoring them closely). If you have specific comments questions about this blog, feel free to leave a comment. Using the appropriate tools will help make it easier for everyone.

## Conclusion

You should have a good understanding of the new features present in Spring Security 3.2.RC1.