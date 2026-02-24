---
title: Spring Data Release Train Babbage - SR3 Released
source: https://spring.io/blog/2014/02/17/spring-data-release-train-babbage-sr3-released
scraped: 2026-02-24T07:41:15.308Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  February 17, 2014 | 0 Comments
---

# Spring Data Release Train Babbage - SR3 Released

_Releases | Oliver Drotbohm |  February 17, 2014 | 0 Comments_

I am happy to announce the availability of the third service release of the Spring Data Babbage release train. The release includes the following modules:

-   Spring Data Commons 1.6.4 - [Changelog](http://docs.spring.io/spring-data/commons/docs/1.6.4.RELEASE/changelog.txt) - [JavaDoc](http://docs.spring.io/spring-data/commons/docs/1.6.4.RELEASE/api/) - [Artifacts](http://search.maven.org/#artifactdetails%7Corg.springframework.data%7Cspring-data-commons%7C1.6.4.RELEASE%7Cjar)
-   Spring Data JPA 1.4.4 - [Changelog](http://docs.spring.io/spring-data/jpa/docs/1.4.4.RELEASE/changelog.txt) - [JavaDoc](http://docs.spring.io/spring-data/jpa/docs/1.4.4.RELEASE/api/) - [Artifacts](http://search.maven.org/#artifactdetails%7Corg.springframework.data%7Cspring-data-jpa%7C1.4.4.RELEASE%7Cjar)
-   Spring Data MongoDB 1.3.4 - [Changelog](http://docs.spring.io/spring-data/mongodb/docs/1.3.4.RELEASE/changelog.txt) - [JavaDoc](http://docs.spring.io/spring-data/mongodb/docs/1.3.4.RELEASE/api/) - [Artifacts](http://search.maven.org/#artifactdetails%7Corg.springframework.data%7Cspring-data-mongodb%7C1.3.4.RELEASE%7Cjar)
-   Spring Data Neo4j 2.3.4 - [Changelog](http://docs.spring.io/spring-data/neo4j/docs/2.3.4.RELEASE/changelog.txt) - [JavaDoc](http://docs.spring.io/spring-data/neo4j/docs/2.3.4.RELEASE/api/) - [Artifacts](http://search.maven.org/#artifactdetails%7Corg.springframework.data%7Cspring-data-neo4j%7C2.3.4.RELEASE%7Cjar)

The release bundles a bunch of important enhancements and bug fixes and is a recommended upgrade. You can find all issues fixed in this release in our [JIRA](https://jira.springsource.org/issues/?filter=14429).

An important addition to the release is the [release train BOM](http://search.maven.org/#artifactdetails%7Corg.springframework.data%7Cspring-data-releasetrain%7CBabbage-SR3%7Cpom) that allows you to easily upgrade to the service release by including the following dependency into your project:

```xml
Copy<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.springframework-data</groupId>
      <artifactId>spring-data-releasetrain</artifactId>
      <version>Babbage-SR3</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  </dependencies>
</dependencyManagement>
```

This additional dependency will allow you to skip the declarations of the Spring Data module dependency declarations and makes sure you use compatible versions of all Spring Data modules.

In case you want to learn more about Spring Data repositories, be sure to register for our [webinar](https://spring.io/blog/2014/01/21/webinar-spring-data-repositories-best-practices) tomorrow.

The next step will be the final release of the Codd release train scheduled for mid next week. More details about that [here](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Codd).