---
title: Introducing Indexed Jobs | Kubernetes
source: https://kubernetes.io/blog/2021/04/19/introducing-indexed-jobs/
scraped: 2026-02-23T13:26:19.818Z
description: Once you have containerized a non-parallel Job, it is quite easy to get it up and running on Kubernetes without modifications to the binary. In most cases, when running parallel distributed Jobs, you had to set a separate system to partition the work among the workers. For example, you could set up a task queue to assign one work item to each Pod or multiple items to each Pod until the queue is emptied.
---

# Introducing Indexed Jobs | Kubernetes

