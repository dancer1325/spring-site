---
title: Hello, Azure Spring Cloud
source: https://spring.io/blog/2020/09/02/hello-azure-spring-cloud
scraped: 2026-02-23T13:49:58.291Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  September 02, 2020 | 2 Comments
---

# Hello, Azure Spring Cloud

_Engineering | Josh Long |  September 02, 2020 | 2 Comments_

**NOTE**: This blog was drafted in cooperation with members of the Spring team and Microsoft Azure Spring Cloud team, including Josh Long, Julien Dubois, Sean Li, Kylie Liang, Jonathan Giles, Asir Selvasingh, and the rest of the Microsoft Azure Spring Cloud and VMware Spring teams.

Hi, Spring fans! It is with extreme delight that today we announce the general availability of [Azure Spring Cloud](https://azure.microsoft.com/en-us/blog/azure-spring-cloud-a-fully-managed-service-for-spring-boot-apps-is-now-generally-available/). Azure Spring Cloud is a platform for deploying and managing Spring Boot and Spring Cloud-powered services and software built on Microsoft Azure. It is jointly built, operated, and supported by Microsoft and VMware.

The key concept of Azure Spring Cloud is to optimize the path to production for Spring Boot-based microservices on a platform that leverages the Azure Kubernetes service, abstracting away all the complexity involved in managing Kubernetes. Let's look at how Azure Spring Cloud does this in concrete terms. You'll need to first setup a new Azure Spring Cloud service instance. You can do that easily in [the Azure Portal](http://portal.azure.com) or on [the command line](https://github.com/microsoft/azure-spring-cloud-training/tree/master/01-create-an-azure-spring-cloud-instance). Once thats done we're ready to ship software!

Let's start with something simple. Go the [Spring Initializr](http://start.Spring.io) and build a new service. Add the `Reactive Web` dependency. Click `Generate`. You'll be given a `zip` file which you should unzip. The resulting project you can open up in any IDE you want. Edit `pom.xml` and comment out the following dependencies for now:

Add the following Spring Webflux HTTP controller to your Java codebase in the same code page as your main application.

```java
Copy
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Collection;

@RestController
class HelloController {

    @GetMapping("/hello")
    Map<String, String> hello() {
        return java.util.Collections.singletonMap("greeting", "Hello from Azure Spring Cloud");
    }
}
```

And then build the application as you would any Spring Boot application from the root of the project using Apache Maven:

```shell
Copymvn clean package -f pom.xml 
```

This will give you a `.jar` that you can run normally: `java -jar target/*jar`.

The application works, and now you can configure an application instance on Azure Spring Cloud so that when you deploy the `.jar`, the platform will know what to do with it and how it should be configured.

You can create a new application in the Azure Portal or on the command line.

```shell
Copyaz spring-cloud app create -n simple-microservice
```

You only need to create an application definition once. Thereafter we'll only need to deploy the application itself.

```shell
Copy az spring-cloud app deploy -n simple-microservice --jar-path target/demo-0.0.1-SNAPSHOT.jar
```

And with that, the application is running in the cloud! Congrats! You're in production. It's a nice feeling, isn't it? Production, in this case, is a very robust environment.

![](https://raw.githubusercontent.com/joshlong/azure-2020-blog/master/images//azure-spring-cloud-in-vnet.jpg)

Once in production, you'll need [distributed tracing and log aggregation](https://github.com/microsoft/azure-spring-cloud-training/blob/master/03-configure-monitoring/README.md).

![](https://raw.githubusercontent.com/joshlong/azure-2020-blog/master/images/distributed-tracing-in-azure-spring-cloud.jpg)

You may want to centralize and secure configuration values, and this is trivial with the Spring Cloud Config Server, which is trivial to [setup in Azure Spring Cloud](https://github.com/microsoft/azure-spring-cloud-training/blob/master/04-configure-a-spring-cloud-config-server/README.md).

And you can also take advantage of service registration and discovery using the pre-configured [Eureka service registry in Azure Spring Cloud](https://github.com/microsoft/azure-spring-cloud-training/blob/master/05-build-a-spring-boot-microservice-using-spring-cloud-features/README.md)

## [](#the-spring-on-azure-integrations)The Spring on Azure Integrations

All that and we've only begun to tap the full power of Azure Spring Cloud! Azure Spring Cloud makes short work of standing up infrastructure to support microservices, but a typical application has a ton of other infrastructure requirements, and thankfully Microsoft Azure is more than ready to meet the need.

We still haven't connected to a database, or a message queue, added security or anything else. Not to worry though, Spring Cloud for Microsoft Azure provides a rich toolbox allowing you to access Azure services in an idiomatic fashion for Spring applications. Let's look at some, but definitively not all, of the possibilities.

-   You can use Spring Security to talk to Active Directory
-   You can use Spring Data R2DBC to talk to a Microsoft SQL Server instance in a reactive fashion, or use JDBC to talk to it in a non-reactive fashion
-   You can use the reactove \[Spring Data MongoDB\]([https://github.com/microsoft/azure-spring-cloud-training/blob/master/06-build-a-reactive-spring-boot-microservice-using-cosmosdb/README.md](https://github.com/microsoft/azure-spring-cloud-training/blob/master/06-build-a-reactive-spring-boot-microservice-using-cosmosdb/README.md)

) module to talk to Azure CosmosDB

-   You can use Spring Cloud Stream to talk to Azure Service Bus

Josh looked at some of these opportunities in depth in this talk from June 2020, delivered to a joint assembly of the [Singapore Java and Microsoft](https://www.youtube.com/watch?reload=9&v=dQuM2DkfBv0&list=PLECEw2eFfW7hYMucZmsrryV_9nIc485P1) user groups.

## [](#a-pivotal-collaboration)A Pivotal Collaboration

In October 2019, Microsoft and VMware announced the collaboration of Azure Spring Cloud. Since then, many customers have approached us about this differentiated offering. Java and JVM developers in many organizations have used the service and provided us with plenty of feedback to prioritize features and shape Azure Spring Cloud. We have enabled security features to manage secrets, hybrid deployments, control ingress and egress to apps, and secure communications using TLS/SSL. To support performance and reliability we have enabled autoscaling, log streaming, alerts, and self-diagnostics.

## [](#production-is-awesome-and-you-dont-have-to-take-our-word-for-it)Production is Awesome, and You Don't Have to Take Our Word For It

We love the Azure Spring Cloud platform and we hope you will too. We know that lots of you already do! As it turns out, production \_is awesome, and you don't have to take out word for it! There are a few customer quotes over [on the official release blog](https://azure.microsoft.com/en-us/blog/azure-spring-cloud-a-fully-managed-service-for-spring-boot-apps-is-now-generally-available).

## [](#learn-more-at-springone-2020-today-and-tomorrow)Learn more at SpringOne 2020, today and tomorrow

-   Microsoft's Asir Selvasingh and Adib Sakali are doing [a customer panel later today](https://springone.io/2020/sessions/accelerate-spring-apps-to-the-cloud-at-scale-a-discussion-with-azure-spring-cloud-customers) at SpringOne 2020 on Wednesday, Sep 2 at 12:35 PM PDT
-   Microsoft's Julien Dubois and Josh Long are presenting [Bootiful Azure Spring Cloud](https://springone.io/2020/sessions/bootiful-azure-spring-cloud) at SpringOne 2020 on Thursday, Sep 3 at 11:35 AM PDT

## [](#next-steps)Next Steps

-   [The excellent Azure Spring Cloud tutorial](https://github.com/microsoft/azure-spring-cloud-training). Start here for the hands on Azure Spring Cloud experience.
-   Josh was recently on the Lyle Dodge's Microsoft Azure YouTube show ***Azure in the Enterprise*** demonstrating some of the Spring for Microsoft Azure integrations. Check these out: [How to use Spring and Initializr with Maven and Azure Cosmos DB](https://youtu.be/IWQboyBohEI), [**How to leverage the Spring framework with Azure SQL Database**](https://www.youtube.com/watch?v=RG6UqPJdqIs&feature=youtu.be), [How to use the Spring framework to access Azure Service Bus](https://youtu.be/3zoDqgjjT6E), [How to use the Spring framework to access Azure Storage](https://youtu.be/d4SfosPWz8s).
-   Microsoft's Kylie Liang and Theresa Nguyen were on [Josh's podcast - *A Bootiful Podcast*](http://bootifulpodcast.fm) to talk about [Java and Spring Support](https://spring.io/blog/2019/04/05/a-bootiful-podcast-microsoft-s-kylie-liang-and-theresa-nguyen-on-microsoft-s-java-and-spring-support)
-   Microsoft's Kushagra Thapar was on [Josh's podcast *A Bootiful Podcast*](http://bootifulpodcast.fm) to talk [about Spring and Azure CosmosDB](https://spring.io/blog/2020/04/10/a-bootiful-podcast-microsoft-s-kushagra-thapar-on-spring-data-cosmosdb)
-   Josh looked at some of the opportunities for Spring Cloud for Microsoft Azure in this talk from June 2020, delivered to a joint assembly of the [Singapore Java and Microsoft User Groups](https://www.youtube.com/watch?reload=9&v=dQuM2DkfBv0&list=PLECEw2eFfW7hYMucZmsrryV_9nIc485P1)
-   Josh took a detailed look at various features in the Spring for Microsoft Azure integration in [this six-part blog series from 2018](https://spring.io/blog/2019/01/03/bootiful-azure-taking-your-first-steps-with-microsoft-azure-1-6)