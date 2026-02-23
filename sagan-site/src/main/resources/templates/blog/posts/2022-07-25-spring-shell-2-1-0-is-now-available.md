---
title: Spring Shell 2.1.0 is now available
source: https://spring.io/blog/2022/07/25/spring-shell-2-1-0-is-now-available
scraped: 2026-02-23T10:45:52.087Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Janne Valkealahti |  July 25, 2022 | 1 Comment
---

# Spring Shell 2.1.0 is now available

_Releases | Janne Valkealahti |  July 25, 2022 | 1 Comment_

On behalf of the team and everyone who has contributed, I'm happy to announce that Spring Shell `2.1.0` has been released and is now available from [https://repo.spring.io/milestone](https://repo.spring.io/milestone).

Please see the [release notes](https://github.com/spring-projects/spring-shell/releases/tag/v2.1.0) for more details.

Thanks to all those who have contributed with issue reports and pull requests.

Earlier this year we started an effort align the project with latest `Spring Boot` and `Spring Framework` versions as it was difficult to use existing `Spring Shell` release of a spring family.

Originally the main issue we wanted to address was a removal of a bean cycles which `Spring Boot` is now enforcing by default. While this feature can be turned off it is not something Spring Shell should require. This required a lot of changes and we chose to handle it with rework of a shell internals. One big challenge was how the old `Spring Shell` worked by essentially keeping command info methods backed by `@ShellMethod` annotations and then calling those methods via reflection using not so well defined ways.

Now that it was clear that we needed to do a bigger overhaul it made sense to do further development now rather than waiting for `Spring Boot 3` and `Spring Framework 6` which `Spring Shell` eventually would have needed to support.

Here is a recap of the changes that were done:

### [](#command-registration)Command Registration

`CommandRegistration` is a new programmatic way to define commands. The existing annotation model of commands translates to these registration behind a scene. This new registration model now allows to us control commands dynamically which wasn't the case in the old shell implementation.

### [](#existing-annotations)Existing Annotations

What comes for `@ShellMethod` and `@ShellOption` We've tried to keep those compatible and future development will most likely introduce new annotations more aligned with `CommandRegistration`.

### [](#theming)Theming

Modern terminal implementations are not bound to just show a simple text, but allow for different types of font styles and can be used with colors. In the old `Spring Shell` these were mostly hard coded while it was possible to use ANSI sequences via `JLine` to write anything into a console. It made sense to introduce a theming system where text written can be styled and figures chosen per style. Figures are just unicode characters supported by modern terminals which is the basis for creating *pretty* shell *UI's*.

![sample-style-list](https://user-images.githubusercontent.com/50398/180449734-4186d36a-462e-4798-b9db-444aa4c5cb7e.gif)

![sample-figure-list](https://user-images.githubusercontent.com/50398/180449857-2bcc06ac-1705-4934-8485-7f78bf7a6f76.gif)

### [](#ui-components)UI Components

You've mostly likely used various CLI tools which go beyond just asking some text from a user and then doing something based on that. For example *GitHub CLI* is a good example as some of its commands enter interactive mode and ask users for input using various tricks like selector lists and other sort of shell style forms.

What we wanted to accomplish in `Spring Shell` was to create these components which can be use independently or combine those into a flow.

![component-flow-showcase-1](https://user-images.githubusercontent.com/50398/180447680-8fa40f23-9ce6-4cd2-87b2-22c8ee09256f.svg)

### [](#graal)Graal

A big topic in a future Spring Framework release is native compilation with *GraalVM*. This obviously makes a big impact on the CLI side as that little jvm bootstrap timeout goes away when your existing code is translated into native binary.

With `2.1.x` it was shown using our experimental *Spring Native* project that it is possible to create a *Spring Shell* application which works the same way in *Linux*, *MacOS* and *Windows*.

![sample-version-linux](https://user-images.githubusercontent.com/50398/180446288-a1c3ed95-b20c-4cdb-924f-ab283c514e24.gif)

![sample-version-win](https://user-images.githubusercontent.com/50398/180446731-9e08dc96-cfe1-4ca5-a978-2783c1cb4a52.gif)

![sample-version-macos](https://user-images.githubusercontent.com/50398/180483578-89f0da8d-2773-46b8-aef8-70d1176a7f49.png)

Official support for *GraalVM* in *Spring Shell* comes with `3.x`.

### [](#templating)Templating

Writing a command into a terminal is easy as you essentially just write something. However what we've done in some of the built-in commands like `help` is not always something a user wants to have or they may have other reasons to modify how it looks. Some default outputs from `Spring Shell` are now based on templates based on [ST4](https://www.stringtemplate.org/) from the `ANTRL` project.

This allows a user to replace templates used in `Spring Shell` and modify default behaviour. These templates also integrate into the theme framework so that it's possible to define templates per active theme.

### [](#how-can-you-help)How can you help?

[Project Page](https://spring.io/projects/spring-shell/) | [GitHub](https://github.com/spring-projects/spring-shell) | [Issues](https://github.com/spring-projects/spring-shell/issues) | [Documentation](https://docs.spring.io/spring-shell/docs/2.1.0/site/reference/htmlsingle)