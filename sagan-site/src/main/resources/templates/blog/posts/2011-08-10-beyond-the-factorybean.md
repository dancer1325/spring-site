---
title: Beyond the FactoryBean
source: https://spring.io/blog/2011/08/10/beyond-the-factorybean
scraped: 2026-02-24T08:37:04.666Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  August 10, 2011 | 0 Comments
---

# Beyond the FactoryBean

_Engineering | Josh Long |  August 10, 2011 | 0 Comments_

I looked at what a basic `FactoryBean` is in [my previous post](http://blog.springsource.com/2011/08/09/whats-a-factorybean/). While `FactoryBeans` are important - and knowing what they do can help you navigate the framework more effectively - they're by and large no longer the recommended approach to the task as of Spring 3.0 and the imminent Spring 3.1.

The whole point of a `FactoryBean` is to hide the construction of an object - either because it's very complex or because it can't simply be instantiated using the typical constructor-centric approach used by the Spring container (maybe it needs to be looked up? Maybe it needs a static registry method?) Spring has also supported the `factory-method` attribute in the XML format. The Java configuration approach offers a conceptually similar (in practice, the result is the same) alternative, but features a more concise, type-safe alternative.

Spring 3.0 saw the introduction of Java configuration which lets you define beans using Java. For instance, to register a regular `javax.sql.DataSource` with Spring in XML, you will more than likely delegate to a properties file for the sensitive configuration information (like a database password) and use Spring to instantiate the `javax.sql.DataSource`, like this:

```xml
Copy
<beans ...>
	<context:property-placeholder location = "ds.properties" />

	<bean id = "ds" class = "a.b.c.MySqlDataSource">
	  <property name = "user" value = "${ds.user}"/>
	  <property name = "password" value = "${ds.password}"/>
	</bean>
</beans>
```

This is a simple bean, and translates naturally into Java configuration. It would look like this:

```java
Copy 
import a.b.c.* ;
	
@Configuration 
@PropertySource("ds.properties") 
public class MyConfiguration { 
    @Inject private Environment env ; 
	
    @Bean public MySqlDataSource ds(){ 
        MySqlDataSource ds = new MySqlDataSource () ; 
        ds.setUser( env.getProperty("ds.user") );
        ds.setPassword( env.getProperty("ds.password"));
        return ds; 
    }
}
```

The beauty of this is that you're free to do anything you'd like inside the method. The return value is what's registered in the Spring container. The name of the method (`ds`) is used to set the name of the bean. Anything you do in service of properly constructing this object is up to you - you're no longer bound by the limits of what Spring can instantiate based on the XML specified. This is more natural - it's far easier to guarantee there are no typos using Java than XML. So, take away from this that Java configuration is about equal in terms of lines of code, but a lot more powerful, and conceptually more natural.

With those limitations lifted, the value of the `FactoryBean` is starting to lessen. After all, if all a `FactoryBean` does is encode construction logic in a novel or unique way, then there's no reason that couldn't be done inside a Java configuration method, is there? Let's revisit the example from the last blog post, a custom `FactoryBean` designed to factory `Car`s.

```java
Copy	 
public class MyCarFactoryBean implements FactoryBean<Car> {
  private String make; 
  private int year ;
  public void setMake (String m) { this.make = m ; }
  public void setYear (int y) { this.year = y; }
  public Car getObject (){ 
    // wouldn't be a very useful FactoryBean 
    // if we could simply instantiate the object! 
    CarBuilder cb = CarBuilder.car();
	
    if (year!=0) cb.setYear (this.year);
    if (StringUtils.hasText (this.make)) cb.setMake ( this.make); 
    return cb.factory(); 
  }
  public Class<Car> getObjectType () { return Car.class ; } 
  public boolean isSingleton () { return false; }
} 
```

In this example, we only conditionally set values if there are values to be set. So, we do some dancing around to ensure that we have values. This code is ugly, because it has a lot of different execution paths, but it's not particularly novel. We're adults, we can do this sort of thing ourselves. Let's dispose of the `FactoryBean` and simply use Java configuration to replace it for a definition of a `Car`. Again, we happen to know what configuration we need, so we don't have to duplicate the `null` checks in our code.

```java
Copy	
@Bean public Car honda (){ 
	return CarBuilder.car()
  	  .setYear( 1984 )
	  .setMake("Honda")
	  .factory(); 
}
```

Not bad! We no longer need the complex `FactoryBean`, and we have a usable bean definition. If we wanted to make this reusable, we could, as well, by simply creating a factory method, like this:

```java
Copy	

// presumably exposed from some place where other configuration classes can reuse it.
public Car buildCar (int year, String make){ 
    CarBuilder cb = CarBuilder.car();
    if (year!=0) cb.setYear( year);
    if (StringUtils.hasText( make)) cb.setMake( make); 
    return cb.factory ();
}
...
// now the Spring definition itself is even simpler, <em>and</em> it's reusable!
@Bean public Car honda () {
	return buildCar(1984, "Honda") ;
}
```

In Spring 3.1, there are many places where Spring also provides a *Builder* alternative to a `FactoryBean`. A Builder, as a pattern, is conceptually similar to a `FactoryBean`. In practice, however, they are usually exposed like the `CarBuilder` demonstrated above. They are typically chainable - a method returns `this` and so subsequent invocations don't need to dereference the object, they can continue *chaining* invocations. Additionally, a Builder usually does the null pointer checks that I forced in the previous code. So, a properly rewritten `CarBuilder` object usage might look like this:

```java
Copy	

@Bean public Car honda (){ 
 return CarBuilder.car ()
  // doesn't matter if the parameters are null - 
  // it'll validate in the factory() method
  .setYear( 1984 )  
  .setMake( "Honda" )
  .factory ();
}
```

A great example of a builder providing a much smoother experience in 3.1 over Spring's `FactoryBean`s is the new Hibernate 3 `SessionFactoryBuilder`, whose usage looks like this:

```java
Copy	
	
@Configuration  
@EnableTransactionManagment 
public class ServiceConfiguration {  
	
  @Bean public javax.sql.DataSource dataSource (){ ... }

  @Bean public SessionFactory hibernate3SessionFactory(){ 
     return new AnnotationSessionFactoryBuilder()
 	     .setDataSource(dataSource())
 	     // you could do this:
 	     //.setAnnotatedClasses( Customer.class, LineItem.class, Order.class )
 	     // or simply scan a package where your entities live
 	     .setAnnotatedPackages( Customer.class.getPackage().getName ()) 
 	     .buildSessionFactory ();
 }
}
```

The equivalent `FactoryBean`s (which are of course still there) now delegate to these builder classes, in fact!