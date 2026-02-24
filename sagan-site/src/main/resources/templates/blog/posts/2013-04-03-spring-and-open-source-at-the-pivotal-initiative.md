---
title: Spring and Open Source at the Pivotal Initiative
source: https://spring.io/blog/2013/04/03/spring-and-open-source-at-the-pivotal-initiative
scraped: 2026-02-24T08:06:33.044Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Adrian Colyer |  April 03, 2013 | 0 Comments
---

# Spring and Open Source at the Pivotal Initiative

_Engineering | Adrian Colyer |  April 03, 2013 | 0 Comments_

By now you’ve probably heard about [Pivotal](http://www.wired.com/wiredenterprise/2013/02/pivotal/). I’d like to take a moment here to explain what this means for Spring, and to tell you about some of our plans for 2013.

In case you missed it, here’s the essential background on Pivotal: Led by Paul Maritz, the initiative unites key people and projects from across EMC and VMware to [bring “consumer grade” technology to the enterprise](http://gigaom.com/2013/03/19/the-world-is-ready-for-the-consumer-grade-enterprise/). We see a new generation of applications emerging that are powered by new data fabrics and will interact with and serve customers in the context of who they are, where they are, and what they are doing in the moment. These applications will be built, deployed, and scaled at unprecedented pace. They will store, manage, and deliver value from large data sets, and do all of this on one unified platform underpinned by open source technologies.

… and now we return to our regularly scheduled broadcast.

Our Spring teams are part of the Pivotal and Spring is central to the Pivotal strategy together with [Pivotal HD](http://www.infoq.com/news/2013/02/Pivotal-HD-SQL-Hadoop) and [Cloud Foundry](http://cloudfoundry.com/).  Spring [is a dominant force in the enterprise](http://zeroturnaround.com/labs/developer-productivity-report-2012-java-tools-tech-devs-and-data/#!/) and we have a really strong roadmap laid out for 2013 including, but by no means limited to, the release of Spring Framework 4. This will be only the third time in our history that we have incremented the major version of Spring and it is not something we do lightly. You have every reason to expect great things of us, and we do not intend to disappoint you!

As part of the Pivotal, Spring will continue to be driven forward by the Spring project leads: Juergen Hoeller, Chris Beams, Mark Fisher, Mark Pollack, and many others whom you’ve all come to know and trust over the years. Their experience, deep technical knowledge and innovative thinking will continue to guide Spring’s development.

Focus areas for Spring in 2013 include facilitating modern application architectures, tackling big data application complexity, and improving the end-to-end Spring developer experience. The [Spring Framework 4.0 roadmap](http://blog.springsource.org/2013/01/16/next-stop-spring-framework-4-0/) will ensure you can fully exploit the latest developments in the Java ecosystem. With Java SE 8 in particular, it’s as if it was made for Spring! Lambda expressions work beautifully with our long-term approach to templates and callback interfaces. For example, here’s how the venerable JDBC template might look with lambdas:

Person person = jdbcTemplate.queryForObject(
                    “select name, age from person where id = 42”,
                    (rs, rowNum) -> {
                               return new Person(
                                   rs.getString(“name”),
                                   rs.getInt(“age”)
                               );
                     });

We will also be investigating asynchronous web usage patterns and non-servlet based runtime support. As part of improving the end-to-end developer experience we plan to bring our documentation, samples and website fully up to date to focus on best practices in enterprise application development. Expect to see more task-oriented as opposed to project-oriented materials.

When it comes to tackling big data application complexity we will be building on the [great progress Spring has already made in these areas](http://blog.springsource.org/2012/10/01/spring-remains-at-the-forefront-of-enterprise-java-bigdata-nosql-and-cloud-portability/). As Hadoop-based data fabrics continue to emerge in the enterprise we aim to provide a unified, simplified experience for big data application development, including distributed data ingestion and real-time analytics, Hadoop workflow orchestration, and data export from HDFS to relational and non-relational stores. You'll hear much more from us on this in the months to come — [Spring for Apache Hadoop 1.0](http://adtmag.com/articles/2013/02/28/spring-for-apache-hadoop.aspx) is just the beginning. Spring for Apache Hadoop works with all the major Hadoop distributions – Hortonworks, Cloudera, MapR, and our own Pivotal HD Community Edition, and is fully integrated in the commercial Pivotal HD.

[Groovy](http://groovy.codehaus.org/ "Groovy") and [Grails](http://grails.org "Grails") are part of the extended Spring family. If you like the look of Java SE 8, but fear it may take some time before your organization embraces it as a production runtime then there is good news: the Groovy language already offers modern features such as closures and functional programming styles, together with optional static typing, and all fully supported on JRE 6 and 7! Groovy is increasingly being used by those looking for enhanced productivity, expressive DSL support, and first class integration with the Java language and libraries. These features also make developing asynchronous and parallel applications simpler. Tighter integration with Groovy is on the roadmap for Spring Framework 4, and Groovy provides a compelling complement to Java even if you do have access to SE 8.

Grails 3.0 will separate Grails from the traditional application server [and extend Grails’ reach to allow for the development of lightweight, asynchronous applications](http://grails.io/post/45774038833/road-to-grails-2-3-async-support). Grails’ persistence technology GORM has also been evolving beyond the traditional relational database, with implementations for NoSQL databases now available. GORM will continue to be an important technology for us as enterprise data fabrics evolve.

[**Cloud Foundry**](http://www.cloudfoundry.com), the open platform-as-a-service project, is also part of the Pivotal Initiative. We’ll be making sure that there is first class support for Spring and Grails apps in Cloud Foundry – both in the public cloud and inside the enterprise. For more details on Cloud Foundry as part of the Pivotal Initiative please check out the [Cloud Foundry Blog](http://blog.cloudfoundry.com/2013/03/07/cloud-foundry-is-open-and-pivotal/). [RabbitMQ](http://rabbitmq.org "RabbitMQ"), [Redis](http://redis.io "Redis"), and our contributors to Apache Tomcat are all coming along for the ride too!

### Don’t miss SpringOne 2GX this year

The best place to get all of the in-depth information, meet with the project leads, and be part of the Spring story is at our [SpringOne 2GX 2013](http://www.springone2gx.com) conference **Sept 9-13 in Santa Clara, CA.** There is so much we want to share with you that we’ve *already* started planning the keynotes to figure out how best to fit it all in. That’s a lot more prepared than we were heading into the [first ever SpringOne](http://www.springsource.org/node/203) (then called The Spring Experience) in 2005, I can assure you!