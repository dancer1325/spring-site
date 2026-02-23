---
title: Spring Batch 4.1.0.M1 Released
source: https://spring.io/blog/2018/05/31/spring-batch-4-1-0-m1-released
scraped: 2026-02-23T15:23:25.688Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mahmoud Ben Hassine |  May 31, 2018 | 2 Comments
---

# Spring Batch 4.1.0.M1 Released

_Releases | Mahmoud Ben Hassine |  May 31, 2018 | 2 Comments_

We are pleased to announce that Spring Batch 4.1.0.M1 is now available on Github and the Pivotal download repository. Many thanks to all of those who contributed to this release!

# [](#whats-new)What's new?

Here are the highlights of this release:

-   Simplify testing
-   Simplify remote chunking
-   Add a new JSON item reader

## [](#simplify-testing)Simplify Testing

Spring Batch provides some nice utility classes (such as the `JobLauncherTestUtils` and `JobRepositoryTestUtils`) and test execution listeners (`StepScopeTestExecutionListener` and `JobScopeTestExecutionListener`) to test batch components. However, in order to use these utilities, you must configure them explicitly, as shown in the following example:

```java
Copy@RunWith(SpringRunner.class)
@ContextConfiguration(classes = {JobConfiguration.class, JobTest.TestConfiguration.class})
@TestExecutionListeners(listeners = {StepScopeTestExecutionListener.class, JobScopeTestExecutionListener.class})
public class JobTest {

   @Autowired
   private JobLauncherTestUtils jobLauncherTestUtils;

   @Autowired
   private JobRepositoryTestUtils jobRepositoryTestUtils;

   @Before
   public void clearMetadata() {
      jobRepositoryTestUtils.removeJobExecutions();
   }

   @Test
   public void testJob() throws Exception {
      // given
      JobParameters jobParameters = 
            jobLauncherTestUtils.getUniqueJobParameters();

      // when
      JobExecution jobExecution = 
            jobLauncherTestUtils.launchJob(jobParameters);

      // then
      Assert.assertEquals(ExitStatus.COMPLETED, 
                          jobExecution.getExitStatus());
   }

   @Configuration
   public static class TestConfiguration {

      @Bean
      public JobLauncherTestUtils jobLauncherTestUtils() {
         return new JobLauncherTestUtils();
      }

      @Bean
      public JobRepositoryTestUtils jobRepoTestUtils(DataSource dataSource,
                                               JobRepository jobRepository) {

         return new JobRepositoryTestUtils(jobRepository, dataSource);
      }

   }
}
```

In this release, we introduced a new annotation, named `@SpringBatchTest`, that marks a class as a test class for Spring Batch components. This annotation automatically adds utility beans and listeners to the test context and makes them automatically available for autowiring, as the following example shows:

```java
Copy@RunWith(SpringRunner.class)
@SpringBatchTest
@ContextConfiguration(classes = {JobConfiguration.class})
public class JobTest {

   @Autowired
   private JobLauncherTestUtils jobLauncherTestUtils;

   @Autowired
   private JobRepositoryTestUtils jobRepositoryTestUtils;

   @Before
   public void clearMetadata() {
      jobRepositoryTestUtils.removeJobExecutions();
   }

   @Test
   public void testJob() throws Exception {
      // given
      JobParameters jobParameters = 
            jobLauncherTestUtils.getUniqueJobParameters();

      // when
      JobExecution jobExecution = 
            jobLauncherTestUtils.launchJob(jobParameters);

      // then
      Assert.assertEquals(ExitStatus.COMPLETED, 
                          jobExecution.getExitStatus());
   }
   
}
```

With this new annotation, you can declaratively import test utilities and focus on testing the business logic of the batch job.

## [](#simplify-remote-chunking)Simplify Remote Chunking

Setting up a remote chunking job requires the definition of a number of beans:

-   A connection factory to acquire connections from the messaging middleware (JMS, AMQP, and others)
-   A `MessagingTemplate` to send requests from the master to the workers and back again
-   An input channel and an output channel for Spring Integration to get messages from the messaging middleware
-   A special item writer (`ChunkMessageChannelItemWriter`) on the master side that knows how to send chunks of data to workers for processing and writing
-   A message listener (`ChunkProcessorChunkHandler`) on the worker side to receive data from the master

