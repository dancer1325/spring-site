---
title: Spring Batch 2.0 New Feature Rundown
source: https://spring.io/blog/2008/10/21/spring-batch-2-0-new-feature-rundown
scraped: 2026-02-24T09:13:52.857Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Dave Syer |  October 21, 2008 | 0 Comments
---

# Spring Batch 2.0 New Feature Rundown

_Engineering | Dave Syer |  October 21, 2008 | 0 Comments_

In this article we outline the main themes of [Spring Batch](http://www.springframework.org/spring-batch) 2.0, and highlight the changes from 1.x. Development work on the new release is well underway, with an M2 release last week, and we are getting a lot of interest, so now seems like a good time to give a few pointers.

### Spring Batch 2.0 Themes

The four main themes of the new release are

-   Java 5 and Spring 3.0
-   Non-sequential execution
-   Scalability
-   Configuration: annotations and XML namespace

so we'll cover each of those areas separately and describe what they mean and the impact of the changes on Spring Batch existing users. There is more detail below for features that are already implemented, which is mostly in the first category with some enabling features in other areas.

There are no changes to the physical layout of the project in Spring Batch 2.0.0.M2 (same old downloads, same basic layout of Java packages). We have not removed any features, but we have taken the opportunity to revise a couple of APIs, and there are some minor changes for people updating projects from 1.x. Spring Batch is immature enough and we were adding some pretty big features, so we decided a major version change was a good opportunity to have a bit of a clean out. We don't expect anyone to have any difficulty upgrading, and if you are an existing user this article will help you to get the measure of the changes.

### Java 5 and Spring 3.0

As you may know, Spring 3.0 is going to be the first major release of Spring to target Java 5 exclusively (I'll leave it to Juergen and Arjen to clarify that in more detail). Now that Sun has put an "[End of Service Life](http://java.dzone.com/articles/rip%E2%80%A6jdk-14)" stamp on the JDK 1.4 it seems appropriate, and there are some great new features on Spring 3.0 that we want to take advantage of.

#### Type Safety

Most of the work in the 2.0.0.M1 release of Spring Batch went into converting the existing code to Java 5, taking advantage of generics and parameterised types wherever we could. This gives users of the framework a much nicer programming experience, allowing compile time checks for type safety and ultimately reducing maintenance costs for projects using Spring Batch. For instance the in the ItemReader, one of the central interfaces and user extension points in Spring Batch, we now have a typesafe read method:

```java
Copy
public interface ItemReader<S> {
    S read();
}
```

A further point to note here is that the old (1.x) framework callbacks mark() and reset() have gone from this interface, making it more friendly to end users, and preventing misunderstanding about what the framework requires and when. The same concerns (or mark and reset) are now handled internally in the Step implementations that the framework provides.

#### Chunk-oriented Processing

Similar changes, and one slightly more radical, have also occurred in the partner ItemWriter interface, used by the framework for writing data:

```java
Copy
public interface ItemWriter<T> {
    void write(List<? extends T> items);
}
```

The old framework callbacks for flush() and clear() have gone from this interface too, and to compensate for that, the write() method has a new signature. The bottom line here is that we have moved to a chunk-oriented processing paradigm internally to the framework. This is actually much more natural in a batch framework than the old item-oriented approach because for performance reasons we often need to buffer and flush, and the old interface made that awkward for users. Now you can do all the batching you need inside the write() method.

#### Step Factory Bean Changes

A side effect of the chunk-oriented approach to processing is a change in the step factory bean implementations. The old SkipLimitStepFactoryBean has been renamed to FaultTolerantStepFactoryBean, and it can still be used for most common use cases as a replacement for the old factory bean. By default it creates a step implementation that buffers input items across rollbacks, so that the new ItemReader and ItemWriter interfaces work properly with non-transactional input sources (like files). For input sources that re-present the items after a rollback, clients have to set a flag in the factory bean (isReaderTransactional is the name of the flag as of M2) - JmsItemReader is the only relevant reader in the framework and not many projects use it so this isn't a big change.

#### Business Processing

A related new feature is that there is a new kid on the block in the form of the ItemProcessor:

```java
Copy
public interface ItemProcessor<S,T> {
    T process(S item);
}
```

In 1.x the transformation between input items of type S and output items of type T had to be hidden inside one of the other participants (usually the ItemWriter). Now we have genericised this concern and placed it at the same level of importance in the framework as its siblings, ItemReader and ItemWriter. Users of 1.x might recognise the traces of the old ItemTransformer interface here, which has now been removed.

#### A More Useful Tasklet Interface

Many people, looking at Spring Batch 1.x, have asked "what if my business logic is not reading and writing?" To answer this question more satisfactorily we have modified the Tasklet interface. In Spring Batch 1.x it is fairly bland - little more than a Callable in fact, but in 2.0 we have given it some more flexibility and slotted it more into the mainstream of the framework (e.g. the central chunk-oriented step implementation is now implemented as a Tasklet). Here is the new interface:

```java
Copy
public interface Tasklet {
    ExitStatus execute(StepContribution contribution, 
        AttributeAccessor attributes);
}
```

The idea is that the tasklet can now contribute more back to the enclosing step, and this makes it a much more flexible platform for implementing business logic. The StepContribution was already part of the 1.x API, but it wasn't very publicly exposed. Its role is to collect updates to the current StepExecution without the programmer having to worry about concurrent modifications in another thread. This also tells us that the Tasklet will be called repeatedly (instead of just once per step in the 1.x framework), and so it can be used to carry out a greater range of business processing tasks. The AttributeAccessor is a chunk-scoped bag of key-value pairs. The tasklet can use this to store intermediate results that will be preserved across a rollback.

#### Late Binding of Job and Step Attributes

So far (up to M2) we haven't been able to take advantage of any new Spring 3.0 features because there are no releases of Spring 3.0 yet. But starting with the next milestone (M3) we will be using the new Spring EL (Expression Language) features to enable late binding of JobParameters and ExecutionContext attributes to step components. This is a much requested feature, and we have some workarounds for special cases in 1.x, like the StepExecutionResourceProxy for binding to a filename as an input parameter to a job. A more generic solution available in Spring Batch 2.0 is to allow those step attributes to be bound to arbitrary components, by defining them in an appropriate Spring scope, e.g.

```xml
Copy
<bean id="step1" parent="simpleStep">
  <property name="itemReader">
    <bean class="org.springframework.batch.item.file.FlatFileItemReader" scope="step">
        <property value="#{jobParameters[inputFile]}" />
        ...
    </bean>
  </property>
  ...
</bean>
```

The item reader needs to be bound to a file name that is only available at runtime. To do this we have declared it as scope="step" and used the Spring EL binding pattern #{...} to bind in a job parameter. The same pattern will work with step and job level execution context attributes.

The StepScope is available in nightly snapshots, but we are still using Spring 2.5.5, so the EL bindings are not yet working. Step scoped beans are also a good solution to the old Spring Batch problem of how to keep your steps thread safe. If a step relies on a stateful component like a FlatFileItemReader, then it only has to define that component as scope="step" and the framework will create a lazy initializing proxy for it, and it will be created as needed once per step execution. There's still noting wrong with creating a new ApplicationContext for each job execution, which is the current best practice in 1.x for keeping threads from colliding across jobs. But now step scope gives you another option, and one that is probably easier for most Spring users to get to grips with.

### Non-sequential Execution

In 1.x the model of a job was always as a linear sequence of steps, and if one step failed, then the job failed. Although many jobs still fit that pattern so it hasn't gone away, in 2.0 we are lifting that restriction by introducing some new features. These are planned for the M3 release so the implementation details might change, but the idea is to support three features:

-   Conditional execution: branching to a different step based on the ExitStatus of the last one. This includes the ability to branch on a FAILED status, which implies that a step failure is no longer fatal for a job.
-   Pause execution and wait for explicit instruction to proceed. This is useful for instance where there is a business rule that forces manual intervention to check the validity of business critical data.
-   Parallel execution of multiple steps. Where steps are independent the user can specify which branches can be executed in parallel.

Nightly snapshots as of the time of writing this article contain a ConditionalJob that supports the first use case above.

### Scalability

Spring Batch 1.x was always intended as a single VM, possibly multi-threaded model, but we built a lot of features into it that support parallel execution in multiple processes. Many projects have successfully implemented a scalable solution relying on the quality of service features of Spring Batch to ensure that processing only happens in the correct sequence. In 2.0 we plan to expose those features more explicitly. There are two approaches to scalability, and we will support both: remote chunking, and partitioning.

#### Remote Chunking

Remote chunking is a technique for dividing up the work of a step without any explicit knowledge of the structure of the data. Any input source can be split up dynamically by reading it in a single process (as per normal in 1.x) and sending the items as a chunk to a remote worker process. The remote process implements a listener pattern, responding to the request, processing the data and sending an asynchronous reply. The transport for the request and reply has to be durable with guaranteed delivery and a single consumer, and those features are readily available with any JMS implementation. But Spring Batch is building the remote chunking feature on top of [Spring One Americas](http://www.springframework.org/spring-integration>Spring Integration</a>, so actually it is agnostic to the actual implementation of the message middleware.
<h4>Partitioning</h4>
Partitioning is an alternative approach which in contrast depends on having some knowledge of the structure of the input data, like a range of primary keys, or the name of a file to process.  The advantage of this model is that the processors of each element in a partition can act as if they are a single step in a normal Spring Batch job.  They don't have to implement any special or new patterns, which makes them easy to configure and test.  Partitioning in principle is more scalable than remote chunking because there is no serialization bottleneck arising from reading all the input data in one place.
<p>In Spring Batch 2.0 partitioning is supported by two interfaces: <tt>PartitionHandler</tt> and <tt>StepExecutionSplitter</tt>.  The <tt>PartitionHandler</tt> is the one that knows about the execution fabric - it has to transmit requests to remote steps and collect the results using whatever grid or remoting technology is available.  <tt>PartitionHandler</tt> is an SPI, and we provide one implementation out of the box for local execution through a <tt>TaskExecutor</tt>.  This will be useful immediately to a number of projects we have seen where parallel processing of heavily IO bound tasks is required, since in those cases remote execution only complicates the deployment and doesn't necessarily help much with the performance.  Other implementations will be specific to the execution fabric, e.g. one of the grid providers \(IBM, Oracle, Terracotta, Appistry etc.\), and we don't want to imply a preference for any of those over the others in Spring Batch.</p>
<p>SpringSource is planning an Enterprise Batch product that will provide a full runtime solution for partitioning and remote chunking, as well as admin and scheduling concerns.  Watch this space for more details of how that is shaping up, or come to <a href=)

### Configuration: annotations and XML namespace

The idea behind using annotations to implement batch logic is by analogy with Spring @MVC. The net effect is that instead of having to implement and possibly register a bunch of interfaces (reader, writer, processor, listeners, etc.) you would just annotate a POJO and plug it into a step. There are method level annotations corresponding to the various interfaces, and parameter level annotations and factory methods corresponding to job, step and chunk level attributes (a bit like @ModelParameter and @RequestParameter in Spring @MVC.

A XML namespace for Spring Batch makes configuration of common things even easier. For example, the ConditionalJob we mentioned above has an XML configuration option, so a simple conditional execution might look like this:

```xml
Copy
<job>
  <step name="gamesLoad" next="playerLoad"/>
  <step name="playerLoad">
    <next on="*" to="summarize"/>
    <next on="FAILED" to="compensate"/>
  </step>
  <step name="compensate"/>
  <step name="summarize"/>
</job>
```

The first step ("gamesLoad") is followed immediately by "playerLoad", but if that fails, then we can go to an alternative step ("compensate") instead of finishing the job normally with the "summarize" step. The name= attribute of the <step element in the XML is a bean reference, so the implementation of Step is defined elsewhere (possibly through annotations).

### Database Schema Changes

There are a couple of tidying up tasks and extensions to the data model in the meta data schema. We will be providing update scripts for anyone moving from 1.x to 2.0, so they shouldn't cause any problems, and will definitely make it easier to navigate and interact with the meta data. For those of you who are new to Spring Batch, some of the key benefits of the framework are the quality of service features like restartability and idempotence (process business data once and only once). We implement these features through shared state in a relational database (in most use cases), and the definition of the data model in this database has changed slightly in 2.0.

The main changes are to do with the storage of ExecutionContext, which used to be centralised in one table, even though the context can be associated either with a StepExecution or a JobExecution. The new model will be more popular with DBAs because it makes the relationships more transparent in the DDL. We also started storing the context values in JSON, to make them easier to read and track for human users (the context for a single entity is all stored in one row in a table, instead of many).

We have also added some more statistics for the counting and accounting of items executed and skipped, splitting out counts for total items read, processed and written at each stage. For steps (or tasklets) that do not split their execution into read, process, write, this is more comprehensive than is needed, but for the majority use case it is more appropriate than just storing an overall item count.

### Closing Remarks

Hopefully this article has whetted your appetite for Spring Batch 2.0, and you will have time to download a snapshot or milestone and try it out. We get such good feedback from the community that the product wouldn't be half as good as it is without your help and support. If I have missed something that you were interested in, or haven't provided enough detail I apologise, but I needed to squeeze this into a reasonable blog-sized format. I can write more if anyone is interested - just ask.

If you do want to know more, there is an excellent opportunity to hear about Spring Batch 2.0 and all the other SpringSource activities from the team at this year's [Spring One Americas](http://americas.springone.com/). Lucas Ward will be presenting Spring Batch 2.0 features in one session and I will be showing the scalability features in a bit more detail. Also check out the discussions on the [forum](http://forum.springframework.org/forumdisplay.php?f=41), or go to the home page [here](http://www.springframework.org/spring-batch).