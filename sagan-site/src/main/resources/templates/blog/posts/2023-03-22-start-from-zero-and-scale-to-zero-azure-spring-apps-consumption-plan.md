---
title: Start from zero and scale to zero – Azure Spring Apps consumption plan
source: https://spring.io/blog/2023/03/22/start-from-zero-and-scale-to-zero-azure-spring-apps-consumption-plan
scraped: 2026-02-23T10:00:08.678Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  March 22, 2023 | 0 Comments
---

# Start from zero and scale to zero – Azure Spring Apps consumption plan

_Engineering | Josh Long |  March 22, 2023 | 0 Comments_

We are launching a new way to pay for Azure Spring Apps -- the consumption pricing plan. This plan is now in public preview so you can start creating and deploying apps today. This new plan is super-efficient because you can start from zero and scale to zero vCPU. You get more straightforward pricing across your containerized applications since it costs the same as Azure Container Apps, but with added value for Spring apps.

How does this work? With the new plan, you can deploy apps that don’t need to run all the time or apps that have bursts of traffic and only pay for the resources used. This is a “serverless plan”, which means your apps can scale out and in automatically depending on the number of HTTP requests or events they receive or simply run as always-on background jobs.

This pricing plan was developed based on feedback from our customers who want to pay only for what they use, particularly when they are not utilizing the full capacity of a base unit at the beginning of a project. The consumption plan has no base unit, so you will not be charged when your apps are not in use. You can start with just 0.25 vCPU and scale up dynamically as needed. You can use this new plan to build or migrate all sorts of apps, like web apps, web API endpoints, microservice apps, and more.

