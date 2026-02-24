---
title: What\'s a FactoryBean?
source: https://spring.io/blog/2011/08/09/what-s-a-factorybean
scraped: 2026-02-24T08:37:09.108Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  August 09, 2011 | 7 Comments
---

# What's a FactoryBean?

_Engineering | Josh Long |  August 09, 2011 | 7 Comments_

In this post, I'll look at Spring's ` org.springframework.beans.factory.FactoryBean<T>` interface. The definition of this interface is:

```java
Copy
public interface FactoryBean<T> {
  T getObject() throws Exception;
  Class<T> getObjectType();
  boolean isSingleton();
}
```

A `FactoryBean` is a pattern to encapsulate interesting object construction logic in a class. It might be used, for example, to encode the construction of a complex object graph in a reusable way. Often this is used to construct complex objects that have many dependencies. It might also be used when the construction logic itself is highly volatile and depends on the configuration. A `FactoryBean` is also useful to help Spring construct objects that it couldn't easily construct itself. For example, in order to inject a reference to a bean that was obtained from JNDI, the reference must first be obtained. You can use the `JndiFactoryBean` to obtain this reference in a consistent way. You may inject the result of a `FactoryBean`'s `getObject()` method into any other property.

Suppose you have a `Person` class whose definition is thus:

```java
Copy
public class Person { 
 private Car car ;
 private void setCar(Car car){ this.car = car;  }	
}
```

and a `FactoryBean` whose definition is thus:

```java
Copy
public class MyCarFactoryBean implements FactoryBean<Car>{
  private String make; 
  private int year ;

  public void setMake(String m){ this.make =m ; }

  public void setYear(int y){ this.year = y; }

  public Car getObject(){ 
    // wouldn't be a very useful FactoryBean 
    // if we could simply instantiate the object!
    CarBuilder cb = CarBuilder.car();
	
    if(year!=0) cb.setYear(this.year);
    if(StringUtils.hasText(this.make)) cb.setMake( this.make ); 
    return cb.factory(); 
  }

  public Class<Car> getObjectType() { return Car.class ; } 

  public boolean isSingleton() { return false; }
}
```

You could wire up a `Car` instance using a hypothetical `CarFactoryBean` like this:

```xml
Copy 
<bean class = "a.b.c.MyCarFactoryBean" id = "car">
	<property name = "make" value ="Honda"/>
	<property name = "year" value ="1984"/>
</bean>
<bean class = "a.b.c.Person" id = "josh">
	<property name = "car" ref = "car"/>
</bean>
```

In this example, the result of the `FactoryBean`'s `getObject` method will be passed, not the actual `FactoryBean` itself. Spring knows that the result can be injected into the target property because it'll consult the `FactoryBean`'s `getObjectType()` return value to determine the type of the factoried object, and then it will check whether that type can be injected into the injection site. Spring reserves - but in practice doesn't always exercise - the right to cache the returned bean if the `FactoryBean`'s `isSingleton()` method returns true.

If you are using Spring's newer (and far more elegant, in my humble opinion) Java based configuration, then you will find this doesn't work quite as you'd expect. It can still be made to work, but you must dereference the `FactoryBean` explicitly in Java configuration and call `getObject()` yourself, like this:

```java
Copy 
// identical configuration in Java to the XML above			
@Configuration 
public class CarConfiguration { 

  @Bean 
  public MyCarFactoryBean carFactoryBean(){ 
	MyCarFactoryBean cfb = new MyCarFactoryBean();
	cfb.setMake("Honda");
	cfb.setYear(1984);
	return cfb;
  }

  @Bean
  public Person aPerson(){ 
	Person person = new Person();
	person.setCar( carFactoryBean().getObject());
	return person; 
  }	
}
```

Note that, essentially, all beans configured in Spring end up in the same place at runtime. You may define a `FactoryBean` in Java configuration (as above) but then use the factory bean in XML, like you would a `FactoryBean` defined in XML.

Spring ` FactoryBean`s have all the other characteristics of any other Spring bean, including the lifecycle hooks and services (like AOP) that all beans in the Spring container enjoy.

So, if you'd like a chance to perform construction logic after the properties on the `FactoryBean` have been set, but before the `getObject()` method has been called, then you can tell the Spring container give your `FactoryBean` a callback. One way to do this is to implement the `InitializingBean` interface. This will be called no matter what. A far more POJO-centric alternative is to annotate a method with `@PostConstruct`. This method will be called, in this case, after both the code>make and the `year` properties have been set. You might use this callback to do sanity checks before the object construction's finished, but after the configuration by the container has finished.

```java
Copy 
 @PostConstruct 
 public void setup() throws Throwable { 
   // these methods throw an exception that 
   // will arrest construction if the assertions aren't met
   Assert.notNull(this.make, "the 'make' must not be null")	;
   Assert.isTrue(this.year > 0, "the 'year' must be a valid value"); 
 }
```

One important takeaway here is that it is the `FactoryBean`, *not* the factoried object itself, that lives in the Spring container and enjoys the lifecycle hooks and container services. The returned instance is transient - Spring knows nothing about what you've returned from `getObject() `, and will make no attempt to exercise any lifecycle hooks or anything else on it.