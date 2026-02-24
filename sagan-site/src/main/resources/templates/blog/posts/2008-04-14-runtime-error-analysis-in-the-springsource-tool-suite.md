---
title: Runtime Error Analysis in the SpringSource Tool Suite
source: https://spring.io/blog/2008/04/14/runtime-error-analysis-in-the-springsource-tool-suite
scraped: 2026-02-24T09:18:55.010Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Alef Arendsen |  April 14, 2008 | 0 Comments
---

# Runtime Error Analysis in the SpringSource Tool Suite

_Engineering | Alef Arendsen |  April 14, 2008 | 0 Comments_

Three weeks ago, the SpringSource Tool Suite was released. Christian, in charge of this product [blogged about it](http://blog.springsource.com/main/2008/03/20/springsource-tool-suite-released/) already and we also have a webinar available for those of you that want to get up to speed with all of the functionality it currently offers. In this entry, I wanted to highlight the runtime error reporting functionality specifically.

When I'm programming, sometimes, the console window shows dozens of stack traces due to some error I've caused. Sometimes, I'm lucky and the stack trace looks familiar. If so, then the problem is probably easy to solve. Sometimes however, the information you need is buried so deep inside all those stack traces, that figuring out what the real problem is takes a while.

With the introduction of the SpringSource Tool Suite, we've started to build up a online knowledge base that includes resolutions for common problems you might encounter. Using the knowledge base, you no longer have to browse through pages and pages of exception stack trace information. Instead clicking a simple button will run a query over the knowledge base and if possible cause is found, you automatically get relevant information that will help you solve your particular problem. The quick screencast below should give you some insight into the functionality. Note that the full screen functionality of blip.tv works fairly well, so in case the fonts are a bit small in some parts of the screen cast, using the full screen mode solves this.

We have just started out filling the knowledge base and with the release of the tool suite, it'll probably contain a wealth of errors already. But obviously, the knowledge base cannot hold a resolution for every problem you might encounter. That's why we are constantly adding information about potential errors ourselves, **but also allow you to add particular error conditions with suggested solutions**. Authoring tools are available directly inside the IDE, so you don't have to bother about using some kind of proprietary XML format. All content submitting by you (and other developers) will periodically be reviewed and released as an update to the knowledge base. In a next screen cast, I'll highlight this functionality.

I'm am really excited about this particular feature of the SpringSource Tool Suite as it will help me get my errors out of the way much quicker than in the past. If you're interested in reviewing the SpringSource Tool Suite, please visit the [product page](http://www.springsource.com/web/guest/products/suite/sts) on our web site where currently, you can download a beta after having registered. On that page, we also have a longer webinar available in which Christian Dupuis explains the SpringSource Tool Suite in much more detail.