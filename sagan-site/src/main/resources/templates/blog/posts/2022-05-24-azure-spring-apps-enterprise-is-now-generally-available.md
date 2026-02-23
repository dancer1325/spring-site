---
title: Azure Spring Apps Enterprise is now generally available
source: https://spring.io/blog/2022/05/24/azure-spring-apps-enterprise-is-now-generally-available
scraped: 2026-02-23T12:40:37.007Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  May 24, 2022 | 0 Comments
---

# Azure Spring Apps Enterprise is now generally available

_Engineering | Josh Long |  May 24, 2022 | 0 Comments_

Hi, Spring fans! This is a guest post by Julia Liuson, President, Developer Division, Microsoft

## [](#azure-spring-cloud-is-now-azure-spring-apps)Azure Spring Cloud is now Azure Spring Apps

We launched Azure Spring Cloud with VMware in 2019 to solve common challenges developers, IT operators, and DevOps teams face when running Spring Boot applications at scale. Since then we’ve helped many customers adopt the service including [Bosch](https://youtu.be/wdwjqXTFFZ0), [Digital Realty](https://devblogs.microsoft.com/java/deploy-spring-boot-applications-by-leveraging-enterprise-best-practices/), [FedEx](https://mybuild.microsoft.com/en-US/sessions/71ed338e-5f85-44d8-a225-6210fdbdd06d?source=sessions), [Kroger](https://www.youtube.com/watch?v=EfgiW6xJseM), [Liantis](https://customers.microsoft.com/en-us/story/1449469395802117015-liantis-professional-services-scales-hr-affairs-applications-azure-spring-cloud), [Morgan Stanley](https://www.youtube.com/watch?v=wdwjqXTFFZ0), [National Life](https://techcommunity.microsoft.com/t5/apps-on-azure-blog/secure-communications-end-to-end-for-spring-boot-apps-in-zero/ba-p/3033438), [Raley’s](https://customers.microsoft.com/en-us/story/1388620728739667057-raleys-uses-azure-spring-cloud-to-optimize-scale-and-drive-innovation), and [Swiss Re](https://customers.microsoft.com/en-us/story/1358540087031302788-swiss-re-accelerates-java-app-modernization-using-azure-spring-cloud). They value the fully managed infrastructure of Azure Spring Cloud that lets them focus on their apps, while the service manages dynamic scaling, security patching, out-of-the-box instrumentation for monitoring, and more. Through customer feedback. we have expanded the capabilities of the service, including the Enterprise tier that we announced in preview at SpringOne 2021. Azure Spring Cloud is a fully-featured platform for all types of Spring applications, and to better reflect this the service is now Azure Spring Apps.

  

> "FedEx launched a Global Delivery Prediction Platform that dynamically predicts estimated time of arrival on more than 16 million shipments a day. We integrate these machine learning-based insights back into our core systems to optimize our operations and to give our customers greater visibility than ever before. Exposure and consumption of these insights is critical, and we chose Azure Spring Apps as our principal compute for high-volume processing because of its ease of use, scale, and integrations into the Azure ecosystem. Our collaboration with Microsoft and VMware has delivered an amazing service for fast-moving Java teams to deliver impactful solutions for our customers." - Tony Kreager, Senior Vice President, Data Engineering & Data Science, [FedEx Dataworks](https://www.fedex.com/en-us/home.html)

  

> “Azure Spring Apps is at the center of our new API platform and provides us a simple way to get our Spring applications to production quickly and securely. We had been searching for a long time for an off-the-shelf solution that would fit our requirements before Microsoft and VMware finally got together to launch this solution. Azure Spring Apps allows us to concentrate on the business logic of our applications and takes away the complexity of delivering those applications to our customers.” -- Claus Lund, Senior Infrastructure Engineering Lead, [National Life Group](https://www.nationallife.com/)

  

> Azure Spring Apps is a critical component of Digital Realty API and Portal offering. Azure Spring Apps managed offering allowed us to rapidly deploy microservice applications and reduce time to market. We have migrated legacy applications to microservices based architecture in a record time. Coupled with the REST APIs that we have developed, we have a truly powerful, resilient, and global platform. We are very excited to see the continued development of the offering and collaboration between Microsoft and VMware and how they benefit our teams and Java developers everywhere. -- Raj Sriramoju, Director API Engineering, [Digital Realty Trust](https://www.digitalrealty.com/)

## [](#azure-spring-apps-enterprise-tier-is-now-generally-available)Azure Spring Apps Enterprise tier is now generally available

Many organizations are running thousands of Spring Boot applications on-premises and need advanced capabilities to accelerate their Spring modernization projects. Based on our learnings from customer engagements, we built a new Azure Spring Apps tier—[Enterprise](https://docs.microsoft.com/en-us/azure/spring-cloud/quickstart-provision-service-instance-enterprise?tabs=azure-portal) —that we announced at [SpringOne 2021](https://azure.microsoft.com/en-us/blog/announcing-azure-spring-cloud-enterprise-fully-managed-vmware-tanzu-components-and-configurability-for-spring-boot-apps/). The Enterprise tier includes commercially supported Spring runtime components to help enterprise customers ship faster and unlock Spring’s full potential. We are thankful to many customers and partners who participated in the previews and shared their learnings, and we are excited to announce that the Azure Spring Apps Enterprise tier will be generally available in early June 2022.

The Enterprise tier represents our continued collaboration with VMware to combine Microsoft’s cloud platform expertise with VMware’s innovative [Tanzu](https://tanzu.vmware.com/tanzu) portfolio. We’re also committed to making it an application platform where you can deploy polyglot applications that are inherently portable across any Azure service, any cloud, or any on-premises system.

With Azure Spring Apps Enterprise, you gain productivity and access to Spring experts for Spring app development and deployments. Azure Spring Apps Enterprise builds on top of all the features available in the Standard tier, including the ability to leverage the broader Azure ecosystem to supercharge your Spring Boot applications.

.\_Azure Spring Apps Enterprise tier selection in the Azure Portal\_

Azure Spring Apps Enterprise is now available across 24 Azure Regions in Africa, Asia-Pacific, Australia, Americas, Europe, China, India, Japan, Korea, and the United Arab Emirates. We are in the process of expanding the service to multiple newer European Regions in Switzerland and Germany.

## [](#1---ship-faster)1 - Ship Faster

### [](#deploy-and-manage-spring-and-polyglot-applications)Deploy and manage Spring and polyglot applications

The [fully managed](https://docs.microsoft.com/en-us/azure/spring-cloud/how-to-enterprise-build-service) VMware Tanzu Build Service in the Enterprise tier automates container creation, management, and governance at enterprise scale using open source [Cloud Native Buildpacks](https://buildpacks.io/) and commercial [VMware Tanzu Buildpacks](https://docs.pivotal.io/tanzu-buildpacks/). These Buildpacks make it easier to [build](https://docs.microsoft.com/en-us/azure/spring-cloud/how-to-enterprise-deploy-non-java-apps?) Spring, Java, NodeJS, Python, Go, and .NET Core applications and configure application performance monitoring agents such as Application Insights, New Relic, Dynatrace, AppDynamics, and Elastic.

### [](#effortlessly-route-client-requests-to-applications)Effortlessly route client requests to applications

You can easily manage and discover request routes and APIs exposed by applications using the [fully managed](https://docs.microsoft.com/en-us/azure/spring-cloud/how-to-use-enterprise-spring-cloud-gateway) Spring Cloud Gateway for VMware Tanzu and API portal for VMware Tanzu.

Spring Cloud Gateway for Tanzu effectively routes diverse client requests to applications in Azure Spring Apps, Azure, and or on-premises, and addresses cross-cutting considerations for applications behind the Gateway such as securing, routing, rate limiting, caching, monitoring, resiliency, and hiding applications.

API portal for VMware Tanzu provides API consumers the ability to find and view API route details exposed by Spring Cloud Gateway for Tanzu and test API requests.

![](https://raw.githubusercontent.com/joshlong/blog-images/master/azure-spring-apps-enterprise-generally-available/API-portal.jpg) \_Figure 1 – API portal for VMware Tanzu visualizes APIs that are accessible from Spring Cloud Gateway for Tanzu and other OpenAPI-compliant sources\_

### [](#flexible-and-configurable-vmware-tanzu-components)Flexible and configurable VMware Tanzu components

With the Azure Spring Apps Enterprise tier, customers can use fully managed VMware Tanzu components on Azure. Customers can select which VMware Tanzu components they want to use in their environment during Enterprise instance creation. Tanzu Build Service, Spring Cloud Gateway for Tanzu, API portal for VMware Tanzu, Application Configuration Service for VMware Tanzu, and VMware Tanzu Service Registry are currently available.

VMware Tanzu components deliver increased value to customers to:

-   Grow your enterprise grade application portfolio from a few applications to thousands with end-to-end observability while delegating operational complexity to Microsoft and VMware
-   Lift and shift Spring applications across Azure Spring Apps and any other compute environment
-   Control your build dependencies, deploy polyglot applications, and deploy Spring Cloud middleware components as needed

Microsoft and VMware will continue to add more enterprise-grade features, including Tanzu components such as Application Live View for VMware Tanzu, VMware Tanzu Application Accelerator for VMware Tanzu, and Spring Cloud Data Flow for VMware Tanzu (The Azure Spring Apps Enterprise roadmap is not confirmed and is subject to change).

## [](#2---unlock-springs-full-potential-with-long-term-support-lts)2 - Unlock Spring’s full potential with Long-Term Support (LTS)

Enterprise tier includes VMware Spring Runtime Support for application development and deployments. This support gives you access to Spring experts, enabling you to unlock the full potential of the Spring ecosystem and develop and deploy applications faster.

Typically, open-source Spring project minor releases are supported for a minimum of 12 months from the date of the initial release of these projects. In Azure Spring Apps Enterprise, Spring project minor releases will receive commercial support for a minimum of 24 months\* from the date of initial release through the VMware Spring Runtime Support entitlement. This extended support ensures the security and stability of your Spring application portfolio even after the open-source end-of-life dates.

![](https://raw.githubusercontent.com/joshlong/blog-images/master/azure-spring-apps-enterprise-generally-available/Commercial-support-timeline-for-Spring-Boot.jpg) \_Figure 2 - Commercial support timeline for Spring Boot\_

-   You can find the current support timelines for [Spring projects here](https://spring.io/)

## [](#3---fully-integrated-into-azure-and-java-ecosystem)3 - Fully integrated into Azure and Java ecosystem

Azure Spring Apps, including the Enterprise tier, runs on Azure in a fully managed environment. You get all the benefits of Azure and the Java ecosystem, and the experience is familiar and intuitive.

### [](#expanding-capabilities-for-applications)Expanding Capabilities for Applications

If you need super scalable and available backend services, you are covered. We have made it possible to leverage the full power of Azure from your applications in Azure Spring Apps. We provide mechanisms for Spring apps to connect and interact with databases, cache, storage, messaging, eventing, and directory services in Azure using Spring Cloud Azure integrations, open-source libraries and database drivers, and Azure SDK for Java. Your apps can interact with your on-premises systems and external services.

![](https://raw.githubusercontent.com/joshlong/blog-images/master/azure-spring-apps-enterprise-generally-available/Spring-Cloud-Azure-4.0-in-colors.jpg) \_Figure 3 – Spring Cloud Azure integrations for Azure services\_

### [](#connect-applications-to-azure-services--service-connector)Connect Applications to Azure Services – Service Connector

You can connect applications on Azure-to-Azure services for databases, cache, storage, messaging, and eventing using the Service Connector.

The Service Connector is designed for ease of use. In Azure Spring Apps, you can point the Service Connector to any Azure service and the Service Connector will guide you to connect an application seamlessly. You can automate these connections using Terraform, ARM Template, or Bicep.

### [](#zero-trust---secure-network)Zero-Trust - Secure Network

Security is a key tenet of Azure services, and you can secure Java applications by deploying to Azure services in Managed Virtual Networks (VNETs), including Azure Spring Apps. This way, you can secure the perimeters around your Spring Boot applications and other dependencies by:

-   Isolating Azure Spring Apps from the Internet and placing your applications and Azure Spring Apps in your private or corporate networks.
-   Selectively exposing applications as Internet-facing applications.
-   Enabling applications to interact with on-premises systems such as databases, messaging systems, and directories.
-   Controlling ingress and egress for applications and Azure Spring Apps.
-   Composing with Azure network resources such as Application Gateway, Azure Firewall, Azure Front Door, and Express Route, and popular network products such as Palo Alto Firewall, F5 Big-IP, Cloudflare, and Infoblox.

The Azure Spring Apps Reference Architecture shown below is a foundation using a typical enterprise hub and spoke design. Azure Spring Apps is deployed in a single spoke that is dependent on shared services hosted in a hub.

![](https://raw.githubusercontent.com/joshlong/blog-images/master/azure-spring-apps-enterprise-generally-available/Azure-Spring-Apps-Enterprise-Reference-Architecture.jpg) \_Figure 4 – shows a well-architected hub and spoke design for applications selectively exposed as public applications\_

### [](#zero-trust---secure-communications-end-to-end)Zero-Trust - Secure Communications End-to-end

You can secure communications end-to-end or terminate transport-level security at any communication point for application. You can automate the provisioning and configuration for all the Azure resources needed for securing communications.

Based on the principle of "never trust, always verify and credential-free", Zero Trust helps to secure all communications by eliminating unknown and un-managed certificates, and only trust certificates that are shared by verifying identity prior to granting access to those certificates. You can simply configure applications in Azure Spring Apps to securely load certificates from Azure Key Vault into application memory using managed identities and Azure role-based access control.

### [](#zero-trust--manage-secrets-using-key-vault)Zero-Trust – Manage Secrets Using Key Vault

Every application has properties that connect it to its environment and supporting services, things like databases, logging and monitoring tools, messaging platforms, and many other things. Each requires a way to locate and access it, often in the form of URLs and credentials and if these secrets are exposed, that critical information can be used to access key customer data. Even if this data were not protected by law – and it is in nearly all parts of the globe, for a very good reason – protecting customer data from leakage should still be of utmost importance to all of us. In Azure Spring Apps, applications can be configured to directly load secrets into memory from Key Vault using managed identities and Azure role-based access control – Zero-Trust and Zero-Code!

### [](#end-user-authentication-and-authorization)End-user Authentication and Authorization

Securing access to applications is critical. You can secure access to your application using organizational identities from Azure Active Directory and social identities in directories such as Facebook, Twitter, and Gmail. You can use Microsoft Authentication Library for Java or Spring Boot Starter for Azure Active Directory. Enable end-users to sign in or authenticate. Then, they can be authorized. Or you can simply configure Single Sign-On (SSO) using the managed Spring Cloud Gateway.

### [](#monitor-end-to-end)Monitor end-to-end

You can monitor your Spring workloads end-to-end using any tool and platform of your choice - including App Insights, Log Analytics, New Relic, Dynatrace, AppDynamics, Elastic, or Splunk.

![](https://raw.githubusercontent.com/joshlong/blog-images/master/azure-spring-apps-enterprise-generally-available/monitor-end-to-end-using-any-tool-and-platform.jpg) \_Figure 5 – Application Transactions visible through Application Insights Application Map\_

### [](#automate-end-to-end)Automate end-to-end

You can build end-to-end automation from idea to production using a wide range of automation tools and platforms. Typically, we see our customers create pipelines that are broadly classified into 3 categories:

-   Provisioning pipelines - provision Azure resources using Terraform, ARM templates, Bicep, or the Azure CLI, creating repeatable scripts to spin up and down environments consistently.
-   Build pipelines - use Maven or Gradle to build and store JARs into artifactory like Nexus, JFrog, Azure Artifacts, etc.
-   Deployment pipelines - use GitHub Actions, Azure Pipelines, and the Azure CLI to automate your deployments – including blue-green deployments to minimize disruption.

### [](#continue-to-leverage-existing-practices)Continue to leverage existing practices

As you migrate or build, and scale Spring apps on Azure, you can leverage your existing investments in network, monitoring, automation, identity providers, on-premises systems, development and build tools, and app libraries:

-   Network – F5, Palo Alto, Cloudflare, Checkpoint, Infoblox, etc.
-   Monitoring - New Relic, Dynatrace, AppDynamics, Elastic, Splunk, etc.
-   Automation – GitHub Actions, Azure Pipelines, Jenkins, GitLab, etc.
-   Identity providers – Azure Active Directory, ForgeRock, Auth0, Ping, Okta, etc.
-   On-premises systems – databases (say Oracle DB, IBM DB2), messaging (say IBM MQ, TIBCO EMS), eventing (say Kafka), directories (say Active Directory, OpenLDAP, IBM ID), mail, FTP, etc.
-   Development tools – IntelliJ, VS Code, Eclipse, Spring Tool Suite, Maven, Gradle, etc.

## [](#4---get-started-today)4 - Get started today!

Azure Spring Apps Enterprise tier delivers even more productivity, and you can leverage Spring experts to make your projects even more successful. We love to hear how you are building impactful solutions using Enterprise and continue to learn from you.

\*\*Start now -- [aka.ms/spring-apps-enterprise](https://aka.ms/spring-apps-enterprise) \*\*

You can also learn more about Azure Spring Apps Enterprise tier GA [announcement by VMware](https://aka.ms/azure-spring-apps-is-now-generally-available).

#### [](#additional-resources)Additional Resources

-   Learn using an [MS Learn module](https://docs.microsoft.com/en-us/learn/modules/azure-spring-cloud-workshop/) or [self-paced workshop](https://github.com/microsoft/azure-spring-cloud-training) on GitHub
-   [Deploy](https://aka.ms/Fitness-Store) Fitness Store Spring Boot apps to Azure
-   [Deploy](https://aka.ms/Deploy-Spring) Animal Rescue Spring Boot apps to Azure
-   Learn [more](https://docs.microsoft.com/en-us/azure/spring-cloud/) about implementing solutions on Azure Spring Apps
-   Deploy Spring Boot applications by leveraging enterprise best practices – [Azure Spring Apps Reference Architecture](https://docs.microsoft.com/en-us/azure/spring-cloud/reference-architecture)
-   Migrate your [Spring Boot](https://docs.microsoft.com/en-us/azure/developer/java/migration/migrate-spring-boot-to-azure-spring-cloud), [Spring Cloud](https://docs.microsoft.com/en-us/azure/developer/java/migration/migrate-spring-cloud-to-azure-spring-cloud), and [Tomcat](https://aka.ms/migrate-tomcat-to-azure-spring-cloud-service) applications to Azure Spring Apps
-   Wire Spring applications [to interact with Azure services](https://docs.microsoft.com/en-us/azure/developer/java/spring-framework/)
-   For feedback and questions, please [e-mail](mailto:AzureSpringCloud-Talk@service.microsoft.com) us.