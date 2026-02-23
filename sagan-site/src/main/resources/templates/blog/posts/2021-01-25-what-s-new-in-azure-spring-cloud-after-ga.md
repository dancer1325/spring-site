---
title: What\'s New in Azure Spring Cloud after GA?
source: https://spring.io/blog/2021/01/25/what-s-new-in-azure-spring-cloud-after-ga
scraped: 2026-02-23T13:33:27.621Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  January 26, 2021 | 2 Comments
---

# What's New in Azure Spring Cloud after GA?

_Engineering | Josh Long |  January 26, 2021 | 2 Comments_

> This post was written by our friend on the Azure Spring Cloud team, the amazing [Kylie Liang (@liangkylie)](https://twitter.com/liangkylie). I interviewed her for the [*Bootiful Podcast*](http://bootifulpodcast.fm) in April 2019, too! -Josh

2020 was a busy year for Azure Spring Cloud service. Microsoft and VMware co-announced Azure Spring Cloud General Availability (GA). We were excited to see how Azure Spring Cloud helped customers focus on code and let us take care of the underlying infrastructure management, operation, and maintenance. We continue to prioritize our work according to customers’ requests and feedback. For example, 7 more regions were enabled, and Azure Spring Cloud service is now available in [18](https://docs.microsoft.com/azure/spring-cloud/spring-cloud-faq?pivots=programming-language-java#in-which-regions-is-azure-spring-cloud-available) regions of Asia Pacific, Australia, Canada, China, Europe, India, Korea, United Arab Emirates, United Kingdom, and the United States. In this blog, I’ll share more about the newest features and enhancements since GA.

## [](#full-apm-capabilities-w-application-insights-java-in-process-agent)Full APM Capabilities w/ Application Insights Java in-process Agent

Application Insights is an extensible Application Performance Management (APM) service for developers and DevOps professionals. With its latest Java in-process agent you can enjoy full APM functionalities besides distributed tracing. For example, you can monitor real-time live metrics without any code changes and obtain insights into application dependencies – MySQL, PostgreSQL, JDBC, Redis, JMS, Kafka, Netty / WebFlux, etc. Learn more [from here](https://spring.io/blog/2021/01/21/bootiful-application-monitoring-with-azure-spring-cloud) about effortlessly monitoring applications and dependencies in Azure Spring Cloud!

As you know, there is always the possibility that a service may be down or having high latency when a service invokes another service. This may lead to exhaustion of the threads as they might be waiting for other requests to complete. With the implementation of the Circuit Breaker pattern, you can prevent failures from cascading and provide fallback behavior until a failing service is restored to normal operation. The new Spring Cloud Circuit Breaker framework unifies all implementations of its metrics data pipeline into Micrometer. Resilience4j is a new option for Spring developers to implement the Circuit Breaker pattern. Resilience4j works well with Spring Boot and using Micrometer libraries, it can produce metrics for monitoring. After enabling [Application Insights java in-process agent and dimension collection for Resilience4j metrics](https://docs.microsoft.com/azure/spring-cloud/spring-cloud-howto-circuit-breaker-metrics), you can collect Spring Cloud Resilience4j Circuit Breaker Metrics and display them in the Metrics blade of Application Insights.

![](https://github.com/joshlong/blog-images/raw/master/whats-new-in-azure-spring-cloud-after-ga-25-jan-2021/Picture1.png)

## [](#get-outbound-public-ip-to-secure-the-communication-with-external-resources)Get outbound public IP to secure the communication with external resources

Some network environments are locked down via a Firewall and allow only whitelisted IP addresses inbound to their internal network. Learn how to get [static outbound public IP addresses](https://docs.microsoft.com/azure/spring-cloud/spring-cloud-howto-outbound-public-ip) of Azure Spring Cloud applications to communicate with external resources, such as databases, storage, and key vaults.

Below is an example to whitelist an Azure Spring Cloud app in Azure Database for MySQL. Azure Database for MySQL provides access security using a firewall to protect your data. You can explicitly add all the outbound IPs of your Azure Spring Cloud apps.

-   To find the outbound public IP addresses currently used by your Azure Spring Cloud service instance in the Azure portal, click **Networking** in your instance's left-hand navigation pane. They are listed in the **Outbound IP addresses** field.  
    ![](https://github.com/joshlong/blog-images/raw/master/whats-new-in-azure-spring-cloud-after-ga-25-jan-2021/Picture2.png)
-   On the MySQL server page, under Settings heading, click **Connection Security** and add above outbound IPs one-by-one.  
    ![](https://github.com/joshlong/blog-images/raw/master/whats-new-in-azure-spring-cloud-after-ga-25-jan-2021/Picture3.png)

## [](#vs-code-extension-for-azure-spring-cloud)VS Code extension for Azure Spring Cloud

Besides feature requests for the Azure Spring Cloud service, we also received requests from developers about how to deploy and manage apps in their familiar environment. You can now use [Azure Toolkit for IntelliJ](https://docs.microsoft.com/azure/spring-cloud/spring-cloud-tutorial-intellij-deploy-apps) or [Azure Spring Cloud extension for VS Code](http://asc-vscode/) to quickly create, manage and deploy apps to Azure Spring Cloud.

![](https://github.com/joshlong/blog-images/raw/master/whats-new-in-azure-spring-cloud-after-ga-25-jan-2021/Picture4.gif)

## [](#what-is-upcoming)What is Upcoming

Security, elastic scaling, and monitoring are key tenets of Azure Spring Cloud. In the following months, you will see more updates for:

-   **Managed Virtual Network**: allows users to be in control of inbound and outbound network communications for Azure Spring Cloud and enables Azure Spring Cloud to interact with systems in on-premises data centers or Azure services in virtual networks.
-   **Autoscale**: automates the upscaling or downscaling of the application based on load or schedule – thus providing cost-efficiency and better performance.
-   **E2E TLS**: allows users to encrypt and securely transmit sensitive data among applications or from app to the backend.
-   **Azure RBAC** for managed Spring Cloud Config Server/Service Registry: allows users to authenticate with AAD (Azure Active Directory) token for accessing to managed Spring Cloud Config Server/Service Registry by Azure Spring Cloud service.
-   **Integration with 3rd party APM solutions**: enables out-of-box experience w/ 3rd party Application Performance Monitoring (APM) tools such as New Relic, App Dynamics and Dynatrace for Azure Spring Cloud apps.

## [](#get-started)Get Started

-   [Step by step tutorials](https://docs.microsoft.com/azure/spring-cloud/spring-cloud-quickstart?tabs=Azure-CLI&pivots=programming-language-java): Learn the basics of Azure Spring Cloud with well-known Spring sample apps.
-   [Online workshop](https://docs.microsoft.com/learn/modules/azure-spring-cloud-workshop/): Go through tasks to deploy Spring Boot microservices to Azure Spring Cloud with Azure database for MySQL.
-   [Troubleshooting tips](https://docs.microsoft.com/azure/spring-cloud/spring-cloud-troubleshoot): Read common tips for troubleshooting Azure Spring Cloud server- and client-side issues.

We are excited about the improving developer experience we are creating for Azure Spring Cloud service. Your feedback has been instrumental in shaping these features, keep the feedback coming. [Contact us](mailto:AzureSpringCloud-Talk@service.microsoft.com) if you have feedback or questions.