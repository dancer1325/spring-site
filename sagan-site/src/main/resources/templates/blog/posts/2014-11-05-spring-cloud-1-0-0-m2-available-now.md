---
title: Spring Cloud 1.0.0.M2 Available Now
source: https://spring.io/blog/2014/11/05/spring-cloud-1-0-0-m2-available-now
scraped: 2026-02-23T22:09:19.718Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Dave Syer |  November 05, 2014 | 3 Comments
---

# Spring Cloud 1.0.0.M2 Available Now

_Releases | Dave Syer |  November 05, 2014 | 3 Comments_

If you are building microservices with Spring you will be interested to see that [Spring Cloud](http://projects.spring.io/spring-cloud) 1.0.0.M2 hit the streets yesterday and today, and can now be found in the Spring [repository](http://repo.spring.io). Visit the individual project pages links in the main [umbrella page](http://projects.spring.io/spring-cloud) or look at their [github repositories](https://github.com/spring-cloud) for detailed instructions about how to get started using the individual components. There is also a [Reference Guide](http://projects.spring.io/spring-cloud/spring-cloud.html) covering the core modules.

Since Spring Cloud is an umbrella project we have a "release train" of related updates to all the sub-projects (like with Spring Data). The 1.0.0.M2 release has updates to [spring Cloud Config](http://cloud.spring.io/spring-cloud-config/), [Spring Cloud Netflix](http://cloud.spring.io/spring-cloud-netflix/), [Spring Cloud Bus](http://cloud.spring.io/spring-cloud-bus/), [Spring Cloud Security](http://cloud.spring.io/spring-cloud-security/) and [Spring Cloud CLI](http://cloud.spring.io/spring-cloud-cli/).

There is also a new member of the family, so a warm welcome welcome please for [Spring Cloud for Amazon Web Services](http://cloud.spring.io/spring-cloud-aws/). This toolkit eases the integration with hosted Amazon Web Services. It offers a convenient way to interact with AWS provided services using well-known Spring idioms and APIs, such as the messaging or caching API. Developers can build their application around the hosted services without having to care about infrastructure or maintenance. It has been contributed by our friends at [Mimacom AG](http://mimacom.com), and we expect to be working closely with them as Spring Cloud moves towards its first umbrella release.

There are plenty of samples, including the demos from recent webinars and conferences, in the separate [spring-cloud-samples](https://github.com/spring-cloud-samples) organization at GitHub. In particular there is a "scripts" aggregator project which has git submodules for all the samples and libraries, and there is a 1.0.0.M2 branch if you want to play with them using a stable binary build. In the scripts project you will also find a load of Groovy CLI applications in a "demo" folder, and shell scripts for building and running locally, and for deploying the apps to Cloud Foundry.