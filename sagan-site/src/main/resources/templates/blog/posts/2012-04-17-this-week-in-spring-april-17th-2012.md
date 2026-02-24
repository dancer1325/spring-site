---
title: This Week in Spring: April 17th, 2012
source: https://spring.io/blog/2012/04/17/this-week-in-spring-april-17th-2012
scraped: 2026-02-24T08:23:50.168Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Adam Fitzgerald |  April 17, 2012 | 0 Comments
---

# This Week in Spring: April 17th, 2012

_Engineering | Adam Fitzgerald |  April 17, 2012 | 0 Comments_

Welcome back to another installment of *This Week in Spring*. This week is the last chance to sign up for the [SpringOne on the Road](http://www.springsource.org/springone-on-the-road) events in [London](http://www.springsource.org/springone-on-the-road/london), [Kiev](http://www.springsource.org/springone-on-the-road/kiev) and [Moscow](http://www.springsource.org/springone-on-the-road/moscow) so be sure to register. Let's dive into it!

1.  Chris Richardson's webinar recording on [NoSQL options for the Java developer](http://www.springsource.org/node/3528) is online in the SpringSourceDev YouTube Channel.
2.  Shekhar Gulati's excellent introduction to Spring Roo continues over on IBM's developerWorks portal. The latest installment introduces [writing advanced (and wrapper) Spring Roo addons](http://www.ibm.com/developerworks/java/library/os-springroo5/index.html?ca=drs-).

```
Copy<LI>  This article, which introduces how to use <a href = "http://java.dzone.com/articles/use-javafx2-spring">Spring to assemble  JavaFX 2 components</a> is short and to the point.  I'd probably use Spring's Java configuration option to fully exploit all the custom components, however. The nice thing about the approach outlined (over using FXML, directly, is that beans configured this way benefit from all the services that Spring provides, including dependency injection and AOP). Nice post, Andy!  </LI>

<LI>Blogger <EM>Rob Gordon</EM> has a nice post introducing <a href ="http://rgordon.co.uk/blog/2012/04/13/custom-property-in-spring/">Spring 3.1's custom property resolution mechanism</A> and explores some of the great power that it provides, along with some interesting examples. I really like  the easily understood example of establishing environment  properties based on a String read in from the command line.    </LI>

<li>In the latest in his extensive Spring series, <EM>Eugen</EM> from the baeldung blog, explains how to <a href="http://www.baeldung.com/2012/04/16/how-to-use-resttemplate-with-basic-authentication-in-spring-3-1/">use RestTemplate with Basic Authentication in Spring</a>. This series of posts is developing into a nice collection of tips for REST style web interaction using Spring.    
</li>

<LI> Blogger <EM>Angelo Zerr</EM> is at it again, following up his previous posts on Spring Data repositories with a post that describes an <a href   = "http://angelozerr.wordpress.com/2012/04/15/eclipse_spring_step8/">(Eclipse RCP-based)  rich client that uses Spring Data JPA and Spring Remoting</A>.
	Definitely worth a read!   And, as if that weren't sweet enough, the blog example uses SpringSource Tool Suite lead Martin Lippert's  <CODE><a href = "http://martinlippert.blogspot.fr/2008/05/dependency-injection-for-extensions.html">SpringExtensionFactory</A></CODE>! Nicely done!  </LI> 
<LI>  The ajax911 blog has been working through a nice series introducing how to build Spring MVC applications, and has just <a  href = "http://ajax911.com/spring-mvc-tutorial-5/">released part 5</A>.     </LI> 
<LI>  Blogger Suresh Payankannur has a great post on the <EM>right</EM> way to <a href = "http://www.sureshpw.com/2012/04/spring-hibernate-4.html">handle LOBs in Spring 3.1's Hibernate 4 support</A>.  </li>
	<LI>   
		Rene van Wijk
		has a pretty detailed blog (yay! I'm always glad for details) on how to use <a href = "http://middlewaremagic.com/weblogic/?p=7952">Spring with WebLogic JMS's clusters</A>.
		 </LI>
	<LI> Blogger Arul has an interesting blog on what it looks to  <a href = "http://www.arulraj.net/2012/04/red5-with-spring-mvc.html">build Spring applications behind a Red5 router</A>.  </LI>
	<LI>  
		Read this <a href="http://luckyacademy.blogspot.se/2012/04/jersey-18-and-spring-30-integration.html">blog</a> - it is not actually about using Jersey and Spring together, rather it is about library dependency management. It is a good-to-remember warning: older API integrations may link to older version of Spring which overlap with more contemporary libraries on your class path, and that can cause mayhem in your code. To fix it, make judicious use of <CODE>&lt;exclusion&gt;.</CODE>
		</LI>
		<LI> Blogger <em>bwgz57</EM> introduces how to <a href = "http://bwgz57.wordpress.com/2012/04/11/open-lane-starting-out-with-spring-web-flow/">build Spring Web Flow projects</a> with a really clean thorough example.
	<LI>    On the CompareStuffs blog, there is an example on <a href  = "http://blogs.comparestuffs.com/blogs/programming/2012/04/12/spring-multiactioncontroller-example/">how to use the older <CODE>MultiActionController</CODE></a>. This is useful, but it is important to remember that Spring MVC 2.5 and greater have supported the combination of multiple   controller methods in single beans very easily  with  annotations. </li>
	
```