---
title: Simplifying the Spring Cloud Release Train
source: https://spring.io/blog/2019/07/24/simplifying-the-spring-cloud-release-train
scraped: 2026-02-23T14:17:55.132Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  July 24, 2019 | 3 Comments
---

# Simplifying the Spring Cloud Release Train

_Releases | Spencer Gibb |  July 24, 2019 | 3 Comments_

Spring Cloud continues to prove immensely popular, and over the last few years a number of IaaS providers have provided integration with their technology and joined the release train. This has typically involved getting into the spring-cloud GitHub org and publishing in the org.springframework.cloud Maven groupid. As the number of projects included looks to increase, it is becoming a little unwieldy, and we wanted to take a step back and review the pros and cons that this model provides and propose a better path forward that benefits all projects involved.

Perhaps the biggest downside to being part of the release train is that it removes a level of control from the project maintainers. Since the core Spring Cloud team does the releases, maintainers can’t work to the schedule of the technology they are integrating with. Or even if they do manage to get a service refresh out, it won’t be picked up by the release train until the next release train version is released. This model also means that typically the project maintainer doesn’t have direct access to key statistics, such as the Maven download numbers for their project.

Also, there appears to be a lot of benefits to being part of the release train, but in fact many of these are benefits available to any project, rather than being anything to do with being on the train or in the spring-cloud GitHub org:

-   The Spring Cloud team regularly engages with external projects to help review them and provide constructive feedback on how best to integrate with Spring Cloud. Inclusion in the release train doesn’t make this more or less likely to happen. (Please reach out if you want feedback.)
-   There is a perception that it makes it easier to get that elusive checkbox on [start.spring.io](https://start.spring.io). This is not true. There are [guidelines](https://github.com/spring-io/initializr/wiki/Guidelines-for-3rd-Party-Starters) about how to ensure a project is developed such that it is suitable for start.spring.io, but decisions about inclusion are based on more than following a naming scheme. Are we finding that the community is embracing the technology the project is integrating with? Has the project built a vibrant and sustainable community, ensuring a long life and healthy codebase? Are there sufficient docs, guides, etc. showing how to use the project? Nothing in the guidelines necessitates inclusion in a Spring GitHub organization.
-   The Spring team regularly produces content involving third-party projects, highlighting key releases or enhancements. There is no need to be part of the release train for this to happen.

The [https://spring.io](https://spring.io) site obviously includes content that covers the main Spring Cloud projects, but it also includes content that covers some third-party projects. This might be a guide showing how to use the technology or an entry on one of the existing project pages. See [https://spring.io/projects/spring-cloud](https://spring.io/projects/spring-cloud), which refers to many projects -- some of which are on the train and some of which are not.

For these reasons, the Spring Cloud team has decided to move to a model that slims down the release train, allowing us to address the downsides whilst keeping all the perceived benefits. The proposal is that IaaS providers will host and maintain their code in their own GitHub organizations. This applies to all of the existing integrations currently on the release train. Spring Cloud Azure have never joined the train, and the Spring Cloud Alibaba team are already embracing this new model as they graduate from the incubator organization.

## [](#what-will-this-mean-in-practical-terms)What will this mean in practical terms?

The removal of some of these projects from the Spring Cloud GitHub organization and the release train is not a statement about a change in active development or support policy. The same teams will be working on these, keeping up with Spring Cloud releases. If anything, this change may bring clarity to the support model: if the projects are hosted in the IaaS provider’s GitHub organization, they are obviously providing the support.

The new model does mean that there will likely be a change in the group-id, and possibly in the artifact-id. It is also likely that the package names will be updated to reflect these changes. Developers will also need to explicitly include these dependencies in their projects, rather than inheriting them via managed versions through the Spring Cloud BOM.

The Spring Boot team have [guidelines](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-developing-auto-configuration.html#boot-features-custom-starter-naming) for appropriate naming of modules (autoconfiguration and starters). These are not strictly enforced for Spring Cloud, but adherence to the guidelines can mean that anything built relying on the scheme will ‘just work’ (for example, content assist tooling in an IDE).

Following this model, the Alibaba team are graduating from the spring-cloud-incubator into their own GitHub org at [https://github.com/alibaba/spring-cloud-alibaba](https://github.com/alibaba/spring-cloud-alibaba), where we continue to work with them as they head this week for an important release that supports Spring Cloud Greenwich.SR2 and Finchley.SR4. This release will include Sentinel support for Spring Cloud Gateway and enable Nacos service discovery and Spring-Cloud-Config to be used together. Look out for that!

You can expect to see the other providers move during the release of a future major Spring Cloud train, as a major release is the right time to make a serious change such as this.

Note that this is purely describing the situation and plan for the main Spring Cloud train at this time; it isn’t impacting other projects (for example, Spring Cloud Stream binders).

We hope that the reasoning above explains what we are trying to achieve with this strategy. As always, we are receptive to feedback — please let us know what you think. Giving project owners full flexibility to build and release software that better aligns with their culture, whilst continuing to offer all of the benefits of working closely with us on code reviews and project promotion, should benefit everyone.