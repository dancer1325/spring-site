---
title: Spring Integration 2.0 Milestone 3 Released
source: https://spring.io/blog/2010/03/23/spring-integration-2-0-milestone-3-released
scraped: 2026-02-24T08:59:00.937Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Fisher |  March 23, 2010 | 0 Comments
---

# Spring Integration 2.0 Milestone 3 Released

_Engineering | Mark Fisher |  March 23, 2010 | 0 Comments_

The 3rd development milestone for Spring Integration 2.0 was released last week (download it [here](http://www.springsource.com/download/community?project=Spring Integration)).

If you have read [Oleg's recent blog](http://blog.springsource.com/2010/03/18/eip-loan-broker-reference-implementation-part-1/), you already know that we have started working on a new reference sample implementation based on the "Loan Broker" example that plays a significant role in Gregor Hohpe and Bobby Woolf's [Enterprise Integration Patterns](http://enterpriseintegrationpatterns.com/) book.

I just wanted to post a brief blog listing a few of the other new additions and improvements in this release. You can expect to see more detailed blog entries covering a few of these features over the next couple weeks. I'm including some links to documentation, samples, and test code so that you can at least get a quick sense of how these features are evolving.

### Inbound and Outbound Channel Adapters for TCP/UDP

Read about them [here](http://static.springsource.org/spring-integration/docs/2.0.x/spring-integration-reference/htmlsingle/spring-integration-reference.html#ip).

### Channel Adapters for JMX

This set of adapters provides support for JMX Notifications (listening or publishing), MBean Attribute-polling, and MBean Operation-invoking. Also, on top of that JMX support, we now have our initial implementation of the [Control Bus](http://enterpriseintegrationpatterns.com/ControlBus.html) (our Loan Broker sample will eventually be extended to show the Control Bus in action as is done within EIP Chapter 12). Read more [here](http://static.springsource.org/spring-integration/docs/2.0.x/spring-integration-reference/htmlsingle/spring-integration-reference.html#jmx).

### Inbound Channel Adapter for JDBC

Documentation is in progress, but you can see some examples in the [test cases](https://src.springframework.org/svn/spring-integration/tags/spring-integration-2.0.0.M3/org.springframework.integration.jdbc/src/test/resources/org/springframework/integration/jdbc/config/). We have also started work on a JDBC-based MessageStore implementation, which may be used from many components within the framework where persistence is desirable (such as Aggregators). The MessageStore interface itself is still evolving, but we're trying to keep it as simple as possible, since there will likely be a number of different storage options to consider in the future.

### Configurable Type Conversion

Spring Integration now supports a configurable Spring 3.0 [ConversionService](http://static.springsource.org/spring/docs/3.0.x/javadoc-api/org/springframework/core/convert/ConversionService.html) instance. A bean named "integrationConversionService" of type ConversionService will be used for handler method-invocation (service-activator, transformer, router, splitter, etc). In other words, if you pass a Message with a payload of type Foo, but the method being invoked expects an instance of type Bar, then it can be automatically converted as long as the ConversionService you have configured contains a Converter that supports conversion from Foo to Bar. Here is some [test code](https://src.springframework.org/svn/spring-integration/tags/spring-integration-2.0.0.M3/org.springframework.integration/src/test/java/org/springframework/integration/handler/CustomConverterMessageProcessingTests.java) and the corresponding [configuration](https://src.springframework.org/svn/spring-integration/tags/spring-integration-2.0.0.M3/org.springframework.integration/src/test/java/org/springframework/integration/handler/CustomConverterMessageProcessingTests-context.xml).

### Inbound Web Services Sample

We've added a [new sample](https://src.springframework.org/svn/spring-integration/tags/spring-integration-2.0.0.M3/spring-integration-samples/ws-inbound-gateway/) demonstrating inbound Web Services support. As with all of the samples, it may be built via Maven as described in the samples' [README.txt](https://src.springframework.org/svn/spring-integration/tags/spring-integration-2.0.0.M3/spring-integration-samples/README.txt) that is included with the distribution.

Stay tuned for more blog posts. We're very much looking forward to your feedback via [JIRA](http://jira.springframework.org/browse/INT) and/or the [Forum](http://forum.springsource.org/forumdisplay.php?f=42) as we approach the 2.0 release!