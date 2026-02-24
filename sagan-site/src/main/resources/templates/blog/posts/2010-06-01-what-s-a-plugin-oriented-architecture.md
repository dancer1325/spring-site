---
title: What\'s a plugin-oriented architecture?
source: https://spring.io/blog/2010/06/01/what-s-a-plugin-oriented-architecture
scraped: 2026-02-24T08:57:17.783Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Peter Ledbrook |  June 01, 2010 | 1 Comment
---

# What's a plugin-oriented architecture?

_Engineering | Peter Ledbrook |  June 01, 2010 | 1 Comment_

Grails is a fantastic framework for developing web applications quickly and easily. You also have access to a plethora of plugins that provide features or make integration with other systems nice and easy. That's all good, but in this article I want to talk about what happens when your application grows and you start drowning in a sea of controllers, domain classes, and other files.

## Separation of concerns

One of the most useful patterns in software architecture is called *separation of concerns*. The idea is that you group everything related to a particular feature or *concern* into a single, self-contained unit. The code in that unit should not take on any other responsibility. For example, the business logic of a web service should be in one class while the handling of SOAP messages should be in another: the business logic and SOAP handling are two different concerns.

The real beauty of this pattern is that you can aggregate these units into coarser-grained concerns, so you end up using the pattern at multiple levels. For example, say that the web service mentioned above provides a blog-like feature. You could package the business logic, SOAP gateway, and perhaps a REST interface all into a single unit that can be reused.

The standard form of packaging for such coarse-grained features in the Java world is the Java ARchive (JAR). If you're already a Grails developer, you will know that your Grails applications can use such JAR files. But they don't help when it comes to controllers, domain classes, and other special Grails "artifacts". Fortunately, we have a ready-made unit that *can* help: the Grails plugin.

Ryan Geyer has written [a great post](http://www.nslms.com/2010/03/10/modularizing-your-grails-application-domain-classes/) demonstrating how to use a plugin to provide a reusable domain model and why you might want to do so. Here's another example in diagrammatic form:

![An example plugin-oriented architecture](http://blog.springsource.com/wp-content/uploads/2010/06/plugin-oriented-architecture.png "An example plugin-oriented architecture")

We package a blog feature into one plugin and a payment processing feature into another. The idea here is that multiple applications are likely to use the same payment processing code and some may also require a blog feature. You can also package static resources to ensure that all your applications have a consistent look and feel. That's what the branding plugin is for. This could include views, layouts, and tag libraries.

Ryan's article shows how to do all this via the plugin installation mechanism, but let's face it, that's hardly conducive to a rapid feedback development cycle. Every change in a plugin requires you to package the plugin and then install it in your application. Fortunately, there is another way.

## In-place plugins

What if Grails could load plugins direct from their development directory? You then wouldn't have to go through the intermediate steps of packaging and installing the plugin. In fact, this has been possible to some degree since Grails 1.1, but with version 1.3, it has now matured to a point that makes it much more usable. How do you do it? Simple.

Imagine you have a simple application and a blog plugin side by side in the same directory:

my-app
 +- blog
 +- app

To include the blog plugin into app, just add this entry to grails-app/conf/BuildConfig.groovy:

```groovy
Copygrails.plugin.location.blog = "../blog"
```

The required prefix is "grails.plugin.location." - what comes after is up to you, but I recommend you use the name of the plugin. On the right hand side of the expression is the path to the plugin's development directory. Note that this can be absolute or relative.

Voila! When you run the application, you will have all blog's domain classes, controllers, views, etc. available. Even better, if you modify one of blog's controllers or views while the application is running, those changes will automatically be picked up. In other words, you get automatic reloading with in-place plugin artifacts just as you do with your application artifacts.

So with in-place plugins you get the benefits of separation of concerns, but you also get the rapid-feedback development cycle from normal Grails development!

This technique works well while you're working on a plugin, but it doesn't scale particularly well between multiple applications and development teams. Fortunately, you can easily remove the grails.plugin.location line from BuildConfig.groovy, publish the plugin to an internal Maven repository [as described here](/2010/05/18/managing-plugins-with-grails-1-3/), and then add the plugin as a dependency via the dependency DSL.

Using plugins to break applications into reusable parts is an incredibly powerful and flexible technique that will allow teams to easily manage multiple applications or even complex standalone ones. As you have seen, Grails supports this approach with the in-place plugin mechanism, which allows for rapid development, and plugin dependencies. On top of that, you can easily transition between the two mechanisms by a quick change to the grails-app/conf/BuildConfig.groovy file.

I hope this article inspires some of you to try this technique and benefit from Grails' productivity boost for large applications as well as small.