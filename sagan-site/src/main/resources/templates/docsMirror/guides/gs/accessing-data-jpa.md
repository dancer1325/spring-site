---
title: Getting Started | Accessing Data with JPA
source: https://spring.io/guides/gs/accessing-data-jpa
scraped: 2026-02-19T07:58:32.883Z
description: Learn how to work with JPA data persistence using Spring Data JPA.
---

# Accessing Data with JPA

This guide walks you through the process of building an application that uses Spring Data JPA to store and retrieve data in a relational database.

## What You Will Build

You will build an application that stores `Customer` objects in a memory-based database.

## What You need

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

-   [Download](https://github.com/spring-guides/gs-accessing-data-jpa/archive/main.zip) and unzip the source repository for this guide, or clone it using Git: `git clone [https://github.com/spring-guides/gs-accessing-data-jpa.git](https://github.com/spring-guides/gs-accessing-data-jpa.git)`
    
-   cd into `gs-accessing-data-jpa/initial`
    
-   Jump ahead to [Define a Simple Entity](#initial).
    

**When you finish**, you can check your results against the code in `gs-accessing-data-jpa/complete`.

## Starting with Spring Initializr

You can use this [pre-initialized project](https://start.spring.io/#!type=gradle-project&language=java&jvmVersion=17&packaging=jar&groupId=com.example&artifactId=accessing-data-jpa&packageName=com.example.accessingdatajpa&dependencies=data-jpa,h2) and click Generate to download a ZIP file. This project is configured to fit the examples in this tutorial.

To manually initialize the project:

1.  Navigate to [https://start.spring.io](https://start.spring.io). This service pulls in all the dependencies you need for an application and does most of the setup for you.
    
2.  Choose either Gradle or Maven and the language you want to use.
    
3.  Type "accessing-data-jpa" in the "Artifact" form field.
    
4.  Click **Dependencies** and select **Spring Data JPA** and then **H2 Database**.
    
5.  Click **Generate**.
    
6.  Download the resulting ZIP file, which is an archive of a web application that is configured with your choices.
    

If your IDE has the Spring Initializr integration, you can complete this process from your IDE.

You can also fork the project from GitHub and open it in your IDE or other editor.

## Define a Simple Entity

In this example, you store `Customer` objects, each annotated as a JPA entity. The following listing shows the Customer class:

Java

Kotlin

```
Copypackage com.example.accessingdatajpa;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Customer {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private String firstName;
    private String lastName;

    protected Customer() {}

    public Customer(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    @Override
    public String toString() {
        return String.format(
                "Customer[id=%d, firstName='%s', lastName='%s']",
                id, firstName, lastName);
    }

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }
}
```

```
Copypackage com.example.accessingdatajpa

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id

@Entity
class Customer(
    var firstName: String = "",
    var lastName: String = ""
) {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long? = null

    override fun toString(): String =
        "Customer[id=$id, firstName='$firstName', lastName='$lastName']"
}
```

Here you have a `Customer` class with three attributes: `id`, `firstName`, and `lastName`. You also have two constructors. The default constructor exists only for the sake of JPA. You do not use it directly, so it is designated as `protected`. The other constructor is the one you use to create instances of `Customer` to be saved to the database.

The `Customer` class is annotated with `@Entity`, indicating that it is a JPA entity. (Because no `@Table` annotation exists, it is assumed that this entity is mapped to a table named `Customer`.)

The `Customer` object’s `id` property is annotated with `@Id` so that JPA recognizes it as the object’s ID. The `id` property is also annotated with `@GeneratedValue` to indicate that the ID should be generated automatically.

The other two properties, `firstName` and `lastName`, are left unannotated. It is assumed that they are mapped to columns that share the same names as the properties themselves.

The convenient `toString()` method prints out the customer’s properties.

## Create Simple Queries

Spring Data JPA focuses on using JPA to store data in a relational database. Its most compelling feature is the ability to create repository implementations automatically, at runtime, from a repository interface.

To see how this works, create a repository interface that works with `Customer` entities as the following listing shows:

Java

Kotlin

```
Copypackage com.example.accessingdatajpa;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface CustomerRepository extends CrudRepository<Customer, Long> {

    List<Customer> findByLastName(String lastName);

    Customer findById(long id);
}
```

```
Copypackage com.example.accessingdatajpa

import org.springframework.data.repository.CrudRepository

interface CustomerRepository : CrudRepository<Customer, Long> {
    fun findByLastName(lastName: String): List<Customer>
}
```

`CustomerRepository` extends the `CrudRepository` interface. The type of entity and ID that it works with, `Customer` and `Long`, are specified in the generic parameters on `CrudRepository`. By extending `CrudRepository`, `CustomerRepository` inherits several methods for working with `Customer` persistence, including methods for saving, deleting, and finding `Customer` entities.

Spring Data JPA also lets you define other query methods by declaring their method signature. For example, `CustomerRepository` includes the `findByLastName()` method.

In a typical Java application, you might expect to write a class that implements `CustomerRepository`. However, that is what makes Spring Data JPA so powerful: You need not write an implementation of the repository interface. Spring Data JPA creates an implementation when you run the application.

Now you can wire up this example and see what it looks like!

## Create an Application Class

Spring Initializr creates a simple class for the application. The following listing shows the class that Initializr created for this example:

Java

Kotlin

```
Copypackage com.example.accessingdatajpa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AccessingDataJpaApplication {

    public static void main(String[] args) {
        SpringApplication.run(AccessingDataJpaApplication.class, args);
    }

}
```

```
Copypackage com.example.accessingdatajpa

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class AccessingDataJpaApplication

fun main(args: Array<String>) {
    runApplication<AccessingDataJpaApplication>(*args)
}
```

`@SpringBootApplication` is a convenience annotation that adds all of the following:

-   `@Configuration`: Tags the class as a source of bean definitions for the application context.
    
-   `@EnableAutoConfiguration`: Tells Spring Boot to start adding beans based on classpath settings, other beans, and various property settings. For example, if `spring-webmvc` is on the classpath, this annotation flags the application as a web application and activates key behaviors, such as setting up a `DispatcherServlet`.
    
-   `@ComponentScan`: Tells Spring to look for other components, configurations, and services in the `com/example` package, letting it find the controllers.
    

The `main()` method uses Spring Boot’s `SpringApplication.run()` method to launch an application. Did you notice that there was not a single line of XML? There is no `web.xml` file, either. This web application is 100% pure Java and you did not have to deal with configuring any plumbing or infrastructure.

Now you need to modify the simple class that the Initializr created for you. To get output (to the console, in this example), you need to set up a logger. Then you need to set up some data and use it to generate output. The following listing shows the finished `AccessingDataJpaApplication` class:

Java

Kotlin

```
Copypackage com.example.accessingdatajpa;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class AccessingDataJpaApplication {

    private static final Logger logger = LoggerFactory.getLogger(AccessingDataJpaApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(AccessingDataJpaApplication.class, args);
    }

    @Bean
    public CommandLineRunner demo(CustomerRepository repository) {
        return (args) -> {
            // save a few customers
            repository.save(new Customer("Jack", "Bauer"));
            repository.save(new Customer("Chloe", "O'Brian"));
            repository.save(new Customer("Kim", "Bauer"));
            repository.save(new Customer("David", "Palmer"));
            repository.save(new Customer("Michelle", "Dessler"));

            // fetch all customers
            logger.info("Customers found with findAll():");
            logger.info("-------------------------------");
            repository.findAll().forEach(customer -> {
                logger.info(customer.toString());
            });
            logger.info("");

            // fetch an individual customer by ID
            Customer customer = repository.findById(1L);
            logger.info("Customer found with findById(1L):");
            logger.info("--------------------------------");
            logger.info(customer.toString());
            logger.info("");

            // fetch customers by last name
            logger.info("Customer found with findByLastName('Bauer'):");
            logger.info("--------------------------------------------");
            repository.findByLastName("Bauer").forEach(bauer -> {
                logger.info(bauer.toString());
            });
            logger.info("");
        };
    }

}
```

```
Copypackage com.example.accessingdatajpa

import org.slf4j.LoggerFactory
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean

private val logger = LoggerFactory.getLogger(AccessingDataJpaApplication::class.java)

@SpringBootApplication
class AccessingDataJpaApplication {

    @Bean
    fun demo(repository: CustomerRepository) = CommandLineRunner {
        // save a few customers
        repository.saveAll(
            listOf(
                Customer("Jack", "Bauer"),
                Customer("Chloe", "O'Brian"),
                Customer("Kim", "Bauer"),
                Customer("David", "Palmer"),
                Customer("Michelle", "Dessler")
            )
        )

        // fetch all customers
        logger.info("Customers found with findAll():")
        logger.info("-------------------------------")
        repository.findAll().forEach { customer ->
            logger.info(customer.toString())
        }
        logger.info("")

        // fetch an individual customer by ID
        val customer = repository.findById(1L).orElseThrow()
        logger.info("Customer found with findById(1L):")
        logger.info("--------------------------------")
        logger.info(customer.toString())
        logger.info("")

        // fetch customers by last name
        logger.info("Customer found with findByLastName('Bauer'):")
        logger.info("--------------------------------------------")
        repository.findByLastName("Bauer").forEach { bauer ->
            logger.info(bauer.toString())
        }
        logger.info("")
    }
}

fun main(args: Array<String>) {
    runApplication<AccessingDataJpaApplication>(*args)
}
```

The `AccessingDataJpaApplication` class includes a `demo()` method that puts the `CustomerRepository` through a few tests. First, it fetches the `CustomerRepository` from the Spring application context. Then it saves a handful of `Customer` objects, demonstrating the `save()` method and setting up some data to work with. Next, it calls `findAll()` to fetch all `Customer` objects from the database. Then it calls `findById()` to fetch a single `Customer` by its ID. Finally, it calls `findByLastName()` to find all customers whose last name is "Bauer". The `demo()` method returns a `CommandLineRunner` bean that automatically runs the code when the application launches.

By default, Spring Boot enables JPA repository support and looks in the package (and its subpackages) where `@SpringBootApplication` is located. If your configuration has JPA repository interface definitions located in a package that is not visible, you can point out alternate packages by using `@EnableJpaRepositories` and its type-safe `basePackageClasses=MyRepository.class` parameter.

## Build an executable JAR

You can run the application from the command line with Gradle or Maven. You can also build a single executable JAR file that contains all the necessary dependencies, classes, and resources and run that. Building an executable jar makes it easy to ship, version, and deploy the service as an application throughout the development lifecycle, across different environments, and so forth.

If you use Gradle, you can run the application by using `./gradlew bootRun`. Alternatively, you can build the JAR file by using `./gradlew build` and then run the JAR file, as follows:

java -jar build/libs/gs-accessing-data-jpa-0.0.1-SNAPSHOT.jar

If you use Maven, you can run the application by using `./mvnw spring-boot:run`. Alternatively, you can build the JAR file with `./mvnw clean package` and then run the JAR file, as follows:

java -jar target/gs-accessing-data-jpa-0.0.1-SNAPSHOT.jar

When you run your application, you should see output similar to the following:

Customers found with findAll():
Customer\[id=1, firstName='Jack', lastName='Bauer'\]
Customer\[id=2, firstName='Chloe', lastName='O'Brian'\]
Customer\[id=3, firstName='Kim', lastName='Bauer'\]
Customer\[id=4, firstName='David', lastName='Palmer'\]
Customer\[id=5, firstName='Michelle', lastName='Dessler'\]

Customer found with findById(1L):
Customer\[id=1, firstName='Jack', lastName='Bauer'\]

Customer found with findByLastName('Bauer'):
Customer\[id=1, firstName='Jack', lastName='Bauer'\]
Customer\[id=3, firstName='Kim', lastName='Bauer'\]

## Summary

Congratulations! You have written a simple application that uses Spring Data JPA to save objects to and fetch them from a database, all without writing a concrete repository implementation.

If you want to expose JPA repositories with a hypermedia-based RESTful front end with little effort, you might want to read [Accessing JPA Data with REST](/guides/gs/accessing-data-rest).

## See Also

The following guides may also be helpful:

-   [Accessing JPA Data with REST](https://spring.io/guides/gs/accessing-data-rest/)
    
-   [Accessing Data with Gemfire](https://spring.io/guides/gs/accessing-data-gemfire/)
    
-   [Accessing Data with MongoDB](https://spring.io/guides/gs/accessing-data-mongodb/)
    
-   [Accessing data with MySQL](https://spring.io/guides/gs/accessing-data-mysql/)
    
-   [Accessing Data with Neo4j](https://spring.io/guides/gs/accessing-data-neo4j/)
    

Want to write a new guide or contribute to an existing one? Check out our [contribution guidelines](https://github.com/spring-guides/getting-started-guides/wiki).

All guides are released with an ASLv2 license for the code, and an [Attribution, NoDerivatives creative commons license](https://creativecommons.org/licenses/by-nd/3.0/) for the writing.

## Get the Code

[Go To Repo](https://github.com/spring-guides/gs-accessing-data-jpa)

FREE

## Work in the Cloud

Complete this guide in the cloud on Spring Academy.

[Go To Spring Academy](https://spring.academy/guides/accessing-data-jpa)

## Projects

[Spring Data JPA](/projects/undefined)