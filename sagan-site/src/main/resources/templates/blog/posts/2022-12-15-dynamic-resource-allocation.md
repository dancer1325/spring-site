---
title: Kubernetes 1.26: Alpha API For Dynamic Resource Allocation | Kubernetes
source: https://kubernetes.io/blog/2022/12/15/dynamic-resource-allocation/
scraped: 2026-02-23T10:21:35.325Z
description: Dynamic resource allocation is a new API for requesting resources. It is a generalization of the persistent volumes API for generic resources, making it possible to:
access the same resource instance in different pods and containers, attach arbitrary constraints to a resource request to get the exact resource you are looking for, initialize a resource according to parameters provided by the user. Third-party resource drivers are responsible for interpreting these parameters as well as tracking and allocating resources as requests come in.
---

# Kubernetes 1.26: Alpha API For Dynamic Resource Allocation | Kubernetes

