---
title: Simplifying Enterprise Applications with Spring 2.0 and AspectJ
source: https://spring.io/blog/2006/08/10/simplifying-enterprise-applications-with-spring-2-0-and-aspectj
scraped: 2026-02-24T09:35:48.847Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Adrian Colyer |  August 10, 2006 | 0 Comments
---

# Simplifying Enterprise Applications with Spring 2.0 and AspectJ

_Engineering | Adrian Colyer |  August 10, 2006 | 0 Comments_

An article I wrote for the [InfoQ](http://www.infoq.com) site has just gone live: [Simplifying Enterprise Applications With Spring 2.0 and AspectJ](http://www.infoq.com/news/Spring-AspectJ-AOP).

I've heard a number of people saying that "AOP is too hard", or "AOP makes things too complex". In a way this article was written as a rebuttal of those views (hence the title, "**Simplifying** Enterprise Application Development"). I mean, the whole point of AOP is that you take software that was getting complex and tangled up, and you simplify the implementation by giving each module a single responsiblity again by introducing aspects. And then of course for some requirements that are naturally expressed in a crosscutting way, it's much simpler and easier just to implement them with an aspect in the first place. The article shows how this process works, and lays out an adoption roadmap that counters the "AOP is too hard" argument - at each step along the way you can get a lot of value without having to become an AOP guru.

It's also a good introduction to the facilities offered by Spring AOP in the Spring 2.0 release. Check it out and see what you think...