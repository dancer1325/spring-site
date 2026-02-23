---
title: Verifying Container Image Signatures Within CRI Runtimes | Kubernetes
source: https://kubernetes.io/blog/2023/06/29/container-image-signature-verification/
scraped: 2026-02-23T09:37:31.377Z
description: The Kubernetes community has been signing their container image-based artifacts since release v1.24. While the graduation of the corresponding enhancement from alpha to beta in v1.26 introduced signatures for the binary artifacts, other projects followed the approach by providing image signatures for their releases, too. This means that they either create the signatures within their own CI/CD pipelines, for example by using GitHub actions, or rely on the Kubernetes image promotion process to automatically sign the images by proposing pull requests to the k/k8s.
---

# Verifying Container Image Signatures Within CRI Runtimes | Kubernetes

