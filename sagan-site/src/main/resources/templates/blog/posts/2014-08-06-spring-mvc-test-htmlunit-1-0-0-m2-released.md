---
title: Spring MVC Test HtmlUnit 1.0.0.M2 Released
source: https://spring.io/blog/2014/08/06/spring-mvc-test-htmlunit-1-0-0-m2-released
scraped: 2026-02-23T22:18:08.995Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  August 06, 2014 | 0 Comments
---

# Spring MVC Test HtmlUnit 1.0.0.M2 Released

_Releases | Rob Winch |  August 06, 2014 | 0 Comments_

I'm pleased to announce the second milestone release of [Spring MVC Test HtmlUnit](https://github.com/spring-projects/spring-test-htmlunit).

The project’s aim is to provide integration between \[Spring MVC Test\](Spring MVC Test Framework) and [HtmlUnit](http://htmlunit.sourceforge.net/). This simplifies performing end to end testing when using HTML based views.

**Changelog**

You can view the complete [changelog](https://github.com/spring-projects/spring-test-htmlunit/issues?q=milestone%3A1.0.0.M2+is%3Aclosed) on github. Below are the highlights of the release:

-   The release contains [Reference Documentation](http://docs.spring.io/spring-test-htmlunit/docs/current/reference/) and Publishes the [API Docs](http://docs.spring.io/spring-test-htmlunit/docs/current/api/)
-   The artifact name has changed from spring-test-mvc-htmlunit to spring-test-htmlunit See the [Updating Dependencies](http://docs.spring.io/spring-test-htmlunit/docs/current/reference/#updating-dependencies) to see how to add Spring MVC Test HtmlUnit as either a Maven or Gradle dependency
-   The project name has been changed to Spring MVC Test HtmlUnit in order to better align with Spring MVC Test's name
-   Context root of "" is now supported
-   [Support for external resources](https://github.com/spring-projects/spring-test-htmlunit/issues/24) has been added. See the javadoc of [DelegatingWebConnection](http://docs.spring.io/spring-test-htmlunit/docs/current/api/org/springframework/test/web/servlet/htmlunit/DelegatingWebConnection.html) for additional details.
-   Bug fixes

\[callout title=SpringOne 2GX 2014 is around the corner\]Book your place at [SpringOne](https://2014.event.springone2gx.com/register) in Dallas, TX for Sept 8-11 soon. It's simply the best opportunity to find out first hand all that's going on and to provide direct feedback. [The Quest for the Holy Integration Test](https://2014.event.springone2gx.com/schedule/sessions/the_quest_for_the_holy_integration_test.html) session will contain detailed information on how to test your Spring web applications including detailed information about Spring MVC Test HtmlUnit. Of course there plenty of other exciting Spring related talks!\[/callout\]