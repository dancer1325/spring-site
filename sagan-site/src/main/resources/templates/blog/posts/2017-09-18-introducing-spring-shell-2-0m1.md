---
title: Introducing Spring Shell 2.0M1!
source: https://spring.io/blog/2017/09/18/introducing-spring-shell-2-0m1
scraped: 2026-02-23T16:21:50.604Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Eric Bottard |  September 18, 2017 | 4 Comments
---

# Introducing Spring Shell 2.0M1!

_Releases | Eric Bottard |  September 18, 2017 | 4 Comments_

We are pleased to announce the first release milestone of Spring Shell 2.x!

Two years in the making, [Spring Shell 2](http://projects.spring.io/spring-shell/) is a complete rewrite of Spring Shell, leveraging newer components (such as JLine 3) and applying better modularization. Spring Shell 2 is also built with Spring Boot in mind, making use of auto configuration and other boot features.

The internal architecture now uses a pluggable model to discover what methods to turn into commands, how to parse user input into argument values and how to handle return values. This is very similar to the approach taken by Spring MVC for example and allows extensions of the framework in ways that were not previously possible. Users of Spring Shell would typically not care though, only dealing with the new "standard" [command API](https://docs.spring.io/spring-shell/docs/2.0.0.M1/reference/htmlsingle/#_writing_your_own_commands) to define their commands.

## [](#features-highlight)Features Highlight

Some of the new features are highlighted in the video below (be sure to run it full screen), but here is a more extensive rundown:

-   A long requested feature, [positional parameters](https://docs.spring.io/spring-shell/docs/2.0.0.M1/reference/htmlsingle/#_by_name_em_vs_em_positional_parameters) are now supported (can even mix and match, to some extent)
-   Use of the standard Spring conversion API allows re-use of many existing converters, while Shell 1 had its own dedicated approach
-   Building on top of JLine 3 brings nice user experience enhancements, such as navigating among completion proposals using TAB
-   Integration with the [bean validation API](https://docs.spring.io/spring-shell/docs/2.0.0.M1/reference/htmlsingle/#_validating_command_arguments) makes commands more expressive
-   The new `help` [command](https://docs.spring.io/spring-shell/docs/2.0.0.M1/reference/htmlsingle/#help-command) is way more useful than it used to be, resembling the output of a `man` page
-   Commands parameters that accept a collection or an array value may now specify a non default [arity](https://docs.spring.io/spring-shell/docs/2.0.0.M1/reference/htmlsingle/#_parameter_arity)
-   Another long requested feature, [multi-line](https://docs.spring.io/spring-shell/docs/2.0.0.M1/reference/htmlsingle/#interacting-with-the-shell) commands are now supported
-   Turning commands [on and off](https://docs.spring.io/spring-shell/docs/2.0.0.M1/reference/htmlsingle/#dynamic-command-availability) is still supported, with a more natural programming model now as well as the ability to provide an explanation of why a command is currently unavailable

## [](#lets-see-it-in-action)Let's See it in Action!

The short video below shows some of the features, using example commands that have the following signatures:

```java
Copy@ShellMethod("Add an item to the current order.")
public String addItem(
 	@ShellOption(help = "the item reference") String item,
 	@ShellOption(help = "unit price") @Min(0) float price,
 	@ShellOption(help = "the number of items to add", defaultValue = "1") @Range(min = 1, max = 15) int qty
 ) { ... }

@ShellMethod("Submit the order for processing.")
public List<?> submitOrder() { ... }
```

## [](#whats-next)What's next

This is just the first milestone, full of new features. In the upcoming weeks, we plan on fixing a few bugs, finishing writing the comprehensive [reference documentation](https://docs.spring.io/spring-shell/docs/2.0.0.M1/reference/htmlsingle/) and refactor a few internals, leading to a 2.0.0.RELEASE for [Spring One Platform](https://springoneplatform.io/).

In the meantime, please [try it out](https://docs.spring.io/spring-shell/docs/2.0.0.M1/reference/htmlsingle/#_getting_started) and provide feedback!

## [](#special-thanks)Special Thanks

I'd like to thank [Florent Biville](https://github.com/fbiville) and [Camilo Gonzalez](https://github.com/camilojc) who helped make this rewrite concrete by providing useful ideas and some of their valuable time!