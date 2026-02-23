---
title: Case Study: Elasticsearch sink
source: https://spring.io/blog/2020/11/16/case-study-elasticsearch-sink
scraped: 2026-02-23T13:38:22.245Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Soby Chacko |  November 16, 2020 | 1 Comment
---

# Case Study: Elasticsearch sink

_Engineering | Soby Chacko |  November 16, 2020 | 1 Comment_

This article is part of a blog series that explores the newly redesigned Spring Cloud Stream applications based on Java Functions. In this post, we will look at the Elasticsearch sink that allows us to index records in Elasticsearch, and its corresponding Consumer function.

Here are all the previous parts of this blog series.

-   [Introducing Function Based Streaming Applications](https://spring.io/blog/2020/07/13/introducing-java-functions-for-spring-cloud-stream-applications-part-0)
    
-   [Function Composition with Streaming Applications](https://spring.io/blog/2020/07/20/introducing-java-functions-for-spring-cloud-stream-applications-part-1)
    
-   [How to Build a Supplier and Source Application](https://spring.io/blog/2020/07/27/creating-a-supplier-function-and-generating-spring-cloud-stream-source)
    
-   [How to Build a Consumer and Sink Application](https://spring.io/blog/2020/08/03/creating-a-function-for-consuming-data-and-generating-spring-cloud-stream-sink-applications)
    
-   [Build and Run a Simple Stream Application](https://spring.io/blog/2020/08/10/case-study-build-and-run-a-streaming-application-using-an-http-source-and-a-jdbc-sink)
    
-   [Case Study: HTTP Request Function and Processor](https://spring.io/blog/2020/08/17/case-study-http-request-function-and-processor)
    
-   [Case Study: File Source and MongoDB Sink](https://spring.io/blog/2020/08/25/case-study-reading-from-a-file-and-writing-to-mongodb)
    
-   [Case Study: Relational Database Source and File Sink](https://spring.io/blog/2020/09/10/case-study-relational-database-source-and-file-sink)
    
-   [Case Study: Remote File Ingest with Spring Cloud Data Flow](https://spring.io/blog/2020/09/29/case-study-remote-file-ingest-with-spring-cloud-data-flow)
    
-   [Case Study: Aggregator Function and Processor](https://spring.io/blog/2020/10/26/case-study-aggregator-function-and-processor)
    

## [](#elasticsearch-consumer)[](#elasticsearch-consumer)Elasticsearch Consumer

Before we look at the Elasticsearch sink application, let us see the consumer function that powers the sink. As we have seen previously in other sink applications, the consumer is a standard `java.util.function.Consumer` which accepts a `Message<?>`. The consumer relies upon [Spring Boot’s support for Elasticsearch](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-elasticsearch) which auto configures a `RestHighLevelClient` from Elasticsearch. The consumer supports messages with the following types of payload.

-   String
    
-   java.util.Map
    
-   [XContentBuilder](https://github.com/elastic/elasticsearch/blob/master/libs/x-content/src/main/java/org/elasticsearch/common/xcontent/XContentBuilder.java) from Elasticsearch.
    

When using the consumer, the Elasticsearch index to use is given by the property `elasticsearch.consumer.index`

You may set the Elasticsearch ID to use for each message by setting the `INDEX_ID` message header. Alternately, you can set the `elasticsearch.consumer.id` property, which accepts a SpEL expression. If neither of these is set, Elasticsearch will auto-generate an ID.

By setting the property `elasticsearch.consumer.async` to `true`, we can make the indexing operation asynchronous.

We can inject the consumer function in the application and invoke its `accept` method directly to index records to ElasticSearch.

For e.g, let’s say we inject the consumer bean in an application as below.

```
Copy@Autowired
ElasticsearchConsumer elasticsearchConsumer
```

Then we can use the following `java.util.Map` to index a record.

```
CopyMap<String, Object> jsonMap = new HashMap<>();
jsonMap.put("age", 100);
jsonMap.put("dateOfBirth", 1471466076564L);
jsonMap.put("fullName", "John Doe");
final Message<Map<String, Object>> message = MessageBuilder.withPayload(jsonMap).build();

elasticsearchConsumer.accept(message);
```

The same information on the map above can be provided as plain `JSON` or using [XContentBuilder](https://github.com/elastic/elasticsearch/blob/master/libs/x-content/src/main/java/org/elasticsearch/common/xcontent/XContentBuilder.java) from Elasticsearch.

## [](#elasticsearch-sink)[](#elasticsearch-sink)Elasticsearch Sink

As we have seen in the previous blogs, the consumer function becomes more powerful when combining with Spring Cloud Stream to make it a sink application. It has inherent capabilities to communicate with a middleware technology in a seamless manner. The sink application consumes data from a middleware system such as Apache Kafka or RabbitMQ and sends to Elasticsearch. We already provide out of the box variants of Elasticsearch for Kafka and RabbitMQ.

Let us run through the steps for running the standalone Elasticsearch sink application for Apache Kafka.

First, go ahead and download the sink application. Since the sink is not generally available yet, let us use the latest milestone release.

```
Copywget https://repo.spring.io/milestone/org/springframework/cloud/stream/app/elasticsearch-sink-kafka/3.0.0-M4/elasticsearch-sink-kafka-3.0.0-M4.jar
```

Before running the application, ensure that you have Easticsearch running. Here is a quick way to start a single-node Elasticsearch cluster in a docker container.

```
Copydocker run -d --name es762 -p 9200:9200 -e "discovery.type=single-node" elasticsearch:7.6.2
```

We will also need to make sure that Kafka is running.

Then run the application as below:

```
Copyjava -jar elasticsearch-sink-kafka-3.0.0-M4.jar
 --spring.cloud.stream.bindings.input.destination=data-in --elasticsearch.consumer.index=testing
```

By providing the input destination property, we are asking the sink to receive data from the Kafka topic `data-in` and sends the data to the Elasticsearch index `testing`.

Send some test data to the Kafka topic. For example, here is how you can send it using the Kafka console producer script if you have Kafka running locally on port `9092`.

```
Copykafka-console-producer.sh --broker-list localhost:9092 --topic data-in
```

Then send the following `JSON` data.

`{"key1":"value1"}`

We can verify that the data is indexed by invoking the following endpoint.

`curl localhost:9200/testing/_search`

Similarly, we can also download the [RabbitMQ](https://repo.spring.io/milestone/org/springframework/cloud/stream/app/elasticsearch-sink-rabbit/3.0.0-M4/) variant of the Elasticsearch sink application and run it against a RabbitMQ cluster.

### [](#further-usage-of-the-sink)[](#further-usage-of-the-sink)Further usage of the sink

As we have seen several times previously in this series, these Spring Cloud Stream applications become further powerful and resilient when it is run as part of a data pipeline on Spring Cloud Data Flow.

The Elasticsearch that we saw above can be combined with a number of other applications. For instance, a TCP source app may be receiving data from a source and then dump the data to a middleware destination, from where the Elasticsearch sink consumes and indexes. This index may be then used by an analytics application to generate a dashboard. This is just one example and there are several such use cases. Spring Cloud Data Flow makes the orchestration of these pipelines seamless for the user. We encourage you to take a look at the steps we laid out in previous blogs on how we can deploy apps on Spring Cloud Data Flow. Using those same steps, the Elasticsearch sink application can also be deployed.

### [](#conclusion)[](#conclusion)Conclusion

In this blog, we saw how Elasticsearch consumer function and its corresponding Spring Cloud Stream sink work. The consumer function can be injected into custom applications for combining with other business logic. The sink application is provided out of the box for use with Kafka and RabbitMQ middleware variants.

We still have a few more epsidoses coming up in this blog series. Please stay tuned.