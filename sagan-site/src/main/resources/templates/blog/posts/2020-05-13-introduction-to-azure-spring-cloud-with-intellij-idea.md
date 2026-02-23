---
title: Introduction to Azure Spring Cloud with IntelliJ IDEA
source: https://spring.io/blog/2020/05/13/introduction-to-azure-spring-cloud-with-intellij-idea
scraped: 2026-02-23T14:00:53.641Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Andy Clement |  May 13, 2020 | 3 Comments
---

# Introduction to Azure Spring Cloud with IntelliJ IDEA

_Engineering | Andy Clement |  May 13, 2020 | 3 Comments_

[Azure Spring Cloud](https://azure.microsoft.com/en-us/services/spring-cloud/) is a new Platform as a Service offering for Microservices apps. It is a fully managed service jointly built, operated, and supported by VMware and Microsoft to simplify spring boot based microservices development and management. In this blog, we will walk through how you can accelerate your development with Azure Spring Cloud and IntelliJ IDEA.

## [](#requirements)[](#requirements)Requirements

You will need a few things prepared before following the upcoming sections:

-   [IntelliJ IDEA, Community/Ultimate Edition, version 2020.1/2019.3 installed](https://www.jetbrains.com/idea/download/#section=windows)
    
-   [An Azure Account - click here to create a free trial account](https://azure.microsoft.com/en-us/free/)
    
-   [Azure Toolkit for IntelliJ installed and signed-in](https://docs.microsoft.com/en-us/azure/developer/java/toolkit-for-intellij/create-hello-world-web-app#installation-and-sign-in)
    
-   [An Azure Spring Cloud instance provisioned](https://docs.microsoft.com/en-us/azure/spring-cloud/spring-cloud-quickstart-launch-app-portal#provision-a-service-instance-on-the-azure-portal)
    

## [](#prepare-your-spring-application)[](#prepare-your-spring-application)Prepare your Spring application

First, let’s start from a simple [sample Spring Boot project](https://github.com/spring-guides/gs-spring-boot), one of the [Spring Getting Started Guides](https://spring.io/guides). We need to clone the repository:

```
Copygit clone git@github.com:spring-guides/gs-spring-boot.git
```

And import the final form of the project, contained in the `complete` subfolder of that clone:

![Imported Project](https://static.spring.io/blog/aclement/20200511/add-dependency.png)

To enable Azure Spring Cloud features (discovery service, config server, etc) a set of [dependencies](https://docs.microsoft.com/en-us/azure/spring-cloud/spring-cloud-tutorial-prepare-app-deployment) is needed. The Azure Toolkit for IntelliJ will help with that. Right-click on the project and select **Azure → Add Azure Spring Cloud dependency**:

![Add Azure Spring Cloud dependency](https://static.spring.io/blog/aclement/20200511/add-dependency-2.png)

A set of dependencies will be added to the `pom.xml`. The version is calculated based on existing dependencies in the pom, but feel free to edit them if you know what you are doing. Then, click **Import Changes** on the bottom right to resolve dependencies automatically.

![Resolving adding dependencies](https://static.spring.io/blog/aclement/20200511/add-dependency-3.png)

Except the `spring-cloud-starter-azure-spring-cloud-client`, the dependencies added are not hard requirements. They are recommended to enable the full Azure Spring Cloud feature set including Eureka, Config Server, monitoring, distributed tracing, etc. Let’s add the discovery client annotation in your `Application.java`, so that the application will be discoverable via a Eureka server once deployed to Azure Spring Cloud.

![Add annotation](https://static.spring.io/blog/aclement/20200511/add-annotation.png)

## [](#deploy-your-app-to-azure-spring-cloud)[](#deploy-your-app-to-azure-spring-cloud)Deploy your app to Azure Spring Cloud

Now, let’s go ahead and deploy the app to Azure Spring Cloud. With the help of Azure Toolkit for IntelliJ IDEA, this will be super easy. Right-click on the project and select **Azure → Deploy to Azure Spring Cloud**.

![App deployment](https://static.spring.io/blog/aclement/20200511/deploy.png)

In the pop-up configuration window, select the right subscription and Azure Spring Cloud instance you have provisioned; create a new app named **demo** and enable **Public Endpoint**.

![Configuring deployment](https://static.spring.io/blog/aclement/20200511/deploy-config.png)

Click **Run** and you will see the app built and deployed in a few minutes.

![Configuring deployment](https://static.spring.io/blog/aclement/20200511/deploy-log.png)

The application should immediately be accessible via the URL printed to the console. Congratulations for your first Azure Spring Cloud app deployed from IntelliJ IDEA!

![Accessing the application](https://static.spring.io/blog/aclement/20200511/access-endpoint.png)

## [](#view-your-app-status-and-logs)[](#view-your-app-status-and-logs)View your app status and logs

To manage your Spring Cloud app, navigate to your Azure Explorer panel on the left and find the app just deployed under Spring Cloud nodes. Right-click on the app, select **Show Properties** and you will see the tap show up on the right. Here you can perform common actions like restart/delete/scale/editing JVM options and modifying environment variables. Take a closer look at the Instances details and you can see that the app now has one instance running and registered to Eureka server since the discover status is UP. For further operations, select **Open in Portal** in the right-click menu to explore more.

![App properties](https://static.spring.io/blog/aclement/20200511/app-properties.png)

It’s also super easy to stream the logs to your IDEA. Right-click on your app in the explorer, select **Streaming Logs**, select the instance in the pop-up windows and then you will see logs showing up soon. For a full logs analysis experience, explore Azure Spring Cloud’s seamless [integration](https://docs.microsoft.com/en-us/azure/spring-cloud/diagnostic-services) with Azure Monitor.

![Log Streaming](https://static.spring.io/blog/aclement/20200511/log-stream.png)

## [](#learn-more-about-java-on-azure)[](#learn-more-about-java-on-azure)Learn more about Java on Azure

To learn more about Java on Azure, Azure Spring Cloud and Azure tools for Java developers, check out the links below!

-   [Java on Azure Developer Center](https://docs.microsoft.com/en-us/azure/developer/java/)
    
-   [Azure Spring Cloud Documentation](https://docs.microsoft.com/en-us/azure/spring-cloud/)
    
-   [Azure Tools for Java developers](https://docs.microsoft.com/en-us/azure/developer/java/fundamentals/)
    

And follow for [Twitter](https://twitter.com/JavaAtMicrosoft) the latest news about Java on Azure.