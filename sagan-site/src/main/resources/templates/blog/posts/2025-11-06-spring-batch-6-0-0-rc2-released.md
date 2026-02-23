---
title: Spring Batch 6.0.0-RC2 available now!
source: https://spring.io/blog/2025/11/06/spring-batch-6-0-0-rc2-released
scraped: 2026-02-23T07:22:57.045Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mahmoud Ben Hassine |  November 06, 2025 | 0 Comments
---

# Spring Batch 6.0.0-RC2 available now!

_Releases | Mahmoud Ben Hassine |  November 06, 2025 | 0 Comments_

I am pleased to announce that Spring Batch `6.0.0-RC2` is now available from Maven Central!

## [](#whats-new-in-spring-batch-600-rc2)What's new in Spring Batch 6.0.0-RC2?

This second release candidate introduces a long-awaited feature which is the use of contextual lambda expressions to configure batch artefacts. This new style of configuration provides a more concise and readable way to define item readers and writers.

For example, instead of using the traditional builder pattern like in the following snippet to define a delimited file reader:

```java
Copyvar reader = new FlatFileItemReaderBuilder()
    .resource(...)
    .delimited()
    .delimiter(",")
    .quoteCharacter('"')
    ...
    .build();
```

You can now use a lambda expression to configure the delimited options like this:

```java
Copyvar reader = new FlatFileItemReaderBuilder()
    .resource(...)
    .delimited(config -> config.delimiter(',').quoteCharcter( '"' ))
    ...
    .build();
```

This release also comes with several bug fixes, performance improvements and dependency upgrades.

For the complete list of changes, please check the [release notes](https://github.com/spring-projects/spring-batch/releases/tag/v6.0.0-RC2).

## [](#feedback)Feedback

I would like to thank all contributors who had a role in this release! As we continue our work on Spring Batch 6, we look forward to your feedback on [Github Issues](https://github.com/spring-projects/spring-batch/issues), [Github Discussions](https://github.com/spring-projects/spring-batch/discussions) and [X](https://twitter.com/springbatch).

---

[Spring Batch Home](https://spring.io/projects/spring-batch)|[Source on Github](https://github.com/spring-projects/spring-batch)|[Reference documentation](https://docs.spring.io/spring-batch/reference/6.0/index.html)