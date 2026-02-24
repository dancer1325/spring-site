---
title: Spring Batch 1.1.0 Released
source: https://spring.io/blog/2008/07/17/spring-batch-1-1-0-released
scraped: 2026-02-24T09:15:57.329Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Dave Syer |  July 17, 2008 | 0 Comments
---

# Spring Batch 1.1.0 Released

_Releases | Dave Syer |  July 17, 2008 | 0 Comments_

Dear Spring community,  
We are pleased to announce that Spring Batch 1.1.0.RELEASE has been released!

[Downloads](http://static.springframework.org/spring-batch/downloads.html) | [Web Site](http://static.springframework.org/spring-batch/) | [Changelog](http://static.springframework.org/spring-batch/migration/1.0.1-1.1.html) | [Announcement](http://forum.springframework.org/showthread.php?t=57492)  

The main change from 1.0 is the addition of shared persistent state between steps in a job (the JobExecution has its own ExecutionContext). This means there is a schema change in the meta-data tables, so any existing 1.0 jobs running in parallel with the new version will have to use a different database schema. There is an upgrade script for users who want to migrate all there 1.0 data and processes to 1.1.

There is also now no need to configure transaction management for the JobRepository, as long as you are using the FactoryBean.