---
title: Spring Batch 2.2.0.RELEASE is now available
source: https://spring.io/blog/2013/06/06/spring-batch-2-2-0-release-is-now-available
scraped: 2026-02-24T08:04:28.093Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Josh Long |  June 06, 2013 | 0 Comments
---

# Spring Batch 2.2.0.RELEASE is now available

_Releases | Josh Long |  June 06, 2013 | 0 Comments_

We are pleased to announce that Spring Batch 2.2.0.RELEASE is now available via Maven Central, Github and the SpringSource download repository.

[Spring Batch Home](http://www.springsource.org/spring-batch) | [Source on GitHub](https://github.com/SpringSource/spring-batch) | [Reference Documentation](http://static.springsource.org/spring-batch/)

## [](#support-for-spring-data)Support for Spring Data

[Spring Data](http://www.springsource.org/spring-data) is a collection of projects intended to make it easier to develop Spring-powered applications that use new data access technologies such as non-relational (NoSQL) databases. Based on a model of exposing [Repository](http://static.springsource.org/spring-data/commons/docs/current/api/org/springframework/data/repository/Repository.html) objects, Spring Data allows applications to access data in a simple and consistent way across many new platforms. Spring Batch 2.2.0.RELEASE provides `ItemReader` implementations for Neo4J and MongoDB as well as `ItemWriter` impelementaions for Neo4J, MongoDB and Gemfire. We also have created a `RepositoryItemReader` and `RepositoryItemWriter`. Each of these implementations wrap any custom implementation of `PagingAndSortingRepository` and `CrudRepository` respsectively.

## [](#java-configuration)Java Configuration

Joining most of the other major Spring projects, with Spring Batch 2.2.0.RELEASE, you will be able to configure your batch jobs via Java config. The `@EnableBatchProcessing` annotation provides access to not only builders that you can use to construct your batch jobs, but it adds the ability to autowire a number of useful objects (A `JobRepository`, `JobLauncher`, `JobRegistry`, `PlatformTransactionManager`) with no additional configuration required. Below is an example job configured via the new Java config.

```java
Copy@Configuration
 @EnableBatchProcessing
 @Import(DataSourceCnfiguration.class)
 public class AppConfig {

    @Autowired
    private JobBuilderFactory jobs;

    @Bean
    public Job job() {
        return jobs.get("myJob").start(step1()).next(step2()).build();
    }

    @Bean
    protected Step step1() {
       ...
    }

        @Bean
    protected Step step2() {
     ...
    }
 }
```

The above java config is equivelant to the below XML configuration.

```xml
Copy<batch>
     <job-repository />
     <job id="myJob">
       <step id="step1" .../>
       <step id="step2" .../>
     </job>
     <beans:bean id="transactionManager" .../>
     <beans:bean id="jobLauncher" class="org.springframework.batch.core.launch.support.SimpleJobLauncher">
       <beans:property name="jobRepository" ref="jobRepository" />
     </beans:bean>
 </batch> 
```

## [](#non-identifying-job-parameters)Non-identifying Job Parameters

Running batch jobs that need the same parameters is a common use case. As of Spring Batch 2.2.0.RELEASE, Spring Batch now supports this use case by allowing jobs to accept non-identifying job parameters (parameters that do not contribute to the creation of a new `JobInstance`). This update did require both code changes as well as updates to the underlying database schema used by the Spring Batch job repository. Fortunately, we have provided a migration script to help with the transition. You can read the details about the migration script in the [Getting Started Guide](http://static.springsource.org/spring-batch/getting-started.html).

## [](#amqp-support)AMQP support

Utilizing the Spring AMQP project, Spring 2.2.0.RELEASE offers support for both reading and writing to AMQP endpoints.

##SQLFire support Previous versions of Spring Batch provided a number of options for what database to use within the job repository. With the release of Spring Batch 2.2.0.RELEASE, we add support for SQLFire as yet another option for you to store job repository data.

## [](#dependency-upgrade)Dependency upgrade

As part of the ongoing work to keep the dependencies of Spring Batch up to date, we updated batch to support Spring 3.2.x (minimum level of support is now 3.1.2) as well as Hibernate 4 (within the Hibernate based ItemReaders and ItemWriters).

##Other updates and fixes Beyond all of the new features, we also address many bugs and provided numerous other improvements. The complete list of what has changed between Spring Batch 2.2.0.RELEASE and your current version of Spring Batch can be found here in the [changelog](http://static.springsource.org/spring-batch/migration/index.html).

## [](#links)Links

[Spring Batch Home](http://www.springsource.org/spring-batch) | [Source on GitHub](https://github.com/SpringSource/spring-batch) | [Reference Documentation](http://static.springsource.org/spring-batch/)