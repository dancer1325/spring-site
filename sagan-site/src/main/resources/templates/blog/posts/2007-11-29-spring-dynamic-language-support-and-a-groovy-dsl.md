---
title: Spring Dynamic Language Support and a Groovy DSL
source: https://spring.io/blog/2007/11/29/spring-dynamic-language-support-and-a-groovy-dsl
scraped: 2026-02-24T09:23:15.791Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Dave Syer |  November 29, 2007 | 0 Comments
---

# Spring Dynamic Language Support and a Groovy DSL

_Engineering | Dave Syer |  November 29, 2007 | 0 Comments_

Since the introduction of Spring dynamic laguage support in Spring 2.0 it has been an attractive integration point for Groovy, and Groovy provides a rich environment for defining Domain Specific Languages (DSL). But the examples of Groovy integration in the Spring reference manual are limited in scope and do not show the features in Spring that are targeted at DSL integration. In this article I show how to use those features and as an example we add bean definitions to an existing ApplicationContext with a Groovy DSL from the Grails distribution.

## Groovy Beans

The basic features of Spring dynamic language integration are exposed in the "lang" namespace in XML. The most straightforward thing you can do is to defined a Spring component as a Groovy bean, in a separate file or inline in the XML. This feature is covered in the Spring reference guide ([](http://static.springframework.org/spring/docs/2.5.x/reference/index.html)[http://static.springframework.org/spring/docs/2.5.x/reference/index.html](http://static.springframework.org/spring/docs/2.5.x/reference/index.html)) so we don't need to go into too much detail, but for completeness we might as well look at a quick example.

Suppose we have a Java interface

```java
Copypublic interface Messenger {

	String getMessage();

}
```

Here is an inline bean definition in Groovy that implements the interface

```xml
Copy<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:lang="http://www.springframework.org/schema/lang"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.springframework.org/schema/lang http://www.springframework.org/schema/lang/spring-lang-2.5.xsd
	http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-2.5.xsd">

	<lang:groovy id="messenger">
<![CDATA[
class GroovyMessenger implements spring.Messenger {

	def String message;
}
]]>
	</lang:groovy>

</beans>
```

Note that since Groovy defines public getters and setters for all attributes, we do not need to actually write the getMessage() method explicitly. Also remember that a feature of the Spring dynamic language support is that the inline Groovy code can also be pulled out into a separate source file (using the script-source attribute of the lang:groovy element).

Another feature of the Spring dynamic language support is that the script can go beyond simply defining a class. You can also write a Groovy script that does some processing and at the end returns an instance of an object. For example, if we already have an implementation of Messenger called JavaMessenger:

```xml
Copy<lang:groovy id="messenger">
<![CDATA[
def messenger = new JavaMessenger("Hello World!")
messenger
]]>
</lang:groovy>
```

This has the effect of exposing an instance of the JavaMessenger with a specific message - a trivial example, but a good way to see the feature exposed. Using this technique allows us to go a step beyond normal bean creation patterns in Spring and do as much processing as we like in the script before returning the object.

Under the hood Spring is creating an instance of groovy.util.Script whose run() method returns the object at the end of the script. This will turn out to be important when we start to think about how to integrate a DSL.

## Customizing the Groovy Object

The next feature we need to look at to get us into the DSL arena is the ability to customize the Groovy object before it is exposed as a Spring component. This feature was added, I believe, after a meeting between Rod Johnson and Guillaume Laforge at a conference close to the beginning of the Spring 2.0 release (it wasn't in 2.0). Guillaume's interest in Domain Specific Languages led him to observe that Spring is in a good position to be able to manipulate and add behaviour to a Groovy object (or its class) before anyone gets a chance to use it, and since Groovy is a dynamic language this is quite a powerful idiom.

The mechanism they came up with is the GroovyObjectCustomizer interface, which can be applied to the Groovy object before it is exposed to the Spring container client. The interface looks like this:

```java
Copypublic interface GroovyObjectCustomizer {

	void customize(GroovyObject goo);

}
```

and it is applied to the Groovy object after instantiation and (if it is a Script) before it is run. This allows us to play games with the object's methods and properties before it is released.

To apply the customizer all we need to do is add a reference to it in the Groovy bean definition:

```xml
Copy<lang:groovy id="messenger" script-source="classpath:..." customizer-ref="customizer"/>

<bean id="customizer" class="..."/>
```

## A Domain Specific Language - BeanBuilder

Grails has a nice DSL for Spring components called a BeanBuilder (see [here](http://grails.codehaus.org/Spring+Bean+Builder) for more details). It allows us to build a Spring ApplicationContext in Groovy in quite a natural and succinct way. According to Graeme Rocher, in recent versions of Grails, BeanBuilder also works without any dependency on web frameworks - you just need Grails Core and Groovy on your classpath. So now is a good time to see if we can integrate the BeanBuilder with Spring (as has also been pointed out on the Spring Forum [here](http://forum.springframework.org/showthread.php?t=46604)). (I actually couldn't get the sample to work with Grails 1.0-rc1 without the servlet API and Spring webflow jars, but probably it will work in rc2 or 1.0 final.)

An expression in a Domain Specific Language in Groovy usually takes the form of a closure, so it would be natural to use the Script pattern from the Spring integration to define the closure. In the case of the BeanBuilder it would look like this:

```xml
Copy<lang:groovy id="beans">
<![CDATA[
beans = {
	messenger(JavaMessenger) {
		message = "Hello World!"
	}
	// ... more bean definitions here ...
}
]]>
</lang:groovy>
```

This produces a Script object, which itself returns a closure (called "beans") containing bean definitions. One of the bean definitions is our friend the messenger. What we would ideally like is to be able to take those bean definitions and merge them with the current ApplicationContext. To do this we will need to use a GroovyObjectCustomizer.

### A Basic GroovyObjectCustomizer

Here is the bare bones of a customizer that will take the closure from a scripted Groovy object and create an application context from it:

```java
Copypublic class BeanBuilderClosureCustomizer implements GroovyObjectCustomizer {

	public void customize(GroovyObject goo) {
		createApplicationContext(goo.run())
	}
	
	private ApplicationContext createApplicationContext(Closure value) {
		BeanBuilder builder = new BeanBuilder()
		builder.beans(value)
        builder.createApplicationContext()
	}

}
```

It doesn't do anything with the application context it creates yet - just creates it and lets it evaporate. It also doesn't do any error checking, but we can add that later. The customizer is written in Groovy, so that we can just call goo.run() without casting to Script.

### Improved GroovyObjectCustomizer

Now let's improve the implementation so we transfer the bean definitions from the BeanBuilder to the enclosing ApplicationContext.

```java
Copypublic class BeanBuilderClosureCustomizer implements GroovyObjectCustomizer {

	public void customize(GroovyObject goo) {
		addbeanDefinitions(createApplicationContext(goo.run()))
	}
	
	private void addBeanDefinitions(ApplicationContext context) {
		DefaultListableBeanFactory scriptBeanFactory = context.autowireCapableBeanFactory
		for (name in  scriptBeanFactory.getBeanDefinitionNames()) {
			BeanDefinition definition = scriptBeanFactory.getBeanDefinition(name)
			applicationContext.autowireCapableBeanFactory.registerBeanDefinition(name, definition)
		}
	}

    // createAppicationContext defined here....
}
```

What could be simpler?

Putting it all together so far, we can load this Spring configuration:

```xml
Copy<beans>

	<lang:groovy id="beans" customizer-ref="customizer">
<![CDATA[
beans = {
	messenger(JavaMessenger) {
		message = "Hello World!"
	}
	// ... more bean definitions here ...
}
]]>
	</lang:groovy>

	<bean id="customizer" class="BeanBuilderClosureCustomizer"/>

</beans>
```

and then get the messenger out and use it. In the sample (see attachments) we let the Spring 2.5 TestContextFramework take care of creating an ApplicationContext and injecting dependencies into the test case (so no need for any dependency lookup).

### Using the Current Context as a Parent

As a final tweak to make our BeanBuilderClosureCustomizer more useful we will modify it to use the enclosing ApplicationContext as a parent for the bean definitions in the BeanBuilder. To do this we just need a reference to the parent in our customizer, so we need to implement ApplicationContextAware and use that reference to construct the BeanBuilder:

```java
Copypublic class BeanBuilderClosureCustomizer implements GroovyObjectCustomizer,
		ApplicationContextAware {

	def ApplicationContext applicationContext;

	public void customize(GroovyObject goo) {
		addbeanDefinitions(createApplicationContext(goo.run()))
	}
	
	private ApplicationContext createApplicationContext(Closure value) {
		BeanBuilder builder = new BeanBuilder(applicationContext)
		builder.beans(value)
		builder.createApplicationContext()
	}

    // addBeanDefinitions defined here....
}
```

Since BeanBuilderClosureCustomizer is written in Groovy we don't need to define explicit getters and setters for the applicationContext property - they are generated automatically by Groovy.

The BeanBuilderClosureCustomizer is now ready for use (with some additional error checking maybe). And the really great thing about Groovy is that it can be compiled and shipped as JVM bytecode in a jar file. So all that I need to do for that is make sure that the generated class file is shipped when my project is packaged. The sample does this just by compiling the Groovy bean into the same target directory as the Java compiler is using.

## Referring to Beans in the Parent Context

It would also be pretty neat to refer to beans in the parent context inside our Groovy DSL. Grails allows us to do this already by using the "ref" keyword in the BeanBuilder DSL, e.g.

```xml
Copy<lang:groovy id="beans" customizer-ref="customizer">
<![CDATA[
beans = {
	messenger(JavaMessenger) {
		message = ref("helloMessage")
	}
	// ... more bean definitions here ...
}
</lang:groovy>
```

Here we have loaded the message up from a bean definition in the parent context.

## The Sample Project

To run the sample just unpack the [zip file](http://blog.interface21.com/main/wp-content/uploads/2007/11/dsl-blog.zip), or use Eclipse to import it into an existing workspace (File->Import...->Existing Projects...). If you have the m2 plugin for Eclipse it should work out of the box. If not you can use the m2 Eclipse plugin to generate Eclipse meta-data ("mvn eclipse:eclipse"). If you aren't using Maven or Eclipse you are on your own, but you can find the top level project dependencies in the pom.xml.

Since the project uses the JSR-250 annotations for dependency injection in the unit test you will need that API available. the easiest way is to use Java 6 to run and compile. E.g. on a \*NIX command line

```plain
Copy$ JAVA_HOME=<path-to-JDK-1.6> mvn clean test
```

Footnote: actually I lied when I said above that I could load configuration that includes inline scripts - it doesn't work in Spring 2.5 because of a bug that is fixed in 2.5.1 (see [JIRA](http://opensource.atlassian.com/projects/spring/browse/SPR-4168)). The workaround (as per the sample) is to use an external file to store the script.