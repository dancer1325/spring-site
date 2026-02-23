---
title: Spring Batch 4.0.0.M3 is now available
source: https://spring.io/blog/2017/07/26/spring-batch-4-0-0-m3-is-now-available
scraped: 2026-02-23T16:25:51.009Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Michael Minella |  July 26, 2017 | 0 Comments
---

# Spring Batch 4.0.0.M3 is now available

_Releases | Michael Minella |  July 26, 2017 | 0 Comments_

We are pleased to announce that Spring Batch 4.0.0.M3 is now available via Github and the Pivotal download repository. This release represents the third milestone for the Spring Batch 4.0 release. Many thanks to all that contributed to this release.

## [](#whats-new)What's new?

This milestone continues the work laid out in the previous 4.0.0 milestones. Specific updates include:

-   Dependency updates
-   Continued java configuration improvements
-   Intial updates to documentation

## [](#dependency-updates)Dependency updates

As the dependency graph of Spring Boot 2 evolves, we have been updating our dependencies to be in line with them. This includes the updating of Spring Data Kay and Spring Integraiton 5 dependencies as well as removing support for Log4J 1.x in favor of the newer 2.x line.

## [](#java-configuration)Java Configuration

Continuing the story of improving the java configuration capabilities in the previous milestones, all `ItemReader` and `ItemWriter` implementations provided by Spring Batch now have builder implementations to simplify their configuration. These new builders allow you to take configuration that looked like this in XML:

```
Copy<bean id="mongoItemReader" 
	class="org.springframework.batch.item.data.MongoItemReader" 
	scope="step">
	<property name="name" value="mongoItemReader" />
	<property name="template" ref="mongoTemplate" />
	<property name="targetType" value="String" />
	<property name="query"
		value="{ }" />
	<property name="sort">
		<util:map id="sort">
			<entry key="id" value="DESC" />
		</util:map>
	</property>
</bean>
```

Or this whith the old java config:

```
Copy@Bean
public MongoItemReader<String> mongoItemReader() {
	MongoItemReader<String> reader = 
		new MongoItemReader<>();

	reader.setName("mongoItemReader")
	reader.setTemplate(this.template);
	reader.setTargetType(String.class);
	reader.setQuery("{ }");
	reader.setSort(this.sortOptions);

	return reader;
}
```

To this using our new 4.0 builders:

```
Copy@Bean
public MongoItemReader<String> mongoItemReader() {
	return new MongoItemReaderBuilder<String>().template(this.template)
			.targetType(String.class)
			.query("{ }")
			.sorts(this.sortOptions)
			.name("mongoItemReader")
			.build();
}
```

## [](#updates-to-documentation)Updates to documentation

One of the major themes for the Spring Batch 4 release is modernizing the reference documentation. This release includes the first step in that modernization effort in that we moved from [docbooks to AsciiDoc](http://docs.spring.io/spring-batch/4.0.x/reference/html/index.html). In the next milestone we'll begin to focus on making java config a first class citizen in the Spring Batch reference documentation.

## [](#whats-next)What's next?

Looking out to the next milestone, we'll continue to pick up the milestones and releases of our related Spring dependencies (Spring Framework 5, Spring Data Kay, and Spring Integration 5). We'll also begin to deep dive into the effort around making the documentation "java config first".

## [](#spring-batch-admin-end-of-life)Spring Batch Admin End of Life

We want to take a minute today to also announce that the [Spring Batch Admin](http://docs.spring.io/spring-batch-admin/) project will be moving into the Spring Attic with an end of life date to be December 31, 2017. The functionality of Spring Batch Admin has been mostly duplicated and expanded upon via [Spring Cloud Data Flow](http://cloud.spring.io/spring-cloud-dataflow/) and we encourage all users to migrate to that going forward. Documentation on that migration process can be found in the Spring Batch Admin Github repository [here](https://github.com/spring-projects/spring-batch-admin/blob/master/MIGRATION.md).

## [](#what-do-you-think)What do you think?

We look forward to your feedback on these new features in [Jira](https://jira.spring.io/browse/BATCH/), [StackOverflow](https://stackoverflow.com/tags/spring-batch), or to me directly via Twitter [@michaelminella](https://twitter.com/michaelminella)!

[Spring Batch Home](https://projects.spring.io/spring-batch/) | [Source on GitHub](https://github.com/spring-projects/spring-batch) | [Reference Documentation](http://docs.spring.io/spring-batch/4.0.x/reference/html/index.html)