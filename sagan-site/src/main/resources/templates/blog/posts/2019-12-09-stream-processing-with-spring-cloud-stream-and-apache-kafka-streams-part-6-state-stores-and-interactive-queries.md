---
title: Stream Processing with Spring Cloud Stream and Apache Kafka Streams. Part 6 - State Stores and Interactive Queries
source: https://spring.io/blog/2019/12/09/stream-processing-with-spring-cloud-stream-and-apache-kafka-streams-part-6-state-stores-and-interactive-queries
scraped: 2026-02-23T14:19:39.676Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Soby Chacko |  December 09, 2019 | 0 Comments
---

# Stream Processing with Spring Cloud Stream and Apache Kafka Streams. Part 6 - State Stores and Interactive Queries

_Engineering | Soby Chacko |  December 09, 2019 | 0 Comments_

Part 1 - [Programming Model](https://spring.io/blog/2019/12/02/stream-processing-with-spring-cloud-stream-and-apache-kafka-streams-part-1-programming-model) Part 2 - [Programming Model Continued](https://spring.io/blog/2019/12/03/stream-processing-with-spring-cloud-stream-and-apache-kafka-streams-part-2-programming-model-continued) Part 3 - [Data deserialization and serialization](https://spring.io/blog/2019/12/04/stream-processing-with-spring-cloud-stream-and-apache-kafka-streams-part-3-data-deserialization-and-serialization) Part 4 - [Error Handling](https://spring.io/blog/2019/12/05/stream-processing-with-spring-cloud-stream-and-apache-kafka-streams-part-4-error-handling) Part 5 - [Application Customizations](https://spring.io/blog/2019/12/06/stream-processing-with-spring-cloud-stream-and-apache-kafka-streams-part-5-application-customizations)

In this part (the sixth and final one of this series), we are going to look into the ways Spring Cloud Stream Binder for Kafka Streams supports state stores and interactive queries in Kafka Streams.

## [](#named-state-stores)Named State Stores

When you have the need to maintain state in the application, Kafka Streams lets you materialize that state information into a named state store. There are several operations in Kafka Streams that require it to keep track of the state such as `count`, `aggregate`, `reduce`, various `windowing` operations, and others. Kafka Streams uses a special database called [RocksDB](https://rocksdb.org/) for maintaining this state store in most cases (unless you explicitly change the store type). By default, the same information in the state store is backed up to a changelog topic as well as within Kafka, for fault-tolerant reasons.

When you explicitly materialize state like this into a named state store, this gives the ability for applications to query that state store at a later stage. This is a very powerful feature, as this gives you the ability to query into a database-like structure from within your Kafka Streams applications.

## [](#consuming-data-as-ktable-or-globalktable)Consuming data as KTable or GlobalKTable

Kafka Streams binder-based applications can bind to destinations as `KTable` or `GlobalKTable`. `GlobalKTable` is a special table type, where you get data from all partitions of an input topic, regardless of the instance that it is running. By contrast, a `KTable` gives you only data from the respective partitions of the topic that the instance is consuming from.

The following is a function signature we saw earlier in this series of blog posts:

```
Copy@Bean
public Function<KStream<Long, Order>,
     Function<KTable<Long, Customer>,
           Function<GlobalKTable<Long, Product>, KStream<Long, EnrichedOrder>>>> process() {
```

As you can see, this function has three input bindings, one `KStream`, one `KTable`, and another `GlobalKTable`. Kafka Streams lets you materialize tables consumed like these into named state stores, given that these tables are based on a primary key. You can use the binding level property to materialize them into named state stores along with consumption. The following examples show how to do so:

```
Copyspring.cloud.stream.kafka.streams.bindings.process-in-1.consumer.materializedAs: incoming-store-1
spring.cloud.stream.kafka.streams.bindings.process-in-2.consumer.materializedAs: incoming-store-2
```

## [](#kafka-streams-dsl-operations-materialized-into-state-stores)Kafka Streams DSL operations materialized into state stores

There are various methods in the Kafka Streams high-level DSL, which returns table types such as `count`, `aggregate`, and `reduce`. There are other operations that use state stores to keep track of information. For example, the various join method calls in `KStream`, although they return a `KStream` type, internally use state stores to keep the joined data. In summary, when Kafka Streams lets you materialize data either as a table or stream, it is materialized into a state store, much like data stored in a database table.

## [](#explicit-state-stores-to-use-in-low-level-processors)Explicit state stores to use in low-level processors

When using the processor API of Kafka Streams, which gives you more flexibility on how the stream is processed, you have to declare a state store beforehand and provide that to the StreamsBuilder. Kafka Streams binder can scan the application to detect beans of type StoreBuilder and then use that to create state stores and pass them along with the underlying StreamsBuilder through the StreamsBuilderFactoryBean. Here is a look at such beans:

```
Copy@Bean
public StoreBuilder myStore() {
  return Stores.keyValueStoreBuilder(
        Stores.persistentKeyValueStore("my-store"), Serdes.Long(),
        Serdes.Long());
}

@Bean
public StoreBuilder otherStore() {
  return Stores.windowStoreBuilder(
        Stores.persistentWindowStore("other-store",
              Duration.ofSeconds(3), Duration.ofSeconds(3),  false), Serdes.Long(),
        Serdes.Long());
}
```

The two StoreBuilder beans are detected by the binder, and it then attaches them to the streams builder automatically. Later on, you can access them, in your processor API based applications, as follows:

```
Copy…
KeyValueStore<Long, Long> state1;
WindowStore<Long, Long> state2;
...
@Bean
public java.util.function.Consumer<KStream<Object, String>> process() {
  return input ->
        input.process((ProcessorSupplier<Object, String>) () -> new Processor<Object, String>() {
           @Override
            public void init(ProcessorContext context) {
              state1 = (KeyValueStore<Long, Long>) context.getStateStore("my-store");
              state2 = (WindowStore<Long, Long>) context.getStateStore("other-store");
           }

           @Override
           public void process(Object key, String value) {
              // processing code
           }

           @Override
           public void close() {
              if (state1 != null) {
                 state1.close();
              }
              if (state2 != null) {
                 state2.close();
              }
           }
        }, "my-store", "other-store");
}
```

One quick note about the usage of the processor API in Kafka Streams binder-based applications. The only way you can use the low-level processor API when you use the binder is through a usage pattern of higher-level DSL and then combine that with a transform or process call on it, as shown in the preceding example. See [here](https://cloud.spring.io/spring-cloud-static/spring-cloud-stream-binder-kafka/3.0.0.RELEASE/reference/html/spring-cloud-stream-binder-kafka.html#_mixing_high_level_dsl_and_low_level_processor_api) for more details on how the processor API can be used in a binder based application.

Instead of creating `StoreBuilder` beans in the application, you can also use the `StreamsBuilderFactoryBean` customizer which we saw in the [previous blog](https://spring.io/blog/2019/12/06/stream-processing-with-spring-cloud-stream-and-apache-kafka-streams-part-5-application-customizations), to add the state stores programmatically, if that is your preference.

## [](#using-interactive-queries-to-query-data-from-state-stores)Using interactive queries to query data from state stores

Kafka Streams lets you interactively query the data in the state store in real time as live stream processing is going on. The binder provides abstractions around this feature to make it easier to work with interactive queries. `InteractiveQueryService` is a basic API that the binder provides to work with state store querying. You can usually inject this as a bean into your application and then invoke various API methods from it. Here is an example:

```
Copy@Autowired
private InteractiveQueryService interactiveQueryService;
 …
 ...
ReadOnlyKeyValueStore<Object, Object> keyValueStore =
                                                interactiveQueryService.getQueryableStoreType("my-store", QueryableStoreTypes.keyValueStore());
```

Then you can invoke various retrieval methods from the store and iterate through the result. There are various methods that you can invoke from these state stores based on your use case and the type of state store that you are using. Please refer to the Kafka Streams documentation for [interactive queries](https://kafka.apache.org/10/documentation/streams/developer-guide/interactive-queries.html) for these various iteration methods available.

## [](#interactive-queries-over-rpc-mechanisms)Interactive Queries over RPC Mechanisms

Oftentimes, you want to expose the state of your system from state stores over an RPC mechanism. You can combine Spring web support for writing powerful REST based applications in this manner. Here is a blueprint:

```
Copy@RestController
public class Controller {

		@RequestMapping("/song/id")
		public SongBean song(@RequestParam(value="id") Long id) {
			final ReadOnlyKeyValueStore<Long, Song> songStore =
					interactiveQueryService.getQueryableStore(“song-store”, QueryableStoreTypes.<Long, Song>keyValueStore());

			final Song song = songStore.get(id);
			if (song == null) {
				throw new IllegalArgumentException("...");
}
```

This REST controller can be accessed from a front end web application for example.

This usage pattern obviously raises concerns. What happens if there are multiple Kafka Streams application instances running? For instance, what if there are 3 instances in which each of them is pulling data from a single source partition? Which controller instance is going to be responsible for providing information for key *X*? What if key *X* is only hosted in partition 3 and that happens to be the instance 3, but the request landed on instance 1. This is obviously a problem, but Kafka Streams provides a solution for that.

## [](#retrieving-a-key-from-the-right-instance)Retrieving a key from the right instance

When you have multiple instances running and you want to use interactive queries, you have to set this property at the binder level:

```
Copyspring.cloud.stream.kafka.streams.binder.configuration.application.server: <server>:<port>
```

Then, in the controller method, you have to write logic that is similar to the following:

```
Copy@RequestMapping("/charts/top-five")
@SuppressWarnings("unchecked")
public List<SongPlayCountBean> topFive(@RequestParam(value="genre") String genre) {
{

org.apache.kafka.streams.state.HostInfo hostInfo = interactiveQueryService.getHostInfo("store-name",
                                                key, keySerializer);

if (interactiveQueryService.getCurrentHostInfo().equals(hostInfo)) {

    //query from the store that is locally available
}
else {
    //query from the remote host
RestTemplate restTemplate = new RestTemplate();
	return restTemplate.postForObject(
						String.format("http://%s:%d/%s", hostInfo.host(),
								hostInfo.port(), "charts/top-five?genre=Punk"), …);

}
```

## [](#summary)Summary

In this blog, we saw the various ways in which Kafka Streams lets you materialize state information into state stores. The binder lets you consume data as `KTable` or `GlobalKTable` while allowing you to materialize that into a named state store. Kafka Streams has several operations in which state stores can be materialized as named stores. We saw that, when using the processor API in Kafka Streams, the application needs to create state store builder beans that the binder detects which it then passes along to Kafka Streams. Finally, we saw how these state stores can be queried by using interactive queries. We also saw the nuances involving multiple instances of an application and interactive queries against them.

## [](#concluding-the-series-and-where-to-go-next)Concluding the series and Where to Go Next...

Thank you for reading this blog series!

In this six-part series, we saw many features of Kafka Streams binder in Spring Cloud Stream, such as its [programming models](https://spring.io/blog/2019/12/03/stream-processing-with-spring-cloud-stream-and-apache-kafka-streams-part-2-programming-model-continued), [data serialization](https://spring.io/blog/2019/12/04/stream-processing-with-spring-cloud-stream-and-apache-kafka-streams-part-3-data-deserialization-and-serialization), [error handling](https://spring.io/blog/2019/12/05/stream-processing-with-spring-cloud-stream-and-apache-kafka-streams-part-4-error-handling), [customization](https://spring.io/blog/2019/12/06/stream-processing-with-spring-cloud-stream-and-apache-kafka-streams-part-5-application-customizations), and interactively querying the state stores. There are more features that we haven’t covered as part of this series as we wanted to focus on the general theme of introducing the main features of this binder that was added or enhanced in version `3.0.0`. For those additional features or to engage with the engineering team behind Spring Cloud Stream, please check out the various links provided in the resources section below.

## [](#resources)Resources:

[Kafka Streams Binder Docs](https://cloud.spring.io/spring-cloud-static/spring-cloud-stream-binder-kafka/3.0.0.RELEASE/reference/html/spring-cloud-stream-binder-kafka.html#_kafka_streams_binder)

[Spring Cloud Stream](https://spring.io/projects/spring-cloud-stream)

[Core Spring Cloud Stream GitHub](https://github.com/spring-cloud/spring-cloud-stream) [Spring Cloud Stream Kafka Binder GitHub](https://github.com/spring-cloud/spring-cloud-stream-binder-kafka) [Spring Cloud Stream Samples](https://github.com/spring-cloud/spring-cloud-stream-samples)

[Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud-stream) [Gitter](https://gitter.im/spring-cloud/spring-cloud-stream)