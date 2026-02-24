---
title: Micro Cloud Foundry for Spring Developers
source: https://spring.io/blog/2011/08/24/micro-cloud-foundry-for-spring-developers
scraped: 2026-02-24T08:36:17.048Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  August 24, 2011 | 0 Comments
---

# Micro Cloud Foundry for Spring Developers

_Engineering | Josh Long |  August 24, 2011 | 0 Comments_

Today VMware team released [Micro Cloud Foundry](http://micro.cloudfoundry.com), a complete, local version of the popular, open source Platform as a Service that lets developers run a full featured cloud on their Mac or PC. Using Micro Cloud Foundry developers can build end-to-end cloud applications locally, without the hassles of configuring middleware while preserving the choice of where to deploy and the ability to scale their applications without changing a line of code.

Micro Cloud Foundry supports Spring and Java, of course, but also provides runtime environments for Scala, Node.js, and Ruby so that you can release your inner [polyglot programmer](http://blog.springsource.com/2011/05/03/using-mongodb-redis-node-js-and-spring-mvc-in-a-single-cloud-foundry-application/)! Micro Cloud Foundry also provides many services like MongoDB, MySQL, and Redis with come ready to use immediately without having to do extensive installation and configuration. With built-in dynamic DNS support, developers can run their Micro Cloud Foundry wherever they happen to be working – whether at home, office or coffee shop – without any reconfiguration required. After creating and testing your application on Micro Cloud Foundry, you can easily deploy your application without changes to [](http://www.cloudfoundry.com)[www.cloudfoundry.com](http://www.cloudfoundry.com) or other instances of Cloud Foundry - it enables true application portability across a range of cloud environments.

Micro Cloud Foundry is available as a free downloadable virtual machine image and is compatible with VMware Fusion for Mac OS X and VMware Workstation and VMware Player (available as a free download) for Linux and Windows computers. It provides easy installation, setup, and virtual machine management and all you need is a Cloud Foundry account to get started.

http://www.youtube.com/watch?v=cKkz\_vRNG1Q

## Getting Started with Spring and Micro Cloud Foundry

I’ve put together a video of the steps to obtain, install, configure and then deploy Spring applications to Micro Cloud Foundry.

In short, here are the five steps to get started with Micro Cloud Foundry for Spring Developers

1.  Follow the [download and install instructions](http://blog.cloudfoundry.com) for Micro Cloud Foundry.
2.  Start up your copy of [SpringSource Tool Suite](http://www.springsource.com/developer/sts) and install the Cloud Foundry eclipse support. You can do this from the STS dashboard by selecting the *Extension* tab at the bottom. Find and install the *Cloud Foundry Integration*. It’s under the *Server and Cloud* section, but you can also just search for it using the *Find:* field. When the installation prompts you to restart, do so. You need only one Eclipse plugin to work with **any** Cloud Foundry provider, be it the hosted CloudFoundry.com, a local Micro Cloud Foundry, or any other implementation.
3.  Once STS has restarted, open the *Servers* panel. Right click on the *Servers* panel and select *New > Server*. In the **Define a New Server** window, find the *Cloud Foundry* server, under the VMware folder. The Cloud Foundry integration lets you treat the cloud as just another WTP applicaton server.
4.  Fill out the *Host Name* - which you should have gotten when you completed the configuration of the Micro Cloud Foundry instance in Step 1 - and the *Server Name*, which is just a descriptive, meaningful string.
5.  Cloud Foundry will prompt you to authenticate on first use. Enter your cloudfoundry.com account credentials (email and password) which you used when you registered. When asked to choose the type of *URL* select *Local cloud* and then fill out the unique part of the subdomain which you registered with cloudfoundry.com. Click *Next* to complete the installation

## Adding Services

You can double click on the server instance to provision new services (including instances of MongoDB, Redis, MySQL, etc) and associate them to your applications. For the majority of cases, this should be sufficient to deploy your regular Spring applications. Micro Cloud Foundry is very smart. It’ll inspect your application and find in your Spring application context any objects that it has provisioned for you for your application. So, for example, if you’ve created a database javax.sql.DataSource in your Spring configuration, CF will detect that and try to dynamically connect it with a correctly configured MySQL DataSource bound to your application as a service. The same applies for the relevant Spring Data connection factories for Redis and MongoDB, for example.

If you’re using the imminent Spring 3.1 release, then you can take advantage of the profiles feature to conditionally enable certain bean definitions depending on the environment in which the definition is running. This feature, in tandem with the Spring `<cloud:*/>` namespace, gives you precise control over which provisioned service is used in the cases where there is a possible ambiguity (perhaps you’ve got two MySQL datasources associated with the same application). See Mark Fisher's earlier post on [Cloud Foundry for Spring Developers](http://blog.springsource.com/2011/04/12/cloud-foundry-for-spring-developers/).

And you’re done! Now, simply develop your application as you would normally but with all the power of having a cloud locally on your machine.