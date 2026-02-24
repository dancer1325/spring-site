---
title: Scripted Editor 0.3 release available
source: https://spring.io/blog/2013/01/08/scripted-editor-0-3-release-available
scraped: 2026-02-24T08:11:17.439Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Andy Clement |  January 08, 2013 | 0 Comments
---

# Scripted Editor 0.3 release available

_Engineering | Andy Clement |  January 08, 2013 | 0 Comments_

In October the first public version of the [Scripted code editor](http://blog.springsource.org/2012/10/11/scripted-a-javascript-editor-from-vmware/) was made available, a browser based editor using a Node.js local server, with a focus on providing a great JavaScript editing experience. Today the first update is available, version 0.3.

A full set of Release Notes about the latest features is available [here](http://scripted-editor.github.com/scripted/release_notes/0_3_0/scripted_0_3_0.html). Here are some of the highlights:

## NPM Installable

Scripted can now be installed simply using the Node Package Manager (npm) on either Windows, Linux or Mac:

```
Copynpm install -g scripted
```

  

(might need a 'sudo' prefix on mac/linux). Once installed the 'scr' command can immediately be used to launch Scripted. As part of getting things into shape for npm installation the launch scripts have had a bit of an overhaul, particularly on Windows. Installing with npm is a very easy way to try out scripted.

## Key bindings

Scripted is all about speed and getting around your code quickly. To this end Scripted is heavily using keyboard shortcuts, but obviously not everyone will agree on what those shortcuts should be! In this version the Scripted key bindings are now fully configurable. In the help panel (Open with F1) click the key binding for any action to change it. Customized key bindings are kept in a file in the users home directory.

## Code comprehension

The focus of Scripted is JavaScript editing. Building on the basic understanding of JavaScript in the previous version, Scripted now understands even more configuration idioms for modular JavaScript applications. When using AMD/CommonJS Scripted will now do an even better job of discovering where a project is providing the module configuration, handling config options in the require configuration calls (like 'packages'), and chasing down module references. There is also some rudimentary support for projects using the [curl](https://github.com/cujojs/curl) resource loader instead of RequireJS.

On top of that, the inferencing engine now does a more thorough job too. The shapes of object (the valid properties upon them) are inferred by usage and the types of array elements are inferred. Working together with the dependency analyzer the inferencer is also starting to do a better job of handling global dependencies. In these setups a project may not be using a module system but is effectively merging JavaScript files together via script tags in an HTML file - Scripted will recognize this situation and understand the references amongst the files.  

## Navigation and content assist

With an even better understanding of the code structure, navigation is even smoother and content assist is improved. It is now possible to navigate via pressing either Cmd (on a mac) or Ctrl (on Windows/Linux) and clicking an identifier or module reference. This will take you to the declaration of that element or module definition.

To complete the navigation story, the history support in Scripted has been made smarter and now includes information about the current selection, scroll positions and any file open in the side panel - this ensures that when moving through history using the browser back/forward the state/layout of the editor is better preserved.

## Code Validation

Previously JSLint was the linter of choice but Scripted has now switched to [JSHint](http://www.jshint.com/docs/) due to popular demand. The configuration options are similar and it also understands JSLint style code comments, so there is no need to immediately update any existing JSLint config comments in JS code. For more information on configuration and options see the Scripted release notes and [JSHint documentation](http://www.jshint.com/docs/). Scripted will also notice any provided .jshintrc file and pickup linter configuration from there.

  That is just a few of the highlights. For more detailed information on these features, and to read about **many** more enhancements, see the [release notes](http://scripted-editor.github.com/scripted/release_notes/0_3_0/scripted_0_3_0.html).  

## What's next?

In the next version the some of the feature areas being looked at are:

-   extensibility. Plugin your own linter (or some other metric) computation tool.
-   exploiting the side panel. It isn't just for hosting that second editor...
-   editor theming. Just like keybindings are a personal thing, so are colors. When Scripted moves to a more recent version of the [Orion](http://www.eclipse.org/orion/) editor, it'll pickup some support for a more configurable editor.
-   debugger integration.

Whilst of course also further progressing the understanding that Scripted has of JavaScript projects.  

Join the [scripted-dev google group](https://groups.google.com/forum/#!forum/scripted-dev) to discuss Scripted.