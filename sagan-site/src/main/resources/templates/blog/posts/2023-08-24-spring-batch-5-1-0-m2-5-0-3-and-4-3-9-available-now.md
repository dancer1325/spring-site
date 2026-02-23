---
title: Spring Batch 5.1.0-M2, 5.0.3 and 4.3.9 available now!
source: https://spring.io/blog/2023/08/24/spring-batch-5-1-0-m2-5-0-3-and-4-3-9-available-now
scraped: 2026-02-23T09:27:34.600Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mahmoud Ben Hassine |  August 24, 2023 | 0 Comments
---

# Spring Batch 5.1.0-M2, 5.0.3 and 4.3.9 available now!

_Releases | Mahmoud Ben Hassine |  August 24, 2023 | 0 Comments_

I am pleased to announce that Spring Batch 5.1.0-M2, 5.0.3 and 4.3.9 are available now! Versions 5.0.3 and 4.3.9 are patch releases that come with a number of bug fixes, improvements and dependencies updates. You can find the release notes of each version here: [5.0.3](https://github.com/spring-projects/spring-batch/releases/tag/v5.0.3) and [4.3.9](https://github.com/spring-projects/spring-batch/releases/tag/v4.3.9).

This blog post is mainly about the new milestone of Spring Batch 5.1, which introduces the following main features:

-   Dependencies upgrade
-   New cursor-based `MongoItemReader`
-   Bulk inserts support in `MongoItemWriter`

For the complete list of changes, please check the [release notes](https://github.com/spring-projects/spring-batch/releases/tag/v5.1.0-M2).

## [](#dependencies-upgrade)Dependencies upgrade

This milestone release upgrades Spring dependencies to the following versions:

-   Spring Framework 6.1.0-M4
-   Spring Integration 6.2.0-M2
-   Spring Data 3.2.0-M2
-   Spring LDAP 3.2.0-M2
-   Micrometer 1.12.0-M2

## [](#new-cursor-based-mongoitemreader)New cursor-based MongoItemReader

Up to version 5.0, the `MongoItemReader` provided by Spring Batch used pagination, which is based on MongoDB's `skip` operation. While this works well for small/medium data sets, it starts to perform poorly with large data sets.

This release introduces the `MongoCursorItemReader`, a new cursor-based item reader for MongoDB. This implementation uses cursors instead paging to read data from MongoDB, which improves the performance of reads on large collections.

For consistency with other cursor/paging readers, the current `MongoItemReader` has been renamed to `MongoPagingItemReader`.

## [](#bulk-inserts-support-in-mongoitemwriter)Bulk inserts support in MongoItemWriter

Up to version 5.0, the `MongoItemWriter` supported two operations: `upsert` and `delete`. While the `upsert` operation works well for both inserts and updates, it does not perform well for items that are known to be new in the target collection.

Similar to the `persist` and `merge` operations in the `JpaItemWriter`, this release adds a new operation named `insert` in the `MongoItemWriter`, which is designed for bulk inserts. This new option performs better than `upsert` for new items as it does not require an additional lookup to check if items already exist in the target collection.

## [](#whats-next)What's next?

### [](#share-your-feedback)Share your feedback!

First, I would like to thank all contributors who had a role in these releases! You can try Spring Batch 5.1.0-M2 with Spring Boot 3.2.0-M2. We are planning to release Spring Batch 5.1 GA later this November 2023.

We look forward to your feedback on [Github Issues](https://github.com/spring-projects/spring-batch/issues), [Github Discussions](https://github.com/spring-projects/spring-batch/discussions), [Twitter](https://twitter.com/springbatch), and [StackOverflow](https://stackoverflow.com/questions/tagged/spring-batch).

### [](#upgrade-to-spring-batch-5)Upgrade to Spring Batch 5

I would like to remind our users that Spring Batch 4.3.x will be out of OSS support on [November, 18th 2023](https://spring.io/projects/spring-batch#support). Please consider upgrading your applications to Spring Batch 5 at your earliest convenience. You can find the migration guide to v5 [here](https://github.com/spring-projects/spring-batch/wiki/Spring-Batch-5.0-Migration-Guide).

Feel free to reach out to the Spring Batch team on Github if you need help on migrating your existing applications to Spring Batch 5!

### [](#checkout-the-new-spring-batch-course-on-spring-academy)Checkout the new Spring Batch course on Spring Academy

Earlier this week, we have launched a new Spring Batch course on Spring Academy! In this course, you will learn how to build robust and fault-tolerant batch applications with Spring Batch and Spring Boot! Check it out on Spring Academy: [Building a Batch Application with Spring Batch](https://spring.academy/courses/building-a-batch-application-with-spring-batch).

[Spring Batch Home](https://spring.io/projects/spring-batch)|[Source on Github](https://github.com/spring-projects/spring-batch)|[Reference documentation](https://docs.spring.io/spring-batch/docs/5.1.0-M2/reference/html/index.html)