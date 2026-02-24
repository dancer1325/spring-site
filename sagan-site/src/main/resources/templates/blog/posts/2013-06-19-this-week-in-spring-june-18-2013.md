---
title: This Week in Spring - June 18, 2013
source: https://spring.io/blog/2013/06/19/this-week-in-spring-june-18-2013
scraped: 2026-02-24T08:03:39.759Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  June 19, 2013 | 0 Comments
---

# This Week in Spring - June 18, 2013

_Engineering | Josh Long |  June 19, 2013 | 0 Comments_

Welcome back to another installation of *This Week in Spring*! What a week! We're fast approaching the final stretch of the journey to [SpringOne2GX 2013](http://springone2gx.com/conference/santa_clara/2013/09/home) and preparations are underway at full tilt. This year's going to be *memorable*. I wish I could tell you more, but trust me when I say you need to be at this show this year! :)

Anyway, let's get on with the roundup!

1.  Mark Pollack has announced [the release of Spring XD 1.0 milestone 1](http://blog.springsource.org/2013/06/12/spring-xd-1-0-milestone-1-released/). Spring XD is a unified, distributed, and extensible system for data ingestion, real time analytics, batch processing, and data export. The projects goal is to simplify the development of big data applications.
2.  Join Tony Erksine from Liberty University on June 27th as he instructs us [How to talk Spring and Influence People](http://www.springsource.org/node/22620), a pragmatic lesson on soft skills and technology adoption strategies needed to help get other people in your company excited about and using, new technology -- in this case, with Spring.
3.  Want a pass to [SpringOne 2GX 2013](http://springone2gx.com)? If you're a Spring champion, [show off your stuff on our champions forum and follow these instructions](http://bit.ly/springchampathon) by June 21, 2013. You might be one of our 5 lucky winners! (If you're a Groovy & [Grails](http://grails.org) or [Cloud Foundry champion](http://cloudfoundry.org), never fear, we will be rolling out future contests for you!)
4.  Head over to gopivotal.com for the next blog in the Hadoop 101 series -- [How to Use Spring Batch with Spring for Apache Hadoop](http://blog.gopivotal.com/products/programming-with-hadoop-101-getting-started-with-spring-hadoop).
5.  We're excited to launch *A Week of Spring* in conjunction with Manning Publications. Check [out this post](http://www.springsource.org/node/22632) for more information on great discounts for titles covering SpringSource technologies! Every day we're posting a new 50% discount code for two books.
6.  Our pal Tobias Fiohre is back at it again, this time with not one, not two, but *three* posts on Java configuration support for Spring Batch, just released in the latest Spring Batch 2.2.0.RELEASE of Spring Batch. The first post looks at [how Spring Batch's Java configuration support compares with the XML equivalents](http://blog.codecentric.de/en/2013/06/spring-batch-2-2-javaconfig-part-1-a-comparison-to-xml/). The second post looks at the Spring Batch `StepScope`, which lets you [configure `job`s with parameters provided at runtime (as opposed to design-time](http://blog.codecentric.de/en/2013/06/spring-batch-2-2-javaconfig-part-2-jobparameters-executioncontext-and-stepscope/). The third post looks at how to use the new configuration style [with Spring's environment profiles feature](http://blog.codecentric.de/en/2013/06/spring-batch-2-2-javaconfig-part-3-profiles-and-environments/).  
    
7.  Johnathan Mark Smith has put together a post on how [use Spring MVC and Spring MVC Test](http://t.co/cGvBHARsQO)  
    
8.  Xavier Padró's has put together a nice post that [introduces Spring's core Aspect-Oriented Programming](http://t.co/VOjqU0QutH) support.  
    
9.  The video replay of the webinar from the [Broadleaf Commerce](http://www.broadleafcommerce.org/) project on [their migration from GWT to Spring MVC](http://www.youtube.com/watch?v=vzC4VfrWyK4) is now online at our [SpringSourceDev YouTube channel](http://youtube.com/SpringSourceDev).
10.  This isn't strictly Spring-related, but I felt it worth mentioning: Java 9 is slated to [drop support for compiling Java 1.4-or-older source code](http://openjdk.java.net/jeps/182). Java 8 is approaching (finally!), and Spring 4 will offer first class support for Java 8 lambas. Java 6 is EOL as of February 2013, so if you're not already on Java 7, consider just making the jump to Java 8 when it drops early next year. If you're migrating right now, definitely consider looking at Java 7 at a minimum. Spring, of course, works well with older JDK versions, but we often provide functionality specific to newer language releases *if* they're available. For example, we debuted annotations (like `@Transactional`) when Java 5 made it feasible, as an addition to our then primary support for commons annotations, even while we supported Java 1.3 and 1.4. Java 8 is no different.
11.  I did a webinar last week on building REST APIs with Spring. The webinar video will be up soon on [our SpringSource Developer YouTube channel](http://youtube.com/SpringSourceDev). For the many who've asked, the code is available on [my GitHub account](https://github.com/joshlong/the-spring-rest-stack), and the slides are available [on my SlideShare account](http://www.slideshare.net/joshlong/rest-apis-with-spring). Check them out!  
     
12.  Petri Kainulainen has put together a really detailed, easily-read post on how to plugin a property from a property file when [configuring the `@Scheduled` annotation's CRON expression](http://www.petrikainulainen.net/programming/spring-framework/spring-from-the-trenches-using-environment-specific-cron-expressions-with-the-scheduled-annotation/)