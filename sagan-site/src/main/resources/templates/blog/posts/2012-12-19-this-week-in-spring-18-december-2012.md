---
title: This Week in Spring - 18 December, 2012
source: https://spring.io/blog/2012/12/19/this-week-in-spring-18-december-2012
scraped: 2026-02-24T08:11:30.789Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  December 19, 2012 | 0 Comments
---

# This Week in Spring - 18 December, 2012

_Engineering | Josh Long |  December 19, 2012 | 0 Comments_

Welcome back to another installment of *This Week in Spring*!

Can you believe we're already further along through December than not? Time sure flies, and yes, we are staring down the end of the year already - but the holiday season usually brings a SpringFramework release right around this time of year, so we're feeling festive! We've even gots tons of extra SpringSource buttons to celebrate.

![Buttons!](http://www.springsource.org/files/buttons.jpeg)

1.  First and foremost, [Spring 3.2 has gone GA](http://blog.springsource.org/2012/12/13/spring-framework-3-2-goes-ga/)! Just read the post. Waay too much awesome in one release, and - if you've been following this series over the year than you know I've been looking forward to it. Come back and read the rest when you've upgraded your application and played with some of the awesome new stuff! I'll wait...

```
Copy	    You know what the best part is? Usually, after a new Spring release, the release train of other Spring projects is quick to adopt - so expect lots of releases in the new year!</LI>  
```

-   Next up, Spring Security lead and ninja Rob Winch just announced Spring Security 3.2.0.M1, [packed with new features for Servlet 3 environments, among other things](http://www.springsource.org/node/3766).

```
Copy<LI> We could just stop right there, you know?  BUT, there's more! In this blog post, Rob Winch  
	   <a href= "http://blog.springsource.org/2012/12/17/spring-security-3-2-m1-highlights-servlet-3-api-support/">has answered  some of the very common questions we tend to get regarding how   Spring Security 
	 integrates in a Servlet 3 environment</a>, and the results are <EM>amazing</EM>! 
	 Definitely worth a read. This stuff, following the new Spring MVC 3.2 servlet 3 support, is sure to make Servlet 3 environments like <A href = "http://tomcat.apache.org">Apache Tomcat 7</a> an attractive offering for anyone doing serious enterprise work: no pain upgrades, lightweight <EM>and</EM> you get all these cool new runtime capabilities with Spring 3.2 and Spring Security. 
	</LI>

<LI> Not to be outdone, <a href= "http://blog.springsource.org/2012/12/18/spring-roo-1-2-3-release-available/">Alan Stewart announced Spring Roo 1.2.3</a>, which includes support for Spring 3.2 and a slew of fixes and updates in this, the third maintenance release of 1.2. </LI>
<LI>Are you using Spring with Google App Engine? Lots of people are! Spring's the only way to do serious enterprise Java development on Google App Engine, after all, without giving up a lot of functionality. Nonetheless, Google App Engine has some <em>unique</em> constraints that offer Spring developers some... <em>challenges</em>. This blog post <a href="https://developers.google.com/appengine/articles/spring_optimization">shows how to 
address some of these issues on Google App Engine</a>. On every other cloud, including <a href="http://cloudfoundry.org">Cloud Foundry</a>, these &quot;optimizations&quot; are not required or even reasonable, so feel free to ignore them if you're not on Google App Engine. </LI>
<LI> 
  Guys, <A href= "http://www.w3.org/News/2012#entry-9667">HTML 5 was just <em>completed</EM></a>. 
  
  From the release: "Though not yet W3C standards, these specifications are now feature complete, meaning businesses and developers have a stable target for implementation and planning."
  
  What's this mean for you guys in practice? Not much - HTML5 as we know it has been fairly stable for some time, but if you were looking for a reason to take the plunge, that should be it.  And, SpringSource is ushering in the new era of 
  HTML5 and JavaScript development with <EM>lots</EM> of interesting stuff 
  aimed at civilizing this new frontier and increasing productivity. 
  For a peak at some of the new bits, check out the upcoming webinars 
  <a href= "http://www.springsource.org/node/3768"><EM>IOC + JavaScript</EM></a> and 
  <a href= "http://www.springsource.org/node/3767">Architecture of a Modern Web App</a>. </LI>
	

	<LI> The steady stream of amazing content from SpringOne2GX DC continues, this time with 
		<a href="http://www.springsource.org/node/3764">videos introducing WebSockets and how to Secure REST with OAuth 2</a>. Be sure to grab a cup of coffee, sit down and enjoy these two 90 minute videos. Web Sockets is becoming an increasingly important part of the web landscape for messaging, and OAuth  is already one of the most entrenched 
		 protocols on the web, providing the foundation for modern day, secured web services with REST, so both of these videos are not-to-be-missed.
		
		</LI>
```

-   There is a *lot* of great Spring Social news this week! First, Craig Walls announced [Spring Social Yammer 1.0.0](http://www.springsource.org/spring-social/news/spring-social-yammer-1.0.0) on behalf of [Morten Andersen-Gott](http://twitter.com/mortenag). Nicely done Morten! Yammer is a popular enterprise-y microblogging service, among many other wonderful things, and this integration will sure to be very useful for lots of enterprises. I've used Yammer before and it worked really well.

```
Copy <LI> Next, Mark Serrano blog wrote a <a href="http://krams915.blogspot.com/2012/12/spring-social-with-javaconfig-part-1.html"> <EM>very</EM> nice tutorial-style article on using Spring Social, Thymeleaf and Java configuration (already on Spring 3.2!)</a>.
```

-   Gabriel Axel has released Spring Social Google M2, including Google Drive support. For more, see [his announcement tweet](http://twitter.com/GabiAxel/status/280789280207560704).