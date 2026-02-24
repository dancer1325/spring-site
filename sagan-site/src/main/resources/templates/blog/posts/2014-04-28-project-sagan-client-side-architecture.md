---
title: Project Sagan: client-side architecture
source: https://spring.io/blog/2014/04/28/project-sagan-client-side-architecture
scraped: 2026-02-24T07:26:55.875Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Brian Clozel |  April 28, 2014 | 2 Comments
---

# Project Sagan: client-side architecture

_Engineering | Brian Clozel |  April 28, 2014 | 2 Comments_

Now that we [know a bit more about JavaScript modules](https://spring.io/blog/2014/04/11/javascript-modularity-without-the-buzzwords), we're ready to dive into the client-side architecture of the Sagan application.

> ***Note**: If you haven't read previous blog posts on the [Sagan project](https://github.com/spring-io/sagan), you should know that this is the Spring reference application that powers this blog and everything else at [spring.io](http://spring.io). Previous posts [showed out to run this application](https://spring.io/blog/2014/03/27/project-sagan-open-sourcing-spring-io), [how we do zero downtime deployments](https://spring.io/blog/2014/04/04/project-sagan-zero-downtime-deployments) and also [how we upgraded Sagan to use the latest JDK8 features](https://spring.io/blog/2014/04/18/project-sagan-upgrading-to-jdk-8).*

In this post, I want to walk through the basics of the client-side architecture in the Sagan application:

1.  Why is the client application in a separate `sagan-client` project module?
2.  How is it linked with the `sagan-site` module?
3.  What are [npm](https://www.npmjs.org/), [bower](http://bower.io) and [gulp](http://gulpjs.com)?
4.  How do those tools work together to make the client application?

To illustrate all that, the following screencast will show you not only how to add a new bower dependency and code a small new feature (keyboard shortcuts on the website!), but also how to enhance the gulp build (optimize images!).

!{iframe src="//player.vimeo.com/video/92961329" width="640"  height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen}{/iframe}

> ***Note**: See the [show notes](https://vimeo.com/92961329) for links to sites mentioned in the screencast. You can also [watch this screencast in HD on vimeo](https://vimeo.com/92961329).*

Interested in npm, bower and others? Spring.io has a nice article for that: ["understanding JavaScript package managers"](https://spring.io/understanding/javascript-package-managers).

---

### [](#springone-2gx-2014-is-around-the-corner)SpringOne 2GX 2014 is around the corner

This year's [SpringOne will be in Dallas, TX](http://www.springone2gx.com) on September 8-11 and [super early bird registration is now open](https://2014.event.springone2gx.com/register). We hope to see you there!