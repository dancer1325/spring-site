---
title: Spring Framework Certified on WebSphere
source: https://spring.io/blog/2007/06/21/spring-framework-certified-on-websphere
scraped: 2026-02-24T09:27:33.062Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rod Johnson |  June 21, 2007 | 0 Comments
---

# Spring Framework Certified on WebSphere

_Engineering | Rod Johnson |  June 21, 2007 | 0 Comments_

[SpringOne](http://www.springone.com) is humming along nicely. This year it's a 3 day show, up from 2 days last year, and once again it's great to see hundreds of attendees at a Spring conference. For once I'm quite relaxed at a show, as after the opening keynote I have no further sessions, and don't need to work on slides.

Right now, Adrian is preparing to make a major announcement about Spring tooling. Well actually he's giving a uniquely personal take on duck typing, as I'm sure you'll hear...

More about that later, but first I need to share some news from yesterday. I was happy to be able to announce that we have worked with IBM to certify Spring on IBM's flagship WebSphere Application Server. As much of Interface21's customer base is in large enterprises, we see a lot of WebSphere and have wanted to ensure the ideal integration for years. It's good to see that IBM share this goal. Their commitment to the integration was also largely driven by customers, many of whom have adopted Spring and experienced great results with it. As Spring adoption has moved from project-by-project to strategic, such customers want to know that this combination is supportable and that both vendors are behind it.

You could read the [press release](http://home.businesswire.com/portal/site/google/index.jsp?ndmViewId=news_view&newsId=20070620005213&newsLang=en). But as press releases are for managers and tend to get reviewed and bounced around between the companies and PR agencies involved to a point of meaningless, so it's probably easier for me to explain what this really means in English rather than marketing speak.

-   IBM and Interface21 have worked together closely over almost a year to test the Spring Framework on Websphere. This is far beyond a mere marketing effort; it has involved extensive testing on the many and varied platforms WebSphere runs on, including mainframe platforms.
-   We have resolved all known issues around the combination. Whatever your hardware and OS, you can use Spring with confidence on a WebSphere platform. Obviously Spring already worked well on WebSphere, but this closes off corner cases and, most importantly, means that even the most risk averse manager will understand that using Spring on WebSphere is safe and can be supported.
-   The most important specific area of enhancement concerns transaction management, with code added to both WebSphere and Spring. This work has been led by Juergen Hoeller on the Interface21 side and WebSphere transaction architect Ian Robinson at IBM.

If you're familiar with the Java EE and JTA specs, you'll know that they leave gaps--notably, how you do the significant things, like transaction suspension, that you can't do with a UserTransaction. These are corner cases, but when you encounter one of them it may be hard to work around it. While it's far preferable to delegate transaction management to Spring than to use JTA directly (for reasons of testability, exception handling and semantic completeness), the gaps in the standard JTA functionality can be problematic if that's all that's available underneath.

Fortunately, a solution is at hand to allow Spring to maximize the potential of the underlying platform. Spring provides a transaction abstraction--PlatformTransactionManager--that is semantically more complete than JTA but makes no assumptions about its environment. It's a key example of what we call **portable service abstractions**. Normally you don't use the PlatformTransactionManager directly, because Spring's declarative transaction management gives you a uniquely powerful option for applying programmatic transactions to any POJO, but it is the foundation of both programmatic and declarative transaction management in Spring. Because we don't make any assumptions about the environment, and environmental details don't leak into your code and decrease portability, we can safely tie into platform specifics. We've done this for WebLogic, O[racle have done it for OC4J](http://blog.interface21.com/main/2007/02/27/oracle-contributing-oracle-application-server-integration-code-to-spring-framework/), and we have now worked with IBM to produce a first-class integration for WebSphere.

Following Spring's core value proposition, we take care of the plumbing so you don't have to. As you would expect, the new WebSphere transaction manager is very easy to use. If you're using WebSphere with Spring, you should use the new PlatformTransactionManager abstraction that we have developed with IBM. This is a trivial configuration setting. Instead of using JtaTransactionManager, you use the new WebSphereUowTransactionManager, like this: 

More technical details are in an IBM DeveloperWorks article [Using Spring and Hibernate with WebSphere Application Server](http://www-128.ibm.com/developerworks/websphere/techjournal/0609_alcott/0609_alcott.html). Note that if you've read this article before (or your manager has read the previous version and gotten scared) it has been updated significantly. Also on DeveloperWorks is an [interview](http://www.ibm.com/developerworks/websphere/library/techarticles/0706_johnsonbuck/0706_johnsonbuck.html ) with myself and Paul Buck of IBM (Director, WebSphere Open Source) discussing the integration effort.

One of the authors of this article, Sara Mitchell of IBM's Hursley lab in the UK, is here at SpringOne and will be presenting tomorrow on Spring on WebSphere. Sara has done much of the technical work on the integration and it's been great to see here engaging in the Spring community through our forums and through presentations. Savio Rodrigues of IBM is also here, and appears to be [enjoying the show](http://weblog.infoworld.com/openresource/archives/2007/06/pragmatic_inter.html).