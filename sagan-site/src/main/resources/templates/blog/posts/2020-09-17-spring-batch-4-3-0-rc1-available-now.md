---
title: Spring Batch 4.3.0-RC1 available now!
source: https://spring.io/blog/2020/09/17/spring-batch-4-3-0-rc1-available-now
scraped: 2026-02-23T13:47:32.403Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mahmoud Ben Hassine |  September 17, 2020 | 0 Comments
---

# Spring Batch 4.3.0-RC1 available now!

_Releases | Mahmoud Ben Hassine |  September 17, 2020 | 0 Comments_

I am pleased to announce that Spring Batch 4.3.0-RC1 is now available from our [milestone repository](https://repo.spring.io/milestone/).

## [](#whats-new)What’s New?

This release comes with a number of new features that you can find in the [release notes](https://github.com/spring-projects/spring-batch/releases/tag/4.3.0-RC1), but here are the major highlights:

### [](#1-graalvm-support)1\. GraalVM Support

A lot of work has already been done in Spring Framework to support running some types of Spring applications on GraalVM. In this release, we made changes in Spring Batch to correctly run Batch applications on GraalVM as well.

The support is still experimental, so we encourage you to give the release a try and share your feedback.

### [](#2-java-records-support)2\. Java Records Support

Records have been introduced in Java 14 and reviewed in Java 15, which was released a few days ago. In this release, we added support for using Java records as items in chunk-oriented steps. The following example shows how to use records to read data from a flat file. Consider the following `persons.csv` file and `Person` record:

```
Copyid,name
1,William Shakespeare
2,Anne Hathaway
```

```
Copypublic record Person(int id, String name) { }
```

The following `FlatFileItemReader` bean definition enables reading data into record items:

```
Copy@Bean
public FlatFileItemReader<Person> itemReader() {
	return new FlatFileItemReaderBuilder<Person>()
			.name("personReader")
			.resource(new FileSystemResource("persons.csv"))
			.delimited()
			.names("id", "name")
			.fieldSetMapper(new RecordFieldSetMapper<>(Person.class))
			.build();
}
```

The key component in this example is the newly added `RecordFieldSetMapper` to support data mapping for records from flat files. You can do data mapping from relational databases by using the `DataClassRowMapper` from Spring Framework.

### [](#3-a-new-jpacursoritemreader-implementation)3\. A New `JpaCursorItemReader` Implementation

JPA 2.2 added the ability to stream results as a cursor instead of only paging. In this release, we introduced a new JPA item reader that uses this feature to stream results in a cursor-based fashion similar to the `JdbcCursorItemReader` and `HibernateCursorItemReader`.

## [](#dependency-upgrades)Dependency Upgrades

This release upgrades Spring projects dependencies to the following versions:

-   Spring Framework 5.3.0-RC1
-   Spring Data 2020.0.0-RC1
-   Spring Integration 5.4.0-M3
-   Spring AMQP 2.3.0-M3
-   Spring for Apache Kafka 2.6.1

You can consume Spring Batch v4.3.0-RC1 with Spring Boot 2.4.0-M3.

## [](#api-deprecation)API Deprecation

As we announced earlier this year, version 4.3 will be the last feature release of the version 4 line. In this release, we took the opportunity to deprecate some APIs for removal in the next major version, version 5.

The most notable change in this release is the deprecation of the Map-based `JobRepository` and `JobExplorer` implementations. You can find more details about the motivations behind this decision in issue [#3780](https://github.com/spring-projects/spring-batch/issues/3780).

## [](#feedback-and-contributions)Feedback and Contributions

I would like to thank all contributors who made this release possible! We look forward to your feedback on this milestone on [Twitter](https://twitter.com/springbatch), [StackOverflow](https://stackoverflow.com/questions/tagged/spring-batch), and [Github](https://github.com/spring-projects/spring-batch/issues/new/choose).

[Spring Batch Home](https://spring.io/projects/spring-batch) | [Source on GitHub](https://github.com/spring-projects/spring-batch) | [Reference Documentation](https://docs.spring.io/spring-batch/docs/4.3.0-RC1/reference/pdf/spring-batch-reference.pdf)