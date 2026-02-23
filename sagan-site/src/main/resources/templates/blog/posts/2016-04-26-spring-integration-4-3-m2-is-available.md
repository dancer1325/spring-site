---
title: Spring Integration 4.3 M2 is Available
source: https://spring.io/blog/2016/04/26/spring-integration-4-3-m2-is-available
scraped: 2026-02-23T19:18:17.614Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  April 26, 2016 | 0 Comments
---

# Spring Integration 4.3 M2 is Available

_Releases | Artem Bilan |  April 26, 2016 | 0 Comments_

I am pleased to announce that Spring Integration `4.3.0.M2` is now available from the [Spring milestone repository](http://repo.spring.io/milestone/). This release closes about [50 JIRAs](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10121&version=15468) and includes almost a 100 [commits](https://github.com/spring-projects/spring-integration/commits/master).

Thanks to everyone who has contributed. Especially to the [Spring Cloud Stream](http://cloud.spring.io/spring-cloud-stream/) team, whose comprehensive Spring Integration usage influences the project direction.

Some key feature since the [First Milestone](https://spring.io/blog/2016/02/17/spring-integration-4-3-m1-is-available):

-   The Spring Integration runtime object model, together with Component Metrics, now can be exposed as a `graph`, which may be used to visualize the current state of the integration application. When running in a web container, the `@EnableIntegrationGraphController` annotation, together with an `IntegrationGraphServer` bean, creates a service to retrieve the model and state over the REST protocol, e.g. in JSON notation:

```
Copy{
  "nodes": [
    {
      "nodeId": 1,
      "name": "nullChannel",
      "componentType": "channel",
    },
    {
      "nodeId": 2,
      "name": "errorChannel",
      "componentType": "publish-subscribe-channel",
    },
    {
      "nodeId": 3,
      "name": "_org.springframework.integration.errorLogger",
      "componentType": "logging-channel-adapter",
      "output": null,
      "input": "errorChannel"
    }
  ],
  "links": [
    {
      "from": 2,
      "to": 3
    }
  ]
}
```

Continuing the tradition of Spring Integration, message channels are represented as first class citizens (nodes) in this model, and are not simply links between nodes. Also, when statistics are enabled (`@EnableIntegrationManagement` or `<int:management />`), each node in the object graph contains those statistics (message counts, response times etc).

-   Persistent `MessageStore`s now support a `Lazy-Load` algorithm (enabled by default) for `MessageGroup` retrieval. When dealing with large, persisted, groups with operations such as aggregation, this produces significant performance benefits.
    
-   The Service Activator now supports an `async` option. If the service returns a `ListenableFuture<?>` and `async` is `true`, the calling thread is released immediately, and the reply message is sent on the thread (from within your service) that completes the future. Based on this foundation we also provide an `AsyncAmqpOutboundGateway` and `async` mode for the `JmsOutboundGateway` where the downstream flow runs on the reply listener container thread.
    
-   The XMPP Adapters now support `Extensions` (XEP). So, for example, you can more easily interact with [Google Cloud Messaging](https://developers.google.com/cloud-messaging/) (GCM):
    

```xml
Copy<int-xmpp:inbound-channel-adapter id="xmppInboundAdapter"
    payload-expression="getExtension('google:mobile:data').json"/>
...
<bean id="gcmExtensionProvider" class="org.jivesoftware.smackx.gcm.provider.GcmExtensionProvider"/>

<int-xmpp:outbound-channel-adapter id="xmppOutboundAdapter"
    extension-provider="gcmExtensionProvider"/>
```

-   Groovy scripts can now be configured with the `compile-static` or `compiler-configuration` to achieve improved performance or provide some exotic customization to the target AST.
    
-   The `WatchServiceDirectoryScanner` has undergone several improvements. Its logic has been moved to the `FileReadingMessageSource` directly via the `use-watch-service` flag. In addition, we can specify the `WatchEventType`s to listen for on the directory tree. Also the `StandardWatchEventKinds.ENTRY_DELETE` event is treated as a `ResettableFileListFilter.remove()` operation, for example to remove a file from an `AcceptOnceFilteListFilter`.
    
-   Several more cases for *channel late binding* have been implemented. For example in the was `WireTap`, which led to the
    

[`MessageChannelSpec.wireTap()`](https://github.com/spring-projects/spring-integration-java-dsl/issues/69) feature in the Spring Integration Java DSL.

See [What's New](http://docs.spring.io/spring-integration/docs/4.3.0.M2/reference/html/whats-new.html) and the [JIRA release notes](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10121&version=15468) for complete information about the included changes.

We expect to release the final release candidate in mid-May with the release being due at the end of May.

So now is your last opportunity to request any favorite feature you feel is missing from the framework. Next up (2017) is 5.0 which will require Java 8.

We welcome any feedback, questions, or help, using the usual mechanisms:

[Project Page](http://projects.spring.io/spring-integration/) | [JIRA](https://jira.spring.io/browse/INT) | [Contribution](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration)

If you happen to join the [Spring I/O conference](http://www.springio.net/) this May in Barcelona, don't miss [Gary Russel's talk](http://www.springio.net/speaker/gary-russell/) about Spring Integration with Spring Boot. Also, the registration for [SpringOne Platform](http://springoneplatform.io/) (early August, Las Vegas) has opened recently, in case you want to benefit from early bird ticket pricing. You will be able to meet Gary and me there to discuss about something new in Spring Integration!