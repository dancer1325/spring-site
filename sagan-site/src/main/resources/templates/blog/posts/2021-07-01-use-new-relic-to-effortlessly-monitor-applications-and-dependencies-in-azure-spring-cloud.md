---
title: Use New Relic to effortlessly monitor applications and dependencies in Azure Spring Cloud
source: https://spring.io/blog/2021/07/01/use-new-relic-to-effortlessly-monitor-applications-and-dependencies-in-azure-spring-cloud
scraped: 2026-02-23T13:19:42.210Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  July 01, 2021 | 0 Comments
---

# Use New Relic to effortlessly monitor applications and dependencies in Azure Spring Cloud

_Engineering | Josh Long |  July 01, 2021 | 0 Comments_

Today, we are excited to announce the **integration of New Relic One** performance monitoring in Azure Spring Cloud.

Over the past 18 months, we worked with many enterprise customers to learn about their scenarios. Many of these customers have thousands of Spring Boot applications running in on-premises data centers. As they migrate these applications to the cloud, they need to instrument them for application performance monitoring (APM) using tools that their developers are familiar with and have been using for years, and they must ensure continuity for desktop and mobile applications which are already pre-instrumented for end-to-end monitoring using agents like New Relic. With the integration of New Relic One in Azure Spring Cloud, you can continue your journey and easily instrument your Spring Boot applications with New Relic One.

Most organizations that deploy Spring Boot applications today share a similar goal: maximize the benefits of running Spring Boot applications at virtually any scale, using automation and APM. While Azure Spring Cloud excels at abstracting away much of the toil associated with managing containerized workloads, the challenge of monitoring and maintaining the performance and health of these applications, or of troubleshooting issues when they occur, can be daunting—especially as organizations deploy these applications at massive scale. To help you succeed and continue your New Relic One journey, we integrated and upgraded your ability to instrument, monitor and deliver observability using New Relic One across your Azure Spring Cloud instances. That begins with setting up instrumentation quickly and easily. Then you can analyze the performance and health of your applications, JVMs, transactions, and more to identify and troubleshoot performance issues.

**Instrument your Spring Boot applications.** Run a "provisioning" automation for a complete hands-off experience for instrumenting and monitoring any new applications that you create and deploy – using Terraform or ARM Template. Or you can run it on-demand using the Azure CLI for greater flexibility and control.

```
Copyaz spring-cloud app update --name customers-service \
--jvm-options="-javaagent:/opt/agents/newrelic/java/newrelic-agent.jar" \
--env NEW_RELIC_APP_NAME=customers-service NEW_RELIC_LICENSE_KEY=<key>
```

**Explore Spring Boot application performance.** After instrumenting, you can explore Spring Boot application performance through the New Relic One portal. You can view all of your applications in action through the Service Maps. For example, the screenshot below shows all the applications in the popular Petclinic project:

