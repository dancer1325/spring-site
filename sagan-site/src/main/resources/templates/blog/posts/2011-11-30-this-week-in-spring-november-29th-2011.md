---
title: This Week in Spring, November 29th, 2011
source: https://spring.io/blog/2011/11/30/this-week-in-spring-november-29th-2011
scraped: 2026-02-24T08:31:32.454Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  November 30, 2011 | 0 Comments
---

# This Week in Spring, November 29th, 2011

_Engineering | Josh Long |  November 30, 2011 | 0 Comments_

Welcome back to another installment of *This Week in Spring*. There's a lot to talk about this week as well as a bevy of new releases, so let's get right to it!

1.  Chris Beams has announced the [latest and greatest release of Spring 3.1, RC2](http://www.springsource.org/node/3317). This is the intended final release so get the bits and try it out soon. For a tour of what's what in Spring 3.1, check out [the release notes](http://static.springsource.org/spring/docs/3.1.0.RC2/spring-framework-reference/html/new-in-3.1.html) and the [Spring 3.1 blog series](http://blog.springsource.org/category/spring/31/)

```
Copy <LI> 
	The steady march to Spring Integration 2.1 GA continues. This week, <A href= "http://www.springsource.org/node/3315">Spring Integration 2.1 RC1  was  released</a>.  
There are a lot of new features in  Spring Integration 2.1, including support for GemFire, RabbitMQ, MongoDB, and much, much, more.  For the full details, <a href="https://jira.springsource.org/secure/ReleaseNote.jspa?projectId=10121&version=12341">see the release notes</a>.  </LI>
 <LI>   
<A href ="http://www.springsource.com/developer/sts">SpringSource Tool Suite</A> lead Martin Lippert has announced the <a href="http://www.springsource.org/node/3316">latest release of SpringSource Tool Suite, version 2.8.1</a>, which provides a <EM>very</EM> compelling feature: compliance with both versions of the Maven plugins typically supported: M2E, the new, Eclipse-foundation supported integration, and M2Eclipse, the original integration furnished by Sonatype.  This makes it possible for  developers to upgrade and transition easily. All users are encouraged to upgrade immediately. 
 </LI> 

 <LI>  Spring Roo project lead Alan Stewart  has announced that <A href= "http://blog.springsource.org/2011/11/23/spring-roo-1-2-0-rc1-released">Spring Roo 1.2.0.RC1 has been released</a>. The new release  is packed with new features, including multi-module Maven projects, JSF 2.0 and RichFaces support, and much more.
	 </LI> 
 <LI> 
```

Daniel Mikusa has put together a fantastic post introducing

[JVM performance tuning while running Apache Tomcat](http://www.tomcatexpert.com/blog/2011/11/22/performance-tuning-jvm-running-tomcat). The post introduces the various command line options, including `-Xss`, `-XX:PermSize` and `-XX:MaxPermSize`, as well as some details about choice of JVM garbage collector. Nice post!

```
Copy<LI>   In this new video interview from <a href= "http://www.infoq.com">InfoQ</a>, Spring expert <a href="http://blog.springsource.org/author/costinl/">Costin Leau</a> talks about <a href="http://www.infoq.com/interviews/costin-leau-javaone-2011-interview/">Spring Data, caching, data grid architectures and work on a new Spring Hadoop project</a>. 
		
	</LI>
```

6.  BSB labs has put together [a wonderful post on remote partitioning with Spring Batch](http://labs.bsb.com/2011/11/remote-partitioning-with-spring-batch/).
    
    ```
    Copy	<a href= "http://www.springsource.org/spring-batch">Spring Batch</a>, as readers already know, is a powerful framework for building batch jobs. Spring Batch makes it dead simple to handle long running, multi-step batch processing jobs, and - with remote partitioning, it is even easier to partition those jobs across multiple nodes. This post introduces some of the cool features in the remote partitioning features available in Spring Batch. Check it out!
     </LI>
    <LI> 
     eWeek has an interesting post about a recent <a href = "http://www.eweek.com/c/a/Application-Development/Developers-Pick-VMware-Cloud-Foundry-as-Top-Cloud-Platform-Survey-251773/">Evans Data survey that found that developers prefer Cloud Foundry</A>. Not a lot of technical content, of course, but this provides a lot of good insight into why others are choosing Cloud Foundry and can be useful when you're trying to make the  case for <A HREF="http://www.cloudfoundry.org">Cloud Foundry</a> in your organization.
    </LI>
     <LI>  ActiveState, creators of   the Stackato cloud, which is based on  <a href="http://www.cloudfoundry.org">Cloud Foundry</a> (the open source PaaS from VMware), has announced that <a href= "http://cloud.dzone.com/news/activestate-stackato-micro">their Micro Cloud will remain free</a> after the beta is finished. This ensures that developers can develop against the cloud in perpetuity.  </LI>
    ```
    
7.  Spring uses proxying to work its magic. There are three types of proxying that each have their own advantages and disadvantages. Tomasz Nurkiewic [introduces how Spring uses dynamic proxies, CGLIB proxies, and AspectJ proxies](http://nurkiewicz.blogspot.com/2011/10/spring-pitfalls-proxying.html) as well as some of the potential pitfalls. This is a very nice post!
8.  Stacey Schneider has put together a great post on the [new 7.0.23 release of Apache Tomcat](http://www.tomcatexpert.com/blog/2011/11/28/apache-tomcat-7023-release). Among the new features in the new release, you'll find the ability to start and stop web applications in parallel to improve startup times, caching the of configuration files, and improved handling of failed deployment restarts.
9.  [Eclipse Virgo 3.0.2 has been released](http://www.springsource.org/node/3318). This new release [fixes several bugs](https://bugs.eclipse.org/bugs/buglist.cgi?classification=RT&product=Virgo&query_format=advanced&target_milestone=3.0.2.RELEASE&order=bug_severity,changeddate,bug_status,priority,assigned_to,bug_id&query_based_on=).