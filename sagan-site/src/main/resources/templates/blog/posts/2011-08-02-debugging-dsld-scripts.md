---
title: Debugging DSLD Scripts
source: https://spring.io/blog/2011/08/02/debugging-dsld-scripts
scraped: 2026-02-24T08:37:25.715Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Andrew Eisenberg |  August 02, 2011 | 0 Comments
---

# Debugging DSLD Scripts

_Engineering | Andrew Eisenberg |  August 02, 2011 | 0 Comments_

Not too long ago, I introduced [DSL descriptors](http://blog.springsource.com/2011/05/08/better-dsl-support-in-groovy-eclipse/) (DSLDs) for [Groovy-Eclipse](http://groovy.codehaus.org/Eclipse+Plugin). DSLDs are Groovy scripts that provide rich editing support (content assist, navigation, etc.) for Groovy projects in your Eclipse workspace. Since DSLDs can only be executed inside a running Eclipse process, debugging is not as simple as firing up the Eclipse debugger and stepping through a Groovy script. In this post, I'll describe some simple and some more complex techniques that you can use for debugging your DSLDs.

To get all of this working, you will need the latest development builds:

-   Groovy-Eclipse: [http://dist.codehaus.org/groovy/distributions/greclipse/snapshot/e3.7/](http://dist.codehaus.org/groovy/distributions/greclipse/snapshot/e3.7/)
-   STS Grails Tooling (optional, for debug evaluations): [http://dist.springsource.com/snapshot/TOOLS/nightly/e3.7](http://dist.springsource.com/snapshot/TOOLS/nightly/e3.7)
-   AJDT (optional, for debug evaluations): [http://download.eclipse.org/tools/ajdt/37/update](http://download.eclipse.org/tools/ajdt/37/update)

### Simple and crude

The simplest and crudest way to debug your DSLDs is by using `println`. This will print expressions to the standard out of the running Eclipse process, which can be seen if you launched your Eclipse from the command line. However, I recommend using a `log` statement instead. This will print logging information to the [Groovy event console](http://docs.codehaus.org/display/GROOVY/Groovy-Eclipse+2.1.1+New+and+Noteworthy#Groovy-Eclipse2.1.1NewandNoteworthy-GroovyEventConsole).

As you can see in the example below, every time the pointcut in `MethodParams.dsld` matches, the current value of `vals` will be printed to the Groovy event console.

[![](http://blog.springsource.com/wp-content/uploads/2011/07/log.png "log")](http://blog.springsource.com/wp-content/uploads/2011/07/log.png)

The `log` method may be used anywhere in a DSLD script. All log entries in the event console are prefixed with "======". The Groovy event console will also display your script's compilation errors and exceptions thrown, so it is quite useful even if the DSLD script does not contain any `log` statements.

When not using the event console, it is better to keep it closed, since the trace can get large quickly and wind up consuming significant memory and processing power.

### Fancy

Print and log statements only have limited use. It is possible to get proper debug support for your DSLDs with the ability to set breakpoints, step through code, and perform debug evaluations. Even though the set-up is a bit involved, this may be worthwhile when debugging complex scripts. Essentially, you need to launch a new instance of Eclipse (a runtime workbench) in your Eclipse debugger and debug your script through there. [There](http://www.eclipse.org/articles/Article-PDE-does-plugins/PDE-intro.html) [is](http://cvalcarcel.wordpress.com/2009/10/11/writing-an-eclipse-plug-in-part-5-adding-icons-and-a-new-project-structure/) [a](http://learning.infocollections.com/ebook%202/Computer/Programming/Java/Eclipse.Modeling.Framework/0131425420_ch04lev1sec4.html) [lot](http://www.tutorial-omondo.com/omondoProfile/runtheworkbench/index.html) [of](http://help.eclipse.org/helios/index.jsp?topic=/org.eclipse.platform.doc.isv/guide/firstplugin_run.htm) [information](http://onjava.com/pub/a/onjava/2005/02/09/eclipse.html?page=2) [available](http://tinyurl.com/3bkksy2) about creating and using Eclipse runtime workbenches, but most of that is not necessary for DSLD debugging.

Here are the required steps:

1.  Install Groovy-Eclipse source code (optional, but useful for digging deeper into how DSLDs are executed). You can do this from your Eclipse's install manager. Choose the Groovy-Eclipse SDK. See [here for more details](http://docs.codehaus.org/display/GROOVY/Install+Groovy-Eclipse+Plugin).
2.  Create and launch a new and empty Eclipse workspace, You can do this by launching Eclipse from the command line and specify a -data parameter of the location of the new workspace. This workspace is the host that will launch the second workspace where your DSLD actually lives.
3.  Create new groovy project in your new workspace, initially empty
4.  Launch the runtime workbench. First open the launch configuration dialog: [![](http://blog.springsource.com/wp-content/uploads/2011/07/open_launch_config_dialog.png "open_launch_config_dialog")](http://blog.springsource.com/wp-content/uploads/2011/07/open_launch_config_dialog.png) Then create a new launch configuration by double-clicking on *Eclipse application*. In the *Workspace Location* section, choose the filesystem directory of the workspace containing your DSLD: [![](http://blog.springsource.com/wp-content/uploads/2011/07/launch_workspace1.png "launch_workspace")](http://blog.springsource.com/wp-content/uploads/2011/07/launch_workspace1.png)
5.  After the runtime workbench starts, drag and drop the DSLD to debug from the runtime workspace into the newly created project in the host workspace. When you do that, you will see a dialog like this: [![](http://blog.springsource.com/wp-content/uploads/2011/07/copy_link.png "copy_link")](http://blog.springsource.com/wp-content/uploads/2011/07/copy_link.png) Make sure to choose *link*. A linked file will ensure that changes made in one workspace will be reflected in the other. I recommend dragging and dropping (instead of other ways of importing the file into your workspace) because it is the easiest way to ensure that your file is linked instead of copied.
6.  Set a breakpoint somewhere in the DSLD in the host workspace.
7.  Do something that exercises your script in the runtime workbench. Perhaps hover over an interesting identifier in a Groovy file that the DSLD is applied to.
8.  Eclipse will stop at the breakpoint
9.  The first time that Eclipse stops at the breakpoint, the source code will not appear:  
    [![](http://blog.springsource.com/wp-content/uploads/2011/07/no_source_code.png "no_source_code")](http://blog.springsource.com/wp-content/uploads/2011/07/no_source_code.png) You must explicitly add the newly created Groovy project to the source lookup path of the Eclipse runtime launch configuration. And once you do, the source code will be available.
10.  Rejoice! You should now be able to use the debugger for your DSLDs.

The variables view will work: [![](http://blog.springsource.com/wp-content/uploads/2011/07/variables_view.png "variables_view")](http://blog.springsource.com/wp-content/uploads/2011/07/variables_view.png)

And if you have [STS](http://www.springsource.com/landing/best-development-tool-enterprise-java), you can perform evaluations in the expressions view: [![](http://blog.springsource.com/wp-content/uploads/2011/07/expressions_view.png "expressions_view")](http://blog.springsource.com/wp-content/uploads/2011/07/expressions_view.png)

in the display view: [![](http://blog.springsource.com/wp-content/uploads/2011/07/display_view.png "display_view")](http://blog.springsource.com/wp-content/uploads/2011/07/display_view.png)

And in the editor, select an expression and do CTRL-Shift-I, or CMD-Shift-I (in this case `names`):

[![](http://blog.springsource.com/wp-content/uploads/2011/07/eval_in_editor.png "eval_in_editor")](http://blog.springsource.com/wp-content/uploads/2011/07/eval_in_editor.png)

Note that closures are not allowed in evaluations and Groovy debug evaluations must be explicitly enabled in the Groovy -> Debugger -> Extended Debugging Support page:

[![](http://blog.springsource.com/wp-content/uploads/2011/07/debug_preferences.png "debug_preferences")](http://blog.springsource.com/wp-content/uploads/2011/07/debug_preferences.png)

Using this method to debug your DSLD scripts will help you create larger scripts to support more sophisticated Groovy DSLs.