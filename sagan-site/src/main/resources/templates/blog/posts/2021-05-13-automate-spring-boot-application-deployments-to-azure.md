---
title: Automate Spring Boot application deployments to Azure!
source: https://spring.io/blog/2021/05/13/automate-spring-boot-application-deployments-to-azure
scraped: 2026-02-23T13:23:34.142Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  May 13, 2021 | 0 Comments
---

# Automate Spring Boot application deployments to Azure!

_Engineering | Josh Long |  May 13, 2021 | 0 Comments_

Today, we’re excited to announce the availability of the Azure Pipeline Task for deploying Spring Boot applications to Azure Spring Cloud. You can get started by building your pipelines using the [Azure Spring Cloud task](https://docs.microsoft.com/en-us/azure/spring-cloud/how-to-cicd?pivots=programming-language-java) to automate Spring Boot application deployments to any number of environments and Azure Regions.

Over the past 18 months, we worked with many enterprise customers to learn about their scenarios including thoughts on automating end-to-end from idea to provisioning Azure resources to building Spring Boot applications to deploying those applications to production. Many of these customers have thousands of Spring Boot applications running in on-premises data centers. As they migrate these applications to the cloud, they need everything automated end-to-end to ensure repeatability and meet the requirements set forth by their IT departments and/or regulatory bodies. They require a fully-featured Continuous Integration / Continuous Delivery (CI/CD) service that can automatically deploy updated Spring Boot applications to Azure Spring Cloud. In many customer environments, they use Azure CLI in Azure Pipelines to automate Spring Boot application deployments to Azure, and they asked Microsoft for an Azure Spring Cloud task to ease their automation effort and delegate the maintenance of the deployment task to Microsoft. Now, using the new Azure Spring Cloud task, anyone can automate deployments straight to production or automate blue-green strategies to stage for testing and then set to production.

> "We are pleased to see further incremental improvements and simplifications and we plan to migrate our pipelines to use the out of the box tasks soon." – Jonathan Jones, Lead Solutions Architect, [Swiss Re Management Ltd.](https://www.swissre.com/) (Switzerland)

> "Azure Spring Cloud makes Spring Boot applications easy to deploy on Azure and provides wonderful features like App Insights, network isolation using Azure virtual network, blue-green deployments that help us deploy & monitor our applications easily. With every release of Azure Spring Cloud, we are able to find greater ease of integration and deployment of our applications." - Shyam Kumar Sundarakumar, Senior Solutions Architect, [HCL Technologies Ltd](https://www.hcltech.com/) (India).

> "The Azure Pipelines Tasks for Azure Spring Cloud greatly simplifies creating automated CI/CD pipelines to deploy spring boot apps. These new tasks have the net effect of reducing cost, effort and time as well as adding robustness to deploying Spring Boot applications. These services will help Insight to guide their clients in automating their workloads end to end in Azure Spring Cloud." – Dan Lange, Principal Architect, [Insight](https://www.insight.com/en_US/home.html) (United States)

> "With the introduction of Azure Spring Cloud Task for Azure Pipelines, Microsoft has eliminated the pain of developing and maintaining scripts for Blue-Green Deployments for Spring Boot apps in Azure. These new features will allow Kin + Carta to help customers automate the CI/CD pipeline including the creation, assignment and maintenance of Production and Staging Deployments." – Sudeep Moothedath, Enterprise Architect, [Kin + Carta](https://www.kinandcarta.com/en-us/) (United States)

> "Microsoft continues to enhance the support for Spring Cloud! With the addition of the Azure DevOps pipeline task for Azure Spring Cloud Microsoft removes another obstacle in creating a highly flexible CI/CD pipeline for Spring Cloud. The Azure DevOps pipeline tasks allow developers to deploy to Spring Cloud applications to any number of environments while focusing on their application logic and letting Microsoft focus on the infrastructure and maintenance of pipeline tasks." – Armando Guzman, Principal Software Engineer, Unified Commerce, [Raley's](https://www.raleys.com/about/raleys-corporate-fact-sheet/) (United States)

> "We are really happy about the Azure Pipelines Task for Azure Spring Cloud. It is well integrated and makes deployments to Azure Spring Cloud easily by offering the relevant parameters for selection. They are helpful for managing our various app deployments and switch them in multiple environments without writing any CLI statements." – [Georg Deschler](https://www.linkedin.com/in/georg-deschler-2395a52/) and Philipp Stussak (Germany)

## [](#automate-blue-green-application-deployment-strategies)Automate blue-green application deployment strategies

Azure Spring Cloud Standard permits two deployments for every application. Of those two deployments, one receives *Production* traffic. The second deployment is designated for *Staging*. You can implement a simple blue-green strategy with Azure Spring Cloud by creating two fixed deployments for every application and automating deployments to the *Staging* deployment. When you are confident with a deployment in *Staging*, you can set the deployment as *Production*. You can use the new Azure Spring Cloud task in Azure Pipelines to implement this strategy.

**Stage 1 – automate deployments to the Staging deployment.**

![](https://github.com/joshlong/blog-images/blob/master/automate-spring-boot-application-deployments-to-azure/azure-services-for-deploying-java-applications-05-12-2021.jpg?raw=true)

When you run the pipeline, you can watch the progress through Azure Pipelines Logs as illustrated below.

![](https://github.com/joshlong/blog-images/blob/master/automate-spring-boot-application-deployments-to-azure/azure-pipelines-logs.png?raw=true)

**Stage 2: Set the previous deployment to Production.**

![](https://github.com/joshlong/blog-images/blob/master/automate-spring-boot-application-deployments-to-azure/azure-services-for-deploying-java-applications-2-05-12-2021.jpg?raw=true)

For development and test environments, where disruption is not on the critical path, you can either implement blue-green deployment strategies or you can directly deploy applications to deployments that are receiving *Production* traffic. The new Azure Spring Cloud task also supports deploying applications to deployments that are receiving Production traffic.

## [](#automate-end-to-end--from-idea-to-production)Automate end-to-end – from idea to production

When you deploy Spring Boot applications to Azure Spring Cloud and Azure, you can build end-to-end automation from idea to provisioning Azure resources to building Spring Boot applications to deploying those applications to production using any automation tools and platforms of your choice – such as Azure DevOps, Jenkins, Maven or Gradle. You can apply this automation strategy to any environment, including development, test and production, and any region.

Typically, developers automate end-to-end by using multiple pipelines which are broadly classified into three categories:

-   **Provision** – automate provisioning Azure resources using [Terraform](https://github.com/Azure/azure-spring-cloud-reference-architecture/tree/main/terraform/brownfield-deployment), [ARM template](https://github.com/Azure/azure-spring-cloud-reference-architecture/tree/main/ARM/brownfield-deployment) and/or [Azure CLI](https://github.com/Azure/azure-spring-cloud-reference-architecture/tree/main/CLI/brownfield-deployment)
-   **Build** – automate building and storing binary artifacts such as JARs and WARs using Maven or Gradle
-   **Deploy** – automate deployments using Azure Pipelines, GitHub Actions and Azure CLI. Blue-green deployment strategies without any disruption to production traffic are very popular. Developers who use Azure Pipelines can leverage the new Azure Spring Cloud task to automate blue-green deployment strategies.

![](https://github.com/joshlong/blog-images/blob/master/automate-spring-boot-application-deployments-to-azure/automate-from-idea-to-production-2.jpg?raw=true)

## [](#learn-more-about-azure-spring-cloud-and-start-building-and-automating-today)Learn more about Azure Spring Cloud and start building and automating today!

Azure Spring Cloud is jointly built, operated, and supported by Microsoft and VMware. It is a fully managed service for Spring Boot applications. Azure Spring Cloud abstracts away the complexity of infrastructure management and Spring Cloud middleware management, so you can focus on building your business logic and let Azure take care of dynamic scaling, patches, security, compliance, and high availability. With a few steps, you can provision Azure Spring Cloud, create applications, deploy, and scale Spring Boot applications, automate end-to-end and start monitoring in minutes. We’ll continue to bring more developer-friendly and enterprise-ready features to Azure Spring Cloud.

Get started with the [Azure Spring Cloud task](https://docs.microsoft.com/en-us/azure/spring-cloud/how-to-cicd?pivots=programming-language-java) for Azure Pipelines to automate Spring Boot application deployments and these resources below!

## [](#resources)Resources

-   Learn using an [Microsoft Learn module](https://docs.microsoft.com/en-us/learn/modules/azure-spring-cloud-workshop/) or [self-paced workshop](https://github.com/microsoft/azure-spring-cloud-training) on GitHub
-   Learn [more](https://docs.microsoft.com/en-us/azure/spring-cloud/) about implementing solutions on Azure Spring Cloud
-   [Deploy](https://github.com/Azure-Samples/spring-petclinic-microservices) a distributed version of Spring Petclinic built with Spring Cloud
-   Learn about how to [Automate Application Deployments to Azure Spring Cloud](https://docs.microsoft.com/en-us/azure/spring-cloud/how-to-cicd?pivots=programming-language-java)
-   Learn about [Blue-Green Deployment Strategies in Azure Spring Cloud](https://docs.microsoft.com/en-us/azure/spring-cloud/concepts-blue-green-deployment-strategies)
-   Reference document – [Azure Spring Cloud task for Azure Pipelines](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/deploy/azure-spring-cloud?view=azure-devops)
-   Deploy Spring Boot applications by leveraging enterprise best practices – [Azure Spring Cloud Reference Architecture](https://docs.microsoft.com/en-us/azure/spring-cloud/reference-architecture)
-   Migrate your [Spring Boot](https://docs.microsoft.com/en-us/azure/developer/java/migration/migrate-spring-boot-to-azure-spring-cloud), [Spring Cloud](https://docs.microsoft.com/en-us/azure/developer/java/migration/migrate-spring-cloud-to-azure-spring-cloud), and [Tomcat](https://docs.microsoft.com/en-us/azure/developer/java/migration/migrate-tomcat-to-azure-spring-cloud) applications to Azure Spring Cloud
-   Wire Spring applications [to interact with Azure services](https://docs.microsoft.com/en-us/azure/developer/java/spring-framework/)
-   For feedback and questions, please [e-mail us](mailto:AzureSpringCloud-Talk@service.microsoft.com)