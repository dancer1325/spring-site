---
title: What\'s New in Spring Security 2?
source: https://spring.io/blog/2007/12/06/what-s-new-in-spring-security-2
scraped: 2026-02-24T09:22:49.419Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Alex |  December 06, 2007 | 0 Comments
---

# What's New in Spring Security 2?

_Engineering | Ben Alex |  December 06, 2007 | 0 Comments_

I was cruising the blogosphere today and encountered one of the [shortest blogs](http://netzooid.com/blog/2007/12/03/every-time-you-use-acegi/) I've ever read. To quote nearly the entire entry, "Every time you use Acegi, a fairy dies. The sad thing is there really isn't anything better around...".

Between our [community forums](http://forum.springframework.org), [developer](https://lists.sourceforge.net/lists/listinfo/acegisecurity-developer) [lists](https://lists.sourceforge.net/lists/listinfo/springframework-developer), [JIRA](http://opensource.atlassian.com/projects/spring/), [user](http://www.springone.com) [conference](http://www.thespringexperience.com/) [BOFs](http://www.thespringexperience.com/speaker_topic_view.jsp?topicId=394), [training](http://www.springsource.com/training), [support](http://www.springsource.com/support), [consulting](http://www.springsource.com/consulting) and [team blog](http://blog.springsource.com), we receive a great deal of community feedback. There is little doubt that many people have sought improvements to the Spring Security (formerly Acegi) configuration format, and we've invested a lot of time in making that possible.

As I'll be [presenting](http://www.thespringexperience.com/show_session_view.jsp?presentationId=279&showId=46) at next week's [Spring Experience](http://www.thespringexperience.com) conference, Spring Security 2.0.0 M1 features tremendously simplified configuration. You will now be able to add Spring Security to your application by the following three steps:

1.  Add the required JARs to your classpath. Maven 2 users can simply specify a dependency in their POM, as we use Maven to build.
2.  Add a single filter and corresponding mapping to your web.xml.
3.  Add a few elements to your Spring container configuration file.

Adding the filter to web.xml requires the following code:

```xml
Copy
<filter>
    <filter-name>_filterChainProxy</filter-name>
    <filter-class>org.springframework.web.filter.DelegatingFilterProxy</filter-class>
</filter>

<filter-mapping>
    <filter-name>_filterChainProxy</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

The third and final step requires you to add the new Spring Security 2 namespace to an existing configuration file, or create a new XML file containing your security configuration. For many users, the file will be very short and resemble:

```xml
Copy

<beans:beans namespace declarations>
    <annotation-driven />

    <http auto-config="true">
        <intercept-url pattern="/**" access="IS_AUTHENTICATED_REMEMBER" />
    </http>

    <repository>
        <user-service hash="md5:hex">
            <user name="rod" password="a564de63c2d0da68cf47586ee05984d7" authorities="ROLE_SUPERVISOR,ROLE_USER" />
        </user-service>
    </repository>
</beans:beans>
```

The above configuration reliably delivers the following capabilities to your web application:

-   Form based login
-   A logout handler
-   Automatic generation of a login page
-   BASIC authentication support (ideal for remoting protocols and web services)
-   Remember-me support via cookies
-   Anonymous authentication (so all your anonymous users have a username and role)
-   Integration with your database-backed user repository (you can also specify them in XML with <user .../>)
-   Automatic enforcement of @Secured annotations on your Spring-managed objects
-   Servlet API integration (ie HttpServletRequest.isUserInRole(String) and HttpServletRequest.getPrincipal())
-   A requirement to logon to use any part of the application

As such, the <http auto-configure="true"> statement provides standard web applications with most of what they need in a single element. Naturally you can fine-tune the individual settings, such as specifying a different realm name (<http auto-configure="true" realm="My Application">), customizing your login page details (<form-login login-page="/myLogin.jsp" />), or switching to a more advanced remember-me token repository (<remember-me token-repository="persistedRepository" />).

Including the namespace declaration formalities, the above configuration file runs to about 16 lines. The old configuration style would have required around 120 lines of XML for comparable capabilities.

Whilst the configuration improvements are considerable, we also have other features in Spring Security 2.0.0 M1 as well! For one, you now have a choice of storing remember-me tokens in a database, which provides enhanced security. We also have hierarchical role support, which is a kind of granted authority aliasing strategy on steroids. Plus, the long-awaited user management API, NTLM support, portlet integration and much more.

If you'd like to learn more about Spring Security 2, come and see it in action at [The Spring Experience](http://www.thespringexperience.com). There are three sessions scheduled covering Spring Security 2, including an [introduction](http://www.thespringexperience.com/speaker_topic_view.jsp?topicId=329), coverage of [what's new](http://www.thespringexperience.com/show_session_view.jsp?presentationId=279&showId=46) and improved, plus how to use the new [portlet security integration](http://www.thespringexperience.com/show_session_view.jsp?presentationId=282&showId=46). For those of you who can't make it, you will be able to download the first milestone release late next week.

Hopefully these enhancements will save a few fairies.