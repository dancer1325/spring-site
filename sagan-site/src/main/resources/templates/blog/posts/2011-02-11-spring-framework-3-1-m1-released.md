---
title: Spring Framework 3.1 M1 released
source: https://spring.io/blog/2011/02/11/spring-framework-3-1-m1-released
scraped: 2026-02-24T08:46:48.718Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Chris Beams |  February 11, 2011 | 2 Comments
---

# Spring Framework 3.1 M1 released

_Engineering | Chris Beams |  February 11, 2011 | 2 Comments_

The first milestone release of Spring 3.1 has just been published \[1\], and this article kicks off a series of posts where I and other team members will walk through each of the major features. Even in the first milestone there's already a lot to talk about!

-   Bean definition profiles
-   Unified property management through Spring's new `Environment` abstraction
-   Enhancements to Java-based configuration with `@Feature` methods
-   Expanded MVC namespace support and a Java-based configuration equivalent
-   Streaming support and new interception model for the `RestTemplate` API
-   Comprehensive caching support
-   New `c:` XML namespace for concise configuration of constructor injection

  
Today I'll be covering the first item -- a new feature we call *bean definition profiles*. One of our most frequent requests has been to provide a mechanism in the core container that allows for registration of different beans in different environments. The word "environment" can mean different things to different users, but a typical scenario might be registering monitoring infrastructure only when deploying an application into a performance environment, or registering customized implementations of beans for customer A vs. customer B deployments. Perhaps one of the most common cases would be working against a standalone datasource in development vs looking up that same datasource from JNDI when in QA or production. Bean definition profiles represent a general-purpose way to satisfy use cases of this kind, and we'll explore the latter use case in the examples below.

### Get hands-on with a sample

I've developed a small sample to accompany this post, and you might like to take a moment now to check it out (if not, don't worry; you don't need the code to read along below). Just follow the instructions on the README at [](http://bit.ly/gIHN2D)[https://github.com/cbeams/spring-3.1-profiles-xml](https://github.com/cbeams/spring-3.1-profiles-xml). If you're not familiar with Git, the README has instructions for SVN access, too.

### Understanding the application

First let's take a look at a JUnit test case that demonstrates how transferring money between two accounts should work in our banking application:

`src/test/com/bank/config/xml/IntegrationTests.java`

```java
Copy
public class IntegrationTests {
	@Test
	public void transferTenDollars() throws InsufficientFundsException {

		ApplicationContext ctx = // instantiate the spring container

		TransferService transferService = ctx.getBean(TransferService.class);
		AccountRepository accountRepository = ctx.getBean(AccountRepository.class);

		assertThat(accountRepository.findById("A123").getBalance(), equalTo(100.00));
		assertThat(accountRepository.findById("C456").getBalance(), equalTo(0.00));

		transferService.transfer(10.00, "A123", "C456");

		assertThat(accountRepository.findById("A123").getBalance(), equalTo(90.00));
		assertThat(accountRepository.findById("C456").getBalance(), equalTo(10.00));
	}
}
```

We'll get to the details of creating the Spring container in a moment, but first notice that our goal is simple -- transfer $10.00 from account "A123" to account "C456". The unit test simply asserts the initial balances in the two accounts, performs the transfer, then asserts that the final balances reflect the change.

### A typical XML configuration

The bean definition profiles feature is supported equally well in Spring XML as it is when using Spring `@Configuration` classes to configure the container, but in today's post we'll cover the XML approach as that's what most users are familiar with.

Forgetting about bean definition profiles for a moment, to configure this application in Spring XML one would traditionally do something like the snippet below. Let's assume we're early in the development process and that working against a standalone datasource is preferred. We'll use HSQLDB for convenience, but you may of course imagine the datasource of your choosing being configured.

`src/main/com/bank/config/xml/transfer-service-config.xml`

