---
title: Azure Spring Apps Enterprise – More Power, Scalability & Extended Spring Boot Support
source: https://spring.io/blog/2023/07/11/azure-spring-apps-enterprise-more-power-scalability-and-extended-spring-boot
scraped: 2026-02-23T09:36:59.000Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  July 11, 2023 | 1 Comment
---

# Azure Spring Apps Enterprise – More Power, Scalability & Extended Spring Boot Support

_Engineering | Josh Long |  July 11, 2023 | 1 Comment_

Can you believe Spring is celebrating its 20th anniversary this year? We could not have gotten here without our millions of Spring developers across the globe, thank you! Spring has been an essential tool for Java developers, and it continues to grow and innovate at a fast pace. From the onset, Azure and VMware Tanzu have been trusted partners to customers for running mission-critical Java and Spring workloads. Our commitment and fondness for the Java Spring developer community have never wavered.

## [](#microsoft-and-vmware-tanzu-collaboration-continues)Microsoft and VMware Tanzu Collaboration Continues

Microsoft collaboration with the Spring team, which began in 2016, has been fundamental to our shared goal of enabling Spring apps to fully harness the power of the cloud. We have listened to Spring developers express their desire to focus on their application code and business logic, rather than being bogged down by the complexities of managing, securing, and scaling infrastructure, containers, and virtual machines. To address this, Microsoft and VMware Tanzu teamed up to establish Azure Spring Apps - an initiative aimed at simplifying your development and operations workflows and expediting your journey from code to production. As a key service within the Microsoft Azure ecosystem, Azure Spring Apps has already garnered significant traction. Many customers including [Bosch](https://aka.ms/Bosch.IO), [Digital Realty](https://aka.ms/DLR), [FedEx](https://aka.ms/FedEx), [Kroger](https://aka.ms/kroger-on-azure), [Liantis](https://aka.ms/liantis), [Morgan Stanley](https://aka.ms/Morgan-Stanley), [National Life](https://aka.ms/National-Life), [Raley's](https://aka.ms/raleys), and [Swiss Re](https://aka.ms/swiss-re) adopted the service for their mission-critical enterprise Java Spring applications.

Azure Spring Apps Enterprise is designed to expedite the development and deployment of enterprise applications by providing commercially supported Spring runtime components and access to Spring experts. Building on the features available in the Standard tier, it allows users to harness the expansive Azure ecosystem to enhance their Spring applications, facilitating a faster path to production and enabling the full realization of Spring's capabilities.

Today, we are delighted to announce significant enhancements to the Azure Spring Apps Enterprise. These improvements will bolster security, quicken development speed, amplify scalability, and provide greater flexibility and reliability. We are excited to share these developments with you and look forward to seeing how they will enhance your experiences.

## [](#java-apps-and-graalvm)Java Apps and GraalVM

In the traditional setup, Java applications operate within a Java Runtime Environment (JRE). However, the introduction of the GraalVM Native Image capability marks a significant shift. It lets you compile Java applications into standalone executables, otherwise known as native images. The advantages of this new process are substantial; native images offer quicker startup times and reduced runtime memory overhead when compared to the conventional Java Virtual Machine (JVM). Now, within Azure Spring Apps Enterprise, you have the option to [deploy Spring native image applications](https://learn.microsoft.com/en-us/azure/spring-apps/how-to-enterprise-deploy-polyglot-apps?tabs=Portal%2Casa-managed-container-registry#supported-languages-for-deployments) using the [Cloud Native Buildpack for Java Native Image](https://docs.vmware.com/en/VMware-Tanzu-Buildpacks/services/tanzu-buildpacks/GUID-java-native-image-java-native-image-buildpack.html), making the whole process simpler and super-efficient. You can read more about this enhancement below.

## [](#enhanced-capabilities)Enhanced Capabilities

In the past five years, our understanding and knowledge have been significantly shaped by the experiences and feedback of developers and customers. We are committed to paying heed to our customers' voices and their needs. Acknowledging the growing demand for running and scaling enterprise applications at a larger scale, we are thrilled to announce a series of enhancements to Azure Spring Apps Enterprise. These enhancements are a direct reflection of our continuous effort to meet and exceed our customers' expectations.

![](https://raw.githubusercontent.com/joshlong/blog-images/master/azure_spring_apps_enterprise_more_power_scalability_extended_spring_boot_support/1.jpg)

*Figure 1. – Shows the list of Enhancements to Azure Spring Apps Enterprise: Before vs. Now & User Benefits*

### [](#explore-the-enhanced-capabilities-and-their-key-benefits)Explore the enhanced capabilities and their key benefits

Let's look at the enhanced capabilities and their key benefits.

### [](#enjoy-enhanced-reliability-and-significantly-reduced-downtime)Enjoy Enhanced Reliability and Significantly Reduced Downtime

Improved Service Level Agreement (SLA): Azure Spring Apps Enterprise now provides an improved SLA of [99.95%](https://www.microsoft.com/licensing/docs/view/Service-Level-Agreements-SLA-for-Online-Services?lang=1), enhancing reliability and reducing the potential downtime for businesses.

This enhancement promises around 4.34 hours of potential downtime annually, a 50% reduction from the previous SLA. The new SLA provides comprehensive assurance, when all components managed by Azure Spring Apps are taken into consideration. This includes key elements such as Azure Kubernetes Service, Azure Storage, Azure Container Registry, network elements, and various Spring components such as Application Configuration Service, Service Registry, Spring Cloud Gateway, and Tanzu Build Service. In essence, the 99.95% SLA offers a more consistent and reliable service with significantly reduced outages, crucial for businesses with mission-critical operations.

This comprehensive assurance contrasts markedly with SLAs for do-it-yourself (DIY) application environments where the SLA is an aggregate of various individual services' SLAs and your homegrown control-plane components (if any). For instance, a fully managed K8S service provides an SLA for Kubernetes API server connectivity, but not for nodes running your application workloads. These nodes, being Virtual Machines, carry their own SLA. Services like Azure Storage and Azure Container Registry have their own availability guarantees as well. When you utilize your own ingress controllers and Spring components within a Kubernetes environment, you must ensure all necessary redundancies and instrumentations for measuring SLA and remedying downtime. To achieve an application availability comparable to Azure Spring Apps Enterprise's 99.95%, you would need to build in redundancies for all service components and your control plane components, and constantly monitor and adjust for any disruptions.

### [](#experience-enhanced-scalability--capacity-increases)Experience Enhanced Scalability – Capacity Increases

*Increases include enhanced hosting with up to [1000 app instances](https://aka.ms/experience-unparalleled-scalability), large app support, and efficient build processes.*

Up to 1000 app instances: The Azure Spring Apps Enterprise now offers a preview of a robust hosting environment capable of accommodating up to 1000 application instances per service instance, providing businesses with the scalability needed for their workloads. With support for up to 8000 virtual CPUs and 32 terabytes of memory per service instance, Azure Spring Apps Enterprise enables organizations to meet demanding computational and memory requirements effectively and efficiently. Of course, you can provision any number of service instances in a region or any number of regions.

Larger app instances: In addition, the Azure Spring Apps Enterprise offers enhanced value to users by providing support for [larger app instances](https://learn.microsoft.com/en-us/azure/spring-apps/how-to-enterprise-large-cpu-memory-applications?tabs=azure-portal), featuring up to 8 virtual CPUs (vCPU) and 32 gigabytes (GB) of memory per app instance. This increased capacity allows users to deploy resource-intensive applications that require more computational power and memory, enabling them to meet the demands of their workloads effectively.

Efficient build processes: And to enable more efficient and faster application build processes, especially for complex and resource-intensive applications, Azure Spring Apps Enterprise, has increased the resource allocation for build agent pool [up to 64 vCPUs and 128 GB](https://learn.microsoft.com/en-us/azure/spring-apps/how-to-enterprise-build-service?tabs=azure-portal#configure-the-build-agent-pool) of memory. With these ample resources at your disposal, you can build any app in a highly efficient and resource-rich environment, ensuring a smoother and faster compilation process.

### [](#faster-startup-time-and-optimized-memory-usage)Faster Startup Time and Optimized Memory Usage

\*Java Native Image support: Available now in a preview feature, Azure Spring Apps Enterprise is introducing support for Java native images, promising faster startup times and optimized memory usage. \*

[GraalVM Native Image capability](https://docs.spring.io/spring-boot/docs/3.0.0/reference/html/native-image.html#native-image) allows you to compile Java applications to standalone executables, known as native images. These executables can provide significant benefits, including faster startup times and lower runtime memory overhead compared to a traditional JVM (Java Virtual Machine). You can [deploy Spring Boot native image applications](https://learn.microsoft.com/en-us/azure/spring-apps/how-to-enterprise-deploy-polyglot-apps?tabs=Portal%2Casa-managed-container-registry#supported-languages-for-deployments) using [the Cloud Native Buildpack for Java Native Image](https://docs.vmware.com/en/VMware-Tanzu-Buildpacks/services/tanzu-buildpacks/GUID-java-native-image-java-native-image-buildpack.html).

In Figure 2 below, it shows the optimized memory usage of a native image deployment – which is about 1/5th of the memory consumed by its equivalent JAR deployment - for a constant workload of 400 requests per second into the [monolithic version of the Petclinic application](https://aka.ms/petclinic-native).

GraalVM requires a significant number of resources to build Java native images due to the complexity of the underlying process. The compilation and optimization steps involved in generating native images require substantial computational power and memory.

In Azure Spring Apps Enterprise, you have the advantage of being able to allocate up to [64 vCPUs and 128 GB](https://learn.microsoft.com/en-us/azure/spring-apps/how-to-enterprise-build-service?tabs=azure-portal#configure-the-build-agent-pool) of memory for the build agent pool. With these ample resources at your disposal, you can build your Java native images in a highly efficient and resource-rich environment.

![](https://raw.githubusercontent.com/joshlong/blog-images/master/azure_spring_apps_enterprise_more_power_scalability_extended_spring_boot_support/2.jpg)

Figure 2 – Shows optimized memory usage of a native image deployment – about 1/5th of the memory consumed by its equivalent JAR deployment - for a constant workload of 400 requests per second into the monolithic version of the Petclinic application.

### [](#bring-your-own-azure-container-registry----seamless-deployment-across-environments)Bring Your Own Azure Container Registry -- Seamless Deployment Across Environments

\*Bring your own ACR: Azure Spring Apps Enterprise now offers the flexibility to bring your own Azure Container Registry (ACR), promoting seamless application deployment across different environments. \*

With Azure Spring Apps Enterprise, users have the advantage of utilizing the ["Bring Your Own Azure Container Registry (ACR)"](https://learn.microsoft.com/en-us/azure/spring-apps/how-to-enterprise-build-service?tabs=azure-portal#build-and-deployment-characteristics) feature. This functionality lets users store container images built by Tanzu Build Service within the Azure Spring Apps Enterprise environment, promoting seamless deployment of the same image across various environments, regions, local machines for testing, on-premises setups, and more. Until now, an Azure Spring Apps Enterprise service instance has managed an Azure Container Registry service instance for container images built by Tanzu Build Service, with the Registry bundled within the service instance. But from now on, users can opt between using the Azure Container Registry managed by the service instance or choosing to Bring Your Own Azure Container Registry. This enhancement provides more flexibility and consistency in deployment processes, simplifies management across multiple environments, and facilitates efficient application distribution across different platforms.

### [](#assurance-for-continuity----extended-spring-boot-2xx-support-until-feb-2025)Assurance for Continuity -- Extended Spring Boot 2.x.x Support until Feb 2025

*Extended Spring Boot support: Azure Spring Apps Enterprise grants you VMware Spring Runtime Support, which includes support for Spring Boot 2.x.x until February 2025, providing customers with more time for application upgrades.*

Many enterprises and developers may not be aware that open-source support for older versions of the Spring Framework and Spring Boot is set to end in November 2023. This development could leave organizations without commercial support contracts struggling to access patches or security updates. As a result, companies may encounter increased security, compliance, and legal risks.

Azure Spring Apps Enterprise provides valuable benefits for these developers and customers facing the complex task of upgrading Spring apps. Support for Spring Boot 2.x.x by the open-source community will end on [Nov 18th, 2023\*](https://spring.io/projects/spring-boot#support). With the need to navigate through [multiple upgrade tasks](https://spring.io/blog/2022/05/24/preparing-for-spring-boot-3-0), such as transitioning to Java 17, adopting the latest Spring Boot versions, handling deprecated code in Spring Boot 2.x.x, and ensuring compatibility with Jakarta EE 9, developers require adequate time and support. Azure Spring Apps Enterprise users are entitled to commercial support for Spring apps through the VMware Spring Runtime Support. By offering extended commercial support for Spring Boot 2.x.x until February 2025, Azure Spring Apps Enterprise provides a unique cushion for developers and customers, allowing them the necessary time to successfully upgrade their applications while mitigating the risks associated with delayed upgrades, as exemplified by many data breaches and subsequent costly consequences.

![](https://raw.githubusercontent.com/joshlong/blog-images/master/azure_spring_apps_enterprise_more_power_scalability_extended_spring_boot_support/1.jpg) \*Figure 3 – Commercial support timeline for Spring Boot\*

\* You can find the current support timelines for Spring projects at [https://spring.io/](https://spring.io/)

## [](#experience-azure-spring-apps-enterprise-today)Experience Azure Spring Apps Enterprise today!

Azure Spring Apps Enterprise delivers simplicity and productivity, and you can leverage Spring experts to make your projects even more successful. You can easily deploy your Spring and polyglot applications to the cloud and get them up and running in no time. It is a golden path to production that simplifies the deployment process and optimizes your resource usage.

And the best part? We are offering [FREE monthly grants](https://aka.ms/costs-less) on all tiers - 50 vCPU hours and 100 GB hours per tier. This is the number of FREE hours you get BEFORE any usage is billed, giving you a chance to test out the service without any financial charges.

So why wait? Take advantage of our FREE monthly grants and deploy your [first Spring app](https://aka.ms/Deploy-Spring) to Azure Spring Apps Enterprise today!

![](https://raw.githubusercontent.com/joshlong/blog-images/master/azure_spring_apps_enterprise_more_power_scalability_extended_spring_boot_support/4.jpg)