---
title: Kubernetes 1.28: A New (alpha) Mechanism For Safer Cluster Upgrades | Kubernetes
source: https://kubernetes.io/blog/2023/08/28/kubernetes-1-28-feature-mixed-version-proxy-alpha/
scraped: 2026-02-23T09:26:15.873Z
description: This blog describes the mixed version proxy, a new alpha feature in Kubernetes 1.28. The mixed version proxy enables an HTTP request for a resource to be served by the correct API server in cases where there are multiple API servers at varied versions in a cluster. For example, this is useful during a cluster upgrade, or when you\'re rolling out the runtime configuration of the cluster\'s control plane.
What problem does this solve?
---

# Kubernetes 1.28: A New (alpha) Mechanism For Safer Cluster Upgrades | Kubernetes

