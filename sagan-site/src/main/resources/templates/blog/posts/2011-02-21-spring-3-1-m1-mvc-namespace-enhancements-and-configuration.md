---
title: Spring 3.1 M1: MVC Namespace Enhancements and @Configuration
source: https://spring.io/blog/2011/02/21/spring-3-1-m1-mvc-namespace-enhancements-and-configuration
scraped: 2026-02-24T08:45:58.305Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rossen Stoyanchev |  February 21, 2011 | 0 Comments
---

# Spring 3.1 M1: MVC Namespace Enhancements and @Configuration

_Engineering | Rossen Stoyanchev |  February 21, 2011 | 0 Comments_

In this 5th post of the [series](http://blog.springsource.com/2011/02/11/spring-framework-3-1-m1-released) [describing](http://blog.springsource.com/2011/02/14/spring-3-1-m1-introducing-profile/) [Spring 3.1 M1](http://blog.springsource.com/2011/02/15/spring-3-1-m1-unified-property-management/) [features](http://blog.springsource.com/2011/02/17/spring-3-1-m1-featurespec/), I will focus on web applications. In the first half I'll discuss enhancements to the MVC XML namespace. Then I'll show how to create the equivalent of the MVC namespace with all Java configuration. At the end I mention some of the Servlet 3.0 related configuration changes you can expect in 3.1 M2.

## MVC Namespace Improvements

Spring MVC 3.0 provided a custom MVC namespace. The centerpiece of the namespace -- the `<mvc:annotation-driven>` element, configured everything required to process requests with annotated controller methods. More importantly though it set up a range of defaults that go along with having to do with type conversion, formatting, validation, reading and writing of the body of requests and respones and so on.

Over time a number of you have requested to gain more control over various aspects the above mentioned default configuration and we've addressed a number of those requests in the 3.1 M1 release.

#### Registration of Formatters

We'll start with the registration of `Converters` and `Formatters`, which is done by supplying your own `ConversionService` instance as follows:

```xml
Copy
<mvc:annotation-driven conversion-service="..." />
```

For custom Formatters you would subclass `FormattingConversionServiceFactoryBean` and register the Formatters in code. Starting with 3.1 M1 you can register `Formatter` and `AnnontationFormatterFactory` types declaratively using a setter:

```xml
Copy
<mvc:annotation-driven conversion-service="conversionService" />

<bean class="org.springframework.format.support.FormattingConversionServiceFactoryBean">
	<property name="formatters">
		<list>
			<bean class="org.example.EmailFormatter"/>
			<bean class="org.example.PhoneAnnotationFormatterFactory"/>
		</list>
	</property>
</bean>
```

You still have the option to register `Converters` and `Formatters` in code. This is done with the *`FormatterRegistrar`* interface introduced in this release. Here is an example:

```java
Copy
public class FinancialInstrumentFormatterRegistry implements FormatterRegistrar {

	public void registerFormatters(FormatterRegistry registry) {
		// Register custom Converters and Formatters here...
	}

}
```

And this is how your `FormatterRegistrary` can be plugged in:

```xml
Copy
<bean class="org.springframework.format.support.FormattingConversionServiceFactoryBean">
	<property name="formatterRegistrars">
		<list>
			<bean class="org.example.FinancialInstrumentFormatterRegistrar"/>
		</list>
	</property>
</bean>
```

So, when should you use a `FormatterRegistrar` as opposed to the formatters setter? A `FormatterRegistrar` is useful when you need to register multiple related converters and formatters for a specific formatting category from one place. Another case is registering a `Formatter` indexed under a field type other than its own generic type <T> or perhaps registering a `Formatter` from a `Printer`/`Parser` pair. A good example of an actual `FormatterRegistrar` implementation is the `JodaTimeFormatterRegistrar` in the Spring Framework so have a look in there.

One last option in the `FormattingConversionServiceFactoryBean` is the ability to turn off default `Formatter` registrations completely through the `registerDefaultFormatters` flag.

#### Registration of HttpMessageConverters

Starting with 3.1 M1 you can register `HttpMessageConverters` through a sub-element of `mvc:annotation-driven`. For example:

```xml
Copy
<mvc:annotation-driven>
	<mvc:message-converters>
		<bean class="com.google.protobuf.spring.http.ProtobufHttpMessageConverter"/>
		<bean class="org.springframework.http.converter.json.MappingJacksonHttpMessageConverter">
			<property name="prefixJson" value="true"/>
		</bean>
	</mvc:message-converters>
</mvc:annotation-driven>	
```

The list of message converters provided this way take priority over the message converters the MVC namespace registers by default. For example, above we've added one custom converter, `ProtobufHttpMessageConverter` and we've also provided an instance of the Spring MVC's `MappingJacksonHttpMessageConvert` customized according to application needs.

If you don't want any message converters to be registered by default use the `register-defaults` attribute on the `<mvc:message-converters>` element.

#### Registration of custom WebArgumentResolvers

A `WebArgumentResolver`, if you've never seen one before, is used for resolving custom arguments in `@RequestMapping` methods. The Spring Mobile project has a `SitePreferenceWebArgumentResolver`. It resolves `SitePreference` method parameter types that indicate whether the user wants the mobile or the full version of a page. Starting with Spring 3.1 M1 you can register custom argument resolvers through the MVC namespace:

```xml
Copy
<mvc:annotation-driven>
	<mvc:argument-resolvers>
		<bean class="org.springframework.mobile.device.site.SitePreferenceWebArgumentResolver"/>
	</mvc:argument-resolvers>
</mvc:annotation-driven>
```

#### Custom MessageCodesResolver

Last in the list is the ability to provide a custom `MessageCodesResolver`:

```xml
Copy
<mvc:annotation-driven message-codes-resolver="messageCodesResolver" />

<bean id="messageCodesResolver" class="org.example.CustomMessageCodesResolver" />
```

There are lots of other things that could be done with the MVC namespace. The above list should help cover the most common use cases for added flexibility but do let us know if you think there are other important ones we've missed.

## From XML to @Configuration

\[callout title=Update\]The information in this section is outdated. The approach was changed in milestone 2. Please read [this Spring MVC 3.1 M2 post](http://blog.springsource.org/2011/06/13/spring-3-1-m2-spring-mvc-enhancements-2/) instead.\[/callout\]

I this part of the post I'll take an existing sample application: the [mvc-showcase](https://src.springframework.org/svn/spring-samples/mvc-showcase) that many of you may be familiar with from prior posts by [Keith Donald](http://blog.springsource.com/author/keithd/) and replace its XML configuration with Java-based configuration. Doing that allow to compare the code and configuration before and after.

The resulting sample application is available for checkout at [spring-3.1-mvc-java-config](https://github.com/rstoyanchev/spring-3.1-mvc-java-config). You can browse the source code directly on GitHub or follow the [README](https://github.com/rstoyanchev/spring-3.1-mvc-java-config/blob/master/README) instructions and get the code locally.

Our first step is to modify web.xml to point to our Java-based configuration and to specify the `ApplicationContext` type to use to process that configuration. Below is the relevant web.xml fragment:

```xml
Copy
<servlet>
	<servlet-name>appServlet</servlet-name>
	<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
	<init-param>
		<param-name>contextClass</param-name>
		<param-value>
			org.springframework.web.context.support.AnnotationConfigWebApplicationContext
		</param-value>
	</init-param>
	<init-param>
		<param-name>contextConfigLocation</param-name>
		<param-value>
			org.springframework.samples.mvc.config.MvcFeatures
			org.springframework.samples.mvc.config.MvcBeans
		</param-value>
	</init-param>
</servlet>
```

Next we will create `MvcFeatures` and `MvcBeans` in the ~.config package. `MvcFeatures` contributes `@Feature` methods and is our main point of interest:

```java
Copy
@FeatureConfiguration
class MvcFeatures {

	@Feature
	public MvcAnnotationDriven annotationDriven(ConversionService conversionService) {
		return new MvcAnnotationDriven().conversionService(conversionService)
			.argumentResolvers(new CustomArgumentResolver());
	}

	// ...

}
```

The above snippet is the equivalent of this XML namespace configuration:

```xml
Copy
<mvc:annotation-driven conversion-service="conversionService">
	<mvc:argument-resolvers>
		<bean class="org.springframework.samples.mvc.data.custom.CustomArgumentResolver"/>
	</mvc:argument-resolvers>
</mvc:annotation-driven>
```

As you can see `MvcAnnotationDriven` provides the same options as the XML elements using a convenient chained method API. Also notice that we've declared a `ConversionService` method parameter. This parameter is auto-wired by type and injected. Its declaration can be found in `MvcBeans`:

```java
Copy
@Configuration
public class MvcBeans {

	@Bean
	public ConversionService conversionService() {
		DefaultFormattingConversionService bean = new DefaultFormattingConversionService();
		bean.addFormatterForFieldAnnotation(new MaskFormatAnnotationFormatterFactory());
		return bean;
	}

	// ...
	
}
```

Note the use of the `DefaultFormattingConversionService` rather than the familiar `FormattingConversionServiceFactoryBean` typically used in XML configuration. This former gives us the same default `Converter` and `Formatter` registrations as the latter but is better suited for use with Java configuration -- it provides a simple constructor instead of the `FactoryBean` lifecycle initialization methods invoked by Spring when using XML.

The remaining portion of `MvcFeatures` declares the equivalent of the the `<mvc:resources>`, `<mvc:view-controller>`, and the `<context:component-scan>` elements:

```java
Copy
@FeatureConfiguration
class MvcFeatures {

	// ...

	@Feature
	public MvcResources resources() {
		return new MvcResources("/resources/**", "/resources/");
	}

	@Feature
	public MvcViewControllers viewController() {
		return new MvcViewControllers("/", "home");
	}

	@Feature
	public ComponentScanSpec componentScan() {
		return new ComponentScanSpec("org.springframework.samples").excludeFilters(
				new AnnotationTypeFilter(Configuration.class), 
				new AnnotationTypeFilter(FeatureConfiguration.class));
	}
}
```

There are two things worth noting. One is that a single instance of `MvcViewControllers` is needed to define any number of view controllers using chained method calls. The second is the use of an exclude filter in the `componentScan()` method in order to prevent `MvcFeatures` and `MvcBeans` from getting registered twice -- once by the `AnnotationConfigWebApplicationContext` and a second time by the component scan.

For completeness this is the remaining part of `MvcBeans`:

```java
Copy
@Configuration
public class MvcBeans {

	// ...

	@Bean
	public InternalResourceViewResolver jspViewResolver() {
		InternalResourceViewResolver bean = new InternalResourceViewResolver();
		bean.setPrefix("/WEB-INF/views/");
		bean.setSuffix(".jsp");
		return bean;
	}

	@Bean
	public MultipartResolver multipartResolver() {
		return new CommonsMultipartResolver();
	}
}
```

The last step is to remove the Spring XML configuration located under `/WEB-INF/spring`.

## Summary

So there we are. We've bootstrapped a web application with all Java-based Spring configuration. Now that `@FeatureConfiguration` and `@Feature` have been introduced you can expect to see more and more `FeatureSpecification` implementations as an alternative to custom XML namespaces. I rather like the end result of the Java configuration but of course that doesn't mean my existing applications need to switch. It's all about having choice. If you prefer the declarative nature of XML and you use an IDE with code completion on class and method names in Spring XML configuration, then using XML namespaces is fine as well.

As heard recently in the webinar [Introducing Spring Framework 3.1](http://www.springsource.com/webinar/introducing-spring-framework-31), in milestone 2 of Spring 3.1 you can expect to see Servlet 3.0 support including XML-free web application setup (i.e no web.xml) in combination with AnnotationConfigWebApplicationContext and the environment abstraction demonstrated in this and the previous posts of this blog series.

We hope you like these features and find them useful. Please let us know what you think.