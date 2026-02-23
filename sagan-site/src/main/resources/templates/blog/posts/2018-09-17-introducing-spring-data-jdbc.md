---
title: Introducing Spring Data JDBC
source: https://spring.io/blog/2018/09/17/introducing-spring-data-jdbc
scraped: 2026-02-23T09:27:08.325Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Jens Schauder |  September 17, 2018 | 37 Comments
---

# Introducing Spring Data JDBC

_Engineering | Jens Schauder |  September 17, 2018 | 37 Comments_

With the upcoming Lovelace GA release, we’re going to ship a new Spring Data Module: [Spring Data JDBC](https://projects.spring.io/spring-data-jdbc/).

The idea behind Spring Data JDBC is to provide access to relational databases without submitting to the complexities of JPA. JPA offers such features as lazy loading, caching, and dirty tracking. While these are great if you need them, they can actually make thinking about JPA and its behavior harder than it has to be.

Lazy loading might trigger expensive statements when you don’t expect it or it might fail with an exception. Caching can get in your way when you actually want to compare two versions of an entity and being dirty makes it hard to find a single point where all persistence operations pass through.

Spring Data JDBC aims at a much simpler model. There won’t be caching, dirty tracking, or lazy loading. Instead, SQL statements are issued when and only when you invoke a repository method. The object returned as result of that method is fully loaded before the method returns. There is no "session" and no proxies for entities. All this should make Spring Data JDBC easier to reason about.

Of course, this simpler approach results in constraints which will be covered in a future post. Also, it is the first version, so there are many features that we want and plan to implement, but that we had to postpone in order to get something into your hands early.

## [](#lets-take-a-look-at-a-simple-example)[](#let-s-take-a-look-at-a-simple-example)Let’s take a look at a simple example.

First, we need an entity:

```
Copyclass Customer {
    @Id
    Long id;
    String firstName;
    LocalDate dob;
}
```

Note that you don’t need getters or setters. It is perfectly okay to use them if you prefer to do so. Really, the only requirement is that the entity has a property annotated with `Id` (that is, `@org.springframework.data.annotation.Id`, not the `javax.persistence` one).

Next, we need to declare a repository. The easiest way to do that is to extend `CrudRepository`:

```
Copyinterface CustomerRepository extends CrudRepository<Customer, Long> {}
```

Finally, we need to configure the `ApplicationContext` to enable the creation of repositories:

```
Copy@Configuration
@EnableJdbcRepositories (1)
public class CustomerConfig extends JdbcConfiguration { (2)

    @Bean
    NamedParameterJdbcOperations operations() { (3)
        return new NamedParameterJdbcTemplate(dataSource());
    }

    @Bean
    PlatformTransactionManager transactionManager() { (4)
        return new DataSourceTransactionManager(dataSource());
	}

    @Bean
    DataSource dataSource(){ (5)
        return new EmbeddedDatabaseBuilder()
                .generateUniqueName(true)
                .setType(EmbeddedDatabaseType.HSQL)
                .addScript("create-customer-schema.sql")
                .build();
    }
}
```

Let’s go through the configuration step by step.

1.  `EnableJdbcRepositories` enables the creation of repositories. Since it requires the presence of some beans, we need the rest of the configuration.
    
2.  Extending `JdbcConfiguration` adds some default beans to the `ApplicationContext`. You can overwrite its methods to customize some of the behavior of Spring Data JDBC. For now, we go with the default implementations.
    
3.  The really important part is `NamedParameterJdbcOperations`, which is used internally to submit SQL statements to the database.
    
4.  The transaction manager is, strictly speaking, not necessary. But you’d be working without support for transactions that span more than a single statement, and nobody wants that, right?
    
5.  Spring Data JDBC doesn’t directly use the `DataSource`, but, since the `TransactionManager` and the `NamedParameterJdbcOperations` need it, registering it as a bean is an easy way to ensure both use the same instance.
    

That is all you need to get started on working with it. Now let’s play with it in a test:

```
Copy@RunWith(SpringRunner.class)
@Transactional
@ContextConfiguration(classes = CustomerConfig.class)
public class CustomerRepositoryTest {

    @Autowired CustomerRepository customerRepo;

    @Test
    public void createSimpleCustomer() {

        Customer customer = new Customer();
        customer.dob = LocalDate.of(1904, 5, 14);
        customer.firstName = "Albert";

        Customer saved = customerRepo.save(customer);

        assertThat(saved.id).isNotNull();

        saved.firstName = "Hans Albert";

        customerRepo.save(saved);

        Optional<Customer> reloaded = customerRepo.findById(saved.id);

        assertThat(reloaded).isNotEmpty();

        assertThat(reloaded.get().firstName).isEqualTo("Hans Albert");
    }
}
```

## [](#query-annotation)[](#code-query-code-annotation)`@Query` annotation

You probably won’t get far with just the basic CRUD methods from the `CrudRepository`. We decided to postpone query derivation, the popular feature where Spring Data derives the query to use from a method name, to a later version. Until that arrives you can use a simple `@Query` annotation to specify a query on a repository method:

```
Copy@Query("select id, first_name, dob from customer where upper(first_name) like '%' || upper(:name) || '%' ")
List<Customer> findByName(@Param("name") String name);
```

Note that the `@Param` annotation is not required if you compile with the `-parameters` flag.

If you want to execute an update or delete statement, you can add a `@Modifying` annotation to the method.

Let’s create another test in order to try out the new method.

```
Copy@Test
public void findByName() {

    Customer customer = new Customer();
    customer.dob = LocalDate.of(1904, 5, 14);
    customer.firstName = "Albert";

    Customer saved = customerRepo.save(customer);

    assertThat(saved.id).isNotNull();

    customer.id= null; (1)
    customer.firstName = "Bertram";

    customerRepo.save(customer);

    customer.id= null;
    customer.firstName = "Beth";

    customerRepo.save(customer);

    assertThat(customerRepo.findByName("bert")).hasSize(2); (2)
}
```

1.  Since the connection between a Java object and its corresponding row is just its `Id` plus its type, setting the `Id` to `null` and saving it again creates another row in the database.
    
2.  We are doing a case-insensitive (like) search, and, therefore, we find "Albert" and "Bertram" but not "Beth".
    

## [](#closing-notes)[](#closing-notes)Closing Notes

There is more to learn about Spring Data JDBC. Continue reading [Spring Data JDBC References and Aggregates](https://spring.io/blog/2018/09/24/spring-data-jdbc-references-and-aggregates)

Or you can take a [look at the examples](https://github.com/spring-projects/spring-data-examples/tree/master/jdbc), the [documentation](https://docs.spring.io/spring-data/jdbc/docs/current/reference/html/), and, of course, [the source code](https://github.com/spring-projects/spring-data-jdbc). If you have questions, [ask away on StackOverflow](https://stackoverflow.com/questions/tagged/spring-data-jdbc). And if you find a bug or want to request a feature [please create an issue](https://jira.spring.io/projects/DATAJDBC).