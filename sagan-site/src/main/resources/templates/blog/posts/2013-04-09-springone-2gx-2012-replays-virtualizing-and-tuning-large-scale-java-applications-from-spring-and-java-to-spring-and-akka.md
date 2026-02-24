---
title: SpringOne 2GX 2012 Replays: Virtualizing and Tuning Large Scale Java Applications, From Spring and Java to Spring and Akka
source: https://spring.io/blog/2013/04/09/springone-2gx-2012-replays-virtualizing-and-tuning-large-scale-java-applications-from-spring-and-java-to-spring-and-akka
scraped: 2026-02-24T08:06:19.842Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Pieter Humphrey |  April 09, 2013 | 0 Comments
---

# SpringOne 2GX 2012 Replays: Virtualizing and Tuning Large Scale Java Applications, From Spring and Java to Spring and Akka

_News | Pieter Humphrey |  April 09, 2013 | 0 Comments_

# Virtualizing and Tuning Large Scale Java Applications

This session shares many of the production proven methods of running Java on vSphere. Covering how to size JVMs, and VMs for large scale deployments. The session will have a special section on GC tuning and show how a wide range of JVMs can be tuned using a GC recipe developed over the past 15 years of actual field experience in tuning JVMs.

Three key trends and associated tuning techniques are discussed in this session. The key trends are: Consolidation, Elasticity and Flexibility, and Performance

Consolidation Many of our customers find that their middleware deployments have proliferated and are becoming an administrative challenge associated with higher costs. We see a trend across customers who look to virtualization as a way of reducing the number of server instances. At the same time, customers are taking the consolidation opportunity to rationalize the number of middleware components needed to service a particular load. Middleware components most commonly run within a Java Virtual Machine (JVM) with an observed scale of 100 to 1000s of JVM instances and provide many opportunities for JVM instance consolidation. Hence, middleware virtualization provides an opportunity to consolidate twice  once to consolidate server instances, and, secondly, to consolidate JVM instances. This trend is far-reaching, because every IT shop on the planet is considering the cost savings of consolidation. One customer in the hospitality sector went through the process of consolidating their server footprint and at the same time consolidated many smaller JVMs that were less than 1GB heap. They consolidated many of these smaller 1GB JVMs into 2 categories, those that were 4GB, and others that were 6GB. They performed the consolidation in such manner that the net total amount of RAM available to the application was equal to the original amount of RAM, but with fewer JVM instances. They did all of this while improving performance and maintaining good SLAs. They also reduced the cost of administration considerably due to the reduced number of JVM instances they had to manage, and refined environment that helped easily achieve SLA.  
Another customer, in the insurance industry, was able to achieve the same as the above customer, but additionally was able to over-commit CPU in development and QA environments in order to save on third party software license costs. On the other hand, sometimes we come across customers that have a legitimate business requirement to maintain one JVM for an application, and/or one JVM per a line of business. In these cases, you cannot really consolidate the JVM instances, as that would cause intermixing of the lifecycle of one application from one line of business with another. However, while such customers don’t benefit from eliminating additional JVM instances through JVM consolidation, they do benefit from more fully utilizing the available compute resource on the server hardware, that otherwise would have been underutilized in a non virtualized environment

Elasticity and Flexibility It is increasingly common to find applications with seasonal demands. For example, many of our customers run various marketing campaigns that drive seasonal traffic towards their application. With VMware, you can handle this kind of traffic burst, by automatically provisioning new virtual machines and middleware components when needed, and then automatically tear down these VMs when the load subsides. In addition, the ability to change updating/patching hardware without causing outage is paramount for middleware that supports the cloud era scale and uptime. VMware VMotion gives you the ability to move VMs around without needing to stop applicators and or the VM. This flexibility alone makes virtualization of middleware worthwhile when managing large-scale middleware deployments. One customer in the financial space, handling millions of transactions per day, used VMotion quite often to schedule their hardware upgrades without any time downtime. What otherwise would be a costly scheduled downtime to their business.

Performance Customers often report improved middleware platform performance when virtualizing. Performance improvements are partly due to the updated hardware that customers will typically refresh during a virtualization project. There is also some performance improvement due to the robust VMware hypervisor. A recent customer that reported a great level of performance provided the following testimony

“With our OrderExpress project we upgraded our Middleware Services, Commerce, Portal, WCM, Service Layer, DB2 Database; migrated from AIX to Linux; virtualized on VMware; moved the application into a three-tier DMZ; increased our transactions by over 150 percent; and added significant new capabilities that greatly improved the customer experience. Changing such a wide range of technology components at once was a huge challenge. However using VMware vSphere and additional architectural changes we were successful in improving performance by over 300 percent; lowered costs in the millions; improved security, availability, and scalability; and how we plan to continue evolving this application to maintain greater than 30 percent yearly growth.”

 Jeff Battisti, Senior Enterprise Architect at Cardinal Health

