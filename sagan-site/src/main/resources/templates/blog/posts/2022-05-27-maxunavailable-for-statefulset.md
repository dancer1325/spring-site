---
title: Kubernetes 1.24: Maximum Unavailable Replicas for StatefulSet | Kubernetes
source: https://kubernetes.io/blog/2022/05/27/maxunavailable-for-statefulset/
scraped: 2026-02-23T12:39:57.000Z
description: Kubernetes StatefulSets, since their introduction in 1.5 and becoming stable in 1.9, have been widely used to run stateful applications. They provide stable pod identity, persistent per pod storage and ordered graceful deployment, scaling and rolling updates. You can think of StatefulSet as the atomic building block for running complex stateful applications. As the use of Kubernetes has grown, so has the number of scenarios requiring StatefulSets. Many of these scenarios, require faster rolling updates than the currently supported one-pod-at-a-time updates, in the case where you\'re using the OrderedReady Pod management policy for a StatefulSet.
---

# Kubernetes 1.24: Maximum Unavailable Replicas for StatefulSet | Kubernetes

