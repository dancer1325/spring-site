---
title: Cloud Foundry integrated into developer tools
source: https://spring.io/blog/2009/11/10/cloud-foundry-integrated-into-developer-tools
scraped: 2026-02-24T09:02:45.447Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Charles Lee |  November 10, 2009 | 0 Comments
---

# Cloud Foundry integrated into developer tools

_Engineering | Charles Lee |  November 10, 2009 | 0 Comments_

Thanks to the efforts of a number of other SpringSource project teams, we are excited to have integrations of three developer tools with [Cloud Foundry](http://www.cloudfoundry.com), namely SpringSource Tool Suite, Grails, and Roo.  The result of this is that you can create and develop your Spring or Grails applications, and run them in the cloud without having to leave your favorite IDE or command-line interface.  These tools utilize the Cloud Foundry client web services API (to be published soon) and leverage additional intelligence and SpringSource artifact repositories in the cloud for optimized, efficient uploads of Java web applications to Cloud Foundry.  This means that you can go from "code to cloud" in just minutes.

For those of you who attended SpringOne 2GX in New Orleans this year, now is the perfect time to take Cloud Foundry for a spin using the free trial account that we provided you.

As a developer, if your application will ultimately be deployed on Cloud Foundry or Amazon EC2  for production, using Cloud Foundry during development gives you a fast, convenient way to verify code changes in an environment that is configured exactly the same way as the production environment.  However, even if you are not using EC2 for production, there are still many benefits to having Cloud Foundry in your toolbox.

-   Immediate access to a web stack in a sandbox environment without having to go through the pain of setting up and configuring a web server, application server, and database on your development machine
-   Easily configure a multi-instance environment so that you can expose infrastructure architecture issues early in development
-   Functional/load testing
-   Giving access to others to your application under development

Given all these benefits, the integration with the following development tools makes incorporating Cloud Foundry into your development process simply seamless and effective.

## SpringSource Tool Suite (STS)

Starting with [SpringSourceTool Suite](http://www.springsource.com/products/eclipse-downloads) version 2.2.0, you'll get the Cloud Foundry service integrated into the IDE as a new Server type. This supports drag & drop of web application projects onto the Cloud Foundry server, as well as the ability to deploy and control your applications in Cloud Foundry. With the built-in browser, you can view your application and Cloud Foundry web user-interface without having to leave the IDE. Check out this [screencast](http://www.cloudfoundry.com/screencasts.html#sts) to see it in action and [download STS](http://www.springsource.com/products/eclipse-downloads) to get started. Thanks to [Christian Dupuis](http://blog.springsource.com/author/cdupuis/) and the STS team who contributed this stellar integration effort.

## Grails

The Cloud Foundry [Grails plugin](http://www.grails.org/plugin/cloud-foundry) was released just this week, and already we have heard from users about their experiences.  [Graeme Rocher](http://blog.springsource.com/author/grocher/) authored the plugin and has made the source code available through subversion: `  svn co https://src.springsource.org/svn/cloudfoundry_plugins/grails/cloud-foundry  `

With minimal setup, deploying to Cloud Foundry using the Grails command-line is a snap with a few simple commands.  Check out this [screencast](http://www.cloudfoundry.com/screencasts.html#grails) to see it in action and go to the [plugin page](http://www.grails.org/plugin/cloud-foundry) to get the details on how to install and use the plugin.

## Roo

Last, but not least, is the new [Roo](http://www.springsource.org/roo) add-on, which requires 1.0.0.RC3 or later.  [Ben Alex](http://blog.springsource.com/author/bena/)'s Roo session at SpringOne 2GX was one of the highest attended sessions and was standing room only.  We're ecstatic that Ben saw the increase in productivity achieved through Cloud Foundry and made it the first third-party add-on for Roo.  Go to this [post](http://forum.springsource.org/showthread.php?p=267357) to get the directions on how to install the add-on in Roo and use tab completion to find out what all you can do with "cloud foundry".  The source code is also available through subversion:

`svn co [https://src.springsource.org/svn/cloudfoundry_plugins/roo/com.cloudfoundry.roo.addon](https://src.springsource.org/svn/cloudfoundry_plugins/roo/com.cloudfoundry.roo.addon)`

We will put together a Roo/Cloud Foundry screencast and make it available very soon at [](http://www.cloudfoundry.com)[www.cloudfoundry.com](http://www.cloudfoundry.com).

## Cloud Foundry Ready

Along with these projects, we are introducing a Cloud Foundry Ready program.  The following image will appear on websites or user-interface of applications wherever a tool or service integrates with Cloud Foundry for enhanced user experience.

[![](https://www.cloudfoundry.com/images/CFBadge150x50.png)](https://www.cloudfoundry.com/faq.html#ready)

We look forward to having you try out Cloud Foundry with these developer tools.  Cloud Foundry's driving goal is to boost your productivity as a developer.  Please send us any feedback that you have through the [forums](http://forum.springsource.org/forumdisplay.php?f=70).