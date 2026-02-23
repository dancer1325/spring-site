---
title: Monitor Spring Boot applications end-to-end using Dynatrace in Azure Spring Cloud!
source: https://spring.io/blog/2021/09/01/monitor-spring-boot-applications-end-to-end-using-dynatrace-in-azure-spring-cloud
scraped: 2026-02-23T13:15:22.617Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  September 01, 2021 | 1 Comment
---

# Monitor Spring Boot applications end-to-end using Dynatrace in Azure Spring Cloud!

_Engineering | Josh Long |  September 01, 2021 | 1 Comment_

Today, we are excited to announce the integration of the **Dynatrace Software Intelligence Platform in Azure Spring Cloud**.

Over the past 18 months, we worked with many enterprise customers to learn about the scenarios they face. Many of these customers have thousands of Spring Boot applications running in on-premises data centers. As they migrate these applications to the cloud, they need to instrument them for application performance monitoring (APM) using solutions their developers are familiar with and have been using for years. In addition, they must ensure continuity for desktop and mobile applications that are already pre-instrumented for end-to-end monitoring using agents like Dynatrace OneAgent, which automatically discovers and maps all applications, microservices, and infrastructure as well as any dependencies in dynamic hybrid, multi-cloud environments. With the integration of Dynatrace OneAgent in Azure Spring Cloud, you can continue your journey and easily instrument your Spring Boot applications with Dynatrace.

**Continue your Dynatrace journey**. Most organizations that deploy Spring Boot applications today share a similar goal: maximize the benefits of running Spring Boot applications at virtually any scale, using automation and APM. While Azure Spring Cloud excels at abstracting away much of the toil associated with managing containerized workloads, the challenge of monitoring and maintaining the performance and health of these applications, or of troubleshooting issues when they occur, can be daunting—especially as organizations deploy these applications at massive scale. To help you succeed and continue your Dynatrace journey, we integrated and upgraded your ability to instrument, monitor and deliver observability using Dynatrace OneAgent across your Azure Spring Cloud instances. That begins with setting up instrumentation quickly and easily. Then you can analyze the performance and health of your applications, JVMs, transactions, and more.

> “For Liantis, true hybrid monitoring across both our on-premises and cloud-based Spring Boot microservices is key, but we also require simple and straightforward implementation - which is in line with the true Azure Spring Cloud philosophy of abstracting complexity. Doing so allows Liantis to spend more time on developing innovative applications, rather than building and operating infrastructure, which enables us to deliver true value for our customers and employees. Building on our in-house expertise with both Spring and Dynatrace technology, combined with our previous investments, the Dynatrace integration with Azure Spring Cloud was the obvious choice for Liantis.” -- Nicolas Van Kerschaver, CIO, Liantis

> “Being able to scale is critical for today’s digital business, as organizations have made the shift to cloud-native workloads and microservices. While cloud-native technologies and microservices have tremendous advantages, dynamic environments bring complexity that makes it difficult to understand the relationships and dependencies across an organization’s cloud ecosystem. Dynatrace’s strategic partnership with Microsoft allows us to extend the impact of our automatic and intelligent observability even further to accelerate digital transformation. Through the Dynatrace integration with Azure Spring Cloud, we are enabling full visibility into application data for Spring Boot applications, which means more time innovating and a better product for end-users.” – Eric Horsman, Global Director of Strategic Alliances, Dynatrace

> “At Microsoft, we are committed to helping our customers modernize their applications and innovate faster than ever before. By integrating a software intelligence solution like Dynatrace with Azure Spring Cloud, we can enable our customers with easy implementation of end-to-end observability, including automatic and continuous root-cause analysis, for their Spring Boot applications.” -- Julia Liuson, Corporate Vice President, Developer Division, Microsoft

**Instrument your Spring Boot applications.** Run a "provisioning" automation pipeline for a complete hands-off experience to instrument and monitor any new applications that you create and deploy – using Terraform or ARM Template. Or you can run it on-demand using the Azure CLI for greater flexibility and control.

```
Copyaz spring-cloud app update --name customers-service \
      --env DT_TENANT=<your-tenant> DT_TENANTTOKEN=<your-tenant-token> \
      DT_CONNECTION_POINT=<your-connection-point>
```

**Automatic discovery and mapping of applications and their dependencies.** To maintain real-time awareness in dynamic environments, Dynatrace automatically discovers and maps application components (including application servers, frameworks and microservices), databases, messaging and eventing systems, and their relationships. In the view shown below, the Dynatrace Portal shows all the Spring Boot applications running in a production workload.

