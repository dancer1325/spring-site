---
title: Spring Cloud Stream Brooklyn.RC1 is available
source: https://spring.io/blog/2016/09/08/spring-cloud-stream-brooklyn-rc1-is-available
scraped: 2026-02-23T19:06:03.102Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Marius Bogoevici |  September 08, 2016 | 2 Comments
---

# Spring Cloud Stream Brooklyn.RC1 is available

_Releases | Marius Bogoevici |  September 08, 2016 | 2 Comments_

On behalf of the team, I am pleased to announce the release of the first release candidate of the [Spring Cloud Stream](http://cloud.spring.io/spring-cloud-stream) Brooklyn release train. Spring Cloud Stream Brooklyn.RC1 is available for use in the [Spring Milestone repository](http://repo.spring.io/libs-milestone-local/org/springframework/cloud/spring-cloud-stream-dependencies/Brooklyn.RC1), a detailed description of its features can be found in the [reference documentation](http://docs.spring.io/spring-cloud-stream/docs/Brooklyn.RC1/reference/htmlsingle/). Release notes are available [here](https://github.com/spring-cloud/spring-cloud-stream-starters/wiki/Brooklyn-Release-Notes) and include important information on the migration path.

As this release follows closely the previous [milestone release](https://spring.io/blog/2599-spring-cloud-stream-brooklyn-m1-is-available/edit) it contains a small number of fixes, and one major addition, which is support for Kafka 0.10 via [drop-in dependency replacement](http://docs.spring.io/spring-cloud-stream/docs/Brooklyn.RC1/reference/htmlsingle/#_using_the_binder_with_apache_kafka_0_10).

We plan to have a general availability release in the next couple of weeks.

Due to the timeline, the following features (which were intended for 1.1.0.RELEASE) will be deferred to version 1.2 (development on which will start soon after the GA release):

-   add support for Reactive binders (including reactive producers and consumers, such as the ones introduced by the [Reactor Kafka](https://github.com/reactor/reactor-kafka) project);
-   add support for developing applications using the [Kafka Stream API](http://kafka.apache.org/documentation.html#streams);

And, as always, we welcome feedback: either in [GitHub](https://github.com/spring-cloud/spring-cloud-stream), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud-stream), or on [Twitter](https://twitter.com/springcloudoss).