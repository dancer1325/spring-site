---
title: Project Sagan: open-sourcing spring.io
source: http://spring.io/blog/2014/03/27/project-sagan-open-sourcing-spring-io
scraped: 2026-02-24T07:33:52.071Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Chris Beams |  March 27, 2014 | 6 Comments
---

# Project Sagan: open-sourcing spring.io

_Engineering | Chris Beams |  March 27, 2014 | 6 Comments_

We [launched the spring.io site](https://spring.io/blog/2013/10/23/the-spring-io-site) at last year's SpringOne/2GX, and today I'm glad to announce on behalf of [the team](http://spring.io/team) that we're open-sourcing the Spring-based application that powers it.

We call the project [*Sagan*](https://github.com/spring-io/sagan/wiki/About-the-name), and it's been designed to serve as a reference for building modern web applications with Spring. The code is available now at [github.com/spring-io/sagan](http://github.com/spring-io/sagan), and it's easy to [get started](https://github.com/spring-io/sagan/wiki). Here's a short screencast to prove it:

!{iframe src="//player.vimeo.com/video/90126708" width="640"  height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen}{/iframe}

  
Over the coming weeks, we'll post a series of articles on the Sagan effort, exploring different aspects of the app, decisions behind its design, and chronicling its evolution. For example, while Sagan runs equally well today on JDK 7 and JDK 8, we're not yet taking advantage of [Java 8 language features](http://winterbe.com/posts/2014/03/16/java-8-tutorial/). As we [do that](https://github.com/spring-io/sagan/issues/181), we'll blog about it here, and in the process demonstrate why we think [Spring and Java 8](http://www.infoq.com/presentations/spring-java-8) make such a great match.

In the meantime, take Sagan for a spin! For a start, you can [get up and running locally](https://github.com/spring-io/sagan/wiki/Run-the-site-locally), and then try [deploying to Cloud Foundry](https://github.com/spring-io/sagan/wiki/Run-the-site-on-Cloud-Foundry) at [Pivotal Web Services](http://run.pivotal.io).

> ***Note:** [Register](https://console.run.pivotal.io/register) with the invitation code **"sagan"** for instantaneous account approval. The PWS team has made a limited number of these available, so it's first-come, first-served.*

From there, you can explore the rest of the howto-style docs in [the wiki](https://github.com/spring-io/sagan/wiki), and we'd love it if you'd [provide feedback](https://github.com/spring-io/sagan#qa-and-issue-tracking) along the way.

As GitHub's [contributors graph](https://github.com/spring-io/sagan/graphs/contributors) shows, the Sagan project has already been a big team effort internally. Today, we couldn't be happier to invite everyone reading this post to join us. There is plenty to do, and [pull requests are welcome](https://github.com/spring-io/sagan/blob/master/CONTRIBUTING.md)!

---

*UPDATE, May 16, 2014*: A replay of the SpringOne2GX 2013 session, "[spring.io inside and out](http://spring.io/blog/2014/05/12/springone2gx-2013-replay-spring-io-inside-and-out)" is also now available.