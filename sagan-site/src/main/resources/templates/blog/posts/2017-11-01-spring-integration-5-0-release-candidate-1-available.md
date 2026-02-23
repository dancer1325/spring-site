---
title: Spring Integration 5.0 Release Candidate 1 Available
source: https://spring.io/blog/2017/11/01/spring-integration-5-0-release-candidate-1-available
scraped: 2026-02-23T16:13:37.183Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  November 01, 2017 | 0 Comments
---

# Spring Integration 5.0 Release Candidate 1 Available

_Releases | Artem Bilan |  November 01, 2017 | 0 Comments_

On behalf of the Spring Integration team I am pleased to announce that the Release Candidate 1 for the Spring Integration 5.0 version (`5.0.0.RC1`) is now available.

It can be downloaded from the [Milestone Repository](https://repo.spring.io/milestone):

```
Copyrepositories {
    maven { url 'http://repo.spring.io/libs-milestone' }
}

compile "org.springframework.integration:spring-integration-core:5.0.0.RC1"
```

[20 JIRAs](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10121&version=16198) (and some GitHub issues) are included in this release, together with bug fixes and a number of new features. Some highlights of features in the `RC1`, since the previously announced [Milestone 7](https://spring.io/blog/2017/09/14/spring-integration-5-0-milestone-7-and-4-3-12-available):

-   The components populated by the Java DSL parser are now registered as `BeanDefinitions` in the application context, thanks to newly introduced in the Spring Framework `5.0` `Supplier`\-based programmatic bean registration. This approach helps us to avoid some boilerplate code for singletons registration and initialization. In addition this `BeanDefinition` registration may be useful in some use-case to select particular components in the application context. In fact, exactly that is used in the [Spring Cloud Function](https://cloud.spring.io/spring-cloud-function/) project for `java.util.function.*` beans scanning.
    
-   The `IntegrationFlows.from(Class<?> serviceInterface)` has now overloaded version with an additional `beanName` argument. This becomes exactly the bean name for a generates gateway proxy overriding the `[flowId].gateway` value:
    
    @Bean public IntegrationFlow uppercaseFlow() { return IntegrationFlows.from(MessageFunction.class, "uppercase") .<String, String>transform(String::toUpperCase) .get(); }
    

This us useful again in the mentioned above Spring Cloud Function when we expose the function as an entry point into the microservice by its bean name. Also this is convenient with manually registered integration flows via `IntegrationFlowContext`, when we have "ugly" generated bean name for the `IntegrationFlow`.

-   The HTTP Inbound Endpoints (including WebFlux) now correctly handle the `ResponseEntity` in the reply message:
    
    @Bean public WebFluxInboundEndpoint errorInboundEndpoint() { WebFluxInboundEndpoint endpoint = new WebFluxInboundEndpoint(); RequestMapping requestMapping = new RequestMapping(); requestMapping.setPathPatterns("/error"); endpoint.setRequestMapping(requestMapping); endpoint.setRequestChannelName("errorServiceChannel"); return endpoint; }
    
    @ServiceActivator(inputChannel = "errorServiceChannel") public ResponseEntity processHttpRequest() { return new ResponseEntity<>("<500 Internal Server Error,{}>", HttpStatus.INTERNAL\_SERVER\_ERROR); }
    

This way we have aligned Spring Integration Channel Adapters for Web with the existing behavior in Spring MVC and Spring WebFlux.

-   In addition to upgrade to the latest [Spring Web Services](https://spring.io/blog/2017/10/30/spring-web-services-3-0-0-release-2-4-2-release-is-out) `3.0` and [Smack](https://www.igniterealtime.org/projects/smack/) `4.2.1`, we have fixed the handling for the DOM POX messages in the Spring Integration Web Services Gateways.
    
-   Some Leader Initiators now may emit `OnFailedToAcquireMutexEvents`, when they fail to obtain the lock for shared resource. It happens very often, so check `LockRegistryLeaderInitiator#setPublishFailedEvents()` for more information.
    
-   The `JdbcChannelMessageStore` can now be supplied with the custom `MessageGroupPreparedStatementSetter` for some non-standard message store structure or different from default Java serialization behavior.
    
-   The `ClientStompEncoder` has been introduced to properly populate a `SEND` STOMP frame when we use `StompSubProtocolHandler` from the client side.
    

Special thanks to several community members for their ongoing active contributions to the framework; scan [the commits](https://github.com/spring-projects/spring-integration/commits/v5.0.0.RC1) and give them some kudos!

For a complete list of changes in `5.0`, also see the [What’s New](http://docs.spring.io/spring-integration/docs/5.0.0.RC1/reference/html/whats-new.html) chapter in the reference manual.

We expect GA in a couple weeks - just in time for Spring Boot `2.0 GA`!

Important

I along with most of my colleagues on the Spring team will be at [Spring One Platform](https://springoneplatform.io) speaking about these new features in Spring Integration. So sign up now!

Any feedback, feature ideas, critics, bug reports and questions are welcome via appropriate communication channels:

[Project Page](http://projects.spring.io/spring-integration/) | [JIRA](https://jira.spring.io/browse/INT) | [Contributing](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)