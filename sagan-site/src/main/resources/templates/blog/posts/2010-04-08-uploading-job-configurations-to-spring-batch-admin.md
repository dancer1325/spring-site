---
title: Uploading Job Configurations to Spring Batch Admin
source: https://spring.io/blog/2010/04/08/uploading-job-configurations-to-spring-batch-admin
scraped: 2026-02-24T08:58:28.474Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Dave Syer |  April 08, 2010 | 1 Comment
---

# Uploading Job Configurations to Spring Batch Admin

_Engineering | Dave Syer |  April 08, 2010 | 1 Comment_

An interesting problem that has no universal good solution is: how do I change the configuration of a running Spring application? [Spring Batch Admin](http://www.springframework.org/spring-batch-admin) 1.0.0.M3 was released recently, and it has a configuration upload feature that solves this problem in a particular way. Someone asked for this feature at the recent S2GForum in Munich (if you missed that sign up for events in [London](http://bit.ly/dlCWT6) and [Amsterdam](http://bit.ly/cSb48k) in May), and I was happy to tell him that it already existed, so maybe it deserves a bit more air time...

## Screenshots of the Basic Use Case

![Jobs View Before Upload](http://blog.springsource.com/wp-content/uploads/2010/04/jobs-view-before.jpg) We start with a look at the Jobs view in the application. It shows a list of jobs that are either launchable or monitorable by the web application.

Now the plan is to upload a new Job configuration and see this view change. So we start with the "Files" menu in the top navigation, and then click on "Configuration". This presents a simple form to upload a file. If we point to a Spring XML configuration file, the view looks like this:

![Configuration View](http://blog.springsource.com/wp-content/uploads/2010/04/configuration-view.jpg) We press the "Upload" button and the configuration is uploaded and parsed and the Job instances in the uploaded file are registered for launching: ![Jobs View After Upload](http://blog.springsource.com/wp-content/uploads/2010/04/jobs-view-after.jpg)

You can see a new entry in the job registry ("test-job") which is launchable in-process because the application has a reference to the Job. (Jobs which are not launchable were executed out of process, but used the same database for its JobRepository, so they show up with their executions in the UI.)

## Variant of the Basic Use Case

A common variant of the basic upload use case is to upload a modification of an existing Job configuration, instead of a brand new one. This is common because one often needs to tweak the runtime parameters, especially when performance testing. For instance we could change the [commit-interval](http://static.springsource.org/spring-batch/trunk/reference/html/configureStep.html#commitInterval) in one of the Steps in a Job so that more (or less) items are grouped in a chunk and committed together during a repetitive item-processing Step. This might affect performance and the Job might run faster overall because of more efficient use of transactional resources. We would be able to measure and verify this directly by launching the Job from the application and inspecting the result (because the web interface is resource oriented, this could also be automated using a simple shell script based on curl).

## How Does it Work?

The secret to the implementation of this use case is that Job configuration files are parsed up into separate Spring ApplicationContext instances, which are tracked by their file name. The execution environment (JobLauncher, transaction manager, DataSource etc.) are provided by the application as a parent context, and the Jobs all live in child contexts of that environment. This means that they can be volatile, and their lifecycle can be managed by a service in the application. The service in question happens to be activated by Spring Integration (in the way I described in a [previous post](http://blog.springsource.com/2010/02/15/practical-use-of-spring-batch-and-spring-integration/)) via a service activator wrapping a JobLoader, which is a standard component from Spring Batch.

## What Next?

Visit the [Batch Admin](http://www.springframework.org/spring-batch-admin/spring-batch-integration) website for more information and to find out where to get the code to play with. Remember the S2GForum events coming up in [London](http://bit.ly/dlCWT6) and [Amsterdam](http://bit.ly/cSb48k) in May, where the application will be discussed and demo-ed in a session by the Spring Batch and the Spring Integration leads (Dave Syer and Mark Fisher).