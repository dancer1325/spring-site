---
title: Getting started with Spring Data JPA
source: https://spring.io/blog/2011/02/10/getting-started-with-spring-data-jpa
scraped: 2026-02-24T08:47:06.405Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oliver Drotbohm |  February 10, 2011 | 11 Comments
---

# Getting started with Spring Data JPA

_Engineering | Oliver Drotbohm |  February 10, 2011 | 11 Comments_

As we have just released the first milestone of the Spring Data JPA project I’d like to give you a quick introduction into its features. As you probably know, the Spring framework provides support to build a JPA based data access layer. So what does Spring Data JPA add to this base support? To answer that question I'd like to start with the data access components for a sample domain implemented using plain JPA + Spring and point out areas that leave room for improvement. After we've done that I will refactor the implementations to use the Spring Data JPA features to address these problem areas. The sample project as well as a step by step guide of the refactoring steps can be found on [Github](https://github.com/spring-projects/spring-data-examples/tree/master/jpa/showcase).

### The domain

To keep things simple we start with a tiny well-known domain: we have `Customer`s that have `Account`s.

```java
Copy@Entity
public class Customer {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  private String firstname;
  private String lastname;

  // … methods omitted
}
```

```java
Copy@Entity
public class Account {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @ManyToOne
  private Customer customer;

  @Temporal(TemporalType.DATE)
  private Date expiryDate;

  // … methods omitted
}
```

The `Account` has an expiry date that we will use at a later stage. Beyond that there's nothing really special about the classes or the mapping - it uses plain JPA annotations. Now let's take a look at the component managing `Account` objects:

```java
Copy@Repository
@Transactional(readOnly = true)
class AccountServiceImpl implements AccountService {

  @PersistenceContext
  private EntityManager em;

  @Override
  @Transactional
  public Account save(Account account) {

    if (account.getId() == null) {
      em.persist(account);
      return account;
    } else {
      return em.merge(account);
    }
  }

  @Override
  public List<Account> findByCustomer(Customer customer) {

    TypedQuery query = em.createQuery("select a from Account a where a.customer = ?1", Account.class);
    query.setParameter(1, customer);

    return query.getResultList();
  }
}
```

I deliberately named the class `*Service` to avoid name clashes as we will introduce a repository layer when we start refactoring. But conceptually the class here is a repository rather than a service. So what do we have here actually?

The class is annotated with `@Repository` to enable exception translation from JPA exceptions to Spring's `DataAccessException` hierarchy. Beyond that we use `@Transactional` to make sure the `save(…)` operation is running in a transaction and to allow setting the `readOnly`\-flag (at the class level) for `findByCustomer(…)`. This causes some performance optimizations inside the persistence provider as well as on the database level.

As we want to free the clients from the decision whether to call `merge(…)` or `persist(…)` on the `EntityManager` we use the `id`\-field of the `Account` to decide whether we consider an `Account` object as new or not. This logic could of course be extracted into a common superclass as we probably don't want to repeat this code for every domain object specific repository implementation. The query method is quite straight forward as well: we create a query, bind a parameter and execute the query to get a result. It's almost so straight forward that one could regard the implementation code as boilerplate as with a little bit of imagination it's derivable from the method signature: we expect a `List` of `Account`s, the query is quite close to the method name and we simply bind the method parameter to it. So as you can see, there‘s room for improvement.

### Spring Data repository support

Before we start refactoring the implementation, note that the sample project contains test cases that can be run in the course of the refactoring to verify the code still works. Let's now see how we can improve the implementation.

Spring Data JPA provides a repository programming model that starts with an interface per managed domain object:

```java
Copypublic interface AccountRepository extends JpaRepository<Account, Long> { … }
```

Defining this interface serves two purposes: First, by extending `JpaRepository` we get a bunch of generic CRUD methods into our type that allows saving `Account`s, deleting them and so on. Second, this will allow the Spring Data JPA repository infrastructure to scan the classpath for this interface and create a Spring bean for it.

To have Spring create a bean that implements this interface, all you need to do is use the Spring JPA namespace and activate the repository support using the appropriate element:

```xml
Copy<jpa:repositories base-package="com.acme.repositories" />
```

This scans all packages below `com.acme.repositories` for interfaces extending `JpaRepository` and creates a Spring bean for it that is backed by an implementation of `SimpleJpaRepository`. Let's take a first step and refactor our `AccountService` implementation a little bit to use our newly introduced repository interface:

```java
Copy@Repository
@Transactional(readOnly = true)
class AccountServiceImpl implements AccountService {

  @PersistenceContext
  private EntityManager em;

  @Autowired
  private AccountRepository repository;

  @Override
  @Transactional
  public Account save(Account account) {
    return repository.save(account);
  }

  @Override
  public List<Account> findByCustomer(Customer customer) {

    TypedQuery query = em.createQuery("select a from Account a where a.customer = ?1", Account.class);
    query.setParameter(1, customer);

    return query.getResultList();
  }
}
```

After this refactoring, we simply delegate the call to `save(…)` to the repository. By default the repository implementation will consider an entity new if its `id`\-property is `null` just like you saw in the previous example (note, you can can gain more detailed control over that decision if necessary). Additionally, we can get rid of the `@Transactional` annotation for the method as the CRUD methods of the Spring Data JPA repository implementation are already annotated with `@Transactional`.

Next we will refactor the query method. Let’s follow the same delegating strategy for the query method as with the save method. We introduce a query method on the repository interface and have our original method delegate to that newly introduced method:

```java
Copy@Transactional(readOnly = true) 
public interface AccountRepository extends JpaRepository<Account, Long> {

  List<Account> findByCustomer(Customer customer); 
}
```

```java
Copy@Repository
@Transactional(readOnly = true)
class AccountServiceImpl implements AccountService {

  @Autowired
  private AccountRepository repository;

  @Override
  @Transactional
  public Account save(Account account) {
    return repository.save(account);
  }

  @Override
  public List<Account> findByCustomer(Customer customer) {
    return repository.findByCustomer(Customer customer);
  }
}
```

Let me add a quick note on the transaction handling here. In this very simple case we could remove the `@Transactional` annotations from the `AccountServiceImpl` class entirely as the repository's CRUD methods are transactional and the query method is marked with `@Transactional(readOnly = true)` at the repository interface already. The current setup, with methods at the service level marked as transactional (even if not needed for this case), is best because it is explicitly clear when looking at the service level that operations are happening in a transaction. Beyond that, if a service layer method was modified to do multiple calls to repository methods all the code would still execute inside a single transaction as the repository's inner transactions would simply join the outer one started at the service layer. The transactional behavior of the repositories and possibilities to tweak it are documented in detail in the [reference documentation](http://static.springsource.org/spring-data/data-jpa/docs/1.0.0.M1/reference/html/#transactions).

Try to run the test case again and see that it works. Stop, we didn't provide any implementation for `findByCustomer(…)` right? How does this work?

### Query methods

When Spring Data JPA creates the Spring bean instance for the `AccountRepository` interface it inspects all query methods defined in it and derives a query for each of them. By default Spring Data JPA will automatically parses the method name and creates a query from it. The query is implemented using the JPA criteria API. In this case the `findByCustomer(…)` method is logically equivalent to the JPQL query `select a from Account a where a.customer = ?1`. The parser that analyzes the method name supports quite a large set of keywords such as `And`, `Or`, `GreaterThan`, `LessThan`, `Like`, `IsNull`, `Not` and so on. You can also add `OrderBy` clauses if you like. For a detailed overview please check out the [reference documentation](http://static.springsource.org/spring-data/data-jpa/docs/1.0.0.M1/reference/html/#jpa.query-methods.query-creation). This mechanism gives us a query method programming model like you're used to from Grails or Spring Roo.

Now let's suppose you want to be explicit about the query to be used. To do so you can either declare a JPA named query that follows a naming convention (in this case `Account.findByCustomer`) in an annotation on the entity or in your `orm.xml`. Alternatively you can annotate your repository method with `@Query`:

```java
Copy@Transactional(readOnly = true)
public interface AccountRepository extends JpaRepository<Account, Long> {

  @Query("<JPQ statement here>")
  List<Account> findByCustomer(Customer customer); 
}
```

Now let's do a before/after comparison of the `CustomerServiceImpl` applying the features that we've seen so far:

```java
Copy@Repository
@Transactional(readOnly = true)
public class CustomerServiceImpl implements CustomerService {

  @PersistenceContext
  private EntityManager em;

  @Override
  public Customer findById(Long id) {
    return em.find(Customer.class, id);
  }

  @Override
  public List<Customer> findAll() {
    return em.createQuery("select c from Customer c", Customer.class).getResultList();
  }

  @Override
  public List<Customer> findAll(int page, int pageSize) {

    TypedQuery query = em.createQuery("select c from Customer c", Customer.class);

    query.setFirstResult(page * pageSize);
    query.setMaxResults(pageSize);

    return query.getResultList();
  }

  @Override
  @Transactional
  public Customer save(Customer customer) {

    // Is new?
    if (customer.getId() == null) {
      em.persist(customer);
      return customer;
    } else {
      return em.merge(customer);
    }
  }

  @Override
  public List<Customer> findByLastname(String lastname, int page, int pageSize) {

    TypedQuery query = em.createQuery("select c from Customer c where c.lastname = ?1", Customer.class);

    query.setParameter(1, lastname);
    query.setFirstResult(page * pageSize);
    query.setMaxResults(pageSize);

    return query.getResultList();
  }
}
```

Okay, let's create the `CustomerRepository` and eliminate the CRUD methods first:

```java
Copy@Transactional(readOnly = true)
public interface CustomerRepository extends JpaRepository<Customer, Long> { … }
```

```java
Copy@Repository
@Transactional(readOnly = true)
public class CustomerServiceImpl implements CustomerService {

  @PersistenceContext
  private EntityManager em;

  @Autowired
  private CustomerRepository repository;

  @Override
  public Customer findById(Long id) {
    return repository.findById(id);
  }

  @Override
  public List<Customer> findAll() {
    return repository.findAll();
  }

  @Override
  public List<Customer> findAll(int page, int pageSize) {

    TypedQuery query = em.createQuery("select c from Customer c", Customer.class);

    query.setFirstResult(page * pageSize);
    query.setMaxResults(pageSize);

    return query.getResultList();
  }

  @Override
  @Transactional
  public Customer save(Customer customer) {
    return repository.save(customer);
  }

  @Override
  public List<Customer> findByLastname(String lastname, int page, int pageSize) {

    TypedQuery query = em.createQuery("select c from Customer c where c.lastname = ?1", Customer.class);

    query.setParameter(1, lastname);
    query.setFirstResult(page * pageSize);
    query.setMaxResults(pageSize);

    return query.getResultList();
  }
}
```

So far so good. What is left right now are two methods that deal with a common scenario: you don't want to access all entities of a given query but rather only a page of them (e.g. page 1 by a page size of 10). Right now this is addressed with two integers that limit the query appropriately. There are two issues with this. Both integers together actually represent a concept, which is not made explicit here. Beyond that we return a simple `List` so we lose metadata information about the actual page of data: is it the first page? Is it the last one? How many pages are there in total? Spring Data provides an abstraction consisting of two interfaces: `Pageable` (to capture pagination request information) as well as `Page` (to capture the result as well as meta-information). So let's try to add `findByLastname(…)` to the repository interface and rewrite `findAll(…)` and `findByLastname(…)` as follows:

```java
Copy@Transactional(readOnly = true) 
public interface CustomerRepository extends JpaRepository<Customer, Long> {

  Page<Customer> findByLastname(String lastname, Pageable pageable); 
}
```

```java
Copy@Override 
public Page<Customer> findAll(Pageable pageable) {
  return repository.findAll(pageable);
}

@Override
public Page<Customer> findByLastname(String lastname, Pageable pageable) {
  return repository.findByLastname(lastname, pageable); 
}
```

Make sure you adapt the test cases according to the signature changes but then they should run fine. There are two things this boils down to here: we have CRUD methods supporting pagination and the query execution mechanism is aware of `Pageable` parameters as well. At this stage our wrapping classes actually become obsolete as a client could have used our repository interfaces directly. We got rid of the entire implementation code.

### Summary

In the course of this blog post we have reduced the amount of code to be written for repositories to two interfaces with 3 methods and a single line of XML:

```java
Copy@Transactional(readOnly = true) 
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Page<Customer> findByLastname(String lastname, Pageable pageable); 
}
```

```java
Copy@Transactional(readOnly = true)
public interface AccountRepository extends JpaRepository<Account, Long> {

    List<Account> findByCustomer(Customer customer); 
}
```

```xml
Copy<jpa:repositories base-package="com.acme.repositories" />
```

We have type safe CRUD methods, query execution and pagination built right in. The cool thing is that this is not only working for JPA based repositories but also for non-relational databases. The first non-relational database to support this approach will be MongoDB as part of the Spring Data Document release in a few days. You will get the exact same features for Mongo DB and we're working on support for other data bases as well.. There are also additional features to be explored (e.g. entity auditing, integration of custom data access code) which we will walk through in upcoming blog posts.