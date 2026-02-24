---
title: SpringSource Launches Enterprise Java Cloud
source: https://spring.io/blog/2009/08/19/springsource-launches-enterprise-java-cloud
scraped: 2026-02-24T09:04:23.401Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rod Johnson |  August 19, 2009 | 0 Comments
---

# SpringSource Launches Enterprise Java Cloud

_Engineering | Rod Johnson |  August 19, 2009 | 0 Comments_

Today, we make another significant announcement. SpringSource is launching an enterprise Java cloud—[SpringSource Cloud Foundry](http://www.cloudfoundry.com/).

This initiative is a logical extension of our integrated [Build/Run/Manage](http://blog.springsource.com/2009/04/14/enterprise-java-and-the-american-motors-gremlin/) approach to unifying the application lifecycle, extending our vision of simplifying enterprise Java beyond the traditional data center. As cloud computing becomes more important, we want to ensure that Java developers can take full advantage of it. We believe that our leadership in Java development, coupled with our strength in the runtime and management phases, enables us to provide a compelling solution that will benefit the developer community.

## What’s in the Box?

SpringSource Cloud Foundry provides an easy-to-use self-service approach, enabling developers to deploy their applications in minutes using a simple web interface. It offers automation of common deployment blueprints and intelligent, SLA-driven resource allocation with automatic scaling and automatic infrastructure repair.

Cloud Foundry builds on familiar Java technologies that SpringSource leads or makes a significant contribution to. The core runtime is our [tc Server product](http://www.springsource.com/products/tcserver), built on and wholly compatible with Apache Tomcat. We use the Apache HTTP web server for load balancing, and integrate [Hyperic](http://www.hyperic.com/) technologies for monitoring and management. We also provide a relational database (MySQL). Cloud Foundry allows the user to specify the desired application server and database configuration through a web interface, concealing the complexity of achieving the desired result, ensuring that the required steps reflect the intent rather than the details, and that configuration and deployment is repeatable. We expect that most users will be deploying Spring or Grails applications, although Cloud Foundry is not limited to Spring and Grails applications.

Thus, the programming and deployment model is wholly built on open source. The Cloud Foundry service also builds on open source: the [Cloud Tools](http://code.google.com/p/cloudtools/) project, founded and led by Chris Richardson, which provides a set of tools for deploying, managing and testing enterprise Java applications in a cloud environment.

This initial release runs on Amazon EC2 cloud infrastructure. However, one of the key elements of Cloud Foundry is the abstraction it provides over such infrastructure. As with the Spring Framework, we will work to enhance developer choice. In the future, Cloud Foundry will give developers a consistent experience over both public (off-premise) and private (on-premise) clouds, empowering organizations to make the most appropriate choices. Our conversations with customers make it clear that such a unified approach is a key need that is presently unmet in the industry. A key part of addressing this need will be Cloud Foundry also running on [VMware vSphere](http://www.vmware.com/products/vsphere/) infrastructure, which provides uniquely advanced on-premise cloud infrastructure.

## Future Directions

Cloud Foundry is valuable to developers today, but what’s even better is that we’re only getting started!

The longer-term vision goes much farther. We’ll be enhancing the management and other features you can already see. We’ll enhance runtime visibility into Spring and Grails applications, as we’re doing with our tc Server product itself. We're looking to offer modular deployment with [SpringSource dm Server](http://www.springsource.com/products/dmserver). Both [Adrian](http://blog.springsource.com/2009/08/13/virtualization-enterprise-java/) and [I](http://blog.springsource.com/2009/08/10/springsource-chapter-two/) have blogged about the possibilities of a fully integrated stack in which the application framework and application server work closely with the cloud infrastructure to deliver the best possible experience. With Cloud Foundry, we are opening up that path to developers.

We’re working on integration with Cloud Foundry in our freely available [SpringSource Tool Suite (STS)](http://www.springsource.com/products/sts), making it even easier for Spring developers to deploy applications to the cloud. We’re also planning Grails integration, making it as easy to deploy Grails applications to the cloud as it is to create them in the first place.

## Get Started Today!

Today’s launch is a beta service. As our tradition with Spring projects, we’ll be working to get developer feedback as we move to a GA release.

Simply go to [CloudFoundry.com](http://www.cloudfoundry.com), and you will be able to deploy an application in minutes. We want to hear from you! For example, we are open to offering persistence choices besides MySQL, and would love to get your input.

## Welcoming Chris Richardson

Some readers will recognize the Cloud Foundry name. Having identified cloud as an important strategic direction, we chose to acquire Cloud Foundry Inc. due to the innovation and leadership it had brought in the space. Since then we have increased investment in Cloud Foundry technology.

Many of you will know Chris Richardson, the founder of Cloud Foundry, as a long-time member of the Spring community and an enterprise Java thought leader. I’m happy to welcome Chris and his team to SpringSource. The combination of their work and SpringSource’s strength in frameworks, servers and management is exciting!