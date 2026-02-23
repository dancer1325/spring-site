---
title: Spring Cloud Pipelines 1.0.0.M5 Released
source: https://spring.io/blog/2017/06/07/spring-cloud-pipelines-1-0-0-m5-released
scraped: 2026-02-23T16:30:14.372Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Marcin Grzejszczak |  June 07, 2017 | 0 Comments
---

# Spring Cloud Pipelines 1.0.0.M5 Released

_Releases | Marcin Grzejszczak |  June 07, 2017 | 0 Comments_

On behalf of the Spring Cloud team it is my pleasure to announce a new milestone release of Spring Cloud Pipelines - `1.0.0.M5`.

## [](#whats-new)[](#what-s-new)What’s new?

With [`1.0.0.M5`](https://github.com/spring-cloud/spring-cloud-pipelines/milestone/4?closed=1) we’ve added a new step in the `Build` stage called `API Compatibility check`. Now, your pipeline can break when, as a HTTP / messaging producer, you’re doing a backward incompatible change. We’re checking what were the latest contracts you’ve defined for your most recent production deployment and from those contracts we’re generating tests to your current application.

![API Compatibility check](http://cloud.spring.io/spring-cloud-pipelines/img/intro/build.png)

You can read more about this feature in [Spring Cloud Pipelines Docs](http://cloud.spring.io/spring-cloud-pipelines/spring-cloud-pipelines.html#_build)

Also, the one and only Ryan Baxter, has added support for GPG keys in Jenkins.

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