---
title: Spring Batch 4.0.0.M5 is now available
source: https://spring.io/blog/2017/10/24/spring-batch-4-0-0-m5-is-now-available
scraped: 2026-02-23T16:16:59.312Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Michael Minella |  October 24, 2017 | 1 Comment
---

# Spring Batch 4.0.0.M5 is now available

_Releases | Michael Minella |  October 24, 2017 | 1 Comment_

We are pleased to announce that Spring Batch 4.0.0.M5 is now available via Github and the Pivotal download repository. This release represents the fifth milestone for the Spring Batch 4.0 release. Many thanks to all that contributed to this release.

## [](#whats-new)What's new?

This milestone continues the work laid out in the previous 4.0.0 milestones. Specific updates include:

-   Dependency updates
-   `FunctionItemProcessor`
-   Continued updates to documentation

## [](#dependency-updates)Dependency updates

As the dependency graph of Spring Boot 2 evolves, we have been updating our dependencies to be in line with them. This round includes updates to pull in the GA release of Spring Framework 5 as well as Spring Data Kay. Spring Integration 5.0.0.M7 was also pulled in for this release.

## [](#functionitemprocessor)`FunctionItemProcessor`

With Java 8 and the introduction of functional interfaces (from the `java.util.function` package), it makes sense to review how those interfaces map into Spring Batch. The three key interfaces consist of the `Supplier`, `Function`, and `Consumer`. This release provides an `ItemProcessor` and related capabilities to enable the use of a `Function` as an `ItemProcessor`. An example may look something like this:

```
Copy...
@Bean
public Function<String, String> upperCaseFunction() {
	return o -> o.toUpperCase();
}

@Bean
public Step step1() {
	return this.stepBuilderFactory.get("step1")
				.<String, String>chunk(10)
				.reader(reader())
				.processor(upperCaseFunction())
				.writer(writer())
				.build();
}
...
```

Note that in the previous example, the actual Function implementation has zero Spring Batch dependencies. I can create a processor implementation that does not actually implement `ItemProcessor` and use it as a processor within my step\[1\].

Between now and GA for Spring Batch, we'll begin to look at the other functional interfaces and their applicibility to Spring Batch.

## [](#updates-to-documentation)Updates to documentation

The Spring Batch documentation hasn't had a major overhaul since java configuration became the norm. This release begins the transition of the documentation to address that. You'll see at the top of the following pages a toggle between Java and XML. That toggle will indicate how the examples within that page are configured (via Java based configuration or XML based configuration respectively). The pages this is currently implemented on are:

1.  Spring Batch Introduction
2.  The Domain of Batch
3.  Configuring and Running a Job
4.  Configuring a Step
5.  Readers and Writers

Before our next release we'll finish this migration to allow for ever example within the Spring Batch reference documentation to be illustrated both via Java configuration as well as XML configuration.

## [](#whats-next)What's next?

Looking ahead we'll be wrapping up the documentation updates. We'll also be looking at how the other functional interfaces fit into Spring Batch. Finally we'll pick up the rest of the Spring Framework ecosystem's latest dependencies in preparation for the GA release.

## [](#what-happened-to-spring-batch-400m4)What happened to Spring Batch 4.0.0.M4?

Spring Batch 4.0.0.M4 was released last Friday with an error in it and is not recommend for general consumption. 4.0.0.M5 is the latest milestone recommended to be consumed.

## [](#what-do-you-think)What do you think?

We look forward to your feedback on these new features in [Jira](https://jira.spring.io/browse/BATCH/), [StackOverflow](https://stackoverflow.com/tags/spring-batch), or to me directly via Twitter [@michaelminella](https://twitter.com/michaelminella)!

[Spring Batch Home](https://projects.spring.io/spring-batch/) | [Source on GitHub](https://github.com/spring-projects/spring-batch) | [Reference Documentation](http://docs.spring.io/spring-batch/4.0.x/reference/html/index.html)

\[1\] Note: We are aware of the `ItemProcessorAdapter` that existed and that it provided another way to accomplish using a service not implementing `ItemProcessor` as an `ItemProcessor`.