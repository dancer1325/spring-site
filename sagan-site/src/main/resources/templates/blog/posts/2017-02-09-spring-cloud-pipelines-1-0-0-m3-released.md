---
title: Spring Cloud Pipelines 1.0.0.M3 Released
source: https://spring.io/blog/2017/02/09/spring-cloud-pipelines-1-0-0-m3-released
scraped: 2026-02-23T18:37:43.883Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Marcin Grzejszczak |  February 09, 2017 | 0 Comments
---

# Spring Cloud Pipelines 1.0.0.M3 Released

_Releases | Marcin Grzejszczak |  February 09, 2017 | 0 Comments_

On behalf of the Spring Cloud team it is my pleasure to announce a new milestone release of Spring Cloud Pipelines - `1.0.0.M3`.

## [](#whats-new)[](#what-s-new)What’s new?

Apart from some bug and documentation fixes it’s providing an out of the box support for blue green deployment on Cloud Foundry (both for Concourse and Jenkins)! This is how we do it.

![Production deployment](http://cloud.spring.io/spring-cloud-pipelines/img/intro/prod.png)

When you click `deploy to prod`

-   we’re renaming the current instance of the app e.g. `fooService` to `fooService-venerable`
    
-   we’re deploying the new instance of the app under the `fooService` name
    
-   now two instances of the same application are running on production
    

When you click on the `Complete switch over` step:

-   we’re deleting the old instance (`fooService-venerable`)

Important

Remember to run this step only after you have confirmed that both instances are working fine!

## [](#links)[](#links)Links

Please check out any of these links for more information or to contact us:

-   [Project page](http://cloud.spring.io/spring-cloud-pipelines/)
    
-   [Project documentation](http://cloud.spring.io/spring-cloud-pipelines/spring-cloud-pipelines.html)
    
-   [Concourse opinionated pipeline setup](http://cloud.spring.io/spring-cloud-pipelines/spring-cloud-pipelines.html#concourse)
    
-   [Concourse Website](http://concourse.ci)
    
-   [Jenkins opinionated pipeline setup](http://cloud.spring.io/spring-cloud-pipelines/spring-cloud-pipelines.html#jenkins)
    
-   [Jenkins Job Dsl Plugin](https://github.com/jenkinsci/job-dsl-plugin/wiki)
    
-   [Spring Cloud Pipelines Gitter](https://gitter.im/spring-cloud/spring-cloud-pipelines)
    
-   [Spring Cloud Pipelines GitHub page](https://github.com/spring-cloud/spring-cloud-pipelines)