---
title: This Week in Spring - July 31, 2012
source: https://spring.io/blog/2012/08/01/this-week-in-spring-july-31-2012
scraped: 2026-02-24T08:18:54.509Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  August 01, 2012 | 0 Comments
---

# This Week in Spring - July 31, 2012

_Engineering | Josh Long |  August 01, 2012 | 0 Comments_

Welcome to another installation of *This Week in Spring*!

This week I'm in Bangalore, India with other members of the SpringSource and Cloud Foundry teams talking to major system integrators about Spring and Cloud Foundry. The uptake's amazing, and the feedback is even better.

In related news, the Cloud Foundry Open Tour is coming to India next month! If you want to hear thought leaders and experts and learn [about cloud computing, platform-as-a-service, architecture and Spring, then be sure to register now for either the Bangalore or Pune events](http://opentour.cloudfoundry.com/india/2012). I look forward to seeing you there!

1.  Jonathan Brisbin has announced [the latest release of Spring Data Rest, version 1.0.0.RC2](http://www.springsource.org/node/3614), which features JSONPE support, and better integration with Spring MVC applications, as well as even more configuration hooks so you can exert even more control over the behavior of the framework.
2.  Dr. David Syer has announced the [1.0.0.RC1 release of Spring Security OAuth](http://www.springsource.org/node/3611). Spring Security OAuth is a module that works with Spring Security and lets you expose OAuth-secured RESTful resources.
    
    The new release features lots of new extension points in the Authorization Server features, a Whitelabel UI for better out-of-box experience, and improved support for expressions in security filters. Check it out!
    

```
Copy<LI> WADL is a description format for RESTful web-services,  in much the same way that  WSDL describes SOAP-based web services' contracts. This excellent blog post, by Pankaj Bhatt, has an interesting approach <a href = "http://panbhatt.blogspot.in/2012/07/spring-mvc-wadl-generation.html">to generating WADL descriptions for Spring MVC-based RESTful services</a>.   </LI>

<LI> Roger Hughes is at it again, this time with <a href ="http://java.dzone.com/articles/getting-started-spring-social-0">part 2 of his look at Spring Social</A>. </LI>
	<LI> Nicolas Frankel has a nice blog <a href = "http://java.dzone.com/articles/method-injection-spring">on method injection with Spring</a>. 
		Method injection is less useful with the introduction of Java configuration support, of course. Spring   supports the injection of proxies of your beans that are recreated according to their scope on access in beans of larger scopes. In XML, this means using the <CODE>&lt;aop:scoped-proxy/&gt;</CODE> element in your bean definitions, or specifying the <CODE>proxyMode</CODE> attribute  in the <CODE>@Bean</CODE> annotation on your Java configuration-based bean definitions.
		
		</LI>

					 

							 <LI>  Gordon Dickens is back at it, this time with a nice post on the third part of his blog series <A href = "http://gordondickens.com/wordpress/2012/07/30/enterprise-spring-framework-best-practices-part-3-xml-config/">  introducing best practices for setting up Spring applications</A>.   </LI>
							<LI>
								Semika Koku Kaluge has an interesting post on how to use  <a href = "http://semikas.blogspot.gr/2012/07/spring-3-internationalization-and.html">Spring's <CODE>LocaleChangeInterceptor</CODE> to 
```

set the `Locale` of internationalized messages through an HTTP request.

```
Copy							</LI>
							<LI> The  <A href ="http://www.tomcatexpert.com">TomcatExpert</A>  has a blog on <A href = "http://www.tomcatexpert.com/blog/2012/07/09/apache-tomcat-7029-released"> the release of Apache Tomcat 7.0.29</A>. </LI><LI>  Then, <A href ="http://www.tomcatexpert.com">TomcatExpert</A> has  a nice blog on migrating <A href= "http://www.tomcatexpert.com/blog/2012/07/17/migrating-applications-websphere-or-weblogic-vfabric-tc-server-%E2%80%93-july-24th-2pm-et">from Websphere to Weblogic to tcServer</A>, which is the more operations-friendly version of Tomcat packaged as part of VMWare's vFabric. </LI><LI>  Finally, <A href ="http://www.tomcatexpert.com">TomcatExpert</A> has   a nice post on <a href = "http://www.tomcatexpert.com/blog/2012/07/10/enabling-ssl-communication-and-client-certificate-authentication-between-apache-web-">setting up SSL in Apache Tomcat</A>. </LI>

</OL>
```