```xml
Copy
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:jdbc="http://www.springframework.org/schema/jdbc"
	xsi:schemaLocation="...">

	<bean id="transferService" class="com.bank.service.internal.DefaultTransferService">
		<constructor-arg ref="accountRepository"/>
		<constructor-arg ref="feePolicy"/>
	</bean>

	<bean id="accountRepository" class="com.bank.repository.internal.JdbcAccountRepository">
		<constructor-arg ref="dataSource"/>
	</bean>

	<bean id="feePolicy" class="com.bank.service.internal.ZeroFeePolicy"/>

	<jdbc:embedded-database id="dataSource">
		<jdbc:script location="classpath:com/bank/config/sql/schema.sql"/>
		<jdbc:script location="classpath:com/bank/config/sql/test-data.sql"/>
	</jdbc:embedded-database>
</beans>
```

The only potentially unfamiliar item above might be the use of Spring's `jdbc:` namespace. Introduced in Spring 3.0, the elements within allow for easy configuration of commonly used embedded database types. It's used here just as a convenience.

With this configuration in mind, we can now finish writing the unit test we started above.

`src/test/com/bank/config/xml/IntegrationTests.java`

```java
Copy
public class IntegrationTests {
	@Test
	public void transferTenDollars() throws InsufficientFundsException {

		GenericXmlApplicationContext ctx = new GenericXmlApplicationContext();
		ctx.load("classpath:/com/bank/config/xml/transfer-service-config.xml");
		ctx.refresh();

		TransferService transferService = ctx.getBean(TransferService.class);
		AccountRepository accountRepository = ctx.getBean(AccountRepository.class);

		// perform transfer and issue assertions as above ...
	}
}
```

*Side note:* We're using Spring's `GenericXmlApplicationContext` application context in order to load the XML configuration. Many Spring users will be more familiar with `ClassPathXmlApplicationContext`, which would work equally as well. As a general rule, however, `GenericXmlApplicationContext` is a more flexible alternative that should be generally preferred.

When running this test, the bar will be green. Our simple application is wired up by the container and we retrieve some of the beans and excercise them -- nothing special to see here, folks. It gets interesting when we consider how this application will be deployed into a QA or production environment. For example, it is a common scenario for enterprises using Spring to develop web applications against Tomcat for ease-of-use reasons, but then deploy those applications into WebSphere in production. Chances are very good that the datasource for the application will be registered with the production application server's JNDI directory. This means that in order to get hold of the datasource, we must perform a JNDI lookup. Of course Spring provides great support for doing so, and one popular way is through Spring's `<jee:jndi-lookup/>` element. The production version of the configuration file above might end up looking something like the following:

`src/main/com/bank/config/xml/transfer-service-config.xml`

```xml
Copy
<beans ...>
	<bean id="transferService" ... />

	<bean id="accountRepository" class="com.bank.repository.internal.JdbcAccountRepository">
		<constructor-arg ref="dataSource"/>
	</bean>

	<bean id="feePolicy" ... />

	<jee:jndi-lookup id="dataSource" jndi-name="java:comp/env/jdbc/datasource"/>
</beans>
```

Of course this configuration works perfectly well. The problem is how to switch between using these two variations based on the current environment. Over time, Spring users have devised a number of ways to get this done, usually relying on a combination of system environment variables and XML `<import/>` statements containing `${placeholder}` tokens that resolve to the correct configuration file path depending on the value of an environment variable. While these and other solutions can be made to work, they're hardly what we would call "first-class" solutions provided by the container.

### Enter bean definition profiles

If we generalize the example use case above of enviroment-specific bean definitions, we end up with the need to register certain bean definitions in certain contexts, while not in others. You could say that you want to register a certain *profile* of bean definitions in situation A, and a different profile in situation B.

In Spring 3.1, `<beans/>` XML documents now incorporate this new concept. We can break our configuration down into the following three files. Notice the `profile="..."` attribute on the `*-datasource.xml` files:

`src/main/com/bank/config/xml/transfer-service-config.xml`

```xml
Copy
<beans ...>
	<bean id="transferService" ... />

	<bean id="accountRepository" class="com.bank.repository.internal.JdbcAccountRepository">
		<constructor-arg ref="dataSource"/>
	</bean>

	<bean id="feePolicy" ... />
</beans>
```

`src/main/com/bank/config/xml/standalone-datasource-config.xml`

```xml
Copy
<beans profile="dev">
	<jdbc:embedded-database id="dataSource">
		<jdbc:script location="classpath:com/bank/config/sql/schema.sql"/>
		<jdbc:script location="classpath:com/bank/config/sql/test-data.sql"/>
	</jdbc:embedded-database>
</beans>
```

