---
title: Property Binding in Spring Boot 2.0
source: https://spring.io/blog/2018/03/28/property-binding-in-spring-boot-2-0
scraped: 2026-02-23T15:30:00.648Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Phil Webb |  March 28, 2018 | 2 Comments
---

# Property Binding in Spring Boot 2.0

_Engineering | Phil Webb |  March 28, 2018 | 2 Comments_

Since the first release of Spring Boot, it has been possible to bind properties to classes by using the `@ConfigurationProperties` annotation. It has also been possible to specify property names in different forms. For example, `person.first-name`, `person.firstName` and `PERSON_FIRSTNAME` can all be used interchangeably. We call this feature “relaxed binding”.

Unfortunately, in Spring Boot 1.x, “relaxed binding” turned out to be a little bit too relaxed. It was quite hard to define exactly what the binding rules were and when specific formats could be used. We also started to get reports of issues that were very hard to fix with our 1.x implementation. For example, in Spring Boot 1.x it is not possible to bind items to a `java.util.Set`.

So, in Spring Boot 2.0, we have set about reworking the way that binding happens. We have added several new abstractions, and we have developed a completely new binding API. In this blog post, we cover some of the new classes and interfaces and describe why they have been added, what they do, and how you can use them in your own code.

## [](#property-sources)[](#property-sources)Property Sources

If you have been using Spring for a while, you are probably familiar with the `Environment` abstraction. This interface is a `PropertyResolver` that lets you resolve properties from some underlying `PropertySource` implementations.

Spring Framework provides `PropertySource` implementations for common things, such as system properties, command line flags, and properties files. Spring Boot automatically configures these implementations in a way that makes sense for most applications (for example, loading `application.properties`).

## [](#configuration-property-sources)[](#configuration-property-sources)Configuration Property Sources

Rather than directly use the existing `PropertySource` interface for binding, Spring Boot 2.0 introduces a new `ConfigurationPropertySource` interface. We introduced a new interface to give us a logical place to implement the relaxed binding rules that were previously part of the binder.

The main API for the interface is pretty simple:

```
CopyConfigurationProperty getConfigurationProperty(ConfigurationPropertyName name);
```

There’s also an `IterableConfigurationPropertySource` variant that implements `Iterable<ConfigurationPropertyName>` so that you can discover all the names that a source contains.

You can adapt a Spring `Environment` to `ConfigurationPropertySources` by using the following code:

```
CopyIterable<ConfigurationPropertySource> sources =
	ConfigurationPropertySources.get(environment);
```

In case you need it, we also provide a simple `MapConfigurationPropertySource` implementation.

## [](#configuration-property-names)[](#configuration-property-names)Configuration Property Names

It turns out the idea of relaxed property names is much easier to implement if you restrict it to one direction. You should always access properties in code using a canonical form, regardless of how they are represented in the underlying source.

The `ConfigurationPropertyName` class enforces these canonical naming rules, which basically boil down to “use lowercase kebab-case names”.

So, for example, you should refer to a property in code as `person.first-name` even if `person.firstName` or `PERSON_FIRSTNAME` is used in the underlying source.

## [](#origin-support)[](#origin-support)Origin Support

As you would expect, the `ConfigurationProperty` object returned from a `ConfigurationPropertySource` encapsulates the actual property value, but it can also include an optional `Origin` object.

An `Origin` is a new interface introduced in Spring Boot 2.0 that lets you pinpoint the exact location that a value was loaded from. There are a number of `Origin` implementations, with perhaps the most useful being `TextResourceOrigin`. This provides details of the `Resource` that was loaded, along with the line and column number of the value.

For `.properties` and `.yaml` files, we have written custom loaders that track origins as the files are loaded. Several existing Spring Boot features have been retrofitted to make use of origin information. For example, binder validation exceptions now show the value that could not be bound *and* the origin. Here’s how the failure analyzer shows the error:

\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\* APPLICATION FAILED TO START \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

Description:

Binding to target org.springframework.boot.context.properties.bind.BindException: Failed to bind properties under 'person' to scratch.PersonProperties failed:

```
CopyProperty: person.name
Value: Joe
Origin: class path resource \[application.properties\]:1:13
Reason: length must be between 4 and 2147483647
```

Action:

Update your application's configuration

