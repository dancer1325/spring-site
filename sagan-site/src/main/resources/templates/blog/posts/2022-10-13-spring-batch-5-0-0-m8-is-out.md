---
title: Spring Batch 5.0.0-M8 is out!
source: https://spring.io/blog/2022/10/13/spring-batch-5-0-0-m8-is-out
scraped: 2026-02-23T10:38:07.292Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mahmoud Ben Hassine |  October 13, 2022 | 0 Comments
---

# Spring Batch 5.0.0-M8 is out!

_Releases | Mahmoud Ben Hassine |  October 13, 2022 | 0 Comments_

On behalf of the team and all contributors, I am pleased to announce that Spring Batch `5.0.0-M8` is now available from our [milestone repository](https://repo.spring.io/milestone).

In this milestone, we introduced two main changes:

-   New default execution context serialization format
-   SystemCommandTasklet enhancements

This blog post walks through these two major changes in details. For the complete list of changes, please check the [release notes](https://github.com/spring-projects/spring-batch/releases/tag/5.0.0-M8).

## [](#new-default-execution-context-serialization-format)New default execution context serialization format

In this milestone release, the `DefaultExecutionContextSerializer` was updated to serialize/deserialize the context to/from Base64.

Moreover, the default `ExecutionContextSerializer` configured by `@EnableBatchProcessing` or `DefaultBatchConfiguration` was changed from `JacksonExecutionContextStringSerializer` to `DefaultExecutionContextSerializer`. The dependency to Jackson was made optional. In order to use the `JacksonExecutionContextStringSerializer`, `jackson-core` should be added to the classpath.

## [](#systemcommandtasklet-enhancements)SystemCommandTasklet enhancements

The `SystemCommandTasklet` has been revisited in this release and was changed as follows:

-   A new strategy interface named `CommandRunner` was introduced in order to decouple the command execution from the tasklet execution. The default implementation is the `JvmCommandRunner` which uses the `java.lang.Runtime#exec` API to run system commands. This interface can be implemented to use any other API to run system commands.
    
-   The method that runs the command now accepts an array of `String`s representing the command and its arguments. There is no need to tokenize the command or do any pre-processing anymore. This change makes the API more intuitive, and less prone to errors.
    

## [](#feedback)Feedback

I would like to thank all contributors who had a role in this release! As we continue our work on Spring Batch 5, we look forward to your feedback on [Github](https://github.com/spring-projects/spring-batch/issues), [Twitter](https://twitter.com/springbatch) and [StackOverflow](https://stackoverflow.com/questions/tagged/spring-batch).

---

[Spring Batch Home](https://spring.io/projects/spring-batch)|[Source on Github](https://github.com/spring-projects/spring-batch)|[Reference documentation](https://docs.spring.io/spring-batch/docs/5.0.0-M8/reference/html/index-single.html)