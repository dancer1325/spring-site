---
title: This Week in Spring: March 6th, 2012
source: https://spring.io/blog/2012/03/07/this-week-in-spring-march-6th-2012
scraped: 2026-02-24T08:25:19.808Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Adam Fitzgerald |  March 07, 2012 | 0 Comments
---

# This Week in Spring: March 6th, 2012

_Engineering | Adam Fitzgerald |  March 07, 2012 | 0 Comments_

Welcome to another installment of *This Week in Spring*. There is a lot to look at this week with much of the excitement around the just released Spring for Apache Hadoop project, which provides a very, very powerful Spring API integration for Apache Hadoop, an open source framework originally [designed to support map-reduce style batch processing solutions](http://hadoop.apache.org/mapreduce/).

```
Copy</P> 
```

1.  [Costin Leau](http://blog.springsource.org/author/costinl/) kicked things off with the [announcement of Spring for Apache Hadoop 1.0.0.M1](http://blog.springsource.org/2012/02/29/introducing-spring-hadoop/) last week. I can't explain it any better than Costin does, so I won't bother. From his post:
    
    > Whether one is writing stand-alone, vanilla MapReduce applications, interacting with data from multiple data stores across the enterprise, or coordinating a complex workflow of HDFS, Pig, or Hive jobs, or anything in between, Spring for Apache Hadoop stays true to the Spring philosophy offering a simplified programming model and addresses "accidental complexity" caused by the infrastructure.
    
    What are you waiting for? Go! Check it out! When you're done, you might check out the other coverage of the event, as well. As you might expect, a lot [of](http://www.techweekeurope.co.uk/news/vmware-helps-java-developers-handle-big-data-with-spring-hadoop-63891) [people](http://jeviathon.com/2012/03/04/fusion-mimic-nsnotification-functionality-from-obj-c-into-java-with-spring/) [blogged](http://java.sys-con.com/node/2189507) [about](http://www.itworldcanada.com/news/spring-java-developers-get-hadoop-integration/144976) [it](http://www.dabcc.com/article.aspx?id=19449), [too](http://www.theregister.co.uk/2012/02/29/vmware_spring_hadoop/).
    
    ```
    Copy	 </LI> 
    <LI> What are you guys doing in two days, on March 8th, 2012? I'll be at the Native Android Development with Spring for Android webinar that introduces native Android development practices, resource management and the Spring for Android integration library, which makes the whole process more natural for developers that wish to interface with services on the server side. 
    	 There are, as usual, two editions, one <a href= "http://www.springsource.org/node/3482">for North America</A> and <a href = "http://www.springsource.org/node/3481">one for Europe</A>. Don't miss it! 
    	</LI> 
    	<LI>  The inimitable <a href = "http://blog.springsource.org/author/ozhurakousky/">Oleg Zhurakousky</A> today <a href ="http://blog.springsource.org/2012/03/05/introducing-spring-integration-scala-dsl/">announced the Spring Integration Scala DSL</a>.   The DSL extends the Spring Integration API to Scala developers using a very concise, idiomatic Scala-based DSL.  
    ```
    
    Just when you thought Spring Integration couldn't get any more concise!
    

3.  The [latest update of SpringSource Tool Suite version 2.9.0](http://www.springsource.org/node/3494) is now available, all Spring and Grails developers are recommended to upgrade. This version provides the latest updates to Spring Integration 2.1, Grails 2.0.1, and Spring Roo 1.2.1 and does some behind the scenes updates to the baseline Eclipse platform.
4.  Speaking of Spring for Android, Roy Clarkson just announced the [latest release, 1.0.0.RC1, of the Spring for Android library](http://www.springsource.org/spring-android/news/1.0.0.rc1-released). Among other things, the new release features support for Spring Social 1.0.2.RELEASE and Spring Security 3.1.0.RELEASE and an updated `RestTemplate` implementation, which is compatible with Spring 3.1's implementation.
5.  Project lead Michael Hunger just announced [the latest milestone release of the Spring Data Neo4J project, version 2.1.0](http://www.springsource.org/node/3492). There are a *lot* of new features and updates, so check out the release notes.
6.  Over on InfoQ, [Sam Brennan and Rossen Stoyanchev's excellent talk on Spring (and Spring MVC) based testing](http://www.infoq.com/presentations/Spring-3-1-and-MVC-Testing-Support) from [SpringOne2GX](http://www.springone2gx.com) is up. Rossen's one of the lead committers to Spring MVC, and Sam's the lead committer for the Spring core testing support, so.... what else is there to say? These guys are giants. Go. Learn. I'll follow!
7.  This article provides an introduction on [how to use Spring with RMI based remoting](http://www.onlinetechvision.com/?p=510)
8.  The Cloud Hadoop blog has a great post on [how to inject Java 5 `enum`s using Spring](http://www.cloudhadoop.com/2012/02/how-to-inject-enum-object-of-java-5-in.html).
9.  InfoQ has a great [release announcement coverage on Thymeleaf 2.0](http://www.infoq.com/news/2012/02/thymeleaf-2-0), another one of those open source projects that fills a gap, or augments, Spring, outside of SpringSource. The best of these projects, like Thymeleaf, are exemplary in their own right, and worthy of our attention. Thymeleaf, as long time readers of this roundup will know, is a template engine that has a remarkably good integration story with Spring MVC's `View` and `ViewResolver` machinery and definitely worth a look for the JSP-fatigued Spring MVC developers out there!
10.  Our pal Roger Hughes is at it again, this time with a blog post that shows how to [use Apache Tomcat as part of your build process](http://java.dzone.com/articles/make-tomcat-part-your-maven).

```
Copy 	<LI> If you're having trouble with a recently trusted, but misbehaving, PGP key in  Spring Roo, then <a href = "http://whyjava.wordpress.com/2012/03/04/spring-roo-pgp-exception/">this solution is for you</A>.   </LI>
```