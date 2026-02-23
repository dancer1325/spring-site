---
title: Spring Cloud Skipper 1.0.5 released
source: https://spring.io/blog/2018/06/06/spring-cloud-skipper-1-0-5-released
scraped: 2026-02-23T15:23:07.583Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  June 06, 2018 | 0 Comments
---

# Spring Cloud Skipper 1.0.5 released

_Releases | Mark Pollack |  June 06, 2018 | 0 Comments_

On behalf of the team, I am pleased to announce the release of Spring Cloud Skipper 1.0.5 GA

Skipper is a lightweight tool that allows you to discover Spring Boot applications and manage their lifecycle on multiple Cloud Platforms. You can use Skipper standalone or integrate it with Continuous Integration pipelines to help implement the practice of Continuous Deployment.

The [getting started section](https://docs.spring.io/spring-cloud-skipper/docs/1.0.5.RELEASE/reference/htmlsingle/#getting-started) in the reference guide is the best place to start kicking the tires.

This is primarily a bug fix release. Significant changes since the 1.0 GA release are:

-   Improved state management by simplifying objects that are serialized by the state machine.
    
-   Improved handling of timeout during upgrade and rollback.
    
-   Package upgrades can now be cancelled.
    
-   Improved escaping of special characters in generated YAML.
    
-   Upgraded deployer libraries to latest versions.
    
-   Update to Spring Shell 2.0.1.
    

Please reach out on [GitHub Issues](https://github.com/spring-cloud/spring-cloud-skipper/issues), [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud-skipper), and the [Gitter channel](https://gitter.im/spring-cloud/spring-cloud-skipper) with questions, feedback or contributions.