---
title: Spring Security 3.2.0.RC2 Released
source: https://spring.io/blog/2013/11/01/spring-security-3-2-0-rc2-released
scraped: 2026-02-24T07:54:27.454Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  November 01, 2013 | 0 Comments
---

# Spring Security 3.2.0.RC2 Released

_Releases | Rob Winch |  November 01, 2013 | 0 Comments_

Spring Security 3.2.0.RC2 is now available from the SpringSource repository at [http://repo.springsource.org](http://repo.springsource.org). See [here](https://github.com/spring-projects/spring-framework/wiki/Downloading-Spring-artifacts#wiki-resolving-spring-artifacts) for a quick tutorial on resolving these artifacts via Maven.

# [](#whats-new)What's new?

The release resolves [80+ issues](https://jira.springsource.org/secure/ReleaseNote.jspa?projectId=10040&version=14228). Most of the issues for this release were fixing bug, adding documentation, and converting our documentation to [Asciidoctor](http://asciidoctor.org/).

Refer to the recently added [What's new in Spring Security 3.2](http://docs.spring.io/spring-security/site/docs/3.2.x/reference/htmlsingle/#new-3.2) to find all the highlights of this release. You will notice there are some nice features that have been added that I have not blogged about. Be sure to follow the links to see and links to details within the reference.

There are a few non-passive changes to the Java Configuration support that should be emphasized.

## [](#registerauthentication---configure)registerAuthentication -> configure

The first change is that the `registerAuthentication(AuthenticationManagerBuilder)` method on `WebSecurityConfigurerAdapter` and `GlobalMethodSecurityConfiguration` has been changed to `configure(AuthenticationManagerBuilder)`. This better aligns with the Spring Security configuration naming conventions and reduces the size of the method signature to save on typing.

## [](#objectpostprocessorquiesent_postprocessor-removed)ObjectPostProcessor.QUIESENT\_POSTPROCESSOR removed

The second change is that if you were creating your own instance of `AuthenticationManagerBuilder`, you were probably passing in `ObjectPostProcessor.QUIESENT_POSTPROCESSOR` into it. This could cause serious issues (memory leaks among other things). Therefore, `ObjectPostProcessor.QUIESENT_POSTPROCESSOR` has been removed. Instead, users should utilize the Global `AuthenticationManagerBuilder` that is available when using `@EnableWebSecurity` or `@EnableGlobalMethodSecurity`. For example, if you want to configure global authentication (i.e. you only have a single AuthenticationManager) you should autowire the AuthenticationMangerBuilder:

```java
Copy@Autowired
public void configureGlobal(AuthenticationManagerBuilder auth) {
   // ... configure it ...
}
```

If you are wanting the scope of the authentication to be private to a particular `WebSecurityConfigurerAdapter` you can override the `configure(AuthenticationManagerBuilder)` method.

# [](#feedback-please)Feedback Please

As always keep the feedback coming. If you have questions, please post to [stackoverflow with the spring-security tag](https://stackoverflow.com/questions/tagged/spring-security). If you find issues, please log them in our [JIRA](https://jira.springsource.org/browse/SEC). We plan to do a final release in early December, so make sure to give Spring Security 3.2 a try before then to make sure it works for you!