---
title: Spring Batch 3.0 Milestone 1 Released
source: https://spring.io/blog/2013/08/23/spring-batch-3-0-milestone-1-released
scraped: 2026-02-24T07:59:27.677Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Michael Minella |  August 23, 2013 | 0 Comments
---

# Spring Batch 3.0 Milestone 1 Released

_Engineering | Michael Minella |  August 23, 2013 | 0 Comments_

Today we are pleased to announce the first milestone release towards Spring Batch 3.0 ([download](http://s3.amazonaws.com/dist.springframework.org/milestone/BATCH/spring-batch-3.0.0.M1-no-dependencies.zip)). With this release we take our first steps towards implementing the JSR-352 Java Batch specification. Spring Batch is a lightweight, comprehensive framework for the development of robust batch applications.

## JSR-352

JSR-352 is billed as the standardization of batch processing for the java platform. As part of that standardization, this JSR has included three main pieces:

-   A XML based DSL for configuring jobs
-   An API for creating job related components (readers/writers/etc)
-   An API and description of behavior for a supporting classes and concepts

Spring has invested a large amount of time and resources in our contribution to this spec. Our collaboration with the other industry experts via the JCP, JSR-352 validates that the batch patterns that Spring Batch has implemented and battle tested over the past five years in countless production environments is the best approach for building mission critical batch applications.

## Features in Milestone 1

This release is the first step towards Spring Batch being compliant with the JSR. Out of the 155 SE tests in the JSR-352 TCK, this release passes 70. The specific features implemented within this release are:

-   `JobOperator` implementation
-   Basic Job configuration via XML
-   batch.xml support

## JobOperator

The JSR defines a `JobOperator` interface that is a combination of Spring Batch's `JobOperator` and `JobExplorer` interfaces. For the spec, this interface serves as the entry point for a batch application to both interact with the job itself (start/stop/restart/etc) as well as the job repository (providing the ability to query for previously run JobExecutions for example). Because of this, the `JobOperator` needs to provide a level of services out of the box. The `JsrJobOperator` (the Spring implementation of `javax.batch.operations.JobOperator`) bootstraps a Spring context similar to that of `@EnableBatchProcessing`. Out of the box, it includes a `JobRepository`, `JobLauncher`, `JobOperator`, `JobExplorer`, `DataSource`, `TransactionManager`, `ParametersConverter`, `JobRegistry`, and a `PlaceholderPropertiesConfigurer`. All of these can be overridden at runtime by overriding the default beans via the context provided when starting or restarting a job. By default, the `JobRepository` utilizes HSQLDB in an in-memory configuration.

Per the JSR, to launch a job is actually very easy:

JobOperator jobOperator = BatchRuntime.getJobOperator();
JobExecution jobExecution = jobOperator.start("jsrJob", new Properties());

The above two lines will bootstrap the previously defined base context (this occurs only once), then loads the batch.xml file from /META-INF (if it exists) and the context as defined at jsrJob.xml in /META-INF/batch-jobs. jsrJob.xml can be one of two configurations. It can be a standard Spring context configuration that defines any batch artifacts as Spring Beans and the job via the JSR-352 DSL, or it can be just the job definition as defined by the JSR. Per JSR-352, only one job can be defined within the jsrJob.xml context. The rest of the `JsrJobOperator`'s functionality is virtually a direct wrapping of the existing `JobOperator` and `JobExplorer`'s functionality (hence their inclusion in the base application context).

## Basic Job configuration via XML

JSR-352 defines an XML based DSL that any Spring Batch user will immediately find familiar. Consisting of jobs, steps, readers and writers, most of the concepts that are found in the Spring Batch namespace are accounted for within JSR-352. As part of this release, developers will be able to configure basic jobs using the JSR defined DSL. Basic jobs include the following:

-   `<job>`
-   `<step>`
-   `<chunk>`
-   `<batchlet>`
-   `<reader>`
-   `<processor>`
-   `<writer>`
-   `<decision>`
-   `<listeners>`/`<listener>`
-   `<properties>`/`<property>`
-   `<skippable-exception-classes>` and related children
-   `<retryable-exception-classes>` and related children
-   `<checkpoint-algorithm>`
-   `<next>`/`<end>`/`` `/<code><fail>` ``

``   With the JSR, a batch job that looks like this via the Spring Batch DSL:  ```xml Copy <job id="data" xmlns="http://www.springframework.org/schema/batch">     <step id="import" next="report">         <tasklet>             <chunk commit-interval="100"                    reader="itemReader"                    writer="dataWriter" />         </tasklet>     </step>     <step id="report">         <tasklet ref="reportTasklet"/>     </step> </job> ```  will look like this:  ```xml Copy<job id="data" xmlns="http://xmlns.jcp.org/xml/ns/javaee" version="1.0">     <step id="import" next="report">         <chunk item-count="100">             <reader ref="itemReader"/>             <writer ref="dataWriter"/>         </chunk>     </step>     <step id="report">         <batchlet ref="reportBatchlet"/>     </step> </job> ```  The major features not included in this release from a configuration standpoint are the parallel execution options including splits and partitioning.  To configure a job via the JSR's DSL, a developer can either embed the configuration in a Spring context or configure it via a stand-alone XML document as show above.  In the above job definition, since the batchlet reportBatchlet is not defined as a bean in the same XML file, it needs to resolve to somewhere…  ## batch.xml  JSR-352 does not require a dependency injection framework in order to be used.  However, there are a number of DI related features that the spec depends on.  The first being the building of jobs via the DSL referring to named batch artifacts.  In the example above, reportBatchlet can refer to one of two things: either a Spring bean defined in a context linked to that file or a batch artifact defined in the batch.xml file located in the /META-INF directory of the application.  The batch.xml file provides a very simple method of defining name to class name pairing.  An example batch.xml file that addresses the above case would look something like this:  ```xml Copy<?xml version="1.0" encoding="UTF-8"?> <batch-artifacts xmlns="http://xmlns.jcp.org/xml/ns/javaee">     <ref id="reportBatchlet" class="org.springframework.batch.core.jsr.step.batchlet.BatchletSupport"/> </batch-artifacts> ```  While release 3.0.0.M1 supports the batch.xml requirement, it is recommended that users use Spring context configurations instead due to it's more robust dependency injection and bean factory options.  Future releases will include full support for the entire expression language defined in JSR-352.  ## Beyond JSR-352  While JSR-352 defines a foundation for building batch applications that is similar to what Spring Batch already provides, it is important to note that Spring Batch goes much further than what is defined within JSR-352.  For example, while the JSR defines an API for building batch artifacts like `ItemReaders` and `ItemWriters`, it does not provide any implementations.  Spring Batch provides a comprehensive library of implementations that can be used with virtually no customization needed.  Not only does using these out of the box components make you more productive, it gives you the piece of mind that you're using components tested in the most demanding production environments.  Spring Batch also takes batch processing much further than what JSR-352 outlines.  Spring Batch provides a platform for easily building scalable batch applications.  Via remote partitioning and remote chunking, Spring Batch applications can be scaled across multiple JVMs in a standardized and easy manor.  Adding Spring Integration into your batch solution provides capabilities like message driven job launching, polling for files, upload/download and much more.  Finally Spring Batch is pushing the boundaries of what batch jobs do and where batch jobs are run.  Spring Data for Apache Hadoop provides components to run Map/Reduce, Hive, Pig, etc jobs while using Spring Batch as an orchestration tool.  In the coming months, we will be releasing tools to enable the running of Spring Batch jobs on Hadoop clusters via Yarn.  All of the above can be wrapped by Spring XD which blurs the lines between Spring Batch, Spring Integration, and Spring Data by providing a single system for data ingestion, real-time analytics, batch processing and data export.  ## Conclusion  Spring has made a large investment into JSR-352 and is dedicated to implementing in with Spring Batch.  This release constitutes our continued investment in this JSR as we take our first steps towards being JSR-352 compliant.  We look forward to your feedback in the forums, Jira and in person at [SpringOne2GX](http://springone2gx.com/conference/santa_clara/2013/09/register)!      ``