This can be a bit daunting at first glance. In this milestone, we tried to make this task as easy as possible by introducing a new annotation named `@EnableBatchIntegration` as well as new APIs (`RemoteChunkingMasterStepBuilder` and `RemoteChunkingWorkerBuilder`) to simplify the configuration. Here is an example:

```java
Copy@Configuration
@EnableBatchProcessing
@EnableBatchIntegration
public class RemoteChunkingAppConfig {
  
   @Autowired
   private RemoteChunkingMasterStepBuilderFactory masterStepBuilderFactory;
  
   @Autowired
   private RemoteChunkingWorkerBuilder workerBuilder;
  
   @Bean
   public TaskletStep masterStep() {
         return this.masterStepBuilderFactory
         	        .get("masterStep")
         	        .chunk(100)
         	        .reader(itemReader())
         	        .outputChannel(outgoingRequestsToWorkers())
         	        .inputChannel(incomingRepliesFromWorkers())
         	        .build();
   }
  
   @Bean
   public IntegrationFlow worker() {
         return this.workerBuilder
         	        .itemProcessor(itemProcessor())
         	        .itemWriter(itemWriter())
         	        .inputChannel(incomingRequestsFromMaster())
         	        .outputChannel(outgoingRepliesToMaster())
         	        .build();
   }
}
```

This new annotation and builders takes care of the heavy lifting of configuring infrastructure beans. You can now easily configure a master step as well as a Spring Integration flow on the worker side.

## [](#add-a-new-json-item-reader)Add a New JSON Item Reader

JSON is a popular data format nowadays, and many applications have a requirement to read and write JSON data in batch mode. In this first milestone, we have added a new item reader that supports JSON. Similar to the `StaxEventItemReader` for XML, the `JsonItemReader` uses streaming APIs in order to read JSON objects in chunks. Two JSON libraries are supported: [Jackson](https://github.com/FasterXML/jackson) and [Gson](https://github.com/google/gson). The `JsonItemReader` is able to read JSON files in the following format:

```json
Copy[
  {
    "isin": "123",
    "quantity": 1,
    "price": 1.2,
    "customer": "foo"
  },
  {
    "isin": "456",
    "quantity": 2,
    "price": 1.4,
    "customer": "bar"
  }
]
```

Each object of this `trades.json` file represents an instance of the following `Trade` class:

```java
Copypublic class Trade {

   private String isin;
   private long quantity;
   private BigDecimal price;
   private String customer;

   // getters and setters omitted

}
```

In order to read this `trades.json` file, you can use the following item reader (using Jackson in this example):

```java
Copy@Bean
public JsonItemReader<Trade> jsonItemReader() {

   ObjectMapper objectMapper = new ObjectMapper();
   // configure the objectMapper as required
   JacksonJsonObjectReader<Trade> jsonObjectReader = 
            new JacksonJsonObjectReader<>(Trade.class);
   jsonObjectReader.setMapper(objectMapper);

   return new JsonItemReaderBuilder<Trade>()
                 .jsonObjectReader(jsonObjectReader)
                 .resource(new ClassPathResource("trades.json"))
                 .name("tradeJsonItemReader")
                 .build();
}
```

## [](#other-improvements)Other Improvements

This release also includes many other improvements, bug fixes, and documentation updates. For a complete list of changes, please check the [change log](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=10090&version=16851). We look forward to hearing your feedback on this milestone! Please feel free to ping [@michaelminella](https://twitter.com/michaelminella), [@benas](https://twitter.com/_benas_), or [@cppwfs](https://twitter.com/cppwfs) on twitter or ask your question on [StackOverflow](https://stackoverflow.com/questions/tagged/spring-batch) or [Gitter](https://gitter.im/spring-batch/Lobby). If you find any issue, please open a ticket on [Jira](http://jira.springsource.org/browse/BATCH).

# [](#whats-next)What’s Next?

In the next milestone, we plan to:

-   Simplify remote partitioning setup (similar to simplifying remote chunking setup in this milestone)
-   Add a `JsonItemWriter` to complement the `JsonItemReader`
-   Add JSR-305 annotations to public APIs

Stay tuned!

[Spring Batch Home](https://projects.spring.io/spring-batch/) | [Source on GitHub](https://github.com/spring-projects/spring-batch) | [Reference Documentation](https://docs.spring.io/spring-batch/4.1.x/reference/html/index.html)