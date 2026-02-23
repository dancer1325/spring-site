---
title: Spring Cloud Spinnaker 1.0.0.M3
source: https://spring.io/blog/2016/12/19/spring-cloud-spinnaker-1-0-0-m3
scraped: 2026-02-23T18:54:30.050Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Greg L. Turnquist |  December 19, 2016 | 0 Comments
---

# Spring Cloud Spinnaker 1.0.0.M3

_Engineering | Greg L. Turnquist |  December 19, 2016 | 0 Comments_

Greetings Spring community,

I am happy to release the second milestone for [Spring Cloud Spinnaker](https://cloud.spring.io/spring-cloud-spinnaker/). Spring Cloud Spinnaker bundles up the [continuous delivery Spinnaker platform](http://www.spinnaker.io/), and provides a 1-click installer to let you install it to any [certified Cloud Foundry provider](https://www.cloudfoundry.org/use/cloud-foundry-certified/).

UPDATE: This blog post originally cited M2, however one of our early adopters spotted a [critical bug](https://github.com/spring-cloud/spring-cloud-spinnaker/issues/118), so M3 has been built and released with the fix in hand.

Key features included in this release:

-   Much more simplified way to login, select your org and space from dropdowns, etc., shooting for as simple an experience as possible.
    
-   Ability to manage two CF spaces
    
-   Support for Jenkins and Travis CI monitoring.
    
-   Configure email and slack notifications
    
-   Move to hosted uber JARs, meaning installing the installer is no longer a bugbear
    
-   Other enhancements regarding to Spinnaker itself include ability to clone server groups, an upgrade to our Reactor-based cf-java-client 2 library, and also enhance UX showing more CF information than ever.
    

If your team/meetup/JUG is interested in hearing more about Spinnaker, [check in with me](https://spring.io/team/gturnquist) and we can arrange a Google Hangout.

Cheers,

[Source](https://github.com/spring-cloud/spring-cloud-spinnaker) | [PR CI](https://circleci.com/gh/spring-cloud/spring-cloud-spinnaker) | [Master CI](https://jenkins.spring.io/view/All/job/spring-cloud-spinnaker/) | [Docs](http://www.spinnaker.io/docs) | [Questions](http://stackoverflow.com/questions/tagged/spinnaker) | [Slack](http://join.spinnaker.io/)