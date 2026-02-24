---
title: The cat is out of the bag – tc Server announced
source: https://spring.io/blog/2008/12/04/the-cat-is-out-of-the-bag-tc-server-announced
scraped: 2026-02-24T09:12:26.833Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Peter Cooper-Ellis |  December 04, 2008 | 0 Comments
---

# The cat is out of the bag – tc Server announced

_Engineering | Peter Cooper-Ellis |  December 04, 2008 | 0 Comments_

We just [announced](http://www.springsource.com/node/899) a new product called the [SpringSource tc Server](http://www.springsource.com/products/suite/tcserver) this week at the [SpringOne Americas](http://americas.springone.com) conference. Springsource tc Server is an enterprise-class web application server based on [Apache Tomcat](http://tomcat.apache.org/).

Although SpringSource is not the first company to build a product around Apache Tomcat (WebSphere Community Edition and JBoss both embed versions of Tomcat in their J2EE application servers and the developer release of JBoss Web 2.1.1 also embeds Tomcat), tc Server is unique in that it preserves the Tomcat servlet/JSP programming model. Applications written to Tomcat are 100% portable to tc Server and vice versa.

tc Server preserves all the best aspects of Tomcat that developers care about and adds essential management and diagnostics capabilities that the operations and support teams require to reduce the risk and overall cost of running Tomcat-hosted applications in mission-critical production. Just like Tomcat, tc Server is lightweight, easy to use and fast. It has a memory-footprint of about 7 megabytes and it cold-starts in under 3 seconds. It also competes with any full blown Java EE application server in terms of throughput and scalability for web apps.

If you use Tomcat today you already know that version 6 already goes a long way towards addressing reliability. Clustering in Tomcat V6 is already greatly improved. tc Server rounds out the package and provide the basic “what you need and not what you don't need” solution for enterprise Java web app deployment.

tc Server includes an operations console to allow definition and single step management of server groups, it has also been tightly integrated with Tomcat to provide unparalleled visibility and control of your distributed Tomcat server farm.

tc Server is the result of our many [years of experience](http://blog.springsource.com/2008/08/22/who-is-the-chief-of-the-apache-projects/) committing code to Tomcat and supporting Tomcat in production. Through our experience, we have seen two key use cases emerge.

First, we learned that while developers love open source Apache Tomcat, frequently the cost of maintaining those apps in production includes hidden costs. Managing large Tomcat server farms can be expensive. Most organizations end up rolling their own scripts for configuration and deployment. Since stock Tomcat has limited diagnostic capabilities, troubleshooting problems in test and production can be slow and expensive too.

Second, we learned that there are a substantial number of applications deployed today on full Java EE app servers that only make use of the servlet API. Most Spring apps, which use the Spring container rather than an EJB containter, fall into this category. Frequently, organizations will develop on Tomcat and deploy on a Java EE application server. They develop on Tomcat because Tomcat gives them developer productivity (again because it is simple and fast). They deploy on the full blown Java EE application server because the operations teams benefit from the management and diagnostic capabilities that come with the Java EE application servers.

tc Server is designed to address both of these use cases. On the one hand, Tomcat users who upgrade to tc Server will benefit from the operations management and advanced diagnostics in tc Server. On the other hand, web apps that are deployed on commercial Java EE application servers can be supported on tc Server for a fraction of the cost of Java EE servers. tc Server will be available to all developers free of charge and subscriptions for production deployment will be available for around $500/CPU.

tc Server should be useful for organizations who need a lean, powerful, and low cost platform for deploying web applications . Spring/Tomcat is now the [leading stack](http://www.springsource.com/node/859) for Java web apps. Because any application deployed on Tomcat or tc Server can seamlessly upgrade to SpringSource dm Server, this also provides a smooth roadmap as companies move to modularized OSGi architectures.

We will be shipping tc Server in January, 2009. Give it a [try](http://www.springsource.com/node/898) and let us know what you think.