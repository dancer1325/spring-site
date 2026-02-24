---
title: POJO Aspects in Spring 2.0: A Simple Example
source: https://spring.io/blog/2006/03/22/pojo-aspects-in-spring-2-0-a-simple-example
scraped: 2026-02-24T09:37:58.174Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Fisher |  March 22, 2006 | 0 Comments
---

# POJO Aspects in Spring 2.0: A Simple Example

_Engineering | Mark Fisher |  March 22, 2006 | 0 Comments_

While the material in this post is quite simple, it will actually offer a glimpse of some rather significant new features in Spring 2.0. I hope that with a little imagination, you will be able to apply what you see here to far less trivial use cases of your own.

I am going to show 2 examples actually. The first will use a rather simple logger:

```java
Copy
package example;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class SimpleLogger {

  private static Log log = LogFactory.getLog(SimpleLogger.class);

  public void logOneString(String s) {
    log.info("string=" + s);
  }

  public void logTwoStrings(String s1, String s2) {
    log.info("string1=" + s1 + ",string2=" + s2);
  }
}
```

I will be using AOP to apply logging to a string concatenation service. Here is the interface:

```java
Copy
package example;

public interface ConcatService {
  public String concat(String s1, String s2);
}
```

Öand an implementing Class:

```java
Copy
package example;

public class ConcatServiceImpl implements ConcatService {

  public String concat(String s1, String s2) {
    return s1 + s2;
  }
}
```

Alright - nothing is very exciting about this so far, but the most important thing to notice is that I am *only dealing with POJOs* up to this point.

Now, have a look at these bean definitions. Notice the usage of the new Spring 2.0 XML Schema and the ìaopî namespace in particular:

```xml
Copy
<?xml version="1.0" encoding="UTF-8"?>
<beans
  xmlns="http://www.springframework.org/schema/beans"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:aop="http://www.springframework.org/schema/aop"
  xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd
    http://www.springframework.org/schema/aop
    http://www.springframework.org/schema/aop/spring-aop.xsd">

  <aop:config>
    <aop:aspect id="loggingAspect" ref="simpleLogger">
      <aop:before
        method="logTwoStrings"
        pointcut="execution(* example..*Service.*(..)) and args(s1,s2)"/>
      <aop:after-returning
        method="logOneString"
        returning="s"
        pointcut="execution(* example..*Service.*(..))"/>
    </aop:aspect>
  </aop:config>

  <bean id="simpleLogger" class="example.SimpleLogger"/>

  <bean id="concatService" class="example.ConcatServiceImpl"/>

</beans>
```

The ìloggingAspectî is defined with a reference to ìsimpleLoggerî which you saw in the very first code snippet above. Again, the interesting thing is that it is a simple POJO - it doesnít implement any interfaces or follow any contract in order to be used as an aspect. In fact, you may very well have code like this lying around already. ;)

The ìloggingAspectî contains 2 kinds of advice. One is the ìbeforeî kind of advice, and the other is the ìafterReturningî kind. Next, you see that the advice actually maps to methods on the SimpleLogger POJO - logTwoStrings() for the *before* advice and logOneString() for the *afterReturning* advice. This option of declarative mapping to a POJO method is a useful alternative to implementing advice interfaces.

Finally, a quick word on binding and pointcuts. In the ìbeforeî advice, *args(s1,s2)* specifies that this pointcut will apply when there are 2 arguments which can be bound to the 2 String parameters of the logTwoStrings() method - and that is exactly what happens here as you will see in just a moment. In the ìafterReturningî case, the return value is going to bind to the single String parameter of the logOneString() method.

