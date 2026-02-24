---
title: Final Service Release for Spring Data Release Train Babbage
source: https://spring.io/blog/2014/03/10/final-service-release-for-spring-data-release-train-babbage
scraped: 2026-02-24T07:38:35.568Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  March 10, 2014 | 0 Comments
---

# Final Service Release for Spring Data Release Train Babbage

_Releases | Oliver Drotbohm |  March 10, 2014 | 0 Comments_

I am happy to announce the availability of the last service release of the Spring Data Babbage release train. The release includes the following modules:

-   Spring Data Commons 1.6.5 - [Changelog](http://docs.spring.io/spring-data/commons/docs/1.6.5.RELEASE/changelog.txt) - [JavaDoc](http://docs.spring.io/spring-data/commons/docs/1.6.5.RELEASE/api/) - [Artifacts](http://search.maven.org/#artifactdetails%7Corg.springframework.data%7Cspring-data-commons%7C1.6.5.RELEASE%7Cjar)
-   Spring Data JPA 1.4.5 - [Changelog](http://docs.spring.io/spring-data/jpa/docs/1.4.5.RELEASE/changelog.txt) - [JavaDoc](http://docs.spring.io/spring-data/jpa/docs/1.4.5.RELEASE/api/) - [Artifacts](http://search.maven.org/#artifactdetails%7Corg.springframework.data%7Cspring-data-jpa%7C1.4.5.RELEASE%7Cjar)
-   Spring Data MongoDB 1.3.5 - [Changelog](http://docs.spring.io/spring-data/mongodb/docs/1.3.5.RELEASE/changelog.txt) - [JavaDoc](http://docs.spring.io/spring-data/mongodb/docs/1.3.5.RELEASE/api/) - [Artifacts](http://search.maven.org/#artifactdetails%7Corg.springframework.data%7Cspring-data-mongodb%7C1.3.5.RELEASE%7Cjar)
-   Spring Data Neo4j 2.3.5 - [Changelog](http://docs.spring.io/spring-data/neo4j/docs/2.3.5.RELEASE/changelog.txt) - [JavaDoc](http://docs.spring.io/spring-data/neo4j/docs/2.3.5.RELEASE/api/) - [Artifacts](http://search.maven.org/#artifactdetails%7Corg.springframework.data%7Cspring-data-neo4j%7C2.3.5.RELEASE%7Cjar)

The release bundles a bunch of important enhancements and bug fixes and is a recommended upgrade. The release forms the last service release of the Babbage release train. Users are recommended to have a look at the latest releases of [Spring Data Codd](https://spring.io/blog/2014/02/24/spring-data-release-train-codd-goes-ga) and upgrade to them going forward.

You can easily upgrade to the service release by including the following dependency into your project:

```xml
Copy<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.springframework.data</groupId>
      <artifactId>spring-data-releasetrain</artifactId>
      <version>Babbage-SR4</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  </dependencies>
</dependencyManagement>
```

The next step will be the first service release of the Codd release train scheduled for mid March as well as a first milestone of the upcoming release train episode Dijkstra. More details about that new release train [here](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Codd).