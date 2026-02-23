---
title: Introducing Spring Cloud App Broker
source: https://spring.io/blog/2019/05/30/introducing-spring-cloud-app-broker
scraped: 2026-02-23T14:45:57.637Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Roy Clarkson |  May 30, 2019 | 6 Comments
---

# Introducing Spring Cloud App Broker

_Engineering | Roy Clarkson |  May 30, 2019 | 6 Comments_

We recently announced the general availability of [Spring Cloud Services 3.0](https://content.pivotal.io/blog/spring-cloud-services-3-0-includes-new-and-improved-config-server), which involved a major redesign of the previous architecture used in that project. As detailed in the related blog post, Spring Cloud Services has moved to the latest versions of Spring Framework and Spring Boot, and is now built on a Reactive programming model and Spring WebFlux. Two key components of this redesign are offered as open source Spring Cloud projects.

The first project is [Spring Cloud Open Service Broker](https://spring.io/projects/spring-cloud-open-service-broker). This project has been available for some time; however, the recent [3.0.0 release](https://spring.io/blog/2019/04/29/spring-cloud-open-service-broker-3-0-0-released) has itself been redesigned to incorporate a Reactive programming model and updated to support Spring WebFlux.

The second project, which is being introduced today, is [Spring Cloud App Broker](https://spring.io/projects/spring-cloud-app-broker/). Spring Cloud App Broker represents an abstraction of a significant piece of the underlying architecture in Spring Cloud Services, and we are pleased to announce that Spring Cloud App Broker 1.0.1 is now available.

## [](#background)[](#background)Background

The [Open Service Broker API](https://www.openservicebrokerapi.org) project allows developers to deliver services to applications running within cloud native platforms such as Cloud Foundry, Kubernetes, and OpenShift. To date, the only option for building a Spring Boot based service broker application has been to add the [Spring Cloud Open Service Broker](https://spring.io/projects/spring-cloud-open-service-broker) starter to your project, include the required configuration, and implement the required interfaces. Spring Cloud Open Service Broker is less opinionated about service broker implementation and leaves many of those decisions to the developer, requiring the developer to implement all of the service broker application logic themselves.

## [](#introduction)[](#introduction)Introduction

Spring Cloud App Broker is also a framework for building Spring Boot applications that implement the Open Service Broker API. It provides a framework based on Spring Boot that enables the developer to quickly create a service broker that deploys applications and services to the platform when managed services are provisioned. It builds on Spring Cloud Open Service Broker by offering opinionated implementations of the Spring Cloud Open Service Broker interfaces.

What does this mean in practical terms? Imagine that the managed services that are deployed by a service broker have a dependency on additional services or applications. Utilizing App Broker configuration properties, these services and applications can be declared and the dependencies defined. When the service broker receives a request to provision a new service instance, App Broker will manage the deployment or provisioning of dependent apps and services, and bind those services and apps where appropriate. Conversely, when a request is received to delete a service instance, App Broker will unbind and delete any dependent services and applications that were previously provisioned.

## [](#getting-started)[](#getting-started)Getting Started

Create a Spring Boot application and include the Spring Cloud App Broker dependency in the application’s build file.

### [](#maven-dependencies)[](#maven-dependencies)Maven Dependencies

Include the following in your application’s `pom.xml` file:

```
Copy<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-app-broker-cloudfoundry</artifactId>
        <version>1.0.1.RELEASE</version>
    </dependency>
</dependencies>
```

### [](#gradle-dependencies)[](#gradle-dependencies)Gradle Dependencies

Include the following in your application’s `build.gradle` file:

```
Copydependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-app-broker-cloudfoundry:1.0.1.RELEASE'
}
```

### [](#configuring-the-service-broker)[](#configuring-the-service-broker)Configuring the Service Broker

The service broker is configured using Spring Boot externalized configuration, supplied using a YAML or Java Properties file (for example, you can provide configuration in the `application.yml` file). Because Spring Cloud App Broker builds on Spring Cloud Open Service Broker, you must provide Spring Cloud Open Service Broker configuration in order to use Spring Cloud App Broker.

Include Spring Cloud Open Service Broker configuration using properties under `spring.cloud.openservicebroker`, as in the following example:

```
Copyspring:
  cloud:
    openservicebroker:
      catalog:
        services:
        - name: example
          id: ebca66fd-461d-415b-bba3-5e379d671c88
          description: A useful service
          bindable: true
          tags:
          - example
          plans:
          - name: standard
            id: e19e6bc3-37c1-4478-b70f-c7157ebbb28c
            description: A standard plan
            free: true
```

Include Spring Cloud App Broker configuration using properties under `spring.cloud.appbroker`, as in the following example:

```
Copyspring:
  cloud:
    appbroker:
      services:
        - service-name: example
          plan-name: standard
          apps:
            - name: example-service-app1
              path: classpath:app1.jar
            - name: example-service-app2
              path: classpath:app2.jar
      deployer:
        cloudfoundry:
          api-host: api.sys.example.com
          api-port: 443
          username: admin
          password: adminpass
          default-org: test
          default-space: development
```

### [](#service-instances)[](#service-instances)Service Instances

Backing apps and dependent services can be configured for one or more services that are managed by a service broker by using the following properties.

##### [](#app-deployment-properties)[](#app-deployment-properties)App Deployment Properties

Properties for a backing app can be configured as default for all app deployments, or each service’s backing app deployment may be configured individually. See the [reference documentation](https://docs.spring.io/spring-cloud-app-broker/docs/current/reference/html5/#_properties_configuration) for a more comprehensive list of available properties.

```
Copyspring:
  cloud:
    appbroker:
      deployer:
        cloudfoundry:
          properties:
            memory: 1G
            health-check: http
            health-check-http-endpoint: /health
            health-check-timeout: 180
```

Set overriding values for a specific service in the service’s configuration under `spring.cloud.appbroker.services.*`, as shown in the following example:

```
Copyspring:
  cloud:
    appbroker:
      services:
        - service-name: example
          plan-name: standard
          apps:
            - name: example-service-app1
              path: classpath:app1.jar
              properties:
                memory: 2G
                count: 2
                no-route: true
```

##### [](#service-configuration)[](#service-configuration)Service Configuration

A backing app may require one or more dependent services. For example, an app may require the use of a MySQL database. App Broker will create any configured services and bind them to the associated app. Services are configured using properties under `services` for the deployed app, as in the following example:

```
Copyspring:
  cloud:
    appbroker:
      services:
        - service-name: example
          plan-name: standard
          apps:
            - name: example-service-app1
              path: classpath:app1.jar
              services:
              - service-instance-name: example-db
                name: mysql
                plan: small
                parameters:
                  param-key: param-value
```

## [](#further-customization)[](#further-customization)Further Customization

In addition to the supported configuration described above, Spring Cloud App Broker offers further methods of customizing the process of provisioning service instances. For example, App Broker can [generate and assign unique credentials](https://docs.spring.io/spring-cloud-app-broker/docs/current/reference/html5/#_credentials_generation) for each backing app deployment through the use of customized credential providers.

Workflows are also provided for the various stages of [creating](https://docs.spring.io/spring-cloud-app-broker/docs/current/reference/html5/#_creating_a_service_instance), [updating](https://docs.spring.io/spring-cloud-app-broker/docs/current/reference/html5/#_updating_a_service_instance), and [deleting](https://docs.spring.io/spring-cloud-app-broker/docs/current/reference/html5/#_deleting_a_service_instance) service instances, and for [creating](https://docs.spring.io/spring-cloud-app-broker/docs/current/reference/html5/#_creating_a_service_binding) and [deleting](https://docs.spring.io/spring-cloud-app-broker/docs/current/reference/html5/#_deleting_a_service_binding) service instance bindings. For example, `CreateServiceInstanceWorkflow` can be implemented and configured as a Spring Bean within the application to hook additional functionality into the request to create a service instance. This may be as simple as processing specific logging requirements.

## [](#conclusion)[](#conclusion)Conclusion

Building functional service brokers can be challenging, but with the availability of projects such as Spring Cloud Open Service Broker and Spring Cloud App Broker, we are hoping to reduce the amount of boilerplate code and enable you to more quickly build your own service broker.