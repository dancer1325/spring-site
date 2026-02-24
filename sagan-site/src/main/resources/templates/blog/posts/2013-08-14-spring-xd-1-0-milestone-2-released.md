---
title: Spring XD 1.0 Milestone 2 Released
source: https://spring.io/blog/2013/08/14/spring-xd-1-0-milestone-2-released
scraped: 2026-02-24T08:00:07.405Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  August 14, 2013 | 0 Comments
---

# Spring XD 1.0 Milestone 2 Released

_Releases | Mark Pollack |  August 14, 2013 | 0 Comments_

Today we are pleased to announce the 1.0 M2 release of Spring XD ([download](http://repo.spring.io/libs-milestone-local/org/springframework/xd/spring-xd/1.0.0.M2/spring-xd-1.0.0.M2.zip))  Spring XD is a unified, distributed, and extensible system for data ingestion, real time analytics, batch processing, and data export.  The project’s goal is to simplify the development of big data applications.

The second milestone release of Spring XD introduces several new features that make it even easier to ingest and process real-time streams of data as well as orchestrate Hadoop based batch jobs.  In this blog post we will cover

-   Shell
-   New sources, sinks and transports
-   DSL improvements
-   Batch Jobs

## Shell

The most noticeable new feature is the introduction of the interactive shell.  The shell provides you an easy way to create new streams and jobs, view metrics, interact with Hadoop, and more.  As an introduction to the shell I will redo some of the examples from the [M1 blog post](http://spring.io/blog/2013/06/12/spring-xd-1-0-milestone-1-released/).

Start Spring XD in single-node mode ($XD\_HOME/bin/xd-singlenode), and in a separate window fire up the shell.  The following example shows how to create a simple stream that writes data posted over http to a file.  Note, the shell provides tab completion hints for the commands.

```sh
Copy$bin>./xd-shell
Welcome to the Spring XD shell. For assistance hit TAB or type "help".

xd:>stream create --name httpStream --definition "http | file"

xd:>tap create --name httpTap --definition "tap httpStream | counter"

xd:>http post --target http://localhost:9000 --data "helloworld"
```

You can list all streams and taps to verify that they were created

```sh
Copyxd:>stream list
Stream Name  Stream Definition
-----------  -----------------
httpStream   http | file

xd:>tap list
Tap Name  Stream Name  Tap Definition
--------  -----------  ------------------------
httpTap   httpStream   tap httpStream | counter
```

If you check the file, located in the directory `/tmp/xd/output/httpStream.out`, you will see the hello world message.

```sh
Copyxd:>! cat /tmp/xd/output/httpStream.out

The httpTap is simply counting messages.  To see the name of the counter created and its value, use the counter shell command

xd:>counter list
Counter name
------------
httpTap

xd:>counter display --name httpTap
1
```

In single-node mode, the counters are in memory but there is also support for Redis, which is the default when not using the single-node mode.  You can enable Redis support with the `–analytics redis` command line argument.

To create a twitter stream that stores data in Hadoop and a real-time counter of the frequency of hashtags in the tweets run the following commands.  Note, to get a consumerKey and consumerSecret you need to register a twitter application. If you don’t already have one set up, you can create an app at the [Twitter Developers](https://dev.twitter.com/apps) site to get these credentials.

```sh
Copyxd:> stream create bieberStream --definition "twittersearch --consumerKey=<your-key> --consumerSecret=<your-secret> --query=bieber | hdfs"

xd:> tap create --name bieberHashTap --definition "tap bieberStream | field-value-counter --fieldName=entities.hashTags.text --counterName=bieberHashCount"

xd:> hadoop config fs --namenode hdfs://localhost:8020

xd:> hadoop fs cat /xd/bieberStream/bieberStream-0.log

... see fun tweets here ...

xd:> fieldvaluecounter display --name bieberHashCount

FieldName=bieberHashCount
-------------------------  -  -----
VALUE                      -  COUNT
mtvhottest                 |  57
MTVHottest                 |  31
MTVhottest                 |  10
mtvhottets                 |  3
MtvHottest                 |  2
MTVHott                    |  2
JustinBieber               |  2
MTVH                       |  2
MTVHOTTEST                 |  2
KCAMEXICO                  |  1
BeliebersAreProudOfJustin  |  1
MyBeliebers                |  1
```

While on the topic of counters, a new [aggregate counter](http://docs.spring.io/spring-xd/docs/1.0.0.M2/reference/html/#aggregate-counter) type was introduced that aggregates the counts for a field in a message into per year, month, day, hour and minute time buckets.

In just a few lines of shell commands you have achieved quite a lot!  Check the [user guide](http://docs.spring.io/spring-xd/docs/1.0.0.M2/reference/html/) for details on all the shell commands.

## DSL improvements

The stream processing pipelines shown so far are linear but there is often the need to support more sophisticated flows.  To start addressing this case, named channels are introduced in M2.  Instead of a source or a sink module you can use a named channel.  In keeping with the unix theme, sourcing/sinking data from/to a particular channel uses the \`>’ character and the name is prefixed with a \`:\`

Here is an example that shows how you can use a named channel to share a data pipeline driven by different input sources.

```sh
Copyxd:>stream create out --definition ":foo > file --name=demo"
xd:>stream create in1 --definition "http > :foo"
xd:>stream create in2 --definition "time > :foo"
xd:>http post --target  http://localhost:9000 --data "hello"
```

Looking at the output file

```sh
Copyxd:>! cat /tmp/xd/output/demo.out
```

You will see the word ‘hello’ intermingled with the timestamp values.  The fanout of a message to multiple streams as well as support for routing messages to different streams based on message content is planned for a future milestone release.

## New Sources, Sinks and Transports

This release provides several additional source and sink modules

-   [MQTT](http://docs.spring.io/spring-xd/docs/1.0.0.M2/reference/html/#mqtt)
-   [RabbitMQ](http://docs.spring.io/spring-xd/docs/1.0.0.M2/reference/html/#rabbit)
-   [Splunk](http://docs.spring.io/spring-xd/docs/1.0.0.M2/reference/html/#splunk)
-   [JDBC](http://docs.spring.io/spring-xd/docs/1.0.0.M2/reference/html/#jdbc_sink)

Also of note is that we have added support for 4 versions of Hadoop

-   hadoop10 - Apache Hadoop 1.0.4 (default)
-   hadoop11 - Apache Hadoop 1.1.2 and Hortonworks Data Platform 1.3
-   hadoop20 - Apache Hadoop 2.0.5-alpha
-   phd1 - Pivotal HD 1.0

You can select the specific distribution jars to use when launching the XDContainer by passing in the command line option `–hadoopDistribution`.  You should be able to use other Hadoop distributions as well, e.g. Hadoop 1.2.x. We will be adding explicit options for additional distributions in later releases. Of note, there is a sample that shows how to use Spring XD with Pivotal HD's HAWQ functionalty in the [samples repository](https://github.com/spring-projects/spring-xd-samples/tree/master/pivotal-hd-demo).

The M1 release provided local and Redis queue backed transports for communication between modules as represented by the pipe symbol in the DSL.  The M2 release provides support for Rabbit backed transports, allowing you take advantage of a full featured message broker for stream ingestion.

## Jobs and Triggers

Batch jobs can be executed using Spring XD and triggers set up to launch these jobs.  As an example, we can reuse the classic wordcount example in Hadoop to provide a simple workflow orchestration that has two steps.  The first step is to copy a file into HDFS and the second to run the wordcount MapReduce job.

To run the example, clone the [spring-xd-samples repository](https://github.com/spring-projects/spring-xd-samples) and build the sample batch-wordcount.  Then copy the jar, config, and data file as shown below.

```sh
Copy$ cd batch-wordcount
$ mvn clean assembly:assembly
$ cp target/batch-wordcount-1.0.0.BUILD-SNAPSHOT-bin/modules/job/* $XD_HOME/modules/job
$ cp target/batch-wordcount-1.0.0.BUILD-SNAPSHOT-bin/lib/* $XD_HOME/lib
$ cp target/batch-wordcount-1.0.0.BUILD-SNAPSHOT-bin/nietzsche-chapter-1.txt /tmp
```

Now stop and restart Spring XD in single-node mode ($XD\_HOME/bin/xd-singlenode).  Then in the shell execute the following command

```sh
Copyxd:> job create --name wordCountJob --definition "wordcount"
```

Alternatively, can also specify a cron expression that [schedules the job](http://docs.spring.io/spring-xd/docs/1.0.0.M2/reference/html/#_execute_the_batch_job) for execution.  You can verify the results by viewing the output from the map reduce job

```sh
Copyxd:> hadoop config fs --namenode hdfs://localhost:8020
xd:> hadoop fs cat /count/out/part-r-00000
```

Having other steps in the workflow, such as executing Hive or Pig scripts are also supported.  To author these types of workflow consult the Spring for Apache Hadoop reference guide. Non-Hadoop based steps are also supported.

## More to come

A major theme of the next release is to expose more administrative functionality for batch jobs by incorporating components of the [Spring Batch Admin](http://docs.spring.io/spring-batch-admin/) project.  You will be able to trigger batch jobs by sending messages to named channels as well as receive job status notifications from named channels.  This would allow you to easily setup the triggering of a batch job based on data availability, for example

```sh
Copyfile --dir "/data/inbound" | jobParameterCreator > :wordCountJob
```

would launch the wordcount batch job when files become available in the directory `/data/inbound` by sending a message to the named channel :wordCountJob..  As a batch job executes, a stream of data would be available for you to consume messages with data about [JobExecution](http://docs.spring.io/spring-batch/apidocs/org/springframework/batch/core/JobExecution.html), [StepExecution](http://docs.spring.io/spring-batch/apidocs/org/springframework/batch/core/StepExecution.html), etc.

```sh
Copy:wordCountJob.notifications > filter --expression "payload.status.equals('COMPLETED')" | email --address "joe@corp.com"
```

The use of channel to exchange data between stream and jobs is one of the areas where you can start to see how Spring XD is taking steps to unify the two domains of stream and batch processing. Stay tuned!