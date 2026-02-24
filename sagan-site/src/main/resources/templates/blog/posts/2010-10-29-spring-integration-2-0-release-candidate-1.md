---
title: Spring Integration 2.0 Release Candidate 1
source: https://spring.io/blog/2010/10/29/spring-integration-2-0-release-candidate-1
scraped: 2026-02-24T08:51:57.356Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Fisher |  October 29, 2010 | 0 Comments
---

# Spring Integration 2.0 Release Candidate 1

_Engineering | Mark Fisher |  October 29, 2010 | 0 Comments_

We are pleased to announce the first release candidate of Spring Integration 2.0! [Download](http://www.springsource.com/download/community?project=Spring%20Integration) | [Reference Manual](http://static.springsource.org/spring-integration/docs/2.0.x/reference/htmlsingle/) | [JavaDoc](http://static.springsource.org/spring-integration/docs/2.0.x/api/)

I thought I would take the opportunity to provide a general "what's new?" guide. There are actually too many new features and improvements to cover them all in a single post, but I will focus on some of the highlights. We will be posting more blogs as we get closer to the 2.0 GA release. For now, this post is roughly based on a [session](http://www.springone2gx.com/conference/chicago/2010/10/session?id=19338) that Oleg and I presented last week at SpringOne. That presentation was mostly demo-driven, and the code is available in our [Git repository](http://git.springsource.org/s2gx-2010/spring-integration).

In order to provide some structure here, I'll walk through the features across a number of categories...

### Enhancements Enabled by Spring 3.0

Spring Integration 2.0 builds directly on Spring 3.0. In fact, the RC1 version builds upon Spring 3.0.5, which was released just last week. Here we'll look at a few of the most notable features enabled by that significant upgrade to the underlying framework.

##### Spring Expression Language

You can now use SpEL expressions within the transformer, router, filter, splitter, aggregator, service-activator, and many more elements of the Spring Integration core namespace. For example if you can evaluate a Filter rule based on a simple property within your payload object, just do the following:

```xml
Copy
<filter input-channel="numbers" expression="payload > 0" output-channel="positives"/>
```

In many cases, the 'expression' attribute can replace the use of 'ref' and 'method' as well as the POJO to which that ref points. On the other hand, even if you do need to execute a method on a bean within your Spring context, the simple 'method' attribute might not be sufficient. For example, you might need to control more than one parameter being passed to the method. While the @Payload and @Header annotations on method parameters provide one option, sometimes it's preferable to keep such details in the configuration rather than the code. Here's an example using the SpEL BeanResolver strategy instead of a 'ref':

```xml
Copy
<router input-channel="accounts"
    expression="@accountService.getAccountType(payload.accountId, payload.address.country)"/>
```

##### ConversionService and Converter

You can define a ConversionService bean named "integrationConversionService" and then register any [Converters](http://static.springsource.org/spring/docs/3.0.5.RELEASE/javadoc-api/org/springframework/core/convert/converter/Converter.html) you'd like (including your own custom implementations if necessary). There are two places where that ConversionService is used within Spring Integration. For eager conversion, you can add a "datatype" attribute to a <channel> element and provide the fully-qualified name of the Class you want to allow on that channel. Here's an example:

```xml
Copy
<channel id="datatypeChannel" datatype="example.Foo"/>

<beans:bean id="integrationConversionService"
            class="org.springframework.context.support.ConversionServiceFactoryBean">
    <beans:property name="converters">
        <beans:bean class="conversion.StringToFooConverter"/>
    </beans:property>
</beans:bean>
```

The "integrationConversionService" contributes in a significant way during the evaluation of SpEL expressions. Every expression is evaluated against an EvaluationContext, and that context is aware of the "integrationConversionService". Within Spring Integration, we rely upon SpEL for all of the method invocation (not only when using 'expression' attributes but even for 'ref' and 'method' configuration). That means that you can take advantage of runtime type conversion of the values being bound to a method invocation from a Message instance. For example, if you are calling the FooService but passing a Bar object within a Message payload, then you only need to register a BarToFooConverter with the "integrationConversionService". This example also shows a much more concise way to register Converters. By using the namespace support via a new 'converter' element, you don't even need to explicitly define the "integrationConversionService" bean:

```xml
Copy
<!-- FooService.process(Foo) will be invoked, even though the Message payload is a Bar instance -->
<service-activator input-channel="in" ref="fooService" method="process" output-channel="out"/>

<converter>
    <beans:bean class="example.BarToFooConverter"/>
</converter>
```

##### TaskScheduler and Trigger

Spring Integration 1.0 had its own implementation of a TaskScheduler as well as both interval and cron-based Trigger implementations. Now that Spring 3.0 provides a TaskScheduler and Trigger, we are able to depend on those. In fact, we were able to remove a significant amount of code from the Spring Integration side while contributing some of that back to the underlying framework (e.g. the lightweight CronTrigger implementation). Any Polling Consumer can be configured with an explicit <poller> sub-element (otherwise, it would rely upon the single default poller configuration). Those poller elements accept one of the following attributes: 'fixed-delay', 'fixed-rate' or 'cron'. In fact, you can even provide a custom implementation of Spring's Trigger interface, and then use the 'trigger' attribute as a reference instead. Here's an example of a poller with a cron expression:

```xml
Copy
<file:inbound-channel-adapter directory="/some/path">
    <poller cron="*/10 * 9-17 * * MON-FRI"/>
</file:inbound-channel-adapter>
```

##### RestTemplate and HttpMessageConverter

Our outbound HTTP adapters now delegate to Spring's RestTemplate for executing the HTTP request and handling its response. This means that the HttpMessageConverter strategy plays a central role. We have several converters enabled by default, but you can fully customize the list and/or add your own implementations. We are actually using the same HttpMessageConverter strategy within the HTTP inbound adapters as well. Another nice feature where we take advantage of RestTemplate is the use of URI placeholders. The following example of an HTTP outbound Messaging Gateway demonstrates both a custom HttpMessageConverter and the use of a URI placeholder. In fact, the value that is replaced in the URI is the result of SpEL evaluation against the Message payload at runtime:

```xml
Copy
<http:outbound-gateway id="trafficService" 
        url="http://example/traffic/{zipCode}" 
        request-channel="requestChannel"
        reply-channel="responseChannel" 
        http-method="GET"
        message-converters="trafficConverter"
        expected-response-type="example.Traffic">
    <http:uri-variable name="zipCode" expression="payload.address.zipcode"/>
</http:outbound-gateway>
```

### Enterprise Integration Pattern Additions

Also in 2.0 we have added support for even more of the patterns described in Hohpe and Woolf's [Enterprise Integration Patterns](http://enterpriseintegrationpatterns.com/) book.

##### Message History

By enabling Message History within the Application Context, a header will be added to each Message. That header keeps track of all traversed components, including the name of each channel and endpoint as well as the timestamp of that traversal. For messaging applications where asynchronous interaction and flows that may span multiple threads are common, monitoring and auditing can be a major challenge. This simple header is incredibly useful for addressing that challenge, even if only enabled at development time. It's trivial to toggle the feature; simply add or remove the <message-history> element in the configuration. By default it will track history for every channel and endpoint, but that can be fine-tuned with simple name patterns:

```xml
Copy
<message-history tracked-components="*Service, foo*"/>
```

##### Message Store

The Message Store provides a way to persist messages for any process that might take too long to happen in a single transaction. For example, by using the new MessageStore-backed Message Channel, you can have buffering and transactional behavior without having to rely on additional middleware. You would need to use a MessageStore implementation that supports transactional persistence, but there's a lot of flexibility. We provide a JDBC implementation as well as DDL for a number of common RDBMSs, and we have already prototyped a GemFire-based implementation. This is an area where you can expect to see a huge increase in the options as the Spring Data projects continue to evolve. Another nice benefit of using shared storage is that multiple processes may be running with the same components. In other words, you might distribute a Scatter Gather configuration (using Splitters, Aggregators, and some components in between), but as long as those Aggregators are each sharing the same MessageStore, the workload can be distributed.

```xml
Copy
<aggregator input-channel="in" ref="aggregator"
    message-store="messageStore" output-channel="out"/>

<int-jdbc:message-store id="messageStore" data-source="dataSource"/>
```

##### Claim Check

The idea behind the Claim Check pattern is that you can exchange a Message payload for a "claim ticket" and vice-versa. This allows you to reduce bandwidth and/or avoid potential security issues when sending Messages across channels. You can think of this as "pass-by-reference" as opposed to the typical "pass-by-value" semantics. Our implementation is built directly upon the Message Store support that we just mentioned above. A pair of "claim-check-in" and "claim-check-out" transformers should share a reference to the same Message Store. For convenience, a single bean named "messageStore" will be considered first. You can provide an explicit reference via the 'message-store' attribute if necessary.

```xml
Copy
<claim-check-in input-channel="payloadsIn" output-channel="ticketsOut"/>

<claim-check-out input-channel="ticketsIn" output-channel="payloadsOut"/>
```

##### Control Bus

The Control Bus allows you to use messaging to manage and monitor endpoints and channels. In fact, this is a fairly general purpose mechanism where you can send a Message whose payload is actually a SpEL expression to be evaluated against some component within your integration application. For example, you could send a payload of "@somePoller.stop()" to the Control Bus' input channel. In order to enable this, simply add the element:

```xml
Copy
<control-bus input-channel="controlChannel"/>
```

### New Channel Adapters and Messaging Gateways

We have added several new Channel Adapters and Messaging Gateways in Spring Integration 2.0. Rather than providing example configurations of each of these here, for those which are already covered well in the documentation, I'll simply provide a link to the relevant section from the Spring Integration Reference Manual.

-   [JDBC](http://static.springsource.org/spring-integration/docs/2.0.x/reference/html/jdbc.html)
-   [JMX](http://static.springsource.org/spring-integration/docs/2.0.x/reference/html/system-management-chapter.html#jmx)
-   [TCP/UDP](http://static.springsource.org/spring-integration/docs/2.0.x/reference/html/ip.html)
-   [XMPP](http://static.springsource.org/spring-integration/docs/2.0.x/reference/html/xmpp.html)

There are a few others which will be covered in the GA reference, but I will provide a brief description and/or relevant links here. The FTP and SFTP adapters are covered in great detail in [this recent blog](http://blog.springsource.com/2010/08/23/secure-file-transfer-the-only-way-to-fly/) by Josh Long.

We also added RSS/Atom Feed reading support. Here's an example:

```xml
Copy
<feed:inbound-channel-adapter channel="newsChannel" url="http://example/news/rss.xml"/>
```

And everyone's favorite: the Twitter adapter. We support inbound and outbound status updates as well as direct messages. Here's a simple example. As you can see it enables the configuration of an OAuth-enabled Twitter Connection instance:

```xml
Copy
<twitter:outbound-update-channel-adapter channel="tweets"
            twitter-connection="twitterConnection"/>

<twitter:twitter-connection id="twitterConnection"
            consumer-key="${twitter.oauth.consumerKey}"
            consumer-secret="${twitter.oauth.consumerSecret}"            
            access-token="${twitter.oauth.accessToken}"
            access-token-secret="${twitter.oauth.accessTokenSecret}"/>
```

### Other Additions

##### Dynamic Groovy Scripts

As with the SpEL examples shown above, you can actually use Groovy scripts for any transformer, filter, router, splitter, etc. The scripts can be extremely simple and can take advantage of the 'payload' and 'headers' being bound to the Scripts execution context at runtime. For example, the following Groovy script could be defined as 'LengthRouter.groovy':

```groovy
Copy
return payload.length() > 100 ? 'long' : 'short'
```

Then, you could reference this from within a router element (or any other core element type). You can provide a 'refresh-check-delay' so that changes in the script will be picked up at runtime:

```xml
Copy
<router input-channel="strings">
    <int-groovy:script location="example/LengthRouter.groovy" refresh-check-delay="10000"/>
</router>
```

Of course, you can do much more than that in the Groovy script. Generally, the Groovy script option provides a nice middle ground between SpEL and POJOs.

##### Map Transformers

These symmetrical transformers convert payload objects to/from a Map where the keys in the Map can hold "flat" property paths via SpEL (e.g. 'customer.address.city').

```xml
Copy
<object-to-map-transformer input-channel="objectsIn" output-channel="mapsOut"/>

<map-to-object-transformer input-channel="mapsIn" output-channel="objectsOut"/>
```

##### JSON Transformers

These symmetrical transformers convert payload objects to/from JSON. They use the Jackson library, and the 'object-mapper' may be referenced if you need to customize the behavior.

```xml
Copy
<object-to-json-transformer input-channel="objectsIn" output-channel="jsonOut"/>

<json-to-object-transformer input-channel="jsonIn" output-channel="objectsOut"/>
```

##### Serialization Transformers

These symmetrical transformers convert payload objects to/from byte arrays. While not entirely new in 2.0, these transformers do now delegate to a new pair of strategy interfaces. The default strategy is standard Java serialization. However, you can opt to provide a 'serializer' (or 'deserializer' for the deserializing transformer) attribute value to reference any Serializer (or Deserializer) implementation. Those are new strategy interfaces available in Spring 3.0.5. These same strategies are used within the JDBC MessageStore as well as the TCP/UDP adapters. Once again, you can expect to see a lot of new implementations as the Spring Data projects evolve.

```xml
Copy
<payload-serializing-transformer input-channel="objectsIn" output-channel="bytesOut"
            serializer="someCustomSerializer"/>

<payload-deserializing-transformer input-channel="bytesIn" output-channel="objectsOut"
            deserializer="someCustomDeserializer">
```

##### SpringSource Tool Suite Visual Editor

Finally, I just want to point out that there is an amazing new visual editor for Spring Integration included within the latest version of SpringSource Tool Suite. If you are not already using STS 2.5.0, you really should [download it now](http://www.springsource.com/landing/best-development-tool-enterprise-java)! Here's a screenshot of our "Cafe" sample in the STS visual editor: [![](http://blog.springsource.com/wp-content/uploads/2010/10/si-sts-editor.png "si-sts-editor")](http://blog.springsource.com/wp-content/uploads/2010/10/si-sts-editor.png)

### Conclusion

As usual for me, what started as a "brief" blog turned into a bit of an epic. The great thing is that even this seemingly long list of features is really only scratching the surface of what Spring Integration 2.0 has to offer. Please do download [RC1](http://www.springsource.com/download/community?project=Spring%20Integration) and take it for a spin. As always, we are very much looking forward to community feedback. We hope you enjoy RC1, and with your contributions in the [forum](http://forum.springsource.org/forumdisplay.php?f=42) and [issue tracker](https://jira.springsource.org/browse/INT), we can make sure 2.0 GA is even better.

Thanks! -Mark