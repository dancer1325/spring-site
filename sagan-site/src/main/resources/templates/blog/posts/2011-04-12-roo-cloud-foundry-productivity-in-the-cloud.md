---
title: Roo + Cloud Foundry = Productivity in the Cloud
source: https://spring.io/blog/2011/04/12/roo-cloud-foundry-productivity-in-the-cloud
scraped: 2026-02-24T08:43:22.166Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | James Tyrrell |  April 12, 2011 | 0 Comments
---

# Roo + Cloud Foundry = Productivity in the Cloud

_Engineering | James Tyrrell |  April 12, 2011 | 0 Comments_

Today marks an important day for developers, with the public beta release of [Cloud Foundry](http://www.cloudfoundry.com/ "Cloud Foundry"), VMware’s open source Platform as a Service offering. [Rod Johnson’s blog](http://blog.springsource.com/2011/04/12/launching-cloud-foundry/ "Rod Johnson's blog") contains a lot of background details about this exciting announcement, and [Mark Fisher’s post](http://blog.springsource.com/2011/04/12/getting-started-with-cloud-foundry-for-spring-developers "Mark Fisher's post") offers a first look at the service and how easily applications can move between a local environment and the cloud. As both Rod and Mark highlight today’s announcement is about enhancing and ensuring developer productivity.

In support of this new service and platform we are pleased to announce that we have integrated Cloud Foundry support into [Spring Roo](http://www.springsource.org/roo "Spring Roo") - Spring’s rapid application development tool for Java developers. Now you can take Roo’s productivity to the cloud and you don’t even have to leave the shell! There are dozens of commands to make it easy to work with Cloud Foundry, and of course you can build a new application and deploy it to Cloud Foundry in just a few minutes. Once you’ve logged in, it’s as simple as using the new “cloud foundry deploy” command and you’re done.

[![](http://blog.springsource.com/wp-content/uploads/2011/04/Cloud-Foundry-from-the-Roo-shell.png "Cloud Foundry from the Roo shell")](http://blog.springsource.com/wp-content/uploads/2011/04/Cloud-Foundry-from-the-Roo-shell.png)

With Roo's Cloud Foundry integration you can now manage the entire life cycle of your application from the shell. Aside from stopping and starting you can: scale it, by changing the number of instances running and the allocated memory; view deployed applications and provisioned services and how they interrelate, map and unmap URLs, view detailed stats on the application, and bind and unbind services. And with Roo's clever auto-completion technology managing your presence in the cloud has never been easier.

[![Expenses in the Cloud](http://blog.springsource.com/wp-content/uploads/2011/04/Expenses-in-the-Cloud-1.png "Expenses in the Cloud")](http://blog.springsource.com/wp-content/uploads/2011/04/Expenses-in-the-Cloud-1.png)

Roo’s Cloud Foundry support allows you to easily deploy the common technologies used in Roo-based Java applications. For example, you can combine a familiar MySQL backend database and JPA with mainstream web front-ends such as Spring MVC and Google Web Toolkit (GWT). In terms of samples, below is a screen shot of Roo’s “Petclinic” sample running away on Cloud Foundry, which you can access at [roo-petclinic.cloudfoundry.com](http://roo-petclinic.cloudfoundry.com/ "Roo Pet Clinic in the Cloud"). We’ve also published our GWT Expenses sample at [roo-expenses.cloudfoundry.com](http://roo-expenses.cloudfoundry.com/ "Roo Expenses in the Cloud"). All of these samples are easily produced in a single Roo command from the shell or within Spring Tool Suite (“script expenses.roo” or "script clinic.roo").

[![Pet Clinic in the Cloud](http://blog.springsource.com/wp-content/uploads/2011/04/Pet-Clinic-in-the-Cloud.png "Pet Clinic in the Cloud")](http://blog.springsource.com/wp-content/uploads/2011/04/Pet-Clinic-in-the-Cloud.png)

If you’d like to try out the new Cloud Foundry service, you'll first need a [Cloud Foundry account](http://cloudfoundry.org/) but once you have that we’ve published detailed instructions in the [Cloud Foundry chapter](http://www.springsource.org/roo/guide?w=base-cloud-foundry "Cloud Foundry Chapter") of our Reference Guide (Online now, but to get started quickly simply download the the 1.1.3.RELEASE of Roo, run "cloud foundry login" from the Roo shell and follow the prompts to install Cloud Foundry support). These cover how to install the Cloud Foundry add-on and get started deploying your application. To follow the instructions you’ll need [Spring Roo 1.1.3.RELEASE](http://www.springsource.com/download/community?project=Spring%20Roo "Spring Roo 1.1.3.RELEASE"), which we just released today and you can [download here](http://www.springsource.com/download/community?project=Spring%20Roo).

We hope you enjoy this new feature and service. We welcome your feedback and questions on the [Community Forum](http://forum.springsource.org/forumdisplay.php?f=67).