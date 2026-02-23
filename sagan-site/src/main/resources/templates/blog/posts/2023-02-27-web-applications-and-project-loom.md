---
title: Web applications and Project Loom
source: https://spring.io/blog/2023/02/27/web-applications-and-project-loom
scraped: 2026-02-23T10:07:56.298Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Thomas |  February 27, 2023 | 5 Comments
---

# Web applications and Project Loom

_Engineering | Mark Thomas |  February 27, 2023 | 5 Comments_

## [](#introduction)Introduction

Project Loom aims to bring "easy-to-use, high-throughput, lightweight concurrency" to the JRE. One feature introduced by Project Loom is virtual threads. In this blog post, we'll be exploring what virtual threads mean for web applications using some simple web applications deployed on Apache Tomcat.

## [](#high-throughput--lightweight)High-throughput / Lightweight

The first experiment was to compare the overhead associated with using Tomcat's standard thread pool to the overhead associated with using a virtual thread (Loom) based executor. The test environment used is detailed at the end of this post. Performance was examined for different response sizes and request concurrency using average requests per second. The results are shown in the following graph.

![loom-results-01](https://static.spring.io/blog/contentful/20240923/loom-results-01.png)

The results show that, generally, the overhead of creating a new virtual thread to process a request is less than the overhead of obtaining a platform thread from a thread pool.

An unexpected result seen in the thread pool tests was that, more noticeably for the smaller response bodies, 2 concurrent users resulted in fewer average requests per second than a single user. Investigation identified that the additional delay occurred between the task being passed to the Executor and the Executor calling the task's run() method. This difference reduced for 4 concurrent users and almost disappeared for 8 concurrent users.

At high levels of concurrency when there were more concurrent tasks than processor cores available, the virtual thread executor again showed increased performance. This was more noticeable in the tests using smaller response bodies.

## [](#easy-to-use)Easy to use

The second experiment compared the performance obtained using Servlet asynchronous I/O with a standard thread pool to the performance obtained using simple blocking I/O with a virtual thread based executor. The potential benefit of virtual threads here is simplicity. A blocking read or write is a lot simpler to write than the equivalent Servlet asynchronous read or write - especially when error handling is considered.

Servlet asynchronous I/O is often used to access some external service where there is an appreciable delay on the response. The test web application simulated this in the Service class. The Servlet used with the virtual thread based executor accessed the service in a blocking style while the Servlet used with standard thread pool accessed the service using the Servlet asynchronous API. There wasn't any network IO involved, but that shouldn't have impacted the results.

The initial tests, unsurprisingly, showed no measurable difference between the blocking approach and the asynchronous approach as the timing was dominated by the 5 second delay. To explore the differences without the effects of the delay, the delay was reduced to zero and a similar set of tests to the throughput tests were executed. The results are shown in the following graph:

![loom-results-02](https://static.spring.io/blog/contentful/20240923/loom-results-02.png)

Again we see that virtual threads are generally more performant, with the difference being most pronounced at low concurrency and when concurrency exceeds the number of processor cores available to the test.

## [](#analysis)Analysis

The differences between a virtual thread based executor and Tomcat's standard thread pool are not as stark as they may first appear from the graphs above. The tests were designed to examine the overhead associated with each approach and are not representative of real-world applications. In real-world applications, the differences shown in the tests are likely to be negligible compared to the time taken to complete a request.

The primary driver for the performance difference between Tomcat's standard thread pool and a virtual thread based executor is contention adding and removing tasks from the thread pool's queue. It is likely to be possible to reduce the contention in the standard thread pool queue, and improve throughput, by optimising the current implementations used by Tomcat.

A secondary factor impacting relative performance is context switching. This a likely explanation for the performance difference seen in the second experiment once concurrency exceeded the the number processor cores available as context switching for virtual threads is less expensive that for threads in the standard thread pool.

## [](#conclusions)Conclusions

Using a virtual thread based executor is a viable alternative to Tomcat's standard thread pool. The benefits of switching to a virtual thread executor are marginal in terms of container overhead.

Web applications that experience blocking such as classic Spring MVC on Tomcat, and have not switched to the Servlet asynchronous API, reactive programming or other asynchronous APIs, should see some scalability improvements by switching to a virtual thread based executor. Depending on the web application, these improvements may be achievable with no changes to the web application code.

Web applications that have switched to using the Servlet asynchronous API, reactive programming or other asynchronous APIs are unlikely to observe measurable differences (positive or negative) by switching to a virtual thread based executor.

Longer term, the biggest benefit of virtual threads looks to be simpler application code. Some of the use cases that currently require the use of the Servlet asynchronous API, reactive programming or other asynchronous APIs will be able to be met using blocking IO and virtual threads. A caveat to this is that applications often need to make multiple calls to different external services. This is most efficiently done in parallel and while frameworks like [Project Reactor](https://projectreactor.io/) provide first class support for this, the JRE's equivalent solution for this (structured concurrency) is still in the incubator phase and only aims to coordinate multiple futures, but not to declare or compose them relative to each other in the most convenient way.

Finally, Project Loom is still in preview mode. It is too early to be considering using virtual threads in production but now is the time to include Project Loom and virtual threads in your planning so you are ready when virtual threads are generally available in the JRE.

## [](#test-environment)Test environment

The test environment consisted of the following:

-   Apache Tomcat [11.0.0-M1](https://github.com/apache/tomcat/tree/11.0.0-M1)
-   The [Loom executor](https://github.com/apache/tomcat/blob/11.0.0-M1/modules/loom/src/main/java/org/apache/catalina/core/LoomExecutor.java) from Tomcat's Loom module
-   OpenJDK 21, early access, build 1
-   [wrk 4.2.0](https://github.com/wg/wrk) (built from source)

Testing was performed on a fully updated Ubuntu 22.04.1 LTS machine with an Intel i7-6950X processor and 32 GB of RAM.

To maximise the visibility of differences between the tests, the following configuration changes were made from the default to minimise the common overhead:

-   running the tests on a single machine using the loopback interface to minimise network overhead
-   disabling the access log as it is a source of significant disk I/O under high request volume
-   setting maxKeepAliveRequests to -1 to reduce the time spent establishing and tearing down TCP connections

The [test web application](https://github.com/markt-asf/loom-blog) was also designed to minimise the common overhead and highlight the differences between the tests.

The server.xml file used was:

```
Copy<?xml version="1.0" encoding="UTF-8"?>
<Server port="8005" shutdown="SHUTDOWN">
  <Listener className="org.apache.catalina.startup.VersionLoggerListener" />

  <Service name="Catalina">

    <Executor
        className="org.apache.catalina.core.LoomExecutor"
        name="loomExecutor"
        />

    <Connector 
        protocol="org.apache.coyote.http11.Http11NioProtocol"
        port="8080"
        maxKeepAliveRequests="-1"
        />

    <Connector
        executor="loomExecutor"
        protocol="org.apache.coyote.http11.Http11NioProtocol"
        port="8081"
        maxKeepAliveRequests="-1"
        />

    <Engine name="Catalina" defaultHost="localhost">
      <Host name="localhost"  appBase="webapps"
            unpackWARs="true" autoDeploy="true">
      </Host>
    </Engine>
  </Service>
</Server>
```

The setenv.sh file used was:

```
Copy#!/bin/sh
JAVA_OPTS=--enable-preview
```