---
title: What happened to getConfigLocations()?
source: https://spring.io/blog/2006/12/08/what-happened-to-getconfiglocations
scraped: 2026-02-24T09:33:07.691Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Hale |  December 08, 2006 | 0 Comments
---

# What happened to getConfigLocations()?

_Engineering | Ben Hale |  December 08, 2006 | 0 Comments_

I was on site at a customer last week and a question came from the crowd, "Why isn't getConfigLocations() abstract anymore?" After working in front of customers for a while, it becomes rare that you're speechless, and yet I was. To be honest, my first thought was that there was no way the customer could be right. But lo and behold, in [revision 1.3 of AbstractSingleSpringContextTests](http://springframework.cvs.sourceforge.net/springframework/spring/mock/org/springframework/test/AbstractSingleSpringContextTests.java?view=log) it clearly states that getConfigLocations() is no longer abstract. I hadn't created any new integration tests against 2.0.1, so I hadn't even seen the change.

Surprised by this, I put in an email to Juergen to find out what was up and this is what he had to say.

> This change was for people who override "contextKey()" and "loadContext(Object)", obtaining some other form of ApplicationContext (not the default ClassPathXmlApplicationContext). In that case, "getConfigLocations()" doesn't make sense, since it is only relevant for the default implementation of "contextKey()". So anybody overriding those hooks had to provide an empty "getConfigLocations()" method, which was a bit silly... If we always wanted people to provide config locations, we shouldn't have exposed those protected "contextKey()" and "loadContext(Object)" methods in the first place.

So the short story is that you can still override the getConfigLocations() method the way you always have, you just won't have a reminder in the form of an abstract method.

A special thanks to Gregory Kick for bringing this up.