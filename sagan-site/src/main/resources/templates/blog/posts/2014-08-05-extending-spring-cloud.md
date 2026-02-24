---
title: Extending Spring Cloud
source: https://spring.io/blog/2014/08/05/extending-spring-cloud
scraped: 2026-02-23T22:18:18.222Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ramnivas Laddad |  August 05, 2014 | 11 Comments
---

# Extending Spring Cloud

_Engineering | Ramnivas Laddad |  August 05, 2014 | 11 Comments_

One of the most interesting capabilities of Spring Cloud is its extensibility. You can extend it to support additional clouds, enhance already supported clouds, support new services, new service connectors--all without modifying the Spring Cloud code itself. In this blog, we explore this capability. If you haven’t done so already, please read the [first](https://spring.io/blog/2014/06/03/introducing-spring-cloud) and [second](https://spring.io/blog/2014/07/29/using-spring-cloud-programmatically) blog in this series to acquire sufficient background.

# [](#the-three-axes-of-extensibility)The three axes of extensibility

Spring Cloud provides extensibility along three orthogonal directions. You may extend it in one of these directions and orthogonality ensures that you continue to benefit from the others.

1.  **Cloud Platforms**: While Spring Cloud supports Cloud Foundry, Heroku, and a Local Config cloud (to test locally in a cloud-like environment), you aren’t limited by these choices. You can add your own cloud platform and take advantage of the rest of Spring Cloud capability such as Spring Java Config.
    
2.  **Cloud Services**: Cloud platforms offer a variety of services ranging from relational databases to messaging. Services offered by each cloud platform vary a lot, even for multiple installations of the same platform. This is especially true for PaaS offerings such as Cloud Foundry, where private instances of Cloud Foundry tend to have services specific to each installation. Spring Cloud offers an easy way to extend to services beyond its core offering. Just like cloud platform extensibility, you don’t have to change Spring Cloud code to extend it to new services and you continue to take advantage of the other parts.
    
3.  **Frameworks**: Spring Cloud currently supports Spring frameworks through the [spring-service-connector](https://github.com/spring-projects/spring-cloud/tree/master/spring-cloud-spring-service-connector) module. However, except for that module, nothing in Spring Cloud depends on Spring. As such, you should be able to either use other parts from any JVM-based framework or extend it for a framework by adding a new module.
    

In the [previous blog](https://spring.io/blog/2014/07/29/using-spring-cloud-programmatically), we looked at how you would use `CloudFactory` and `Cloud` to programmatically use Spring Cloud. When it comes to extensibility, you will not be working with either of these; instead you will implement other types in the core module. Let’s take a look at them.

# [](#cloud-platform-extensibility)Cloud Platform Extensibility

The main type you will need to be familiar with to extend Spring Cloud to a new cloud platform is `CloudConnector`, which is a simple three-method interface:

```java
Copypublic interface CloudConnector {
	boolean isInMatchingCloud();
	ApplicationInstanceInfo getApplicationInstanceInfo();
	List<ServiceInfo> getServiceInfos();
}
```

The `isInMatchingCloud()` method should examine its environment to decide if it is operating in the right environment. For example, the Cloud Foundry connector checks the existence of the `VCAP_APPLICATION` environment variable, whereas the Heroku connector looks for the existence of the `DYNO` environment variable. The `getApplicationInstanceInfo()` method returns information about the current application instance (app name, host, port, and application properties). The most interesting method `getServiceInfos()` returns a list with each element containing enough information so that applications know how to connect to each service. Exact information contained in each `ServiceInfo` object is left up to each implementation (the `ServiceInfo` as such defines only one method: `getId()`).

Once you create an implementation of `CloudConnector`, you need to make Spring Cloud aware of it. For all extension points, Spring Cloud uses a uniform mechanism based on [ServiceLoader](http://docs.oracle.com/javase/7/docs/api/java/util/ServiceLoader.html). As applied to Spring Cloud for platform extensibility, it boils down to including a file named `/META-INF/services/org.springframework.cloud.CloudConnector` with an entry with the fully-qualified name of the implementation class. Typically, you will bundle this file along with your implementation and supporting classes. Then all an app has to do is include this jar on the classpath.

# [](#service-extensibility)Service Extensibility

The `ServiceInfoCreator` interface provides an extension point to work with a new service.

```java
Copypublic interface ServiceInfoCreator<SI extends ServiceInfo, SD> {
    public boolean accept(SD serviceData);
    public SI createServiceInfo(SD serviceData);
}
```

The generic parameter `SI` defines the kind of `ServiceInfo` it will create, whereas the `SD` parameter defines the raw service data type it can work with. The raw service data type depends on the cloud platform. For example, in Cloud Found, it will be a `Map` based on the `VCAP_SERVICES` environment variable, whereas in Heroku, it will be a pair containing the service-specific environment variables and its value. Since the raw data type depends on the platform, so does implementations of `ServiceInfoCreator`. The `accept()` method examines the service data and determines if it can deal with it. For example, it can look at the URL scheme and determine if it can consume that service data. If it can, the `createServiceInfo()` must return a `ServiceInfo` object. If it is a completely new service, you may also have to implement `ServiceInfo` for that, else you can use one of the existing ones.

Once you have implemented a `ServiceInfoCreator`, you will have to let Spring Cloud know about it. This follows the same idea as discussed earlier for cloud platform extensibility. In this case, the file name you use is `CloudConnector` dependent. For Cloud Foundry, it is `/META-INF/services/org.springframework.cloud.cloudfoundry.CloudFoundryServiceInfoCreator` (theoretically, a `CloudConnector` implementation may decide to use another extension mechanism, but Spring Cloud doesn’t recommend that).

As discussed in the previous blog, a cloud app developer may decide to work directly with a `ServiceInfo` object. As such, if you just implement a `ServiceInfoCreator`, you would have provided some benefit already. However, working with a raw `ServiceInfo` object may not be appreciated by many developers focused on developing apps, so you will implement the next extension as well.

# [](#framework-extensibility)Framework Extensibility

The last extensibility point is `ServiceConnectorCreator`. Its job is to transform `ServiceInfo` into a service connector that is suitable for consumption in the framework the app is using. For example, it could transform `MysqlServiceInfo` into a `DataSource` object. Out of the box, Spring Cloud supports connectors for `DataSource` and a few [Spring Data](http://projects.spring.io/spring-data) and [Spring AMQP](http://projects.spring.io/spring-amqp) types. If you wish to extend Spring Cloud to other frameworks or if you wanted to support other Spring Data types (such as Neo4J, Elasticsearch, Cassandra) or Spring-compatible types (such as S3) not yet supported directly by Spring Cloud, this is the extension point you need.

```java
Copypublic interface ServiceConnectorCreator<SC, SI extends ServiceInfo> {
    SC create(SI serviceInfo, ServiceConnectorConfig serviceConnectorConfig);
    ...
}
```

There are a couple more methods; however, you will normally extend the `AbstractServiceConnectorCreator` that takes care of implementing those.

The `SC` generic parameter to `ServiceConnectorCreator` is bound to the type of connector it will create, such as `DataSource`, whereas the `SI` parameter signifies the type of `ServiceInfo` it can work with.

The `create()` method is supplied with a `ServiceInfo` object and a configuration object, that carries service-specific info such as pooling parameters. It needs to use these parameters to create an appropriate connector.

Once the implementation is ready, just put it in a file named `/META-INF/services/org.springframework.cloud.service.ServiceConnectorCreator`. Spring Cloud will use the Service Loader mechanism described earlier.

# [](#summary)Summary

As you can see Spring Cloud offers substantial extensibility along cloud platform, services, and framework axis. Next time, you come across a new kind of these, you should be able to extend Spring Cloud to work with them. If you open-source your extensions, let us know, so that we can showcase it for others to benefit. If it is a common enough extension, consider making a pull request.