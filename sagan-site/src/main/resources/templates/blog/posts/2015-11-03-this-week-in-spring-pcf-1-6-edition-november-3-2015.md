---
title: This Week in Spring  (PCF 1.6 edition!) - November 3, 2015
source: https://spring.io/blog/2015/11/03/this-week-in-spring-pcf-1-6-edition-november-3-2015
scraped: 2026-02-23T19:36:05.331Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  November 03, 2015 | 0 Comments
---

# This Week in Spring  (PCF 1.6 edition!) - November 3, 2015

_Engineering | Josh Long |  November 03, 2015 | 0 Comments_

Welcome to another installation of *This Week in Spring*! This week I'm in Sofia, Bulgaria for [one of my favorite shows, the epic Java2Days event](http://2015.java2days.com/)!

Last week saw the release (*finally!*) of **Pivotal Cloud Foundry 1.6**, which contains more than a year and half of highly anticipated features and heavy lifting. The new release includes, among *many other things*, support for platform-managed GitLab, JFrog Artifactory, and CloudBees Jenkins CI; support for microservices infrastructure including the Spring Cloud Config Server, and Spring Cloud Eureka; and support for Docker container images and .NET applications; and [support for running on Microsoft Azure](http://www.eweek.com/cloud/microsoft-azure-embraces-cloud-foundry-open-source-paas.html). This release is *packed* with all sorts of features optimized for the continuous and safe delivery of software into production and I wholeheartedly encourage you to take a look at it for your environment. PCF is based [on Cloud Foundry](http://cloudfoundry.org). Cloud Foundry is a platform-as-a-service that stands up services and integrations to support developing and deploying applications in a predictable, safe way. It is the epitome of a high performing software organization and their virtues.

As usual, we've got a lot to cover so let's get to it!

-   InfoQ also has nice writeup of [some of the new features in PCF 1.6](http://www.infoq.com/news/2015/11/pivotal-cloud-foundry-netflix)
-   then Pieter Humphrey and Matt Stine provided a walkthrough of some of [the Spring Cloud Services-specific support in Pivotal Cloud Foundry](http://blog.pivotal.io/pivotal-cloud-foundry/products/now-available-spring-cloud-services-for-pivotal-cloud-foundry)
-   Ian Andrews set the [stage with this announcement blog for Pivotal Cloud Foundry 1.6](http://blog.pivotal.io/pivotal-cloud-foundry/products/pivotal-cloud-foundry-1-6-now-available)
-   Spring Security lead Rob Winch has just announced [Spring Security 3.2.9.RELEASE](http://spring.io/blog/2015/11/02/spring-security-3-2-9-released) and [Spring Security 4.0.3.RELEASE](http://spring.io/blog/2015/11/02/spring-security-3-2-9-released), both of packed with minor improvements and security fixes
-   Spring IO Platform lead Andy Wilkinson has [just announced Spring IO Platform 2.0.0.RC1](http://spring.io/blog/2015/10/29/spring-io-platform-2-0-0-rc1)
-   Spring ninja Greg Turnquist's [epic fifth post in a series on using Spring Data REST with React.js](http://spring.io/blog/2015/10/28/react-js-and-spring-data-rest-part-5-security) looks at security in this latest installment.
-   Spring Cloud co-founder Spencer Gibb put up a nice post a little while ago [on emitting notifications, so that properties may be reloaded in various config clients, when something has changed in the Spring Cloud managed Git repository](http://spencer.gibb.us/blog/2015/09/24/spring-cloud-config-push-notifications/)
-   this blog from 2014 from our pal Jakub Kubrynski does [a great job of explaining how to include New Relic in a Spring Boot application](http://www.kubrynski.com/2014/12/include-java-agent-in-standalone-spring.html). We saw this post last year, but someone asked me a similar question this week and it's worth pointing people to.
-   Ashish Datta has a nice post [on using a custom authorization token with Spring Security](http://shout.setfive.com/2015/11/02/spring-boot-authentication-with-custom-http-header/). I might add that you should [consider using Spring Security OAuth](http://spring.io/guides/tutorials/spring-security-and-angular-js/) for this as this basic mechanism, and much more, are all baked in and foreword compatible if you should ever decide to layer on more of the features that OAuth already provides.
-   Pivotal's own advocate Mark Heckler [put up a nice blog on his first impressions having recently joined Pivotal](http://www.thehecklers.org/2015/11/02/springing-forward/)
-   my Pivotal Labs pal Jacques Chester helped me find this [great blog on using Pivotal Tracker in a continuous delivery flow from 2012](http://blog.pivotal.io/labs/labs/level-up-your-development-workflow-with-github-pivotal-tracker). This isn't specific to Spring, but I think it's super helpful for someone managing a complex project, and it's definitely something I'll be treating in my upcoming book, [*Cloud Native Java*](http://cloudnativejava.io/about/)