---
title: This Week in Spring - July 17th, 2012
source: https://spring.io/blog/2012/07/18/this-week-in-spring-july-17th-2012
scraped: 2026-02-24T08:19:07.666Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  July 18, 2012 | 0 Comments
---

# This Week in Spring - July 17th, 2012

_Engineering | Josh Long |  July 18, 2012 | 0 Comments_

Welcome to another installment of *This Week in Spring*! This week, the SpringSource and Cloud Foundry teams are OSCON talking about open source enterprise and cloud computing with anybody and everybody. If you're in the region, be sure to check out the SpringSource and Cloud Foundry booth in the exhibition hall!

1.  The Spring Data team is working on [a book with O'Reilly on Spring Data](http://ofps.oreilly.com/titles/9781449323950/). If you want to preview and feedback, now's your chance!
2.  Are you using Spring Data Commons support for repositories? How would you feel about support for Java-centric configuration? [Check out the new support for Java-configuration in Spring Data](https://jira.springsource.org/browse/DATACMNS-47#comment-81637)!

```
Copy<LI> The Java Beginner's tutorial blog has a quick post on  <a href = "http://javabeginnerstutorial.com/spring-framework-tutorial/configure-hsqldb-java-spring/">how to use the embedded database namespace that debuted in Spring 3.0</A>. The <a href = "http://static.springsource.org/spring/docs/3.1.x/spring-framework-reference/htmlsingle/spring-framework-reference.html#jdbc-embedded-database-support">namespace</A> is great if you want to setup H2, HSQL and Derby instances quickly and then specify initialization <CODE>.SQL</CODE> statements or scripts to run to initialize the database to a known state. This is particularly useful in quicker integration tests. 
  </LI>

<LI> Jeroen Horemans has a great post on <a href  = "http://www.cleanjava.org/blog/?p=96">using EclipseLink (the JPA implementation) and Spring   together</A>.  </LI>
<LI> Marco Tedone has a great blog on <a href = "http://tedone.typepad.com/blog/2011/08/jmx-and-spring-part-1.html">using JMX and Spring together</A>.  </LI>
<LI> Geraint Jones  has a great post on <a href = "http://city81.blogspot.co.uk/2012/07/using-spring-data-to-access-mongodb.html">using Spring Data MongoDB to access MongoDB instances</A>.   </LI>
	

<LI> <a href = "http://www.twitter.com/olivergierke">@olivergierke</A>, Spring Data ninja and contributor, tweeted about a nascent  project that <a href = "http://code.google.com/p/sol-dock-r/"> supports Spring Data-centric access to Apache Solr repositories</a>, which looks very interesting! Check it out! 
	</LI>
<LI> Lijin Joseji has a great post on how to setup <a href ="http://architects.dzone.com/articles/do-not-delete-how-create">a simple CRUD application using Java and MongoDB and Spring Data</A>.   Definitely worth a read! 
	</LI>

	
			<LI> Are you having trouble setting up the <a href = "http://www.twitter.com/cloudfounry">@cloudfoundry</A> gem support for service tunneling on Windows?  To recap, a) install <A href = "http://www.rubyinstaller.org">Ruby</A>, then install  <a href = "http://rubyinstaller.org/add-ons/devkit/">DevKit</a>, then install the Event Machine gem, like this <code> gem install eventmachine --pre -v '1.0.0.beta.4.1'</code>, <EM>then</EM> install the tunnel, like this <CODE>gem install caldecott</code>. You should be able to start a new shell, register an account on <a href= "http://www.cloudfoundry.com">Cloud Foundry</a>, and start building Spring applications with <a href = "http://www.springsource.com/developer/sts"> the SpringSource Tool Suite </a> in no time! </LI>
				
				
<LI> Stacey Schneider has put together a nice blog introducing <EM>why</EM> <a href ="http://blogs.vmware.com/vfabric/2012/07/why-java-developers-need-spring-insight-on-cloudfoundry.html">Spring Insight should be a part of your Cloud Foundry experience</A> </LI> 

<LI> This post has almost nothing to do with Spring, but I've seen the error enough in Spring applications that it is worth trying to provide help. If you <a href = "http://ejvyas.blogspot.com/2012/07/oracle-sid-error.html"> use Spring with the Oracle database driver and have trouble connecting, with errors about the SID</A>, you might appreciate this blog. </LI>
```