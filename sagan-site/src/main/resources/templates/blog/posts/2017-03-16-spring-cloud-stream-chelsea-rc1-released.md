---
title: Spring Cloud Stream Chelsea.RC1 released
source: https://spring.io/blog/2017/03/16/spring-cloud-stream-chelsea-rc1-released
scraped: 2026-02-23T16:36:29.117Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Marius Bogoevici |  March 16, 2017 | 3 Comments
---

# Spring Cloud Stream Chelsea.RC1 released

_Releases | Marius Bogoevici |  March 16, 2017 | 3 Comments_

On behalf of the team, I am pleased to announce the release of Spring Cloud Stream Chelsea.RC1. Spring Cloud Stream Chelsea.RC1 is available for use in the [Spring Milestone repository](http://repo.spring.io/libs-milestone-local/org/springframework/cloud/spring-cloud-stream-dependencies/Chelsea.RC1/), and a detailed description of its features can be found in the [reference documentation](http://docs.spring.io/spring-cloud-stream/docs/Chelsea.RC1/reference/htmlsingle/). For information about artifacts and a complete list of changes, please consult the [release notes](https://github.com/spring-cloud/spring-cloud-stream-starters/releases/tag/vChelsea.RC1).

## [](#what-is-new)[](#what-is-new)What is new?

Here’s a summary of the major new features and improvements brought by the new release:

#### [](#dispatching-capabilities-added-to-streamlistener)[](#dispatching-capabilities-added-to-streamlistener)Dispatching capabilities added to StreamListener

We’ve added support for [dispatching messages to multiple @StreamListener methods](http://docs.spring.io/spring-cloud-stream/docs/Chelsea.RC1/reference/htmlsingle/#_using_streamlistener_for_dispatching_messages_to_multiple_methods) registered on an input channel, based on a SpEL-based condition. This allows more flexibility in writing message-driven microservices, especially for DDD/ES/CQRS scenarios, where different types of events can be dispatched to their handling methods directly.

```
Copy@EnableBinding(Sink.class)
@EnableAutoConfiguration
public static class {

    @StreamListener(target = Sink.INPUT, condition = "headers['type']=='customer'")
    public void handleCustomerEvent(@Payload CustomerEvent customerEvent) {
       // handle the message
    }

    @StreamListener(target = Sink.INPUT, condition = "headers['type']=='order'")
    public void handleOrderEvent(@Payload OrderEvent orderEvent) {
       // handle the message
    }
}
```

#### [](#metrics)[](#metrics)Metrics

Spring Cloud Stream has added an additional module that enables the export of Spring Boot metrics on a dedicated channel. You can now collect metrics from your applications by simply adding the module on the classpath and providing a target destination as described in the [reference documentation](http://docs.spring.io/spring-cloud-stream/docs/Chelsea.RC1/reference/htmlsingle/#_metrics_emitter). By default, the module exports Spring Integration metrics (including bound channel metrics), but other metrics can be added as well. This enables first class support for traffic monitoring in Spring Cloud Stream applications.

#### [](#schema-improvements-search-and-caching)[](#schema-improvements-search-and-caching)Schema improvements: search and caching

New features for schema support include schema searching and [client-level caching](http://docs.spring.io/spring-cloud-stream/docs/Chelsea.RC1/reference/htmlsingle/#_schema_registry_client), the latter adding significant performance improvements to the serialization support.

#### [](#rabbitmq-custom-infrastructure-support)[](#rabbitmq-custom-infrastructure-support)RabbitMQ custom infrastructure support

The RabbitMQ binder now supports [customizing the types of destinations and their attributes](http://docs.spring.io/spring-cloud-stream/docs/Chelsea.RC1/reference/htmlsingle/#_configuration_options_3), including support for Direct Exchanges and TTL settings for messages.

#### [](#provisioning-spi)[](#provisioning-spi)Provisioning SPI

Starting with this release, Spring Cloud Stream introduces a new provisioning SPI, abstracting the creation and configuration of destinations (topics, exchanges, queue) on the target brokers. This allows better separation of concerns between the infrastructure management and messaging aspects of a binder.

## [](#what-is-next)[](#what-is-next)What is next?

Over the upcoming couple of weeks, we will focus on bug fixes and documentation/sample improvements in preparation for the GA release.

In addition to that, here are a few items we intend for our future roadmap:

-   After Chelsea.RELEASE: releasing a number of companion integrations (not part of the release train, but integrated with core support, with the goal of including in the release train in the future)
    
    -   [JMS binder](https://github.com/spring-cloud/spring-cloud-stream-binder-jms) with native support for Active MQ;
        
    -   Upgrading the client library for the [Google Pub Sub binder](https://github.com/spring-cloud/spring-cloud-stream-binder-google-pubsub);
        
    -   Reactive Streams-based binders based on an existing [proof of concept](https://github.com/mbogoevici/spring-cloud-stream-binder-reactive-streams);
        
    -   Kafka Streams binder based on an existing [proof of concept](https://github.com/mbogoevici/spring-cloud-stream-binder-kstream);
        
-   In **future** Chelsea service releases: improvements for error handling and DLQ management;
    

We also plan on starting work on Spring Cloud Stream 2 with support for Spring 5 and Spring Integration 5.

### [](#acknowledgments)[](#acknowledgments)Acknowledgments

I would like to thank everyone involved for their support. In particular, I would like to extend special thanks to the community members that have contributed to this release by opening issues or providing patches:

-   Donovan Muller ([@donovanmuller](https://github.com/donovanmuller))
    
-   Nicholas Byl ([@nbyl](https://github.com/nbyl))
    
-   [@mastermind1981](https://github.com/mastermind1981)
    
-   Maxim Kirilov ([@maximkir](https://github.com/maximkir))
    
-   唐睿 ([@tangrui](https://github.com/tangrui))
    
-   Jose A. Iñigo ([@codependent](https://github.com/codependent))
    
-   Dennis Melzer ([@sirwayne](https://github.com/sirwayne))
    
-   Wallace Wadge ([@wwadge](https://github.com/wwadge))
    
-   Barry Commins ([@barrycommins](https://github.com/barrycommins))
    
-   Reda Alaoui([@reda-alaoui](https://github.com/reda-alaoui))
    

As usual, all contributions are welcome, and community support is the keystone of our success! You can stay in touch with us either in [GitHub](https://github.com/spring-cloud/spring-cloud-stream), on [Stack Overflow](https://github.com/spring-cloud/spring-cloud-stream), on [Gitter](https://github.com/spring-cloud/spring-cloud-stream), or on [Twitter](https://github.com/spring-cloud/spring-cloud-stream) (hashtag #Stream or #SpringCloudStream).

Last but not least, a series of Spring events for the community, by the community will be taking place soon, close to you:

-   [Chicago, May 30-31](https://www.springdays.io/ehome/spring-days/chicago)
    
-   [New York, June 20-21](https://www.springdays.io/ehome/spring-days/new-york)
    
-   [Atlanta, July 18-19](https://www.springdays.io/ehome/spring-days/atlanta)
    

Grab your ticket or [submit a talk](https://www.springdays.io/ehome/spring-days/submit)!