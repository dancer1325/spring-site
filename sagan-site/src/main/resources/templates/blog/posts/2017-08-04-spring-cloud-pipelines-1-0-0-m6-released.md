---
title: Spring Cloud Pipelines 1.0.0.M6 Released
source: https://spring.io/blog/2017/08/04/spring-cloud-pipelines-1-0-0-m6-released
scraped: 2026-02-23T16:24:41.411Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Marcin Grzejszczak |  August 04, 2017 | 0 Comments
---

# Spring Cloud Pipelines 1.0.0.M6 Released

_Releases | Marcin Grzejszczak |  August 04, 2017 | 0 Comments_

On behalf of the Spring Cloud team it is my pleasure to announce a new milestone release of Spring Cloud Pipelines - `1.0.0.M6`.

## [](#whats-new)[](#what-s-new)What’s new?

### [](#pipeline-descriptor)[](#pipeline-descriptor)Pipeline descriptor

Each application can contain a file called `pipeline.yml` with the following structure:

```
CopylowercaseEnvironmentName1:
    services:
        - type: service1Type
          name: service1Name
          coordinates: value
        - type: service2Type
          name: service2Name
          key: value
lowercaseEnvironmentName2:
    services:
        - type: service3Type
          name: service3Name
          coordinates: value
        - type: service4Type
          name: service4Name
          key: value
```

For a given environment we declare a list of infrastructure services that we want to have deployed. Services have

-   `type` (example: `eureka`, `mysql`, `rabbitmq`, `stubrunner`) - this value gets then applied to the `deployService` Bash function
    
-   `name` - name of the service to get deployed
    
-   `coordinates` - coordinate that allows you to fetch the binary of the service. Examples: It can be a maven coordinate `groupid:artifactid:version`, docker image `organization/nameOfImage`, etc.
    
-   arbitrary key value pairs - you can customize the services as you wish
    

The `stubrunner` type can also have the `useClasspath` flag turned on to true or false.

Example:

```
Copytest:
  services:
    - type: rabbitmq
      name: rabbitmq-github-webhook
    - type: mysql
      name: mysql-github-webhook
    - type: eureka
      name: eureka-github-webhook
      coordinates: com.example.eureka:github-eureka:0.0.1.M1
    - type: stubrunner
      name: stubrunner-github-webhook
      coordinates: com.example.eureka:github-analytics-stub-runner-boot-classpath-stubs:0.0.1.M1
      useClasspath: true
stage:
  services:
    - type: rabbitmq
      name: rabbitmq-github
    - type: mysql
      name: mysql-github
    - type: eureka
      name: github-eureka
      coordinates: com.example.eureka:github-eureka:0.0.1.M1
```

When the deployment to `test` or deployment to `stage` occurs, Spring Cloud Pipelines will:

-   for `test` environment, delete existing services and redeploy the ones from the list
    
-   for `stage` environment, if the service is not available it will get deployed. Otherwise nothing will happen
    

### [](#release-notes)[](#release-notes)Release Notes

You can click [here to see the Release Notes](https://github.com/spring-cloud/spring-cloud-pipelines/releases/tag/v1.0.0.M6) for more information about what’s been done for this milestone.

## [](#feedback-needed)[](#feedback-needed)Feedback needed

If you’re already using Spring Cloud Pipelines please comment under [this issue](https://github.com/spring-cloud/spring-cloud-pipelines/issues/55) with steps you needed to take to customize the project to suit your company’s needs. Without your feedback I won’t be able to automate the customization process!

## [](#webinar)[](#webinar)Webinar

If you’re interested in more information about the project please check out the [Spring Cloud Pipelines webinar](https://content.pivotal.io/webinars/continuous-deployment-to-the-cloud) that was recorded recently.

## [](#links)[](#links)Links

Please check out any of these links for more information or to contact us:

-   [Project page](http://cloud.spring.io/spring-cloud-pipelines/)
    
-   [Project documentation](http://cloud.spring.io/spring-cloud-pipelines/spring-cloud-pipelines.html)
    
-   [Concourse opinionated pipeline setup](http://cloud.spring.io/spring-cloud-pipelines/spring-cloud-pipelines.html#concourse)
    
-   [Concourse Website](http://concourse.ci)
    
-   [Jenkins opinionated pipeline setup](http://cloud.spring.io/spring-cloud-pipelines/spring-cloud-pipelines.html#jenkins)
    
-   [Spring Cloud Pipelines Gitter](https://gitter.im/spring-cloud/spring-cloud-pipelines)