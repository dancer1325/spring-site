---
title: Spring: the de-facto standard in Enterprise Java Programming
source: https://spring.io/blog/2007/06/13/spring-the-de-facto-standard-in-enterprise-java-programming
scraped: 2026-02-24T09:28:08.530Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Adrian Colyer |  June 13, 2007 | 0 Comments
---

# Spring: the de-facto standard in Enterprise Java Programming

_Engineering | Adrian Colyer |  June 13, 2007 | 0 Comments_

Yesterday GigaSpaces announced the latest release of their Space-Based Architecture, and it's got a new name to go with it too: the [GigaSpaces eXtreme Application Platform (XAP)](http://www.prnewswire.co.uk/cgi/news/release?id=200290 "GigaSpaces XAP Press Release"). To quote from their press release:

> The new release provides a complete middleware platform for managing data, messaging and business logic for applications that require high performance and the ability to scale horizontally across hundreds of machines.

The part of the announcement that caught my eye though was this:

> As part of the new product release, GigaSpaces has embraced a much simpler, non-intrusive programming model that allows developers to write their applications in Plain Old Java Objects (POJOs), plain .Net and plain C++ objects. *For Java, GigaSpaces is achieving this by supporting the Spring Framework, which is rapidly becoming the de-facto standard in Enterprise Java programming*.

It's great to see this kind of recognition, the only slight change I'd make to the statement is to drop the "rapidly becoming" part: the Spring Framework *is* the de-facto standard in Enterprise Java Programming.

Announcements like this are part of a virtuous circle (described for example by Geoffrey Moore in his book "The Gorilla Game") whereby the pervasiveness of the Spring Framework makes it very compelling for vendors to provide Spring Framework integration in their products, which in turn increases the overall value of Spring. This of course helps to make Spring even more pervasive, putting more pressure on more vendors to integrate more deeply.

So what does it mean to "support Spring" in your product? At the simplest level this means buying into the Spring philosophy: simple Java objects supporting externalized configuration and easy testing. Here are some pointers for what you can do take make your product "Spring friendly":

1.  **Allow configuration to be managed by Spring**. At the most basic level this means having a set of configuration metadata classes that can be wired up as Spring beans in an application context. Avoid creating your own custom configuration files and formats if at all possible. To further simplify things for your users, you might consider adding support for a Spring namespace that makes it easier to configure things. Gigaspace provide a "gigaspaces" namespace for example allowing elements such as <gigaspaces:config> and <gigaspaces:caching> to be used directly in a Spring configuration file.
2.  **Use the Spring abstractions and design idioms in your API**. For example, the notion of a "Template" is very familiar to Spring users. GigaSpaces provide a "GigaSpacesTemplate".
3.  **Support unit and integration testing**. Design your API in such a way that it is easy to unit test and integration test business logic in a Spring application that uses your product.
4.  **Integrate with the infrastructure services abstractions used by Spring**. For example, GigaSpaces' JMS and JDBC abstraction can be used directly with Spring. GigaSpaces also provides several implementations of Spring's PlatformTransactionManager to allow the Spring framework to demarcate space-based transactions.

Not all integration options are applicable to every product of course, but these ideas should at least help you to get started down the road.