`src/main/com/bank/config/xml/jndi-datasource-config.xml`

```xml
Copy
<beans profile="production">
	<jee:jndi-lookup id="dataSource" jndi-name="java:comp/env/jdbc/datasource"/>
</beans>
```

We can then update the test case to load all three files:

```java
Copy
	GenericXmlApplicationContext ctx = new GenericXmlApplicationContext();
	ctx.load("classpath:/com/bank/config/xml/*-config.xml");
	ctx.refresh();
```

But this is not quite enough. When running the unit test after these changes, we would see a `NoSuchBeanDefinitionException` thrown, because the container could not find the Spring bean named "dataSource". The reason why is that while we have clearly defined two bean definition profiles -- "dev" and "production", we have not yet *activated* either of them.

### Enter the Environment

New in 3.1 is Spring's notion of an *`Environment`*. This abstraction has been integrated throughout the container, and we'll see it several times over the blog posts in the coming days. For our purposes here, it's important to understand that the `Environment` contains information about which profiles (if any) are currently active. When the Spring `ApplicationContext` above is loading our three bean definition files, it pays close attention to the `<beans profile="...">` attribute in each of them. If it is present and set to the name of a profile that is not currently active, the entire file is skipped -- no bean definitions are parsed or registered.

Activating a profile can be done in several ways, but the most straightforward is to do it programmatically against the `ApplicationContext` API:

```java
Copy
	GenericXmlApplicationContext ctx = new GenericXmlApplicationContext();
	ctx.getEnvironment().setActiveProfiles("dev");
	ctx.load("classpath:/com/bank/config/xml/*-config.xml");
	ctx.refresh();
```

At this point, running our unit test will result in the green bar. Let's break down how the container thinks about things when loading the three files that match `*-config.xml`:

-   `transfer-service-config.xml` does not specify a profile attribute at all, so it is always parsed
-   `standalone-datasource-config.xml` specifies `profile="dev"` and the "dev" profile is currently active, so it is parsed
-   `jndi-datasource-config.xml` specifies `profile="production"` but the "production" profile is not currently active, so it is skipped.

The result is exactly one registered bean named "dataSource", which satisfies the dependency injection needs of the "accountRepository" bean. Everything works once again.

How then does one switch to the JNDI lookup when actually in production? Of course it's necessary to activate the "production" profile. It's fine to do this programmatically for the purpose of a unit test as above, but this approach won't be practical once the WAR file has been created and the application is ready for deployment. For this reason, profiles may also be activated *declaratively* through the *`spring.profiles.active`* property which may be specified through system environment variables, JVM system properties, servlet context parameters in `web.xml` or even as an entry in JNDI \[2\]. For example, you might configure `web.xml` as follows:

```xml
Copy
  <servlet>
      <servlet-name>dispatcher</servlet-name>
      <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
      <init-param>
          <param-name>spring.profiles.active</param-name>
          <param-value>production</param-value>
      </init-param>
  </servlet>
```

Note that profiles are not an "either-or" proposition; it is possible to activate multiple profiles at once. Programmatically, simply provide multiple profile names to the `setActiveProfiles(`) method, which accepts `String...` varargs:

```java
Copy
	ctx.getEnvironment().setActiveProfiles("profile1", "profile2");
```

Declaratively, `spring.profiles.active` may accept a comma-separated list of profile names:

```source
Copy	-Dspring.profiles.active="profile1,profile2"
```

Bean definition files may be marked as candidates for more than one profile in a similar fashion:

```xml
Copy
	<beans profile="profile1,profile2">
		...
	</beans>
```

This allows for a flexible approach to decomposing your application, slicing and dicing which beans are registered under which circumstances.

### Making it even simpler: introducing nested `<beans/>` elements

So far, bean definition profiles have provided us with a convenient mechanism for determining which beans get registered based on the deployment context of the application, but it came with one downside: Where above we had a single Spring XML configuration file, we now have three. This split was necessary in order to distinguish `profile="dev"` vs. `profile="production"` beans, because the `profile` attribute is specified at the `<beans>` element level.

