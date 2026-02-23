---
title: Bootiful Azure: To Production (6/6)
source: https://spring.io/blog/2019/01/21/bootiful-azure-to-production-6-6
scraped: 2026-02-23T15:00:37.068Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  January 21, 2019 | 1 Comment
---

# Bootiful Azure: To Production (6/6)

_Engineering | Josh Long |  January 21, 2019 | 1 Comment_

> This is part 6 of a 6 part series, with new posts Mondays and Thursdays, introducing Microsoft Azure for Spring developers. I couldn't have put this together without input from Microsoft's Asir Vedamuthu Selvasingh, Yitao Dong, Bruno Borges, Brian Benz and Theresa Nguyen. You can find the code for this series [on Github](https://github.com/joshlong/bootiful-azure-article). Hit me up on [Twitter (@starbuxman)](http://twitter.com/Starbuxman) as you're reading the installments with any feedback or questions. You can also learn more about Microsoft Azure in my [Spring Tips (@SpringTipsLive)](http://twitter.com/SpringTipsLive) installment, [*Bootiful Azure*](https://spring.io/blog/2018/12/05/spring-tips-bootiful-microsoft-azure)

Here are all the installments:

-   [Bootiful Azure: Taking Your First Steps with Microsoft Azure](https://spring.io/blog/2019/01/03/bootiful-azure-taking-your-first-steps-with-microsoft-azure-1-6)
-   [Bootiful Azure: SQL-based data access with Microsoft SQL Server](https://spring.io/blog/2019/01/07/bootiful-azure-sql-based-data-access-with-microsoft-sql-server-2-6)
-   [Bootiful Azure: Global Scale Data Access with CosmosDB](https://spring.io/blog/2019/01/10/bootiful-azure-global-scale-data-access-with-cosmosdb-3-6)
-   [Bootiful Azure: Integration with Azure Service Bus](https://spring.io/blog/2019/01/14/bootiful-azure-integration-with-azure-service-bus-4-6)
-   [Bootiful Azure: Object Storage Service](https://spring.io/blog/2019/01/17/bootiful-azure-object-storage-service-5-6)
-   [Bootiful Azure: To Production!](https://spring.io/blog/2019/01/21/bootiful-azure-to-production-6-6)

This last post in our series looking at Microsoft Azure is really a quick wrapup post that looks at things to keep in mind when deploying an application built with Spring Boot and Micosoft Azure to production.

## [](#secure-configuration)Secure Configuration

We've developed the application with ease and aplomb from the comfort of our local machines, plugging in the relevant confuguration values as we need them. Trouble is, these are often very sensitie values tht shouldn't be left laying around on the filesystem at rest, unencrypted. There are a *number* of good solutions for this. You could of course deploy the Spring Cloud Config Service itself. If you're running [Pivotal Cloud Foundry on Microsoft Azure (or otherwise)](https://pivotal.io/partners/microsoft), this is the recommended way because it's a one-liner to get it deployed and working. You could of course deploy [Hashicorp Vault and use Spring Cloud Vault](https://www.hashicorp.com/resources/introduction-to-using-hashicorp-vault-with-azure). Or, you could store the keys and values in Microsoft's [own Key Vault service](https://azure.microsoft.com/en-us/services/key-vault/). In order to effectively use Key Vault you'll need to get into configuring Microsoft Active Directory which, while not something I'd wish on you or your loved ones, dear reader, is something in which I'm *quite* interested.

## [](#microsoft-active-directory)Microsoft Active Directory

In my 20+ years of helping organizations build software I've seen nary a handful that *weren't* using Microsoft Active Directory even if only from the LDAP interface. Sure, I hope Google Apps gains more traction in the enterprise, but let's be very clear: Active Directory is *the* prevailing standard in enterprise IT. It is a way of life, even if you and I probably don't have to worry about it all that often in our idealized world of application development. And for good reason! It integrates the entire Windows desktop experience for the business professional. It's the beating heart of the Office365 story and it's the way organization organizes and self structures itself. Want to know if you got that promotion? Check Active Directory! Want to know where someone is seated? Check Active Directory! Want to force password resets? Maintain enterprise-wide audit logs? *Fire someone*? Check Active Directory! You may think your organizations runs Active Directory but lets be clear: it runs your organization.

Active Directory is a directoy server. It provides a tree of users, organizations and more. It acts as identity manager for technologies like Microsoft CRM, Microsoft SQL Server, Microsoft Office and even Microsoft Windows itself. You can describe users, their rights and roles, and so much more in Active Directory. Which brings us back around. Microsoft Azure runs Active Directory for you! You can import and configure all the relevant information for your Microsoft Active Directory install right from the platform. [There's even a Spring Boot starter to connect Microsoft Azure to your OAuth-delegating Spring Boot- and Spring Security-powered applications](https://azure.microsoft.com/en-us/blog/spring-security-azure-ad/). Could you deploy and manage something like Microsoft SQL Server or Microsoft Active Directory yourself? Sure. But, *should you*?

## [](#application-insights)Application Insights

As you scale out and spin up more microservices you'll introduce more and more moving parts and it becomes all the more critical to be able to observe the movement of data from one node to another in the system. Here, the Microsoft Application Insights integration for Spring applications - which is for the moment at least delivered separate from the main Spring integration for Microsoft Azure - makes using it an cinch! Add `com.microsoft.azure`: `applicationinsights-spring-boot-starter` : `1.1.0-BETA` to your build file.

You can script the creation of an Application Insights subscription, like this:

```shell
Copy#!/usr/bin/env bash

rg=$1
appname=${rg}-appinsights

az resource create \
    --resource-group $rg \
    --resource-type "Microsoft.Insights/components" \
    --name $appname \
    --location "South Central US" \
    --properties '{"ApplicationId":"bootiful","Application_Type":"web"}'
```

That'll create a subscription and bind it to the `bootiful` resource group. Use the following command to access the resulting key (assuming the same `$rg` and `$appname` variables are in scope):

```shell
Copyaz resource show -g $rg -n $appname --resource-type "Microsoft.Insights/components" --query properties.InstrumentationKey
```

You'll then need to specify the `azure.application-insights.instrumentation-key` and to give your application a `spring.application.name` name. Which, to be fair, you should do anyway. That's it! Restart your application, drive some traffic through an HTTP endpoint in your application (even just running on `localhost`) and then login to the Microsoft Application Insights dashboard and watch the instrumentation in action!

## [](#cloud-foundry)Cloud Foundry

You shouldn't run software that you can't charge for. Pivotal legend [James Watters](http://twitter.com/WattersJames) often talks about work that's "below the value line," and the idea that technologists and executives should focus on work that's above that value line for a given organization. The average organization has enough problems. Running commodity software like MySQL or Kafka shouldn't be among them. Running things that don't differentiate your business shouldn't be among them. It'll cost infinitely less, over enough time, to pay someone to run that, whatever *that* is, for you if someone else can do a competent job. Ideally, whoever ends up running that software should have a vested interest in running those things well. Most organizations have a mission anything but configuring SSL, or debugging MySQL replication issues. It is virtually always cheaper to let someone else do that for you.

If you are trying to do something standard, then you should absolutely rely on standardized tools. Why use a cloud vendor's lockin-ware to run a Java or Node-based application when you could use something like Cloud Foundry or Kubernetes, for which the hiring pool is larger, the cost can be virtually nill, and the ease of use is on-par or better than whatever the cloud vendor is offering?

This is a big part of the reason that Microsoft and Pivotal have such a great relationship. Enterprise customers understand that for some workloads the public cloud is a foregone conclusion, but they don't want to be locked in. Optionality is valuable. Being able to move to a different platform is valuable. Agility - the ability to respond to change - is *valuable*. We see this all the time; Google Cloud Platform's prices were for some workload-types cheaper than Amazon Web Services at its debuts. Some public cloud vendors have availability zones in regions you might want to be in that others dont. Increasingly, organizations embark upon hybrid cloud or mutlicloud strategies, knowing that their workloads will vary, and their availability demands will vary. As much as possible, these organizations want to reduce the cost of operationalizing, securing, training-up and deploying to the varities of cloud infrastructure.

Pivotal Cloud Foundry is a natural choice here; it allows organizations to deploy reliably to any of a number of cloud platforms and, as easily, and when necessary, drop down to platform-specific services. This fact is one of the reasons that Microsoft named Pivotal partner of the year in 2017 and 2018. Pivotal Cloud Foundry, our distribution of the Apache 2 licensed open-source Cloud Foundry project, helps drive resource usage on Microsoft Azure and does so in as portable a way possible while still surfacing that which is valuable and unique.

I'm all for using something like Microsoft Azure to simplify the work of standing up infrastructure where Microsoft can provide a differentiated experience. But running a Java process or a Node.js process? Stick to de-facto standard infrastructure like Cloud Foundry or Kubernetes. It's fairly trivial to get Cloud Foundry deployed on top of Microsoft Azure and, once deployed, it's trivial to deploy Spring Boot applications there. It's often as simple as `cf push -p my.jar`. You'll need the Cloud Foundry CLI, [of course](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html).

In the world of Cloud Foundry a *service broker* is an HTTP API with which the Cloud Foundry platform interacts to manage the provisoning and lifecycle of... *something*. It could be a database like MySQL or a message queue like Apache Kafka. It could be an Active Directory installation or a CosmosDB connection. It could be any of a number of things. The Microsoft and Pivotal teams have worked hand-in-hand to ensure that the service broker options for users running Pivotal Cloud Foundry on Microsoft Azure support [the tentpole services in as convenient a way possible](https://docs.pivotal.io/partners/azure-sb/index.html). This list includes Microsoft Azure services like Azure Storage, Azure Redis Cache, Azure Service Bus, Azure Event Hubs, Azure SQL Databases (SQL Server, PostgreSQL and MySQL) and failover groups, and Azure CosmosDB.

You can inspect the Cloud Foundry service catalog by issuing a `cf marketplace` command on the CLI. It'll show you all the relevant services and you can then choose to provision an instance of the service and its associated plan. A plan describes the particular levels of service you can expect from a service broker resource and is naturally specific to each service broker on offer.

Let's say you have a Spring Boot application deployed to Cloud Foundry, given the logical name `myapp`:

```shell
Copy> cf push -p my.jar --no-start myapp
```

Suppose you wanted to provision an instance of Microsoft SQL Server for your application, and you wanted to be able to reference that database, logically, as `mydb`. Your session might look like this. The following command would provision an instance of SQL Server, with parameters specified via inline JSON or a `.json` file path, and assign it a logical name `mydb`.

```shell
Copy> cf create-service azure-sqldb basic mydb -c '{"sqlServerName": "Bootiful"}'
```

The service would soon be provisioned and usable from within an application. You'd just need to bind the service to your application, so that the relevant connectivity information could be injected into the application's environment as an environment variable.

```shell
Copycf bind-service myapp mydb
cf restart myapp
```

Now your running Spring Boot application would have an environment variable, `VCAP_SERVICES`, whose contents would include the connection information for the just-provisioned service. It'd look something like this:

```json
Copy"VCAP_SERVICES": {
  "azure-sqldb": [
    {
      "credentials": {
        "sqldbName": "fake-database",
        "sqlServerName": "fake-server",
        "sqlServerFullyQualifiedDomainName": "fake-server.database.windows.net",
        "databaseLogin": "ulrich",
        "databaseLoginPassword": "u1r8chP@ss",
        "jdbcUrl": "jdbc:sqlserver://fake-server.database.windows.net:1433;database=fake-database;user=fake-admin;password=fake-password;Encrypt=true;TrustServerCertificate=false;HostNameInCertificate=*.database.windows.net;loginTimeout=30",
        "jdbcUrlForAuditingEnabled": "jdbc:sqlserver://fake-server.database.secure.windows.net:1433;database=fake-database;user=fake-admin;password=fake-password;Encrypt=true;TrustServerCertificate=false;HostNameInCertificate=*.database.secure.windows.net;loginTimeout=30",
        "hostname": "fake-server.database.windows.net",
        "port": 1433,
        "name": "fake-database",
        "username": "ulrich",
        "password": "u1r8chP@ss",
        "uri": "mssql://ulrich:u1r8chP@ss@fake-server.database.windows.net:1433/fake-database?encrypt=true&TrustServerCertificate=false&HostNameInCertificate=*.database.windows.net"
      }
    }
  ]
}
```

In Spring Boot, you could reference these properties using a flattened property access syntax, e.g.: `vcap.services.mydb.credentials.jdbcUrl`. A common pattern here is to run applications in the cloud with a Spring profile active. Say, `cloud`? That way you could put a config file in your code under `application-cloud.properties` and that property file would be loaded when the application starts up in Cloud Foundry. You could put default, local configuration in `application-default.properties`. So, when Spring Boot starts with no profile specified it'll load the configuration in `application-default.properties`. When running in Cloud Foundry on Azure it'd load the configuration in `application-cloud.properties`. You could thus add the following to your `application-default.properties` file.

```properties
Copyspring.datasource.url=${vcap.services.mydb.credentials.jdbcUrl}
```

Bootiful!

## [](#the-next-steps)The Next Steps

We've only just begun to scratch the surface of what's possible with Spring, Microsoft Azure and Cloud Foundry in this and the posts before it. What should be clear is that there's a nice symbiosis here, each technology making the layer below it even more powerful. It's no wonder that a ton of Azure's workloads are Linux, Spring Boot and Cloud Foundry-based: these things work well together. For those who want to learn even more about Spring on Microsoft Azure, check [out the resource portal from Azure](https://docs.microsoft.com/en-us/java/azure/spring-framework/?view=azure-java-stable)