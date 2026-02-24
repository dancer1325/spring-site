---
title: A Java configuration option for Spring
source: https://spring.io/blog/2006/11/28/a-java-configuration-option-for-spring
scraped: 2026-02-24T09:33:21.111Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rod Johnson |  November 28, 2006 | 0 Comments
---

# A Java configuration option for Spring

_Engineering | Rod Johnson |  November 28, 2006 | 0 Comments_

Thanks to our philosophy of pluggability and a lot of hard work in the implementation, the Spring IoC container (like most of the rest of Spring) is extremely flexible.

One point that is often missed is that Spring configuration need not be in XML, although the XML format is by far the most commonly used. Spring has its own internal metadata format in the form of the BeanDefinition interface and subinterfaces. The BeanFactory and ApplicationContext implementations that represent IoC container instances are powered by this Java metadata, and are quite separate from metadata parsing, which is normally performed by BeanDefinitionReader implementations.

The BeanDefinition metadata was not originally designed with the end developer in view. With Spring 2.0, NamespaceHandlers (classes that handle XML extension namespaces) generate BeanDefinition metadata, and we introduced the BeanDefinitionBuilder, with a fluent API to make this easier. But generating BeanDefinition metadata nevertheless remains in the realm of infrastructure coding, rather than something to do daily as you code business logic and define regular Spring beans.

