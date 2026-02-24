---
title: Green Beans: Putting the Spring in Your Step (and Application)
source: https://spring.io/blog/2010/11/09/green-beans-putting-the-spring-in-your-step-and-application
scraped: 2026-02-24T08:51:28.461Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  November 09, 2010 | 2 Comments
---

# Green Beans: Putting the Spring in Your Step (and Application)

_Engineering | Josh Long |  November 09, 2010 | 2 Comments_

The Spring framework emerged as a de-facto standard in 2003 and has been helping people build bigger, better applications with cleaner code ever since. In this post, we will discuss the options available to you for configuring an application using the Spring component model. We will grow a simple application from the simplest form and rework it to take advantage of some of the many simplifying features in the Spring framework that have made it, and continue to make it, the de-facto standard for applications today.

The modern day enterprise Java application has many collaborating objects that work together in unison to further a goal, usually something of intrinsic business value. This object graph is deep, even in the simple cases. Take, for example, the simple case of a service (perhaps a service that supports working with customer data?) that wants to talk to a database. Such a service needs a datasource and optionally some sort of convenience library to facilitate that database access, be it through JDBC, JPA, JDO, NoSQL options, etc. In such a graph, it is tempting to simply create objects as they are needed, at the site of their use. In such a system, the knowledge of object construction or acquisition is strewn throughout the beans that use them. If - as is the case with a database `javax.sql.DataSource` - that object is needed in more than one place then it's cleaner to setup all the objects in one place and to then share the freshly created instance. This has the advantage of keeping error prone and volatile configuration information in one place where it can be easily changed (such as when database credentials are varied among development and production environments).

This is one of the main reasons people use Spring - because Spring empowers people to centrally describe these collaborating objects. From the earliest versions of Spring, there was an XML file that was used to describe the object graph. In the early days (circa 2003) this file used a DTD, but today uses XML schema. Here's our example service described in Spring's XML format. We'll remove more and more of this XML configuration as we progress. Each `bean` element describes an object that will be created and given an `id`. Each `property` element describes a setter method on the object and the value that should be given to it. These setters are called for you by the Spring application container.

```xml
Copy
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean class="org.springframework.jdbc.datasource.DriverManagerDataSource" id="ds">
        <property name="driverClassName" value="org.h2.Driver"/>
        <property name="url" value="jdbc:h2:~/cs"/>
        <property name="username" value="sa"/>
        <property name="password" value=""/>
    </bean>

    <bean class="org.springframework.jdbc.core.JdbcTemplate" id="jdbcTemplate">
      <constructor-arg ref="ds"/>
    </bean>

    <bean class="org.springframework.samples.DatabaseCustomerService" id="databaseCustomerService">
        <property name="jdbcTemplate" ref="jdbcTemplate"/>
    </bean>

    <bean class="org.springframework.samples.CustomerClient" id="client">
        <property name="customerService" ref="databaseCustomerService"/>
    </bean>

</beans>
```

Simple, right? The nice part is that we can write code against interfaces with no specific implementation knowledge. In the example above we instantiate a `DriverManagerDataSource` and pass it to the constructor of the `JdbcTemplate` instance by using the `ref` attribute. `ref` tells the Spring framework that you want to pass a reference to another bean configured in the same container. Similarly, in our example we pass a reference to the `CustomerClient` instance, but in the consuming Java code we code against the `CustomerService` interface, not the specific type `DatabaseCustomerService`.

This simple setup affords us a lot of indirection and flexibility. Now that the object creation and construction's been moved to the Spring configuration, we can hide really complex setup in the Spring configuration and keep our code none the wiser. One common way of hiding complex construction logic is through the factory pattern. The factory pattern is particularly useful if you are constructing a lot of objects that need to work together, or if you want to take lots of different factors into consideration when creating an object. Essentially, what you're doing is providing a more powerful way to describe object creation than any one class' constructor can naturally do. Spring supports this pattern explicitly. If a bean is configured that implements the `org.springframework.beans.factory.FactoryBean` interface, the `getObject()` method on the interface will be called and the result will be the object that's available in the Spring context. This practice is used extensively in the Spring framework itself to provide convenient ways to construct complex object graphs in a reusable way.

