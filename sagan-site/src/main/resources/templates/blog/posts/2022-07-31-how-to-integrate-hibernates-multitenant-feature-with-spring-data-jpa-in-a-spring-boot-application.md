---
title: How to integrate Hibernates Multitenant feature with Spring Data JPA in a Spring Boot application
source: https://spring.io/blog/2022/07/31/how-to-integrate-hibernates-multitenant-feature-with-spring-data-jpa-in-a-spring-boot-application
scraped: 2026-02-23T10:45:20.483Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Jens Schauder |  July 31, 2022 | 21 Comments
---

# How to integrate Hibernates Multitenant feature with Spring Data JPA in a Spring Boot application

_Engineering | Jens Schauder |  July 31, 2022 | 21 Comments_

For quite some time now, Hibernate has offered a [Multitenant feature](https://docs.jboss.org/hibernate/core/4.1/devguide/en-US/html/ch16.html). It integrates nicely with Spring, but there is not much information about how to actually set it up, so I thought an example or two or three could help.

There is already an excellent [blog article](https://callistaenterprise.se/blogg/teknik/2020/09/19/multi-tenancy-with-spring-boot-part1/), but it is a little dated and it covers a lot of specifics to the business problems the author tried to solve. This approach hides a little of the actual integration, which will be the focus of this article.

Do not worry about the code in this post. You can find links to the full code examples at the end of this blog post.

## [](#what-does-multitenant-mean)[](#what-does-multitenant-mean)What Does Multitenant Mean?

Imagine you build an application. You want to host it yourself and offer the service provided by the application to multiple companies. But the data of the different companies should be cleanly separated.

You have different options to achieve that. The most simple one is deploying your application, including the database, multiple times. While simple in concept, this is a nightmare to administer once you get more than a handful of tenants to serve.

Instead, you want one application deployment that separates the data. Hibernate anticipates three ways to do this:

1.  You can partition your tables. In this context, partitioning means that, in addition to the normal ID fields, your entities have a `tenantId`, which is also part of the primary key.
    
2.  You can store data for different tenants in separate but otherwise identical schemas.
    
3.  Or you can have a database per tenant.
    

Of course, you can dream up different schemes where the biggest customers get their database, medium-sized customers get their schema, and all the others end up in partitions, but I stick with the simple variants for these examples.

## [](#example-0-no-tenants)[](#example-0-no-tenants)Example 0: No tenants.

For the examples, we can use a single simple entity:

```
Copy@Entity
public class Person {

	@Id
	@GeneratedValue
	private Long id;

	private String name;

	// getter and setter skipped for brevity.
}
```

Since we want to use Spring Data JPA, we have a repository, called `Persons`:

```
Copyinterface Persons extends JpaRepository<Person, Long> {
	static Person named(String name) {
		Person person = new Person();
		person.setName(name);
		return person;
	}
}
```

We can get the application setup through [http://start.spring.io](http://start.spring.io), and then we are ready to introduce tenants.

## [](#example-1-partitioned-data)[](#example-1-partitioned-data)Example 1: Partitioned data.

For this example, we need to modify the entity. It needs a special tenant ID:

```
Copy@Entity
public class Person {

	@TenantId
	private String tenant;

	// the rest of the class is unchanged just as shown above.
}
```

Since the tenant ID is to be set when storing an entity and added to `where` clauses when loading an entity, we need something that provides a value for it. For this purpose, Hibernate requires a `CurrentTenantIdentifierResolver` to be implemented.

A simple version could look like this:

```
Copy@Component
class TenantIdentifierResolver implements CurrentTenantIdentifierResolver, HibernatePropertiesCustomizer {

	private String currentTenant = "unknown";

	public void setCurrentTenant(String tenant) {
		currentTenant = tenant;
	}

	@Override
	public String resolveCurrentTenantIdentifier() {
		return currentTenant;
	}

	@Override
	public void customize(Map<String, Object> hibernateProperties) {
		hibernateProperties.put(AvailableSettings.MULTI_TENANT_IDENTIFIER_RESOLVER, this);
	}

	// empty overrides skipped for brevity
}
```

I would like to point out three things with this implementation:

1.  It has a `@Component` annotation. This means that it is a bean and can get injected or get other beans injected as your requirements demand.
    
2.  It only has a simple value for the `currentTenant`. In a real application, you would either use a different scope (like `request`, for example) or get the value from some other bean that is appropriately scoped.
    
3.  It implements `HibernatePropertiesCustomizer` to register itself with Hibernate. In my opinion, this should not be necessary. You can follow [this Hibernate issue](https://hibernate.atlassian.net/browse/HHH-15422) to see if the Hibernate team agrees.
    

Let us test what effect all this has on the behavior of our repository and entities:

```
Copy@SpringBootTest
@TestExecutionListeners(listeners = {DependencyInjectionTestExecutionListener.class})
class ApplicationTests {

	static final String PIVOTAL = "PIVOTAL";
	static final String VMWARE = "VMWARE";

	@Autowired
	Persons persons;

	@Autowired
	TransactionTemplate txTemplate;

	@Autowired
	TenantIdentifierResolver currentTenant;

	@Test
	void saveAndLoadPerson() {

		Person adam = createPerson(PIVOTAL, "Adam");
		Person eve = createPerson(VMWARE, "Eve");

		assertThat(adam.getTenant()).isEqualTo(PIVOTAL);
		assertThat(eve.getTenant()).isEqualTo(VMWARE);

		currentTenant.setCurrentTenant(VMWARE);
		assertThat(persons.findAll()).extracting(Person::getName).containsExactly("Eve");

		currentTenant.setCurrentTenant(PIVOTAL);
		assertThat(persons.findAll()).extracting(Person::getName).containsExactly("Adam");
	}

	private Person createPerson(String schema, String name) {

		currentTenant.setCurrentTenant(schema);

		Person adam = txTemplate.execute(tx ->
				{
					Person person = Persons.named(name);
					return persons.save(person);
				}
		);

		assertThat(adam.getId()).isNotNull();
		return adam;
	}
}
```

As you can see, although we never explicitly set the tenant, it is appropriately set by Hibernate behind the scenes. Also, the `findAll` test includes a filter to the set tenant. But does it work for all variants of queries? Spring Data JPA uses a few different variants of queries:

1.  Queries based on the Criteria API. `deleteAll` is one case, so we can consider this case covered. Specifications, Query By Example, and Query Derivation all use the same.
    
2.  Some queries are implemented directly by the `EntityManager` — most notably, `getById`.
    
3.  If the user provides a query, it may be a JPQL query.
    
4.  A native SQL query.
    

So let us test the three cases not yet covered by our test:

```
Copy@Test
void findById() {

	Person adam = createPerson(PIVOTAL, "Adam");
	Person vAdam = createPerson(VMWARE, "Adam");

	currentTenant.setCurrentTenant(VMWARE);
	assertThat(persons.findById(vAdam.getId()).get().getTenant()).isEqualTo(VMWARE);
	assertThat(persons.findById(adam.getId())).isEmpty();
}

@Test
void queryJPQL() {

	createPerson(PIVOTAL, "Adam");
	createPerson(VMWARE, "Adam");
	createPerson(VMWARE, "Eve");

	currentTenant.setCurrentTenant(VMWARE);
	assertThat(persons.findJpqlByName("Adam").getTenant()).isEqualTo(VMWARE);

	currentTenant.setCurrentTenant(PIVOTAL);
	assertThat(persons.findJpqlByName("Eve")).isNull();
}

@Test
void querySQL() {

	createPerson(PIVOTAL, "Adam");
	createPerson(VMWARE, "Adam");

	currentTenant.setCurrentTenant(VMWARE);
	assertThatThrownBy(() -> persons.findSqlByName("Adam"))
			.isInstanceOf(IncorrectResultSizeDataAccessException.class);
}
```

As you can see, both JPQL and `EntityManager` work as one would expect.

Unfortunately, the SQL-based query does not take the tenant into account. You should be aware of this when writing multi-tenant applications.

## [](#example-2-schema-per-tenant)[](#example-2-schema-per-tenant)Example 2: Schema per tenant.

To separate our data into different schemas, we still need the `CurrentTenantIdentifierResolver` implementation shown earlier. We revert the entity to its original state without the tenant ID. Instead of the tenant ID being in the entity, we now need an additional piece of infrastructure, the implementation of `MultiTenantConnectionProvider`:

```
Copy@Component
class ExampleConnectionProvider implements MultiTenantConnectionProvider, HibernatePropertiesCustomizer {

	@Autowired
	DataSource dataSource;

	@Override
	public Connection getAnyConnection() throws SQLException {
		return getConnection("PUBLIC");
	}

	@Override
	public void releaseAnyConnection(Connection connection) throws SQLException {
		connection.close();
	}

	@Override
	public Connection getConnection(String schema) throws SQLException {
		Connection connection = dataSource.getConnection();
		connection.setSchema(schema);
		return connection;
	}

	@Override
	public void releaseConnection(String s, Connection connection) throws SQLException {
		connection.setSchema("PUBLIC");
		connection.close();
	}

	@Override
	public void customize(Map<String, Object> hibernateProperties) {
		hibernateProperties.put(AvailableSettings.MULTI_TENANT_CONNECTION_PROVIDER, this);
	}

	// empty overrides skipped for brevity
}
```

It is responsible for providing connections that use the correct schema. Note that we also need a way to create a connection without a defined tenant or schema being used to access metadata during start-up of the application. Again, we have registered the bean by implementing `HibernatePropertiesCustomizer`.

Note that we have to provide the schema setup for all database schema. So our `schema.sql` now looks like this:

```
Copycreate schema if not exists pivotal;
create schema if not exists vmware;

create sequence pivotal.person_seq start with 1 increment by 50;
create table pivotal.person (id bigint not null, name varchar(255), primary key (id));

create sequence vmware.person_seq start with 1 increment by 50;
create table vmware.person (id bigint not null, name varchar(255), primary key (id));
```

Note that the public schema is created automatically and does not contain any tables.

With that infrastructure in place, we can test the behavior.

```
Copy@SpringBootTest
@TestExecutionListeners(listeners = {DependencyInjectionTestExecutionListener.class})
class ApplicationTests {

	public static final String PIVOTAL = "PIVOTAL";
	public static final String VMWARE = "VMWARE";
	@Autowired
	Persons persons;

	@Autowired
	TransactionTemplate txTemplate;

	@Autowired
	TenantIdentifierResolver currentTenant;

	@Test
	void saveAndLoadPerson() {

		createPerson(PIVOTAL, "Adam");
		createPerson(VMWARE, "Eve");

		currentTenant.setCurrentTenant(VMWARE);
		assertThat(persons.findAll()).extracting(Person::getName).containsExactly("Eve");

		currentTenant.setCurrentTenant(PIVOTAL);
		assertThat(persons.findAll()).extracting(Person::getName).containsExactly("Adam");
	}

	private Person createPerson(String schema, String name) {

		currentTenant.setCurrentTenant(schema);

		Person adam = txTemplate.execute(tx ->
				{
					Person person = Persons.named(name);
					return persons.save(person);
				}
		);

		assertThat(adam.getId()).isNotNull();
		return adam;
	}
}
```

The tenant does not get set on the entity any more, since this property does not even exist. Also, since the connection controls the data access, this approach does work even with native queries.

## [](#example-3-database-per-tenant)[](#example-3-database-per-tenant)Example 3: Database per tenant.

The final variant uses a separate database per tenant. The Hibernate setup is quite similar to the previous example, but the `MultiTenantConnectionProvider` implementation now has to provide connections to different databases. I decided to do that in a Spring Data-specific way.

The connection provider need not do anything:

```
Copy@Component
public class NoOpConnectionProvider implements MultiTenantConnectionProvider, HibernatePropertiesCustomizer {

	@Autowired
	DataSource dataSource;

	@Override
	public Connection getAnyConnection() throws SQLException {
		return dataSource.getConnection();
	}

	@Override
	public void releaseAnyConnection(Connection connection) throws SQLException {
		connection.close();
	}

	@Override
	public Connection getConnection(String schema) throws SQLException {
		return dataSource.getConnection();
	}

	@Override
	public void releaseConnection(String s, Connection connection) throws SQLException {
		connection.close();
	}

	@Override
	public void customize(Map<String, Object> hibernateProperties) {
		hibernateProperties.put(AvailableSettings.MULTI_TENANT_CONNECTION_PROVIDER, this);
	}

	// empty overrides skipped for brevity
}
```

Instead, the heavy lifting is done by an extension of `AbstractRoutingDataSource`:

```
Copy@Component
public class TenantRoutingDatasource extends AbstractRoutingDataSource {

	@Autowired
	private TenantIdentifierResolver tenantIdentifierResolver;

	TenantRoutingDatasource() {

		setDefaultTargetDataSource(createEmbeddedDatabase("default"));

		HashMap<Object, Object> targetDataSources = new HashMap<>();
		targetDataSources.put("VMWARE", createEmbeddedDatabase("VMWARE"));
		targetDataSources.put("PIVOTAL", createEmbeddedDatabase("PIVOTAL"));
		setTargetDataSources(targetDataSources);
	}

	@Override
	protected String determineCurrentLookupKey() {
		return tenantIdentifierResolver.resolveCurrentTenantIdentifier();
	}

	private EmbeddedDatabase createEmbeddedDatabase(String name) {

		return new EmbeddedDatabaseBuilder()
				.setType(EmbeddedDatabaseType.H2)
				.setName(name)
				.addScript("manual-schema.sql")
				.build();
	}
}
```

This approach would even work without the Hibernate Multitenant feature. By using the `CurrentTenantIdentifierResolver`, Hibernate is aware of the current tenant. It asks the connection provider for an appropriate connection, but that ignores the tenant information and relies on the `AbstractRoutingDataSource` to already have switched to the correct actual `DataSource`.

The test looks and behaves exactly as in the schema-based variant — no need to repeat it here.

## [](#conclusion)[](#conclusion)Conclusion

Hibernate’s Multitenant feature integrates nicely with Spring Data JPA. Be sure to avoid SQL queries when using partitioned tables. When separating by the database, you might use `AbstractRoutingDataSource` for a solution that does not depend on Hibernate.

The [Spring Data Examples Git repository](https://github.com/spring-projects/spring-data-examples) contains the [example projects for all three approaches](https://github.com/spring-projects/spring-data-examples/tree/main/jpa/multitenant) on which this article is based.