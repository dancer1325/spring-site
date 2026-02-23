---
title: Spring Integration 4.3.0 Release Candidate Available
source: https://spring.io/blog/2016/05/12/spring-integration-4-3-0-release-candidate-available
scraped: 2026-02-23T19:13:30.395Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gary Russell |  May 12, 2016 | 4 Comments
---

# Spring Integration 4.3.0 Release Candidate Available

_Releases | Gary Russell |  May 12, 2016 | 4 Comments_

I am pleased to announce the availability of Spring Integration 4.3.0.RC1 - the first (and final) release candidate; it is available from the [spring milestone repo](https://repo.spring.io/milestone) The GA release should follow shortly after the GA release of Spring Framework 4.3.

4.2.6.RELEASE is also available in the [spring release repo](https://repo.spring.io/release) as well as maven central. This release includes a few [important bug fixes](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10121&version=15498) and all users are encouraged to upgrade to it.

4.3 is only a minor release with a few new features and improvements over 4.2 and will close out the 4.x line. Meanwhile we are looking forward to embrace the [Reactive Foundation for the JVM](https://spring.io/blog/2016/02/16/reactor-2-5-a-second-generation-reactive-foundation-for-the-jvm) in Spring Integration 5.0. We have yet to determine exactly what that means, so stay tuned! In addition, 5.0 (2017) will include the (currently separate) [Spring Integration Java DSL](https://github.com/spring-projects/spring-integration-java-dsl).

Here are some highlights of the release (some of which were previously announced in earlier milestones):

Previously announced:

-   A `negate` option for `HeaderMapper`s to allow the exclusion of request and/or reply headers with logical NOT `!`. (e.g. `!foo,*` - map all headers except `foo`).
    
-   `Exception` superclass mappings for the `ErrorMessageExceptionTypeRouter` to avoid mapping duplications for different inheritors.
    
-   `null` Remote Directory support for the `list()` and `listNames()` functions in the FTP adapters to meet the standard FTP protocol support when listing the current working directory .
    
-   An option to change the direction of Redis List Push/Pop operations in the Redis Queue Adapters.
    
-   `FileWritingMessageHandler` *sub-path* support in the file name to allow restoration of the directory structure locally, e.g. after [unzipping](https://spring.io/blog/2016/01/12/spring-integration-zip-1-0-0-m1-and-others).
    
-   Upgrade to Smack-4.1.x.
    
-   Upgrade to [Spring Amqp 1.6](https://spring.io/blog/2016/05/06/spring-amqp-1-6-0-release-candidate-and-1-5-6-available) with support for its new features such as Delayed Message Exchange.
    
-   The Spring Integration runtime object model, together with Component Metrics, can now be exposed as a `graph`, which may be used to visualize the current state of the integration application. When running in a web container, the `@EnableIntegrationGraphController` annotation, together with an `IntegrationGraphServer` bean, creates a service to retrieve the model and state over the REST protocol, e.g. in JSON notation:
    

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

Continuing the tradition of Spring Integration, message channels are represented as first class citizens (nodes) in this model, and are not simply links between nodes. Also, when statistics are enabled (`@EnableIntegrationManagement` or `<int:management />`), each node in the object graph contains those statistics (message counts, response times etc). (Some improvements have been made to the graph since it was announced in the last milestone, including: support for chains - list of handlers,

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

New in this RC:

-   FTP/SFTP inbound channel adapters can now support direct streaming of file contents, avoiding a copy to the local file system.
    
-   TCP deserializers can now be configured to use a buffer pool.
    
-   Various minor fixes and improvements.
    

The release addresses [over 125 JIRA issues](https://jira.spring.io/issues/?jql=project%20%3D%20%22Spring%20Integration%22%20AND%20fixVersion%20in%20%28%224.3%20M1%22%2C%20%224.3%20M2%22%2C%20%224.3%20RC1%22%29%20%20ORDER%20BY%20fixVersion%2C%20priority%20DESC). Also see the [What's New](http://docs.spring.io/spring-integration/docs/4.3.0.RC1/reference/html/whats-new.html) for a summary of the major changes. We are very grateful for a number of external contributions to the project - thank you all!.

[Project Page](http://projects.spring.io/spring-integration/) | [JIRA](https://jira.spring.io/browse/INT) | \[Contributions\] ([https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.md](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.md)) | [StackOverflow](http://stackoverflow.com) (`spring-integration` tag)

If you are attending Spring IO in Barcelona, I will be talking about Spring Integration and Spring AMQP on Friday, May 20. There are many other great talks from the Spring team members, so check the [agenda](http://www.springio.net/agenda/).

This is also a reminder that [Spring One Platform](http://springoneplatform.io) will be taking place in Las Vegas between August 1-4 this year, and you should consider [getting your ticket](https://2016.event.springoneplatform.io/register) if you haven’t done so already.