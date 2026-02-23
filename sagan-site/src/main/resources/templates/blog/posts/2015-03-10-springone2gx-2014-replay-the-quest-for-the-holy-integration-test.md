---
title: SpringOne2GX 2014 Replay: The Quest for the Holy Integration Test
source: https://spring.io/blog/2015/03/10/springone2gx-2014-replay-the-quest-for-the-holy-integration-test
scraped: 2026-02-23T21:51:54.558Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Pieter Humphrey |  March 10, 2015 | 0 Comments
---

# SpringOne2GX 2014 Replay: The Quest for the Holy Integration Test

_News | Pieter Humphrey |  March 10, 2015 | 0 Comments_

Recorded at SpringOne2GX 2014.

Speaker: Ken Kreuger, Rob Winch

Web / JavaScript Track

Slides: [http://www.slideshare.net/SpringCentral/spring-one2gx-2014holyintegrationtest](http://www.slideshare.net/SpringCentral/spring-one2gx-2014holyintegrationtest)

Spring MVC Test can help greatly to thoroughly test controllers including their configuration. However for browser based clients we are not able to easily interact with the application as a user does. For example, a user would request a page that contains a form, fill out a form, submit the form, some Java Script may execute, and then the user would see some sort of result. In this presentation, we will provide an overview of testing Spring Web applications . We will see that see that by combining Spring MVC Test & HtmlUnit we are able to able to easily interact with our application in the same way (including JavaScript execution) users do. We will also see how we can easily create reusable components that represent our views, so that as we refactor our application our tests can easily be updated. Finally, we will see how we can combine these techniques with BDD to find our holy grail of integration testing.