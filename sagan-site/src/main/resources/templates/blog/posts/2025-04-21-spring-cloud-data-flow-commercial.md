---
title: Spring Cloud Data Flow End of Open-Source
source: https://spring.io/blog/2025/04/21/spring-cloud-data-flow-commercial
scraped: 2026-02-23T07:46:11.283Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Michael Minella |  April 21, 2025 | 7 Comments
---

# Spring Cloud Data Flow End of Open-Source

_News | Michael Minella |  April 21, 2025 | 7 Comments_

# [](#spring-cloud-data-flow-end-of-open-source)Spring Cloud Data Flow End of Open-Source

**TL;DR;** Today we're announcing that going forward we will not be maintaining [Spring Cloud Data Flow](https://spring.io/projects/spring-cloud-dataflow), Spring Cloud Deployer, or [Spring Statemachine](https://spring.io/projects/spring-statemachine) as open-source projects. Spring Cloud Data Flow 2.11.x, Spring Cloud Deployer 2.9.x, and Spring Statemachine 4.0.x will be the last open-source lines and any future releases will only be made available to Tanzu Spring customers. This change has no impact on the rest of the open-source Spring portfolio or the support obligations of the currently available OSS versions for existing users.

---

Spring Cloud Data Flow came out of the roots for Spring XD eight years ago for orchestrating both batch and streaming workloads and has shown great success with our customers over those years. However, in order to keep Spring Cloud Data Flow and related ecosystem projects going into the future in a way that is sustainable, we have made the decision to only release Spring Cloud Data Flow as a commercial offering.

This decision is not taken lightly and is driven mainly by the adoption of these projects within our community. The vast majority of usage we see for Spring Cloud Data Flow exists within our Tanzu enterprise customers. Open-source usage represents a very small part of the overall adoption today with an equally small contribution of the maintenance provided by the community. In the past two years, Spring Cloud Data Flow’s maintenance has almost exclusively been handled via contributions from Tanzu’s R&D team in comparison to the vast majority of the Spring portfolio with vibrant communities contributing in many ways to its ongoing efforts. Spring Statemachine and Spring Cloud Deployer see similar adoption patterns as Spring Cloud Data Flow, with their use mainly being driven by their inclusion within Spring Cloud Data Flow.

The effort to maintain the unique needs of an open-source project in conjunction with a commercial offering on top of it places a very large cost on the team. This change will allow the team to focus on delivering the value that Spring Cloud Data Flow users depend on without spending extra cycles on things that just do not have the level of adoption that justify the effort needed to keep going.

We have always looked at our own portfolio of projects with a critical eye for the health of it in the long term. We retire projects that have waning adoption so that we can focus our efforts on where our community needs. We see today’s announcement as a continuation of that evolving focus.

For Tanzu entitled customers, Spring Cloud Data Flow has recently been patched to 2.11.7 in the [Spring Enterprise artifact repository](https://techdocs.broadcom.com/us/en/vmware-tanzu/spring/tanzu-spring/commercial/spring-tanzu/spring-enterprise-subscription.html). We also released the Spring Cloud Data Flow tile 1.14.5 and Kubernetes distribution 1.6.5, both based on Spring Cloud Data Flow 2.11.7. These will be followed up with Spring Boot 3.5 based product releases in the fall.

Spring’s open-source ecosystem is still vibrant and active with over 60 fully supported open-source projects, dozens of committers, and hundreds of active community contributors. Downloads across the portfolio continue to break records and we are excited at the future of Spring in the open-source world.