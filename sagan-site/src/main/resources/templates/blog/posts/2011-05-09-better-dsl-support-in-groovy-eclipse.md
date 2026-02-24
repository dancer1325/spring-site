---
title: Better DSL support in Groovy-Eclipse
source: https://spring.io/blog/2011/05/09/better-dsl-support-in-groovy-eclipse
scraped: 2026-02-24T08:41:32.998Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Andrew Eisenberg |  May 09, 2011 | 0 Comments
---

# Better DSL support in Groovy-Eclipse

_Engineering | Andrew Eisenberg |  May 09, 2011 | 0 Comments_

The Groovy language is an excellent platform for creating domain specific languages (DSLs). A good DSL can make programs more concise and expressive as well as make programmers more productive. However, until now these DSLs were not directly supported by Groovy-Eclipse in the editor. When DSLs are used heavily, standard IDE features like content assist, search, hovers, and navigation lose their value. For a while now, it has been possible to write an Eclipse plugin to extend Groovy-Eclipse, but this is a heavy-weight approach that requires specific knowledge of the Eclipse APIs. Now that Groovy-Eclipse supports *DSL descriptors* (DSLDs), supporting custom DSLs in Groovy-Eclipse will become significantly easier.

## A simple example

Consider [this DSL](http://joesgroovyblog.blogspot.com/2007/09/and-miles-to-go-before-i-sleep.html) described by Joachim Baumann. He creates a simple DSL for working with distances. Using this DSL, you can write things like this to calculate the total distance travelled:

```groovy
Copy
3.m + 2.yd + 2.mi - 1.km
```

This is a simple and expressive DSL, but when you type this into a Groovy Editor in Groovy-Eclipse (for conciseness, assume that `$url` is defined elsewhere):

\[caption id="attachment\_8774" align="aligncenter" width="179"\][![Custom DSL not recognized in Groovy-Eclipse](http://blog.springsource.com/wp-content/uploads/2011/05/underlines.png "underlines for unrecognized DSL")](http://blog.springsource.com/wp-content/uploads/2011/05/underlines.png)\[/caption\]

You see underlines and no hovers, meaning that the editor cannot statically resolve the DSL's expressions. Using a DSLD, it is possible *teach* the editor some of the semantics behind these custom DSLs as well as provide documentation for hovers:

\[caption id="attachment\_8775" align="aligncenter" width="683"\][![DSL in editor with documentation and no underlines](http://blog.springsource.com/wp-content/uploads/2011/05/no_underline_with_hover.png "no_underline_with_hover")](http://blog.springsource.com/wp-content/uploads/2011/05/no_underline_with_hover.png)\[/caption\]

To create the DSL descriptor for the distance DSL, you simply need to add a file to your Groovy project with a *.dsld* file extension and the following contents:

```groovy
Copy
currentType( subType( Number ) ).accept {   
   property name:"m", type:"Distance", 
    doc: """A <code>meter</code> from <a href="$url">$url</a>"""
}
```

This script says *whenever the type currently being evaluated in the editor is a subtype of `java.lang.Number`, add the '`m`' property to it whose type is `Distance`*. The `currentType(subType(Number))` piece is called the *pointcut* and the code block with the call to `property` is called a *contribution block*. More on these concept later.

This script snippet above is not the complete DSLD. It only adds the '`m`' property. To complete the implementation, you can take advantage of the full power of Groovy syntax:

```groovy
Copy
currentType( subType( Number ) ).accept {   
    [ m: "meter",  yd: "yard",  cm: "centimerter",  mi: "mile",  km: "kilometer"].each {
      property name:it.key, type:"Distance", 
        doc: """A <code>${it.value}</code> from <a href="$url">$url</a>"""
    }
}
```

This simple example shows that a relatively small script can create some powerful DSL support.

## Anatomy of a DSLD

DSLDs enhance Groovy-Eclipse's [type inferencing engine](http://contraptionsforprogramming.blogspot.com/2009/11/how-type-inferencing-for-groovy-in.html) that runs in the background while editing. DSLDs are evaluated by the IDE and queried by the inferencing engine as necessary.

A DSLD script contains a set of **pointcuts** that are each associated with one or more **contribution blocks**. A pointcut roughly describes *where* type inferencing needs to be enhanced (i.e., which types in which contexts) and a contribution block describes *how* it is enhanced (i.e., which properties and methods should be added).

Many pointcuts are available and they are described in detail with examples in the [DSLD documentation](http://docs.codehaus.org/display/GROOVY/DSL+Descriptors+for+Groovy-Eclipse#DSLDescriptorsforGroovy-Eclipse-Pointcuts). The set of available pointcuts is likely to expand in future versions of DSLD as we start to learn how people will be creating scripts and what kind of operations they require.

Contribution blocks are Groovy code blocks that are associated with a pointcut through the `accept` method. The two main operations you can do inside of a contribution block are `property`, which we have introduced earlier, and `method`, which adds a method to the type being analyzed in the contribution block.

The term *pointcut* is borrowed from [Aspect-Oriented programming](http://www.jroller.com/colyer/entry/the_ted_neward_challenge_aop) (AOP). Actually, DSLD [can be considered](http://docs.codehaus.org/display/GROOVY/DSL+Descriptors+for+Groovy-Eclipse#DSLDescriptorsforGroovy-Eclipse-Moreformally) an AOP language. The major difference between DSLD and typical AOP langauges like [AspectJ](http://eclipse.org/aspectj) is that DSLD operates on the abstract syntax tree of a program being edited, while languages like AspectJ operates on the Java byte code of a compiled program.

## Getting started with DSLDs

There is full DSLD documentation on the [wiki at Codehaus](http://docs.codehaus.org/display/GROOVY/DSL+Descriptors+for+Groovy-Eclipse). Here, I will briefly describe how to get started with DSLDs. To get started:

1.  Install the latest nightly build of Groovy-Eclipse using this update site: `http://dist.codehaus.org/groovy/distributions/greclipse/snapshot/e3.6/`
2.  Inside of a new or existing Groovy-Eclipse project, copy the DSLD Meta script into a source folder of the project. This script provides editing support for DSLD files themselves and is [available here](http://docs.codehaus.org/download/attachments/204275718/DSLD_meta_script.dsld)
3.  Create a new DSLD script using the wizard: File -> New -> Groovy DSL Descriptor: [![DSLD Wizard](http://blog.springsource.com/wp-content/uploads/2011/05/DSLD_wizard.png "DSLD Wizard")](http://blog.springsource.com/wp-content/uploads/2011/05/DSLD_wizard.png)
4.  In the newly created file, uncomment the sample text.

```groovy
Copy
currentType(subType('groovy.lang.GroovyObject')).accept {
     property name : 'newProp', type : String, 
        provider : 'Sample DSL', 
        doc : 'This is a sample.  You should see this in content assist for all GroovyObjects:<pre>newProp</pre>'
}
```

Inside the DSLD you should see content assist and hovers specific to DSLDs (this comes from the meta-DSLD script added in step 2). It will look something like this: [![Contents of DSLD file with hover](http://blog.springsource.com/wp-content/uploads/2011/05/in_dsld_file.png "In DSLD file")](http://blog.springsource.com/wp-content/uploads/2011/05/in_dsld_file.png)

-   Now, you can create a new Groovy script and play around with the DSLD you just created. You can type:
    
    ```groovy
    Copy
    this.newProp
    ```
    
    You should see that `newProp` is properly highlighted and that hovering will show the documentation from the DSLD, and it should look something like this: [![Using the sample DSLD in a file](http://blog.springsource.com/wp-content/uploads/2011/05/sample.png "sample")](http://blog.springsource.com/wp-content/uploads/2011/05/sample.png)
-   You can make changes to the DSLD. After saving the changes will immediately be picked up in all your Groovy scripts and files.
-   Congratulations! You have now implemented your first DSLD.

You can view and manage all of the DSLDs in your workspace from the Groovy -> DSLD preference page: [![DSLD Preference page](http://blog.springsource.com/wp-content/uploads/2011/05/preferences_page.png "DSLD Preference page")](http://blog.springsource.com/wp-content/uploads/2011/05/preferences_page.png)

From here, you can enable/disable individual scripts as well as choose which scripts to edit.

**Important:** since finding and fixing errors when implementing DSLDs can be a bit cryptic, it is strongly recommended that you do the following:

-   Open the Eclipse error log
-   Open the [Groovy Event Console](http://groovy.codehaus.org/Groovy-Eclipse+2.1.1+New+and+Noteworthy#Groovy-Eclipse2.1.1NewandNoteworthy-GroovyEventConsole)

Compile and runtime problems with your script will be shown in one of these two places.

## A DSLD for the Grails constraint language

For a larger example, let's look at the Grails framework. The [Grails constraint DSL](http://grails.org/doc/latest/ref/Constraints/Usage.html) provides a declarative way to validate Grails domain classes. It is clear and succinct, but without direct editing support for this DSL, Grails programmers rely on external documentation and may not be aware of syntax errors until runtime. We can create a DSLD to solve this problem

```groovy
Copy
// only available in STS 2.7.0 and above
supportsVersion(grailsTooling:"2.7.0")

// a generic grails artifact is a class that is in a grails project, is not a script and is in one of the 'grails-app' folders
def grailsArtifact = { String folder -> 
	sourceFolderOfCurrentType("grails-app/" + folder) & 
	nature("com.springsource.sts.grails.core.nature") & (~isScript())
}
 
// define the various kinds of grails artifacts
def domainClass = grailsArtifact("domain")
// we only require domainClass, but we can also reference other kinds of artifacts here
def controllerClass = grailsArtifact("controllers")
def serviceClass = grailsArtifact("services")
def taglibClass = grailsArtifact("taglib")

 
// constraints
// The constraints DSL is only applicable inside of the static "constraints" field declaration
inClosure() & (domainClass & enclosingField(name("constraints") & isStatic()) & 
		(bind(props : properties()) & // 'bind' props to the collection of properties in the domain class
		currentTypeIsEnclosingType())).accept {

	provider = "Grails Constraints DSL"  // this value will appear in content assist

	// for each non-static property, there are numerous constraints "methods" that are available
	// define them all here
	for (prop in props) {
		if (prop.isStatic()) {
			continue
		}
		if (prop.type == ClassHelper.STRING_TYPE) {
			method isStatic: true, name: prop.name, params: [blank:Boolean], useNamedArgs:true
			method isStatic: true, name: prop.name, params: [creditCard:Boolean], useNamedArgs:true
			method isStatic: true, name: prop.name, params: [email:Boolean], useNamedArgs:true
			method isStatic: true, name: prop.name, params: [url:Boolean], useNamedArgs:true
			method isStatic: true, name: prop.name, params: [matches:String], useNamedArgs:true
		} else if (prop.type.name == Date.name) {
			method isStatic: true, name: prop.name, params: [max:Date], useNamedArgs:true
			method isStatic: true, name: prop.name, params: [min:Date], useNamedArgs:true
		} else if (ClassHelper.isNumberType(prop.type)) {
			method isStatic: true, name: prop.name, params: [max:Number], useNamedArgs:true
			method isStatic: true, name: prop.name, params: [min:Number], useNamedArgs:true
			method isStatic: true, name: prop.name, params: [scale:Number], useNamedArgs:true
		} else if (prop.type.implementsInterface(ClassHelper.LIST_TYPE)) {
			method isStatic: true, name: prop.name, params: [maxSize:Number], useNamedArgs:true
			method isStatic: true, name: prop.name, params: [minSize:Number], useNamedArgs:true
		}
		method isStatic: true, name: prop.name, params: [unique:Boolean], useNamedArgs:true
		method isStatic: true, name: prop.name, params: [size:Integer], useNamedArgs:true
		method isStatic: true, name: prop.name, params: [notEqual:Object], useNamedArgs:true
		method isStatic: true, name: prop.name, params: [nullable:Boolean], useNamedArgs:true
		method isStatic: true, name: prop.name, params: [range:Range], useNamedArgs:true
		method isStatic: true, name: prop.name, params: [inList:List], useNamedArgs:true
	}
}
```

If you copy the DSLD script above and add it to a DSLD file in your Grails project, the constraints language will be taught to STS. For example, in the following simple domain class, you get this for content assist inside of the constraints block: [![Using the constraints DSL](http://blog.springsource.com/wp-content/uploads/2011/05/constraints.png "Using the constraints DSL")](http://blog.springsource.com/wp-content/uploads/2011/05/constraints.png)

The above script can be tweaked to add custom documentation.

## I use Groovy, but I don't create my own DSLs. Why should I care about DSLDs?

Even though the majority of Groovy and Grails users do not implement their own DSLs, they consume DSLs (in [Grails](http://grails.org), [Gaelyk](http://groovy.codehaus.org/Gaelyk), through [builders](http://groovy.codehaus.org/Builders), etc.). So, even though most STS users won't be creating their own DSLDs, they will be benefiting from DSLDs created by others. We will be working hard with library and DSL developers in order to create common DSLDs for different pieces of the Groovy ecosystem.

You can expect to see a significant increase in support for the popular Groovy-based frameworks in upcoming versions of Groovy-Eclipse.

## The current state of DSLD

The core implementation of the DSLD language is now available for use, but we will be tweaking it as we learn more about what users require and the kinds of DSLs that they want to support. We will be implementing more pointcuts, expanding on the documentation, and working to ship some standard DSLDs with Groovy-Eclipse itself.

Please try out some of the DSLDs introduced here or on the [wiki](http://docs.codehaus.org/display/GROOVY/DSL+Descriptors+for+Groovy-Eclipse) and give us feedback on this blog post, at our [issue tracker](http://jira.codehaus.org/browse/GRECLIPSE), or on the [Groovy-Eclipse mailing list](http://xircles.codehaus.org/lists/eclipse-plugin-user@groovy.codehaus.org).