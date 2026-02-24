---
title: New Cloud Foundry feature: Save deployment blueprints as Templates
source: https://spring.io/blog/2009/10/07/new-cloud-foundry-feature-save-deployment-blueprints-as-templates
scraped: 2026-02-24T09:03:37.697Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Chris Richardson |  October 07, 2009 | 0 Comments
---

# New Cloud Foundry feature: Save deployment blueprints as Templates

_Engineering | Chris Richardson |  October 07, 2009 | 0 Comments_

When you launch a Java web application on [Cloud Foundry](http://www.cloudfoundry.com), you can specify many aspects of a deployment blueprint including: •    Single instance vs. Multiple instances topology •    Virtual instance types •    Public facing IP address •    SSL configuration •    JVM options •    Database configuration •    Monitoring and management •    Self-healing and auto-scaling options •    And more…

The wide range of options gives you the ability to configure the optimal deployment blueprint for your application. The bad news was that you had to re-enter those carefully chosen settings each time you deployed your application.

To solve this problem, Cloud Foundry has a great new feature called Deployment Templates that let you easily reuse your deployment blueprint settings. When you create a deployment, you can save the settings for future use by checking SAVE and giving the template a name:

![SaveAsTemplate](http://blog.springsource.com/wp-content/uploads/2009/10/SaveAsTemplate1.png "SaveAsTemplate") Later, when you want to launch another deployment using the same blueprint, you can simply pick the deployment template from a dropdown: ![UseTemplate](http://blog.springsource.com/wp-content/uploads/2009/10/UseTemplate2.png "UseTemplate")

And, click the Launch button. Cloud Foundry then deploys your application with the blueprint that you configured earlier.  You can also choose to update the template and save the changes so that you can reuse those settings later.

Deployment templates make the task of deploying applications with [Cloud Foundry](http://www.cloudfoundry.com) even simpler. I hope that you will give them try.

Chris

PS. Please vote for Cloud Foundry in the [Cloud Computing reader’s choice awards](http://cloudcomputing.sys-con.com/general/rcawardsvote.htm).