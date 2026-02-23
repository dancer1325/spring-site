---
title: Getting Started | Managing Transactions
source: https://spring.io/guides/gs/managing-transactions
scraped: 2026-02-19T07:58:14.704Z
description: Learn how to wrap key parts of code with transactions.
---

# Managing Transactions

This guide walks you through the process of wrapping database operations with non-intrusive transactions.

## What You Will Build

You will build a simple JDBC application wherein you make database operations transactional without having to write [specialized JDBC code](https://docs.oracle.com/javase/tutorial/jdbc/basics/transactions.html#commit_transactions).

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

-   [Download](https://github.com/spring-guides/gs-managing-transactions/archive/main.zip) and unzip the source repository for this guide, or clone it using Git: `git clone [https://github.com/spring-guides/gs-managing-transactions.git](https://github.com/spring-guides/gs-managing-transactions.git)`
    
-   cd into `gs-managing-transactions/initial`
    
-   Jump ahead to [Create a Booking Service](#initial).
    

**When you finish**, you can check your results against the code in `gs-managing-transactions/complete`.

## Starting with Spring Initializr

You can use this [pre-initialized project](https://start.spring.io/#!type=gradle-project&language=java&jvmVersion=17&groupId=com.example&artifactId=managing-transactions&packageName=com.example.managingtransactions&dependencies=data-jdbc,h2) and click Generate to download a ZIP file. This project is configured to fit the examples in this tutorial.

To manually initialize the project:

1.  Navigate to [https://start.spring.io](https://start.spring.io). This service pulls in all the dependencies you need for an application and does most of the setup for you.
    
2.  Choose either Gradle or Maven and the language you want to use.
    
3.  Type "managing-transactions" in the "Artifact" form field.
    
4.  Click **Dependencies** and select **Spring Data JDBC** and **H2 Database**.
    
5.  Click **Generate**.
    
6.  Download the resulting ZIP file, which is an archive of a web application that is configured with your choices.
    

If your IDE has the Spring Initializr integration, you can complete this process from your IDE.

You can also fork the project from GitHub and open it in your IDE or other editor.

## Create a Booking Service

First, you need to use the `BookingService` class to create a JDBC-based service that books people into the system by name. The following listing shows how to do so:

Java

Kotlin

```
Copypackage com.example.managingtransactions;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class BookingService {

	private final static Logger logger = LoggerFactory.getLogger(BookingService.class);

	private final JdbcTemplate jdbcTemplate;

	public BookingService(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	@Transactional
	public void book(String... persons) {
		for (String person : persons) {
			logger.info("Booking {} in a seat...", person);
			jdbcTemplate.update("insert into BOOKINGS(FIRST_NAME) values (?)", person);
		}
	}

	public List<String> findAllBookings() {
		return jdbcTemplate.query("select FIRST_NAME from BOOKINGS",
				(rs, rowNum) -> rs.getString("FIRST_NAME"));
	}

}
```

```
Copypackage com.example.managingtransactions

import org.slf4j.LoggerFactory
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional

private val logger = LoggerFactory.getLogger(BookingService::class.java)

@Component
class BookingService(private val jdbcTemplate: JdbcTemplate) {

    @Transactional
    fun book(vararg persons: String?) {
        persons.forEach { person ->
            logger.info("Booking {} in a seat...", person)
            jdbcTemplate.update("insert into BOOKINGS(FIRST_NAME) values (?)", person)
        }
    }

    fun findAllBookings(): List<String> =
        jdbcTemplate.query("select FIRST_NAME from BOOKINGS") { rs, _ ->
            rs.getString("FIRST_NAME")
        }
}
```

The code has an autowired `JdbcTemplate`, a handy template class that does all the database interactions needed by the remaining code.

You also have a `book` method that can book multiple people. It loops through the list of people and, for each person, inserts that person into the `BOOKINGS` table by using the `JdbcTemplate`. This method is tagged with `@Transactional`, meaning that any failure causes the entire operation to roll back to its previous state and to re-throw the original exception. This means that none of the people are added to `BOOKINGS` if one person fails to be added.

You also have a `findAllBookings` method to query the database. Each row fetched from the database is converted into a `String`, and all the rows are assembled into a `List`.

## Build an Application

The Spring Initializr provides an application class. In this case, you need not modify this application class. The following listing shows the application class:

Java

Kotlin

```
Copypackage com.example.managingtransactions;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ManagingTransactionsApplication {

	public static void main(String[] args) {
		SpringApplication.run(ManagingTransactionsApplication.class, args);
	}

}
```

```
Copypackage com.example.managingtransactions

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class ManagingTransactionsApplication

fun main(args: Array<String>) {
    runApplication<ManagingTransactionsApplication>(*args)
}
```

`@SpringBootApplication` is a convenience annotation that adds all of the following:

-   `@Configuration`: Tags the class as a source of bean definitions for the application context.
    
-   `@EnableAutoConfiguration`: Tells Spring Boot to start adding beans based on classpath settings, other beans, and various property settings. For example, if `spring-webmvc` is on the classpath, this annotation flags the application as a web application and activates key behaviors, such as setting up a `DispatcherServlet`.
    
-   `@ComponentScan`: Tells Spring to look for other components, configurations, and services in the `com/example` package, letting it find the controllers.
    

The `main()` method uses Spring Boot’s `SpringApplication.run()` method to launch an application. Did you notice that there was not a single line of XML? There is no `web.xml` file, either. This web application is 100% pure Java and you did not have to deal with configuring any plumbing or infrastructure.

Your application actually has zero configuration. Spring Boot detects `spring-jdbc` and `h2` on the classpath and automatically creates a `DataSource` and a `JdbcTemplate` for you. Because this infrastructure is now available and you have no dedicated configuration, a `DataSourceTransactionManager` is also created for you. This is the component that intercepts the method annotated with `@Transactional` (for example, the `book` method on `BookingService`). The `BookingService` is detected by classpath scanning.

Another Spring Boot feature demonstrated in this guide is [the ability to initialize the schema on startup](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#howto-initialize-a-database-using-spring-jdbc). The following file (from src/main/resources/schema.sql) defines the database schema:

```
Copydrop table BOOKINGS if exists;
create table BOOKINGS(ID serial, FIRST_NAME varchar(5) NOT NULL);
```

There is also a [`CommandLineRunner`](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-command-line-runner) that injects the `BookingService` and showcases various transactional use cases. The following listing shows the command line runner:

Java

Kotlin

```
Copypackage com.example.managingtransactions;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

@Component
class AppRunner implements CommandLineRunner {

	private final static Logger logger = LoggerFactory.getLogger(AppRunner.class);

	private final BookingService bookingService;

	public AppRunner(BookingService bookingService) {
		this.bookingService = bookingService;
	}

	@Override
	public void run(String... args) throws Exception {
		bookingService.book("Alice", "Bob", "Carol");
		Assert.isTrue(bookingService.findAllBookings().size() == 3,
				"First booking should work with no problem");
		logger.info("Alice, Bob and Carol have been booked");

		try {
			bookingService.book("Chris", "Samuel");
		} catch (RuntimeException e) {
			logger.info("v--- The following exception is expect because 'Samuel' is too " +
					"big for the DB ---v");
			logger.error(e.getMessage());
		}

		logCurrentBookings();
		logger.info("You shouldn't see Chris or Samuel. Samuel violated DB constraints, " +
				"and Chris was rolled back in the same TX");
		Assert.isTrue(bookingService.findAllBookings().size() == 3,
				"'Samuel' should have triggered a rollback");

		try {
			bookingService.book("Buddy", null);
		} catch (RuntimeException e) {
			logger.info("v--- The following exception is expect because null is not " +
					"valid for the DB ---v");
			logger.error(e.getMessage());
		}

		logCurrentBookings();
		logger.info("You shouldn't see Buddy or null. null violated DB constraints, and " +
				"Buddy was rolled back in the same TX");
		Assert.isTrue(bookingService.findAllBookings().size() == 3,
				"'null' should have triggered a rollback");
	}

	private void logCurrentBookings() {
		for (String person : bookingService.findAllBookings()) {
            logger.info("So far, {} is booked.", person);
		}
	}
}
```

```
Copypackage com.example.managingtransactions

import org.slf4j.LoggerFactory
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component
import org.springframework.util.Assert

private val logger = LoggerFactory.getLogger(AppRunner::class.java)

@Component
class AppRunner(private val bookingService: BookingService) : CommandLineRunner {

    override fun run(vararg args: String) {
        bookingService.book("Alice", "Bob", "Carol")
        Assert.isTrue(bookingService.findAllBookings().size == 3,
            "First booking should work with no problem")
        logger.info("Alice, Bob and Carol have been booked")

        try {
            bookingService.book("Chris", "Samuel")
        } catch (e: RuntimeException) {
            logger.info("v--- The following exception is expect because 'Samuel' is too big for the DB ---v")
            logger.error(e.message)
        }

        logCurrentBookings()
        logger.info("You shouldn't see Chris or Samuel. Samuel violated DB constraints, and Chris was rolled back in the same TX")
        Assert.isTrue(bookingService.findAllBookings().size == 3,
            "'Samuel' should have triggered a rollback")

        try {
            bookingService.book("Buddy", null)
        } catch (e: RuntimeException) {
            logger.info("v--- The following exception is expect because null is not valid for the DB ---v")
            logger.error(e.message)
        }

        logCurrentBookings()
        logger.info("You shouldn't see Buddy or null. null violated DB constraints, and Buddy was rolled back in the same TX")
        Assert.isTrue(bookingService.findAllBookings().size == 3,
            "'null' should have triggered a rollback")
    }

    private fun logCurrentBookings() {
        bookingService.findAllBookings().forEach { person ->
            logger.info("So far, {} is booked.", person)
        }
    }
}
```

You can run the application from the command line with Gradle or Maven. You can also build a single executable JAR file that contains all the necessary dependencies, classes, and resources and run that. Building an executable jar makes it easy to ship, version, and deploy the service as an application throughout the development lifecycle, across different environments, and so forth.

If you use Gradle, you can run the application by using `./gradlew bootRun`. Alternatively, you can build the JAR file by using `./gradlew build` and then run the JAR file, as follows:

java -jar build/libs/gs-managing-transactions-0.0.1-SNAPSHOT.jar

If you use Maven, you can run the application by using `./mvnw spring-boot:run`. Alternatively, you can build the JAR file with `./mvnw clean package` and then run the JAR file, as follows:

java -jar target/gs-managing-transactions-0.0.1-SNAPSHOT.jar

You should see the following output:

```
Copy2019-09-19 14:05:25.111  INFO 51911 --- [           main] c.e.m.ManagingTransactionsApplication    : Starting ManagingTransactionsApplication on Jays-MBP with PID 51911 (/Users/j/projects/guides/gs-managing-transactions/complete/target/classes started by j in /Users/j/projects/guides/gs-managing-transactions/complete)
2019-09-19 14:05:25.114  INFO 51911 --- [           main] c.e.m.ManagingTransactionsApplication    : No active profile set, falling back to default profiles: default
2019-09-19 14:05:25.421  INFO 51911 --- [           main] .s.d.r.c.RepositoryConfigurationDelegate : Bootstrapping Spring Data repositories in DEFAULT mode.
2019-09-19 14:05:25.438  INFO 51911 --- [           main] .s.d.r.c.RepositoryConfigurationDelegate : Finished Spring Data repository scanning in 13ms. Found 0 repository interfaces.
2019-09-19 14:05:25.678  INFO 51911 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Starting...
2019-09-19 14:05:25.833  INFO 51911 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Start completed.
2019-09-19 14:05:26.158  INFO 51911 --- [           main] c.e.m.ManagingTransactionsApplication    : Started ManagingTransactionsApplication in 1.303 seconds (JVM running for 3.544)
2019-09-19 14:05:26.170  INFO 51911 --- [           main] c.e.managingtransactions.BookingService  : Booking Alice in a seat...
2019-09-19 14:05:26.181  INFO 51911 --- [           main] c.e.managingtransactions.BookingService  : Booking Bob in a seat...
2019-09-19 14:05:26.181  INFO 51911 --- [           main] c.e.managingtransactions.BookingService  : Booking Carol in a seat...
2019-09-19 14:05:26.195  INFO 51911 --- [           main] c.e.managingtransactions.AppRunner       : Alice, Bob and Carol have been booked
2019-09-19 14:05:26.196  INFO 51911 --- [           main] c.e.managingtransactions.BookingService  : Booking Chris in a seat...
2019-09-19 14:05:26.196  INFO 51911 --- [           main] c.e.managingtransactions.BookingService  : Booking Samuel in a seat...
2019-09-19 14:05:26.271  INFO 51911 --- [           main] c.e.managingtransactions.AppRunner       : v--- The following exception is expect because 'Samuel' is too big for the DB ---v
2019-09-19 14:05:26.271 ERROR 51911 --- [           main] c.e.managingtransactions.AppRunner       : PreparedStatementCallback; SQL [insert into BOOKINGS(FIRST_NAME) values (?)]; Value too long for column """FIRST_NAME"" VARCHAR(5) NOT NULL": "'Samuel' (6)"; SQL statement:
insert into BOOKINGS(FIRST_NAME) values (?) [22001-199]; nested exception is org.h2.jdbc.JdbcSQLDataException: Value too long for column """FIRST_NAME"" VARCHAR(5) NOT NULL": "'Samuel' (6)"; SQL statement:
insert into BOOKINGS(FIRST_NAME) values (?) [22001-199]
2019-09-19 14:05:26.271  INFO 51911 --- [           main] c.e.managingtransactions.AppRunner       : So far, Alice is booked.
2019-09-19 14:05:26.271  INFO 51911 --- [           main] c.e.managingtransactions.AppRunner       : So far, Bob is booked.
2019-09-19 14:05:26.271  INFO 51911 --- [           main] c.e.managingtransactions.AppRunner       : So far, Carol is booked.
2019-09-19 14:05:26.271  INFO 51911 --- [           main] c.e.managingtransactions.AppRunner       : You shouldn't see Chris or Samuel. Samuel violated DB constraints, and Chris was rolled back in the same TX
2019-09-19 14:05:26.272  INFO 51911 --- [           main] c.e.managingtransactions.BookingService  : Booking Buddy in a seat...
2019-09-19 14:05:26.272  INFO 51911 --- [           main] c.e.managingtransactions.BookingService  : Booking null in a seat...
2019-09-19 14:05:26.273  INFO 51911 --- [           main] c.e.managingtransactions.AppRunner       : v--- The following exception is expect because null is not valid for the DB ---v
2019-09-19 14:05:26.273 ERROR 51911 --- [           main] c.e.managingtransactions.AppRunner       : PreparedStatementCallback; SQL [insert into BOOKINGS(FIRST_NAME) values (?)]; NULL not allowed for column "FIRST_NAME"; SQL statement:
insert into BOOKINGS(FIRST_NAME) values (?) [23502-199]; nested exception is org.h2.jdbc.JdbcSQLIntegrityConstraintViolationException: NULL not allowed for column "FIRST_NAME"; SQL statement:
insert into BOOKINGS(FIRST_NAME) values (?) [23502-199]
2019-09-19 14:05:26.273  INFO 51911 --- [           main] c.e.managingtransactions.AppRunner       : So far, Alice is booked.
2019-09-19 14:05:26.273  INFO 51911 --- [           main] c.e.managingtransactions.AppRunner       : So far, Bob is booked.
2019-09-19 14:05:26.273  INFO 51911 --- [           main] c.e.managingtransactions.AppRunner       : So far, Carol is booked.
2019-09-19 14:05:26.273  INFO 51911 --- [           main] c.e.managingtransactions.AppRunner       : You shouldn't see Buddy or null. null violated DB constraints, and Buddy was rolled back in the same TX
```

The `BOOKINGS` table has two constraints on the `first_name` column:

-   Names cannot be longer than five characters.
    
-   Names cannot be null.
    

The first three names inserted are `Alice`, `Bob`, and `Carol`. The application asserts that three people were added to that table. If that had not worked, the application would have exited early.

Next, another booking is done for `Chris` and `Samuel`. Samuel’s name is deliberately too long, forcing an insert error. Transactional behavior stipulates that both `Chris` and `Samuel` (that is, all the values in this transaction) should be rolled back. Thus, there should still be only three people in that table, which the assertion demonstrates.

Finally, `Buddy` and `null` are booked. As the output shows, `null` causes a rollback as well, leaving the same three people booked.

## Summary

Congratulations! You have just used Spring to develop a simple JDBC application wrapped with non-intrusive transactions.

## See Also

The following guides may also be helpful:

-   [Building an Application with Spring Boot](https://spring.io/guides/gs/spring-boot/)
    
-   [Accessing Data with JPA](https://spring.io/guides/gs/accessing-data-jpa/)
    
-   [Accessing Data with MongoDB](https://spring.io/guides/gs/accessing-data-mongodb/)
    
-   [Accessing data with MySQL](https://spring.io/guides/gs/accessing-data-mysql/)
    

Want to write a new guide or contribute to an existing one? Check out our [contribution guidelines](https://github.com/spring-guides/getting-started-guides/wiki).

All guides are released with an ASLv2 license for the code, and an [Attribution, NoDerivatives creative commons license](https://creativecommons.org/licenses/by-nd/3.0/) for the writing.

## Get the Code

[Go To Repo](https://github.com/spring-guides/gs-managing-transactions)