## [](#binder-api)[](#binder-api)Binder API

The `Binder` class (in `org.springframework.boot.context.properties.bind`) lets you take one or more `ConfigurationPropertySource` and bind something from them. More precisely, a `Binder` takes a `Bindable` and returns a `BindResult`.

### [](#bindable)[](#bindable)Bindable

A `Bindable` might be an existing Java bean, a class type, or a complex `ResolvableType` (such as a `List<Person>`). Here are some examples:

```
CopyBindable.ofInstance(existingBean);
Bindable.of(Integer.class);
Bindable.listOf(Person.class);
Bindable.of(resovableType);
```

`Bindable` is also used to carry annotation information, but you usually do not need to worry about that.

### [](#bindresult)[](#bindresult)BindResult

Rather than directly return a bound object, the binder returns something called a `BindResult`. Similar to the way that Java 8 `Streams` return `Optional`, a `BinderResult` represents something that may or may not have been bound.

If you try to get the actual result of an unbound object, an exception is thrown. We also provide methods that let you supply alternative values when nothing was bound or `map` to different types:

```
Copyvar bound = binder.bind("person.date-of-birth",
	Bindable.of(LocalDate.class));

// Return LocalDate or throws if not bound
bound.get();

// Return a formatted date or "No DOB"
bound.map(dateFormatter::format).orElse("No DOB");

// Return LocalDate or throws a custom exception
bound.orElseThrow(NoDateOfBirthException::new);
```

### [](#formatting-and-conversion)[](#formatting-and-conversion)Formatting and Conversion

Most `ConfigurationPropertySource` implementations expose their underlying values as strings. When the `Binder` needs to convert a source value to a different type, it delegates to Spring’s `ConversionService` API. If you need to adjust the way that values are converted, you are free to use formatter annotations such as `@NumberFormat` or `@DateFormat`.

Spring Boot 2.0 also introduces some new annotations and converters that are particularly useful for binding. For example, you can now convert values such as `4s` to `Duration`. Look at the `org.springframework.boot.convert` package for details.

### [](#bindhandler)[](#bindhandler)BindHandler

Sometimes, you might need to implement additional logic when binding, and the `BindHandler` interface provides a nice way to do this. Each `BindHandler` has `onStart`, `onSuccess`, `onFailure`, and `onFinish` methods that can be implemented to override behavior.

Spring Boot provides a number of handlers, primarily to support existing `@ConfigurationProperties` binding. For example, the `ValidationBindHandler` can be used to apply `Validator` validation on bound objects.

## [](#configurationproperties)[](#configurationproperties)@ConfigurationProperties

As mentioned at the start of this blog post, `@ConfigurationProperties` has been a Spring Boot feature since the beginning. It is most likely that `@ConfigurationProperties` will continue to be the way that most people perform binding.

Despite the fact that we have re-written the entire binding process, most people do not seem to have had too many problems upgrading Spring Boot 1.5 applications. As long as you follow [the advice in the migration guide](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.0-Migration-Guide#relaxed-binding), you should find things continue to work just fine. If you do find issues when upgrading your applications, please report them on the [GitHub issue tracker](https://github.com/spring-projects/spring-boot/issues) with a small sample that reproduces the problem.

## [](#future-work)[](#future-work)Future Work

We plan to continue developing the `Binder` in Spring Boot 2.1, and the first feature we would like to support is immutable configuration properties. It would be very nice if configuration properties that currently need getters and setters could use constructor-based binding instead:

```
Copypublic class Person {

	private final String firstName;
	private final String lastName;
	private final LocalDateTime dateOfBirth;

	public Person(String firstName, String lastName,
			LocalDateTime dateOfBirth) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.dateOfBirth = dateOfBirth;
	}

	// getters

}
```

We think constructor binding will also work very well with [Kotlin data classes](https://kotlinlang.org/docs/reference/data-classes.html). If you are interested in tracking progress on this feature, subscribe to [issue #8762](https://github.com/spring-projects/spring-boot/issues/8762).

## [](#summary)[](#summary)Summary

We hope that you find the new binding features in Spring Boot 2.0 useful and that you will consider upgrading your existing Spring Boot applications.

If you want to talk generally about binding, or if you have specific enhancement suggestions or issues please do [join us on Gitter](https://gitter.im/spring-projects/spring-boot).