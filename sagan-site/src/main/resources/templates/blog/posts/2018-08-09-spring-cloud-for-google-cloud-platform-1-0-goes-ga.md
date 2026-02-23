---
title: Spring Cloud for Google Cloud Platform 1.0 goes GA!
source: https://spring.io/blog/2018/08/09/spring-cloud-for-google-cloud-platform-1-0-goes-ga
scraped: 2026-02-23T15:16:51.096Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  August 09, 2018 | 0 Comments
---

# Spring Cloud for Google Cloud Platform 1.0 goes GA!

_Releases | Artem Bilan |  August 09, 2018 | 0 Comments_

Dear Spring Community!

Today, [together with Google Cloud team](https://cloud.google.com/blog/products/gcp/calling-java-developers-spring-cloud-gcp-1-0-is-now-generally-available), I’m very excited to announce that [Spring Cloud](https://projects.spring.io/spring-cloud/) for [Google Cloud Platform](https://cloud.google.com/) project of version `1.0` is Generally Available at last!

This project has started as a collaboration with the Google Cloud team (and we really appreciate their effort) and aims to implement and expose well-know Spring Framework patterns and abstractions to bring the benefits of Spring and Spring Boot to Java developers using GCP services. Together we spent many hours (more than a year!) discussing the best APIs and approaches which should be convenient and useful to target projects aiming to consume GCP services. Even if we iterated the implementations multiple times to provide the developer experience, right now we believe that the project is mature and stable, and we believe in its potential. And now we are very thrilled to continue our collaboration for implementing more features to expose GCP services for Spring Cloud applications!

Please, consult the previously announced [Release Candidate 1](https://spring.io/blog/2018/06/28/spring-cloud-gcp-1-0-0-rc1-now-available) for a detailed description of the features the project implements so far. Since then, we have upgraded the project to the latest [Finchley SR1](https://spring.io/blog/2018/08/01/spring-cloud-finchley-sr1-is-available) with all the latest transitive dependencies and fixed several issues.

## [](#try-it-out)[](#try-it-out)Try it out!

The artifacts available from [Spring Release](http://repo.spring.io/release/) repository and Maven Central via BOM:

```
Copy<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-gcp-dependencies</artifactId>
            <version>1.0.0.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

The [Reference Documentation](https://docs.spring.io/spring-cloud-gcp/docs/1.0.0.RELEASE/reference/htmlsingle/) and [sample applications](https://github.com/spring-cloud/spring-cloud-gcp/tree/1.0.x/spring-cloud-gcp-samples) are available to get you started quickly.

Check out the latest walkthrough of Spring Cloud GCP project by our very [Josh Long](https://twitter.com/starbuxman) and [Ray Tsang](https://twitter.com/saturnism) from Google at Google Next 2018:

## [](#what-next)[](#what-next)What Next?

Now we are busy on more integrations and we’ve recently released a [1.1.0.M1](https://docs.spring.io/spring-cloud-gcp/docs/1.1.0.M1/reference/htmlsingle/) version that has a preview of the [Spring Data Cloud Spanner](https://docs.spring.io/spring-cloud-gcp/docs/1.1.0.M1/reference/html/_spring_data_cloud_spanner.html) and [Spring Cloud Config](https://docs.spring.io/spring-cloud-gcp/docs/1.1.0.M1/reference/html/_spring_cloud_config.html) support. The hard work in progress is around [Google Cloud Datastore](https://cloud.google.com/datastore/) for Spring Data abstractions. There are many more Google Cloud features we would like to tackle and expose for them Spring-based API and configuration conveniences. Don’t hesitate to come back to us with any feedback and even [contributions](https://github.com/spring-cloud/spring-cloud-gcp/blob/master/CONTRIBUTING.adoc)!

From the Spring Cloud GCP Team

> Don’t miss [SpringOne Platform](https://springoneplatform.io/) conference in Washington, D.C. this September! Together with Google team I’m going to represent these and more other features in the Spring Cloud for Google Cloud Platform project. Checkout the [sessions](https://springoneplatform.io/2018/sessions) and register!

[Project Page](https://cloud.spring.io/spring-cloud-gcp) | [issues](https://github.com/spring-cloud/spring-cloud-gcp/issues) | [Documentation](https://docs.spring.io/spring-cloud-gcp/docs/1.0.0.RELEASE/reference/htmlsingle)