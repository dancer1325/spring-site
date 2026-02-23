---
title: Spring Batch 5.0.0-M7 available now!
source: https://spring.io/blog/2022/10/05/spring-batch-5-0-0-m7-available-now
scraped: 2026-02-23T10:38:29.252Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mahmoud Ben Hassine |  October 05, 2022 | 0 Comments
---

# Spring Batch 5.0.0-M7 available now!

_Releases | Mahmoud Ben Hassine |  October 05, 2022 | 0 Comments_

On behalf of the team and all contributors, I am pleased to announce that Spring Batch `5.0.0-M7` is now available from our [milestone repository](https://repo.spring.io/milestone).

The main theme of this milestone is the improvement of job parameters handling in Spring Batch. Two main changes were introduced in this release:

-   Add support to use any type as a job parameter
-   Improve job parameters conversion

This blog post walks through these two major changes in details. For the complete list of changes, please check the [release notes](https://github.com/spring-projects/spring-batch/releases/tag/5.0.0-M7).

## [](#add-support-to-use-any-type-as-a-job-parameter)Add support to use any type as a job parameter

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

## [](#improve-job-parameters-conversion)Improve job parameters conversion

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

## [](#feedback)Feedback

I would like to thank all contributors who had a role in this release! As we continue our work on Spring Batch 5, we look forward to your feedback on [Github](https://github.com/spring-projects/spring-batch/issues), [Twitter](https://twitter.com/springbatch) and [StackOverflow](https://stackoverflow.com/questions/tagged/spring-batch).

---

[Spring Batch Home](https://spring.io/projects/spring-batch)|[Source on Github](https://github.com/spring-projects/spring-batch)|[Reference documentation](https://docs.spring.io/spring-batch/docs/5.0.0-M7/reference/html/index-single.html)