---
title: Spring Batch 5.1 RC1 is out!
source: https://spring.io/blog/2023/10/18/spring-batch-5-1-rc1-is-out
scraped: 2026-02-23T09:16:11.597Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mahmoud Ben Hassine |  October 18, 2023 | 0 Comments
---

# Spring Batch 5.1 RC1 is out!

_Releases | Mahmoud Ben Hassine |  October 18, 2023 | 0 Comments_

I am pleased to announce that the first release candidate of Spring Batch 5.1 is now available from our milestone repository.

The main theme of this release is improving the getting started experience of our users. This blog post walks you through the main improvements:

-   Updated getting started guides
-   Revamped samples
-   Enhanced issue reporting guide
-   Dependencies upgrades

For the complete list of changes, please check the [release notes](https://github.com/spring-projects/spring-batch/releases/tag/v5.1.0-RC1).

## [](#updated-getting-started-guides)Updated getting started guides

The [Getting started guide](https://spring.io/guides/gs/batch-processing/) has been around for a long time and served well as a showcase of how to use Spring Batch with Spring Boot. However, not all our users are Spring Boot users, and one of the frequent asks is to provide the same getting started experience with plain Spring Batch.

For this reason, we introduced a new [Two minutes tutorial](https://github.com/spring-projects/spring-batch#two-minutes-tutorial) with a step-by-step guide to create a Spring Batch project and implement a simple "Hello world" job. This should improve the getting started experience for non Boot users. That said, the current Spring Boot based guide has been updated to the latest Spring Boot 3 version to show how to use the new features in Spring Batch 5 like Java Records support.

## [](#revamped-samples)Revamped samples

In this release, we have reworked all the code examples in our samples suite. Samples are now organized by feature in separate packages. This makes it easier for you to understand and learn about specific features in Spring Batch. The main `README` file includes a table that shows available samples and the features they cover: [Spring Batch Samples](https://github.com/spring-projects/spring-batch/tree/main/spring-batch-samples).

Moreover, each sample has now its own `README` file that explains the sample in details and provides the instructions to run it. Samples can now be run as unit tests from an IDE or from the command line, to get a "clone and run" experience. With the new structure in place, you are literally two commands away from having a running Spring Batch sample in your local environment!

Finally, most samples are now implemented in two Spring configuration styles: Java configuration style and XML configuration style. This makes it easier for you to compare both configuration styles and help you when migrating XML configurations to Java configurations.

## [](#enhanced-issue-reporting-guide)Enhanced issue reporting guide

Just like having a good user experience when tying out a new project or contributing to an existing project is important, we believe that having a good experience when reporting issues is also important. For this reason, and as part of the "Improving the Getting Started Experience" theme, we have reworked the issue reporting process to provide a step-by-step guide on how to report issues: [Issue Reporting Guide](https://github.com/spring-projects/spring-batch/blob/main/ISSUE_REPORTING.md).

The new guide includes a project template with a minimal complete verifiable example that works with an embedded datasource. This template is a starting point for you to edit as needed in order to reproduce an issue. The guide also provides a Docker + TestContainers template for issues that involve non embeddable databases like PostgreSQL or MySQL.

## [](#dependencies-upgrades)Dependencies upgrades

This milestone release upgrades Spring dependencies to the following versions:

-   Spring Framework 6.1.0-RC1
-   Spring Integration 6.2.0-RC1
-   Spring Data 3.2.0-RC1
-   Spring LDAP 3.2.0-RC1
-   Spring AMQP 3.1.0-RC1
-   Spring Kafka 3.1.0-RC1
-   Micrometer 1.12.0-RC1

## [](#whats-next)What's next?

### [](#share-your-feedback)Share your feedback!

First, I would like to thank all contributors who had a role in this release! You can try Spring Batch 5.1.0-RC1 with Spring Boot 3.2.0-RC1. We are planning to release Spring Batch 5.1 GA later this November 2023.

We look forward to your feedback on [Github Issues](https://github.com/spring-projects/spring-batch/issues), [Github Discussions](https://github.com/spring-projects/spring-batch/discussions), [Twitter](https://twitter.com/springbatch), and [StackOverflow](https://stackoverflow.com/questions/tagged/spring-batch).

### [](#upgrade-to-spring-batch-5)Upgrade to Spring Batch 5

I would like to remind our users that Spring Batch 4.3.x will be out of OSS support on November, 18th 2023. Please consider upgrading your applications to Spring Batch 5 at your earliest convenience. You can find the migration guide to v5 [here](https://github.com/spring-projects/spring-batch/wiki/Spring-Batch-5.0-Migration-Guide). Feel free to reach out to the Spring Batch team on Github if you need help on migrating your existing applications to Spring Batch 5!

[Spring Batch Home](https://spring.io/projects/spring-batch)|[Source on Github](https://github.com/spring-projects/spring-batch)|[Reference documentation](https://docs.spring.io/spring-batch/docs/5.1.0-RC1/reference/html/index.html)