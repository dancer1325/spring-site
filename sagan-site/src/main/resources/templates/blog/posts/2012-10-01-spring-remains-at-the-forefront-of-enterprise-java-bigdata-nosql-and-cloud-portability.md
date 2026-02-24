---
title: Spring Remains at the Forefront of Enterprise Java: BigData, NoSQL, and Cloud Portability
source: https://spring.io/blog/2012/10/01/spring-remains-at-the-forefront-of-enterprise-java-bigdata-nosql-and-cloud-portability
scraped: 2026-02-24T08:16:02.764Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Adrian Colyer |  October 01, 2012 | 0 Comments
---

# Spring Remains at the Forefront of Enterprise Java: BigData, NoSQL, and Cloud Portability

_Engineering | Adrian Colyer |  October 01, 2012 | 0 Comments_

It’s JavaOne time again and this year you’ll find sessions on how Spring works with Java SE to address [Big Data](https://oracleus.activeevents.com/connect/sessionDetail.ww?SESSION_ID=3461), [NoSQL](https://oracleus.activeevents.com/connect/sessionDetail.ww?SESSION_ID=7651), and enterprise [integration](https://oracleus.activeevents.com/connect/sessionDetail.ww?SESSION_ID=6960) challenges. We’ve always worked hard to ensure that Spring remains at the forefront of enterprise Java by providing timely support for emerging trends and technologies. The numbers suggest that our users appreciate this. A recent report from Evans Data ("Spring Source Usage Study," Evans Data Corporation, September 2011) shows:

-   **Spring is the framework of choice among expert Java developers**. More than two thirds of Java developers are either using Spring today or planning to do so
-   **Spring usage continues to grow**. More than half of existing Spring users expect to grow or significantly grow their use of Spring.
-   **Spring is delivering results**. 70% of Spring users indicate at least a 50% productivity gain by using Spring and 73% indicate at least a 50% time reduction to deliver a completed project.
-   **Spring users are at the forefront of enterprise Java**. Spring users are more cloud ready, and Spring adopters are more likely to have already deployed applications to the cloud.

Spring has always offered deployment flexibility. In the early days this meant a choice of application servers, but now this extends to choice of cloud platforms including our own Cloud Foundry. Spring has always provided strong data access support. In the early days this meant a choice of approaches for accessing a relational database, today this extends to a range of Big Data and NoSQL stores, data processing, and in-memory data grid capabilities. Spring has always valued developer productivity and provided first class support for writing server-side web applications. Today this extends to meet the modern requirements of HATEOAS-based REST APIs.

These are real and pressing concerns within the enterprise today. Cloud is everywhere, and now Big Data is firmly on the enterprise project radar too, creating a range of new requirements:

-   Big Data: the need to store and get analytics from gigabytes, terabytes or petabytes of unstructured or semi-structured data
-   Fast Data: the increasing need for low latency interactions with large sets of data, often driven by today’s mobile and social apps
-   Flexible Data: the need to adapt data access to the most appropriate model for each application
-   Cloud Delivery: the growing demand to access data as a service, provisioned on the cloud of your choice.

The latest [Harvard Business Review survey](http://blogs.hbr.org/cs/2012/09/whos_really_using_big_data.html) indicates that 85% of organizations have Big Data initiatives planned or in progress. Application developers need to deliver capable, high quality solutions that integrate with this new world and can be deployed anywhere, on or off premise. NoSQL and NewSQL are also being used to address a wide range of use cases including:

-   Managing large data streams of non-transactional data (logs, clickstreams)
-   Fraud detection
-   Timelines (a la Twitter)
-   Synching offline and online data
-   Online gaming
-   Document, catalog and content management
-   Archiving - storing a large continual stream of data that is still accessible on-line
-   Embedded systems (small footprint databases in devices)

See this [High Scalability blog entry](http://highscalability.com/blog/2010/12/6/what-the-heck-are-you-actually-using-nosql-for.html) for more details.

[451 Research’s recent survey data](http://www.slideshare.net/mattaslett/mysql-vs-nosql-and-newsql-survey-results-13073043) highlights the changing shape of the data landscape. One size no longer fits all.

![](http://www.springsource.org/files/blog/image002.jpg)

Enterprise developers can start taking advantage of these new technologies today with Spring and the familiar Spring programming model. Spring offers:

-   Big Data processing via Spring Data’s support for [Apache Hadoop](http://www.springsource.org/spring-data/hadoop) and [HBase](http://www.springsource.org/spring-data/hadoop), as well as [Spring Batch](http://www.springsource.org/spring-batch) and [Spring Integration](http://www.springsource.org/spring-integration)
-   In-Memory data grid support via Spring Data [GemFire](http://www.springsource.org/spring-gemfire)
-   Support for NoSQL key-value stores with Spring Data [Redis](http://www.springsource.org/spring-data/redis)
-   Support for NoSQL document stores with Spring Data [MongoDB](http://www.springsource.org/spring-data/mongodb)
-   Support for NoSQL graph databases with Spring Data [Neo4j](http://www.springsource.org/spring-data/neo4j)
-   Support for NewSQL databases with [SQLFire](http://www.vmware.com/products/application-platform/vfabric-sqlfire/overview.html)
-   And of course traditional relational databases, such as MySQL, [Postgres](http://www.vmware.com/products/application-platform/vfabric-postgres/overview.html), Oracle, and DB2, [still have their place](http://www.dbms2.com/2011/05/29/when-to-use-relational-database-management-system/) and can be accessed via [Spring JPA](http://www.springsource.org/spring-data/jpa) and [Spring JDBC](http://www.springsource.org/spring-data/jdbc-extensions) Extensions, and made accessible via Spring Data [REST](http://www.springsource.org/spring-data/rest)

The thriving open source community around NoSQL, together with Spring, makes developing for the next generation of data stores and data processing more productive today. We don’t provide a single Java API for all persistence stores; this is not realistic given the fundamental differences between them. But we do provide a common and familiar programming model based on the concepts of templates and, where available, repositories. See Tobias Trelle’s recent [InfoQ article](http://www.infoq.com/articles/spring-data-intro) for more details.

All in all, JavaOne 2012 is sure to be an action packed week, full of great Java tech talks, keynotes, and sessions including coverage of our own [Big Data](https://oracleus.activeevents.com/connect/sessionDetail.ww?SESSION_ID=3461), [NoSQL](https://oracleus.activeevents.com/connect/sessionDetail.ww?SESSION_ID=7651), and [integration](https://oracleus.activeevents.com/connect/sessionDetail.ww?SESSION_ID=6960) initiatives. Developers who want to get hands on with these technologies now also won't want to miss [SpringOne 2GX](http://www.springone2gx.com/conference/washington/2012/10/home) in Washington DC October 15-18, 2012. We have a packed technical agenda covering all aspects of modern enterprise application development.