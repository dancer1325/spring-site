---
title: Defining the Future for Virtualized and Cloud Java
source: https://spring.io/blog/2011/06/14/defining-the-future-for-virtualized-and-cloud-java
scraped: 2026-02-24T08:39:54.130Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rod Johnson |  June 14, 2011 | 0 Comments
---

# Defining the Future for Virtualized and Cloud Java

_Engineering | Rod Johnson |  June 14, 2011 | 0 Comments_

Today I am proud to [announce](http://www.springsource.com/pressreleases/current) version 5 of our [VMware vFabric™](http://www.vmware.com/products/vfabric/overview.html) application platform defining the future of enterprise Java for cloud and virtualized execution environments. vFabric blazes the path to new and modern cloud architectures by providing a modern programming model paired with next-generation platform services. A [path](../../../../../2010/08/31/cloud-platform/) that is not overgrown with the cruft and complexity of prior-generation technologies. With vFabric 5, VMware is ensuring that enterprise Java is ready to meet the challenges of tomorrow’s demanding, data-intensive, massively scalable applications.

vFabric 5 continues to provide the best place to run your Spring applications with [vFabric tc Server](http://www.vmware.com/products/vfabric-tcserver/overview.html) and the ability to monitor and manage those production solutions with incredible intelligence via [vFabric Hyperic](http://www.vmware.com/products/vfabric-hyperic/overview.html). The platform also addresses the technical challenges of cloud computing head on, supporting new approaches to data management that enable applications to scale across elastic, geographically distributed cloud architectures with our [vFabric GemFire](http://www.vmware.com/products/vfabric-gemfire/overview.html) and [RabbitMQ](http://www.vmware.com/products/rabbitmq/) technologies. This release introduces important new technologies that can take advantage of underlying virtualized environments to provide a new degree of flexibility and control for Java applications

## Optimized for vSphere

For customers who are already running vSphere, vFabric 5 adds a new Elastic Memory for Java (EM4J) capability to tc Server that provides a completely new level of coordination between the application server and the underlying virtual machine. EM4J uses the underlying vSphere virtualization to overcome some of the limitations of the Java’s static memory heap.

[![EM4J Diagram](http://blog.springsource.com/wp-content/uploads/2011/06/EM4JDiagram.png "EM4J Diagram")](http://www.vmware.com/products/vfabric/overview.html)

By using a memory ballooning technology inside the JVM that helps coordinate JVM heap management, EM4J can communicate with the underlying virtual machine’s memory management to allow memory to be shared and move to where it is needed most. This is achieved without compromising the JVM’s execution so that if workloads peak on that instance the memory is recovered without your application or administrative tools having to do anything special.

*EM4J allows for higher Java server consolidation and protects applications against workload spikes without wasting memory.*

## Best Platform to Run Spring Applications

Many Spring developers are already familiar with the [Spring Insight](http://www.springsource.org/insight) technology they have been able to enjoy in [tc Server Developer Edition](http://www.springsource.com/developer/tcserver). Spring Insight provides code level tracing – tracking the time a transaction spends in each method and JDBC (database) call – transparently for Spring Applications. No code modifications or setup is required.

vFabric 5 now introduces Spring Insight Operations, which leverages the same code-level tracing technology but pulls together information from multiple application servers into a single console with roll-up views, drill downs, and historical comparisons.  This solution has been designed to minimize monitoring overhead, hence is suitable for both test and production environments.

[![Spring Insight Operations](http://blog.springsource.com/wp-content/uploads/2011/06/SpringInsightOperations_highres.png "Spring Insight Operations")](http://blog.springsource.com/wp-content/uploads/2011/06/SpringInsightOperationsFull_hires.png)

While the Spring Insight Operations console is useful for both administrators and developers who may need to troubleshoot problems in production, it is also important that administrators and operations have a single place to go for vFabric monitoring.  Therefore, Spring Insight Operations monitoring will be available not only as a stand-alone console but also through a plug-in to the Hyperic monitoring solution, enabling a single view across data from multiple sources and integrated alerting and control actions.

## Packaging and Pricing for Simplicity and Agility

As applications are increasingly deployed on virtual infrastructure rather than physical hardware, our customers have told us that a virtual machine-based approach to licensing based on average usage – not peak – just makes sense. vFabric 5 introduces a virtual machine-based packaging and licensing model that allows for usage-based consumption of application infrastructure running on VMware vSphere and gives customers the flexibility to run any or all of the software within the vFabric product family in each licensed vFabric VM. This approach eliminates the long-standing need to over-provision application infrastructure to accommodate peak workloads and gives customers the ability to reconfigure application infrastructure without complex licensing concerns. This will result in application infrastructure that can evolve with the same sort of agility that your development teams use to build the applications themselves. Performance data from the configured VMs can be used to refine the application infrastructure iteratively and dedicate more computing resources to the layer that requires the most attention.

## And There is More...SQL Access to GemFire Data Fabric

Also part of the announcement is an exciting new offering called vFabric SQLFire. The beta release of vFabric SQLFire leverages the time-tested vFabric GemFire underpinnings providing data at memory speed and horizontal scale but vFabric SQLFire adds familiar and standard SQL and JDBC interfaces to the service. The beta download, documentation and discussion can be found on [here](http://communities.vmware.com/community/vmtn/appplatform/vfabric_sqlfire).

With the recent releases of [Cloud Foundry](../../../../../2011/04/12/launching-cloud-foundry/), [new versions of Spring](../../../../../2011/06/09/spring-framework-3-1-m2-released/) and now vFabric 5, our Spring and vFabric engineers are defining the future of enterprise Java for cloud and virtualized execution environments. I encourage you to try vFabric for yourself and get more out of running Java in your virtual machines.