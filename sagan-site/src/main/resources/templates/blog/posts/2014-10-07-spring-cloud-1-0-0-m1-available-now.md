---
title: Spring Cloud 1.0.0.M1 Available Now
source: https://spring.io/blog/2014/10/07/spring-cloud-1-0-0-m1-available-now
scraped: 2026-02-23T22:12:26.762Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Dave Syer |  October 07, 2014 | 7 Comments
---

# Spring Cloud 1.0.0.M1 Available Now

_Releases | Dave Syer |  October 07, 2014 | 7 Comments_

[Spring Cloud](http://projects.spring.io/spring-cloud) (the new umbrella project announced in September) has reached a milestone, its first, and fresh jars are available in the [repo.spring.io](http://repo.spring.io/libs-milestone-local) repository. Spring Cloud is going to follow a "release train" model for releases, a bit like Spring Data, but we haven't got a cool name for this one yet, so it's just 1.0.0.M1. The modules that are part of this release are

-   Spring Cloud Config: Centralized external configuration management backed by a git repository. The configuration resources map directly to Spring `Environment` but could be used by non-Spring applications if desired.
    
-   Spring Cloud Netflix: Integration with various Netflix OSS components (Eureka, Hystrix, Zuul, Archaius, etc.).
    
-   Spring Cloud Bus: An event bus for linking services and service instances together with distributed messaging. Useful for propagating state changes across a cluster (e.g. config change events).
    
-   Spring Cloud Security: A set of primitives for building secure applications and services with minimum fuss.
    
-   Spring Cloud CLI: Spring Boot CLI plugin for creating Spring Cloud component applications quickly in Groovy.
    
-   Spring Cloud Starters: Spring Boot-style starter projects to ease dependency management for consumers of Spring Cloud.
    

All of the above have the 1.0.0.M1 release tag, so a good starting point to try it out would be to [install the CLI](http://projects.spring.io/spring-cloud/spring-cloud.html#_installation) and run Config Server with this code:

```groovy
Copy@EnableConfigServer
class ConfigServer {
}
```

then hit `http://localhost:8080/foo/default` to see some property sources.

The [code](https://github.com/spring-cloud) is hosted on github, and community contributions are extremely welcome, so get on over there are check it out. There are some neat samples in a separate organization: [spring-cloud-samples](https://github.com/spring-cloud-samples), including a "scripts" project that has git submodules and scripts to get a complete demo system up and running as quickly as possible.