Now, for the pointcutsÖ the values in the ìpointcutî attributes above are actually standard AspectJ pointcut expressions. In this case, they define what methods will be advised. The ì\*î is a wildcard, and the first ì..î signifies *any descendant package* while the second ì..î signifies *any number and type of parameters*. Essentially this pointcut will apply to any method of a Class that ends with ìServiceî regardless of its parameter type or count with any return value as long as it is somehow descending from the ìexampleî package. Okay, so maybe that doesnít seem quite so *simple* - but if it does at least sound interesting then you can read much more about the AspectJ expression language at the [AspectJ]( http://www.eclipse.org/aspectj/) site.

NOTE: While AspectJ expressions are being used here, the advice is still applied via Springís *Proxy-based AOP* as opposed to AspectJ weaving. This means that an interceptor is able to add behavior at method execution joinpoints only. It is highly likely that method execution interception will satisfy a majority of your AOP use-cases. However, for applying advice at other joinpoints (such as field access), you may use the full power of AspectJ (which is beyond the scope of this post).

So, without further hesitationÖ here is a simple main() method to try it out:

```java
Copy
public static void main(String[] args) {
  ApplicationContext context = new ClassPathXmlApplicationContext("example/simpleLoggerContext.xml");
  ConcatService concatService = (ConcatService)context.getBean("concatService");
  concatService.concat("some", "thing");
}
```

And the result!:

```
Copystring1=some,string2=thing
string=something
```

Now, for the second exampleÖ

Of course, you may want to log more information, such as method arguments, the calling method itself, and so on. To show how to accomplish this, I will revise this SimpleLogger just a bit. The secret is in the JoinPoint class (and the StaticPart Class) which will now be provided to the methods of my new class, MethodLogger:

```java
Copy
package example;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.JoinPoint.StaticPart;

public class MethodLogger {

  private static Log log = LogFactory.getLog(MethodLogger.class);

  public void logMethodEntry(JoinPoint joinPoint) {
    Object[] args = joinPoint.getArgs();
    String name = joinPoint.getSignature().toLongString();
    StringBuffer sb = new StringBuffer(name + " called with: [");
    for(int i = 0; i < args.length; i++) {
      Object o = args[i];
      sb.append(o);
      sb.append((i == args.length - 1) ? "]" : ", ");
    }
    log.info(sb);
  }

  public void logMethodExit(StaticPart staticPart, Object result) {
    String name = staticPart.getSignature().toLongString();
    log.info(name + " returning: [" + result + "]");
  }
}
```

As you can see, the JoinPoint provides access to the runtime info that I need. In the logMethodExit() method, only the type is required, so the StaticPart is sufficient (it is actually part of the JoinPoint in that JoinPoint provides a getStaticPart() method). As a general rule, whenever you can do what you need to without accessing runtime info, then you should.

Here are the bean definitions for using the MethodLogger:

```xml
Copy
<?xml version="1.0" encoding="UTF-8"?>
<beans
  xmlns="http://www.springframework.org/schema/beans"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:aop="http://www.springframework.org/schema/aop"
  xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd
    http://www.springframework.org/schema/aop
    http://www.springframework.org/schema/aop/spring-aop.xsd">

  <aop:config>
    <aop:pointcut id="servicePointcut" expression="execution(* example..*Service+.*(..))"/>
    <aop:aspect id="loggingAspect" ref="methodLogger">
      <aop:before
        method="logMethodEntry"
        pointcut-ref="servicePointcut"/>
      <aop:after-returning
        method="logMethodExit"
        returning="result"
        pointcut-ref="servicePointcut"/>
    </aop:aspect>
  </aop:config>

  <bean id="methodLogger" class="example.MethodLogger"/>

  <bean id="concatService" class="example.ConcatServiceImpl"/>

</beans>
```

Again, you see the aspects and advice. This time the ìpointcutî is defined separately and reused for both advice types. Perhaps the most interesting thing here is that there is no explicit binding for method parameters and no need to configure anything to recognize the JoinPoint or StaticPart parameters. In fact, you can always specify one of these as the first parameter of a method in order to have access to more information about the context of the methodís execution.

To run this example, I will use the same main() but this time passing the path of the new bean definition file into the ClassPathXmlApplicationContext constructor. Here is the result:

```
Copypublic abstract java.lang.String example.ConcatService.concat(java.lang.String,java.lang.String) called with: [some, thing]
public abstract java.lang.String example.ConcatService.concat(java.lang.String,java.lang.String) returning: [something]
```

Thatís about it for this *simple* example. The main point to take away is that *POJO* services can be decorated with additional behavior by *POJO aspects*. In fact, in some cases the only thing making them aspects is the configuration. In other cases, when you need more runtime info, then the JoinPoint and StaticPart can be quite useful.

If you are interested in more complete coverage of this topic, visit [this blog](http://www.aspectprogrammer.org/blogs/adrian/2006/01/typed_advice_in.html) by Adrian Colyer.

NOTE: In that post, you will see examples with <aop:advice> elements. In Spring 2.0 M3, those elements have been replaced with the more specific ones as used in this entry - such as: <aop:before>.