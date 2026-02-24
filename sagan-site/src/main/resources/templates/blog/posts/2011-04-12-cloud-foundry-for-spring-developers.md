---
title: Cloud Foundry for Spring Developers
source: https://spring.io/blog/2011/04/12/cloud-foundry-for-spring-developers
scraped: 2026-02-24T08:43:12.030Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Fisher |  April 12, 2011 | 1 Comment
---

# Cloud Foundry for Spring Developers

_Engineering | Mark Fisher |  April 12, 2011 | 1 Comment_

By now, many of you have probably seen the Cloud Foundry [webinar](http://live-webcast.com/events/vmware/publicevent/webcast-flv-od.htm) and Rod's [blog](http://blog.springsource.com/2011/04/12/launching-cloud-foundry/) from earlier today. I'd like to provide a quick follow-up that features a "hello-spring" sample application deployed in the cloud. Thanks to Cloud Foundry, there's practically no learning curve at all.

Before we get started, let's consider three goals that have driven Spring from day one:

1.  focus on simplicity and productivity to make developers lives easier
2.  support innovative technologies in a consistent way
3.  ensure portability of applications across deployment environments

Then, consider those same three goals in relation to Cloud Foundry:

1.  *Simplicity and Productivity*: Deploying a Spring application to the cloud is as simple as dragging and dropping within SpringSource Tool Suite, and even when building an application to run in the cloud, developers can take advantage of the productivity gains enabled by Roo and Grails exactly as they normally would.
2.  *Consistent Innovation*: Projects like Spring Social and Spring Data embrace innovative technologies such as Twitter and non-relational data stores that are increasingly popular for cloud-based applications, and they do so in ways that are consistent with the existing Spring platform. Cloud Foundry provides services to support such applications. RabbitMQ will be available as a cloud service soon, so the same applies to applications that rely on RabbitMQ for messaging via Spring AMQP and Spring Integration.
3.  *Portability*: The cloud is first and foremost a new deployment environment, and yet it's easy to create an application that can run in and out of the cloud without even swapping configuration files.

With those goals in mind, we've designed a sample application that provides an introduction to Cloud Foundry for Spring developers. This is the first of many sample applications that will be featured on this blog over the following days and weeks. It demonstrates how a single configuration can support both local testing and cloud deployment. It also demonstrates services available in Cloud Foundry: MySQL, Redis, and MongoDB. Let's quickly walk through the actual deployment and then work backwards to the configuration.

With a Cloud Foundry account, you can deploy (or “push”) applications to the cloud. Those applications can use services by binding to them. When you use the vmc command line tool or the STS plugin, you can either bind to an existing service or create a new one. Let's look at how to do this with the command line tool, vmc. Here's the output of the 'vmc push' command:

`   Would you like to deploy from the current directory? [Yn]: y Application Deployed URL: 'hello-spring.cloudfoundry.com'?  Detected a Java SpringSource Spring Application, is this correct? [Yn]: y Memory Reservation [Default:512M](64M, 128M, 256M, 512M, 1G or 2G) 256 Creating Application: OK  Would you like to bind any services to 'hello-spring'? [yN]: y  Would you like to use an existing provisioned service [yN]? n  The following system services are available::  1. redis  2. mongodb  3. mysql  Please select one you wish to provision: 3  Specify the name of the service [mysql-63854]: hello-db Creating Service: OK  Binding Service: OK  Uploading Application:    Checking for available resources: OK    Processing resources: OK    Packing application: OK    Uploading (42K): OK    Push Status: OK    `

The vmc output shows the individual steps, but the same task can be accomplished by dragging and dropping to a Cloud Foundry Server instance within SpringSource Tool Suite as shown here:

[![Cloud Foundry Server in STS](http://blog.springsource.com/wp-content/uploads/2011/04/sts-cloudfoundry.png "sts-cloudfoundry")](http://blog.springsource.com/wp-content/uploads/2011/04/sts-cloudfoundry.png)

Now that we've seen the deployment, let's take a look at the configuration. It's surprisingly simple, since you don't even need to configure explicit credentials and connection strings. Instead, you can retrieve a reference to this DataSource from the cloud itself using the CloudFoundry “cloud” namespace. Let's look at how we might configure a bean, DataSourceCustomerService, to reference the CloudFoundry provisioned database service:

```xml
Copy
<cloud:data-source id="db"/>

<bean class="example.AccountRepository">
    <property name="dataSource" ref="db"/>
</bean>
```

The first element will create a bean of type java.sql.DataSource, and the second will be injected with its that reference to satisfy its dependency. That's pretty much all you need to know in order to deploy a new application into the cloud and provision services. However, we also want to test the application locally. Thankfully, the forthcoming Spring 3.1 release offers some assistance here via Spring profiles. The “profiles” feature in Spring 3.1 – explained very clearly in this [recent blog](http://blog.springsource.com/2011/02/14/spring-3-1-m1-introducing-profile/) by Chris Beams - enables you to "switch on" certain beans at runtime.

This can be quite useful when you want to associate beans with particular environments. Similar functionality is possible using Spring's property placeholder resolution mechanism to vary the definition of objects based on external properties. But this is different: suppose for example that you want to use the <cloud:data-source/> element in the cloud, a regular DriverManagerDataSource defined as a <bean> on localhost and a DataSource retrieved through JNDI in integration testing via <jee:jndi-lookup/>. Spring profiles makes it easy to associate each of these beans with a profile, so that – while all three are defined in the configuration – only one is active at any time based on the environment.

Spring provides a few pre-packaged strategies for enabling profiles. One is to use command line system properties. However, if you need to dynamically set the active profiles based on information that is known only at runtime, then consider using an ApplicationContextInitializer implementation, as described in this [other post](http://blog.springsource.com/2011/02/15/spring-3-1-m1-unified-property-management/) by Chris Beams.

Let's look at the hello-spring application's configuration and how it takes profiles into account:

```xml
Copy
<beans>
    <beans profile="default">
        <jdbc:embedded-database id="dataSource"/>
    </beans>

    <beans profile="cloud">
        <cloud:data-source id="dataSource"/>
    </beans>
</beans>
```

The nested <beans> elements and their "profile" attributes are the only new Spring 3.1 features in use here. The nested beans element lets us specify that any beans contained therein should be enabled only if the designated profile is active.

With those simple steps, we can now build and test our logic locally and then deploy the exact same application to the cloud without changing anything. The cloud namespace has support for other services, as well. If we add MongoDB and Redis support, the configuration would look like this:

```xml
Copy
<beans profile="default">
    <jdbc:embedded-database id="dataSource"/>
    <bean id="mongo" class="com.mongodb.Mongo"/>
    <bean id="redis" class="org.springframework.data.keyvalue.redis.connection.jedis.JedisConnectionFactory"/>
</beans>

<beans profile="cloud">
    <cloud:data-source id="dataSource"/>
    <cloud:mongo id="mongo"/>
    <cloud:redis-connection-factory id="redis"/>
</beans>
```

The hello-spring example shows all of this and more, and it can be cloned from this [repository](https://github.com/SpringSource/cloudfoundry-samples/tree/master/hello-spring). The most important characteristic of the application is that it can be dropped onto either a local server, such as the tc Server instance available within STS, or to the new Cloud Foundry server.

Here's a screenshot of the hello-spring application deployed locally:

[![Hello Spring deployed locally](http://blog.springsource.com/wp-content/uploads/2011/04/hello-spring-local.png "hello-spring-local")](http://blog.springsource.com/wp-content/uploads/2011/04/hello-spring-local.png)

And here's the exact same application running in the cloud. Notice how the URLs and connection strings are different:

[![Hello Spring deployed in the cloud](http://blog.springsource.com/wp-content/uploads/2011/04/hello-spring-cloud.png "hello-spring-cloud")](http://blog.springsource.com/wp-content/uploads/2011/04/hello-spring-cloud.png)

That's all for now, but watch this space. We have many more sample applications (watch [this repo](https://github.com/SpringSource/cloudfoundry-samples)) and blogs planned in the days and weeks ahead!