---
title: A Groovier Eclipse experience
source: https://spring.io/blog/2009/07/30/a-groovier-eclipse-experience
scraped: 2026-02-24T09:05:16.949Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Andy Clement |  July 30, 2009 | 0 Comments
---

# A Groovier Eclipse experience

_Engineering | Andy Clement |  July 30, 2009 | 0 Comments_

Update: 15-Aug-09: Comments are now closed.  If you want help installing or to give feedback or ask questions, please join the [mailing list](http://xircles.codehaus.org/manage_email/eclipse-plugin-user@groovy.codehaus.org) ( [archive](http://archive.codehaus.org/lists/org.codehaus.groovy.eclipse-plugin-user/browse) )

---

For the last couple of months SpringSource has been actively involved in developing the next version of the Eclipse Groovy Tools.  The initial goal has been to evolve them from where they are into a highly optimized environment for the key developer tasks of code development, building and testing. Ideally the experience when working with mixed Groovy/Java projects should feel as good as it does for pure Java projects in Eclipse.

This week the first version of the code has been committed into the codehaus repository and shortly milestone 1 will be released.  An update site (for Eclipse 3.4.2) is available that contains the current development build: [](http://dist.codehaus.org/groovy/distributions/greclipse/snapshot/e3.4 "http://dist.codehaus.org/groovy/distributions/greclipse/snapshot/e3.4")[http://dist.codehaus.org/groovy/distributions/greclipse/snapshot/e3.4](http://dist.codehaus.org/groovy/distributions/greclipse/snapshot/e3.4) .  Yes, currently there is no Eclipse 3.5 build of this code yet, but there will be very soon.  (Update! 31-Jul-09 Eclipse 3.5 update site now available at: [](http://dist.codehaus.org/groovy/distributions/greclipse/snapshot/e3.5)[http://dist.codehaus.org/groovy/distributions/greclipse/snapshot/e3.5](http://dist.codehaus.org/groovy/distributions/greclipse/snapshot/e3.5) )

In this article I'll briefly look at how to get started with the new plugin, but then focus on the new technology that underpins it going forward and what this enables.

### Getting started

Installing from the update site is done in the same way as for other Eclipse features.  Under Eclipse 3.4.2, navigate to **Help** > **Software Updates**.  On the **Available Software** tab, click **Add Site** and enter the update site URL: [http://dist.codehaus.org/groovy/distributions/greclipse/snapshot/e3.4](http://dist.codehaus.org/groovy/distributions/greclipse/snapshot/e3.4 "http://dist.codehaus.org/groovy/distributions/greclipse/snapshot/e3.4").  Click **OK**.  Now the update site will be on the list, open it and mark the entry 'Groovy-Eclipse plugin'.  Finally, in the top right, click **Install** and follow the dialogs to complete installation.  Once installed there are three ways to get your groove on:

1.  Create a new Groovy project.  Just like you can create a Java project, there is a Groovy project creation wizard.  All Groovy projects actually support a mix of .java and .groovy files.
2.  Modify an existing Java project so that you can include groovy code.  Select your Java project in the package explorer, right click and navigate down the context menu to **Groovy** then **Add Groovy Nature**.  Once complete, the icon for your project will change and from then on any .groovy files in that project will be built, in addition to .java files.
3.  Migrate an existing Groovy project.  If you have Groovy projects created with the older version of the plugin, they must be migrated to the new version.  To migrate a project, select the projects you wish to migrate then right click and navigate to **Groovy**, then **Convert legacy groovy projects**.  This option only appears if the selected projects need migrating.

That's it! Just start creating Groovy types and working with them like you would with Java.  The FAQ [http://groovy.codehaus.org/Eclipse+Plugin+V2+FAQ](http://groovy.codehaus.org/Eclipse+Plugin+V2+FAQ) attempts to answer what we believe will be common questions around this alpha release, and includes links for where to raise issues for any problems you encounter or further questions you want to ask.

### Existing plugin compilation strategy

Before describing the new compiler technology this version uses, it is worth briefly covering what the existing release uses.  The currently released version of the Groovy Eclipse plugin exploits the existing groovy compiler 'joint compilation' support. Joint compilation enables a mixed java/groovy codebase to be built where there are references between the java and groovy types.  Essentially it works as follows:

-   let the groovy compiler (groovyc) parse the .groovy files
-   create stubs on disk that are java-like representations of those groovy files.
-   call javac to build the .java files which are able to see the groovy files through the stubs.
-   finish off processing of the groovy files - which can now resolve references against the .class files for the java types

And the user is left with all their sources built into binary .class files.

### Simplifying the project build strategy

I know some users, myself included, had trouble setting up projects to build with the version of the eclipse plugin that uses joint compilation - the dual builder setup it uses can be tricky to configure correctly.  As we embarked on designing the next version of the tools, I wondered if there was a more optimal approach where there could just be one builder in charge and it knew who to call to deal with Java or Groovy files. Having a single builder would remove any complexities around configuring the project to build.

My initial thought was that the Eclipse Compiler should be left in charge of building the code, but it should involve groovyc when necessary to process any groovy code.   Due to my background in compilers (working on AspectJ), I already knew the Eclipse Java compiler quite well.  Then after discussing the structure of the groovyc compiler with Jochen Theodorou (groovy tech lead) it looked like a tighter integration could be achieved between the Eclipse compiler and groovyc, avoiding the use of stubs.  In normal joint compilation the stubs on disk are essentially a way for groovyc to tell javac what is doing, and similarly the .class files produced by javac are a way for javac to tell groovyc what it just did.   Optimizing communication between the compilers would simply mean them talking directly rather than via files on disk (stub .java files or .class files).   However, any change in how the compilers communicated must not affect the most important facility provided by the existing joint compilation strategy - the complete freedom it allows for referencing between types defined in the two languages.   As an example, consider these three types defined in a single project:

![hierarchy](http://blog.springsource.com/wp-content/uploads/2009/07/hierarchy.png "hierarchy")

There is no right answer for 'what should get fully compiled first?'  If the Groovy code is all compiled first it will fail to find the Apple Java type.  If the Java code is compiled first it will fail to find the Fruit Groovy type.  Clearly when joining the Eclipse compiler and groovyc together, they need to be aware of each other throughout the compilation process and able to ask each other questions (most importantly: can you resolve this type?).  To support this approach there would likely need to be changes on both sides, to the Eclipse Compiler and to groovyc, but care would be taken to minimize these changes and hopefully the changes would be contributed back to the two compiler projects.

Alongside the 'simple task' of gluing two compilers together, there were also some additional requirements for the new version:

-   enable the incremental compilation behaviour that Eclipse provides for Java to work for Groovy code.
-   under no circumstances can there be a change in how the Eclipse compiler builds pure Java projects.  It must be as fast and reliable as ever.
-   try and avoid any introduction of groovy-specific dependencies into the Eclipse Compiler.  Instead use an abstraction and extend Eclipse to support 'some other language', which in this first instance would be groovy.

Achieving the latter goal would leave us in a good position for contributing the Eclipse compiler changes back to Eclipse.

### Not just about performance

Of course, optimizing how the compilers communicate should improve performance, and getting incremental compilation to work for Groovy would be great, but there was another very good reason to move to this new single builder strategy with the Eclipse Compiler in charge. If Eclipse can be made to better understand groovy then some features of Eclipse will just 'work'.  A good example of this is the JUnit support.  In order to run a testcase in Eclipse you typically use the context menus **RunAs > JUnit** or shortcut **Alt+Shift+X, T**.  With the current version of the groovy plugin that won't work, Eclipse doesn't know what it is looking at in the editor.  In the new world the integration layer between the compilers enables Eclipse to understand the shape of what is in that groovy file - it can see the test class, it can see any **@Test** annotation, it can even see any **@RunWith** annotation to select a test runner.  And so JUnit launching just works.  This is just one example of what could spring to life with zero effort.  It is important to understand here that the Eclipse compiler is not being modified to directly process groovy code, it is always delegating to the groovy compiler to deal with groovy code, but the integration layer between the compilers enables eclipse to understand the results of that groovyc invocation.

### The internal structure

What made the integration layer feasible in a short amount of time was the existing flexible structure of the two compilers.  The various stages of compilation are clearly visible and accessible in the Eclipse Compiler and perhaps even clearer in groovyc (where they are called phases).  Integrating the compilers together is basically defining a flow that coordinates and controls progression of each compiler through the various stages/phases.  Although there are many stages in real compilation, it is easy to consider it just as a three stage process in order to understand the new design: parse/resolve/generate.

In the **parse** stage the input data is processed from the pure text form into some internal data structure - nothing is inferred about that structure.

In the **resolve** stage the actual entities referred to by names in the structure are chased down.  For example, if 'Foo' is used in the source, it must be determined which Foo the user meant - and that is done using the appropriate resolution rules: What are my imports? What is in this package? What is on the classpath? and in the groovy case, extra rules like: What are my aliased imports?

In the **generate** stage the actual .class file is created.

The diagram below shows the architecture of the new builder when it is called to compile a project.  All the sources (both .java and .groovy) are passed to the Eclipse compiler.  Depending on the file extension either the Eclipse Compiler parses the file itself or groovyc is asked to parse the file.  Once that is complete, resolution runs across all the types (Groovy and Java types) that were discovered.  The resolution strategy in both compilers is tweaked so that they can see each other's types.  Finally post resolution, the generate stage runs to create the .class files.

\[caption id="attachment\_2593" align="aligncenter" width="624" caption="Structure of the new compilation system"\]![Structure of the new compilation system](http://blog.springsource.com/wp-content/uploads/2009/07/compilerstructure.png "compilerstructure")\[/caption\]

Normally after generating the .class files, the groovy compilation process would immediately write the files to disk, but instead in the new design they are returned to the Eclipse compiler.  This final step is what enables incremental compilation to work.  Eclipse analyzes the groovyc produced class files just like the class files it is creating itself.  The information about references between classes is preserved in exactly the same structure as used for regular Java types - and that is what gives us incremental compilation support for Groovy 'for free'.  Since this reference information is preserved in the same way as for Java types, it is automatically persisted for each project across eclipse restarts and other dependent projects can utilise it.  These latter two features are still an issue for AspectJ because in AspectJ a different approach to Eclipse compiler modification was taken.

### Incremental compilation

This really deserves a whole blog post to itself, but it is worth describing the basics here.  Post-compilation the Eclipse compiler records the references amongst all types it processes.  Incremental compilation is nothing more than consulting the list of references after something has been built, to see who is affected by the change.  If no-one is affected then compilation ends.  If some types did depend on what was just built, they are then compiled.  The mechanism described here will even provide incremental compilation for a pure Groovy project.

### Unexpected bonus?

Something that became apparent pretty early on is that because Eclipse can now see the Java-like structure of groovy types, it checks that structure.  Some checks are invalid for Groovy code since Groovy is more flexible in what it allows, but some are useful.  Consider the endless amount of (configurable) generics-related warnings that the Eclipse compiler will report if code isn't quite correct in its exploitation of generics.  This screenshot shows the Eclipse compiler actually checking the groovy code.

\[caption id="attachment\_2594" align="aligncenter" width="708" caption="Generics warnings for groovy code"\]![Generics warnings for groovy code](http://blog.springsource.com/wp-content/uploads/2009/07/screenshotone.png "screenshotone")\[/caption\]

The value of these checks is still open to debate, but for now they have been left active.

### The UI

Everything I've talked about so far is the underlying compilation strategy.  In the Eclipse UI it only surfaces as the 'builder' used to compile mixed Java/Groovy projects.  On top of this Andrew Eisenberg (also at the Vancouver SpringSource lab with me) has been doing great things bringing the UI to life:

-   bringing across (and evolving) components of the existing plugin that are still needed in the new world, rebasing them on the new compilation infrastructure.
-   developing/enhancing those features that users rely on in the IDE: the editor, outline view, code assist, navigation, debugging, etc.

The end result is that the Eclipse UI when working with Groovy looks and behaves just like it does when working with Java.  Here is the PublisherSubscriberSpecification example from the Spock test framework ( [http://code.google.com/p/spock/](http://code.google.com/p/spock/) ).  It can be executed directly as a JUnit test.

\[caption id="attachment\_2595" align="aligncenter" width="1088" caption="Executing a Spock example"\]![Executing a Spock example](http://blog.springsource.com/wp-content/uploads/2009/07/screenshottwo.png "screenshottwo")\[/caption\]

Yes, for those 'in the know', that shot does indicate that groovy AST transformations are supported by this new builder, since that is how Spock is implemented.

### Outside of the IDE

I know many people utilise the Eclipse compiler as the Java compiler in their build systems.  This gives them added confidence in what the build system is doing because it is the same compiler that they are using in their IDE.  There is nothing to stop the integrated Eclipse/Groovy compiler described in this article from being used in a similar way, either directly on the command line or through Ant.  With the final release we'll be producing documentation on how to do this.

### The alpha release

The result of all the work so far is now available for download.  The download includes a patch for the Eclipse JDT compiler to expose appropriate extension points, a slightly modified Groovy 1.7 build, the integration code to join them together and finally the other plugins that provide the UI on top.

How well is it working?  This is a pre-milestone 1 release so please understand it isn't production-ready!  There are so many possible ways to define interactions between Groovy and Java types and although many have been tested, it may be the first thing you try that breaks it !  We urge you to help us by reporting any issues so we can improve the quality as we head for a first release.  The FAQ at [](http://groovy.codehaus.org/Eclipse+Plugin+V2+FAQ)[http://groovy.codehaus.org/Eclipse+Plugin+V2+FAQ](http://groovy.codehaus.org/Eclipse+Plugin+V2+FAQ) provides more information, including the links for asking questions and raising issues.  The only download available right now is for Eclipse 3.4.2.  Eclipse 3.5 support will follow shortly.  The recent focus has been on the compilation and incremental compilation story.  We know that some parts of the UI are still a little sluggish (for example code assist) and will be actively working on speeding those up, the FAQ discusses why this is the case.

### The Future

The first release of the Eclipse Plugin using this new compiler technology is intended to be the smallest consistent feature set that makes sense and provides value to the user, hence the theme of providing an optimized edit/save/compile/test experience.  We feel this first release can be out within a couple of months.  After the imminent first milestone release we will actively be providing more frequent development builds as we head for M2 and final.  There may even be some Grails related features in the mix.