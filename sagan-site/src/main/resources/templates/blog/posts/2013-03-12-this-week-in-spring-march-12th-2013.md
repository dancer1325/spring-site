---
title: This Week in Spring  - March 12th, 2013
source: https://spring.io/blog/2013/03/12/this-week-in-spring-march-12th-2013
scraped: 2026-02-24T08:07:43.027Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  March 12, 2013 | 0 Comments
---

# This Week in Spring  - March 12th, 2013

_Engineering | Josh Long |  March 12, 2013 | 0 Comments_

Welcome to another installment of *This Week in Spring*! This week, there's a *lot* of Spring Tool Suite news, so be sure to check out

```
Copy<A href="http://www.springsource.org/sts"> the new release</a> and try it out. 

One last reminder: be sure to join me Thursday for a <a href="http://www.springsource.org/node/4033">webinar introducing Spring's REST and mobile support</a> at 3:00PM GMT (for Europeans) and 10:00AM PST (for North America). 
 
If you've wanted to learn how to build mobile applications for your Spring-based backend services, then this talk is for you. We'll look
at Spring's rich support for REST,
Android and mobile platforms, in general. 
```

1.  Jonathan Brisbin's announced that [Spring Data REST 1.1.0.M1 has been released](http://www.springsource.org/node/4248). The new release is basically a from-the-ground up rewrite. In the new release, there is support for *all* repositories including MongoDB and GemFire-based repositories.
2.  Martin Lippert has announced that [Spring Tool Suite and Groovy/Grails Tool Suite 3.2.0 have been released](http://www.springsource.org/node/4247). The new version is *much* faster than the previous version, and includes updated support for Eclipse Juno SR2, high-res displays on OSX, and updated compliance with various Spring projects, including Spring Integration 2.2.
3.  Rob Winch has announced that [Spring Security SAML 1.0.0.RC2 has Been Released](http://www.springsource.org/node/4246). Spring Security SAML is a third-party contribution that provides [SAML](http://wikipedia.org/wiki/SAML) support for Spring Security.
4.  [Spring Integration 2.2.2 is Now Available](http://www.springsource.org/node/4244)! The new release features various important bug fixes.
5.  I'm presenting a webinar on March 14, 2013 - [Multi Client Development with Spring](http://www.springsource.org/node/4033 "Webinar: Multi Client Development with Spring")! Join me to learn about REST, OAuth, Spring MVC, Spring Android, and much more!
6.  Join Damien Dallimore and David Turanski on a webinar as they introduce the [Webinar: Extending Spring Integration for Splunk](http://www.springsource.org/node/4036 "Webinar: Extending Spring Integration for Splunk") - March 28th, 2013
7.  New SpringOne2GX replays now available in HD on YouTube: [Addressing Messaging Challenges Using Open Technologies, Introduction to Spring Integration and Spring Batch](http://www.springsource.org/node/4249)
8.  [@SpringSource](http://twitter.com/SpringSource) is launching a [(quick) swag-giveaway campaign](http://springbagoswag.cloudfoundry.com/)!
9.  Spring and Groovy/Grails Tool Suite lead Martin Lippert's put together a video [comparing the speed of the Tool Suites at 3.1, versus their speed at 3.2](http://blog.springsource.org/2013/03/12/performance-improvements-in-sts-3-2-0/).
10.  Speaking of Spring Tool Suite, are you interested in [saving 15% on SpringSource Tool Suite Training](http://www.springsource.org/sts-training)?
11.  Yuan Ji has a nice post on how to [persist Spring Social connections with Spring Data MongoDB](http://www.javacodegeeks.com/2013/03/customize-spring-social-connect-framework-for-mongodb.html). Awesome! I was about to roll up my sleeves and write such an implementation myself! But this should save me some work. Thanks, Yuan!
12.  The *Object Partners Inc.* blog has a video up that [introduces Spring Batch 2 and how to integrate it with Grails](http://www.objectpartners.com/2013/03/07/presentation-enterprise-batch-processing-with-spring-batch-2-x/). That's pretty cool! They use a Groovy DSL instead of Spring Batch's native XML format to reduce verbosity. One new alternative is the Java configuration support in Spring Batch 2.2.
13.  Petri Kainulainen has a blog post up that [introduces Spring Data SOLR query methods](http://www.petrikainulainen.net/programming/solr/spring-data-solr-tutorial-query-methods).
14.  The *Ippon Technologies* blog has a nice post on [performance tuning the Spring Petclinic sample application](http://blog.ippon.fr/tag/spring-petclinic/).
15.  Michael Simons has a nice post on using [the popular, component-oriented web framework Vaadin with Spring](http://info.michael-simons.eu/2013/03/12/vaadin-spring-using-configurable-in-vaadin-components/)
16.  ```
     Copy Nicolas Frankel has a nice post 
      <a href="http://blog.frankel.ch/consider-replacing-spring-xml-configuration-with-javaconfig">on replacing Spring XML with Java Configuration</a>.
      
        
     ```
     
17.  Tomasz Nurkiewicz is back, this time with a post on using the [`DeferredResult` with Spring MVC 3.2's asynchronous request controllers](http://nurkiewicz.blogspot.com/2013/03/deferredresult-asynchronous-processing.html).
18.  Xavier Padró has put together a very nice post [on the effect of registering various `HttpMessageConverter` instances on the `RestTemplate`](http://xpadro.blogspot.com.es/2013/02/accessing-restful-services-http-message.html) when handling different types of RESTful resources.
19.  Before the `RestTemplate` and REST, and before document-oriented SOAP-based web services and Spring Web Services, there was Spring's `JaxWsPortProxyFactoryBean`, which can give you a strongly typed client to talk to SOAP web service with a JAX-WS *port*, or client.
     
     ```
     Copy This post introduces how <A href="http://www.tweetsofjava.com/?p=133">to use Spring's JAX-WS support to create a client</a>.
     ```
     
20.  The *Spring Addon* blog has a perhaps overly-brief look at [how to setup a Spring MVC-based REST endpoint](http://www.springaddon.com/?p=793). He makes a good point though: if you've got a Spring MVC application, then exposing a RESTful service is dead simple from there.
21.  The *Kamal's blog* has a nice post [on how to setup a Spring MVC 3.0-based application](http://kamalmeet.com/?p=103). NB that, with more recent releases of Spring, you don't need any XML for `web.xml` or the Spring application context.
     
22.  The *fuzzydb in focus* has a nice post on how to support [both existing Hibernate-based services, as well as JPA-based repositories](http://fuzzydb.blogspot.com/2013/03/spring-java-config-jpa-and-hibernate.html) based on Spring Data JPA, which requires a `EntityManager` reference. The approach is simple, and something that's uniquely easy to do with Spring's Java configuration style.

-   March 14, 2013[Webinar: Multi Client Development with Spring](http://www.springsource.org/node/4033 "Webinar: Multi Client Development with Spring")
-   March 28, 2013[Webinar: Extending Spring Integration for Splunk](http://www.springsource.org/node/4036 "Webinar: Extending Spring Integration for Splunk")