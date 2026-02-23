---
title: Spring Cloud Stream Chelsea goes GA!
source: https://spring.io/blog/2017/04/13/spring-cloud-stream-chelsea-goes-ga
scraped: 2026-02-23T16:34:32.953Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Marius Bogoevici |  April 13, 2017 | 1 Comment
---

# Spring Cloud Stream Chelsea goes GA!

_Releases | Marius Bogoevici |  April 13, 2017 | 1 Comment_

On behalf of the community, I am happy to announce the general availability of the Spring Cloud Stream Chelsea release train. For this release train, the first general availability release is Chelsea.SR1, which fixes a number of issues over Chelsea.RELEASE (all within the scope of the metrics export feature). Chelsea.SR1 is also included as part of [Spring Cloud Dalston.RELEASE](https://spring.io/blog/2017/04/12/spring-cloud-dalston-released).

The new release is available in Maven Central, and a detailed description of its features can be found in the [reference documentation](http://docs.spring.io/spring-cloud-stream/docs/Chelsea.SR1/reference/htmlsingle/). For information about artifacts and most recent changes, please consult the release notes, as follows:

-   Notes for [Chelsea.RELEASE](https://github.com/spring-cloud/spring-cloud-stream-starters/releases/tag/vChelsea.RELEASE)
    
-   Notes for [Chelsea.SR1](https://github.com/spring-cloud/spring-cloud-stream-starters/releases/tag/vChelsea.SR1)
    

### [](#what-is-new)[](#what-is-new)What is new?

The new release contains a number of fixes and improvements over the previous release candidate. As a reminder, here are a few highlights of features added by previous releases (with links to the original announcements).

-   [Dispatching capabilities added to StreamListener](https://spring.io/blog/2017/03/16/spring-cloud-stream-chelsea-rc1-released#dispatching-capabilities-added-to-streamlistener)
    
-   [Metrics export](https://spring.io/blog/2017/03/16/spring-cloud-stream-chelsea-rc1-released#metrics)
    
-   [Schema improvements for searching and caching](https://spring.io/blog/2017/03/16/spring-cloud-stream-chelsea-rc1-released#schema-improvements-search-and-caching)
    
-   [RabbitMQ custom infrastructure support](https://spring.io/blog/2017/03/16/spring-cloud-stream-chelsea-rc1-released#rabbitmq-custom-infrastructure-support)
    
-   [Provisioning SPI](https://spring.io/blog/2017/03/16/spring-cloud-stream-chelsea-rc1-released#provisioning-spi)
    

### [](#what-is-next)[](#what-is-next)What is next:

After the release, we will continue to expand the Spring Cloud Stream ecosystem:

-   Improving the error handling support in the binder, as well as providing a user-friendly API for recovery and error handling
    
-   Milestone (1.0.0.M1) release for the [JMS binder](https://github.com/spring-cloud/spring-cloud-stream-binder-jms)
    
-   Preview of Kafka Streams support based on the [newly added support in Spring Kafka](https://spring.io/blog/2017/04/07/spring-for-apache-kafka-1-2-0-and-1-1-4-available)
    
-   Focus on binders based on cloud infrastructure such as Google Pub Sub and Kinesis
    
-   Preview of Reactive Streams binder support
    

### [](#acknowledgments)[](#acknowledgments)Acknowledgments

I would like to thank all community members for their help on getting this over the finish line. Your involvement and help is invaluable! In particular, I would like to extend special thanks to the community members that have contributed to the fixes we made after Chelsea.RC by opening issues or providing patches:

-   Saket Malviya ([@sakemal](https://github.com/sakemal))
    
-   Julian Hanhart ([@wtfc63](https://github.com/wtfc63))
    
-   Kai Zimmermann ([@kaizimmerm](https://github.com/kaizimmerm))
    

As always, you can stay in touch with us either in [GitHub](https://github.com/spring-cloud/spring-cloud-stream), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud-stream), on [Gitter](https://gitter.im/spring-cloud/spring-cloud-stream), or on [Twitter](https://twitter.com/springcloud) (hashtag #Stream or #SpringCloudStream).

If you are interested to learn more about building cloud-native microservices with Spring Cloud, Kafka and Kafka Streams, come to [my talk](https://kafka-summit.org/sessions/cloud-native-data-streaming-microservices-spring-cloud-kafka/) at the [Kafka Summit New York](https://kafka-summit.org/events/kafka-summit-ny/) on May 8!