---
title: Bootiful Spring Boot 3.4: Spring Data
source: https://spring.io/blog/2024/11/24/bootiful-34-data
scraped: 2026-02-23T08:03:09.975Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  November 24, 2024 | 0 Comments
---

# Bootiful Spring Boot 3.4: Spring Data

_Engineering | Josh Long |  November 24, 2024 | 0 Comments_

The [release announcement](https://spring.io/blog/2024/11/15/spring-data-2024-1-goes-ga) blog does a good job highlighting some of the many features in Spring Data 2024.1. Remember: Spring Data is an umbrella project, aggregating modules supporting, among other things, Couchbase, Redis, MongoDB, JDBC, R2DBC, Neo4J, Apache Cassandra, and countless other data stores. It’s the easiest way to connect your data stores to your applications. And indeed, we could write a small book with all the new features here!

Here are some of the features that caught my eye.

-   A new Repository fragments SPI lets any arbitrary `.jar` on the classpath, or indeed code in another package, contribute extensions to the Spring Data repository mechanism via the `Spring.factories` service factory mechanism
-   much-reduced query parsing overhead in Spring Data JPA
-   expiration for `@TimeSeries` in Spring Data MongoDB
-   keyspace qualification for tables and user-defined types in Spring Data for Apache Cassandra
-   Refined CQL generation with `CqlGenerator` in Spring Data Cassandra
-   Jedis Lua scripting support in transaction and pipeline operations in Spring Data Redis
-   Customize the `JedisClientConfig` with the `JedisClientConfigBuilderCustomizer` interface.
-   and so much more!

I wanted to talk about one feature that could change things up for me: the culmination of *value expressions*, which is a fancy way of saying that it’s possible to parameterize queries in the Spring Data modules using either or both of Spring Expression Language (SpEL) or property placeholder resolution expressions.

The value expression stuff is based on a nice lower-level API you can use in your applications.

```java
Copypackage com.example.bootiful_34.data;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.core.env.Environment;
import org.springframework.data.expression.ValueEvaluationContext;
import org.springframework.data.expression.ValueExpressionParser;
import org.springframework.data.expression.ValueParserConfiguration;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.expression.spel.support.StandardEvaluationContext;
import org.springframework.test.context.DynamicPropertyRegistrar;
import org.springframework.test.context.DynamicPropertyRegistry;

@SpringBootTest
@Import(ValueExpressionDynamicPropertyRegistrar.class)
class ValueExpressionTest {

	@Test
	void test(@Autowired Environment environment) {
		var configuration = (ValueParserConfiguration) SpelExpressionParser::new;
		var context = ValueEvaluationContext.of(environment, new StandardEvaluationContext());

		var parser = ValueExpressionParser.create(configuration);
		var expression = parser.parse("${message}-#{ (6 * 7) + ''}");
		var result = expression.evaluate(context);
		Assertions.assertEquals("ni hao-42", result);
	}

}

@Configuration
class ValueExpressionDynamicPropertyRegistrar implements DynamicPropertyRegistrar {

	@Override
	public void accept(DynamicPropertyRegistry registry) {
		registry.add("message", () -> "ni hao");
	}

}
```

In this example, I’m using the low-level `ValueEvaluationContext` in a test where I’ve dynamically contributed a property: `message` with a greeting `ni hao`. The test evaluates a `String` that, in turn, has a property placeholder `${message}` and a SpEL expression `#{ (6 * 7) + ''}`, in which we multiply two numbers and then turn the resulting expression into a `String.` The result is, as you’d expect: `ni hao-42`.

Now that you can see the possibilities let’s examine some of them in the Spring Data JDBC repository’s definitions of query methods.

```java
Copypackage com.example.bootiful_34.data;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.ListCrudRepository;

import java.util.Collection;

interface CustomerRepository extends ListCrudRepository<Customer, Integer> {

	@Query(" select * from #{ #tableName }")
	Collection<Customer> all();

	@Query("  select * from customer where language = :#{locale.language} ")
	Collection<Customer> findCustomersBySystemLanguage();

	// this is new! support for property placeholder resolution in queries!
	@Query("select * from customer where os = :${os.name} ")
	Collection<Customer> findCustomersHavingSameOperatingSystemAsUs();

}

```

The first query relies upon a SpEL context that furnishes the table name of the entity referenced in the query method (in this case, `Customer` belongs to the `customer` SQL database).

In the second example query, we match against a custom context contributed via `EvaluationContextExtension`. This extension simply makes the user’s `Locale` available during SpEL execution.

**💡 TIP**  
Did you know about `LocaleContextHolder`? It’s been in Spring since Spring Framework 1.2! It makes the current user’s `Locale` object available. So, imagine an HTTP request comes in; Spring MVC determines the user’s `Locale` and then installs it here. And you can read it any time you want as long as you’re in the same thread as the request. Nice.

```java
Copypackage com.example.bootiful_34.data;

import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.spel.spi.EvaluationContextExtension;
import org.springframework.stereotype.Component;

import java.util.Locale;

@Component
class LocaleEvaluationContextExtension implements EvaluationContextExtension {

	@Override
	public String getExtensionId() {
		return "locale";
	}

	@Override
	public Locale getRootObject() {
		return LocaleContextHolder.getLocale();
	}

}

```

In the third example query, we’re matching a System property `os.name`, which returns the user’s current operating system ([Mac OS](https://github.com/openjdk/jdk/blob/master/src/java.base/macosx/native/libjava/java_props_macosx.c#L235) X, [Unix-like](https://github.com/openjdk/jdk/blob/master/src/java.base/unix/native/libjava/java_props_md.c#L403), [Windows](https://github.com/openjdk/jdk/blob/master/src/java.base/windows/native/libjava/java_props_md.c#L481-L568)).