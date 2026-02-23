---
title: Spring Security 4.1.1 Released
source: https://spring.io/blog/2016/07/07/spring-security-4-1-1-released
scraped: 2026-02-23T19:11:22.647Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  July 07, 2016 | 3 Comments
---

# Spring Security 4.1.1 Released

_Releases | Rob Winch |  July 07, 2016 | 3 Comments_

I’m pleased to announce the release of Spring Security 4.1.1.RELEASE which resolves over [50 issues](https://github.com/spring-projects/spring-security/milestone/87?closed=1). This release provides mitigation for [CVE-2016-5007](https://spring.io/blog/2016/07/08/cve-2016-5007-spring-security-mvc-path-matching-inconsistency) There are also lots of bug fixes, but there are also a few notable enhancements.

-   [MvcRequestMatcher](http://docs.spring.io/spring-security/site/docs/4.1.x/reference/htmlsingle/#mvc-requestmatcher) provides deep integration with Spring MVC to ensure consistent path matching strategies for authorization rules
    
-   [CORS Support](http://docs.spring.io/spring-security/site/docs/4.1.x/reference/htmlsingle/#cors) that can leverage Spring MVC’s CORS configuration
    
-   [CookieCsrfTokenRepository.withHttpOnlyFalse()](http://docs.spring.io/spring-security/site/docs/4.1.x/reference/htmlsingle/#csrf-cookie) for easily integrating with AngularJS applications
    

# [](#contributions)[](#contributions)Contributions

Without the community we couldn’t be the successful project we are today. I’d like to thank everyone that created issues & provided feedback.

# [](#feedback-please)[](#feedback-please)Feedback Please

If you have feedback on this release, I encourage you to reach out via [StackOverflow](http://stackoverflow.com/questions/tagged/spring-security), [GitHub Issues](https://github.com/spring-projects/spring-security/issues), or via the comments section. You can also ping me [@rob\_winch](https://twitter.com/rob_winch) or Joe [@joe\_grandja](https://twitter.com/joe_grandja) on Twitter.

Of course the best feedback comes in the form of [contributions](https://github.com/spring-projects/spring-security/blob/master/CONTRIBUTING.md).

[Project Site](http://projects.spring.io/spring-security/) | [Reference](http://docs.spring.io/spring-security/site/docs/4.1.1.RELEASE/reference/htmlsingle/) | [Guides](http://docs.spring.io/spring-security/site/docs/4.1.1.RELEASE/guides/html5/) | [Help](http://stackoverflow.com/questions/tagged/spring-security)