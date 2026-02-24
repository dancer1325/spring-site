---
title: SpringSource To Acquire GemStone Data Management
source: https://spring.io/blog/2010/05/06/springsource-to-acquire-gemstone-data-management
scraped: 2026-02-24T08:58:09.525Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rod Johnson |  May 06, 2010 | 0 Comments
---

# SpringSource To Acquire GemStone Data Management

_Engineering | Rod Johnson |  May 06, 2010 | 0 Comments_

Another week, [another](http://blog.springsource.com/2010/04/27/vmforce-spring-cloud/) important announcement. The SpringSource division of VMware today [announced](http://www.springsource.com/newsevents/springsource-acquires-gemstone-systems) that we have entered into a definitive agreement to acquire [GemStone Systems](http://www.gemstone.com/), a leader in data grid technology.

This acquisition, like our [recent acquisition of Rabbit Technologies](http://blog.springsource.com/2010/04/13/springsource-acquires-rabbitmq/), adds another crucial building block of private and public cloud to our middleware portfolio. Like Rabbit and SpringSource and VMware’s other products, GemStone technology is valuable in both today’s enterprise scenarios and tomorrow’s cloud world. The acquisition also adds an important middleware capability to our offering to our enterprise customers, which complements our existing tc Server product.

We are aware of the multiple products in this space. We remain committed to portability. If you are using Spring along with GemStone, you can expect things to get easier and more smoothly integrated. If you are using Spring with another data grid, you can continue to rely on Spring. We understand that the Spring community is huge and diverse.

We are excited about the choice we bring to the table today. We chose GemStone because of the quality of the product. At SpringSource and VMware we are proud of the engineering excellence of our products and this is a worthy new member of the family.

GemStone's technology has proven success in solving some of the hardest problems for customers such as [JP Morgan Chase](http://gemstone.com/customers/jpmorgan); one of the world's largest medical providers; and [DISA](http://www.gemstone.com/customers/DISA/). "Mission critical" is a phrase that is overused. However, GemStone has proven itself in environments where that phrase is literally applicable. An extreme scale deployment at [DISA](http://www.disa.mil/) runs on over 600 worldwide locations with over 11,000 networked servers supporting real-time decision support used by the US Department of Defense.

## Understanding Gemstone Technology

GemStone products, like GemFire Enterprise and GemFire SQLFabric, are used to build high-performance, data-intensive solutions to scale applications by providing fast and reliable access to data. The core [enterprise data fabric](http://gemstone.com/products/gemfire#gemfireAnim) virtualizes data from multiple sources and formats into memory across physically distributed systems and cloud architectures. This enables applications to reliably share, store, update, and route large volumes of data in real time and with low latency.

[![GemFireEnterpriseDataFabric](http://blog.springsource.com/wp-content/uploads/2010/05/GemFireEnterpriseDataFabric.png "GemFireEnterpriseDataFabric")](http://gemstone.com/products/gemfire#gemfireAnim)

The fabric already has [integration with Spring](http://community.gemstone.com/display/gemfire/Integrating+GemFire+with+the+Spring+IoC+Container) which makes it productive for use with enterprise Java applications. We’ll be doing deeper integration going forward: most obviously with Spring Framework and tc Server (offering session replication at extreme scale). Other potential areas of integration include Spring Web Flow (transparent flow replication) and Spring Batch and Spring Integration. The Spring community can expect a very smooth experience as this effort unfolds–likely also encompassing support in Spring Roo and Grails.

## Building Advanced Infrastructure for Modern Applications

The POJO-based application model pioneered by Spring has enabled the rise of lean application servers like [SpringSource tc Server](http://www.springsource.com/products/tcserver) that are ideally suited to cloud deployment. A new style of messaging has been emerging for the cloud as well, led by [RabbitMQ](http://www.rabbitmq.com), also recently acquired by SpringSource. There has been a parallel revolution for data management: cloud-based architectures are forcing requirements on data management that are similar to systems only previously seen in the most demanding, high performance workloads. These new challenges for data management include support for modern applications deployed across elastic, high scale, geographically distributed architectures. GemStone is a leader in this space and already solves the [hardest data management problems](http://gemstone.com/hardest-problems) in the world, powering some of the world's most scalable, data intensive private clouds. Through this acquisition GemStone will become the backbone for the SpringSource data management solution.

## Moving Towards a Platform as a Service

As VMware CTO, Steve Herrod, recently [explained](http://blogs.vmware.com/console/2010/04/vmforce-and-vmwares-open-paas-strategy.html), we have a strategy to deliver platform as a service (PaaS) solutions that can be hosted at customer datacenters or at service providers. By deploying an enterprise-ready solution, based on a lightweight application platform, scalable data platform, and vSphere clouds, customers improve agility, quality of service, and take cost and complexity out of IT operations in an evolutionary way. GemStone provides enterprises with the data platform that can work in their datacenter and provide the bridge to the cloud, both private and public.

I’d like to personally welcome the outstanding engineers from GemStone to the SpringSource division of VMware. Together we are going to produce amazing technology that can be used in the datacenter as well as the cloud.

To the existing GemStone customers, (both new to SpringSource and shared) I look forward to working with you to address the technical challenges facing your business.