Today I want to describe a new option for defining beans in Java code, which *is* targeted to end users (developers) rather than infrastructure providers. This is currently a milestone release [add-on](http://blog.interface21.com/main/2006/11/28/a-java-configuration-option-for-spring/) to the Spring core, but may make its way into Spring proper.

Let start with an example:

```java
Copy@Configuration
public class MyConfig {
   @Bean
   public Person rod() {
      return new Person("Rod Johnson");
   }

   @Bean(scope = Scope.PROTOTYPE)
   public Book book() {
      Book book = new Book("Expert One-on-One J2EE Design and Development");
      book.setAuthor(rod());  // rod() method is actually a bean reference !
      return book;
   }
}
```

The @Configuration annotation identifies this object as a special configuration class. Each @Bean method defines a bean. The name of the bean is the name of the method. It's possible to define additional aliases with the annotation, but its best to pick up the name from the method, rather than the annotation, as it means that the compiler can take care of ensuring ambiguity.

Beans are configured in Java code, using constructors, properties or arbitrary method calls. Note that a call to another bean method establishes a dependency from the "book" bean to the "rod" bean. But there are key advantages over instantiating objects in Java without framework support: for example:

-   Every @Bean is a Spring component and can take advantage of all Spring services, such as declarative transaction management
-   Every public @Bean method is added to the Spring container, so it's eligible for injection into other objects, JMX export and other benefits.
-   It fits smoothly into an existing Spring environment.

It may be easier to follow what is happening by comparing this with XML definitions to achieve the same result, which would look as follows:

```xml
Copy<bean id="rod" class="Person" scope="singleton">
   <constructor-arg>Rod Johnson</constructor-arg>
</bean>

<bean id="book" class="Book" scope="prototype">
   <constructor-arg>Expert One-on-One J2EE Design and Development</constructor-arg>
   <property name="author" ref="rod"/>
</bean>
```

Although it is based on annotations, this Java config mechanism is unique in uses of annotations I've seen that annotations are not included in the core business logic, but in separate configuration classes. Effectively, it's a DSL for configuration. So it retains the non-invasive promise of Spring: you don't need to change your Java code to use it.

The configuration class is analogous to an XML bean definition file, and thus the @Configuration annotation contains some similar options to the the <beans> element, such as default autowire or lazy init. For example:

```java
Copy
@Configuration(defaultAutowire = Autowire.BY_TYPE, defaultLazy = Lazy.FALSE)
public class DataSourceConfiguration  extends ConfigurationSupport {
}
```

The @Bean annotation allows options such as scope, and lazy init to be set locally, just as with the <bean> element. The default scope is Singleton, as with XML.

This style of Java configuration has some interesting characteristics. For example:

-   References (such as the reference to the "rod" bean in the example) survive refactoring; any good IDE provides great tool support.

```
Copy<li>Because configurations are Java classes, they can participate in inheritance relationships. For example, you could define a superclass that demands some abstract @Beans to be implemented in subclasses.</li>
<li>It creates a new visibility option. An @Bean method can be protected, it which case it benefits from the usual characteristics of the Spring component, but is not visible externally--that is it not injectable and cannot be obtained by calling getBean() on the IoC context.</li>
```

My experience in showing this to people (for over a year now) is that they sometimes take a moment to grok it, but usually end up quite enthusiastic.

This is *not* intended as a replacement for Spring's XML format. Like Spring 2.0 extension namespaces--and use of properties files which has been possible since Spring 1.0--it's an additional option. Complex applications require multiple types of configuration and Spring aims to provide the best overall solution for configuration. We continue to explore additional forms of configuration.

You will typically mix use of Java and XML configuration. You can use any number of Java configuration classes in the same application context.

The following example uses an XML bean definition to define a MyConfig bean, as shown above, which can be injected like any normal bean. The ConfigurationPostProcessor processes all beans with @Configuration annotations, generating the necessary bean definitions.

```xml
Copy<beans>

 <bean class="..MyConfig"/>

 <bean class="org.springframework.beans.factory.java.ConfigurationPostProcessor"/>
 
 <bean class="SomeRandomBean">
 	<property...
 </bean>
</beans>
```

You can of course have plain old bean definitions, like "SomeRandomBean" in this example, in the same XML. And you could build a context out of Java configuration and existing XML configurations.

Costin has also implemented a convenient application context that uses wildcarding to load classes from the classpath like this:

```java
CopyApplicationContext oneConfig = new  AnnotationApplicationContext(SimpleConfiguration.class.getName());
ApplicationContext aBunchOfConfigs = new AnnotationApplicationContext("**/configuration/*Configuration.class");
```

Classes are examined using ASM, without loading them. In future releases we'll probably offer additional autodetection scenarios.

The release is [here](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=213222). Costin Leau is now the project lead. The code should be considered alpha quality. We include an example of a modified Spring Pet Store, but lessons will undoubtedly be learned from use on real projects.

Costin and I would love your feedback on this feature.

What will happen to this code? Well, it depends on you. It certainly needs feedback (suggestions welcome), and the full range of possibilities (and implementation refinements) will emerge through use in anger, with any technology. It's not currently on the roadmap, but could make its way into a future version of the Spring core if it sparks enough interest.

Also, it needs a snappy name. Suggestions welcome!

---

Although today is the first (alpha) release, this functionality has a surprisingly long history--well over a year. I had a mad fit of coding when attending a software summit in Crested Butte, Colorado in August 2005, with Mark Pollack and Aleks Seovic of the Spring.NET project. I remember writing a lot of code in the back of a Jaguar XJ8 while Aleks drove from the Great Sand Dunes to Denver. I probably needed to write code to take my mind off the danger. I think the genesis of the idea may have actually dated back to a conversation with Howard Lewis Ship at JavaOne 2005...

Sadly I haven't had time to do more than work on this in fits and starts since, so hadn't gotten it to the point where we could release it. Fortunately, Costin Leau, Spring Modules lead and general Spring guru, has had more time for Spring coding since he joined Interface21 early this year, and he's stepped up to take this forward.

The implementation doesn't require any modifications to the Spring core. As I said, the IoC container is highly flexible. In case you're interested, it treats the configuration object as a factory bean and each bean definition is backed by an instance factory method on that object: A mechanism that has been available since Spring 1.1. It does a little bytecode manipulation on the configuration instance, presently using CGLIB, to make sure that repeated calls to singleton scoped @Bean methods always return the same object.