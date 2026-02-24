---
title: Yes, I know it\'s now the most voted for issue in the JIRA!
source: https://spring.io/blog/2006/09/15/yes-i-know-it-s-now-the-most-voted-for-issue-in-the-jira
scraped: 2026-02-24T09:34:55.306Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Hale |  September 15, 2006 | 0 Comments
---

# Yes, I know it's now the most voted for issue in the JIRA!

_Engineering | Ben Hale |  September 15, 2006 | 0 Comments_

Can you guess what it is? If you guessed a [Maven bundle/build](http://opensource.atlassian.com/projects/spring/browse/SPR-1484) for Spring you win. Come see me at [The Spring Experience](http://www.thespringexperience.com) in December and we'll share a frosty beverage as your prize.

### Mea Culpa

In a past life I did a lot of work in configuration management and build systems. When I started here at Interface21, I immediately volunteered to help out with the build infrastructure as much as I could. Next thing I know, I've got every single ticket relating to Maven in both Spring and Spring Web Flow assigned to me. Then through my own lackadaisical attitude towards the JIRA, I let this particular issue come to a boil. Over the past couple of months, things *have* been moving forward with regards to Spring and Maven; things I should have posted in the JIRA and didn't. This led to some justifiable venting in the main JIRA issue over the last couple of days. So in an effort to bring everyone up to speed here's the current status.

### Status

For those of you who have been in despair over the last couple of months about Spring 2.0 and Maven, you won't be for much longer. The Spring community has decided to incrementally convert all of the Spring projects over to Maven. As you may know [Acegi](http://acegisecurity.org/) has already been using Maven for a very long time. Recently the [Spring-WS](http://www.springframework.org/spring-ws) project converted as well. I've personally prototyped [Spring Web Flow](http://opensource.atlassian.com/confluence/spring/display/WEBFLOW/Home)'s conversion, and there is general agreement that Spring will move over as well.

That said, it's not quite time for celebration. Converting the last two projects (Spring and Spring Web Flow) are non-trivial tasks (just take a look at *Better Builds with Maven* if you don't believe me). As such, the conversion is not something that we really want to do this close to the major 2.0 and 1.0 releases. What I can tell you is that the conversion is a goal scheduled for after the releases.

### So what's the plan?

It's pretty simple actually. For both Spring and Spring Web Flow I'll be building up POMs with the dependency lists by hand over the next couple of weeks. At this time the plan is to release these POMs with the final releases of both Spring and Spring Web Flow. After the releases, with Arjen's help I'll be assisting both Juergen and Keith in converting their source trees over to Maven builds and getting those builds running in Continuum.

### Then what can I, the user, do in the meantime?

Well the first thing is to be patient. It's my fault that we've been silent on this issue so long and hopefully this post will give some transparency to our thought process. Secondly, I'd love help testing. My plan is to check-in the trial POMs to CVS and SVN as I'm working, and announce on the [JIRA](http://opensource.atlassian.com/projects/spring/browse/SPR-1484) issues that changes have been made. As you'd guess, the creation of POMs by hand is error prone (one of the driving factors towards a Maven build), so I'd love for some help testing them. Comments in the [JIRA](http://opensource.atlassian.com/projects/spring/browse/SPR-1484), posts to the [forum](http://forum.springframework.org), and posts to the [developers mailing list](http://sourceforge.net/mail/?group_id=73357) are all good avenues for feedback.

### Anything else you want to know about?

Again, I hope this helps alleviate some of the frustration in the community and gives you an idea of our future direction. Any comments on this current plan are of course welcome (the comments here would be a good spot for that), but I'd also like to know if you have any other questions or issues that you're frustrated by. If you leave a question below or email me directly, I'll try to get you a good answer and either post it here on the blog or email it back to you personally.