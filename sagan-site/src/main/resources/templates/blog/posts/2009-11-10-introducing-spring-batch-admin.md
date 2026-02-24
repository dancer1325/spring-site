---
title: Introducing Spring Batch Admin
source: https://spring.io/blog/2009/11/10/introducing-spring-batch-admin
scraped: 2026-02-24T09:02:40.969Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Dave Syer |  November 10, 2009 | 0 Comments
---

# Introducing Spring Batch Admin

_Engineering | Dave Syer |  November 10, 2009 | 0 Comments_

Spring Batch Admin provides a web-based user interface that features an admin console for [Spring Batch](http://static.springframework.org/spring-batch) applications and systems. It is a new open-source project from [SpringSource](http://www.springsource.com). A milestone release 1.0.0.M1 will be available soon with all the features below, and we hope to get to a 1.0.0 final release early in 2010.

# Main Use Cases

The easiest way to get a quick overview of Spring Batch Admin is to see some screenshots of the main use cases. The user interface is a web application (built with Spring MVC).

## Inspect Jobs

![Jobs View](http://blog.springsource.com/wp-content/uploads/2009/11/jobs-view.jpg) The user can inspect the jobs that are known to the system. Jobs are either launchable or non-launchable (in the screenshot they are all launchable). The distinction is that a launchable job is defined and configured in the application itself, whereas a non-launchable job is detected as state left by the execution of a job in another process. (Spring Batch uses a relational database to track the state of jobs and steps, so historic executions can be queried to show the non-launchable jobs.)

## Launch Job

![Launch Job View](http://blog.springsource.com/wp-content/uploads/2009/11/launch-job-view.jpg) Launchable jobs can be launched from the user interface with job parameters provided as name value pairs, or by an incrementer configured into the application.

## Inspect Executions

![Job Executions View](http://blog.springsource.com/wp-content/uploads/2009/11/job-executions-view.jpg) Once a job is executing, or has executed, this view can be used to see the most recent executions, and a brief summary of their status (STARTED, COMPLETED, FAILED, etc.). ![Job Execution View](http://blog.springsource.com/wp-content/uploads/2009/11/job-execution-view.jpg) Each individual execution has a more detailed view (shown above), and from there the user can click down to a view of each of the step executions in the job (only one in this case). A common reason for wanting to do this is to see the cause of a failure. ![Step Execution (Top) View](http://blog.springsource.com/wp-content/uploads/2009/11/step-execution-top-view.jpg) The top of the step execution detail view shows the history of the execution of this step across all job executions. This is useful for getting a statistical feel for performance characteristics. A developer running a job in an integration test environment might use the statistics here to compare different parameterisations of a job, to see what effect is of changing (for instance) the commit interval in an item processing step. ![Step Execution (Bottom) View](http://blog.springsource.com/wp-content/uploads/2009/11/step-execution-bottom-view.jpg) The bottom of the step execution view has the detailed meta-data for the step (status, read count, write count, commit count, etc.) as well as an extract of the stack trace from any exception that caused a failure of the step (as in the example shown above).

## Stop an Execution

![Stop Job Execution View](http://blog.springsource.com/wp-content/uploads/2009/11/stop-job-execution-view.jpg) A job that is executing can be stopped by the user (whether or not it is launchable). The stop signal is sent via the database and once detected by Spring Batch in whatever process is running the job, the job is stopped (status moves from STOPPING to STOPPED) and no further processing takes place.

# Where to get it

The best place to start is the [SpringSource community download page](http://www.springsource.com/download/community). There is also a snapshot download [attached to this article](http://static.springsource.org/spring-batch-admin/blog/spring-batch-admin-sample-1.0.0.CI-SNAPSHOT.war), or you can get the source code from [subversion](https://src.springframework.org/svn/spring-batch-admin/trunk) and compile it yourself. Snapshot builds also go up to S3 to the Maven repository every night:

```xml
Copy<repository>
	<id>spring-snapshots</id>
	<name>Spring Maven Snapshot Repository</name>
	<url>http://s3.amazonaws.com/maven.springframework.org/snapshot</url>
</repository>
```

There are two JAR artifacts and a WAR sample (org.springframework.batch:spring-batch-admin-sample:war), all of which are in the Maven repository and in SVN. In the the case of the WAR download link from this article the JAR files are included in WEB-INF/lib.

To deploy the sample application just install the WAR into your favourite servlet container, or import the source code into STS and launch the sample with standard Eclipse WTP features (e.g. drag it onto the server or Run As... and run on the server). It uses an in-memory database out of the box, so you will get a fresh copy on each restart of the application.