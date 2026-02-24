---
title: Source for demos shown at NL-JUG session June 13th 2007
source: https://spring.io/blog/2007/06/14/source-for-demos-shown-at-nl-jug-session-june-13th-2007
scraped: 2026-02-24T09:28:04.127Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Alef Arendsen |  June 14, 2007 | 0 Comments
---

# Source for demos shown at NL-JUG session June 13th 2007

_Engineering | Alef Arendsen |  June 14, 2007 | 0 Comments_

Yesterday, Joris and I gave a session at the Dutch Java Users Group. We did the session twice and had about 250 people in total attending the sessions. A lot of people asked for the code for the demos we did during the sessions. Attached you'll find the code for the AOP and Dependency Injection demos. It shows a simple aspect flushing the Hibernate session before every JDBC operation (not as robust as you'd want it in production code, but it's a start) and it also shows the CarPlant system (demo'd before in other sessions and previously attached to another blog entry) configured using the various to do Dependency Injection in Spring 2.1 (i.e. using <bean>, @Bean and @Autowired).

It's a Maven2 project, so you'll need to have Maven2 installed. To prepare an Eclipse project including all libraries, run mvn eclipse:eclipse at the command line in the carplant directory.

The sources: [carplant.zip](http://blog.interface21.com/main/wp-content/uploads/2007/06/carplant.zip "carplant.zip")

During the session a question came up about multiple <aop:config> blocks inside one application contexts. The guy in the audience wasn't sure if two or more blocks of AOP configuration showed the expected result (advising two or more times). I don't have the guys email address, so I wanted to clarify this here a little bit. Consider the following code. The doIt() will be advised. The actual advice (for simplicity) is kept in the same class, just as the main method bootstrapping the ApplicationContext.

```java
Copy
public class Logger {

  public void doIt() {

  }

  public void log() {
    System.out.println("Log!");
  }

  public static void main(String args[]) {
    ApplicationContext context = 
      new ClassPathXmlApplicationContext(
        new String[] {"com/carplant/context1.xml", "com/carplant/context2.xml"});

    Logger logger = (Logger)context.getBean("logger");

    logger.doIt();
  }
}
```

### Configuration 1: one simple AOP config block

The file context2.xml is empty in this case, whereas context1.xml contains the following code:

```xml
Copy
<bean id="logger" class="Logger"/>

<aop:config>
	<aop:pointcut id="doItOperation" expression="execution(* doIt(..))"/>
	<aop:aspect ref="logger">
		<aop:before pointcut-ref="doItOperation" method="log"/>
	</aop:aspect>
</aop:config>
```

As expected, upon calling the doIt() method we'll only get one line of output from the logger (it's only advised once).

### Configuration 2: two AOP config blocks in two different files

context2.xml now is identical to context1.xml (in the example above) with the only difference that in context2.xml we don't have bean called logger. When running this scenario, we'll see two Log! output entries. The doIt() method is advised twice.

### Configuration 3: two AOP config blocks in the same configuration file

context2.xml is empty again. context1.xml on the other hand now contains two <aop:config> blocks. The only difference between the two is the pointcut identifier (this is an XML ID, so should be unique in the XML file).

```xml
Copy
<bean id="logger" class="Logger"/>

<aop:config>
	<aop:pointcut id="doItOperation" expression="execution(* doIt(..))"/>
	<aop:aspect ref="logger">
		<aop:before pointcut-ref="doItOperation" method="log"/>
	</aop:aspect>
</aop:config>

<aop:config>
	<aop:pointcut id="doItOperation2" expression="execution(* doIt(..))"/>
	<aop:aspect ref="logger">
		<aop:before pointcut-ref="doItOperation2" method="log"/>
	</aop:aspect>
</aop:config>
```

Running this will also show that the bean will be advised twice.

Note that I'm using a 2.1 milestone release here.