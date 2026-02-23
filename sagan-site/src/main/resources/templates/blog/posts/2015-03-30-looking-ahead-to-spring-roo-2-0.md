---
title: Looking ahead to Spring Roo 2.0
source: https://spring.io/blog/2015/03/30/looking-ahead-to-spring-roo-2-0
scraped: 2026-02-23T21:09:39.139Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Pieter Humphrey |  March 30, 2015 | 42 Comments
---

# Looking ahead to Spring Roo 2.0

_Engineering | Pieter Humphrey |  March 30, 2015 | 42 Comments_

Original author: DISID Corporation

Dear Spring community,

The DISID Spring Roo team is busily working towards the 2.0 release. With Spring Roo 2.0 we would like recover the essence that defines the Roo project:

-   Be a rapid application **development tool**, Roo isn't either a framework nor Maven plugins.
-   Intelligent code generation to provide **improved productivity**.
    -   Developers often are forced to spend too much of their time doing things that add too little value, Spring Roo's code generation helps them stay focused.
-   Create applications based on the extensive set of **Spring technologies**: Spring Boot, Spring Data, Spring MVC, Spring Security, etc.
-   Generate applications based on **best architecture practices** like: Service Layer, Repository Layer
-   New scaffolding model that generates a fully functional **responsive UI** based on jQuery and Bootstrap.
-   Improve **extensibility** and increase the **collaboration** of the Spring Roo project:
    -   We will create the “**Roo Marketplace**”: the alternative to Roobot, easier to maintain and available for everyone, a place to find and keep track on third party addons and Roo Addon Suites.
    -   A “**Roo Addon Suite**” is a great way to package and distribute a set of add-ons together, for example if you want to distribute Roo custom distributions. Roo Addon Suite is based on OSGi R5 Subsystems that provides a really convenient deployment model, without compromising the modularity of Roo.

The new Roo 2.0 is a beginning, in future versions we would like to design a new way to define the view layer components to get a true independence from view layer technologies letting the developers to try the technology that better adjust to their requirements: JSP, Thymeleaf, etc. without losing any benefit.

We have scheduled the work of the relase 2.0 in 3 main milestones:

**Milestone 1**: Create a smaller and easier to maintain Spring Roo distribution. From 2.0, Roo will contain the runtime and the main addons only, so new versions could be released more frequently and being kept up to date with latest Spring projects:

-   Make a better separation between the Spring Roo runtime and the core addons. The Roo runtime APIs (classpath, metadata, support, etc.) must be kept as stable and backwards compatible as possible.
-   Move the addons not classified as ”core addon” (GWT, JSF, ...) to their own projects to be maintained by Roo community. If your organization would like to contribute to Roo project by maintaining these addons please contact to: springroo@ disid.com
-   Migrate current user guide from docbook to ASCIIdoc.

**Milestone 2**: Update code generation to use latest Spring technologies

-   Update code generation to use the latest Spring framework versions (4.x)
    -   Move from Spring framework dependencies to Spring IO Platform
-   User Managed POM (ROO-3465, ROO-3478)
-   Spring Profiles support
-   Annotation based configuration:
    -   Move to class configuration in spite of XML configuration
    -   Improve application maintanability by using Spring Boot annotations
-   Remove Active Record data model in favor of the Repository (Spring Data) based one.
-   Generate application arquitecture based on service layer pattern by default

**Milestone 3**: Move web layer to HTML5

-   Responsive UI – View layer based on jQuery, Bootstrap and CSS3

*Important*: Roo 2.0 might contain API changes and less add-ons than previous version so this release probably won't be backward compatible with 1.3. You can see a more specific roadmap in the [SpringRoo JIRA](https://jira.spring.io/browse/ROO/? selectedTab=com.atlassian.jira.jira-projects-plugin:roadmap-panel):

As always, you’ll also find Roo on Twitter - either follow [@SpringRoo](https://www.twitter.com/springroo) or just include #SpringRoo in your tweets. Stay tuned to Spring Roo news!