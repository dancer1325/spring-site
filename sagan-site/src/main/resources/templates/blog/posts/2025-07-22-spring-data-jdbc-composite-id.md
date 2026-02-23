---
title: Spring Data JDBC and R2DBC 4.0 will support Composite IDs
source: https://spring.io/blog/2025/07/22/spring-data-jdbc-composite-id
scraped: 2026-02-23T07:35:14.352Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Jens Schauder |  July 22, 2025 | 1 Comment
---

# Spring Data JDBC and R2DBC 4.0 will support Composite IDs

_Engineering | Jens Schauder |  July 22, 2025 | 1 Comment_

I'm happy to announce, that Spring Data JDBC and R2DBC finally support Composite IDs starting with version 4.0.0-M4.

Most of you probably know, but just to make sure everyone has the same understanding: From the database point of view a composite id (or composite key) is a primary key that consists of more than one column. On the Java side these columns get mapped to an entity with an attribute for each column Usage should be straight forward and I'll demonstrate it in the following article for JDBC. Usage in R2DBC is anlogous.

To get started just put an `@Id` annotation on a field in your aggregate root that references an entity, instead of a simple type.

```java
Copyclass Employee {

	@Id
	EmployeeId id;

	String name;

	// ...
}

record EmployeeId(
		Organization organization,
		Long employeeNumber) {
}

enum Organization {
	RND,
	SALES,
	MARKETING,
	PURCHASING
}
```

That reference becomes automatically an embedded reference, i.e. the fields of the entity become columns of the table of the aggregate root.

```sql
Copycreate table employee
(
    organization    varchar(20),
    employee_number int,
    name            varchar(100)
);
```

If you want to tweak the names you may add an `@Embedded` annotation, which allows you to provide a prefix. It does look a little weird to specify what should happen when upon loading the entity is all null values. But with `Embedded` you have to although a primary key that is `null` will cause problems all over the place and just won't work.

```java
Copyclass Employee {

	@Id
	@Embedded.Nullable(prefix = "id_")
	EmployeeId id;

	String name;
	
	// ... 
}

```

```sql
Copycreate table employee
(
    id_organization    varchar(20),
    id_employee_number int,
    name            varchar(100)
);
```

Just as with normal ids Spring Data Relational uses the the value of id as an indication for new entities: If the id value is `null`, then the entity is considered new and an insert will be performed. If the id value is not `null`, an update is in order.

When saving a new entity with composite id you now face a minor problem: Composite Ids can't easily be generated via and autoincrement column, since it by definition consists of multiple columns. One way to handle this is to have a `BeforeConvertCallback`

```java
Copy@Bean
BeforeConvertCallback<Employee> idGeneration() {
	return new BeforeConvertCallback<>() {
		AtomicLong counter = new AtomicLong();

		@Override
		public Employee onBeforeConvert(Employee employee) {
			if (employee.id == null) {
				employee.id = new EmployeeId(Organization.RND, counter.addAndGet(1));
			}
			return employee;
		}
	};
}
```

```java
Copyrepository.save(new Employee("Mark Paluch"));
```

In most cases with composite id it is probably easier to set the id upfront and either use optimistic locking, i.e. a `null` version field will mark the entity as new, or explicitely call `JdbcAggregateTemplate.insert`.

```java
Copyinterface EmployeeRepository extends Repository<Employee, EmployeeId>, InsertRepository<Employee> {
	Employee findById(EmployeeId id);

	Employee save(Employee employee);
}
```

```java
Copyinterface InsertRepository<E> {
	E insert(E employee);
}
```

```java
Copyclass InsertRepositoryImpl<E> implements InsertRepository<E> {
	@Autowired
	private JdbcAggregateTemplate template;
	@Override
	public E insert(E employee) {
		return template.insert(employee);
	}
}
```

```java
Copy@Autowired
EmployeeRepository repository;

// ...

repository.insert(new Employee(new EmployeeId(Organization.RND, 23L), "Jens Schauder"));
```

I hope you find this new addition to Spring Data Relational useful. The full code for the samples used in this article can be found at [https://github.com/spring-projects/spring-data-examples/tree/main/jdbc/composite-ids](https://github.com/spring-projects/spring-data-examples/tree/main/jdbc/composite-ids).

If you find bugs or have ideas for improvements, please create a ticket at [https://github.com/spring-projects/spring-data-relational/issues](https://github.com/spring-projects/spring-data-relational/issues).