---
title: Spring Batch 5.0.0-M6 and 4.3.7 are out!
source: https://spring.io/blog/2022/09/22/spring-batch-5-0-0-m6-and-4-3-7-are-out
scraped: 2026-02-23T10:39:47.285Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mahmoud Ben Hassine |  September 22, 2022 | 5 Comments
---

# Spring Batch 5.0.0-M6 and 4.3.7 are out!

_Releases | Mahmoud Ben Hassine |  September 22, 2022 | 5 Comments_

I am pleased to announce that Spring Batch `5.0.0-M6` is now available from our [milestone repository](https://repo.spring.io/ui/native/milestone/org/springframework/batch/spring-batch-core/5.0.0-M6/) and that `4.3.7` is available from [Maven Central](https://repo.maven.apache.org/maven2/org/springframework/batch/spring-batch-core/4.3.7/). Version `4.3.7` is a patch release that can be used as a drop-in replacement for `4.3.6`. You can find its release notes [here](https://github.com/spring-projects/spring-batch/releases/tag/4.3.7). This blog post is more about the new milestone release, version `5.0.0-M6`. In this milestone, we focused on improving the configuration process of Spring Batch to make it more flexible and straightforward. This blog post walks through the major changes in this area of the framework and presents the new features introduced in this milestone release. For the complete list of changes, see the [release notes](https://github.com/spring-projects/spring-batch/releases/tag/5.0.0-M6).

## [](#new-annotation-attributes-in-enablebatchprocessing)New Annotation Attributes in EnableBatchProcessing

In this release, the `@EnableBatchProcessing` annotation introduced new attributes to specify which components and parameters should be used to configure the Batch infrastructure beans. For example, you can now specify which data source and transaction manager Spring Batch should configure in the job repository. The following snippet shows the new way to do such configuration:

```java
Copy@Configuration
@EnableBatchProcessing(dataSourceRef = "batchDataSource", transactionManagerRef = "batchTransactionManager")
public class MyJobConfiguration {

	@Bean
	public Job job(JobRepository jobRepository) {
		return new JobBuilder("myJob", jobRepository)
			 //define job flow as needed
			 .build();
	}

}
```

In this example, `batchDataSource` and `batchTransactionManager` refer to beans in the application context that are used to configure the job repository and job explorer. You no longer need to define a custom `BatchConfiguer`, which was removed in this release. For example, providing a custom execution context serializer in Spring Batch v4 was possible by providing a custom `BatchConfigurer`, as follows:

```java
Copy@Configuration
@EnableBatchProcessing
public class MyJobConfigWithCustomSerializer {

    @Bean
    public BatchConfigurer batchConfigurer() {
        return new DefaultBatchConfigurer() {
            @Override
            public JobRepository getJobRepository() {
                JobRepositoryFactoryBean factory = new JobRepositoryFactoryBean();
                factory.setSerializer(createCustomSerializer());
                // set other properties on the factory bean
                try {
                    factory.afterPropertiesSet();
                    return factory.getObject();
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }

            @Override
            public JobExplorer getJobExplorer() {
                JobExplorerFactoryBean factoryBean = new JobExplorerFactoryBean();
                factoryBean.setSerializer(createCustomSerializer());
                // set other properties on the factory bean
                try {
                    factoryBean.afterPropertiesSet();
                    return factoryBean.getObject();
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }

            private ExecutionContextSerializer createCustomSerializer() {
                Jackson2ExecutionContextStringSerializer serializer = new Jackson2ExecutionContextStringSerializer();
                // customize serializer
                return serializer;
            }
        };
    }

}
```

In Spring Batch v5, you can provide a custom serializer as follows:

```java
Copy@Configuration
@EnableBatchProcessing(executionContextSerializerRef = "myCustomSerializer")
public class MyJobConfigWithCustomSerializer {

    @Bean
    public Job job(JobRepository jobRepository) {
        return new JobBuilder("myJob", jobRepository)
                //define job flow as needed
                .build();
    }
    
    @Bean
    public ExecutionContextSerializer myCustomSerializer() {
        Jackson2ExecutionContextStringSerializer serializer = new Jackson2ExecutionContextStringSerializer();
        // customize serializer
        return serializer;
    }

}
```

We believe this new way of configuring Spring Batch is more intuitive, more straightforward, and less prone to errors.

## [](#new-configuration-class-for-infrastructure-beans)New Configuration Class for Infrastructure Beans

In this release, you can use a new configuration class, named `DefaultBatchConfiguration`, as an alternative to using `@EnableBatchProcessing` for the configuration of infrastructure beans. This class provides infrastructure beans with default configuration, which you can customize as needed. The following snippet shows a typical usage of this class:

```
Copy@Configuration
class MyJobConfiguration extends DefaultBatchConfiguration {

	@Bean
	public Job job(JobRepository jobRepository) {
		return new JobBuilder("myJob", jobRepository)
				//define job flow as needed
				.build();
	}

}
```

In this example, the `JobRepository` bean injected in the `Job` bean definition is defined in the `DefaultBatchConfiguration` class. You can specify custom parameters by overriding the corresponding getter. For example, the following example shows how to override the default character encoding used in the job repository and job explorer:

```
Copy@Configuration
class MyJobConfiguration extends DefaultBatchConfiguration {

	@Bean
	public Job job(JobRepository jobRepository) {
		return new JobBuilder("job", jobRepository)
				// define job flow as needed
				.build();
	}

	@Override
	protected Charset getCharset() {
		return StandardCharsets.ISO_8859_1;
	}
}
```

## [](#transaction-support-in-jobexplorer-and-joboperator)Transaction Support in JobExplorer and JobOperator

This release introduces transaction support in the `JobExplorer` created through the `JobExplorerFactoryBean`. You can now specify which transaction manager to use to drive the ready-only transactions when querying Batch meta-data. Also, you can now customize the transaction attributes. The same transaction support was added to the `JobOperator` through a new factory bean, named `JobOperatorFactoryBean`.

## [](#deprecations-and-api-changes)Deprecations and API Changes

This milestone release introduces the following deprecations and API changes:

-   `JobBuilderFactory` and `StepBuilderFactory` are now deprecated. Instead, you should use `JobBuilder` and `StepBuilder`.
-   `BatchConfigurer` and `DefaultBatchConfigurer` were removed. You should no longer use this interface and its default implementation to customize the behaviour of `@EnableBatchProcessing`

## [](#dependencies-upgrades)Dependencies Upgrades

Major dependencies have been upgraded to the following versions:

-   Upgrade to Spring Framework 6.0.0-M6
-   Upgrade to Spring Data 2022.0.0-M6
-   Upgrade to Spring Integration 6.0.0-M5
-   Upgrade to Spring AMQP 3.0.0-M4
-   Upgrade to Spring for Apache Kafka 3.0.0-M6
-   Upgrade to Spring Retry 2.0.0-M1
-   Upgrade to Spring LDAP 3.0.0-M4
-   Upgrade to Micrometer 1.10.0-M5

## [](#feedback)Feedback

I would like to thank all contributors who had a role in this release! As we continue our work on Spring Batch 5, we look forward to your feedback on [Github](https://github.com/spring-projects/spring-batch/issues), [Twitter](https://twitter.com/springbatch), and [StackOverflow](https://stackoverflow.com/questions/tagged/spring-batch).

---

[Spring Batch Home](https://spring.io/projects/spring-batch)|[Source on Github](https://github.com/spring-projects/spring-batch)|[Reference documentation](https://docs.spring.io/spring-batch/docs/5.0.0-M6/reference/html/index-single.html)