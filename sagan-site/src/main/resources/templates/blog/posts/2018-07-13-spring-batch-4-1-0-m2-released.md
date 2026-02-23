---
title: Spring Batch 4.1.0.M2 Released
source: https://spring.io/blog/2018/07/13/spring-batch-4-1-0-m2-released
scraped: 2026-02-23T15:19:24.655Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mahmoud Ben Hassine |  July 13, 2018 | 0 Comments
---

# Spring Batch 4.1.0.M2 Released

_Releases | Mahmoud Ben Hassine |  July 13, 2018 | 0 Comments_

We are pleased to announce that Spring Batch 4.1.0.M2 is now available on Github and the Pivotal download repository. Many thanks to all of those who contributed to this release!

# [](#whats-new)What’s new?

Here are the highlights of this release:

-   Simplify remote partitioning
-   Add a new JSON item writer
-   Add support for validating items with the Bean Validation API

## [](#simplify-remote-partitioning)Simplify remote partitioning

In the 4.1.0.M1 release, we created new APIs to simplify the configuration of a remote chunking step. In this milestone, we continued this effort to simplify remote partitioning through two new builders: `RemotePartitioningMasterStepBuilder` and `RemotePartitioningWorkerStepBuilder`.

These builders can be autowired in your configuration class if the `@EnableBatchIntegration` is present as shown in the following example:

```java
Copy@Configuration
@EnableBatchProcessing
@EnableBatchIntegration
public class RemotePartitioningAppConfig {

   @Autowired
   private RemotePartitioningMasterStepBuilderFactory masterStepBuilderFactory;

   @Autowired
   private RemotePartitioningWorkerStepBuilderFactory workerStepBuilderFactory;

   @Bean
   public Step masterStep() {
            return this.masterStepBuilderFactory
               .get("masterStep")
               .partitioner("workerStep", partitioner())
               .gridSize(10)
               .outputChannel(outgoingRequestsToWorkers())
               .inputChannel(incomingRepliesFromWorkers())
               .build();
   }

   @Bean
   public Step workerStep() {
            return this.workerStepBuilderFactory
               .get("workerStep")
               .inputChannel(incomingRequestsFromMaster())
               .outputChannel(outgoingRepliesToMaster())
               .chunk(100)
               .reader(itemReader())
               .writer(itemWriter())
               .build();
   }

   // Middleware beans setup omitted
}
```

These new builders take care of the heavy lifting of configuring infrastructure beans. You can now easily configure a master step and a worker step of a remotely partitioned job.

## [](#add-a-new-json-item-writer)Add a new JSON item writer

In the previous milestone, we created a new item reader to support reading JSON data. In this milestone, we added the `JsonFileItemWriter` and supporting builder to support writing JSON data.

## [](#bean-validation-api-support)Bean Validation API support

This release comes with a new `ValidatingItemProcessor` called `BeanValidatingItemProcessor` that is able to validate items annotated with the Bean Validation API annotations. This new component will adapt the infrastructure provided by Spring Framework or Spring Boot for Bean Validation API support to an `ItemProcessor` useful within the step of a Spring Batch job..

For a complete list of changes, please check the [change log](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=10090&version=16852). We look forward to hearing your feedback on this milestone! Please feel free to ping `@michaelminella`, `@_benas_`, or `@cppwfs` on Twitter or ask your question on [StackOverflow](https://stackoverflow.com/questions/tagged/spring-batch) or [Gitter](https://gitter.im/spring-batch/Lobby). If you find any issue, please open a ticket on [Jira](https://jira.spring.io/projects/BATCH).

[Spring Batch Home](https://spring.io/projects/spring-batch) | [Source on GitHub](https://github.com/spring-projects/spring-batch) | [Reference Documentation](https://docs.spring.io/spring-batch/4.1.x/reference/html/index.html)