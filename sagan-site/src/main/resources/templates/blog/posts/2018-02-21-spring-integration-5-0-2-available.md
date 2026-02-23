---
title: Spring Integration 5.0.2 Available
source: https://spring.io/blog/2018/02/21/spring-integration-5-0-2-available
scraped: 2026-02-23T16:08:19.904Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  February 21, 2018 | 1 Comment
---

# Spring Integration 5.0.2 Available

_Releases | Artem Bilan |  February 21, 2018 | 1 Comment_

On behalf of the Spring Integration team I am pleased to announce that the `5.0.2.RELEASE` maintenance version for the Spring Integration is available.

It can be downloaded from Maven Central, JCenter, and our [release repository](https://repo.spring.io/release):

```
Copycompile "org.springframework.integration:spring-integration-core:5.0.2.RELEASE"
```

As usual I would like to thank all community members for their ongoing active contributions to the framework!

Along with upgrades to the latest Spring Framework `5.0.4` and Reactor `Bismuth-SR6` versions, this Spring Integration [support version](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10121&version=16635) provides a number of bug fixes, especially for the `@ServiceActivator` with a collection method argument and `LockRegistryLeaderInitiator`. So, everybody is encouraged to upgrade.

In addition this release brings several new features:

-   [Micrometer](http://micrometer.io) support for gathering messaging component metrics. To enable, simply declare a `MicrometerMetricsFactory` bean in the application context to override built-in metrics factory:

@Bean public MicrometerMetricsFactory metricsFactory(MeterRegistry meterRegistry) { return new MicrometerMetricsFactory(meterRegistry); }

Our intention is to make this `MicrometerMetricsFactory` the default in the next `5.1` version.

-   A `UdpServerListeningEvent` has been added to be emitted when a `UnicastReceivingChannelAdapter` is ready to receive UDP packages over the network. Useful when the configured port is zero and the operating system chooses the port. Also useful to avoid polling the `isListening()` if you need to wait before starting some other process to connect to the socket.
    
-   The `IntegrationGraphController` is now registered for the WebFlux environment as well.
    
-   The `@GlobalChannelInterceptor` s can now be applied to dynamically registered `MessageChannel` beans, too. This is useful in conjunction with the `IntegrationFlowContext` when we register `IntegrationFlow` s at runtime.
    

This version is a foundation for the latest Spring Boot [2.0 RC2](https://spring.io/blog/2018/02/21/spring-boot-2-0-0-rc2).

From here we are looking forward to switch the `master` to the `5.1` version to start working on new features and valuable improvements!

Any feedback, feature ideas, critics, bug reports and questions are welcome via appropriate communication channels:

[Project Page](http://projects.spring.io/spring-integration/) | [JIRA](https://jira.spring.io/browse/INT) | [Contributing](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)