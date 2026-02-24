---
title: Spring and Maven Followup
source: https://spring.io/blog/2006/09/18/spring-and-maven-followup
scraped: 2026-02-24T09:34:42.077Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Hale |  September 18, 2006 | 0 Comments
---

# Spring and Maven Followup

_Engineering | Ben Hale |  September 18, 2006 | 0 Comments_

There has been [quite](http://blog.interface21.com/main/2006/09/15/yes-i-know-its-now-the-most-voted-for-issue-in-the-jira/#comments) [a](http://jroller.com/page/raible?entry=spring_s_moving_to_maven) [bit](http://bluxte.net/blog/2006-09/17-52-51.html) [of](http://jroller.com/page/carlossg?entry=the_black_magic_inside_maven) [discussion](http://www.1060.org/blogxter/entry?publicid=FAA51080D35EFFA3709C5329B534DB67) over my [recent announcement](http://blog.interface21.com/main/2006/09/15/yes-i-know-its-now-the-most-voted-for-issue-in-the-jira/) about Spring and Maven. The discussion is all very good and worthwhile, but I do want to clarify a couple of points that I made.

First and foremost, we are committed to supporting Spring users who are using Maven as their build system of choice. This means we will help ensure accurate POMs are available in the Maven repository with each Spring release starting with Spring 2.0 RC4. That is what the [world's most most popular JIRA issue](http://opensource.atlassian.com/projects/spring/browse/SPR-1484) is all about. Nothing more.

The topic of Spring's own internal build system is a completely separate matter. What I want to clarify from my original post is we are evaluating Maven as the future build system for Spring. We are evaluating it alongside Ant+Ivy as well. As many of you have noted, Spring is a large project that touches many others and sports a highly-customized homegrown build system. You will find everything from Java 5 code that is optional on pre Java 5 systems, to dependencies that only apply if you are using certain classes. At this time we simply don't know enough to say for sure that Maven will meet Spring's needs, but we certainly are taking a responsible look at it.

I hope that this clears up some of the confusion.