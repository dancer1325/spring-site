---
title: More on Java Configuration
source: https://spring.io/blog/2007/06/05/more-on-java-configuration
scraped: 2026-02-24T09:28:53.708Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Costin Leau |  June 05, 2007 | 0 Comments
---

# More on Java Configuration

_Engineering | Costin Leau |  June 05, 2007 | 0 Comments_

As most of you already know by now, Spring is not [just about XML](http://blog.interface21.com/main/2007/05/28/conference-season-builds-up-to-springone/) as lately, a number of 'official' extensions to the core offer alternatives way for configuring the container.

Spring Java Configuration 1.0 M2 was among the products [released](http://www.springframework.org/node/455) [around JavaOne](http://blog.interface21.com/main/2007/05/25/new-releases-in-the-spring-portfolio/) and, while still marked as a milestone, had an important number of updates and bugfixes:

-   the root package has changed to *org.springframework.config.java*

```
Copy<li>scoped beans are fully supported</li>

<li>the bean name generation can be customized</li>

<li>the distribution contains a 'transformed' sample (petclinic) which uses XML, JavaConfig and Groovy.</li>
```

In fact, most of the work done for 1.0 M2 was incorporating the feedback [received](http://blog.interface21.com/main/2006/11/28/a-java-configuration-option-for-spring/#comments) to the initial announcement; thanks a lot to everybody involved!

In this entry, I'd like to give some examples of Java Configuration, as a true IoC annotation-based configuration. Let's start off with Mark's example, used in his [entry](http://blog.interface21.com/main/2007/05/14/annotation-driven-dependency-injection-in-spring-21/) on Spring 2.1 annotation-driven dependency injection.

To recap, below is a diagram of the interfaces and classes used by Mark:

![diagram](http://blog.interface21.com/main/wp-content/uploads/2007/06/blog-javaconfig-diagram.png)

The wiring is done through @Autowired while some methods are marked as being part of the lifecycle, through @PostConstruct and @PreDestroy.

Translating the annotation-driven configuration to Java Configuration is pretty straight forward:

```java
Copy
@Configuration
public abstract class JavaCfg {

	@Bean (destroyMethodName = "tearDownDatabase")
	public JdbcMessageRepository messageRepo() {
		JdbcMessageRepository repo = new JdbcMessageRepository();
		repo.createTemplate(dataSource());
		// call custom init method
		repo.setUpDatabase();

		return repo;
	}
	
	@Bean
	public GreetingService greetService() {
		GreetingServiceImpl impl = new GreetingServiceImpl();
		impl.setMessageRepository(messageRepo());
		return impl;
	}

	@ExternalBean
	public abstract DataSource dataSource();
}
```

First, the configuration is created using a Java class marked with @Configuration. In it, 2 beans are being declared and an external one referenced.

The first bean declared is messageRepo (same as the method name) which defines also a destruction method. Notice that the custom init method is invoked through the code and thus doesn't need any annotation or declaration. You can still use Spring InitializingBean interface or the @Bean initMethodName parameter though I would recommend against that. The code above is much clearer and concise not to mention that you can pass in arguments, something unavailable when using declarative init methods.

The second bean defined is greetService which uses messageRepo as a dependency. This is where the Java Configuration magic occurs since each time greetService will be created, the Spring container will supply the bean instance behind messageRepo. That is, if messageRepo is a singleton, the same instance will be returned each time. However, if a different scope is specified, then, when a new instance has to be created, your code will be invoked. Rod already explained this so please refer to his blog [entry](http://blog.interface21.com/main/2006/11/28/a-java-configuration-option-for-spring/) for more information.

One addition to 1.0 M2 is the @ExternalBean annotation which references beans declared outside the current configuration while still relying on Java strong-typeness and thus, your IDE validation. @ExternalBean overrides at runtime the method it is declared on with a getBean() lookup, like this:

```java
Copy
   public DataSource dataSource() {
       return (DataSource) context.getBean("dataSource");
   }
```

Of course, one can do the same thing manually especially when using [ConfigurationSupport](http://static.springframework.org/spring-javaconfig/docs/1.0-m2a/api/org/springframework/config/java/support/ConfigurationSupport.html) class but @ExternalBean makes things a lot more easier. Note that in the initial example I have used an abstract method to emphasize externalization, however any type of non-final method can be used:

```java
Copy
  @ExternalBean
  public DataSource dataSource() {
      throw new UnsupportedOperationException("this line will NEVER execute since the method will be overridden");
  }
```

Now that the configuration has been created, declare it as a normal bean along with the JavaConfiguration post processor:

```xml
Copy

<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:aop="http://www.springframework.org/schema/aop"
	xsi:schemaLocation="http://www.springframework.org/schema/beans
           http://www.springframework.org/schema/beans/spring-beans-2.0.xsd">

	<bean id="config" class="blog.javaconfig.JavaCfg" />

	<bean id="processor"
		class="org.springframework.config.java.process.ConfigurationPostProcessor" />

	<bean id="dataSource"
		class="org.springframework.jdbc.datasource.DriverManagerDataSource">
		<property name="driverClassName" value="${jdbc.driver}" />
		<property name="url" value="${jdbc.url}" />
		<property name="username" value="${jdbc.username}" />
		<property name="password" value="${jdbc.password}" />
	</bean>

</beans>
```

and you are ready to go (if you are running Mark's test, make sure to use the Java Configuration xml file).

Since a picture is worth a thousands words, see below the same setup through [SpringIDE](http://springide.org/project/wiki): [![springIDE view](http://blog.interface21.com/main/wp-content/uploads/2007/06/springide.png)](http://blog.interface21.com/main/wp-content/uploads/2007/06/springide.png)

I've used the latest SpringIDE snapshot which offers visualization, navigation and also validation for Java Configuration annotations (for example the plugin checks that *destroyMethodName* points to a proper method on the bean creation method return type).

## Hide and seek

Java Configuration supports most of the XML declaration features, that is you can specify scopes, autowire strategies, lazyness, depends-on as well as custom metadata at bean level (through @Bean) and as defaults (through @Configuration). In 1.0 M2 you even get the @ScopedProxy annotation, a direct replacement for <aop:scoped-proxy/>.

However, one new feature that Java Configuration offers over the traditional XML container is "bean visibility" - the ability to define beans which cannot be used outside their configuration. Again, let's look at some code:

```java
Copy
@Configuration
public class VisibilityConfiguration {

	@Bean(scope = DefaultScopes.PROTOTYPE)
	public Object publicBean() {
		List list = new ArrayList();
		list.add(hiddenBean());
		list.add(secretBean());

		System.out.println("creating public bean");
		return list;
	}

	@Bean(scope = DefaultScopes.SINGLETON)
	protected Object hiddenBean() {
		System.out.println("creating hidden bean");
		return new String("hidden bean");
	}

	@Bean(scope = DefaultScopes.PROTOTYPE)
	private Object secretBean() {
		List list = new ArrayList();
		// hidden beans can access beans defined in the 'owning' context
		list.add(hiddenBean());
		System.out.println("creating secret bean");
		return list;
	}
}
```

Java Configuration will use the method visibility to determine if a certain bean is public (that is if it can be used outside its declaring configuration) or private (non-public). Thus any @Bean annotated method, which is non-public, will create a hidden bean. This allows you to provide bean definition encapsulation, forbidding access whether accidental or not. It is very important to note that hidden beans are not transformed into [nested beans](http://static.springframework.org/spring/docs/2.0.x/reference/beans.html#beans-inner-beans) - they are fully featured, top-level beans: they have their own lifecycle and support custom scopes as opposed to inner beans which depend on the parent bean.

To prove this, I've marked the hiddenBean as singleton and secretBean as prototype.

Let's test the behavior with the following test:

```java
Copy
public class VisibilityTest extends TestCase {
	private ConfigurableApplicationContext context;

	@Override
	protected void setUp() throws Exception {
		context = new AnnotationApplicationContext("**/VisibilityConfiguration.class");
	}

	@Override
	protected void tearDown() throws Exception {
		context.close();
	}

	public void testApplicationContext() {
		assertNotNull(context);
		System.out.println(Arrays.toString(context.getBeanDefinitionNames()));
		// I don't belive you container! I know you are hidding something 
		context.getBean("hiddenBean");
	}
}
```

The test should print:

```code
Copy[blog.javaconfig.VisibilityConfiguration, publicBean]
creating hidden bean
creating secret bean
creating public bean
creating secret bean
creating public bean
```

after which should fail with something like:

```java
Copy
org.springframework.beans.factory.NoSuchBeanDefinitionException: No bean named 'hiddenBean' is defined
...
```

The first line in the console shows that secretBean and hiddenBean are not defined in the context that we hold. However, the following lines, show that the hidden bean is created once (since it is a singleton) while secretBean twice, for each publicBean, as it is a prototype.

So where are the hidden beans then? Inside a child container.

The parent container (*context* in our case) is completely unaware of it and thus, of any beans declared inside it. Nevertheless, beans declared inside the child context can access any beans declared inside the parent but not vice-versa. Public beans (such as publicBean) on the other hand, are 'pushed' by Java Configuration inside the parent container, but since they are declared in the same configuration as the hidden bean, they can reference the 'secret' beans during instantiation.

## Look Ma', no XML!

For those who want to ditch XML completely, Spring Java Configuration offers the [AnnotationApplicationContext](http://static.springframework.org/spring-javaconfig/docs/1.0-m2a/api/org/springframework/config/java/context/AnnotationApplicationContext.html) which uses classes rather then XML files, as you could see from the test case above. While my example works,it is not ideal since, without any caching, the application context will be created and destroyed for each test. An alternative is to reuse the existing [AbstractDependencyInjectionSpringContextTests](http://static.springframework.org/spring/docs/2.0.x/api/org/springframework/test/AbstractDependencyInjectionSpringContextTests.html) and override the context creation appropriately:

```java
Copy
public class NoXMLTest extends AbstractDependencyInjectionSpringContextTests {

	@Override
	protected ConfigurableApplicationContext createApplicationContext(String[] locations) {
		GenericApplicationContext context = new GenericApplicationContext();
		customizeBeanFactory(context.getDefaultListableBeanFactory());
                // use Java Configuration annotation-based bean definition reader
		new ConfigurationClassScanningBeanDefinitionReader(context).loadBeanDefinitions(locations);
		context.refresh();
		return context;
	}

	@Override
	protected String[] getConfigLocations() {
		return new String[] { "**/*.class" };
	}

	public void testAppCtx() {
		assertNotNull(applicationContext);
	}
}
```

(this can be further simplified through [SPR-3550](http://opensource.atlassian.com/projects/spring/browse/SPR-3550)).

## Which approach is better?

Some of you might wonder what is the best annotation configuration approach: annotation-driver injection or Java Configuration? My answer is: "it depends".

Java Configuration stays true to the IoC principle as the configuration resides outside your code, which means you have true **P**OJOs (i.e. no configuration annotations inside your code).

The annotation-driven injection presented previously on this blog, allows objects to be a little more aware of their configuration. They can ask for dependencies, for autowiring and can even specify their scope. The injection still occurs (that is the objects are still managed by the container), but some parts of your configuration are now contained by your objects.

With JavaConfig you can configure your objects without any restrictions as you are using pure Java. You can use any number of arguments, of any type and can call any number of methods. Since it is Java, your configuration is refactoring friendly and you can benefit from your IDE auto-completion. This is extremely flexible and powerful!

On the other hand, with annotation-driven injection, you have fine-grained (class, method and even field-level) control over your objects as well as a lot more contextual information.

Consider the @Autowire method:

```java
Copy
        @Autowired
        public void createTemplate(DataSource dataSource) {
                this.jdbcTemplate = new SimpleJdbcTemplate(dataSource);
        }
```

Spring uses the annotation not just to determine the method on which the autowiring will occur, but also the required type(s). Moreover, multi-arg methods can be used, a feature not supported by 'traditional' autowiring which uses the JavaBeans convention and thus, setters.

At the end of the day, both approaches serve one purpose: to configure the Spring container. You can use one of them, or both along with some XML and [properties](http://static.springframework.org/spring/docs/2.0.x/api/org/springframework/beans/factory/support/PropertiesBeanDefinitionReader.html) on top if you'd like. In fact, the Java Configuration distribution, replaces the 'traditional' XML configuration for Petclinic with an XML, annotations and [Groovy](http://groovy.codehaus.org/) based configuration. Considering this blog [entry](http://headius.blogspot.com/2007/05/adding-annotations-to-jruby-using-ruby.html), it won't be long until [JRuby](http://jruby.codehaus.org/) will be included.

The bottom line is that you have the choice to pick whatever fits your development style better.

P.S. If you are interested in this topic, you might want to attend the following SpringOne [session](http://www.springone.com/display/SpringOne07/Ways+to+configure+the+Spring+container) for an in-depth discussion :)

Cheers, Costin