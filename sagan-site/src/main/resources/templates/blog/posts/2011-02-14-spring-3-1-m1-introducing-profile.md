---
title: Spring 3.1 M1: Introducing @Profile
source: https://spring.io/blog/2011/02/14/spring-3-1-m1-introducing-profile
scraped: 2026-02-24T08:46:39.893Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Chris Beams |  February 14, 2011 | 12 Comments
---

# Spring 3.1 M1: Introducing @Profile

_Engineering | Chris Beams |  February 14, 2011 | 12 Comments_

### Introduction

In my [earlier post](http://blog.springsource.com/2011/02/11/spring-framework-3-1-m1-released/) announcing Spring 3.1 M1, I discussed the new *bean definition profiles* feature as applied when using Spring `<beans/>` XML to configure the container. Today we'll introduce the new `@Profile` annotation and see how this same feature can be applied when using `@Configuration` classes instead of XML. Along the way we'll cover some best practices for designing `@Configuration` classes.

### Recall @Configuration

For those unfamiliar with @Configuration classes, you can think of them as a pure-Java equivalent to Spring `<beans/>` XML files. We've blogged [about](http://blog.springsource.com/2006/11/28/a-java-configuration-option-for-spring/) [this](http://blog.springsource.com/2007/11/04/spring-java-configuration-moving-ahead/) [featureset](http://blog.springsource.com/2009/12/22/configuration-simplifications-in-spring-3-0/) before, and the reference documentation [covers it well](http://static.springsource.org/spring/docs/3.1.0.M1/spring-framework-reference/html/beans.html#beans-java). You may want to revisit those resources if you need an introduction or a refresher.

As we'll see in this and subsequent posts, much attention has been given to the `@Configuration` approach in Spring 3.1 in order to round it out and make it a truly first-class option for those who wish to configure their applications without XML. Today's post will cover just one of these enhancements: the new `@Profile` annotation.

As with the previous post, I've worked up a brief sample where you can follow along and try things out for yourself. You can find it at [](http://bit.ly/huhvjD)[https://github.com/cbeams/spring-3.1-profiles-java](https://github.com/cbeams/spring-3.1-profiles-java) and all the details for getting set up are in the README. This sample contains both the XML-based configuration covered in the last post, as well as `@Configuration` classes, in the com.bank.config.xml and com.bank.config.code packages, respectively. The `IntegrationTests` JUnit test case has been duplicated for each package; this should help you compare and contrast the two styles of bootstrapping the container.

### From XML to `@Configuration`

Let's dive in! Our task is simple: take the XML-based application shown previously and port it to an `@Configuration` style. We started the last post with an XML configuration looking like the following:

```xml
Copy
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:jdbc="http://www.springframework.org/schema/jdbc"
	xsi:schemaLocation="...">

	<bean id="transferService" class="com.bank.service.internal.DefaultTransferService">
		<constructor-arg ref="accountRepository"/>
		<constructor-arg ref="feePolicy"/>
	</bean>

	<bean id="accountRepository" class="com.bank.repository.internal.JdbcAccountRepository">
		<constructor-arg ref="dataSource"/>
	</bean>

	<bean id="feePolicy" class="com.bank.service.internal.ZeroFeePolicy"/>

	<jdbc:embedded-database id="dataSource">
		<jdbc:script location="classpath:com/bank/config/sql/schema.sql"/>
		<jdbc:script location="classpath:com/bank/config/sql/test-data.sql"/>
	</jdbc:embedded-database>
</beans>
```

And this is straightforward to port into a `@Configuration` class:

`src/main/com/bank/config/code/TransferServiceConfig.java`

```java
Copy
@Configuration
public class TransferServiceConfig {

	@Bean
	public TransferService transferService() {
		return new DefaultTransferService(accountRepository(), feePolicy());
	}

	@Bean
	public AccountRepository accountRepository() {
		return new JdbcAccountRepository(dataSource());
	}

	@Bean
	public FeePolicy feePolicy() {
		return new ZeroFeePolicy();
	}

	@Bean
	public DataSource dataSource() {
		return new EmbeddedDatabaseBuilder()
			.setType(EmbeddedDatabaseType.HSQL)
			.addScript("classpath:com/bank/config/sql/schema.sql")
			.addScript("classpath:com/bank/config/sql/test-data.sql")
			.build();
	}
}
```

*Note:* The `EmbeddedDatabaseBuilder` is the component that underlies the `<jdbc:embedded-database/>` element originally used in the XML. As you can see, it's quite convenient for use within a `@Bean` method.

At this point, our `@Configuration`\-based unit test would pass with the green bar:

`src/test/com/bank/config/code/IntegrationTests.java`

```java
Copy
public class IntegrationTests {

	@Test
	public void transferTenDollars() throws InsufficientFundsException {

		AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext();
		ctx.register(TransferServiceConfig.class);
		ctx.refresh();

		TransferService transferService = ctx.getBean(TransferService.class);
		AccountRepository accountRepository = ctx.getBean(AccountRepository.class);

		assertThat(accountRepository.findById("A123").getBalance(), equalTo(100.00));
		assertThat(accountRepository.findById("C456").getBalance(), equalTo(0.00));

		transferService.transfer(10.00, "A123", "C456");

		assertThat(accountRepository.findById("A123").getBalance(), equalTo(90.00));
		assertThat(accountRepository.findById("C456").getBalance(), equalTo(10.00));
	}

}
```

`AnnotationConfigApplicationContext` is used above, which allows for direct registration of `@Configuration` and other `@Component`\-annotated classes. This leaves us with a string-free and type-safe way of configuring the container. There's no XML, which is great, but at this point our application suffers from the same problem we saw in the first post: when the application is deployed into production, a standalone datasource won't make sense. It will need to be looked up from JNDI.

This is no problem. Let's break the embedded- and JNDI-based datasources out into their own dedicated `@Configuration` classes:

`src/main/com/bank/config/code/StandaloneDataConfig.java`

```java
Copy
@Configuration
@Profile("dev")
public class StandaloneDataConfig {

	@Bean
	public DataSource dataSource() {
		return new EmbeddedDatabaseBuilder()
			.setType(EmbeddedDatabaseType.HSQL)
			.addScript("classpath:com/bank/config/sql/schema.sql")
			.addScript("classpath:com/bank/config/sql/test-data.sql")
			.build();
	}

}
```

`src/main/com/bank/config/code/JndiDataConfig.java`

```java
Copy
@Configuration
@Profile("production")
public class JndiDataConfig {

	@Bean
	public DataSource dataSource() throws Exception {
		Context ctx = new InitialContext();
		return (DataSource) ctx.lookup("java:comp/env/jdbc/datasource");
	}

}
```

At this point we have declared the two different `DataSource` beans within their own `@Profile`\-annotated `@Configuration` classes. Just as with XML, these classes and the `@Bean` methods within them will be skipped or processed based on which Spring profiles are currently active. However, before we can see that in action, we first need to finish our refactoring. We've split out the two possible `DataSource` beans but how can we reference them method from within `TransferServiceConfig` -- specifically it's `accountRepository()` method? We have a couple of options, and both begin with understanding that `@Configuration` classes are candidates for `@Autowired` injection. This is because, in the end, `@Configuration` objects are managed as "just another Spring bean" in the container. Let's take a look:

`src/main/com/bank/config/code/TransferServiceConfig.java`

```java
Copy
@Configuration
public class TransferServiceConfig {

	@Autowired DataSource dataSource;

	@Bean
	public TransferService transferService() {
		return new DefaultTransferService(accountRepository(), feePolicy());
	}

	@Bean
	public AccountRepository accountRepository() {
		return new JdbcAccountRepository(dataSource);
	}

	@Bean
	public FeePolicy feePolicy() {
		return new ZeroFeePolicy();
	}

}
```

With the use of the `@Autowired` annotation above, we've asked the Spring container to inject the bean of type `DataSource` for us, regardless of where it was declared -- in XML, in a `@Configuration` class, or otherwise. Then in the `accountRepository()` method, the injected `dataSource` field is simply referenced. This is one way of acheiving modularity between `@Configuration` classes, and is conceptually not unlike `ref`\-style references between two `<bean>` elements declared in different XML files.

The final step in our refactoring is be to update the unit test to bootstrap not only `TransferServiceConfig`, but also the JNDI and standalone `@Configuration` variants of our `DataSource` bean:

`src/test/com/bank/config/code/IntegrationTests.java`

```java
Copy
public class IntegrationTests {
	@Test
	public void transferTenDollars() throws InsufficientFundsException {
		AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext();
		ctx.getEnvironment().setActiveProfiles("dev");
		ctx.register(TransferServiceConfig.class, StandaloneDataConfig.class, JndiDataConfig.class);
		ctx.refresh();

		// proceed with assertions as above ...
	}
}
```

Now all of our `@Configuration` classes are available to the container at bootstrap time, and based on the profiles active ("dev" in this case), `@Profile`\-annotated classes and their beans will be processed or skipped. As a quick note, you could avoid listing out each `@Configuration` class above and instead tell `AnnotationConfigApplicationContext` to simply scan the entire `.config` package, detecting all of our classes in one fell swoop. This is the loose equivalent of loading Spring XML files based on a wildcard (e.g., `**/*-config.xml`):

```java
Copy
		AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext();
		ctx.getEnvironment().setActiveProfiles("dev");
		ctx.scan("com.bank.config.code"); // find and register all @Configuration classes within
		ctx.refresh();
```

However you choose to register your `@Configuration` classes, at this point our task is complete! We've ported our configuration from Spring `<beans/>` XML to `@Configuration` classes and bootstrapped the container directly from those classes using `AnnotationConfigApplicationContext`.

### Further improving `@Configuration` class structure

Everything works in our application and the JUnit bar is green, but there's still room for improvement. Recall how a `DataSource` bean was `@Autowired` into `TransferServiceConfig`? This works well, but it's not terribly clear *where* the bean came from. As mentioned above, it could be from XML, or from any other `@Configuration` class. The technique I'll describe below introduces *object-oriented configuration* and should further our goals of having a natural Java-based configuration -- one that can take full advantage of the power of your IDE.

If we think about `StandaloneDataConfig` and `JndiDataConfig`, they're really two clases of the same kind, in that they both declare a method with the following signature:

```java
Copy
		public DataSource dataSource();
```

All that's missing, it seems, is an interface unifying the two. Let's introduce one -- we'll see why shortly below:

`src/main/com/bank/config/code/DataConfig.java`

```java
Copy
interface DataConfig {
	DataSource dataSource();
}
```

And of course update the two `@Configuration` classes to implement this new interface:

```java
Copy
@Configuration
public class StandaloneDataConfig implements DataConfig { ... }

@Configuration
public class JndiDataConfig implements DataConfig { ... }
```

What does this buy us? Just like we `@Autowired` the `DataSource` bean directly into `TransferServiceConfig`, *we an also inject `@Configuration` instances themselves*. Let's see this in action:

`src/main/com/bank/config/code/TransferServiceConfig.java`

```java
Copy
@Configuration
public class TransferServiceConfig {

	@Autowired DataConfig dataConfig;

	// ...

	@Bean
	public AccountRepository accountRepository() {
		return new JdbcAccountRepository(dataConfig.dataSource());
	}

	// ...
}
```

This allows us full navigability through the codebase using the IDE. The screenshot below shows the result of pressing CTRL-T on the invocation of `dataConfig.dataSource()` to get a "Quick Hierarchy" hover:

[![Quick implementation hierarchy for DataConfig.dataSource()](http://blog.springsource.com/wp-content/uploads/2011/02/Screen-shot-2011-02-12-at-9.27.48-PM.png "Quick Hierarchy")](http://blog.springsource.com/wp-content/uploads/2011/02/Screen-shot-2011-02-12-at-9.27.48-PM.png)

It's now very easy to ask the question "where was the `DataSource` bean defined?" and have the answer constrained to a set of types implementing `DataConfig`. Not bad if we're trying to do things in a way that is as familiar and useful to Java developers as possible.

### More advanced use of `@Profile`

Worth a quick mention is that like many Spring annotations, `@Profile` may be used as a *meta-annotation*. This means that you may define your own custom annotations, mark them with `@Profile`, and Spring will still detect the presence of the `@Profile` annotation as if it had been declared directly.

```java
Copy
package com.bank.annotation;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Profile("dev")
pubilc @interface Dev {
}
```

This allows us to mark our `@Component` classes with the new custom `@Dev` annotation, rather than being required to use Spring's `@Profile`:

```java
Copy
@Dev @Component
public class MyDevService { ... }
```

Or, from the examples above, marking our `StandaloneDataConfig` with `@Dev` would work too:

```java
Copy
@Dev @Configuration
public class StandaloneDataConfig { ... }
```

### Summary

Spring 3.1's bean definition profiles feature is supported fully across the XML and `@Configuration` styles. Whichever style you prefer, we hope you'll find profiles useful. Keep the feedback coming, as it'll have direct impact on 3.1 M2 which is just around the corner. In the next post we'll take a deeper look at Spring's new *`Environment`* abstraction and how it helps with regard to managing configuration properties in your applications. Stay tuned!