![](https://github.com/joshlong/blog-images/raw/master/july-1-2021/2-Service-maps.jpg)

*Screenshot 1 - shows all the applications in the popular Petclinic project*

You can observe your application’s performance by navigating through application-by-application in the New Relic portal. For example, the screenshot below shows transactions processed by customers-service, its throughput, and error rate:

![](https://github.com/joshlong/blog-images/raw/master/july-1-2021/2-customers-service-summary.jpg)

*Screenshot 2 - shows transactions processed by customers-service, its throughput and error rate*

You can look deeper into the underlying JVMs by navigating to the “JVMs” blade on the New Relic portal. For example, the screenshot below shows how many JVMs for all the customers-service application instances:

![](https://github.com/joshlong/blog-images/raw/master/july-1-2021/2-customers-service-jvms.jpg)

*Screenshot 3 - shows how many JVMs for all the customers-service application instances*

You can analyze application dependencies, including database transactions by navigating to the “Databases” blade in the New Relic One portal. For example, the screenshot below shows all the database transactions for customers-service.

![](https://github.com/joshlong/blog-images/raw/master/july-1-2021/2-customers-service-databases.jpg)

*Screenshot 4 - shows all the database transactions for customers-service*

You can look at the stack trace of each thread through the New Relic One Thread Profiler and understand times consumed by Java methods. This provides insights into the "hot" functions of the applications where most time is spent. For example, the screenshot below shows a stack trace of a thread in the customers-service application.

![](https://github.com/joshlong/blog-images/raw/master/july-1-2021/2-customers-service-thread-profiler.jpg)

*Screenshot 5 - shows a stack trace of a thread in the customers-service*

**Deliver value to your end-users.** Once instrumented, as you scale out to multiple Spring Boot application instances, any new application instances are automatically monitored for you. You spend less time managing the agent installation and maintenance and more energy on identifying and resolving incidents faster. Azure Spring Cloud service is on-point for periodically updating the agent.

**View of all your Spring Boot application instances.** New Relic One Navigator offers you an at-a-glance view of the operational health of all your application instances. This bird's eye view of your estate is automatically available to you, no configuration required. Navigator makes it easy for you to explore huge numbers of instances as it intuitively displays all your instances in a dense honeycomb view with traffic light colors based on alerts that you define. Quickly identify alerting instances and uncover root causes in addition to seeing which dependent systems might be affected.

As an illustration, the following Navigator view groups your instances across Azure Spring Cloud instances, allowing you to quickly compare your operations in a multi-region deployment. You can group and filter across all your instances to quickly zero in on issues. You can also drill down into any instance to see a summary of its activity and any violations along with key metrics and metadata including custom attributes.

![](https://github.com/joshlong/blog-images/raw/master/july-1-2021/2-new-relic-navigator.jpg)

*Screenshot 6 – show how Navigator view groups your instances across Azure Spring Cloud instances*

**Detect anomalies in your Spring Boot application instances.** New Relic Lookout provides an intuitive view of your instances that are deviating from normal behavior, using circle visualization with color indicating the severity of recent signal change and sized proportionally to the magnitude of the metric signal. Lookout automatically compares signals within the last five minutes against the previous hour.

Similarly, you can use New Relic for **monitoring Java applications in Azure services such as [Azure Kubernetes Service and Virtual Machines](https://docs.newrelic.com/docs/agents/java-agent/additional-installation/install-new-relic-java-agent-docker/).**

## [](#build-your-solutions-and-monitor-them-today)Build your solutions and monitor them today!

Azure Spring Cloud is jointly built, operated, and supported by Microsoft and VMware. It is a fully managed service for Spring Boot applications that abstracts away the complexity of infrastructure and Spring Cloud middleware management, so you can focus on building your business logic and let Azure take care of dynamic scaling, patches, security, compliance, and high availability. With a few steps, you can provision Azure Spring Cloud, create applications, deploy, and scale Spring Boot applications and start monitoring in minutes. We will continue to bring more developer-friendly and enterprise-ready features to Azure Spring Cloud.

We would love to hear how you are building impactful solutions using Azure Spring Cloud. Get started today – deploy Spring applications to Azure Spring Cloud using [quickstart](https://docs.microsoft.com/en-us/azure/spring-cloud/quickstart?tabs=Azure-CLI&pivots=programming-language-java)!

## [](#resources)Resources

-   Learn using an [MS Learn module](https://docs.microsoft.com/en-us/learn/modules/azure-spring-cloud-workshop/) or [self-paced workshop](https://github.com/microsoft/azure-spring-cloud-training) on GitHub
-   Learn [more](https://docs.microsoft.com/en-us/azure/spring-cloud/) about implementing solutions on Azure Spring Cloud
-   Learn [more](https://docs.microsoft.com/en-us/azure/spring-cloud/how-to-new-relic-monitor) about New Relic Java agent in Azure Spring Cloud
-   [Deploy](https://github.com/Azure-Samples/spring-petclinic-microservices) a distributed version of Spring Petclinic built with Spring Cloud
-   Deploy Spring Boot applications by leveraging enterprise best practices – [Azure Spring Cloud Reference Architecture](https://docs.microsoft.com/en-us/azure/spring-cloud/reference-architecture)
-   Migrate your [Spring Boot](https://docs.microsoft.com/en-us/azure/developer/java/migration/migrate-spring-boot-to-azure-spring-cloud), [Spring Cloud](https://docs.microsoft.com/en-us/azure/developer/java/migration/migrate-spring-cloud-to-azure-spring-cloud) and [Tomcat](https://docs.microsoft.com/en-us/azure/developer/java/migration/migrate-tomcat-to-azure-spring-cloud) applications to Azure Spring Cloud
-   Wire Spring applications to [interact with Azure services](https://docs.microsoft.com/en-us/azure/developer/java/spring-framework/)
-   For feedback and questions, [please e-mail us.](mailto:AzureSpringCloud-Talk@service.microsoft.com)