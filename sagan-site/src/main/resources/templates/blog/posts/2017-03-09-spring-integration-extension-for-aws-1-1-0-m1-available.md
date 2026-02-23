---
title: Spring Integration Extension for AWS 1.1.0 M1 Available
source: https://spring.io/blog/2017/03/09/spring-integration-extension-for-aws-1-1-0-m1-available
scraped: 2026-02-23T16:18:11.890Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  March 09, 2017 | 4 Comments
---

# Spring Integration Extension for AWS 1.1.0 M1 Available

_Releases | Artem Bilan |  March 09, 2017 | 4 Comments_

On behalf of the Spring Integration community I’d like to announce the first Milestone of Spring Integration Extension for [Amazon Web Services](https://aws.amazon.com) version `1.1`. Its artifact is `spring-integration-aws.1.1.0.M1`, which is available in the [Milestone Repository](https://repo.spring.io/milestone/).

Of course, first of all, big thanks to you, the community, for your contributions!

Some highlights of the features included to this Milestone:

## [](#kinesis-support)[](#kinesis-support)Kinesis Support

The `KinesisMessageDrivenChannelAdapter` and `KinesisMessageHandler` are provided to integrate with the [Amazon Kinesis](https://aws.amazon.com/kinesis). The former is pretty simple and allow to emit data into a Kinesis stream. All the information for the target `PutRecordRequest` can be determined from the request `Message`:

```
Copy@Bean
@ServiceActivator(inputChannel = "kinesisSendChannel")
public MessageHandler kinesisMessageHandler() {
    KinesisMessageHandler kinesisMessageHandler =
                new KinesisMessageHandler(amazonKinesis());
    kinesisMessageHandler.setAsyncHandler(asyncHandler());
    kinesisMessageHandler.setStream("my_stream");
    kinesisMessageHandler.
             setPartitionKeyExpressionString("headers[aws_partitionKey]");
    return kinesisMessageHandler;
}
```

By default it uses `SerializingConverter` to convert the request data to the `byte[]`. The `com.amazonaws.handlers.AsyncHandler` can be used for asynchronous `putRecordAsync()` result reaction.

The `KinesisMessageDrivenChannelAdapter` provides a comprehensive Kinesis stream data ingestion implementation, including `sequenceNumber` checkpointing and resharding support. The `concurrency` option can be used for strict order records processing in the downstream flow. The provided shards are distributed between threads in that case. If concurrency isn’t provided, internal `ShardConsumer` s are performed on the `consumerExecutor` directly:

```
Copy@Bean
public KinesisMessageDrivenChannelAdapter kinesisMessageDrivenChannelAdapter() {
    KinesisMessageDrivenChannelAdapter adapter =
            new KinesisMessageDrivenChannelAdapter(amazonKinesis(), STREAM1);
    adapter.setOutputChannel(kinesisChannel());
    adapter.setCheckpointStore(checkpointStore());
    adapter.setCheckpointMode(CheckpointMode.manual);
    adapter.setListenerMode(ListenerMode.batch);
    adapter.setStartTimeout(10000);
    adapter.setDescribeStreamRetries(1);
    adapter.setConcurrency(10);
    return adapter;
}
```

If `CheckpointMode` is `manual`, the `AwsHeaders.CHECKPOINTER` message header is populated to each emitted message. It is an instance of `Checkpointer` and its `checkpoint()` can be used in the downstream flow to `checkpoint` a `sequenceNumber` for processed records in the shard.

Note

The Amazon Kinesis Channel Adapters implementation is fully based on the standard `aws-java-sdk-kinesis` API and doesn’t use [Kinesis Client Library](http://docs.aws.amazon.com/streams/latest/dev/developing-consumers-with-kcl.html).

## [](#s3-streaming-messagesource)[](#s3-streaming-messagesource)S3 Streaming MessageSource

To avoid local file system limitation, which might not be even available especially in cloud environment, alongside with the regular `S3InboundFileSynchronizingMessageSource`, a `S3StreamingMessageSource` has been introduced:

```
Copy@Bean
@InboundChannelAdapter(value = "s3FilesChannel",
                 poller = @Poller(fixedDelay = "1000"))
S3StreamingMessageSource s3InboundStreamingMessageSource(AmazonS3 amazonS3) {
    S3SessionFactory s3SessionFactory = new S3SessionFactory(amazonS3);
    S3RemoteFileTemplate s3FileTemplate =
                         new S3RemoteFileTemplate(s3SessionFactory);
    S3StreamingMessageSource s3MessageSource =
                        new S3StreamingMessageSource(s3FileTemplate,
                                    Comparator.comparing(FileInfo::getFilename));
    s3MessageSource.setRemoteDirectory("/myBucket");
    s3MessageSource.setFilter(
                      new S3PersistentAcceptOnceFileListFilter(
                                             new SimpleMetadataStore(),
                                             "streaming"));
    return s3MessageSource;
}
```

This message source produces an `InputStream` for the remote S3 object as message payload and is fully similar to the [FTP Streaming Inbound Channel Adapter](http://docs.spring.io/spring-integration/reference/html/ftp.html#ftp-streaming).

Our next plans to provide `MetadataStore` implementation for the [Amazon DynamoDB](https://aws.amazon.com/dynamodb/), make `SnsMessageHandler` and `SqsMessageHandler` based on async client implementation. Another challenge is before us - Amazon Kinesis Binder implementation for [Spring Cloud Stream](http://cloud.spring.io/spring-cloud-stream/).

Do not hesitate to contact with us via any available communication channel!

[Project Page](https://github.com/spring-projects/spring-integration-aws) | [Issues](https://github.com/spring-projects/spring-integration-aws/issues) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)