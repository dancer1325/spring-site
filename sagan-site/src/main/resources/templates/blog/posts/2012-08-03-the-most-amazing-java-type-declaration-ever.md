---
title: The Most Amazing Java Type Declaration Ever
source: https://spring.io/blog/2012/08/03/the-most-amazing-java-type-declaration-ever
scraped: 2026-02-24T08:18:50.147Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | David Turanski |  August 03, 2012 | 0 Comments
---

# The Most Amazing Java Type Declaration Ever

_Engineering | David Turanski |  August 03, 2012 | 0 Comments_

I'd like to think I'm pretty comfortable with Java and generics but I recently came across this bit of Java code and it stopped me in my tracks :

`  public abstract class AnnotationBasedPersistentProperty<P extends PersistentProperty<P>> extends AbstractPersistentProperty<P> {..}  `

This class is internal to the [Spring Data](http://www.springsource.org/spring-data) framework's [Repository](http://static.springsource.org/spring-data/data-commons/docs/current/reference/html/#repositories) Support which removes the need to write boilerplate code when implementing a data access layer and also provides a common programming model for mapping domain objects and managing data access to any type of persistent store.  Spring Data's  current repository implementations include relational databases ([JPA](http://www.springsource.org/spring-data/jpa)), [Gemfire](http://www.springsource.org/spring-gemfire),[MongoDB](http://www.springsource.org/spring-data/mongodb), [Neo4](http://www.springsource.org/spring-data/neo4j).

Fortunately, if you use Spring Data in your Java Application, you won't ever see this code. It's hidden behind Spring Data's simple yet powerful Repository abstraction providing queries, paging, sorting, and common CRUD operations. For example:

```
Copy
public class SomeClient {
    @Autowired
    private PersonRepository repository;
    public void doSomething() {
        List<Person> persons = repository.findByLastname("Matthews");
    }
}
```

As stated in the Spring Data project mission statement:

> Spring Data provides a familiar and consistent Spring-based programming model for NoSQL and relational stores while retaining store-specific features and capabilities.

A key feature of this familiar and consistent programming model, when it comes to repositories, is the use of annotations to configure persistent object mapping. This idea was first proven with Hibernate and subsequently adapted to JPA. Retaining store-specific features requires that the core framework provide some generic annotations, such as **@Id** and **@Transient**, and also support for store-specific annotations.

To support mapping a domain object's properties, a Spring Data Repository implementation should subclass **AnnotationBasedPersistentProperty**. This class provides common annotation handling logic across persistent and provides hooks for custom annotation handling that is unique for a given store. This class happens to extend another abstract class called **AbstractPersistentProperty** which is declared as follows:

`  public abstract class AbstractPersistentProperty<P extends PersistentProperty<P>> implements PersistentProperty<P>  `

**AbstractPersistentProperty** naturally implements the **PersistentProperty** interface. So before we unravel this one, let's have a look at the interface declaration for PersistentProperty:

`  public interface PersistentProperty<P extends PersistentProperty<P>>  `

Wow - my head is spinning with images of chickens and eggs, the tower of Hanoi, and [Godel,Escher and Bach](http://en.wikipedia.org/wiki/G%C3%B6del,_Escher,_Bach)!  This recursive gem says that the core PersistentProperty interface requires a type that extends it. In other words, the formal parameter P represents an a sub type of PersistentProperty and which the store-specific implementation defines. The store-specific PersistentProperty type is at the heart of the object mapping strategy and is exposed by several of the Spring Data common interfaces, including PersistentProperty itself. For example, PersistentProperty declares the following method: `  PersistentEntity<?, P> getOwner();  ` **PersistentEntity** is an abstract representation of the class of a persisted domain object. It is designed to address class level mapping concerns and contains references to - wait for it - Persistent properties. PersistentEntity is strongly typed to the extended PersistentProperty interface, and also exposes the domain class type which is represented here by the wildcard ? formal parameter.

So let's take another look at the initial type declaration:

`public abstract class AnnotationBasedPersistentProperty<P extends PersistentProperty<P>> extends		AbstractPersistentProperty<P> {..}`

The meaning by now is hopefully clear: The Spring Data commons library provides **AbstractPersistentProperty** which implements **PersistentProperty** to manage all the low level field and type information. **AnnotationBasedPersistentProperty** extends this class to add annotation support. All of these types require a type parameter that extends **PersistentProperty**. Some examples of this:

`  public interface MongoPersistentProperty extends PersistentProperty<MongoPersistentProperty>{...}  `

`  public interface GemfirePersistentProperty extends PersistentProperty<GemfirePersistentProperty>{...}  `

In the end all this parameterized typing is actually an elegant way to allow those implementing a Spring Data Repository to use the framework to expose store-specific features without having to resort to type casting, instanceof, and the like. The fact that there are already so many implementations in the works is a testament to the power of this framework. At the time of this writing, all of the Spring Data projects are available as milestone releases.