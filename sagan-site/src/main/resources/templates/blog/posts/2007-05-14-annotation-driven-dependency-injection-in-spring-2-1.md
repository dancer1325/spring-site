---
title: Annotation-Driven Dependency Injection in Spring 2.1
source: https://spring.io/blog/2007/05/14/annotation-driven-dependency-injection-in-spring-2-1
scraped: 2026-02-24T09:29:43.151Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Fisher |  May 14, 2007 | 0 Comments
---

# Annotation-Driven Dependency Injection in Spring 2.1

_Engineering | Mark Fisher |  May 14, 2007 | 0 Comments_

Spring 2.0 introduced annotation support and annotation-aware configuration options that can be leveraged by Spring users who are developing with Java 5 (or later versions):

[@Transactional](http://static.springframework.org/spring/docs/2.0.x/api/org/springframework/transaction/annotation/Transactional.html)

for demarcating and configuring transaction definitions

[@Aspect](http://www.eclipse.org/aspectj/doc/released/aspectj5rt-api/org/aspectj/lang/annotation/Aspect.html) (AspectJ)

for defining aspects along with @Pointcut definitions and advice (@Before, @After, @Around)

[@Repository](http://static.springframework.org/spring/docs/2.0.x/api/org/springframework/stereotype/Repository.html)

for indicating a class that is operating as a repository (a.k.a. Data Access Object or DAO)

[@Required](http://static.springframework.org/spring/docs/2.0.x/api/org/springframework/beans/factory/annotation/Required.html)

for enforcing annotated bean properties are provided a value

With Spring 2.1, this theme of annotation-driven configuration has been significantly extended and will continue to evolve as we progress toward the RC1 release. In fact, it is now possible to drive Spring's dependency injection via annotations. Furthermore, Spring can *discover* beans that need to be configured within an application context.

This blog entry will serve as a tutorial-style introduction to the basic features in 10 easy-to-follow steps. I will follow up later in the week with information on some more advanced features and customization options. If you are interested in alternative configuration options, you should also check out the [Spring Java Configuration](http://www.springframework.org/javaconfig) project and [this blog](http://blog.interface21.com/main/2006/11/28/a-java-configuration-option-for-spring/).

This tutorial requires at least Java 5, and Java 6 is recommended (otherwise there is a single requirement at the end of step 1).

## Step 1:

Grab [spring-framework-2.1-m1-with-dependencies.zip](http://downloads.sourceforge.net/springframework/spring-framework-2.1-m1-with-dependencies.zip). After extracting the archive, you will find the spring.jar and spring-mock.jar in the 'dist' directory. Add them to your CLASSPATH as well as the following (paths shown are relative to the 'lib' directory of the extracted 2.1-m1 archive):

-   asm/asm-2.2.3.jar
-   asm/asm-commons-2.2.3.jar
-   aspectj/aspectjweaver.jar
-   hsqldb/hsqldb.jar
-   jakarta-commons/commons-logging.jar
-   log4j/log4j-1.2.14.jar

(NOTE: If you are not running on Java 6, you will also need to add j2ee/common-annotations.jar)

## Step 2:

Provide the interfaces and classes for the example. I have tried to keep it as simple as possible yet capable of demonstrating the main functionality. I am including all of the code and configuration in a single "blog" package. I would encourage following that same guideline so that the examples work as-is; otherwise, be sure to make the necessary modifications. First, the *GreetingService* interface:

```java
Copy
public interface GreetingService {
    String greet(String name);
}
```

Then, a simple implementation:

```java
Copy
public class GreetingServiceImpl implements GreetingService {
    private MessageRepository messageRepository;

    public void setMessageRepository(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public String greet(String name) {
        Locale locale = Locale.getDefault();
        String message = messageRepository.getMessage(locale.getDisplayLanguage());
        return message + " " + name;
    }
}
```

Since the service depends upon a *MessageRepository*, define that interface next:

```java
Copy
public interface MessageRepository {
    String getMessage(String language);
}
```

And for now, a stub implementation:

```java
Copy
public class StubMessageRepository implements MessageRepository {
    Map<String,String> messages = new HashMap<String,String>();

    public void initialize() {
        messages.put("English", "Welcome");
        messages.put("Deutsch", "Willkommen");
    }

    public String getMessage(String language) {
        return messages.get(language);
    }
}
```

## Step 3:

Define the beans for a Spring application context. Notice, that I am including a new 'context' namespace (NOTE: the 'aop' namespace is also included here and will be used in the final step):

```xml
Copy
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
           http://www.springframework.org/schema/beans/spring-beans-2.0.xsd
           http://www.springframework.org/schema/aop
           http://www.springframework.org/schema/aop/spring-aop-2.0.xsd
           http://www.springframework.org/schema/context
           http://www.springframework.org/schema/context/spring-context-2.1.xsd">
      
    <bean class="blog.GreetingServiceImpl"/>

    <bean class="blog.StubMessageRepository"/>

</beans>
```

Obviously this configuration looks a little sparse. As you can probably guess, the 'context' namespace will soon play a role.

## Step 4:

Provide a simple test case leveraging Spring's base support class:

```java
Copy
public class GreetingServiceImplTests extends AbstractDependencyInjectionSpringContextTests {
    private GreetingService greetingService;

    public void setGreetingService(GreetingService greetingService) {
        this.greetingService = greetingService;
    }

    @Override
    protected String[] getConfigLocations() {
        return new String[] { "/blog/applicationContext.xml" };
    }

    public void testEnglishWelcome() {
        Locale.setDefault(Locale.ENGLISH);
        String name = "Spring Community";
        String greeting = greetingService.greet(name);
        assertEquals("Welcome " + name, greeting);
    }

    public void testGermanWelcome() {
        Locale.setDefault(Locale.GERMAN);
        String name = "Spring Community";
        String greeting = greetingService.greet(name);
        assertEquals("Willkommen " + name, greeting);
    }
}
```

Try running the tests and notice that they fail with a NullPointerException. This is to be expected since the GreetingServiceImpl has not been provided a MessageRepository. In the next two steps, you will add annotations to drive the dependency injection and initialization respectively.

## Step 5:

Provide an @Autowired annotation on the GreetingServiceImpl's setter method, such as:

```java
Copy
@Autowired
public void setMessageRepository(MessageRepository messageRepository) {
    this.messageRepository = messageRepository;
}
```

Then, add the 'annotation-config' element (from the new 'context' namespace) to your configuration:

```xml
Copy
<beans ... >
    
    <context:annotation-config/>

    <bean class="blog.GreetingServiceImpl"/>

    <bean class="blog.StubMessageRepository"/>

</beans> 
```

Rerun the tests. They will still fail, but if you look closely it's a new problem. The assertions fail, because the messages being returned are null. That means that the 'messageRepository' property *has* been set on the greeting service! Now, the StubMessageRepository simply needs to be initialized.

## Step 6:

Spring provides a couple options for initialization callbacks: Spring's InitializingBean interface or an 'init-method' declaration within XML. As of Spring 2.1, JSR-250 annotations are supported - providing yet another option: @PostConstruct (and the @PreDestroy annotation can be used for destruction callbacks as you will see shortly). In the StubMessageRepository, add the annotation to the *initialize* method:

```java
Copy
@PostConstruct
public void initialize() {
    messages.put("English", "Welcome");
    messages.put("Deutsch", "Willkommen");
}
```

Rerun the tests. This time they should pass!

## Step 7:

The @Autowired annotation can also be used for constructor-based injection. If you'd like to experiment with that option, remove the setter method from the GreetingServiceImpl and add this constructor instead (then rerun the tests):

```java
Copy
@Autowired
public GreetingServiceImpl(MessageRepository messageRepository) {
    this.messageRepository = messageRepository;
}
```

If preferred, you can even use field-injection. Remove the constructor, add the annotation directly to the field, and rerun the tests. The code should look like this:

```java
Copy
@Autowired
private MessageRepository messageRepository;
```

## Step 8:

Add a JDBC-based repository implementation of the MessageRepository:

```java
Copy
public class JdbcMessageRepository implements MessageRepository {

    private SimpleJdbcTemplate jdbcTemplate;

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

Notice that in addition to @PostConstruct for initialization, this is using @PreDestroy to mark a method to be called on destruction. One thing is unclear from this implementation: how will the SimpleJdbcTemplate be provided? One option would be to provide a bean definition for the template. Another option would be to somehow provide a DataSource implementation to the template's constructor. Add the following (annotated) method:

```java
Copy
@Autowired
public void createTemplate(DataSource dataSource) {
    this.jdbcTemplate = new SimpleJdbcTemplate(dataSource);
}
```

This demonstrates dependency injection working with an arbitrary method (not a traditional 'setter'). This will be tested in the course of the next step.

## Step 9:

In Spring 2.1, "candidate" beans can even be discovered rather than provided explicitly in the XML as above. Certain annotations are recognized by default. This includes the @Repository annotation as well as a new @Component annotation. Add those two annotations to JdbcMessageRepository and GreetingServiceImpl respectively:

```java
Copy
@Repository
public class JdbcMessageRepository implements MessageRepository { ... }
```

```java
Copy
@Component
public class GreetingServiceImpl implements GreetingService { ... }
```

Then modify the XML file by removing the existing explicit bean definitions and simply adding a *component-scan* tag:

```xml
Copy
<beans ... >
    <context:component-scan base-package="blog"/>
</beans>
```

Then, add just the DataSource bean definition and the new tag for configuring property placeholders:

```xml
Copy
<beans ... >
    <context:component-scan base-package="blog"/>

    <context:property-placeholder location="classpath:blog/jdbc.properties"/>

    <bean class="org.springframework.jdbc.datasource.DriverManagerDataSource">
        <property name="driverClassName" value="${jdbc.driver}"/>
        <property name="url" value="${jdbc.url}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>

</beans>
```

... and the jdbc.properties file itself:

```java
Copy
jdbc.driver=org.hsqldb.jdbcDriver
jdbc.url=jdbc:hsqldb:mem:blog
jdbc.username=sa
jdbc.password=
```

Rerun the tests, and you should see the green bar even though only the data source has been defined in XML.

## Step 10:

Finally, add an aspect (the @Aspect annotations are also automatically detected by default):

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

And to activate automatic proxy generation, simply add the following tag to the xml:

```xml
Copy
<aop:aspectj-autoproxy/>
```

Rerun the tests, and you should see the log messages!

NOTE: the scanning and configuration process can be initiated without any XML and can be customized (e.g. detect your own annotations and/or types). I will discuss those features and more in the next post.

In the mean time, I hope this post will serve its purpose well - providing hands-on experience with these new Spring 2.1 features. As always, we are looking forward to feedback from the community, so please feel free to leave comments!