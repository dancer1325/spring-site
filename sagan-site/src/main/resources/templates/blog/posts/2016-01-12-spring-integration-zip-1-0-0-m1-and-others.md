---
title: Spring Integration Zip 1.0.0.M1 and others
source: https://spring.io/blog/2016/01/12/spring-integration-zip-1-0-0-m1-and-others
scraped: 2026-02-23T19:31:00.099Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  January 12, 2016 | 1 Comment
---

# Spring Integration Zip 1.0.0.M1 and others

_Releases | Artem Bilan |  January 12, 2016 | 1 Comment_

Dear Spring Community,

The Spring Integration team wants to wish you a Happy New Year!

We have been super-busy working on new features and improvements. Here is an overview of our recent activities around Spring Integration and Spring AMQP:

-   We made several maintenance releases of Spring Integration 4.2.x, the most recent being Spring Integration 4.2.4. All other maintenance versions will be released only on [demand](https://spring.io/blog/2015/10/27/spring-integration-maintenance-releases-available).
    
-   Spring Integration 4.3 is planned for this summer. Furthermore, for version 5.0, we started looking more closely at incorporating Reactive Streams into the Framework.
    
-   Similarly with the Spring AMQP project, the current maintenance version is `1.5.3` and `1.6` has been started, too.
    
-   Spring Integration Java DSL `1.1.1` is available, too. You can find several Java DSL samples in the latest [Spring Integration Manual](http://docs.spring.io/spring-integration/docs/latest-ga/reference/html/files.html#_configuring_with_the_java_dsl_7), by the way.
    
-   Spring Integration Kakfa 1.3 has been released as well with features like:
    
    -   Kafka Native Offest Manager;
    -   Sync Producer and `ProducerListener` callback support;
    -   New Brokers discovery for the `KafkaMessageListenerContainer`;
    -   And yes: the High Level Consumer Adapter has been deprecated.

We are also working on Spring Integration Kafka 2.0 which will be based on Apache Kafka 0.9.

## [](#spring-integration-zip)Spring Integration Zip

Today we are pleased to announce that the [Spring Integration Zip](https://github.com/spring-projects/spring-integration-extensions/tree/master/spring-integration-zip) **1.0.0.M1** is now available from the [Milestone Repository](https://repo.spring.io/milestone/).

Especial thanks to our pal [Gunnar Hillert](https://spring.io/team/ghillert), who initiated and started the work for this extension.

The Spring Integration Zip extension provides compression/uncompression components as you would expect. The “hard” work is done by the `AbstractZipTransformer` implementations which uses the [ZeroTurnaround ZIP Library](https://github.com/zeroturnaround/zt-zip) under the covers. `zt-zip` provides a convenient, high-level API over the standard `java.util.zip` package.

With this Milestone 1 the following components are provided:

### [](#zip-transformer)Zip transformer

The goal of this component is to zip inbound message payloads and to produce a compressed archive, based on the java.util.zip.Deflater compression level. The following message payload types are supported: `File`, `String`, `byte[]` or `Iterable` of those types. The result can be returned either as a `File` or as `byte[]` of compressed data. This is defined by the `ZipResultType`.

It is easy to configure the Zip Transformer with XML components:

```xml
Copy<int-zip:zip-transformer input-channel="input"
                         output-channel="output"
                         result-type="BYTE_ARRAY"
                         compression-level="9"/>
```

as well as with Java Config:

```java
Copy@Bean
@Transformer(inputChannel = "input", outputChannel = "output")
public ZipTransformer zipTransformer() {
    ZipTransformer zipTransformer = new ZipTransformer();
    zipTransformer.setCompressionLevel(Deflater.BEST_COMPRESSION);
    zipTransformer.setZipResultType(ZipResultType.BYTE_ARRAY);
    return zipTransformer;
}
```

### [](#unzip-transformer)UnZip transformer

The logic implemented in the uncompression component is similarly straightforward. For the input message payload, the following types are supported: `File`, `String` or `byte[]` and treated as an archive to decompress. When unzipping data, you can also specify a property `expectSingleResult`. If set to `true` and more than `1` zip entry were detected, a `MessagingException` will be raised. This property also influences the return type of the payload. If set to `false` (the default), then the payload will be of type `SortedMap`, if `true`, however, the actual zip entry will be returned.

The config for this component is simple, too:

```xml
Copy<int-zip:unzip-transformer input-channel="input"
                           output-channel="output"
                           delete-files="true"
                           result-type="FILE"
                           expect-single-result="true"/>
```

```java
Copy@Bean
@Transformer(inputChannel = "input", outputChannel = "output")
public UnZipTransformer unZipTransformer() {
    UnZipTransformer unZipTransformer = new UnZipTransformer();
    unZipTransformer.setExpectSingleResult(true);
    unZipTransformer.setZipResultType(ZipResultType.FILE);
    unZipTransformer.setWorkDirectory(new File("/usr/tmp/uncompress"));
    unZipTransformer.setDeleteFiles(true);
    return unZipTransformer;
}
```

### [](#unzip-result-splitter)UnZip Result Splitter

The `UnZipResultSplitter` can be used as a downstream helper component to produce each unzipped entry as a separate message. The `FileHeaders.FILENAME` and `ZipHeaders.ZIP_ENTRY_PATH` headers are populated for each splitted item:

```xml
Copy<int:chain input-channel="input" output-channel="out">
    <int-zip:unzip-transformer result-type="BYTE_ARRAY"/>
    <int:splitter>
        <bean class="org.springframework.integration.zip.splitter.UnZipResultSplitter"/>
    </int:splitter>
</int:chain>
```

## [](#conclusion)Conclusion

This is just the beginning for this extension and any community feedback is very important to us as it helps us to understand what to improve, what should be added or changed. Therefore, do not hesitate to reach out to us via any available channel to share your ideas or to get some help from us!

[Project Page](https://github.com/spring-projects/spring-integration-extensions) | [JIRA](https://jira.spring.io/browse/INTEXT) | \[Contributions\] ([https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.md](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.md)) | [StackOverflow](http://stackoverflow.com) (`spring-integration` tag)