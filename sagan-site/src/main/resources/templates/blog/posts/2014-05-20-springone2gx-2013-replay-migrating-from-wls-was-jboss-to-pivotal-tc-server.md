---
title: SpringOne2GX 2013 Replay: Migrating from WLS, WAS, JBoss to Pivotal tc Server
source: https://spring.io/blog/2014/05/20/springone2gx-2013-replay-migrating-from-wls-was-jboss-to-pivotal-tc-server
scraped: 2026-02-23T22:32:04.850Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Pieter Humphrey |  May 20, 2014 | 0 Comments
---

# SpringOne2GX 2013 Replay: Migrating from WLS, WAS, JBoss to Pivotal tc Server

_News | Pieter Humphrey |  May 20, 2014 | 0 Comments_

Recorded at SpringOne2GX 2013 in Santa Clara, CA

Speaker: Zhiyong Li

SAS® Institute has a large portfolio of Java EE applications. SAS had previously provided support to deploy and run all of these applications in WebLogic, WebSphere and JBoss. Beginning with SAS 9.4, which was released in July 2013, SAS updated its infrastructure and middle tier platform to deliver and run on Pivotal tc Server. In this talk, we will discuss the motivation, technology selection, architecture, system administration, automated installation and configuration, etc., that SAS used to improve value for its customers. Specifically, we will discuss the following areas in detail:

-   Technology selection: To make tc Server viable, we include the messaging, caching and the transaction management system.
-   Architecture: To leverage tc Server scalability and reliability in SAS products, we support clustering by using the Pivotal Web Server and the mod\_proxy. Application migration: We provide guidance to our Java developers and configuration developers on how to migrate their applications to the tc Server environment.
-   Security: We support SSL, single sign-on and other enterprise security protocols such as Integrated Windows Authentication, CA Site Minder, IBM Web Seal, SAML, etc.
-   System administration: We provide a single entry point to manage all SAS application stacks including all web applications by leveraging the Hyperic product.
-   Automated installation / configuration: We provide the automated process to install and configure Hyperic and all Pivotal Application Fabric products (tc Server, vFWS and GemFire) and SAS web applications.
-   Delivery and support: SAS delivers embedded tc Server as the SAS Web Application Server for use with all our offerings with a midtier on all our supported host platforms. This enables SAS to provide complete supported application architecture with more complete visibility and control of the critical software.
-   Cloud deployment: This approach also provides advantages for our customers leveraging virtualization and cloud deployment strategies.

!{iframe width="560" height="315" src="//www.youtube.com/embed/qfV4Bl80dJo" frameborder="0" allowfullscreen}{/iframe}