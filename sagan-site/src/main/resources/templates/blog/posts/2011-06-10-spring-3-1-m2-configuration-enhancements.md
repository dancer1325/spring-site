---
title: Spring 3.1 M2: Configuration Enhancements
source: https://spring.io/blog/2011/06/10/spring-3-1-m2-configuration-enhancements
scraped: 2026-02-24T08:40:11.931Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Chris Beams |  June 10, 2011 | 0 Comments
---

# Spring 3.1 M2: Configuration Enhancements

_Engineering | Chris Beams |  June 10, 2011 | 0 Comments_

As Juergen mentioned in his post yesterday, and as I've mentioned in [my](http://bit.ly/eHuiFi) [previous](http://bit.ly/lquUts) [posts](http://bit.ly/kvkApq) on 3.1 M1, one of the major themes of Spring 3.1 is completing our vision for code-based configuration in Spring. We think a modern enterprise Java application should have a choice between Java and XML as first class options for its configuration. In this post we'll see how Spring 3.1 M2 helps make this a reality.

Note that although Java-based configuration has been available since Spring 3.0, with this release it is now on par with many more of the XML-based features that have been developed over the years. We think the result is very appealing, and in some cases even offering clear advantages over XML-based configuration. In short: if you didn't consider it in 3.0 you really should look at it closely this time around.  

## Code equivalents for Spring's XML namespaces

If you've been watching things closely, you'll recall that we introduced the idea of `[FeatureSpecification](http://bit.ly/lT3bcV)` classes and `@Feature` methods in 3.1 M1. As it turns out, we've decided to replace this with a different mechanism in 3.1 M2. Why? Because although `FeatureSpecification` classes provided a convenient mechanism for configuring features of the Spring container like annotation-driven transaction management and component-scanning, that convenience came with two downsides: lack of extensibility, and lack of implementation transparency. The more we thought about it, the more we realized we could do even better. While `FeatureSpecification` classes mirrored the XML namespaces closely through fluent APIs, the new solution takes a different shape - one specifically designed to take advantage of Java on its own terms.

For short, we call the new mechanism "`@Enable`" annotations. These annotations are applied at the type level on `@Configuration` classes. Let's take `@EnableTransactionManagement` for an example. Most users will be familiar with the following Spring XML snippet:

```xml
Copy
<beans>
  <tx:annotation-driven/>
</beans>
```

This of course enables Spring's support for transaction management using the `@Transactional` annotation. Now let's see the equivalent configuration in code:

```java
Copy
@Configuration
@EnableTransactionManagement
public class AppConfig {
     // ...
}
```

Pretty simple, huh? Of course there's much more to say, and I would encourage everyone to take a look at the Javadoc for the `@Enable` annotations we've delivered in this release. You'll find they contain plenty of context, examples and references to important related types. It should be everything you need to get started. Of course, we'll also be updating the reference documentation prior to 3.1 GA, but we skipped this for M2 simply because the Javadoc has seen a lot of love.

-   `[@EnableTransactionManagement](http://bit.ly/l2Ousb)`
-   `[@EnableAsync](http://bit.ly/jEWWdR)`
-   `[@EnableScheduling](http://bit.ly/lYjXl9)`
-   `[@EnableLoadTimeWeaving](http://bit.ly/jubz1k)`
-   `[@EnableWebMvc](http://bit.ly/ilwUGz)`

