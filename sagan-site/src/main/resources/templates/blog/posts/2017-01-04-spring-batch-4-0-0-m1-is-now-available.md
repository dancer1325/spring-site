---
title: Spring Batch 4.0.0.M1 is now available
source: https://spring.io/blog/2017/01/04/spring-batch-4-0-0-m1-is-now-available
scraped: 2026-02-23T18:52:04.315Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Michael Minella |  January 04, 2017 | 14 Comments
---

# Spring Batch 4.0.0.M1 is now available

_Releases | Michael Minella |  January 04, 2017 | 14 Comments_

We are pleased to announce that Spring Batch 4.0.0.M1 is now available via Github and the Pivotal download repository. This release represents the first milestone for the Spring Batch 4.0 release. Many thanks to all of those who contributed to this release.

## [](#whats-new)What's new?

We have taken this opportunity to look at Spring Batch from a new light in a few areas. Specifically:

-   Java baseline
-   Dependency baseline
-   Java configuration

### [](#java-baseline)Java Baseline

Spring Batch has historically followed the baseline of Spring Framework with the intent of providing the best interoperability between Spring Batch and Spring Framework versions as possible. Spring Batch 4.0 is taking this opportunity to upgrade to Spring Framework 5 as the minimum required version. With this, Java 8 will be required for Spring Batch 4. If you've been using Spring Batch with Java 8 already, this should be a pretty transparent as Spring Batch has had a solid Java 8 story for years now. Doing things like the following has been supported as long as Java 8 has been around:

```
Copy@Bean
public JdbcCursorItemReader<Foo> reader() {
	JdbcCursorItemReader<Foo> reader = new JdbcCursorItemReader<>();

	reader.setDataSource(this.dataSource);
	reader.setName("fooReader");
	reader.setSql("SELECT * FROM FOO ORDER BY FIRST");
	reader.setRowMapper((rs, rowNum) -> {
		Foo foo = new Foo();

		foo.setFirst(rs.getInt("FIRST"));
		foo.setFirst(rs.getString("SECOND"));
		foo.setFirst(rs.getString("THIRD"));

		return foo;
	});

	return reader;
}
```

Just like Spring Framework 5's re-baselining on Java 8, this is has a larger impact internally to the framework. Now we, the developers and contributors of the framework, will be able to utilize the interesting features of Java 8 that you've been using all along.

### [](#dependencies-baseline)Dependencies Baseline

Along with the re-baselining of Java in accordance with Spring Framework, Spring Batch 4 is also taking a full look at all dependencies and upgrading them to the latest versions. This is as much to keep up with the latest as it is for us to be able to provide support for the functionality we provide. We need to be dependent upon supported versions of those dependencies so we can have bugs addressed. Because of this, we need to keep up with their currently supported versions. An example of this is Hibernate. Spring Batch 3.x supported Hibernate back to 4.2.x. However, if an issue with Hibernate 4.2.x was found, it wouldn't be fixed there. It JBoss would only fix it in 5.2. Because of that, we need to stay up to date. Spring Framework 5 has taken a full review of all it's dependencies. Spring Batch 4 updates all it's dependencies to be in alignment with Spring Framework.

### [](#java-configuration)Java Configuration

Java configuration to Spring Batch is not new. Spring Batch 2.2 had the `@EnableBatchProcessing` annotation as well as the related builders. However, there was still much to be desired from the java configuration story. For example, using what was available in Spring Batch 3.0.7, the configuration of a `FlatFileItemReader` may look something like the following:

```
Copy@Bean
public FlatFileItemReader reader(Resource resource) throws Exception {
	FlatFileItemReader<Foo> reader = new FlatFileItemReader<>();

	reader.setName("fooReader");
	reader.setResource(resource);

	BeanWrapperFieldSetMapper<Foo> fieldSetMapper = 
		new BeanWrapperFieldSetMapper<>();
	fieldSetMapper.setTargetType(Foo.class);
	fieldSetMapper.afterPropertiesSet();

	DelimitedLineTokenizer tokenizer = new DelimitedLineTokenizer();
	tokenizer.setNames(String [] {"first", "second", "third"});
	tokenizer.afterProperitesSet();

	DefaultLineMapper lineMapper = new DefaultLineMapper();
	lineMapper.setLineTokenizer(tokenizer);
	lineMapper.setFieldSetMapper(fieldSetMapper);

	reader.setLineMapper(lineMapper);
}
```

However, in Spring Batch 4, we are introducing a collection of builders that will simplify the building of the provided readers and writers. The above example using Spring Batch 3.0.x translates into the following using the builders in Spring Batch 4:

```
Copy@Bean
public FlatFileItemReader reader(Resource resource) {
	return new FlatFileItemReaderBuilder<Foo>()
		.name("fooReader")
		.resource(resource)
		.delimited()
		.names(new String[] {"first", "second", "third"})
		.targetType(Foo.class)
		.build();
}
```

As of this milestone, builders for the `FlatFileItemReader`, `FlatFileItemWriter`, `JdbcCursorItemReader`, and the `JdbcBatchItemWriter` are available. We will address the other item readers and item writers prior to Spring Batch 4 going generally available.

## [](#whats-next)What's next?

Looking ahead, we plan on implementing builders for the other Spring Batch readers and writers. We also plan on taking a full look at our documentation. The documentation currently takes what we'd consider an "XML first" approach. For the GA release of Spring Batch, we intend on refactoring the documentation to be more "java first" in it's approach to provide better insight into how to configure batch applications using java configuration. Look out for further milestones and Spring Batch 4 to be generally available shortly after Spring Framework 5 goes GA.

## [](#what-do-you-think)What do you think?

We look forward to your feedback on these new features in [Jira](https://jira.spring.io/browse/BATCH/), [StackOverflow](https://stackoverflow.com/tags/spring-batch), or to me directly via Twitter [@michaelminella](https://twitter.com/michaelminella)!

[Spring Batch Home](https://projects.spring.io/spring-batch/) | [Source on GitHub](https://github.com/spring-projects/spring-batch) | [Reference Documentation](http://docs.spring.io/spring-batch/4.0.x/reference/html/index.html)