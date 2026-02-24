---
title: Message Driven POJOs!
source: https://spring.io/blog/2006/08/11/message-driven-pojos
scraped: 2026-02-24T09:35:44.473Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Fisher |  August 11, 2006 | 0 Comments
---

# Message Driven POJOs!

_Engineering | Mark Fisher |  August 11, 2006 | 0 Comments_

Of all the new Spring 2.0 features and improvements, I must admit that Message-Driven POJOs are one of my personal favorites. I have a feeling that a lot of other Spring users will feel the same way.

Here I am providing a quick introduction. There is a lot more to show, and I will follow this up with other posts. For now though - this should provide you with enough information to get up and running with some truly POJO-based asynchronous JMS! I hope you are as excited about that as I am ;)

### Prerequisites:

You will need the following JAR files on your classpath. I've also listed the versions that I am using (any spring-2.x version should be fine. I just dropped RC3 in there about 2 minutes ago in fact):

-   activemq-core-3.2.2.jar
-   concurrent-1.3.4.jar
-   geronimo-spec-j2ee-managment-1.0-rc4.jar
-   commmons-logging-1.0.4.jar
-   log4j-1.2.9.jar
-   jms-1.1.jar
-   spring-2.0-rc3.jar

### Setup the Environment

First, we need to setup the environment. I am going to be using ActiveMQ, but the impact of changing a provider will be limited to modifications within this one file. I'm calling this file "shared-context.xml" since as you will see shortly, I am going to be importing these bean definitions for both sides of the JMS communication. Here are the "shared" bean definitions: the connection factory and two queues (one for the requests and one for replies):

```xml
Copy
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans 
                           http://www.springframework.org/schema/beans/spring-beans.xsd">
	
    <bean id="requestQueue" class="org.activemq.message.ActiveMQQueue">
        <constructor-arg value="requestQueue"/>
    </bean>
 
    <bean id="replyQueue" class="org.activemq.message.ActiveMQQueue">
        <constructor-arg value="replyQueue"/>
    </bean>
 
    <bean id="connectionFactory" class="org.activemq.ActiveMQConnectionFactory">
        <property name="brokerURL" value="tcp://localhost:61616"/>
    </bean>
 
</beans>
```

