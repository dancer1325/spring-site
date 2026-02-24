---
title: This week in Spring: April 19th, 2011
source: https://spring.io/blog/2011/04/20/this-week-in-spring-april-19th-2011
scraped: 2026-02-24T08:42:41.731Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  April 20, 2011 | 0 Comments
---

# This week in Spring: April 19th, 2011

_Engineering | Josh Long |  April 20, 2011 | 0 Comments_

Welcome back to This Week in Spring. The enthusiasm for last week's Cloud Foundry announcement was outstanding and appears to be getting stronger! People all over the world have flooded the SpringSource and CloudFoundry forums, downloads pages and source repositories. What unprecedented activity!

Many of the different, powerful technologies coming out of SpringSource recently have been leading up to the Cloud Foundry release so I invite you to review some of the exciting stuff that's come out in the last few months that have become even more interesting in terms of the cloud and [Cloud Foundry](http://www.cloudfoundry.com): [Spring Gemfire](httP://www.springsource.org/spring-gemfire), [Spring AMQP](httP://www.springsource.org/spring-amqp), [Spring 3.1 profiles](http://blog.springsource.com/2011/02/14/spring-3-1-m1-introducing-profile/), [Spring 3.1 caching abstraction](http://blog.springsource.com/2011/02/23/spring-3-1-m1-caching/), [Spring Data](http://www.springsource.org/spring-data), [Spring Integration support for NoSQL](http://git.springsource.org/spring-integration/sandbox/trees/master), and [Spring Hadoop](http://github.com/SpringSource/spring-hadoop), [vFabric Hyperic](http://www.vmware.com/products/vfabric-hyperic/overview.html), [vFabric RabbitMQ](http://www.vmware.com/products/rabbitmq/overview.html), and [vFabric GemFire](http://www.vmware.com/products/vfabric-gemfire/overview.html). Of course, for all of these technologies - the first, and best, tooling and development experience continues to be [SpringSource Tool Suite](http://www.springsource.com/developer/sts) and [Spring Roo.](http://www.springsource.org/roo)

Ok, onward to this week's review. So much exciting stuff, so little time!

1.  Christian Dupuis has just written up a detailed blog on [using STS to deploy to Cloud Foundry.](http://blog.springsource.com/2011/04/13/using-cloud-foundry-from-sts/)

```
Copy <li><A href="http://www.springsource.org/node/3103">Spring Roo 1.1.3</a>, featuring 
 Cloud Foundry support, shell enhancements, and improved support for composite primary keys - among other things - has been released. 
</li>

	 <li> DZone has published a <a href="http://refcardz.dzone.com/refcardz/spring-roo-open-source-rapid?oid=hom38521">Spring Roo RefCard</a> by the Spring Roo team's <a href="http://www.twitter.com/schmidtstefan">Stefan Schmidt.</a> This RefCard's a fantastic way to get going quickly with Spring Roo. Spring Roo, it could be argued, is ideally suited to the RefCard format, because 6 pages is more than enough to get real results with Spring Roo! </li>

<li>
<A HREF="http://blog.springsource.com/2011/04/18/spring-data-graph-1-0-neo4j-support-released/">Spring Data Graph 1.0 with Neo4J support has been released!</a> The Spring Data project - as you know - supports various NoSQL technologies and - wherever possible - promotes <em>polyglot persistence</em>. Polyglot persistence is all about augmenting existing applications with more specialized, sophisticated data models wherever possible and appropriate. The Spring Data Graph project   delivers on this vision, providing a natural way to map domain objects to both JPA-supported data stores <em>and</em> the Neo4j graph database. Beyond this, of course, there's support for all the goodies you've come to expect from the strong Spring APIs, including a convenient, idiomatic <code>Neo4jTemplate</code>, JSR-303 (Bean validation support), and much more. Check it out! The Neo4J team also have a sibling blog post, <A href="http://blog.neo4j.org/2011/04/spring-data-graph-100rc1-released.html?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+Neo4jBlog+%28Neo4j+Blog%29">here</a>.  
	</li>  
	
	 <LI>The Spring Data Graph Neo4 announcement blogs, linked above, is a fine place to get started. If you want even more, then you're encouraged to   register, and watch, tomorrow's webinar, <a href="http://app.connect.vmware.com/e/es.aspx?s=524&e=18891291&elq=f06ea6af3abc4df6a06f327458e8dca0&sa=D&sntz=1&usg=AFQjCNH7JGeQTYbSnd8FZve4JWssFrGZMQ">Getting Started with Spring Data Graph</a>.</li>

 <LI>  <a href="http://www.springsource.org/node/3104">InfoQ has posted a new video from SpringOne 2GX 2010</a> providing an introduction to Spring.NET, comparing it with Spring for Java, and explaining how Java-.NET interoperability works. 
	</li>
```

3.  [The Spring.NET REST client](http://www.springsource.org/node/3102), version 1.0.0., is now available. This marks the fourth .NET release in the last two weeks! Way to go, guys!
4.  [The JTeam group has announced the 1.0-final version of the Axon framework,](http://blog.jteam.nl/2011/04/19/axon-framework-1-0-released/) a framework that builds on top of [Spring](http://www.springsource.org/about) and [Spring Integration](http://www.springsource.org/spring-integration) to support the command-query responsibility segmentation (CQRS) design pattern.

```
Copy<li>	 
Using Windows? Want to run Cloud Foundry locally? (and who wouldn't?)	Check out this blog compiling research and proferring a solution to  run Cloud Foundry on Windows, called <a href="http://java.dzone.com/news/world-your-oyster-installing?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+javalobby%2Ffrontpage+%28Javalobby+%2F+Java+Zone%29&utm_content=Google+Reader">The World is Your Oyster: Installing and Using Cloud Foundry on Windows.</a>
</li>
```

6.  One of Spring's strengths has always been, and will always be, its incredible portability. Andy Hulstkamp describes using [Spring MVC, SpringSource Tool Suite, and Google App Engine, and Flex](http://www.hulstkamp.com/2011/04/12/experience-with-google-app-engine-spring-mvc-and-flex/613). Check it out.
7.  Java.net has a write up on using Spring AOP in terms of how you would use it [with Oracle's Eclipse tooling.](http://today.java.net/article/2011/04/17/using-spring%E2%80%99s-aop-features-java-ee) This is a worthy read for those using that technology and unable to migrate. NB: the Spring 2.5.6 technology covered is not up to date with current releases (Spring 3.0 was released in October, 2009, and 2.5.6 long before that!), but it's still a fascinating read since Spring AOP is backwards compatible and it speaks to a technology that a lot of people are still using.

```
Copy <LI>David Salter has written about how to convert an older Spring MVC controller implementation into a Controller using the annotation model introduced in Spring MVC  2.5. Check this out for a brief (the brevity  reflects how simple the migration is, not the sophistication of the technology :-D )   <a href="http://java.dzone.com/articles/converting-spring-controller?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+javalobby%2Ffrontpage+%28Javalobby+%2F+Java+Zone%29&utm_content=Google+Reader">look at the process.</a> Naturally, old-style Spring controllers still work in Spring MVC with no problems. Users are encouraged to migrate as possible to exploit new features, however.</li>
```