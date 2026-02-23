---
title: Spring Batch 4.0.0.M2 is now available
source: https://spring.io/blog/2017/05/15/spring-batch-4-0-0-m2-is-now-available
scraped: 2026-02-23T16:32:10.146Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Michael Minella |  May 15, 2017 | 6 Comments
---

# Spring Batch 4.0.0.M2 is now available

_Releases | Michael Minella |  May 15, 2017 | 6 Comments_

We are pleased to announce that Spring Batch 4.0.0.M2 is now available via Github and the Pivotal download repository. This release represents the second milestone for the Spring Batch 4.0 release. Many thanks to all that contributed to this release.

## [](#whats-new)What's new?

This milestone continues the work laid out in Spring Batch 4.0.0.M1. Specific updates include:

-   Dependency updates
-   Continued java configuration improvements

## [](#dependency-updates)Dependency updates

Spring Batch 4 will be the version included in [Spring Boot 2](http://projects.spring.io/spring-boot/) so we're taking this time to syncronize our dependencies. With that, this release supports upgrades to the latest milestones of the [Spring Data Kay](http://projects.spring.io/spring-data/) release train and [Spring Integration 5](http://projects.spring.io/spring-integration/).

Along with the cleanup of dependencies, we also did some cleanup around deprications. Support for iBatis based readers and writers has been removed in favor of the native support provided by MyBatis.

## [](#java-configuration)Java Configuration

Continuing the story of improving the java configuration capabilities started with milestone one, 4.0.0.M2 includes the following builders:

-   `StaxEventItemReaderBuilder`
-   `StaxEventItemWriterBuilder`
-   `JdbcPagingItemReaderBuilder`
-   `HibernateCusrorItemReaderBuilder`
-   `HibernateItemWriterBuilder`
-   `HibernatePagingItemReaderBuilder`
-   `JpaPagingItemReaderBuilder`
-   `SingleItemPeekableItemReaderBuilder`
-   `SimpleMailMessageItemWriterBuilder`
-   `SynchronizedItemStreamReaderBuilder`
-   `CompositeItemWriterBuilder`
-   `ClassifierCompositeItemWriterBuilder`
-   `JmsItemReaderBuilder`
-   `JmsItemWriterBuilder`
-   `MultiResourceItemReaderBuilder`
-   `MultiResourceItemWriterBuilder`

All 16 of those are now available. And we still aren't done with all of the `ItemReader` and `ItemWriter` implementations! We'll wrap them up in time for the next milestone.

## [](#whats-next)What's next?

Looking to the next release, we plan on wrapping up the builders for this release. We'll also be updating the documenation to be more java config friendly. Look for future milestones in the coming months with Spring Batch 4 going GA prior to Spring Boot 2.

## [](#what-do-you-think)What do you think?

We look forward to your feedback on these new features in [Jira](https://jira.spring.io/browse/BATCH/), [StackOverflow](https://stackoverflow.com/tags/spring-batch), or to me directly via Twitter [@michaelminella](https://twitter.com/michaelminella)!

[Spring Batch Home](https://projects.spring.io/spring-batch/) | [Source on GitHub](https://github.com/spring-projects/spring-batch) | [Reference Documentation](http://docs.spring.io/spring-batch/4.0.x/reference/html/index.html)