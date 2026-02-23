---
title: Spring Batch 4.1.0.M3 Released!
source: https://spring.io/blog/2018/08/31/spring-batch-4-1-0-m3-released
scraped: 2026-02-23T15:15:27.869Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mahmoud Ben Hassine |  August 31, 2018 | 0 Comments
---

# Spring Batch 4.1.0.M3 Released!

_Releases | Mahmoud Ben Hassine |  August 31, 2018 | 0 Comments_

We are pleased to announce that Spring Batch 4.1.0.M3 is now available on Github and the Pivotal download repository. What's new in this milestone? Here is a list of new features and enhancements:

# [](#jsr-305-support)JSR-305 support

The main theme of this milestone is adding support for JSR-305 annotations. We leveraged Spring Framework's [Null-safety](https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html#null-safety) annotations and added them where appropriate in all public APIs of Spring Batch.

These annotations will not only enforce null-safety when using Spring Batch APIs, but also can be used by IDEs to provide useful information related to nullability. For example, if a user wants to implement the `ItemReader` interface, any IDE supporting JSR-305 annotations will generate something like:

```java
Copypublic class MyItemReader implements ItemReader<String> {

	@Nullable
	public String read() throws Exception {
		return null;
	}

}
```

The `@Nullable` annotation present on the `read` method makes it clear that the contract of this method says it may return `null`. This enforces what is said in its Javadoc, that the `read` method should return `null` when the data source is exhausted.

# [](#flatfileitemwriter-builder-enhancements)FlatFileItemWriter Builder enhancements

Another small feature added in this release is a simplification of the configuration for the writing of a flat file. Specifically, these updates simplify the configuration of both a delimited and fixed width file. Below is an example of before and after the change.

```
Copy// Before
@Bean
public FlatFileItemWriter<Item> itemWriter(Resource resource) {
	BeanWrapperFieldExtractor<Item> fieldExtractor = 
            new BeanWrapperFieldExtractor<Item>();
	fieldExtractor.setNames(new String[] {"field1", "field2", "field3"});
	fieldExtractor.afterPropertiesSet();
	
	DelimitedLineAggregator aggregator = new DelimitedLineAggregator();
	aggregator.setFieldExtractor(fieldExtractor);
	aggregator.setDelimiter(";");

	return new FlatFileItemWriterBuilder<Item>()
			.name("itemWriter")
			.resource(resource)
			.lineAggregator(aggregator)
			.build();
}

// After
@Bean
public FlatFileItemWriter<Item> itemWriter(Resource resource) {
	return new FlatFileItemWriterBuilder<Item>()
			.name("itemWriter")
			.resource(resource)
			.delimited()
			.delimiter(";")
			.names(new String[] {"field1", "field2", "field3"})
			.build();
}
```

# [](#other-improvements)Other improvements

This milestone also includes other improvements like:

-   Adding the ability to provide a custom transaction manager by subclassing `DefaultBatchConfigurer`
-   Fixing minor inconsistencies in some method names

# [](#feedback)Feedback

For a complete list of changes, please check the [change log](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=10090&version=16889). This is the last milestone before the first RC! So we really look forward to hearing your feedback on this milestone! Please feel free to ping [@michaelminella](https://www.twitter.com/michaelminella) or [@*benas*](https://www.twitter.com/_benas_) on Twitter or ask your question on [StackOverflow](https://stackoverflow.com/questions/tagged/spring-batch) or [Gitter](https://gitter.im/spring-batch/Lobby). If you find any issue, please open a ticket on [Jira](https://jira.spring.io/projects/BATCH/summary).

[Spring Batch Home](https://spring.io/projects/spring-batch) | [Source on GitHub](https://github.com/spring-projects/spring-batch) | [Reference Documentation](https://docs.spring.io/spring-batch/4.1.x/reference/html/index.html)