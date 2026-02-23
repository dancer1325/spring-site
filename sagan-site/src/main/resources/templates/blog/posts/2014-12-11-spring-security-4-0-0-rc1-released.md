---
title: Spring Security 4.0.0.RC1 Released
source: https://spring.io/blog/2014/12/11/spring-security-4-0-0-rc1-released
scraped: 2026-02-23T22:03:38.841Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  December 11, 2014 | 6 Comments
---

# Spring Security 4.0.0.RC1 Released

_Releases | Rob Winch |  December 11, 2014 | 6 Comments_

We are please to announce the release of Spring Security 4.0.0.RC1. This release resolved [40 tickets](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=10040&version=14683). You can find a highlight of the changes below.

-   **Updated Defaults** - As security evolves, so does Spring Security. We took this opportunity to ensure that the defaults were more secure. For example, the XML Namespace support now enables CSRF protection by default.
-   **Polish WebSocket Security** - We received very valuable feedback from the community which allowed us to polish the WebSocket security. We also added XML Namespace configuration support for WebSocket security. Details can be found on the update blog [Preview Spring Security WebSocket Support](http://spring.io/blog/2014/08/21/preview-spring-security-websocket-support)
-   **Minimum Dependency Versions** - The minimum dependency versions have been bumped up. For example, Spring Security now requires Spring 4.1.x.
-   **Removed Deprecations** - while this may not be everyone's favorite feature, it is necessary to clean up unnecessary code. This makes the code base easier to understand and maintain.
-   **Documentation Formats** - when we updated to using asciidoctor, the PDF and HTML Multi Page outputs were removed. We once again provide [HTML Single](http://docs.spring.io/spring-security/site/docs/4.0.x/reference/htmlsingle/), [HTML Multi Page](http://docs.spring.io/spring-security/site/docs/4.0.x/reference/html/), [EPub](http://docs.spring.io/spring-security/site/docs/4.0.x/reference/epub/spring-security-reference.epub) and [PDF](http://docs.spring.io/spring-security/site/docs/4.0.x/reference/pdf/spring-security-reference.pdf) outputs.
-   **Simplified Configuration** - By leveraging Spring 4.x new features, Spring Security's minimal configuration has been drastically simplified. For example, the minimal configuration to secure a web application can be seen below:

```java
Copy@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
            .inMemoryAuthentication()
                .withUser("user").password("password").roles("USER");
    }
}
```

Please try out the updates and provide feedback. Our current plan is to go GA in January.

[Spring Security](http://projects.spring.io/spring-security/) | [JIRA](https://jira.spring.io/browse/SEC) | [Reference](http://docs.spring.io/spring-security/site/docs/4.0.x/reference/htmlsingle/)