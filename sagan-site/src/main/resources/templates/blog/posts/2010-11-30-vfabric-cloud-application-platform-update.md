---
title: vFabric Cloud Application Platform Update
source: https://spring.io/blog/2010/11/30/vfabric-cloud-application-platform-update
scraped: 2026-02-24T08:50:24.229Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Adam Fitzgerald |  November 30, 2010 | 0 Comments
---

# vFabric Cloud Application Platform Update

_Engineering | Adam Fitzgerald |  November 30, 2010 | 0 Comments_

[![vFabric ](http://blog.springsource.com/wp-content/uploads/2010/11/vFabricDiagram.png "vFabric Diagram")](http://www.springsource.com/products)

We have recently released updates for several components of the [vFabric Cloud Application Platform](http://www.springsource.com/products). As Rod Johnson mentioned in the [original announcement](http://blog.springsource.com/2010/08/31/cloud-platform/), vFabric is designed for fast delivery of next-generation applications that are instantly scalable and cloud-portable. These recent updates further enhance the integration between runtime application services and improve the performance, scalability, monitoring and manageability of modern applications.

### vFabric tc Server 2.1

Updates to [vFabric tc Server](http://www.springsource.com/products/tcserver) continue to make it the best place to build and run Spring applications: 

-   *Spring Insight*  
    Included with tc Server 2.1, [Spring Insight](http://www.springsource.org/insight/) delivers real-time visibility into application behavior and performance for Spring applications during development and pre-production.  Deep real-time visibility into application behavior can now be persisted to view information spanning a previous time range.  Improvements to administration and navigation make it easy to operate and surface useful information more intuitively.
-   *Enhanced templating*  
    A new built-in template mechanism simplifies the configuration of tc Server with the vFabric GemFire HTTP Session Management and Hibernate Cache Modules.  This allows vFabric GemFire to automatically launch with tc Server 2.1 – no application code changes or other manual intervention is required.

### vFabric GemFire 6.5

[vFabric GemFire](http://www.springsource.com/products/data-management) is the distributed data management platform for modern applications offering dynamic scalability, very high performance and database-like persistence. Two new modules simplify the integration of GemFire with tc Server and Hibernate delivering sophisticated data management for modern applications. Jags Ramnarayan goes into great detail in his [latest blog post](http://jagslog.blogspot.com/2010/11/announcing-vfabric-gemfire-http-session.html) but we will provide a quick overview here.

-   *vFabric GemFire HTTP Session Management Module*  
    The vFabric GemFire HTTP Session Management Module offloads and manages HTTP session state for tc Server or Tomcat servers.   Pre-configured and automatically launching with tc Server, GemFire HTTP Session Management provides high performance and scalability.  This is particularly useful for web applications handling many requests and that need to scale-out to meet demand.  
    -   Decouple session management from tc Server or Tomcat Servlet/JSP container
    -   Scale application server and HTTP session handling independently
    -   Handle very large sessions without losing sessions
    -   Easy to connect to tc Server via new template mechanism or Tomcat via minor configuration modifications
-   *vFabric GemFire Hibernate Cache Module*  
    The vFabric GemFire Hibernate Cache Module provides fast, scalable, distributed L2 caching for Hibernate. Swapnil Bawaskar covers the details in his latest [blog post](http://greatestmclarenfan.blogspot.com/2010/11/hibernate-l2-cache.html).
    -   Dramatically improve Hibernate performance
    -   Reduce network traffic (and potential bottlenecks) to the database server
    -   Gain all the enterprise class features of GemFire
    -   Scalability – partition data across the entire cluster
    -   Developer productivity & cloud-scale deployment

### vFabric Hyperic  4.5

[vFabric Hyperic](http://www.springsource.com/products/systems-management) is the application management and monitoring component of the vFabric Cloud Application Platform and it provides complete and continuous visibility into the entire virtualized application stack. [Jennifer Hickey](http://blog.springsource.com/author/jhickey/) recently described the internal details about the [Hyperic 4.5 release](http://blog.springsource.com/2010/11/10/hyperic-4-5-released/), but also added were two important new monitoring capabilities.

-   *GemFire monitoring*  
    Hyperic 4.5 introduces a new plugin that enables application operations teams to better manage the performance of GemFire, by enabling them to ensure that GemFire is available and performant, and by giving them the information they need to rapidly fix outages and report on SLAs.  
    -   Monitors the JMX agent, Cache Server, Application Peer, and Gateway Hub
    -   HQ GemFire view: realtime view of GemFire metrics.
    -   Monitors GemFire events – join/leave GemFire system, crashes, log entries and more
-   *RabbitMQ monitoring*  
    Hyperic 4.5 introduces a new plugin that enables application operations team better manage the performance of RabbitMQ, by enabling them to ensure that RabbitMQ is available and performant, and by giving them the information they need to rapidly fix outages and report on SLAs.
    -   Monitors the RabbitMQ AMQP broker, exchange, queue, and virtualhost, and logs
    -   Watch RabbitMQ availability, errors, CPU, threads, connections, and queues.

#### Take a step on the path to the cloud

The vFabric Cloud Application Platform provides a clear and innovative path to cloud computing architectures, powered by a modern programming model paired with next-generation platform services. With these new updates, now is great time to try out vFabric [tc Server](http://www.springsource.com/landing/tc-server-spring-trial), [GemFire](http://www.springsource.com/products/gemfire-evaluation-download) and [Hyperic](http://www.springsource.com/landing/hyperic-open-source-download).