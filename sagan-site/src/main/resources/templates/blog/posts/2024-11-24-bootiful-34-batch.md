---
title: Bootiful Spring Boot 3.4: Spring Batch
source: https://spring.io/blog/2024/11/24/bootiful-34-batch
scraped: 2026-02-23T08:03:14.314Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  November 24, 2024 | 0 Comments
---

# Bootiful Spring Boot 3.4: Spring Batch

_Engineering | Josh Long |  November 24, 2024 | 0 Comments_

The new release of Spring Batch 5.2 has a ton of features! Spring Batch is a compelling way to handle large but finite sequential data access. Think: reading from an SQL database and writing to a CSV, or reading from an FTP server and writing out an analysis of a MongoDB - batch processing. You know what this is. Half the job (pardon the pun!) is the integration of various sources of data and multiple sinks of data. The other aspect, as you can imagine with workloads that take a long time and could fail, is maintaining durable and extensive metadata related to each batch job’s run. Again, I can’t cover everything new and novel in depth in this release! So, let’s look at some of the features from a high level.

-   we’ve gone from one to three - count 'em: *three*! - job repository implementations. In recent terms, Spring Batch has only had the JDBC-backed `JobRepository`. In the not-too-distant past, it had two `JobRepository` implementations: one supporting JDBC, and another supporting "persistence" via in-memory `Map`s. The `Map` option was nice for tests or workloads where the durability of the results was less important than pure performance. We removed the `Map` implementation, telling people to use an in-memory SQL database like H2 with the JDBC `JobRepository`. Some wanted pure performance, and the H2 option wasn’t good enough. In this release, we’ve introduced a "resource"-less `JobRepository` that saves no state, not even in memory. We’ve also added a durable alternative to the JDBC-based `JobRepository` with a MongoDB-backed `JobRepository` implementation.
-   new support for registering hints for Spring Data JPA’s queries using the JPA `ItemReader`.
-   new support for data classes - Kotlin `data class` or Java `record` instances - when using the JDBC-based `ItemReader`s.
-   support for adapting more function types - not just `Function<I,O>` - to `ItemReader`, `ItemWriter`, and `ItemProcessor` types.
-   concurrent steps with blocking queue item readers and writers
-   a `CompositeItemReader<T>` that can sequentially drain data from more than one delegated `ItemReader<T>`.
-   simplifications in job registration
-   configurable line separator support in `RecursiveCollectionLineAggregator`

### [](#compositeitemreadert)`CompositeItemReader<T>`

Let’s take a look at two of my favorite new features: `CompositeItemReader<T>`s and the SEDA-friendly `BlockingQueueItemWriter` and `BlockingQueueItemReader` implementations.

Here’s the definition of the lone `Job` in this Spring Batch application:

```java
Copypackage com.example.bootiful_34.batch;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

@Configuration
class BatchConfiguration {

	static final BlockingQueue<Customer> CUSTOMERS = new LinkedBlockingQueue<>();

	@Bean
	Job job(JobRepository repository, Step one, Step two) {
		return new JobBuilder("job", repository)//
			.incrementer(new RunIdIncrementer()) //
			.start(one)//
			.next(two)//
			.build();
	}

}

```

It’s a simple job with two `Step` instances, one flowing into another. A quick reminder: in Spring Batch, a `Step` is a unit of work. It describes four things:

-   how much data constitutes a "batch" of work? (this is called a "chunk" in Spring Batch parlance)
-   The source from which data is meant to be read (represented by an instance of an `ItemReader<T>`)
-   The sink to which data is meant to be written (represented by an instance of the `ItemWriter<T>`)
-   a processor that processes data from the source and goes to the sink.

Each `Step` reads as much as one chunk’s worth of data using the `ItemReader<I>`, passes a collection-like thing called a Chunk to the `ItemProcessor<I,O>` for arbitrary manipulation, and then sends the output of the `ItemProcessor<I,O>` to the `ItemWriter<O>`. `I` and `O` can represent the same generic or different types. Then, the loop continues until all the data from `ItemReader` is drained. The step is considered finished, and execution moves on to the next step.

In this sample application, we will read data from the `customer` table, reading the `id`, `name`, `os`, and `language` records. We’re *also* going to read similar data from a `.csv` file. We’ll use the handy new `CompositeItemReader<Customer>` to do short work of this and spare us from having to do separate normalizing steps.

