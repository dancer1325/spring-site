---
title: Customizing Annotation Configuration and Component Detection in Spring 2.1
source: https://spring.io/blog/2007/05/29/customizing-annotation-configuration-and-component-detection-in-spring-2-1
scraped: 2026-02-24T09:29:11.572Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Fisher |  May 29, 2007 | 0 Comments
---

# Customizing Annotation Configuration and Component Detection in Spring 2.1

_Engineering | Mark Fisher |  May 29, 2007 | 0 Comments_

*NOTE: This post has been updated as of May 31, 2007 to reflect the state of the 2.1-M2 official release*

Two weeks ago I [blogged](http://blog.interface21.com/main/2007/05/14/annotation-driven-dependency-injection-in-spring-21/) about the new annotation-driven dependency injection capabilities of Spring 2.1, and I mentioned that I would follow-up with more info "later in the week". It turns out that was a bit optimistic, but the good news is the functionality has evolved quite a bit in the meantime. Therefore, to follow along with the examples here you will need to download the [2.1-M2 official release](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=173644) (or if you are one of the first people to read this updated entry and M2 is not yet available, you should grab at least nightly build #115 which you can download [here](http://static.springframework.org/downloads/nightly/snapshot-download.php?project=SPR)).

The first thing I want to demonstrate is how to create an application context without using any XML. For those who have used Spring's BeanDefinitionReader implementations, this will look very familiar. Before creating the context however, we need a few "candidate" beans on the classpath. Continuing with the example from my previous blog, I have the following two interfaces:

```java
Copy
public interface GreetingService {
	String greet(String name);
}
```

```java
Copy
public interface MessageRepository {
	String getMessage(String language);
}
```

...and these corresponding implementations:

```java
Copy
@Component
public class GreetingServiceImpl implements GreetingService {

	@Autowired
	private MessageRepository messageRepository;
	
	public String greet(String name) {
		Locale locale = Locale.getDefault();
		if (messageRepository == null) {
			return "Sorry, no messages";
		}
		String message = messageRepository.getMessage(locale.getDisplayLanguage());
		return message + " " + name;
	}
}
```

```java
Copy
@Repository
public class StubMessageRepository implements MessageRepository {

	Map<String,String> messages = new HashMap<String,String>();
	
	@PostConstruct
	public void initialize() {
		messages.put("English", "Welcome");
		messages.put("Deutsch", "Willkommen");
	}
	
	public String getMessage(String language) {
		return messages.get(language);
	}
}
```

Now as promised... to assemble this admittedly trivial "application" without any XML:

```java
Copy
Locale.setDefault(Locale.GERMAN);
GenericApplicationContext context = new GenericApplicationContext();
ClassPathBeanDefinitionScanner scanner = new ClassPathBeanDefinitionScanner(context);
scanner.scan("blog"); // the parameter is 'basePackage'
context.refresh();
GreetingService greetingService = (GreetingService) context.getBean("greetingServiceImpl");
String message = greetingService.greet("Standalone Beans");
System.out.println(message);
```

And the result:

```java
Copy
Willkommen Standalone Beans
```

Essentially, this is the exact same behavior as when using the *component-scan* XML element from the new "context" namespace (as demonstrated in my [previous blog](http://blog.interface21.com/main/2007/05/14/annotation-driven-dependency-injection-in-spring-21/)). However, I want to focus on some of the newer features as well as customization options. First, I will remove the @Repository annotation from the StubMessageRepository, and rerun the tests which produces the following exception:

```java
Copy
org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'greetingServiceImpl': Autowiring of fields failed; nested exception is org.springframework.beans.factory.BeanCreationException: Could not autowire field: private blog.MessageRepository blog.GreetingServiceImpl.messageRepository; nested exception is org.springframework.beans.factory.NoSuchBeanDefinitionException: No unique bean of type [blog.MessageRepository] is defined: expected single bean but found 0
```

Clearly the @Autowired annotation indicates a *required* dependency by default, but this can easily be switched by adding the 'required' parameter with a value of 'false', such as:

```java
Copy
@Component
public class GreetingServiceImpl implements GreetingService {

	@Autowired(required=false)
	private MessageRepository messageRepository;
	...
```

The result after this modification:

```java
Copy
Sorry, no messages
```

To make things a bit more interesting, I will add the JDBC version of the MessageRepository (also from the previous post):

```java
Copy
@Repository
public class JdbcMessageRepository implements MessageRepository {

	private SimpleJdbcTemplate jdbcTemplate;

	@Autowired
	public void createTemplate(DataSource dataSource) {
		this.jdbcTemplate = new SimpleJdbcTemplate(dataSource);
	}
	
	@PostConstruct
	public void setUpDatabase() {
		jdbcTemplate.update("create table messages (language varchar(20), message varchar(100))");
		jdbcTemplate.update("insert into messages (language, message) values ('English', 'Welcome')");
		jdbcTemplate.update("insert into messages (language, message) values ('Deutsch', 'Willkommen')");
	}
	
	@PreDestroy
	public void tearDownDatabase() {
		jdbcTemplate.update("drop table messages");
	}
	
	public String getMessage(String language) {
		return jdbcTemplate.queryForObject("select message from messages where language = ?", String.class, language);
	}
}
```

As long as the stub version still *does not* contain the @Repository annotation, rerunning the tests will now produce the following exception:

```java
Copy
org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'greetingServiceImpl': Autowiring of fields failed; nested exception is org.springframework.beans.factory.BeanCreationException: Could not autowire field: private blog.MessageRepository blog.GreetingServiceImpl.messageRepository; nested exception is org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'jdbcMessageRepository': Autowiring of methods failed; nested exception is org.springframework.beans.factory.BeanCreationException: Could not autowire method: public void blog.JdbcMessageRepository.createTemplate(javax.sql.DataSource); nested exception is org.springframework.beans.factory.NoSuchBeanDefinitionException: No unique bean of type [javax.sql.DataSource] is defined: expected single bean but found 0
```

Obviously a chain reaction of autowiring failures has resulted since no DataSource is available in the context. However, as a firm believer in test-driven development, I would like to *unit test* my implementation prior to setting up the infrastructure. Luckily, the scanner is fairly customizable, and I can provide filters, such as:

```java
Copy
Locale.setDefault(Locale.GERMAN);
GenericApplicationContext context = new GenericApplicationContext();

boolean useDefaultFilters = false;

ClassPathBeanDefinitionScanner scanner = new ClassPathBeanDefinitionScanner(context, useDefaultFilters);
scanner.addExcludeFilter(new AssignableTypeFilter(JdbcMessageRepository.class));
scanner.addIncludeFilter(new AnnotationTypeFilter(Component.class));
scanner.addIncludeFilter(new RegexPatternTypeFilter(Pattern.compile("blog\\.Stub.*")));
scanner.scan("blog");

context.refresh();
GreetingService greetingService = 
             (GreetingService) context.getBean("greetingServiceImpl");
String message = greetingService.greet("Standalone Beans");
System.out.println(message);
```

As you can see, I disabled the 'defaultFilters' and explicitly added my own. In this case, that was not completely necessary since the default includes the @Component and @Repository annotations, but I wanted to show the various filtering options - including not only annotations, but also assignable types and even regular expressions. The main goal of course was to disable the JDBC version of MessageRepository in favor of the stub, and according to my result, that is exactly what happened:

```java
Copy
Willkommen Standalone Beans
```

Assuming that I am now ready to incorporate the JDBC version, I will likely need to include some XML configuration for the DataSource, such as:

```xml
Copy
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
           http://www.springframework.org/schema/beans/spring-beans-2.0.xsd
           http://www.springframework.org/schema/context
           http://www.springframework.org/schema/context/spring-context-2.1.xsd">
      
    <context:property-placeholder location="classpath:blog/jdbc.properties"/>
    
    <bean class="org.springframework.jdbc.datasource.DriverManagerDataSource">
    	<property name="driverClassName" value="${jdbc.driver}"/>
    	<property name="url" value="${jdbc.url}"/>
    	<property name="username" value="${jdbc.username}"/>
    	<property name="password" value="${jdbc.password}"/>
    </bean>
	
</beans>
```

Then, I can combine the scanning with an XmlBeanDefinitionReader (notice that I have reverted to the default filters only):

```java
Copy
Locale.setDefault(Locale.GERMAN);
GenericApplicationContext context = new GenericApplicationContext();

ClassPathBeanDefinitionScanner scanner = new ClassPathBeanDefinitionScanner(context);
scanner.scan("blog");

BeanDefinitionReader reader = new XmlBeanDefinitionReader(context);
reader.loadBeanDefinitions("classpath:/blog/dataSource.xml");

context.refresh();
GreetingService greetingService = (GreetingService) context.getBean("greetingServiceImpl");
String message = greetingService.greet("Hybrid Beans");
System.out.println(message);
```

The context contains both the scanned beans as well as those defined in XML, and the result is:

```java
Copy
Willkommen Hybrid Beans
```

Up to this point, you've seen that 0 candidate beans will cause the autowiring to fail unless the 'required' parameter of @Autowired is set to *false*. Given that the autowiring is following 'by-type' semantics, more than 1 bean will cause a failure regardless of the required parameter's value. For example, after adding the @Repository annotation back to the StubMessageRepository and rerunning the previous example, I receive the following exception:

```java
Copy
org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'greetingServiceImpl': Autowiring of fields failed; nested exception is org.springframework.beans.factory.BeanCreationException: Could not autowire field: private blog.MessageRepository blog.GreetingServiceImpl.messageRepository; nested exception is org.springframework.beans.factory.NoSuchBeanDefinitionException: No unique bean of type [blog.MessageRepository] is defined: expected single bean but found 2
```

This can be resolved by switching to 'by-name' semantics - accomplished via Spring 2.1's support for the JSR-250 @Resource annotation:

```java
Copy
@Component
public class GreetingServiceImpl implements GreetingService {

	@Resource(name="jdbcMessageRepository")
	private MessageRepository messageRepository;
	...
```

You probably noticed in the previous example that the bean name (as specified in the @Resource annotation) defaults to the decapitalized non-qualified classname. To override this behavior, it is possible to add your own implementation of the BeanNameGenerator strategy, such as:

```java
Copy
private static class MyBeanNameGenerator implements BeanNameGenerator {

	public String generateBeanName(BeanDefinition definition, BeanDefinitionRegistry registry) {
		String fqn = definition.getBeanClassName();
		return Introspector.decapitalize(fqn.replace("blog.", "").replace("Jdbc", ""));
	}
}
```

Then providing this strategy to the scanner overrides the default:

```java
Copy
ClassPathBeanDefinitionScanner scanner = new ClassPathBeanDefinitionScanner(context);
scanner.setBeanNameGenerator(new MyBeanNameGenerator());
scanner.scan("blog");
```

And therefore, the name specified in the @Resource annotation can be modified accordingly:

```java
Copy
@Resource(name="messageRepository")
private MessageRepository messageRepository;
```

NOTE: When relying on the container for autowiring, the default naming strategy is typically sufficient (i.e. it works "behind the scenes"). Therefore the naming strategy should only be considered for cases where you will be referring to beans by name elsewhere. Even then, for isolated cases it is much simpler to explicitly provide a bean name in the 'stereotype' annotation (e.g. @Repository("messageRepository")). Providing your own strategy can be useful if you are able to take advantage of naming conventions that are used consistently throughout your application (This particular example is a little contrived, but hopefully demonstrates that the strategy is very accommodating so that you can follow your own naming conventions).

So far all of the beans have been configured with the default 'singleton' scope, but scope resolution is another customizable strategy of the scanner. The default will look for a @Scope annotation on each component. For example, to configure the GreetingServiceImpl as a 'prototype', simply add the following:

```java
Copy
@Scope("prototype")
@Component
public class GreetingServiceImpl implements GreetingService { .. }
```

While the default annotation approach is quite simple, scope is almost always a deployment-specific consideration. Therefore it often does not belong at the class-level or in the source code at all. For these reasons, the following strategy interface is available and may be specified on the scanner as with the BeanNameGenerator in the previous example:

```java
Copy
public interface ScopeMetadataResolver {
	ScopeMetadata resolveScopeMetadata(BeanDefinition definition);
}
```

Note that the name generation and scope resolution strategies may also be provided in the XML-based configuration, such as:

```xml
Copy
<context:component-scan base-package="blog"
                        name-generator="blog.MyBeanNameGenerator"
                        scope-resolver="blog.MyScopeMetadataResolver"/>
```

Likewise, custom filters can be added as sub-elements:

```xml
Copy
<context:component-scan base-package="blog" use-default-filters="false">
    <context:include-filter type="annotation" expression="org.springframework.stereotype.Component"/>
    <context:include-filter type="regex" expression="blog\.Stub.*"/>
    <context:exclude-filter type="assignable" expression="blog.JdbcMessageRepository"/>
</context:component-scan>
```

I realize this entry has already covered quite a bit of ground, but there is one last topic I would like to cover. In the previous post, I included an aspect with the <aop:aspectj-autoproxy/> element. Now I want to demonstrate how to add the autoproxy behavior with our standalone version. First, the aspect itself (same as last time):

```java
Copy
@Aspect
public class ServiceInvocationLogger {

	private int invocationCount;
	
	@Pointcut("execution(* blog.*Service+.*(..))")
	public void serviceInvocation() {}
	
	@Before("serviceInvocation()")
	public void log() {
		invocationCount++;
		System.out.println("service invocation #" + invocationCount);
	}
}
```

Next, I need to add an include filter for the @Aspect annotation (it is no longer included in the default filters):

```java
Copy
scanner.addIncludeFilter(new AnnotationTypeFilter(Aspect.class));
scanner.scan("blog");
```

And finally, I need to register the AspectJ annotation-based autoproxy creator (prior to calling refresh() on the context):

```java
Copy
AopConfigUtils.registerAspectJAnnotationAutoProxyCreatorIfNecessary(context);
context.refresh();
```

The result:

```java
Copy
service invocation #1
Willkommen Hybrid Beans
```

Hopefully this entry and the [preceding one](http://blog.interface21.com/main/2007/05/14/annotation-driven-dependency-injection-in-spring-21/) have provided a sufficient introduction to these new features of Spring 2.1. You should now have a decent understanding of how to combine the component scanning and annotation configuration in small doses alongside "traditional" Spring XML configuration if you prefer. Also, by providing your own filters, name generators, and scope resolvers, you can customize the configuration process. The official 2.1-M2 release contains more detailed information in the reference documentation.

Stay tuned to this [Interface21 Team Blog](http://blog.interface21.com) to learn about more new features as we continue to progress from the current milestone phase toward the RC1 release of Spring 2.1, and if you are not particularly excited about the annotation-driven configuration, then you may want to keep an eye out for an upcoming blog by [Costin Leau](http://blog.interface21.com/main/author/costinl) on Spring Java Configuration - which offers yet another alternative to XML but without the invasiveness of annotations in your application code.