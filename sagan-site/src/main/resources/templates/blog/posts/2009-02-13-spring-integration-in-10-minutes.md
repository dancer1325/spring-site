---
title: Spring Integration in 10 minutes
source: https://spring.io/blog/2009/02/13/spring-integration-in-10-minutes
scraped: 2026-02-24T09:11:20.535Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Fisher |  February 13, 2009 | 1 Comment
---

# Spring Integration in 10 minutes

_Engineering | Mark Fisher |  February 13, 2009 | 1 Comment_

The Spring Integration 1.0 GA release was [announced](http://www.springsource.org/node/843) 2 months ago at SpringOne Americas, and ever since I've been meaning to write a new, up-to-date "getting started" blog post. Well, the beginning of the year is always a busy time, so my goal is to provide a hands-on example with 10 steps. Each step should take roughly one minute... unless you stop to think ;). So, without further ado, here we go!

## Step 1: Download the Spring Integration distribution

You can grab the latest version (1.0.1 at the time I'm writing this) here: [](http://www.springsource.com/download/community?project=Spring%20Integration)[http://www.springsource.com/download/community?project=Spring%20Integration](http://www.springsource.com/download/community?project=Spring%20Integration)

Once the download completes, unzip the file. You will see a 'dist' directory containing the JARs that comprise the Spring Integration project. You will also see a 'lib' directory that contains dependencies.

## Step 2: Create a project

I'll be using Eclipse for the example, but of course you could do this in another IDE. You can also use Maven or Ivy, but the example here is so simple, it's sufficient to just create a directory and add the JARs.

Create a new 'Java Project' (In the 'Package Explorer' view, right-click, then 'New -> Java Project'), and create a 'lib' directory within that. Then, copy the following JARs from the Spring Integration 'dist' and 'lib' directory into the project's 'lib'. **from dist:**

-   org.springframework.integration-1.0.1.RELEASE.jar
-   org.springframework.integration-file-1.0.1.RELEASE.jar

**from lib:**

-   com.springsource.org.aopalliance-1.0.0.jar
-   com.springsource.org.apache.commons.logging-1.1.1.jar
-   org.springframework.aop-2.5.6.A.jar
-   org.springframework.beans-2.5.6.A.jar
-   org.springframework.context-2.5.6.A.jar
-   org.springframework.core-2.5.6.A.jar
-   org.springframework.transaction-2.5.6.A.jar

Refresh the 'lib' directory in Eclipse (hit F5) and add those JARs to the build-path (select the JARs, right-click, and choose "Build Path -> Add to Build Path"). Finally, create a 'blog' package in the 'src' directory.

## Step 3: Begin the Spring configuration

If you're using [Spring IDE](http://springide.org/blog/) or the [SpringSource Tool Suite](http://www.springsource.com/products/suite/sts), you can add Spring project nature and just right-click the 'blog' package to create a new bean definition file. Otherwise, just create the following and name it 'config.xml':

```xml
Copy
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:si="http://www.springframework.org/schema/integration"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
           http://www.springframework.org/schema/beans/spring-beans.xsd
           http://www.springframework.org/schema/integration
           http://www.springframework.org/schema/integration/spring-integration-1.0.xsd">

</beans>
```

We will add a single element for now. This defines a Message Channel that is backed by a Java in-memory queue and will hold up to 10 Messages at a time:

```xml
Copy
<si:channel id="channel">
    <si:queue capacity="10"/>
</si:channel>
```

## Step 4: Define a Bootstrap Java class

Spring Integration components are simply embedded within any Spring ApplicationContext. Therefore, all we need to do is create one based on this configuration file. If running within a web-app, you could bootstrap with Spring's ContextLoaderListener, or if you run within [dm Server](http://www.springsource.com/products/suite/dmserver), it will also handle this for you. For this simple example, we'll just create a *main()* method in a class called Bootstrap (in the 'blog' package):

```java
Copy
public class Bootstrap {

    public static void main(String[] args) {
        new ClassPathXmlApplicationContext("blog/config.xml");
    }

}
```

(At any point, to quickly resolve imports in Eclipse you can "organize imports" with Ctrl+Shift+O... or Command+Shift+O on a Mac).

## Step 5: Send and receive a Spring Integration Message

Now, we can access the channel from the context and send a Message. Because we don't have any subscribers yet (coming in the next couple steps), we will also receive from the same channel. This will prove that everything is configured properly. Modify the *main()* method so it looks like this:

```java
Copy
public static void main(String[] args) {
    ApplicationContext context = new ClassPathXmlApplicationContext("blog/config.xml");
    PollableChannel channel = (PollableChannel) context.getBean("channel");
    channel.send(new StringMessage("Spring Integration rocks"));
    Message<?> reply = channel.receive();
    System.out.println("received: " + reply);
}
```

When you run that, you should see the result of the Message's *toString()* method printed to the console.

## Step 6: Create a Service

Spring Integration aims to be non-invasive. That means we will now gradually modify the sample so that you have **no** code directly tied to the framework. The first thing we'll do, however, is add a POJO Service that will become a subscriber for our messages. This example is going to simply convert the String to uppercase and add some exclamation points:

```java
Copy
public class Shouter {

    public String shout(String s) {
        return s.toUpperCase().concat("!!!");
    }

}
```

## Step 7: Add the Service to the Spring configuration

The Service can be added as just a regular bean:

```xml
Copy
<bean id="shouter" class="blog.Shouter"/>
```

Next, we'll add a "Service Activator" to connect the Service bean to input and output channels. We need to rename the existing "channel" to "output", and then add a simple non-buffering channel for input. The entire configuration should look like this:

```xml
Copy
<si:channel id="input"/>

<si:channel id="output">
    <si:queue capacity="10"/>
</si:channel>

<si:service-activator input-channel="input"
                      output-channel="output"
                      ref="shouter"
                      method="shout"/>

<bean id="shouter" class="blog.Shouter"/>
```

## Step 8: Invoke the Service by sending a Message

Modify the *main()* method to send a Message to the input channel and to receive from the output channel. Notice that we're also modifying the dependency lookups and that the channels are cast to different types (the 'input' channel is non-buffering, hence it is not a *PollableChannel* like the output is):

```java
Copy
public static void main(String[] args) {
    ApplicationContext context = new ClassPathXmlApplicationContext("blog/config.xml");
    MessageChannel input = (MessageChannel) context.getBean("input");
    PollableChannel output = (PollableChannel) context.getBean("output");
    input.send(new StringMessage("Spring Integration rocks"));
    Message<?> reply = output.receive();
    System.out.println("received: " + reply);
}
```

## Step 9: Send the output to a File

Rather than polling for output in the *main()* method, we can send the result directly to a File by adding a Channel Adapter. First, you can remove the queue sub-element from the output channel, since polling will not be necessary:

```xml
Copy
<si:channel id="output"/>
```

Add the Channel Adapter. You can specify any existing directory, and on Windows you should include the drive letter (e.g. "C:/tmp"):

```xml
Copy
<file:outbound-channel-adapter channel="output" directory="/tmp"/>
```

Next, you can update the Bootstrap's *main()* method to only send:

```java
Copy
public static void main(String[] args) {
    ApplicationContext context = new ClassPathXmlApplicationContext("blog/config.xml");
    MessageChannel input = (MessageChannel) context.getBean("input");
    input.send(new StringMessage("Spring Integration rocks"));
}
```

You also need to add the 'file' namespace to the XSD configuration. The top-level 'beans' element should look like this:

```xml
Copy
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:si="http://www.springframework.org/schema/integration"
       xmlns:file="http://www.springframework.org/schema/integration/file"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans.xsd
            http://www.springframework.org/schema/integration
            http://www.springframework.org/schema/integration/spring-integration-1.0.xsd
            http://www.springframework.org/schema/integration/file
            http://www.springframework.org/schema/integration/file/spring-integration-file-1.0.xsd">
```

Run the example, and you should see the output in a file with a ".msg" extension (you can add a filename-generator strategy, but that is beyond the scope of this post).

## Step 10: Create a Gateway interface

The final step will achieve the goal of complete non-invasiveness. Rather than sending the Message to a Message Channel, it would be much cleaner to send a String as a parameter to a simple interface. Create the following interface within the 'blog' package:

```java
Copy
public interface Gateway {

    void send(String s);

}
```

Then, add the following element to your configuration:

```xml
Copy
<si:gateway id="gateway" service-interface="blog.Gateway" default-request-channel="input"/>
```

Finally, use the Gateway in the main method instead of the channel. Now, you can simply pass a String:

```java
Copy
public static void main(String[] args) {
    ApplicationContext context = new ClassPathXmlApplicationContext("blog/config.xml");
    Gateway gateway = (Gateway) context.getBean("gateway");
    gateway.send("Spring Integration rocks");
}
```

## Conclusion

Hopefully that provides a decent introduction to Spring Integration. The main point to take away is that you can easily create a dedicated integration layer that uses the non-invasive Spring programming model. The real value is apparent when you start adding multiple endpoints. Then, you may need to add filters, transformers, and routers.

Spring Integration provides much more than what this sample demonstrates. To learn more, check out the various projects within the 'org.springframework.integration.samples' module (sources are available in the 'src' directory of the distribution) and read through the [Reference Documentation](http://static.springframework.org/spring-integration/reference/htmlsingle/spring-integration-reference.html). Of course, you can find much more information on the Spring Integration [Home Page](http://www.springsource.org/spring-integration).