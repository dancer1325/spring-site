---
title: Launching Cloud Foundry, The Industry’s First Open PaaS
source: https://spring.io/blog/2011/04/12/launching-cloud-foundry-the-industry-s-first-open-paas
scraped: 2026-02-24T08:43:06.594Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rod Johnson |  April 12, 2011 | 0 Comments
---

# Launching Cloud Foundry, The Industry’s First Open PaaS

_Engineering | Rod Johnson |  April 12, 2011 | 0 Comments_

Today, we have exciting news for developers: the launch of [Cloud Foundry](http://www.cloudfoundry.com): an open source “Platform as a Service” (PaaS) from VMware allowing easy deployment of applications written using Spring, Rails and other modern frameworks. Cloud Foundry breaks new ground in PaaS through supporting a choice of programming models; a choice of services from VMware and third parties; a choice of clouds for deployment; and being delivered in open source.

Since the creation of [Spring](http://www.springsource.org), we’ve remained faithful to a few core values: notably, Productivity and Portability. Today, these proven values extend beyond Spring and Java into [VMware’s broader cloud computing strategy](http://blogs.vmware.com/console/2011/04/cloud-foundry-delivering-on-vmwares-open-paas-strategy.html). Spring makes developers more productive by reducing time spent away from business logic; Cloud Foundry eliminates time spent installing and configuring infrastructure such as application servers and JVMs. Spring facilitates portability between deployment destinations; Cloud Foundry is both a key deployment destination itself and a layer that allows deployment to a choice of clouds, both public and private.

*Cloud Foundry will be the natural cloud deployment choice for Spring developers.*

[![Cloud Foundry Diagram](http://blog.springsource.com/wp-content/uploads/2011/04/CloudFoundryDiagram800x576.png)](http://www.cloudfoundry.com)

## A Big Step for Java, but Not Just Java

To date, there hasn’t been a strong, open PaaS destination for Java. The millions of Java developers have largely been left to fend for themselves in the cloud, with weaker options than have been available, to, say, Ruby developers. We’re changing that.

*With Cloud Foundry, VMware is providing a convenient and compelling destination for Java applications in public and private cloud.*

We’re making this deployment destination easy to adopt. You won’t need to architect your applications in a special way or make do with a restricted subset of language or framework features, nor will you need to call Cloud Foundry specific APIs.

We want you to be *more*, not less, productive. We’re going all out to optimize the productivity of the overall *experience*. It’s not enough simply to provide a destination in the sky to deploy applications to—it’s essential to consider how developers work, and to integrate the deployment destination with a productive tool chain that they will love to use. Cloud Foundry will be closely integrated with existing Spring technologies such as [Spring Roo](http://www.springsource.org/roo) and [SpringSource Tool Suite](http://www.springsource.com/developer/sts), for a particularly productive Spring experience.

*Today’s announcement is good news for Java, but goes beyond Java. We want to serve developers, whatever their chosen language and framework. So Cloud Foundry is inherently cross platform. It supports Rails, as well as Spring, applications, on the same underlying infrastructure.*

We also have [node.js](http://nodejs.org/) support, and SPIs to allow both VMware and the community to add support for new platforms. Sharing of infrastructure and services between platforms will provide a major benefit to all developers.

## Open PaaS, Open Source

*I’m proud that VMware continues to deepen its commitment to open source. Cloud Foundry is an open source project.*

SpringSource brought one of the world’s largest and most vital open source communities into the VMware family. We’ve grown that corporate commitment by embracing and leading [Rabbit MQ](http://rabbitmq.com/) and [Redis](http://redis.io/). Today, we are launching Cloud Foundry as an open source project, as well as a cloud service.

Open source allows rapid progress while avoiding lock-in—an important concern in cloud computing. We believe that open source is the best way to push Cloud Foundry forward as a technology, and the best choice for users and customers.

Openness is a key theme in VMware’s approach to PaaS. Cloud Foundry is open in three other important ways:

-   Open to multiple framework and developer communities, as I’ve already mentioned Cloud Foundry supports Spring, [Grails](http://www.grails.org), Node.js and [Ruby on Rails](http://rubyonrails.org/) with work already underway for other frameworks.
-   Open to multiple services, provided by VMware or other vendors or communities: Initially we will provide basic services such as a relational database, but the choice will broaden quickly. Other initial choices are MySQL, Redis and [MongoDB](http://www.mongodb.org/), and RabbitMQ will soon follow.
-   Open to a choice of underlying deployment destinations: Cloud Foundry will be available as a public cloud service at [CloudFoundry.com](http://www.cloudfoundry.com) and as software you can run wherever you choose. We are embracing portability at the Cloud Foundry layer, as well as Spring Framework layer, and expect to see Cloud Foundry running on top of EC2 and other IaaS offerings.

Choice of deployment destination is particularly important to the Java community, as Java is heavily used to build enterprise applications and many organizations are not willing to run their enterprise applications in the public cloud. With Cloud Foundry, it doesn’t matter. You can run the technology behind the firewall if you wish, and control your own destiny as you embrace cloud computing.

*Cloud Foundry’s embrace of openness and choice is a game changer in the PaaS world, with the potential to benefit millions of developers.*

## Getting Involved

It’s a big vision: an open PaaS offering a high quality, integrated developer experience. This experience will continue to improve: notably, with the introduction in the coming quarter of [Code2Cloud](http://blog.springsource.com/2010/10/21/springone2gx-2010-driving-java-innovation-into-the-cloud/), a cloud service bridging the gap between developer desktop and cloud deployment.

Hopefully you agree that this will be an exciting journey. Better still, you can help along the way. Begin by trying the service through [signing up for a beta account](http://www.cloudfoundry.org). Next, you might want to try the software in your own environment, rather than in our public cloud, experiencing the portability that is core to the Cloud Foundry promise. Hopefully your interest will be piqued and you’ll want to [download the source code](https://github.com/cloudfoundry) and contribute to the project. Like Spring, Cloud Foundry is published under the [Apache License, version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)—a widely adopted license that helps to create strong, diverse communities.

Regardless of how deeply you want to delve into the enabling technology, it’s a great time to be a developer. As always, I hope that our efforts help you to focus on cutting code, delivering business value and, above all, having fun!