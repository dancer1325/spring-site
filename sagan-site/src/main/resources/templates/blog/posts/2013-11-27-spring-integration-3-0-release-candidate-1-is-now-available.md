---
title: Spring Integration 3.0 Release Candidate 1 is Now Available
source: https://spring.io/blog/2013/11/27/spring-integration-3-0-release-candidate-1-is-now-available
scraped: 2026-02-24T07:43:28.013Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gary Russell |  November 27, 2013 | 0 Comments
---

# Spring Integration 3.0 Release Candidate 1 is Now Available

_Releases | Gary Russell |  November 27, 2013 | 0 Comments_

We are extremely pleased to announce that Spring Integration 3.0.0.RC1 is now available in the [Spring Milestone Repo](http://repo.springsource.org/milestone/)

This release uses Spring Framework 3.2.5 by default but is also compatible with Spring 3.1.x and 4.0.x.

The release notes, showing changes since milestone 3, are [available here](https://jira.springsource.org/secure/ReleaseNote.jspa?projectId=10121&version=14234).

##First, a Note About Spring Framework 4 Support

> Spring Framework 4.0 has a new `spring-messaging` module that contains a number of key abstractions from Spring Integration.

> Spring Integration 3, while being compatible with Spring Framework 4, does not depend on it, and does not use these classes, so that it can also be used with Spring Framework 3.2 and 3.1.

> We are planning to release Spring Integration 4 in early 2014, which will be completely compatible with (and **require**) Spring Framework 4, utilizing its `spring-messaging` module as a foundation. A milestone will be available very soon after Spring Framework 4 is released.

##What's New in 3.0

The complete "What's New" for the 3.0 release can be found in the [Reference Documentation](http://docs.spring.io/spring-integration/docs/3.0.0.RELEASE/reference/html/whats-new.html), but here are a few highlights...

###New and Modified Endpoints

-   syslog inbound adapter (UDP and TCP)

```xml
Copy<int-syslog:inbound-channel-adapter id="foobar" channel="foo" port="1514" />
```

-   A JMX inbound adapter that polls multiple \_MBean\_s/attributes.

```xml
Copy<jmx:tree-polling-channel-adapter id="jmxtree"
		channel="mbeanData"
		auto-startup="false"
		query-name="java.lang:type=Runtime"
		query-expression="*:type=*">
	<si:poller max-messages-per-poll="1" fixed-rate="5000"/>
</jmx:tree-polling-channel-adapter>
```

-   File tailing inbound adapter

```xml
Copy<int-file:tail-inbound-channel-adapter id="tailer"
	channel="lines"
	file="/tmp/baz" />
```

-   Scripted inbound adapter
-   The *Content Enricher* can now update headers as well as the payload
-   The HTTP inbound endpoints now utilize Spring MVC 3.1 *RequestMapping* - a single endpoint can now support multiple paths
-   *Redis Queue* inbound and outbound adapters
-   \_Gateway\_s now support setting common headers (including the invoked *Method*) across all gateway methods

```xml
Copy<int:gateway id="myGateway"
		service-interface="foo.Bar"
		default-request-channel="requestChannel">
	<int:default-header name="calledMethod"
                        expression="#gatewayMethod.name"/>
</int:gateway>
```

-   FTP/SFTP inbound adapters can be configured to preserve the remote timestamp
-   FTP/SFTP gateways now support `mv` (rename), `put` and `mput` commands; `ls`, `mget` and `mput` now support recursion - allowing the transfer of a directory tree.
-   JPA endpoints can now store multiple (*Iterable*) entities; in addition, *flush* and *clear* operations are supported
-   Elements within a `<chain/>` can now have an *id*, allowing them to be made available as beans and/or \_MBean\_s
-   A mechanism is now available allowing the transfer of selected \_MessageHeader\_s over TCP
-   TCP Connection Events inbound adapter - \_ApplicationEvent\_s are now emitted when connections are opened, closed, or an exception occurs

```xml
Copy<int-ip:tcp-connection-event-inbound-channel-adapter channel="events" />
```

###General Improvements

-   *Header Channel Registry* - when serializing messages, you can now save off header channels (*reply, error*) in a registry and the registry will be referenced if necessary, when sending a reply. This can be used to avoid `No output-channel or replyChannel header available` \_ChannelResolutionException\_s.
-   *SpEL* Functions can be registered and made available to all messaging SpEL expressions

```xml
Copy<int:spel-function id="foo"
	class="foo.MyUtils" method="evaluate(java.lang.String, java.lang.Object)"/>

<int:transformer input-channel="in" output-channel="out"
		 expression="#foo(headers.bar, payload)" />
```

Two built-in functions are provided: *#jsonPath* and *#xpath*.

Custom \_PropertyAccessor\_s can also be added to the evaluation contexts.

-   *Redis Metadata Store* - used to store state for *feed* and *twitter* adapters.
-   *Configurable MongoDb Message Store* - a more flexible message store is now available
-   Inline scripts can now have variables
-   A persistent *AcceptOnceFileListFilter* is now available, preventing duplicates across system restarts.

###Conclusion

Please see the [project page](http://projects.spring.io/spring-integration/) for more information and links for downloads, documentation etc.

We will be releasing shortly, so we would appreciate users giving this release candidate a spin.

A number of migration considerations are detailed in the [migration guide](https://github.com/spring-projects/spring-integration/wiki/Spring-Integration-2.2-to-3.0-Migration-Guide).

Thanks.