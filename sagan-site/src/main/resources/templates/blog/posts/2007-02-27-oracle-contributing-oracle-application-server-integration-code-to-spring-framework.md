---
title: Oracle Contributing Oracle Application Server Integration Code to Spring Framework
source: https://spring.io/blog/2007/02/27/oracle-contributing-oracle-application-server-integration-code-to-spring-framework
scraped: 2026-02-24T09:31:53.343Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rod Johnson |  February 27, 2007 | 0 Comments
---

# Oracle Contributing Oracle Application Server Integration Code to Spring Framework

_Engineering | Rod Johnson |  February 27, 2007 | 0 Comments_

On the theme of application servers embracing Spring, another update. Oracle have been working on value added integration with their application server.

This is similar to what we have with WebLogic 8.1 and above in WebLogicJtaTransactionManager. The OC4JJtaTransactionManager should be used in place of the generic JtaTransactionManager in an OC4J environment, and provides the following benefits:

-   Direct access to the transaction manager and helper classes without having to use JNDI lookups
-   Auto-detection of server version to get the most out of the different transaction manager implementations in different versions
-   Control over transaction isolation level: a very useful feature not available in JTA

For those familiar with JTA, using the UserTransaction, as you do when controlling transactions programmatically in Java EE, has some significant gaps, perhaps understandable given the now obsolete assumption when J2EE was first conceived nearly ten years ago that no one would ever want to do transaction management without EJB.

The problem is that some operations like suspending a transaction (to get "requires new" semantics, for example), are only possible on the TransactionManager. This interface is standardized in the JTA spec, but unlike the UserTransaction it does not offer a well-known JNDI location or other way of obtaining it. Some other things, such as control of isolation level or server-specific "transaction naming" (for monitoring or other purposes) are not possible at all with JTA.

Because Spring provides a rich, portable transaction abstraction, it does the work under the covers of driving JTA and other APIs, so your code doesn't need to know anything about the underlying infrastructure, and thus can take advantage of any proprietary APIs that give more control or greater efficiency. Spring supports both declarative and programmatic transactions, so you can layer transaction management onto POJOs that don't know anything about it; or, if transaction management is part of your business logic, you can use a more elegant API that offers more features than JTA, isn't tied to JNDI, and is much less verbose to work with.

This code will go into the Spring core, and will ship with Spring 2.0.3. Thanks to Oracle for their continued support of Spring. Spring plays a significant role in their [Fusion Middleware](http://www.oracle.com/products/middleware/index.html) platform, and their [SCA](http://www.osoa.org/display/Main/Home) strategy. Of course Interface21 is also a founding [SCA partner](http://www.osoa.org/display/Main/Service+Component+Architecture+Partners), and we are working with Oracle, BEA, IBM and others on SCA bindings for Spring. As senior Oracle SCA guy Greg Pavlik [blogged last year](http://gregpavlik.blogspot.com/2006_07_01_archive.html), there are a lot of benefits here, with Spring apps being "SCA-ready" out of the box:

> Last, and from a Java programmers perspective, some very interesting news: there is now a Spring integration that allows Spring-based applications to tie in directly to an SCA-based SOA environment. As Spring becomes a de facto standard in many organizations for building J2EE applications, we're opening the door to transparent SCA-based integration for these investments. Plus now there's a practical open source story for Java developers to get on board with SCA without worrying about new learning curves or lots of new constructs. With Spring, it can be just POJOs: turtles all the way down. I had a lot of folks ask me directly about Java programming and SCA. Spring is a great answer.

That reminds me: some interesting things are happening in the SCA Java working groups, and Adrian (who does all the hard work on this at Interface21!) or I should post a proper update when we have time...

Oracle have further ideas around HA features to follow; there are definitely some interesting possibilities, especially around RAC, which is used by many of our large enterprise customers. They are very interested in further ideas for integration between Spring and Oracle technology, so please feed any ideas back here or via your Oracle contact. Oracle also maintain an excellent [resource page](http://www.oracle.com/technology/tech/java/spring.html) on Spring integration.