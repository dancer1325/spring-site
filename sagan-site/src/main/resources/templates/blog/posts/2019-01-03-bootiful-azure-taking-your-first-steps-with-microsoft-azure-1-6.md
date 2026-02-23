---
title: Bootiful Azure: Taking Your First Steps with Microsoft Azure (1/6)
source: https://spring.io/blog/2019/01/03/bootiful-azure-taking-your-first-steps-with-microsoft-azure-1-6
scraped: 2026-02-23T15:00:15.067Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  January 03, 2019 | 2 Comments
---

# Bootiful Azure: Taking Your First Steps with Microsoft Azure (1/6)

_Engineering | Josh Long |  January 03, 2019 | 2 Comments_

> This is part 1 of a 6 part series, with new posts Mondays and Thursdays, introducing Microsoft Azure for Spring developers. I couldn't have put this together without input from Microsoft's Asir Vedamuthu Selvasingh, Yitao Dong, Bruno Borges, Brian Benz and Theresa Nguyen. You can find the code for this series [on Github](https://github.com/joshlong/bootiful-azure-article). Hit me up on [Twitter (@starbuxman)](http://twitter.com/Starbuxman) as you're reading the installments with any feedback or questions. You can also learn more about Microsoft Azure in my [Spring Tips (@SpringTipsLive)](http://twitter.com/SpringTipsLive) installment, [*Bootiful Azure*](https://spring.io/blog/2018/12/05/spring-tips-bootiful-microsoft-azure)

Here are all the installments:

-   [Bootiful Azure: Taking Your First Steps with Microsoft Azure](https://spring.io/blog/2019/01/03/bootiful-azure-taking-your-first-steps-with-microsoft-azure-1-6)
-   [Bootiful Azure: SQL-based data access with Microsoft SQL Server](https://spring.io/blog/2019/01/07/bootiful-azure-sql-based-data-access-with-microsoft-sql-server-2-6)
-   [Bootiful Azure: Global Scale Data Access with CosmosDB](https://spring.io/blog/2019/01/10/bootiful-azure-global-scale-data-access-with-cosmosdb-3-6)
-   [Bootiful Azure: Integration with Azure Service Bus](https://spring.io/blog/2019/01/14/bootiful-azure-integration-with-azure-service-bus-4-6)
-   [Bootiful Azure: Object Storage Service](https://spring.io/blog/2019/01/17/bootiful-azure-object-storage-service-5-6)
-   [Bootiful Azure: To Production!](https://spring.io/blog/2019/01/21/bootiful-azure-to-production-6-6)

Hi Spring fans! In this series, I am going to introduce the Spring for Microsoft Azure support, focusing on the interesting technologies that are enabled by the platform for consumption from Spring applications. I want to stress as I always do that you should leverage Microsoft Azure where it provides a differentiated experience. *Microsoft Azure* and *Google Cloud* and *Amazon Web Services* and *Alicloud* all offer infrastructure services like custom message queues, storage, databases, etc., that provide compelling and sometimes superior alternatives to more stock standard commodity and open source alternatives. All platforms have things that set them ahead of the herd in one way or another. These things necessarily have *gravity*; where anyone can run a MySQL or Redis, very few can run a Google Cloud Spanner or a Microsoft CosmosDB. Use the righ tool for the job! Use CosmosDB if it is the solution you need.

If the work you're trying to do is generic enough that it is untethered to a particular platform then you should absolutely work to consume it in as untethered a way as possible. Stay generic, whenever possible. Want to run a Java or Node.js process? Use a container orchestrator like Kubernetes. Or, if you like yourself, and you like getting to production quickly, use a platform-as-a-service like Heroku or Cloud Foundry whose currency are applications, not low-level containers. These technologies let you think in terms of the application binary and deliver to production quickly. They're also both open-source and have huge use bases and ecosystems, so they are the easiest solution *and* the most powerful one. Using the generic tool is also the best choice, in this case, technically. It's dead simple to get started with tools like Cloud Foundry (just install and deploy the Pivotal Cloud Foundry service on Microsoft Azure) or Kubernetes on Microsoft Azure.

Databases are a particularly sticky proposition. If you invest in a proprietary database like Google's Spanner, you should expect that it'll be *very* hard to move the data off of that platform if you should ever want to do that one day. Dave McCrory, former Riak CTO, talks about the idea of *data gravity* - this notion that data pools inspire ecosystems of applications that feed into, and draw from, that pool. The more useful those applications the more people use them, and the more likely people are to the build on those integrations. Salesforce is a great example of this. Its data is *sticky*. Salesforce, the CRM, is rich and extensive, but it's by no means the only full-featured CRM. What it does have, more than any competitive offering, is an ecosystem of partner integrations on which people have since become dependent. Those partner integrations make Salesforce a Hotel California-style proposition: you can checkin but you can never leave. So, clearly, use the best tool for the job but realize that, beyond having a considerable administration markup, these tools have an optionality cost, too.

## [](#setup)Setup

Let's take a look at Microsoft Azure itself. You'll need to login to the portal to obtain the relevant configuration keys for the various services we'll introduce in the course of this series. The portal is [something you should bookmark](http://portal.azure.com). Usually, when you look at the relevant section of the portal for the services you're using, you'll see a section called "Keys" or "Configuration Keys," or something like that. It is unfortunately not 100% consistent across the services.

![](https://raw.githubusercontent.com/joshlong/bootiful-azure-article/master/bootiful-azure/images/1-azure-portal-home.png)

In this series we'll focus on leveraging the platform's strengths - the things where Microsoft offer differentiating advantages through their Azure platform. You can achieve most of what we're going to introduce in this article using the `az` command-line tool. It's easy enough to install on multiple operating systems since it's written in Python. Consult [this the documentation for more information](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest) on how to install the Microsoft Azure CLI, `az`.

That's about it. Assuming you have an Azure account and the `az` CLI ready to use, you're ready to start coding. Azure doesn't have a platform-wide notion of authentication. You authenticate per-service. This makes working with each individual service straightforward, but it means that - holistically - you worry about authentication more often upfront then you do when using, for example, Google Cloud. This isn't to say that one introduces more work. With Google Cloud you have to often and explicitly "opt-in" to a particular service before you can use it. So: six of one, a half dozen of the other, I suppose.

You start new projects using Spring Boot, as you might expect, with [the Spring Initializr](http://start.Spring.io). Select `Azure Support` in addition to whatever else you want to use. Alternatively, if you want to introduce the Microsoft Azure dependencies to an existing application you can add a Maven bill-of-materials (BOM) artifact to your Spring Boot project's Maven or Gradle build manually. Here's how you'd do it for Maven.

```xml
Copy    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>com.microsoft.azure</groupId>
                <artifactId>azure-spring-boot-bom</artifactId>
                <version>${azure.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
```

In my case, the Maven property `azure.version`, was set to `2.0.5`.

From here onward, I'll introduce Maven-repository dependency coordinates using the Ivy syntax: `groupId` : `artifactId` : `version`. Sometimes, the `version` isn't required so I'll omit it since the BOM will manage those versions for us.

## [](#authentication)Authentication

If you want to follow along with these examples using the `az` CLI installed on your local machine, you'll need to run `az login`. Otherwise you can launch the Microsoft Azure Cloud Shell from within the Azure portal. It'll give you two choices: Bash or Powershell.

![](https://raw.githubusercontent.com/joshlong/bootiful-azure-article/master/bootiful-azure/images/2-azure-portal-cloud-shell.png)

## [](#resource-groups)Resource Groups

Once you're logged in you'll need to configure a resource group. A resource group is a named collection of resources. This is a convenient thing to have around because you can standup all the resources related to this introduction to Spring and Microsoft Azure, associating each with this resource group, and then, when you're all done, destroy the resource group and it'll cascade delete everything associated with it.

This makes billing, lifecycle administration and so much more very convenient! Each resource group is associated with a region. Microsoft Azure have tons of regions on which you can run your services. As of this writing, [there are 54 regions worldwide](https://azure.microsoft.com/en-us/global-infrastructure/regions/), more than any other cloud provider.

Here's how you would create a resource group called `bootiful` in the `West US 2` location of the US. We'll use this in subsequent examples.

```shell
Copyaz group create --name bootiful --location "West US 2"
```

You can run the following command to iterate all the possible locations: `az account list-locations`. You'll notice that as we issue commands we need to associate resources with a particular location on creation, usually with `-l` or `--location`. This can be tedious, so it's helpful to specify a default location and then omit it on subsequent invocations, like this: `az configure --defaults location=westus`.

Confirm that everything is working by running `az configure`.

## [](#the-cloud-foundry-service-broker)The Cloud Foundry Service Broker

There's [a Cloud Foundry service broker](https://pivotal.io/platform/services-marketplace/data-management/microsoft-azure) that you can use to quickly spin up various Microsoft Azure services and then bind them to your application. This service broker makes running applications on Cloud Foundry, especially on top of Microsoft Azure, the easiest path to production for applications targeting Microsoft Azure services.

There ya go! You now know everything you need to know to setup a Spring application to leverage services on Microsoft Azure.