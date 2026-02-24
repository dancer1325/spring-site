---
title: SpringSource Tool Suites 3.0.0 released - reorganized, open-sourced, and at GitHub
source: https://spring.io/blog/2012/08/13/springsource-tool-suites-3-0-0-released-reorganized-open-sourced-and-at-github
scraped: 2026-02-24T08:18:32.327Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Martin Lippert |  August 13, 2012 | 0 Comments
---

# SpringSource Tool Suites 3.0.0 released - reorganized, open-sourced, and at GitHub

_Engineering | Martin Lippert |  August 13, 2012 | 0 Comments_

## Introduction

We are proud to announce that the newest major release of our Eclipse-based developer tooling is now available. This is a major release not only in terms new features but because of other serious changes like componentization, open-sourcing and the fact that for the first time we are making multiple distributions available, each tailored for a different kind of developer. Let's look at the details:

## The Spring Tool Suite and the Groovy/Grails Tool Suite

In the past the SpringSource Tool Suite came as a full distribution download that was ready-to-use by most Spring developers. In contrast to that Groovy/Grails developers had to install several extensions manually into their development environment to get started. This has changed. We are now shipping two full distributions:

-   **[Spring Tool Suite:](http://www.springsource.org/sts)** The Spring Tool Suite is a full distribution of our Eclipse-based tooling that comes with all the necessary parts pre-installed that you need to work with your Spring projects. It includes support for the Spring Core framework itself, Spring Integration, Spring Batch, Spring Webflow, Spring Data, and many more. It comes with the latest versions of tc Server Developer Edition and Spring Roo, the latest Eclipse Integration for Maven and is build on top of the latest Eclipse Juno 4.2 release. This is very similar to what was previously called the SpringSource Tool Suite.

-   **[Groovy/Grails Tool Suite:](http://grails.org/products/ggts)** The Groovy/Grails Tool Suite is a full distribution of our Eclipse-based tooling that is customized for Groovy and Grails development. It has Groovy-Eclipse pre-installed as well as our Grails tooling, support for direct deployment to tc Server, and comes with a ready-to-use Grails installation as part of the distribution. It is also build on top of the latest Eclipse Juno 4.2 release and provides a ready-to-use experience for our Groovy-Grails users.

## Open-Source and at GitHub

We are strongly committed to open-source and are active committers on many of the open source projects that our tooling includes, for example AspectJ, AJDT, and Groovy-Eclipse. Spring IDE, one of the major parts of the SpringSource Tool Suite in the past, was also always open-source. Now we are open-sourcing all parts of the tool suites under the [Eclipse Public License](http://www.eclipse.org/legal/epl-v10.html) at GitHub under the [SpringSource organization at GitHub](https://github.com/SpringSource). The formerly commercial add-ons to the Spring tooling, like the integration for Spring Roo, or the add-ons to provide better content-assist, better code-completion, and advanced refactoring support, as well as project templates for Spring, have been contributed to the Spring IDE project. Other parts are extracted into brand new open-source projects, like the Eclipse integration for tc Server.

## Componentized Projects

To allow individual installation and better modularization among the different parts of the tool suites, we have componentized the different parts into their own projects. They all live at GitHub, provide their own nightly update sites, and can be installed into a plain Eclipse JEE installation individually.

-   **Spring IDE:** This brings you all the tooling for working with the Spring framework, along with integrations for various additional Spring-related technologies like AJDT, Spring Integration, Spring Webflow, Spring Data, Spring Security, and Spring Roo. The support for Maven and Spring Roo, that was formerly part of STS only, has been integrated into this project. ([https://github.com/SpringSource/spring-ide](https://github.com/SpringSource/spring-ide))
-   **Grails IDE:** Brings you the full Grails developer tooling that was previously installable from the dashboard into a SpringSource Tool Suite instance. It is built on top of the Groovy-Eclipse project. ([https://github.com/SpringSource/grails-ide](https://github.com/SpringSource/grails-ide))
-   **Eclipse Integration for tc Server:** This component provides the ability to create new instances of tc Server, use existing ones, deploy and update apps directly from your workspace, configure your tc Server instance, and activate Spring Insight. ([https://github.com/SpringSource/eclipse-integration-tcserver](https://github.com/SpringSource/eclipse-integration-tcserver))
-   **Eclipse Integration for Gradle:** This provides Gradle support in Eclipse. It allows the user to import their gradle configured projects directly and will automatically manage the dependencies according to the gradle configuration. It also allows execution of gradle tasks directly from Eclipse.([https://github.com/SpringSource/eclipse-integration-gradle](https://github.com/SpringSource/eclipse-integration-gradle))
-   **Eclipse Integration Commons:** This project contains the shared infrastructure that is common across the above components. Additionally it contains UAA and the SpringSource Dashboard. ([https://github.com/SpringSource/eclipse-integration-commons](https://github.com/SpringSource/eclipse-integration-commons))

As an effect of this reorganization and the open-sourcing, there are fewer dependencies between these projects. Therefore you can consume them individually from the projects update sites, if you want to, and only a minimal set of dependencies will be pulled in. For example the Eclipse integration for VMware vFabric tc Server can be installed into a plain Eclipse JEE without the need to also install Spring IDE, Grails IDE, or other components. You can always use the Dashboard (that comes with every project, like UAA) to easily add other projects to your existing installation as you might be used to from previous SpringSource Tool Suite versions.

## Contribution Process

One of the best things about GitHub is the notion of [pull requests](https://help.github.com/articles/using-pull-requests). Read up if you're not already familiar, but suffice to say that pull requests are like patches and code reviews all rolled into one tight process and simple UI. Take a look through the pull request histories for Spring Integration, Spring Framework, and many of the other Spring projects and you'll see plenty of interesting and useful examples. This process is much smoother than attaching patch files to JIRA; when you combine it with the power of Git, it means it has never been easier to contribute to Spring tooling projects. However, not every pull request gets in. The outcome depends on the review process, but nevertheless many of the contributions will make their way in after suitable discussion and refinement. There is a [contributor guidelines](https://github.com/SpringSource/spring-framework/wiki/Contributor-guidelines) document from the core Spring framework that will give you an impression of how the process works. Some pieces will be a bit different for the tooling projects, but give it a read if you have something you'd like to give back to the framework. This is a great way of getting your issue to the front of the line. We naturally give a bit of priority to users who take the time to put together a high-quality contribution. Thanks to all those who have done so already, and thanks in advance to future contributors!

## Downloads, more information and FAQ

You can find the downloads as well as more information on the project websites for the toolsuites:

-   [Spring Tool Suite](http://www.springsource.org/sts)
-   [Groovy/Grails Tool Suite](http://grails.org/products/ggts)
-   [Installation Instructions](http://www.springsource.org/STS-installation-instructions)
-   [FAQ](http://forum.springsource.org/showthread.php?129279-Sts-amp-ggts-3-0-0-faq)

## Feedback and discussions

If you have feedback or questions for us, please do not hesitate to contact us via our [SpringSource Tool Suite forum](http://forum.springsource.org/forumdisplay.php?32-SpringSource-Tool-Suite). Bugs and feature requests are always welcome as tickets [in our JIRA](https://issuetracker.springsource.com/browse/STS) or, even better, as pull requests on GitHub.

Enjoy!