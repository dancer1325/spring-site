---
title: Spring Integration 2.1 is now GA
source: https://spring.io/blog/2012/01/09/spring-integration-2-1-is-now-ga
scraped: 2026-02-24T08:28:46.466Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Fisher |  January 09, 2012 | 0 Comments
---

# Spring Integration 2.1 is now GA

_Engineering | Mark Fisher |  January 09, 2012 | 0 Comments_

Spring Integration 2.1 has been released! You can download it [here](http://www.springsource.com/download/community?project=Spring%20Integration) or [configure your Maven POM](http://www.springsource.org/node/2962). This version is the result of more than one full year of work, and the team has resolved hundreds of issues since Spring Integration 2.0 was released. Interestingly, it has been 4 years and a few days since the very first public release of Spring Integration (0.5, released on Jan 3rd 2008). In this post, I simply want to provide a quick overview of the main new features of 2.1.

### RabbitMQ/AMQP support

In the 'spring-integration-amqp' module, we have Channel Adapters for one-way messaging as well as Gateways for request/reply. The adapters and gateways can be used for inbound and/or outbound integration with a RabbitMQ broker. We also have AMQP-backed Message Channel implementations - both point-to-point and publish/subscribe - that can be used anywhere in the middle of a flow. For more information, see [this section](http://static.springsource.org/spring-integration/docs/2.1.x/reference/htmlsingle/#amqp) of the reference manual.

### GemFire support

In the 'spring-integration-gemfire' module, we have inbound Channel Adapters for continuous queries as well as simple cache-listening. We also provide an outbound Channel Adapter for writing to a cache region. If you want to use GemFire for persistence behind an Aggregator, Claim Check, or buffering Message Channel, you can configure a GemFire Message Store. For more information, see [this section](http://static.springsource.org/spring-integration/docs/2.1.x/reference/htmlsingle/#gemfire) of the reference manual.

### Redis support

In the 'spring-integration-redis' module, we have inbound and outbound Channel Adapters that rely on Redis' pub/sub functionality. Also, you can configure a Redis-backed Message Store for persistence behind an Aggregator, Claim Check, or buffering Message Channel. For more information, see [this section](http://static.springsource.org/spring-integration/docs/2.1.x/reference/htmlsingle/#resource-inbound-channel-adapter) of the reference manual.

### MongoDB support

In the 'spring-integration-mongodb' module, we have another Message Store implementation that you can use behind an Aggregator, Claim Check, or buffering Message Channel. For more information, see [this section](http://static.springsource.org/spring-integration/docs/2.1.x/reference/htmlsingle/#mongodb) of the reference manual.

### JSR-223 scripting support

In the 'spring-integration-scripting' module, we provide the functionality necessary to support the use of a variety of scripting languages for any of the core EIP components (filters, splitters, routers, transformers, etc). Supported languages include: Groovy, Ruby/JRuby, Python/Jython, and JavaScript. Like the Groovy support that existed since version 2.0, these scripts can be dynamically refreshed at runtime. For more information, see [this section](http://static.springsource.org/spring-integration/docs/2.1.x/reference/htmlsingle/#scripting) of the reference manual.

### Stored Procedure support

In the 'spring-integration-jdbc' module, we have added Stored Procedure adapters along side the existing adapters that support simple select/insert/update operations. For more information, see [this section](http://static.springsource.org/spring-integration/docs/2.1.x/reference/htmlsingle/#stored-procedures) of the reference manual.

### Spring Resource abstraction support

In the 'spring-integration-core' module, we have added a new inbound Channel Adapter that operates against an instance of Spring's Resource abstraction. That provides flexibility across a number of underlying resources, such as files, classpath resources, or any resource that can be located via a URL. For more information, see [this section](http://static.springsource.org/spring-integration/docs/2.1.x/reference/htmlsingle/#resource-inbound-channel-adapter) of the reference manual.

### Payload Enricher

In the 'spring-integration-core' module, we have added an 'enricher' component that allows for a message flow to be "called" from within another flow so that the result of that flow can be used to enrich the payload of a Message. It complements the existing header-enricher component. For more information, see [this section](http://static.springsource.org/spring-integration/docs/2.1.x/reference/htmlsingle/#payload-enricher) of the reference manual.

### FTP and SFTP outbound gateways

In the 'spring-integration-ftp' and 'spring-integration-sftp' modules, we have added outbound gateway adapters to support request/reply operations in addition to the existing one-way channel adapters. For more information, see [this section for FTP](http://static.springsource.org/spring-integration/docs/2.1.x/reference/htmlsingle/#ftp-outbound-gateway) and [this section for SFTP](http://static.springsource.org/spring-integration/docs/2.1.x/reference/htmlsingle/#sftp-outbound-gateway).

### Migrating from Spring Integration 2.0

If you plan to upgrade an application from Spring Integration version 2.0, then please refer to our [migration guide](https://github.com/SpringSource/spring-integration/wiki/Spring-Integration-2.0-to-2.1-Migration-Guide). We will be updating that document as necessary, so please send us feedback if you do encounter any issues that are not yet mentioned within that guide.

### Summary

As you can see, we have been quite busy. In addition to the new functionality described above, there are a number of improvements and refactoring. You may want to start with [this section](http://static.springsource.org/spring-integration/docs/2.1.x/reference/htmlsingle/#whats-new-part) of the reference manual where you will find more information about those other improvements in addition to the features mentioned in this post. Also, be sure to checkout the [Spring Integration Samples](https://github.com/SpringSource/spring-integration-samples) on github.

As always, we welcome your feedback. Please join the discussion in the [Spring Integration Forum](http://forum.springsource.org/forumdisplay.php?f=42), and visit the [Spring Integration Homepage](http://www.springsource.org/spring-integration) for additional references and links to the source code, issue tracker, blogs, and more.