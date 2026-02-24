---
title: Using Spring BlazeDS Integration 1.0.0.M1
source: https://spring.io/blog/2008/12/17/using-spring-blazeds-integration-1-0-0-m1
scraped: 2026-02-24T09:11:59.195Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Jeremy Grelle |  December 17, 2008 | 0 Comments
---

# Using Spring BlazeDS Integration 1.0.0.M1

_Engineering | Jeremy Grelle |  December 17, 2008 | 0 Comments_

**Update: Most of the code examples shown below are out-of-date and superseded by those shown in the more current ["Using Spring BlazeDS Integration 1.0"](http://blog.springsource.com/2009/06/10/using-spring-blazeds-integration-10/) post.**

Today we announced the public availability of the first milestone release of the newest member of the open source Spring project portfolio, [Spring BlazeDS Integration](http://www.springsource.org/spring-flex). This project's purpose is to make it easier to build Spring-powered Rich Internet Applications using Adobe Flex as the front-end client. It aims to achieve this purpose by providing first-class support for using the open source Adobe BlazeDS project and its powerful remoting and messaging facilities in combination with the familiar Spring programming model.

This first milestone is very much a foundational release, focusing on support for configuring and bootstrapping the BlazeDS MessageBroker (the central component that handles incoming messages from the Flex client) as a Spring-managed object, routing HTTP messages to it through the Spring DispatcherServlet infrastructure, and easily exporting Spring beans as destinations for direct Flex remoting. Future milestones leading up to the final 1.0 will build upon this foundation to provide deeper features such as Spring Security integration, messaging integration using Spring's JMS support, an AMFView for use in conjunction with Spring 3.0's REST support, and hopefully further things to address the needs of our community that we haven't thought of yet. This milestone is also our first opportunity to invite the community to get involved by [trying out the release](http://www.springsource.com/download/community?project=Spring%20BlazeDS%20Integration) and providing feedback in the [project Jira](http://jira.springframework.org/browse/FLEX) and [new community forum](http://forum.springframework.org/forumdisplay.php?f=61).

## Taking Spring BlazeDS Integration for a Test Drive

The BlazeDS project comes with a number of excellent "test drive" sample applications to help in understanding how to build Flex applications that take advantage of BlazeDS's remoting and messaging capabilities. These samples use the BlazeDS MessageBrokerServlet to route messages through to BlazeDS-managed Java objects that are wired together using the BlazeDS-specific XML configuration. Sounds great, but what about your existing Spring-based infrastructure? Wouldn't it be nice if you could take advantage of the capabilities of the MessageBroker without having to configure a separate servlet and by using the familiar Spring programming model? This is where Spring BlazeDS Integration fits into the picture.

I've created a modified version of the BlazeDS test drive sample app that uses Spring BlazeDS Integration. The full source of the modified sample is [available here](http://jira.springframework.org/secure/attachment/14963/flex-sample.zip). You should be able to import the sample into Eclipse and run it using WTP. Once the app is deployed successfully, you can access the individual test drive samples at [](http://localhost:8080/samples/testdrive.htm)[http://localhost:8080/samples/testdrive.htm](http://localhost:8080/samples/testdrive.htm). (Note that before starting the app, you must start the included HSQL demo database in /sampledb.) Here I'll walk through some of the more interesting pieces of the sample to illustrate what is needed to get started in building Spring-powered Flex applications.

The first thing worth taking a look at in the project is /samples/WEB-INF/web.xml. Here you will see a fairly typical setup for the Spring **DispatcherServlet**:

```xml
Copy
<!-- The front controller of this Spring Web application -->
<servlet>
    <servlet-name>Spring MVC Dispatcher Servlet</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>/WEB-INF/config/web-application-config.xml</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
</servlet>
        
<!-- Map all /spring requests to the DispatcherServlet for handling -->
<servlet-mapping>
    <servlet-name>Spring MVC Dispatcher Servlet</servlet-name>
    <url-pattern>/spring/*</url-pattern>
</servlet-mapping>
```

This takes the place of the MessageBrokerServlet configuration in the standard BlazeDS samples. This particular application is set up with a mapping strategy that would allow serving of both Flex direct remoting content and RESTful content from the same application. If you were building an app that only targeted Flex clients, you could use a simpler mapping strategy as discussed in the reference manual.

The next piece to take a look at is the Spring configuration in /samples/WEB-INF/config/web-application-config.xml. First, notice the **MessageBrokerFactoryBean** definition:

```xml
Copy
<!-- Bootstraps and exposes the BlazeDS MessageBroker -->
<bean id="mySpringManagedMessageBroker"
    class="org.springframework.flex.messaging.MessageBrokerFactoryBean" />
```

This bootstraps the BlazeDS **MessageBroker** as a Spring-managed bean, using a default location of /samples/WEB-INF/flex/services-config.xml for the BlazeDS configuration. The general approach of Spring BlazeDS Integration is to continue to use the standard BlazeDS XML configuration for the parts that are fairly static and more of an infrastructure concern, such as channel definitions, but to allow things that change more frequently during the development of the application, such as remoting destinations, to be configured using the familiar Spring configuration model. As such, exposing a Spring-managed bean for direct remoting from a Flex client is a simple matter of wiring up a remoting exporter bean. Examining the Spring configuration from the sample further, you will see this in action:

```xml
Copy
<!-- Implementation of ProductService using Spring's SimpleJdbcTemplate -->
<bean id="productService" class="flex.samples.product.JdbcProductService" >
    <constructor-arg ref="dataSource"/>
</bean>
    
<!-- Expose the productService bean for BlazeDS remoting -->
<bean id="product" 
    class="org.springframework.flex.messaging.remoting.FlexRemotingServiceExporter">
    <property name="messageBroker" ref="mySpringManagedMessageBroker"/>
    <property name="service" ref="productService"/>
</bean>
```

Here you can see a simple Spring bean **productService** that is being exported as a remoting destination to the Spring-managed **MessageBroker**. By default, the desination's serviceId will be the same as the bean name. This service can be accessed from Flex client code such as in the following MXML example from /samples/WEB-INF/flex-src/testdrive-remoteobject/src/main.mxml:

```xml
Copy
<mx:RemoteObject id="srv" destination="product"/>
	
<mx:DataGrid dataProvider="{srv.getProducts.lastResult}" width="100%" height="100%"/> 

<mx:Button label="Get Data" click="srv.getProducts()"/>
```

The Spring-managed **MessageBroker** handles the details of invoking the **getProducts** method on the **productService** bean and the serialization back and forth between Flex's native AMF data format and Java.

The final piece in this puzzle is the configuration for actually routing the Flex AMF message requests coming into the **DispatcherServlet** through to the **MessageBroker**. This is done with a simple **HandlerMapping** in conjunction with the **MessageBrokerHandlerAdapter** definition in the Spring configuration:

```xml
Copy
<!-- Maps request paths at /messagebroker to the BlazeDS MessageBroker -->
<bean class="org.springframework.web.servlet.handler.SimpleUrlHandlerMapping">
    <property name="mappings">
        <value>
            /messagebroker/*=mySpringManagedMessageBroker
        </value>
    </property>
</bean>

<!-- Dispatches requests mapped to a MessageBroker -->
<bean class="org.springframework.flex.messaging.servlet.MessageBrokerHandlerAdapter"/>
```

The end result of this in conjunction with the mapping of the **DispatcherServlet** is that requests at the path **/spring/messagebroker/\*** will be routed to the Spring-managed **MessageBroker**. Notice that the BlazeDS channel definitions in /WEB-INF/flex/services-config.xml correspond to this mapping, for example:

```xml
Copy
<channel-definition id="my-amf" class="mx.messaging.channels.AMFChannel">
    <endpoint url="http://{server.name}:{server.port}/{context.root}/spring/messagebroker/amf" 
        class="flex.messaging.endpoints.AMFEndpoint"/>
    <properties>
        <polling-enabled>false</polling-enabled>
    </properties>
</channel-definition>
```

Of course, if you prefer, you can set these channels up separately in the Flex client (so that you don't have to compile the Flex source against services-config.xml), perhaps even [using the Spring ActionScript community extension](http://www.herrodius.com/blog/158).

## Community Feedback Wanted

With this foundation in place, we hope to see Spring BlazeDS Integration evolve into the essential component for building Spring-powered RIAs with Flex. This project was started in response to ongoing demand from the Spring community for a first-class solution for reducing the complexity of building applications with Flex with Spring, and it should continue to progress by addressing the needs of the community. The way for us to ensure this is the case is to invite you once again to [try it for yourself](http://www.springsource.com/download/community?project=Spring%20BlazeDS%20Integration) and get involved through the [forum](http://forum.springframework.org/forumdisplay.php?f=61) and [Jira](http://jira.springframework.org/browse/flex). We welcome your feedback and look forward to working together towards a final 1.0 release.