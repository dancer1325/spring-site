---
title: New beta versions of Concourse pipeline and Cloud Foundry manifest editing support released for Visual Studio Code
source: https://spring.io/blog/2017/05/18/new-beta-versions-of-concourse-pipeline-and-cloud-foundry-manifest-editing-support-released-for-visual-studio-code
scraped: 2026-02-23T16:31:23.930Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Martin Lippert |  May 18, 2017 | 0 Comments
---

# New beta versions of Concourse pipeline and Cloud Foundry manifest editing support released for Visual Studio Code

_Releases | Martin Lippert |  May 18, 2017 | 0 Comments_

Back in February 2017 we started to introduce new IDE-agnostic tooling support with our [first beta version of the Cloud Foundry manifest editing support](https://spring.io/blog/2017/02/03/cloud-foundry-manifest-editor-beta-released-for-visual-studio-code). As promised, we continue this journey with an improved version of the Cloud Foundry manifest editing support for Visual Studio Code and brand-new support for editing Concourse task and pipeline definitions - also as an extension to Visual Studio Code. This marks our second step towards implementing tooling in an IDE-agnostic way, adopting the language server protocol from Visual Studio Code.

We also continue our work on the Eclipse-based Spring Tool Suite, for which the next update is scheduled for July 2017 (STS 3.9.0 will be based on the Eclipse Oxygen release), while working on the next generation of Spring Tooling in an IDE-agnostic way in parallel. Those extensions for Visual Studio Code that we introduce here might seem unrelated to that, but they are part of the broader picture and important small steps towards the IDE-agnostic Spring tooling that we are working on.

## [](#new-concourse-pipeline-editing-support)New Concourse pipeline editing support

[Concourse CI](https://concourse.ci/) is an open-source continuous integration and deployment tool that is being used inside of Pivotal by various groups and projects as well as outside of Pivotal by a growing number of users and companies. In Concourse, build and deployment pipelines are defined using three core concepts (tasks, resources, and jobs), while docker is a central element for creating and running those build environments. Take a look, it is definitely worth exploring as an alternative to other CI systems.

The central piece in a Concourse-based build is the pipeline definition, usually described in a pipeline.yml file. And working with these YML-based pipeline files now becomes a lot easier, using the editing support that we built for Visual Studio Code. Take a look at the screencast to see the tooling in action:

## [](#updated-cloud-foundry-manifest-editing-support)Updated Cloud Foundry manifest editing support

We also updated the Cloud Foundry manifest editing support. Here are the details from this updated version for Visual Studio Code:

-   added support for dynamic content-assist for domains and stacks
-   added support for routes, including content-assist for domains inside of routes (including TCP routes)
-   added support for new health-check-type-endpoint property
-   added support for deprecated “none” value of health-check-type (including quick-fix to replace the deprecated value with “process”)
-   added details about the CF endpoint that was used for dynamic content-assist values
-   content-assist now shows proposals for nested properties

Take a look at the video that shows those improvements in action.

## [](#outlook)Outlook

There is more to come in 2017, like new language servers around Spring and Spring Boot and more options for editors and IDEs to plug this into. One of those options will remain the Spring Tool Suite, while other (lightweight) editors and IDEs will get awesome Spring and Spring Boot tooling that way, too. Stay tuned.