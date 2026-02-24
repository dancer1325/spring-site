---
title: What\'s New in Spring Integration 2.2 (Part 3 – JPA Support)
source: https://spring.io/blog/2012/10/05/what-s-new-in-spring-integration-2-2-part-3-jpa-support
scraped: 2026-02-24T08:15:48.695Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Gunnar Hillert |  October 05, 2012 | 0 Comments
---

# What's New in Spring Integration 2.2 (Part 3 – JPA Support)

_Engineering | Gunnar Hillert |  October 05, 2012 | 0 Comments_

This is the third part in a series of blog posts highlighting some of the new features available in [Spring Integration](http://www.springsource.org/spring-integration/) 2.2 following the recent release of [Release Candidate 1](http://www.springsource.org/node/3665). The [first part](http://blog.springsource.org/2012/09/24/whats-new-in-spring-integration-2-2-rc1-part-1-mongodb/) described the new set of [MongoDB](http://www.mongodb.org/) adapters. In [part two](http://blog.springsource.org/2012/09/26/whats-new-in-spring-integration-2-2-part-2-transaction-synchronization/) we highlighted the new extended support for synchronizing non-transactional resources with transactions.

In this third part today, we would like to introduce the new [Java Persistence API](http://en.wikipedia.org/wiki/Java_Persistence_API) (JPA) support that is provided starting with *Spring Integration 2.2*. The JPA module is persistence-provider-agnostic and has been tested using:

-   [Hibernate](http://www.hibernate.org/)
-   [OpenJPA](http://openjpa.apache.org/)
-   [EclipseLink](http://www.eclipse.org/eclipselink/jpa.php)

As part of the new JPA module, we provide several components for retrieving and persisting JPA entity objects:

-   JPA Inbound Channel Adapter
-   JPA Outbound Channel Adapter
-   JPA Updating Outbound Gateway
-   JPA Retrieving Outbound Gateway

Using these components, you can select, create, update and delete entities in your database. Besides persisting data using the entity classes directly, you can also execute queries using the [Java Persistence Query Language](http://docs.oracle.com/javaee/6/tutorial/doc/bnbtg.html) (JPQL) as well as using native SQL queries. Additionally, named queries are supported as well.

### The JPA Sample

In our [Spring Integration Samples](https://github.com/SpringSource/spring-integration-samples) repository, we provide [a sample application](https://github.com/SpringSource/spring-integration-samples/tree/master/basic/jpa) demonstrating the JPA support, which we want to use in this blog post to show you how to easily get started.

The provided sample is using an embedded [H2 database](http://www.h2database.com/) which contains a single table called **PEOPLE**. This table is mapped to the **Person** entity class in package *org.springframework.integration.samples.jpa*. With that setup we cover two simple use-cases:

-   List all people from the database
-   Create a new Person record in the database

The corresponding Spring Integration flow is quite simple as well. The flow is started via a [Messaging Gateway](http://static.springsource.org/spring-integration/docs/2.2.0.RC1/reference/html/messaging-endpoints-chapter.html#gateway). This allows us to hide the Spring Integration messaging API and to only expose a plain Java interface (**PersonService**) to the sample's *Main* class (org.springframework.integration.samples.jpa.Main). Depending on which method is invoked on the *PersonService*, the Spring Integration message will be routed to either a *JPA Retrieving Outbound Gateway* (List all people) or a *JPA Updating Outbound Gateway* (Create a new Person).

[![](http://blog.springsource.org/wp-content/uploads/2012/10/http-outbound-gateway-s.png "Jpa Flow")](http://blog.springsource.org/wp-content/uploads/2012/10/http-outbound-gateway-s.png)

### Execute the Sample

In order to set the sample up, please checkout the [Spring Integration Samples repository](https://github.com/SpringSource/spring-integration-samples) using [Git](http://git-scm.com/):

```xml
Copy
    $ git clone https://github.com/SpringSource/spring-integration-samples.git
```

Next, go to the JPA sample directory:

```xml
Copy
    $ cd spring-integration-samples/basic/jpa
```

Now we can build and run the application by executing the following [Maven](http://maven.apache.org/) command:

```xml
Copy
    $ mvn clean package exec:exec
```

Eventually the application starts up and you should see the following screen:

```xml
Copy
=========================================================

    Welcome to the Spring Integration JPA Sample!

    For more information please visit:
    http://www.springintegration.org/

=========================================================
Please enter a choice and press enter:
	1. Use Hibernate
	2. Use OpenJPA
	3. Use EclipseLink
	q. Quit the application
Enter you choice:
```

The JPA sample allows you to execute the JPA operations using one of the following persistance providers: Hibernate, OpenJPA or EclipseLink. At application startup you will therefore be able to choose the desired persistence provider. Once selected, you can select which specific JPA operation to execute:

```xml
Copy
Please enter a choice and press enter:
	1. List all people
	2. Create a new person
	q. Quit the application
Enter you choice:
```

You can either list each **Person** from the **PEOPLE** table (Option 1):

```xml
Copy
Enter you choice: 1
ID            NAME         CREATED
==================================
1001, Cartman, 2012-10-04 16:14:02
==================================
```

or you can create a new **Person** (Option 2):

```xml
Copy
Enter the Person's name:Demo User
Created person record with id: 1002
Do you want to create another person? (y/n)
...
```

### Configuration Details

The JPA sample is configured using several Spring XML Application Context files. For the most part, Spring Integration's JPA support uses the JPA support provided by the core Spring Framework. Thus, the common JPA configuration is located at:

```xml
Copy
/src/main/resources/META-INF/spring/integration/commonJpa-context.xml
```

This file does not contain anything Spring Integration specific. All we do, is to setup the embedded database, the respective DataSource, the EntityManagerFactory and the Transaction Manager.

The JPA persistence provider specific configuration is located under:

```xml
Copy
/src/main/resources/META-INF/spring/integration/eclipselink-context.xml
/src/main/resources/META-INF/spring/integration/hibernate-context.xml
/src/main/resources/META-INF/spring/integration/openjpa-context.xml
```

As you will see, these configurations are very light-weight, containing only the persistence provider specific [JpaVendorAdapter](http://static.springsource.org/spring/docs/current/javadoc-api/org/springframework/orm/jpa/JpaVendorAdapter.html) bean declarations.

Everything Spring Integration specific is configured in:

```xml
Copy
/src/main/resources/META-INF/spring/integration/spring-integration-context.xml
```

```xml
Copy
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:int="http://www.springframework.org/schema/integration"
	xmlns:int-jpa="http://www.springframework.org/schema/integration/jpa"
	xmlns:jdbc="http://www.springframework.org/schema/jdbc"
	xmlns:tx="http://www.springframework.org/schema/tx"
	xmlns:context="http://www.springframework.org/schema/context"
	xsi:schemaLocation="http://www.springframework.org/schema/jdbc http://www.springframework.org/schema/jdbc/spring-jdbc.xsd
		http://www.springframework.org/schema/integration http://www.springframework.org/schema/integration/spring-integration.xsd
		http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
		http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
		http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd
		http://www.springframework.org/schema/integration/jpa http://www.springframework.org/schema/integration/jpa/spring-integration-jpa.xsd">

	<int:channel id="createPersonRequestChannel"/>
	<int:channel id="listPeopleRequestChannel"/>

	<int:gateway id="personService"
		service-interface="org.springframework.integration.samples.jpa.service.PersonService"
		default-request-timeout="5000" default-reply-timeout="5000">
		<int:method name="createPerson" request-channel="createPersonRequestChannel"/>
		<int:method name="findPeople"   request-channel="listPeopleRequestChannel"/>
	</int:gateway>

	<int-jpa:retrieving-outbound-gateway entity-manager-factory="entityManagerFactory"
		request-channel="listPeopleRequestChannel"
		jpa-query="select p from Person p order by p.name asc">
	</int-jpa:retrieving-outbound-gateway>

	<int-jpa:updating-outbound-gateway entity-manager-factory="entityManagerFactory"
		request-channel="createPersonRequestChannel" >
		<int-jpa:transactional transaction-manager="transactionManager" />
	</int-jpa:updating-outbound-gateway>

	<!-- Depending on the selected profile, users can use different JPA Providers -->

	<beans profile="default, hibernate">
		<import resource="classpath:/META-INF/spring/integration/hibernate-context.xml"/>
	</beans>
	<beans profile="openjpa">
		<import resource="classpath:/META-INF/spring/integration/openjpa-context.xml"/>
	</beans>
	<beans profile="eclipselink">
		<import resource="classpath:/META-INF/spring/integration/eclipselink-context.xml"/>
	</beans>
</beans>
```

Both, the *Retrieving Outbound Gateway* and the *Updating Outbound Gateway* are wired up with an [EntityManagerFactory](http://static.springsource.org/spring/docs/current/javadoc-api/org/springframework/orm/jpa/LocalContainerEntityManagerFactoryBean.html) reference. Alternatively, we also provide means to pass-in a reference to an [EntityManager](http://static.springsource.org/spring-integration/docs/2.2.0.RC1/reference/html/jpa.html#jpa-namespace-support-common-attributes) directly.

The *Retrieving Outbound Gateway* is also configured with an JPQL query to retrieve all people from the database ordered by their name. The *Updating Outbound Gateway* on the other hand does not specify any queries at all. It directly uses the **Person** object that is being passed in as the Spring Integration [Message](http://static.springsource.org/spring-integration/api/org/springframework/integration/Message.html) payload. Ultimately, the **Person** object is passed to the [EntityManager](http://docs.oracle.com/javaee/6/api/javax/persistence/EntityManager.html) and persisted to the database. Furthermore, the *Updating Outbound Gateway* is being declared transactional ensuring that the JPA session is flushed and the data committed to the database.

### Providing Parameters

Not shown in the example above but with the JPA supporting components you are also able to provide parameters for your JPQL/SQL queries. In order to do so, you can use the

```xml
Copy
<int-jpa:parameter/>
```

sub-element. For example, you can provide *Named Parameters* by specifying:

```xml
Copy
<int-jpa:parameter name="myNamedParam" type="java.lang.String" value="myParamValue"/>
```

Alternatively, you can also provide *Positional Parameters* by leaving off the name attribute:

```xml
Copy
<int-jpa:parameter type="java.lang.String" value="myFirstParam"/>
<int-jpa:parameter type="java.lang.Integer" value="2"/>
```

Lastly, if you are using the *Outbound Channel Adapter* or any of the *Outbound Gateways*, you can also provide dynamic parameters using the [Spring Expression Language](http://static.springsource.org/spring/docs/current/spring-framework-reference/html/expressions.html) (SpEL), giving you easy access to values from the Message's payload or its Message headers:

```xml
Copy
<int-jpa:parameter expression="payload.name" name="firstName"/>
```

### Conclusion

We hope that this blog post provides you with an useful overview of the new Spring Integration JPA support. For much more detailed information, please consult the chapter titled [JPA Support](http://static.springsource.org/spring-integration/docs/2.2.0.RC1/reference/html/jpa.html) in the Spring Integration reference manual. Lastly, if you run into any trouble or have additional questions, please feel free to post those to our [Spring Integration Forum](http://forum.springsource.org/forumdisplay.php?42-Integration).

### Resources

-   [Spring Integration Reference Documentation](http://static.springsource.org/spring-integration/docs/2.2.0.RC1/reference/html/jpa.html)
-   [Spring Integration JPA Sample](https://github.com/SpringSource/spring-integration-samples/tree/master/basic/jpa)
-   [Spring Integration Forum](http://forum.springsource.org/forumdisplay.php?42-Integration)
-   [JSR 317: Java™ Persistence 2.0](http://jcp.org/en/jsr/detail?id=317)