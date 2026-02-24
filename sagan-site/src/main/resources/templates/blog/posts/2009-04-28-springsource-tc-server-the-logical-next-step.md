---
title: SpringSource tc Server - The logical next step
source: https://spring.io/blog/2009/04/28/springsource-tc-server-the-logical-next-step
scraped: 2026-02-24T09:08:40.879Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Jim Jagielski |  April 28, 2009 | 0 Comments
---

# SpringSource tc Server - The logical next step

_Engineering | Jim Jagielski |  April 28, 2009 | 0 Comments_

The time is ripe for lightweight AND enterprise class Java application servers, and [Apache Tomcat](http://tomcat.apache.org/) is the pick of the litter. And now, with [SpringSource tc Server](http://www.springsource.com/products/tcserver), we at [SpringSource](http://www.springsource.com/) make it a reality.

If you were familiar with Covalent, and now SpringSource, then you most likely know about ERS ([Enterprise Ready Server](http://www.springsource.com/products/ers)). ERS is our pre-built, pre-packaged and fully QA-ed distribution of the [Apache httpd](http://httpd.apache.org/) web server and Apache Tomcat. Included in the distro are also some very useful enhancements, in the form of modules, for Apache, such as PHP, mod\_perl and mod\_snmp. The somewhat unfortunate aspect of the distro is that, except for mod\_jk, the added, extra bits to the Tomcat side were pretty minimal.

tc Server changes this completely.

And we've all seen Tomcat supplant more "traditional" (and heavyweight) JEE servers in numerous environments, but there were always that small group that, even if they didn't need EJB capability (and with Spring, why would anyone need it anyway), the more "enterprise class features" of those servers made them quite useful, and the lack of those features within Tomcat made it very tough to migrate away from them and towards Tomcat.

tc Server changes this completely as well.

tc Server is SpringSource's new software distribution of Tomcat that adds in all those missing enterprise features people want and need. The feature set is pretty impressive:

-   Application management
    -   List applications running in a distributed collection of server instances
    -   Target, deploy and undeploy applications to distributed server instance
    -   Start, stop and reload applications running for distributed server instances
    -   Control web application parameters like caching, JSP behavior, and serving of static content
-   Server configuration and management
    -   Remote configuration control for server instances:
    -   Configure JDBC Data Sources and connection pools
    -   Define virtual hosts, access logs and integration with web servers
    -   Configure JVM server start parameters like Java heap size and garbage collection characteristics
    -   Define server groups (tc Server or Tomcat instances)
-   Advanced server diagnostics
    -   Application thread lock detection provides warnings when threads compete for restricted resources in a way that would compromise application integrity
    -   Configurable automatic and on-demand thread and heap dumping for failure and exception analysis
    -   Thread to URL association for faster diagnosis when analyzing problems with request processing

Included in the above is the ability to do a wide range of administrative tasks from the command-line scripting environment, instead of the GUI, which is perfect for automated tasks and various cronjobs. And, of course, you also get SpringSource's [Enterprise](http://www.springsource.com/products/enterprise) support and services as well for the whole package.

tc Server is unique in that it gives you the Tomcat you know, love and trust, but with enterprise capability that you need. Of course, we didn't just stop there. Also in tc Server is a new high-concurrency connection pool that beats the pants off of Tomcat's traditional DBCP and other external solutions. And, in keeping with our long-standing commitment to the Open Source community, this is being donated back to the [ASF](http://www.apache.org/).

We have lots of plans already for additional diagnostic features to be added with the next major release. We also are working on the next generation of ERS, which adds these enterprise features to the web tier as well for Apache httpd.

From web front end to middleware business logic, SpringSource has your back. So whether you're an old hand in using Apache httpd, Tomcat and Spring, or making that logical (and possibly long overdue) migration, look over all we can do to help.

![tc Server Architectural Diagram](http://blog.springsource.com/wp-content/uploads/2009/04/slide1.png "tc Server Architectural Diagram") ![Server Management](http://blog.springsource.com/wp-content/uploads/2009/04/slide2.png "Server Management")

[Click here to learn more about SpringSource tc Server](http://www.springsource.com/products/tcserver) and check out the screencasts of tc Server in action. Or better yet, click on ["Download Now!"](http://www.springsource.com/download/tcserver) to take it for a test drive.