In this session, I will show some actual JVM and VM sizes for middleware components both small and large JVMs. Will also detail out GC tuning recipe that I have developed over the years,that has been shown to handle JVM heap sizes form 4GB to 88GB+, and higher. Of course the introduction of in-memory databases has driven the trend to have these larger JVMs and hence why we will discuss what is the best way to tune the JVM, VM, and the hardware platform they are deployed on.

I see the sizing question as the most commonly asked question with our customer base,and as a result I plan to focus on it during the session.

  

  

## About the speaker

[![Emad Benjamin](http://www.springone2gx.com/s/images/bio/47524_Benjamin_20111013_174310_medium_sq.jpg)](http://www.springone2gx.com/conference/washington/2012/10/speakers/emad_benjamin)

### Emad Benjamin

Emad Benjamin has been in the IT industry for the past twenty years. He graduated with a Bachelor of Electrical Engineering from the University of Wollongong. Earlier in his career, he was a C++ software engineer, then in 1997, he switched to programming with Java, and has been focusing on Java ever since. For the past seven years, his focus has been Java on VMware vSphere, vFabric GemFire and SQLFire. Emad has been at VMware since 2005, and is the author of the Enterprise Java Applications Architecture on VMware book. Emad has previously presented at VMworld, SpringOne, and Open World on the subject of Java virtualization.

[More About Emad »](http://www.springone2gx.com/conference/washington/2012/10/speakers/emad_benjamin)  

##   

  

# From Spring + Java to Spring + Akka - A Journey of Discovery

Actor based concurrency model is a paradigm shift. What is paradigm shift?

A change in the basic assumptions, or paradigms, within the ruling theory of science. A paradigm shift makes simple ideas hard to grok. Even though Actor model is a simple and revolutionary idea it becomes hard for programmers to see practical benefits and usage. Similarly, the Scala programming language brings a lot to the table in simplifying actor-based design, but comes with a new style of coding. One possible solution to this problem is to evaluate the new paradigm in terms of old paradigm. In this presentation we will take a working Spring based web application and gradually implement it using actors and Scala. We will be skeptical and suspicious of new ideas but at the same time we will be open minded. We will learn about actor based concurrency model using the knowledge of spring. At the same time, we'll learn best practices behind Actors, Scala and combining these with the Spring Framework.

  

  

## About the speakers

[![Nilanjan Raychaudhuri](http://www.springone2gx.com/s/images/bio/49957_Raychaudhuri_20120124_122625_medium_sq.jpg)](http://www.springone2gx.com/conference/washington/2012/10/speakers/nilanjan_raychaudhuri)

### Nilanjan Raychaudhuri

Nilanjan is a consultant and trainer for Typesafe. He started his professional career as a software developer in 2000 using object oriented programming languages. Nilanjan has previously worked with IBM, ThoughtWorks and LivingSocial where he gained a lot of experience in managing and developing software solutions in Java/JEE, Ruby, Groovy and also in Scala. He is zealous about programming in Scala ever since he got introduced to this beautiful language. Currently he spends his spare time working on the scala-webmachine open source project (restful resource framework). In the past Nilanjan worked on other open source projects and libraries. At Typesafe he is mainly teaching and designing Scala and Play courses and helping customers to adopt these technologies. Nilanjan enjoys sharing his experience via talks at various conferences. He is also the author of the "Scala in Action" book.

[More About Nilanjan »](http://www.springone2gx.com/conference/washington/2012/10/speakers/nilanjan_raychaudhuri)  

  

### Josh Suereth

Josh Suereth is a Senior Software Engineer at Typesafe and the author of "Scala In Depth.” He has been a Scala enthusiast ever since he came to know this beautiful language in 2007. He started his professional career as a software developer in 2004, cutting his teeth with C++, STL, and Boost. Around the same time, Java fever was spreading and his interest was migrating to web-hosted distributed Java-delivered solutions to aide health departments discover the outbreaks of disease - everything from EJB to Hibernate/Spring and even some Applets. He introduced Scala into his company code base first in 2007, and soon after he was infected by Scala fever, contributing to the Scala IDE, maven-Scala-plugin, and Scala itself. In 2009, he began writing the book "Scala In Depth" which provides practical support for using Scala in everyday applications. Today, Josh is the author of several open source Scala projects, including the Scala automated resource management library, the PGP sbt plugin, as well as contributing to key components in the Scala ecosystem, like the maven-Scala-plugin. His current work at Typesafe Inc. has him doing anything from building MSIs to profiling performance issues. Josh regularly shares his expertise in articles and talks.

[More About Josh »](http://www.springone2gx.com/conference/washington/2012/10/speakers/josh_suereth)  

##   

  

##