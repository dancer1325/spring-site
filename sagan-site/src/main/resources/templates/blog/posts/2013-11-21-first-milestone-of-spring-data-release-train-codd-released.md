---
title: First milestone of Spring Data release train Codd released
source: https://spring.io/blog/2013/11/21/first-milestone-of-spring-data-release-train-codd-released
scraped: 2026-02-24T07:51:39.941Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  November 21, 2013 | 0 Comments
---

# First milestone of Spring Data release train Codd released

_Releases | Oliver Drotbohm |  November 21, 2013 | 0 Comments_

I am happy to announce the first milestone of the next Spring Data release train named [Codd](http://en.wikipedia.org/wiki/Edgar_F._Codd). We welcome two new members to the train: the Spring Data Solr community project as well as Spring Data REST. We've fixed 109 tickets for this first milestone. The full list of participating modules looks as follows:

-   Spring Data Build 1.3 M1 - [Changelog](https://github.com/spring-projects/spring-data-build/issues?milestone=8&state=closed)
-   Spring Data Commons 1.7 M1 - [Artifacts](http://repo.springsource.org/libs-milestone/org/springframework/data/spring-data-commons/1.7.0.M1/) - [JavaDoc](http://docs.spring.io/spring-data/commons/docs/1.7.0.M1/api/) - [Documentation](http://docs.spring.io/spring-data/commons/docs/1.7.0.M1/reference/htmlsingle/) - [Changelog](http://docs.spring.io/spring-data/commons/docs/1.7.0.M1/changelog.txt)
-   Spring Data JPA 1.5 M1 - [Artifacts](http://repo.springsource.org/libs-milestone/org/springframework/data/spring-data-jpa/1.5.0.M1/) - [JavaDoc](http://docs.spring.io/spring-data/jpa/docs/1.5.0.M1/api/) - [Documentation](http://docs.spring.io/spring-data/jpa/docs/1.5.0.M1/reference/htmlsingle/) - [Changelog](http://docs.spring.io/spring-data/jpa/docs/1.5.0.M1/changelog.txt)
-   Spring Data MongoDB 1.4 M1 - [Artifacts](http://repo.springsource.org/libs-milestone/org/springframework/data/spring-data-mongodb/1.4.0.M1/) - [JavaDoc](http://docs.spring.io/spring-data/mongodb/docs/1.4.0.M1/api/) - [Documentation](http://docs.spring.io/spring-data/mongodb/docs/1.4.0.M1/reference/htmlsingle/) - [Changelog](http://docs.spring.io/spring-data/mongodb/docs/1.4.0.M1/changelog.txt)
-   Spring Data Neo4j 3.0 M1 - [Artifacts](http://repo.springsource.org/libs-milestone/org/springframework/data/spring-data-neo4j/3.0.0.M1/) - [JavaDoc](http://docs.spring.io/spring-data/neo4j/docs/3.0.0.M1/api/) - [Documentation](http://docs.spring.io/spring-data/neo4j/docs/3.0.0.M1/reference/htmlsingle/) - [Changelog](http://docs.spring.io/spring-data/neo4j/docs/3.0.0.M1/changelog.txt)
-   Spring Data Solr 1.1 M1 - [Artifacts](http://repo.springsource.org/libs-milestone/org/springframework/data/spring-data-solr/1.1.0.M1/) - [JavaDoc](http://docs.spring.io/spring-data/solr/docs/1.1.0.M1/api/) - [Documentation](http://docs.spring.io/spring-data/solr/docs/1.1.0.M1/reference/htmlsingle/) - [Changelog](http://docs.spring.io/spring-data/solr/docs/1.1.0.M1/changelog.txt)
-   Spring Data REST 2.0 M1 - [Artifacts](http://repo.springsource.org/libs-milestone/org/springframework/data/spring-data-rest/2.0.0.M1/) - [JavaDoc](http://docs.spring.io/spring-data/rest/docs/2.0.0.M1/api/) - [Documentation](http://docs.spring.io/spring-data/rest/docs/2.0.0.M1/reference/htmlsingle/) - [Changelog](http://docs.spring.io/spring-data/rest/docs/2.0.0.M1/changelog.txt)

The most important new features are annotation based auditing configuration (`@Enable…Auditing`) for Spring Data Commons, JPA and MongoDB as well as lazy loading for `DBRef`s and improved Aggregation framework support in MongoDB. The JPA modules ships with improved JOIN handling on query derivation. Not that the Codd release is based on Java 6 and Spring 3.2.5, so you will have to upgrade your projects to these versions to use the Codd artifacts.

We collected a [curated changelog](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Codd) for the release in the Spring Data Commons wiki. We highly recommend to skim through it to get an impression of the new features for the modules you're using.

The team is excited about the release and now looking forward to add more features for the upcoming release candidate due in December. We're shooting for a GA release in January. Meanwhile, we're happy to get feedback in our [JIRA](jira.springsource.org) or via [Twitter](https://twitter.com/springdata).