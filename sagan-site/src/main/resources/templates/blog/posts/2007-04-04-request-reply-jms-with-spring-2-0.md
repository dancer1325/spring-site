---
title: Request-Reply JMS with Spring 2.0
source: https://spring.io/blog/2007/04/04/request-reply-jms-with-spring-2-0
scraped: 2026-02-24T09:30:59.575Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Fisher |  April 04, 2007 | 0 Comments
---

# Request-Reply JMS with Spring 2.0

_Engineering | Mark Fisher |  April 04, 2007 | 0 Comments_

Several months ago, I posted a blog entry introducing Spring 2.0's support for [Message Driven POJOs](http://blog.interface21.com/main/2006/08/11/message-driven-pojos/). While many people are now familiar with that feature, Spring 2.0's **JMS remoting** features have received less attention. Essentially, this remoting functionality provides a JMS-based version of Spring's general approach to remoting as exhibited in its support for RMI, Hessian/Burlap, and its own HttpInvoker.

For those unfamiliar with [Spring remoting](http://static.springframework.org/spring/docs/2.0.x/reference/remoting.html), the general idea is to configure a non-invasive *exporter* on the server-side and a *proxy generator* (a Spring FactoryBean) on the client-side.

I will demonstrate this JMS remoting here with a code example - based on the same example as in my [previous post](http://blog.interface21.com/main/2006/08/11/message-driven-pojos/).

First, there is the service itself. This time I am providing an interface (useful for the proxy generation and a good practice in general):

```java
Copy
public interface RegistrationService {
   RegistrationReply processRequest(RegistrationRequest request);
}
```

...and the simple implementation class is the same as in the previous post:

```java
Copy
public class RegistrationServiceImpl implements RegistrationService {
    
    private Map registrations = new HashMap();
    private int counter = 100;
   
    public RegistrationReply processRequest(RegistrationRequest request) {
        int id = counter++;
        if (id % 5 == 0) {
            id = -1;
        }
        else {
            registrations.put(new Integer(id), request);
        }
        return new RegistrationReply(request.getName(), id);
    }
}
```

The RegistrationRequest and RegistrationReply objects are also the same as in the previous post:

```java
Copy
public class RegistrationRequest implements Serializable {
       
    private String name;
       
    public RegistrationRequest(String name) {
        this.name = name;
    }
       
    public String getName() {
        return name;
    }
}
```

```java
Copy
public class RegistrationReply implements Serializable {

    private String name;
    private int confirmationId;
       
    public RegistrationReply(String name, int confirmationId) {
        this.name = name;
        this.confirmationId = confirmationId;
    }
       
    public String toString() {
        return (confirmationId >= 0)
                ? name + ": Confirmed #" + confirmationId
                : name + ": Not Confirmed";
    }
}
```

This time the 'shared-context.xml' file will be a bit simpler, because I am not defining a reply queue. Instead, the Spring-generated proxy will be leveraging a standard JMS QueueRequestor that relies upon temporary queues for handing the replies:

```xml
Copy
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans-2.0.xsd">
       
    <bean id="requestQueue" class="org.apache.activemq.command.ActiveMQQueue">
        <constructor-arg value="requestQueue"/>
    </bean>
 
    <bean id="connectionFactory" class="org.apache.activemq.ActiveMQConnectionFactory">
        <property name="brokerURL" value="tcp://localhost:61616"/>
    </bean>
 
</beans>
```

(as you may notice, I am also using ActiveMQ version 4.1.0 this time)

Now for the most interesting changes. On the server-side, I need an *exporter*. Specifically, I need to configure an instance of Spring's **JmsInvokerServiceExporter**. This will actually replace the message listener from the previous post's example. Notice that it requires two properties - the fully-qualified name of the 'serviceInterface' and the 'service' itself (a bean reference to the POJO service to be exported):

```xml
Copy
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
           http://www.springframework.org/schema/beans/spring-beans-2.0.xsd">

    <import resource="shared-context.xml"/>
       
    <bean id="registrationService" class="blog.jms.remoting.RegistrationServiceImpl"/>
    
    <bean id="listener" class="org.springframework.jms.remoting.JmsInvokerServiceExporter">
    	<property name="service" ref="registrationService"/>
    	<property name="serviceInterface" value="blog.jms.remoting.RegistrationService"/>
    </bean>
       
    <bean id="container" class="org.springframework.jms.listener.SimpleMessageListenerContainer">
        <property name="connectionFactory" ref="connectionFactory"/>
        <property name="messageListener" ref="listener"/>
        <property name="destination" ref="requestQueue"/>
    </bean>
       
</beans>
```

On the client side, the corresponding **JmsInvokerProxyFactoryBean** is quite simple. Also, notice that there is no longer a need for a jmsTemplate for sending messages as in the previous example. It only needs a reference to the 'connectionFactory', the 'queue', and of course the 'serviceInterface' that the proxy needs to implement:

```xml
Copy
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
           http://www.springframework.org/schema/beans/spring-beans-2.0.xsd">

    <import resource="shared-context.xml"/>
	
    <bean id="registrationService" class="org.springframework.jms.remoting.JmsInvokerProxyFactoryBean">
        <property name="connectionFactory" ref="connectionFactory"/>
        <property name="queue" ref="requestQueue"/>
        <property name="serviceInterface" value="blog.jms.remoting.RegistrationService"/>
    </bean>

</beans>
```

The RegistrationServiceRunner is still necessary to bootstrap the service for this standalone example:

```java
Copy
public class RegistrationServiceRunner {
       
    public static void main(String[] args) throws IOException {
        new ClassPathXmlApplicationContext("/blog/jms/remoting/server-context.xml");
        System.out.println("RegistrationService started");
        System.in.read();
    }
}
```

The client (RegistrationConsole in this case) is slightly different in this example than in the previous Message-Driven POJOs post:

```java
Copy
public class RegistrationConsole {
       
    public static void main(String[] args) throws IOException {
        ApplicationContext context = new ClassPathXmlApplicationContext("/blog/jms/remoting/client-context.xml");
        RegistrationService registrationService = (RegistrationService) context.getBean("registrationService");
               
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));      
               
        for (;;) {
            System.out.print("To Register, Enter Name: ");
            String name = reader.readLine();
            RegistrationRequest request = new RegistrationRequest(name);
            RegistrationReply reply = registrationService.processRequest(request);
            System.out.println(reply);
        }
    }
}
```

Instead of sending an asynchronous message and having its reply handled by another listener, here the client simply invokes the method on the interface. Spring's exporter and proxy fully manage the correlation IDs.

Thanks to the Spring-generated proxy and its role in encapsulating the request/reply mechanism, the client invocation of this JMS-based remote service is completely decoupled from the JMS infrastructure.

As in the previous post, to run the example requires 3 steps: start the ActiveMQ broker, run the RegistrationServiceRunner's main(..) method, and then run the RegistrationConsole's main(..) method.