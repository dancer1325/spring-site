---
title: Getting Started | Creating a Batch Service
source: https://spring.io/guides/gs/batch-processing
scraped: 2026-02-19T07:56:54.736Z
description: Learn how to create a basic batch-driven solution.
---

# Creating a Batch Service

This guide walks you through the process of creating a basic batch-driven solution.

## What You Will build

You will build a service that imports data from a CSV spreadsheet, transforms it with custom code, and stores the final results in a database.

## What You Need

-   About 15 minutes
    
-   A favorite text editor or IDE
    
-   [Java 17](https://www.oracle.com/java/technologies/downloads/) or later
    
-   [Gradle 7.5+](https://gradle.org/install/) or [Maven 3.5+](https://maven.apache.org/download.cgi)
    
-   You can also import the code straight into your IDE:
    
    -   [Spring Tool Suite (STS)](/guides/gs/sts)
        
    -   [IntelliJ IDEA](/guides/gs/intellij-idea/)
        
    -   [VSCode](/guides/gs/guides-with-vscode/)
        
    

## How to complete this guide

Like most Spring [Getting Started guides](/guides), you can start from scratch and complete each step or you can bypass basic setup steps that are already familiar to you. Either way, you end up with working code.

To **start from scratch**, move on to [Starting with Spring Initializr](#scratch).

To **skip the basics**, do the following:

-   [Download](https://github.com/spring-guides/gs-batch-processing/archive/main.zip) and unzip the source repository for this guide, or clone it using Git: `git clone [https://github.com/spring-guides/gs-batch-processing.git](https://github.com/spring-guides/gs-batch-processing.git)`
    
-   cd into `gs-batch-processing/initial`
    
-   Jump ahead to [Business Data](#initial).
    

**When you finish**, you can check your results against the code in `gs-batch-processing/complete`.

## Starting with Spring Initializr

You can use this [pre-initialized project](https://start.spring.io/#!type=maven-project&groupId=com.example&artifactId=batch-processing&name=batch-processing&description=Demo%20project%20for%20Spring%20Boot&packageName=com.example.batch-processing&dependencies=batch,hsql) and click Generate to download a ZIP file. This project is configured to fit the examples in this tutorial.

To manually initialize the project:

1.  Navigate to [https://start.spring.io](https://start.spring.io). This service pulls in all the dependencies you need for an application and does most of the setup for you.
    
2.  Choose either Gradle or Maven and the language you want to use. This guide assumes that you chose Java.
    
3.  Click **Dependencies** and select **Spring Batch** and **HyperSQL Database**.
    
4.  Click **Generate**.
    
5.  Download the resulting ZIP file, which is an archive of an application that is configured with your choices.
    

If your IDE has the Spring Initializr integration, you can complete this process from your IDE.

You can also fork the project from GitHub and open it in your IDE or other editor.

## Business Data

Typically, your customer or a business analyst supplies a spreadsheet. For this simple example, you can find some made-up data in `src/main/resources/sample-data.csv`:

```
CopyJill,Doe
Joe,Doe
Justin,Doe
Jane,Doe
John,Doe
```

This spreadsheet contains a first name and a last name on each row, separated by a comma. This is a fairly common pattern that Spring can handle without customization.

Next, you need to write an SQL script to create a table to store the data. You can find such a script in `src/main/resources/schema-all.sql`:

```
CopyDROP TABLE people IF EXISTS;

CREATE TABLE people  (
    person_id BIGINT IDENTITY NOT NULL PRIMARY KEY,
    first_name VARCHAR(20),
    last_name VARCHAR(20)
);
```

Spring Boot runs `schema-@@platform@@.sql` automatically during startup. `-all` is the default for all platforms.

## Create a Business Class

Now that you can see the format of data inputs and outputs, you can write code to represent a row of data, as the following example (from `src/main/java/com/example/batchprocessing/Person.java`) shows:

```
Copypackage com.example.batchprocessing;

public record Person(String firstName, String lastName) {

}
```

You can instantiate the `Person` record with first name and last name through the constructor.

## Create an Intermediate Processor

A common paradigm in batch processing is to ingest data, transform it, and then pipe it out somewhere else. Here, you need to write a simple transformer that converts the names to uppercase. The following listing (from `src/main/java/com/example/batchprocessing/PersonItemProcessor.java`) shows how to do so:

```
Copypackage com.example.batchprocessing;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.batch.infrastructure.item.ItemProcessor;

public class PersonItemProcessor implements ItemProcessor<Person, Person> {

  private static final Logger log = LoggerFactory.getLogger(PersonItemProcessor.class);

  @Override
  public Person process(final Person person) {
    final String firstName = person.firstName().toUpperCase();
    final String lastName = person.lastName().toUpperCase();

    final Person transformedPerson = new Person(firstName, lastName);

    log.info("Converting ({}) into ({})", person, transformedPerson);

    return transformedPerson;
  }

}
```

`PersonItemProcessor` implements Spring Batch’s `ItemProcessor` interface. This makes it easy to wire the code into a batch job that you will define later in this guide. According to the interface, you receive an incoming `Person` object, after which you transform it to an upper-cased `Person`.

The input and output types need not be the same. In fact, after one source of data is read, sometimes the application’s data flow needs a different data type.

## Put Together a Batch Job

Now you need to put together the actual batch job. Spring Batch provides many utility classes that reduce the need to write custom code. Instead, you can focus on the business logic.

To configure your job, you must first create a Spring `@Configuration` class like the following example in `src/main/java/com/example/batchprocessing/BatchConfiguration.java`. This example uses a memory-based database, meaning that, when it is done, the data is gone. Now add the following beans to your `BatchConfiguration` class to define a reader, a processor, and a writer:

```
Copy@Bean
public FlatFileItemReader<Person> reader() {
  return new FlatFileItemReaderBuilder<Person>()
    .name("personItemReader")
    .resource(new ClassPathResource("sample-data.csv"))
    .delimited()
    .names("firstName", "lastName")
    .targetType(Person.class)
    .build();
}

@Bean
public PersonItemProcessor processor() {
  return new PersonItemProcessor();
}

@Bean
public JdbcBatchItemWriter<Person> writer(DataSource dataSource) {
  return new JdbcBatchItemWriterBuilder<Person>()
    .sql("INSERT INTO people (first_name, last_name) VALUES (:firstName, :lastName)")
    .dataSource(dataSource)
    .beanMapped()
    .build();
}
```

The first chunk of code defines the input, processor, and output.

-   `reader()` creates an `ItemReader`. It looks for a file called `sample-data.csv` and parses each line item with enough information to turn it into a `Person`.
    
-   `processor()` creates an instance of the `PersonItemProcessor` that you defined earlier, meant to convert the data to upper case.
    
-   `writer(DataSource)` creates an `ItemWriter`. This one is aimed at a JDBC destination and automatically gets a `DataSource` created by Spring Boot. It includes the SQL statement needed to insert a single `Person`, driven by Java record components.
    

The last chunk (from `src/main/java/com/example/batchprocessing/BatchConfiguration.java`) shows the actual job configuration:

```
Copy@Bean
public Job importUserJob(JobRepository jobRepository, Step step1, JobCompletionNotificationListener listener) {
  return new JobBuilder(jobRepository)
    .listener(listener)
    .start(step1)
    .build();
}

@Bean
public Step step1(JobRepository jobRepository, DataSourceTransactionManager transactionManager,
          FlatFileItemReader<Person> reader, PersonItemProcessor processor, JdbcBatchItemWriter<Person> writer) {
  return new StepBuilder(jobRepository)
    .<Person, Person>chunk(3)
          .transactionManager(transactionManager)
    .reader(reader)
    .processor(processor)
    .writer(writer)
    .build();
}
```

The first method defines the job, and the second one defines a single step. Jobs are built from steps, where each step can involve a reader, a processor, and a writer.

You then list each step, (though this job has only one step). The job ends, and the Java API produces a perfectly configured job.

In the step definition, you define how much data to write at a time. In this case, it writes up to three records at a time. Next, you configure the reader, processor, and writer by using the beans injected earlier.

`chunk()` is prefixed `<Person,Person>` because it is a generic method. This represents the input and output types of each “chunk” of processing and lines up with `ItemReader<Person>` and `ItemWriter<Person>`.

The last bit of batch configuration is a way to get notified when the job completes. The following example (from `src/main/java/com/example/batchprocessing/JobCompletionNotificationListener.java`) shows such a class:

```
Copypackage com.example.batchprocessing;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.job.JobExecution;
import org.springframework.batch.core.listener.JobExecutionListener;
import org.springframework.jdbc.core.DataClassRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class JobCompletionNotificationListener implements JobExecutionListener {

  private static final Logger log = LoggerFactory.getLogger(JobCompletionNotificationListener.class);

  private final JdbcTemplate jdbcTemplate;

  public JobCompletionNotificationListener(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  @Override
  public void afterJob(JobExecution jobExecution) {
    if (jobExecution.getStatus() == BatchStatus.COMPLETED) {
      log.info("!!! JOB FINISHED! Time to verify the results");

      jdbcTemplate
          .query("SELECT first_name, last_name FROM people", new DataClassRowMapper<>(Person.class))
          .forEach(person -> log.info("Found <{}> in the database.", person));
    }
  }
}
```

The `JobCompletionNotificationListener` listens for when a job is `BatchStatus.COMPLETED` and then uses `JdbcTemplate` to inspect the results.

## Make the Application Executable

Although batch processing can be embedded in web apps and WAR files, the simpler approach demonstrated below creates a standalone application. You package everything in a single, executable JAR file, driven by a good old Java `main()` method.

The Spring Initializr created an application class for you. For this simple example, it works without further modification. The following listing (from `src/main/java/com/example/batchprocessing/BatchProcessingApplication.java`) shows the application class:

```
Copypackage com.example.batchprocessing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BatchProcessingApplication {

  public static void main(String[] args) {
    System.exit(SpringApplication.exit(SpringApplication.run(BatchProcessingApplication.class, args)));
  }
}
```

`@SpringBootApplication` is a convenience annotation that adds all of the following:

-   `@Configuration`: Tags the class as a source of bean definitions for the application context.
    
-   `@EnableAutoConfiguration`: Tells Spring Boot to start adding beans based on classpath settings, other beans, and various property settings. For example, if `spring-webmvc` is on the classpath, this annotation flags the application as a web application and activates key behaviors, such as setting up a `DispatcherServlet`.
    
-   `@ComponentScan`: Tells Spring to look for other components, configurations, and services in the `com/example` package, letting it find the controllers.
    

The `main()` method uses Spring Boot’s `SpringApplication.run()` method to launch an application. Did you notice that there was not a single line of XML? There is no `web.xml` file, either. This web application is 100% pure Java and you did not have to deal with configuring any plumbing or infrastructure.

Note that `SpringApplication.exit()` and `System.exit()` ensure that the JVM exits upon job completion. See the [Application Exit section in Spring Boot Reference documentation](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-application-exit) for more details.

For demonstration purposes, there is code to inject a `JdbcTemplate`, query the database, and print out the names of people the batch job inserts.

Note how the application does not use the `@EnableBatchProcessing` annotation. Previously, `@EnableBatchProcessing` could be used to enable Spring Boot’s auto-configuration of Spring Batch. A bean that is annotated with `@EnableBatchProcessing` or that extends Spring Batch’s `DefaultBatchConfiguration` can now be defined to tell the auto-configuration to back off, allowing the application to take complete control of how Spring Batch is configured.

### Build an executable JAR

You can run the application from the command line with Gradle or Maven. You can also build a single executable JAR file that contains all the necessary dependencies, classes, and resources and run that. Building an executable jar makes it easy to ship, version, and deploy the service as an application throughout the development lifecycle, across different environments, and so forth.

If you use Gradle, you can run the application by using `./gradlew bootRun`. Alternatively, you can build the JAR file by using `./gradlew build` and then run the JAR file, as follows:

java -jar build/libs/gs-batch-processing-0.0.1-SNAPSHOT.jar

If you use Maven, you can run the application by using `./mvnw spring-boot:run`. Alternatively, you can build the JAR file with `./mvnw clean package` and then run the JAR file, as follows:

java -jar target/gs-batch-processing-0.0.1-SNAPSHOT.jar

The job prints out a line for each person that gets transformed. After the job runs, you can also see the output from querying the database. It should resemble the following output:

```
CopyConverting (Person[firstName=Jill, lastName=Doe]) into (Person[firstName=JILL, lastName=DOE])
Converting (Person[firstName=Joe, lastName=Doe]) into (Person[firstName=JOE, lastName=DOE])
Converting (Person[firstName=Justin, lastName=Doe]) into (Person[firstName=JUSTIN, lastName=DOE])
Converting (Person[firstName=Jane, lastName=Doe]) into (Person[firstName=JANE, lastName=DOE])
Converting (Person[firstName=John, lastName=Doe]) into (Person[firstName=JOHN, lastName=DOE])
Found <Person[firstName=JILL, lastName=DOE]> in the database.
Found <Person[firstName=JOE, lastName=DOE]> in the database.
Found <Person[firstName=JUSTIN, lastName=DOE]> in the database.
Found <Person[firstName=JANE, lastName=DOE]> in the database.
Found <Person[firstName=JOHN, lastName=DOE]> in the database.
```

## Summary

Congratulations! You built a batch job that ingested data from a spreadsheet, processed it, and wrote it to a database.

## See also

The following guides may also be helpful:

-   [Building an Application with Spring Boot](https://spring.io/guides/gs/spring-boot/)
    
-   [Accessing Data with GemFire](https://spring.io/guides/gs/accessing-data-gemfire/)
    
-   [Accessing Data with JPA](https://spring.io/guides/gs/accessing-data-jpa/)
    
-   [Accessing Data with MongoDB](https://spring.io/guides/gs/accessing-data-mongodb/)
    
-   [Accessing data with MySQL](https://spring.io/guides/gs/accessing-data-mysql/)
    

Want to write a new guide or contribute to an existing one? Check out our [contribution guidelines](https://github.com/spring-guides/getting-started-guides/wiki).

All guides are released with an ASLv2 license for the code, and an [Attribution, NoDerivatives creative commons license](https://creativecommons.org/licenses/by-nd/3.0/) for the writing.

## Get the Code

[Go To Repo](https://github.com/spring-guides/gs-batch-processing)

## Projects

[Spring Batch](/projects/undefined)