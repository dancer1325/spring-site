---
title: BeanInitializer: wiring dependencies in unit tests
source: https://spring.io/blog/2007/04/02/beaninitializer-wiring-dependencies-in-unit-tests
scraped: 2026-02-24T09:31:03.982Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Dave Syer |  April 02, 2007 | 0 Comments
---

# BeanInitializer: wiring dependencies in unit tests

_Engineering | Dave Syer |  April 02, 2007 | 0 Comments_

One of the things that irritates me the most about unit testing some classes in a Spring context, is initialising them with all their dependencies. This is especially true of Spring framework extensions, like FactoryBean implementations or \*Aware implementations. It is cumbersome to add all the dependencies, and easy to forget to call the bean lifecycle methods, like the afterPropertiesSet method from InitializingBean.

The Spring base classes for unit testing help quite a lot, but there are still some things that are fiddly. E.g. in many cases it is necessary to disambiguate autowiring, so that collaborators are given the correct implementation. Also, to benefit from the lifecycle execution you have to be testing a bean instance from the current configuration, which isn't always convenient.

I have been using a simple tool for simplifying the setup of collaborators in unit tests, and I thought I'd share it with a few people. It provides a bean initializer that can be used to wire up dependencies on an existing bean.

The BeanInitializer initializes a bean, adds dependencies, and executes lifecycle callbacks all in one method:

```java
Copy
public class InitializingTests extends TestCase {

    private Collaborator collaborator;

    public void setUp throws Exception {
        super.setUp();
        collaborator = new SimpleCollaborator();
    }

    public void testBeanWithSimpleDependencyOnThis() throws Exception {

        Service bean = BeanInitializer.initialize(new ServiceImpl(), this);
        assertNotNull(bean.getCollaborator());

    }

}
```

The parameters of the BeanInitializer.initialize methods are the bean to initialize, and a source of properties to set on it, in this example the unit test itself. The lifecycle callbacks from InitializingBean, BeanNameAware etc. are called before returning the bean. This is useful because the lifecycle interfaces can be added or removed without having to change the unit test.

You can also do this:

```java
Copy
Service bean = BeanInitializer.initialize(new ServiceImpl(), new Collaborator());
```

or this:

```java
Copy
Service bean = BeanInitializer.initialize(new ServiceImpl(), new
    Object[] { new Collaborator(), "valueOfOnlyStringProperty" } );
```

or this (e.g. in a unit test using the spring-mock base classes):

```java
Copy
Service bean = BeanInitializer.initialize(new ServiceImpl(), 
        new Collaborator(), applicationContext );
```

In this last case, the explicit collaborator overrides any values with the same interface in the applicationContext, so autowiring is unambiguous. This is great for adding a mock implementation of a complicated service class where the application context already includes a "real" implementation. Remember that the Spring unit test base classes cache application context instances, so this can be a really great way to improve unit test efficiency.

I've uploaded the code if you are interested ([here](http://blog.interface21.com/main/wp-content/uploads/2007/04/bean-initializer.zip)) - it's pretty simple, but quite useful, hopefully.