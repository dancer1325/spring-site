---
title: This week in Spring: February 8th, 2011
source: https://spring.io/blog/2011/02/08/this-week-in-spring-february-8th-2011
scraped: 2026-02-24T08:47:30.315Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  February 08, 2011 | 0 Comments
---

# This week in Spring: February 8th, 2011

_Engineering | Josh Long |  February 08, 2011 | 0 Comments_

This has been another exciting week in the Spring community. The community seems abuzz about the new Tomcat release, mobile clients, Spring Data and big data (e.g., Spring Gemfire, Redis, and of course the Spring Data projects.)

A reminder: Juergen Hoeller - lead of the core Spring framework and contributor to all of the sister Spring projects, in some fashion or another - is giving two identical webinars - [one for North America](http://www.springsource.org/node/3004) and [one for Europe](http://www.springsource.org/node/3003) - on the new features in Spring 3.1 in two days (February 10th)! Be sure to register for this free webinar on the next iteration of the most widely used Java framework!

This is turning out to be a record event, with incredible advance registration numbers. While there are no Spring 3.1 binaries (yet; stay tuned!), the [code for the Spring project is always at your disposal](http://www.springsource.org/about), so - if you're as excited about all the new features as I am - you'll see this webinar and start playing with it long before it's released.

Lots of good stuff to cover this week, so let's get to it!

-   Mark Thomas, a senior engineer on the Tomcat project, did a talk at 2010's SpringOne community event. That talk is [now available on InfoQ.com.](http://www.infoq.com/presentations/Apache-Tomcat-7)
-   [Spring Batch 2.1.6](http://static.springsource.org/spring-batch/index.html)
    
    has been released. The new version features several fixes and feature enhancements.
    
-   There are two new releases of Apache Tomcat this week. First,
    
    [Apache Tomcat 7.0.8 has been released.](http://tomcat.apache.org/tomcat-7.0-doc/changelog.html#Tomcat 7.0.8 \(markt\)) This new release includes many small changes, including even better support for asynchronous, Comet-based applications. Apache Tomcat 6.0.32 has also been released, and is primarily a maintenance release. As always, there's good coverage on both of these releases on [the Tomcat Expert community site](http://www.tomcatexpert.com).
    
-   [Spring Mobile 1.0.0.M3 has been released.](http://www.springsource.org/spring-mobile/news/1.0.0.m3-released) The Spring Mobile project is a library designed to facilitate mobile-device friendly web applications. It provides a nice, server-side component to [Spring Android's](http://www.springsource.org/spring-android) Android-device-specific client support.
    
    Users are encouraged to check out the fantastic new sample code projects being maintained in [the Spring Mobile git repository](http://git.springsource.org/spring-mobile/samples).
    
-   [Gordon Dickens](http://gordondickens.com/wordpress/2011/02/07/sending-beans-as-xml-with-jmstemplate/) has posted a fantastic blog on using
    
    Spring's JMS support (including the JmsTemplate) and the Spring core OXM (an Object-to-XML marshalling framework) support to marshal JAXB2-based message payloads as XML. Good post, and it reads nicely in conjunction with [the Green Beans post on messaging](http://blog.springsource.com/2011/01/25/green-beans-getting-started-with-enterprise-messaging-and-spring/)
    
-   [Spring GemFire 1.0.0 (final) has been released](http://www.springsource.org/node/3015). This
    
    release provides first-class integration with the [GemFire data management and data grid technology.](http://www.springsource.com/products/data-management) Spring GemFire provides easy-to-use configuration for GemFire in idiomatic Spring configuration. Additionally, the Spring Gemfire integration will also play a part in the upcoming Spring 3.1 cache abstraction, which will support GemFire and numerous other data caches, as well.
    

-   Shekhar Gulati has contributed a fantastic post [exploring Spring Roo and the Hades](http://java.dzone.com/articles/playing-spring-roo-and-hades) project, which is now a part of the umbrella Spring Data portfolio.
    
-   [The JTeam group has blogged about using Spring Android and Spring Mobile](http://blog.jteam.nl/2011/02/07/creating-an-android-app-for-your-website-with-spring-android-and-rest/) to build applications targeting mobile clients.
    
    The post also introduces Spring Android-specific support for consuming server-side data from a client.
    
-   One of the best "features" of the Spring framework is its *community*. Keith Donald - the Spring MVC lead - recently [tweeted](http://twitter.com/kdonald/status/34823674800373761) a link to Gunnar Hillert's [blog](http://hillert.blogspot.com/2011/02/spring-mobile-m3-site-preference.html) which highlighted the story of his feature request and the path that took to now be a part of the recent Spring Mobile M3 release.
-   Sebastian Pietrowski has put together a fascintating introduction to using the recently announced [Spring Data Redis support.](http://java.dzone.com/articles/spring-data-redis) Check it out!
-   Blogger[](http://java.dzone.com/tips/automatically-inject-mocks?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+javalobby%2Ffrontpage+%28Javalobby+%2F+Java+Zone%29)
    
    [Justin Ryan's put together a post with a fascinating Spring `BeanDefinitionRegistryPostProcessor` implementation to automatically inject mocks into Spring tests.](http://java.dzone.com/tips/automatically-inject-mocks?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+javalobby%2Ffrontpage+%28Javalobby+%2F+Java+Zone%29)
    
    This implementation works with Spring's unit testing support. Spring's unit testing support provides a consistant way to use Spring annotations (like `@Autowired`) in unit test classes and have those beans injected by the context just as if the unit tests were proper Spring components.
    
    This implementation takes that a step further, automatically registering *mock* objects of the beans you've autowired.
    
    In the Spring framework `BeanDefinitionRegistryPostProcessor` is an extension of the classic `BeanFactoryPostProcessor` that can be used to register objects in the Spring container that can in turn register other meta-objects like BeanFactoryPostProcessor instances. Otherwise, it works basically the same, but just has a higher scope. Pretty slick Justin!
    
-   Ken Rimple has blogged some more on [how to use Spring Roo and Spring WebFlow](http://java.dzone.com/news/webflow-roo-again-more-complex?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+javalobby%2Ffrontpage+%28Javalobby+%2F+Java+Zone%29&utm_content=Google+Reader) together, even setting up a non-trivial example. Good read, and a good introduction to the Spring WebFlow concepts in general.