---
title: This Week in Spring  - March 5th, 2013
source: https://spring.io/blog/2013/03/05/this-week-in-spring-march-5th-2013
scraped: 2026-02-24T08:08:19.361Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  March 05, 2013 | 0 Comments
---

# This Week in Spring  - March 5th, 2013

_Engineering | Josh Long |  March 05, 2013 | 0 Comments_

Welcome back to another installment of *This Week in Spring*.

We've got a lot to cover, though, so let's get to it!

1.  I'm presenting a webinar on March 14, 2013 - [Multi Client Development with Spring](http://www.springsource.org/node/4033 "Webinar: Multi Client Development with Spring")! Join me to learn about REST, OAuth, Spring MVC, Spring Android, and much more!
2.  Join Damien Dallimore and David Turanski on a webinar as they introduce the [Webinar: Extending Spring Integration for Splunk](http://www.springsource.org/node/4036 "Webinar: Extending Spring Integration for Splunk") - March 28th, 2013
3.  New SpringOne2GX replays now available in HD on YouTube: [Spring Data Repositories: A Deep Dive, and Intro to Cascading](http://www.springsource.org/node/4242)
4.  [@SpringSource](http://twitter.com/SpringSource) is launching a [(quick) swag-giveaway campaign](http://springbagoswag.cloudfoundry.com/)!
5.  [Spring Security lead and ninja Rob Winch](https://twitter.com/rob_winch/status/308723194255265793) has announced the initial support for [Java-based configuration in Spring Security](https://github.com/SpringSource/spring-security-javaconfig/). This is a wonderful milestone. Recently, we've seen Java-configuration alternatives to the XML DSLs offered for Spring Social, Spring Batch and - now - Spring Security. Check out the Spring Security Java-based configuration for more details.
6.  I had the unique privilege of visiting the Alibaba group in China where they're doing some *amazing* things with Spring. Read more in my blog, [Spring at China Scale: the Alibaba group](http://blog.springsource.org/2013/03/04/spring-at-china-scale-alibaba-group-alipay-taobao-and-tmall/).
7.  Someone asked me this the other day and I felt like it was worthy of a mention: in your Spring MVC `@Controller` class handler methods, make sure that the `BindingResult` argument is immediately after the *model* or *command* argument, like this:
    
    ```
    Copy <CODE>@RequestMapping(...) public String handleRequest( @ModelAttribute @Valid YourCustomPojo attempt, BindingResult result)</code>. 
    	 
    	 In this example, <CODE>handleRequest</Code> will validate the POJO (<CODE>YourCustomPojo</code>) - checking the POJO for JSR303-annotations and attempting to apply the constraints because the POJO is annotated with <CODE>@Valid</CODE> - and stash any errors  in the <CODE>BindingResult</code>, which it makes available if we ask for it.
    	 
    	 
    ```
    
8.  Speaking of validation using JSR 303, I found this amazing post from 2010 that I felt worth inclusion. [This post introduces a custom annotation, called `@SpelAssert`](http://musingsofaprogrammingaddict.blogspot.com/2010/12/putting-spell-on-bean-validation-api.html), that works like JSR303's `@ScriptAssert`.
9.  Do you want to use Cloud Foundry with the continuous integration capabilities offered by CloudBees? We got you covered! The Cloud Foundry and Cloud Bees teams worked to integrate the process, and [the step-by-step introduction is given here](http://t.co/yPhszGk5k8).
10.  [Alvaro Videla](http://twitter.com/old_sound) has introduced and open-sourced [his RabbitMQ simulator](http://blogs.vmware.com/vfabric/2013/03/introducing-the-rabbitmq-simulator-video-open-source-bits.html ). The RabbitMQ simulator is an *awesome* visualization tool to demonstrate how RabbitMQ topologies work.
11.  Gary Russell has announced [that Spring AMQP 1.1.4 is now available](http://www.springsource.org/node/4241).
12.  The *Fstyle* blog has an interesting post on how [to unit test Spring Security with Spring MVC test mocks](http://fstyle.de/hp_fstyle/wordpress/2013/03/04/spring-test-spring-security-how-to-mock-authentication/).
13.  Our pal Boris Lam is back, this time with a post on how to [integrate Spring Data, MongoDB and JavaServer Faces](http://www.javacodegeeks.com/2013/02/spring-data-mongodb-and-jsf-integration-tutorial.html).
14.  Indika Prasad, on the *Programmer's Guide* blog, has put together a tutorial showing [how to use Spring Security with Webdav and password encryption](http://indikapra.blogspot.com/2013/03/webdav-example-in-spring-security-with.html).
     
     ```
     Copy</LI>
     <LI> The  <EM>Java J2EE SOA Key Points</EM> blog has a nice post on 
     	<A href="http://stlarch.blogspot.com/2013/03/spring-ws-jaxb-web-sevice-client.html">using the Spring WS JAXB web service client</a>. There's very little narrative, but lots of code.
     
      </LI>
       
     ```