---
title: Using Finalizers to Control Deletion | Kubernetes
source: https://kubernetes.io/blog/2021/05/14/using-finalizers-to-control-deletion/
scraped: 2026-02-23T13:23:44.813Z
description: Deleting objects in Kubernetes can be challenging. You may think you’ve deleted something, only to find it still persists. While issuing a kubectl delete command and hoping for the best might work for day-to-day operations, understanding how Kubernetes delete commands operate will help you understand why some objects linger after deletion.
In this post, I’ll look at:
What properties of a resource govern deletion How finalizers and owner references impact object deletion How the propagation policy can be used to change the order of deletions How deletion works, with examples For simplicity, all examples will use ConfigMaps and basic shell commands to demonstrate the process.
---

# Using Finalizers to Control Deletion | Kubernetes

