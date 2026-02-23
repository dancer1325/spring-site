---
title: Spring Data GemFire supports Apache Geode
source: https://spring.io/blog/2015/06/12/spring-data-gemfire-supports-apache-geode
scraped: 2026-02-23T19:49:48.418Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | John Blum |  June 12, 2015 | 1 Comment
---

# Spring Data GemFire supports Apache Geode

_Releases | John Blum |  June 12, 2015 | 1 Comment_

I am pleased to announce that *Spring Data GemFire* now has support for *Apache Geode*.

#### [](#what-is-apache-geode)What is *Apache Geode*?

In a nutshell, [Apache Geode](http://geode.incubator.apache.org/) is the [open source](https://github.com/apache/incubator-geode) core of [Pivotal GemFire](https://pivotal.io/big-data/pivotal-gemfire). Geode was recently accepted into the [Apache incubator](https://wiki.apache.org/incubator/GeodeProposal) after being submitted by Pivotal to the Apache Software Foundation as part of the [BDS](https://pivotal.io/big-data/pivotal-big-data-suite) open sourcing effort.

Technically, *Apace Geode* is an in-memory, distributed database (a.k.a. IMDG) enabling new as well as existing Spring/Java applications to operate at cloud scale with high availability and predictable latency without sacrificing consistency. Applications are able to transact and analyze *Big Data* in realtime to achieve meaningful and impactful business results.

While that may sound complicated, *Spring Data GemFire* delivers on Spring's promise of enabling developers to effectively build highly-scalable applications with *Apache Geode*, or alternatively *Pivotal GemFire*, using Spring's comprehensive and powerful programming model to abstract away the complexity.

#### [](#get-started)Get Started

To start building Spring applications with *Apache Geode*, just include the *Spring Data GemFire* dependency in your project Gradle build file, or Maven POM, like so...

##### [](#buildgradle)build.gradle

```
Copydependencies {
    compile "org.springframework.data:spring-data-gemfire:1.7.0.APACHE-GEODE-EA-SNAPSHOT"
}
```

##### [](#pomxml)pom.xml

```
Copy<dependency>
    <groupId>org.springframework.data</groupId>
    <artifactId>spring-data-gemfire</artifactId>
    <version>1.7.0.APACHE-GEODE-EA-SNAPSHOT</version>
    <scope>compile</scope>
</dependency>
```

*Spring Data GemFire* artifacts are available in the Spring `libs-snapshot` repository...

```
Copy<repository>
  <id>spring-libs-snapshot</id>
  <name>Spring Maven libs-snapshot Repository</name>
  <url>https://repo.spring.io/libs-snapshot</url>
</repository>
```

Version **1.7.0** coincides with the first version of SDG to offer *Apache Geode* support and includes all the latest developments in SDG as of **1.7**.

The **APACHE-GEODE-EA-SNAPSHOT** version qualifier distinguishes SDG builds for *Apache Geode* from SDG builds for *Pivotal GemFire*, 1.7.0- **BUILD-SNAPSHOT**.

So, why announce a "snapshot-like" release when traditional Spring release announcements center around milestones, release candidates and final GA?

Mainly because *Apache Geode* has no official releases yet. But more importantly, we want to give developers a chance to try out *Apache Geode* in Spring-based applications using *Spring Data GemFire* in order to get feedback as soon as possible.

While the [*Spring Data GemFire* version with *Apache Geode* support](https://github.com/spring-projects/spring-data-gemfire/tree/apache-geode) is stable enough for development purposes, it is not quite ready to be integrated into `master` given technical differences between *Apache Geode* and *Pivotal GemFire*. Essentially, *Pivotal GemFire* must converge with *Apache Geode* to support both on the same *Spring Data GemFire* branch.

If you are familiar with developing *Pivotal GemFire* applications using *Spring Data GemFire*, then you already know how to use *Apache Geode*. If not, the *Spring Data GemFire* [reference guide](http://docs.spring.io/spring-data-gemfire/docs/1.7.0.M1/reference/html/) and [examples](https://github.com/spring-projects/spring-gemfire-examples) are a good starting place as is the [Guides](https://spring.io/guides) on [spring.io](https://spring.io/). In particular, check out [Accessing Data with GemFire](https://spring.io/guides/gs/accessing-data-gemfire/) and [Caching Data with GemFire](https://spring.io/guides/gs/caching-gemfire/), or [Accessing GemFire Data with REST](https://spring.io/guides/gs/accessing-gemfire-data-rest/).

Try things out. If you have any feedback, I welcome your ideas and questions in [JIRA](https://jira.spring.io/browse/SGF) and on [StackOverflow](http://stackoverflow.com/questions/tagged/spring-data-gemfire) as well as any contributions by submitting [PRs on GitHub](https://github.com/spring-projects/spring-data-gemfire/pulls).

#### [](#get-involved)Get Involved

In addition to building Spring applications with *Apache Geode*, now is the perfect time to get involved in the Geode community and contribute to a growing Apache project from the ground up. There are many ways you can [participate](http://geode.incubator.apache.org/contribute/).

#### [](#conclusion)Conclusion

*Apache Geode* was a significant contribution to ASF given the only [features](http://gemfire.docs.pivotal.io/latest/userguide/index.html#getting_started/product_intro.html#concept_3B5E445B19884680900161BDF25E32C9) of *Pivotal GemFire* not available in *Apache Geode* were [Continuous Queries (CQs)](http://gemfire.docs.pivotal.io/latest/userguide/index.html#developing/continuous_querying/chapter_overview.html) and multi-site, [WAN replication](http://gemfire.docs.pivotal.io/latest/userguide/index.html#topologies_and_comm/multi_site_configuration/chapter_overview.html). To gain a better understanding of *Apache Geode*, check out the [Getting Started](http://geode.incubator.apache.org/getting-started/) page.

If you are in the area, you can also learn more by attending a session on *Apache Geode* during this [Meetup](http://www.meetup.com/Toronto-Pivotal-User-Group/events/222239293/) at the Pivotal Labs office in Toronto, ON, Canada on Wednesday, June 24th, 2015, 6:30 PM.

Finally, *Luke Shannon* and I will also be talking about *Apache Geode* and *Spring Data GemFire* in our session, ["Building Highly-Scalable Spring Applications with In-Memory, Distributed Data Grids"](https://2015.event.springone2gx.com/schedule/sessions/building_highly_scalable_spring_applications_with_in_memory_distributed_data_grids.html) at SpringOne again this year.

Don't miss it!

---

#SpringOne 2GX 2015 is around the corner! Book your place at [SpringOne2GX in Washington, DC soon](http://www.springone2gx.com). Super Early Bird Price expires June 12th! It's simply the best opportunity to find out first hand all that's going on and to provide direct feedback.

#Discounts

-   The Super Early Bird price tier ($300 discount) expires June 12th. The Early Bird price tier (June 13th - August 14th) is discounted $150.
-   Register 4 and get the 5th pass free. Contact us with the names of your first 4 registrants for your complimentary pass code (conference admission only).
-   Alumni, contact us for your discount code ($150 off any option).