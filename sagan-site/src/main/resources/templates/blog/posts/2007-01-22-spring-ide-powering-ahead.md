---
title: Spring IDE powering ahead
source: https://spring.io/blog/2007/01/22/spring-ide-powering-ahead
scraped: 2026-02-24T09:32:21.316Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rod Johnson |  January 22, 2007 | 0 Comments
---

# Spring IDE powering ahead

_Engineering | Rod Johnson |  January 22, 2007 | 0 Comments_

I had a great time at the [Spring Experience](http://www.thespringexperience.com) conference last month. One pleasant surprise I had was the extent of the recent work the [Spring IDE](http://www.springide.org/project) team have been doing. I ran into Spring IDE developer Christian Dupuis several times at the conference, and it seems that each time he'd implemented a new feature...

The forthcoming 2.0 release of Spring IDE is a comprehensive update to match the new features in Spring 2.0. And the Spring IDE team is making great progress with two of the big ticket items: XML extension namespaces and the AOP enhancements. (Btw, in case you're wondering why I haven't posted for a while, I spent a lot of time writing a [Spring 2.0 update article](http://www.infoq.com/articles/spring-2-intro) over at [InfoQ](http://www.infoq.com/). This goes pretty deep with XML, AOP and core container features.)

The advances in Spring IDE are particularly nice to see given that they are partly a payoff for some of the less visible work the core Spring team did in Spring 2.0. While there are plenty of enhancements visible on the surface, a lot of work also went into making the core container more extensible and more toolable. Juergen Hoeller and Rob Harrop did a lot behind the scenes to allow the addition of tooling metadata to Spring's internal BeanDefinition metadata, and allow container configuration to be accessed without instantiating bean classes (or even having *access* to bean classes at all--a problem when implementing an Eclipse plugin). Torsten Juergeleit, the founder of Spring IDE, has built a solid abstraction on top of the enhanced Spring metadata, and it's great to see that this is now allowing cool functionality to be added to Spring IDE very quickly. I suspect the Spring IDE team are also pretty hot developers, but that's only to be expected from any Spring project!

I'm going to shamelessly draw on a [recent blog entry by Christian](http://springide.org/project/wiki/SpringIde2Milestone1) to demonstrate some of the new features.

As you'd expect, there is good support for the latest Spring 2.0 XML constructs. I recently [blogged about the nifty p: namespace shortcut](http://blog.interface21.com/main/2006/11/25/xml-syntax-sugar-in-spring-20/) to cut down on angle brackets, and Spring IDE now supports that, offering property completion:

![Spring IDE p: namespace support](http://blog.interface21.com/main/wp-content/uploads/2006/12/spring%20ide%20p%20namespace.png)

The most exciting new feature--to me, anyway--is the support that's on the way for the enhanced Spring 2.0 AOP model, and the aop: namespace. This doesn't merely provide completion of the relevant XML tags, but shows cross references--which beans are advised by which aspects--in a display that's inspired by the excellent [AJDT Eclipse plugin](http://www.eclipse.org/ajdt/) for AspectJ:

![AspectJ integration](http://springide.org/project/attachment/wiki/SpringIde2Milestone1/spring_ide_beans_cross_references.png?format=raw)

This will fully support the power of the AspectJ pointcut expression language's intersection with the Spring component model: a key enhancement in Spring 2.0 and a uniquely powerful Spring feature.

Hopefully this will also encourage the IntelliJ guys to improve their Spring integration. Spring IDE uses Spring's AspectJExpressionPointcut to do pointcut evaluation and check pointcut matching to drive the UI. Thus it does not require AJDT and is not Eclipse specific. Hint hint--other IDEs could pick this up, too.

The Spring IDE team are also working on Spring Web Flow support. This example shows what editing web flows will look like:

![Spring IDE Web Flow Support](http://blog.interface21.com/main/wp-content/uploads/2006/12/swf-editor.png)

Christian has even prototyped support for the [Java configuration option for Spring](http://blog.interface21.com/main/2006/11/28/a-java-configuration-option-for-spring/) that I blogged about a couple of months ago. (He did this within a couple of days of the first release of that code!) Of course part of the motivation for Java configuration support is that it automatically benefits from IDE tooling, and strong typing, but Spring IDE can go a step further by understanding the significance of the bean creation methods in a Java configuration class, displaying them along with other beans:

![Spring IDE Java Configuration support](http://blog.interface21.com/main/wp-content/uploads/2007/01/spring-ide-java-configuration1.jpg)

Congratulations to the Spring IDE team! Please download the latest build and give them feedback and encouragement.

And it's flattering to see Christian using my blog as inspiration for new features...