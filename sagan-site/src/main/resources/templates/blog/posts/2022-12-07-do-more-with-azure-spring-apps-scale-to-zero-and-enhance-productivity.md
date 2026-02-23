---
title: Do more with Azure Spring Apps – scale to zero and enhance productivity
source: https://spring.io/blog/2022/12/07/do-more-with-azure-spring-apps-scale-to-zero-and-enhance-productivity
scraped: 2026-02-23T10:23:19.498Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  December 07, 2022 | 0 Comments
---

# Do more with Azure Spring Apps – scale to zero and enhance productivity

_Engineering | Josh Long |  December 07, 2022 | 0 Comments_

In 2020, Spotify coined the term ["Golden Path”](https://engineering.atspotify.com/2020/08/how-we-use-golden-paths-to-solve-fragmentation-in-our-software-ecosystem/) to refer to a supported approach and set of components to build and deploy software. Having these paths simplifies the development process, lets developers focus on their applications instead of infrastructure and speeds time to production. Microsoft and VMware have partnered to make Azure Spring Apps a golden path for deploying and scaling Spring applications in the cloud. And with new capabilities like the scale to zero and developer productivity enhancements, Azure Spring Apps now offers an even more economical and optimized route to get your Spring applications into production.

## [](#1-start-from-zero-and-scale-to-zero--consumption-plan)1\. Start from zero and scale to zero – consumption plan

We are introducing a new consumption pricing plan for Azure Spring Apps – you can start from zero and scale to zero vCPU for efficient resource utilization. With this serverless application-centric plan, apps can scale in response to HTTP requests, events, or simply run as always-on background jobs. The consumption plan does not have a base unit. You can scale to zero and pause billing when apps are not in use. You can use this new plan to build or migrate web apps and web API endpoints, event-driven processing apps, microservice apps, and many more.

The consumption plan is in private preview. If you would like to try, [please sign up](https://forms.office.com/pages/responsepage.aspx?id=v4j5cvGGr0GRqy180BHbR9e_wit0rN5LkLw5ybHCSYxUNkxHRDFHMkdNTDNFV1dCWE1CREZKSDRHNi4u)

![](https://github.com/joshlong/blog-images/raw/master/do-more-with-spring-boot-3-2022-12-07/ASA-Consumption-Plan-2.jpg)

Figure 1 – introduces the Azure Spring Apps consumption plan

## [](#2-enhanced-developer-productivity-in-azure-spring-apps-enterprise)2\. Enhanced developer productivity in Azure Spring Apps Enterprise

### [](#21-application-accelerators)2.1 Application Accelerators

[Application Accelerators](https://learn.microsoft.com/en-us/azure/spring-apps/how-to-use-accelerator?tabs=Portal) speed up the process of building and deploying applications. They help you to bootstrap developing your applications and deploy them in a discoverable and repeatable way. Enterprise architects can author and publish accelerator projects that provide developers and app operators in their organization with ready-made, enterprise-conformant code, and configurations. Published accelerators are maintained in Git repositories. The Application Accelerators interface lets you discover available accelerators, configure them, and generate new projects. Application Accelerators (see Figure 2 below) are now available in preview for everyone to use.

![](https://github.com/joshlong/blog-images/raw/master/do-more-with-spring-boot-3-2022-12-07/application-accelerators.jpg)

Figure 2 – shows Application Accelerators

### [](#22-application-live-view)2.2 Application Live View

[Application Live View](https://learn.microsoft.com/en-us/azure/spring-apps/monitor-apps-by-application-live-view) is a lightweight insight and troubleshooting tool based on Spring Boot Actuators that helps app developers and app operators look inside running apps. Applications provide information from inside the running processes using HTTP endpoints. Application Live View uses those endpoints to retrieve and interact with the data from applications.

You can use Application Live View to inspect application info, health, environment, log levels (see Figure 4 below), JVM statistics (see Figure 3 below), HTTP requests, caches, sessions, scheduled tasks, beans, metrics, and more. Application Live View is now available in preview for everyone to use.

![](https://github.com/joshlong/blog-images/raw/master/do-more-with-spring-boot-3-2022-12-07/catalog-service-memory-7.jpg) Figure 3 – Application Live View shows memory usage and GC activities for a Spring app instance ![](https://github.com/joshlong/blog-images/raw/master/do-more-with-spring-boot-3-2022-12-07/app-live-view-log-levels.jpg)

Figure 4 – Application Live View shows log levels for a Spring app instance

### [](#23-web-servers-buildpack)2.3 Web Servers Buildpack

You can use the Tanzu Web Servers buildpack to build applications that run web servers like NGINX or Apache HTTP Server. You can use the buildpack for applications that serve static content or build JavaScript source code into production-ready static assets, then automatically configure a web server to serve those assets. Web Servers buildpack support is generally available.

## [](#3-spring-framework-6-and-spring-boot-3)3\. Spring Framework 6 and Spring Boot 3

In addition to deploying apps built using Spring Boot 2 and Spring Framework 5, you can now deploy and scale apps built using [Spring Boot 3](https://spring.io/blog/2022/11/24/spring-boot-3-0-goes-ga) and [Spring Framework 6](https://spring.io/blog/2022/11/16/spring-framework-6-0-goes-ga). Spring Boot 3 includes Java 17 baseline, improved observability with Micrometer and Micrometer Tracing, support for Jakarta EE 10, and many more new features. Support for Spring Boot 3 and Spring Framework 6 is now in preview for everyone to use.

![](https://github.com/joshlong/blog-images/raw/master/do-more-with-spring-boot-3-2022-12-07/SB3-SF6.jpg) Figure 5 – deploy and scale Spring Boot 3 and Spring Framework 6 apps on Azure

Azure Spring Apps will support the latest Spring Boot, Spring Framework, and Spring Cloud major versions starting 30 days after their release. The latest minor versions will be supported as soon as they are released. The Basic and Standard tiers follow the OSSsupported versions and the Enterprise tier carries extended commercial support through VMware Spring Runtime Support entitlements.

## [](#4-more-new-features-to-enhance-productivity)4\. More new features to enhance productivity

### [](#41-grpc-and-websocket-support)4.1 gRPC and WebSocket support

The gRPC is a high-performance remote procedure call (RPC) framework that can run in any environment. It provides bi-directional streaming. gRPC services can be defined using protocol buffers, a powerful binary serialization toolset, and language, and provides tools for generating clients and servers across different languages. Now you can deploy Spring apps with gRPC support in Azure Spring Apps.

The WebSocket protocol defines an important capability for web applications: full-duplex, two-way communication between client and server. You can also deploy Spring apps with WebSocket support in Azure Spring Apps. gRPC and WebSocket support are in preview for everyone to use.

### [](#42-connect-to-app-instance-shell-environment-for-troubleshooting)4.2 Connect to app instance shell environment for troubleshooting

Azure Spring Apps offers many ways to troubleshoot your applications. For developers who like to inspect an app instance running environment, you can [connect to the app instance’s shell environment](https://learn.microsoft.com/en-us/azure/spring-apps/how-to-connect-to-app-instance-for-troubleshooting?tabs=azure-portal) and troubleshoot it (see Figure 6 below).

![](https://github.com/joshlong/blog-images/raw/master/do-more-with-spring-boot-3-2022-12-07/connect-to-app-shell-environment-3.jpg)

Figure 6 – show how to connect to an app instance’s shell environment and inspect the environment

### [](#43-debug-your-apps-remotely-in-azure-spring-apps)4.3 Debug your apps remotely in Azure Spring Apps

Now, you can [remotely debug](https://learn.microsoft.com/en-us/azure/spring-apps/how-to-remote-debugging-app-instance?tabs=portal%2CIntellij-extension) your apps in Azure Spring Apps using IntelliJ (see Figure 7 below) or VS Code. For security reasons, by default, Azure Spring Apps disables remote debugging. You can enable remote debugging for your apps using Azure Portal or Azure CLI and start debugging.

Remote debugging support is generally available.

![](https://github.com/joshlong/blog-images/raw/master/do-more-with-spring-boot-3-2022-12-07/remote-debug-spring-apps.jpeg)

Figure 7 – shows how to start remote debugging using IntelliJ

### [](#44-service-stopstart-is-now-generally-available)4.4 Service Stop/Start is now generally available

You can stop and start your Azure Spring Apps service instance to help you save costs. If you were to stop and start your development and test environment Azure Spring Apps service instances to match your work hours, you could save up to 75%\*.

\* Assuming usage of Azure Spring Apps service instances for 40 hours a week, then you could save up to 75% by stopping those instances during inactive times. (168 hours - 40 hours) / 168 hours = 75%.

## [](#5-try-today)5\. Try Today

In 2019, Microsoft and VMware announced Azure Spring Apps, a fully managed service for Spring applications. We set out to solve many of the common challenges enterprise developers face when running Spring applications at scale. Azure Spring Apps is a golden path to production in the cloud and you can get started today – [deploy](https://learn.microsoft.com/en-us/azure/spring-apps/quickstart?tabs=Azure-CLI&pivots=programming-language-java) your first Spring app to Azure!

To help you get started, we have [monthly FREE](https://aka.ms/costs-less) grants on all tiers – 50 vCPU Hours and 100 memory GB Hours per tier. These are the number of FREE hours per month BEFORE any usage is billed.

![](https://github.com/joshlong/blog-images/raw/master/do-more-with-spring-boot-3-2022-12-07/Monthly-Free-Grants-3.jpg)

## [](#additional-resources)Additional Resources

-   Learn using an [MS Learn module](https://learn.microsoft.com/en-us/training/modules/azure-spring-cloud-workshop/) or [self-paced workshop](https://github.com/microsoft/azure-spring-cloud-training) on GitHub
-   [Deploy](https://github.com/Azure-Samples/acme-fitness-store) the demo Fitness Store Spring Boot app to Azure
-   [Deploy](https://github.com/azure-samples/animal-rescue) the demo Animal Rescue Spring Boot app to Azure
-   Learn [more](https://learn.microsoft.com/en-us/azure/spring-apps/) about implementing solutions on Azure Spring Apps
-   Deploy Spring Boot apps by leveraging enterprise best practices – [Azure Spring Apps Reference Architecture](https://learn.microsoft.com/en-us/azure/spring-apps/reference-architecture?tabs=azure-spring-standard)
-   Migrate your [Spring Boot](https://learn.microsoft.com/en-us/azure/developer/java/migration/migrate-spring-boot-to-azure-spring-apps), [Spring Cloud](https://learn.microsoft.com/en-us/azure/developer/java/migration/migrate-spring-cloud-to-azure-spring-apps?pivots=sc-standard-tier), and [Tomcat](https://learn.microsoft.com/en-us/azure/developer/java/migration/migrate-tomcat-to-azure-spring-apps) applications to Azure Spring Apps
-   Wire Spring applications to [interact with Azure services](https://learn.microsoft.com/en-us/azure/developer/java/spring-framework/)
-   For feedback and questions, [please e-mail us.](mailto:AzureSpringCloud-Talk@service.microsoft.com)