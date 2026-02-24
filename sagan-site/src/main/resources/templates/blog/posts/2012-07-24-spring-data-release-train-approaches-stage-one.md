---
title: Spring Data release train approaches stage one
source: https://spring.io/blog/2012/07/24/spring-data-release-train-approaches-stage-one
scraped: 2026-02-24T08:19:03.264Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  July 24, 2012 | 0 Comments
---

# Spring Data release train approaches stage one

_Releases | Oliver Drotbohm |  July 24, 2012 | 0 Comments_

I'd like to announce the availablity of new milestone and bugfix releases of Spring Data Commons (1.3.2.RELEASE, 1.4.0.M1), JPA (1.1.1.RELEASE, 1.2.0.M1) and MongoDB (1.0.3.RELEASE, 1.1.0.M2). The releases mark the very first step to a common release train that will reach the next major release mid August and include Spring Data Commons, JPA, MongoDB, Neo4J and Gemfire. The release train is an effort to simultaneously release all store modules that support the repository abstraction and thus have a common set of functionality to provide. Beyond that this will make sure the released stores interoperate with each other seamlessly.

This first milestone release includes support for JavaConfig based repository configuration by introducing `@EnableJpaRepositories`, `@EnableMongoRepository` etc. Beyond that we of course have a ton of bug fixes and improvements. For details follow the links below.

We'll have release candidates for the next major versions out there in early August, followed by the GA versions briefly after that. For more detailled information on the release train please have a look at the [wiki page](https://github.com/SpringSource/spring-data-commons/wiki/Release-planning) in Spring Data Commons.

-   Spring Data Commons 1.3.2.RELEASE  
    [Maven artifacts](http://search.maven.org/#search%7Cga%7C1%7Cspring-data-jpa) | [JavaDocs](http://static.springsource.org/spring-data/data-commons/docs/1.3.2.RELEASE/api/) | [Reference Documentation](http://static.springsource.org/spring-data/data-commons/docs/1.3.2.RELEASE/reference/html/) | [Changelog](http://static.springframework.org/spring-data/data-commons/docs/1.3.2.RELEASE/changelog.txt)
-   Spring Data Commons 1.4.0.M1  
    [Maven artifacts](http://repo.springsource.org/libs-milestone/org/springframework/data/spring-data-commons/1.4.0.M1) | [JavaDocs](http://static.springsource.org/spring-data/data-jpa/docs/1.2.0.M1/api/) | [Reference Documentation](http://static.springsource.org/spring-data/data-commons/docs/1.4.0.M1/reference/html/) | [Changelog](http://static.springframework.org/spring-data/data-commons/docs/1.4.0.M1/changelog.txt)

-   Spring Data JPA 1.1.1.RELEASE  
    [Maven artifacts](http://search.maven.org/#search%7Cga%7C1%7Cspring-data-jpa) | [JavaDocs](http://static.springsource.org/spring-data/data-jpa/docs/1.1.1.RELEASE/api/) | [Reference Documentation](http://static.springsource.org/spring-data/data-jpa/docs/1.1.1.RELEASE/reference/html/) | [Changelog](http://static.springframework.org/spring-data/data-jpa/docs/1.1.1.RELEASE/changelog.txt)
-   Spring Data JPA 1.2.0.M1  
    [Maven artifacts](http://repo.springsource.org/libs-milestone/org/springframework/data/spring-data-jpa/1.2.0.M1) | [JavaDocs](http://static.springsource.org/spring-data/data-jpa/docs/1.2.0.M1/api/) | [Reference Documentation](http://static.springsource.org/spring-data/data-jpa/docs/1.2.0.M1/reference/html/) | [Changelog](http://static.springframework.org/spring-data/data-jpa/docs/1.2.0.M1/changelog.txt)

-   Spring Data MongoDB 1.0.3.RELEASE  
    [Maven artifacts](http://search.maven.org/#search%7Cga%7C1%7Cspring-data-mongodb) | [JavaDocs](http://static.springsource.org/spring-data/data-mongodb/docs/1.0.3.RELEASE/api/) | [Reference Documentation](http://static.springsource.org/spring-data/data-mongodb/docs/1.0.3.RELEASE/reference/html/) | [Changelog](http://static.springframework.org/spring-data/data-mongodb/docs/1.0.3.RELEASE/changelog.txt)
-   Spring Data MongoDB 1.1.0.M2  
    [Maven artifacts](http://repo.springsource.org/libs-milestone/org/springframework/data/spring-data-mongodb/1.1.0.M2) | [JavaDocs](http://static.springsource.org/spring-data/data-mongodb/docs/1.1.0.M2/api/) | [Reference Documentation](http://static.springsource.org/spring-data/data-mongodb/docs/1.1.0.M2/reference/html/) | [Changelog](http://static.springframework.org/spring-data/data-mongodb/docs/1.1.0.M2/changelog.txt)

The bugfix versions are available from the [SpringSource release repository](http://repos.springsource.org/libs-releases) and will be synced to Maven central in a bit, the milestones from our [milestone repository](http://repo.springsource.org/libs-milestones). Looking forward to your feedback in the [forums](http://forum.springsource.org) or the [bug tracker](https://jira.springsource.org).