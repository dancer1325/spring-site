---
title: Case Study: Remote File Ingest with Spring Cloud Data Flow
source: https://spring.io/blog/2020/09/29/case-study-remote-file-ingest-with-spring-cloud-data-flow
scraped: 2026-02-23T13:38:13.402Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | David Turanski |  September 29, 2020 | 1 Comment
---

# Case Study: Remote File Ingest with Spring Cloud Data Flow

_Engineering | David Turanski |  September 29, 2020 | 1 Comment_

This article is part of a blog series that explores the newly redesigned Spring Cloud Stream applications based on Java Functions. In this chapter, we explore how to use [Spring Cloud Stream Applications](https://github.com/spring-cloud/stream-applications) and [Spring Cloud Data Flow](https://dataflow.spring.io) to implement a very common ETL use case: Ingesting files from a remote service. Specifically, we will look at how to ingest files from S3, SFTP, and FTP.

Here is what is included in the blog series to date:

-   [Introducing Function Based Streaming Applications](https://spring.io/blog/2020/07/13/introducing-java-functions-for-spring-cloud-stream-applications-part-0)
    
-   [Function Composition with Streaming Applications](https://spring.io/blog/2020/07/20/introducing-java-functions-for-spring-cloud-stream-applications-part-1)
    
-   [How to Build a Supplier and Source Application](https://spring.io/blog/2020/07/27/creating-a-supplier-function-and-generating-spring-cloud-stream-source)
    
-   [How to Build a Consumer and Sink Application](https://spring.io/blog/2020/08/03/creating-a-function-for-consuming-data-and-generating-spring-cloud-stream-sink-applications)
    
-   [Build and Run a Simple Stream Application](https://spring.io/blog/2020/08/10/case-study-build-and-run-a-streaming-application-using-an-http-source-and-a-jdbc-sink)
    
-   [Case Study: HTTP Request Function and Processor](https://spring.io/blog/2020/08/17/case-study-http-request-function-and-processor)
    
-   [Case Study: File Source and MongoDB Sink](https://spring.io/blog/2020/08/25/case-study-reading-from-a-file-and-writing-to-mongodb)
    
-   [Case Study: Relational Database Source and File Sink](https://spring.io/blog/2020/09/10/case-study-relational-database-source-and-file-sink)
    

## [](#remote-file-ingest-architecture)[](#remote-file-ingest-architecture)Remote File Ingest Architecture

To put things in perspective, Spring Cloud Data Flow has supported remote file ingest with SFTP for a few years. The fundamental architecture hasn’t changed since I authored [this post](https://tanzu.vmware.com/content/blog/need-24x7-etl-then-move-to-cloud-native-file-ingest-with-spring-cloud-data-flow), but as we shall see, the new stream applications allow a much simpler and more flexible solution.

![fileingest](https://github.com/spring-cloud/stream-applications/raw/gh-pages/img/s3-file-ingest/fileingest.png)

The file ingest architecture starts with a *remote file source* which polls a remote directory and publishes a message for each file it detects. The term *remote file source* refers to any of source application that provides this functionality. To date, this includes [Amazon S3 source](https://github.com/spring-cloud/stream-applications/tree/master/applications/source/s3-source), [SFTP source](https://github.com/spring-cloud/stream-applications/tree/master/applications/source/sftp-source), and [FTP source](https://github.com/spring-cloud/stream-applications/tree/master/applications/source/ftp-source).

Each of these sources may be configured to synchronize files in a remote directory to a local directory. The message payload produced by the underlying `Supplier` function, in this case, is the local file path. The output of the supplier is converted to a Task Launch Request along the way. We’ll explain how this is done later. The request is received by a `Task Launcher` sink which posts it to a Data Flow Server, via its REST API, to launch a batch job to ingest the file contents. In the example shown below, the job inserts each line of a CSV file into a database table.

If we’re running on a cloud platform, such as Kubernetes or Cloud Foundry, we need to configure a shared volume, using NFS for example, so that the task application can access the file that the source downloaded.

This is the recommended file ingest architecture using Spring Cloud Data Flow. The following characteristics make it very resilient:

-   The file ingest job is implemented using Spring Batch. It is well suited for large file processing, in which an interim failure may require the job to restart where it left off - a situation which Spring Batch is specifically designed to handle.
    
-   The [Task Launcher sink](https://github.com/spring-cloud/stream-applications/tree/master/applications/sink/tasklauncher-sink) uses a [PollableMessageSource](https://spring.io/blog/2018/02/27/spring-cloud-stream-2-0-polled-consumers) so that it can first confirm that Data Flow can accept a task request before pulling a task launch request from the input queue. Data Flow is configured with a maximum number of allowed concurrent task executions. The sink, using the Data Flow API, checks this limit has not been reached before accepting the next request. This flow control, similar to back-pressure, prevents platform resource saturation that can easily occur when, say, 100 files are dropped into the remote directory.
    
-   The shared volume is required to enable the batch job to continue processing from the last committed transaction, if necessary.
    

It is possible to implement this type of workload without Spring Cloud Data Flow, or Spring Batch for that matter. We’ll leave that as an exercise for the reader.

## [](#remote-file-sources)[](#remote-file-sources)Remote File Sources

What do we mean by a remote file source? The Amazon S3, SFTP, and FTP source applications share a common lineage in Spring Integration so behave essentially the same way. For example classes that extend [AbstractInboundFileSynchronizer](https://docs.spring.io/spring-integration/api/org/springframework/integration/file/remote/synchronizer/AbstractInboundFileSynchronizer.html) are used to synchronize a local directory with a remote directory. The base class includes configuring a `FileListFilter` to specify which files to include. Commonly, this is used to pattern match file names. Additionally, this component uses a [MetadataStore](https://docs.spring.io/spring-integration/api/org/springframework/integration/metadata/MetadataStore.html) used to track what files are in the local directory already, along with last modified time, so that only new or changed files are synchronized. By default the metadata store is an in memory implementation. This means that we may get an event for a file we have already processed when the source restarts. To address this, each of these sources may be easily customized to use one of several [persistent implementations](https://docs.spring.io/spring-integration/reference/html/meta-data-store.html) available. `AbstractFileSynchronizer` also supports using a SpEL expression to create the local file name, automatic remote file deletion, and more.

Besides file synchronization, each of these sources includes the `file.consumer.mode` property which can be one of

-   `contents` - The payload is the file contents a byte array
    
-   `ref` - The payload is the local file path
    
-   `lines` - Each payload is a line in the file
    

In addition, each source provides a `list-only` option, in which the payload contains metadata about the remote file and synchronization is not performed.

### [](#sftp-source)[](#sftp-source)SFTP Source

The [SFTP Source](https://github.com/spring-cloud/stream-applications/tree/master/applications/source/sftp-source) consumes files from an SFTP server. Since SFTP is the most commonly used remote file service, this component has the most advanced features. In fact, in the previous generation of stream applications, SFTP was the only source we supported for the file ingest architecture. As it evolved to support task launch requests, we ended up implementing a special variant specifically for the file ingest use case. The `sftp-datalow` source, designed to work with the `tasklauncher-dataflow` sink, embedded code to transform the payload to a task launch request. In the current release, we have retired this variation in favor of function composition. Additionally, the sftp source can be set up to poll multiple remote directories, rotating among each. In this configuration, the rotation algorithm can be `fair` - each remote directory gets one poll - or not - each remote directory is continually polled until there are no new files. It also supports `sftp.supplier.stream=true` which will stream the contents directly without synchronizing to a local directory.

### [](#ftp-source)[](#ftp-source)FTP Source

The [FTP Source](https://github.com/spring-cloud/stream-applications/tree/master/applications/source/ftp-source) is very similar to the SFTP source, except that it uses FTP and does not encrypt data in transit, so it is less secure. It provides the same core features, but currently does not support multiple remote directories, `list-only`, or `stream` mode.

### [](#amazon-s3-source)[](#amazon-s3-source)Amazon S3 Source

The [Amazon S3 Source](https://github.com/spring-cloud/stream-applications/blob/master/applications/source/s3-source/README.adoc) is modelled after the others, and supports the same file consumer modes as well as `list-only` mode. In this case `s3.supplier.remote-dir` refers to an S3 bucket. When using `list-only`, the payload contains an `S3ObjectSummary` which provides metadata about the S3 object. S3 itself provides a richer set of features than FTP/SFTP.

In addition to AWS S3, this source can now be used with S3 compatible implementations, such as [Minio](https://min.io/product/overview).

## [](#the-task-launcher-sink)[](#the-task-launcher-sink)The Task Launcher Sink

In prior releases, this was known as `tasklauncher-dataflow` sink. Originally, we also had standalone task launchers, one for each supported platform. These have since been deprecated, in favor of the Data Flow backed implementation, for ease of use, and resilience, as described above. Accordingly, we dropped "Data Flow" from the name. It is now simply [tasklauncher-sink](https://github.com/spring-cloud/stream-applications/tree/master/applications/sink/tasklauncher-sink).

The sink is built on a corresponding [tasklauncher-function](https://github.com/spring-cloud/stream-applications/tree/master/functions/function/tasklauncher-function), which may be used in any standalone application to send a task launch request to Data Flow. This is implemented as `Function<LaunchRequest, Optional<Long>>` . [LaunchRequest](https://github.com/spring-cloud/stream-applications/blob/master/functions/function/tasklauncher-function/src/main/java/org/springframework/cloud/fn/tasklauncher/LaunchRequest.java) is a simple value object that contains, at a minimum, the name of the task to launch. This task must be defined in Data Flow using the same name. Optionally, the launch request includes command line arguments, and deployment properties. The function returns the unique task ID as a long if the request was submitted. The request will not be submitted if the Data Flow server indicates the task platform has reached its maximum running tasks, the data flow server cannot be reached, or if the request is invalid.

The Task Launcher sink invokes its base function from within a scheduled task, triggered by a [DynamicPeriodicTrigger](https://docs.spring.io/spring-integration/api/org/springframework/integration/util/DynamicPeriodicTrigger.html) which allows updating its period at runtime. In this case, we use it to implement exponential backoff. From an initial period of one second, the trigger will back off, eventually to every 30 seconds if:

-   There are no queued launch requests
    
-   The platform is already running the maximum number of tasks
    

If either of these conditions changes, the source resets the period to its initial value. Of course the initial and maximum trigger period are configurable.

The triggered task, checks if the server can except new launch requests, and if so, it polls the input queue, using a [PollableMessageSource](https://spring.io/blog/2018/02/27/spring-cloud-stream-2-0-polled-consumers). If there is a request, it will post the request to Data Flow via its REST API.

## [](#creating-a-task-launch-request)[](#creating-a-task-launch-request)Creating a task launch request

The new function-based architecture provides first class support for [function composition](https://spring.io/blog/2020/07/20/introducing-java-functions-for-spring-cloud-stream-applications-part-1). As part of this strategy, certain common functions may be composed with any source. Notably, this includes a [task-launch-request-function](https://github.com/spring-cloud/stream-applications/tree/master/functions/function/task-launch-request-function). This means that any remote file source may now be configured to produce a task launch request. The task launch request function can evaluate SpEL expressions. For example, each task launch request may provide a different file path as a command line argument.

## [](#putting-it-all-together)[](#putting-it-all-together)Putting it all together

Let’s dive into an example to see how this works. We will use the S3 Source, the Task Launcher Sink, Spring Cloud Data Flow, an S3 compatible service, and a simple Spring Batch application to process the file.

To keep it simple, we will run everything locally, using Docker Compose.

### [](#install-spring-cloud-data-flow)[](#install-spring-cloud-data-flow)Install Spring Cloud Data Flow

Create a project directory for this example, open a terminal session, and cd to the project directory. Download the SCDF docker-compose file.

```
Copywget -O docker-compose.yml https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/v2.6.1/spring-cloud-dataflow-server/docker-compose.yml
```

### [](#start-spring-cloud-data-flow)[](#start-spring-cloud-data-flow)Start Spring Cloud Data Flow

Set the Data Flow and Skipper versions, along with the URI to import the latest stream applications. Then run `docker-compose`:

```
Copyexport DATAFLOW_VERSION=2.6.1
export SKIPPER_VERSION=2.5.1
export STREAM_APPS_URI=https://repo.spring.io/libs-snapshot-local/org/springframework/cloud/stream/app/stream-applications-descriptor/2020.0.0-SNAPSHOT/stream-applications-descriptor-2020.0.0-SNAPSHOT.stream-apps-kafka-maven
docker-compose up
```

### [](#create-some-data)[](#create-some-data)Create some data

The SCDF `docker-compose.yml` mounts the current direcory, so these files are accessible to the containers, under the mount path `/root/scdf`.

We will use Minio for S3 storage, and will run it in a Docker container to bind to the `minio` directory. We will add a data file to `minio/mybucket`. This will act as our remote directory.

Let’s also create a `download` directory to act as our shared local directory. The `download` directory is located on a shared volume that is accessible to any application containers that need it. In this case, the S3 source that downloads files from S3, and the batch application that will ingest the data and write it to a database table. In a production environment, this would be an external persistent volume, such as an NFS mounted directory on a dedicated server.

```
Copymkdir -p minio/mybucket
mkdir download
```

Create a data file, `name-list.csv` in the S3 bucket location. We happen to have one you can download:

```
Copywget -o minio/mybucket/name-list.csv https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow-samples/master/batch/file-ingest/data/name-list.csv
```

This contains lines of `firstname`,`lastname`. The batch job will insert a row into the `people` table for each line in the file.

Our project directory should now look like this:

```
Copy.
├── docker-compose.yml
├── download
└── minio
    └── mybucket
        └── name-list.csv
```

### [](#start-minio)[](#start-minio)Start Minio

We will run Minio, creating a volume mount to bind its container’s `/data` path to the `minio` directory. This will create an S3 bucket, `mybucket` containing `name-list.csv`.

```
Copydocker run --mount type=bind,source="$(pwd)"/minio,target=/data -p 9000:9000 -e "MINIO_ACCESS_KEY=minio" -e "MINIO_SECRET_KEY=minio123" minio/minio server /data
```

At this point, if you like, you can open a browser to [http://localhost:9000](http://localhost:9000) and log in with the above credentials and view the bucket.

### [](#use-data-flow-to-create-the-task-and-stream)[](#use-data-flow-to-create-the-task-and-stream)Use Data Flow to create the task and stream

Now that we have set up our local environment, we can orchestrate our file ingest pipeline.

#### [](#register-the-batch-application)[](#register-the-batch-application)Register the batch application

We happen to have the application we need, published to the `repo.spring.io` Maven repo. The source code is [here](https://github.com/spring-cloud/spring-cloud-dataflow-samples/tree/master/batch/file-ingest).

To register this application, open your browser to [http://localhost:9393/dashboard](http://localhost:9393/dashboard) and navigate to the Apps page. Click on `Add Application(s)` and register a `Task` application, named `fileingest` using the URI.

```
Copymaven://io.spring.cloud.dataflow.ingest:ingest:1.0.0.BUILD-SNAPSHOT
```

Then click on `Register the application(s)`

![RegisterTaskApplication](https://github.com/spring-cloud/stream-applications/raw/gh-pages/img/s3-file-ingest/RegisterTaskApplication.png)

#### [](#create-a-task-definition)[](#create-a-task-definition)Create a task definition

Once the application is registered, we need to create a task definition which will be referenced in the task launch request. We will name the task `fileingest`, the same as the app.

![CreateFileIngestTask](https://github.com/spring-cloud/stream-applications/raw/gh-pages/img/s3-file-ingest/CreateFileIngestTask.png)

#### [](#create-the-stream)[](#create-the-stream)Create the stream

Now we will create a stream to launch the `fileingest` task for each new file in the S3 bucket. Since we already have a file in the S3 bucket, we expect it to be downloaded to our shared `download` directory. When that happens, a task launch request will be sent to the Task Launcher sink, which will launch the `fileingest` task to process it.

Select `Streams` on the left menu bar and click on `Create stream(s)`. Cut and paste the stream definition, below, into the text area.

Note

Substitute your host’s LAN IP address in the S3 endpoint URL. Since `localhost` resolves to the container’s own IP, we need to use the LAN IP. There are various ways to get this value.

```
Copyifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1'
```

works for me on OS/X.

Also

```
Copydig +short $(hostname)
```

used to work until my employer put my machine on their domain.

Here is the stream definition:

```
Copys3 --spring.cloud.function.definition=s3Supplier,taskLaunchRequestFunction --file.consumer.mode=ref --s3.common.endpoint-url=http:<lan-ip-address>:9000 --s3.common.path-style-access=true --s3.supplier.remote-dir=mybucket --s3.supplier.local-dir=/root/scdf/download --cloud.aws.credentials.accessKey=minio --cloud.aws.credentials.secretKey=minio123 --cloud.aws.region.static=us-east-1 --cloud.aws.stack.auto=false --task.launch.request.taskName=fileingest --task.launch.request.argExpressions='localFilePath=payload' | tasklauncher --spring.cloud.dataflow.client.server-uri=http://dataflow-server:9393
```

The stream definition is basically `s3|tasklauncher` but the S3 source requires some configuration. To break it down:

-   `spring.cloud.function.definition=s3Supplier,taskLaunchRequestFunction` - the secret sauce for function composition. Here, we are using the comma as a composition delimiter, instead of the standard `|`. The DSL parser gets confused if the `|` is used in this way. We are composing `s3supplier`, the primary function for the S3 source, with `taskLaunchRequestFunction`, a Function Bean in the application context, available to any of the standard sources, if we care to use it.
    
-   `file.consumer.mode=ref` - The payload is the path of the downloaded file.
    
-   `s3.common.endpoint-url` - The S3 service endpoint for our Minio instance. You don’t need this if you’re using AWS S3.
    
-   `s3.common.oath-style-access=true` - Minio requires this
    
-   `s3.supplier.remote-dir=mybucket` - The S3 bucket our source will monitor
    
-   `3.supplier.local-dir=/root/scdf/download` - The local directory path from the container’s perspective
    
-   `cloud.aws.credentials.accessKey=minio`
    
-   `cloud.aws.credentials.secretKey=minio123` - The credentials use the `spring-cloud-aws` property names directly
    
-   `cloud.aws.region.static=us-east-1` - The AWS s3 SDK requires a region, Minio ignores this
    
-   `cloud.aws.stack.auto=false` - Don’t do anything special for AWS.
    
-   `task.launch.request.taskName=fileingest` - The name of the task to launch. This is required but may be dynamically set via a SpEL expression.
    
-   `task.launch.request.argExpressions='localFilePath=payload'` - Each time we launch the task, we want to pass the file location as a command line argument, in this case, our ingest task is looking for an argument named `localFilePath`, the value is the message payload evaluated for each message. This path is in the configured local directory, `/root/scdf/download/<filename>`. So the batch application can see it.
    

The task launcher sink in this case only needs the Data Flow Server URI. For the sink, running in the skipper container, the host name is `dataflow-server`.

![CreateFileIngestStream](https://github.com/spring-cloud/stream-applications/raw/gh-pages/img/s3-file-ingest/CreateFileIngestStream.png)

Create the stream and give it a name.

#### [](#deploy-the-stream)[](#deploy-the-stream)Deploy the stream

Deploy the stream using the `play` button. This opens a page to let you review the configuration and make any changes. Press `Deploy stream` at the bottom of the page.

#### [](#verify-the-task-was-launched)[](#verify-the-task-was-launched)Verify the task was launched

Once the stream is deployed, go to the `Tasks` page, eventually (within 30 seconds) you should see the `fileingest` task is complete.

![TaskView](https://github.com/spring-cloud/stream-applications/raw/gh-pages/img/s3-file-ingest/TaskView.png)

You can also see, the file was copied to the `download` directory:

```
Copy.
├── docker-compose.yml
├── download
│   └── name-list.csv
└── minio
    └── mybucket
        └── name-list.csv
```

From the `Executions` tab you can get more details on the task execution.

Since this is also a Spring Batch application, you can go to the `Jobs` page, go to `ingestJob`, and click on the `info` icon to display the Job execution details:

![JobDetails](https://github.com/spring-cloud/stream-applications/raw/gh-pages/img/s3-file-ingest/JobDetails.png)

### [](#verify-the-data-in-the-database)[](#verify-the-data-in-the-database)Verify the data in the database

Job details reports it performed 5494 writes. The Data Flow Server configures all task apps' DataSource to use its database to record task and job execution status. For this demo, we are using the same DataSource to write the application data. We can connect to the `dataflow-mysql` container to query the table:

```
Copydocker exec -it dataflow-mysql mysql -u root -p
```

login with the password `rootpw` and query the table:

![VerifyData](https://github.com/spring-cloud/stream-applications/raw/gh-pages/img/s3-file-ingest/VerifyData.png)

## [](#conclusion)[](#conclusion)Conclusion

If you read this far, thank you for your time and attention. If you ran the demo, a well deserved Congratulations!

Even in its simplest form, this is a fairly advanced use case for Data Flow. Here we provided the Spring Batch application. Normally, you would write your own (although the next release of Spring Cloud Task is rumored to include a configurable batch application). Other than that, we didn’t need to write any code to have a fully functional, cloud native, event-driven ETL pipeline to ingest data from S3 to a relational database. Being event-driven means new data is ingested and available to users as soon as it arrives, rather than running on a nightly schedule with data available the next day. Files may be processed concurrently, with multiple job instances running as needed. Since Data Flow limits the number of concurrent tasks running on the platform, this architecture can handle a very high load without exhausting platform resources.

A viable alternative for ingesting files from S3 eliminates the need to copy files to a shared file system. In this case, the S3 source can be configured as `list only=true` so that it will provide the remote S3 path. The batch job then connects to S3 and processes the remote file directly. This [Stack Overflow post](https://stackoverflow.com/questions/30832041/spring-batch-read-files-from-aws-s3) gives some hints on how to do this.

When using S/FTP however, this approach is less desirable, since these are file transfer protocols, and direct streaming is limited. If you do not use a persistent volume, and the job fails for some reason, you have to start from scratch, likely having to manually rewind from a partially complete state. The implementation of this pipeline with S/FTP is very similar to what we have shown here.

## [](#stay-tuned)[](#stay-tuned)Stay Tuned

This post is part of a series of articles on topics related to the new function-based Spring Cloud Stream applications. Look for more in coming weeks.