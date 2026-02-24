---
title: Spring XD 1.0 Milestone 1 Released
source: https://spring.io/blog/2013/06/12/spring-xd-1-0-milestone-1-released
scraped: 2026-02-24T08:03:53.194Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Pollack |  June 12, 2013 | 0 Comments
---

# Spring XD 1.0 Milestone 1 Released

_Engineering | Mark Pollack |  June 12, 2013 | 0 Comments_

Today we are pleased to announce the 1.0 M1 release of Spring XD  [(download)](http://repo.springsource.org/libs-milestone-local/org/springframework/xd/spring-xd/1.0.0.M1/spring-xd-1.0.0.M1-dist.zip).Spring XD is a unified, distributed, and extensible system for data ingestion, real time analytics, batch processing, and data export.  The project’s goal is to simplify the development of big data applications.

From the 10,000 foot view, big data applications share many characteristics with Enterprise Integration and Batch applications.  Spring has provided proven solutions for building integration and batch applications for more than 6 years now via the Spring Integration and Spring Batch projects.  Spring XD builds upon this foundation and provides a lightweight runtime environment that is easily configured and assembled via a simple DSL.

In this blog we will introduce the key components of Spring XD, namely Streams, Jobs, Taps, Analytics and the DSL used to declare them, as well as the runtime architecture.  Many more details can be found in the [XD Guide](http://static.springsource.org/spring-xd/docs/1.0.0.M1/reference/html/).

## Streams

A Stream defines how data is collected, processed and stored or forwarded.  For example, a stream may collect syslog data, filter it, and store it in HDFS.  Spring XD provides a DSL to define a stream.  The DSL allows you to start simple using a UNIX pipes-and-filters syntax to build a linear processing flow but lets you also describe more complex flows using an extended syntax.

### Sources and Sinks

A simple linear stream consists of the sequence: Input Source, (optional) Processing Steps, and an Output Sink.  As a simple example consider the collection of data from a HTTP Source writing to a File Sink. The DSL to describe this stream is

```text
Copyhttp | file
```

You tell Spring XD to create a stream by making a HTTP request to the XD Admin Server which runs on port 8080 by default.  In the M2 release we will provide an interactive shell to communicate with XD, but for M1 the easiest way is to interact with XD is using ‘curl’.

```text
Copycurl -d "http | file" http://localhost:8080/streams/httptest
```

The name of the stream is `httptest`, the default HTTP port to listen on is `9000`, and the default file location is `/tmp/xd/output/${streamname}`.

If you post some data on port 9000 with curl

```text
Copycurl -d "hello world" http://localhost:9000
```

You will see the string hello world inside the file `/tmp/xd/output/httptest`

To change the default values, you can pass in option arguments

```text
Copyhttp --port=9090 | file --dir=/var/streams --name=data.txt
```

The [supported sources](http://static.springsource.org/spring-xd/docs/1.0.0.M1/reference/html/#sources) in M1 are file, time, HTTP, Tail, Twitter Search, Gemfire (Continuous Queries), Gemfire (Cache Event), Syslog and TCP.  The [supported sinks](http://static.springsource.org/spring-xd/docs/1.0.0.M1/reference/html/#sinks) are Log, File, HDFS,  Gemfire Distributed Data Grid, and TCP.  To capture syslog data to HDFS, the DSL is simply

```text
Copysyslog | hdfs --namenode="http://192.168.1.100:9000"
```

You can also add your own custom sources and sinks.  Existing Inbound and Outbound Channel Adapters in Spring Integration can be added by following a [simple recipe](http://static.springsource.org/spring-xd/docs/1.0.0.M1/reference/html/#creating-a-source-module).  Future releases will add support for MQTT, RabbitMQ, JMS, and Kafka.  We would love a [pull request](https://github.com/SpringSource/spring-xd/pulls) to contribute your preferred source and sink modules.

The programming model for a Stream is based on Spring Integration.  Input Sources convert external data to a Message that consists of headers, containing key-value pairs and a payload that can be any Java type. Messages flow through the stream through Message Channels. This is shown below for a stream with an Input Source, Processing Step, and an Output Sink.

[![](http://blog.springsource.org/wp-content/uploads/2013/06/SourceProcessSink2.png "Source, Processing Step, and Sink")](http://blog.springsource.org/wp-content/uploads/2013/06/SourceProcessSink2.png)

## Processors

A stream that incorporates multiple processing steps is shown below.  The processing steps are all connected together via Channels.

[![](http://blog.springsource.org/wp-content/uploads/2013/06/MultipleProcessingSteps.png "Multiple Processing Steps")](http://blog.springsource.org/wp-content/uploads/2013/06/MultipleProcessingSteps.png)

In the DSL, the pipe symbol corresponds to the channel that passes data from each processing step to the next.  The channels in Spring XD can either be in-memory or be backed by middleware such as Redis, JMS, RabbitMQ etc.  This allows for a simple distributed processing model which will be discussed shortly.

The DSL expression that represents streams with processing steps is of the form

```text
Copysource | filter | transform | sink
```

The [supported processors](http://static.springsource.org/spring-xd/docs/1.0.0.M1/reference/html/#processors) in M1 are filter, transformer, json-field-extractor, json-field-value-filter, and script.  The filter and transformer processors support using the Spring Expression Language  (SpEL) as well as Groovy.  To transform the payload of the HTTP request to uppercase in the previous example using SpEL,

```text
Copyhttp | transform --expression=payload.toUpperCase() | file
```

The script processor also allows you to execute custom Groovy code.

## Taps

A Tap allows you to "listen in" to data from another stream and process the data in a separate stream. The original stream is unaffected by the tap and isn’t aware of its presence, similar to a phone wiretap.  [WireTaps](http://www.enterpriseintegrationpatterns.com/WireTap.html) are part of the standard catalog of EAI patterns and [are part of](http://static.springsource.org/spring-integration/reference/htmlsingle/#channel-wiretap) the Spring Integration framework used by Spring XD.

A tap can consume data from any point along the target stream’s processing pipeline. For example, if you have a stream called mystream, defined as

```text
Copysource | filter | transform | sink
```

You can create a tap using the DSL

```text
Copytap mystream.filter | sink2
```

This would tap into the stream’s data after the filter has been applied but before the transformer. So the untransformed data would be sent to sink2.

For example, if you create a stream named `httpstream` using the command:

```text
Copycurl  -d "http --port=9898 | filter --expression='payload.length() > 5'
                           | transform --expression=payload.toUpperCase()
                           | file"  http://localhost:8080/streams/httpstream
```

Then to create a tap on the stream named `httptap` that writes the filtered data stream to a separate file use the following command:

```text
Copycurl -d "tap httpstream.filter | file --dir=/tmp --name=filtered.txt" http://localhost:8080/streams/httptap
```

Posting data such as

```text
Copycurl -d "hello world" http://localhost:9898
curl -d "he" http://localhost:9898
curl -d "hello world 2" http://localhost:9898
```

Will result with HELLO WORLD and HELLO WORLD 2 in the file `/tmp/xd/output/httpstream` and lower cased equivalents in `/tmp/filtered.txt`. The text `'he'` will not be present in either file.

A primary use case is to perform realtime analytics at the same time as data is being ingested via its primary stream. For example, consider a Stream of data that is consuming Twitter search results and writing them to HDFS. A tap can be created before the data is written to HDFS, and the data piped from the tap to a counter that correspond to the number of times specific hashtags were mentioned in the tweets.

## Analytics

Ask 10 developers what 'real time analytics' are and you will get 20 answers.  The answers range from very simple (but extremely useful) counters, to moving averages, to aggregated counters, to histograms, to time-series, to machine learning algorithms to Embedded CEP engines.  Spring XD intends to support a wide range of these metrics and analytical data structures as a general purpose class library that works with several backend storage technologies.  They are also exposed to XD as a type of Sink for use in DSL expressions.

In the M1 release there is support for Counter, Field Value Counter, Gauge, and Rich Gauge. These metrics can be stored in-memory or in Redis.  See the [JavaDocs](http://static.springsource.org/spring-xd/docs/1.0.0.M1/api/) and  [Analytics section](http://static.springsource.org/spring-xd/docs/1.0.0.M1/reference/html/#analytics) of the user guide for more details and also a list of what will be implemented in future releases.

As an example, consider the case of collecting a real time count of the frequency of hashtags in a stream of tweets.  To do this with SpringXD, create a new stream definition that uses the twitter search source module and name it ‘spring’

```text
Copycurl -d "twittersearch --query='spring' --consumerKey=<consumer-key> --consumerSecret=<consumer-secret>
           | file" http://localhost:8080/streams/spring
```

This stores the tweets in the local filesystem.  Note, to get a consumerKey and consumerSecret you need to register a twitter application. If you don’t already have one set up, you can create an app at the [Twitter Developers](https://dev.twitter.com/apps) site to get these credentials.

Next create a create a tap named ‘springtap’ on the output of the twittersearch source to count the frequency of hashtags in the tweets.

```text
Copycurl -d "tap spring.twittersearch | field-value-counter
                                     --fieldName=entities.hashTags.text
                                     --counterName=hashTagFrequency" http://localhost:8080/streams/springtap
```

The field `entities.hashTags.text` is the path to the hashtags in the JSON representation of a [Spring Social Tweet](http://static.springsource.org/spring-social-twitter/docs/1.0.x/api/org/springframework/social/twitter/api/Tweet.html) object used in the underlying implementation.  To view the top 5 hashtags use the redis-cli to view the contents of the sorted set named `fieldvaluecounters.hashTagFrequency. `Note, it will often take a few minutes to collected enough tweets that have hashtag entities.

```text
Copy> redis-cli
redis 127.0.0.1:6379>ZREVRANGEBYSCORE fieldvaluecounters.hashTagFrequency +inf -inf WITHSCORES LIMIT 0 5

1] "spring"
2] "6"
3] "Turkey"
4] "6"
5] "Arab"
6] "6"
7] "summer"
8] "3"
9] "fashion"
10] "3"
```

## Architecture

Spring XD has two modes of operation - single-node and distributed. The first is a single process that handles all processing and administration. This mode helps you get started easily and simplifies the development and testing of your application. The distributed mode allows processing tasks to be spread across a cluster of machines and an administrative server sends commands to control processing tasks executing on the cluster.

The distributed architecture in the M1 release is simple.  Each part of a stream, called a module,  can execute in its own container instance.  The data is passed between the modules using a Redis queue.  See the [Architecture section](http://static.springsource.org/spring-xd/docs/1.0.0.M1/reference/html/#architecture) for more details.  The primary focus of this release was getting the abstractions right, such as having the pipe symbol in the DSL be pluggable across various transports.  Other transports and performance improvements will be coming in future releases as well as execution inside a Hadoop cluster.

## More to come

Some other topics not covered in this post are the introduction of [Tuple data structure](http://static.springsource.org/spring-xd/docs/1.0.0.M1/reference/html/#tuples) and how you can [create custom processors](http://static.springsource.org/spring-xd/docs/1.0.0.M1/reference/html/#creating-a-processor-module).  An important part of the next release will be support for the XDContainer to run Spring Batch jobs.  These jobs can be used to help export data from HDFS to relational-databases as well as orchestrate the execution of Hadoop Jobs, either MapReduce, Pig, Hive, or Cascading jobs, on the cluster.  We will also be providing additional libraries for metrics such as aggregate counters, HTTP/JMX based management, as well as some high performing sources based on the [Reactor](https://github.com/reactor) project so stay tuned!

We would love to hear your feedback as we continue working hard towards the final Spring XD 1.0.0 release. If you have any questions, please use [Stackoverflow](http://stackoverflow.com/questions/tagged/springxd) (Tag: **springxd**), and to report any bugs or improvements, please use either the [Jira Issue Tracker](https://jira.springsource.org/browse/XD) or file a [GitHub issue](https://github.com/SpringSource/spring-xd/issues).