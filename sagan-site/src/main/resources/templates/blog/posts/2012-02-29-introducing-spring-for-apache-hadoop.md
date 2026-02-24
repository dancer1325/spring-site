---
title: Introducing Spring for Apache Hadoop
source: https://spring.io/blog/2012/02/29/introducing-spring-for-apache-hadoop
scraped: 2026-02-24T08:25:50.979Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Costin Leau |  February 29, 2012 | 0 Comments
---

# Introducing Spring for Apache Hadoop

_Engineering | Costin Leau |  February 29, 2012 | 0 Comments_

I am happy to announce that the first milestone release (1.0.0.M1) for [Spring for Apache Hadoop](http://www.springsource.org/spring-data/hadoop) project is [available](http://www.springsource.org/download/community?project=Spring%20Data%20Hadoop) and talk about some of the work we have been doing over the last few months. Part of the [Spring Data](http://www.springsource.org/spring-data/) umbrella, Spring for Apache Hadoop provides support for developing applications based on [Apache Hadoop](http://hadoop.apache.org/) technologies by leveraging the capabilities of the Spring ecosystem. Whether one is writing stand-alone, vanilla MapReduce applications, interacting with data from multiple data stores across the enterprise, or coordinating a complex workflow of HDFS, Pig, or Hive jobs, or anything in between, Spring for Apache Hadoop stays true to the Spring philosophy offering a simplified programming model and addresses *["accidental complexity"](http://en.wikipedia.org/wiki/Accidental_complexity)* caused by the infrastructure. Spring for Apache Hadoop, provides a powerful tool in the developer arsenal for dealing with big data volumes.

#### MapReduce Jobs

The [Hello world](http://en.wikipedia.org/wiki/Hello_world_program) for Apache Hadoop is the [word count](http://hadoop.apache.org/common/docs/current/mapred_tutorial.html#Example%3A+WordCount+v1.0) example - a simple use-case that exposes the base Apache Hadoop capabilities. When using Spring for Apache Hadoop, the word count example looks as follows:

```xml
Copy<!-- configure Apache Hadoop FS/job tracker using defaults -->
<hdp:configuration />

<!-- define the job -->
<hdp:job id="word-count" 
  input-path="/input/" output-path="/ouput/"
  mapper="org.apache.hadoop.examples.WordCount.TokenizerMapper"
  reducer="org.apache.hadoop.examples.WordCount.IntSumReducer"/>

<!-- execute the job -->
<bean id="runner" class="org.springframework.data.hadoop.mapreduce.JobRunner" 
                  p:jobs-ref="word-count"/>
```

Notice how the creation and submission of the job configuration is handled by the IoC container. Whether the Apache Hadoop configuration needs to be tweaked or the reducer needs extra parameters, all the configuration options are still available for you to configure. This allows you to start small and have the configuration grow alongside the app. The configuration can be as simple or advanced as the developer wants/needs it to be taking advantage of Spring [container](http://static.springsource.org/spring/docs/3.1.x/spring-framework-reference/html/beans.html) functionality such as [property placeholders](http://static.springsource.org/spring/docs/3.1.x/spring-framework-reference/html/beans.html#beans-factory-placeholderconfigurer) and [environment support](http://static.springsource.org/spring/docs/3.1.x/spring-framework-reference/html/new-in-3.1.html#d0e1313):

```xml
Copy<hdp:configuration resources="classpath:/my-cluster-site.xml">
    fs.default.name=${hd.fs}
    hadoop.tmp.dir=file://${java.io.tmpdir}
    electric=sea
</hdp:configuration>

<context:property-placeholder location="classpath:hadoop.properties" />

<!-- populate Apache Hadoop distributed cache -->
<hdp:cache create-symlink="true">
  <hdp:classpath value="/cp/some-library.jar#library.jar" />
  <hdp:cache value="/cache/some-archive.tgz#main-archive" />
  <hdp:cache value="/cache/some-resource.res" />
</hdp:cache>
```

(the word count [example](http://static.springsource.org/spring-hadoop/docs/current/reference/html/samples.html) is part of the Spring for Apache Hadoop distribution - feel free to download it and experiment).

Spring for Apache Hadoop does not require one to rewrite your MapReduce job in Java, you can use non-Java [streaming](http://hadoop.apache.org/common/docs/current/streaming.html) jobs seamlessly: they are just objects (or as Spring calls them beans) that are created, configured, wired and managed just like any other by the framework in a consistent, coherent manner. The developer can mix and match according to her preference and requirements without having to worry about integration issues.

```xml
Copy<hdp:streaming id="streaming-env" 
  input-path="/input/" output-path="/ouput/"
  mapper="${path.cat}" reducer="${path.wc}">
  <hdp:cmd-env>
    EXAMPLE_DIR=/home/example/dictionaries/
  </hdp:cmd-env>
</hdp:streaming>
```

Existing Apache Hadoop [Tool](http://hadoop.apache.org/common/docs/current/api/org/apache/hadoop/util/class-use/Tool.html) implementations are also supported; in fact rather than specifying custom Apache Hadoop properties through the command line, one can simply inject it:

```xml
Copy<!-- the tool automatically is injected with 'hadoop-configuration' -->
<hdp:tool-runner id="scalding" tool-class="com.twitter.scalding.Tool">
   <hdp:arg value="tutorial/Tutorial1"/>
   <hdp:arg value="--local"/>
</hdp:tool-runner>
```

The configuration above executes Tutorial1 of Twitter's [Scalding](https://github.com/twitter/scalding) (a Scala DSL on top of Cascading (see [below](#cascading)) library. Note there is no *dedicated* support code in either Spring for Apache Hadoop or Scalding - just the standard, Apache Hadoop APIs are being used.

#### Working with HBase/Hive/Pig

Speaking of DSLs, it is quite common to use higher-level abstractions when interacting with Apache Hadoop - popular choices include [HBase](http://hbase.apache.org/), [Hive](http://hive.apache.org/) or [Pig](http://pig.apache.org/). Spring for Apache Hadoop provides integration for all of these, allowing easy configuration and consumption of these *data sources* inside a Spring app:

```xml
Copy<!-- HBase configuration with nested properties -->
<hdp:hbase-configuration stop-proxy="false" delete-connection="true">
    foo=bar
</hdp:hbase-configuration>

<!-- create a Pig instance using custom properties
    and execute a script (using given arguments) at startup -->
     
<hdp:pig properties-location="pig-dev.properties" />
   <script location="org/company/pig/script.pig">
     <arguments>electric=tears</arguments>
   </script>
</hdp:pig>
```

Through Spring for Apache Hadoop, one not only gets a powerful IoC container but also access to Spring's portable service abstractions. Take the popular [JdbcTemplate](http://static.springsource.org/spring/docs/3.1.x/spring-framework-reference/html/jdbc.html#jdbc-JdbcTemplate), one can use that on top of Hive's [Jdbc client](https://cwiki.apache.org/confluence/display/Hive/HiveClient):

```xml
Copy<!-- basic Hive driver bean -->
<bean id="hive-driver" class="org.apache.hadoop.hive.jdbc.HiveDriver"/>

<!-- wrapping a basic datasource around the driver -->
<bean id="hive-ds"
    class="org.springframework.jdbc.datasource.SimpleDriverDataSource"
    c:driver-ref="hive-driver" c:url="${hive.url}"/>

<!-- standard JdbcTemplate declaration -->
<bean id="template" class="org.springframework.jdbc.core.JdbcTemplate"
    c:data-source-ref="hive-ds"/>
```

#### Cascading

Spring also supports a Java based, type-safe [configuration](http://static.springsource.org/spring/docs/3.1.x/spring-framework-reference/html/new-in-3.0.html#new-java-configuration) model. One can use it as an alternative or complement to declarative XML configurations - such as with [Cascading](http://www.cascading.org/)

```java
Copy@Configuration
public class CascadingConfig {
    @Value("${cascade.sec}") private String sec;
    
    @Bean public Pipe tsPipe() {
        DateParser dateParser = new DateParser(new Fields("ts"), 
                 "dd/MMM/yyyy:HH:mm:ss Z");
        return new Each("arrival rate", new Fields("time"), dateParser);
    }

    @Bean public Pipe tsCountPipe() {
        Pipe tsCountPipe = new Pipe("tsCount", tsPipe());
        tsCountPipe = new GroupBy(tsCountPipe, new Fields("ts"));
    }
}
```

```xml
Copy<!-- code configuration class -->
<bean class="org.springframework.data.hadoop.cascading.CascadingConfig "/>

<bean id="cascade"
    class="org.springframework.data.hadoop.cascading.HadoopFlowFactoryBean" 
    p:configuration-ref="hadoop-configuration" p:tail-ref="tsCountPipe" />
```

The example above mixes both programmatic and declarative configurations: the former to create the individual Cascading pipes and the latter to wire them together into a flow.

#### Using Spring's portable service abstractions

Or use Spring's excellent [task/scheduling](http://static.springsource.org/spring/docs/3.1.x/spring-framework-reference/html/scheduling.html) support to submit jobs at certain times:

```xml
Copy<task:scheduler id="myScheduler" pool-size="10"/>

<task:scheduled-tasks scheduler="myScheduler">
 <!-- run once a day, at midnight -->
 <task:scheduled ref="word-count-job" method="submit" cron="0 0 * * * "/>
</task:scheduled-tasks>
```

The configuration above uses a simple JDK [Executor](http://docs.oracle.com/javase/1.5.0/docs/api/java/util/concurrent/Executor.html) instance - excellent for <a href="[http://en.wikipedia.org/wiki/Proof\_of\_Concept'>POC](http://en.wikipedia.org/wiki/Proof_of_Concept'%3EPOC) development. One can [easily replace](http://static.springsource.org/spring/docs/3.1.x/spring-framework-reference/html/scheduling.html#scheduling-task-executor-types) it (a one-liner) in production with a more comprehensive solution such as dedicated [scheduler](http://static.springsource.org/spring/docs/3.1.x/spring-framework-reference/html/scheduling.html#scheduling-quartz) or a [WorkManager](http://docs.oracle.com/javaee/1.4/api/javax/resource/spi/work/WorkManager.html) implementation - another example of Spring's powerful service abstractions.

#### HDFS/Scripting

A common task when interacting with [HDFS](http://hadoop.apache.org/hdfs/) is preparing the file-system, such as cleaning the output directory to avoid overriding data or moving all input files under the same name scheme or folder. Spring for Apache Hadoop addresses the issue by fully embracing Apache Hadoop's fs commands, such as [FS Shell](http://hadoop.apache.org/common/docs/current/file_system_shell.html) and [DistCp](http://hadoop.apache.org/common/docs/current/distcp.html) and [exposing](http://static.springsource.org/spring-hadoop/docs/current/api/org/springframework/data/hadoop/fs/package-summary.html) them as proper Java APIs. Mix that along with JVM scripting (whether it is Groovy, JRuby or Rhino/JavaScript) to form a powerful [combination](http://static.springsource.org/spring-hadoop/docs/current/reference/html/scripting.html#scripting:api):

```xml
Copy<hdp:script language="groovy">
  inputPath = "/user/gutenberg/input/word/"
  outputPath = "/user/gutenberg/output/word/"

  if (fsh.test(inputPath)) {
    fsh.rmr(inputPath)
  }

  if (fsh.test(outputPath)) {
    fsh.rmr(outputPath)
  }

  fs.copyFromLocalFile("data/input.txt", inputPath)
</hdp:script>
```

#### Summary

This post just touches the surface of some of the features available in Spring for Apache Hadoop; I have not mentioned the Spring Batch integration providing tasklets for [various](http://static.springsource.org/spring-hadoop/docs/current/reference/html/hadoop.html#hadoop:tasklet) Apache Hadoop [interactions](http://static.springsource.org/spring-hadoop/docs/current/reference/html/scripting.html#scripting-tasklet) or the use of Spring Integration for event triggering - more about that in a future entry. Let us know what you think, what you need and give us feedback: [download](http://www.springsource.org/download/community?project=Spring%20Data%20Hadoop) the code, [fork](https://github.com/SpringSource/spring-hadoop) the source, [report](https://jira.springsource.org/browse/SHDP) issues, [post](http://forum.springsource.org/forumdisplay.php?f=80) on the forum or send us a [tweet](http://twitter.com/costinl).