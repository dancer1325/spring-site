---
title: Conference Season Builds up to SpringOne!
source: https://spring.io/blog/2007/05/28/conference-season-builds-up-to-springone
scraped: 2026-02-24T09:29:16.024Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rod Johnson |  May 28, 2007 | 0 Comments
---

# Conference Season Builds up to SpringOne!

_Engineering | Rod Johnson |  May 28, 2007 | 0 Comments_

It's been a while since I had time to blog. We've been busy. We [raised $10m](http://www.interface21.com/news-home/2007/benchmarkseriesa). As [Adrian has pointed out](http://blog.interface21.com/main/2007/05/25/new-releases-in-the-spring-portfolio/), we've been very active in product development. I've written more code myself than usual in the last couple of months. (Mainly on experimental stuff, which may or may not see the light of day, but it's fun, and sometimes I do something that turns out to be useful.) I've spent a lot of time speaking to press and analysts; we're getting huge press interest these days. Press/analyst calls can be tiring, but can also be valuable, as many of these guys are smart and ask thought-provoking questions.

And the conference season has sucked up a lot of time. JavaOne was a big show for us, with all our sessions full and huge interest in Spring. For the first time, Interface21 was an exhibitor and we were all exhausted trying to speak to everyone who came to our booth. If you haven't done it, you won't appreciate how tiring wielding one of those badge scanners can be... Next week [Mark Pollack and I are speaking about Spring.NET at Tech-Ed](http://forum.springframework.net/showthread.php?t=2679). This is my first Tech-Ed and is going to be an interesting contrast.

So much for Sun's and Microsoft's shows. The highlight of the summer conference season for the Spring team will be *our* European show, [SpringOne](http://www.springone.com/display/SpringOne07/Home), in Antwerp, Belgium, from June 20-22. This year, SpringOne has been extended to 3 days, and it will be a great opportunity to network with Spring developers, while you enjoy the best beer in the world. Registration is [here](http://www.bejug.org/regs107/registration/start.htm).

All the recent and upcoming releases mean we'll have plenty to talk about.

As Mark Fisher recently [wrote](http://blog.interface21.com/main/2007/05/14/annotation-driven-dependency-injection-in-spring-21/), we have introduced a new configuration option in [Spring 2.1M1](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=173644&release_id=508090), which allows use of annotations to supplement or even replace XML bean definitions.

We've been talking a lot within the Spring team about best practices for configuration, and plan to write and speak about our conclusions. It's worth drawing the big picture, as many people seem to miss it:

**Spring > XML**

  
The Spring container has its own internal metadata, and it's possible to contribute to that from different configuration sources. For example, we've long supported properties file overrides. The [Pitchfork Project](http://www.interface21.com/pitchfork) mixes in Java EE 5.0 annotations. There are many potential ways of defining Spring components. However you do it, you can use Spring out of the box services, extension hooks such as post processors, true AOP, Spring's integration with countless third party products...

Thus by supporting additional configuration formats, we are not deprecating the XML syntax people usually use to configure Spring: just offering more choices that are consistent with Spring's architecture.

At SpringOne, Costin Leau will be talking about [ways to configure the Spring container](http://www.springone.com/display/SpringOne07/Ways+to+configure+Spring+container), which should be an interesting session, and tackles this head on. One of the Spring Portfolio projects that Costin leads is [Spring Java Configuration](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=213222), which grew out of some of my experimentation a couple of years ago, and which [I blogged about](http://blog.interface21.com/main/2006/11/28/a-java-configuration-option-for-spring/) last November. That project configures Spring in Java: which of course can be mixed and matched with other forms of configuration.

SpringOne should be a good opportunity to interact with the Spring team and feed back your suggestions.

After Spring One, I'm looking forward to settling down in the same place for more than a couple of weeks. And I expect to have more time to write all the blog posts I've been thinking about for the last couple of months!