Take a look as well at the Javadoc for [`@Configuration`](http://bit.ly/j2T00Y), which has been revised considerably in M2 to show off the major integrations with other annotations and mechanisms like the new [`Environment`](http://bit.ly/mSc3c8) abstraction.

Regarding the `@EnableWebMvc` annotation, this is one great example where Java-based configuration proves to have real benefits over the XML namespace alternative. Rossen will be posting on this topic in detail later in this series, so stay tuned for that.

  

## Hibernate SessionFactory builder APIs

Spring's support for Hibernate has always been one of the more popular features of the framework, and it's always been configured via XML. In M2 we've introduced the `SessionFactoryBuilder` and `AnnotationSessionFactoryBuilder` APIs which make code-based configuration of the Hibernate `SessionFactory` a snap. Check it out:

```java
Copy
@Configuration
public class DataConfig {
     @Bean
     public SessionFactory sessionFactory() {
         return new AnnotationSessionFactoryBuilder()
             .setDataSource(dataSource())
             .setPackagesToScan("com.myco")
             .buildSessionFactory();
     }
}
```

See the Javadoc for more examples and specific details:

-   `[SessionFactoryBuilder](http://bit.ly/jrzl0v)`
-   `[AnnotationSessionFactoryBuilder](http://bit.ly/mAX3PS)`

  

## XML-free JPA configuration

Spring users working with JPA will be familiar with our `LocalContainerEntityManagerFactoryBean`. We've added a '`packagesToScan`' property that allows you to drop persistence.xml altogether! This is, by the way, very similar to the property of the same name on Spring's Hibernate `AnnotationSessionFactoryBean`. Here's an example:

```java
Copy
@Configuration
public class DataConfig {
     @Bean
     public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
         LocalContainerEntityManagerFactoryBean emf =
             new LocalContainerEntityManagerFactoryBean();
         emf.setDataSource(dataSource())
         emf.setPackagesToScan("com.myco")
         return emf;   
     }
}
```

-   `[LocalContainerEntityManagerFactoryBean#setPackagesToScan](http://bit.ly/lZmNRj)`

  

## Leaving web.xml behind

Servlet 3.0 introduces some very interesting new facilities for code-based configuration of the servlet container. Essentially, the `ServletContext` API has been enhanced to allow users to register servlets, filters and listeners in a class-based or instance-based fashion. Take a look:

-   [`ServletContext#addServlet(String, Servlet)`](http://bit.ly/kWcyHR)
-   [`ServletContext#addFilter(String, Filter)`](http://bit.ly/jMCZDG)

This means that it's now possible to register servlet-oriented components like Spring's `DispatcherServlet` and `ContextLoaderListener` programmatically, instead of declaratively via web.xml.

All that's missing is a bootstrap mechanism -- a place to perform these registrations at a well-defined point in the servlet container lifecycle. Fortunately, Servlet 3.0 addresses this as well, with `ServletContainerInitializer`.

`ServletContainerInitializer` is a low-level SPI primarily targeted for use by frameworks like Spring. I'll leave the details to the Javadoc (links below), but in short, Spring 3.1 M2 now provides a very convenient `WebApplicationInitializer` interface that works in concert with the `ServletContainerInitializer` SPI to allow you to bootstrap the servlet container programmatically. Here's a quick example:

```java
Copy
public class MyWebAppInitializer implements WebApplicationInitializer {

    @Override
    public void onStartup(ServletContext container) {
      XmlWebApplicationContext appContext = new XmlWebApplicationContext()
      appContext.setConfigLocation("/WEB-INF/spring/dispatcher-config.xml");

      ServletRegistration.Dynamic dispatcher =
        container.addServlet("dispatcher", new DispatcherServlet(appContext));
      dispatcher.setLoadOnStartup(1);
      dispatcher.addMapping("/");
    }

}
```

As you can see, `DispatcherServlet` now sports a constructor that accepts a `WebApplicationContext`. Here's the Javadoc:

-   `[DispatcherServlet#DispatcherServlet(WebApplicationContext)](http://bit.ly/l3XXjs)`

And while we used an `XmlWebApplicationContext` above, you can of course opt for `AnnotationConfigWebApplicationContext` instead and bootstrap completely via `@Configuration` classes.

-   `[AnnotationConfigWebApplicationContext](http://bit.ly/lZmNRj)`

When the `spring-web` module JAR is present on your classpath, your `WebApplicationInitializer` implementation(s) are detected and processed automatically by Spring in conjunction with the `ServletContainerInitializer` mechanism. This means you can package them exactly as you see fit in your application (goodbye, WEB-INF!) We've tested all of this successfully on Glassfish 3.1 and Tomcat 7.0.15, so now is a great time to get your feet wet with both Spring 3.1 and Servlet 3.0.

For complete usage instructions, take a look at the Javadoc for `WebApplicationInitializer` itself:

-   `[WebApplicationInitializer](http://bit.ly/iviLkm)`

And for a complete (and concise) example of migrating from web.xml `WebApplicationInitializer`, check out this commit from the 'servlet3' branch of Spring's Greenhouse reference application:

-   Greenhouse `[web.xml -> WebApplicationInitializer](http://bit.ly/lrDHja)`

  

## Improved support for externalized values

M1 introduced the `Environment` abstraction and a unified `[PropertySource]( http://bit.ly/kvkApq)` API. In M2, our goal is to make these components as easy to configure and use as possible. The new `@PropertySource` annotation allows you to contribute property sources to the environment from within your `@Configuration` classes:

```java
Copy
 @Configuration
 @PropertySource("classpath:/com/myco/app.properties")
 public class AppConfig {
     @Autowired
     Environment env;

     @Bean
     public TestBean testBean() {
         TestBean testBean = new TestBean();
         testBean.setName(env.getProperty("testbean.name"));
         return testBean;
     }
 }

```

This is a different approach from the traditional `PropertyPlaceholderConfigurer` (`<context:property-placeholder>`) approach. Here, we're contributing a property source to the environment, injecting the environment into our `@Configuration` class, and then looking up the properties needed using the environment's `#getProperty` family of methods. Check out the Javadoc for `@PropertySource` and `Environment` for full details.

-   [@PropertySource](http://bit.ly/kOQQ6g)
-   [Environment](http://bit.ly/mSc3c8)
-   [PropertyResolver](http://bit.ly/m2vMUQ) (superinterface for Environment)

  

## Summary

As you can see, we really do have a major theme going on here. From Java-based alternatives to Spring's XML namespaces and `FactoryBeans` to eliminating even non-Spring XML like web.xml and persistence.xml, we can now proudly say that Spring's code-based configuration is first-class throughout the framework. The only thing remaining is your feedback!

As Juergen mentioned, now is the time to try out 3.1 if you haven't already started. We're moving into the release candidate phase now, which is the perfect time to make improvements based on your real-world usage. Please let us know how it goes!

Oh, and one more thing... If you haven't already noticed, Spring is now on Twitter! Follow [@springframework](http://bit.ly/kWf6xm) to stay up to date with releases and for insights into Spring from the framework itself. Hope to see you there and thanks for reading!