---
title: Spring Java Configuration Moving Ahead
source: https://spring.io/blog/2007/11/05/spring-java-configuration-moving-ahead
scraped: 2026-02-24T09:23:57.104Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rod Johnson |  November 05, 2007 | 0 Comments
---

# Spring Java Configuration Moving Ahead

_Engineering | Rod Johnson |  November 05, 2007 | 0 Comments_

Several users have asked whether we are committed to [Spring Java Configuration](http://www.springframework.org/javaconfig), and how it sits with the [annotation configuration option](http://blog.interface21.com/main/2007/10/24/spring-25-rc1-is-here-introducing-new-configuration-approaches/) introduced in Spring 2.5. The answer is yes, we are committed to Java Config; and these two approaches are not mutually exclusive.

These two configuration approaches are quite different: the @Autowired annotation in the Spring Framework configures components using annotations in business objects, while Spring Java Config takes a unique approach of externalizing the annotations in dedicated configuration classes. Neither of these approaches is uniquely right or wrong, and they are compelling for different circumstances. There is even no reason that both couldn't be used in the same application.

If you think that Spring = XML it's time to rethink. (It was never strictly accurate, in any case, as the Spring core container has always used its own Java metadata, and doesn't know about XML or any other representation.)

This brings us to an important philosophical principle: *our mission with Spring is to provide the best component model for enterprise Java*, setting the standard for flexibility to meet complex requirements, and providing a comprehensive solution to real-world problems. We don't believe that there is any one size fits all model for configuration, and we believe in accommodating choice, within our strong, extensible model. However you choose to define your Spring-managed objects, they're eligible for the same rich set of enterprise services, unequaled third party integrations, true AOP, many extension points etc.

Thus Spring 2.5's @Component and @Autowired annotations, which cause the container to autodetect Spring-managed objects, can happily coexist with Java Configuration, XML and other configuration options.

This reminds me: I am talking about ways of configuring the Spring container at [QCon in San Francisco](http://qcon.infoq.com/sanfrancisco/conference/) later this week, and it should be interesting to get feedback. I'll see if I can post the slides here or on SpringFramework.org afterwards.

Spring Java Configuration was becalmed for a while due to Costin's commitment to [Spring Dynamic Modules for OSGi](http://www.springframework.org/osgi), but it's now on track. I have done quite a bit of work on it over the last few days: updating it to Spring 2.5; removing unused code; and adding an often requested new feature--the externalization of configuration values, as well as beans.

While M2 runs fine on 2.5RC1 (quite a statement of 2.5's backward compatibility, given the depth of JavaConfig's use of Spring IoC), it contained its own annotation scanning code (which the Spring Framework adopted and took forward), so moving to the later Spring version made sense.

The new configuration property externalization feature takes a suggestion in [JIRA](http://opensource.atlassian.com/projects/spring/browse/SJC-16) to use abstract methods (thanks to Guillaume Duchesneau).

These methods are annotated with the new @ExternalValue annotation, as follows:

`  @Configuration @ResourceBundles("classpath:/com/yourcompany/yourpackage/basename")  static abstract class ConfigurationExample {  ``` Copy@Bean public Person john() { 	Person john= new Person(); 	john.setName(getName()); 	john.setAge(methodWithArbitraryNameReturningAge());		 	john.setBusy(busy()); 	return john; } 	     // Property name defaults to method name.     // In the case of a getter method, it's the property name--     // "name" in this case @ExternalValue public abstract String getName(); 	      // Property name is taken from annotation value @ExternalValue("age")                   public abstract int methodWithArbitraryNameReturningAge(); 	 @ExternalValue protected abstract boolean busy(); 	 ```   `

`} `

Spring Java Config subclasses such classes to implement those methods to return the externalized properties at runtime. (It subclasses configuration classes anyway, for other reasons, such as caching singleton bean method return values.) The methods can be public or protected.

The @ResourceBundles annotation on the configuration class identifies one or more resource bundles to use to resolve values, which can be identified through the method name or through an explicit String value on the annotation. The locations are Spring resource location Strings.

Methods annotated with @ExternalBean can be concrete, in which case the actual return value will be used if no external value is found, like this: `  @ExternalValue public int otherNumber() { return 25; }  ` This usage means that value is externalizable, but externalizing it is optional, as with a bean property with a usable default.

As you would expect, the properties file for the example looks like this:

`  name=John Doe age=45 busy=false  `

The underlying mechanism is designed to be extensible, so properties files are not the only option, and we will provide additional options in future releases. The abstract method approach allows for dynamically sourced values: for example, from a database, or custom, from another system.

Right now, the example only works from SVN, but we are planning a M3 release this month. Moving forward, [Chris Beams](http://www.interface21.com/people/cbeams.html), a new Interface21 consultant based in Seattle, will be working on this project. At Interface21, we believe that all our technical staff should do everything we do as a company: developing products, consulting and training. Product developers deliver some training and consulting; service delivery staff work on projects. This ensures that everyone gets to contribute to the open source projects we all care about, and that everyone stays grounded in real world business requirements, rather than developing infrastructure in glorious isolation (a danger seen in J2EE in the past). Chris does mainly consulting and training, but he will be "aligned" with Spring Java Config, making it his main development focus, so he should be spending significant time on development, with help from Costin and myself.

How long it takes to get Spring Java Config to 1.0 final partly depends on you. We need feedback on usage in anger; we need feature requests (although we'll probably want to keep the scope manageable for 1.0); and we need help in prioritization. If you want this, tell us and we'll listen!