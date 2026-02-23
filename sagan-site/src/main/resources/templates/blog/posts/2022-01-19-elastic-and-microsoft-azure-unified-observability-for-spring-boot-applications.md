---
title: Elastic and Microsoft Azure - Unified Observability for Spring Boot applications
source: https://spring.io/blog/2022/01/19/elastic-and-microsoft-azure-unified-observability-for-spring-boot-applications
scraped: 2026-02-23T12:55:25.186Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  January 19, 2022 | 0 Comments
---

# Elastic and Microsoft Azure - Unified Observability for Spring Boot applications

_Engineering | Josh Long |  January 19, 2022 | 0 Comments_

Hi, Spring fans! Today, we are excited to announce the availability of Elastic integrations for unified observability of Spring Boot applications on Azure. You can seamlessly ship Microsoft Azure Spring Cloud [logs and metrics](http://aka.ms/Start-Elastic-APM) into Elastic, [instrument Spring Boot apps](https://docs.microsoft.com/en-us/azure/spring-cloud/how-to-elastic-apm-java-agent-monitor), and monitor every step of your cloud journey. And gain a holistic view across Spring Boot applications and other logs and metrics in your cloud and on-premises environments.

Over the past two years, we worked with many enterprise customers to learn about the scenarios they face. Many of these customers have thousands of Spring Boot applications running in on-premises data centers. As they migrate these applications to the cloud, they need to aggregate logs and metrics from these applications and instrument them for application performance monitoring (APM) using solutions their developers are familiar with and have been using for years. In addition, they must ensure continuity for existing server-side software that are already shipping logs and metrics and are pre-instrumented for end-to-end monitoring using systems like Elastic. You can gain deeper application visibility, reduce the time spent on root cause analysis, and provide a consistent customer experience in your web and mobile applications. A [2021 survey learnings](https://techcommunity.microsoft.com/t5/apps-on-azure-blog/2021-report-how-developers-migrate-spring-apps-to-the-cloud/ba-p/3021421) also indicated that “end-to-end monitoring” is the second biggest challenge DevOps and IT managers face as they migrate Spring Boot applications to the cloud. With the integration of Azure Spring Cloud logs and metrics in Elastic, you can streamline your journey and easily instrument your Spring Boot applications for unified observability.

Elastic can now seamlessly ingest logs and metrics from Microsoft Azure Spring Cloud so that DevOps and SREs can monitor their Spring Boot applications— whether in the [cloud, on-premises or in hybrid environments](https://www.elastic.co/observability/cloud-monitoring) — and remove monitoring silos to increase operational efficiency and developer productivity. DevOps and SREs can monitor both Spring Boot logs and application metrics across all environments by automatically shipping them to Elastic. Teams can also correlate and add context to their Spring data with other observability data sets across their environments for holistic end-to-end monitoring.

“*Elastic is dedicated to helping organizations observe, understand, and optimize their applications and infrastructure,*” said **Steve Kearns, Vice President of Product Management, Elastic**, "*Through this native integration between Azure Spring Cloud and the Elastic Observability solution, it's easier than ever to bring together a unified view of your Spring Boot application, across application, infrastructure, and user data.*"

"*Microsoft is committed to making it easier for customers to modernize their Java applications in the cloud. The expanded native integration of Elastic on Azure includes support for Azure Spring Cloud that enables customers to simply achieve end-to-end observability of their Spring Boot applications.*" — **Julia Liuson, President, Developer Division, Microsoft**

## [](#shipping-azure-spring-cloud-logs-to-elastic)Shipping Azure Spring Cloud logs to Elastic

Native integration makes it seamless to ship logs to an Elastic observability solution. Once data is shipped into Elastic, you can jumpstart analysis in minutes with turnkey visualizations and dashboards.

![](https://raw.githubusercontent.com/joshlong/blog-images/master/elastic-01-2022/Diagnostic-setting-Microsoft-Azure.png) Figure 1: Diagnostic Setting blade for Azure Spring Cloud Service.

## [](#instrumenting-spring-boot-applications)Instrumenting Spring Boot applications

Run a "provisioning" automation for a complete hands-off experience for instrumenting and monitoring any new applications that you create and deploy using Elastic’s Terraform or ARM template or Bicep. Or you can run it on-demand using the Azure CLI for greater flexibility and control.

![](https://raw.githubusercontent.com/joshlong/blog-images/master/elastic-01-2022/azure-cli--instrument-elastic-apm.jpg)

## [](#analyzing-spring-boot-application-performance)Analyzing Spring Boot application performance

After instrumenting and shipping logs from your Spring Boot application, you can use Elastic Observability to monitor, analyze, and search your data to keep your applications performing. You can also use the out-of-the-box Azure Spring Cloud dashboards within Elastic Observability to gain instant insights from your Azure Spring Cloud logs.

![](https://raw.githubusercontent.com/joshlong/blog-images/master/elastic-01-2022/elastic-kibana-asc-dashboard-full.png) Figure 2: Out-of-the-box dashboards for Azure Spring Cloud Service logs in Elastic Observability.

With Elastic APM, you can analyze and search your application performance data.

![](https://raw.githubusercontent.com/joshlong/blog-images/master/elastic-01-2022/elastic-apm-service-map.PNG)

Figure 3: Service Map for customer-service from Spring Petclinic Application

You can also use Elastic APM to look at JVM metrics to understand heap memory usage, system memory usage, CPU usage and other metrics that help you make evidence-based capacity planning decisions.

![](https://raw.githubusercontent.com/joshlong/blog-images/master/elastic-01-2022/elastic-apm-customer-service-jvm-metrics.png)

Figure 4: JVM metrics in Elastic APM for customers-service

Utilizing the distributed tracing capabilities of Elastic APM, you can drill further into the performance of your applications to understand which transactions impact your customers the most and where in those transactions is the most time being spent.

![](https://raw.githubusercontent.com/joshlong/blog-images/master/elastic-01-2022/elastic-apm-customer-service-latency-distribution.png) Figure 5: Distributed tracing in Elastic APM for customers-service’s GET owners operation.

## [](#machine-learning-automatically-detects-anomalies)Machine learning automatically detects anomalies

With Elastic’s [built-in machine learning](https://www.elastic.co/what-is/elasticsearch-machine-learning) capabilities, extracting new insights from your Azure Spring Cloud logs is as simple as clicking a button — making machine learning truly operational. The Elastic Stack processes logs upon ingestion, ensuring that you have the metadata you need to identify root causes or add context to any event. Built-in tools like Data Visualizer help you find the jobs you are looking for and identify fields in your logs that would pair well with machine learning. You can derive actionable insights from your logs and APM data with the rich alerting and anomaly detection capabilities within Elastic Observability. For example, you can uncover irregular log rates, or unusual behavior in the response times of your application in Azure Spring Cloud.

![](https://raw.githubusercontent.com/joshlong/blog-images/master/elastic-01-2022/elastic-machine-learning-logs.PNG) Figure 6: Anomaly Explorer in Elastic.

## [](#use-the-same-logs-to-stop-threats-at-cloud-scale)Use the same logs to stop threats at cloud scale

Since Elastic offers a common schema and single repository, the same observability data from Spring applications and other data sets can also be used for extended detection and response (XDR) to drive mean time to detection towards zero. [Elastic Security](https://www.elastic.co/security) brings together SIEM and endpoint security, allowing organizations to ingest and retain large volumes of data from diverse sources, store, and search data for longer, and augment threat hunting with detections and machine learning.

## [](#focus-on-customer-value-while-microsoft-and-elastic-keep-the-lights-on)Focus on customer value while Microsoft and Elastic keep the lights on

The native integration of Elastic in Azure is the easiest and fastest way to get started with Elastic on Azure. Quickly ship your Azure Spring Cloud logs and APM data to Elastic, access any type of data, from anywhere, when you need it the most — whether your data is on-prem, or in multi-cloud or hybrid cloud environments. This holistic view helps streamline migrating your Spring Boot applications to the cloud. Plus, Elastic Cloud [handles the security, maintenance, and upkeep](https://www.elastic.co/cloud/shared-responsibility), allowing you to drive your business forward with increased visibility, improved operations, and cyber resilience.

## [](#build-your-solutions-and-monitor-them-today)Build your solutions and monitor them today!

Azure Spring Cloud is jointly built, operated, and supported by Microsoft and VMware. It is a fully managed service for Spring Boot applications that abstracts away the complexity of infrastructure and Spring Cloud middleware management, so you can focus on building your business logic and let Azure take care of dynamic scaling, patches, security, compliance, and high availability. With a few steps, you can provision Azure Spring Cloud, create applications, deploy, and scale Spring Boot applications, and start monitoring in minutes. We will continue to bring more developer-friendly and enterprise-ready features to Azure Spring Cloud. We would love to hear how you are building impactful solutions using Azure Spring Cloud …

[Analyze logs and metrics](http://aka.ms/Start-Elastic) and [monitor](http://aka.ms/Start-Elastic-APM) your Spring Boot applications with Elastic!

## [](#resources)Resources

-   Learn using an [MS Learn module](https://docs.microsoft.com/en-us/learn/modules/azure-spring-cloud-workshop/) or [self-paced workshop](https://github.com/microsoft/azure-spring-cloud-training) on GitHub
-   Learn [more](https://docs.microsoft.com/en-us/azure/spring-cloud/) about implementing solutions on Azure Spring Cloud
-   [Deploy](https://github.com/Azure-Samples/spring-petclinic-microservices) a distributed version of Spring Petclinic application
-   Deploy Spring Boot applications by leveraging enterprise best practices – [Azure Spring Cloud Reference Architecture](https://docs.microsoft.com/en-us/azure/spring-cloud/reference-architecture)
-   Migrate your [Spring Boot](https://docs.microsoft.com/en-us/azure/developer/java/migration/migrate-spring-boot-to-azure-spring-cloud), [Spring Cloud](https://docs.microsoft.com/en-us/azure/developer/java/migration/migrate-spring-cloud-to-azure-spring-cloud), and [Tomcat](https://docs.microsoft.com/en-us/azure/developer/java/migration/migrate-tomcat-to-azure-spring-cloud) applications to Azure Spring Cloud
-   Wire Spring applications to [interact with Azure services](https://docs.microsoft.com/en-us/azure/developer/java/spring-framework/)
-   For feedback and questions, please [e-mail us](mailto:AzureSpringCloud-Talk@service.microsoft.com).