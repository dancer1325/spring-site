---
title: SpringOne2GX 2010: Driving Java Innovation into the Cloud
source: https://spring.io/blog/2010/10/22/springone2gx-2010-driving-java-innovation-into-the-cloud
scraped: 2026-02-24T08:52:21.149Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rod Johnson |  October 22, 2010 | 0 Comments
---

# SpringOne2GX 2010: Driving Java Innovation into the Cloud

_Engineering | Rod Johnson |  October 22, 2010 | 0 Comments_

We are currently celebrating our 6th [SpringOne 2GX](http://www.springone2gx.com) developer show—since last year, also a celebration of Groovy and Grails. As always, it’s great to hang out with the developer community that has made Spring the phenomenon it is. This year, we not only have record attendance (doubled over last year!) and a fantastic roster of partners (headed by [Google](http://www.google.com), [salesforce.com](http://www.salesforce.com) and [Accenture](http://www.accenture.com)), but an unusually large number of initiatives to share with our community.

With so many topics to discuss this could easily turn into the longest blog post in history. Instead, let’s address some of the highlights, focused around the continuing mission of Spring: Portability and Productivity through Innovation.

## Code2Cloud: Bringing the Cloud to Spring Developers

*We’ve always believed that enterprise Java needs to be simpler and that there needs to be a [more integrated experience](http://blog.springsource.com/2009/04/14/enterprise-java-and-the-american-motors-gremlin/). Thus our biggest initiative at SpringOne2GX reflects our traditional focus of simplification and productivity.*

The biggest news at SpringOne2GX is our announcement of **[Code2Cloud](http://www.springsource.com/code2cloud)**, a new cloud service that provides a set of tools for development and collaboration. Like all Spring initiatives, Code2Cloud is motivated by reducing complexity.

With Spring, Grails, Spring Roo and STS, we’ve made the development experience far easier. With VMforce and tc Server we are offering additional, compelling deployment destinations. But much complexity and integration typically lurks between developer desktop and deployment. Code2Cloud changes this.

[![Code2Cloud](http://blog.springsource.com/wp-content/uploads/2010/10/Code2Cloud_400x303.png "Code2Cloud_400x303")](http://www.springsource.com/code2cloud)

With Code2Cloud, a developer needs only a single download of STS to create, deploy and evolve applications. The Code2Cloud service, hosted in the cloud, provides the missing link, providing essential application lifecycle tools. Source control, issue tracking and continuous integration are all hosted in the cloud, with zero configuration required. In keeping with the core Spring value of portability, and [VMware’s Open PaaS](http://blogs.vmware.com/console/2010/05/google-and-vmwares-open-paas-strategy.html) philosophy, Code2Cloud will support a choice of deployment destinations.

We see Code2Cloud as the natural next step in the Spring journey of simplifying the lives of Java developers, helping them focus on implementing business requirements without the distraction of tedious infrastructural concerns—in this case, such as setting up and manually configuring continuous integration servers, source code repositories and issue trackers. We’ve long believed that simplification of enterprise Java requires addressing the software lifecycle, and not merely the technology stack. The Build/Run/Manage approach we’ve adopted in for the last 2 years, our investment in STS, Grails and Spring Roo reflect this. Code2Cloud is a key missing piece of the jigsaw.

Code2Cloud is open source, and incorporates both existing, proven open source components such as [Git](http://git-scm.com/) and [Hudson](http://hudson-ci.org/) as well as new code—most notably, in the issue tracker. The new code builds on the Spring/SpringSource stack, based on Spring and running on tc Server. A Spring-powered GWT web UI provides a modern, responsive interface that serves multiple client types. We also provide a RESTful interface whose implementation was made trivial with Spring 3.0 REST support.

In addition to the turnkey integration provided by Code2Cloud, we are providing breakthrough innovation that connects the developer’s desktop to the hosted application. For example, monitoring technologies connected to the running application can automatically report defects to Code2Cloud, which immediately show up in STS with the context of the problem displayed.

The Code2Cloud technology has been created through a delivery partnership with [Tasktop](http://tasktop.com), a leader in the application lifecycle tooling space and a longstanding SpringSource partner. Tasktop is the company behind the popular and innovative Eclipse Mylyn project, which has transformed the way in which STS and other Eclipse users work with development artifacts, enabling the breakthrough simplicity of the Code2Cloud experience. The commercial ALM interoperability ecosystem provided by Tasktop and built on Mylyn will also increase the value of Code2Cloud.

We will offer a technology preview soon. For more detailed questions, please refer to the [FAQ](http://www.springsource.com/code2cloud/faq).

## Spring Innovation

Productivity and portability through innovation doesn’t stop with Code2Cloud. Spring is delivering more useful open source projects that will let enterprise Java developers escape the shackles of traditional Java thinking.

The industry spent most of the last decade trying to do the same things, successfully or more efficiently: Largely, to build the kind of transactional web applications that J2EE was conceived to address. To build applications with traditional Web 1.0 interfaces, only mildly spiced in recent years with a dash of AJAX; applications that mostly depended on a single relational database; applications that used messaging in relatively simple ways and did not have complex interaction patterns at their heart; applications that, of course, ran within a single enterprise data center, with static provisioning.

Over that decade we learnt the flaws in the J2EE model and saw decisive change in platform leadership, with innovation coming from open source and transforming programming model, tooling and deployment for the better.

Today most of the old concerns remain valid but we face an additional set of challenges: For example, writing applications that can serve a variety of client types; applications that access data held in SaaS applications and stores other than a relational database; applications that publish and source information from a variety of social media; applications that support complex conversation patterns; applications that are deployable to new destinations in the public cloud.

This is a major shift, and we are responding.

*We recognize that applications have changed significantly. With Spring and related technologies, we’re tackling today’s problems head on.*

Besides the usual steady progress in Spring Framework, with Spring 3.1, we’re announcing some important new initiatives, including:

-   The Spring Data project focuses on bringing Spring simplicity to accessing non-relational data in Java.
-   The Spring Mobile project makes it easy for Spring developers to write applications that support different client types, both as enhancements to Spring MVC and through our collaboration with Google around GWT, Spring and Spring Roo.
-   The Spring Social project makes it easy for Spring developers to write applications that integrate with social media and use OAuth
-   Spring 3.1 will make it easy for Spring developers to access data grids such as GemFire and EHcache using a caching abstraction or directly via the Spring GemFire and Spring AMQP projects.
-   The Spring Payment Services incubator project seeks to make it easy to integrate a wide range of payment services into Spring-powered applications. This includes merchant payments, person-to-person payments, mobile payments, and related payment scenarios.

Our multi-client and social media work was showcased in the **Greenhouse** application developed by Keith Donald and team—an open source reference for these new capabilities.

SpringOne2GX also showcases our ongoing investment in other areas that are increasingly important in the new world, such as Spring Integration, for writing applications that support the sophisticated conversation patterns that are becoming more and more important.

We live in exciting times, and the SpringSource team is working hard to solve the new problems they pose.

*For those who worry about the potential stagnation of Java: Innovation in Java is back? (we never stopped innovating, others might have…), and the future’s bright.*