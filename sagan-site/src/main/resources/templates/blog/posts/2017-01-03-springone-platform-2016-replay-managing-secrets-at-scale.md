---
title: SpringOne Platform 2016 Replay: Managing secrets at scale
source: https://spring.io/blog/2017/01/03/springone-platform-2016-replay-managing-secrets-at-scale
scraped: 2026-02-23T18:52:42.837Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Pieter Humphrey |  January 03, 2017 | 0 Comments
---

# SpringOne Platform 2016 Replay: Managing secrets at scale

_News | Pieter Humphrey |  January 03, 2017 | 0 Comments_

Recorded at SpringOne Platform 2016. Speaker: Mark Paluch Slides: [http://www.slideshare.net/SpringCentral/managing-secrets-at-scale-64889986](http://www.slideshare.net/SpringCentral/managing-secrets-at-scale-64889986)

Running multiple instances of microservices, deploying Docker images to Kubernetes is the current trend. But what about security? Are you encrypting passwords? Where do you store the key? How often do you rotate secrets? A modern system requires access to a multitude of secrets: database credentials, API keys for external services, credentials for service-oriented architecture communication and often much more. Traditional, manual patterns cannot keep the security bar high with dynamic deployment scenarios. Secrets should stay secret and not get distributed amongst the landscape. Come to this session to learn how to keep the security bar high while running services that require secrets. You'll see how to securely share and manage secrets (certificates, passwords, keys) for your services using Vault and how to use it with Spring Boot.