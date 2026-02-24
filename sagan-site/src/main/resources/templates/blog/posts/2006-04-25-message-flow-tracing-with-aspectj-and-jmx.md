---
title: Message Flow Tracing with AspectJ and JMX
source: https://spring.io/blog/2006/04/25/message-flow-tracing-with-aspectj-and-jmx
scraped: 2026-02-24T09:37:40.566Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Hale |  April 25, 2006 | 1 Comment
---

# Message Flow Tracing with AspectJ and JMX

_Engineering | Ben Hale |  April 25, 2006 | 1 Comment_

In a project that I used to work on we had a system that would receive messages from a device and make decisions on whether that information would be passed to the user. There were multiple decision levels and one of the problems we always found ourselves asking was if a message was being lost on it's way through the system.

Before we moved to Spring, it was nearly impossible to tell the answer to that question. Attempts were made to use logging, but the sheer volume of messages that decisions were made on made it tedious at best. Other attempts were made using debuggers but a combination of the volume and the timing changes led to only intermittent success.

Unfortunately I left before we could implement a more suitable solution but if I had, here is what it probably would have been like. At the end I'll discuss some of the extensions that might be useful in this kind of effort.

To start, we've got a set of interfaces and their implementations:

```java
Copy
package flowtracingexample;

public interface Component1 {

	void forwardCall();

}
```

```java
Copy
package flowtracingexample;

import java.util.Random;

public class DefaultComponent1 implements Component1 {
	
	private Component2 child;

	private Random r = new Random();
	
	public DefaultComponent1(Component2 child) {
		this.child = child;
	}

	public void forwardCall() {
		if (r.nextBoolean()) {
			child.forwardCall();
		}
	}

}
```

```java
Copy
package flowtracingexample;

public interface Component2 {

	void forwardCall();

}
```

```java
Copy
package flowtracingexample;

import java.util.Random;

public class DefaultComponent2 implements Component2 {
	
	private Component3 child;

	private Random r = new Random();
	
	public DefaultComponent2(Component3 child) {
		this.child = child;
	}

	public void forwardCall() {
		if (r.nextBoolean()) {
			child.forwardCall();
		}
	}

}
```

```java
Copy
package flowtracingexample;

public interface Component3 {

	void forwardCall();

}
```

```java
Copy
package flowtracingexample;

public class DefaultComponent3 implements Component3 {

	public void forwardCall() {
	}

}
```

This is a very simple example, but the gist is that using the fowardCall() method messages are passed 50% of the time to the next child component (ascending numerical order in this case). Note that there is no logic involving tracing in these POJOs.

To implement our tracing behaviors, we'd like to have a set of counters; one for each component. In addition we'd like ways to reset the counters, start and stop monitoring, and determine if monitoring is happening. To do this we implement a class with the counters.

```java
Copy
package flowtracingexample;

import org.springframework.jmx.export.annotation.ManagedAttribute;
import org.springframework.jmx.export.annotation.ManagedOperation;
import org.springframework.jmx.export.annotation.ManagedResource;

@ManagedResource
public class FlowTracer {

	private long component1Count = 0;

	private long component2Count = 0;

	private long component3Count = 0;

	private boolean tracing = false;

	@ManagedAttribute
	public long getComponent1Count() {
		return this.component1Count;
	}

	@ManagedAttribute
	public long getComponent2Count() {
		return this.component2Count;
	}

	@ManagedAttribute
	public long getComponent3Count() {
		return this.component3Count;
	}

	@ManagedAttribute
	public boolean getTracing() {
		return this.tracing;
	}

	public void incrementComponent1Count() {
		if (this.tracing) {
			component1Count++;
		}
	}

	public void incrementComponent2Count() {
		if (this.tracing) {
			component2Count++;
		}
	}

	public void incrementComponent3Count() {
		if (tracing) {
			component3Count++;
		}
	}

	@ManagedOperation
	public void resetAllComponentCount() {
		resetComponent1Count();
		resetComponent2Count();
		resetComponent3Count();
	}

	@ManagedOperation
	public void resetComponent1Count() {
		this.component1Count = 0;
	}

	@ManagedOperation
	public void resetComponent2Count() {
		this.component2Count = 0;
	}

	@ManagedOperation
	public void resetComponent3Count() {
		this.component3Count = 0;
	}

	@ManagedOperation
	public void startTracing() {
		tracing = true;
	}

	@ManagedOperation
	public void stopTracing() {
		tracing = false;
	}
}
```

The methods and their contents are pretty straight forward for this class. What may be new to you are the annotations on this class. These annotations are used by Spring's JMX support to automatically build up MBean management interfaces when each bean is deployed to the JMX MBeanServer.

