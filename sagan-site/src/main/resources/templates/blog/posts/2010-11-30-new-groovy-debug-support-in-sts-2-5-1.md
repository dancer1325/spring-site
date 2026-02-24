---
title: New Groovy Debug Support in STS 2.5.1
source: https://spring.io/blog/2010/11/30/new-groovy-debug-support-in-sts-2-5-1
scraped: 2026-02-24T08:50:29.275Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Andrew Eisenberg |  November 30, 2010 | 0 Comments
---

# New Groovy Debug Support in STS 2.5.1

_Engineering | Andrew Eisenberg |  November 30, 2010 | 0 Comments_

We have included some big improvements to Groovy Debugging in the recent release of the SpringSource Tool Suite 2.5.1. It has always been possible to debug your Groovy applications using Eclipse's vanilla debug support for Java, but due to Groovy's language differences from Java and its [metaprogramming](http://groovy.codehaus.org/Dynamic+Groovy), many debug features have not been working as well as they could.

All of the screenshots in this post were taken from a simple [Grails](http://grails.org) app and so the debug features here are implicitly making use of dynamically added Groovy methods and properties.

### Step Into

With the enhanced Groovy debug support, the step into command works exactly as you would expect. In the past, due to Groovy's extensive use of reflection and cached call sites, uninteresting stack frames would sometimes be stepped into and interesting ones might be stepped over, making debugging a sometimes unpleasant experience.

Now, it is possible to step into Groovy methods and closures, ignoring all uninteresting Groovy runtime and framework calls:

[![](http://blog.springsource.com/wp-content/uploads/2010/11/Slide11.png "Stepping")](http://blog.springsource.com/wp-content/uploads/2010/11/Slide11.png)

This support can be disabled from the Groovy -> Debugger -> Extended Debug Support preference page:

[![](http://blog.springsource.com/wp-content/uploads/2010/11/preferences_step.png "Step preferences")](http://blog.springsource.com/wp-content/uploads/2010/11/preferences_step.png)

### Evaluation of Groovy code while debugging

When the debugger is stopped on a Groovy stack frame, the display view and expressions view now recognize Groovy syntax with full access to Groovy's dynamically added methods and properties.

In the display view:

[![](http://blog.springsource.com/wp-content/uploads/2010/11/evalInDisplayView.png "Eval in Display View")](http://blog.springsource.com/wp-content/uploads/2010/11/evalInDisplayView.png)

In the expressions view:

[![](http://blog.springsource.com/wp-content/uploads/2010/11/expressions1.png "Expressions View")](http://blog.springsource.com/wp-content/uploads/2010/11/expressions1.png)

And, even in the editor (by selecting a code snipped and using the CTRL-Shift-I keyboard shortcut):

[![](http://blog.springsource.com/wp-content/uploads/2010/11/evalInEditor.png "Eval In Editor")](http://blog.springsource.com/wp-content/uploads/2010/11/evalInEditor.png)

If you need to disable this support, you can also do so from the Groovy -> Debugger -> Extended Debug Support preference page:

[![](http://blog.springsource.com/wp-content/uploads/2010/11/preferences_eval.png "preferences_eval")](http://blog.springsource.com/wp-content/uploads/2010/11/preferences_eval.png)

### Nearly everything

Anything that you can do in your debugged application should be possible from the display view, well nearly everything except for defining new classes, methods, properties, and closures. Groovy is a large language and constantly evolving. There may be other language features that are not yet supported, but the basics, including variable definitions, loops, conditionals, and gstring list and map literals are all available in an evaluation.

For example, it is possible to add new instances of a Grails domain class:

[![](http://blog.springsource.com/wp-content/uploads/2010/11/eval1.png "eval1")](http://blog.springsource.com/wp-content/uploads/2010/11/eval1.png)

And loop through a collection:

[![](http://blog.springsource.com/wp-content/uploads/2010/11/evalInDisplay2.png "Eval in Display 2")](http://blog.springsource.com/wp-content/uploads/2010/11/evalInDisplay2.png)

### Perhaps the strangest use of the Groovy MOP (a brief note on implementation)

The Groovy [Metaobject Protocol](http://en.wikipedia.org/wiki/Metaobject_protocol) or MOP provides a structured way to change the semantics of Groovy, by giving end-users control over method invocations and property accesses. The core of the new Groovy debug support relies on the Groovy MOP for code evaluation. Here's how it works:

-   Before each evaluation, the selected Groovy code is compiled into a script in the running instance of STS (not the debugged application).
-   The metaclasses of this script and all classes referenced in the script are changed to a [Java Debug Interface](http://download.oracle.com/javase/1.5.0/docs/guide/jpda/jdi/) (JDI) metaclass. JDI defines a protocol for using a debugger to communicate with a debugged application through a socket.
-   Through the JDI, these meta-classes usurp all method calls, property accesses, and constructor invocations so that the effects occur on the debugged JVM, rather than locally. You can think of the compiled script as a mock that delegates all actions to the debugged application.

This gives us nearly complete control over the debugged application from the running instance of STS. We were surprised and impressed that the Groovy MOP is powerful enough to be used to execute a Groovy script on a remote application.

If you have a comment, feature request, or something is not working for you, then please [raise a jira issue](https://issuetracker.springsource.com/browse/STS) for it or mention it on the [SpringSource Tool Suite forum](http://forum.springsource.org/forumdisplay.php?f=32).