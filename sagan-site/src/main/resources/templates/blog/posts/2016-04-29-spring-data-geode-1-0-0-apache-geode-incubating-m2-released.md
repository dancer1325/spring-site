---
title: Spring Data Geode 1.0.0.APACHE-GEODE-INCUBATING-M2 Released
source: https://spring.io/blog/2016/04/29/spring-data-geode-1-0-0-apache-geode-incubating-m2-released
scraped: 2026-02-23T19:17:32.527Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | John Blum |  April 29, 2016 | 0 Comments
---

# Spring Data Geode 1.0.0.APACHE-GEODE-INCUBATING-M2 Released

_Engineering | John Blum |  April 29, 2016 | 0 Comments_

I am pleased to announce the release of *Spring Data Geode* 1.0.0.APACHE-GEODE-INCUBATING-M2, offering support for the recently [announced](http://markmail.org/message/v6obupp2ruicnahd) *Apache Geode* 1.0.0-incubating.M2 release.

*Spring Data Geode* is a specific version of *Spring Data GemFire* with support for [Apache Geode](http://geode.incubator.apache.org/) rather than [Pivotal GemFire](https://pivotal.io/big-data/pivotal-gemfire).

Both *Spring Data GemFire* and *Spring Data Geode* are based on the same [source repository in GitHub](https://github.com/spring-projects/spring-data-gemfire), however, Apache Geode support lives in the [apache-geode](https://github.com/spring-projects/spring-data-gemfire/tree/apache-geode) branch. Therefore, you won't find a separate [Spring Data project](http://projects.spring.io/spring-data/) specifically for Apache Geode, but this is of little consequence since your existing knowledge of Pivotal GemFire combined with *Spring Data GemFire* will be immediately useful and transferable to *Apache Geode* and *Spring Data Geode*.

Last year I wrote a [blog post](https://spring.io/blog/2015/06/12/spring-data-gemfire-supports-apache-geode) detailing *Spring Data GemFire's* support of Apache Geode. However, many things have changed since then.

First and foremost, the *Spring Data GemFire*, Apache Geode support now has a separate artifact, `spring-data-geode`. Additionally, I have opted for a more logical and intuitive version number, `1.0.0.APACHE-GEODE-INCUBATING-M2`. And finally, the new artifact/version is even available in [Maven Central](http://search.maven.org/#search%7Cga%7C1%7Cspring-data-geode) now, like [Apache Geode](http://search.maven.org/#search%7Cga%7C1%7Cgeode) itself. Yay!

So, a developer need only declare the following dependency in her Maven POM or `build.gradle` file to start developing Apache Geode applications with *Spring*...

#### [](#-maven-pom)// Maven POM

```
Copy<dependency>
    <groupId>org.springframework.data</groupId>
    <artifactId>spring-data-geode</artifactId>
    <version>1.0.0.APACHE-GEODE-INCUBATING-M2</version>
</dependency>
```

#### [](#-buildgradle)// build.gradle

```
Copydependencies {
    compile 'org.springframework.data:spring-data-geode:1.0.0.APACHE-GEODE-INCUBATING-M2'
}
```

The separate artifact will help users more easily distinguish the support for Apache Geode from the long-time support of Pivotal GemFire using *Spring Data GemFire*.

The version number (`1.0.0`) along with the version qualifier (`APACHE-GEODE-INCUBATING-M2`) not only indicates the level of maturity for both *Spring Data Geode* and Apache Geode, but correspond to one another and also indicates what [release version](http://geode.incubator.apache.org/releases/) of Apache Geode is being supported.

## [](#whats-new)What's New?

This release includes support for *Apache Geode's*

-   [Off-Heap Memory](https://cwiki.apache.org/confluence/display/GEODE/Off-Heap+Memory)
-   [Continuous Queries (CQ)](http://geode.docs.pivotal.io/docs/developing/continuous_querying/chapter_overview.html)
-   Multi-site [WAN](http://geode.docs.pivotal.io/docs/topologies_and_comm/multi_site_configuration/chapter_overview.html) topology configuration

More information about Apache Geode can be found on the [website](http://geode.incubator.apache.org/). Please refer to the *Spring Data GemFire* [project page](http://projects.spring.io/spring-data-gemfire/) along with the [reference guide](http://docs.spring.io/spring-data-gemfire/docs/1.8.1.RELEASE/reference/html) on how to effectively build *Spring* applications using Apache Geode.

## [](#whats-next)What's Next?

I plan to finish the *Spring Boot* [Starter](https://github.com/spring-projects/spring-boot/pull/5445) for Apache Geode along with *Spring Session* [support](https://github.com/spring-projects/spring-session/pull/366).

I also have ideas on how to improve the user experience when configuring either Pivotal GemFire or Apache Geode using *Spring* [Java-based configuration](http://docs.spring.io/spring/docs/current/spring-framework-reference/htmlsingle/#beans-java). You can track my progress on this effort in [SGF-492](https://jira.spring.io/browse/SGF-492).

As always, feedback or help is greatly appreciated.

Happy coding my friends!