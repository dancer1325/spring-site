---
title: Towards Spring Tools 5 - Stereotypes and a new Structural View
source: https://spring.io/blog/2025/11/28/towards-spring-tools-5-part2
scraped: 2026-02-22T22:07:23.428Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Martin Lippert |  November 28, 2025 | 0 Comments
---

# Towards Spring Tools 5 - Stereotypes and a new Structural View

_Engineering | Martin Lippert |  November 28, 2025 | 0 Comments_

When working on Spring projects, developers do not only think in terms of low-level concepts like classes and interfaces. When using Spring, you think about higher-level abstractions and concepts like services, repositories, configuration classes, entities, aggregate roots, and so on. To bring these concepts front and center for developers in their coding environments, the Spring Tools analyzes your source code from a Spring perspective and provides overviews and quick navigation based on those concepts - and we have done that for a long time already.

In the past, we did this using the “Go To Symbol” functionality. The Spring Tools created specialized symbols for those Spring concepts by analyzing the source code and extracting the necessary information. That resulted, for example, in symbols being created for request mappings that all looked like `/greeting – GET` - similarly for beans, repositories, etc. Having those symbols around is quite handy in your IDE. They allow you to quickly navigate through the project, to quickly search through them, and to provide a nice overview of all request mappings (in this example), if used wisely.

![Spring symbols showing up in Go To Symbols in Workspace action](https://static.spring.io/blog/mlippert/20251128/01-goto-symbols-in-workspace.png)

## [](#stereotypes-and-a-logical-view-of-the-project)Stereotypes and a logical view of the project

While these Spring-specific symbols continue to exist in the Spring Tools, the new major release brings this to a whole new level. In cooperation with the Spring Modulith and the jMolecules project, we integrated deeply with the concept of stereotypes as introduced by jMolecules 2.0 to visualize Spring projects in a unique and different way: the logical structure view.

![Structure of a simple Spring project in the logical structure view](https://static.spring.io/blog/mlippert/20251128/02-simple-structure-view.png)

Oliver Drotbohm, the author and creator of these stereotype foundations in jMolecules and Spring Modulith, introduces this concept nicely in a [comprehensive blog post](https://odrotbohm.github.io/2025/11/jmolecules-2.0-stereotypical/).

The logical structure view builds on this foundation and provides you with a stereotype-focused perspective of your entire project. Instead of showing files and folders, it shows you the elements of your projects, grouped by their stereotypes. You see web controllers grouped together, configuration classes, request mappings, repositories, and entities - those higher-level concepts that you typically have in mind when working with Spring projects.

The logical structure view allows you to also control which stereotypes you would like to see in the tree structure as individual groups. Alongside the project node in the view, you can invoke the action to select the groups you would like to take into account for each project. That way, you can, for example, decide whether you would like to see stereotypes from Spring Web as individual sections in the tree or not. This gives you a lot of flexibility and control over the structure view and allows you to customize the view exactly to your needs.

![Dialog to select the groups that should be used in the structure view for a specific project](https://static.spring.io/blog/mlippert/20251128/03-grouping.png)

## [](#module-structure-on-top-via-spring-modulith)Module structure on top (via Spring Modulith)

In case the project uses an up-to-date version of Spring Modulith to define its internal architecture and structure, the logical structure view in the Spring Tools will automatically take this into account. It not only groups the elements of your project by their stereotypes but also by the modular structure of the project.

![Dialog to select the groups that should be used in the structure view for a specific project](https://static.spring.io/blog/mlippert/20251128/04-modulith-structure-view.png)

## [](#custom-stereotypes)Custom stereotypes

Another fantastic aspect of this is the ability for you to define your own stereotypes. All you need to do is to create a corresponding `META-INF/jmolecules-stereotypes.json` file, fill in the definitions, and add this file to your projects. Alternatively, you can use jMolecules’ `@Stereotype` annotation to define your own stereotype annotations or interfaces and use them throughout your project.

The logic inside the Spring Tools will automatically pick up those definitions, independently of whether they are defined in metadata files or in source code. They will show up alongside all the other stereotypes detected in dependencies of your project in the logical structure view. This gives you the power to customize the structural view of your project inside the IDE without changing or configuring the IDE itself.

## [](#looking-forward)Looking forward

If you want to try the latest release candidates of Spring Tools 5, please go to the [tools preview page](https://spring.io/tools5) or switch to the pre-releases of the extensions in Visual Studio Code.

The upcoming third part of this series around the Spring Tools 5 release will look into the new integration with AI coding assistants, followed by the GA of the Spring Tools 5. Stay tuned.