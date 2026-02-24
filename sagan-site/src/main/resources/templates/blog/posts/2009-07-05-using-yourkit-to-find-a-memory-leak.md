---
title: Using Yourkit to Find a Memory Leak
source: https://spring.io/blog/2009/07/05/using-yourkit-to-find-a-memory-leak
scraped: 2026-02-24T09:06:05.038Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Dave Syer |  July 05, 2009 | 1 Comment
---

# Using Yourkit to Find a Memory Leak

_Engineering | Dave Syer |  July 05, 2009 | 1 Comment_

I had such a great experience today with [Yourkit](http://www.yourkit.com/) that I thought I'd write a quick plug. It's been a couple of years since I used it in anger, and even then it was the best tool I could find, but now it really is ultra slick. I haven't done an exhaustive survey of the marketplace, and that wasn't the object of the exercise: I just wanted a tool to solve a problem.

Here's the story of my day; frustration, then irritation, then finally satisfaction. I had a suspected memory leak in [Spring Batch](http://www.springsource.org/spring-batch/) and I needed to track it down quickly. The back story to this is I've seen plenty of memory leaks, but I haven't had to deal with one at the coal face for quite some time. I *live* in [STS](http://www.springsource.com/products/sts) these days (sometimes dream in it as well), so I needed a tool that worked well in the IDE. I tried two tools, but only because the first choice didn't work. The two I tried were [TPTP](http://www.eclipse.org/tptp/) and [Yourkit](http://www.yourkit.com/).

I wrote a simple integration test in JUnit, and profiled it using the two tools. I could tell from the memory analysis in either that the heap at the end of my process had way too may objects of type JobExecution in it, and all I needed to know then was who was keeping references to them that shouldn't be? Seems like a simple enough question.

Since Eclipse is the heart of STS, I thought that I'd see if the Eclipse performance monitoring tooling (TPTP) is any better than last time I tried it. After half a day messing around, the short answer is "it's not". The long version is that it doesn't work at all without installing obscure out-of-date shared libraries (on Ubuntu Ibex), and even when it runs there is next to no useful information in the memory analysis to track down a leak. Google helps you with the first problem (I don't know why the TPTP documentation is so poor in that area), but not with the second. I could get enough information out of TPTP to see that there was a leak, but I still had no idea where it was coming from. The problem is that the reports only tell you what are the objects in the heap and the lines of code that allocated them originally, which is way too far upstream to know who has a reference to them at the end of the process. Conclusion: TPTP is many orders of magnitude better than it was a couple of years ago, but still pretty useless in practical terms.

So I moved on to Yourkit, knowing that it could solve this problem easily, but apprehensive about the installation and tooling. I discovered that the Eclipse tooling is now excellent (last time I looked it was missing), and even better, I found the source of the memory leak after about 5 minutes work. Not half bad. If you want to know the killer feature, it is simply this: the ability to navigate the heap and all object references. It also helps a lot that snapshots are taken automatically when a process ends, so you can write a simple unit test, profile it from the IDE and load the heap into the Yourkit UI in a couple of clicks.

In case you are wondering, the Spring Batch problem was minor (and only affected snapshot releases), and easily fixed.

I know that Mark and Filip and other folk at SpringSource are using Yourkit (e.g. see [this blog entry](http://blog.springsource.com/2008/10/14/optimising-and-tuning-apache-tomcat-part-2/)), and everyone I ask likes it a lot. If we mention it in articles and consulting engagements, though, it tends to be buried in with a lot of other stuff, so I hope that this small article has popped Yourkit up your stack.

Disclaimer: I have no personal or commercial interest in Yourkit.