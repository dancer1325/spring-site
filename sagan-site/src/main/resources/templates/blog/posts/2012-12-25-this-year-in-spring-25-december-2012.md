---
title: This Year in Spring - 25 December, 2012
source: https://spring.io/blog/2012/12/25/this-year-in-spring-25-december-2012
scraped: 2026-02-24T08:11:26.185Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Josh Long |  December 25, 2012 | 0 Comments
---

# This Year in Spring - 25 December, 2012

_News | Josh Long |  December 25, 2012 | 0 Comments_

Welcome back to another, very special holiday, and end-of-year installment of *This Week in Spring*! If you've been a follower of this roundup, then you know that 2012's been a *very* exciting year for Spring! Let's look at some of the highlights, first, before we get to our weekly roundup:

1.  **Springing Forward** Of course, this year saw the [release of Spring 3.2](http://blog.springsource.org/2012/12/13/spring-framework-3-2-goes-ga/), released a year exactly from the release of Spring 3.1, packed with new features and helping Spring retain its position as the premiere platform for building web applications. This year also saw many major improvements and iterations in the other Spring projects like Spring Integration 2.2.0 GA, Spring Data
2.  **The Cloud** Spring works very well on all cloud platforms, owing to the natural decoupling from the underlying platform that dependency injection provides, but it has always - and continues - to enjoy a special place in the sun [on Cloud Foundry, the open source PaaS](http://www.springsource.org). And, what a year it's been for Cloud Foundry! We've seen ecosystem partners like App Fog take the Cloud Foundry bits and run with them. We've seen the support for Spring applications on Cloud Foundry improve considerably with new features [like standalone processes](http://blog.springsource.org/2012/05/09/using-cloud-foundry-workers-with-spring/), and much more.
3.  **The RESTful Web** If you ask me, the most exciting part of this year was watching Spring's web support improve. If you're looking to build a web application (including in a Servlet 3 environment) or expose RESTful API endpoints, Spring MVC is the natural choice. If you want secure those RESTful endpoints, Spring Security OAuth is an easy to use binding that supports OAuth on top of REST. Need to connect to social service providers like Twitter, Facebook, LinkedIn and GitHub via OAuth? Use Spring Social. Want to support the principles of HATEOAS in your RESTful endpoints? Check out Spring HATEOAS. Do you want to transparently and easily expose Spring Data repositories for use as RESTful endpoints? You need look no further than Spring Data REST. There are no richer, more comprehensive or more integrated set of solutions for building rich, RESTful web applications than those that Spring provides today.
4.  ***Git*'ing Involved** This year, in particular, saw community interaction in the Spring open source projects skyrocket, now that all of the projects are all fully on [GitHub.com/SpringSource](http://github.com/SpringSource). Spring and the other projects have always been open source, but the collaboration model that Git enables has made it very easy for projects like Spring Social, Spring Integration, and Spring Data to thrive on community input and contributions.
5.  **Extending the reach of SpringSource's content** We've been working hard to bring great content on all things SpringSource to all the developers, and have expanded a lot this year. For instance, besides publishing content here on [SpringSource.org](http://springsource.org/), did you know that you can find SpringSource on [@SpringSource on Twitter](http://twitter.com/SpringSource), [+SpringFramework on Google+](http://google.com/+SpringFramework), on [the YouTube SpringSourceDev channel](http://youtube.com/SpringSourceDev) and (this is particularly useful for the many fans in China) on [SpringFramework on SINA Weibo](http://weibo.com/springframework)? Additionally, if you like this roundup, be sure to bookmark the [*This Week in Spring* aggregate page](http://www.springsource.org/taxonomy/term/14).

Now then, on to this week's roundup! There's a lot to cover, and hopefully you wont want for things to read this week if you're taking time off for the holidays and have some spare time on your hands!

```
Copy <Ol>   
	 <LI> If you've been following this roundup, then you know that we wrapped up our SpringOnes India and China events. For more details,  <a href="http://www.springsource.org/node/3777">checkout our wrapup post</a>!</LI>
	<LI> The <EM>baeldung</EM> blog has another great post up on using Spring MVC and Spring Security to <a href="http://www.baeldung.com/2012/12/20/authentication-against-a-restful-service/">secure a RESTful web service</a>. There are many ways to secure an HTTP REST web service, including HTTP Basic and the bespoke solution presented in this article. Many people are also using Spring Security OAuth, which lets you expose your RESTful web services through OAuth.  
	 
		</LI>
 <LI> Blogger Shaun Abram's put together a very nice post on <a href ="http://www.shaunabram.com/springmvc-file-download/">how to stream data using Spring MVC back to the client</a></LI>
 <LI>  Krishna Prasad's put  together a nice post on using <A href="http://java.dzone.com/articles/claimcheck-pattern-using">the claim check pattern with Spring Integration and GemFire</a></LI>
 <LI>  Krishna's also  put together a nice post on  <a href="http://java.dzone.com/articles/pubsub-vfabric-rabbitmq-and?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+javalobby%2Ffrontpage+%28Javalobby+%2F+Java+Zone%29&utm_content=Google+Reader">publish/subscribe with vFabric RabbitMQ and Spring Integration using Spring AMQP</a>.</LI>
 <LI>  Did you guys miss the webinar, <EM>The Data Renaissance: Going In-Memory with VMWare vFabric GemFire</EM>? Have no fear,  
	
	<a href="http://www.youtube.com/watch?v=U85fxz31HTA&feature=youtu.be">it's available</a> - along with a lot of other great content, on the <a href="http://youtube.com/SpringSourceDev">SpringSource Dev Channel</a> </LI> 
	 <LI> The <em>quick guide to Java</EM>  blog has a nice post on setting up a <a href="http://javakart.blogspot.com/2012/12/developing-mongodb-example-using-spring-data.html">simple Spring Data MongoDB example</a>.
 <LI> 
	 
	Corey Reil's put together 		
	a really nice post on <a href= "http://coreyreil.wordpress.com/2012/12/21/spring-batch-creating-an-ftp-tasklet-to-get-remote-files">building a Spring Batch <CODE>Tasklet</CODE>
	that reads data from an FTP endpoint</a>.  
	 The solution, he rightly points out, was already possible with the Spring Integration FTP adapter, 
	 but he wanted to keep things as simple as possible, so he simply reused some of the Spring Integration adapters in writing his <CODE>Tasklet</CODE>.  Nice job!
	  
	</LI>
 <LI>  The <EM>A Developer's Diary</EM> blog has a post with code on 
	  <a href="http://dev-faqs.blogspot.com/2012/12/spring-framework-populating-map-using.html">how to configure a <CODE>java.util.Map&lt;K,V&gt;</code> in XML</a>
	 </LI>
 <LI>   
	 The <EM>Learning via Code</EM> blog has a nice <a href="http://learningviacode.blogspot.in/2012/12/soap-webservices-using-spring-1.html"> couple</a> of  posts on using Spring Web Services to <a href="http://learningviacode.blogspot.com/2012/12/soap-webservices-using-spring-2.html"> expose a <code>.xsd</code> and <code>.wsdl</code></a>.  
	
	</LI>
</ol> 
```

Well, *that* sure flew by! As next Tuesday is January 1st, this will be the last installment of *This Week in Spring* for 2012! As always, it has been an absolute pleasure putting together this roundup for you. Speaking, I'm sure, for all of SpringSource, let me wish you the warmest of holidays and a very, very happy new year!