---
title: Spring XD 1.0.0.M6 Released
source: https://spring.io/blog/2014/04/16/spring-xd-1-0-0-m6-released
scraped: 2026-02-24T07:27:44.953Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  April 16, 2014 | 0 Comments
---

# Spring XD 1.0.0.M6 Released

_Releases | Mark Pollack |  April 16, 2014 | 0 Comments_

The Spring XD team is pleased to announce that Spring XD Milestone 6 is now [available for download](http://repo.spring.io/simple/libs-milestone-local/org/springframework/xd/spring-xd/1.0.0.M6/spring-xd-1.0.0.M6-dist.zip).

This is our biggest release yet! The team has been hard at work, and Milestone 6 contains a wealth of new features that meet enterprise requirements in terms of reliability, performance, and user experience. Below is a quick Top Ten (in no particular order), but if you checkout the [release notes](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=11401&version=14323) you will realize how difficult it is to pick out 10 from the list of 299.

-   [Distributed and Fault Tolerant Runtime](https://github.com/spring-projects/spring-xd/wiki/XD-Distributed-Runtime): Leader election among multiple xd-admin servers and automatic redeployment of modules to other xd-containers in the case of failure. ZooKeeper is introduced to manage the cluster and its deployment state.
    
-   [Support for running XD on YARN](https://github.com/spring-projects/spring-xd/wiki/Running-on-YARN): Run admin and container nodes on a Hadoop YARN cluster rather than on VMs or physical servers that you need to manage. There are simple configuration and shell scripts that make this process very easy.
    
-   [Deployment Manifests](https://github.com/spring-projects/spring-xd/wiki/XD-Distributed-Runtime#deployment-manifest): When deploying a stream you can provide a deployment manifest that describes how to transform the logical stream definition (e.g. http | hdfs) to a physical deployment on the cluster. You can specify the number of instances of each module to deploy and also a criteria expression (using SpEL) that evaluates each of the available containers in the cluster to determine the best matches for those module instances. This will be an area of active development for the next release as we extend the manifest to include support for data partitioning strategies.
    
-   [Real-Time Evaluation of Machine Learning Scoring Algorithms](https://github.com/spring-projects/spring-xd/wiki/Analytics): Integration with the JPMML-Evaluator library that provides support for a wide range of model types and is interoperable with models exported from popular data analysis packages such as [R](http://www.r-project.org/). Integration with other libraries is supported by providing an implementation of XD's Analytic and MappedAnalytic abstractions. Give it a try with the [sample application](https://github.com/spring-projects/spring-xd-samples/tree/master/analytics-pmml) based on the [classic iris data set](http://en.wikipedia.org/wiki/Iris_flower_data_set).
    
-   [Updated UI](https://github.com/spring-projects/spring-xd/wiki/AdminUI): A redesign and rewrite of the UI that has a modern look and feel.
    
-   Enhanced DSL Auto-completion: Tab completion now works within the value of the --definition option when creating streams and jobs. Creating streams and jobs has never been easier. Try it out via xd-shell!
    
-   [Default stream for the Batch Job lifecycle](https://github.com/spring-projects/spring-xd/wiki/Batch-Jobs#retrieve-job-notifications): Batch jobs are a source of event data. Add a tap to a Batch Job to receive events upon upon job success/failure, individual step actions or even item level actions. This functionality along with the support for launching jobs by sending messages to a named channel, enables your applications to have a complex event-driven flow between the batch and streaming domains.
    
-   [Improved server and module configuration options](https://github.com/spring-projects/spring-xd/wiki/Application-Configuration): Server and module configuration have been separated to help with the life-cycle of upgrading them independently. Module configuration has been made more modular while allowing for shared configuration between related modules.
    
-   [High performance TCP/UDP source](https://github.com/spring-projects/spring-xd/wiki/Sources#reactor-ip): Based on the Reactor project - the Reactor IP source on commodity hardware can consume ~1 Million msgs/second.
    
-   [FTP to HDFS job](https://github.com/spring-projects/spring-xd/wiki/Batch-Jobs#ftp-to-hdfs-export-ftphdfs): Out of the box support for jobs to transfer files from FTP to HDFS. Those jobs take advantage of another new feature: partitioning of steps across multiple XD Containers.
    

**Wrapping up**

You can also install Spring XD on OSX [using homebrew](https://github.com/spring-projects/spring-xd/wiki/Getting-Started#osx-homebrew-installation) and on RHEL/CentOs [using yum](https://github.com/spring-projects/spring-xd/wiki/Getting-Started#redhatcentos-installation).

The Spring XD [project home](http://projects.spring.io/spring-xd/) is the central hub for learning more about Spring XD. Some useful links are the [reference docs](http://docs.spring.io/spring-xd/docs/1.0.0.M6/reference/html/), [sample applications](https://github.com/spring-projects/spring-xd-samples), and [QCon SF 2013 Session Replay: Introducing Spring XD](https://spring.io/blog/2013/11/20/qcon-sf-2013-session-replay-introducing-spring-xd).

We look forward to your comments and feedback:

-   [StackOverflow](http://stackoverflow.com/questions/tagged/spring-xd) `spring-xd` tag
-   [Spring Forum](http://forum.spring.io/forum/spring-projects/xd)
-   [Spring JIRA](https://jira.spring.io/browse/XD)

Our plan is to have a one month cadence of releases leading up to a GA release in July.

**SpringOne 2GX 2014 is around the corner**

Book your place at [SpringOne in Dallas, TX](http://www.springone2gx.com/) for Sept 8-11 soon. It's simply the best opportunity to find out first hand all that's going on and to provide direct feedback. There will be deep dive sessions on Spring XD along with general Big Data talks to provide an introduction to the landscape and challenges in developing Big Data applications.