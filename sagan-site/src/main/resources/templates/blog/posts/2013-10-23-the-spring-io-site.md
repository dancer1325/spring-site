---
title: The spring.io site
source: https://spring.io/blog/2013/10/23/the-spring-io-site
scraped: 2026-02-24T07:35:22.732Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Chris Beams |  October 23, 2013 | 0 Comments
---

# The spring.io site

_Engineering | Chris Beams |  October 23, 2013 | 0 Comments_

$ curl -I springsource.org
HTTP/1.1 301 Moved Permanently
Content-length: 0
Date: Mon, 9 Sep 2013 19:30:00 PST
Location: http://spring.io

Chances are good that if you're reading this post you're well aware that springsource.org has been redesigned and relaunched as [spring.io](http://spring.io). We're happy to report that since [the launch at SpringOne](https://www.youtube.com/watch?v=jplkJIHPGos&feature=player_detailpage#t=3533) last month, reception for the new site has been positive and constructive. Thanks to all that have been providing feedback via [@springcentral](http://twitter.com/springcentral) – please keep it coming!

If you are looking around for the first time, the all-new [collection of guides](/guides) is a good place to start. Keep in mind that [each guide is backed by a GitHub repository](https://github.com/spring-guides), meaning you can clone everything locally and provide feedback via issues and pull requests. Plenty of folks have been doing that already and we really appreciate it.

Also, don't forget about [search](http://spring.io/search?q=Spring+Boot). Try searching for something in the Spring world that you're already familiar with – perhaps a topic like [transaction management](http://spring.io/search?q=transaction+management) or a class like [RestTemplate](\(http://spring.io/search?q=RestTemplate\)) or [JdbcTemplate](\(http://spring.io/search?q=JdbcTemplate\)). Notice that you can use the facet control on the right to filter and drill down to precisely what's relevant to you. For example, narrowing your way to matches for ["RestTemplate" in Spring Framework 3.2.4's reference documentation](http://spring.io/search?q=RestTemplate&filters=Projects%2FReference&filters=Projects%2FSpring+Framework%2F3.2.4.RELEASE). Have fun exploring, and let us know what you think.

## [](#whats-next)What's next

We built spring.io with two major goals in mind. The first is that it become a day-to-day resource that's as useful as possible for developers solving problems and building applications with Spring. This is and will continue to be a work in progress based on actual experience and what we hear from you.

The second goal is to use spring.io as a flagship reference application. As you may know, the site is built from top to bottom using the latest Spring technology, including [Spring Boot](http://spring.io/spring-boot), Spring Framework 4 and more—and it's all deployed on the public [Cloud Foundry](http://www.cloudfoundry.com) instance at [run.pivotal.io](http://run.pivotal.io). It's the ultimate dogfooding exercise for us, but what we're really excited about is showing it off to you. The team is hard at work getting spring.io ready to be open-sourced later this year – this will include of course the code for the app and services that power the site, but also documentation to guide you as you explore. [Stay tuned to the blog](http://spring.io/blog.atom) and [@springcentral](http://twitter.com/springcentral) for that announcement and for regular posts afterward detailing different aspects of the implementation.

## [](#special-thanks)Special thanks

As mentioned during the SpringOne keynote, spring.io was built with our colleagues at [Pivotal Labs](http://pivotallabs.com/team), and we couldn't have done it without them—not nearly as quickly anyway. The Spring team learned a lot about agile development done "the Pivotal way" – a process which, as the lead of the project, I found to be minimal, practical, and most importantly, super-productive. The Labs team also learned a lot about Spring and provided us with a fresh perspective and plenty of feedback along the way. Notably, Spring Boot was heavily influenced by the practical realities of building spring.io with it; the Labs team worked day-to-day with co-lead [Dave Syer](http://spring.io/team/dsyer) and happily, Boot is—even in its pre-1.0 milestones—all the more mature and useful for it.

Last but not least: we are extremely happy that spring.io is the new home of Spring, and we'd like to acknowledge the team at [nic.io](http://nic.io) for their help in securing the domain name. They were simply great working with us. As you may have noticed, the .io TLD is a pretty popular piece of real estate these days, and many technology projects now prefer .io over .com or .org. We weren't the only ones interested in a short dictionary domain name like 'spring' and would like to thank nic.io and DIVIDO for working with all parties towards a fair outcome. Thanks!