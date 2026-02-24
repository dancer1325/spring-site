---
title: AOP Configuration Choices in Spring 2.0
source: https://spring.io/blog/2006/08/03/aop-configuration-choices-in-spring-2-0
scraped: 2026-02-24T09:36:06.523Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Hale |  August 03, 2006 | 0 Comments
---

# AOP Configuration Choices in Spring 2.0

_Engineering | Ben Hale |  August 03, 2006 | 0 Comments_

There are a lot of reasons to love working at [Interface21](http://www.interface21.com), but by far the best has to be working with the leaders of the industry. For example, one of Spring 2.0's major focus points has been on improving AOP support. We've added a [new configuration namespace](http://static.springframework.org/spring/docs/2.0.x/reference/aop.html#aop-schema), the [AspectJ pointcut language](http://static.springframework.org/spring/docs/2.0.x/reference/aop.html#d0e7028) and support for [@AspectJ aspects](http://static.springframework.org/spring/docs/2.0.x/reference/aop.html#aop-ataspectj). But this leaves a big question; what is the preferred way of writing Aspects in Spring 2.0? Since I'm an I21 employee, I have the luck of getting the answer straight from the horse's mouth.

I posited the question to [Adrian Colyer](http://www.interface21.com/people/adrian.html), the Chief Scientist at Interface21 and the lead of the AspectJ project and his response follows.

> I started out preferring the XML syntax, but have finally ended up in the @AspectJ camp. There are pros and cons to both approaches of course. XML has in its favour that it doesn't use annotations, works on all JDK levels, and probably feels more familiar to existing Spring users. Those are pretty compelling reasons. @AspectJ has in its favour that it provides a better sense of the aspect as a unit, supports more features than the XML syntax, and is compatible with AspectJ itself (the exact same aspects can be used both with Spring and with AspectJ).
> 
> ...
> 
> Ultimately the winning arguments for "use @AspectJ if you can" were the latter two:- greater feature set and much smoother adoption path to AspectJ.

Adrian's comment about thinking of an aspect as a unit of both pointcuts and advices really strikes a cord with me. I think that the fact that Spring treats them as separately configurable beans was one of the biggest differences between Spring AOP and AspectJ.

I think that going forward Spring's embrace of the @AspectJ form will become a solid differentiator for users. I think it'll be a warm fuzzy feeling for people to know that Spring's AOP is now so closely aligned with the primary AOP framework on the market, AspectJ. They'll feel safe knowing that even though not all of the syntax transfers all of the paradigms and concepts do. Heck, the @AspectJ even works without Spring which is nice.

I started out this post saying how nice it was to have access to this kind of input, but I want to remind you that you do too. If someone had posted this to the [Spring Forums](http://forum.springframework.org/) you'd have gotten the same answer (and maybe even faster with more eyeballs than my email). Remember that all of us here at Interface21 work to support the users and the community, so use the resource.