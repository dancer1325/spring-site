---
title: Tanzu Observability by Wavefront Spring Boot Starter
source: https://spring.io/blog/2020/05/07/tanzu-observability-by-wavefront-spring-boot-starter
scraped: 2026-02-23T14:02:00.365Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Stéphane Nicoll |  May 07, 2020 | 2 Comments
---

# Tanzu Observability by Wavefront Spring Boot Starter

_Engineering | Stéphane Nicoll |  May 07, 2020 | 2 Comments_

Spring Boot has a great observability story. With the Actuator, we auto-configure [Micrometer](http://micrometer.io/), an application metrics facade that supports numerous monitoring systems. With a few properties, you can start emitting a wide range of metrics out-of-the-box to your favorite monitoring system. And if you need to use distributed tracing, [Spring Cloud Sleuth](https://spring.io/projects/spring-cloud-sleuth) gets you covered.

Tanzu Observability for Wavefront (formerly Wavefront) delivers scalable observability as a service where Spring developers can build analytics-driven dashboards based on multi-sourced data including metrics, traces, histograms, and span logs.

The Spring team has been working side-by-side with the Tanzu Observability team on [a starter](https://github.com/wavefrontHQ/wavefront-spring-boot) for a quick and easy way to get started. The starter also auto-provisions a free, Tanzu Observability account if you don’t already have one . The Tanzu blog has [an introduction to using Wavefront with Spring](https://tanzu.vmware.com/content/blog/byo-spring-boot-apps-tanzu-observability-for-free-no-sign-up-needed) and a [technical deep-dive](https://tanzu.vmware.com/content/practitioners-blog/zero-cost-no-sign-up-introducing-tanzu-observability-for-spring-boot-applications). You can also check out the [documentation](https://docs.wavefront.com/wavefront_springboot.html).

![Wavefront Dashboard](https://static.spring.io/blog/snicoll/20200507/wavefront.png "Wavefront Dashboard")

You can try out this platform by creating a new project on [https://start.spring.io](https://start.spring.io): select your favorite build tool, Spring Boot 2.3 and add at least the wavefront entry. You may want to select a web stack although this is not mandatory in any way.

Before starting the application, we want to make sure to identify its data later in the Tanzu Observability dashboard. Open `application.properties` and add the following:

```properties
Copywavefront.application.name=my-demo
wavefront.application.service=test
```

If you start such an app for the first time, you should see something like this:

```
CopyA Wavefront account has been provisioned successfully and the API token has been saved to disk.

To share this account, make sure the following is added to your configuration:

	management.metrics.export.wavefront.api-token=xxxx-xxxx-xxxx-xxxx
	management.metrics.export.wavefront.uri=https://wavefront.surf

Connect to your Wavefront instance using this one-time use link:
https://wavefront.surf/us/example
```

An account has been auto-provisioned for you and the necessary configuration has been provided to the auto-configuration in your project. Your new api token has been saved in your home directory and will be reused automatically for any app that’s started on the same machine and user.

The single-use login URL is provided every time you start the application. If you don’t have access to the logs of your web application, you can expose the wavefront Actuator endpoint and head over `/actuator/wavefront` and you’ll be redirected to your Wavefront dashboard.

If you are interested in testing distributed tracing, adding Spring Cloud Sleuth (also available from start.spring.io) lets you emit traces automatically to Wavefront. You can find these in `Application > Traces` in your Wavefront dashboard. The Tanzu Observability platform supports other flavors of distributed tracing as well. To learn more about it, check out the [documentation](https://docs.wavefront.com/tracing_basics.html).

The Wavefront Spring Boot starter is in the release candidate phase and we’d love to hear from you. Head over [https://start.spring.io](https://start.spring.io), create a new project with Wavefront and Spring Boot 2.3 and [let us know](https://github.com/wavefrontHQ/wavefront-spring-boot/issues) if you find any problem.