```java
Copypackage com.example.bootiful_34.batch;

import org.springframework.aot.hint.RuntimeHints;
import org.springframework.aot.hint.RuntimeHintsRegistrar;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.database.JdbcCursorItemReader;
import org.springframework.batch.item.database.builder.JdbcCursorItemReaderBuilder;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.builder.FlatFileItemReaderBuilder;
import org.springframework.batch.item.queue.BlockingQueueItemWriter;
import org.springframework.batch.item.support.CompositeItemReader;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportRuntimeHints;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import java.util.List;

@Configuration
@ImportRuntimeHints(StepOneConfiguration.CustomersCsvRuntimeHintsRegistrar.class)
class StepOneConfiguration {

	private static final Resource CSV = new ClassPathResource("/customers.csv");

	@Bean
	FlatFileItemReader<Customer> customerCsvItemReader() {
		return new FlatFileItemReaderBuilder<Customer>()//
			.resource(CSV)
			.delimited()
			.names("id", "name", "language", "os")
			.name("customerCsvItemReader")
			.fieldSetMapper(fs -> new Customer(fs.readInt(0), fs.readString(1), fs.readString(2), fs.readString(3)))
			.build();
	}

	@Bean
	JdbcCursorItemReader<Customer> customerJdbcItemReader(DataSource dataSource) {
		return new JdbcCursorItemReaderBuilder<Customer>()//
			.name("customerJdbcItemReader")//
			.dataSource(dataSource)//
			.sql("select id, name, language, os from customer")//
			.rowMapper((rs, rowNum) -> new Customer(rs.getInt(1), rs.getString(2), rs.getString(3), rs.getString(4)))//
			.build();
	}

	@Bean
	CompositeItemReader<Customer> customerCompositeItemReader(JdbcCursorItemReader<Customer> customerJdbcItemReader,
			FlatFileItemReader<Customer> customerCsvItemReader) {
		return new CompositeItemReader<>(List.of(customerJdbcItemReader, customerCsvItemReader));
	}

	@Bean
	BlockingQueueItemWriter<Customer> customerBlockingQueueItemWriter() {
		return new BlockingQueueItemWriter<>(BatchConfiguration.CUSTOMERS);
	}

	@Bean
	Step one(JobRepository repository, PlatformTransactionManager txm,
			CompositeItemReader<Customer> customerCompositeItemReader,
			BlockingQueueItemWriter<Customer> customerBlockingQueueItemWriter) {
		return new StepBuilder("one", repository)//
			.<Customer, Customer>chunk(10, txm)//
			.reader(customerCompositeItemReader)//
			.writer(customerBlockingQueueItemWriter)//
			.build();
	}

	static class CustomersCsvRuntimeHintsRegistrar implements RuntimeHintsRegistrar {

		@Override
		public void registerHints(RuntimeHints hints, ClassLoader classLoader) {
			hints.resources().registerResource(CSV);
		}

	}

}

```

In this example, we’ve got *three* `ItemReader` beans, but the step only consumes one `CompositeItemReader<T>` bean. It, in turn, will sequentially read whatever comes from the `FlatFileItemReader<Customer>` and the `JdbcCursorItemReader<Customer>` beans.

We’ve not configured an `ItemProcessor<Customer,Customer>` in this example.

### [](#staged-event-driven-architecture-and-batch-yep)Staged Event Driven Architecture and Batch? Yep!

For the `ItemWriter<Customer>`, we’re using yet another new and novel addition to the framework: the `BlockingQueueItemWriter<Customer>`! The idea is simple: the writer writes data to a Java `java.util.concurrent.BlockingQueue`. The `BlockingQueue` variable is a `static final` variable defined in the `BatchConfiguration` class called `CUSTOMERS`. And the next step will have a configured `BlockingQueueItemReader<T>` that will *read* from the same `java.util.concurrent.BlockingQueue`. Super simple, right? Yes! But it’s going to be a huge time saver.

Traditionally, a Spring Batch app only had context associated with the current step. As data flowed through a job, a Spring Batch `Step` only afforded you three bites at the apple: from the `ItemReader<I>`, the `ItemProcessor<I,O>` and the `ItemWriter<O>`. Want to do more processing on the data after it’s written? It’ll have to wait until the next step! You’ll have already written it to disk or something durable, and then you must reread it. Spring Batch keeps track of how far you’ve gotten in your reads and writes, so why must we be so paranoid? Why do we need to write everything durably so often?

That no longer needs to be the case now, as Spring Batch supports writing a given `Step` output to a `BlockingQueue`. `BlockingQueue` instances, notably, have the added benefit of supporting a limit on how much data is written. This plays nicely with the style of [**Staged Event Driven Architecture**](https://en.wikipedia.org/wiki/Staged_event-driven_architecture) (SEDA). The idea behind SEDA is to define work in terms of the different stages through which data is passed. As data moves from one stage to another, it flows into (bounded) queues. These bounded queues provide backpressure. You can’t overwhelm the processors of a given stage if the work is rejected or simply written off to disk before it arrives if capacity has been exceeded. This is called *backpressure*, and it is crucial to scalability.

Each stage takes its work only from a queue. This provides a natural way to load-balance: spin up more instances of a given stage’s processor, and the work gets divided evenly across them. You could take this architecture even further with Spring Batch’s remote partitioning and chunking paradigms, allowing you to divide work across a cluster.

This architecture is typically associated with messaging systems - the queues are usually assumed to be queues (or topics) in a message bus; however, the principles behind the architecture work just fine in a batch-processing system.

Let’s take a look at step two!

```java
Copypackage com.example.bootiful_34.batch;

import org.springframework.batch.core.Step;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.queue.BlockingQueueItemReader;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
class StepTwoConfiguration {

	@Bean
	Step two(JobRepository repository, PlatformTransactionManager transactionManager,
			BlockingQueueItemReader<Customer> blockingQueueItemReader, ItemWriter<Customer> customerItemWriter) {
		return new StepBuilder("two", repository)//
			.<Customer, Customer>chunk(10, transactionManager)//
			.reader(blockingQueueItemReader)//
			.writer(customerItemWriter)//
			.build();
	}

	@Bean
	BlockingQueueItemReader<Customer> blockingQueueItemReader() {
		return new BlockingQueueItemReader<>(BatchConfiguration.CUSTOMERS);
	}

	@Bean
	ItemWriter<Customer> customerItemWriter() {
		return chunk -> chunk.forEach(System.out::println);
	}

}

```

Here, we’ve defined another `Step`, reading from the same `BlockingQueue` and then simply printing everything out.

Robust, easy, and scalable batch processing? What else could you ask for? By the way, remember that most of what Spring Batch does—input and output—benefits immeasurably from Java 21’s virtual threads, which Spring Boot has supported for three releases now! Don’t forget to set `spring.threads.virtual.enabled=true` if you’re on Java 21+. (And you *are* on at least Java 21, aren’t you?)