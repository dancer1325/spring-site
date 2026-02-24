---
title: Another Reason to Love Spring 2.0: Interceptor Combining
source: https://spring.io/blog/2006/04/09/another-reason-to-love-spring-2-0-interceptor-combining
scraped: 2026-02-24T09:37:53.791Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Hale |  April 09, 2006 | 0 Comments
---

# Another Reason to Love Spring 2.0: Interceptor Combining

_Engineering | Ben Hale |  April 09, 2006 | 0 Comments_

Recently I was working on a project that had a Swing client communicating via RMI to a service layer. The service layer was marked with transactions and everything seemed to work fine. However everytime we'd get an exception at the Hibernate DAO layer, Spring would turn the exception into a runtime exception and it would get propagated all the way up the stack and across the RMI connection as a RemoteException. Whenever the exception was deserialized there would be an exception on the client (separate from the RemoteException.The decision was taken to simply introduce an aspect. Any exception that subclassed ServiceAccessException would be let through to the client while anything else would be converted to a FilteredServiceAccessException (a subclass of ServiceAccessException) and then be thrown. This led to some loss in content, so we made sure to log the original exception on the server where it could be useful and let the client show a generic dialog so the user knew generally what had happened.

Now this was a pretty good plan and seemed on track to work until we tried to implement it. We were using the magic way of autoproxying any bean that had @Transactional on it to get our transactional proxies. We could have updated the definition of that autoproxying to make sure that the advice for this exception filtering was added (think [setPreInterceptor](http://static.springframework.org/spring/docs/2.0-m3/api/org/springframework/transaction/interceptor/TransactionProxyFactoryBean.html#setPreInterceptors\(java.lang.Object[]\)) in [TransactionProxyFactoryBean](http://static.springframework.org/spring/docs/2.0-m3/api/org/springframework/transaction/interceptor/TransactionProxyFactoryBean.html)) but the the autoproxying was catching more than just the service layer.

So where did that leave us? We could either A) explicitly declare each use of the TransactionProxyFactoryBean, B) make two different sets of autoproxying and have them be mutually exclusive for one another, or C) ignore the requirement for now and hope something magical happens. Since the product was still six months away from consumers and I try to follow the principal of the '[last responsible moment](http://codebetter.com/blogs/jeremy.miller/archive/2006/01/18/136648.aspx)' introduced to me by Jeremy Miller I decided to table the issue with choice A being my backup plan (better to have no magic than twice as much magic).

Lo and behold, Spring 2.0 solved my problem. I cannot for the life of me find where I read it, but starting in one of the milestones of 2.0, when a bean is proxied the proxy factory can now detect that the bean already has a proxy and just add the intended interceptor as another interceptor (if you know where it was leave the link in the comments please). This means that I could just use the new magic ([tx:annotation-driven](tx:annotation-driven)) and simply add an aspect with the proper pointcut that I wanted and I wouldn't have to worry about the transaction proxy and the AOP proxy getting crossed up. Not quite sure what this is all about? How about an example. First an interface and implementation.

```java
Copy
package interceptorcombiningexample;

import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface ExampleTarget {

	void exampleMethod();

}
```

```java
Copy
package interceptorcombiningexample;

public class DefaultExampleTarget implements ExampleTarget {

	public void exampleMethod() {
	}
}
```

Notice that the interface is marked @Transactional. We'll use that to get some magic autoproxying later on. Next we'll take a look at the bean definitions.

```xml
Copy
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:aop="http://www.springframework.org/schema/aop"
	xmlns:tx="http://www.springframework.org/schema/tx"
	xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/aop 
       http://www.springframework.org/schema/aop/spring-aop.xsd
       http://www.springframework.org/schema/tx
       http://www.springframework.org/schema/tx/spring-tx.xsd">

	<tx:annotation-driven />

	<aop:config>
		<aop:aspect id="exampleAspect" ref="exampleAdvice">
			<aop:before method="exampleAdvice"
				pointcut="execution(* interceptorcombiningexample.ExampleTarget.exampleMethod())" />
		</aop:aspect>
	</aop:config>

	<bean id="exampleAdvice"
		class="interceptorcombiningexample.ExampleAdvice" />

	<bean id="exampleTarget"
		class="interceptorcombiningexample.DefaultExampleTarget" />

	<bean id="transactionManager"
		class="interceptorcombiningexample.DummyTransactionManager" />

</beans>
```

You'll notice that we set up annotation driven transactions which will automatically build a proxy around our DefaultExampleTarget. In addition, we define another aspect that should need to proxy the same DefaultExampleTarget bean. Finally lets take a look at our executable class.

```java
Copy
package interceptorcombiningexample;

import org.springframework.aop.Advisor;
import org.springframework.aop.framework.Advised;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class InterceptorCombiningExample {

	public static void main(String[] args) {
		ApplicationContext ctx = new ClassPathXmlApplicationContext(
				"classpath:interceptorcombiningexample/applicationContext.xml");

		ExampleTarget target = (ExampleTarget) ctx.getBean("exampleTarget");
		if (target instanceof Advised) {
			Advised advised = (Advised) target;
			System.out
					.println("Advisor count: " + advised.getAdvisors().length);
			for (Advisor advisor : advised.getAdvisors()) {
				System.out.println("Advisor type: "
						+ advisor.getAdvice().getClass().getName());
			}
		}
	}

}
```

This class takes advantage of a nice little feature of Spring's proxy mechanism. Any Spring created proxy can be cast to the [Advised](http://static.springframework.org/spring/docs/2.0-m3/api/org/springframework/aop/framework/Advised.html) interface. This interface will give you access to all of the interceptors in a proxy. When we go ahead and run this class the output shows:

```code
CopyAdvisor count: 3
Advisor type: org.springframework.aop.interceptor.ExposeInvocationInterceptor
Advisor type: org.springframework.transaction.interceptor.TransactionInterceptor
Advisor type: org.springframework.aop.aspectj.AspectJMethodBeforeAdvice
```

From this we can see that not only was the [TransactionInterceptor](http://static.springframework.org/spring/docs/2.0-m3/api/org/springframework/transaction/interceptor/TransactionInterceptor.html) contained in the proxy, but also the [AspectJMethodBeforeAdvice](http://static.springframework.org/spring/docs/2.0-m3/api/org/springframework/aop/aspectj/AspectJMethodBeforeAdvice.html).

It's important to know that this shouldn't affect any implementations that already exist that attempt to do the same thing. This should just make life easier for all those who've been waiting for the 'last responsible moment' to solve this problem. :)

P.S. As in the last post, I've included an [archive of the project](http://blog.springframework.com/benh/wp-content/uploads/2006/04/InterceptorCombiningExample.zip) from this example so that you can see the rest of the code if you need it.