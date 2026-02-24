---
title: This Week in Spring - August 7th, 2012
source: https://spring.io/blog/2012/08/07/this-week-in-spring-august-7th-2012
scraped: 2026-02-24T08:18:45.787Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  August 07, 2012 | 0 Comments
---

# This Week in Spring - August 7th, 2012

_Engineering | Josh Long |  August 07, 2012 | 0 Comments_

Welcome to another installment of *This Week in Spring*! As usual, we've got a lot to cover, so let's get to it!

1.  I did a brief review of Manning's new book, [*Spring Roo in Action*](http://www.springsource.org/node/3622). Check it, and the book, out!
    
    ```
    Copy</li>
      <LI> The <a href = "http://bit.ly/QWSrml">Cloud Foundry Integration for Eclipse Now Supports Tunneling to Services</a>. This increases the parity betwen the Eclipse support (and the SpringSource Tool Suite support)  and the <CODE>vmc</CODE> command-line client.  </LI>
    	
    
    	<LI> The VMware has a very cool blog taking a look the roles Spring and RabbitMQ play in 
    		 <a href = "http://blogs.vmware.com/vfabric/2012/07/spring-and-rabbitmq-behind-indias-12-billion-person-biometric-database-1.html">in the new project behind India's 1.2 Billion Person Biometric Database</a>. <EM>Very</EM> cool! 
    ```
    
2.  David Turanski has a nice post that introduces a finer point of the Spring Data repository implementations: [its *really* elegant code-base!](http://blog.springsource.org/2012/08/03/the-most-amazing-java-type-declaration-ever/)

```
Copy  <LI> Jerry Kuch, a staff engineer at VMWare, did a very nice video <a href = "http://www.youtube.com/watch?v=WCRyNesk_ak&feature=em-uploademail">on the new features in RabbitMQ</A></LI>
	 <LI> 
		Spring Security lead Rob Winch's amazing <a href = "http://www.infoq.com/presentations/Securing-OAuth2-Spring-Security">QCon New York talk on Spring Security is now available on InfoQ.com</a>.   
	 </LI>	<LI> Umar Ashfaq has put together a  nice blog detailing <a href = "http://www.to-string.com/2012/08/03/springsecurity-authenticating-authorizing-ajax-requests/">how to 
	   authenticate ajax based requests using Spring Security</A>. This blog then links to two other blogs, one on the server side implementation and another on the client side. 
	 The approach described uses standard Spring Security web integration, but modifies the responses to work well with an Ajax client.  
	
	 </LI>
		<LI>  Umar Ashfaq also had a very nice <a href = "http://www.to-string.com/2012/07/11/springsecurity-capturing-rememberme-success-event/">post on using Spring Security's "remember me" feature</a>.    </li>
<LI>  The <EM>Codeyard</EM> blog has an interesting - and long! - post on <A href = "http://codeyard.wordpress.com/2012/07/31/spring-hibernate-end-to-end-integration-using-maven-spring-mvc-jsp-oracle11g-a-step-by-step-guide/">how to setup Spring and Hibernate to work together</A>. 
	
	The post uses Spring 3.0, and an older version of Hibernate.   </li>
<LI> Partha Bhattacharjee has a nice post introducing <a href = "http://java.dzone.com/articles/handling-form-validation">JSR 303 bean validation with Spring</A>.  </LI>
		<LI> Partha Bhattacharjee also has another nice post  <a href = "http://techforenterprise.blogspot.in/2012/08/introducing-spring-integration.html">introducing Spring Integration</a>. Nice job!</LI>

<LI> Markus Eisele has a post about <a href = "http://java.dzone.com/articles/getting-started-spring-social-1">using Spring Social to build the simplest possible Facebook application possible</a>.  </LI>
```

4.  Arnon Rotem-gal-oz has put [together a nice look at RabbitMQ and AMQP](http://java.dzone.com/articles/rabbitmq-and-short-intro-amqp).
5.  [RabbitMQ 2.8.5 has been released](http://lists.rabbitmq.com/pipermail/rabbitmq-announce/2012-August/000049.html)! For the details, see the [release notes](http://lists.rabbitmq.com/pipermail/rabbitmq-announce/attachments/20120802/e4ad3dd3/attachment.txt).

```
Copy<LI> 
	The SolidSoft blog has an interesting post on using <a href ="http://solidsoft.wordpress.com/2012/08/07/beyond-the-mockito-refcard-part-2-convenient-mocking-beans-in-the-spring-context-with-springockito/">a library called SpringMockito to mock beans in a Spring context</a>. The library mocks beans for you and then 
	makes it easy to inject them and reference them as you would the real deal. This could be very compelling especially used in conjunction with Spring 3.1's profiles feature, which lets you partition 
	beans along <em>environments</EM>. You might, for example, have a bean called <em>development</EM>, <EM>production</EM> and <em>test</EM>. 
		
	  </LI> 
```

7.  Thymeleaf 2.0.11 has just been released and completes support [for Spring WebFlow, now including AJAX-based <render> events (even without Tiles)](http://www.thymeleaf.org).