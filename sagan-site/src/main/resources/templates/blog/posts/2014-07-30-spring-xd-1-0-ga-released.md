---
title: Spring XD 1.0 GA Released
source: http://spring.io/blog/2014/07/30/spring-xd-1-0-ga-released
scraped: 2026-02-23T22:18:44.098Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  July 30, 2014 | 1 Comment
---

# Spring XD 1.0 GA Released

_Releases | Mark Pollack |  July 30, 2014 | 1 Comment_

On behalf of the Spring XD team, I am very pleased to announce the general availability of Spring XD 1.0! You can [download the zip distribution](http://repo.spring.io/release/org/springframework/xd/spring-xd/1.0.0.RELEASE/spring-xd-1.0.0.RELEASE-dist.zip). You can also install on OSX [using homebrew](https://github.com/spring-projects/spring-xd/wiki/Getting-Started#osx-homebrew-installation) and on RHEL/CentOs [using yum](https://github.com/spring-projects/spring-xd/wiki/Getting-Started#redhatcentos-installation).

Spring XD's goal is to be your one stop shop for developing and deploying Big Data Applications. Such applications require a wide range of technologies to address different use-cases while interoperating as a cohesive process. The steps in this process include:

-   Data collection
-   Real-time streaming and analytics
-   Data cleansing
-   Batch processing (both on and off Hadoop)
-   Machine learning and exploratory data analysis
-   Visualization and Reporting
-   Closed loop analytics between real-time and batch processing

Spring XD brings together many of these steps into a single unified runtime platform so you can address as many use-cases as possible. You don't have to piece together a large number of individual projects, each with its own configuration and programming model. Instead, with Spring XD, you can quickly get started developing an end-to-end solution with a simple but powerful DSL and scale it out.

Spring XD provides:

-   [A distributed, fault tolerant and scalable runtime](https://github.com/spring-projects/spring-xd/wiki/XD-Distributed-Runtime)
-   A unified platform for [Stream](https://github.com/spring-projects/spring-xd/wiki/Streams) and [Batch](https://github.com/spring-projects/spring-xd/wiki/Batch-Jobs) Processing supporting
    -   Popular [sources](https://github.com/spring-projects/spring-xd/wiki/Sources), [processors](https://github.com/spring-projects/spring-xd/wiki/Processors), and [sinks](https://github.com/spring-projects/spring-xd/wiki/Sinks) for stream processing
    -   Stream processing using [NoSQL Analytics](https://github.com/spring-projects/spring-xd/wiki/Analytics#counters-and-gauges)
    -   [Hadoop Batch workflow orchestration](https://github.com/spring-projects/spring-xd/wiki/Creating-a-Job-Module#orchestrating-hadoop-jobs)
    -   [Off-Hadoop Batch Jobs](https://github.com/spring-projects/spring-xd/wiki/Batch-Jobs#import-csv-files-to-jdbc-filejdbc)
    -   Closed loop machine learning from Batch to [Real-time scoring](https://github.com/spring-projects/spring-xd/wiki/Analytics#predictive-analytics) via [JPMML](https://github.com/jpmml)
-   Runtime portability: easy to setup, operate and deploy on [VM/on-metal cluster](https://github.com/spring-projects/spring-xd/wiki/Running-Distributed-Mode), [YARN](https://github.com/spring-projects/spring-xd/wiki/Running-on-YARN), or [EC2](https://github.com/spring-projects/spring-xd-ec2)
-   Hadoop distribution portability: certified against [six Hadoop distributions](https://github.com/spring-projects/spring-xd/wiki/Running-Distributed-Mode#using-hadoop)
-   Enterprise readiness as it is built on proven Spring foundation projects such as Spring Integration, Spring Batch, and Spring Data
-   Ease of use
    -   [DSL](https://github.com/spring-projects/spring-xd/wiki/DSL-Reference) to create streams and jobs using many pre-built components
    -   [Interactive Shell](https://github.com/spring-projects/spring-xd/wiki/Shell) with tab completion
    -   [Admin UI](https://github.com/spring-projects/spring-xd/wiki/AdminUI) and [REST API](https://github.com/spring-projects/spring-xd/wiki/REST-API)
    -   Easy to [develop and test custom modules](https://github.com/spring-projects/spring-xd/wiki/Creating-a-Source-Module#test-the-module-locally) as well as [extend the runtime](https://github.com/spring-projects/spring-xd/wiki/Extending-XD).
    -   Custom modules can easily incorporate other Spring projects, such as those in Spring Data, e.g. Spring Data REST for creating dashboards

There are several resources available to help you get started using Spring XD.

-   [InfoQ article](http://www.infoq.com/articles/introducing-spring-xd)
-   [Spring XD Meetup Recording](http://bit.ly/POSHyt0005)
-   [Getting Started Guide](https://spring.io/guides/gs/spring-xd/)
-   [Project Page](http://projects.spring.io/spring-xd/)
-   [Reference Documentation](http://docs.spring.io/spring-xd/docs/1.0.0.RELEASE/reference/html/)

There are many samples available in our [samples repository](https://github.com/spring-projects/spring-xd-samples) Here are a few that show the range of functionality available

-   [Twitter Streaming Dashboard](https://github.com/spring-projects/spring-xd-samples/tree/master/analytics-dashboard)
-   [Batch Analysis of Tweet hashtags](https://github.com/spring-projects/spring-xd-samples/tree/master/batch-hashtag-count)
-   [Scoring in real-time with JPMML](https://github.com/spring-projects/spring-xd-samples/tree/master/analytics-pmml)

This was a great team effort, with over a dozen active contributors spread around the world working for 68 weeks, divided into 32 sprints, resolving 1,650 issues in 2000 commits, 1,000 tests, and 270 pages of documentation. The 51,000 HipChat messages helped keep the team in constant contact and searching for [new emoticons](http://hipchat-emoticons.nyh.name/) and [fun images](http://bit.ly/engineer-dance)

Thanks for all the feedback from early adopters. Feedback is very important, so please get in touch with questions and comments via

-   [StackOverflow](http://stackoverflow.com/questions/tagged/spring-xd) `spring-xd` tag
-   [Spring JIRA](https://jira.spring.io/browse/XD/?selectedTab=com.atlassian.jira.jira-projects-plugin:summary-panel) or [GitHub Issues](https://github.com/spring-projects/spring-xd/issues)

**SpringOne 2GX 2014 is around the corner**

Book your place at [SpringOne in Dallas, TX](http://www.springone2gx.com/) for Sept 8-11 soon. It's simply the best opportunity to find out first hand all that's going on and to provide direct feedback. There will be deep dive sessions on Spring XD along with general Big Data talks to provide an introduction to the landscape and challenges in developing Big Data applications.