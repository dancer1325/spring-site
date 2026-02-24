---
title: SpringSource Tool Suite now free
source: https://spring.io/blog/2009/05/07/springsource-tool-suite-now-free
scraped: 2026-02-24T09:08:12.455Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Christian Dupuis |  May 07, 2009 | 0 Comments
---

# SpringSource Tool Suite now free

_Engineering | Christian Dupuis |  May 07, 2009 | 0 Comments_

It was April 27th around 2:39pm, when Rod announced in his [SpringOne Europe](http://europe.springone.com/europe-2009) opening keynote:

**“STS will be free!"**

[Reto Meier](http://www.namics.com/ueber-uns/namics-team/mitarbeiter/liste/Reto_Meier), with our partner [namics](http://www.namics.com), took a picture as proof of that very moment and published it on [flickr.com](http://www.flickr.com/photos/rmz-web/3484819062/). Also the audience at SpringOne seemed to be enthusiastic about the announcement and as a consequence the word was spread to outside of the conference soon after.

So here we are, since Rod promised it, we can't get out of itâ¦ ;-)

[![Rod @ SpringOne](http://blog.springsource.com/wp-content/uploads/2009/05/3484819062_5eeba30549.jpg "Rod @ SpringOne")](http://www.flickr.com/photos/rmz-web/3484819062)

Today we are proud to deliver on Rod's promise and can announce that the first free versions of STS have been published and can be downloaded from the [product page](http://www.springsource.com/products/sts).

As a user you can decide between two versions: we offer a STS 2.0.2.RELEASE distribution that is essentially the former commercial 2.0.1.RELEASE re-licensed under the terms of our new free EULA plus the new tc Server Tools.

If you want get your hands on all the new stuff that Adrian, Ben and myself demoed at SpringOne, you can download a M1 build of the upcoming 2.1.0 version.

## New Features in STS 2.1.0.M1

[![STS Dashboard](http://blog.springsource.com/wp-content/uploads/2009/05/dashboard-thumb1.png "STS Dashboard")](http://blog.springsource.com/wp-content/uploads/2009/05/dashboard.png)

If you haven't previously used STS make sure to review older blog posts about new features in earlier versions:

-   [Using Bundlor in Eclipse](http://blog.springsource.com/2009/03/26/using-bundlor-in-eclipse/)
-   [Getting Started with Bundlor](http://blog.springsource.com/2009/03/20/getting-started-with-bundlor/)
-   [Announcing SpringSource Tool Suite 2.0](http://blog.springsource.com/2009/03/17/announcing-springsource-tool-suite-20/)
-   [OSGi Development Tools in STS 2.0](http://blog.springsource.com/2009/03/05/osgi-development-tools-in-sts/)

This M1 early milestone build contains a couple of new features:

-   New Project Templates to help jumpstart a new Spring-based project. There are templates for Spring MVC, Web Flow, Faces, Batch, Roo and OSGi bundle projects
-   Integration of Roo Shell, Quick Roo Command Prompt (CRTL+R or CMD+R) and some STS specific Roo commands like âdeploy âserver' and ârun all tests'

[![Roo Integration](http://blog.springsource.com/wp-content/uploads/2009/05/roo-integration-thumbs1.png "Roo Integration")](http://blog.springsource.com/wp-content/uploads/2009/05/roo-integration.png)

```
Copy   <li>Deployment to dm and tc Server running on Amazon EC2 with automatic setup of server clusters and load balancer infrastructure. The EC2 clusters integrate with the WTP Server infrastructure and can be set up using the New Server wizard. AMIs for dm and tc Server have been published and are available for deployment use from EC2. We will follow up with another post with more details.</li>
```

[![EC2 deployment from STS](http://blog.springsource.com/wp-content/uploads/2009/05/ec2-deployment-thumb.png "EC2 deployment from STS")](http://blog.springsource.com/wp-content/uploads/2009/05/ec2-deployment.png)

```
Copy   <li>Visual editor for Spring Batch as a proof-of-concept for UI-assisted development of Spring Batch and Spring Integration configurations</li>
   <li>Bundled dm and tc Server ready to use within STS and stand-alone</li>
```

## What does “free” actually mean?

We got some questions about what “free” in the context of STS actually means. So let me try to explain: Firstly starting with version 2.0.2.RELEASE, STS is available at no cost and free for all development purposes; no strings attached. It is licensed under a commercial license, which you can review [here](http://www.springsource.com/node/406).

Secondly we are committed to improve and drive forward our open-source, EPL-licensed projects Spring IDE and dm Server Tools. Those two are part of STS and will continue to evolve alongside and inside STS.

Actually you will see all STS components â including Spring IDE and dm Server Tools â being made available on our consolidated update site (this is going to happen within the M2 timeframe). This new update site will become the single location to install any Eclipse-based tooling from SpringSource. The update site location will ensure that you can install complete STS or some features only without the need to hunt down different update site locations and worry about dependency resolution problems.

Besides consolidating the various update sites, we will also use the STS JIRA project at [](http://issuetracker.springsource.com)[http://issuetracker.springsource.com](http://issuetracker.springsource.com) to actively and openly track feature requests, bugs and improvements for all our tools. During the next couple of days you'll notice that the STS development team will start to track their day-to-day work in that JIRA.

I think you will agree with me that those consolidation efforts under the STS umbrella will make the life of a Spring developer a lot easier: there is only place to look for recent versions of our tools, file issues and interact with the development team.

Speaking about interaction with the team, I'd like to encourage every Spring developer and Tomcat user out there to download STS, give it a try and get involved in the community through our [forums](http://forum.springsource.org/forumdisplay.php?f=32), [JIRA](https://issuetracker.springsource.com), [Twitter](http://twitter.com/cdupuis) ([#STS](http://search.twitter.com/search?q=%23sts)) and email (sts AT springsource DOT com). As a user you can now actively influence where STS is heading and what would be of value to you. Furthermore you don't need to spend time figuring where to get certain tooling features or what the differences between Spring IDE and STS are.

I hope you are as excited as the team at SpringSource:

**"STS is free now!. [Go get itâ¦](http://www.springsource.com/products/sts/registration)"**

**Update:** Due to popular community demand we published STS 2.1.0.M1 to our consolidated update site at [](http://www.springsource.org/milestone/e3.4)[http://www.springsource.org/milestone/e3.4](http://www.springsource.org/milestone/e3.4) (note: this URL does not work in a browser, but it does work in Eclipse). Please submit every issue with that site in [JIRA](https://issuetracker.springsource.com/secure/CreateIssue!default.jspa?pid=10010). This is a work in progress and the structure of the update site is likely to change in the future.