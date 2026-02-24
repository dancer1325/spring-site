---
title: Using JPA in Spring without referencing Spring
source: https://spring.io/blog/2006/08/07/using-jpa-in-spring-without-referencing-spring
scraped: 2026-02-24T09:35:53.209Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Hale |  August 07, 2006 | 0 Comments
---

# Using JPA in Spring without referencing Spring

_Engineering | Ben Hale |  August 07, 2006 | 0 Comments_

Spring 2.0 has added support for the JPA data access standard with all of the [standard Spring support classes](http://static.springframework.org/spring/docs/2.0.x/reference/orm.html#orm-jpa) one would expect. Mark Fisher has a [great post](http://blog.interface21.com/main/2006/05/30/getting-started-with-jpa-in-spring-20/) on how to use this new support. However one of the questions that we keep getting is why one would want to use a Spring class (JpaTemplate) to access an EntityManager. The best answer for this question lies in the value add that JpaTemplate provides. In addition to providing the [one-liner convenience methods](http://static.springframework.org/spring/docs/2.0.x/api/org/springframework/orm/jpa/JpaTemplate.html#method_summary) that are a hallmark of Spring data access, it also provides automatic participation in transactions and translation from PersistenceException to the Spring [DataAccessException](http://static.springframework.org/spring/docs/2.0.x/api/org/springframework/dao/DataAccessException.html) hierarchy.

## But I still don't want to use JpaTemplate

That's fine because you don't have to sacrifice the power of Spring. Specifically the two biggest advantages (transaction participation and exception translation) are available without coding against Spring classes. In fact Spring actually has extensive support for plain API DAOs.

### Transaction Participation

One of the benefits of Spring's declarative transaction management is that you never have to reference transaction structures in your code. So if you want automatic transaction participation all you need are a couple of bean definitions.

```xml
Copy
<bean id="entityManagerFactory"
    class="org.springframework.orm.jpa.LocalEntityManagerFactoryBean" />

<bean class="org.springframework.orm.jpa.JpaTransactionManager">
    <property name="entityManagerFactory" ref="entityManagerFactory" />
</bean>

<tx:annotation-driven />
```

The [JpaTransactionManager](http://static.springframework.org/spring/docs/2.0.x/api/org/springframework/orm/jpa/JpaTransactionManager.html) is responsible for creating EntityManagers opening transactions and binding them to the current thread context. The [<tx:annotation-driven />](http://static.springframework.org/spring/docs/2.0.x/reference/transaction.html#transaction-declarative-annotations) simply tells Spring to put transactional advice on any class or method that has an @Transactional annotation on it. You can now just write your main-line DAO logic without having to worry about transactional semantics.

```java
Copy
public Collection loadProductsByCategory(String category) {
    return entityManager.createQuery("from Product p where p.category = :category")
        .setParameter("category", category).getResultList();
}
```

### Exception Translation

If you want Spring's exception translation you can get that as well. All that needs to happen is the introduction of the [@Repository](http://static.springframework.org/spring/docs/2.0.x/api/org/springframework/stereotype/Repository.html) annotation on your class. This (really minor) Spring annotation simply tells the Spring container that this class is a persistence repository and needs to have exception translation performed on it. To get the exception translation a simple bean definition is required.

```xml
Copy
<bean class="org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor"/>
```

## That's fine, but how do I get an EnityManager?

This might actually be the coolest part. Basically you'd just define a DAO exactly the way you would if you weren't using Spring by adding the @PersistenceContext JPA annotation.

```java
Copy
public class ProductDaoImpl implements ProductDao {

    private EntityManager entityManager;

    @PersistenceContext
    public void setEntityManager(EntityManager entityManager) {
        this. entityManager = entityManager;
    }

    public Collection loadProductsByCategory(String category) {
        return entityManager.createQuery("from Product p where p.category = :category")
            .setParameter("category", category).getResultList();
    }
}
```

By adding a single bean definition the Spring container will act as a JPA container and inject an EnitityManager from your EntityManagerFactory.

```xml
Copy
<bean class="org.springframework.orm.jpa.support.PersistenceAnnotationBeanPostProcessor" />
```

## A post this long must mean a lot of code and configuration

But it doesn't! Now that we've show all the pieces and parts let's take a look at the complete system.

### Code

-   @Repository for exception translation
-   @PersistenceContext for EntityManager injection
-   Plain JPA API code!

```java
Copy
@Repository
public class ProductDaoImpl implements ProductDao {

    private EntityManager entityManager;

    @PersistenceContext
    public void setEntityManager(EntityManager entityManager) {
        this. entityManager = entityManager;
    }

    public Collection loadProductsByCategory(String category) {
        return entityManager.createQuery("from Product p where p.category = :category")
            .setParameter("category", category).getResultList();
    }
}
```

### Configuration

-   LocalEnityManagerFactoryBean to create the EntityManagerFactory
-   JpaTransactionManager to manager JPA transactions
-   <tx:annotation-driven /> to tell Spring to look for @Transactional
-   Your bean definition!

```xml
Copy
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:tx="http://www.springframework.org/schema/tx"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
      http://www.springframework.org/schema/beans/spring-beans.xsd
      http://www.springframework.org/schema/tx
      http://www.springframework.org/schema/tx/spring-tx.xsd">

    <bean id="entityManagerFactory"
        class="org.springframework.orm.jpa.LocalEntityManagerFactoryBean" />
	
    <bean id="productDaoImpl" class="product.ProductDaoImpl"/>

    <bean
        class="org.springframework.orm.jpa.support.PersistenceAnnotationBeanPostProcessor" />

    <bean class="org.springframework.orm.jpa.JpaTransactionManager">
        <property name="entityManagerFactory"
            ref="entityManagerFactory" />
    </bean>

    <tx:annotation-driven />
	
</beans>
```

That's it. Two annotations and four bean definitions.

## Additional Resources

-   [Spring reference documentation of using JPA](http://static.springframework.org/spring/docs/2.0.x/reference/orm.html#orm-jpa)
-   [Spring reference documentation on using plain JPA with Spring](http://static.springframework.org/spring/docs/2.0.x/reference/orm.html#d0e15210)

  

---

*Updated to remove ellipses from bean definitions. See comments for background.*