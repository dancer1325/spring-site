---
title: Spring Java Configuration - What\'s New in M3
source: https://spring.io/blog/2008/03/27/spring-java-configuration-what-s-new-in-m3
scraped: 2026-02-24T09:19:49.540Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Chris Beams |  March 27, 2008 | 0 Comments
---

# Spring Java Configuration - What's New in M3

_Engineering | Chris Beams |  March 27, 2008 | 0 Comments_

Today marks the third milestone release of the [Spring Java Configuration project](http://springframework.org/javaconfig) (JavaConfig for short). The release contains numerous bug fixes and new features - I'll highlight a few of the most interesting changes below, but first let me give a quick refresher as to what JavaConfig is all about.

If you have any experience with Spring, the following snippet of XML configuration will likely be familiar. Let's assume we're looking at a file named application-config.xml:

```xml
Copy
<beans>
	<bean id="orderService" class="com.acme.OrderService"/>
		<constructor-arg ref="orderRepository"/>
	</bean>
	<bean id="orderRepository" class="com.acme.OrderRepository"/>
		<constructor-arg ref="dataSource"/>
	</bean>
</beans>
```

Of course, this XML configuration will ultimately serve as a set of instructions for a Spring ApplicationContext to instantiate and configure our beans:

```java
Copy
ApplicationContext ctx = new ClassPathXmlApplicationContext("application-config.xml");
OrderService orderService = (OrderService) ctx.getBean("orderService");
```

JavaConfig simply provides another mechanism to configure the Spring IoC container, this time in pure Java rather than requiring XML to get the job done. Let's port the configuration above to JavaConfig:

```java
Copy
@Configuration
public class ApplicationConfig {
	public @Bean OrderService orderService() {
		return new OrderService(orderRepository());
	}

	public @Bean OrderRepository orderRepository() {
		return new OrderRepository(dataSource());
	}

	public @Bean DataSource dataSource() {
		// instantiate and return an new DataSource ...
	}
}
```

Like the original XML file, this class is simply a set of instructions as to how to construct our application's various components. We'll supply these instructions to an ApplicationContext implementation specifically designed to read and execute Java-based configuration instructions:

```java
Copy
JavaConfigApplicationContext ctx = new JavaConfigApplicationContext(ApplicationConfig.class);
OrderService orderService = ctx.getBean(OrderService.class);
```

And that's it! Well, almost. Of course there's a lot more to JavaConfig, but for the most part the feature set is 1:1 with what's available in Spring's XML config. For full details on how to use JavaConfig, take a look at the [reference documentation](http://static.springframework.org/spring-javaconfig/docs/1.0.0.m3/reference/html/). If you're new to JavaConfig, be sure to check out the [quick start](http://static.springframework.org/spring-javaconfig/docs/1.0.0.m3/reference/html/quick-start.html) section.

At any rate, the benefits of JavaConfig are straightforward:

-   It's pure Java, so there's no XML required
-   You get all the benefits of object-orientation in your configuration code
-   It's type-safe and refactoring-friendly
-   You still get the full power of the core Spring IoC container

With that in mind, let's take a look at what's changed in the M3 release:

##### AnnotationApplicationContext deprecated

Hardly a 'new feature', but this change is important to mention because much of what I'll discuss below revolves around [JavaConfigApplicationContext](http://static.springframework.org/spring-javaconfig/docs/1.0.0.m3/apidocs/org/springframework/config/java/context/JavaConfigApplicationContext.html), the successor to [AnnotationApplicationContext](http://static.springframework.org/spring-javaconfig/docs/1.0.0.m3/apidocs/org/springframework/config/java/context/AnnotationApplicationContext.html). *Why was this change made?* AnnotationApplicationContext posed a significant naming collision with Spring 2.5's *Annotation-Driven Injection* facility. JavaConfig presents a different approach to configuration than Annotation-Driven Injection, so we wanted to make this distinction clear by renaming the class entirely. AnnotationApplicationContext will remain deprecated until the 1.0.0.rc1 release, at which point it will be removed permanently.

##### Type-safety improvements

While the above-mentioned JavaConfigApplicationContext behaves largely like it's predecessor, it also introduces type-safe [getBean()](http://static.springframework.org/spring-javaconfig/docs/1.0.0.m3/apidocs/org/springframework/config/java/context/JavaConfigApplicationContext.html#getBean\(java.lang.Class\)) methods that take full advantage of generics. The following code now works (and from this point forward is the preferred approach to use with JavaConfig):

```java
Copy
JavaConfigApplicationContext context = new JavaConfigApplicationContext(AppConfig.class);
OrderService orderService = context.getBean(OrderService.class);
```

Look ma, no casting! And no string-based lookups, either. Of course, this will beg the question, *"what if two or more objects of type OrderService have been configured in the context?"* This is a situtation that could easily occur, and there are multiple ways to address it. For brevity in this post, I'll simply refer those interested to take a look at the [disambiguation options](http://static.springframework.org/spring-javaconfig/docs/1.0.0.m3/reference/html/creating-bean-definitions.html#typesafe-getbean) section of the reference documentation.

These type-safe getBean() methods have also been fitted onto the [ConfigurationSupport](http://static.springframework.org/spring-javaconfig/docs/1.0.0.m3/apidocs/org/springframework/config/java/support/ConfigurationSupport.html) base class, such that the following is possible:

```java
Copy
@Configuration
public class ApplicationConfig extends ConfigurationSupport {
	public @Bean OrderRepository orderRepository() {
		return new JdbcOrderRepository(this.getBean(DataSource.class));
	}
}
```

##### Major documentation update

We've worked hard to bring JavaConfig's documentation up to par with the quality for which Spring is famous. As linked above, the reference documentation is available in [HTML](http://static.springframework.org/spring-javaconfig/docs/1.0.0.m3/reference/html) as well as [PDF](http://static.springframework.org/spring-javaconfig/docs/1.0.0.m3/reference/pdf/) formats. Note that this documentation is also packaged as part of the regular [zip distributions](https://sourceforge.net/project/showfiles.php?group_id=73357&package_id=213222&release_id=587200) available via SourceForge. As with all the additions in M3, your feedback on the documentation will help improve it as the project moves forward to its 1.0 GA release.

##### Support for JavaConfig in the web tier

Prior to this release, JavaConfig had to be 'bootstrapped' via XML in order to be used in conjunction with Spring's ContextLoaderListener and DispatcherServlet classes. To address this limitation, [JavaConfigWebApplicationContext](http://static.springframework.org/spring-javaconfig/docs/1.0.0.m3/apidocs/org/springframework/config/java/context/JavaConfigWebApplicationContext.html) has been added. Simply specify this class as the contextClass parameter in your web.xml, and you can use your @Configuration classes directly:

```xml
Copy
<web-app>
    <!-- Configure ContextLoaderListener to use JavaConfigWebApplicationContext
         instead of the default XmlWebApplicationContext -->
    <context-param>
        <param-name>contextClass</param-name>
        <param-value>org.springframework.config.java.context.JavaConfigWebApplicationContext</param-value>
    </context-param>
    <!-- Configuration locations must consist of one or more comma- or space-delimited
         fully-qualified @Configuration classes -->
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>example.RootApplicationConfig</param-value>
    </context-param>
    <!-- Bootstrap the root application context as usual using ContextLoaderListener -->
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>
    <!-- Declare a Spring MVC DispatcherServlet as usual -->
    <servlet>
        <servlet-name>dispatcher-servlet</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <!-- Configure DispatcherServlet to use JavaConfigWebApplicationContext
             instead of the default XmlWebApplicationContext -->
        <init-param>
            <param-name>contextClass</param-name>
            <param-value>org.springframework.config.java.context.JavaConfigWebApplicationContext</param-value>
        </init-param>
        <!-- Again, config locations must consist of one or more comma- or space-delimited
             and fully-qualified @Configuration classes -->
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>example.web.WebBeansConfig</param-value>
        </init-param>
    </servlet>
</web-app>
```

In practice, it is likely that many folks will want to continue using a combination of XML and JavaConfig, especially in web applications. This approach still works just fine (see [combining configuration approaches](http://static.springframework.org/spring-javaconfig/docs/1.0.0.m3/reference/html/combining-config-approaches.html)), but it was important to the team that we offer users a truly "XML-free" approach if they so desire it. This change rounds out that possibility.

##### Modularity improvements with new @Import annotation

Much like Spring XML config's <import/> element, it is now possible to have one @Configuration class import another (and thus all its bean definitions):

```java
Copy
@Configuration
public class FooConfig {
	public @Bean Foo foo() { ... }
	public @Bean Bar bar() { ... }
}

@Import(FooConfig.class)
@Configuration
public class ApplicationConfig {
	public @Bean ServiceA serviceA() { ... }
}

JavaConfigApplicationContext ctx = new JavaConfigApplicationContext(ApplicationConfig.class);
// foo, bar, and serviceA beans will all be available
ctx.getBean(ServiceA.class); // works
ctx.getBean(Foo.class); // works too
```

This functionality simply provides another tool for effectively modularizing @Configuration classes.

##### Externalizing values with @ExternalValue and @ResourceBundles

Several have suggested introducing functionality in JavaConfig equivalent to that of PropertyPlaceholderConfigurer for the purpose of accessing values in properties files during configuration. M3 provides just that. Let's assume we have a typical DataSource that needs its JDBC url, username and password. As per usual, these values are stored in a properties file. For the example below, that properties file will be available in our classpath at com/acme/datasource.properties. Contents of that file are as follows:

```code
Copydatasource.url=jdbc:localhost:...
datasource.username=scott
datasource.password=tiger
```

Using @ResourceBundles and @ExternalValue, we can now access these properties from within JavaConfig:

```java
Copy
@Configuration
@ResourceBundles("classpath:/com/acme/datasource")
public abstract class ApplicationConfig {
	public @Bean OrderService orderService() {
		return new OrderServiceImpl(orderRepository());
	}

	public @Bean OrderRepository orderRepository() {
		return new JdbcOrderRepository(dataSource());
	}

	public @Bean DataSource dataSource() {
		return new DriverManagerDataSource(url(), username(), password());
	}

	abstract @ExternalValue("datasource.url") String url();
	abstract @ExternalValue("datasource.username") String username();
	abstract @ExternalValue("datasource.password") String password();
}
```

A couple of things to note here: see how the value of the @ResourceBundles annotation doesn't end in .properties? This is because JavaConfig is using Spring's internationalization infrastructure underneath, and will look for variations on datasource.properties such as datasource\_en.properties according to the current locale. Also, while this example supplied string values to the @ExternalValue annotation, the default is to look up properties based on the method name. So, if we hadn't supplied @ExternalValue("datasource.url") String url(), and rather just @ExternalValue String url(), JavaConfig would have looked for a property named 'url'.

##### What's next?

A number of users have been asking when we'll see a 1.0 release of JavaConfig, and with good reason - it's been a long time coming! There remain a number of important changes, both regarding internals as well as the public API that must be addressed before we're ready to call this 'production quality' software. Expect to see more frequent milestones and release candidates in the coming weeks. Bottom line: JavaConfig is now and will continue to be fully supported going forward. If you'd like to keep an eye on progress, please visit JavaConfig's [JIRA issue tracking](http://jira.springframework.org/browse/SJC), especially the [road map](http://jira.springframework.org/browse/SJC?report=com.atlassian.jira.plugin.system.project:roadmap-panel) view.

##### Feedback Requested!

If you've made it this far through the post it's a safe bet you're at least *interested* in JavaConfig :) So take the next step! [Download the release](https://sourceforge.net/project/showfiles.php?group_id=73357&package_id=213222&release_id=587200), [read the documentation](http://static.springframework.org/spring-javaconfig/docs/1.0.0.m3/reference/html/), give it a spin and [let us know what you think](http://jira.springframework.org/browse/SJC).

*\[**Update 3/27**: Post was accidentally deleted, and so re-posted - apologies to those who had already written comments, as they were deleted in the process.\]* *\[**Update 4/4**: fixed a typo in the sample web.xml.\]*