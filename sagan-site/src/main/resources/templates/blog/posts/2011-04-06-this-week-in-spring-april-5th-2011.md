---
title: This week in Spring: April 5th, 2011
source: https://spring.io/blog/2011/04/06/this-week-in-spring-april-5th-2011
scraped: 2026-02-24T08:43:44.195Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  April 06, 2011 | 0 Comments
---

# This week in Spring: April 5th, 2011

_Engineering | Josh Long |  April 06, 2011 | 0 Comments_

This year is moving along at a very quick clip!

We've already seen a torrent of new and exciting releases for Spring users and just today news of perhaps the most exciting thing yet went out. If you didn't get it because you aren't, for example, a registered SpringSource Tool Suite user, then here are the salient bits:

Next Tuesday - April 12th - VMware is hosting a webinar - ["Spring into the cloud!"](http://www.springsource.org/node/3082) - with the provocative explanation, "Spring has already simplified enterprise Java development. Next up is cloud development."

The webinar will be presented for both Europe and North America timezones. See [this page](http://www.springsource.org/node/3082) for details, and [don't forget to register!](http://www.vmware.com/go/apr12)

Enough looking into the oh-so-exciting future, let's look at the exciting stuff that's happened in the last week!

1.  The Spring Data project's been hopping even more than usual this last week! First, an update to the Spring Data JDBC Extensions project, now at 1.0.0.M1, with specific support for the Oracle Database. The new release includes RAC "Fast Connection Failover," Streams Advanced Queuing, native XML types, and a custom DataSource connection preparer. Lots of powerful features in a nice, easy-to-use package.  
    See the [release announcement](http://www.springsource.org/node/3080) and the [project home page](http://www.springsource.org/spring-data) for more details.
2.  The Spring AMQP project has come a long way very quickly. The latest release marks the first RC (release candidate) leading up to 1.0 GA. Spring AMQP is the Spring integration layer for Java clients and the AMQP protocol. Most people will use this with SpringSource's own [RabbitMQ message broker](http://www.rabbitmq.com/), the most popular, powerful message broker available today.  
    
    Check out the [release announcement](http://www.springsource.org/node/3079) here, and check out the [project home page](http://www.springsource.org/spring-amqp) for more information.
    
3.  Speaking of AMQP, and highly scalable, cloud-friendly RabbitMQ deployments (wait, weren't we talking about that? Well, we should've been! RabbitMQ is the most widely used Message broker - even in cloud environments like Amazon Web Services where there are numerous alternatives like Amazon's own SQS service), [Helena Edelson wrote up a fantastic review](http://blog.springsource.com/2011/04/01/routing-topologies-for-performance-and-scalability-with-rabbitmq/) of RabbitMQ topologies for performance and scalability.
    
    The documentation has always been very good, but it can be difficult sometimes to pull together all the common idioms and patterns. This post provides the guided tour to scaling RabbitMQ that I certainly wish I'd had a year ago! Definitely worth a read and a bookmark.
    
4.  Want a look at what's coming in Spring Integration? The nice part about open-source is you never need wonder for too long. In the Spring Integration project, adapters and extra modules start life in the *sandbox.* Typically, these can be used with existing versions of Spring Integration, and don't always track the latest and greatest Spring Integration release. Two new modules that I've really enjoyed working with the last few weeks? [Spring Integration MongoDB](http://git.springsource.org/spring-integration/sandbox/trees/0ca9b5ba70b9d80271064e6d387501812c22e689/spring-integration-mongodb) and [Spring Integration Redis.](http://git.springsource.org/spring-integration/sandbox/trees/0ca9b5ba70b9d80271064e6d387501812c22e689/spring-integration-redis) These two modules allow you to make use of these heavy hitting choices in the NoSQL space in a way that's both practical and convenient, as an add-on to your existing Spring Integration solution. They both support message storage using the backend store, and the Redis one also provides Spring Integration-based publish/subscribe support on top of Redis' built-in messaging support! While you're there, create an account and create project clones and feedback if you see anything unaccounted for in your requirements. The MongoDB and Redis support also dovetail nicely with the [Spring Integration GemFire support](http://git.springsource.org/spring-integration/sandbox/trees/0ca9b5ba70b9d80271064e6d387501812c22e689/spring-integration-gemfire), and the [Spring Integration AMQP](http://git.springsource.org/spring-integration/sandbox/trees/0ca9b5ba70b9d80271064e6d387501812c22e689/spring-integration-amqp) support. These options give your applications all the flexibility and performance they need to meet even the most demanding of requirements, on your desktop or in the cloud or beyond!
    
5.  The Spring Data Graph project's support for Neo4j has just been updated to version 1.0.0.RC1. The new version includes a reworked API for queries (replacing finders with composable spring-data-commons repositories), new REST-client support for Neo4J-REST, numerous performance improvements, updates to the `Neo4jTemplate`, documentation updates and small top level API refactorings.
    
      
    Check it out and read the full release announcement [here](http://www.springsource.org/node/3081) and don't forget to register for the [upcoming webinar](http://www.springsource.com/newsevents/webinars).
6.  Matt Raible recently updated some of his AppFuse wiki entry on using Spring MVC to reflect the latest releases of Spring and AppFuse itself. Check it out for an updated [oldie-but-a-goodie!](http://appfuse.org/display/APF/Using+Spring+MVC)
7.  Sivaprasadreddy Katamreddy has published a blog on [using Spring MVC 3 and Hibernate to build a CRUD Sample Application](http://java.dzone.com/articles/springmvc3-hibernate-crud). The blog post goes to great lengths and presents every code artifact in detail, including the SQL statements and JPA entity classes! Nice work, and a useful guide for those looking to get started. Readers may also appreciate the Green Beans post, ["Getting Started with Spring in your Service Tier,"](http://blog.springsource.com/2011/01/07/green-beans-getting-started-with-spring-in-your-service-tier/) which speaks to some of the same goals as this excellent post.