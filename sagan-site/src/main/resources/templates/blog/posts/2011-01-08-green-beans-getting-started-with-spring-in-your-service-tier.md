---
title: Green Beans: Getting Started with Spring in your Service Tier
source: https://spring.io/blog/2011/01/08/green-beans-getting-started-with-spring-in-your-service-tier
scraped: 2026-02-24T08:49:19.439Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  January 08, 2011 | 0 Comments
---

# Green Beans: Getting Started with Spring in your Service Tier

_Engineering | Josh Long |  January 08, 2011 | 0 Comments_

All applications stem from a domain model. The term "domain model" describes the nouns, or data, in a system that is important to the problem you're trying to solve. The service tier - where business logic lives - manipulates the application data and must ultimately persist it (typically, in a database). The explanation is simple, but in practice building a good service tier can be a daunting task for any developer. This post will introduce developers to the options available in the Spring framework for building a better service tier. It is assumed that the reader has some experience with the SQL language, and - more critically - that the reader is familiar with [basic Spring dependency injection and configuration concepts](http://blog.springsource.com/2010/11/09/green-beans-putting-the-spring-in-your-step-and-application/). The source code for this project is in the [Spring Samples](http://git.springsource.org/spring-samples/spring-samples/trees/master/showcases/green-beans/building-a-better-service-tier) project under SpringSource's Git repository.

## Nouns and Verbs

The service tier describes the verbs (actions) in a system. The domain model describes the nouns (data). Tools like Grails and Spring Roo can automatically infer and generate business objects by looking at a domain model. This approach is called model-driven development, and can be a great aid for highly interactive application development. Understanding the building blocks will ultimately help you be all the more productive with tools like Spring Roo. In this post we will build a service to handle customer data conforming to the following rules:

1.  a person is only a customer if he or she has purchased something from a business.
2.  a person's purchases are called purchases, which have line items.
3.  line items are a record of a purchased product for a given order.

This sort of data - linked data with shallow record counts - is a natural fit for a relational database management system (often called an RDBMS). A RDBMS works by mapping a domain model to tables. The tables for our service are visualized below:

