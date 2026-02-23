---
title: The Spring Boot Dashboard in STS - Part 5: Working with Launch configurations
source: https://spring.io/blog/2016/03/29/the-spring-boot-dashboard-in-sts-part-5-working-with-launch-configurations
scraped: 2026-02-23T19:21:26.856Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Martin Lippert |  March 29, 2016 | 3 Comments
---

# The Spring Boot Dashboard in STS - Part 5: Working with Launch configurations

_Engineering | Martin Lippert |  March 29, 2016 | 3 Comments_

Welcome back Spring community,

in this fifth part of the series we will take a closer look at the new support for multiple launch configurations that was added to the Spring Boot Dashboard in [STS 3.7.3](https://spring.io/blog/2016/03/01/spring-tool-suite-3-7-3-released).

## Multiple launch configs per project

The first version the boot dashboard allowed you to quickly start and stop a local Spring Boot app. Therefore the boot dashboard focused on one specific launch configuration for the project - and completely ignored other launch configs. But having multiple launch configurations per project can be extremely useful, for example to start the same app multiple times in slightly different configurations.

The new version of the boot dashboard directly integrates the concept of launch configs. If you have multiple launch configs for the same project, they will show up in the boot dashboard as entries below the project node in the tree.

![](http://docs.spring.io/sts/nan/v373/img/blog-series/10-boot-dash-multiple-launches.png)

You can now use all the various actions and features of the boot dashboard on individual launch configs (instead of the project). You can start individual launch configs, stop them, jump to their console, open a browser for the running app, tag them, filter them, and so on. The project node serves an an aggregate for the launch configs. If you want to start or stop all launch configurations, just press start or stop on the project and all launch configs will be started or stopped.

To help you deal with multiple launch configurations the boot dashboard also has a few new actions for working with launch configurations, like open the launch config editor, duplicate an existing launch config, or delete one.

![](http://docs.spring.io/sts/nan/v373/img/blog-series/12-boot-dash-duplicate-config-action.png)

## Hide launch configs

To keep the simple things simple, the boot dashboard doesn’t show an entry for a launch config for a project if there exists only one for that project. You can change that setting, if you want to, via a setting in the boot dashboard view menu:

![](http://docs.spring.io/sts/nan/v373/img/blog-series/11-boot-dash-filter-solitary-launch-config.png)

There might be situations where you have specific launch configurations that should not show up in the boot dashboard - to keep the boot dashboard clean and easy to use. Therefore we added an option to hide individual launch configurations from the boot dashboard. You can find the switch for that if you open the launch config.

![](http://docs.spring.io/sts/nan/v373/img/blog-series/13-boot-dashboard-hide-launch-config.png)

## Conclusion

This concludes the blog series on the new features of the Spring Boot Dashboard in the Spring Tool Suite 3.7.3. Let us know about your experiences using the dashboard and provide feedback. We are happy to hear about your experiences by commenting on this or file a bug report at: [https://issuetracker.springsource.com/browse/STS](https://issuetracker.springsource.com/browse/STS).

The Spring Boot Dashboard blog series:

-   [The Spring Boot Dashboard in STS - Part 1: Local Boot Apps](https://spring.io/blog/2015/10/08/the-spring-boot-dashboard-in-sts-part-1-local-boot-apps)
-   [The Spring Boot Dashboard in STS - Part 2: Working with Cloud Foundry](https://spring.io/blog/2015/10/15/the-spring-boot-dashboard-in-sts-part-2-working-with-cloud-foundry)
-   [The Spring Boot Dashboard in STS - Part 3: Spring Boot Devtools reloaded](https://spring.io/blog/2015/10/22/the-spring-boot-dashboard-in-sts-part-3-spring-boot-devtools-reloaded)
-   [The Spring Boot Dashboard in STS - Part 4: Working with Cloud Foundry manifest files](https://spring.io/blog/2016/03/22/the-spring-boot-dashboard-in-sts-part-4-working-with-cloud-foundry-manifest-files)