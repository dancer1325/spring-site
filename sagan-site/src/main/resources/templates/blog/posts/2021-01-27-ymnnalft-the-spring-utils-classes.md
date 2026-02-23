---
title: YMNNALFT:  The Spring *Utils Classes
source: https://spring.io/blog/2021/01/27/ymnnalft-the-spring-utils-classes
scraped: 2026-02-23T13:33:22.335Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  January 27, 2021 | 5 Comments
---

# YMNNALFT:  The Spring *Utils Classes

_Engineering | Josh Long |  January 27, 2021 | 5 Comments_

Welcome to another installment of *You May Not Need Another Library For That* (YMNNALFT)! I've spent a lot of time since 2016 illuminating (or trying to, anyway!) some of the more enormous opportunities in the Spring ecosystem in [my Spring Tips videos](http://bit.ly/spring-tips-playlist). Today, however, I come to you in a different spirit, wanting to focus on the little, sometimes hidden, gems that do fantastic things and that might spare you an additional third-party dependency and its implied complexity.

We've all been there. There's some everyday string-manipulation routine you want, so you extract it out into a separate abstract class and expose it as a `static` method. Then, there's some factory method for building a `java.util.Collection<T>`, so you extract it out into a separate class and expose it as a `static` method. And eventually, you've got a whole collection of these things scoured about your codebase, and there's little to no cohesion across them. After all, there's just not that much to it, right? These are, essentially, only global functions, not really methods on stateful objects, *per se*.

It's not to say that building your own static methods is inherently wrong, as long as you approach them with some conventions. We typically use abstract classes with static methods, for example.

It all starts off so innocuously. Of course, it does. You know the cycle. First, a few methods in a solitary class stuck in a jar in a company-wide artifact repository. Then there are classes, plural. Now *packages* have entered the picture. Packages are trouble! You'll start to realize that some thought had better go into an organization, or things will quickly get out of hand. You start accepting pull requests. At some point, there are breaking changes, and developers with pitchforks line up outside your door. You wonder why everyone keeps eating slashing your tires at work. It's too much! So you get the company to open-source your nascent module. It's the *world*'s problem now! Like Tamagotchis and reality TV, there can be no end. And that wide world? Well, that wide world *loves* breaking changes in point-releases, and they will *love you* for them!

Maybe.

There is another way.

There are many third-party utility libraries of varying quality out there: GS Collections, Apache Commons, Guava, etc. There is no shortage of options here. Did you know Spring offers several utility classes in the frameworks themselves, potentially sparing you a dependency? I'm not saying that they'll do everything you might get from the distinguished competition, but you might be surprised! This example will look at a handful of these utility classes, but there are many others on the classpath. You can typically find them by going into your IDE and searching for `*Utils` in your class search or `*Utils.java` in your file search. Let's take a look at some of them.

