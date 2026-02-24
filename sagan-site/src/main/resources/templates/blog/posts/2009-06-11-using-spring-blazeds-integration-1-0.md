---
title: Using Spring BlazeDS Integration 1.0
source: https://spring.io/blog/2009/06/11/using-spring-blazeds-integration-1-0
scraped: 2026-02-24T09:06:57.087Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Jeremy Grelle |  June 11, 2009 | 0 Comments
---

# Using Spring BlazeDS Integration 1.0

_Engineering | Jeremy Grelle |  June 11, 2009 | 0 Comments_

Today we announced the public availability of the 1.0 GA release of the newest member of the open source Spring project portfolio, [Spring BlazeDS Integration](http://www.springsource.org/spring-flex). Corresponding with this event, I thought it time to bring my [previous getting started post](http://blog.springsource.com/2008/12/17/using-spring-blazeds-integration-m1/) up to date. To recap:

> This project's purpose is to make it easier to build Spring-powered Rich Internet Applications using Adobe Flex as the front-end client. It aims to achieve this purpose by providing first-class support for using the open source Adobe BlazeDS project and its powerful remoting and messaging facilities in combination with the familiar Spring programming model.

## Taking Spring BlazeDS Integration for a Test Drive

We have really expanded the feature set since that first M1 release to include:

-   full Spring Security integration
-   asynchronous messaging support (with 3 different message destination types)
-   a complete XML configuration namespace
-   annotation-based configuration options for remoting
-   numerous advanced customization hooks

Now included with the [project distribution](http://www.springsource.com/download/community?project=Spring%20BlazeDS%20Integration) is a thorough collection of samples built in collaboration with Adobe that demonstrate use of the various features, known as the Spring BlazeDS Integration Test Drive. These samples are a great way to get up and running with the project, and here I'm going to give you a quick tour of how everything fits together.

If you'd like to follow along in your IDE, go ahead and download the distribution and follow [these instructions](http://static.springframework.org/spring-flex/docs/1.0.x/reference/html/ch06.html) for building the samples with Maven and importing them into Eclipse. The end result is that you'll have quite a few new projects imported into your Eclipse workspace. Most of the projects are for the individual Flex samples (i.e., they contain .mxml and .as source and compile to .swf files). The actual WTP-deployable web application structure is found in the "testdrive" project, and that is where we'll focus first.

The first thing worth taking a look at in the project is /testdrive/src/main/webapp/WEB-INF/web.xml. Here you will see a fairly typical setup for a root web application context configured via the **ContextLoaderListener**, a basic setup of the Spring Security filter chain, and this configuration for the Spring **DispatcherServlet**:

```xml
Copy
<servlet>
    <servlet-name>testdrive</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <load-on-startup>1</load-on-startup>
</servlet>

<servlet-mapping>
    <servlet-name>testdrive</servlet-name>
    <url-pattern>/messagebroker/*</url-pattern>
</servlet-mapping>
```

This takes the place of the **MessageBrokerServlet** configuration that you would find in a typical standalone BlazeDS application. The mapping of the **/messagebroker/\*** path corresponds to the typical setup of the BlazeDS AMF communication channels that you will find in /testdrive/src/main/webapp/WEB-INF/flex/services-config.xml, such as this one:

```xml
Copy
<channel-definition id="my-amf" class="mx.messaging.channels.AMFChannel">
    <endpoint url="http://{server.name}:{server.port}/{context.root}/messagebroker/amf"
        class="flex.messaging.endpoints.AMFEndpoint"/>
</channel-definition>
```

This is the main configuration file for BlazeDS. While examining this file in the sample, note that there is no reference in the "services" section to either a remoting-config.xml nor messaging-config.xml. One of the benefits of Spring BlazeDS Integration is that the settings that previously would have been defined in those BlazeDS-specific files can now be defined completely through the provided Spring XML configuration namespace and Java annotations. This allows for a lot less mental context switching, plus if you are using the [free SpringSource Tool Suite](http://www.springsource.com/products/sts) you get full code-completion support when editing the Spring configuration files.

Now let's take a look at some aspects of the Spring application context for the sample.  
![The web application context configuration files.](http://blog.springsource.com/wp-content/uploads/2009/06/applicationcontext.jpg "WebApplicationContext") The application is set up with a root web application context that is assembled from the **\*-context.xml** files found in /testdrive/src/main/webapp/WEB-INF/spring, as well as a child application context that is local to the aforementioned **DispatcherServlet** and assembled from /testdrive/src/main/webapp/WEB-INF/testdrive-servlet.xml (whose name and location is determined by convention). We have separated all of the Flex-specific configuration into this child context.

Let's examine testdrive-servlet.xml in further detail. The file starts with the necessary XML prologue to set up the standard Spring "beans" configuration namespace as well as the new "flex" namespace. Then the first thing you'll see is the basic setup for the BlazeDS MessageBroker:

```xml
Copy
<flex:message-broker>
    <flex:message-service
        default-channels="my-streaming-amf,my-longpolling-amf,my-polling-amf" />
    <flex:secured />
</flex:message-broker>
```

The **message-broker** tag is what triggers the boot-strapping of the **MessageBroker** as a Spring-managed bean and automatically sets up all of the necessary Spring MVC infrastructure including a **HandlerMapping** and **HandlerAdapter**. You can further customize things through optional attributes and tags such as the location of services-config.xml, the specific paths that get mapped to the MessageBroker, etc., but in the common case this is all that is needed.

The **message-service** child tag is setting up default communication channels (in order of preference) for the BlazeDS **MessageService**. This tag is entirely optional, but a similar setup is commonly needed as the communication channel requirements for pub/sub messaging tend to differ from those of direct remoting. See this [section of the BlazeDS Documentation](http://livedocs.adobe.com/blazeds/1/blazeds_devguide/lcconfig_4.html#1196763) for some guidelines.

The **secured** tag is all that is needed to enable the integration with the existing Spring Security setup defined in /testdrive/src/main/webapp/WEB-INF/spring/security-context.xml. With this tag present, Authentication requests driven by use of the Flex client-side ChannelSet API will be routed to the Spring Security **AuthenticationManager**. The resulting ActionScript object returned by a successful authentication contains some additional useful information such as an array of the user's granted authorities. (There are several additional security features and configuration options available that are outside the scope of this post, so I will refer you to the [relevant docs](http://static.springframework.org/spring-flex/docs/1.0.x/reference/html/ch04.html) if you'd like more detail.)

Once this basic setup is in place, you can start creating remoting and messaging destinations to connect your Flex client applications to Spring-powered services. If you take a look at /testdrive/src/main/webapp/WEB-INF/spring/services-context.xml, you will see definitions for several data access objects, including this one:

```xml
Copy
<bean id="contactService" class="org.springframework.flex.samples.contact.ContactDAO">
    <constructor-arg ref="dataSource" />
</bean>
```

That basic Spring bean is then exposed for remoting to the Flex client with the following from testdrive-servlet.xml:

```xml
Copy
<flex:remoting-destination ref="contactService" />
```

This exposes the bean as a remote destination named "contactService" (by default the destination name is the same as the exported bean's id). To access this destination from the client, we just need to use the Flex **RemoteObject** class. For example, see the following snippet from /insync01/src/main/flex/insync01.mxml:

```xml
Copy
<mx:RemoteObject id="ro" destination="contactService"/>

<mx:ApplicationControlBar width="100%">
    <mx:TextInput id="searchStr"/>
    <mx:Button label="Search" click="ro.findByName(searchStr.text)"/>
</mx:ApplicationControlBar>

<mx:DataGrid id="dg" dataProvider="{ro.findByName.lastResult}" width="100%" height="100%"/>
```

As you can see, once the **RemoteObject** is connected, you can easily invoke methods on it and bind the results to Flex UI controls such as the **DataGrid**. The Spring-managed **MessageBroker** takes care of the routing of incoming HTTP messages and the serialization between AMF and Java. The POJO-based Spring programming model remains intact on the server side as is evident in the implementation of the "findByName" method in /testdrive/src/main/java/org/springframework/flex/samples/contact/ContactDAO.java:

```java
Copy
public List<Contact> findByName(String name) {
    return this.template.query("SELECT * FROM contact WHERE UPPER(CONCAT(first_name, ' ', last_name)) LIKE ? ORDER BY first_name, last_name", 
        this.rowMapper, "%" + name.toUpperCase() + "%");
}
```

Asynchronous pub/sub style communication is just as simple. Spring BlazeDS Integration provides integrated support for three different messaging adapters:

1.  BlazeDS ActionScriptAdapter for basic AMF messages, including the ability to push those messages to subscribed clients from a simple POJO using the provided [MessageTemplate](http://static.springframework.org/spring-flex/docs/1.0.x/javadoc-api/org/springframework/flex/messaging/MessageTemplate.html)
2.  JmsAdapter for connecting to Spring-managed JMS destinations
3.  IntegrationAdapter for connecting to a Spring Integration MessageChannel

Message destinations that use these adapters are set up using the XML namespace in a similar manner to the remoting destinations. For example, see following definition in testdrive-servlet.xml:

```xml
Copy
<flex:message-destination id="chat" />
```

This sets up a basic AMF destination named "chat". With this destination defined, Flex clients can communicate through it using the **Producer** and **Consumer** APIs. To see how this particular destination is used, take a look at the Flex chat sample source at /chat/src/main/flex/chat.mxml.

Wiring up message destinations that are backed by a JMS destination is similar, using the **jms-message-destination** variation of the tag:

```xml
Copy
<flex:jms-message-destination id="jms-chat" jms-destination="chatTopic" />
```

This version references a Spring-managed JMS topic (defined in this case in /testdrive/src/main/webapp/WEB-INF/spring/infrastructure-context.xml). Looking at the source code for the Flex jms-chat sample at /jmschat/src/main/flex/jmschat.mxml, you'll notice that it is identical to the version using the basic AMF "chat" destination.

Likewise, connecting to a Spring Integration **MessageChannel** is a matter of using the **integration-message-destination** tag. Be sure to check out the "POJO Messaging" sample in the test drive to see how easy it is to bring simple POJO message handlers into the mix.

## Further Explorations

With this quick introduction, we're really just scratching the surface of what you can do with Spring BlazeDS Integration. If you're interested in building a Spring-powered RIA, I encourage you to go through all of the samples in the test drive to learn more. While you're at it, check out these [additional](http://www.springbyexample.org/examples/simple-flex-webapp.html) [samples](http://www.gridshore.nl/2009/05/24/integrate-flex-security-in-mate-using-the-spring-blazeds-integration-project/) built by some of our active community members, and take a look at the community-driven [Spring ActionScript](http://www.springsource.org/extensions/se-springactionscript-as) project to bring the value of DI to the Flex client.

As always, if you've got ideas for how we can further add value or any other feedback to share, we invite you to get involved through the [forum](http://forum.springframework.org/forumdisplay.php?f=61) and [Jira](http://jira.springframework.org/browse/flex).