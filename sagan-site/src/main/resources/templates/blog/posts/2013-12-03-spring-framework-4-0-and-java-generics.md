---
title: Spring Framework 4.0 and Java Generics
source: https://spring.io/blog/2013/12/03/spring-framework-4-0-and-java-generics
scraped: 2026-02-24T07:51:01.268Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Phil Webb |  December 03, 2013 | 7 Comments
---

# Spring Framework 4.0 and Java Generics

_Engineering | Phil Webb |  December 03, 2013 | 7 Comments_

With the recent [RC2 release](http://spring.io/blog/2013/12/03/spring-framework-4-0-rc2-available) of Spring Framework 4.0; and GA due before the year's end, here is a little teaser of some of the changes that should improve your life if you work with Java generic types.

Spring has had pretty good Java generics support for a while. For example, with version 3.2 you can easily inject all beans of a specific type into a generic `List` just by using the `@Autowired` annotation:

```java
Copy@Autowired
private List<MyType> beans; 
// all beans that extends MyType will be injected
```

Spring's conversion service, binding system and Web MVC framework are all 'generic aware' and there are also the handy `GenericCollectionTypeResolver` and `GenericTypeResolver` utility classes that you can use in your own code.

Unfortunately, one problem with earlier versions of Spring was that you couldn't use generics as form of qualifier. For example, you might have a configuration like this:

```java
Copy@Configuration
public class MyConfiguration {

	@Bean
	public Store<String> stringStore() {
		return new StringStore();
	}

	@Bean
	public Store<Integer> integerStore() {
		return new IntegerStore();
	}

}
```

If you try to `@Autowire` `Store<String>` with Spring 3.2 you will get the following exception:

*"No qualifying bean of type \[Store\] is defined: expected single matching bean but found 2: stringStore, integerStore"*

Here Spring is telling you that it found two implementations of `Store` and that it can't distinguish between them.

One potential workaround would be to work with the concrete `StringStore` and `IntegerStore` classes directly, rather than using the generic `Store` interface. However, this might not be possible if your implementation classes are 'private', or if they are created dynamically using a proxy (as they would be in the case of a [Spring Data](http://projects.spring.io/spring-data/) `Repository`).

Another option would be to use the `@Qualifier` annotation on both the `@Bean` methods and the `@Autowire` fields to provide hints for Spring about which Bean you actually want.

Fortunately, starting with Spring Framework 4.0, such workarounds will no longer be necessary. Spring 4.0 will automatically consider generics as a form of `@Qualifier`. For example:

```java
Copy@Autowired
private Store<String> s1; // Injects the stringStore bean

@Autowired
private Store<Integer> s2; // Injects the integerStore bean
```

You can event use nested generics when injecting into a list:

```java
Copy// Inject all Store beans as long as they have an <Integer> generic
// Store<String> beans will not appear in this list
@Autowired
private List<Store<Integer>> s;  
```

Behind the scenes, the new [ResolvableType](http://docs.spring.io/spring/docs/4.0.0.RC2/javadoc-api/org/springframework/core/ResolvableType.html) class provides the logic of actually working with generic types. You can use it yourself to easily navigate and resolve type information. Most methods on `ResolvableType` will themselves return a `ResolvableType`, for example:

```java
Copy// Assuming 'field' refers to 's' above
ResolvableType t1 = ResolvableType.forField(field); // List<Store<Integer>> 
ResolvableType t2 = t1.getGeneric(); // Store<Integer>
ResolvableType t3 = t2.getGeneric(); // Integer
Class<?> c = t3.resolve(); // Integer.class

// or more succinctly
Class<?> c = ResolvableType.forField(field).resolveGeneric(0, 0);
```

Here is another example that shows how generic information is retained if you get a supertype or implemented interface.

```java
Copy// Assuming 'm' refers to a method that returns MultiValueMap<Integer, String> 
ResolvableType t1 = ResolvableType.forMethodReturnType(m); // MultiValueMap<Integer, String> 
ResolvableType t2 = t1.asMap(); // Map<Integer, List<String>>
ResolvableType t3 = t2.getGeneric(1); // List<String>
ResolvableType t4 = t3.getGeneric(); // String
Class<?> c = t4.resolve(); // String.class

// or more succinctly
Class<?> c = ResolvableType.forMethodReturnType(m).asMap().resolveGeneric(1, 0);
```

Spring 4.0 will be released December 12th but if you want to give the generic support a spin today you can try the latest 4.0 release candidate build, available in our [milestone repository](https://github.com/spring-projects/spring-framework/wiki/Downloading-Spring-artifacts#wiki-resolving-spring-artifacts).