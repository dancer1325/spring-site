---
title: Spring Batch 5.0 Goes GA!
source: https://spring.io/blog/2022/11/24/spring-batch-5-0-goes-ga
scraped: 2026-02-23T10:29:07.578Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mahmoud Ben Hassine |  November 24, 2022 | 2 Comments
---

# Spring Batch 5.0 Goes GA!

_Releases | Mahmoud Ben Hassine |  November 24, 2022 | 2 Comments_

It is finally here! Spring Batch 5.0 is now generally available from Maven Central. Spring Batch 5 is the culmination of two years of work, including dozens of improvements, features, and bug fixes by more than 50 contributors! On Behalf of the team, I would like to thank ALL contributors who had a role in this huge release!

This blog post walks through the major highlights of this new generation of the framework. You can find the details of all the changes in the [release notes](https://github.com/spring-projects/spring-batch/releases/tag/v5.0.0) and the upgrade instructions in the [migration guide](https://github.com/spring-projects/spring-batch/wiki/Spring-Batch-5.0-Migration-Guide).

## [](#whats-new)What's new?

-   New Java version baseline
-   Major dependencies upgrade
-   Full GraalVM native support
-   Introduction of the new Observation API from Micrometer
-   Execution context Meta-data improvement
-   New default execution context serialization format
-   SystemCommandTasklet enhancements
-   Add support to use any type as a job parameter
-   Improved job parameters conversion
-   New Annotation Attributes in EnableBatchProcessing
-   New Configuration Class for Infrastructure Beans
-   Transaction Support in JobExplorer and JobOperator
-   Automatic registration of a JobOperator with EnableBatchProcessing
-   Test utilities configuration updates
-   Migration to JUnit Jupiter
-   Java Records Support Improvement
-   UTF-8 by default
-   Java 8 features updates
-   New Maven Bill of Materials
-   Full MariaDB support
-   Support for SAP HANA as a job repository
-   Improved documentation

### [](#new-java-version-baseline)New Java version baseline

Spring Batch follows Spring Framework's baselines for both Java version and third party dependencies. With Spring Batch 5, the Spring Framework version is being upgraded to Spring Framework 6, which requires Java 17. As a result, the Java version requirement for Spring Batch is also increasing to Java 17.

### [](#major-dependencies-upgrade)Major dependencies upgrade

To continue the integration with supported versions of the third party libraries that Spring Batch uses, Spring Batch 5 is updating the dependencies across the board to the following versions:

-   Spring Framework 6
-   Spring Integration 6
-   Spring Data 3
-   Spring AMQP 3
-   Spring for Apache Kafka 3
-   Micrometer 1.10

This release also marks the migration to:

-   Jakarta EE 9
-   Hibernate 6

### [](#full-graalvm-native-support)Full GraalVM native support

The effort towards providing support to compile Spring Batch applications as native executables using the GraalVM native-image compiler has started in v4.2 and was shipped as experimental in v4.3.

In this release, the native support has been improved significantly by providing the necessary Ahead-Of-Time processing and runtime hints to natively compile Spring Batch applications with GraalVM.

In this blog post, we want to share with you some of the benchmarks we have been working on in that area. The following benchmarks are based on the [batch](https://github.com/spring-projects/spring-aot-smoke-tests/tree/main/batch/batch) sample from the [Spring Native](https://github.com/spring-projects/spring-aot-smoke-tests) samples project. These benchmarks show a comparison of the startup time and total execution time of the same batch application executed with a regular JVM and as a native executable:

![perf-native](https://raw.githubusercontent.com/benas/spring-batch-lab/main/issues/native203/perf-native.png)

The values shown here are the average of 10 executions of the sample using the following software and hardware setup:

-   JVM: OpenJDK version "17" 2021-09-14
-   GraalVM: OpenJDK Runtime Environment GraalVM CE 22.0.0.2
-   MacOS BigSur v11.6.2 (CPU: 2,4 GHz 8-Core Intel Core i9, Memory: 32 GB 2667 MHz DDR4)

As these benchmarks show, a native Spring Batch application is *two* times faster at startup and almost *ten* times faster at runtime! This really is a game changer for cloud native batch workloads!

### [](#introduction-of-the-new-observation-api-from-micrometer)Introduction of the new Observation API from Micrometer

With the upgrade to Micrometer 1.10, you can now get Batch tracing in addition to Batch metrics. Spring Batch will create a span for each job and a span for each step within a job. This tracing meta-data can be collected and viewed on a dashboard like [Zipkin](https://zipkin.io) for example.

Moreover, this release introduces new metrics:

-   `job.launch.count`: This is `Counter` that reports how many jobs have been launched through the `JobLauncher`. This can be convenient for environments where batch jobs are scheduled and executed in a continuously running JVM.
-   `step.active`: This metric of type `LongTaskTimer` reports the currently active (ie running) step in a specific job. This metric is useful in situations where a job has several steps and one wants to know in which step the processing is currently happening.

### [](#execution-context-meta-data-improvement)Execution context Meta-data improvement

In addition to what Spring Batch already persists in the execution context with regard to runtime information (like the step type, the restart flag, etc), this release adds an important detail in the execution context which is the Spring Batch version that was used to serialize the context.

While this seems a detail, it has a huge added value when debugging upgrade issues with regard to execution context serialization and deserialization.

### [](#new-default-execution-context-serialization-format)New default execution context serialization format

In this release, the `DefaultExecutionContextSerializer` was updated to serialize/deserialize the context to/from Base64.

Moreover, the default `ExecutionContextSerializer` configured by `@EnableBatchProcessing` or `DefaultBatchConfiguration` was changed from `JacksonExecutionContextStringSerializer` to `DefaultExecutionContextSerializer`. The dependency to Jackson is now optional. In order to use the `JacksonExecutionContextStringSerializer`, `jackson-core` should be added to the classpath.

### [](#systemcommandtasklet-enhancements)SystemCommandTasklet enhancements

The `SystemCommandTasklet` has been revisited in this release and was changed as follows:

-   A new strategy interface named `CommandRunner` was introduced in order to decouple the command execution from the tasklet execution. The default implementation is the `JvmCommandRunner` which uses the `java.lang.Runtime#exec` API to run system commands. This interface can be implemented to use any other API to run system commands.
    
-   The method that runs the command now accepts an array of `String`s representing the command and its arguments. There is no need to tokenize the command or do any pre-processing anymore. This change makes the API more intuitive, and less prone to errors.
    

### [](#add-support-to-use-any-type-as-a-job-parameter)Add support to use any type as a job parameter

Up to version 4, Spring Batch supported only 4 types that can be used as job parameters, which are `long`, `double`, `String` and `Date`. While this was convenient to simplify job parameters handling on the framework's side, it turns out to be constraining on the user's side. For instance, what if one wants to use a `boolean` or a custom type as a job parameter? This required additional conversions to one of the supported types in Spring Batch, which quickly became inconvenient to users.

In this release, we have added support to use any type as a job parameter. The main change behind this improvement is the following:

```diff
Copy---public class JobParameter implements Serializable {
+++public class JobParameter<T> implements Serializable {

---   private Object parameter;
+++   private T value;

---   private ParameterType parameterType;
+++   private Class<T> type;

}
```

This change has an impact on how job parameters are persisted in the database. Please check [the migration guide](https://github.com/spring-projects/spring-batch/wiki/Spring-Batch-5.0-Migration-Guide#column-change-in-batch_job_execution_params) for database schema changes. The fully qualified name of the type of the parameter is now persisted as a `String`, as well as the parameter value. String literals are converted to the parameter types with the standard Spring conversion service. The standard conversion service can be enriched with any required converter to convert user specific types to and from String literals.

### [](#improved-job-parameters-conversion)Improved job parameters conversion

The default notation of job parameters in v4 was specified as follows:

```
Copy[+|-]parameterName(parameterType)=parameterValue
```

where `parameterType` is one of `[string,long,double,date]`. While this notation was concise, it showed several limitations as it does not play well with environment variables and is not friendly with Spring Boot.

In v5, we have changed the default notation as follows:

```
CopyparameterName=parameterValue,parameterType,identificationFlag
```

where `parameterType` is the fully qualified name of the type of the parameter. For example, the following key/value pair:

```
Copyschedule.date=2022-12-12,java.time.LocalDate
```

will be converted to an identifying job parameter of type ` java.time.LocalDate` with the value `2022-12-12`. Note how the identification flag is optional and defaults to `true`. This new default notation is well suited for the majority of use cases, but it might not be convenient when the value contains a comma for example. For this reason, we have introduced a new "extended" notation that is inspired by Spring Boot's [Json Application Properties](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.external-config.application-json) and which is specified as follows:

```
CopyparameterName='{"value": "parameterValue", "type":"parameterType", "identifying": "booleanValue"}'
```

where `parameterType` is the fully qualified name of the type of the parameter. Spring Batch provides the `JsonJobParametersConverter` to support this notation. It is of course possible to support any other notation by implementing the strategy interface `JobParametersConverter` and registering the custom implementation in the job repository and job explorer.

We believe these two major changes of job parameters handling in Spring Batch are more convenient, more flexible and less prone to errors.

### [](#new-annotation-attributes-in-enablebatchprocessing)New Annotation Attributes in EnableBatchProcessing

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

### [](#new-configuration-class-for-infrastructure-beans)New Configuration Class for Infrastructure Beans

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

### [](#transaction-support-in-jobexplorer-and-joboperator)Transaction Support in JobExplorer and JobOperator

This release introduces transaction support in the `JobExplorer` created through the `JobExplorerFactoryBean`. You can now specify which transaction manager to use to drive the ready-only transactions when querying Batch meta-data. Also, you can now customize the transaction attributes. The same transaction support was added to the `JobOperator` through a new factory bean, named `JobOperatorFactoryBean`.

### [](#automatic-registration-of-a-joboperator-with-enablebatchprocessing)Automatic registration of a JobOperator with EnableBatchProcessing

As of version 4, the `EnableBatchProcessing` annotation provided all the basic infrastructure beans that are required to launch Spring Batch jobs. However, it did not register a job operator bean, which is the main entry point to stop, restart and abandon job executions.

While these utilities are not used as often as launching jobs, adding a job operator automatically in the application context can be useful to avoid a manual configuration of such a bean by end users.

### [](#test-utilities-configuration-updates)Test utilities configuration updates

Up to version 4.3, the `JobLauncherTestUtils` used to autowire the job under test with the goal of facilitating the test setup. But what if multiple jobs are defined in the test context? And what if no `Job` beans are defined at all? So while this autowiring was convenient for most cases, it turned out to cause several issues in the aforementioned situations. In this release, and based on community feedback, we have decided to remove the autowiring of any job in `JobLauncherTestUtils`.

Similarly, the `JobRepositoryTestUtils` used to autowire a `DataSource` from the application context. Again, what if no data source or multiple data sources are defined in the test context? In this version, the `JobRepositoryTestUtils` was updated to work against the `JobRepository` interface, without having to deal with any implementation details of the repository (such as a data source, for example).

If you define those utility beans manually in your test context or import them through `@SpringBatchTest`, you would manually set the job under test or the test data source when multiple beans of those types are defined in your test context.

### [](#migration-to-junit-jupiter)Migration to JUnit Jupiter

In this release, the entire test suite of Spring Batch was migrated to JUnit 5. While this does not impact end users directly, it helps the Batch team as well as community contributors to use the next generation of JUnit to write better tests.

### [](#java-records-support-improvement)Java Records Support Improvement

The support for Java records as items in a chunk-oriented step was initially introduced in v4.3, but that support was limited, due to the fact that v4 has Java 8 as a baseline. In Java 8, records were not even in preview yet. That initial support was based on reflection tricks to create Java records and populate them with data, without having access to the `java.lang.Record` API, which was finalized in Java 16.

Now that v5 has Java 17 as a baseline, we have improved records support in Spring Batch by leveraging the `java.lang.Record` API in different parts of the framework. For example, the `FlatFileItemReaderBuilder` is now able to detect if the item type is a record or a regular class and configure the corresponding `FieldSetMapper` implementation accordingly (`RecordFieldSetMapper` for records and `BeanWrapperFieldSetMapper` for regular classes). The goal here is to make the configuration of the required `FieldSetMapper` type *transparent* to the user. The same feature has also been implemented in the `FlatFileItemWriterBuilder`, in order to configure either a `RecordFieldExtractor` or a `BeanWrapperFieldExtractor` based on the item type.

### [](#utf-8-by-default)UTF-8 by default

Several issues related to character encoding have been reported over the years in different areas of the framework, such as inconsistent default encoding between file-based item readers and writers, serialization/deserialization issues when dealing with multi-byte characters in the execution context, and others.

In the same spirit as [JEP 400](https://openjdk.java.net/jeps/400) and following the [UTF-8 manifesto](http://utf8everywhere.org), we have changed the default encoding to `UTF-8` in all areas of the framework and made this default configurable where appropriate.

### [](#java-8-features-updates)Java 8 features updates

We took the opportunity of this major release to improve the code base with features from Java 8+, for example:

-   Use default methods in interfaces and deprecate "support" classes (see [issue 3924](https://github.com/spring-projects/spring-batch/issues/3924))
-   Add `@FunctionalInterface` where appropriate in public APIs (see [issue 4107](https://github.com/spring-projects/spring-batch/issues/4107))
-   Add support to use types from the Date and Time APIs as job parameters. (see [issue 1035](https://github.com/spring-projects/spring-batch/issues/1035))

### [](#new-maven-bill-of-materials)New Maven Bill of Materials

This feature has been requested several times and is finally shipped in this release. It is now possible to use the newly added Maven BOM to import Spring Batch modules with a consistent version number.

### [](#full-mariadb-support)Full MariaDB support

Up until v4.3, Spring Batch provided support for MariaDB by considering it as MySQL. In this release, MariaDB is now treated as a separate database product with its own DDL script and `DataFieldMaxValueIncrementer`.

### [](#support-for-sap-hana-as-a-job-repository)Support for SAP HANA as a job repository

SAP Hana is now officially supported as a job repository in Spring Batch.

### [](#improved-documentation)Improved documentation

In this release, the documentation was updated to use the [Spring Asciidoctor Backend](https://github.com/spring-io/spring-asciidoctor-backends). This backend ensures that all projects from the portfolio follow the same documentation style. For consistency with other projects, the reference documentation of Spring Batch was updated to use this backend in this release. You can check the new version of the reference documentation [here](https://docs.spring.io/spring-batch/docs/5.0.0/reference/html/).

## [](#whats-deprecated-or-removed)What's deprecated or removed?

In this major release, all APIs that were deprecated in previous versions have been removed. Moreover, some APIs have been deprecated in v5.0 and are scheduled for removal in v5.2. Finally, some APIs have been moved or removed without deprecation for practical reasons. For a list of all deprecated APIs, please refer to the [migration guide](https://github.com/spring-projects/spring-batch/wiki/Spring-Batch-5.0-Migration-Guide#deprecated-apis).

### [](#sqlfire-support-removal)SQLFire Support Removal

SqlFire has been announced to be EOL as of November 1st, 2014. The support of SQLFire as a job repository was deprecated in version v4.3 and removed in version v5.0.

### [](#gemfire-support-removal)GemFire support removal

Based on the [decision to discontinue](https://github.com/spring-projects/spring-data-geode#notice) the support of Spring Data for Apache Geode, the support for Apache Geode in Spring Batch was removed.

The code was moved to the [spring-batch-extensions](https://github.com/spring-projects/spring-batch-extensions) repository as a community-driven effort.

### [](#jsr-352-implementation-removal)JSR-352 Implementation Removal

Due to a lack of adoption, the implementation of JSR-352 has been discontinued in this release.

## [](#whats-been-fixed)What's been fixed?

Some bugs cannot be fixed without introducing breaking changes. We take the opportunity of this major release to fix such bugs. Please refer to the [release notes](https://github.com/spring-projects/spring-batch/releases/tag/5.0.0) for the complete list of 40+ bugs that were fixed in this release!

## [](#feedback-and-contributions)Feedback and contributions

I would like to thank ALL contributors who had a role in this huge release! This release would not have been possible without the help of the amazing Spring community in general and the Spring Batch community in particular. We would be happy to hear your feedback on this major release and how it could improve your batch infrastructure. Please submit your feedback on [Github](https://github.com/spring-projects/spring-batch/issues), [Twitter](https://twitter.com/springbatch) and [StackOverflow](https://stackoverflow.com/questions/tagged/spring-batch).

## [](#whats-next)What's next?

As we have just released the first version of the next generation of Spring Batch, we still have a ton of ideas and features that we are working on or planning to work on for the next version, like:

-   A new implementation of the chunk-oriented processing model
-   A new concurrency model based on Java 19's virtual threads
-   A new job repository implementation based on MongoDB
-   And more!

We will share with you our complete roadmap in the near future and show you how you can participate in the early phases of development and testing of these new features. Stay tuned!

---

[Spring Batch Home](https://spring.io/projects/spring-batch)|[Source on Github](https://github.com/spring-projects/spring-batch)|[Reference documentation](https://docs.spring.io/spring-batch/docs/5.0.0/reference/html/index.html)