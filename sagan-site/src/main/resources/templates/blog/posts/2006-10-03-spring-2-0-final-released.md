---
title: Spring 2.0 Final Released
source: https://spring.io/blog/2006/10/03/spring-2-0-final-released
scraped: 2026-02-24T09:34:15.482Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rod Johnson |  October 03, 2006 | 0 Comments
---

# Spring 2.0 Final Released

_Releases | Rod Johnson |  October 03, 2006 | 0 Comments_

It is our pleasure to announce that the long-awaited final release of the Spring Framework version 2.0 is now available.  
[  
](http://sourceforge.net)

![Spring 2.0 Released](http://static.springframework.org/images/spring20.png "Spring 2.0 Released")

[Download](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=173644&release_id=452461) | [Documentation](http://static.springframework.org/spring/docs/2.0.x/reference/index.html) | [Changelog](http://static.springframework.org/spring/docs/2.0.x/changelog.txt)   

> As the leading full-stack Java/Java EE application framework, Spring delivers significant benefits for many projects, reducing development effort and costs while improving test coverage and quality.  

This stable, production-grade release comes after 9 months of active development.  In this short time the Spring 2.x series has matured immensely, benefiting from over 150,000 early access downloads across 9 milestone releases, resulting in over 750 JIRA issues resolved, 50 of which introduce major new features.

**What's New?**

We believe three attributes capture what our users can expect from the Spring 2.0 series: **Simple**, **Powerful**, and **Proven**.

**![](http://static.springframework.org/images/simple.png)**  

Version 2.0 brings major new simplifications to the framework's overall usage model.  As our existing users know, the heart of Spring is the *Bean Container* which [drives the configuration](http://static.springframework.org/images/spring2-bean-container-magic.png) of your Java and Java EE application.  In version 2.0 many common configuration tasks have been simplified through the introduction of custom *Bean Configuration Dialects*.  What does this mean to you?

This means you can now:  

-   Make your business services transactional in one-line of configuration code.[  
    ](http://static.springframework.org/see-it)
-   Lookup objects from JNDI in one-line of configuration code.  
    
-   Expose externalized properties to your services in one line of configuration code.[  
    ](http://static.springframework.org/see-it)
-   Apply consistent exception handling policies to your data access objects with a single annotation.[  
    ](http://static.springframework.org/see-it)
-   Invoke Stateless Remote EJBs by defining a single configuration tag.  No more custom service locators or business delegates.[  
    ](http://static.springframework.org/see-it)

Simplifications continue across the [modules of the framework](http://static.springframework.org/spring/docs/2.0.x/reference/introduction.html#introduction-overview), allowing you to:  

-   Write parameterized JDBC queries in one line of code.[  
    ](http://static.springframework.org/see-it)
-   Apply *convention over configuration* when deploying your Spring MVC controllers.[  
    ](http://static.springframework.org/see-it)
-   Use Spring JSP tags to reduce your typing when developing input forms.[  
    ](http://static.springframework.org/see-it)

![](http://static.springframework.org/images/powerful.png)  

A major goal of Spring 2.0 is to make the common tasks easier.  Version 2.0 also opens up exciting new doors for solving the harder problems in an elegant manner.  In 2.0 you may:  

-   Weave custom behavior into multiple points of program execution using AspectJ's concise pointcut expression language.[  
    ](http://static.springframework.org/see-it)
-   Receive asynchronous JMS messages with transactional and thread-safety guarantees.  [See it live](http://static.springframework.org/spring/videos/message-driven-pojos.htm)
-   Develop your own *Bean Configuration Dialect* for your application.[  
    ](http://static.springframework.org/see-it)
-   Inject objects from custom scopes such as "request" and "session" scope in a thread-safe manner.[  
    ](http://static.springframework.org/see-it)
-   Invoke Groovy, Beanshell, and JRuby scripts from your Java application.[  
    ](http://static.springframework.org/see-it)
-   Schedule tasks to run asynchronously with sophisticated threading and pooling options.[  
    ](http://static.springframework.org/see-it)

![](http://static.springframework.org/images/proven.png)

Version 2.0 builds on the foundation set by Spring 1.x.  This new release delivers major new functionality while preserving backwards compatability as far as possible.  

With over [one million downloads](http://blog.interface21.com/main/2006/09/22/thank-you-spring-framework-passes-1-million-downloads/) since its release in March 2004, Spring 1.x made developing sophisticated applications from plain Java Objects (POJOs) the de-facto standard.  The 2.x series builds on this widely-recognized best-practice to deliver new simplification and power while preserving full compatiblity with the established Spring 1.x series.  Users can expect their upgrade to be straightforward; in most cases, simply a matter of replacing the 1.2.8 JAR files with those included in Spring 2.0.

**Enjoy, and thank you**

Spring 2.0 represents the cumulative effort of many over the last year.  From the lead developers Juergen, Rob, Rick, and Costin at [Interface21](http://www.interface21.com), to our supporting partners BEA and Oracle, to the many in the community contributing innovations, patches, documentation, bug reports, and tests--there is a lot of blood, sweat, and tears here.  We truly hope you find this new version as much a joy to use as it was for us to build.  Enjoy, and rest assured: the work doesn't stop here.  

Sincerely,

The Spring Team

---

**Additional Resources**

-   Watch [Juergen and Rob's interview](http://www.infoq.com/interviews/harrop-hoeller-spring-2) with InfoQ on the goals of Spring 2.0.

-   Attend [The Spring Experience 2006](http://www.thespringexperience.com), the premier conference for the Spring community, December 7th - 10th in Hollywood, Florida.  Register by October 16th to secure the early bird discount for your team.

-   Get started with Spring 2.0 by [downloading the release](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=173644&release_id=452461) and reviewing the JPetStore and Petclinic sample applications, supplementing with the [reference manual](http://static.springframework.org/spring/docs/2.0.x/reference/index.html) and [API JavaDocs](http://static.springframework.org/spring/docs/2.0.x/api/index.html) as needed.

-   Get community support at [forum.springframework.org](http://forum.springframework.org).

-   Read content leading up to the release including the [Spring 2.0 update](http://www.infoq.com/articles/spring-2-update) and Adrian's [Simplifying Enterprise Applications](http://www.infoq.com/articles/Simplifying-Enterprise-Apps).  
    

-   Track future Spring 2.x development with the [Roadmap](http://opensource.atlassian.com/projects/spring/browse/SPR?report=com.atlassian.jira.plugin.system.project:roadmap-panel)

-   Get insights from the leads of Spring development at the [Interface21 team blog](http://blog.interface21.com).

-   Interface21 is offering upcoming and newly updated [Spring 2.0 training courses](/node/349) in 2006 and 2007.

-   Spring 2.0 will be available in the [Maven2 repository](http://www.ibiblio.org/maven2) in the coming days.  
    

-   The release of [Spring Web Flow](/webflow) 1.0 final will follow next week.

-   Bookmark [this page](/go-2.0) for the rollout of additional screencasts and code examples showing the new 2.0 features in action.