As you see, I will be running ActiveMQ on tcp (I'm just running 'activemq' from the bin directory of the distribution). It is also possible to run embedded (with "vm://localhost" instead) - or you can run the main method of the org.activemq.broker.impl.Main class. If you want to grab the distribution, visit: [http://www.activemq.org](http://www.activemq.org).

### The Example Domain

I'm keeping things intentionally simple here - the main goal is to demonstrate how the pieces fit together. One of the most important things I want to point out though is that these classes in my "domain" are POJOs. You will see no Spring or JMS dependencies at all.

Ultimately, we will accept input from the user (a "name" via stdin) and this will be transformed into a "registration request" for some unspecified event. The message will be sent asynchronously, but we will have another queue to handle replies. The ReplyNotifier will then write the confirmation (or a "not confirmed" message) to stdout.

I'm creating all of these classes in a "blog.mdp" package by the way. The first class is the *RegistrationRequest*:

```java
Copy
package blog.mdp;

import java.io.Serializable;

public class RegistrationRequest implements Serializable {

    private static final long serialVersionUID = -6097635701783502292L;

    private String name;
	
    public RegistrationRequest(String name) {
        this.name = name;
    }
	
    public String getName() {
        return name;
    }
}
```

Next is the *RegistrationReply*:

```java
Copy
package blog.mdp;

import java.io.Serializable;

public class RegistrationReply implements Serializable {

    private static final long serialVersionUID = -2119692510721245260L;

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

And the *RegistrationService*:

```java
Copy
package blog.mdp;

import java.util.HashMap;
import java.util.Map;

public class RegistrationService {
	
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

As you can see, this is merely providing an example. In reality, something would probably be done with the registrations map. Also, you see that 20% of registration attempts will be denied (given a -1 confirmationId) - not a very practical way to process registration requests, but it will provide some variety to the reply messages. Again, the important thing is that this service class has NO ties to Spring or JMS. Nevertheless, as you will see in just a moment, it is going to be handling the payload of messages sent via JMS. In other words, this RegistrationService *IS* the **Message-Driven POJO**.

Finally, create a simple class to log the reply messages:

```java
Copy
package blog.mdp;

public class ReplyNotifier {

    public void notify(RegistrationReply reply) {
        System.out.println(reply);
    }
}
```

### Configure the Message-Driven POJO

Now for the most important part. How do we use Spring to configure the POJO service so that it will receive JMS Messages? The answer comes in the form of 2 bean definitions (well, 3 if you count the service itself). In this next bean definition file, notice the "container" which actually receives the message and enables the use of an asynchronous *listener*. The container needs to be aware of the *connectionFactory* and the *destination* from which it receives messages. There are multiple types of containers available, but that is beyond the scope of this blog. Read the reference document for more information: [Message Listener Containers](http://static.springframework.org/spring/docs/2.0-rc2/reference/jms.html#d0e22774).

The "listener" in this case is an instance of Spring's *MessageListenerAdapter*. It has a reference to the *delegate* (the POJO service) and the name of the handler method. In this case, we've also provided a *defaultResponseDestination*. For a void-returning method, you would obviously not need to do this. Also (and probably more likely in a production application), you can leave this out in favor of setting the "reply-to" property of the incoming JMS Message instead.

Now that we've discussed the various players, here are the bean definitions (I've named this file "server-context.xml"):

```xml
Copy
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans 
                           http://www.springframework.org/schema/beans/spring-beans.xsd">
	
    <import resource="shared-context.xml"/>
	
    <bean id="registrationService" class="blog.mdp.RegistrationService"/>
	
    <bean id="listener" class="org.springframework.jms.listener.adapter.MessageListenerAdapter">
        <property name="delegate" ref="registrationService"/>
        <property name="defaultListenerMethod" value="processRequest"/>
        <property name="defaultResponseDestination" ref="replyQueue"/>
    </bean>
	
    <bean id="container" class="org.springframework.jms.listener.SimpleMessageListenerContainer">
        <property name="connectionFactory" ref="connectionFactory"/>
        <property name="messageListener" ref="listener"/>
        <property name="destination" ref="requestQueue"/>
    </bean>
	
</beans>
```

The last step here is to provide a bootstrap mechanism for running the service since this is a simple standalone example. I've just created a trivial main method to startup an ApplicationContext with the relevant bean definitions and then block:

```java
Copy
package blog.mdp;

import java.io.IOException;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class RegistrationServiceRunner {
	
    public static void main(String[] args) throws IOException {
        new ClassPathXmlApplicationContext("/blog/mdp/server-context.xml");
        System.in.read();
    }
}
```

### Configure the Client

On the "client" side, we will send the registration requests and log the replies. First, I will list the bean definitions. After the previous section, you should understand the role of the "container" and "listener". In this case, the *delegate* is the *ReplyNotifier* and since it has a void return type, it does not itself send replies (therefore, no 'defaultResponseDestination' property is present). I've named this file "client-context.xml":

```xml
Copy
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans 
                           http://www.springframework.org/schema/beans/spring-beans.xsd">
	
    <import resource="shared-context.xml"/>
	
    <bean id="replyNotifier" class="blog.mdp.ReplyNotifier"/>
	
    <bean id="listener" class="org.springframework.jms.listener.adapter.MessageListenerAdapter">
        <property name="delegate" ref="replyNotifier"/>
        <property name="defaultListenerMethod" value="notify"/>
    </bean>
	
    <bean id="container" class="org.springframework.jms.listener.SimpleMessageListenerContainer">
        <property name="connectionFactory" ref="connectionFactory"/>
        <property name="messageListener" ref="listener"/>
        <property name="destination" ref="replyQueue"/>
    </bean>
	
    <bean id="jmsTemplate" class="org.springframework.jms.core.JmsTemplate">
        <property name="connectionFactory" ref="connectionFactory"/>
        <property name="defaultDestination" ref="requestQueue"/>
    </bean>
	
</beans>
```

There is another bean defined there - an instance of Spring's "jmsTemplate". We will use that to send the registration request messages to its *defaultDestination*. With the simple *convertAndSend(..)* methods that Spring provides, the sending of JMS messages is trivial. I've created a class that takes user input and then sends the message by using this "jmsTemplate":

```java
Copy
package blog.mdp;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.jms.core.JmsTemplate;

public class RegistrationConsole {
	
    public static void main(String[] args) throws IOException {
        ApplicationContext context = new ClassPathXmlApplicationContext("/blog/mdp/client-context.xml");
        JmsTemplate jmsTemplate = (JmsTemplate) context.getBean("jmsTemplate");
		
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));		
		
        for (;;) {
            System.out.print("To Register, Enter Name: ");
            String name = reader.readLine();
            RegistrationRequest request = new RegistrationRequest(name);
            jmsTemplate.convertAndSend(request);
        }
    }
}
```

### Running the Example

Now for the fun part. Startup the ActiveMQ broker (as briefly discussed in the "Setup the Environment" section). Run the main(..) method of the *RegistrationServiceRunner*. Run the main(..) method of the *RegistrationConsole*. Enter a name, and you should see a reply in that same console.

### Further Resources

Hopefully, that's enough to give you an idea of what Spring's new Message-Driven POJO support is about. However, as I mentioned, there is quite a bit more involved - different container types, transaction support, configuration of consumer threading, pluggable message conversion strategies, etc. Stay tuned to the [Interface21 Team Blog](http://blog.interface21.com/main/) for more examples and information about those features. In the meantime, you can check out the [Spring Reference Documentation on JMS](http://static.springframework.org/spring/docs/2.0-rc2/reference/jms.html). Also, be sure to visit the ["Remoting and JMS" section of the Spring Support Forums](http://forum.springframework.org/forumdisplay.php?f=30) as you begin to explore this exciting new functionality.