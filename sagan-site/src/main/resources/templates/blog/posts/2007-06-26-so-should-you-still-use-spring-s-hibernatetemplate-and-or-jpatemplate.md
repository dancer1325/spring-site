---
title: So should you still use Spring\'s HibernateTemplate and/or JpaTemplate??
source: https://spring.io/blog/2007/06/26/so-should-you-still-use-spring-s-hibernatetemplate-and-or-jpatemplate
scraped: 2026-02-24T09:27:14.466Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Alef Arendsen |  June 26, 2007 | 0 Comments
---

# So should you still use Spring's HibernateTemplate and/or JpaTemplate??

_Engineering | Alef Arendsen |  June 26, 2007 | 0 Comments_

I was reading an [article by Vigil Bose](http://www.infoq.com/articles/dynamic-routing-using-spring) on TSS the other day and saw the usage of the HibernateDaoSupport class. Since this is no longer a recommended way of using Hibernate from Spring, I thought I might as well just blog about it another time.

With the advent of Spring 2.0, it has become possible to start using the Hibernate Session API directly again. The question is whether or not it is wise to abandon the use of the HibernateTemplate when working with Hibernate, or any other template-based approaches Spring features.

## Using Spring XxxTemplates

In Spring 1.0, we introduced a revolutionary way of working with data access APIs that threw checked exceptions. The template approach Spring features along with its transaction synchronization manager and the extensive use of runtime exceptions makes any TCFTC (short for try/catch-finally-try/catch as we coined it back in 2005) often found in data access code entirely obsolete. Below you can see (a simplified version and not entirely precise version of) what Spring's template approach does for you (with specific code snippets that you would otherwise have to write). ![template.png](http://blog.interface21.com/main/wp-content/uploads/2007/06/template.png)

**Acquisition of connection**: If transaction synchronization is active (which it is, if you're using Spring's transaction management infrastructure), most of the times any of the Spring templates are using the same connection across the entire thread (things are actually a bit more complicated than that, but that would lead us too much into the gory details).

**Participation in a transaction** Again, when using transaction management features, Spring will automatically associated any new connection with the current transaction. This again, all depends on the current propagations settings and so on, but whichever way you look at it, your core code is not affected by it.

**Specification of the SQL**: This is what you (obviously) have to do yourself. The SQL ideally uses bind parameters, to avoid any chances of SQL injection from happening. Parameters are passed to the JDBC template as arguments.

**Creation / execution of statement and iterating over result set**: After you've specified the SQL, Spring is going to create the statement for you, set any parameters you may have specified, execute it and loop over the result set for you.

**Parse result from result set**: You can opt for parsing the result set yourself if you like (or if you have complex parsing requirements), or you can have Spring result a list of primitives, or just one value from the result set.

**Handling and translation of exceptions**: This is where Spring translates any exceptions that might have occurred to Spring's own DataAccessException hierarchy, automatically insulating calling code from the data access technology in use.

**Releasing of connection**: This is the last piece of the puzzle where Spring releases any resources used. Of course, if transaction synchronization is active, the resources might not be released immediately.

Templates are available for several APIs such as:

-   JDBC (JdbcTemplate)
-   Hibernate (HibernateTemplate)
-   iBatis (SqlMapClientTemplate)
-   JDO (JdoTemplate)
-   TopLink (TopLinkTemplate)
-   Messaging (JmsTempate)
-   Transaction management (TransactionTemplate)
-   JNDI (JndiTemplate)

## Are templates really necessary?

The templates add a lot of value when using an API that uses checked exceptions (as opposed to runtime exceptions or unchecked exceptions), but also add a lot of consistency to your code base. People having learnt Spring's JdbcTemplate can pretty easily start using Spring's JdoTemplate or Spring's HibernateTemplate--the approach to using those is similar for each one of them.

The most visible impact of the Spring template approach is the code reduction for for example JDBC. This is primarily because the checked exceptions are translated to runtime exceptions inside the template, removing the need to catch the exception in your mainline code. Other reasons are the transparent resource management and automatic synchronization with the currently running transaction. Of course it's fairly easy to change a framework to use runtime exceptions natively instead of Spring having to do this and this is what for example Hibernate has started to do from version 3.0 onwards. Hibernate is not the only technology to do this--the Java Persistence API is also using runtime exceptions.

The fact that these technologies are using runtime exceptions essentially renders the Spring template equivalent for those technologies useless... at least largely, and if you're looking at it from a code simplification standpoint. If you are using the Spring HibernateTemplate purely to reduce the amount of code needed to perform Hibernate data access operations, you would say you do not necessarily have to use a template! When looking at the above table however, we can see Spring does a lot more work behind the scenes than you might think.

Apart from partial simplification of the error handling concern (we still have to do translation of exceptions specific to the data access technology to Spring's DataAccessExceptions) the transaction management and resource management concerns are also addressed, by several changes in the underlying data access technologies. Let's look at those in more detail:

**Resource management** Since Hibernate 3.0.1 (and in the Java Persistence API from the moment it was first released) it became possible for Spring to manage the underlying resource without you having to go through any of the templates that are available for those technologies. This means that even if you are using the Hibernate API directly (for example through SessionFactory.getCurrentSession()), you will still be using a Spring-managed Hibernate Session. The same holds for an EntityManager obtained through a JPA EntityManagerFactory. This is another reason why you don't have to use Spring's HibernateTemplate anymore to get an integrated experience.

**Transaction management** Now that Spring is capable of handling the underlying resources for you without you having to go through the template, Spring will also be able to synchronize the resources with any transaction going on while acquiring the resource. This means the transaction management concern is also addressed without you having to go through a template. Again, this means we do not necessarily have to use Spring's HibernateTemplate anymore.

**Error handling** The one and only thing that is not available directly when you are using the plain APIs that come with Hibernate or JPA (i.e. the Hibernate Session or the JPA EntityManager) is the exception translation of technology-specific data access exceptions into the Spring DataAccessException hierarchy. This we can address very easily however as we'll see in a minute.

## Going template-less

So, what do things look like if we're not using the HibernateTemplate for example? It's fairly simple to show how things work. The first thing we do is start using Session API directly instead of the HibernateTemplate. To get access to the Hibernate Session we need the SessionFactory which will be injected as usual:

```java
Copy
public class HibernateAccountRepository implements AccountRepository {

	private SessionFactory factory;
	
	public HibernateAccountRepository(SessionFactory factory) {
		this.factory = factory;
	}
	
	public Account loadAccount(String username) {
		return (Account)factory.getCurrentSession()
		    .createQuery("from Account acc where acc.name = :name")
		    .setParameter("name", "Alef").uniqueResult();
	}
}
```

The following is the XML that we'll use to assemble the application. As you can see, we're of course still using the Spring way of setting up Hibernate (using the LocalSessionFactoryBean).

```xml
Copy
<bean id="sessionFactory" class="org.springframework.orm.hibernate3.LocalSessionFactoryBean">
	<!-- the works -->
</bean>

<bean id="accountRepo" class="com.mycompany.HibernateAccountRepository">
	<constructor-arg ref="sessionFactory"/>
</bean>
```

Now, as I said before, because of a small change in Hibernate 3.0.1, Spring is able to manage the Hibernate session for you, without you having to go through the Hibernate session. The one thing that was missing was the exception translation. To also get that going, you only need to annotate the repository with the @Repository annotation (provided by Spring) and turn on exception translation using a post processor.

```java
Copy
@Repository // from org.springframework.stereotype
public class HibernateAccountRepository implements AccountRepository {

	// see above for full impl...
}
```

```xml
Copy

<!-- for the other beans in the configuration, see above -->

<bean class="org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor"/>
```

The post processor will automatically recognize the @Repository annotation and issue Spring to turn on exception translation for this bean. The fact that this works using a proxy is not really relevant to the discussion.

**Note** that the same holds for repositories using the Java Persistence API (JPA). In fact, you don't even need to change the post processor or the annotation at all.

If you are using Hibernate in an environment where annotations are not available (pre Java5), you can still enjoy automatic exception translation; using AOP. First declare an exception translator and then declare a piece of AOP configuration, like so:

```xml
Copy
<bean id=“persistenceExceptionInterceptor
    class=“org.springframework.dao.support.PersistenceExceptionTranslationInterceptor"/>

<aop:config>
    <aop:advisor pointcut=“execution(* *..*Repository+.*(..))" 
                          advice-ref=“persistenceExceptionInterceptor" />
</aop:config>
```

This pointcut here matches any class implement a Repository interface (more precisely, an interface ending with Repository).

## The real question is: which approach to choose??

To answer with a typical consultant's answer: 'it all depends' :). Let me tell you that I personally prefer to work without the HibernateTemplate and the JpaTemplate, just because I think they do not offer enough value anymore. For consistency purposes you could argue that opting for an approach based on templates all across the board gets you to a situation that is similar in all places though; you still have to learn how Hibernate works however and for more complex situations, you might want to go with using the Session API directly anyway. Note that this is still possible if you're using the HibernateTemplate (through Spring's HibernateCallback).

So in short (as the JavaDoc for [HibernateTemplate](http://www.springframework.org/docs/api/org/springframework/orm/hibernate3/HibernateTemplate.html) and [JpaTemplate](http://www.springframework.org/docs/api/org/springframework/orm/jpa/JpaTemplate.html) already mention) I'd recommend you to start using the Session and/or EntityManager API directly if you're starting to use Hibernate or JPA respectively on a new project--remember: **Spring tries to be non-invasive, this is another great example!**

\[update: minor typos\] \[update: added information about annotation-less exception translation\]