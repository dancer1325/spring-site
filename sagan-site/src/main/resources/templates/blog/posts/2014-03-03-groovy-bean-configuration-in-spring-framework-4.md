---
title: Groovy Bean Configuration in Spring Framework 4
source: https://spring.io/blog/2014/03/03/groovy-bean-configuration-in-spring-framework-4
scraped: 2026-02-24T07:39:53.369Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | David Turanski |  March 03, 2014 | 19 Comments
---

# Groovy Bean Configuration in Spring Framework 4

_Engineering | David Turanski |  March 03, 2014 | 19 Comments_

This post is intended to introduce the Groovy Bean Builder to Java developers as a powerful alternative or supplement to Java @Configuration and XML configuration. The Spring Framework release 4.0 includes a port of the Grails Bean Builder to the core Spring Framework, providing a Groovy DSL for configuring Spring applications. Groovy and Grails developers are no doubt familiar with configuring Spring applications this way and I expect the rest of you are already thinking "How cool is that?"

Don't worry if you're not a Groovy expert. Just as many Java programmers use another popular Groovy DSL, Gradle, to build applications, you only need to know some basic syntax to get started. Sample code is available on [github](https://github.com/dturanski/groovy-beans).

## [](#the-basics)The Basics

The following Groovy code provides some very simple bean definitions. The top level `beans {...}` construct is actually a closure that the [GroovyBeanDefinitionReader](http://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/beans/factory/groovy/GroovyBeanDefinitionReader.html) processes as a DSL.

```groovy
Copybeans {
    framework String, 'Grails'
    foo String, 'hello'
    bar(Bar,s:'hello',i:123)
}
```

The three lines contained within the closure are "virtual" methods following the syntax

```groovy
CopybeanName(type, constructor-args)  // parens optional
```

Note that Groovy objects always provide a constructor that accepts a map which can include any class attributes and corresponding values. The last line instantiates an instance of a class `Bar` that contains two fields, `s` and `i`. It is also easy to define properties using a nested closure (ad infinitum):

```groovy
Copyimport my.company.MyBeanImpl
beans = {
    myBean(MyBeanImpl) {
        someProperty = 42
        otherProperty = "blue"
    }
}
```

Bean references are also very straightforward. The Groovy equivalent of

```xml
Copy<bean id="someBean" class="com.SomeClass">
    <property name="someProperty" ref="someOtherBean"/>
</bean>
```

is

```groovy
CopysomeBean(com.SomeClass) {
    someProperty = ref('someOtherBean')
}
```

Usually `ref` is not required:

```groovy
CopysomeBean(com.SomeClass) {
    someProperty = someOtherBean
}
```

Right away you can see that Groovy is much easier on the eyes and keyboard than the equivalent XML or Java configurations:

```xml
Copy<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
      <bean id="myBean" class="my.company.MyBeanImpl">
          <property name="someProperty" value="42"/>
          <property name="anotherProperty" value="blue"/>
     </bean>
</beans>
```

```java
Copyimport my.company.MyBeanImpl;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
@Configuration
public class MyConfig() {
    @Bean myBean() {
          MyBeanImpl myBean = new MyBeanImpl();
          myBean.setSomeProperty(42);
          myBean.setAnotherProperty("blue");
          return myBean;
    }
}
```

Additionally, the Groovy Bean Builder accepts an argument to the closure to allow you to configure Spring bean definition properties if necessary:

```groovy
CopysessionFactory(ConfigurableLocalSessionFactoryBean) { bean ->
    // Sets the initialization method to 'init'. [init-method]
    bean.initMethod = 'init'

    // Sets the destruction method to 'destroy'. [destroy-method]
    bean.destroyMethod = 'destroy'

    // Sets the scope of the bean. [scope]
    bean.scope = 'request'
    dataSource = ref('dataSource')

    hibernateProperties = ["hibernate.hbm2ddl.auto": "create-drop",
                           "hibernate.show_sql":     "true"]
}
```

And it gets better. Note that the Bean Builder DSL is valid Groovy code. That means you can add in-line Groovy code to do some interesting things that are either painful or impossible using more traditional ways to configure Spring applications. In short, anything you can do in Groovy, you can do with the Bean Builder. In practice, you don't want to put a lot of logic in the DSL, but where it makes sense you have a lot of options.

For example, when I started looking at this prior to the GA release of Spring 4, I was surprised that the DSL did not include support for Spring environment profiles. The authors were willing to consider it, but it turns out it's not really necessary.

## [](#using-environment-profiles)Using Environment Profiles

The following shows a brute force way to use profiles. The `beans` closure delegates to the GroovyBeanDefinitionReader from which you can access the environment, among other things. Here, we can wrap the bean closure with an `if...else` block to conditionally define a bean based on whether a specific profile is active.

```groovy
Copybeans {
    // org.springframework.beans.factory.groovy.GroovyBeanDefinitionReader
    if (environment.activeProfiles.contains("prof1")) {
        foo String, 'hello'
    } else {
        foo String, 'world'
    }
}
```

More interesting than the use of profiles in this example is the ability to apply conditional expressions to the configuration. The GroovyBeanDefinitionReader is basically compiling a Groovy script under the covers. The DSL uses Groovy meta-programming to interpret unknown methods it encounters within the top-level `beans` closure such as `foo` as bean definitions. This provides the best of both worlds, combining the immediacy of declarative configuration with the full power of Groovy. In fact, one of the main drivers for environment profiles introduced in Spring 3, was to support conditional configuration in a way that works simply within the constraints of XML. While it is possible to implement programming constructs in XML, numerous attempts to do so (e.g. Jelly, XSLT) have proven to be extremely painful, contributing significantly to the general backlash against XML.

## [](#using-groovy-configuration-with-java)Using Groovy configuration with Java

If the above configuration is contained in `config/contextWithProfiles.groovy` then using the application context from Java is as straightforward as you might expect:

```java
CopyApplicationContext context = new GenericGroovyApplicationContext("file:config/contextWithProfiles.groovy");
String foo =  context.getBean("foo",String.class);
```

In the above example, the value of `foo` would be the default value `world` (barring any external environment profile settings). Alternatively, you can set the profile:

```java
CopyGenericGroovyApplicationContext context = new GenericGroovyApplicationContext();
context.getEnvironment().addActiveProfile("prof1");
context.load("file:config/contextWithProfiles.groovy");
context.refresh();
String foo =  context.getBean("foo",String.class);
assertEquals("hello",foo);
```

## [](#variable-binding)Variable Binding

Before we get off the topic of environment profiles, let's take a look at how to bind any variable referenced in the Groovy bean configuration:

```java
Copyimport groovy.lang.Binding;
...
GenericGroovyApplicationContext context = new GenericGroovyApplicationContext();
context.getEnvironment().addActiveProfile("prof1");

Binding binding = new Binding();
binding.setVariable("profiles",context.getEnvironment().getActiveProfiles());
binding.setVariable("mode","test");
context.getReader().setBinding(binding);
context.load("file:config/contextWithBindings.groovy");
context.refresh();
```

The above snippet requires Groovy (e.g, groovy-all.jar) as a compile time dependency and works seamlessly with Java. Here we are binding the variables `profiles` and `mode` before loading the configuration:

```groovy
Copybeans {
    if (profiles.contains("prof1")) {
        foo String, mode == 'test'? 'test':'hello'
    } else {
        foo String, 'world'
    }
}
```

With variable bindings and inline conditional expressions, we can start to see why environment profiles become somewhat irrelevant. The caveat here is if you are integrating with a Spring ecosystem that already uses environment profiles, you may need to support them.

## [](#using-external-properties)Using External Properties

Likewise, property placeholders are of limited use here. For one thing, Groovy Strings already perform inline variable substitution using the same syntax, so traditional property placeholders tend to confuse things:

```groovy
Copydef val='world'
def greeting="hello, ${val}!!" 
```

Property placeholders were de rigeur in the early days of XML configuration, with Spring borrowing from the Ant play book. They are still widely used in Spring even with annotation based configuration using `@Value`. Groovy offers some powerful alternatives for incorporating external properties. For example, `ConfigSlurper` is part of the core Groovy library and commonly used in Grails applications. We can use it to load external configuration directly:

```groovy
Copyimport org.springframework.core.io.ClassPathResource
def url = new ClassPathResource('spring.config').URL
def config = new ConfigSlurper().parse(url)

beans {
    if (config.color=='red') {
        foo String, 'hello'
    } else {
        foo String, 'world'
    }
}
```

Or if you prefer, you can load a plain old properties file:

```groovy
Copyimport org.springframework.core.io.ClassPathResource

def properties = new Properties()
properties.load(new ClassPathResource('spring.properties').inputStream);

beans {
    if (properties.color=='red') {
        foo String, 'hello'
    } else {
        foo String, 'world'
    }
}
```

In all fairness, you can do this kind of thing with Java configuration as well. Groovy lets you trade type safety for expressive elegance.

## [](#new-horizons)New Horizons

To take this one step further, Groovy configuration provides flexibility unmatched by alternate configuration methods. For example, Spring's component scanner scans the class path for classes annotated with annotations such as `@Configuration` and ` @Component`. Since scanning the entire class path is inefficient, Spring requires the component scanner to designate at least one base package. In XML, this looks something like:

```xml
Copy<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">
    <context:component-scan base-package="my.beans"/>
</beans>
```

What if I want the base package to be configurable? I can't use a property placeholder for the package name since Spring processes property placeholders later in the lifecycle. The same is true for the `@ComponentScan(basePackage="...")` annotation. Using the GroovyBeanDefinitionReader, on the other hand, the Groovy compiler processes the configuration script, resolving variables before the Spring bean factory even sees it. The following configuration binds the base package to an external property value:

```groovy
Copyimport org.springframework.core.io.ClassPathResource

def url = new ClassPathResource('spring.config').URL;
def config = new ConfigSlurper().parse(url);

beans {
    xmlns([ctx:'http://www.springframework.org/schema/context'])
    ctx.'component-scan'('base-package':config.basePackage)
}
```

Note the terse syntax for declaring an XML namespace.

The same kind of trick can even be applied to the bean id and class name itself:

```groovy
Copydef id1='bar'
def clazz=Bar.class

beans {
    framework String, 'Grails'
    foo String, 'hello'
    "$id1"(clazz,s:'hello',i:123)
}
```

These last two examples may seem esoteric, but I have encountered both of these issues developing large applications with Spring.

So... How cool is that? Let us know @SpringCentral