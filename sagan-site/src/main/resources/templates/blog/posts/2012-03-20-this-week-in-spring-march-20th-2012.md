---
title: This Week in Spring: March 20th, 2012
source: https://spring.io/blog/2012/03/20/this-week-in-spring-march-20th-2012
scraped: 2026-02-24T08:24:56.437Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Adam Fitzgerald |  March 20, 2012 | 0 Comments
---

# This Week in Spring: March 20th, 2012

_Engineering | Adam Fitzgerald |  March 20, 2012 | 0 Comments_

Hello and welcome to another installment of *This Week in Spring*! As usual, we've got some great stuff to look at, so let's get to it.

1.  ```
    Copy	Want to use SpringSource Tool Suite on the <a href = "http://blog.springsource.org/2012/03/14/early-access-springsource-tool-suite-for-eclipse-juno-4-2/">latest Eclipse Juno (4.2) milestone builds</A>? 
    	SpringSource Tool Suite lead Martin Lippert has got the answer for you.
    	  </LI>
    
    
    <LI> Michal Borek  has a great blog post on how to use the <a href = "http://www.greenpath.pl/2012/03/spring-framework-and-file-upload/"><CODE>ConversionService</CODE> in Spring 3.0+ to convert uploaded file data into a domain object</A>. First, this is a <EM>really</EM> cool idea. Second, users should be aware that Spring supports file uploads by default if it detects <CODE>commons-fileupload</CODE> or the Servlet 3 <CODE>javax.servlet.http.Part</CODE> APIs present on the classpath. To use this support, simply create a Spring MVC handler that takes a @RequesParam of type <CODE>MultipartFile</CODE>. For an example, see this RESTful API controller that <a href ="https://github.com/SpringSource/html5expense/blob/master/server/api/src/main/java/com/springsource/html5expense/controllers/ExpenseReportingApiController.java">accepts HTTP POST'd file uploads</A>.  If all you want is to manipulate the file data, then this is easy. The idea proffered in this post is to take it a step further, and bind that data to a domain model object. </LI>
    	
    <LI> Gal Levinsky has an interesting post on removing circular dependencies in Spring applications. 
    	He discusses the problems created by circular dependencies - i.e. one bean depending on another which is in turn in some way depended on by the first bean - and then <a href  = "http://gal-levinsky.blogspot.com/2012/03/resolve-circular-dependency-in-spring.html">explores some of the many ways that Spring can solve circular dependencies for you</A>.  
    	 </LI>
    <LI>
    ```
    
    Blogger [Hemraj](http://www.blogger.com/profile/03187939208715339988) has a succinct post introducing how you can [install the Spring web-tier machinery through the use of context loaders](http://www.programmingforfuture.com/2012/01/applicationcontext-instantiation-for.html) - `ContextLoaderListener` and `ContextLoaderServlet`.
    
    ```
    Copy</LI>
    
     <LI> Over on Dr. Dobbs, Adrian Bridgwater's written a fantastic blog <a href = "http://drdobbs.com/mobile/232602788">about using Spring with the Magnolia CMS</A> with the  
    	Blossom   integration module for Magnolia. 
    	
    	 </LI>
    	<LI>Spring, as a technology, is a collection of libraries that you can layer into your application with ease. It provides powerful support, usually in the term of adapter code that's exposed as AOP aspects. While this is a good thing (TM), it can make for some very deep stack traces! With Spring, however, at least you can disassemble the layers by removing libraries. The problems are far worse with other, more monolithic technologies. 
    		So, blogger Tomasz Nurkiewicz has written a simple post on <a href = "http://nurkiewicz.blogspot.com/2012/03/filtering-irrelevant-stack-trace-lines.html">how to effectively isolate the errors from the stack frames that are irrelevant</A> in diagnosing a problem (Spring's frames, for example). Cool post, and it mirrors something I'm sure many of us have done at some point or another, ourselves! </LI>
    
    <LI> The Cafe Techno has a great post introducing the idea of an <a href = "http://thecafetechno.com/tutorials/spring/what-is-inner-bean-in-spring-framework/">inner bean in Spring</A>.
    
    	</LI>
    	<LI>  I'm sure that you heard all the news a couple of weeks ago about about <a href="http://www.springsource.org/spring-data/hadoop">Spring for Apache Hadoop</a>? Want to get started fast? Check out this <a href = "http://news.oss.tw/node/13707">Spring for Apache Hadoop quick start</a> with all the details!   </li>
    
    		 <LI> Blogger <EM>zousu</EM> has a great post introducing  <a href = "http://zousu.com/wp/get-started-with-mongodb-with-spring-data-1-0-1-ga-release/">how to get started with Spring Data Mongo 1.0.1 GA</A>. </LI> 
             
    		<LI> Roger Hughes is back at it again, this time with a little bit of anecdotal advice on <a href = "http://java.dzone.com/articles/integrating-spring-legacy">how to integrate Spring into legacy applications</A>. I like to think of this process as <EM>Spring cleaning</EM>!   </LI>
    ```