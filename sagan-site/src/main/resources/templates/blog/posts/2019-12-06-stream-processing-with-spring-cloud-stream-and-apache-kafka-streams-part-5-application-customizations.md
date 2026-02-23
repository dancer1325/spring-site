---
title: Stream Processing with Spring Cloud Stream and Apache Kafka Streams. Part 5 - Application Customizations
source: https://spring.io/blog/2019/12/06/stream-processing-with-spring-cloud-stream-and-apache-kafka-streams-part-5-application-customizations
scraped: 2026-02-23T14:19:49.703Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Soby Chacko |  December 06, 2019 | 2 Comments
---

# Stream Processing with Spring Cloud Stream and Apache Kafka Streams. Part 5 - Application Customizations

_Engineering | Soby Chacko |  December 06, 2019 | 2 Comments_

Part 1 - [Programming Model](https://spring.io/blog/2019/12/02/stream-processing-with-spring-cloud-stream-and-apache-kafka-streams-part-1-programming-model) Part 2 - [Programming Model Continued](https://spring.io/blog/2019/12/03/stream-processing-with-spring-cloud-stream-and-apache-kafka-streams-part-2-programming-model-continued) Part 3 - [Data deserialization and serialization](https://spring.io/blog/2019/12/04/stream-processing-with-spring-cloud-stream-and-apache-kafka-streams-part-3-data-deserialization-and-serialization) Part 4 - [Error Handling](https://spring.io/blog/2019/12/05/stream-processing-with-spring-cloud-stream-and-apache-kafka-streams-part-4-error-handling)

In this blog post, we continue our discussion on the support for Kafka Streams in Spring Cloud Stream. We are going to elaborate on the ways in which you can customize a Kafka Streams application.

## [](#customizing-the-streamsbuilderfactorybean)Customizing the StreamsBuilderFactoryBean

Kafka Streams binder uses the [StreamsBuilderFactoryBean](https://docs.spring.io/spring-kafka/docs/current/api/org/springframework/kafka/config/StreamsBuilderFactoryBean.html), provided by the [Spring for Apache Kafka](https://spring.io/projects/spring-kafka) project, to build the [StreamsBuilder](https://kafka.apache.org/23/javadoc/org/apache/kafka/streams/StreamsBuilder.html) object that is the foundation for a Kafka Streams application. This factory bean is a Spring lifecycle bean. Oftentimes, this factory bean must be customized before it is started, for various reasons. As described in the [previous blog](https://spring.io/blog/2019/12/05/stream-processing-with-spring-cloud-stream-and-apache-kafka-streams-part-4-error-handling) post on error handling, you need to customize the `StreamsBuilderFactoryBean` if you want to register a production exception handler. Let’s say that you have this producer exception handler:

```
Copyclass IgnoreRecordTooLargeHandler implements ProductionExceptionHandler {
    
    public ProductionExceptionHandlerResponse handle(final ProducerRecord<byte[], byte[]> record,
                                                     final Exception exception) {
        if (exception instanceof RecordTooLargeException) {
            return ProductionExceptionHandlerResponse.CONTINUE;
        } else {
            return ProductionExceptionHandlerResponse.FAIL;
        }
    }
}
```

You can register it directly by using configuration if you choose (using `default.production.exception.handler`).

However, a more elegant approach, when using the binder, is to register this as part of the `StreamsBuilderFactoryBean` customizer, as follows:

```
Copy@Bean
public StreamsBuilderFactoryBeanCustomizer customizer() {
    return fb -> {
        fb.getStreamsConfiguration().put(StreamsConfig.DEFAULT_PRODUCTION_EXCEPTION_HANDLER_CLASS_CONFIG,
                            IgnoreRecordTooLargeHandler.class);
    };
}
```

Note that, if you have multiple processors in the application, you can control which processor gets customization based on the application ID. For example, you can check on it this way:

```
Copyreturn factoryBean -> {
        if (factoryBean.getStreamsConfiguration().getProperty(StreamsConfig.APPLICATION_ID_CONFIG)
                .equals("processor1-application-id")) {
```

Here is another example of setting a state listener:

```
Copy@Bean
public StreamsBuilderFactoryBeanCustomizer streamsBuilderFactoryBeanCustomizer() {
    return sfb -> sfb.setStateListener((newState, oldState) -> {
         //Do some action here!
    });
}
```

## [](#customizing-kafkastreams-object)Customizing KafkaStreams Object.

The [KafkaStreams](https://kafka.apache.org/23/javadoc/org/apache/kafka/streams/KafkaStreams.html) object is at the heart of any Kafka Streams application. `StreamsBuilderFactoryBean` is responsible for creating the topology and then creating the `KafkaStreams` object. Before starting the `KafkaStreams` object, StreamsBuilderFactoryBean gives an opportunity to customize this `KafkaStreams` object. For example, if you want to set an application-wide handler for uncaught exceptions you can do the following:

```
Copy@Bean
public StreamsBuilderFactoryBeanCustomizer streamsBuilderFactoryBeanCustomizer() {
    return factoryBean -> {
        factoryBean.setKafkaStreamsCustomizer(new KafkaStreamsCustomizer() {
            @Override
            public void customize(KafkaStreams kafkaStreams) {
                kafkaStreams.setUncaughtExceptionHandler((t, e) -> {

                });
            }
        });
    };
}
```

Notice that we start with the customizer for StreamsBuilderFactoryBean. However, inside it, we use a separate `KafkaStreamsCustomizer`.

## [](#summary)Summary

In this blog post, we saw how the Kafka Streams binder in Spring Cloud Stream lets you customize the underlying `StreamsBuilderFactoryBean` and the `KafkaStreams` object.

Thank you for reading this far! Next, in the final blog post in this series, we will look at how the binder lets you deal with state stores and enabling interactive queries against them.