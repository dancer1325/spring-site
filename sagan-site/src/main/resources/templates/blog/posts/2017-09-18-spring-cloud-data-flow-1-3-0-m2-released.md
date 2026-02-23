---
title: Spring Cloud Data Flow 1.3.0.M2 released
source: https://spring.io/blog/2017/09/18/spring-cloud-data-flow-1-3-0-m2-released
scraped: 2026-02-23T16:21:40.413Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Glenn Renfro |  September 18, 2017 | 0 Comments
---

# Spring Cloud Data Flow 1.3.0.M2 released

_Releases | Glenn Renfro |  September 18, 2017 | 0 Comments_

We are pleased to announce the 1.3.0. M2 release of the Spring Cloud Data Flow and its associated ecosystem of projects.

Local Server: [Getting Started Guide](https://docs.spring.io/spring-cloud-dataflow/docs/1.3.0.M2/reference/htmlsingle/#getting-started).

## [](#dashboard--flo)Dashboard / Flo

In this second installment of 1.3 release of Dashboard/Flo, we have addressed the core functionalities backing the streaming and task/batch operations.

Continuing the [Angular4 based infrastructure upgrades](https://spring.io/blog/2017/08/07/spring-cloud-data-flow-1-3-0-m1-released), the streaming and task/batch workflows now include the modern look and feel and are packed with usability improvements as well.

[Documentation](http://cloud.spring.io/spring-cloud-dataflow-ui/), [test-coverage](https://codecov.io/gh/spring-cloud/spring-cloud-dataflow-ui/branch/master), and [webpack bundle-analyzer](https://github.com/spring-cloud/spring-cloud-dataflow-ui/pull/434) have gone through significant improvements and additions.

## [](#fan-in-and-fan-out)Fan-in and Fan-out

Due to the popular demand from the community, customers, and field, this release includes support for [fan-in and fan-out](https://docs.spring.io/spring-cloud-dataflow/docs/1.3.0.M2/reference/htmlsingle/#_fan_in_and_fan_out) visual representation of data pipelines. The following image shows fanning at work:

![Fan-OutDashboard Screenshot](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/gh-pages/img/flo-fan-out.png "Fan-Out Dashboard Screenshot")

As an addition, there is a new control to directly branch out from a specific node to [TAP the stream](https://docs.spring.io/spring-cloud-dataflow/docs/1.3.0.M2/reference/htmlsingle/#spring-cloud-dataflow-stream-dsl-tap) from that position.

![Stream Switch Dashboard Screenshot](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/gh-pages/img/stream-switch-1-3-m1.png "Stream Switch Dashboard Screenshot")

Likewise, there’s also an option to switch the primary stream within the topology. It is just one click away - its that simple!

## [](#direct-named-channel-controls)Direct Named Channel Controls

Spring Cloud Data Flow always included support for data pipelines that interact with [named-destinations](https://docs.spring.io/spring-cloud-dataflow/docs/1.3.0.M2/reference/htmlsingle/#spring-cloud-dataflow-stream-dsl-named-destinations) as a producer, a consumer, or both. This release adds the ability to interact with them visually, and it makes building a complex topology easier. There can be “n” combinations of producers and consumers connected to a common destination, which is very powerful for architectures involving wide variety of data sources and destinations. The following image shows an example of a complex topology:

![Directed Name ChannelDashboard Screenshot](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/gh-pages/img/directed-name-channel-1-3-m1.png "Directed Name Channel Dashboard Screenshot")

## [](#app-registry-and-maven-update-policies)App Registry and Maven Update Policies

Users who are [resolving maven artifacts](https://docs.spring.io/spring-cloud-dataflow/docs/1.3.0.M2/reference/htmlsingle/#spring-cloud-dataflow-register-stream-apps) from a public or private maven artifactory can now take advantage of the “[update-policy](https://docs.spring.io/spring-cloud-dataflow/docs/1.3.0.M2/reference/htmlsingle/#getting-started-maven-configuration)” feature. You can use this ability to override and refresh Spring Cloud Data Flow’s internal maven cache. For instance, in development, you can continuously resolve SNAPSHOT versions of the maven artifact by setting `update-policy=always`, which will force the download of the latest version of the streaming or batch/task application that’s in use in the DSL/Dashboard.

## [](#note-on-security)Note on Security

Given the [traditional and OAuth security support](https://docs.spring.io/spring-cloud-dataflow/docs/1.3.0.M2/reference/htmlsingle/#configuration-security) in Spring Cloud Data Flow and the requirement to have the similar coverage for its companion servers such as [spring-cloud/spring-cloud-dataflow-metrics-collector](https://github.com/spring-cloud/spring-cloud-dataflow-metrics-collector), [spring-cloud-task-app-starters/composed-task-runner](https://github.com/spring-cloud-task-app-starters/composed-task-runner), and the soon-to-be-released [spring-cloud/spring-cloud-skipper](https://github.com/spring-cloud/spring-cloud-skipper), we have extracted the common security infrastructure into a standalone library. The [spring-cloud/spring-cloud-common-security-config](https://github.com/spring-cloud/spring-cloud-common-security-config) library will be reused in companion servers in future releases.

## [](#shell-improvements)Shell Improvements

This release adds “autocompletion” for stream and task/batch names and other metadata. No more guessing - everything is a TAB press away! Check out the following screencast to learn more about the advanced shell features, tips, and tricks:

## [](#version-compatibility)Version Compatibility

This release brings the Spring Boot 1.5.7 compatibility and the underlying Spring Cloud infrastructure is updated to Dalston.SR3. For more details, please review the [1.3.0 M2 release notes](https://github.com/spring-cloud/spring-cloud-dataflow/releases).

Looking ahead, we are aiming for 1.3.0 M3 followed by the release candidate and then the general availability release by October 2017.

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) or [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-stream).

Please try it out, share your feedback, and consider contributing to the project!