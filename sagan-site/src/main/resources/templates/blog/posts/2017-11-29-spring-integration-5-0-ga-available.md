---
title: Spring Integration 5.0 GA Available
source: https://spring.io/blog/2017/11/29/spring-integration-5-0-ga-available
scraped: 2026-02-23T16:13:32.783Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  November 29, 2017 | 1 Comment
---

# Spring Integration 5.0 GA Available

_Releases | Artem Bilan |  November 29, 2017 | 1 Comment_

On behalf of the Spring Integration team I am pleased to announce that the GA release for the Spring Integration 5.0 version (`5.0.0.RELEASE`) is now available.

It can be downloaded from Maven Central, JCenter, and our [release repository](https://repo.spring.io/release):

```
Copycompile "org.springframework.integration:spring-integration-core:5.0.0.RELEASE"
```

First of all, special thanks to all community members for their ongoing active contributions to the framework!

Several [JIRAs](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10121&version=16196) (and some GitHub issues), since the previously announced [RC1](https://spring.io/blog/2017/11/01/spring-integration-5-0-release-candidate-1-available), are included in this release, mostly bug fixes from early adopters and Reference Manual improvements.

Well, this was a long story (almost 17 months) to come to this next generation for the Framework and here are some highlights of the major features:

-   The Spring Framework `5.0` code base with more reach functionality via Java 8 features;
    
-   Upgrade to the latest Spring projects dependencies with some new functionality from there;
    
-   Java DSL is now included into the Core project with a bunch of improvements and more organic Java 8 integration and code base;
    
-   Reactive Streams support via `FluxMessageChannel`, `ReactiveStreamsConsumer` and direct `org.reactivestreams.Subscriber` implementation in the `AbstractMessageHandler`;
    
-   New Spring WebFlux module with full Reactive support for requests and replies;
    
-   New Spring Integration Testing Framework with the `@SpringIntegrationTest` and `MockIntegration` features;
    
-   \- Significant performance boost for most POJO EIP method invocations.
    

For a complete list of changes in `5.0`, also see the [What’s New](http://docs.spring.io/spring-integration/docs/5.0.0.RELEASE/reference/html/whats-new.html) chapter in the reference manual.

In addition we have released maintenance [4.3.13](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10121&version=16347) version with a bunch of important bug fixes and improvements.

Important

I along with most of my colleagues on the Spring team will be at [Spring One Platform](https://springoneplatform.io) speaking about these new features in Spring Integration. Please, [meet me](https://springoneplatform.io/sessions/spring-integration-5-0-whats-new) there to hear about these amazing features from first hands!

Any feedback, feature ideas, critics, bug reports and questions are welcome via appropriate communication channels:

[Project Page](http://projects.spring.io/spring-integration/) | [JIRA](https://jira.spring.io/browse/INT) | [Contributing](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)