-   [ManagedResource](http://static.springframework.org/spring/docs/2.0.x/api/org/springframework/jmx/export/annotation/ManagedResource.html): Declares that this class should be exposed as a JMX MBean
-   [ManagedAttribute](http://static.springframework.org/spring/docs/2.0.x/api/org/springframework/jmx/export/annotation/ManagedAttribute.html): Declares that the JavaBean property represented by this getter/setter should be a MBean attribute. You need to annotate both the getter and setter if you want read and write access to this attribute.
-   [ManagedOperation](http://static.springframework.org/spring/docs/2.0.x/api/org/springframework/jmx/export/annotation/ManagedOperation.html): Declares that this method should be exposed as an MBean operation

Finally it's a matter of wiring the whole thing together. First, we wire together the components that make up the flow. Next we declare the aspects that will put the tracer on each of the components. In this case we are using the very sweet AspectJ pointcut language. Finally we setup the JMX exporter to autodetect instances of classes that have the @ManagedResource annotation on them.

```xml
Copy
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:aop="http://www.springframework.org/schema/aop"
	xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/aop 
       http://www.springframework.org/schema/aop/spring-aop.xsd">

	<!-- Components -->
	<bean id="component3" class="flowtracingexample.DefaultComponent3" />

	<bean id="component2"
		class="flowtracingexample.DefaultComponent2">
		<constructor-arg ref="component3" />
	</bean>

	<bean id="component1"
		class="flowtracingexample.DefaultComponent1">
		<constructor-arg ref="component2" />
	</bean>

	<!-- Aspect -->
	<bean id="flowTracer" class="flowtracingexample.FlowTracer" />

	<aop:config>
		<aop:aspect id="component1Aspect" ref="flowTracer">
			<aop:before method="incrementComponent1Count"
				pointcut="execution(public void flowtracingexample.Component1.forwardCall())" />
		</aop:aspect>

		<aop:aspect id="component2Aspect" ref="flowTracer">
			<aop:before method="incrementComponent2Count"
				pointcut="execution(public void flowtracingexample.Component2.forwardCall())" />
		</aop:aspect>

		<aop:aspect id="component3Aspect" ref="flowTracer">
			<aop:before method="incrementComponent3Count"
				pointcut="execution(public void flowtracingexample.Component3.forwardCall())" />
		</aop:aspect>
	</aop:config>

	<!-- JMX -->
	<bean class="org.springframework.jmx.export.MBeanExporter">
		<property name="autodetectModeName" value="AUTODETECT_ALL" />
		<property name="assembler">
			<bean
				class="org.springframework.jmx.export.assembler.MetadataMBeanInfoAssembler">
				<property name="attributeSource">
					<bean
						class="org.springframework.jmx.export.annotation.AnnotationJmxAttributeSource" />
				</property>
			</bean>
		</property>
		<property name="namingStrategy">
			<bean
				class="org.springframework.jmx.export.naming.IdentityNamingStrategy" />
		</property>
	</bean>

</beans>
```

The next things that we need to do is have a driver class. In this case the driver class just sends a message at some random delay under 750ms.

```java
Copy
package flowtracingexample;

import java.io.IOException;
import java.util.Random;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class FlowTracingExample {

	public static void main(String[] args) throws InterruptedException,
			IOException {
		ApplicationContext ctx = new ClassPathXmlApplicationContext(
				"classpath:flowtracingexample/applicationContext.xml");

		Component1 comp = (Component1) ctx.getBean("component1");
		Random r = new Random();

		System.out.print("Ready...");
		 System.in.read();

		for (;;) {
			comp.forwardCall();
			Thread.sleep(r.nextInt(750));
		}
	}
}
```

In my case, I'm going to run this application with the Java VM Management running since it gives me a free MBean server (and I like the pretty memory graphs). If you haven't heard of this, it's [a system property in Java 5 VMs](http://java.sun.com/developer/technicalArticles/J2SE/jconsole.html) that causes the VM to use JMX to manage itself. It has beans for memory consumption, threading, and a million other things. You start it simply by putting \-Dcom.sun.management.jmxremote on the command line of your running application. In another nifty Java 5 addition, I'm going to use jconsole to display my results.

Based on my rusty math skills, over the long term, I'd expect to see Component 1 called 100%, Component 2 called 50%, and Component 3 called 25% of the time. Lets see:

![Tracing Screen Shot](http://blog.interface21.com/main/wp-content/uploads/2006/04/tracing.png)

It's good to see that I remember my probabilities right. The best part is this still meets good design principals. For example, none of the components know anything about the tracing because that's not what they do. As well, all of the tracing requirements for this subsystem are contained in one class and have one implementation meeting the 1:1 requirements to implementation goal of AOP. Finally, with the ability to turn off the tracing, any performance impact is more or less neutralized. I know, I know incrementing an integer isn't that expensive, but if you're tracing did something expensive, it's nice to have and you don't have to worry if you want to send it into production; you can simply disable the monitoring until your customer calls in for support.

So the graphs sure are pretty and maybe even tell you stuff if you know your expected percentages, but what else could you do? How about the last 100 messages to go by and their decisions? How about a log of the reason that a message was dropped? How about correlation between drop decisions and the absence of a message at the end of the pipe? Wouldn't it be nice to know that a message had been lost (perhaps due to a threading issue) because you never intentionally dropped it but it didn't make it to the end within 500ms of its entry? Along that same line, how about an email to the admin if the time it takes to get from one end of the pipe to the other gets over 250ms?

The tracing/monitoring possibilities are endless (and pluggable!). What will you do with it?

And of course, [the source code](http://blog.interface21.com/main/wp-content/uploads/2006/04/flowtracingexample.zip "FlowTracingExample").