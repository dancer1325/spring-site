---
title: This week in Spring: May 31st, 2011
source: https://spring.io/blog/2011/05/31/this-week-in-spring-may-31st-2011
scraped: 2026-02-24T08:40:55.548Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  May 31, 2011 | 0 Comments
---

# This week in Spring: May 31st, 2011

_Engineering | Josh Long |  May 31, 2011 | 0 Comments_

The excitement continues today at the SpringSource S2G forums here in [London](http://www.springsource.com/events/s2gforum-5-31-2011-london)! The energy leading up to the event has been staggering, and the talks - on a wide variety of deep, technical topics - are very impressive! I've had several of my questions answered, and learned a lot about some of the new, interesting, upcoming technologies from SpringSource. If you didn't get a chance to attend this year, we will be posting the session slides next week. Also don't forget, there is still [SpringOne 2GX](http://www.springonegx.com) later this year (October) in Chicago!

1.  Many people love [Spring Batch](http://www.springsource.org/spring-batch) as soon as they give it a try, and many of those people then start trying to tell others about it precisely because it's so wonderful to know that they won't have to solve the problem themselves. Batch processing's something we all do at some point or another: moving data from database to another, reading from a file system, making web service calls and need to handle retry logic, etc. These use cases (and many more) are natural fits for Spring Batch. If you want to see one very succinct, useful introduction to the technology with an emphasis on code, check out [Sanjoy Kumar Roy's blog introducing Spring Batch.](http://sanjoykr.blogspot.com/2011/05/spring-batch-in-web-container.html) Very cool! If you give Spring Batch a try and feel like you have something to add to the discussion, write a blog and [ping me to let me know](http://twitter.com/starbuxman) so I can highlight it on this page!.

```
Copy	<li>
		Roy Clarkson notes that starting May 28, 2011, the repositories for <a href="http://www.springsource.org/spring-android">Spring Android</a> and <A HREF ="http://www.springsource.org/spring-mobile">Spring Mobile</a> have moved to GitHub, and are available at the following URLs:

	<div><b>Spring Android:<br/></b>
		<UL><li><a href="https://github.com/SpringSource/spring-android">Spring Android</a></li>
		<LI><A href="https://github.com/SpringSource/spring-android-samples">Spring Android Samples</a>
			</li> </div>
				<div><b>Spring Mobile:<br/></b>
					<UL><li><a href="https://github.com/SpringSource/spring-mobile">Spring Mobile</a></li>
					<LI><A href="https://github.com/SpringSource/spring-mobile-samples">Spring Mobile Samples</a>
						</li> </div>

		Going forward, development of Spring Android and Spring Mobile will take place in the GitHub repositories, and the repositories at <a href="http://git.springsource.org">git.springsource.org</a> (however, there's still an awful lot of good stuff at git.springsource.org!) will soon be removed.
		</li> 
        
		<LI>Gordon Dickens is at it again! This time, he's put together <a href="http://java.dzone.com/articles/annotation-reference-spring">a reference of all the supported annotations in the Spring framework!</a>  This is <em>very</em> handy!  NB: most of these are annotations that come from the numerous JSR's supported by the Spring framework, and some - like the Roo annotations - are compile-time retention only. Still, a very handy reference and a great way to survey some of the numerous places where Spring can help you get work done, quickly.
```

3.  Gordon also did this [pencast](http://java.dzone.com/articles/how-configure-spring-mvc-web) that illustrates (well, "writes!" ) the steps in configuring Spring MVC on Tomcat. Very cool and - most conveniently - very, very simple! A few seconds and you'll have a birds eye view of everything. A few minutes later and you can have the steps replicated with no problems. Cool!
4.  Thinking about moving to Spring, from Java EE? This is natural. Many people come to Spring from other technologies that -- while perhaps useful when initially employed, have since become limiting. I stumbled upon across [this post the other day](http://niklasschlimm.blogspot.com/2011/05/technology-decision-making-process-java.html) and thought it presented a very good introduction to the decision making process for one architect in choosing Spring.

```
Copy		<LI>Quick reminder: CloudFoundry.com sign ups are through the roof, so we've sent out invites to those who signed up in staggered quantities, as fast as we can. We just sent out a slew more in the last three days! We see a lot of interest in CloudFoundry and the first thing people want to know is: <em>how do I get started?</em>. If you want to get started, then <A HREF="http://cloudfoundry.com">sign up!</a> </li>

		<LI> The Spring <CODE>MessageListenerContainer</CODE> abstraction enables developers to consume JMS messages with the typical, declarative ease you've come to expect from the Spring framework. It handles concurrency, and transactions, and lets you simply focus on the part of the business logic that's important to you: <EM>what do I do once I've received a message?</em> Sabarish Sasidharan provides an informative blog post about how to <a href="http://php.sabscape.com/blog/?p=315">scale the MLC abstractions in the Spring framework</a>.
		 </li>

		<li>
			New to development with Tomcat? Want a blow-by-blow narrative on how to get it up and running on Windows? <a href="http://www.stardeveloper.com/tutorial/installing-apache-tomcat-7.0">This blog's exhaustive,</a> and has plenty of reassuring pictures. I wish I'd had something like this when I was getting started!  I probably would've started earlier :-)   
			</li>
	</ol>
	
```