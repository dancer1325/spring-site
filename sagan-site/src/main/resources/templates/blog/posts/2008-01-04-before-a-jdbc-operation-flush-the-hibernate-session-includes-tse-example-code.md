---
title: Before a JDBC operation, flush the Hibernate Session (includes TSE example code)
source: https://spring.io/blog/2008/01/04/before-a-jdbc-operation-flush-the-hibernate-session-includes-tse-example-code
scraped: 2026-02-24T09:22:03.902Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Alef Arendsen |  January 04, 2008 | 0 Comments
---

# Before a JDBC operation, flush the Hibernate Session (includes TSE example code)

_Engineering | Alef Arendsen |  January 04, 2008 | 0 Comments_

Mixing code in one and the same transaction that uses an Object-Relational Mapper with code that doesn't, can cause issues with data not being available in the underlying database when it should be. Since this is a situation I come across once every now and then, I figured it would be helpful for all if I write down my solution to this problem.

In short: what I will present in the remainder of this post is an aspect that triggers the underlying persistence mechanism (JPA, Hibernate, TopLink) to send any dirty data to the database.

I presented this aspect by the way during one of my sessions at [The Spring Experience](http://www.thespringexperience.com) last December and this post also has the source code for those of you who were waiting for it.

### The need for mixing usage of ORM engines with straight JDBC

In many enterprise applications, an Object-Relational Mapping engine is used to manage the storage and retrieval of (sometimes complex) domain models. I don't think I have to argue that in situations where a heavily interlinked domain model needs to be persisted an ORM tool might increase productivity not to speak of efficiency over straight JDBC.

This does not mean however that writing explicit SQL in an application can be completely disposed of. In many situations, one still needs to write the occasional SQL query to satisfy a certain requirement in an application. I usually see several reasons why people still write SQL queries by hand and execute them in Java code such as:

-   Testing code: code that uses an ORM tool still needs to be tested. To be absolutely certain that a piece of data access code (using an ORM tool) is correctly inserting records in the database, one need to verify the database itself... using straight SQL queries. I consider it a very good practice to for example first insert an object using an ORM tool to then verify the number of rows has increased
-   Stored procedures: it's best to call stored procedures with a JDBC call instead of via clunky APIs. I really don't want to get into the [debate](http://discuss.joelonsoftware.com/default.asp?joel.3.187483.43) [whether](http://www.codinghorror.com/blog/archives/000117.html) or not [stored](http://andrewsquire.spaces.live.com/blog/cns!C6B693813503C90D!144.entry) [procedures](http://discuss.joelonsoftware.com/default.asp?joel.3.186548.7) are good. If you're into that, just read some of these posts. Story is: I come across projects frequently that use stored procs and want to mix code that does so with code that uses an ORM engine. For example to first insert several new objects, after which an aggregation needs to be performed over the newly inserted records and the records already available.
-   Operations that involves a very large amount of similar objects. This could be the case when for example you need to set the canceled flag of a million orders from *true* to *false*. I personally might not want to use an ORM engine for this (sometimes even if the ORM engine has a clean DML to handle the dirty work for me).

### Issue with mixing ORM operations with straight SQL

There is one big issue with mixing operations executed by an ORM engine with operations using straight SQL in your application. To understand this, first have a look at the following piece of pseudo code (considering the database is empty):

```code
Copystart transaction

create part with name Bolt
associate with ORM engine (i.e. save using entity manager)

update part set stock = 15 where name='Bolt'

end transaction
```

The update statement here will fail, although we *did* associate the part with the entity manager (in other words: asked the entity manager to persist it for us). The entity manager will however not have inserted the record in the database right as a result of you associating it with the entity manager. This is called write-behind--something virtually all ORM engines implement. Dirty state in the entity manager (such as our newly created part instance) will not be sent to the database (using SQL statements) immediately, but (usually) only when the transaction ends.

As you might have figured out by now as a general rule, this concept of write-behind can cause serious issues when at certain points in time, you expect data to be available in the database when it's not (yet)!

### Solving the problem the right way

There are several solutions to this problem. One (very ignorant) solution would be to simply say: let's change the pseudo code a bit to include two transactions:

```code
Copystart transaction
create part with name Bolt
associate with ORM engine (i.e. save using entity manager)
end transaction

start transaction
update part set stock = 15 where name='Bolt'
end transaction
```

For obvious reasons, this is not the right solution. Solving the problem this way would result in two separate transactions. If the idea was for these two actions to be executed in one atomic operation, this is not the case anymore.

The right solution here would be to have the ORM engine *save its changes to the database before the SQL query executes*. Fortunately both [JPA](http://java.sun.com/javaee/5/docs/api/javax/persistence/EntityManager.html#flush\(\)) as well as [Hibernate](http://www.hibernate.org/hib_docs/v3/api/org/hibernate/Session.html#flush\(\)) for example offer ways to do this. Forcing an ORM engine to save its changes to the database is called **flushing**. With this in mind, we can modify the pseudo code to make it work:

```code
Copystart transaction

create part with name Bolt
associate with ORM engine (i.e. save using entity manager)

*** flush

update part set stock = 15 where name='Bolt'

end transaction
```

### Solving the problem in the right place

Now that we have solved the problem, let's put this code into context. I've previously used the [CarPlant example](http://blog.interface21.com/main/2007/03/12/carplant-not-accepting-null-carmodels/) to illustrate certain things and I will do this again now. The following sequence diagram shows the CarPartsInventory first inserting a part using the Hibernate Session, after which it is updating the stock using a Spring JdbcTemplate (using a straight JDBC connection underneath). All this runs inside one transaction. ![hib-flush1.png](http://blog.springsource.com/main/wp-content/uploads/2008/01/hib-flush1.png)

If we translate the pseudo code directly to Java code, we have to add the flush() call and that's where a tough question comes up: where do we put the flush() call: do we make it part of the addPart() call (right after we've associated the part with the Session) or do we make it part of the updateStock() call (before the UPDATE statement is issued).

Whatever way you look at it, both are evil:

-   Making it part of the addPart() call essentially defeats the whole concept of write-behind. Write after inserting a part, we immediately force Hibernate to flush the session, therefore it is not capable of optimizing anymore in case multiple parts need to be inserted in the same transaction
-   Making it part of the updateStock() call is better when looking at the previous argument, but what if there is an additional SQL statement that needs to be executed, do we need to add the flush() call there as well?

![hib-flush2.png](http://blog.springsource.com/main/wp-content/uploads/2008/01/hib-flush2.png)

Concluding we have three requirements (adding the part, updating it and flushing the session) and only two places we can add code to to get solve the requirement. This is where where aspect-orientation comes in. Aspect-oriented programming techniques essentially give up an additional place we can add code to to solve this requirement. In other words, it allows us to solve each requirement in its own separate module.

### Implementing the three requirements in three different modules

Let's tackle each requirement in a separate module. Fortunately, the first two requirements are pretty straightforward:

**Inserting a new part**

```java
Copy
private SessionFactory sessionFactory;

public void insertPart(Part p) {
	sessionFactory.getCurrentSession().save(p);
}
```

Using the Hibernate SessionFactory, we obtain a session. The session is used to save the new part.

**Updating the stock of a part**

```java
Copy
private SimpleJdbcTemplate jdbcTemplate;

public void updateStock(Part p, int stock) {
	jdbcTemplate.update("update stock set stock = stock + ? where number=?", 
		stock, p.getNumber());
}
```

**Synchronizing the session** As a general rule, we can say that *whenever a JDBC operation is about to take place, first flush the session if it is dirty*. We can re-phrase this to *before a call to a JDBC operation, flush the Hibernate session if it's dirty*. There are two important element in this phrase. The last part specified *what* we want to do. The first part answer the question *where* and *when* we want to execute the flushing behavior.

-   **when**: before
-   **where**: a call to a JDBC operation
-   **what**: flush a dirty Hibernate session

It is easy to translate this to AspectJ if one knows the AspectJ language. Even if you do not want to use AspectJ, it is possible to get this behavior in place by using Spring AOP.

```java
Copy
public aspect HibernateStateSynchronizer {

	private SessionFactory sessionFactory;
	
	public void setSessionFactory(SessionFactory sessionFactory() {
		this.sessionFactory = sessionFactory;
	}

	pointcut jdbcOperation() : 
		call(* org.springframework.jdbc.core.simple.SimpleJdbcTemplate.*(..));
		
	before() jdbcOperation() {
		Session session = sessionFactory.getCurrentSession();
		if (session.isDirty()) {
			session.flush();
		}
	}
}
```

This aspect will implement the required behavior; it will flush the Hibernate session whenever a JDBC operation is about to take place.

### Variations

There are a few things to keep in mind when reviewing this aspect.

First of all, the places where you want this behavior to be applied may vary. The example above applies the behavior to all calls to methods on the SimpleJdbcTemplate. This might be too much for your taste. The pointcut can easily be modified to apply the behavior to methods annotated by a certain annotation (think: execution(@JdbcOperation \*(..))).

Secondly, you might wonder what might happen if there is no Hibernate Session available. SessionFactory.getCurrentSession() always creates a new Session in a Spring-managed environment. If you want this aspect to work, even if there is no SessionFactory at all, or if no Session has been created yet (and you do not want one to be created), you should modify the aspect to use the SessionFactoryUtils class from Spring. This class has methods that allow you to ask for a Session and not get one back if none is available.

### Source code

The source code accompanying this entry implements the HibernateStateSynchronizer aspect using AspectJ. It would be pretty straightforward to modify this aspect to make it work with Spring AOP however.

The HibernateCarPartsInventoryTests test case illustrates the behavior. When the aspect is enabled, the testAddPart() method succeeds. When the aspect it disabled (by excluding it from the build path for example, or by commenting the before() advice), the test will fail, because the count statement the same amount of records every time it executed (in other words, the part is not present in the database at the time the query executes).

In the current setup, the before advice is commented out, so the test will **fail**. Note that the pom.xml file for this project includes the Maven AspectJ plugin. There might be some warnings about version conflicts (caused by the plugin using a different AspectJ version than the project itself), but despite those warnings being there, it should still work.

The source code: [carplant.zip](http://blog.springsource.com/main/wp-content/uploads/2008/01/carplant.zip)