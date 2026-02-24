---
title: Using Spring Cloud programmatically
source: https://spring.io/blog/2014/07/29/using-spring-cloud-programmatically
scraped: 2026-02-23T22:18:27.078Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ramnivas Laddad |  July 29, 2014 | 0 Comments
---

# Using Spring Cloud programmatically

_Engineering | Ramnivas Laddad |  July 29, 2014 | 0 Comments_

In the [last blog](https://spring.io/blog/2014/06/03/introducing-spring-cloud), I showed you how to use [Spring Cloud](http://projects.spring.io/spring-cloud)'s Java configuration option to obtain service connectors declaratively (there is also XML namespace support, if you need it). In this blog, we will take a closer look at how you would use Spring Cloud programmatically. This will help in the situations where you cannot use Java or XML configuration. It will also demystify how Spring Cloud works and prepare for the next blog in this series, where we discuss extending Spring Cloud.

To work with Spring Cloud we need to access an object of the `Cloud` class. However, you can’t create a `Cloud` object directly (its constructor is not public). Instead, you will obtain it through `CloudFactory`.

```java
CopyCloudFactory cloudFactory = new CloudFactory();
Cloud cloud = cloudFactory.getCloud();
```

The cloud object created in this matter is suitable for the environment in which the app is operating. For example, if the app is running in Cloud Foundry it is configured to understand how it exposes services to the app. Note that creating a `CloudFactory` instance is somewhat expensive, therefore you should try to avoid creating multiple instances. If you use a dependency injection framework such as Spring, it will take care of avoiding multiple instances; otherwise, just manage it yourself.

Once we have the cloud object, we can get application instance information, service information objects using various criteria, and service connectors using the specified criteria. Let's say, you want to get `ServiceInfo` objects for all services bound to the app and print the JDBC URL for relational services, you could use the following snippet:

```java
CopyList<ServiceInfo> serviceInfos = cloud.getServiceInfos();
for (ServiceInfo serviceInfo : serviceInfos) {
    if (serviceInfo instanceof RelationalServiceInfo) {
        System.out.println(((RelationalServiceInfo) serviceInfo).getJdbcUrl());
    }
}
```

This will produce output such as this:

```
Copyjdbc:postgresql://babar.elephantsql.com:5432/tbsonrjm?user=***&password=***
```

Objects obtained using `getServiceInfos()` and its variations contain enough information such as URL and credentials to create a service connector. In some cases, obtaining a `ServiceInfo` object may be all you need, since you can always create suitable connectors (such as a `DataSource`) based on it. But in most cases, you would let Spring Cloud create a suitable service connector for a service. For example, if you would like to get a `DataSource` for the "inventory-db" service directly, you could use the following snippet:

```
CopyDataSource inventoryDataSource = 
    cloud.getServiceConnector("inventory-db", DataSource.class, null);
```

There is a variation of this method: `getSingletonServiceConnector()`, which you can use as follows:

```java
CopyDataSource inventoryDataSource = cloud.getSingletonServiceConnector(DataSource.class, null);
```

Here, it will return a `DataSource` for the unique relational database service bound to the app; if there is no such service or there is more than one service, it will throw an exception. We passed `null` as the last argument to both methods to use the default configuration for the created connector. However, you can pass a configuration you desire to override. For example, here we specify pool config as well as connection config for the datasource to be created.

```java
CopyPoolConfig poolConfig = new PoolConfig(20, 200);
ConnectionConfig connectionConfig = new ConnectionConfig("characterEncoding=UTF-8");
DataSourceConfig serviceConfig = new DataSourceConfig(poolConfig, connectionConfig);
DataSource invetoryDataSource = cloud.getSingletonServiceConnector(DataSource.class, serviceConfig);
```

Last, there is a method to obtain application info that contains application id (cloud dependent, but typically the application name), application instance id, and loosely defined application properties. Let’s print all this information:

```java
CopyApplicationInstanceInfo appInstanceInfo = cloud.getApplicationInstanceInfo();
System.out.println("Application id: " + appInstanceInfo.getAppId());
System.out.println("Application instance id: " + appInstanceInfo.getInstanceId());
for (Map.Entry<String, Object> entry: appInstanceInfo.getProperties().entrySet()) {
    System.out.println("Application property: " + entry.getKey() + "=" + entry.getValue());
}
```

When you execute this code in an app running in Cloud Foundry, you get output similar to the following (abbreviated here). If the same app is running in Heroku, it will produce a similar output, however, with a different set of keys:

Application id: hello-spring-cloud
Application instance id: 8b523252a9d3478b92750ef27ad4e5b0
Application property: limits={mem=800, disk=1024, fds=16384}
Application property: application\_version=b1257c57-2a5c-47aa-8ca7-5e8b6d9a7b9c
Application property: application\_name=hello-spring-cloud
Application property: application\_uris=\[hello-spring-cloud.cfapps.io\]
Application property: version=b1257c57-2a5c-47aa-8ca7-5e8b6d9a7b9c
Application property: name=hello-spring-cloud
Application property: space\_name=development
Application property: space\_id=5f629937-1821-4f48-9eb4-8c67c70c0df0
Application property: application\_id=a345f90f-e075-4005-b003-f4ab86ad716a
Application property: instance\_id=8b523252a9d3478b92750ef27ad4e5b0
Application property: instance\_index=0
Application property: host=0.0.0.0
Application property: port=61023
Application property: start=2014-07-15 21:27:34 +0000
Application property: state\_timestamp=1405459654

That is pretty much all you need to know to use Spring Cloud programmatically. In the next blog, we will shift our focus on the extensibility aspect of Spring Cloud. Stay tuned.