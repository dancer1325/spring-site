---
title: Spring Integration Kafka 1.2 is available, with 0.8.2 support and performance enhancements
source: https://spring.io/blog/2015/06/19/spring-integration-kafka-1-2-is-available-with-0-8-2-support-and-performance-enhancements
scraped: 2026-02-23T19:48:48.529Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Marius Bogoevici |  June 19, 2015 | 0 Comments
---

# Spring Integration Kafka 1.2 is available, with 0.8.2 support and performance enhancements

_Releases | Marius Bogoevici |  June 19, 2015 | 0 Comments_

We are pleased to announce the release of Spring Integration Kafka 1.2.

This new release provides a couple of major improvements and upgrades over the previous versions:

-   Support for Apache Kafka 0.8.2 and using the new Producer API;
-   Overhaul of the internal concurrent dispatching with a non-blocking ring buffer implementation based on [Project Reactor](https://github.com/reactor/reactor).

For each of the changes, the goal was to improve the performance of the producer and, respectively, consumer components of Spring Integration Kafka. While we do not have any isolated benchmarks for Spring Integration Kafka proper, the enhancements of the release have contributed to the [performance metrics](https://spring.io/blog/2015/06/17/spring-xd-benchmarks-part-1) reported in the newly released [Spring XD 1.2](https://spring.io/blog/2015/06/17/spring-xd-1-2-ga-spring-xd-1-1-3-and-flo-for-spring-xd-beta-released).

By upgrading to Kafka 0.8.2, some of the options available in the old producer API (for example, sending messages synchronously) aren't supported anymore, and some configuration options are semantically different (batch size, which previously referred to the message count, is now referring to the byte count). In the interest of clarity and reducing surprises, we've preferred to break backwards compatibility in the XML configuration, by removing unavailable options and renaming existing ones to make sure that they are fully understood. Consult the [project](https://github.com/spring-projects/spring-integration-kafka) for details.

Happy coding!

Some of the upcoming features will include:

-   Improving the documentation by creating a dedicated wiki;
-   Making it easy to send messages outside of a Spring Integration Kafka outbound channel adapter by providing template support;
-   Exploring the options for Reactive Streams integration.

#SpringOne 2GX 2015 is around the corner! Book your place at [SpringOne2GX in Washington, DC soon](http://www.springone2gx.com). Early Bird Price expires August 14th! It's simply the best opportunity to find out first hand all that's going on and to provide direct feedback.

#Discounts

-   The Early Bird price tier (June 13th - August 14th) is discounted $150.
-   Register 4 and get the 5th pass free. Contact us with the names of your first 4 registrants for your complimentary pass code (conference admission only).
-   Alumni, contact us for your discount code ($150 off any option).