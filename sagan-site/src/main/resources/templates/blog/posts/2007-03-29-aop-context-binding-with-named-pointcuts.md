---
title: AOP Context Binding With Named Pointcuts
source: https://spring.io/blog/2007/03/29/aop-context-binding-with-named-pointcuts
scraped: 2026-02-24T09:31:12.910Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Hale |  March 29, 2007 | 1 Comment
---

# AOP Context Binding With Named Pointcuts

_Engineering | Ben Hale |  March 29, 2007 | 1 Comment_

There a a ton of new features in Spring AOP including the AspectJ pointcut language, the <aop:\*/> namespace, and the @AspectJ syntax support. But by far one of the most powerful aspects (forgive the pun) is the AOP context binding.

For example, let's say you want to advise a method that takes a String as an argument.

```java
Copy
public interface HelloService {
	String getHelloMessage(String toAddHello);
}

```

To advise this method, you'd write a pointcut that looked for a String return type, all implementations of the HelloService interface and the getHelloMessage(String) method.

```java
Copy
@Before("execution(public java.lang.String aop.HelloService+.getHelloMessage(String))")
```

But what if you wanted to apply an advice that needed that String argument internally?

```java
Copy
public void filter(String input) {
	if (obscenities.contains(input)) {
		throw new IllegalArgumentException("Obscenities such as '" + input + "' will not be tolerated!");
	}
}

```

Well that's where AOP context binding comes into play. It turns out that Spring supports quite a bit of the AspectJ pointcut language. That part that concerns us here is the args() operator. This operator can allow us to select an argument and bind that argument to our advice. So when the pointcut and advice are combined, this is what you'd see.

```java
Copy
@Before("execution(public java.lang.String aop.HelloService+.getHelloMessage(String)) && args(input)")
public void filter(String input) {
	if (obscenities.contains(input)) {
		throw new IllegalArgumentException("Obscenities such as '" + input + "' will not be tolerated!");
	}
}

```

Now this is pretty cool. You get strongly typed and named binding of an argument from the advised method into the advice. In the more complex example, it's possible to bind multiple pieces of context such as other arguments, the object being invoked and more to the advice as well. One thing I do want to point out because it trips me up *all* the time is that the name of the argument in the args() operator corresponds to the name of the argument in the **advice method**.

The problem with this particular configuration is that most of the time you don't create advice declarations with embedded pointcuts. Typically you'd externalize the pointcut to a named pointcut. To do that, you need to introduce another level of indirection. To wit, the named pointcut followed by the advice definition.

```java
Copy
@Pointcut("execution(public java.lang.String aop.HelloService+.getHelloMessage(String)) && args(helloInput)")
public void helloService(String helloInput) {}

```

```java
Copy
@Before("helloService(input)")
public void filter(String input) {
	if (obscenities.contains(input)) {
		throw new IllegalArgumentException("Obscenities such as '" + input + "' will not be tolerated!");
	}
}

```

The important thing to note in this example is that the named pointcut is required to take as an argument the type of context so that argument can be propagated to the advice. You see the helloService(String) taking a String so that the Before advice can reference helloService(input).

The final step is to create an configuration file that glues the system together.

```xml
Copy
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:aop="http://www.springframework.org/schema/aop"
	xmlns:util="http://www.springframework.org/schema/util"
	xsi:schemaLocation="
		http://www.springframework.org/schema/beans
		http://www.springframework.org/schema/beans/spring-beans-2.0.xsd
		http://www.springframework.org/schema/aop
		http://www.springframework.org/schema/aop/spring-aop-2.0.xsd
		http://www.springframework.org/schema/util
		http://www.springframework.org/schema/util/spring-util-2.0.xsd">

	<bean id="helloService" class="aop.HelloServiceImpl" />

	<bean id="obscenityFilter" class="aop.ObscenityFilter">
		<constructor-arg>
			<util:set>
				<value>Microsoft</value>
			</util:set>
		</constructor-arg>
	</bean>

	<aop:aspectj-autoproxy>
		<aop:include name="obscenityFilter" />
	</aop:aspectj-autoproxy>

</beans>

```

---

Now some of you may be asking why even use the AOP context binding. It is true that you could simply add a JoinPoint argument to the advice and Spring AOP will automatically bind it. That object would contain all of the arguments return values, etc that you could get with context binding. However, when dealing with that context information, all you're really getting are Objects and Object\[\] items. You still end up casting and dealing with the potential exceptions. With the context binding, you get only what you're looking for (no poking about in the JoinPoint datastructure) and that data is strongly typed. Less code == less maintenance == less cost! (But that's what AOP is all about anyway, right?)

For those interested I've got the source code in this example [right here.](http://blog.interface21.com/main/wp-content/uploads/2007/03/aop-binding.zip)