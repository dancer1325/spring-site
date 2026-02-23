---
title: Kubernetes 1.27: More fine-grained pod topology spread policies reached beta | Kubernetes
source: https://kubernetes.io/blog/2023/04/17/fine-grained-pod-topology-spread-features-beta/
scraped: 2026-02-23T09:55:58.668Z
description: In Kubernetes v1.19, Pod topology spread constraints went to general availability (GA).
As time passed, we - SIG Scheduling - received feedback from users, and, as a result, we\'re actively working on improving the Topology Spread feature via three KEPs. All of these features have reached beta in Kubernetes v1.27 and are enabled by default.
This blog post introduces each feature and the use case behind each of them.
KEP-3022: min domains in Pod Topology Spread Pod Topology Spread has the maxSkew parameter to define the degree to which Pods may be unevenly distributed.
---

# Kubernetes 1.27: More fine-grained pod topology spread policies reached beta | Kubernetes

