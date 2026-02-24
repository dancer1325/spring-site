---
title: This Week in Spring, September 20th, 2011
source: https://spring.io/blog/2011/09/20/this-week-in-spring-september-20th-2011
scraped: 2026-02-24T08:34:17.677Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  September 20, 2011 | 0 Comments
---

# This Week in Spring, September 20th, 2011

_Engineering | Josh Long |  September 20, 2011 | 0 Comments_

Welcome back to another installment of "This Week in Spring." We've got a lot of content this week surrounding Spring Roo, and so, in that spirit, I move that we christen today Rooday, in honor of all the great Roo-related content in this week's roundup.

Things are kicking into over drive at SpringSource as everybody's preparing for [SpringOne.](http://www.springone2gx.com/conference/chicago/2011/10/home) This year's show is an exciting one because it'll be the first year where [CloudFoundry](http://www.cloudfoundry.org) will be present, which means that there will be lots of content around CloudFoundry and Spring, together, working as an unbeatable combination. I can't wait!

1.  [InfoQ did an interview with Spring Social lead Craig Walls](http://www.infoq.com/news/2011/09/spring-social-interview) on the just-released Spring Social 1.0. Fascinating read! Once the interview has whetted your appetite, be sure to [try the Spring Social quickstart.](https://github.com/SpringSource/spring-social/wiki/Quick-Start)
    
    Spring Social got some great coverage elsewhere, too, including [this post from adtmag.com](http://adtmag.com/articles/2011/09/14/spring-social-brings-java-to-social-apis.aspx) on the new 1.0 release.
    

```
Copy <LI> <a href = "http://www.springsource.org/node/3235">SpringSource Tool Suite 2.7.2 has been released.</a>  The new release features 
	 support for vFabric tc Server 2.6,
	support for Spring Roo 1.2.0.M1, and also updates  Mylyn to 3.6.2. Great stuff!
	
 </li>

<LI>
	<a href = "http://blog.springsource.com/2011/09/14/spring-roo-1-2-0-m1-released/">Spring Roo 1.2.M1 released. 	</a>
	The new release is a <EM>really</EM> exciting one.  There are some exciting <em>backoffice</em> changes, of course, like the switch from GPL to Apache 2, and <a href ="http://www.github.com/springsource/spring-roo">the migration of the code to 	Github.com</a>, but those are absolutely the least interesting bits in this new milestone.  		
	The first, and  obvious, improvement for any user will be  the speed boost: Spring Roo 1.2 is now <b>ten times faster</b>. 		
```

If that wasn't enough, there's also service-layer support (e.g, you can generate service objects), choice in which type of repository layer is generated (active-record style or traditional repository objects), much improved, very flexible GWT support, MongoDB support, and multi-schema aware database reverse engineering (DBRE) and shell improvements. Honestly, this little paragraph doesn't do it justice. [Check out the blog for the skinny.](http://blog.springsource.com/2011/09/14/spring-roo-1-2-0-m1-released)

```
Copy	<LI> 
<a href ="http://www.github.com/springsource/spring-roo">Spring Roo's moved to Github.com!</a> 

		The source code is now available on the <a href ="http://www.github.com/springsource/spring-roo">SpringSource Github page</a>. 

		There's a <code>readme.txt</code> at the root of the directory (or, indeed, presented inline on the Spring Roo Github.com page) that you 
		can follow to start hacking on Spring Roo. If nothing else, having the Spring Roo source code is helpful to learn how to write your own custom add-ons, so check it out!

	</LI>
<LI> 
	Stefan Schmidt chimes in to talk about the <a href="http://blog.springsource.com/2011/09/14/new-application-layering-and-persistence-choices-in-spring-roo/">the application layering and persistence choices for Spring Roo</a>, providing details on some of the features enumerated in the new release. 
</I>
<LI>Speaking of Spring Roo... and Cloud Foundry.. <a href="http://www.theregister.co.uk/2011/09/16/roo_vmware_springsource/">here's a <em>busy</em> post</a> on both of them. It feels like it should be two or three posts, but good stuff, either way! </li>
	
	
<LI> <a href= "http://www.thymeleaf.org/whatsnew11.html">Thymeleaf 1.1's just been released!</a> Thymeleaf is a view template library (like Velocity or FreeMarker) that offers a very  clean integration for <a href= "http://www.thymeleaf.org/thymeleafspring3.html">Spring users.</a> Check it out!	</li>
	

<LI> Jan Machacek at CakeSolutions has written up a post about  his  extensions to the Specs2 specification testing framework, <a href=
	"http://www.cakesolutions.net/teamblogs/2011/09/06/beantables-and-more/">BeanTables</a>, which lets you inject and work with Spring beans from your specifications. 
	The blog's helpful, but I would definitely also check the  <a href="https://github.com/janm399/specs2-spring">Github.com page itself for a good introduction</a>.
</li>

<LI>Singaram Subramanian
 has written up a blog on <a href= "http://singztechmusings.wordpress.com/2011/09/18/getting-started-with-spring-integration-v2-a-simple-example-using-file-and-mail-adapters/">how he was tasked with solving an email integration problem</a> and decided to use Spring Integration. The blog details the code and approach and even talks a bit about the patterns involved. Nice blog, Singaram!   </lI>
```