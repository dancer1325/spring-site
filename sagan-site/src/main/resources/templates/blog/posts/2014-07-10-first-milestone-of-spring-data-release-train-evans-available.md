---
title: First Milestone of Spring Data Release Train Evans Available
source: http://spring.io/blog/2014/07/10/first-milestone-of-spring-data-release-train-evans-available
scraped: 2026-02-23T22:20:33.186Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Christoph Strobl |  July 10, 2014 | 0 Comments
---

# First Milestone of Spring Data Release Train Evans Available

_Releases | Christoph Strobl |  July 10, 2014 | 0 Comments_

We are happy to announce the first milestone of the Spring Data Release train [Evans](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Evans).

-   Spring Data Commons 1.9 M1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-commons/1.9.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/commons/docs/1.9.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/commons/docs/1.9.0.M1/reference/htmlsingle) - [Changelog](http://docs.spring.io/spring-data/commons/docs/1.9.0.M1/changelog.txt)
-   Spring Data JPA 1.7 M1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jpa/1.7.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/jpa/docs/1.7.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/jpa/docs/1.7.0.M1/reference/htmlsingle) - [Changelog](http://docs.spring.io/spring-data/jpa/docs/1.7.0.M1/changelog.txt)
-   Spring Data MongoDB 1.6 M1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-mongodb/1.6.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/mongodb/docs/1.6.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/mongodb/docs/1.6.0.M1/reference/htmlsingle) - [Changelog](http://docs.spring.io/spring-data/mongodb/docs/1.6.0.M1/changelog.txt)
-   Spring Data Neo4j 3.2 M1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-neo4j/3.2.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/neo4j/docs/3.2.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/neo4j/docs/3.2.0.M1/reference/htmlsingle) - [Changelog](http://docs.spring.io/spring-data/neo4j/docs/3.2.0.M1/changelog.txt)
-   Spring Data Solr 1.3 M1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-solr/1.3.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/solr/docs/1.3.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/solr/docs/1.3.0.M1/reference/htmlsingle) - [Changelog](http://docs.spring.io/spring-data/solr/docs/1.3.0.M1/changelog.txt)
-   Spring Data Couchbase 1.2 M1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-couchbase/1.2.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/couchbase/docs/1.2.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/couchbase/docs/1.2.0.M1/reference/htmlsingle) - [Changelog](http://docs.spring.io/spring-data/couchbase/docs/1.2.0.M1/changelog.txt)
-   Spring Data Cassandra 1.1 M1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-cassandra/1.1.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/cassandra/docs/1.1.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/cassandra/docs/1.1.0.M1/reference/htmlsingle) - [Changelog](http://docs.spring.io/spring-data/cassandra/docs/1.1.0.M1/changelog.txt)
-   Spring Data Elasticsearch 1.1 M1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-elasticsearch/1.1.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/elasticsearch/docs/1.1.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/elasticsearch/docs/1.1.0.M1/reference/htmlsingle) - [Changelog](http://docs.spring.io/spring-data/elasticsearch/docs/1.1.0.M1/changelog.txt)
-   Spring Data Gemfire 1.5 M1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-gemfire/1.5.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/gemfire/docs/1.5.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/gemfire/docs/1.5.0.M1/reference/htmlsingle) - [Changelog](http://docs.spring.io/spring-data/gemfire/docs/1.5.0.M1/changelog.txt)
-   Spring Data Redis 1.4 M1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-redis/1.4.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/redis/docs/1.4.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/redis/docs/1.4.0.M1/reference/htmlsingle) - [Changelog](http://docs.spring.io/spring-data/redis/docs/1.4.0.M1/changelog.txt)
-   Spring Data REST 2.2 M1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-rest-webmvc/2.2.0.M1) - [JavaDocs](http://docs.spring.io/spring-data/rest/docs/2.2.0.M1/api) - [Documentation](http://docs.spring.io/spring-data/rest/docs/2.2.0.M1/reference/htmlsingle) - [Changelog](http://docs.spring.io/spring-data/rest/docs/2.2.0.M1/changelog.txt)

There's a bunch of new stuff shipping with this release:

-   Support for Java 8 [default methods](https://github.com/spring-projects/spring-data-examples/blob/master/jpa/java8/src/main/java/example/springdata/jpa/java8/CustomerRepository.java#L42) on repositories.
-   Support for dynamic SpEL based [query parameter expressions](https://github.com/spring-projects/spring-data-examples/blob/master/jpa/security/src/main/java/example/springdata/jpa/security/SecureBusinessObjectRepository.java#L44) in JPA.
-   Enhanced support for MongoDB 2.6 features ([text search](https://jira.spring.io/browse/DATAMONGO-850)).
-   Support for [ALPS](https://jira.spring.io/browse/DATAREST-230) and [excerpt projections](https://jira.spring.io/browse/DATAREST-317) in Spring Data REST.
-   [Spring 4](https://github.com/spring-projects/spring-data-build/issues/94) as new baseline.

Be sure to check out the already [updated examples](https://github.com/spring-projects/spring-data-examples). The team around the participating modules squashed 125 Tickets including 42 bug fixes. Have a look at [Jira](https://jira.spring.io/issues/?filter=14746) for a full list and watch out for upcoming blog posts on selected features.

Get in touch via [Twitter](https://twitter.com/springdata), [StackOverflow](http://stackoverflow.com/questions/tagged/spring-data) or [JIRA](http://jira.spring.io). We're looking forward to your feedback!

---

SpringOne 2GX 2014 is getting close.

Book your place at [SpringOne in Dallas, TX](http://www.springone2gx.com) for Sept 8-11. It's simply the best opportunity to find out first hand what's hot in Spring Data and have a chat with the people involved.