In our example, we are using an embedded database called H2, which is a powerful in-memory Java database. Often, embedded databases are used in a development environment. A common practice is to use an embedded database in development to rapidly test and reset a dataset. Usually, this also entails loading data from a SQL script to bootstrap the embedded database. The Spring framework provides explicit support for configuring an embedded datasource and then evaluating scripts against the `javax.sql.DataSource`.

**Environment Specific Beans in Spring 3.1 -** In the next iteration of the Spring framework, we'll introduce support for *environment specific* beans. Environment specific beans provide a more direct way of switching beans "on" based on whether some environmental switch is true. This is useful in a few well-defined scenarios where bean configuration varies drastically in different environments. The example here - of using an embedded database in testing but another `javax.sql.DataSource` in production is just such a scenario. There are, of course, other ways of acheiving the same flexibiltiy using Spring 3.0 or earlier, including `FactoryBean`s and `PropertyPlaceHolderConfigurer`s.

Revisiting our earlier example, we might declare our `javax.sql.DataSource` called `ds` like this, instead:

```xml
Copy    <bean id="ds" class="org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseFactoryBean">
        <property name="databaseType" value="H2"/>
        <property name="databasePopulator">
            <bean class="org.springframework.jdbc.datasource.init.ResourceDatabasePopulator">
                <property name="scripts" value="setup.sql"/>
            </bean>
        </property>
    </bean> 
```

This `FactoryBean` takes care of reading any SQL scripts (I only specified one file called `setup.sql` here, though you can specify as many as you like, comma separated) and loading them into the database, and then returning a `javax.sql.DataSource` instance in a simple, convenient way.

We've seen the powerful punch a `FactoryBean` can pack. A well designed `FactoryBean` will surface the options that are most likely going to be useful in setting up an object, and at runtime it will also provide feedback on invalid configurations of the various options. However, XML can provide even more guidance at design time through the validation provided by XML schemas. This is why the Spring framework has long supported the use of XML schema-based namespaces that describe enable even more feedback and simplification. Let's revisit the embedded database example. The Spring framework provides a namespace for configuring an embedded datasource. To use a namespace in Spring, you simply qualify the namespace and add a reference to the `schemaLocation` element. The previous Spring configuration file, when revised to support the JDBC XML namespace, looks like this:

```xml
Copy<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:jdbc="http://www.springframework.org/schema/jdbc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans  http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/jdbc http://www.springframework.org/schema/jdbc/spring-jdbc.xsd">
  <!-- ...  same as before ... -->
</beans>
```

This declaration will enable qualified elements in the namespace to be proposed in any modern IDE's XML autocompletion feature. With this installed, we can now replace our previous declaration with something even more succinct.

```xml
Copy   <jdbc:embedded-database id="ds" type="H2">
        <jdbc:script location="classpath:setup.sql"/>
   </jdbc:embedded-database>
```

This is functionally equivalent to the previous example: it creates an embedded database and it evaluates the contents of the script when the embedded database is started. It creates an object of type `javax.sql.DataSource`, just as before. We've handily reduced that embedded database to its essence. It would seem our job is done, and that we can move on, right? Well, not quite. There's still much we can do to remove the configuration even more. Some of the code shown here is custom code that we've written. If we're willing to annotate the code, then we can let Spring just figure out the right thing to do for us, instead of having to spell it out explicitly. To do this, we need to add the context namespace to our file and enable component scanning. Component scanning scans for beans with certain annotations on them and automatically registers them. Similarly, annotations discovered on the class itself will be processed. Here's the revised XML file with the appropriate XML namespace included.

```xml
Copy
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns:context="http://www.springframework.org/schema/context"
 	  xsi:schemaLocation="... http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

    <context:component-scan base-package="org.springframework.samples"/>
    <!-- ...  same as before ... -->
</beans>
```

