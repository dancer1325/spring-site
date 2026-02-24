---
title: New application layering and persistence choices in Spring Roo 1.2
source: https://spring.io/blog/2011/09/14/new-application-layering-and-persistence-choices-in-spring-roo-1-2
scraped: 2026-02-24T08:34:40.144Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Stefan Schmidt |  September 14, 2011 | 0 Comments
---

# New application layering and persistence choices in Spring Roo 1.2

_Engineering | Stefan Schmidt |  September 14, 2011 | 0 Comments_

Java enterprise applications can take many shapes and forms. Depending on their requirements, developers need to decide which specific architectural layers their application needs. Up until now, [Spring Roo](http://www.springsource.org/roo) has taken a [pragmatic approach](http://static.springsource.org/spring-roo/reference/html-single/index.html#architecture) to reduce the often unnecessary complexity introduced by service facade, repository or DAO layers. The newly-released Spring Roo 1.2.0.M1 ([see announcement](http://blog.springsource.com/2011/09/14/spring-roo-1-2-0-m1-released/)) includes [frequently](https://jira.springsource.org/browse/ROO-340) [requested](https://jira.springsource.org/browse/ROO-301) support for architectural layers which can be tailored to the needs of the application. This article provides an overview of Roo's new service and repository layer features.

![Spring Roo Application Layering Support](http://blog.springsource.com/wp-content/uploads/2011/09/roo-layering1.png)

While there are a number of new layering and persistence choices available, by default Roo will continue to support the JPA Active Record Entity by default. However, you can easily change existing applications by adding further service or repository layers (details below). If you add new layers Roo will automatically change its ITDs in the consumer layer or service layer respectively. For example, Roo will automatically change your application to inject and call a new service layer within an existing MVC controller, GWT locator, Integration test or data on demand for a given domain type.

### Persistence Layers

With the Roo 1.2.0.M1 release there are now three options available in Roo core to support data persistence, JPA Entities (Active Record style), JPA Repositories and MongoDB Repositories. Support for [Spring Data Neo4J](http://www.springsource.org/spring-data/neo4j) is currently in the works and should be available soon as [a Roo add-on](http://static.springsource.org/spring-roo/reference/html-single/index.html#usage-add-ons).

#### JPA Entities (Active Record style)

Active record-style JPA Entities have been the default since the first release of Spring Roo and will remain so. In order to configure your project for JPA persistence, you can run the jpa setup command:

```xml
Copyroo> jpa setup --provider HIBERNATE --database HYPERSONIC_PERSISTENT
```

This configures your project to use the Hibernate object relational mapper along with a in-memory database (HSQLDB). Active record-style JPA entities supported by Roo are annotated with `**@RooEntity**` which takes care of providing a persistence identifier field along with its accessor and mutator. In addition this annotation creates the typical CRUD methods to support data access.

```xml
Copyroo> entity --class ~.domain.Pizza
```

This command will create a Pizza domain type along with active record-style methods to persist, update, read and delete your entity. The following example also contains a number of fields which can be added directly to the Java sources or through the field command via the Roo shell.

```java
Copy@RooJavaBean
@RooToString
@RooEntity
public class Pizza {

    @NotNull
    @Size(min = 2)
    private String name;

    private BigDecimal price;

    @ManyToMany(cascade = CascadeType.ALL)
    private Set<Topping> toppings = new HashSet<Topping>();

    @ManyToOne
    private Base base;
}
```

#### JPA Repository

Developers who require a repository / DAO layer instead of the default Roo JPA 'Active Record'-based persistence approach can do so by creating a [Spring Data JPA](http://www.springsource.org/spring-data/jpa) backed repository for a given JPA domain type. After configuring your project for JPA persistence via the `jpa setup` command, this functionality is automatically provided by annotating the domain type with Roo's `**@RooJpaEntity**` annotation.

```xml
Copyroo> entity --class ~.domain.Pizza --activeRecord false
```

By defining `--activeRecord false` you can opt out of the otherwise default 'Active Record'-style. The following example also contains a number of fields which can be added through the field command via the Roo shell.

```java
Copy@RooJavaBean
@RooToString
@RooJpaEntity
public class Pizza {

    @NotNull
    @Size(min = 2)
    private String name;

    private BigDecimal price;

    @ManyToMany(cascade = CascadeType.ALL)
    private Set<Topping> toppings = new HashSet<Topping>();

    @ManyToOne
    private Base base;
}
```

With a domain type in place you can now create a new repository for this type by using the `repository jpa` command:

```xml
Copyroo> repository jpa --interface ~.repository.PizzaRepository --entity ~.domain.Pizza
```

This will create a simple interface definition which leverages Spring Data JPA:

```java
Copy@RooRepositoryJpa(domainType = Pizza.class)
public interface PizzaRepository {
}
```

Of course, you can simply add the `**@RooRepositoryJpa**` annotation on any interface by hand in lieu of issuing the repository jpa command in the Roo shell. 

The addition of the `**@RooRepositoryJpa**` annotation will trigger the creation of a fairly trivial AspectJ ITD which adds an extends statement to the PizzaRepository interface resulting in the equivalent of this interface definition:

```java
Copypublic interface PizzaRepository extends JpaRepository<Pizza, Long> {}
```

The [JpaRepository](http://static.springsource.org/spring-data/data-jpa/docs/current/api/org/springframework/data/jpa/repository/JpaRepository.html) interface is part of the [Spring Data JPA](http://www.springsource.org/spring-data/jpa) API and provides all CRUD functionality out of the box.

#### MongoDB Persistence

As an alternative to JPA persistence, Spring Roo 1.2 now offers [MongoDB](http://www.mongodb.org/) support by leveraging the [Spring Data MongoDB](http://www.springsource.org/spring-data/mongodb) project. MongoDB is supported by Cloud Foundry, which is a great place to freely develop and host Spring Roo applications. You can also use MySQL and PostgreSQL with Cloud Foundry, in addition to MongoDB. To configure a project for MongoDB persistence you can use the mongo setup command:

```xml
Copyroo> mongo setup
```

This will configure your Spring Application context to use a MongoDB installation running on localhost and the default port. Optional command attributes allow you to define host, port, database name, username and password. If you're using MongoDB on Cloud Foundry, just pop `--cloudFoundry` after 'mongo setup' so that Roo can configure everything automatically for you

Once the application is configured for MongoDB support, the `entity mongo` and `repository mongo` commands become available:

```xml
Copyroo> entity mongo --class ~.domain.Pizza
```

This command will create a Pizza domain type annotated with **`@RooMongoEntity`**. This annotation is responsible for triggering the creation of an ITD which provides a Spring Data `@Id` annotated field as well as its accessor and mutator. The following example also contains a number of fields which can be added through the field command via the Roo shell.

```java
Copy@RooJavaBean
@RooToString
@RooMongoEntity
public class Pizza {

    @NotNull
    @Size(min = 2)
    private String name;

    private BigDecimal price;

    @ManyToMany(cascade = CascadeType.ALL)
    private Set<Topping> toppings = new HashSet<Topping>();

    @ManyToOne
    private Base base;
}
```

With a domain type in place you can now create a new repository for this type by using the repository mongo command (or by applying the `**@RooRepositoryMongo**` annotation to an arbitrary interface):

```xml
Copyroo> repository mongo --interface ~.repository.PizzaRepository --entity ~.domain.Pizza
```

This will create a simple interface definition which leverages [Spring Data MongoDB](http://www.springsource.org/spring-data/mongodb):

```java
Copy@RooRepositoryMongo(domainType = Pizza.class)
public interface PizzaRepository {

    List<Pizza> findAll();
}
```

Similar the Spring Data JPA driven repository seen above, this interface is augmented through an ITD which introduces the [PagingAndSortingRepository](http://static.springsource.org/spring-data/data-commons/docs/1.1.0.RELEASE/api/org/springframework/data/repository/PagingAndSortingRepository.html) provided by the Spring Data API and is responsible for providing all necessary CRUD functionality. In addition this interface defines a 'custom' finder which is not offered by the PagingAndSortingRepository implementation: `List findAll();`. This method iis required by Spring Roo's UI scaffolding and is automatically implemented by the [query builder mechanism](http://static.springsource.org/spring-data/data-document/docs/1.0.0.M4/reference/html/#repositories.definition-tuning) offered by Spring Data MongoDB.

Similar to applications which use JPA persistence (see [this blog article](http://blog.springsource.com/2011/08/30/using-postgres-on-cloud-foundry/) for details on using JPA with Postgres) MongoDB applications can be easily deployed to [VMware Cloud Foundry](http://cloudfoundry.com/). The following script provides an example of the Pizza Shop sample application (see /sample/pizzashop.roo) which has been adjusted for use with a MongoDB-backed repository layer:

```xml
Copy// Create a new project.
project com.springsource.pizzashop

// Create configuration for MongoDB peristence 
mongo setup --cloudFoundry true

// Define domain model.
entity mongo --class ~.domain.Base --testAutomatically
field string --fieldName name --sizeMin 2 --notNull --class ~.domain.Base
entity mongo --class ~.domain.Topping --testAutomatically
field string --fieldName name --sizeMin 2 --notNull --class ~.domain.Topping
entity mongo --class ~.domain.Pizza --testAutomatically
field string --fieldName name --notNull --sizeMin 2 --class ~.domain.Pizza
field number --fieldName price --type java.lang.Float
field set --fieldName toppings --type ~.domain.Topping
field reference --fieldName base --type ~.domain.Base
entity mongo --class ~.domain.PizzaOrder --testAutomatically
field string --fieldName name --notNull --sizeMin 2 --class ~.domain.PizzaOrder
field string --fieldName address --sizeMax 30
field number --fieldName total --type java.lang.Float
field date --fieldName deliveryDate --type java.util.Date
field set --fieldName pizzas --type ~.domain.Pizza

// Add layer support.
repository mongo --interface ~.repository.ToppingRepository --entity ~.domain.Topping
repository mongo --interface ~.repository.BaseRepository --entity ~.domain.Base
repository mongo --interface ~.repository.PizzaRepository --entity ~.domain.Pizza
repository mongo --interface ~.repository.PizzaOrderRepository --entity ~.domain.PizzaOrder
service --interface ~.service.ToppingService --entity ~.domain.Topping
service --interface ~.service.BaseService --entity ~.domain.Base
service --interface ~.service.PizzaService --entity ~.domain.Pizza
service --interface ~.service.PizzaOrderService --entity ~.domain.PizzaOrder

// Create a Web UI.
web mvc setup
web mvc all --package ~.web

// Package the application into a war file.
perform package

// Deploy and start the application in Cloud Foundry
cloud foundry login 
cloud foundry deploy --appName roo-pizzashop --path /target/pizzashop-0.1.0.BUILD-SNAPSHOT.war --memory 512
cloud foundry create service --serviceName pizzashop-mongo --serviceType mongodb
cloud foundry bind service --serviceName pizzashop-mongo --appName roo-pizzashop
cloud foundry start app --appName roo-pizzashop
```

The 'live' sample application is currently deployed on Cloud Foundry: [](http://roo-pizzashop.cloudfoundry.com/)[http://roo-pizzashop.cloudfoundry.com/](http://roo-pizzashop.cloudfoundry.com/)

### Service Layer

Developers can also choose to create a service layer in their application. By default, Roo will create a service interface (and implementation) for one or more domain entities. If a persistence-providing layer such as Roo's default entity layer or a repository layer is present for a given domain entity, the service layer will expose the CRUD functionality provided by this persistence layer through its interface and implementation.

As per Roo's conventions, all functionality will be introduced via AspectJ ITDs, therefore providing the developer a clean canvas for implementing custom business logic which does not naturally fit into domain entities. Other common use cases for service layers are security or integration of remoting such as Web Services. For a more detailed discussion please refer to the [architecture chapter](http://static.springsource.org/spring-roo/reference/html-single/index.html#architecture-services) in the Spring Roo reference guide.

The integration of a services layer into a Roo project is similar to the repository layer by using the @RooService annotation directly or the service command in the Roo shell:

```xml
Copyroo> service --interface ~.service.PizzaService --entity ~.domain.Pizza
```

This command will create the `PizzaService` interface in the defined package and additionally a `PizzaServiceImpl` in the same package (the name and package of the `PizzaServiceImpl` can be customized via the optional `--class` attribute).

```java
Copy@RooService(domainTypes = { Pizza.class })
public interface PizzaService {
}
```

Following Roo conventions the default CRUD method definitions can be found in the AspectJ ITD:

```java
Copyvoid savePizza(Pizza pizza);
Pizza findPizza(Long id);    
List<Pizza> findAllPizzas();    
List<Pizza> findPizzaEntries(int firstResult, int maxResults);   
long countAllPizzas();    
Pizza updatePizza(pizza pizza);
void deletePizza(Pizza pizza);
```

Similarly, the PizzaServiceImpl is rather simple:

```java
Copypublic class PizzaServiceImpl implements PizzaService {}
```

Through the AspectJ ITD the `PizzaServiceImpl` type is annotated with the `**@Service**` and `**@Transactional**` annotations by default. Furthermore the ITD will introduce the following methods and fields into the target type:

```java
Copy@Autowired PizzaRepository pizzaRepository;
    
public void savePizza(Pizza pizza) {
    pizzaRepository.save(pizza);
}

public Pizza findPizza(Long id) {
    return pizzaRepository.findOne(id);
}

public List<Pizza> findAllPizzas() {
    return pizzaRepository.findAll();
}

public List<Pizza> findPizzaEntries(int firstResult, int maxResults) {
    return pizzaRepository.findAll(new PageRequest(firstResult / maxResults, maxResults)).getContent();
}

public long countAllPizzas() {
    return pizzaRepository.count();
}

public Pizza updatePizza(Pizza pizza) {
    return pizzaRepository.save(pizza);
}
    
public void deletePizza(Pizza pizza) {
    pizzaRepository.delete(pizza);
}
```

As you can see, Roo will detect if a persistence provider layer exists for a given domain type and automatically inject this component in order to delegate all service layer calls to this layer. In case no persistence (or other 'lower level') layer exists, the service layer ITD will simply provide method stubs.

### Closing Thoughts

Adding architectural layers or persistence options to new or existing Spring Roo managed applications is made almost trivial with Spring Roo 1.2. There is no need to think about configuring your application for new persistence providers or injecting references to the new layers into your Spring MVC controllers, GWT UI or integration tests - Roo will do it all for you!

With the layering support available in Spring Roo 1.2 we expect to see more persistence providers in future. Repository layering integration for [Spring Data Neo4J](http://www.springsource.org/spring-data/neo4j) is currently in the works and should be available soon as [a Roo add-on](http://static.springsource.org/spring-roo/reference/html-single/index.html#usage-add-ons).

If you'd like to easily try out these new features, why not build your own version of the MongoDB-powered [Pizza Shop application](http://roo-pizzashop.cloudfoundry.com/) and [deploy it](http://support.cloudfoundry.com/home) to [Cloud Foundry](http://www.cloudfoundry.com/)? It only takes a few minutes thanks to these new Roo 1.2.0.M1 features.

Given [Spring Roo 1.2.0.M1](http://blog.springsource.com/2011/09/14/spring-roo-1-2-0-m1-released/) is a milestone release, you should keep using Roo 1.1.5 for production projects. However, we do believe Roo 1.2 M1 is suitable for exploring the new features or quick projects.

The Roo team always welcomes feedback [from the community](http://forum.springsource.org/forumdisplay.php?67-Roo).