---
title: Spring 3.1 M1: Introducing FeatureSpecification support
source: https://spring.io/blog/2011/02/17/spring-3-1-m1-introducing-featurespecification-support
scraped: 2026-02-24T08:46:08.410Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Chris Beams |  February 17, 2011 | 0 Comments
---

# Spring 3.1 M1: Introducing FeatureSpecification support

_Engineering | Chris Beams |  February 17, 2011 | 0 Comments_

*UPDATE: The `FeatureSpecification` functionality described in this blog post was removed in Spring Framework 3.1 M2 in favor of `@Enable*` annotations. See the [3.1 M2 announcement](http://blog.springsource.org/2011/06/10/spring-3-1-m2-configuration-enhancements) for more information.*

### Introduction

Earlier [in](http://blog.springsource.com/2011/02/11/spring-framework-3-1-m1-released/) [this](http://blog.springsource.com/2011/02/14/spring-3-1-m1-introducing-profile/) [series](http://blog.springsource.com/2011/02/15/spring-3-1-m1-unified-property-management/) I touched on how the new `@Profile` annotation can be used in conjunction with `@Configuration` classes to take advantage of Spring's *bean definition profiles*. Today, we'll look at an entirely new addition to the code-based configuration landscape in Spring 3.1: *`FeatureSpecification` classes* and their related support.

I've put together a sample project to accompany this post. Find it at [](http://bit.ly/gm8z9o)[https://github.com/cbeams/spring-3.1-featurespec](https://github.com/cbeams/spring-3.1-featurespec) and follow the instructions in the [README](https://github.com/cbeams/spring-3.1-featurespec/blob/master/README).

### From  to `@Bean`

The support for `@Configuration` classes added in Spring 3.0 essentially provides a mechanism for writing bean definitions in Java instead of XML. For example:

`/src/main/com/bank/config/xml/transfer-service-config.xml`

```xml
Copy
<beans>
	<bean id="accountRepository" class="com.bank.repository.internal.JdbcAccountRepository">
		<constructor-arg ref="dataSource"/>
	</bean>

	<!-- 'dataSource' and other bean definitions -->
</beans>
```

can be translated into the following `@Configuration` class:

`/src/main/com/bank/config/xml/TransferServiceConfig.java`

```java
Copy
@Configuration
public class TransferServiceConfig {

	@Bean
	public AccountRepository accountRepository() {
		return new JdbcAccountRepository(dataSource());
	}

	@Bean
	public DataSource dataSource() {
		// create, configure and return the DataSource ...
	}
}
```

And where the XML configuration would be bootstrapped as follows:

```java
Copy
new GenericXmlApplicationContext("com/bank/config/xml/transfer-service-config.xml");
```

the `@Configuration` would be bootstrapped similarly, but taking the class as input:

```java
Copy
new AnnotationConfigApplicationContext(TransferServiceConfig.class);
```

This approach works well, but it is limited to expressing individual bean definitions -- to date there has been no support equivalent to Spring's XML namespaces in the `@Configuration` world. Spring's XML namespaces, such as `[context:*/](context:*/)` and `[tx:*/](tx:*/)` allow for a tremendous amount of configuration to happen in a very concise fashion. For example, and as many users will know, enabling Spring's annotation-driven transaction management is a one-liner in XML:

`/src/main/com/bank/config/xml/transfer-service-config.xml`

```xml
Copy
<tx:annotation-driven transaction-manager="txManager"/>
```

Under the covers, when the `tx:annotation-driven` element is processed, a number of supporting infrastructure-level bean definitions are created on your behalf, none of which you need directly care about, and that's a good thing -- it *just works*, ensuring that any of your Spring beans marked with `@Transactional` are proxied with a `TransactionInterceptor`. Prior to Spring 3.1 M1, in order to emulate this functionality in a `@Configuration` class, you would have had to declare each of these infrastructure beans yourself as individual `@Bean` methods. This is a path some have actually gone down, and I think it's safe to say it is not a preferred approach. To help avoid this extra effort, Spring 3.0 provided the `@ImportResource` annotation to allow `@Configuration` classes to "pull in" XML configuration selectively when namespaces are needed:

`/src/main/com/bank/config/code/TransferServiceConfig.java`

```java
Copy
@Configuration
@ImportResource("com/bank/config/xml/tx-config.xml")
public class TransferServiceConfig {
	// ...
}
```

In the example above, `tx-config.xml` would contain the `[tx:annotation-driven/](tx:annotation-driven/)` declaration. It's nice that this hybrid model works, but again, it's not exactly ideal having to split configuration between XML and code. What's needed is an approach that allows *all* application configuration to be specified in code.

### From  to `TxAnnotationDriven`

To understand `FeatureSpecification` classes, it's best to think first about the nature of many of Spring's XML namespaces. Consider the following:

Each of these elements *specifies* the configuration of a *feature* of the Spring container: the component-scanning feature, the annotation-driven transaction management feature, etc. *`FeatureSpecification`* classes allow users to configure these same features of the Spring container entirely in code.

Let's see a `FeatureSpecification` in action, with the transition from `[tx:annotation-driven/](tx:annotation-driven/)` to `TxAnnotationDriven` as an example:

```xml
Copy
<beans>
    <tx:annotation-driven transaction-manager="txManager"/>
</beans>
```

becomes:

`/src/main/com/bank/config/code/TxFeature.java`

```java
Copy
@FeatureConfiguration
class TxFeature {

	@Feature
	public TxAnnotationDriven txAnnotationDriven(PlatformTransactionManager txManager) {
		return new TxAnnotationDriven(txManager);
	}

}
```

`@FeatureConfiguration` classes are processed by the Spring container in expectation of `@Feature` methods that return `FeatureSpecifation` types such as `TxAnnotationDriven`.

`@FeatureConfiguration` classes are designed as a companion to `@Configuration` classes. The two may be used interchangably when bootstrapping the container:

```java
Copy
ApplicationContext ctx =
	new AnnotationConfigApplicationContext(TransferServiceConfig.class, TxFeatures.class);
TransferService transferService = ctx.getBean(TransferService.class);
// ...
```

and one may `@Import` the other:

```java
Copy
@Configuration
@Import(TxFeature.class)
public class TransferServiceConfig { ... }
```

or:

```java
Copy
@FeatureConfiguration
@Import(TransferServiceConfig.class)
public class TxFeature { ... }
```

`@FeatureConfiguration` classes may contain one or more `@Feature` methods. For example, we could configure both component scanning and annotation-driven transaction management within the same class:

```java
Copy
@FeatureConfiguration
class MyFeatures {

	@Feature
	public TxAnnotationDriven tx(PlatformTransactionManager txManager) {
		return new TxAnnotationDriven(txManager);
	}

	@Feature
	public ComponentScanSpec scan() {
		return new ComponentScanSpec("com.bank.service");
	}

}
```

`@Feature` methods are called by the container at bootstrap time and the `FeatureSpecification` objects returned are processed in order to configure the actual internals of the feature in question. In the case of `TxAnnotationDriven`, proxy creation is configured, a transaction interceptor bean is registered, and so on; in the case of `ComponentScanSpec`, a `ClassPathBeanDefinitionScanner` is configured with the values specified and then run in order to detect and register your classes marked with `@Component` or other Spring stereotype annotations.

`@Feature` methods may accept parameters in order to get references to Spring beans:

```java
Copy
	@Feature
	public TxAnnotationDriven tx(PlatformTransactionManager txManager) {
		return new TxAnnotationDriven(txManager);
	}
```

In order for the parameter to be supplied by the container, there must be a Spring bean of type `PlatformTransactionManager` declared elsewhere, probably within a `@Configuration` class. This notion of 'parameter autowiring' is not new to the framework; for example, this is similar to the way `@InitBinder` and `@RequestMapping` methods work in Spring MVC. The ability to refer to actual spring bean instances keeps things type-safe by avoiding the use of string-based bean names.

The `FeatureSpecification` implementations shipped out of the box with the framework are designed for maximum ease of use when writing `@Feature` methods. As you can see in the screenshot below, `ComponentScanSpec` methods are *chainable*, and the public API of the class has been carefully designed to optimize the content-assist experience when working in your IDE:

[![Content-assist for ComponentScanSpec](http://blog.springsource.com/wp-content/uploads/2011/02/spec-content-assist.png "spec-content-assist")](http://blog.springsource.com/wp-content/uploads/2011/02/spec-content-assist.png)

### Status of efforts

The following FeatureSpecification implementations are already available with the first milestone release:

-   `ComponentScanSpec`
-   `TxAnnotationDriven`
-   `MvcAnnotationDriven`
-   `MvcResources`
-   `MvcViewControllers`
-   `MvcDefaultServletHandler`

You'll see many of the `Mvc*` types put to use in Rossen's upcoming post in this series covering enhancements to Spring MVC in Spring 3.1 M1.

With the second milestone we'll add specification implementations for more of the most commonly used namespace elements such as `[context:mbean-export/](context:mbean-export/)`, `[aop:aspectj-autoproxy/](aop:aspectj-autoproxy/)` and so on.

Note that not all Spring XML namespace elements are alike. Some like those mentioned already are used to configure container features, while others like `[jee:jndi-lookup/](jee:jndi-lookup/)` and everything in the `[util:*/](util:*/)` namespace are simply convenient utilities for doing in XML what can otherwise easily be done in code without any special support. For this reason, don't expect a one-to-one mapping between Spring XML elements and `FeatureSpecification` types. Only those elements that make sense will be translated into code.

### An open model

Just as users may define their own Spring XML namespaces and register their own `NamespaceHandler` and `BeanDefinitionParser` implementations, naturally the entire `Feature*` model is just as open. I'll defer to the [Javadoc](http://static.springsource.org/spring/docs/3.1.0.M1/javadoc-api/org/springframework/context/config/FeatureSpecification.html) for full details, but suffice it to say that you can author your own `FeatureSpecification` types and use them with ease in `@Feature` methods.

And for those that have already implemented custom namespaces and `BeanDefinitionParsers`, you'll be interested to know that within the framework, we've refactored existing `BeanDefinitionParsers` to delegate to `FeatureSpecifications` internally. This greatly simplifies the implementation of a parser, and also ensures reuse of critical bean registration logic across the XML and `@Configuration` styles. We encourage you to consider this same refactoring wherever appropriate.

### A note to the happy XML user

While Spring continues to move forward with code-based configuration, it must be noted again and again that we are in no way eliminating, deprecating or otherwise encouraging users to phase out the use of XML to configure the container. Spring XML remains popular and many users are satisfied with it, especially considering the advanced tooling options that the SpringSource Tool Suite provides for authoring bean configuration files. `@Configuration` -- and now `@FeatureConfiguration` -- classes provide another first-class configuration approach for those that prefer to work in Java as much as possible. So rest assured that Spring XML isn't going anywhere -- indeed, with Spring 3.1 M1 we've given plenty of attention to XML with the addition of nested  elements, the `c:` namespace for more convenient constructor injection, and the `cache:` nampespace to configure Spring's new caching feature.

### Summary

We hope you'll find `FeatureSpecification` classes to be a natural, powerful extension of the existing `@Configuration` class model. Take a look at the [sample application](http://bit.ly/gm8z9o) accompanying this post, and please do provide feedback!