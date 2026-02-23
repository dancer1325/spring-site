---
title: Spring Integration 5.0 Milestone 3 Available
source: https://spring.io/blog/2017/04/05/spring-integration-5-0-milestone-3-available
scraped: 2026-02-23T16:28:53.725Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  April 05, 2017 | 4 Comments
---

# Spring Integration 5.0 Milestone 3 Available

_Releases | Artem Bilan |  April 05, 2017 | 4 Comments_

The Spring Integration team is pleased to announce that the third milestone for the Spring Integration 5.0 release (`5.0.0.M3`) is now available.

[53 JIRAs](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10121&version=15860) (and some GitHub issues) made into this release, including bug fixes and a number of new features. Some highlights since the previous [Milestone 2](https://spring.io/blog/2017/01/05/spring-integration-5-0-milestone-2-available):

-   Initial implementation for a Spring Integration Testing Framework - the `@SpringIntegrationTest` annotation for test classes and `MockIntegration` factory help you to write unit tests for integration flows and channel adapters. We intend to flush out this capability with more features before GA, including more mocking, verifications and some `send-and-receive` utilities to test components in isolation. Feedback is welcome!
    
-   POJO handler method invocations (`@ServiceActivator`, `@Transformer` etc., or such methods invoked from XML definitions) now use `InvocableHandlerMethod` by default. Together with the `ConfigurableCompositeMessageConverter` and `@Default` utilities that allows us to implement conditional method invocation scenarios based on the Content-Type and target method arguments resolution. To restore the previous SpEL-based behavior, the `@UseSpelInvoker` method-level annotation is provided.
    
-   A based on the WebFlux `WebClient` `ReactiveHttpRequestExecutingMessageHandler` implementation is provided. Together with a `ReactiveChannel` as an `outputChannel` options it provides backpressure manner for remote HTTP service consumption.
    
-   The (S)FTP (and AWS S3) Inbound Channel Adapters can now restore file tree locally. For that purpose a new, `Files.walk()` based, `RecursiveDirectoryScanner` is introduced. The `useWatchService` option is also provided.
    
-   Web Services Gateways now can exchange `WebServiceMessage` s directly as the inbound/outbound `payload`. This allows the support of MTOM via direct access to `WebServiceMessage` properties. The `UnmarshallingTransformer` can now process a `MimeMessage` as the payload to unmarshal it into an object graph with attachments.
    
-   The reply producing `MessageHandler` now has a fallback to the `replyChannel` header from the reply message, if there is no `outputChannel` or `replyChannel` in the request message headers. This allows the implementation of business process-like scenarios when the next step is determined by the result of current calculations.
    

We would like to thank several community members for their ongoing active contributions to the framework; scan [the commits](https://github.com/spring-projects/spring-integration/commits/v5.0.0.M3) and give them some kudos!

We are working towards the M4 release in time for the Spring Boot 2.0 milestone; with the GA in early summer; shortly after the Spring Framework 5.0 release.

For a complete list of changes in `5.0`, also see the [What’s New](http://docs.spring.io/spring-integration/docs/5.0.0.M3/reference/html/whats-new.html) chapter in the reference manual.

[Project Page](http://projects.spring.io/spring-integration/) | [JIRA](https://jira.spring.io/browse/INT) | [Contributing](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)