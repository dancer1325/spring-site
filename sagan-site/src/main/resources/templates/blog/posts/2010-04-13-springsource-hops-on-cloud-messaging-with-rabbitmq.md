---
title: SpringSource Hops On Cloud Messaging with RabbitMQ
source: https://spring.io/blog/2010/04/13/springsource-hops-on-cloud-messaging-with-rabbitmq
scraped: 2026-02-24T08:58:22.896Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rod Johnson |  April 13, 2010 | 0 Comments
---

# SpringSource Hops On Cloud Messaging with RabbitMQ

_Engineering | Rod Johnson |  April 13, 2010 | 0 Comments_

I am delighted to [announce](http://www.springsource.com/newsevents/springsource-acquires-rabbitmq-cloud-messaging) that the SpringSource division of VMware has acquired Rabbit Technologies Ltd., the company behind the popular open source cloud messaging technology [RabbitMQ](http://www.rabbitmq.com). This acquisition will enhance our middleware portfolio and accelerate our cloud initiatives.

## Messaging Evolution in the Cloud

As organizations increasingly build and deploy applications in a cloud environment, the infrastructure to support this new model is evolving. A new type of lightweight, reliable, scalable and portable messaging system is required to support the routing of user requests to the appropriate resources regardless of where they may reside. RabbitMQ is a leader in this field and has demonstrated significant innovation around cloud messaging.

RabbitMQ is well suited for the cloud for three main reasons:

-   **Open**: RabbitMQ is open source, has an open and active community, and is based on open standards. Openness will be a critical factor for successful cloud platforms because moving to the cloud loses a lot of its appeal if it turns out to be just another version of vendor lock-in.
-   **Flexible Scalability**: RabbitMQ is capable of scaling in multiple different ways, not just technical horizontal scaling but also federated messaging that spans cross service scaling all the way up to geographically diverse scaling.
-   **Protocol based**: RabbitMQ is a protocol based, rather than API based, messaging system. This means that messaging clients are not tied to vendor installed libraries which increases portability for applications and allows for client messaging from a wide variety of different platforms. This approach also allows RabbitMQ to support multiple protocols which increases its utility in heterogeneous environments like the cloud.

Indeed, Rabbit's suitability for cloud scenarios is already borne out in practice by its adoption by cloud service providers and organizations building private clouds, such as [NASA Nebula](http://nebula.nasa.gov/services/).

## What does this mean for you?

If you are a member of the RabbitMQ community, this is good news, and a significant further validation for your technical choice. RabbitMQ will continue to be open source and distributed in the same way as before. The community can expect to see increased investment in this outstanding technology which should result in significant improvements to the open source release. The RabbitMQ community can also expect to see the same dedication and support that SpringSource gives to its other open source communities like Spring, Grails, Groovy and Apache based technologies.

We love and are committed to the diversity of languages and platforms (beyond Java) from which developers use Rabbit. Part of the value of a messaging technology lies in its reach across platforms.

As you can expect, we will be building a particularly compelling experience for the Spring community. Enterprise developers using Spring directly, or Spring via Grails, can expect a first class integration with RabbitMQ as a messaging system. This will provide developers with even more flexibility and choice in how to structure their applications while providing assurance that the applications they develop can more easily move from the developer desktop, to a virtual or physical datacenter and into the cloud.

This Spring integration will consist of two elements:

-   **Low level integration analogous to Spring's JMS support.**This will include a RabbitTemplate that provides simple send and receive operations and delegates to a MessageConverter to support a POJO messaging model. In addition to the template, we are providing support for "Message-driven POJOs" with a MessageListenerContainer and MessageListenerAdapter that are very similar to their namesakes in Spring's JMS support. Of course, we'll be managing the low-level resources as well as transactions. All of this will be available for both Java and .NET, and we are designing the high-level AMQP layer so that it could support multiple implementations in the future.
-   **Spring Integration support.** This will include Channel Adapters for connecting Spring Integration Message Channels to AMQP Exchanges on the sending side and AMQP Queues on the receiving side. While these adapters build upon the low-level support mentioned above, they further abstract the programming model so that the end user can rely on Spring Integration configuration on top of a pure POJO service layer.

The latter is particularly important. [Spring Integration](http://www.springsource.org/spring-integration) is one of the most exciting Spring projects, and provides *the* natural extension of the Spring POJO programming model to handle enterprise integration patterns. We're seeing a groundswell of community and customer interest in Spring Integration and are significantly increasing our investment in its development. In the same way in which Spring Dependency Injection provided an abstraction that avoided the need to work with low-level APIs such as JNDI, simplifying application code and decoupling it from deployment concerns, I believe that many, if not most, asynchronous patterns are better expressed at a more conceptual level, as with Spring Integration, than by directly working with messaging APIs and protocols.

Spring Integration allows developers to take advantage of synchronous and asynchronous messaging without even implementing a listener interface or writing code that depends on a template. It supports the [Enterprise Integration Patterns](http://www.eaipatterns.com/) (Hohpe/Woolf), building directly on Spring Framework. Developers can use the declarative, configuration-driven approach to address integration concerns, such as Transformation, Routing, Splitting, and Aggregation, while maintaining a clean separation from POJO-based business logic that is easily tested in isolation. Spring Integration's Message Channel abstraction provides consistency between intra-process and inter-process messaging. It also decouples application code from any particular transport or protocol. This fits well with the general Spring philosophy that portability should not require code changes and that technology choices should not lead to lock-in. By adding RabbitMQ to the transport options, developers will have even more choice and will immediately be able to bridge between RabbitMQ and any of the other supported transports.

I'm a little late to the party with this blog. The press, blogosphere and twitter (where it's been a trending topic) is already buzzing about SpringSource/Rabbit. (Which reminds me: I've been far more active on twitter than on my blog lately, and I encourage you to follow me at [**springrod**](http://twitter.com/springrod).)

However, let me be the first to welcome the RabbitMQ community into the SpringSource family and to encourage the SpringSource community to take a look at how to [get started](http://www.rabbitmq.com/how.html) with RabbitMQ.