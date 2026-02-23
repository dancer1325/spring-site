---
title: Spring Integration Extension for Hazelcast 1.0.0 M2 Available
source: https://spring.io/blog/2017/01/23/spring-integration-extension-for-hazelcast-1-0-0-m2-available
scraped: 2026-02-23T16:27:33.155Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  January 23, 2017 | 1 Comment
---

# Spring Integration Extension for Hazelcast 1.0.0 M2 Available

_Releases | Artem Bilan |  January 23, 2017 | 1 Comment_

On behalf of the Spring Integration community I’d like to announce the second Milestone of Spring Integration Extension for [Hazelcast](https://hazelcast.com/) and its artifact is `spring-integration-hazelcast.1.0.0.M2`, which is available in the [Milestone Repository](https://repo.spring.io/milestone/).

The project has been around for some time and there has not been so much activity since the previous [Milestone 1](https://spring.io/blog/2015/04/20/spring-integration-hazelcast-support-1-0-milestone-1-is-available) and it only recently gained enough community traction to warrant a release. So, first of all, big thanks to you, the community, for your contributions!

Some highlights of the features included to this Milestone:

## [](#hazelcast-leader-election)[](#hazelcast-leader-election)Hazelcast Leader Election

If you need to elect a leader (e.g. for highly available message consumer where only one node should receive messages) you just need to create a LeaderInitiator:

```
Copy@Bean
public HazelcastInstance hazelcastInstance() {
    return Hazelcast.newHazelcastInstance();
}

@Bean
public LeaderInitiator initiator() {
    return new LeaderInitiator(hazelcastInstance());
}
```

Then when a node is elected leader it will send OnGrantedEvent to all application listeners. See the [Spring Integration Reference Manual](http://docs.spring.io/spring-integration/reference/html/messaging-endpoints-chapter.html#endpoint-roles) for more information on how to use those events to control messaging endpoints.

## [](#hazelcast-writing-messagehandler)[](#hazelcast-writing-messagehandler)Hazelcast Writing MessageHandler

The `HazelcastCacheWritingMessageHandler` now can resolve `DistributedObject` at runtime against incoming `Message` via `cacheExpression` property. Supported types are `IMap`, `MultiMap`, `ITopic`, `ISet` or `IList`:

```
Copy@Bean
public IMap<Integer, HazelcastIntegrationTestUser> distMap() {
    return testHzInstance().getMap("Distributed_Map1");
}

@Bean
@ServiceActivator(inputChannel = "distMapChannel")
public HazelcastCacheWritingMessageHandler hazelcastMessageHandler() {
    HazelcastCacheWritingMessageHandler handler =
                   new HazelcastCacheWritingMessageHandler();
    handler.setDistributedObject(distMap());
    handler.setKeyExpression(PARSER.parseExpression("payload.id"));
    handler.setExtractPayload(true);
    return handler;
}
```

## [](#hazelcast-cluster-monitor-inbound-channel-adapter)[](#hazelcast-cluster-monitor-inbound-channel-adapter)Hazelcast Cluster Monitor Inbound Channel Adapter

The `HazelcastClusterMonitorMessageProducer` enables to listen to the modifications performed on cluster. This is an event-driven channel adapter and listens to related Membership, Distributed Object, Migration, Lifecycle and Client events:

```
Copy<int-hazelcast:cm-inbound-channel-adapter
                 channel="monitorChannel"
                 hazelcast-instance="instance"
                 monitor-types="MEMBERSHIP, DISTRIBUTED_OBJECT" />

<bean id="instance" class="com.hazelcast.core.Hazelcast"
            factory-method="newHazelcastInstance">
    <constructor-arg>
        <bean class="com.hazelcast.config.Config" />
    </constructor-arg>
</bean>
```

We would like to hear any feedback from the Community before we go straight forward to the `1.0.0.RELEASE`, so, do not hesitate to contact with us via any available communication channel!

[Project Page](https://github.com/spring-projects/spring-integration-extensions/tree/master/spring-integration-hazelcast) | [Issues](https://github.com/spring-projects/spring-integration-extensions/issues) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)