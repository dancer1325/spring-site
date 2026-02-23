---
title: Spring Cloud Pipelines to Cloud Pipelines Migration
source: https://spring.io/blog/2018/11/13/spring-cloud-pipelines-to-cloud-pipelines-migration
scraped: 2026-02-23T15:07:18.739Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Marcin Grzejszczak |  November 13, 2018 | 1 Comment
---

# Spring Cloud Pipelines to Cloud Pipelines Migration

_Releases | Marcin Grzejszczak |  November 13, 2018 | 1 Comment_

[Spring Cloud Pipelines](https://github.com/spring-cloud/spring-cloud-pipelines) is a GitHub project that tries to solve the following problems:

-   Creation of a common deployment pipeline
    
-   Propagation of good testing and deployment practices
    
-   Reducing the time required to deploy a feature to production.
    

The first commit took place on 31-08-2016. Since then, we have gotten a lot of feedback from the community related to the suggested deployment pipeline and its concrete visualisations. Over those two years, the most important features we have managed to build are:

-   Opinionated deployment pipeline setup
    
-   Scripts for the pipeline, to verify backward compatibility of your project and allow zero-downtime deployment
    
-   Support for PHP, .NET, NodeJS, and JVM (Maven & Gradle) projects
    
-   Deployment option for Cloud Foundry
    
-   Deployment option for Kubernetes
    
-   Deployment option via Ansible
    
-   Pipeline visualisation in Jenkins by using Jenkins Job DSL
    
-   Pipeline visualisation in Jenkins by using Jenkinsfile
    
-   Pipeline visualisation in Concourse
    

We would like to announce the next [1.0.0.M9](https://github.com/spring-cloud/spring-cloud-pipelines/releases/tag/v1.0.0.M9) release of Spring Cloud Pipelines, which will also be its last in the current form.

# [](#spring-cloud-pipelines)[](#spring-cloud-pipelines)(Spring) Cloud Pipelines

Since I’m a member of the Spring Cloud team, we have decided to put it under the Spring Cloud umbrella. Other than that, the project has nothing to do with Spring Cloud, not to mention Spring in general.

That is why we have decided to split the project into pieces, rename it, and put it into a separate GitHub organization.

# [](#welcome-cloud-pipelines)[](#welcome-cloud-pipelines)Welcome, Cloud Pipelines!

[Spring Cloud Pipelines](https://github.com/spring-cloud/spring-cloud-pipelines/) has a new home and a new name. The projects now lays under the [Cloud Pipelines](https://github.com/CloudPipelines/) organisation at GitHub. The project, as a result, was split into the following pieces:

-   [Scripts](https://github.com/CloudPipelines/scripts): Contains core logic of the deployment pipeline. You can call this repository `recipes`. Each recipe contains a step of the deployment pipeline. The documentation is [here](https://cloudpipelines.github.io/scripts/).
    
-   [Concourse](https://github.com/CloudPipelines/concourse): Pipeline visualisation done with [Concourse](https://concourse-ci.org/). The documentation is [here](https://cloudpipelines.github.io/concourse/).
    
-   [Jenkins](https://github.com/CloudPipelines/jenkins): Pipeline visualisation done with [Jenkins](https://jenkins.io/index.html). The documentation is [here](https://cloudpipelines.github.io/jenkins/).
    
-   [Project Crawler](https://github.com/CloudPipelines/project-crawler): Abstraction over fetching data from repository management services.
    
-   [Pipeline Base](https://github.com/CloudPipelines/pipeline-base): Docker base image used by CI servers.
    

After migrating the projects to the new organisation, we have decided to mark them as **feature complete**. We’ve been working on Spinnaker for a little while now and plan to invest in enabling Cloud Pipelines recipes for rollback testing and contract testing to run on Spinnaker. For other areas of overlap like deployment strategies, we would like to rely on Spinnaker’s abstraction. Of course, we will facilitate any discussions around the project and chores related to issues, pull requests and releases, but we can safely state that the project will be fully driven and maintained by the community.

If you are interested in migrating your project from Spring Cloud Pipelines to Cloud Pipelines, you should check out the migration guides:

-   [Migration guide for scripts](https://github.com/CloudPipelines/scripts/wiki/Migration-from-Spring-Cloud-Pipelines)
    
-   [Migration guide for Jenkins](https://github.com/CloudPipelines/jenkins/wiki/Migration-from-Spring-Cloud-Pipelines)
    

# [](#why-spinnaker)[](#why-spinnaker)Why Spinnaker?

Spinnaker is an open source multi-cloud continuous delivery platform which started at Netflix but now involves a wider community of contributors from Google, Amazon, Pivotal, and many others. A collaborative effort by the Spring team and Pivotal Cloud R&D has led to Cloud Foundry support in Spinnaker.

Spinnaker gives us access to a wider array of supported cloud providers without having to reinvent these interactions.

The work to-date on zero-downtime deployments and rollback testing in Cloud Pipelines reveals a key value of a continuous delivery platform like Spinnaker that separately maintains an inventory of the assets in your deployed environments.

-   In Cloud Pipelines, the current production system state was not being stored. To mitigate this issue we used the Git tags to store state. That, however, can be easily broken when manual deployments or rollbacks take place. Also, the production system state may span multiple versions (across cloud providers or regions) and is in general irreducible to a single value that can be stored in a tag. A Spinnaker pipeline performing, for example, a rollback test is free to use Spinnaker’s knowledge of the state of the system to contextualize the rollback test to the production version in the target regions independently of one another.
    
-   The deployment options provided in Cloud Pipelines are limited. Spinnaker generalizes blue/green, rolling push, zero-downtime and automated canary analysis deployment features across a range of supported cloud providers.
    

To be more concrete, consider blue/green deployment. Spinnaker supports blue/green while maintaining an arbitrary number of prior version server groups. From the current version of the app in the below example, you are one action away from rolling back to a version of the app that is several versions from the most recent. At any time, we could choose to destroy V022,

![Spinnaker](https://gist.githubusercontent.com/marcingrzejszczak/c3ee4edd89afdf251ff968e6709cc6fc/raw/9e816227a45df6108104b570a41d499660798f78/spinnaker.png)

effectively making it unavailable to roll back to. Such a thing could happen out-of-band from a deployment activity (such as to free capacity), making stateless systems less able to deal with change.

# [](#get-involved)[](#get-involved)Get Involved!

We welcome your input, in a variety of forms. If you have questions about Spinnaker, ask on [Stack Overflow](https://stackoverflow.com/) and use the `#spinnaker` tag. In case of Cloud Pipelines, ask questions on GitHub. If you want to work on the code, we love pull requests. If you spot a problem, please submit an issue on Github.