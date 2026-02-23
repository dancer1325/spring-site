---
title: Unleash Spring apps in a flex environment with Azure Spring Apps Consumption and Dedicated plans
source: https://spring.io/blog/2023/05/23/unleash-spring-apps-in-a-flex-environment-with-azure-spring-apps-consumption
scraped: 2026-02-23T09:49:59.274Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  May 23, 2023 | 0 Comments
---

# Unleash Spring apps in a flex environment with Azure Spring Apps Consumption and Dedicated plans

_Engineering | Josh Long |  May 23, 2023 | 0 Comments_

In March, we [introduced](https://techcommunity.microsoft.com/t5/apps-on-azure-blog/start-from-zero-and-scale-to-zero-azure-spring-apps-consumption/ba-p/3774825) the Consumption pricing plan for Azure Spring Apps allowing you to start from zero and scale to zero vCPU. Today, we are thrilled to announce the public preview of the Standard Dedicated plan! The Standard Dedicated plan provides a fully managed, dedicated environment for running Spring applications on Azure. This plan offers you customizable compute options (including memory-optimized), single tenancy, and high availability to help you achieve price predictability, cost savings, and performance for running Spring applications at scale.

![](https://raw.githubusercontent.com/joshlong/blog-images/master/spring-apps-in-flex-environment-consumption-and-dedicated-plans-2023-05-23/Picture1.jpg)

In 2019, Microsoft and Pivotal (now VMware) announced Azure Spring Apps, a fully managed service for Spring apps. We set out to solve many of the common challenges enterprise developers face when running Spring apps at scale. The service manages dynamic scaling, security patching, out-of-the-box instrumentation for monitoring, and more so developers can focus on their apps. Since then, we’ve worked with many customers including [Bosch](https://customers.microsoft.com/en-us/story/1475571259638279673-bosch-delivers-supply-chain-efficiencies-java-azure), [Digital Realty](https://customers.microsoft.com/en-us/story/1481416780494356121-digital-realty-powers-global-portal-rest-apis-azure-spring-cloud), [FedEx](https://techcommunity.microsoft.com/t5/apps-on-azure-blog/azure-spring-apps-enterprise-tier-is-now-generally-available/ba-p/3418245), [Kroger](https://www.youtube.com/watch?v=EfgiW6xJseM), [Liantis](https://customers.microsoft.com/en-us/story/1449469395802117015-liantis-professional-services-scales-hr-affairs-applications-azure-spring-cloud), [Morgan Stanley](https://www.youtube.com/watch?v=wdwjqXTFFZ0&feature=youtu.be), [National Life](https://techcommunity.microsoft.com/t5/apps-on-azure-blog/azure-spring-apps-enterprise-tier-is-now-generally-available/ba-p/3418245), [Raley's](https://customers.microsoft.com/en-us/story/1388620728739667057-raleys-uses-azure-spring-cloud-to-optimize-scale-and-drive-innovation), and [Swiss Re](https://aka.ms/swiss-re) to help them adopt the service.

We continue to listen to our customers, and here is what we have learned:

-   Many customers have apps that don't run constantly or experience bursts of traffic.
-   They have a diverse app hosting environment, with Azure Spring Apps hosting backend apps while containers or functions handle other types of apps. Managing network configuration across multiple hosting services can be overwhelming.
-   They need more flexibility in configuring vCPU and memory for their apps.

The new Dedicated plan guarantees single tenancy and specialized “compute” options including memory-optimized choices. It runs in the same environment as the serverless Azure Spring Apps Consumption plan. This allows any app from monolith to microservice-based that may have different resource requirements depending on app purpose or dev stack used to run in the same environment. The environment provides an execution, isolation, and observability boundary that allows apps within it to easily call other apps in the environment, as well as provide a single place to view logs from all apps.

With the new Dedicated plan and the existing Consumption plan, you can:

-   Get started with Consumption to scale from zero and scale to zero.
-   Use a Consumption plan for apps that do not run constantly or experience bursts of traffic.
-   Use a Dedicated plan for achieving single-tenancy, price predictability, and cost savings.
-   Mix and match Consumption and Dedicated for your apps in an Azure Spring Apps service instance.
-   Allocate as little as .1 vCPU to as much as 16 vCPUs and 0.1 GB to 128 GB for an app instance in the Consumption and Dedicated plans.
-   Simplify networking by placing Azure Spring Apps, Container Apps, and Functions in the same environment.

Figure 1 and 2 shows how you can choose both Dedicated and Consumption plan as a combined option and create an app using the Azure Portal.

![](https://raw.githubusercontent.com/joshlong/blog-images/master/spring-apps-in-flex-environment-consumption-and-dedicated-plans-2023-05-23/Picture2.jpg) Figure 1 – screenshot that shows how to create Azure Spring Apps Standard Consumption and Dedicated Plan using the Azure Portal ![](https://raw.githubusercontent.com/joshlong/blog-images/master/spring-apps-in-flex-environment-consumption-and-dedicated-plans-2023-05-23/Picture3.jpg) Figure 2 – screenshot that shows how to create an app with Dedicated profile in an Azure Spring Apps Standard Consumption and Dedicated plan using the Azure Portal

# [](#deploy-and-manage-spring-and-polyglot-applications)Deploy and manage Spring and polyglot applications

Looking to deploy and manage Spring and polyglot applications with ease? You don’t have to look further than the Azure Spring Apps Consumption and Dedicated plans.

![](https://raw.githubusercontent.com/joshlong/blog-images/master/spring-apps-in-flex-environment-consumption-and-dedicated-plans-2023-05-23/Picture4.jpg)

Azure Spring Apps Dedicated plan allows you to deploy Spring apps alongside other containerized apps built using any language, such as Java, NodeJS, Python, Go, and .NET Core, in the Azure Container Apps environment. Using this deployment option lets you simplify virtual network configuration and management by running all your apps in the same environment.

With Azure Spring Apps Consumption and Dedicated plans, you don’t need to worry about creating different subnets and network security groups for different types of applications - everything can run seamlessly in the same environment. Plus, our service is designed to make deployment and management as easy as possible, so you can focus on what matters most - building great apps.

# [](#focus-on-code----at-microsoft-build-conference)Focus on code -- at Microsoft Build conference

Join us at the Microsoft Build conference and discover how Azure Spring Apps, with Consumption and Dedicated plans, empower you to focus on code rather than infrastructure when building a line of business systems or external facing systems. Additionally, explore how you can leverage diverse hosting services within the same Azure Container Apps environment to build other apps. Don't miss this opportunity to revolutionize your migration, development, and go-live processes! [aka.ms/focus-on-code](https://aka.ms/focus-on-code)

![](https://raw.githubusercontent.com/joshlong/blog-images/master/spring-apps-in-flex-environment-consumption-and-dedicated-plans-2023-05-23/Picture5.jpg)

# [](#try-today)Try today

If you are a developer running Spring applications at scale, you know the challenges that come with it. That is why Microsoft and VMware teamed up in 2019 to create Azure Spring Apps - a solution designed to make your life easier.

With Azure Spring Apps, you can easily deploy your event-driven Spring applications to the cloud and get them up and running in no time. It is a golden path to production that simplifies the deployment process and optimizes your resource usage.

Want a flexible and cost-effective way to use Azure Spring Apps? Look no further than our Consumption and Dedicated pricing plans!

And the best part? We're offering [FREE monthly grants](https://techcommunity.microsoft.com/t5/apps-on-azure-blog/price-reduction-azure-spring-apps-does-more-costs-less/ba-p/3614058) on all tiers - 50 vCPU hours and 100 memory GB hours per tier\*. This is the number of FREE hours you get BEFORE any usage is billed, giving you a chance to test out the service without any financial charges.

So why wait? Take advantage of our FREE monthly grants and deploy [your first event-driven](https://learn.microsoft.com/en-us/azure/spring-apps/quickstart-deploy-event-driven-app-standard-consumption?pivots=sc-consumption-plan) Spring app to Azure Spring Apps today! [With our Consumption and Dedicated pricing](https://azure.microsoft.com/en-us/pricing/details/spring-apps/) plans, you can optimize your resource usage and save money on your cloud computing costs.

![](https://raw.githubusercontent.com/joshlong/blog-images/master/spring-apps-in-flex-environment-consumption-and-dedicated-plans-2023-05-23/Picture6.jpg)

The Azure Spring Apps Standard Dedicated plan public preview is now available. We’re committed to bringing you the latest and greatest innovation for cloud services. We’re working on bringing the same innovation to Azure Spring Apps Enterprise, so stay tuned for even more great things to come.