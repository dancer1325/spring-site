---
title: Azure Spring Cloud Enterprise is now available in preview
source: https://spring.io/blog/2022/02/16/azure-spring-cloud-enterprise-is-now-available-in-preview
scraped: 2026-02-23T12:50:44.618Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  February 16, 2022 | 1 Comment
---

# Azure Spring Cloud Enterprise is now available in preview

_Engineering | Josh Long |  February 16, 2022 | 1 Comment_

Hi, Spring fans! I wanted to share this post by **Julia Liuson, President, Developer Division at Microsoft**.

When we launched Azure Spring Cloud with VMware in 2019, we set out to solve common challenges developers, IT operators, and DevOps teams face when running Spring Boot applications at scale. Since then we’ve had the opportunity to work with many customers to help them adopt the service including [Bosch](https://www.youtube.com/watch?v=wdwjqXTFFZ0), [Digital Realty](https://devblogs.microsoft.com/java/deploy-spring-boot-applications-by-leveraging-enterprise-best-practices/), [Kroger](https://www.youtube.com/watch?v=EfgiW6xJseM), [Liantis](https://customers.microsoft.com/en-us/story/1449469395802117015-liantis-professional-services-scales-hr-affairs-applications-azure-spring-cloud), [Morgan Stanley](https://www.youtube.com/watch?v=wdwjqXTFFZ0), [National Life](https://techcommunity.microsoft.com/t5/apps-on-azure-blog/secure-communications-end-to-end-for-spring-boot-apps-in-zero/ba-p/3033438), [Raley’s](https://customers.microsoft.com/en-us/story/1388620728739667057-raleys-uses-azure-spring-cloud-to-optimize-scale-and-drive-innovation), and [Swiss Re](https://customers.microsoft.com/en-us/story/1358540087031302788-swiss-re-accelerates-java-app-modernization-using-azure-spring-cloud). They value the fully managed infrastructure of Azure Spring Cloud that lets them focus on their apps, while the service manages dynamic scaling, security patching, out-of-the-box instrumentation for monitoring, and more.

Many organizations are running thousands of Spring Boot applications on-premises and need advanced capabilities to accelerate their Spring modernization projects. Based on our learnings from customer engagements, we built a new Azure Spring Cloud tier—Enterprise—that we [announced at SpringOne 2021](https://azure.microsoft.com/en-us/blog/announcing-azure-spring-cloud-enterprise-fully-managed-vmware-tanzu-components-and-configurability-for-spring-boot-apps/) in private preview. Azure Spring Cloud Enterprise includes commercially supported Spring runtime components to help enterprise customers ship faster and unlock Spring’s full potential. We are thankful to the many customers and partners who participated in the private preview and shared their learnings, and we are excited to announce that Azure Spring Cloud Enterprise is now available in public preview.

Azure Spring Cloud Enterprise represents our continued collaboration with VMware to combine Microsoft’s cloud platform expertise with VMware’s innovative [Tanzu](https://tanzu.vmware.com/tanzu) portfolio. We’re also committed to making it an application platform where you can deploy polyglot applications that are inherently portable across any Azure service, any cloud, or any on-premises system. With Azure Spring Cloud Enterprise, you gain productivity and access to Spring experts for Spring app development and deployments. Azure Spring Cloud Enterprise builds on top of all the features available in Standard tier, including the ability to leverage the broader Azure ecosystem to super charge your Spring Boot applications.

![Figure 1: Azure Spring Cloud tier selection now includes Enterprise](https://github.com/joshlong/blog-images/raw/master/azure-spring-cloud-enterprise/Figure-1-Choose-Azure-Spring-Cloud-Enterprise-no-pricing.jpg) *Figure 1: Azure Spring Cloud tier selection now includes Enterprise*

## [](#1---ship-faster)1 - Ship faster

### [](#deploy-and-manage-spring-and-polyglot-applications)Deploy and manage Spring and polyglot applications

The [fully managed](https://docs.microsoft.com/en-us/azure/spring-cloud/how-to-enterprise-build-service?tabs=azure-portal) VMware Tanzu Build Service in Azure Spring Cloud Enterprise automates container creation, management, and governance at enterprise scale using open source [Cloud Native Buildpacks](https://buildpacks.io/) and commercial [VMware Tanzu Buildpacks](https://docs.pivotal.io/tanzu-buildpacks/). Tanzu Build Service offers a higher-level abstraction for building apps and provides a balance of control that reduces the operational burden on developers and supports enterprise IT operators who manage applications at scale. You can configure what Buildpacks to apply and build Spring applications and polyglot applications that run alongside Spring applications on Azure Spring Cloud.

Tanzu Buildpacks make it easier to [build](https://docs.microsoft.com/en-us/azure/spring-cloud/how-to-enterprise-deploy-non-java-apps?) Spring, Java, NodeJS, Python, Go, and .NET Core applications and configure application performance monitoring agents such as Application Insights, New Relic, Dynatrace, AppDynamics, and Elastic.

### [](#effortlessly-route-client-requests-to-applications)Effortlessly route client requests to applications

You can easily manage and discover request routes and APIs exposed by applications using the [fully managed](https://docs.microsoft.com/en-us/azure/spring-cloud/how-to-use-enterprise-spring-cloud-gateway) Spring Cloud Gateway for VMware Tanzu and API portal for VMware Tanzu.

Spring Cloud Gateway for Tanzu effectively routes diverse client requests to applications in Azure Spring Cloud, Azure and/or on-premises, and addresses cross-cutting considerations for applications behind the Gateway such as securing, routing, rate limiting, caching, monitoring, resiliency and hiding applications. You can configure:

-   Single sign-on integration with your preferred identity provider without any additional code or dependencies
-   Dynamic routing rules to applications without any application redeployment
-   Request throttling without any backing services

API portal for VMware Tanzu provides API consumers the ability to find and view API route details exposed by Spring Cloud Gateway for Tanzu and test API requests.

![Fully managed Spring Cloud Gateway for Tanzu routes diverse client requests to applications in Azure Spring Cloud, Azure and/or on-premises systems](https://raw.githubusercontent.com/joshlong/blog-images/master/azure-spring-cloud-enterprise/Figure-2-Fully-Managed-Tanzu-Spring-Cloud-Gateway.jpg) *Figure 2 – Fully managed Spring Cloud Gateway for Tanzu routes diverse client requests to applications in Azure Spring Cloud, Azure and/or on-premises systems*

![Figure 3 – API portal for VMware Tanzu visualizes APIs that are accessible from Spring Cloud Gateway for Tanzu and other OpenAPI-compliant sources](https://github.com/joshlong/blog-images/raw/master/azure-spring-cloud-enterprise/Figure-3-API-Portal-for-VMware-Tanzu.jpg) *Figure 3 – API portal for VMware Tanzu visualizes APIs that are accessible from Spring Cloud Gateway for Tanzu and other OpenAPI-compliant sources*

### [](#flexible-and-configurable-vmware-tanzu-components)Flexible and configurable VMware Tanzu components

With Azure Spring Cloud Enterprise, customers can use fully managed VMware Tanzu components on Azure. Customers can select which VMware Tanzu components they want to use in their environment during Enterprise instance creation. Tanzu Build Service, Spring Cloud Gateway for Tanzu, API portal for VMware Tanzu, Application Configuration Service for VMware Tanzu, and VMware Tanzu Service Registry are available during public preview.

VMware Tanzu components deliver increased value to customers such that you can:

-   Grow your enterprise grade application portfolio from a few applications to thousands with end-to-end observability while delegating operational complexity to Microsoft and VMware
-   Lift and shift Spring applications across Azure Spring Cloud and any other compute environment
-   Control your build dependencies, deploy polyglot applications, and deploy Spring Cloud middleware components as needed

Microsoft and VMware will continue to add more enterprise-grade features, including Tanzu components such as Application Live View for VMware Tanzu, VMware Tanzu Application Accelerator for VMware Tanzu, and Spring Cloud Data Flow for VMware Tanzu\*.

*\* The Azure Spring Cloud Enterprise roadmap is not confirmed and is subject to change.*

## [](#2---unlock-springs-full-potential-with-long-term-support-lts)2 - Unlock Spring’s full potential with Long-Term Support (LTS)

Azure Spring Cloud Enterprise includes VMware Spring Runtime Support for application development and deployments. This support gives you access to Spring experts, enabling you to unlock the full potential of the Spring ecosystem and develop and deploy applications faster.

![Figure 3 – API portal for VMware Tanzu visualizes APIs that are accessible from Spring Cloud Gateway for Tanzu and other OpenAPI-compliant sources](https://github.com/joshlong/blog-images/raw/master/azure-spring-cloud-enterprise/Figure-3-API-Portal-for-VMware-Tanzu.jpg) *Figure 3 – API portal for VMware Tanzu visualizes APIs that are accessible from Spring Cloud Gateway for Tanzu and other OpenAPI-compliant sources*

![Figure 4 – Do more with Spring framework through world-class support for Spring projects](https://raw.githubusercontent.com/joshlong/blog-images/master/azure-spring-cloud-enterprise/Figure-4-Unlock-Springs-Full-Potential.jpg) *Figure 4 – Do more with Spring framework through world-class support for Spring projects*

Typically, open source Spring project minor releases are supported for a minimum of 12 months from the date of initial release. In Azure Spring Cloud Enterprise, Spring project minor releases will receive commercial support for a minimum of 24 months\* from the date of initial release through the VMware Spring Runtime Support entitlement. This extended support ensures the security and stability of your Spring application portfolio even after the open source end-of-life dates.

\* You can find the current support timelines [for Spring projects at the Spring Initializr - start.spring.io](https://spring.io/)

![Figure 5 – Commercial support timeline for Spring Boot (link to source)](https://raw.githubusercontent.com/joshlong/blog-images/master/azure-spring-cloud-enterprise/Figure-5-Example-Commercial-Support-for-Spring-Boot.jpg) *Figure 5 – Commercial support timeline for Spring Boot (link to source)*

## [](#3---fully-integrated-into-the-azure-and-the-java-ecosystem)3 - Fully integrated into the Azure and the Java ecosystem

Azure Spring Cloud, including Enterprise tier, runs on Azure in a fully managed environment. You get all the benefits of Azure and the Java ecosystem, and the experience is familiar and intuitive:

Common development practices

Azure ecosystem

Create service instances using a provisioning tool

Azure Portal, CLI, ARM Template, Bicep, or Terraform

Automate environments and application deployments

GitHub, Azure DevOps, GitLab, and Jenkins

Monitor end-to-end using any tool and platform

Application Insights, Azure Log Analytics, Splunk, Elastic, New Relic, Dynatrace, or AppDynamics

Connect Spring applications and interact with your cloud services

Spring integrations with Azure services for data, messaging, eventing, cache, storage, and directories

Securely load app secrets and certificates

Azure Key Vault

Use familiar development tools

IntelliJ, VS Code, Eclipse, Spring Tool Suite, Maven, or Gradle

For example, after you create your Enterprise service instance and deploy your applications, you can easily monitor with Application Insights or any other application performance management tools of your choice.

![Figure 6 – Application Transactions visible through Application Insights Application Map](https://github.com/joshlong/blog-images/raw/master/azure-spring-cloud-enterprise/Figure-6-Example-Application-Map-in-Application-Insights.jpg) *Figure 6 – Application Transactions visible through Application Insights Application Map*

## [](#4---get-started-today)4 - Get started today!

Azure Spring Cloud Enterprise delivers even more productivity, and you can leverage Spring experts to make your projects even more successful. We would love to see you try Enterprise and share your feedback – [start now](https://docs.microsoft.com/en-us/azure/spring-cloud/quickstart-provision-service-instance-enterprise?tabs=azure-portal).

You can also learn more about Azure Spring Cloud Enterprise Public Preview announcement [by VMware](https://tanzu.vmware.com/).