![](https://raw.githubusercontent.com/joshlong/blog-images/master/dynatrace-azure-spring-cloud/1-SpringCloudDynatraceAutomaticDiscovery.png)

Screenshot 1 - shows all the Spring Boot applications running in a production workload

**End-to-end observability of Spring Boot applications’ complete HTTP/S transactional behavior to understand the effect on business outcomes and user experiences.** In the example view below, Dynatrace provides developers with all the transaction traces implemented in code without any code change to applications.

![](https://raw.githubusercontent.com/joshlong/blog-images/master/dynatrace-azure-spring-cloud/2-SpringCloudDynatraceDatabaseBacktrace.png)

Screenshot 2 – shows transaction traces implemented in code without any code change to applications

**Endpoint monitoring, API monitoring, DB calls monitoring, end-user experience monitoring.** Dynatrace captures all the database queries initiated by your Spring Boot applications, including Azure database services. In the example view below, Dynatrace Portal shows all the active REST API operations within a production workload.

![](https://raw.githubusercontent.com/joshlong/blog-images/master/dynatrace-azure-spring-cloud/3-SpringCloudDynatraceAPICalls2.png)

Screenshot 3 – shows all the active REST API operations within a production workload

In the example view below, the Dynatrace Portal shows all the database queries initiated by a production workload.

![](https://raw.githubusercontent.com/joshlong/blog-images/master/dynatrace-azure-spring-cloud/4-SpringCloudDynatraceDatabaseContribution.png)

Screenshot 4 – shows all the database queries initiated by a production workload

**Root-cause and impact analysis** of application performance problems and business outcomes for faster, more reliable incident resolution. Dynatrace provides deep-code level visibility with end-to-end traces and the integration provides AI-assisted problem detection and automatic root-cause analysis allowing you to stay on top of your deployments and distinguish between healthy and unhealthy applications.

![](https://raw.githubusercontent.com/joshlong/blog-images/master/dynatrace-azure-spring-cloud/5-SpringCloudDynatraceHotspots.png)

Screenshot 5 – shows results from stack trace analysis

**Detect anomalies** in your Spring Boot application instances. Dynatrace passes the collected data through an AI engine for automated root cause analysis, code level hotspot analysis, top database queries and exception analysis. In the example screenshot below, Dynatrace automatically identifies code modules that are CPU intensive so that you do not have to dig through the data.

![](https://raw.githubusercontent.com/joshlong/blog-images/master/dynatrace-azure-spring-cloud/6-SpringCloudDynatraceCPUAnalysis.png)

Screenshot 6 - code modules that are CPU intensive so that you do not have to dig through the data

You can find all the top database queries initiated, how expensive these queries are, and how many times these queries are called by applications. In the example screenshot below, Dynatrace shows top database queries initiated by a production workload.

![](https://raw.githubusercontent.com/joshlong/blog-images/master/dynatrace-azure-spring-cloud/7-SpringCloudDynatraceTopDatabase.png)

Screenshot 7 – shows top database queries initiated by a production workload

All application code level exceptions are logged along with many details into the stack traces of where the exception occurred. In the example screenshot below, Dynatrace portal shows the top exceptions thrown by a production workload.

![](https://raw.githubusercontent.com/joshlong/blog-images/master/dynatrace-azure-spring-cloud/8-SpringCloudDynatraceExceptionAnalysis.png)

Screenshot 8 – shows the top exceptions thrown by a production workload

The Dynatrace Software Intelligence Platform automatically baselines all the performance metrics of Spring Boot applications. When the response times of an application increase beyond the auto detected baseline, the platform creates an alert with information like how much response times have breached from baselines. In the example screenshot below, Dynatrace shows response time degradation for a few services in a production workload.

![](https://raw.githubusercontent.com/joshlong/blog-images/master/dynatrace-azure-spring-cloud/9-SpringCloudDynatraceResponseTimeProblem1-reds.jpg)

Screenshot 9 – shows response time degradation for a few services in a production workload

Dynatrace gives you insights on what caused these increases in response time, particularly the time taken to make a connection to a database service. In the example below, the Dynatrace portal calls out the time taken to make connections to a database.

![](https://raw.githubusercontent.com/joshlong/blog-images/master/dynatrace-azure-spring-cloud/10-SpringCloudDynatraceResponseTimeProblem2.png)

Screenshot 10 – shows time taken to make connections to a database

Dynatrace automatically detects all the failures. In the example below, Dynatrace signals an increase in failure rates to reach an external network.

![](https://raw.githubusercontent.com/joshlong/blog-images/master/dynatrace-azure-spring-cloud/11-SpringCloudDynatraceFailureRate_pub1.png)

Screenshot 11 – signals an increase in failure rates to reach an external network

**Focus on delivering value to your end-users.** Once instrumented, as you scale out to multiple Spring Boot application instances, any new application instances are automatically monitored for you. Dynatrace enables application developers to observe Spring Boot applications end-to-end. You spend less time managing the agent installation and maintenance and more energy on identifying and resolving incidents faster. Azure Spring Cloud service is on-point for periodically updating the Dynatrace OneAgent.

## [](#build-your-solutions-and-monitor-them-today)Build your solutions and monitor them today!

Azure Spring Cloud is jointly built, operated, and supported by Microsoft and VMware. It is a fully managed service for Spring Boot applications that abstracts away the complexity of infrastructure and Spring Cloud middleware management, so you can focus on building your business logic and let Azure take care of dynamic scaling, patches, security, compliance, and high availability. With a few steps, you can provision Azure Spring Cloud, create applications, deploy, and scale Spring Boot applications and start monitoring in minutes. We will continue to bring more developer-friendly and enterprise-ready features to Azure Spring Cloud.

We would love to hear how you are building impactful solutions using Azure Spring Cloud. Start monitoring your Spring Boot applications with Dynatrace.

## [](#resources)Resources

-   Learn using an MS Learn module or self-paced workshop on GitHub
-   Learn more about implementing solutions on Azure Spring Cloud
-   See related document published by Dynatrace
-   Deploy a distributed version of Spring Petclinic built with Spring Cloud
-   Deploy Spring Boot applications by leveraging enterprise best practices – Azure Spring Cloud Reference Architecture
-   Migrate your Spring Boot, Spring Cloud and Tomcat applications to Azure Spring Cloud
-   Wire Spring applications to interact with Azure services
-   For feedback and questions, please e-mail us.