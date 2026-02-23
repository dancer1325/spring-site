---
title: Simple installation of Data Flow for Kubernetes with Helm
source: https://spring.io/blog/2017/08/31/simple-installation-of-data-flow-for-kubernetes-with-helm
scraped: 2026-02-23T16:23:42.320Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Thomas Risberg |  August 31, 2017 | 1 Comment
---

# Simple installation of Data Flow for Kubernetes with Helm

_Engineering | Thomas Risberg |  August 31, 2017 | 1 Comment_

With the new [Helm chart for *Spring Cloud Data Flow for Kubernetes*](https://kubeapps.com/charts/incubator/spring-cloud-data-flow), there is now a much simpler way of installing the software.

[Helm](https://docs.helm.sh/) is a package manager for Kubernetes, similar to apt, yum or homebrew. It is very easy to [install](https://github.com/kubernetes/helm/blob/master/README.md#install) and it greatly simplifies installation of an application and its dependencies into your Kubernetes cluster. The application package contents and configuration is defined in a *chart*. When you install it you can override any default configuration values. Helm will install any required services in addition to the ones defined in the chart. For *Spring Cloud Data Flow*, you have three required services: MySQL and Redis are used as the stores for *Spring Cloud Data Flow* state and RabbitMQ is used for the pipelines' messaging layer.

Once you have the Helm client installed on your local system, you can proceed with the cluster installation of Helm’s server portion called *Tiller*.

To install *tiller*, run `helm init`. Once this completes, you should be able to see the pod running via a `kubectl get po --namespace kube-system` command.

You are now ready to install the chart package for *Spring Cloud Data Flow*. Since the chart currently is in the *incubator* repository, you need to add this repository to our Helm install by running:

```
Copyhelm repo add incubator https://kubernetes-charts-incubator.storage.googleapis.com
helm repo update
```

Next, run the chart install using:

```
Copyhelm install --name my-release incubator/spring-cloud-data-flow
```

### [](#note)[](#note)NOTE:

If you are running on a cluster without a load balancer, such as [Minikube](https://kubernetes.io/docs/getting-started-guides/minikube/), then you should override the service type to use *NodePort*. Use the following command instead:

```
Copyhelm install --name my-release --set server.service.type=NodePort \\ incubator/spring-cloud-data-flow
```

You should see the following output:

![my-release](https://raw.githubusercontent.com/trisberg/images/master/my-release.png)

You have just created a new *release* in the *default* namespace of your Kubernetes cluster. The notes section gives instructions for connecting to the newly installed server. It takes a couple of minutes for the application and its required services to start up. You can check on the status by issuing a `get pod -w` command. Wait for the READY column to show "1/1" for all pods. Once that is done, you can connect to the Data Flow server using the external ip listed via a `kubectl get svc my-release-data-flow-server` command. The default *username* is `user`, and the *password* is `password`.

To see what Helm releases you have running, you can use the `helm list` command. When it is time to delete the release run `helm delete my-release`. This removes any resources created for the release but keeps release information so you can rollback any changes using a `helm rollback my-release 1` command. To completely delete the release and purge any release metadata, use `helm delete my-release --purge`

### [](#note-1)[](#note-2)NOTE:

There is an [issue](https://github.com/kubernetes/charts/issues/980) with generated secrets used for the required services getting rotated on chart upgrades. To avoid this set the password for these services when installing the chart. You can use:

```
Copyhelm install --name my-release \\
    --set rabbitmq.rabbitmqPassword=rabbitpwd \\
    --set mysql.mysqlRootPassword=mysqlpwd \\
    --set redis.redisPassword=redispwd incubator/spring-cloud-data-flow
```

Happy Helming!