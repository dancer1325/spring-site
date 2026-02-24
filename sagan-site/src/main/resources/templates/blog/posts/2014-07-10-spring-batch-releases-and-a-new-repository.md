---
title: Spring Batch Releases And A New Repository
source: https://spring.io/blog/2014/07/10/spring-batch-releases-and-a-new-repository
scraped: 2026-02-23T22:21:12.217Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Michael Minella |  July 10, 2014 | 0 Comments
---

# Spring Batch Releases And A New Repository

_Releases | Michael Minella |  July 10, 2014 | 0 Comments_

Today we are pleased to announce the release of Spring Batch 3.0.1, Spring Batch Admin 1.3.0.RC1, and introduce the Spring Batch Extensions project. These releases in addition to the Spring Batch Extensions project address a number of improvements and issues.

## Spring Batch 3.0.1

This release of Spring Batch consists mainly of bug fixes, however, one new feature was added: `ScriptItemProcessor`. This `ItemProcessor` implementation provides the ability to use an external or inline script to provide the logic of your processor. An example of using Groovy inline would look something like this:

```java
Copy@Bean
public ScriptItemProcessor processor() {
    ScriptItemProcessor<String, Object> scriptItemProcessor = new ScriptItemProcessor<String, Object>();

    scriptItemProcessor.setScriptSource("item.toUpperCase();", "groovy");
    scriptItemProcessor.afterPropertiesSet();

    return scriptItemProcessor;
}
```

This `ItemProcessor` allows full support of all JSR-223 scripting options.

## Spring Batch Admin 1.3.0.RC1

Spring Batch Admin 1.3.0.RC1 addresses [a number of issues](https://jira.spring.io/browse/BATCHADM-188?jql=fixVersion%20%3D%201.3.0%20AND%20project%20%3D%20BATCHADM) as well as updated it to be used with the Spring Batch 2.2.x version of the job repository and beyond. In addition to the issues addressed, we also completed a number of dependency updates to bring the project up to date from that perspective.

To support the users of Spring Batch 2.2.x, this release contains the Spring Batch Integration module and still uses Spring Integration 3. However, Spring Batch 3.0 saw us move this module to Spring Batch and so this will be the last release of Spring Batch Admin that contains this module. Going forward, users will be expected to use the version included within Spring Batch.

## Spring Batch Extensions

Finally, we are happy to announce a new repository for Spring Batch, Spring Batch Extensions. This project provides a home for community contributed modules akin to Spring Integration Extensions. With this announcement, we have our first contribution, the spring-batch-elasticsearch module. This module provides an `ItemReader` and an `ItemWriter` for interacting with Elasticsearch. You can find information about this module and other contributions on [Github](https://github.com/spring-projects/spring-batch-extensions). We look forward to future contributions from the community to help expand the available use cases for Spring Batch.

Please share your feedback on Stack Overflow, social media, and in person at [SpringOne2GX](http://springone2gx.com/register)!