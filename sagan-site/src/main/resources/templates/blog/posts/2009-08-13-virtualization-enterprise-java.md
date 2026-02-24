---
title: Virtualization & Enterprise Java
source: https://spring.io/blog/2009/08/13/virtualization-enterprise-java
scraped: 2026-02-24T09:04:33.093Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Adrian Colyer |  August 13, 2009 | 0 Comments
---

# Virtualization & Enterprise Java

_Engineering | Adrian Colyer |  August 13, 2009 | 0 Comments_

If you want to understand at a strategic level what the implications of VMware’s recently announced acquisition of SpringSource are, there are several good sources, including [Steve Herrod’s (CTO of VMware) blog post](http://blogs.vmware.com/console/2009/08/vmware-acquires-springsource.html "VMware to acquire SpringSource"), [Rod Johnson’s commentary](http://blog.springsource.com/2009/08/10/springsource-chapter-two/ "SpringSource Chapter Two"), [Paul Maritz’s press and analyst call](http://ir.vmware.com/phoenix.zhtml?p=irol-eventDetails&c=193221&eventID=2371759 "VMware Investor Relations"), and [Darryl Taft’s insightful piece in eWeek](http://www.eweek.com/c/a/Cloud-Computing/VMware-and-SpringSource-Its-All-About-the-Cloud-Baby-126953/ "It's all about the cloud, baby").

In this post I will focus more on what this all means at a technical level, to give you an idea of the kinds of capabilities you can look forward to.

Firstly, let me reiterate that *nothing changes* with respect to our open source projects and  SpringSource product offerings. Nothing changes that is, apart from the fact that we’ll have even more opportunity in the future to add exciting new features to them. Spring 3.0 is coming soon, and we just released [milestone 4](http://www.springsource.com/download/community "Spring 3.0 M4 download"). dm Server is making rapid progress towards a [2.0 release](http://blog.springsource.com/2009/08/06/dm-server-20-m4/ "dm Server 2.0 M4 released"), and we have some very cool stuff up our sleeves for a forthcoming release of tc Server. The [Eclipse tool support for Groovy](http://blog.springsource.com/2009/07/30/a-groovier-eclipse-experience/ "A Groovier Eclipse Experience") is generating masses of interest, Grails is pushing on towards a [1.2 release](http://www.grails.org/1.2-M2+Release+Notes "1.2 M2 Release Notes"), and exciting things are happening across our Spring projects. All of this will continue at pace.

## The power of blueprints

Every Spring-powered application has what we call an “*application blueprint*”.  This blueprint contains a description of all of the components (beans) that make up the application, how they are configured and connected, how they interact with the surrounding environment, and how cross-cutting concerns such as security and transactions should be handled. The blueprint is represented at runtime by a collection of *BeanDefinitions*, The BeanDefinitions are derived from a variety of sources including XML definitions, annotations, JavaConfig, Groovy DSLs, and any other configuration mechanism that can be plugged into Spring. It’s the job of the Spring container to take the blueprint that you have specified for your application and “make it so”. The application blueprint gives Spring a high degree of insight into the workings of your application. We’ll come back to that thought...

What happens when a Spring-powered application is deployed in a production setting? In a typical scenario there are multiple components working in concert that need to be configured and connected. An [http Server](http://www.springsource.com/products/ers "SpringSource ERS") load balancing across a set of t[c Server](http://www.springsource.com/products/tcserver "SpringSource tc Server") instances for example, which in turn talk to a database configured in a master/slave setup. These (middleware) components form logical tiers of an application (using the term application “in the large” now). The logical tiers are mapped to physical tiers in an actual deployment (e.g. you can deploy a database and app server on the same machine, or on different machines). When this terminology was first invented, physical tiers really were physical. But nowadays your physical tier may of course be virtual, and those virtual machines are in turn mapped onto physical resources..... still with me???

![tc Server farm deployment blueprint](http://blog.springsource.com/wp-content/uploads/2009/08/deploymentblueprint.jpg "deploymentblueprint")

Just as we have an *application blueprint* that describes the components of a Spring-powered application and how they fit together, so a *deployment blueprint* can describe the components of a given deployment scenario - what components there are, how they are connected and configured, and how cross-cutting concerns such as security, and (anti-)affinity should be handled. As a starting point, there are some common deployment patterns (such as the tc Server farm example I gave earlier) that can be captured in a catalog. In time you can imagine an operations team extending that catalog with their own custom blueprints for application deployment.

## From deployment blueprint to vApp

Putting an application into production should be as simple as developing an application with its associated application blueprint, selecting a deployment blueprint suitable to the application style (e.g. web application, batch processing, integration etc.), and clicking “deploy”. You can already see early examples of this model in practice with for example the CloudFoundry support for a web application deployment blueprint on Amazon’s EC2.

[VMware vSphere](http://www.vmware.com/products/vsphere/) includes support for a concept known as a vApp. A vApp is “a logical entity comprising one or more virtual machines, which uses the industry standard Open Virtualization Format to specify and encapsulate all components of a multi-tier application, as well as the operational policies and service levels associated with it.”

vApps are the perfect packaging unit for the embodiment of deployment blueprints. The same vApp can be supported in your data center and on a public vCloud. A vApp can also expose configuration properties - an operator provides values for these properties when deploying the vApp.

Beginning with the [dm Server](http://www.springsource.org/dmserver "dm Server community site") (watch out for more details in the forthcoming 2.0.0.M5 release), we’re making it possible for our middleware to be configured via vApp properties. This enables an operator to override ports and other configuration settings when deploying a vApp without needing to know anything about the virtual machines or configuration of middleware components inside. This capability extends beyond the middleware components too, you’ll also be able to configure application properties (that will be dependency injected by Spring) sourced from vApp properties specified by an operator at deployment time.

![vApp configuration](http://blog.springsource.com/wp-content/uploads/2009/08/vapp.jpg "vapp") There are many interesting ways in which these capabilities may be combined, but let me pick on two that I think are illustrative of the potential here: the *Platform as a Service (PaaS) model*; and the *application appliance model*.

In the Platform as a Service model your data center, or any of the multiple vendors signed up as vCloud service providers, makes available a catalog of deployment blueprints to choose from. Each of these can be thought of as platform (in the PaaS) sense, to which you can deploy your application. You select the platform you want to deploy to, the corresponding vApp is provisioned on your behalf (perhaps with a web front-end that lets you specify any vApp properties exposed by the blueprint), and then you upload your application artifact(s) to your provisioned and running platform instance. For applications built with [Grails](http://grails.org/) or [Roo](http://www.springsource.org/roo "Spring Roo"), where we understand even more about the structure of your application, the deployment blueprint selection and artifact uploading can be made available right from the Grails (or Roo) command-line via a plugin. Think of the hosting opportunities for such applications that this model will open up!

In the application appliance model, the development or operations team pick a starting deployment blueprint, create an instance of the corresponding vApp, and install the application artifacts into that running system. So far this looks just like the PaaS model. What happens next is different though. The virtual machines (with the application artifacts now installed) are packaged as a new vApp, and any application-specific properties that may change on each deployment (for example, database URL and password if the vApp relies on an external database) are configured as vApp properties. So now the entire application and everything needed to run it is packaged as a vApp (an application appliance) that can be provisioned as a unit (and version controlled). Putting an application into production then becomes as simply as deploying the vApp - nothing to go wrong, everything is pre-packaged and tested.

## Intelligent Provisioning

Hopefully by now you’re starting to see how deployment blueprints tied to the vApp model can streamline the path from development to production. But this approach doesn’t just make things quicker and easier, it also enables smarter provisioning.

Without the knowledge that Spring brings to the table, a vApp is just a collection of virtual machines that vSphere can provision on the physical resources available to it. But things get a lot more interesting when that provisioning is done with knowledge of the application blueprint and the deployment blueprint. Now we suddenly have some understanding of the application and middleware components and how they are connected, and we can optimize the virtual infrastructure to support that. For example:

-   vSphere can *automatically create* *[vShield zones](http://www.vmware.com/products/vshield-zones/ "vShield Zones")* so that the application server nodes can only be accessed from the web server, and only the web server node(s) are publicly accessible
-   vSphere can *automatically set up anti-affinity groups* so that the database master is not provisioned on the same physical hardware as the slave(s)
-   vSphere can *optimize network configuration* based on the expected traffic patterns implied by the blueprints
-   ...

In addition:

-   Built into the blueprint can be the [Hyperic HQ management server](http://www.hyperic.com/products/enterprise-systems-monitoring.html "Hyperic HQ"), with agents running on all the virtual machines in the vApp. Because we understand the blueprint, appropriate HQ groups (for example to managed all of the tc Servers as a single logical resource) can be automatically created, inventory automatically added, and appropriate control actions and alerts set-up by default. There will be no need to install and configure any of this by hand.

## Intelligent Runtime Management

Intelligent provisioning is great, but it doesn’t stop there. vSphere contains sophisticated mechanisms to optimize your virtual machines and data center usage at runtime. To date, those mechanisms have operated without any knowledge of the applications the virtual machines are trying to support. When you combine the application insights from Hyperic HQ with the virtual infrastructure insights from vCenter it becomes possible to create a combined application health and management model that optimizes the runtime based on application SLAs. For example, if HQ detects that response time from a tc Server node is getting close to the upper bound specified in an SLA, and this correlates with metrics showing that CPU or memory is a bottleneck, then several corrective actions become available including allocating more physical resources to the virtual machine on the existing box, using [vMotion](http://www.vmware.com/products/vi/vc/vmotion.html "VMWare VMotion") to migrate the virtual machine to more powerful hardware, or spinning up additional tc Server virtual machines to share the load.

On the subject of scaling up (or down), the scale points are just another piece of metadata in the deployment blueprint “1..n” (or “3..8”, or whatever you decide) of the servers playing this role. Having specified that, just leave Hyperic HQ and vCenter working in tandem to manage and optimize the number of servers for you (even to the extent of powering off physical machines that aren’t temporarily aren’t needed to save on energy costs) - all based on application SLA and virtual infrastructure SLAs that you specify.

## At your fingertips

Although I’ve focused mostly on the actual deployment into production in this blog post, this technology can also be incredibly valuable during development. Imagine having a catalog of virtual machines representing all of the different environments in which your application has to run (different browsers, OSs, app servers etc. as appropriate), and the ability to launch and test your application in any one of those straight from your IDE. Imagine being able to snapshot the state of a set of virtual machines when a hard to reproduce bug occurs during QA, and then have a developer independently fire up and analyze their own copy of those VMs right from within the [SpringSource Tool Suite](http://www.springsource.com/products/sts "STS"). Imagine being able to run basic scale and performance tests in a representative production environment without the hassle of having to actually set one up. Imagine...

## Bring it on...

Another wave of innovation, another industry disruption point. At SpringSource, these are the challenges we love, and the challenges we thrive on. Bring it on!