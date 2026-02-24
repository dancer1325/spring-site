---
title: Spring project infrastructure updates
source: https://spring.io/blog/2012/06/27/spring-project-infrastructure-updates
scraped: 2026-02-24T08:20:23.098Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Chris Beams |  June 27, 2012 | 0 Comments
---

# Spring project infrastructure updates

_Engineering | Chris Beams |  June 27, 2012 | 0 Comments_

## Introduction

Over the last year a number of significant changes have been made to the infrastructure and processes we use to keep the Spring family of projects running smoothly. You may have seen individual announcements about some of these as they happened, while others may have slipped under your radar. I'll recap these changes below. When put together they portray a bigger picture.  

## GitHub project hosting

Individual Spring projects have been migrating to Git and GitHub for quite a while. You may recall our [announcement](http://blog.springsource.org/2011/12/21/spring-framework-moves-to-github/) last Christmas that the Spring Framework itself had made the move. With the recent migration of Spring Web Flow, we're happy to announce that all major Spring projects are now hosted under the [SpringSource organization at GitHub](https://github.com/SpringSource).

There are benefits for project committers and Spring users alike following the move to Git and GitHub. GitHub has an excellent UI for code browsing, history of changes, and commit comments. And with the amazing number of open source projects already hosted at GitHub, this means that you're using one well-understood UI and that you already know how to browse source control, examine recent changes and so on. But GitHub's real power is in the way it encourages and supports community contribution. This point is discussed further in the "contribution process" section below.

For now, check out the SpringSource organization at GitHub if you haven't already; you'll see we've been busy as usual.

  

## Artifact management

The *SpringSource repository* at [http://repo.springsource.org](http://repo.springsource.org) is an [Artifactory](http://www.jfrog.com) instance dedicated to hosting snapshot, milestone, RC and GA versions of Spring project artifacts, as well as their transitive dependencies.

GA versions of Spring artifacts will continue to be published to [Maven Central](http://search.maven.org) as always, but repo.springsource.org replaces our previous infrastructure at maven.springframework.org with a much more powerful solution -- proper UI and search functionality, deep integration with our CI server at [build.springsource.org](http://build.springsource.org), and many other features that help project teams streamline their release processes.

The upshot for Spring users is that the SpringSource repository is one-stop shopping for all your Spring dependency needs.

If you have maven.springframework.org URLs in your build scripts, they will continue working indefinitely\* but these URLs should be considered "deprecated" in favor of repo.springsource.org going forward.

Further explanation and instructions for use can be found at the [downloading Spring artifacts](https://github.com/SpringSource/spring-framework/wiki/Downloading-Spring-artifacts) page in the spring-framework GitHub wiki. The [SpringSource repository FAQ](https://github.com/SpringSource/spring-framework/wiki/SpringSource-repository-FAQ) should be able to answer any questions that come up. If not, let us know!

A big thanks to the team at [JFrog](http://www.jfrog.com) -- the makers of Artifactory -- for working with us to make this happen. Switching repository infrastructure across so many busy projects begs for disaster, but with their help it's been smooth. And thanks also to the team at [Sonatype](http://sonatype.com) for their consistently prompt and helpful responses to our needs around Maven Central.

  

## Gradle-based builds

Moving our builds from Ant, Ivy and Maven to [Gradle](http://gradle.org) is another migration process that has been happening on a project-by-project basis for quite a while. And with Gradle's [1.0 GA announcement](https://twitter.com/Gradleware/status/212351955132096512) still fresh [in the news](http://www.infoq.com/news/2012/06/gradle-1), it's a nice time to mention that the [majority of Spring projects are now built with Gradle](http://bit.ly/LGJBHo)\*\*.

Gradle has many innovative features that make it a pleasure to use, like an incremental build system that significantly cuts down on build times, minimalistic command-line output that shows you only what you need to know, and a concise syntax that makes it possible to build a large codebase like the Spring Framework with a remarkably small and readable build script.

[![](http://blog.springsource.org/wp-content/uploads/2012/06/count.png "count")](http://twitter.com/ttddyy/status/179797329782652928)

For Spring users, the system used to build Spring projects may not seem to matter much. Indeed, just like most Linux users don't compile their own kernels, most Spring users never build Spring artifacts from source. But like any good open source project, some do. Whether simply to understand Spring better or to make changes and contribute back to the project, the number of people that build Spring from source is growing, thanks in part to the way that Gradle makes doing so quite trivial. One of Gradle's great features is the so-called [Gradle Wrapper](http://vimeo.com/34436402) which is essentially a platform-native shell script that downloads and installs the exact Gradle version used by a project. This means that building a Gradle-based Spring project from source is literally as simple as typing:

```source
Copy$ git clone https://github.com/SpringSource/spring-framework.git
$ cd spring-framework
$ ./gradlew build
```

As you can see, the 'gradlew' script there is checked into project source control. So as the version of Gradle used to build the project changes, the wrapper stays up to date and new versions of Gradle are downloaded automatically when necessary. This means never hearing "the build is broken" only to find out that two different versions of the build tool were being used. And it means that Spring projects can immediately keep up to date with the latest changes to Gradle without risking breaking other committers' and contributors' builds.

Check out the complete (but still very simple) instructions in the [building from source](https://github.com/SpringSource/spring-framework#building-from-source) section of the Spring Framework readme. Compare the 100 words you see there to the 1,500-word blog post on [Building Spring 3](http://blog.springsource.org/2009/03/03/building-spring-3) that I wrote a few years ago. I hope you'll find it's quite an improvement. Give it a try -- you might even like it:

[![](http://blog.springsource.org/wp-content/uploads/2012/06/liked.png "liked")](https://twitter.com/willvuong/status/175234107687710722)

The [Gradle team](http://www.gradleware.com/) have been a tremendous help in this process -- Spring projects have regularly pressed Gradle to the limits and challenged the team with requirements over the last couple of years, and the Gradle team have been nothing but responsive and helpful. Many of the Spring projects are certainly better off today for Gradle, and we hope that Gradle itself is at least a little better for the challenges we threw at it. Congratulations to the team on their 1.0!

  

## Contribution process

As I mentioned above, one of the best things about GitHub is the notion of [pull requests](https://help.github.com/articles/using-pull-requests). Read up if you're not already familiar, but suffice it to say that pull requests are like patches and code reviews all rolled into one tight process and simple UI. Take a look through the pull request histories for [Spring Integration](https://github.com/SpringSource/spring-integration/pulls), [Spring Framework](https://github.com/SpringSource/spring-framework/pulls), and many of the other Spring projects and you'll see plenty of interesting and useful examples. This process is already much better than attaching patch files to JIRA; when you combine it with the power of Git and the ease of building with Gradle, it means it has never been easier to contribute to Spring projects.

Since the Spring Framework moved to GitHub at the end of 2011 and to the time of this writing in June 2012, the project has received just over 100 pull requests. Not every pull request gets in. The outcome depends on the review process, but nevertheless many of these contributions have made their way in, sometimes after significant discussion and refinement. We've put together a [contributor guidelines](https://github.com/SpringSource/spring-framework/wiki/Contributor-guidelines) document based on what we've learned over this period; give it a read if you have something you'd like to give back to the framework. This is a great way of getting your issue to the front of the line. We naturally give a bit of priority to users who take the time to put together a high-quality contribution. Thanks to all those who have done so already, and thanks in advance to future contributors!

  

## Mailing list for contributors

Since we began processing pull requests, we've noticed great discussions taking place. In a few cases they contained questions that might have benefited from a discussion prior to submitting the pull request. Furthermore, these discussions remain somewhat under the radar and visible only to those following the individual pull request. Undoubtedly many of you would like to be able to follow such discussions and participate if relevant. The benefits of having a channel for framework contributors are many.

We're glad to announce with this blog post the new [spring-framework-contrib](https://groups.google.com/forum/#!forum/spring-framework-contrib) mailing list hosted at Google Groups. This list is specifically dedicated to developers who want to contribute code to the Spring Framework project. It's a place where you can talk directly with the committers and other contributors about your ideas -- before or while writing code. We encourage anyone thinking about putting together a pull request to join the group and discuss your ideas with us there.

  

## Issue lifecycle

Thanks to its many users, the Spring Framework project has a particularly high volume of issues; it's predictable we'll see the 10,000th JIRA issue sometime later this year. With that many issues coming in, and over the diverse featureset of the Spring Framework, you can imagine how difficult it might be to stay on top of all incoming issues. Over the last year, we've crafted a process of triage and backlogs that help everyone involved understand exactly what's going on with each issue. This has been very helpful to us and we've described it in [the lifecycle of an issue](https://github.com/SpringSource/spring-framework/wiki/The-Lifecycle-of-an-Issue) so that everyone can understand this process.

You'll also notice a number of smaller changes around the Spring Framework JIRA project: A [revised set of components](https://jira.springsource.org/browse/SPR#selectedTab=com.atlassian.jira.plugin.system.project%3Acomponents-panel), [simplified issue creation screen](https://jira.springsource.org/secure/CreateIssue.jspa?pid=10000&issuetype=4) and a number of other tweaks designed to make issue reporting as useful and painless as possible.

  

## Community forums

For years, the [Spring Forums](http://forum.springsource.org) have been and continue to be a great place for Spring-related Q&A. At the time of this writing there are over 100,000 threads (nearly 400,000 posts total!) by over 100,000 members. And that's saying nothing of the guests who visit the site by the thousands every day without ever logging in. No doubt this will continue to be a valuable resource for a long time to come.

There's another Q&A resource we'd like to make sure everyone in the Spring community is aware of. As you probably know, over the last few years [Stack Overflow](http://stackoverflow.com/about) has become an extremely popular resource for programming Q&A. And Spring-related Q&A has been no exception to the phenomenon. If you visit [](http://stackoverflow.com/tags)[http://stackoverflow.com/tags](http://stackoverflow.com/tags) and type in "spring", you'll see there are many Spring-related tags already there, with [spring](http://stackoverflow.com/questions/tagged/spring) and [spring-mvc](http://stackoverflow.com/questions/tagged/spring-mvc) being the most popular. I and other members of the Spring team have often been impressed by the quality of conversation at Stack Overflow, and we're very happy to see and thank everyone providing great answers.

A tag-based system like the one at Stack Overflow is by nature a little harder to define than the strict project-oriented categories offered by the Spring Forums, but we'd like to suggest that if you have Spring Framework-specific questions, please use the 'spring' or 'spring-mvc' tags as appropriate. If you have Spring Integration-related questions, use the [spring-integration](http://stackoverflow.com/questions/tagged/spring-integration) tag and so on. It's pretty self-explanatory, really.

  

## Summary

Hopefully you'll agree that the changes above make it easier than ever for all of us to work together and that's a key factor to the success of any open-source project. We encourage you to take time to review the resources mentioned in this post and to experiment and take advantage of what is available to you. Do keep in mind that contributions take on many forms -- whether creating a well-defined issue in JIRA, participating in discussions, or submitting a pull request, you're helping to advance the conversation and the community as a whole!  

## Footnotes

*\* The older maven.springframework.org URLs continue to work because the DNS entry for maven.springframework.org now points to repo.springsource.org, and the /snapshot, /milestone and /release paths now map to 'virtual repositories' with the same names and contents at repo.springsource.org.*

*\*\* Individual Spring project teams are free to choose the build tool that suits them best. This means that while many projects have moved to Gradle, it's predictable that other projects will stick with Maven.*