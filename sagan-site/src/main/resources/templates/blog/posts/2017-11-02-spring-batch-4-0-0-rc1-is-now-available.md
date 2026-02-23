---
title: Spring Batch 4.0.0.RC1 is now available
source: https://spring.io/blog/2017/11/02/spring-batch-4-0-0-rc1-is-now-available
scraped: 2026-02-23T16:16:17.033Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Michael Minella |  November 02, 2017 | 0 Comments
---

# Spring Batch 4.0.0.RC1 is now available

_Releases | Michael Minella |  November 02, 2017 | 0 Comments_

We are pleased to announce that Spring Batch 4.0.0.RC1 is now available via Github and the Pivotal download repository. This release represents the first release candidate for the Spring Batch 4.0 release. Many thanks to all that contributed to this release.

## [](#whats-new)What's new?

This release represents the completion of new functionality work on the 4.0.0 line. New features in Spring Batch 4 include:

-   Updated baseline
-   New builder APIs for out of the box components
-   Updated, java configuration friendly, documentation

## [](#updated-baseline)Updated Baseline

Spring Batch 4.0 is taking the opportunity to reset the baseline for the project. With that in mind, we are upgrading the minimum java version to Java 8. While this should be transparent to users, it has allowed us to take advantage of new language features we have not had access to yet.

Along with the java version upgrade, we also have upgraded all the dependencies. That includes requiring Spring Framework 5 and all the pertinent versions of the portfolio that go along with it. Spring Batch 4 has done it's best to keep the dependencies in alignment with Spring Boot 2.

Specific updates for this release is the inclusion of Spring Integration's 5.0.0.RC1 and other minor updates.

## [](#new-builder-apis)New Builder APIs

Since this is the first major version release since Spring Boot was released, this is the first time we've been able to take a moment and look at the java configuration story holistically. While Spring Batch has had java configuration options before Spring Boot, configuring many of the out of the box components required a lot of verbose configuration. An example of this is the `FlatFileItemReader`. Configuring this reader previously took dozens of lines of XML or java configuration and can now be configured in 10 or so lines. This release includes builders for all of the `ItemReader` and `ItemWriter` implementations provided by Spring Batch.

## [](#updated-reference-documentation)Updated Reference Documentation

Spring Batch's documentation has historically been very XML focused in it's examples of configuration. In the Spring Batch 4.0 release we have revamped the documentation from the ground up. At the top of each page in the reference documentation is a toggle for java or XML. This toggle indicates what form of configuration is presented through out the page. If java is selected, all the examples will be presented using java configuration. If XML is selected, XML based examples are displayed. We hope this will help users to better navigate the configuration options within the framework.

## [](#whats-next)What's next?

As mentioned before, this release represents the final release with new functionality in it for the 4.0.0 release. From 4.0.0.RC1 to when we go GA we'll be working on bugs and tweaking the documentation further to provide a better overall experience.

## [](#what-do-you-think)What do you think?

We look forward to your feedback on these new features in [Jira](https://jira.spring.io/browse/BATCH/), [StackOverflow](https://stackoverflow.com/tags/spring-batch), or to me directly via Twitter [@michaelminella](https://twitter.com/michaelminella)!

[Spring Batch Home](https://projects.spring.io/spring-batch/) | [Source on GitHub](https://github.com/spring-projects/spring-batch) | [Reference Documentation](http://docs.spring.io/spring-batch/4.0.x/reference/html/index.html)