![ERD diagram fro the CRM system in the Green Beans post on building a better service tier](http://blog.springsource.com/wp-content/uploads/2011/01/erd.jpg "ERD diagram fro the CRM system in the Green Beans post on building a better service tier")

## Setting up a Database

Our implementation will store all data in a RDBMS called H2. You are of course free to follow along in whatever database you like. This post will use a few, simple database tables for our examples. The H2 Data Definition Language (DDL) script for these tables is available in the source code ([`src/main/resources/crm.sql`](http://git.springsource.org/spring-samples/spring-samples/blobs/master/showcases/green-beans/building-a-better-service-tier/src/main/resources/crm.sql)). The DDL is simple, and can be made to work in most databases with trivial adjustments. If you'd like to use H2, then follow these instructions to set it up if you haven't already. Otherwise, feel free to skip ahead to the next section, "The Domain Model." H2 is a lightweight, embedded in-memory SQL database that can be setup and run quickly. To get started, download the latest distribution from the [H2 homepage](http://www.h2database.com). Choose which ever distribution (Windows, or "All Platforms") you like, though for the purposes of this article we'll go with the "All Platforms" distribution. Unzip the distribution in a folder of your liking. On the command line, navigate to the bin folder in the distribution and run the shell script appropriate to your platform (h2.bat for Windows, or h2.sh for Unix or Linux environments) to start the database process and launch a shell you can use to interact with the database. Enter the following for the "JDBC URL:" field: `jdbc:h2:tcp://127.0.0.1/~/crm_example` (without the quotes), leave the rest unchanged, and click on the "Connect" button. Bring up the database console by opening the URL `http://localhost:8082/login.jsp` in a browser. H2 can be embedded (as opposed to run as a server, as we are here), but using it as a server as we have here provides a richer experience. Once you've logged in, you will be able to try out queries in the H2 console.

## The Domain Model

Code to describe your domain model should be as free of persistence concerns as possible. Ideally, you'll be able to describe your domain model in clean, object-oriented terms. The code for our domain model is:

```java
Copy
package org.springsource.examples.crm.model;
…
public class Customer implements java.io.Serializable {
    private Long id;
    private String firstName;
    private String lastName;
    private Set purchases = new HashSet();
    // constructors, and accessor / mutator pairs omitted for brevity
}
```

Customer entities have references to `Purchase`s, which are defined as:

```java
Copypackage org.springsource.examples.crm.model;
…
public class Purchase implements java.io.Serializable {
    private Long id;
    private Customer customer;
    private double total;
    private Set lineItems = new HashSet();
    // constructors, and accessor / mutator pairs omitted for brevity
}
```

A Purchase in turn has a reference to a collection of `LineItems`, which are defined as:

```java
Copypackage org.springsource.examples.crm.model;
…
public class LineItem implements java.io.Serializable {
    private Long id;
    private Purchase purchase;
    private Product product;
    // constructors, and accessor / mutator pairs omitted for brevity
}
```

Finally, a `LineItem` references a `Product`. A `Product` is a definition of something in the inventory, defined as follows:

```java
Copypackage org.springsource.examples.crm.model;
…
public class Product implements java.io.Serializable {
    private Long id;
    private String description;
    private String name;
    private double price;
    private Set lineItems = new HashSet();
    // constructors, and accessor / mutator pairs omitted for brevity
}
```

## Building a Customer Repository

So, our first priority is to build a repository object to persist a `Customer` record. We will ignore, for now, the other entities in the domain model. A repositoiry should insulate users from the raw APIs used to handle persistence. Inputs and outputs should be domain model objects, not lower-level persistence primitives. Let's look at the interface for our `Customer` repository.

```java
Copypackage org.springsource.examples.crm.services.jdbc.repositories;
import org.springsource.examples.crm.model.Customer;

public interface CustomerRepository {
  Customer saveCustomer(Customer customer) ;
  Customer getCustomerById(long id);
}
```

We will use JDBC to build our repository. JDBC (the Java Database Connectivity API) is the standard database connectivity framework provided as part of the Java platform. Its use is well documented, and all major vendors provide connectivity for their database as a JDBC driver. This would seem to make JDBC a natural place to start to build repositories. In practice, however, a straight JDBC implementation can be tedious.

```java
Copypackage org.springsource.examples.crm.services;
import org.springsource.examples.crm.model.Customer;

public interface CustomerService {
    Customer getCustomerById(long id);
    Customer createCustomer(String fn, String ln);
}
```

Because straight JDBC use can be very tedious, we won't explore it too much further. You are encouraged to check the source code for this article where in we have built a straight JDBC repository that requires a dizzying 150+ lines of code to handle the things we're about to introduce, including thread safety and resource acquisition and destruction.

Instead, let's introduce a Spring framework class called the `JdbcTemplate` that greatly simplifies JDBC-based development.

To get started, we have setup a standard Spring XML file which in turn sets up class path component scanning and introduces property placeholder resolution for properties in the file `database.properties`. We won't reprint the XML here as its already in the source code (the example XML files for this post are under [`src/main/resources`](http://git.springsource.org/spring-samples/spring-samples/trees/master/showcases/green-beans/building-a-better-service-tier/src/main/resources)) and represents a very basic Spring configuration. The Spring classpath component scanning in turn picks up the Java configuration classes, which is what we'll focus on and extend in this post. The base, common Java configuration class, called `CrmConfiguration`, is shown below. The `CrmConfiguration` class simply configures a `javax.sql.DataSource`.

```java
Copypackage org.springsource.examples.crm.services.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.*;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;
import javax.sql.DataSource;

@Configuration
public class CrmConfiguration {
    @Value("${dataSource.driverClassName}")
    private String driverName;

    @Value("${dataSource.url}")
    private String url;

    @Value("${dataSource.user}")
    private String user;

    @Value("${dataSource.password}")
    private String password;

    @Bean
    public DataSource dataSource() {
        SimpleDriverDataSource simpleDriverDataSource = new SimpleDriverDataSource();
        simpleDriverDataSource.setPassword(this.password);
        simpleDriverDataSource.setUrl(this.url);
        simpleDriverDataSource.setUsername(this.user);
        simpleDriverDataSource.setDriverClass(org.h2.Driver.class);
        return simpleDriverDataSource;
    }
}
```

To use JDBC effectively, we'll use Spring's `JdbcTemplate` to minimize the boilerplate code. `JdbcTemplate` will insulate us from the resource management, and greatly simplify working with the JDBC API. Below is the configuration for a `JdbcTemplate` based implementation of the `CustomerRepository` interface. In the configuration, we define an instance of the `JdbcTemplate`.

```java
Copypackage org.springsource.examples.crm.services.jdbc;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;
import org.springsource.examples.crm.services.config.CrmConfiguration;

import javax.sql.DataSource;

@Configuration
public class JdbcConfiguration extends CrmConfiguration {
    @Bean
    public JdbcTemplate jdbcTemplate() {
        DataSource ds = dataSource(); // this comes from the parent class
        return new JdbcTemplate(ds);
    }
}
```

Below is the `JdbcTemplate`\-based `CustomerRepository` implementation.

```java
Copypackage org.springsource.examples.crm.services.jdbc.repositories;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;
import org.springsource.examples.crm.model.Customer;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Repository
public class JdbcTemplateCustomerRepository implements CustomerRepository, InitializingBean {

  @Value("${jdbc.sql.customers.queryById}")
  private String customerByIdQuery;

  @Value("${jdbc.sql.customers.insert}")
  private String insertCustomerQuery;

  @Autowired
  private JdbcTemplate jdbcTemplate;

  public Customer getCustomerById(long id) {
    return jdbcTemplate.queryForObject(customerByIdQuery, customerRowMapper, id);
  }

  public Customer saveCustomer(Customer customer) {

    SimpleJdbcInsert simpleJdbcInsert = new SimpleJdbcInsert(jdbcTemplate);
    simpleJdbcInsert.setTableName("customer");
    simpleJdbcInsert.setColumnNames(Arrays.asList("first_name", "last_name"));
    simpleJdbcInsert.setGeneratedKeyName("id");

    Map<String, Object> args = new HashMap<String, Object>();
    args.put("first_name", customer.getFirstName());
    args.put("last_name", customer.getLastName());

    Number id = simpleJdbcInsert.execute(args);
    return getCustomerById(id.longValue());
  }

  public void afterPropertiesSet() throws Exception {
    Assert.notNull(this.jdbcTemplate, "the jdbcTemplate can't be null!");
    Assert.notNull(this.customerByIdQuery, "the customerByIdQuery can't be null");
    Assert.notNull(this.insertCustomerQuery, "the insertCustomerQuery can't be null");
  }

  private RowMapper<Customer> customerRowMapper = new RowMapper<Customer>() {

    public Customer mapRow(ResultSet resultSet, int i) throws SQLException {
      long id = resultSet.getInt("id");
      String firstName = resultSet.getString("first_name");
      String lastName = resultSet.getString("last_name");
      return new Customer(id, firstName, lastName);
    }
  };
}
```

In the example the repository class is annotated with @Repository, which is a Spring framework *stereotype* annotation that is equivalent (except in some small ways which we needn't worry about here) to the Spring framework `@Component` *stereotype* annotation. In this particular example, we could just as easily have used `@Component`.

The first method – `getCustomerById(long)` – uses the `jdbcTemplate ` instance to issue a query. The ` JdbcTemplate`'s `query` takes as its first parameter a SQL statement, and takes as its second parameter an instance of `RowMapper<T>`. RowMapper is a Spring interface that clients can implement to handle mapping result set data into objects (in this case, instances of `Customer`). For each row in the returned result set, the `JdbcTemplate` will call ` mapRow(ResultSet,int)`.

The RowMapper instance is stateless (thus: thread safe), and should be cached for any other queries that map Customer records. After the SQL string and the RowMapper instance, the `jdbcTemplate.queryForObject` method supports Java 5's varargs syntax for parameters to be bound to the query in numerical order: the first variable argument is bound to the first "?" in the query, the second to the second "?", etc.

The second method inserts a record (simple) and then retrieves the ID of the freshly inserted record. We use the `SimpleJdbcInsert` object to describe our table, the desired arguments and then execute the insert in a database-independant way.

Now, we have a working repository. The repository is a dumb object. It doesn't know about transactions, nor does it understand business logic. A business object makes use of repository implementations and orchestrates them. A business object has "the big picture," where a repository only cares about persisting your domain model. Keep that in mind when deciding what goes where.

Let's inspect our `CustomerService` interface, first.

```java
Copypackage org.springsource.examples.crm.services;
import org.springsource.examples.crm.model.Customer;

public interface CustomerService {
    Customer getCustomerById(long id);
    Customer createCustomer(String fn, String ln);
}
```

This would seem to be similar to the repository interface, and one might wonder why a repository should be used. It should be understand that services care about the business state, not about application state. Services care about business events. Where a repository concerns itself with the mechanics of persising a `Customer` record to a database (for example), a service cares about ensuring that the `Customer` record is in a valid state, and that the `Customer` has not (for example) already signed up for the company's a free product trial campaign. So, while both the service and the repository seemingly have a method that appears to "create a customer," they should be very different and singly focused in purpose. With that in mind, lets look at our simple JDBC-based CustomerService implementation.

```java
Copypackage org.springsource.examples.crm.services.jdbc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springsource.examples.crm.model.Customer;
import org.springsource.examples.crm.services.CustomerService;
import org.springsource.examples.crm.services.jdbc.repositories.CustomerRepository;

@Service
public class JdbcCustomerService implements CustomerService {

  @Autowired
  private CustomerRepository customerRepository;

  public Customer getCustomerById(long id) {
    return this.customerRepository.getCustomerById(id);
  }

  public Customer createCustomer(String fn, String ln) {
    Customer customer = new Customer(fn, ln);
    return this.customerRepository.saveCustomer(customer);
  }
}
```

This service is straightforward. As we did with the repository, we annotate this service with a Spring annotation stereotype, `@Service`. This annotation simply conveys the intent of the class better than `@Component,` but there's no reason `@Component` couldn't have been used instead. A typical service should have methods of a coarser a granularity than a repository, and so it is common to see services with multiple repositories in play. The service orchestrates multiple repositories. This implies that a service needs to ensure consistent state across multiple repositories, across multiple clients. Its not hard to imagine the catastrophe that inconsistent state would represent. Suppose you had a service that managed shopping cart checkout on behalf of a user in an eCommerce site. When the user clicks "Submit Order," the service needs to reserve all line items in the shopping cart from inventory and debit the users account. If, concurrently, another user attempts to check out the same item (of which there is unfortunately only one left in inventory) and plows through the checkout fast enough, then the first user will have paid for something that the merchant has no ability to deliver on!

## Transactions

This scenario is common, and is the reason databases support the notion of a transaction. A transaction demarcates a block of activity in a database and buffers all changes during that activity. The database remains unchanged until *all* the actions in the transaction execute without incident and the transaction is *committed*. If another client reads data being changed in a transaction, that client will "see" the objects and records as they were *before* the transaction started. Those same clients won't be able to make changes to the database until the first transaction commits. Transactions ensure consistent state across concurrent reads.

Individual actions – perhaps a query and update - translate into individual `jdbcTemplate` calls. These individual calls can be made to share the same transaction by using Spring's `TransactionTemplate` with an instance of Spring's PlatformTransactionManager hierarchy. The `TransactionTemplate` then uses the transaction manager to start and commit transactions as necessary. The Spring framework offers the `TransactionTemplate ` to provide transaction synchronization. Our service only uses one transactional resource - a `javax.sql.DataSource ` - so an instance of `DataSourceTransactionManager` will suffice. Add the following to the `JdbcConfiguration` class.

```java
Copy    @Bean
    public PlatformTransactionManager transactionManager() {
        DataSourceTransactionManager dataSourceTransactionManager = new DataSourceTransactionManager();
        dataSourceTransactionManager.setDataSource(this.dataSource());
        return dataSourceTransactionManager;
    }

    @Bean
    public TransactionTemplate transactionTemplate() {
        TransactionTemplate tt = new TransactionTemplate();
        tt.setTransactionManager( this.transactionManager() );
        return tt;
    }
```

Use the transaction template to execute logic in the service class that should be enclosed in a transaction. The salient parts of the service's code are shown changed below.

```java
Copy
    @Autowired 
    private TransactionTemplate transactionTemplate; 

     public Customer getCustomerById(final long id) {
        return this.transactionTemplate.execute(new TransactionCallback() {
            public Customer doInTransaction(TransactionStatus status) {
               // … all the same business logic as before
            }
        });
    }

    public Customer createCustomer( final String firstName, final String lastName) {
        return this.transactionTemplate.execute(new TransactionCallback() {
            public Customer doInTransaction(TransactionStatus status) {
               // … all the same business logic as before
            }
        });
    }
```

And voilà! `JdbcTemplate` makes dealing with JDBC dead simple, and `TransactionTemplate` makes transaction management a breeze. This implementation is markedly simpler than the anything we could have done by hand. I'd call this a success.

However, we can do better. A lot of the evolution of the code has been to remove cross-cutting concerns from our code. Where possible, Spring provides simpler abstractions on top of APIs (like JDBC). Spring also supports introducing functionality where useful behavior can be systematically applied using Aspect Oriented Programming (AOP). In the previous example, if you squint, it becomes is clear that the `transactionTemplate ` was just wrapping the execution of the methods themselves - not any single part of the method's execution - inside a transaction context. When a method execution began, a transaction was created or reused. When a method execution finished, the transaction was committed if it was not a nested transaction. Any problem that can be described in terms of method execution boundaries might be well served by an AOP approach. Unsurprisingly, Spring ships with out-of-the-box AOP-based transaction support that can start and commit transactions along the boundaries of a method execution.

To enable Spring's transaction support, add this to your Spring XML configuration file:

```xml
Copy	<tx:annotation-driven transaction-manager = "transactionManager" />
```

This `<tx:annotation-driven/>` references the `transactionManager` bean configured in the Java configuration. The declaration switches on functionality in the Spring framework that detects the presence of Spring's `@Transactional ` annotations on methods in your service beans. The `transactionTemplate ` references become irrelevant, and can be removed in both the configuration class as well as the implementation. All that remains is to add `@Transactional ` to the service method definitions.

The `@Transactional` annotation can be parameterized to customize transactional behavior. The `getCustomerById` method is annotated as `@Transaction(readOnly = true)` because the method doesn't modify anything in the database in that method. Setting it as `readOnly` simply tells the Spring framework not to bother creating a transaction. Transactions aren't always cheap to create and should be used with care. For more on tranaction support in the Spring framework, readers are encouraged to check out Juergen Hoeller's (very cool) [recorded presentation on transactions](http://www.infoq.com/presentations/transaction-management-strategies).

The revised implementation looks like this:

```java
Copy    @Transactional(readOnly = true)
    public Customer getCustomerById(final long id) {
	// … same as before, with transactionTemplate removed
    }

    @Transactional
    public Customer createCustomer(final String firstName, final String lastName) {
	// … same as before, with transactionTemplate removed
    }
```

## Committing to a Relationship (using the Java Persistence API)

We have a complete, working `CustomerService ` implementation using our JDBC-based repository. Everything that could be done to let us talk cleanly to a data store in terms of our domain model, using JDBC, has been done. These examples are mercifully simple because, so far, what we're trying to do is simple. We're working with one type of object – a Customer – and haven't started writing the code to handle relationships such as a Customer's purchases. Recall that purchases have line items, and line items reference products. This object graph could be very deep, even in our simple domain. While it is certainly possible to deal with our database tables in terms of objects, it's not natural. This schism between the model that the database imposes – of rows, columns and foreign keys – and the model of our domain is called the *object-relational impedance mismatch*, and is common to all object oriented languages, not just Java. The Java Persistence API (JPA), standardizes object-relational mapping technology (an ORM). ORMs typically take a mapping between object types and database tables and provide a clean way to persist, manipulate, and query the objects based on this mapping. In JPA, this mapping is mostly driven from metadata annotations on the domain classes themselves. JPA implementations typically support multiple database vendors.

To begin with JPA you should have both chosen a database (the previous examples already established the H2 database, so we'll use that), and a JPA implementation. There are many different JPA providers. Many of the JPA implementations are packaged with other ORM solutions that predate the standard. For the purposes of this solution, we're using the Hibernate JPA implementation.

Let's revise our first example to use JPA. First modify the Customer class to contain the correct annotation-driven metadata for the JPA engine. The metadata is derived using defaults and, where explicit configuration is required, using Java language annotations. I've omitted the mutators in the following code.

```java
Copypackage org.springsource.examples.crm.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "customer")
public class Customer implements java.io.Serializable {
    // private variables and mutators omitted
    @Id
    @GeneratedValue
    @Column(name = "id", unique = true, nullable = false)
    public Long getId() {
        return this.id;
    }

    @Column(name = "first_name", nullable = false)
    public String getFirstName() {
        return this.firstName;
    }

    @Column(name = "last_name", nullable = false)
    public String getLastName() {
        return this.lastName;
    }

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "customer")
    public Set getPurchases() {
        return this.purchases;
    }
}
```

Classes annotated with `@Entity` are registered with JPA implementation. As our `CustomerService` implementation works with a pre-existing database schema, we add the `@Table` annotation and specify to which table in particular to map this class. Next, specify which field maps to the table's primary key using the `@Id `annotation. The `@GeneratedValue ` annotation tells JPA to expect that this column will be automatically incremented (or generated) by the database system. The `@Column ` annotation is redundant in this class, as the JPA engine will automatically infer column names from JavaBean-style properties on a class, but can be used to control how a JavaBean property maps to a column name in a table if there's a mismatch.

The annotation on the mutator for the purchases collection is the most important because it describes a relationship. The annotation - `@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "customer")` - is a bit dense, but packs a lot of punch! This annotation tells the JPA engine that there are zero or more Purchase objects that belong to this `Customer` object. The JPA engine knows that all `Purchase` objects that have a `"customer" ` property (of type `Customer`) with the same ID as the current one belonging to this customer. Those purchase objects – in database parlance – have foreign keys that reference this customer record, and this is expressed by `mappedBy = "customer."` So, the Customer class has a JavaBean property (a collection) for purchases, and `Purchase` has a JavaBean property for a `Customer`. The reciprocal mapping is excerpted from the Purchase class below:

```java
Copy    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    public Customer getCustomer() {
        return this.customer;
    }
```

The JPA engine knows the `  Customer  ` object on the `Purchase` is arrived at by looking at the `PURCHASE ` table's `CUSTOMER_ID` column, and then loading a `Customer` instance. Let's revisit the `CustomerService` implementation and see how it might be improved over the `JdbcTemplate`\-based implementation. First, the new configuration:

```java
Copypackage org.springsource.examples.crm.services.jpa;

import org.springframework.context.annotation.*;
import org.springframework.orm.jpa.*;
import org.springframework.transaction.PlatformTransactionManager;
import org.springsource.examples.crm.services.config.CrmConfiguration;
import javax.persistence.EntityManagerFactory;

@Configuration
public class JpaConfiguration extends CrmConfiguration {

  @Bean
  public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
    LocalContainerEntityManagerFactoryBean localContainerEntityManagerFactoryBean = new LocalContainerEntityManagerFactoryBean();
    localContainerEntityManagerFactoryBean.setDataSource(this.dataSource());
    return localContainerEntityManagerFactoryBean;
  }

  // this is required to replace JpaTemplate's exception translation
  @Bean
  public PersistenceExceptionTranslationPostProcessor persistenceExceptionTranslationPostProcessor() {
    PersistenceExceptionTranslationPostProcessor persistenceExceptionTranslationPostProcessor =  new PersistenceExceptionTranslationPostProcessor();
    persistenceExceptionTranslationPostProcessor.setRepositoryAnnotationType( Service.class);
    // do this to make the persistence bean post processor pick up our @Service class. Normally it only picks up @Repository
    return persistenceExceptionTranslationPostProcessor;
  }

  @Bean
  public PlatformTransactionManager transactionManager() {
    EntityManagerFactory entityManagerFactory = entityManagerFactory().getObject();
    return new JpaTransactionManager(entityManagerFactory);
  }

}
```

The transaction manager implementation is `JpaTransactionManager`, which is a `PlatformTransactionManager` implementation that knows how to manage JPA-local transactions. The `LocalContainerEntityManagerFactoryBean ` creates implementations of `javax.persistence.EntityManagerFactory`, a JPA class that can be used to create instances of a `javax.persistence.EntityManager`, the central API for interacting with a datasource in terms of the JPA API. This API is key to everything you're likely to do with JPA. The simplicity afforded by JPA makes a proper repository object object seem a bit *redundant.* After all, a repository's whole value proposition is that it lets clients handle persistence concerns in terms of the domain model, and JPA already does that. You're welcome to still keep the separate layers, especially if you have truly gnarly persistence requirements. For the purposes of this post, however, we're going to take advantage of JPA's brevity and fold the repository layer into the service layer.

One thing that you'll note missing is a Template class. Spring does ship with a `JpaTemplate`, but you're better off letting Spring directly inject an EntityManager for you. When you use component-scanning (as we are), Spring will automatically look for `@javax.persistence.PersistenceContext` (an standard annotation) and inject a configured `EntityManager` instance *proxy* for you. Why a proxy? Because `EntityManager`s aren't thread-safe, and so Spring does the heavy lifting to ensure that different client requests can use a thread-local `EntityManager` instance. If we had used the `JpaTemplate` class, we would have benefited from Spring's exception translations. For all of the ORM template classes shipped with the Spring framework, Spring automatically translates technology-specific (checked) exceptions into the standard hierarchy of runtime exceptions in the Spring ORM package (rooted at `org.springframework.dao.DataAccessException`). This way, you can deal with different exceptions in your code in a standard way. We've opted to simply inject the entity manager here, so we need to renable exception translation. Do that by registering a `PersistenceExceptionTranslationPostProcessor`, which will handle the exception translation for us, in absence of the `JpaTemplate`.

The code below represents the JPA-based service. It's not much longer than our `JdbcTemplateCustomerService`, but achieves parity with both the repository *and* our service!

Below is the code for the JPA-based CustomerService implementation.

```java
Copypackage org.springsource.examples.crm.services.jpa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.jpa.JpaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springsource.examples.crm.model.Customer;
import org.springsource.examples.crm.services.CustomerService;

@Service
public class JpaDatabaseCustomerService implements CustomerService {

  @PersistenceContext
  private EntityManager entityManager;

  @Transactional(readOnly = true)
  public Customer getCustomerById(long id) {
    return this.entityManager.find(Customer.class, id);
  }

  @Transactional
  public Customer createCustomer(String fn, String ln) {
    Customer newCustomer = new Customer();
    newCustomer.setFirstName(fn);
    newCustomer.setLastName(ln);
    this.entityManager.persist(newCustomer);
    return newCustomer;
  }
}
```

Not bad! Our implementation has become the fleeting specimen you see before you. There are as many import statements as actual lines of method bodies! Once the peripheral concerns are gone, JPA itself goes a long way to let you solve your problem in terms of the objects in your domain. The injected `EntityManager` proxy has reduced what would have been many, verbose operations in JDBC to one-liners, and it's thread safe!. Finally, Spring's AOP-based transaction support made short work of the normally complicated, concurrency-riddled challenge of managing application state in our business objects (all with just an annotation!).

## Summary

In this post, we've explored some of the more common options that confront a wayward developer. We used Spring to be as productive as possible and - armed with the knowledge of all the things that Spring can simplify for us - we arrived here, at a *very* simple, final implementation.

There are numerous other data persistence options for which the Spring framework provides similar support. Those options all follow the same general template as the support established in this post, so they will come easily if you decide to use them instead. This post doesn't cover the Spring support available for many of the other ORM solutions (like Hibernate, JDO, TopLink, etc.). For more on the Hibernate support, for example, you might check out Alef's [fantastic post](http://blog.springsource.com/2007/06/26/so-should-you-still-use-springs-hibernatetemplate-andor-jpatemplate/) on the topic. The also post does not address the wide world of NoSQL support provided by the Spring Data project. The examples in this post were progressively simplified, and depended more and more on conventions over configuration. As the examples moved up the abstraction stack, there was always a way to tap the full power of the underlying API.