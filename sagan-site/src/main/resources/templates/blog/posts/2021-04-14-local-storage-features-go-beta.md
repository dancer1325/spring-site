---
title: Local Storage: Storage Capacity Tracking, Distributed Provisioning and Generic Ephemeral Volumes hit Beta | Kubernetes
source: https://kubernetes.io/blog/2021/04/14/local-storage-features-go-beta/
scraped: 2026-02-23T13:26:29.929Z
description: The "generic ephemeral volumes" and "storage capacity tracking" features in Kubernetes are getting promoted to beta in Kubernetes 1.21. Together with the distributed provisioning support in the CSI external-provisioner, development and deployment of Container Storage Interface (CSI) drivers which manage storage locally on a node become a lot easier.
This blog post explains how such drivers worked before and how these features can be used to make drivers simpler.
Problems we are solving There are drivers for local storage, like TopoLVM for traditional disks and PMEM-CSI for persistent memory.
---

# Local Storage: Storage Capacity Tracking, Distributed Provisioning and Generic Ephemeral Volumes hit Beta | Kubernetes

