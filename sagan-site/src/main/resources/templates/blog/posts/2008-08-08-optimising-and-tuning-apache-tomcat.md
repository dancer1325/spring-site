---
title: Optimising and Tuning Apache Tomcat
source: https://spring.io/blog/2008/08/08/optimising-and-tuning-apache-tomcat
scraped: 2026-02-24T09:15:09.552Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Thomas |  August 08, 2008 | 0 Comments
---

# Optimising and Tuning Apache Tomcat

_Engineering | Mark Thomas |  August 08, 2008 | 0 Comments_

On Wednesday I gave a webinar on Optimising and Tuning Apache Tomcat. A recording of the webinar and a copy of the slides can be obtained from the [webinars section of the SpringSource website](http://www.springsource.com/webinars). The same page has links for all the previous SpringSource webinars, as well as the [Covalent webinar archive](http://www.covalent.net/services/training/webinars_archived.html).

I wasn't able to get to all of the questions during the Q&A session so, as promised, here are the remaining questions and my answers.

-   **What are the best practices for tuning XYZ application running on Apache Tomcat?**
    
    There isn't an ideal configuration setting for any application as the best settings will depend on many factors. As a starting point, use the recommendations provided with the application. After that, follow the process set out in the webinar and don't be afraid to go against the recommendations provided with the application if that gives you better performance.
    

```
Copy<li><strong>Do you have any recommendations for open source tools for troubleshooting, performance benchmarking or testing web applications?</strong>
```

My starting point when troubleshooting is to build a simple test case using [Eclipse](http://www.eclipse.org/home/categories/enterprise.php). I then use the built-in debugger to step through the code to really understand what is happening. If you need a profiler then [NetBeans](http://www.netbeans.org/) includes one although I have never used it. I use a commercial profiler ([YourKit](http://www.yourkit.com/)) as they provide free licences to open source developers. For performance benchmarking I use [Apache JMeter](http://jakarta.apache.org/jmeter/index.html) and for testing I use a combination of [JUnit](http://www.junit.org/) and [Apache JMeter](http://jakarta.apache.org/jmeter/index.html).

```
Copy<li><strong>What tool do you recommend for monitoring memory, cpu, etc.?</strong>
```

For a Tomcat specific tool, I like [LambdaProbe](http://www.lambdaprobe.org/d/index.htm). For a more general tool you might want to take a look at the [SpringSource Application Management Suite](http://www.springsource.com/products/suite/ams).

-   **Is it recommended to use JMeter, LambdaProbe or a Profiler in a production environment?**
    
    It depends on the environment. I have used all three of those tools in production environments in the past but equally there have been times when I have deliberately not used those tools. You have to balance the risk of the tool causing a problem (performance, functionality, security, etc.) against the potential benefit of using the tool. That balance has to be assessed on a case by case basis.
    
-   **Is it a good idea to have a hardware load balancer and an [Apache httpd](http://httpd.apache.org/) load balancer?**
    
    This also depends on circumstances. A hardware load balancer brings some benefits but also costs. Generally, I would expect to see hardware load balancers in environments that had very high availability requirements.
    
-   **Can Tomcat be clustered and load balanced using iPlanet?**
    
    Yes, a version of mod\_jk is available for iPlanet. You can download both source and binary versions from the [Apache Tomcat download pages](http://tomcat.apache.org/download-connectors.cgi). You should be aware that there are relatively few users of mod\_jk for iPlanet so you may run into a few more bugs that if you use one of the more popular web servers as a front end.