All beans that we annotate in the `org.springframework.samples` package with the Spring framework's `@Component` annotation will be picked up and registered as beans with the context, exactly as if we had configured them using `bean` elements in XML. We've annotated the `DatabaseCustomerService` and `CustomerClient` classes with `@Component`, which lets us remove the equivalent `bean` elements for those beans from the XML configuration. Component scanning is very convenient because Spring does much of the heavy lifting, though it decentralizes configuration.

We know that this bean has a dependency on a `JdbcTemplate`. The `JdbcTemplate` is configured in the context already. As there is only one configured, we can simply annotate the setter on the class with `@Autowired,` which tells Spring to resolve the dependency by type and inject it. If there are multiple instances configured in the context then an error would be thrown in this case.

**Annotations for Dependency Resolution -** There are many ways to tell Spring which bean to inject above and beyond `@Autowired`. You may use JSR 330-supported annotations like [`@javax.inject.Inject`](http://static.springsource.org/spring/docs/3.0.x/spring-framework-reference/htmlsingle/spring-framework-reference.html#beans-autowired-annotation), or JSR 250's [`@javax.annotation.Resource`](http://static.springsource.org/spring/docs/3.0.x/spring-framework-reference/htmlsingle/spring-framework-reference.html#beans-resource-annotation), or Spring's [`@Value`](http://static.springsource.org/spring/docs/3.0.x/spring-framework-reference/htmlsingle/spring-framework-reference.html#new-feature-java-config) annotation.

```java
Copypackage org.springframework.samples;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class DatabaseCustomerService implements CustomerService {
    private JdbcTemplate jdbcTemplate;
    private RowMapper<Customer> customerRowMapper = new CustomerRowMapper();

    public Customer getCustomerById(long id) {
        return jdbcTemplate.queryForObject(
            "select * from CUSTOMERS where ID = ?", this.customerRowMapper, id);
    }

    @Autowired
    public void setJdbcTemplate( JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    class CustomerRowMapper implements RowMapper<Customer> {
        public Customer mapRow(ResultSet resultSet, int i)  throws SQLException {
            String fn = resultSet.getString("FIRST_NAME");
            String ln = resultSet.getString("LAST_NAME");
            String email = resultSet.getString("EMAIL");
            long id = resultSet.getInt("ID");
            return new Customer(id, fn, ln, email);
        }
    }
}
```

The last class is the client that makes use of the `CustomerService` instance. We register it just as before, using the `@Component` annotation. It needs a reference to the `CustomerService` instance just as the `DatabaseCustomerService` instance needed a reference to the `JdbcTemplate`. So, we use our old friend `@Autowired`.

```java
Copypackage org.springframework.samples;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.GenericXmlApplicationContext;
import org.springframework.stereotype.Component;

@Component
public class CustomerClient {
	private CustomerService customerService ;

	@Autowired
	public void setCustomerService(CustomerService customerService) {
		this.customerService = customerService;
	}

	public void printCustomerInformation ( long customerId ) {
		Customer customer = this.customerService.getCustomerById( customerId );
		System.out.println( customer ) ;
	}
}
```

Our revised XML file is much svelter for our troubles:

```xml
Copy<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:jdbc="http://www.springframework.org/schema/jdbc"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/jdbc http://www.springframework.org/schema/jdbc/spring-jdbc.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

    <context:component-scan base-package="org.springframework.samples"/>

    <jdbc:embedded-database id="ds" type="H2">
        <jdbc:script location="classpath:setup.sql"/>
    </jdbc:embedded-database>

    <bean class="org.springframework.jdbc.core.JdbcTemplate" id="jdbcTemplate">
        <constructor-arg ref="ds"/>
    </bean>

</beans>
```

We've used namespace support to make short work of configuring an embedded `javax.sql.DataSource` instance. We've used component scanning to let Spring automatically register the `DatabaseCustomerService` and `CustomerClient` beans for us. Things are looking pretty good, but we're still using XML to describe the configuration of the `JdbcTemplate` that we could more readily describe in Java. In this case, XML isn't a more compelling solution than regular Java; it only offers parity. It would be nice if we could use component scanning for the `JdbcTemplate` instance as well. However, component scanning only works for beans annotated with `@Component`. As we can't add the `@Component` annotation to third party classes for which we may not have the source code, component scanning is not an option for the `JdbcTemplate` instance.

Spring offers the Java configuration support to let you describe and configure beans using Java directly. The Java configuration option offers the best of both worlds: it lets you configure any class, even classes you don't have the source code for (as with the XML Configuration option) and it's still Java-centric, so benefits from all type safety of the Java language (and the refactoring tools available in the Java IDEs).

Java Configuration processes a bean registered with the context and it looks for methods annotated with `@Bean` and invokes them. The result of method invocation is registered with the application context as a bean, exactly as if you had configured the object using XML. The type of the bean is the type of the returned object, and the `id` is taken from the method name. Because the configuration is provided by the Java code in the method, you can do any manner of setup, much like a `FactoryBean` lets you do. People often choose the Java configuration option because it lets you keep your bean configuration in one or two well known, central classes. XML configuration and Java configuration both provide a way to centrally describe your application.

A configuration class is a Spring bean, just like any other. All the rules that apply to regular Spring beans apply to a configuration bean, with the exception of methods annotated with `@Bean`. Spring will pick up your configuration class with component scanning. If you want to use other beans in your configuration class (for example, the `javax.sql.DataSource` instance that we previously configured using the XML namespace) then you have all the normal options available to you to get them, including `@Autowired.`. Let's look at a configuration class for our example.

```java
Copy
package org.springframework.samples;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

@Configuration
public class CustomerConfiguration {

	@Autowired private DataSource dataSource;

	@Bean
	public JdbcTemplate jdbcTemplate() {
		return new JdbcTemplate(this.dataSource);
	}
}
```

This class uses `@Autowired` to obtain a reference to the embedded datasource. This is similar to the way it's used in previous examples, except that here we're using the annotation on a private field variable, not a setter method. The Spring framework will work with annotations on the constructors of a class, on field variables, or on setter methods. Finally, we have a method annotated with `@Bean.` This method provides the definition of the `JdbcTemplate` instance and means we can remove the XML configuration from our file. We aren't doing so here, but you can define multiple `@Bean` definition methods in a class and they can reference each other by simply invoking each other. If one method annotated with `@Bean` invokes another, the return value will either be a newly created object or - if the bean's been created already - the bean that's already registered with the context. In the class above, we also have an `@Configuration` annotation on the class. This annotation tells Spring to treat this class as a special type of component specifically for configuration. In essence, this bean benefits from all the same services as any bean registered in a Spring context, *and* it has extra services applied to it to enable Java configuration. To use Java Configuration, ensure that you have the CGLIB library on your classpath.

The final revised XML file looks like this:

```xml
Copy
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:jdbc="http://www.springframework.org/schema/jdbc"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/jdbc http://www.springframework.org/schema/jdbc/spring-jdbc.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

    <context:component-scan base-package="org.springframework.samples"/>

    <jdbc:embedded-database id="ds" type="H2">
        <jdbc:script location="classpath:setup.sql"/>
    </jdbc:embedded-database>   

</beans>
```

In this post, we have traced the steps that you too can follow to a cleaner, friendlier codebase through Spring's dependency injection capabilities. Though we talked about fantastic technologies that provide more flexibility and more features than anything else out there, it's important to remember that this incredible support has been around for at least 4 years. Most of it for many years more. People have been using these pieces as the bedrock of their applications for just as long. Dependency Injection and Inversion of Control are just the beginning. The Spring framework provides numerous simplifying libraries for a large, growing number of use cases building on top of the component model established here.

When you build your application on top of Spring, you insulate yourself from the lock-in of the web servers, application servers and cloud environments to which your application is deployed while maximizing your return on investment in the underlying platform.