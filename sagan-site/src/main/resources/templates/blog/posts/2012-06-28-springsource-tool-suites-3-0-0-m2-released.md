---
title: SpringSource Tool Suites 3.0.0.M2 released
source: https://spring.io/blog/2012/06/28/springsource-tool-suites-3-0-0-m2-released
scraped: 2026-02-24T08:20:04.940Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Martin Lippert |  June 28, 2012 | 0 Comments
---

# SpringSource Tool Suites 3.0.0.M2 released

_Releases | Martin Lippert |  June 28, 2012 | 0 Comments_

Dear Spring Community,

I am pleased to announce the availability of the second milestone build of the upcoming SpringSource Tool Suites 3.0.

This M2 build includes a number of significant changes and reflects the new structure of the tooling going forward. The main goal was to move away from one big monolithic tool towards smaller independent components. Therefore the different components of the SpringSource Tool Suite have been separated from each other and are now usable on an individual basis.

All this allows us to start shipping different flavours of our tooling projects. Beginning with this M2 build we start to ship two different ready-to-use distributions:

-   **The Spring Tool Suite:** This is mostly identical with the old SpringSource Tool Suite. It brings you all the relevant features to enjoy Spring development in your IDE (including the full Spring IDE feature set, tc Server integration, and ready-packed runtimes for tc Server Developer Edition 2.7.0 and Spring Roo 1.2.2).
-   **The Groovy/Grails Tool Suite:** This new member of the family provides you with an out-of-the-box Groovy/Grails development experience with no need to install any extra components. It has all the necessary parts pre-installed and pre-configured: Groovy-Eclipse with Groovy 1.8, Grails IDE, tc Server integration, and ready-packed runtimes for tc Server Developer Edition 2.7.0 and Grails 2.0.4.

The Dashboard comes with each distribution and allows you to add the remaining projects into your installation on demand.

Due to the componentization effort some artifacts have been renamed and this renaming has impacted some of the eclipse metadata stored in your projects. The M2 versions of the distributions include migration tools that well help you update your project metadata automatically to use the new naming scheme.

For more details about new and changed features, please refer to the [New and Noteworthy for 3.0.0.M2](http://dist.springsource.com/release/STS/doc/STS-new_and_noteworthy-3.0.0.M2.pdf) document.

If you come across incompatibilities, migration problems, bugs, or any other suggestions, please provide feedback [in the forum](http://forum.springsource.org/forumdisplay.php?32-SpringSource-Tool-Suite) and file issues [via JIRA](https://issuetracker.springsource.com/browse/STS).

Downloads are available from the [STS download page](http://www.springsource.com/landing/best-development-tool-enterprise-java), take a look in the Other Downloads section.

3.0.0.M3 is planned for early July 2012, followed by the 3.0.0 Release in early August 2012.

Enjoy!