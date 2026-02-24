---
title: Before Advice in Spring 2.0
source: https://spring.io/blog/2006/09/05/before-advice-in-spring-2-0
scraped: 2026-02-24T09:35:04.182Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Hale |  September 05, 2006 | 0 Comments
---

# Before Advice in Spring 2.0

_Engineering | Ben Hale |  September 05, 2006 | 0 Comments_

As most of you know, one of the big improvements in Spring 2.0 is the addition of the AspectJ pointcut language and better integration with AspectJ in general. While I think everyone believes that this will be a great benefit in the long run, it has led to some issues. We've found that there are certain behaviors that Spring AOP has always done, that AspectJ has never done.

One of the big issues that cropped up was the behavior of Before advice. If you've used Spring AOP in Spring 1.x you probably know that Spring allows you to change argument values before they are passed to the target method. What you may not know is that AspectJ has never allowed this behavior.

What does this mean to you, the user? Well it depends on what you plan to do in the future. We've decided that if you are continuing to use the AOP Alliance interfaces for your AOP, you'll continue to get the same semantics that you've always gotten; nothing will have changed. If you use the AspectJ pointcut language in the future you'll get accurate AspectJ semantics. If you want to use AspectJ's pointcut language but still want to make changes to argument values, it is possible but you'll need to obey AspectJ's semantics and use Around advice instead of Before advice.

So in the end, we've still managed to meet our goal of drop-in replacement, while adhering to AspectJ semantics where appropriate.

---

P.S. This post serves as an obituary for the late great 'Penc Smith'. If you've taken the [Core Spring](http://www.interface21.com/training/coreSpringSyllabus.html) training from [Interface21](http://www.interface21.com/) you'll know what I'm talking about. If not, come see me at [The Spring Experience](http://www.thespringexperience.com) or [No Fluff Just Stuff](http://www.nofluffjuststuff.com/) and I'll tell you the story over a pint.