---
title: This Week in Spring - September 11, 2012
source: https://spring.io/blog/2012/09/11/this-week-in-spring-september-11-2012
scraped: 2026-02-24T08:17:20.001Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  September 11, 2012 | 0 Comments
---

# This Week in Spring - September 11, 2012

_Engineering | Josh Long |  September 11, 2012 | 0 Comments_

![](http://www.springsource.org/files/jlonstage.jpg)  
![](http://www.springsource.org/files/jlstagestruts.jpg)

Welcome to another installation of *This Week in Spring*! I'm off to Oslo, Norway for the [JavaZone](http://www.javazone.no) conference to talk to people about using [Spring Integration](http://www.springsource.org/integration) and [Spring Batch](http://www.springsource.org/spring-batch) on top of Cloud Foundry. Again, this is a natural use case: Cloud Foundry makes it easy to scale to handle the largest workloads, and Spring Integration and Spring Batch, presumably sitting on top of [RabbitMQ](http://www.rabbitmq.org), take care of the plumbing and do the heavy lifting of workload distribution across the cluster.

```
Copy <P>Wrapping up from last week's Cloud Foundry   Open Tour - India, touring <a href="http://opentour.cloudfoundry.com/2012/bangalore">Bangalore</a>, and <a href="http://opentour.cloudfoundry.com/2012/pune">Pune</a>, I got great feedback about using Spring MVC for multi-client applications   with REST. We looked at deploying those applications to <a href="http://cloudfoundry.org">Cloud Foundry</a>, the open-source PaaS from   VMware, where you can control the range of channels that your Spring MVC/REST   architecture can deliver to. It's been a truly exciting time. Cloud Foundry   gives developers a platform to deploy the Spring applications they want to   build, how they want to build them, without having to worry about infrastructure   and middleware concerns. </p>
 <P>Also don't miss the Spring, Groovy and Grails event of the year in Washington, DC: <a href="http://www.springone2gx.com/conference/washington/2012/10/home">SpringOne2GX</a>.  If you haven't already registered, now's the time!
   </p>
 </p>
```

As usual, we've got lots of great content to look at, so let's get to it!

1.  Kicking things off, [Spring Social](http://www.springsource.org/Spring-social) lead Craig Walls has announced the latest version of [Spring Social Facebook, version 1.0.2](http://www.springsource.org/spring-social/news/facebook-1.0.2-released), has been released. The new release keeps pace with the latest Facebook API updates.
2.  Shekhar Gulati has been doing some amazing work introducing Spring Roo. In the latest two installments of his series on IBM's Developer Works, Shekhar introduces [building Spring MVC and GWT applications](http://www.ibm.com/developerworks/opensource/library/os-springroo6/index.html), and developing [Spring Data MongoDB applications](http://www.ibm.com/developerworks/opensource/library/os-springroo7/index.html).
3.  This blog entry on the *Hubberspot* blog introduces how to use Spring's [XML application context `<constructor-arg/>` tag to specify bean constructor arguments by argument index](http://www.hubberspot.com/2012/09/how-to-provide-constructor_10.html).
4.  Dr. MacPhail has put together a *very* nice blog on modernizing the classic Spring PetClinic application, retrofitting the use of the default servlet and introducing annotation-driven configuration. The information on how [the `default` servlet works and how Spring MVC, as of 3.0](http://deors.wordpress.com/2012/09/06/petclinic-tomcat-7/), lets you take advantage of it, is fantastic, and a quick, worthy read for anybody.
5.  One common use case in enterprise messaging is trying to infer state from the event stream *after* the stream's been consumed by other clients. Wouldn't it be great if there was a way to get the behavior of a *retroactive consumer* on RabbitMQ, for specific values? Thanks to RabbitMQ's pluggable exchanges feature, you can. I just saw [this implementation of a last-value-cache](https://github.com/simonmacmullen/rabbitmq-lvc-plugin) for RabbitMQ. I confess, I haven't had a moment to try it, but it looks really interesting, and powerful!
6.  Boyko Todorov has put together a step-by-step blog introducing how to create a [Maven web application and install the interesting pieces that comprise a Spring Batch application](http://boyko11.blogspot.in/2012/09/simple-spring-batch-web-app-with-maven.html). These steps work, and indeed have some niceties like the installation of the Quartz job engine, but are not the easiest way to go if you're using the open-source, and free, [Spring Tool Suite (STS)](http://www.springsource.org/sts). In STS, you need only go to the `File` > `New` > `Spring Template Project` menu, and there you have several options, including a project for configuring the full **Spring Batch Admin** in a web application!
    
    ```
    Copy  </LI>
    ```
    
7.  *Krishna's Blog* has a nice post on [Spring Web Service's fantastic test-driven development support](http://krishnasblog.com/2012/09/04/junit-testing-with-spring-integration-and-spring-ws/) ([complete with code!](https://github.com/skprasadu/junit-spring-integration-webservice)). He shows how to use the `MockWebServiceClient` to drive payload-driven requests to a web service, and verify the results. To stand up the web service, he uses the Spring Integration inbound web service gateway. This is an alternative way of setting up web service endpoints. Alternatively, you could use Spring Web Services and expose them directly in a web application by itself, or on top of Spring MVC's web processing machinery. This approach makes more sense to me, because it gives you the ability to better express the request processing pipeline using the many proverbial tools included in Spring Integration's toolbox.
8.  The `Tshikatshikaa`, or *Technical Notes* blog has a really nice look at how [to unit test Spring services, and data-access objects (DAOs)](http://tshikatshikaaa.blogspot.in/2012/09/junit-testing-spring-service-and-dao.html) with JPA 2 and Spring 3.1's testing support and the Java configuration.
9.  JBoss' Mark Proctor and ValueMomentum Software Services Pvt. Ldt's Vinod Kiran have a nice post on [how the latest release of the popular open-source rules engine, Drools, better supports Spring configuration in the beta releases of 5.5](http://blog.athico.com/2012/09/drools-spring-enhancements-in-5x.html). The new support takes the existing support, available from version 5.3, and extends it to support declarative configuration of knowledge runtime loggers (console, file, threaded-file). The post includes lots of code examples, too!
10.  Uttesh Kumar has a nice post on the [various ways to test RESTful Spring MVC services](http://uttesh.blogspot.in/2012/09/spring-rest-web-service-test.html). The first example uses Spring's built-in `RestTemplate` object to integration test a web service. The post also links to a few very nice clients, including SoapUI, the Firefox REST Client plugin, and Chrome's POST MAN plugin.
11.  Jijo Mathew has a great post on how to use [Spring MVC to build Ajax-based applications](http://jijo84.blogspot.in/2012/09/spring-mvc-with-ajax.html). Rather than explain, he demonstrates with abundant code samples.