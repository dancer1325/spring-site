---
title: Spring Batch 5.0.0-M4 available now!
source: https://spring.io/blog/2022/07/20/spring-batch-5-0-0-m4-available-now
scraped: 2026-02-23T10:46:28.345Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mahmoud Ben Hassine |  July 20, 2022 | 0 Comments
---

# Spring Batch 5.0.0-M4 available now!

_Releases | Mahmoud Ben Hassine |  July 20, 2022 | 0 Comments_

On behalf of the team and everyone who has contributed, I am pleased to announce that Spring Batch 5.0.0-M4 is now available from our [milestone repository](https://repo.spring.io/milestone).

This fourth milestone introduces several improvements for Java Records support. It also comes with a number of enhancements, bug fixes, dependency upgrades, and documentation updates. For more details about all the changes, see the [release notes](https://github.com/spring-projects/spring-batch/releases/tag/5.0.0-M4).

### [](#java-records-support-improvement)Java Records Support Improvement

The support for Java records as items in a chunk-oriented step was initially introduced in v4.3, but that support was limited, due to the fact that v4 has Java 8 as a baseline. In Java 8, records were not even in preview yet. That initial support was based on reflection tricks to create Java records and populate them with data, without having access to the `java.lang.Record` API, which was finalized in Java 16.

Now that v5 has Java 17 as a baseline, we have improved records support in Spring Batch by leveraging the `java.lang.Record` API in different parts of the framework. For example, the `FlatFileItemReaderBuilder` is now able to detect if the item type is a record or a regular class and configure the corresponding `FieldSetMapper` implementation accordingly (`RecordFieldSetMapper` for records and `BeanWrapperFieldSetMapper` for regular classes). The goal here is to make the configuration of the required `FieldSetMapper` type *transparent* to the user. The same feature has also been implemented in the `FlatFileItemWriterBuilder`, in order to configure either a `RecordFieldExtractor` or a `BeanWrapperFieldExtractor` based on the item type.

### [](#bug-fixes)Bug fixes

Some bugs cannot be fixed without introducing breaking changes. We take the opportunity of this major release to fix such bugs. In this milestone, the following major bugs were fixed:

-   Unable to read XML data without `spring-tx` in the classpath [#4132](https://github.com/spring-projects/spring-batch/issues/4132)
-   Lost transaction attributes when using a chaining `StepBuilder` [#3686](https://github.com/spring-projects/spring-batch/issues/3686)
-   `ItemReadListener` not being correctly registered after adding a `StepExecutionListener` [#773](https://github.com/spring-projects/spring-batch/issues/773)
-   Cannot subclass `final class com.sun.proxy.$Proxy202` [#793](https://github.com/spring-projects/spring-batch/issues/793)
-   `StepBuilderFactory` only Supports Listener Annotations, not Listener Interfaces [#1098](https://github.com/spring-projects/spring-batch/issues/1098)

This is not an exhaustive list. See the [release notes](https://github.com/spring-projects/spring-batch/releases/tag/5.0.0-M4) for the complete list of bugs that were fixed in this milestone.

### [](#dependency-upgrades)Dependency Upgrades

Major dependencies have been upgraded to the following versions:

-   Upgrade to Spring Framework 6.0.0-M5
-   Upgrade to Spring Data 2022.0.0-M5
-   Upgrade to Spring Integration 6.0.0-M4
-   Upgrade to Spring AMQP 3.0.0-M3
-   Upgrade to Spring for Apache Kafka 3.0.0-M5
-   Upgrade to Micrometer 1.10.0-M3
-   Upgrade to Hibernate 6.1.1.Final

### [](#feedback)Feedback

I would like to thank all contributors who had a role in this release! As we continue our work on Spring Batch 5, we look forward to your feedback on [Github](https://github.com/spring-projects/spring-batch/issues), [Twitter](https://twitter.com/springbatch), and [StackOverflow](https://stackoverflow.com/questions/tagged/spring-batch).

---

[Spring Batch Home](https://spring.io/projects/spring-batch)|[Source on Github](https://github.com/spring-projects/spring-batch)|[Reference documentation](https://docs.spring.io/spring-batch/docs/5.0.0-M4/reference/html/index-single.html)