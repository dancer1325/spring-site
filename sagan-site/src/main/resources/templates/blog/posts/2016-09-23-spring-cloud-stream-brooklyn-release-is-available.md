---
title: Spring Cloud Stream Brooklyn.RELEASE is available
source: https://spring.io/blog/2016/09/23/spring-cloud-stream-brooklyn-release-is-available
scraped: 2026-02-23T19:03:48.719Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Marius Bogoevici |  September 23, 2016 | 6 Comments
---

# Spring Cloud Stream Brooklyn.RELEASE is available

_Releases | Marius Bogoevici |  September 23, 2016 | 6 Comments_

On behalf of the team, I am happy to announce the general availability of the Spring Cloud Stream Brooklyn release train. Spring Cloud Stream `Brooklyn.RELEASE` is available for use in the [Spring Release repository](https://repo.spring.io/release/) and in Maven Central. A detailed description of the features and new capabilities as discussed below can be found in the [reference documentation](http://docs.spring.io/spring-cloud-stream/docs/Brooklyn.RELEASE/reference/html/). The release notes are available [here](https://github.com/spring-cloud/spring-cloud-stream-starters/wiki/Brooklyn-Release-Notes) and include important information on the migration path.

At a high level, `Brooklyn.RELEASE` introduces the following new features:

-   Support for Apache Kafka 0.9 and 0.10 (Apache Kafka 0.8.x users must use Spring Cloud Stream 1.0.x);
-   Schema Registry support;
-   Reactive API support;

Since the release candidate [a couple weeks back](https://spring.io/blog/2016/09/08/spring-cloud-stream-brooklyn-rc1-is-available), we’ve added a few improvements that we believe will help with the usability of the framework. They are:

-   Spring Cloud Stream applications display channel metrics by default - necessary dependencies are pre-included for convenience;
-   Added support for displaying metrics for internal channels in aggregate applications;
-   Broker dependencies are not a requirement anymore for the Kafka binder, if applications don’t need to control topic creation and configuration;
-   Adds support for configuring SASL/Kerberos programmatically for the Kafka binder, without requiring an external JAAS configuration file;
-   Various bug fixes and documentation enhancements;

I would like to thank everyone who has contributed for their time and effort. In particular, I would like to thank community members that have submitted pull requests or have taken the time to test the early releases, providing us with invaluable feedback.

As for our future plans, they include:

-   New binders: JMS, Google Pub Sub, Amazon Kinesis
-   Support for Kafka Streams
-   Support for fully reactive binders

As always, you can stay in touch with us either in [GitHub](https://github.com/spring-cloud/spring-cloud-stream), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud-stream), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), or on [Twitter](https://twitter.com/springcloudoss).