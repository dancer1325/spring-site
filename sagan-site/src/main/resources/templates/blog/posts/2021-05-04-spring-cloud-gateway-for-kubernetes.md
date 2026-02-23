---
title: Spring Cloud Gateway for Kubernetes
source: https://spring.io/blog/2021/05/04/spring-cloud-gateway-for-kubernetes
scraped: 2026-02-23T13:25:03.327Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Haytham Mohamed |  May 04, 2021 | 7 Comments
---

# Spring Cloud Gateway for Kubernetes

_Engineering | Haytham Mohamed |  May 04, 2021 | 7 Comments_

The [Spring Cloud Gateway](https://docs.pivotal.io/scg-k8s/1-0/) (SCG) open-source project has been extended and offered commercially for the [Kubernetes](https://kubernetes.io/) platform. This new offering lets you automate the deployment of an API gateway service by applying YAML configuration objects to a Kubernetes cluster. You can also update the routes of API gateways in Kubernetes by applying YAML configuration to the cluster.

Spring Cloud Gateway for Kubernetes supports routing to services that are written in any language, as long as they expose HTTP endpoints. A Kubernetes operator is offered to handle creating and configuring a gateway instance by applying defined custom resources to the cluster. You can dynamically configure a spawned SCG instance in a Kubernetes platform to enable API route updates for a continuous integration (CI) and continuous delivery (CD) pipeline. Furthermore, the SCG for Kubernetes offers commercial API route filters for Single Sign-On (SSO) authentication, role-based access control, scopes authorization, authorized token relay, client certificate authorization, rate limiting, and circuit breaker. SCG instances in a Kubernetes platform run with high availability and adjustable settings for memory and vCPU resources consumption.

Spring Cloud Gateway for Kubernetes is easy to install and use. In this blog. I show how to install SCG for Kubernetes in a local development environment and show how to create and configure a gateway instance with routes. You need to have both [Docker](https://www.docker.com/) and the [Helm](https://helm.sh/) command-line interface (CLI) tools installed. Let us first start by setting up an environment with a local Kubernetes cluster. It would be also helpful to configure the cluster with a local Docker registry and ingress controller. We can use [KinD](https://kind.sigs.k8s.io/) to create a local cluster. You can install KinD from [here](https://kind.sigs.k8s.io/docs/user/quick-start/#installation). First, we spin off a local registry (named `myregistry`) with port 5000 by using the “registry” docker image as follows:

```[source,
Copy$ Docker run -d –restart=always -p “127.0.0.1:5000” –name myregistry registry:2
```

You can use the command below to create a new KinD cluster named `mycluster`. The cluster consists of two nodes, one as a control plane node and the other as a workload node with port 80 and 443 mapped to your host to ingress into the cluster. The cluster is configured to use the above local Docker registry.

```[source,
Copy$ cat <<EOF | kind create cluster --config=-
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
containerdConfigPatches:
- |-
  [plugins."io.containerd.grpc.v1.cri".registry.mirrors."localhost:5000"]
    endpoint = ["http://myregistry:5000"]
nodes:
- role: control-plane
- role: worker
  kubeadmConfigPatches:
  - |
    kind: JoinConfiguration
    nodeRegistration:
      kubeletExtraArgs:
        node-labels: "ingress-ready=true"
  extraPortMappings:
  - containerPort: 80
    hostPort: 80
    protocol: TCP
  - containerPort: 443
    hostPort: 443
    protocol: TCP
EOF
```

You need to connect the registry to the cluster network by using the following command:

```[source,
Copy$ docker network connect mycluster myregistry || true
```

Also, you need to create a Kubernetes ConfigMap to configure the local registry in the cluster:

```[source,
Copy$ cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  name: local-registry-hosting
  namespace: kube-public
data:
  localRegistryHosting.v1: |
    host: "localhost:5000"
    help: "https://kind.sigs.k8s.io/docs/user/local-registry/"
EOF
```

With that, you should have your local development environment ready with a tiny cluster to use. Now we can look into how to deploy SCG for Kubernetes. Provided that you have a license and access, you can download the installer of SCG for Kubernetes from VMware Tanzu Network. We are going to download the current version (1.0.0) of the installer and extract it to a folder. You need to first allocate Spring Cloud Gateway for Kubernetes docker images to the docker registry we installed in localhost at port 5000. From the extracted folder, run the image relocation script that is located in the `scripts` directory. This command pulls, tags, and pushes the images to the docker registry:

```[source,
Copy$ ./scripts/relocate-images.sh localhost:5000
```

Complete the installation by running the script below. By default, the Spring Cloud Gateway for Kubernetes operator and backing applications are deployed in the `spring-cloud-gateway` namespace.

```[source,
Copy$ ./scripts/ install-spring-cloud-gateway.sh
```

You can now create a gateway instance in the cluster. A new SCG instance is spawned with a `SpringCloudGateway` CRD, a new route is defined with a `SpringCloudGatewayRouteConfig` CRD, and a `SpringCloudGatewayMapping` CRD configures a gateway with routes.

![image link](https://static.spring.io/blog/haythamm/20210505/k8s-types.png)

For example, you can create a file called `gateway-config.yaml` with the following YAML definition:

```[source,
CopyapiVersion: tanzu.vmware.com/v1
kind: SpringCloudGateway
metadata:
  name: my-gateway
```

Next, apply this definition to your Kubernetes cluster:

```[source,
Copy$ kubectl apply -f gateway-config.yaml
```

This configuration creates a new Gateway instance (by default, the Gateway instance is created in the current namespace). To add routes and to map the routes to the gateway, we need to create a `SpringCloudGatewayRouteConfig` object that describes the routes and a `SpringCloudGatewayMapping` object that maps the route configuration to the gateway. Create a file called `route-config.yaml` with the following YAML definition:

```[source,
CopyapiVersion: tanzu.vmware.com/v1
kind: SpringCloudGatewayRouteConfig
metadata:
  name: my-gateway-routes
spec:
  routes:
  - id: test-route
    uri: https://github.com
    predicates:
      - Path=/github/**
    filters:
      - StripPrefix=1
```

Then create a file called `mapping.yaml` with the following YAML definition:

```[source,
CopyapiVersion: tanzu.vmware.com/v1
kind: SpringCloudGatewayMapping
metadata:
  name: test-gateway-mapping
spec:
  gatewayRef:
    name: my-gateway
  routeConfigRef:
    name: my-gateway-routes
```

Apply both definitions to your Kubernetes cluster to configure the gateway with the defined routes. Following these steps lets you route to APIs either inside or outside a Kubernetes platform. For example, you can configure a SCG to route to different backend collaborating APIs from an exposed frontend API.

![image link](https://static.spring.io/blog/haythamm/20210505/k8s-architecture.png)

The above illustrating gateway is configured to route to GitHub. You can install an ingress controller to reach the gateway from outside the cluster. For example, you can install `nginx` ingress controller as follows:

```[source,
Copy$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/kind/deploy.yaml
```

And then you can create an ingress to reach out to the gateway. The created ingress below uses `/gateway` as a path to the internal Kubernetes gateway service `my-gateway` on port 80.

```[source,
CopyapiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: gateway-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /$2
spec:
  ingressClassName: nginx
  rules:
    - http:
        paths:
          - path: /gateway(/|$)(.*)
            pathType: Prefix
            backend:
              service:
                name: my-gateway
                port:
                  number: 80
```

With that, you will be able to launch GitHub through the configured gateway using `http://localhost/gateway/github`