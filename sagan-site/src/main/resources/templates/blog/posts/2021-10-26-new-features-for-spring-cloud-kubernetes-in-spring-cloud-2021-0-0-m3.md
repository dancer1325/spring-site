---
title: New Features For Spring Cloud Kubernetes In Spring Cloud 2021.0.0-M3
source: https://spring.io/blog/2021/10/26/new-features-for-spring-cloud-kubernetes-in-spring-cloud-2021-0-0-m3
scraped: 2026-02-23T13:06:17.671Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ryan Baxter |  October 26, 2021 | 0 Comments
---

# New Features For Spring Cloud Kubernetes In Spring Cloud 2021.0.0-M3

_Engineering | Ryan Baxter |  October 26, 2021 | 0 Comments_

When we got the results back from the [latest State Of Spring survey](https://tanzu.vmware.com/content/ebooks/the-state-of-spring-2021), 67% of you said you would like to see better support for service discovery and configuration management on Kubernetes.

With the [release of Spring Cloud 2021.0.0-M3](https://spring.io/blog/2021/10/20/spring-cloud-2021-0-0-m3-codename-jubilee-has-been-released), we are taking a big step forward to addressing both of these concerns!

[Spring Cloud Kubernetes](https://spring.io/projects/spring-cloud-kubernetes) has offered a `DiscoveryClient` implementation since its inception. However, the implementation required the application to have permissions to use the Kubernetes API server. This proved to be a major barrier for many Spring Cloud user’s, as Kubernetes administrators were hesitant to give apps permissions to make API requests to the Kubernetes API server.

Configuration management using Spring Cloud Kubernetes also suffered from the same requirement of needing access to the API server. In addition, many Spring Cloud users were quite familiar with using Spring Cloud Config Server to externalize and manage configuration, and Spring Cloud Config Server did not have support for using [ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/) and [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/https://kubernetes.io/docs/concepts/configuration/secret/) (the resources used to externalize configuration on Kubernetes).

To address some of these limitations and concerns, we have released some new functionality (as part of Spring Cloud 2021.0.0-M3) that we would love your feedback on.

**Note:** Neither of these features are meant to replace the similar functionality provided by Kubernetes itself. Instead they are meant to primarily facilitate the move of Spring Cloud applications onto Kubernetes. You may still choose to leverage ConfigMaps, Secrets, service discovery from Kubernetes using a basic Spring Boot application as described in this [topical guide](https://spring.io/guides/topicals/spring-on-kubernetes/). In the future we will provide a second topical guide outlining when and why you may choose to leverage these features from Spring Cloud Kubernetes over just what is provided by Kubernetes itself.

## [](#discovery-server-and-client-for-kubernetes)Discovery Server and Client For Kubernetes

Kubernetes has the concept of service discovery [built right into the platform](https://kubernetes.io/docs/concepts/services-networking/service/#cloud-native-service-discovery). However, if you have applications built using a Spring Cloud `DiscoveryClient` implementation or use Spring Cloud Load Balancer, these do not work when you run those applications on Kubernetes. You could decide to remove the DiscoveryClient and Load Balancer dependency, but you may not be willing or able to do that and need to use a `DiscoveryClient` when running the app on Kubernetes.

As part of Spring Cloud 2021.0.0-M3, we have added a discovery server you can deploy to Kubernetes. This discovery server acts much in the same way Eureka does in that it provides several HTTP endpoints that apps can use to get information about other services deployed on Kubernetes. You can learn more about these endpoints by reading [our documentation](https://docs.spring.io/spring-cloud-kubernetes/docs/2.1.0-M3/reference/html/#spring-cloud-kubernetes-discoveryserver).

Unlike Eureka, this new discovery server implementation does not require applications to explicitly register with the server. Instead, the discovery server uses the Kubernetes API to fetch Kubernetes services and endpoints to provide service information to apps. Again, this does require the discovery server to access the Kubernetes API server, but it eliminates the need for every app to have that requirement, as previous `DiscoveryClient` implementations did.

You can pull the discovery server image from [Docker Hub](https://hub.docker.com/r/springcloud/spring-cloud-kubernetes-discoveryserver/tags) by running the following command.

`docker pull springcloud/spring-cloud-kubernetes-discoveryserver:2.1.0-M3`

To deploy the image to Kubernetes, you can use the following YAML.

```
Copy---
apiVersion: v1
kind: List
items:
  - apiVersion: v1
    kind: Service
    metadata:
      labels:
        app: spring-cloud-kubernetes-discoveryserver
      name: spring-cloud-kubernetes-discoveryserver
    spec:
      ports:
        - name: http
          port: 80
          targetPort: 8761
      selector:
        app: spring-cloud-kubernetes-discoveryserver
      type: ClusterIP
  - apiVersion: v1
    kind: ServiceAccount
    metadata:
      labels:
        app: spring-cloud-kubernetes-discoveryserver
      name: spring-cloud-kubernetes-discoveryserver
  - apiVersion: rbac.authorization.k8s.io/v1
    kind: RoleBinding
    metadata:
      labels:
        app: spring-cloud-kubernetes-discoveryserver
      name: spring-cloud-kubernetes-discoveryserver:view
    roleRef:
      kind: Role
      apiGroup: rbac.authorization.k8s.io
      name: namespace-reader
    subjects:
      - kind: ServiceAccount
        name: spring-cloud-kubernetes-discoveryserver
  - apiVersion: rbac.authorization.k8s.io/v1
    kind: Role
    metadata:
      namespace: default
      name: namespace-reader
    rules:
      - apiGroups: ["", "extensions", "apps"]
        resources: ["services", "endpoints"]
        verbs: ["get", "list", "watch"]
  - apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: spring-cloud-kubernetes-discoveryserver-deployment
    spec:
      selector:
        matchLabels:
          app: spring-cloud-kubernetes-discoveryserver
      template:
        metadata:
          labels:
            app: spring-cloud-kubernetes-discoveryserver
        spec:
          serviceAccount: spring-cloud-kubernetes-discoveryserver
          containers:
          - name: spring-cloud-kubernetes-discoveryserver
            image: springcloud/spring-cloud-kubernetes-discoveryserver:2.1.0-M3
            imagePullPolicy: IfNotPresent
            readinessProbe:
              httpGet:
                port: 8761
                path: /actuator/health/readiness
            livenessProbe:
              httpGet:
                port: 8761
                path: /actuator/health/liveness
            ports:
            - containerPort: 8761
```

In addition to the discovery server, we have added a new `DiscoveryClient` implementation that uses the new discovery server. To add this new implementation to your app, you need to include `spring-cloud-starter-kubernetes-discoveryclient` in your app’s classpath. Any apps using this starter need to set `spring.cloud.kubernetes.discovery.discovery-server-url` to the URL of the discovery server deployed on Kubernetes.

## [](#spring-cloud-config-server-on-kubernetes)Spring Cloud Config Server On Kubernetes

As part of Spring Cloud 2021.0.0-M3, we have added an `EnvironmentRepository` for the Config Server. It adds support for fetching data from Config Maps and Secrets stored on Kubernetes. You can still use the other `EnvironmentRepository`s the Config Server supports, but, now, when you deploy the Config Server to Kubernetes and enable the `kubernetes` profile, you can include any configuration data stored in Config Maps or Secrets.

While the Config Server still needs access to the Kubernetes API server, it is no longer true that every app needs access. Instead, only the Config Server needs access, and the rest of the apps need only make HTTP requests to the Config Server, as normal.

You can read more about the Kubernetes Config Server in our [documentation](https://docs.spring.io/spring-cloud-kubernetes/docs/2.1.0-M3/reference/html/#spring-cloud-kubernetes-configserver), and we have provided an image you can use to deploy the Config Server to Kubernetes [on Docker Hub](https://hub.docker.com/r/springcloud/spring-cloud-kubernetes-configserver/tags).

You can pull this image using Docker Hub by running the following command.

`docker pull springcloud/spring-cloud-kubernetes-configserver:2.1.0-M3`

To deploy the image to Kubernetes, you can use the following YAML.

```
Copy---
apiVersion: v1
kind: List
items:
  - apiVersion: v1
    kind: Service
    metadata:
      labels:
        app: spring-cloud-kubernetes-configserver
      name: spring-cloud-kubernetes-configserver
    spec:
      ports:
        - name: http
          port: 8888
          targetPort: 8888
      selector:
        app: spring-cloud-kubernetes-configserver
      type: ClusterIP
  - apiVersion: v1
    kind: ServiceAccount
    metadata:
      labels:
        app: spring-cloud-kubernetes-configserver
      name: spring-cloud-kubernetes-configserver
  - apiVersion: rbac.authorization.k8s.io/v1
    kind: RoleBinding
    metadata:
      labels:
        app: spring-cloud-kubernetes-configserver
      name: spring-cloud-kubernetes-configserver:view
    roleRef:
      kind: Role
      apiGroup: rbac.authorization.k8s.io
      name: namespace-reader
    subjects:
      - kind: ServiceAccount
        name: spring-cloud-kubernetes-configserver
  - apiVersion: rbac.authorization.k8s.io/v1
    kind: Role
    metadata:
      namespace: default
      name: namespace-reader
    rules:
      - apiGroups: ["", "extensions", "apps"]
        resources: ["configmaps", "secrets"]
        verbs: ["get", "list"]
  - apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: spring-cloud-kubernetes-configserver-deployment
    spec:
      selector:
        matchLabels:
          app: spring-cloud-kubernetes-configserver
      template:
        metadata:
          labels:
            app: spring-cloud-kubernetes-configserver
        spec:
          serviceAccount: spring-cloud-kubernetes-configserver
          containers:
          - name: spring-cloud-kubernetes-configserver
            image: springcloud/spring-cloud-kubernetes-configserver:2.1.0-M3
            imagePullPolicy: IfNotPresent
            env:
                - name: SPRING_PROFILES_INCLUDE
                  value: "kubernetes"
            readinessProbe:
              httpGet:
                port: 8888
                path: /actuator/health/readiness
            livenessProbe:
              httpGet:
                port: 8888
                path: /actuator/health/liveness
            ports:
            - containerPort: 8888
```

With these new features, there is always room for improvement, so please try them out and provide feedback as [issues on GitHub](https://github.com/spring-cloud/spring-cloud-kubernetes/issues) so that we can make these features as useful as possible.