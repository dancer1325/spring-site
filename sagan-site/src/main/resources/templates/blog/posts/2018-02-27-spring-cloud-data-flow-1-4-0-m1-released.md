---
title: Spring Cloud Data Flow 1.4.0 M1 released
source: https://spring.io/blog/2018/02/27/spring-cloud-data-flow-1-4-0-m1-released
scraped: 2026-02-23T16:07:44.579Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gunnar Hillert |  February 27, 2018 | 0 Comments
---

# Spring Cloud Data Flow 1.4.0 M1 released

_Releases | Gunnar Hillert |  February 27, 2018 | 0 Comments_

The [Spring Cloud Data Flow](https://cloud.spring.io/spring-cloud-dataflow/) team is excited to announce the release of `1.4.0 M1`. Follow the *Getting Started* guides for [Local Server](https://docs.spring.io/spring-cloud-dataflow/docs/1.4.0.M1/reference/htmlsingle/#getting-started), [Cloud Foundry](https://docs.spring.io/spring-cloud-dataflow-server-cloudfoundry/docs/1.4.0.M1/reference/htmlsingle/#getting-started), and [Kubernetes](https://docs.spring.io/spring-cloud-dataflow-server-kubernetes/docs/1.4.0.M1/reference/htmlsingle/#kubernetes-getting-started).

A big focus of this first milestone release of the `1.4.x` line has been the [Dashboard UI](https://github.com/spring-cloud/spring-cloud-dataflow-ui). In an effort to keep our UI dependencies current at all times, we finally upgraded the UI to [Angular](https://angular.io/) `5.2` and [Angular CLI](https://github.com/angular/angular-cli) `1.6`. Furthermore, the UI now provides better integration with [Spring Cloud Skipper](https://cloud.spring.io/spring-cloud-skipper/).

As such, you can now manage the versions of App Registrations and set a default version.

![Manage Versions](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/gh-pages/img/ui-manage-versions-1-4-0-M1.png)

The version information is now shown on the App Registration list page as well. Besides providing better visual hues regarding the *Application Types* (Source, Sink, Task, Processor), you can now also search for App Registrations by *Application Type*.

![Manage Versions](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/gh-pages/img/ui-applications-list-1-4-0-M1v2.png)

Additionally, when browsing the App Registration details, you can easily select the version for which you would like to see the details.

![Application Details](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/gh-pages/img/ui-application-details-1-4-0-M1.png)

When deploying streams, you now have the ability to deploy them to multiple platforms.

![Deploy Streams to Platform](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/gh-pages/img/ui-deploy-stream-1-4-0-M1v2.png)

Lastly, in this release we also polished the [Reference Documentation](https://docs.spring.io/spring-cloud-dataflow/docs/1.4.0.M1/reference/htmlsingle/) and documented among other things the UI support for [named destinations](https://docs.spring.io/spring-cloud-dataflow/docs/1.4.0.M1/reference/htmlsingle/#spring-cloud-dataflow-stream-dsl-named-destinations) to facilitate [fan-in/fan-out](https://docs.spring.io/spring-cloud-dataflow/docs/1.4.0.M1/reference/htmlsingle/#_creating_fan_in_fan_out_streams) scenarios.

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) or [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-dataflow).

Please try it out, share your feedback, and consider contributing to the project!