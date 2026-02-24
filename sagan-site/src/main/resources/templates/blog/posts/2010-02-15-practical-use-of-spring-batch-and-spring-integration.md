---
title: Practical Use of Spring Batch and Spring Integration
source: https://spring.io/blog/2010/02/15/practical-use-of-spring-batch-and-spring-integration
scraped: 2026-02-24T08:59:52.078Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Dave Syer |  February 15, 2010 | 1 Comment
---

# Practical Use of Spring Batch and Spring Integration

_Engineering | Dave Syer |  February 15, 2010 | 1 Comment_

There are some common concerns of users of [Spring Batch](http://www.springframework.org/spring-batch) and [Spring Integration](http://www.springframework.org/spring-integration), and we get asked a lot about how they fit together. [Spring Batch Admin](http://www.springframework.org/spring-batch-admin) 1.0.0.M2 was released recently, and it makes heavy use of Spring Integration, so it is a good vehicle for looking at some specific use cases, and that is what we plan to do in this article.

## Spring Batch Integration

Part of the 1.0.0.M2 release was the [Spring Batch Integration](http://www.springframework.org/spring-batch-admin/spring-batch-integration) module, recently migrated from Spring Batch and given a new home with Batch Admin. Many of the Batch-Integration cross over use cases are either implemented or demonstrated in Spring Batch Integration. The reason for the new home is that Batch Admin uses a lot of the features of Batch Integration, and so aligning the release cycle of those projects makes more sense.

## Spring Batch Admin

[Spring Batch Admin](http://www.springframework.org/spring-batch-admin) is an open source project from SpringSource. It aims to provide developers with a Web UI and tools for building their own UI to interact with Spring Batch jobs (launching, stopping, investigating causes of failure etc.). The recent milestone release is fairly complete as far as planned functionality goes for 1.0, but if you have ideas or contributions to make, please visit the [forum](http://forum.springframework.org/forumdisplay.php?f=41) and the [issue tracker](http://jira.springframework.org/browse/BATCHADM) and get involved in the community.

The target runtime out of the box is a single instance of a servlet container (e.g. SpringSource tc Server), and in that container the system works with zero or no configuration. But we want to be able to support customisations and extensions of the basic use cases, including scaling the deployment up to a cluster of servers, and Spring Integration is proving to be the key to a lot of the extension points.

## Combining Batch and Integration

The line between Spring Batch and Spring Integration is not always clear, but there are guidelines that one can follow. Principally, these are: think about granularity, and apply common patterns. Some of those common patterns are described in this article. More are implemented (and may be the subject of future articles) in Spring Batch Integration and Spring Batch Admin.

Adding messaging to a batch process enables automation of operations, and also separation and strategising of key concerns. For example a message might trigger a job to execute, and then the sending of the message can be exposed in a variety of ways. Or when a job completes or fails that might trigger a message to be sent, and the consumers of those messages might have operational concerns that have nothing to do with the application itself.

The other way round works too: messaging can also be embedded in a job, but that is out of the scope of this article. For example: reading or writing items for processing via channels.

Here are some use cases that are implemented in Batch Admin using Spring Integration and Spring Batch Integration.

## Pattern: Message Trigger

The beauty of Spring Integration is the separation of concerns between message producers and message consumers, and a good concrete example of that is the ability for a message to trigger a Job execution. In this case the consumer is completely generic, and a very thin wrapper around a standard Spring Batch JobLauncher (code here is from the Spring Batch Integration [JobLaunchingMessageHandler](http://static.springsource.org/spring-batch-admin/apidocs/index.html)):

```java
Copy@ServiceActivator
public JobExecution launch(JobLaunchRequest request) {

    Job job = request.getJob();
    JobParameters jobParameters = request.getJobParameters();

    return jobLauncher.run(job, jobParameters);
    
}
```

As you can see from the code snippet above, the wrapper is so thin it hardly merits a mention, but its virtue is that it has a very clear and obvious reponsibility and is easily testable in isolation. The JobLaunchRequest object is a special wrapper for the input parameters to a JobLauncher, so that they can form the payload of a message in Spring Integration.

The JobLaunchingMessageHandler is hooked up to a MessageChannel in Spring Batch Admin (in the Manager jar /META-INF/bootstrap/integration/launch-context.xml):

```xml
Copy<service-activator input-channel="job-requests">
    <beans:bean class="org.springframework.batch.integration.launch.JobLaunchingMessageHandler">
        <beans:constructor-arg ref="jobLauncher" />
    </beans:bean>
</service-activator>
```

That's the consumer side of this integration pattern completed. It is a local approach, in that it isn't particularly well suited to remote invocation because the JobLaunchRequest is intentionally not Serializable (because the Job is not).

To launch a Job locally all we need to do is create a producer and use it to send a JobLaunchRequest to the job-requests channel. There is an integration test in the Batch Admin Manager module that does just this, but the real power of the integration approach here is the ability to strategise the requests and have them come from a variety of different producers.

## Pattern: Channel Reuse

A message can be sent to the job-requests channel in Batch Admin in a number of ways. To break out of the local invocation and expose the job remotely all that is needed is to adapt an incoming request in some other form to a JobLaunchRequest, and Spring Integration makes this really easy. This is the basic scenario for a pattern we call Channel Reuse. Examples are:

### HTTP: Browser

The Spring Integration HTTP adapter module can be used to accept an input message over HTTP:

```xml
Copy<http:inbound-channel-adapter name="/job-requests" channel="job-launches" 
    request-mapper="bodyInboundRequestMapper" view="reload-job-executions" />
```

This snippet can be found in the Batch Admin Manager module (META-INF/servlet/integration-servlet.xml). It exposes an endpoint URL [http://.../batch/job-requests](http://.../batch/job-requests) which we can use to send a request for a job execution by submiting a form in a browser.

The request in principle can be in any form we like because we can transform the message downstream of this adapter and upstream of the JobLaunchingMessageHandler. In Spring Batch Admin the transformation is done on the output from the adapter by another POJO message handler ([StringToJobLaunchRequestAdapter](http://static.springsource.org/spring-batch-admin/apidocs/org/springframework/batch/admin/integration/StringToJobLaunchRequestAdapter.html)).

### HTTP: Command line

The same HTTP adapter that was used above can be used to launch a job remotely from a UN\*X command line. This is a really great way to use Spring Integration HTTP adapters: you can automate a lot of operations using simple shell scripts. E.g. this would work if the application was deployed locally with a job called "staging":

```plain
Copy$ echo staging[input.file=foo] | curl -v -d @- -H "Content-Type: text/plain" \
  http://localhost:8080/springone-web-demo/batch/job-requests
```

The job named "staging" is launched with one parameter (input.file=foo), where foo is the absolute path of a file to read as input. The job is configured with an item reader like this:

```xml
Copy<bean id="reader" class="org.springframework.batch.item.file.FlatFileItemReader" scope="step">
    <property name="linesToSkip" value="1" />
    <property name="lineMapper">
        <bean class="org.springframework.batch.item.file.mapping.PassThroughLineMapper"/>
    </property>
    <property name="resource" value="#{jobParameters[input.file]}" />
</bean>
```

(This snippet is not in the Spring Batch Admin sample, but it was in the demo that we gave at Spring One Americas 2009.)

### File polling

Spring Integration can poll for files in a directory (using the file adapters module). The message generated just needs to be adapted for the job-requests channel. Spring Batch Admin does this in a simple message handler (FileToJobLaunchRequestAdapte):

```java
Copypublic JobLaunchRequest adapt(File file) throws NoSuchJobException {
    JobParameters jobParameters = new JobParametersBuilder().addString(
            "input.file", file.getAbsolutePath()).toJobParameters();
    return new JobLaunchRequest(job, jobParameters);
}
```

This simple POJO method is declared as a @ServiceActivator (it could have been a @Transformer), and so it can be inserted in a message handling chain just before the JobLaunchingMessageHandler to tranform a File into a JobLaunchRequest.

### Restart

A failed job can usually be restarted in Spring Batch, and this feature is available through a web browser in the Spring Batch Admin UI. It is also available on the command line, or for anyone who can send a message to a Spring Integration channel called job-restarts:

```xml
Copy<channel id="job-restarts" />
    <service-activator input-channel="job-restarts" output-channel="job-requests">
    <beans:bean class="org.springframework.batch.admin.integration.JobNameToJobRestartRequestAdapter">
        <beans:property name="jobLocator" ref="jobRegistry" />
        <beans:property name="jobExplorer" ref="jobExplorer" />
    </beans:bean>
</service-activator>
```

All this channel requires is the job name, and it has been exposed as an HTTP inbound endpoint, so from a UN\*X command line you might do this:

```plain
Copy$ echo staging | curl -v -d @- -H "Content-Type: text/plain" \
  http://localhost:8080/springone-web-demo/batch/job-restarts
```

### Retry

If a job fails repeatedly with a recoverable error (like a timeout or network glitch in a call to a remote service) maybe you would like to have it restarted automatically. Retry can be dealt with at a low level inside the job using some features of Spring Batch, but to retry the whole job requires some manipulation of the runtime. This could be accomplished simply with Spring Integration, now that the job-requests channel is accepting launch requests. The endpoint for this would act as a filter, looking for failure conditions in the job that are known to be retryable, and then as a restart trasformer (like the example above). So a chain like this would work:

```xml
Copy<chain input-channel="input-files" output-channel="job-requests" 
        xmlns="http://www.springframework.org/schema/integration">
    <filter>
        <bean class="...RetryableJobExecutionFilter" 
            xmlns="http://www.springframework.org/schema/beans">
            <property name="pattern" value="(&amp;s).*TimeoutException.*" />
        </bean>
	</filter>
    <service-activator>
        <bean class="org.springframework.batch.admin.integration.FileToJobLaunchRequestAdapter" 
            xmlns="http://www.springframework.org/schema/beans">
            <property name="job" ref="job1" />
        </bean>
    </service-activator>
</chain>
```

where the RetryableJobExecutionFilter might be implemented like this

```java
Copypublic boolean isRetryable(JobExecution jobExecution) {
    boolean retryable = false;
    for (StepExecution stepExecution : jobExecution.getStepExecutions()) {
        if (stepExecution.getStatus().isLessThan(BatchStatus.STOPPED)) {
            continue;
        }
        if (stepExecution.getExitStatus().getExitDescription().matches(pattern)) {
            retryable = true;
            break;
        }
    }
    return retryable;
}
```

This example was in our Spring One demo; it is not in Spring Batch Admin, although it is trivial to implement for any specific filter that you need.

## Input File Uploads

File uploads into the application are supported directly through the Spring Batch Admin UI. It isn't recommended to use an HTTP POST to upload large files, mainly because the application has to buffer the contents in memory, but this is a nice feature for uploading small or medium sized datasets for processing by Spring Batch.

The sample application actually doesn't use the file poller from Spring Integration (but it is available for clients who want to configure it as described above); rather it uses a direct message trigger once the file is uploaded. The strategy is for the Manager module to upload a file and then send a message to a publish-subscribe channel (input-files).

Any job that can use the input file just has to have an upstream component subscribe to that channel and pass on the file if it is of interest. This is done in the sample by filtering the file by its parent directory name:

```xml
Copy<chain input-channel="input-files" output-channel="job-requests" 
        xmlns="http://www.springframework.org/schema/integration">
    <filter expression="payload.parent.name=='sample'" />
    <service-activator>
        <bean class="org.springframework.batch.admin.integration.FileToJobLaunchRequestAdapter" 
            xmlns="http://www.springframework.org/schema/beans">
            <property name="job" ref="job1" />
        </bean>
    </service-activator>
</chain>
```

If the input file has a parent directory (which can be set in the Web UI) "sample" then it is piped into the service activator which converts it to a JobLaunchRequest and sends it on for processing by the JobLaunchingMessageHandler as already discussed).

### Pattern: POJO Message Handling

Sending a file to the input-files channel is done in the Batch Admin Manager, in the best tradition of Spring applications, through simple POJO and interface-based components. There is a FileService interface and a local implementation which uses a temporary directory to marshal the files coming in over HTTP. Once a file is uploaded it is sent by the service through a simple messaging gateway with a custom interface:

```java
Copypublic interface FileSender {
    
    void send(File file);

}
```

The interface has no implementation (except stubs in unit tests) because Spring Integration can provide one:

```xml
Copy<gateway id="fileSender" 
    service-interface="org.springframework.batch.admin.service.FileSender"
    default-request-channel="input-files" />

<beans:bean class="org.springframework.batch.admin.service.LocalFileService">
    <beans:property name="fileSender" ref="fileSender" />
</beans:bean>

```

## Configuration File Uploads

Spring Batch Admin allows the user to upload Spring configuration files for jobs to launch and manage from the UI. This is really useful for re-parameterising a job at run time, for instance when running a suite of performance tests to measure the effect of various performance tweaks, like changing the commit interval in a step.

To accept the confuration files for input we use a message channel, so that it can be re-used by multiple different input methods. The configurations come in on a channel called job-configurations:

```xml
Copy<service-activator input-channel="job-configurations" output-channel="job-registrations">
	<beans:bean class="org.springframework.batch.admin.integration.JobConfigurationResourceLoader">
		<beans:property name="jobRegistry" ref="jobRegistry" />
	</beans:bean>
</service-activator>
```

The service activator here just accepts a Spring Resource and treats it as a configuration file: loading an ApplicationContext, scanning it for Job components and registering them in the registry provided. Once in the registry the jobs can be launched from the main Jobs menu in the UI, or via the job-requests channel, as described above.

Just like input files, the configuration files can come over HTTP, in this case as file attachments or as plain text parameters, and also through file polling. The polling use case is implemented in the Manager module, so its worth having a quick look at that to see how it works. In META-INF/bootstrap/integration/configuration-context.xml we find this:

```xml
Copy<file:inbound-channel-adapter directory="target/config" channel="job-configuration-files"
	filename-pattern=".*\.xml">
	<poller max-messages-per-poll="1">
		<cron-trigger expression="5/1 * * * * *" />
	</poller>
</file:inbound-channel-adapter>
```

The adapter is going to poll a directory (here hard-coded for demo purposes to "target/config" but would be parameterised in a real application) and look for files whose name ends in ".xml". When a file matching that pattern arrives it is sent (as a java.io.File) to the job-configuration-files channel. The message is transformed from there so that the File becomes a Resource and it can be sent to the job-configurations channel.

## Pattern: Informational Messages

Once you start using Spring Integration messages for driving a lot of application features, it is often useful to be able to tap into the flows of messages for informational or reporting purposes. For instance it would be useful to send a message when a job starts, stops (completes or fails). This is easy to do with a MessagePublishingInterceptor from Spring Integration. In the Spring Batch Admin Manager the interceptor is configured to send job execution messages:

```xml
Copy
<aop:config>
	<aop:advisor advice-ref="jobMessagePublishingInterceptor" pointcut="execution(* *..Job+.execute(..))" />
</aop:config>

<bean id="jobMessagePublishingInterceptor" class="org.springframework.integration.aop.MessagePublishingInterceptor"
	xmlns="http://www.springframework.org/schema/beans">
	<constructor-arg index="0">
		<bean class="org.springframework.batch.admin.integration.TrivialExpressionSource" p:payload="#args[execution]" />
	</constructor-arg>
	<property name="defaultChannel" ref="job-operator" />
</bean>

```

Every time a Job is executed the AOP advisor passes the argument value (a JobExecution) to the job-operator channel. Interested parties can then subscribe to that channel and pick up the information about recently executed messages. Spring Batch Admin does nothing with those messages out of the box, except log them on teh console, and list them in the UI so they can be inspected. Clients who build their own application on top of Spring Batch Admin might find the messages useful to notify operators or a reporting system about the outcome of the job.

Setting up informational messages can have the side effect of opening up new application features: the Job retry feature described above was implemented for Spring One by hooking an endpoint up to listen to the job-operator channel.

## What Next?

We hope this article has given you some insight into some of the ways that Spring Integration can be used in a Batch application. Nearly all of the code sample above are in Spring Batch Admin in some form, but this is by no means the end of the story, and there are plenty more examples in the Spring Batch Integration and Spring Batch Admin projects. Visit the [Batch Admin](http://www.springframework.org/spring-batch-admin/spring-batch-integration) website for more information and to find out where to get the code to play with. There is also a [video on InfoQ](http://www.infoq.com/presentations/Automating-Operations) of some of the topics in this article presented at Spring One by the Spring Batch and the Spring Integration leads (Dave Syer and Mark Fisher).