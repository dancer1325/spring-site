---
title: Spring Project CI Builds
source: https://spring.io/blog/2007/04/18/spring-project-ci-builds
scraped: 2026-02-24T09:30:41.865Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Hale |  April 18, 2007 | 0 Comments
---

# Spring Project CI Builds

_Engineering | Ben Hale |  April 18, 2007 | 0 Comments_

Over the last couple of weeks, fellow i21 employee Costin Leau and I have been working on improving the Continuous Integration processes of the Spring projects. When we started, we had separate builds running in Cruise Control, Continuum, and even a custom cron job. We were having some trouble getting any of our existing tools to give us what we wanted on all of the builds, when both Costin and I independently came upon [Atlassian's](http://www.atlassian.com) new product [Bamboo](http://www.atlassian.com/bamboo).

In about 10 minutes we had the Spring CI build up and running. This might not sound like much, but due to its size Spring doesn't play nicely with some build servers. So you can imagine our joy when the Spring build started kicking off reliably any time Juergen checked in a change. From there it was just a matter of setting up all the rest of the Spring projects to build as well. I've got to say, having done this kind of thing for a number years, I've never had CI builds start up so easily.

I won't give a complete feature list of Bamboo here, but I want to mention a couple of things that really sealed it for us. The main thing is the incredible visibility into the projects. Using Bamboo we're easily able to keep track of build times and failure rates which allows us have an overall view of the health of the project.

![Project Statistics](http://blog.interface21.com/main/wp-content/uploads/2007/03/project-stats.png)

If we want to dive down a bit we're able to see more detailed data about who's making changes and whether they're keeping the quality high as they do (who did you think would be making changes on Spring? :)).

![Build History](http://blog.interface21.com/main/wp-content/uploads/2007/03/build-history.png) ![Test Statistics](http://blog.interface21.com/main/wp-content/uploads/2007/03/test-stats.png)

But in the end, my favorite feature is one that is personal to each developer, the Bamboo dashboard. At this time, on the dashboard you can see the status of favorite builds, but also you can see how **your** changes are affecting the quality of the project.

![Dashboard](http://blog.interface21.com/main/wp-content/uploads/2007/03/dashboard.png)

If you get all of this for a 1.0 release, imagine what Bamboo has in store for the future! So if you have an interest in the quality of the Spring projects (or just a little too much time on your hands) head on over to [](http://build.springframework.org:8085/bamboo/)[http://build.springframework.org:8085/bamboo](http://build.springframework.org:8085/bamboo) and take a gander. And those among you that are really observant may have noticed the RSS feeds for the builds in the first image. If you must have up to the minute information on the build status of any project, you can just subscribe there.

I'd love to hear any comments on your experiences with Bamboo, other build tools, or improvements you'd like to see in the Spring configuration management department.