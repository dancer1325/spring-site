---
title: VMforce Provides Spring Cloud Platform
source: https://spring.io/blog/2010/04/27/vmforce-provides-spring-cloud-platform
scraped: 2026-02-24T08:58:13.973Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rod Johnson |  April 27, 2010 | 0 Comments
---

# VMforce Provides Spring Cloud Platform

_Engineering | Rod Johnson |  April 27, 2010 | 0 Comments_

VMware and Salesforce today [announced](https://www.vmware.com/company/news/releases/vmforce.html) a partnership to build an enterprise Java cloud called [VMforce](http://www.vmforce.com). The announcement is understandably receiving a lot of [attention](http://blogs.zdnet.com/BTL/?p=32999) in the wider [industry](http://www.nasdaq.com/aspx/stock-market-news-story.aspx?storyid=201004261736dowjonesdjonline000360&title=vmforce-to-boost-cloud-offerings-for-salesforcevmwaresources) [context](http://www.virtualizationpractice.com/blog/?p=5201), but today I’d like to focus on the central role of SpringSource technology in the new platform and the unique and compelling benefits it brings developers in the Spring community.

## What is VMforce?

VMforce is a joint service from VMware and SalesForce. VMforce uses the Force.com physical infrastructure to run vSphere with a special customized vCloud layer that allows for seamless scaling and management. Above this layer VMforce runs [SpringSource tc Server](http://www.springsource.com/products/tcserver) instances that provide the execution environment for the enterprise applications that run on VMforce. Spring applications can store their own enterprise data in the Force.com database or use data already resident there. All of these architecture details are seamlessly integrated into a single platform that allows the developer to interact with the server in the way they would with a local tc Server or Tomcat instance.

[![vmforceCloud](http://blog.springsource.com/wp-content/uploads/2010/04/vmforceCloud.png "vmforceCloud")](http://blog.springsource.com/wp-content/uploads/2010/04/vmforceCloud.png)

## Developing Spring Applications on VMforce

To ensure that developers are productive with this new platform and able to use their existing skillset, we are building integration with [SpringSource Tool Suite](http://www.springsource.com/products/sts) that lets developers treat their VMforce account like a simple local Tomcat instance with incredible scalability. Like the rest of STS, the integration will be free.

The STS/VMforce integration means that you can drag and drop applications to deploy them to the platform and take advantage of incremental redeployment to do rapid round trip development even though the platform is remote. The Force.com database provides rich built-in tools for data management, metrics, reporting and search that relieve developers from the burden of having to write those solutions themselves. For many Spring applications, this will be a major benefit.

Additionally, the valuable data that Force.com already stores for your account, like contacts, customers, leads, and deals is available within your application via JPA entities and a Spring template-style data access library. This makes it easy for Spring developers to build applications that leverage the rich data and services that salesforce.com already provides to thousands of customers.

## The Best Programming Model for the Cloud

You’ll be hearing a lot more about Spring and the cloud in the next few months.

Spring is the natural programming model for the enterprise Java cloud for many reasons:

-   **Community**: The amazing community of developers around Spring and the huge numbers of developers with Spring skills give businesses the confidence to architect their solutions and build their development teams around Spring.
-   **Portability**: Spring is based on a unique set of proven, powerful abstractions that simplifies application code and cleanly decouples it from its environment. Enhanced portability between target environments has always been a key benefit of Spring, and the growing importance of cloud deployment in addition to deployment to traditional physical data centers makes this benefit more important than ever. By building enterprise Java applications with Spring, developers can be assured that their applications can run on their local desktop, in their corporate datacenter and in the cloud without having to compromise their application design.
-   **Open**: The future of cloud computing for the enterprise is open – open source, open standards, open innovation. At a time of increasing concern about the direction of Java, the Spring community is more important—and healthier—than ever.
-   **Innovation**: Spring has always pushed the envelope and moved quickly to address new opportunities and challenges. Throughout its 7 year history, the most important ideas in enterprise Java have been introduced to the mainstream by Spring. In the rapidly changing world of cloud computing, the partnership between SpringSource and the Spring community can bring Java and the JVM to the forefront.

I hope you are as excited about the future of enterprise cloud development as I am. VMware believes that [effectively reaping the benefits of cloud computing](http://blogs.vmware.com/console/2010/04/vmforce-and-vmwares-open-paas-strategy.html) is the major IT challenge of this decade and we are committed to innovating to help our customers succeed. VMforce will be open for Developer Preview in the second half of 2010. Be sure to watch [VMforce.com](http://www.vmforce.com) and [SpringSource.org](http://www.springsource.org) for more information about the development of this new platform.