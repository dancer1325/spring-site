---
title: Project Sagan: zero-downtime deployments
source: https://spring.io/blog/2014/04/04/project-sagan-zero-downtime-deployments
scraped: 2026-02-24T07:27:09.048Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Chris Beams |  April 04, 2014 | 9 Comments
---

# Project Sagan: zero-downtime deployments

_Engineering | Chris Beams |  April 04, 2014 | 9 Comments_

Last week, I [began this series](http://spring.io/blog/2014/03/27/project-sagan-open-sourcing-spring-io) by announcing that the [Sagan](http://github.com/spring-io/sagan) reference app is now open source and [showed](https://vimeo.com/90126708) how to get up and running with it on your own machine.

In this post, I want to walk through how we push Sagan into production at spring.io multiple times a day with zero downtime using *blue-green deployments*. You may have heard of this technique before; [Martin Fowler gave it a write-up](http://martinfowler.com/bliki/BlueGreenDeployment.html) a few years ago, and there is a section on it in the highly-recommended book [Continuous Delivery](http://www.amazon.com/gp/product/0321601912). In a nutshell, it goes like this:

1.  maintain two copies of your production environment ("blue" and "green");
2.  route all traffic to the the blue environment by mapping production URLs to it;
3.  deploy and test any changes to the application in the green environment;
4.  "flip the switch" by mapping URLs onto green and unmapping them from blue.

Conceptually, blue-green deployments are simple and the benefits are significant (deploy often, never go down, roll back with ease). But without the right infrastructure, they can be tricky to implement. For example, to accomplish the critical fourth step of "flipping the switch", you need a fast, reliable, and automated means of mapping and unmapping production URLs between the blue and green environments. A DNS-based approach fails on most or all of these criteria; what you want is a platform that is built with use cases like this in mind.

Fortunately, Cloud Foundry is just such a platform. The Pivotal Web Services [documentation on blue-green deployments](http://docs.gopivotal.com/pivotalcf/devguide/deploy-apps/blue-green.html) does a great job of explaining how the CF *Router* makes this kind of mapping and unmapping possible.

In the case of the Sagan project, while working with CF's routing infrastructure did indeed give us the *fast* and *reliable* mapping we needed, it left a little to be desired in the *automation* department. We initially [wrote shell scripts](https://github.com/spring-io/sagan/blob/0eb19856b7da7fa2e5aea9aeeb5da60185ac1fa6/sagan-site/scripts/deploy.sh) around the Ruby `cf` client, and then [migrated them](https://github.com/spring-io/sagan/commit/14df068c28c69b8f29a0ceda25e501a33e5ed448) to the new Go-based `gcf` client when it came out. This worked, but what we really wanted was a solution that (a) we didn't have to write and maintain ourselves, and that (b) could run 100% on the JVM, driven natively by Sagan's Gradle build.

To make this happen, we worked with Scott Frederick on the Cloud Foundry team, who did an excellent job of enhancing the [Cloud Foundry Gradle plugin](https://github.com/cloudfoundry/cf-java-client/tree/master/cloudfoundry-gradle-plugin) to support blue-green deployments as a first-class feature. It means [no more shell scripts](https://github.com/spring-io/sagan/commit/44f70ef915ccedf48742b0b9d1d4cdda60e9993b), [declarative configuration](https://github.com/spring-io/sagan/blob/master/gradle/deploy.gradle), and out of the box, zero-downtime deployments are now as simple as:

```
Copy./gradlew deploy -Pspace=production
```

But this is the sort of thing that's better shown than described. In this screencast, I'll walk through the process of upgrading Sagan from Spring Boot 1.0.0.M5 to [the newly-announced 1.0 GA](https://spring.io/blog/2014/04/01/spring-boot-1-0-ga-released), and pushing the change live, blue-green style.

!{iframe src="//player.vimeo.com/video/90956088" width="640"  height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen}{/iframe}

> ***Note**: See the [show notes](https://vimeo.com/90956088) for links to sites mentioned in the screencast*

Check out [how to run the site on Cloud Foundry](https://github.com/spring-io/sagan/wiki/Run-the-site-on-Cloud-Foundry) on the Sagan wiki to get started, and remember you can use the invitation code "**sagan**" to get immediate approval for an account at [Pivotal Web Services](https://console.run.pivotal.io/register).

We'll have another entry in this series next week. We're still planning the content for that, and it would be great to hear what aspects of the Sagan application you'd like to see explored. Until then!