---
title: Create Spring Integration Projects using STS
source: https://spring.io/blog/2012/04/09/create-spring-integration-projects-using-sts
scraped: 2026-02-24T08:24:04.457Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Gunnar Hillert |  April 09, 2012 | 0 Comments
---

# Create Spring Integration Projects using STS

_Engineering | Gunnar Hillert |  April 09, 2012 | 0 Comments_

Just days ago, [SpringSource Tool Suite™](http://www.springsource.com/developer/sts) (STS) 2.9.1 was released. Besides [many new features](http://download.springsource.com/release/STS/doc/STS-new_and_noteworthy-2.9.1.RELEASE.pdf "Release Notes for STS 2.9.1"), it provides several features that are especially exciting for [Spring Integration](http://www.springsource.org/spring-integration "Homepage of the Spring Integration Project") users. First of all, the latest STS release adds support for Spring Integration 2.1 and improves the visualization capabilities for Spring Integration flows. STS supports now all recently added Spring Integration adapters such as:

-   [Redis](http://static.springsource.org/spring-integration/reference/html/redis.html)
-   [Gemfire](http://static.springsource.org/spring-integration/reference/html/gemfire.html)
-   [AMQP](http://static.springsource.org/spring-integration/reference/html/amqp.html)
-   [Stored Procedure](http://static.springsource.org/spring-integration/reference/html/jdbc.html#stored-procedures)

Also, all existing Spring Integration adapters have been updated to support new visualization elements. Another wonderful addition to Spring Integration users is that SpringSource Tool Suite 2.9.x now ships with templating support for Spring Integration. Thus, when creating a new project using the *Spring Template Project Wizard*, you can now select between the following 3 new Spring Integration targeted templates:

-   Spring Integration Project (Standalone) - **Simple**
-   Spring Integration Project (Standalone) - **File**
-   Spring Integration Project (**War**)

The **Simple** template creates a basic Spring Integration project, which runs as a standalone Java application, using only core Spring Integration components. In order to illustrate File polling capabilities, the **File** template uses additional components to poll file directories as well as to route those files. Lastly, the **War** template allows users to easily create basic Spring Integration projects that are targeted to run within servlet containers (e.g. Tomcat) as part of a WAR deployment. For illustration purposes the **War** template uses the Spring Integration [Twitter adapter](http://static.springsource.org/spring-integration/reference/html/twitter.html).

## Creating a new Spring Integration Project

In order to start a new project using STS Spring Templates, go in the main menu to **File**, then **NEW** and then **Spring Template Project**. The **Template Selection Screen** will show up next.

\[caption id="attachment\_10681" align="aligncenter" width="342" caption="The Template Selection Screen"\][![](http://blog.springsource.org/wp-content/uploads/2012/03/template-selection.png "template-selection")](http://blog.springsource.org/wp-content/uploads/2012/03/template-selection.png)\[/caption\]

This screen provides a list of all available Spring Templates, including the 3 previously mentioned new templates for Spring Integration. If you see that little arrow in front of the template name - that means that the actual template has not been downloaded, yet. Once downloaded, the Templates will be cached on your machine and you won’t need to download the template files again, unless you press the *Refresh* button and a new version of the template is available remotely.

Let's select the template **Spring Integration Project (Standalone) - Simple** and press next. If the template was not downloaded, yet, you will see the following popup:

[![](http://blog.springsource.org/wp-content/uploads/2012/03/template-selection-download-popup.png "template-selection-download-popup")](http://blog.springsource.org/wp-content/uploads/2012/03/template-selection-download-popup.png)

Once you proceed and the template has been downloaded, you will be presented with the **Project Settings Screen**. There you have to provide  the **project name** and certain properties that make it easy to deploy your newly created project to a Maven repository.

\[caption id="attachment\_10687" align="aligncenter" width="420" caption="Project Settings Screen"\][![](http://blog.springsource.org/wp-content/uploads/2012/03/project-settings-template.png "project-settings-template")](http://blog.springsource.org/wp-content/uploads/2012/03/project-settings-template.png)\[/caption\]

In fact, besides creating the Eclipse-specific project files, this Template wizard will also generate a project **pom.xml** file, which will make this project easily usable outside of STS as well (E.g. for building this project as part of your [Continuous Integration](http://martinfowler.com/articles/continuousIntegration.html) process with tools such as [Jenkins](http://jenkins-ci.org/)). Thus, besides the project name, you have to provide a **groupId**, an **artifactId**, and a **version** property. Lastly, you also need to define a **top-level (base) package** under which your relevant source files will be located.

Once you press “**Finish**”, the project will be created and it should be listed to your left in the STS *Package Explorer* window. At this point you now have a fully functional Spring Integration project.

## Running the Project

Under your declared *base package* you will find a **Main** class that will allow you to execute the Spring Integration application. In STS you can execute it by right clicking the **Main** class and then selecting “**Run As**” --> **Java Application**. The application starts up and you will see the following console output:

[![Console Output](http://blog.springsource.org/wp-content/uploads/2012/03/application-console.png "application-console")](http://blog.springsource.org/wp-content/uploads/2012/03/application-console.png)

Besides using STS you can also start the project very simply from the command line using [Maven](http://maven.apache.org/). Just go to the project directory and execute:

```
Copy
$ mvn clean package exec:java
```

This command will clear the *target* build directory, compile and package the application and execute the application using the [Exec Maven Plugin](http://mojo.codehaus.org/exec-maven-plugin/). The application will start up just as it did in STS. Pressing “q” will quit the application.

## The Spring Integration Configuration

What this application does, is that it allows your to enter some free form text via the command line, which is then converted to an upper-case representation and printed to the console.

In order to make this happen, Spring Integration is being used. However, if you look at the details of the **Main class** that bootstraps the Spring application context, you will notice that it has no references to Spring Integration itself.  All the main class basically does is to retrieve an instance of the “**StringConversionService**” interface from the Spring Application Context. This interface, though, is used by a Spring Integration [Gateway](http://static.springsource.org/spring-integration/reference/html/messaging-endpoints-chapter.html#gateway) to capture the entered String and forward it to the request channel.

The project's application Context XML file is located under **META-INF/spring/integration**. As you can see, the application consists of a very basic Spring Integration flow. We start with a simple **Gateway** that uses the previously mentioned **StringConversionService** interface.

```xml
Copy
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:int="http://www.springframework.org/schema/integration"
xsi:schemaLocation="http://www.springframework.org/schema/beans 
  http://www.springframework.org/schema/beans/spring-beans.xsd
  http://www.springframework.org/schema/integration
  http://www.springframework.org/schema/integration/spring-integration-2.1.xsd">

<int:gateway id="gateway"
  default-request-timeout="5000"
  default-reply-timeout="5000"
  default-request-channel="requestChannel"
  default-reply-channel="replyChannel"
  service-interface="org.springintegration.demo.service.StringConversionService">
    <int:method name="convertToUpperCase"/>
</int:gateway>

<int:service-activator id="serviceActivator"
                    input-channel="requestChannel"
                    output-channel="replyChannel"
                    expression="payload.toUpperCase()"/>

<int:channel id="replyChannel"/>
<int:channel id="requestChannel"/>

</beans>
```

There are 2 defined message channels. The first channel will route the Message containing the input string to the service-activator. The service activator itself will use Spring Expression Language (SpEL) to convert the input Message’s payload to uppercase. And via the reply channel the upper-case String is returned to the caller and printed to the command line.

[![](http://blog.springsource.org/wp-content/uploads/2012/04/integration-graph5.png "Spring Integration Graph")](http://blog.springsource.org/wp-content/uploads/2012/04/integration-graph5.png)

In a real world scenario, the Service Activator would most likely reference another service bean in order to execute some non-trivial business logic, e.g.:

```xml
Copy
…
<int:service-activator id="serviceActivator"
                    input-channel="requestChannel"
                    output-channel="replyChannel"
                    ref="businessService" 
                    method="myMethodToExecute"/>
…
```

Furthermore, please be aware that we are using the Service Activator in this template in order to illustrate the execution of other Java-based business services. If your goal is to purely transform Spring Integration Message Payloads, please also consider using a [Transformer](http://static.springsource.org/spring-integration/reference/html/messaging-transformation-chapter.html#transformer), which may be a better fit semantically.

This is a very simple use-case but it provides you with a nice starting point to implement your own Spring Integration components. We expect that these templates will substantially lower the barrier of entry to learn and experience the benefits of using Spring Integration in your own projects. If you have any questions, we would like to hear from you. Please visit the Spring Integration forum at [forum.springsource.org](http://forum.springsource.org/forumdisplay.php?42-Integration) for any questions you may have. For more information on Spring Integration in general, please also visit our project website at: [](http://www.springintegration.org/)[http://www.springintegration.org/](http://www.springintegration.org/).

## Resources

-   [STS 2.9.1 Release Notes](http://download.springsource.com/release/STS/doc/STS-new_and_noteworthy-2.9.1.RELEASE.pdf	)
-   [Spring Integration Project Website](http://www.springsource.org/spring-integration)
-   [Spring Integration Templates - GitHub Repository](https://github.com/SpringSource/spring-integration-templates)
-   [Spring Integration Templates - Issue Tracker](https://jira.springsource.org/browse/INTTEMPLATES)