---
title: YMNNALFT: Express Yourself with SpEL
source: https://spring.io/blog/2021/01/13/ymnnalft-express-yourself-with-spel
scraped: 2026-02-23T13:34:39.463Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  January 13, 2021 | 1 Comment
---

# YMNNALFT: Express Yourself with SpEL

_Engineering | Josh Long |  January 13, 2021 | 1 Comment_

Welcome to another installment of *You May Not Need Another Library For That* (YMNNALFT)! I've spent a lot of time since 2016 illuminating (or trying to, anyway!) some of the more enormous opportunities in the Spring ecosystem in [my Spring Tips videos](http://bit.ly/spring-tips-playlist). Today, however, I come to you in a different spirit, wanting to focus on the little, sometimes hidden, gems that do fantastic things and that might spare you an additional third-party dependency and its implied complexity.

Do your users want a convenient, bite-sized way to customize the behavior of your application? Expression Languages are purpose-built to allow low-touch customization of application behavior. Expression languages have a ton of applications. They can help you evaluate things! Perhaps they could run simple predicate logic that a user has configured. An expression language can dereference environment values, glue things together, support templating, customize access control and authorization predicates, support customized messaging flow routing and workflow event handler logic, and so much more. A good expression language is so useful that we built the Spring Expression Language (SpEL) and shipped it with Spring Framework 3.0 *waaaaay* back in 2009!

I'll never forget *that* addition! I was trawling the source code in Subversion, and I observed that [Andy Clement](http://twitter.com/andy_clement) (one of our resident mad scientists and genuinely one of the neatest human beings I know) had added a *brand new* expression language to Spring.

Of *course* he did.

It's worth noting here that the expression was a *superset* of existing expression languages like [OGNL](https://commons.apache.org/proper/commons-ognl/language-guide.html) and [JBoss EL](https://docs.jboss.org/seam/2.3.1.Final/reference/html/elenhancements.html) (both of which provided more features than other expression languages of the day like those you'd find in Java Server Pages or Java Server Faces, for example). Andy had developed this new expression language over a few weeks. So, when I tell you that Andy Clement had (in a matter of weeks!) checked in a brand Expression Language that exceeded brand X, what that *should* say to you is that Andy Clement can do anything and that we should all be delighted that'll be on our side when the machines attack!

This new expression language used [ANTLR](https://www.antlr.org/), which is an awesome, powerful parser generator that, given a grammar definition, will generate Java code that knows how to parse whatever is defined in that grammar. So, you could use the ANTLR grammar to teach ANTLR about how to parse, let's say, a hashtag (`#` + `A_LABEL`) or an ISO 8601 date or Java source code, or a SQL query, and ANTLR will generate Java code to parse text that complies with that grammar. It invokes callbacks when it encounters elements of that grammar. It is basically the JVM ecosystem equivalent of the classic Yacc / Lex toolchain, and you're no doubt using software that in turn uses ANTLR to provide a parser. ANTLR is *awesome*. You could write a Java compiler. A SQL parser. An email validator. An HTML parser. The sky's the limit! It's used by the best and brightest and so you can be assured that it *will* work! It's used in Groovy, Jython, Hibernate, MySQL Workbench, Apache Cassandra, Processing, Presto, Salesforce's Apex, and countless other projects besides.

I was *impressed*.

This expression language was looking great, and ANTLR is excellent, and it was solid engineering all around.

So, naturally, Andy removed ANTLR and replaced it with his own hand-written his own hand-rolled recursive descent parser! Amazing! (Who *DOES* that?)

I was *SO* impressed!

![](https://i.imgflip.com/18xaq7.jpg)

SpEL is boss-sauce software, friends. It's used all over the Spring ecosystem, in Spring Framework for evaluation purposes; in Spring Security for certain kinds of access control rules; in Spring Integration to evaluate expressions against messages; in Spring Data to tie specific queries to other contexts (like Spring Security). The list goes on.

In the intervening decade, SpEL has grown even more magical. It even has a compiler! That's bananas because that compilation step can be entirely transparent to the user. And you can use it for whatever you'd like, both in Spring configuration and by itself, as a standalone library.

Let's look at an example.

You'll need the following dependencies.

-   This is included by default in every Spring Boot project on [the Spring Initializr](http://start.spring.io) - `org.springframework.boot` : `spring-boot-starter`

Here's the code:

```java
Copypackage bootiful.el;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.expression.EvaluationContext;
import org.springframework.expression.Expression;
import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.SpelCompilerMode;
import org.springframework.expression.spel.SpelParserConfiguration;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.expression.spel.support.StandardEvaluationContext;

@SpringBootApplication
public class BootifulApplication {

	@Bean
	Bar bar(@Value("#{ foo.name }") String name) {
		return new Bar(name);
	}

	@Bean
	Foo foo() {
		return new Foo();
	}

	@Bean
	ApplicationListener<ApplicationReadyEvent> ready() {
		return event -> {

			SpelParserConfiguration configuration = new SpelParserConfiguration(//
					SpelCompilerMode.IMMEDIATE, ClassLoader.getSystemClassLoader());
			ExpressionParser expressionParser = new SpelExpressionParser(configuration);

			double randomProperty = evaluate(expressionParser, "randomProperty", new MyContext());
			System.out.println("randomProperty: " + randomProperty);

			String uppercase = evaluate(expressionParser, "'andy clement for president'.toUpperCase()", null);
			System.out.println("uppercase: " + uppercase);
		};
	}

	@SuppressWarnings("unchecked")
	private static <T> T evaluate(ExpressionParser expressionParser, String expression, Object context) {
		Expression expression2 = expressionParser.parseExpression(expression);
		if (context != null) {
			EvaluationContext evaluationContext = new StandardEvaluationContext(context);
			return (T) expression2.getValue(evaluationContext);
		} //
		else {
			return (T) expression2.getValue();
		}
	}

	public static void main(String[] args) {
		System.setProperty("spring.profiles.active", "el");
		SpringApplication.run(BootifulApplication.class, args);
	}

}

@Data
class Foo {

	private String name = getClass().getName();

}

@Data
class Bar {

	Bar(@Value("#{ foo.name }") String name) {
		System.out.println("name: " + name);
	}

}

@Data
class MyContext {

	private final double randomProperty = Math.random();

	public int factorial(int n) {
		if (n == 0)
			return 1;
		else
			return (n * factorial(n - 1));
	}

}
```

Here's what I put into my `application.properties`:

```properties
Copyspring.main.web-application-type=none
```

There are two things to look for in this application: using SpEL in a standalone context and using SpEL as part of your Spring application.

In the `ApplicationListener<ApplicationReadyEvent>` I manually instantiate an instance of `SpelExpressionParser`, against which I can evaluate SpEL expressions. I show how to configure a custom context (an object against which the expression may invoke methods and dereference properties) and use the expression language to call a method on a `String` literal.

I also configure two beans, `Foo` and `Bar`. `Bar` depends on a property in `Foo`, `name`, which dereferences that property using SpEL and then references other beans in the Spring application context.

Did you like this gem at a glance approach? Did you learn anything? As always, I'm keen on hearing from you, so [please sound off on Twitter (@starbuxman)](http://twitter.com/starbuxman) ! I'll be back with another installment of *YMNNALFT*, so be sure not to miss that.