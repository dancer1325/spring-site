---
title: Kubernetes’s IPTables Chains Are Not API | Kubernetes
source: https://kubernetes.io/blog/2022/09/07/iptables-chains-not-api/
scraped: 2026-02-23T10:42:22.469Z
description: Some Kubernetes components (such as kubelet and kube-proxy) create iptables chains and rules as part of their operation. These chains were never intended to be part of any Kubernetes API/ABI guarantees, but some external components nonetheless make use of some of them (in particular, using KUBE-MARK-MASQ to mark packets as needing to be masqueraded).
As a part of the v1.25 release, SIG Network made this declaration explicit: that (with one exception), the iptables chains that Kubernetes creates are intended only for Kubernetes’s own internal use, and third-party components should not assume that Kubernetes will create any specific iptables chains, or that those chains will contain any specific rules if they do exist.
---

# Kubernetes’s IPTables Chains Are Not API | Kubernetes

