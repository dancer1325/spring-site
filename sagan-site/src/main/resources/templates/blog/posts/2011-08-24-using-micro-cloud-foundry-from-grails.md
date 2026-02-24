---
title: Using Micro Cloud Foundry from Grails
source: https://spring.io/blog/2011/08/24/using-micro-cloud-foundry-from-grails
scraped: 2026-02-24T08:36:21.905Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Peter Ledbrook |  August 24, 2011 | 0 Comments
---

# Using Micro Cloud Foundry from Grails

_Engineering | Peter Ledbrook |  August 24, 2011 | 0 Comments_

Back in April, VMware introduced Cloud Foundry to the world and with it came [super-simple application deployment](http://blog.springsource.com/2011/04/12/one-step-deployment-with-grails-and-cloud-foundry/) for Grails developers. Fast forward several months and now another piece of the jigsaw is in place: Micro Cloud Foundry. You can now have your own Cloud Foundry instance for testing or any other use case. And of course, it's incredibly easy to use from Grails.

So what is Micro Cloud Foundry? The following screencast gives you a brief overview of the product and then takes you through the process of downloading, installing and configuring it. At the end, you get to see how you can deploy a Grails application to your Micro Cloud Foundry instance instead of cloudfoundry.com:

[http://www.youtube.com/watch?v=qSRqIYFmrKg](http://www.youtube.com/watch?v=qSRqIYFmrKg)

You can learn more about Micro Cloud Foundry and how to set it up in [the Cloud Foundry blog post](http://blog.cloudfoundry.com/post/9331377393/we-shrunk-the-cloud-introducing-micro-cloud-foundry), and if you're an STS user check out [Josh Long's blog post and screencast](http://blog.springsource.com/2011/08/24/micro-cloud-foundry-for-spring-developers/) which include info on using STS and Micro Cloud Foundry together. Here, I'll just quickly explain the difference between deploying to cloudfoundry.com and a Micro Cloud Foundry instance from Grails.

Once you have your Micro Cloud Foundry VM up and running with a custom cloudfoundry.me sub-domain, you only require two steps before deploying Grails applications to it:

1.  install the latest Cloud Foundry plugin for Grails into your application, e.g. with grails install-plugin cloud-foundry; and
2.  configure the Cloud Foundry credentials and target URL.

That really is it! As soon as the appropriate configuration options are set, you can deploy directly to the Micro Cloud Foundry instance using the cf-push and cf-update commands. And those configuration options? They constitute the username and password for a valid user account on the Micro Cloud Foundry instance (typically created with the vmc register command), and the URL for that instance. This last is simply your custom cloudfoundry.me sub-domain with an 'api.' prefix.

These options can be declared in one of BuildConfig.groovy, $HOME/.grails/settings.groovy, or Config.groovy in that order of precedence. For example, you might have your cloudfoundry.com credentials in your personal settings.groovy file and the override them with values in BuildConfig.groovy:

```groovy
Copygrails.plugin.cloudfoundry.username = "pedro@mycompany.com"
grails.plugin.cloudfoundry.password = "password"
grails.plugin.cloudfoundry.target = "api.mycompany.cloudfoundry.me"
```

Now every Cloud Foundry command you execute will operate against the configured Micro Cloud Foundry instance. What could be easier?

**Update** \[26 Aug 2011\] At the time of writing, the latest version of the grailstwitter app depends on RabbitMQ which is not yet available in Micro Cloud Foundry. I have modified the link below to point to an earlier version (commit) that does not use RabbitMQ

Useful links:

-   [Micro Cloud Foundry](http://www.cloudfoundry.com/micro)
-   [Source code for Grails Twitter sample application](https://github.com/SpringSource/cloudfoundry-samples/tree/e2a2bfe8ec4c6a3882bee251ef21f35b3698196d)
-   [SpringSource YouTube channel](http://www.youtube.com/user/SpringSourceDev)