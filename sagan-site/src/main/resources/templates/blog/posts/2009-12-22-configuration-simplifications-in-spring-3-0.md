---
title: Configuration Simplifications in Spring 3.0
source: https://spring.io/blog/2009/12/22/configuration-simplifications-in-spring-3-0
scraped: 2026-02-24T09:01:03.420Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Chris Beams |  December 22, 2009 | 3 Comments
---

# Configuration Simplifications in Spring 3.0

_Engineering | Chris Beams |  December 22, 2009 | 3 Comments_

Second in a series of posts on "Spring 3 Simplifications" started yesterday by [Keith](http://blog.springsource.com/2009/12/21/mvc-simplifications-in-spring-3-0/), I'd like to provide a very brief and hands-on introduction to Spring's new [@Configuration](http://static.springsource.org/spring/docs/3.0.x/javadoc-api/org/springframework/context/annotation/Configuration.html) annotation and related support.

As those that followed the Spring JavaConfig project will know, a @Configuration-annotated class serves much the same role as a Spring XML file. It provides a code-centric way of declaring Spring bean definitions using nothing more than methods and annotations. You might call it *Plain Old Configuration\** :) This means that for simple situations, no XML will be required!

Let's get started. To demonstrate @Configuration functionality, I've created a [very simple project](https://src.springframework.org/svn/spring-samples/configuration-basic/trunk) in the new spring-samples SVN repository. You may want to sync up and build it right now. You'll need a Subversion client and recent version of Maven.

`  svn co https://src.springframework.org/svn/spring-samples/configuration-basic/trunk configuration-basic cd configuration-basic mvn clean test [...] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0  `

`[INFO] ------------------------------------------------------------------------ [INFO] BUILD SUCCESSFUL [INFO] ------------------------------------------------------------------------ `

Eclipse .classpath and .project metadata is also included in the checkout, so you can import the project using the [SpringSource Tool Suite](http://www.springsource.com/products/sts), or any recent version of Eclipse with the [m2eclipse plugin](http://m2eclipse.sonatype.org/) installed. In either case, use File->Import->Existing Projects into Workspace.

To begin, let's take a look at [AppConfig.java](https://src.springframework.org/svn/spring-samples/configuration-basic/trunk/src/main/java/org/springframework/samples/config/basic/account/AppConfig.java). This @Configuration-annotated class serves the same role as an app-config.xml would in an XML-based Spring application. It's a good place to start when reviewing the project, because it serves as the 'blueprint' for how object instances are wired up and managed at runtime.

```java
Copy
@Configuration
public class AppConfig {

    public @Bean TransferService transferService() {
        return new TransferServiceImpl(accountRepository());
    }

    public @Bean AccountRepository accountRepository() {
        return new InMemoryAccountRepository();
    }

}
```

Granted, this is trivial example of an application without even so much as a real JDBC DataSource in the mix. That's okay, the goal for this post is just to convey the basic concepts. The @Bean methods above will be recognized and invoked by the Spring container at the right time and the objects returned will be managed in the Spring container just like any other bean. You can see that dependencies between beans can be expressed simply as calls from one bean method to another. TransferServiceImpl needs an AccountRepository constructor argument, so simply call the accountRepository() method.

Savvy Spring users will look at this scenario, however, and ask the question "what about bean scoping"? It's a good question. As you probably know, all Spring beans have a scope. By default, a bean's scope is that of 'singleton', meaning that there will be one and only one instance of that bean per Spring container. Glancing at the code above, it seems that if we call accountRepository() multiple times, we'll actually create multiple instances, but this is not actually the case! When a @Configuration class is processed at runtime, it is dynamically subclassed (using CGLIB), and the subclass implementations of @Bean methods are enhanced to ensure that scoping semantics are respected.

As you can see, defining @Bean methods is pretty straightforward. Now, let's bootstrap the container and use those objects.

Take a look at the [TransferServiceTest](https://src.springframework.org/svn/spring-samples/configuration-basic/trunk/src/test/java/org/springframework/samples/config/basic/account/TransferServiceTest.java) JUnit system test and its transfer100Dollars() @Test method. The first thing you'll notice is the use of [AnnotationConfigApplicationContext](http://static.springsource.org/spring/docs/3.0.x/javadoc-api/org/springframework/context/annotation/AnnotationConfigApplicationContext.html). This new ApplicationContext implementation has been added in Spring 3 to support instantiation of the Spring container using @Configuration classes directly. The context is created with AppConfig.class as a constructor parameter, after which we retrieve the TransferService and AccountRepository beans by type with the [getBean(Class)](http://static.springsource.org/spring/docs/3.0.x/javadoc-api/org/springframework/context/support/AbstractApplicationContext.html#getBean%28java.lang.Class%29) method. The rest of the method is just standard JUnit assertions exercising the TransferService and AccountRepository APIs, ensuring that everything works as expected.

```java
Copy
public class TransferServiceTest {

    @Test
    public void transfer100Dollars() {
        // create the spring container using the AppConfig @Configuration class
        ApplicationContext ctx = new AnnotationConfigApplicationContext(AppConfig.class);

        // retrieve the beans we'll use during testing
        AccountRepository accountRepository = ctx.getBean(AccountRepository.class);
        TransferService transferService = ctx.getBean(TransferService.class);

        // create accounts to test against
        accountRepository.add(new Account("A123", 1000.00));
        accountRepository.add(new Account("C456", 0.00));

        // check account balances before transfer
        assertThat(accountRepository.findById("A123").getBalance(), equalTo(1000.00));
        assertThat(accountRepository.findById("C456").getBalance(), equalTo(0.00));

        // perform transfer
        transferService.transfer(100.00, "A123", "C456");

        // check account balances after transfer
        assertThat(accountRepository.findById("A123").getBalance(), equalTo(900.00));
        assertThat(accountRepository.findById("C456").getBalance(), equalTo(100.00));
    }

}
```

That's it! Simple, pure Java, type-safe configuration. We hope you'll find this a convenient and powerful addition to Spring's core dependency injection support.

Of course, we've just scratched the surface here today. So much more can be done with @Configuration classes and we'll explore those features in future posts. But don't wait for me - you can check them all out for yourself right now by reading the [@Configuration section of the Spring 3 reference documentation](http://static.springsource.org/spring/docs/3.0.x/spring-framework-reference/html/beans.html#beans-java). **I encourage everyone to use this sample project as a starting point from which you can quickly road test the rest of this new support**.

I look forward to your feedback. Enjoy playing with @Configuration and all the new Spring 3 features and have a happy holiday!

-   *Thanks to Erich Eichinger for (half-jokingly) coining the phrase 'Plain Old Configuration'. You can take a look at the work he and the Spring.NET team are doing with their similar 'CodeConfig' project [here](http://eeichinger.blogspot.com/2009/12/merry-xmlless-codeconfig-for-springnet.html).*