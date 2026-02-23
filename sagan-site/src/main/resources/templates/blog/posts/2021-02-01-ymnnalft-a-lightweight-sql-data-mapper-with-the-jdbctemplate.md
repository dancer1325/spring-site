---
title: YMNNALFT: A lightweight SQL data mapper with the JdbcTemplate
source: https://spring.io/blog/2021/02/01/ymnnalft-a-lightweight-sql-data-mapper-with-the-jdbctemplate
scraped: 2026-02-23T13:32:55.247Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  February 01, 2021 | 0 Comments
---

# YMNNALFT: A lightweight SQL data mapper with the JdbcTemplate

_Engineering | Josh Long |  February 01, 2021 | 0 Comments_

Welcome to another installment of *You May Not Need Another Library For That* (YMNNALFT)! I've spent a lot of time since 2016 illuminating (or trying to, anyway!) some of the more enormous opportunities in the Spring ecosystem in [my Spring Tips videos](http://bit.ly/spring-tips-playlist). Today, however, I come to you in a different spirit, wanting to focus on the little, sometimes hidden, gems that do fantastic things and that might spare you an additional third-party dependency and its implied complexity.

I think the first use I had for Spring, more than 15 years ago, was the `JdbcTemplate`, which eliminated the eye-watering and verbose work of using JDBC directly. As you might know, JDBC stands for "Just Don't Break, Compiler!" and was designed to test the JVM limit of 65535 bytes of bytecode per method by providing an API that consistently requires more lines of code than that to do even basic things.

Thus just in. I'm being told that JDBC is, in fact, the Java Database Connectivity API. Moving on...

I couldn't use Spring as a framework in the project at the time, but I *could* bring in Spring as a sort of library. I brought it in initially to get access to the `JdbcTemplate`, and the concept of the various `*Template` objects as a whole.

A template object is an excellent example of the inversion-of-control principle. You let the template object do 90% of the work and provide it with a callback to be invoked when the template needs your input on something. Templates invert the application flow; they do the tedious stuff and then involve you only when it's time to do the thing you want to do. They're kind of like *mini-frameworks*.

The `JdbcTemplate` is one of the best-known templates in the Java ecosystem, and for a good reason. JDBC is a low-level API in the Java ecosystem for working with SQL databases. It's powerful, and it has dominated for *decades*. But it is, at the end of the day, *very* low level. You're not going to get very far writing this code yourself.

The alternatives were brittle (at the time) technologies like Hibernate, Apache OJB, any of the various, mildly incompatible JDO implementations, iBatis, or - *gasp!* - EJB 1.x or 2.x persistent entity beans. Most of these were way too top-heavy for the work I was trying to do. I loved iBatis (and continue to love its [successor MyBatis](http://mybatis.org/spring-boot-starter/mybatis-spring-boot-autoconfigure/)), but I found I could get far with just the `JdbcTemplate`.

The `JdbcTemplate` is part of a rich class arrangement and various abstractions for working with SQL databases. Nowadays, there's even a non-blocking, reactive alternative to JDBC available to the Spring developer: [R2DBC](https://R2DBC.io). Most data access logic today uses JDBC (indirectly, if nothing else), alas, so let's look at an example of that.

-   JDBC on [the Spring Initializr](http://start.spring.io) - `org.springframework.boot` : `spring-boot-starter-jdbc`
    
-   H2 on [the Spring Initializr](http://start.spring.io) - `com.h2database` : `h2`
    

Here's the code:

```java
Copypackage bootiful.data;

import lombok.SneakyThrows;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;
import org.springframework.util.FileCopyUtils;

import javax.sql.DataSource;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;

@SpringBootApplication
public class BootifulApplication {

	public static void main(String[] args) {
		SpringApplication.run(BootifulApplication.class, args);
	}

	@Bean
	DataSource dataSource() {
		return new EmbeddedDatabaseBuilder().setType(EmbeddedDatabaseType.H2).build();
	}

	@SneakyThrows
	private String loadSql() {
		Resource resource = new ClassPathResource("/initialization.sql");
		try (Reader r = new InputStreamReader(resource.getInputStream())) {
			return FileCopyUtils.copyToString(r);
		}
	}

	@Bean
	ApplicationListener<ApplicationReadyEvent> ready(DataSource dataSource) {
		return event -> {
			String sql = loadSql();
			String[] names = new String[] { "Spencer", "Violetta", "Madhura", "Yuxin", "Stéphane", "Dr. Syer" };
			JdbcTemplate template = new JdbcTemplate(dataSource);
			template.execute(sql);
			for (var name : names) {
				template.update("insert into CUSTOMER(name) values(?)", name);
			}
			List<Customer> results = template.query("select * from CUSTOMER",
					(resultSet, i) -> new Customer(resultSet.getInt("id"), resultSet.getString("name")));
			results.forEach(System.out::println);
		};
	}

}
```

If you don't mind rolling up your sleeves and slinging a little SQL (and why would you? SQL is *awesome*!), then you'll feel right at home using the `JdbcTemplate` and the various commands classes in the JDBC module. If not, Spring continues to meet you where you today with rich integrations for JDBC-centric data access technologies like JOOQ, Hibernate, JPA, MyBatis, Spring Data JPA, Spring Data JDBC, and a slew of other options.

Did you like this gem at a glance approach? Did you learn anything? As always, I'm keen on hearing from you, so [please sound off on Twitter (@starbuxman)](http://twitter.com/starbuxman) ! I'll be back with another installment of *YMNNALFT*, so be sure not to miss that.