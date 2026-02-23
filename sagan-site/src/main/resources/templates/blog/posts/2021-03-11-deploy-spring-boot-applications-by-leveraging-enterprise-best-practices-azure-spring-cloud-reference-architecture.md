---
title: Deploy Spring Boot applications by leveraging enterprise best practices – Azure Spring Cloud Reference Architecture
source: https://spring.io/blog/2021/03/11/deploy-spring-boot-applications-by-leveraging-enterprise-best-practices-azure-spring-cloud-reference-architecture
scraped: 2026-02-23T13:30:10.880Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  March 11, 2021 | 1 Comment
---

# Deploy Spring Boot applications by leveraging enterprise best practices – Azure Spring Cloud Reference Architecture

_Engineering | Josh Long |  March 11, 2021 | 1 Comment_

# [](#deploy-spring-boot-applications-by-leveraging-enterprise-best-practices--azure-spring-cloud-reference-architecture)Deploy Spring Boot applications by leveraging enterprise best practices – Azure Spring Cloud Reference Architecture

Today, we’re excited to announce the availability of the Azure Spring Cloud Reference Architecture. You can get started by deploying the [Azure Spring Cloud Reference Architecture](https://docs.microsoft.com/en-us/azure/spring-cloud/spring-cloud-reference-architecture) to accelerate and secure Spring Boot applications in the cloud at scale using validated best practices.

Over the past year, we worked with many enterprise customers to learn about their scenarios including thoughts on scaling properly, security, deployment, and cost requirements. Many of these customers have thousands of Spring Boot applications running in on-premises data centers. As they migrate these applications to cloud, they need battle-tested architectures that instill confidence to meet the requirements set forth by their IT departments and/or regulatory bodies. In many customer environments, they also need to show direct mappings from architectures to industry-defined security controls and benchmarks. We thank these customers for the opportunity to work with them, and for helping us to build an Azure Spring Cloud Reference Architecture. Using this reference architecture, you can deploy and customize to meet your specific requirements and showcase pre-defined mappings to security controls and benchmarks.

> "The availability of Azure Spring Cloud Reference architecture reduced our internal cycles of researching architecture options and Spring Cloud feature sets, which allowed us to rapidly determine how we would want to implement and scale globally." -- Devon Yost, Enterprise Architect, [Digital Realty Trust](https://www.digitalrealty.com/)

> “Congratulations to you and your team for creating and providing the Azure Spring Cloud Reference Architecture free to all customers. The reference architecture is a great way for users to compare their design to how the experts at Microsoft design deployments. It is incredible for the reference architecture to include deployments using multiple technologies. We were able to compare the reference Terraform implementation and quickly understand the architecture. We have even started testing Azure DNS as highlighted in the architecture to manage our DNS using Infrastructure as Code principles.” -Armando Guzman, Principal Software Engineer, Unified Commerce, [Raley’s](https://www.raleys.com/about/raleys-corporate-fact-sheet/)

## [](#ease-of-deploying-java-applications)Ease of Deploying Java Applications

Azure Spring Cloud is jointly built, operated, and supported by Microsoft and VMware. It is a fully managed service for Spring Boot applications that lets you focus on building the applications that run your business without the hassle of managing infrastructure. The service incorporates Azure compute, network, and storage services in a well-architected design, reducing the number of infrastructure decisions. The Azure Spring Cloud Reference Architecture provides a deployable design that is mapped to industry security benchmarks providing a head start for compliance approval. The implementation and configuration of each service referenced in the architecture was evaluated against security controls to ensure a secure design.

## [](#security-and-managed-virtual-network)Security and Managed Virtual Network

Security is a key tenet of Azure Spring Cloud, and you can secure Spring Boot applications by deploying to Azure Spring Cloud in Managed Virtual Networks (VNETs). With VNETs, you can secure the perimeters around your Spring Boot applications and other dependencies by:

-   Isolating Spring Cloud from the Internet and placing your applications and Azure Spring Cloud in your private networks.
-   Selectively exposing Spring Boot applications as Internet-facing applications.
-   Enabling applications to interact with on-premises systems such as databases, messaging systems, and directories.
-   Controlling inbound and outbound network communications for Azure Spring Cloud.
-   Composing with Azure network resources such as Application Gateway, Azure Firewall, Azure Front Door, and Express Route, and popular network products such as Palo Alto Firewall, F5 Big-IP, Cloudflare, and Infoblox.

## [](#reliable-deployment-patterns)Reliable Deployment Patterns

When you deploy a collection of Azure Resources, including Azure Spring Cloud, in your private network and interconnect these resources with on-premises systems, you can be faced with multiple questions such as:

-   How do you manage costs to maximize the value delivered?
-   How do you build operational processes to keep the system up and running in production?
-   How do you account for performance efficiency where your system can adapt to changes in load?
-   How can your system recover from failures and continue to function?
-   How do you protect applications and data from threats and risks?

To address these questions, you can start with a trial-and-error approach but that takes time. The time it takes to get it right and achieve these outcomes is time not spent on your organizational objectives. A repeatable, tested deployment pattern can help you to address issues from the start.

The Azure Spring Cloud Reference Architecture addresses the following solution design components:

-   **Hub and spoke alignment**. Aligns with the Azure landing zone, which enables application migrations and greenfield development at enterprise-scale in Azure. A landing zone is an environment for hosting your workloads, pre-provisioned through infrastructure as code.
-   **Well-Architected Framework.** Incorporates the guiding pillars of the Azure Well-Architected Framework to improve the quality of a workload. The framework consists of five pillars of architecture excellence: Cost Optimization, Operational Excellence, Performance Efficiency, Reliability, and Security.
-   **Perimeter security.** Secures the perimeter for full egress management, managing secrets and certificates using Azure Key Vault. Wires up with networking resources of your choice, incorporating your IT-team-supplied route tables filled with user-defined network routes. And it is ready for interacting with private links exposed by Azure resources or endpoints exposed by your on-premises systems.
-   **Authorized access to deployed environments.** Includes securing and authorizing access into a deployed environment through a jump host machine with necessary development tools via Azure Bastion.
-   **Monitoring.** Enables observability by wiring up for Application Performance Monitoring (APM) and publishing logs and metrics for all the resources through Azure Monitor. This provides the option to aggregate logs and metrics in an aggregator of your choice, such as Azure Log Analytics, Elastic Stack, or Splunk.
-   **Smoke tests.** Supplies deployment scripts to deploy a line of business system and to smoke test the deployed environment.

![](https://raw.githubusercontent.com/Azure/azure-spring-cloud-reference-architecture/main/images/architecture-public.svg) Figure 1 - the diagram represents a well-architected hub and spoke design for applications selectively exposed as public applications

## [](#start-here)Start Here

This [Azure Spring Cloud Reference Architecture](https://docs.microsoft.com/en-us/azure/spring-cloud/spring-cloud-reference-architecture) is a foundation using a typical enterprise hub and spoke design for the use of Azure Spring Cloud. In the design, Azure Spring Cloud is deployed in a single spoke that is dependent on shared services hosted in the hub.

For an implementation of this architecture, see the [Azure Spring Cloud Reference Architecture repository on GitHub](https://github.com/Azure/azure-spring-cloud-reference-architecture/tree/main/terraform) . Deployment options for this architecture include ready-to-go [Azure Resource Manager (ARM)](https://github.com/Azure/azure-spring-cloud-reference-architecture/tree/main/ARM), [Terraform](https://github.com/Azure/azure-spring-cloud-reference-architecture/tree/main/terraform), and [Azure CLI](https://github.com/Azure/azure-spring-cloud-reference-architecture/tree/main/CLI) scripts. The artifacts in this repository provide groundwork that you can customize for your environment and automated provisioning pipelines.

## [](#meet-the-team)Meet the Team

![](https://raw.githubusercontent.com/Azure/azure-spring-cloud-reference-architecture/main/images/team-mosaic-image.jpg)

This Azure Spring Cloud Reference Architecture is created and maintained by Cloud Solution Architects, Java experts, and content authors at Microsoft, here in alphabetical order and row-wise from left to right:

-   Armen Kaleshian – Cloud Solution Architect
-   Arshad Azeem – Cloud Solution Architect
-   Asir Selvasingh – Architect, Java on Azure
-   Bowen Wan – Software Engineering Manager, Java on Azure
-   Brendan Mitchell – Content Developer
-   David Apolinar – Cloud Solution Architect
-   Dylan Reed – Customer Engineer
-   Karl Erickson – Content Developer
-   Matt Felton – Cloud Solution Architect
-   Ryan Hudson – Cloud Solution Architect
-   Troy Ault – Cloud Solution Architect

## [](#learn-more-about-azure-spring-cloud-and-start-building-today)Learn more about Azure Spring Cloud and start building today!

Azure Spring Cloud abstracts away the complexity of infrastructure management and Spring Cloud middleware management, so you can focus on building your business logic and let Azure take care of dynamic scaling, patches, security, compliance, and high availability. With a few steps, you can provision Azure Spring Cloud, create applications, deploy, and scale Spring Boot applications and start monitoring in minutes. We’ll continue to bring more developer-friendly and enterprise-ready features to Azure Spring Cloud.

We’d love to hear how you are building impactful solutions using Azure Spring Cloud. Get started with the [Azure Spring Cloud Reference Architecture](https://docs.microsoft.com/en-us/azure/spring-cloud/spring-cloud-reference-architecture) and these resources!

### [](#resources)Resources

-   Learn using an [MS Learn module](https://docs.microsoft.com/en-us/learn/modules/azure-spring-cloud-workshop/) or [self-paced workshop](https://github.com/microsoft/azure-spring-cloud-training) on GitHub
-   Learn [more](https://docs.microsoft.com/en-us/azure/spring-cloud/) about implementing solutions on Azure Spring Cloud
-   [Deploy](https://github.com/Azure-Samples/spring-petclinic-microservices) a distributed version of Spring Petclinic built with Spring Cloud
-   Migrate your [Spring Boot](https://docs.microsoft.com/en-us/azure/developer/java/migration/migrate-spring-boot-to-azure-spring-cloud), [Spring Cloud](https://docs.microsoft.com/en-us/azure/developer/java/migration/migrate-spring-cloud-to-azure-spring-cloud), and [Tomcat](https://docs.microsoft.com/en-us/azure/developer/java/migration/migrate-tomcat-to-azure-spring-cloud) applications to Azure Spring Cloud
-   Wire Spring applications to [interact with Azure services](https://docs.microsoft.com/en-us/azure/developer/java/spring-framework/)
-   For feedback and questions, please [e-mail](mailto:AzureSpringCloud-Talk@service.microsoft.com) us.