-   Many of these are included by default in every Spring Boot project through the following transitive (or default) dependency on [the Spring Initializr](http://start.spring.io) - `org.springframework.boot` : `spring-boot-starter`

Here's the code:

```java
Copypackage bootiful.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.log4j.Log4j2;
import org.springframework.aop.support.AopUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.core.ResolvableType;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.jmx.support.JmxUtils;
import org.springframework.stereotype.Component;
import org.springframework.util.*;

import javax.annotation.PostConstruct;
import java.beans.PropertyDescriptor;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.Serializable;
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.util.*;

@Log4j2
@SpringBootApplication
public class BootifulApplication {

	@Data
	@AllArgsConstructor
	@Component
	public static class DemoClass {

		@PostConstruct
		public void begin() {
			log.info("begin()");
		}

		private final List<Map<String, Object>> list = new ArrayList<>();

	}

	@Bean
	ApplicationListener<ApplicationReadyEvent> ready(DemoClass demo) {
		return event -> {

			Assert.notNull(demo.getList(), "the list can't be null");

			beansUtils(demo);
			classUtils();
			systemPropertyUtils();
			fileCopyUtils();
			aop(demo);
			reflection();
			ensure();
			collections();
			serialize();

		};
	}

	private void ensure() {
		int counter = 2;
		Assert.state(counter == 2, () -> "the counter should be 2 or more. Was " + counter);
		Assert.hasText("Hello, world!", () -> "this string should be a non-null, non-empty String");
	}

	private void reflection() {

		ReflectionUtils.doWithFields(DemoClass.class, field -> log.info("field = " + field.toString()));
		ReflectionUtils.doWithMethods(DemoClass.class, method -> log.info("method = " + method.toString()));

		Field list = ReflectionUtils.findField(DemoClass.class, "list");
		log.info(Objects.requireNonNull(list).toString());

		ResolvableType rt = ResolvableType.forField(list);
		log.info(rt.toString());
	}

	private void aop(DemoClass demoClass) {
		Class<?> targetClass = AopUtils.getTargetClass(demoClass);
		log.info("Class<?> is " + targetClass);
		log.info("is AOP proxy? " + AopUtils.isAopProxy(demoClass));
		log.info("is CGlib proxy? " + AopUtils.isCglibProxy(demoClass));
	}

	private void collections() {
		Collection<String> names = Arrays.asList("Tammie", "Kimly", "Josh");
		boolean contains = CollectionUtils.containsAny(names, Arrays.asList("Josh"));
		Assert.state(contains, () -> "one or more of the names in " + names.toString() + " should be present");
	}

	private void serialize() {
		Customer in = new Customer(593232329, "Josh");
		byte[] bytes = SerializationUtils.serialize(in);
		Customer out = (Customer) SerializationUtils.deserialize(bytes);
		Assert.state(out.getId() == in.getId() && out.getName().equals(in.getName()),
				() -> "the " + Customer.class.getName() + " did not serialize correctlyy");
	}

	private void fileCopyUtils() {
		Resource cpr = new ClassPathResource("/application.properties");
		try (Reader r = new InputStreamReader(cpr.getInputStream())) {
			String contents = FileCopyUtils.copyToString(r);
			log.info("application.properties contents: " + contents);
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	private void systemPropertyUtils() {
		String resolvedText = SystemPropertyUtils.resolvePlaceholders("my home directory is ${user.home}");
		log.info("resolved text: " + resolvedText);
	}

	private void classUtils() {
		Constructor<DemoClass> demoClassConstructor = ClassUtils.getConstructorIfAvailable(DemoClass.class);
		log.info("demoClassConstructor: " + demoClassConstructor);
		try {
			DemoClass demoClass = demoClassConstructor.newInstance();
			log.info("newInstance'd demoClass: " + demoClass);
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	private void beansUtils(DemoClass demo) {
		PropertyDescriptor[] descriptors = BeanUtils.getPropertyDescriptors(demo.getClass());
		for (PropertyDescriptor pd : descriptors) {
			log.info("pd: " + pd.getName());
		}
	}

	public static void main(String[] args) {
		SpringApplication.run(BootifulApplication.class, args);
	}

}

@Data
class Customer implements Serializable {

	static final long serialVersionUID = 1L;

	private int id;

	private String name;

	public Customer(int id, String name) {
		this.id = id;
		this.name = name;
	}

}
```

This example introduces a *smörgåsbord* of various `Utils` class implementations in the Spring ecosystem. It looks at

-   `BeanUtils` - useful functions for dealing with JavaBeans
-   `ClassUtils` - useful functions for asking questions reflectively about types
-   `SystemPropertyUtils` - useful functions for dealing with `System` properties
-   `FileCopyUtils` - useful functions for copying `InputStream` and `OutputStream` implementations
-   `AopUtils` - useful functions for dealing with Spring's AOP proxies
-   `ReflectionUtils` - useful functions for dealing with reflection, broadly
-   `Assert` - useful functions to help with design-by-contract-style assertions
-   `CollectionUtils` - useful functions for working various Java `java.util.Collection` types
-   `SerializeUtils` - useful functions for working with Java serialization

There's a *ton* of exciting stuff, and this dense example doesn't even begin to scratch the surface!

Did you like this gem at a glance approach? Did you learn anything? As always, I'm keen on hearing from you, so [please sound off on Twitter (@starbuxman)](http://twitter.com/starbuxman) ! I'll be back with another installment of *YMNNALFT*, so be sure not to miss that.