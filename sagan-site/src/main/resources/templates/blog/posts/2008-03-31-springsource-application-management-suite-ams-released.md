---
title: SpringSource Application Management Suite (AMS) Released
source: https://spring.io/blog/2008/03/31/springsource-application-management-suite-ams-released
scraped: 2026-02-24T09:19:31.451Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Jennifer Hickey |  March 31, 2008 | 0 Comments
---

# SpringSource Application Management Suite (AMS) Released

_Engineering | Jennifer Hickey |  March 31, 2008 | 0 Comments_

It has been a busy few months since SpringSource partnered with [Hyperic](http://www.hyperic.com) to bring our Application Management Suite (AMS) product to market. I am pleased to announce that the SpringSource AMS [beta release](http://www.covalent.net/beta/AMS) is now available to all. Please take a moment to [evaluate the software](http://www.covalent.net/beta/AMS) and post your thoughts on the [beta forum](http://www.covalent.net/beta/AMS). We are committed to providing the best application management experience possible for Spring-powered applications, and your feedback is much appreciated!

Those who expressed an interest in SpringSource AMS at [The Spring Experience](http://www.thespringexperience.com) in December received an email announcing the beta release. Here is an excerpt from that email that introduces SpringSource AMS and outlines some of its additional features:

> SpringSource Application Management Suite (AMS) is a comprehensive enterprise application management tool. It is designed to manage and monitor all of your Spring-powered applications, the Spring runtime, and a variety of platforms and application servers. SpringSource AMS is built on Hyperic's HQ Enterprise Edition, a proven systems and applications management solution. Additional features of SpringSource AMS include: - Automatic discovery of Spring-powered applications on deployment - Automatic monitoring of a variety of Spring, third party, and stereotyped components running in your application. SpringSource AMS instruments a variety of components in the Spring Framework. Simply drop the instrumented jar files into your application, and SpringSource AMS will begin monitoring your application and exposing statistics via JMX. No additional configuration steps required! - Automatic monitoring of components of the Spring runtime, including the application contexts and bean factories

In this blog, I'll explain these features in more detail, talk about the technology behind them, and show you how to use SpringSource AMS to monitor your applications.

### Key Features of SpringSource AMS

**Application Auto-Discovery** SpringSource AMS automatically discovers your web and standalone applications on deployment. It evaluates each bean created through an ApplicationContext. If it knows how to manage and monitor that bean, it exports the bean as a managed resource. Additionally, there are some components (such as the DispatcherServlet) that SpringSource AMS discovers even when created outside of an ApplicationContext, by advising the creation using [AspectJ](http://www.eclipse.org/aspectj) aspects. A complete list of managed Spring Framework components can be found in the AMS product documentation.

SpringSource AMS models your applications and the ManagedResources they contain. Each ManagedResource has a fixed set of Attributes, Control Operations, and Metrics. **This results in a simple, consistent inventory model that describes your entire application**. This model is automatically exported to JMX ModelMBeans. These MBeans can then be accessed by any JMX client, including the SpringSource AMS agent, which retrieves data from your Spring-powered applications for display on the SpringSource AMS dashboard.

The SpringSource AMS dashboard currently displays Spring managed resources deployed in Tomcat, WebLogic, and WebSphere servers and standalone applications. Spring managed resource display for JBoss servers is planned for the final 1.0 release of SpringSource AMS. If you are using a different server and deploying a single application to it, it may still be possible to view your services in the dashboard by including the "spring.managed.application.name" System property on server startup, which will result in the discovery of a server called "Spring Application". Please let us know on the [beta forum](http:www.covalent.net/beta/AMS) if you wish to see support for other servers in the future.

**Monitoring** SpringSource AMS does most of its operation monitoring using [AspectJ](http://www.eclipse.org/aspectj) aspects woven at compile-time to advise monitored methods. This adds a very slight overhead to your method execution (in most cases, just what is required to take a quick time stamp before and after the method is executed). The aggregation of metric data across executions of a given method, for metrics like throughput and average execution time, is done asynchronously.

SpringSource AMS is also capable of monitoring some of your stereotyped components - those marked with @Controller, @Repository, @Transactional, @Component, and @Service. Upon discovery of these components, SpringSource AMS wraps them in a Spring AOP proxy (or adds a MethodInterceptor to an existing proxy). This proxy is used to collect the execution time (in milliseconds) of each method of your component. The average execution time of each method is then made available through the inventory model that is exported to JMX.

### Getting Started

**Instrumenting your Spring-Powered Application** SpringSource AMS contains an instrumented version of Spring Framework 2.5.2 for use in your applications (spring-framework-instrumented-management.zip). Components of Spring Framework are instrumented for management using a combination of code hooks and compile-time weaving with the [AspectJ](http://www.eclipse.org/aspectj) compiler.

To instrument your application, simply replace your existing Spring Framework jars with the instrumented versions included in spring-framework-instrumented-management.zip. You also need to add the jars from springsource-ams-instrumentation-agent.zip to your classpath. See "Instrumenting your Application for Management with AMS" in the AMS product documentation for more details.

If you are running in a container that already exposes a JMX MBeanServer and a remote JMX connector, such as WebLogic or WebSphere, that's all you need to do! Tomcat users can quickly configure Tomcat for monitoring as outlined [here](http://tomcat.apache.org/tomcat-6.0-doc/monitoring.html). SpringSource AMS also works with standalone applications, which can be enabled for JMX connection by adding the same System properties suggested in the Tomcat setup, or by using Spring JMX classes such as MBeanServerFactoryBean and ConnectorServerFactoryBean.

If you are running a standalone application, you will need to include a "spring.managed.application.name" System property, so that SpringSource AMS will know the name of your application (example, -Dspring.managed.application.name=PetClinic). **Using the SpringSource AMS Dashboard** Use the SpringSource AMS dashboard to get a complete picture of the health of your applications and the platforms and containers on which they run - for a single node or across a cluster! Simply follow the instructions in the Installation Guide, included in the springsource-ams-installer distribution, to get the AMS server and agent(s) up and running.

The AMS agent auto-discovers your application server or standalone Spring-powered application on startup. You should see the discovered servers in the Auto-Discovery portlet on the dashboard (accessible by logging in to [http://server:7080](http://server:7080)), as pictured below:

![AMS Server Discovery](http://blog.springsource.com/main/wp-content/uploads/2008/03/AMSServerDiscovery.gif)

Select the "Add to Inventory" button to add the server to the inventory. This is a one-time step for each server you are monitoring.

Once the server has been added to the inventory, you can access it by choosing Resources->Browse from the navigation menu. Once you have configured the connection properties for the Tomcat, WebLogic, WebSphere, or Spring Application servers, SpringSource AMS should begin discovering your application services. They will appear in the Resources view under Services, and will also appear in the Monitoring and Inventory tabs of the server, as pictured below:

![AMS Service Inventory](http://blog.springsource.com/main/wp-content/uploads/2008/03/AMSServiceInventory.gif)

Service names will contain the application name to facilitate grouping. To group your services into an application for easier viewing, select Resources->Browse from the navigation menu. Then select "New Application" from the Tools menu and create a new application.

From the application view, select the Services floor tab and click "Add to List". You should then see a list of Services. You can filter the services based on application name and add them to your application as shown below:

![AMS Application](http://blog.springsource.com/main/wp-content/uploads/2008/03/AMSApplicationCreation.gif)

You can now begin viewing metrics, defining alerts, running reports, and much more! Please consult the AMS Documentation manual that is included with the beta download for a comprehensive guide to all of the AMS features. And stay tuned for more blog posts highlighting some of the ways you can use AMS to prevent application downtime, monitor performance, enforce service-level agreements, and more.

### What's next?

There is a lot more on the horizon for SpringSource AMS. Look for instrumented versions of more Spring portfolio products in the future. **Instrumented versions of Spring Security and Spring Web Flow should be available with the final 1.0 release of Spring Source AMS**. Also look for inclusion of more third party components in the application model, such as Apache ActiveMQ and Quartz.

We need your feedback! What kinds of management data would you like to see SpringSource AMS automatically expose? Are there specific views or reports that you'd like to see in the dashboard? Is there specific functionality you'd like the product to have? As the only application management solution specifically focused on Spring applications, we'd like to make it as powerful and easy to use as possible for both Developers and Operations staff!