![](https://github.com/joshlong/blog-images/raw/master/march-22-2023/1.jpg)

## [](#deploy-and-manage-spring-and-polyglot-applications)Deploy and manage Spring and polyglot applications

Looking to deploy and manage Spring and polyglot applications with ease? You don’t have to look further than the Azure Spring Apps consumption plan.

Azure Spring Apps consumption is built on Azure Container Apps, which allows you to deploy Spring apps alongside other containerized apps built using any language, such as Java, NodeJS, Python, Go, and .NET Core, in Azure Container Apps. Using this deployment option lets you simplify virtual network configuration and management by running all your apps in the same Azure Container Apps environment.

With Azure Spring Apps consumption, you don’t need to worry about creating different subnets and network security groups for different types of applications - everything can run seamlessly in the same Azure Container Apps environment. Plus, our service is designed to make deployment and management as easy as possible, so you can focus on what matters most - building great apps.

![](https://github.com/joshlong/blog-images/raw/master/march-22-2023/2.jpg)

The fully managed Spring Cloud middleware components - Spring Cloud Service Registry and Spring Cloud Config Server - are now available in private preview for Azure Spring Apps consumption. If you are interested in trying out these components, simply [sign up for our private preview](https://aka.ms/asa-consumption-middleware-signup). It’s the perfect opportunity to get a sneak peek at what’s to come and experience the benefits of fully managed Spring Cloud middleware components for yourself. You can also share your feedback with our product group to shape the solution.

## [](#simpler-app-scaling)Simpler app scaling

Looking for a more efficient way to manage app scaling? Azure Spring Apps consumption has you covered.

Our service is built on Azure Container Apps, which manages horizontal app scaling through a set of declarative rules. This means you can easily add and edit scaling rules, making it simpler than ever to control how your apps scale out or scale in.

Our scaling rules are driven by three categories of triggers, giving you the flexibility to choose one or more rules that work best for your needs:

-   HTTP: Based on the number of concurrent HTTP requests to your app, this scaling rule gives you control over the threshold of concurrent HTTP requests that determines how your apps scale out or scale in.
-   TCP: Based on the number of concurrent TCP connections to your app, this scaling rule gives you control over the threshold of concurrent TCP connections that determines how your apps scale out or scale in.
-   Custom: Based on CPU, memory, or supported event-driven data sources such as Azure Service Bus, Azure Event Hubs, Apache Kafka, and Azure Redis Cache, this scaling rule allows you to create a custom scaling rule based on any [ScaledObject](https://keda.sh/docs/latest/concepts/scaling-deployments/)\-based [KEDA scaler](https://keda.sh/docs/latest/scalers/).

With Azure Spring Apps consumption, you'll have all the tools you need to manage app scaling efficiently and effectively.

![](https://github.com/joshlong/blog-images/raw/master/march-22-2023/3.jpg)

## [](#try-today)Try today

If you are a developer running Spring applications at scale, you know the challenges that come with it. That is why Microsoft and VMware teamed up in 2019 to create Azure Spring Apps - a solution designed to make your life easier.

With Azure Spring Apps, you can easily deploy your event-driven Spring applications to the cloud and get them up and running in no time. It is a golden path to production that simplifies the deployment process and optimizes your resource usage.

Want a flexible and cost-effective way to use Azure Spring Apps? Look no further than our consumption pricing plan!

And the best part? We're offering [FREE monthly grants](https://aka.ms/costs-less) on all tiers - 50 vCPU hours and 100 memory GB hours per tier\*. This is the number of FREE hours you get BEFORE any usage is billed, giving you a chance to test out the service without any financial charges.

So why wait? Take advantage of our FREE monthly grants and deploy your [first event-driven Spring app](https://aka.ms/event-driven-spring-app) to Azure Spring Apps today! With our consumption pricing plan, you can optimize your resource usage and save money on your cloud computing costs.

![](https://github.com/joshlong/blog-images/raw/master/march-22-2023/4.jpg)

The Azure Spring Apps Standard consumption plan public preview is now available. We’re committed to bringing you the latest and greatest consumption-based innovation for cloud services. We’re working on bringing the same consumption innovation to Azure Spring Apps Enterprise, so stay tuned for even more great things to come.

## [](#additional-resources)Additional Resources

-   Learn using an [MS Learn module](https://docs.microsoft.com/en-us/learn/modules/azure-spring-cloud-workshop/) or [self-paced workshop](https://github.com/microsoft/azure-spring-cloud-training) on GitHub
-   Learn more about [Azure Container Apps environment](https://learn.microsoft.com/en-us/azure/container-apps/environment) and [deploy your first app](https://learn.microsoft.com/en-us/azure/container-apps/get-started?tabs=bash) to Azure Container Apps
-   [Deploy](https://aka.ms/Fitness-Store) the demo Fitness Store Spring Boot app to Azure
-   [Deploy](https://aka.ms/Deploy-Spring) the demo Animal Rescue Spring Boot app to Azure
-   Learn [more](https://docs.microsoft.com/en-us/azure/spring-cloud/) about implementing solutions on Azure Spring Apps
-   Deploy Spring Boot apps by leveraging enterprise best practices – [Azure Spring Apps Reference Architecture](https://docs.microsoft.com/en-us/azure/spring-cloud/reference-architecture)
-   Migrate your [Spring Boot](https://docs.microsoft.com/en-us/azure/developer/java/migration/migrate-spring-boot-to-azure-spring-cloud), [Spring Cloud](https://docs.microsoft.com/en-us/azure/developer/java/migration/migrate-spring-cloud-to-azure-spring-cloud), and [Tomcat](https://aka.ms/migrate-tomcat-to-azure-spring-cloud-service) applications to Azure Spring Apps
-   Wire Spring applications to [interact with Azure services](https://docs.microsoft.com/en-us/azure/developer/java/spring-framework/)
-   For feedback and questions, please [e-mail](mailto:AzureSpringCloud-Talk@service.microsoft.com) us or [open a GitHub issue](https://github.com/Azure/Azure-Spring-Apps/).

\* Monthly free grant for Azure Spring Apps consumption plan is shared with Azure Container Apps.