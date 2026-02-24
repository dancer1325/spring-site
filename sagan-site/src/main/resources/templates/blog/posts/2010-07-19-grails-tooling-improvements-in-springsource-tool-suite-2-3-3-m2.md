---
title: Grails tooling improvements in SpringSource Tool Suite 2.3.3 M2
source: https://spring.io/blog/2010/07/19/grails-tooling-improvements-in-springsource-tool-suite-2-3-3-m2
scraped: 2026-02-24T08:55:17.454Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Andy Clement |  July 19, 2010 | 2 Comments
---

# Grails tooling improvements in SpringSource Tool Suite 2.3.3 M2

_Engineering | Andy Clement |  July 19, 2010 | 2 Comments_

The recently released STS 2.3.3 M2 introduced a series of enhancements to our Grails support for Eclipse. In this article I'll be discussing what you can expect to find if you try it out (grab it here: [SpringSource Tool Suite](http://www.springsource.com/products/springsource-google-download)).

## Groovy-Eclipse

The grails tools actually build on and extend the Groovy-Eclipse support, which is developed by the same team at SpringSource. Earlier this year the Groovy-Eclipse tools won 'Best Open Source Developer Productivity Tool' at [Eclipse-Con 2010](http://www.eclipse.org/org/foundation/eclipseawards/winners10.php). You can read more about the latest enhancements in the recent Groovy-Eclipse 2.0.2 release here: [New and Noteworthy](http://www.google.com/url?sa=D&q=http%3A%2F%2Fdocs.codehaus.org%2Fdisplay%2FGROOVY%2FGroovy-Eclipse%2B2.0.2%2BNew%2Band%2BNoteworthy). I'm not going to focus on Groovy-Eclipse here, but some highlights from that release were:

-   refactoring support: now supporting extract method, extract constant, extract local variable
-   improvements in code formatting and indentation

Now, onto Grails!

## Getting a new perspective

There is now a new Grails perspective to better organize the views and widgets we have been adding to STS. You can open the perspective in the normal way (Window>OpenPerspective>Grails). In the new perspective the first thing to notice is that the Eclipse project explorer is open, rather than the package explorer. The project explorer is using a custom content provider that shows a view of a grails project that should be more familiar to a grails developer:

![Grails Perspective](http://blog.springsource.com/wp-content/uploads/2010/07/GrailsPerspective.png "Grails Perspective")

New labels and icons are in place for the groups of similar entities: domain objects, controllers, views, etc. However the biggest change is the new plugins folder. Previously when working with a grails project the plugin dependencies were tricky to see in the UI, being hidden in the classpath container and via some Eclipse linked source folder entries. Now in the project explorer it is much more obvious what the application dependencies are.

Also, related to plugins, we have a new Grails Plugin Project wizard. This is very similar to the Grails Project Wizard, but instead of running create-app, it will cause the create-plugin command to run. With this new wizard and the new support we have for local (inplace) plugins, it is much easier to develop your application following a plugin oriented architecture.

Here is an example using a local/inplace plugin configuration:

![InplacePlugins](http://blog.springsource.com/wp-content/uploads/2010/07/InplacePlugins.png "InplacePlugins")

In that shot you can see two Eclipse projects. The main grails application 'MyFirstGrailsApp' and a plugin project 'MyFirstGrailsPlugin'. By editing the BuildConfig.groovy in the main application a dependency has been expressed onto the plugin project:

grails.plugin.location.MyFirstGrailsPlugin="../MyFirstGrailsPlugin"

After specifying that dependency and running a 'Refresh Dependencies' against the application, the 'plugins' folder has updated (see the above screenshot) with a new entry for my new dependency and a different kind of icon which indicates that it is a different kind of plugin dependency.

## In Command

For enabling users to be more productive, the command prompt has been enhanced. It now allows project selection, and can be pinned in place (so it isn't accidentally closed), but most importantly it now has a history function. The history enables you to quickly re-run the same command or run similar commands. For accessing the prompt you can use the same 'claw' keypress (Alt+Shift+Ctrl+G on my windows machine), or if your hand doesn't bend that way you can use the new grails icon on the grails perspective toolbar to launch it. The pulldown next to the grails icon provides another route to accessing the command history, showing the commands and the project against which they were run:

![history](http://blog.springsource.com/wp-content/uploads/2010/07/history.png "history")

Selecting any entry in the pulldown history will open the prompt with that command pre-filled, it can be edited prior to execution or simply re-run. If the prompt is open then the other route to accessing the history is simply to press Up-Arrow:

![grailsprompt](http://blog.springsource.com/wp-content/uploads/2010/07/grailsprompt.png "grailsprompt")

To speed up navigation around your applications, STS now includes a number of new keyboard shortcuts for grails projects. When in a controller, service, taglib or domain class, you can use Alt+G then one of D, C, S, T to jump to the related domain class/controller/service/taglib in the editor. Jumping is also possible by clicking the new icons on the toolbar: ![jumping](http://blog.springsource.com/wp-content/uploads/2010/07/jumping.png "jumping")

## Managing plugins

To make it easier to organize the plugins a project is using we have a new grails plugin manager. Rather than trying to remember the name of the plugin you want, you can open up the manager (through the context menu RightClick>Grails Tools>Grails Plugin Manager..., or via keypress Alt+G,M) and browse the available plugins:

![GrailsPluginManager](http://blog.springsource.com/wp-content/uploads/2010/07/GrailsPluginManager.png "GrailsPluginManager")

The plugin manager enables you to:

-   install new plugins
-   update existing plugins
-   uninstall plugins

It also provides the detailed descriptions and any available links to documentation.

The list of available plugins is cached but you can press Refresh to ensure you are working with the latest list. By default the manager is showing you all available plugins, but as you scroll down you will see what you already have installed (installed plugins have a green tick against them). Importantly if any of the installed plugins have had an update released, the UI will indicate that to you and you can update if you wish (a blue up-arrow icon indicates an update is available). Due to the act of installing/uninstalling a plugin not being instantaneous (it takes a few moments for grails to actually do it), as you interact with the UI and mark plugins for install/update/etc you are basically scheduling a series of grails commands to run. The changes you have requested won't actually execute until you press the OK button to close the manager. If at any time you think you've messed up you can cancel the manager (or reset the manager) and your project will be in its original state.

## GSPs

As well as many minor fixes, gsp editing has been improved by the addition of code assist for taglibs:

![gsptags](http://blog.springsource.com/wp-content/uploads/2010/07/gsptags.png "gsptags")

Here you can see I have a new taglib called TextInserter defining a tag alphabet, in the gsp editor I can code complete on that tag. (following the current model for jsp editing, the code assist Ctrl+Space must be performed prior to typing).

## Dynamic finders

This doesn't really fit into the sections above but is a nice improvement. The groovy editor will now recognize the usage of dynamic finders and provide them in code assist:

![dynamicfinders](http://blog.springsource.com/wp-content/uploads/2010/07/dynamicfinders1.png "dynamicfinders")

Here you can see against my Song object (which only has a title and duration) any attempt to use invalid finders is marked with underlining in the editor, and code assist is providing the valid choices.

That's it! Quite a lot of change for STS M2 - go and grab a copy now and try it out: [SpringSource Tool Suite](http://www.springsource.com/products/springsource-google-download)

Any feedback is appreciated. Improvements to debugging is something we are going to be looking at in the near term, but if you wish to raise new requirements on comment on existing issues, please see the [STS issue tracker](https://issuetracker.springsource.com/browse/STS).