With Spring 3.1, it is now possible to nest `<beans/>` elements within the same file. This means that we can, if desired, return to a single configuration file:

```java
Copy
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:jdbc="http://www.springframework.org/schema/jdbc"
	xmlns:jee="http://www.springframework.org/schema/jee"
	xsi:schemaLocation="...">

	<bean id="transferService" class="com.bank.service.internal.DefaultTransferService">
		<constructor-arg ref="accountRepository"/>
		<constructor-arg ref="feePolicy"/>
	</bean>

	<bean id="accountRepository" class="com.bank.repository.internal.JdbcAccountRepository">
		<constructor-arg ref="dataSource"/>
	</bean>

	<bean id="feePolicy" class="com.bank.service.internal.ZeroFeePolicy"/>

	<beans profile="dev">
		<jdbc:embedded-database id="dataSource">
			<jdbc:script location="classpath:com/bank/config/sql/schema.sql"/>
			<jdbc:script location="classpath:com/bank/config/sql/test-data.sql"/>
		</jdbc:embedded-database>
	</beans>

	<beans profile="production">
		<jee:jndi-lookup id="dataSource" jndi-name="java:comp/env/jdbc/datasource"/>
	</beans>
</beans>
```

`spring-beans-3.1.xsd` has been updated to allow this nesting, but constrained to allow such elements only as the last ones in the file. This should help provide flexibility without incurring clutter in the XML files. While this enhancement was developed in service of bean definition profiles, nested `<beans/>` elements are useful in general. Imagine you have a subset of beans in a given file that should be marked `lazy-init="true"`. Rather than marking each bean, you could instead declare a nested `<beans default-lazy-init="true"/>` element, and all beans within will inherit that default. Beans defined elsewhere in the file will maintain the normal default of `lazy-init="false"`. This applies for all the `default-*` attributes of the `<beans/>` element, such as `default-lazy-init`, `default-init-method`, `default-destroy-method`, and so on.

### Caveats

There are a few things to watch out for when considering the use of bean definition profiles.

**Do not use profiles if a simpler approach can get the job done.** If the only thing changing between profiles is the value of properties, Spring's existing `PropertyPlaceholderConfigurer` / `<context:property-placeholder/>` may be all you need.

**The set of beans registered between two profiles should probably be more similar than different.** For example, if you have a radically different set of beans in dev and QA than you do in production, the question becomes: *are you testing everything you should be?*. As a rule of thumb, beans shouldn't differ much beyond the dev/QA split. An exception might be conditionally introducing monitoring aspects in a performance environment.

**Be careful not to ship "too much" into production.** If you have certain beans and class libraries present during development but that are unnecessary or unwanted in production, you run the risk of packaging all of that up and deploying it live. This is wasteful (why drag everything into the WAR if it's not needed), but also potentially insecure. Remember that the way profiles are activated is through properties. For example, if your totally insecure 'no-op password encryptor' bean definition and class are both present in the production environment, and all it takes to turn this on is the acccidental activation of the 'dev' profile, the danger is clear. A couple options for mitigating this risk might be customizing your build system to exclude unnecessary or unwanted classes from the production deployment archives, or working with the native Java `SecurityManager` API to disallow access to the `spring.profiles.active` system environment variable and/or JVM system property. Doing so will mean that even though Spring may try to read these values, it won't be able to and will move on as if they'd never been set.

### Summary

That's it for now; I encourage you to take a look at the sample application and play around. For example, try running the unit tests as-is, then try setting the `spring.profiles.active` system property to "production" and see what happens.

In the next post in this series, we'll take a look at how bean definition profiles can be used when configuring the container with `@Configuration` classes instead of XML; the new `@Profile` annotation will help us out there.

### Footnotes

\[1\] Milestone builds are published to [http://maven.springframework.org/milestone](http://maven.springframework.org/milestone). See the [pom.xml](http://bit.ly/hnVADP) and [build.gradle](http://bit.ly/ideYr9) files in the sample for details on how to pull from this repository.

\[2\] technically `spring.profiles.active` may be specified in any `PropertySource` object registered with the `ApplicationContext`'s `Environment`. We'll cover the concept of property sources in a subsequent blog post.