---
title: This Week in Spring - April 9th, 2013
source: https://spring.io/blog/2013/04/09/this-week-in-spring-april-9th-2013
scraped: 2026-02-24T08:06:24.331Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  April 09, 2013 | 0 Comments
---

# This Week in Spring - April 9th, 2013

_Engineering | Josh Long |  April 09, 2013 | 0 Comments_

Welcome to another installment of *This Week in Spring*! As usual, we've got a *lot* to cover, so let's get to it!

1.  [SpringSource CTO Adrian Colyer](https://twitter.com/adriancolyer) outlines the direction and momentum of SpringSource and the Spring projects under the [Pivotal Initiative](http://gopivotal.com), a new company spun out of EMC comprised of - among other things - SpringSource, Cloud Foundry, and GreenPlum. This is *definitely* worth a read if you want to understand Spring's - *ahem* - *Pivotal* role in this new initiative!
    
    ```
    Copy</LI>  
    <LI> Spring Batch lead Michael Minella has <A href="http://www.springsource.org/node/9666"> announced that Spring Batch 2.2.0.RC1 is now available</a>.
    	The new release includes preliminary support for Spring Data, Java configuration support, non-identifying job parameters 
    	and numerous fixes and polishes. This release is amazing, and definitely worth a look. I, personally, <EM>love</EM> the Java configuration API that's
    	been surfaced. You don't need to write another Spring Batch XML file if you don't want to!
    </LI>
    <LI> 
    ```
    
    Spring Mobile lead Roy Clarkson has announced that [Spring Mobile 1.1.0.M3 has been released](http://www.springsource.org/spring-mobile/news/1.1.0.m3-released) featuring simpler configuration when using a custom domain strategy with `SiteSwitcherHandlerInterceptor`, support for Kindle Fire device detection (as tablet or mobile depending on which mode they are in), several resolved issues and compatibility with Spring Framework 3.2.2.
    
    ```
    Copy</LI>
    
     	<LI>New SpringOne2GX replays now available in HD on YouTube: <a href="http://www.springsource.org/node/10268">Virtualizing and Tuning Large Scale Java Applications, From Spring and Java to Spring and Akka</a></LI>
     	<LI>The HMK blog has a <EM>really</EM> nice post on how to use the <A href= "http://github.com/CujoJS">Cujo.js</A>'s
    <A href="http://hmkcode.com/spring-mvc-rest-js/">
     <CODE>rest.js</CODE> and Spring MVC</a>. <EM>Very</EM> cool! 
        </LI>
    
    <LI>  
    	The  <EM>JavaRevisited</EM> blog has  put together a 
    	<a href="http://javarevisited.blogspot.com/2013/04/spring-framework-tutorial-call-stored-procedures-from-java.html">post on calling stored procedures from Spring</code> using the <CODE>StoredProcedure</CODE> template object. 
    	There are other ways to approach this same problem, including the <CODE>SimpleJdbcCall</CODE> object and simply using the 
    	<CODE>update(String, Object ... params) </CODE> method on <CODE>JdbcTemplate</CODE>. Check it out! 
    	 </LI> 
    	 <LI> 
    		 The <EM>Spring Java Tutorial</EM> blog<em> </em>has a nice post <A href="http://springjavatutorial.blogspot.com/2013/04/call-stored-procedures-in-spring.html">on using  
    		 stored procedures with Spring</A>, and it <EM>also</EM> uses the same domain example - an <CODE>EmployeeDAO</CODE>. 
    		 They aren't exacty the same  - far from it - but it does seem like one heckuva coincadence! At any rate, more information's always good.
    	 		
    	 </LI>
    	 <LI> 
    	Spring provides various lifecycle callback methods, <A href="http://www.javabeat.net/2013/04/custom-spring-callback-methods/">which this <EM>JavaBeat</EM> blog looks at</a>.		</LI>
    <LI> 
    	The <EM>Binary Beans</EM> blog has a post that <A href="http://www.binary-beans.com/2013/04/getting-started-with-spring-framework.html"> simply links to some interesting, introductory videos</a> that we've published on
    	 <A href="http://youtube.com/SpringSourceDev">the SpringSourceDev YouTube Channel</A>.  If you're a regular reader of this round up then you've seen these videos before.
    	 But, it's a good 3 hours of introductory content and worth a look if you want a good getting started experience.
    	</LI>
    <LI>
    	KH Yiu has put together a cool post <A href="http://kh-yiu.blogspot.com/2013/04/spring-implementing-factory-pattern.html"> introducing the concept of a factory pattern</a> (which you're no doubt already familiar with!) 
    	in application code, built with Spring. This is <EM>not</EM> about how Spring uses the factory pattern, and was kind of an interesting approach.
    	Nicely done!
    	
    	</LI>
    
    <LI> Daniel Wong put together a really cool blog illustrating how to <A href="http://blog.shinetech.com/2013/04/09/integrating-springmvc-with-opencms/">tie together Spring MVC with OpenCMS</a>! Definitely worth a look. </LI>
    <LI>
    	The <EM> 11th Hour</EM> blog put together a nice post on <a href="http://deepeshdarshan.wordpress.com/2013/04/05/learn-spring-by-example-spring-expression-language-spel">how to use the Spring Expression Language with some examples</a>.
    	 </LI>
    <LI>
    	Wang Xiang's  put together a blog.. more like a series of snippets..  demonstrating how <A href="http://wangxiangblog.blogspot.com/2013/04/eclipse-jetty-maven-setup.html">to setup Jetty, a  <CODE>DataSource</CODE>, and Spring together</a>. 
    	</LI>
    <LI>
    	The <EM>Java Code Geeks</EM> blog has an introductory post <A href="http://www.javacodegeeks.com/2013/04/spring-mvc-form-validation-with-annotations-2.html">on using Spring MVC with JSR 303 bean validation</A>. Check it out!
    	</LI>
    <LI> 
    ```
    
    Our pal Mark Serrano is back, this time [with a review](http://krams915.blogspot.com/2013/04/book-review-spring-security-31.html) of [Spring Security lead Rob Winch's](http://twitter.com/rob_winch) book on Spring Security.
    
2.  Hippoom Zhou has put together a nice post introducing how to use  
    [mocks and stubs in Spring Integration tests](http://java.dzone.com/articles/how-use-mockstub-spring). This is a *very* nice post, and definitely worth a look!
    

```
Copy<LI>
	The awesomely named <EM>Raging Goblin</EM> blog has a nice post on how to do <A href="http://raginggoblin.wordpress.com/2013/04/06/spring-roo-5-role-based-views/">role-based views using Spring Roo and Spring Security</a>. 
	</LI>
<LI> 
	Peter Chng describes a scheme that can be used to <A href="http://unitstep.net/blog/2013/04/07/spring-mvc-request-parameter-conversion-with-minimal-configuration/"> auto-register custom converters used for data type conversion</A> in core Spring, Spring MVC, and Spring Integration, among other places. Pretty smart! 
	
	</LI>
 
```