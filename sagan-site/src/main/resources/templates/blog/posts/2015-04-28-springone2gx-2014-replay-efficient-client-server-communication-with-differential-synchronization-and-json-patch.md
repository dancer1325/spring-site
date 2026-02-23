---
title: SpringOne2GX 2014 Replay: Efficient Client-Server Communication with Differential Synchronization and JSON Patch
source: https://spring.io/blog/2015/04/28/springone2gx-2014-replay-efficient-client-server-communication-with-differential-synchronization-and-json-patch
scraped: 2026-02-23T21:04:59.299Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Pieter Humphrey |  April 28, 2015 | 0 Comments
---

# SpringOne2GX 2014 Replay: Efficient Client-Server Communication with Differential Synchronization and JSON Patch

_News | Pieter Humphrey |  April 28, 2015 | 0 Comments_

Recorded at SpringOne2GX 2014.

Speaker: Brian Cavalier

Web / JavaScript Track

Slides: [http://www.slideshare.net/SpringCentral/efficient-clientserver-communication-with-differential-synchronization-and-json-patch](http://www.slideshare.net/SpringCentral/efficient-clientserver-communication-with-differential-synchronization-and-json-patch)

The world of client-server has changed. The traditional application of REST is no longer the best fit. We're depolying applications into a world where users expect responsive UIs, on all their devices, even while disconnected. We're deploying into a world where connection latency, mobile radio usage and battery life have become primary concerns. Differential Synchronization (DS) is an algorithm that syncs data across N parties, even in the face of dropped connections, offline devices, etc. It makes more efficient use of connections by batching and sending only changes, in both directions, from client to server and from server to client. We’ll look at how it can be used with JSON Patch to synchronize application data between clients and servers over HTTP Patch, WebSocket, and STOMP, and how it can be integrated into the Spring ecosystem.