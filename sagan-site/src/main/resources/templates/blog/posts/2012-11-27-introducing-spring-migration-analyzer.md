---
title: Introducing Spring Migration Analyzer
source: https://spring.io/blog/2012/11/27/introducing-spring-migration-analyzer
scraped: 2026-02-24T08:12:56.810Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Andy Wilkinson |  November 27, 2012 | 2 Comments
---

# Introducing Spring Migration Analyzer

_Engineering | Andy Wilkinson |  November 27, 2012 | 2 Comments_

It's my pleasure to announce that we've released the first milestone of [Spring Migration Analyzer (SMA)](http://www.springsource.org/spring-migration-analyzer), a command-line utility that analyzes enterprise Java applications and produces a report describing the application and how it can be migrated to Spring.

## Why migrate an application to Spring?

We see two main reasons when people choose to use Spring. Firstly, Spring offers the greatest range of deployment options including cloud and PaaS, allowing you to deploy your application to lighter-weight runtimes with lower operating costs. Secondly, as [Adrian recently explained](http://blog.springsource.org/2012/10/01/spring-remains-at-the-forefront-of-enterprise-java-bigdata-nosql-and-cloud-portability/) Spring provides access to a host of technologies that are at the forefront of enterprise Java.

When it comes to considering the migration of an existing application to Spring, it's typically the deployment flexibility that motivates the move as it can significantly reduce the application's operating costs.

## Using SMA to analyze an application

To get started with SMA, [download the distribution](http://www.springsource.org/download/community?project=Spring%20Migration%20Analyzer). Once it's downloaded, unzip it:

```bash
Copyunzip spring-migration-analyzer-1.0.0.M1-dist.zip
```

With JAVA\_HOME set, you can then run the migration-analysis script to analyze an application:

```bash
Copy./spring-migration-analyzer-1.0.0.M1/bin/migration-analysis.sh ~/dev/apps/my-app.ear
```

This will produce an HTML report in a directory named my-app.ear in the current working directory. The report describes the application and offers guidance on migrating it to Spring.

[![](http://blog.springsource.org/wp-content/uploads/2012/11/migration-report.png "migration-report")](http://blog.springsource.org/wp-content/uploads/2012/11/migration-report-large.png)

In addition to the migration guidance, the report provides details of things like API usage, EJBs and deployment descriptors that need to be taken into consideration when migrating the application.

## Learning more

To learn more about SMA, please refer to the [user guide](http://static.springsource.org/spring-migration-analyzer/docs/1.0.0.M1/user-guide/html/). You may also be interested in the [project on GitHub](https://github.com/SpringSource/spring-migration-analyzer). If you find a bug or have an improvement that you'd like to see, please let us know by [opening an issue](https://jira.springsource.org/browse/SMA).