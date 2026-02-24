---
title: Optimising and Tuning Apache Tomcat - Part 2
source: https://spring.io/blog/2008/10/14/optimising-and-tuning-apache-tomcat-part-2
scraped: 2026-02-24T09:14:10.680Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Thomas |  October 14, 2008 | 1 Comment
---

# Optimising and Tuning Apache Tomcat - Part 2

_Engineering | Mark Thomas |  October 14, 2008 | 1 Comment_

A few weeks ago Filip Hanik and I gave the second in a series of webinars on Optimising and Tuning Apache Tomcat. A recording of the webinar and a copy of the slides can be obtained from the [webinars section of the SpringSource website](http://www.springsource.com/webinars). The same page has links for all the previous SpringSource webinars, as well as the [Covalent webinar archive](http://www.covalent.net/services/training/webinars_archived.html).

We weren't able to get to all of the questions during the Q&A session so, as promised, here are the remaining questions and our answers.

-   **How do you identify memory leaks in a Tomcat application?**
    
    You will almost certainly need to use a profiler to identify the root cause of a memory leak. The latest Sun JDKs include [tools like jhat and jmap](http://java.sun.com/javase/6/docs/technotes/tools/index.html#troubleshoot). There are also many other profilers available, both free and commercial. Filip and I use [YourKit](http://www.yourkit.com) when investigating Tomcat memory leaks as YourKit provide free licences to open source developers.
    
-   **How can redeployment cause a memory leak?**
    
    This usually occurs when a class loaded by Tomcat retains a reference to a class loaded by the web application. When the web application is stopped, the Tomcat class loader continues to retain the reference to the class loaded by the web application. This class retains a reference to the web application's class loader which in turn, retains references to all the classes it loaded. Therefore, the web application class loader and all the classes it loaded are not eligible for garbage collection. This causes a memory leak. The typical root causes of this are JDBC drivers and logging frameworks.
    
-   **What is the best way to change the JVM Tomcat uses?**
    
    The JVM to use is set using the JAVA\_HOME (full JDK) or JRE\_HOME (JRE only) environment variable. The correct place to set this will depend on your environment, particularly if Tomcat is configured to start automatically at system start. If you have a free choice on where to set this then use setenv.bat or setenv.sh as appropriate for your operating system.
    
-   **Do you recommend a particular JVM?**
    
    No, we do not. The JVM vendor you choose depends on your OS.
    
-   **Which connector should I use to connect Apache httpd to Tomcat?**
    
    We recommend mod\_proxy\_http with mod\_jk a close second. Generally, mod\_proxy\_ajp is less stable than either mod\_proxy\_http or mod\_jk. Note that mod\_jk2 has been deprecated and should no longer be used.
    
-   **What is the correct setting for maxKeepAliveRequests when using SSL?**
    
    When using SSL HTTP keep alive should be enabled as the SSL handshake is a relatively expensive operation to perform for every request.
    
-   **If we run Tomcat on Solaris, do you recommend against using the native APR connector?**
    
    Yes, we do. The feedback we have received from clients is that the APR connector is not stable on Solaris.
    
-   **We previously tried moving to mod\_proxy\_http on Solaris but we encountered several bugs. Have these bugs been resolved?**
    
    Without knowing the exact bugs or version you were using, it is difficult to comment. All known Apache httpd issues and the current status can be found in the [ASF Bugzilla Database](https://issues.apache.org/bugzilla/). Tomcat issues can also be found in Bugzilla.
    
-   **What value should I use for maxKeepAliveRequests with the default blocking IO HTTP connector?**
    
    For high concurrency environments, set it to 1. Otherwise, set it to the average number of objects you have on a page, anywhere between 10 and 100.
    
-   **How do I configure JkOptions +DisableReuse?**
    
    JkOptions +DisableReuse should be placed in your httpd.conf file with your other mod\_jk settings.
    
-   **When is it best to use the bon-blocking IO HTTP connector?**
    
    When you need to support high concurrency with keep alive and APR is not an option, e.g. because it is unstable on your platform.
    
-   **Will I see better performance if I use Apache httpd in front of Apache Tomcat?**
    
    It depends. If you proxy all of the requests to Tomcat then performance will decrease slightly. If httpd handles some requests (eg all the static content) then you will probably see some benefit. There are a number of benchmarks that attempt to demonstrate that one connector is better than another. However, it is very unlikely that any of these benchmarks will be representative of your application. The only way to know for sure is to test it in your environment with realistic load and usage patterns.
    
-   **Can Tomcat be used in production without a web server in front of it?**
    
    Yes. Whether this offers the best performance for your environment will depend on that environment and your application. As with the previous question, the only way to know for sure is to test it in your environment with realistic load and usage patterns.
    
-   **Will using Apache httpd in front of Tomcat increase security?**
    
    The security of your installation will depend on many factors. The use, or not, of Apache httpd is unlikely to significantly change the security of your installation. Other factors such as keep up to date with patches and using a firewall usually have a much greater impact on your overall level of security.
    
-   **Which Apache httpd MPM provides the best performance?**
    
    As always, it will depend on your environment but the [httpd performance tuning documentation](http://httpd.apache.org/docs/2.2/misc/perf-tuning.html) offers some useful general guidance.
    
-   **What is the performance difference between SpringSource ERS and Apache Tomcat?**
    
    SpringSource ERS is much more than just Apache Tomcat. From a pure Tomcat perspective, performance isn't the differentiating factor. The benefits of ERS are the simple installation, the easy to manage upgrades and patching, support for multiple instances and the integration of all of the components.
    
-   **My company uses Tomcat and XYZ application server. How does Tomcat compare to XYZ application server and are there benefits in consolidating?**
    
    There will be lots of differences and the differences that matter will vary from organisation to organisation. Start by working out what you want from an application server and then compare that list to the market. There are benefits in consolidating. Greater consistency means simpler maintenance, less training and so on. However, there are also costs. You would need to look at your organisation and how it planned to consolidate (new projects only, all projects for next major release, everything now, etc) to compare the costs with the associated benefit.
    
-   **Do you have performance comparisons available for Tomcat and XYZ application server?**
    
    Various reports have been published in this area. How useful the results are depends on how well matches the test is to your load. As always, the only way to know for sure is to test in your environment with realistic load and usage patterns.
    
-   **What is a good method for load testing a Tomcat server?**
    
    There are several options available with tools that drive load, both free and commercial. The free tools include [ab](http://httpd.apache.org/docs/2.0/programs/ab.html) and [JMeter](http://jakarta.apache.org/jmeter/index.html).
    
-   **For high availability and performance, can Tomcat be configured to launch multiple JVMs for the same web application?**
    
    Tomcat does not provide this as a configuration option. You can, of course, create multiple Tomcat instances, install your application on each instance and then load-balance across the instances.
    
-   **Is there a generic health-check script for Tomcat?**
    
    The [Manager status page](http://localhost:8080/manager/status) is probably a good place to start. You can use the code for that Servlet as the basis for your own, more specific/extensive checks if required. If you do enhance it, consider contributing your enhancements back to the Apache Tomcat community.
    
-   **Where is the logging.properties file located?**
    
    The default location is in $CATALINA\_BASE/conf.