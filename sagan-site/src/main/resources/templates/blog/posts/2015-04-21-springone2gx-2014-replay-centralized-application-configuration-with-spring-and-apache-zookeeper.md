---
title: SpringOne2GX 2014 Replay: Centralized Application Configuration with Spring and Apache ZooKeeper
source: https://spring.io/blog/2015/04/21/springone2gx-2014-replay-centralized-application-configuration-with-spring-and-apache-zookeeper
scraped: 2026-02-23T21:05:58.876Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Pieter Humphrey |  April 21, 2015 | 0 Comments
---

# SpringOne2GX 2014 Replay: Centralized Application Configuration with Spring and Apache ZooKeeper

_Engineering | Pieter Humphrey |  April 21, 2015 | 0 Comments_

Recorded at SpringOne2GX 2014.

Speaker: Ryan Gardner, Dealer.com

Core Spring Track

Slides: [http://www.slideshare.net/SpringCentral/zookeeper-config2014-2c-41123708](http://www.slideshare.net/SpringCentral/zookeeper-config2014-2c-41123708)

Application configuration is an evolution. It starts as a hard-coded strings in your application and hopefully progresses to something external, such as a file or system property that can be changed without deployment. But what happens when other enterprise concerns enter the mix, such as audit requirements or access control around who can make changes? How do you maintain the consistency of values across too many application servers to manage at one time from a terminal window? The next step in the application configuration evolution is centralized configuration that can be accessed by your applications as they move through your various environments on their way to production. Such a service transfers the ownership of configuration from the last developer who touched the code to a well-versed application owner who is responsible for the configuration of the application across all environments. At Dealer.com, we have created one such solution that relies on Apache ZooKeeper to handle the storage and coordination of the configuration data and Spring to handle to the retrieval, creation and registration of configured objects in each application. The end result is a transparent framework that provides the same configured objects that could have been created using a Spring configuration, configuration file and property value wiring. This talk will cover both the why and how of our solution, with a focus on how we leveraged the powerful attributes of both Apache ZooKeeper and Spring to rid our application of local configuration files and provide a consistent mechanism for application configuration in our enterprise.