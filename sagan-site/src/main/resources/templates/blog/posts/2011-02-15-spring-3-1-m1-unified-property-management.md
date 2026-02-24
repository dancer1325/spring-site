---
title: Spring 3.1 M1: Unified Property Management
source: https://spring.io/blog/2011/02/15/spring-3-1-m1-unified-property-management
scraped: 2026-02-24T08:46:26.223Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Chris Beams |  February 15, 2011 | 2 Comments
---

# Spring 3.1 M1: Unified Property Management

_Engineering | Chris Beams |  February 15, 2011 | 2 Comments_

In the first [two](http://blog.springsource.com/2011/02/11/spring-framework-3-1-m1-released) [posts](http://blog.springsource.com/2011/02/14/spring-3-1-m1-introducing-profile/) of this series, I described the *bean definition profiles* feature, and how it relates to the *`Environment`* abstraction new in Spring 3.1 M1. Today we'll take a look at a second aspect of the `Environment` -- how it helps simplify the concern of configuration property management.

### Understanding property sources

Spring's `Environment` abstraction provides search operations over a configurable hierarchy of property sources. To explain fully, consider the following:

```java
Copy
ApplicationContext ctx = new GenericApplicationContext();
Environment env = ctx.getEnvironment();
boolean containsFoo = env.containsProperty("foo");
System.out.println("Does my environment contain the 'foo' property? " + containsFoo);
```

In the snippet above, we see a high-level way of asking Spring whether the 'foo' property is defined for the current environment. To answer this question, the `Environment` object performs a search over a set of *`PropertySource`* objects. A `PropertySource` is a simple abstraction over any source of key-value pairs, and Spring's `DefaultEnvironment` is configured with two `PropertySource` objects -- one representing the set of JVM system properties (a la `System.getProperties()`) and one representing the set of system environment variables (a la `System.getenv()`)\[1\]. This means that if a 'foo' system property or 'foo' environment variable is present at runtime, the call to `env.containsProperty("foo")` will return `true`.

The search performed is hierarchical. By default, system properties have precedence over environment variables, so if the 'foo' property happens to be set in both places during a call to `env.getProperty("foo")`, the system property value will 'win' and be returned preferentially over the environment variable.

Most importantly, the entire mechanism is configurable. Perhaps you have a custom source of properties that you'd like to integrate into this search. No problem -- simply implement and instantiate your own `PropertySource` and add it to the set of `PropertySources` for the current `Environment`:

```java
Copy
ConfigurableApplicationContext ctx = new GenericApplicationContext();
MutablePropertySources sources = ctx.getEnvironment().getPropertySources();
sources.addFirst(new MyPropertySource());
```

In the code above, `MyPropertySource` has been added with highest precedence in the search. If it contains a 'foo' property, it will be detected and returned ahead of any 'foo' property in any other `PropertySource`. The `MutablePropertySources` API exposes a number of methods that allow for precise manipulation of the set of property sources. Explore the [Javadoc](http://bit.ly/emBbI6) for full details.

### Putting property sources to use

Now that you understand the basics of property sources and their relationship to the `Environment`, you might be wondering how all of this is relevant to you as a developer of Spring applications. Let's consider a couple of scenarios and see how it all comes together.

**Scenario 1: `${placeholder}` resolution in  statements**

You have a set of Spring configuration files that configure beans specific to certain customers of your application, and you conditionally load those files using  statements containing a placeholder resolving to the value of a 'customer' property:

```xml
Copy
<beans>
	<import resource="com/bank/service/${customer}-config.xml"/>
</beans>
```

Prior to Spring 3.1, the value of placeholders in  elements could be resolved only against JVM system properties or environment variables\[2\]. No longer is this the case. Because the `Environment` abstraction is integrated throughout the container, it's easy to route resolution of placeholders through it. This means that you may configure the resolution process in any way you like: change the precedence of searching through system properties and environment variables, or remove them entirely; add your own property sources to the mix as appropriate.

**Scenario 2: `${placeholder}` resolution in bean definitions**

Most Spring users will be familiar with the use of `PropertyPlaceholderConfigurer` or `[context:property-placeholder/](context:property-placeholder/)` to replace `${...}` placeholders in Spring bean definitions. Here is a typical configuration:

```xml
Copy
<context:property-placeholder location="com/bank/config/datasource.properties"/>

<bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
	<property name="driverClass" value="${database.driver}"/>
	<property name="jdbcUrl" value="${database.url}"/>
	<property name="username" value="${database.username}"/>
	<property name="password" value="${database.password}"/>
</bean>
```

As of Spring 3.1, the `[context:property-placeholder/](context:property-placeholder/)` no longer registers a `PropertyPlaceholderConfigurer`, but rather a `PropertySourcesPlaceholderConfigurer`\[3\]. This component still looks to the `datasource.properties` file to reslove the `${database.*}` placeholders above, but will fall back to the set of `PropertySources` for the current `Environment` if the properties are not found in the file. Again this gives you more control; prior to this change, the only fallback options were system properties and environment variables.

### Manipulating property sources in a web application

So far we've seen how to access and manipulate property sources in a standalone application where we have programmatic access to an `ApplicationContext`. In reality, however, many Spring applications are webapps in which the `ApplicationContext` is managed for you by Spring's `ContextLoaderListener`. For this reason we've introduced the *`ApplicationContextInitializer`* interface and its companion, the *`contextInitializerClasses`* servlet context param. Take a look:

`web.xml`

```xml
Copy
<context-param>
    <param-name>contextInitializerClasses</param-name>
    <param-value>com.bank.MyInitializer</param-value>
</context-param>
```

```java
Copy
public class MyInitializer implements ApplicationContextInitializer<ConfigurableWebApplicationContext> {
	public void initialize(ConfigurableWebApplicationContext ctx) {
		PropertySource ps = new MyPropertySource();
		ctx.getEnvironment().getPropertySources().addFirst(ps);
		// perform any other initialization of the context ...
	}
}
```

Implementing and registering an `ApplicationContextInitializer` provides a simple way to interact with your application context *before it is refreshed*. This is a perfect place to manipulate property sources, but you could also call `setConfigLocations(...)` or any other method designed to be called prior to `refresh()`.

### Summary

Spring's `Environment` abstraction provides a single location to configure both *profiles* and *properties*. Profiles, as described in earlier posts, determine which bean definitions should be registered for a given deployment context; the property support described in this post provides a consistent abstraction over any source of properties, resulting in more flexible property access and placeholder resolution throughout your application configuration.

In the next post in this series we'll take a look at how Spring 3.1 makes 100% Java-based (read: XML-free) application configuration a reality with *`FeatureSpecification`* support -- an natural evolution out of the `@Configuration` class support introduced in Spring 3.0.

### Footnotes

\[1\]: These default property sources are present for `DefaultEnvironment`, for use in standalone applications. `DefaultWebEnvironment` is populated with additional default property sources including servlet config and servlet context parameters. `DefaultPortletEnvironment` similarly has access to portlet config and portlet context parameters as property sources. Both can optionally enable a `JndiPropertySource`. See [Javadoc](http://bit.ly/fNBkNG) for details.

\[2\]: Because processing of elements necessarily occurs before `BeanFactoryPostProcessors` are invoked, meaning that even `PropertyPlaceholderConfigurer` could not help here. Because the `Environment` and its set of `PropertySources` are configured before container refresh, placeholders in elements can be resolved against the `Environment` without any lifecycle issues.

\[3\]: In certain cases, `[context:property-placeholder/](context:property-placeholder/)` **will** still register a `PropertyPlaceholderConfigurer`. In the 3.1 version of the `spring-context` schema, the `system-properties-mode` attribute has been removed from the `property-placeholder` element. This is because this attribute no longer makes sense in a `PropertySources`\-/`Environment`\-aware world. However, if you build against Spring 3.1 but still use the `spring-context-3.0.xsd` schema and set the `system-properties-mode` attribute, `[context:property-placeholder](context:property-placeholder)` will revert to registering a `PropertyPlaceholderConfigurer` in order to honor the exact semantics of this setting. This approach preserves backward compatibility in any case.