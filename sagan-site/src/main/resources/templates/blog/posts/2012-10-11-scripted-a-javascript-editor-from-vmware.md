---
title: Scripted: A JavaScript editor from VMware
source: https://spring.io/blog/2012/10/11/scripted-a-javascript-editor-from-vmware
scraped: 2026-02-24T08:15:28.719Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Andy Clement |  October 11, 2012 | 1 Comment
---

# Scripted: A JavaScript editor from VMware

_Engineering | Andy Clement |  October 11, 2012 | 1 Comment_

The first version of the Scripted code editor has been released this week on github: [](https://github.com/scripted-editor/scripted)[https://github.com/scripted-editor/scripted](https://github.com/scripted-editor/scripted).

Although Scripted is a general purpose code editor, the initial focus is building a great JavaScript editing experience. Scripted itself is built entirely in JavaScript and HTML/CSS. It is a browser-based editor that runs locally on a developer's machine with a Node.js instance being used to serve the editor code and perform the editor operations. The only pre-req for running Scripted is that you have a recent version of [Node.js](http://nodejs.org) installed (we are testing with Node 0.8.11 right now). Scripted reuses the editor component from [Eclipse Orion](http://www.eclipse.org/orion/).

Scripted in Action:

![](http://dist.springsource.org/release/SCRIPTED/screenshot2.png)  

## Why create Scripted?

Scripted is the result of some internal prototyping and investigative work exploring different strategies for future tools. The driving factors for exploring this space were really two-fold:

Firstly we are seeing a number of users choosing not to use an IDE but instead to go with a simpler lightweight editor (vim, Sublime, textmate). Developers typically have a set of tools they are very familiar with for common tasks (e.g. command line git) and don't feel the need to learn how to use those tools through some other user interface. These developers want tools that start pretty much instantly and continue to be extremely responsive during operation. At the moment, however, when choosing to give up the IDE they also seem to be giving up those benefits they've gotten used to like great content assist, fast navigation and early error indication. Scripted offers something lightweight and fast, also supporting key IDE facilities developers can't live without - facilities like content assist and understanding of common module systems. Those are the key focus of Scripted.

Secondly we are seeing a rise in the popularity of Cloud IDEs and the notion of Cloud workspaces. Developers connect to some remote system to do their development work and typically these tools (e.g. the [Cloud9 IDE](http://c9.io) and [eXo Cloud IDE](http://cloud-ide.com/)) are offering a browser-based editing experience. The users workspace sits on the remote system. This kind of setup can work well for some teams although in our experience we've found there is still some need for an offline development mode as developers are not yet Internet connected 100% of the time and also it can be hard to get them to give up 'full control' and host their files remotely. In following the browser-based editing model and hosting the server locally Scripted is offering something that can meet developers needs now, but that will also enable the use of cloud workspaces in the future by simply deploying the server remotely.

Fundamentally we felt many of the existing JavaScript tools were lacking in some key areas and, given our background in language tooling, we wanted to see if we could build a lightweight tool to address those needs.  

## A focus on JavaScript

JavaScript continues to increase in popularity. No longer just for client side programming, frameworks like Node.js have enabled it to be used for full end-to-end solutions. This is why we chose to focus on JavaScript as a first priority for Scripted. Of course there are related languages we are also interested in (e.g. CoffeeScript, the recently announced TypeScript) but for now the common denominator is JavaScript. We wanted to build a great experience for one language rather than a not-so-great experience across a number of languages.  

## The feature set

-   Fast startup, lightweight.
-   Syntax highlighting for JavaScript, HTML and CSS.
-   Errors and warnings:
    -   JSLint is integrated to provide error/warning markers on JavaScript code.
    -   AMD and CommonJS module resolution: there is basic resolution where unresolved references will be marked as errors.
-   Content assist:
    -   Basic content assist for HTML, CSS
    -   For JavaScript, content assist is driven by a type inferencing engine which is aware of AMD/CommonJS module dependencies and also uses JSDoc comments to help it understand the code.
-   Hovers: hovering over a JavaScript identifier will bring up the inferred type signature.
-   Navigation: press F8 on an identifier (that the inferencer has recognized) and the editor will navigate to the declaration. This also works on module identifiers (e.g. in define() clauses)
-   Formatting: JSbeautify is integrated
-   Sidepanel: alongside the main editor a sidepanel can be opened - currently this can be used to host a second editor.
-   Key binding to external command: Key bindings in the editor can invoke external commands (less, mvn, etc)

There is much more detail on these features in the [wiki documentation](https://github.com/scripted-editor/scripted/wiki/Features).

## Using Scripted to develop Scripted

Scripted is 100% JavaScript, HTML and CSS. As such it is a perfect codebase on which to use the Scripted editor. For our other tools projects, we don't typically use the tools themselves in our day-to-day work; instead we develop them for use by others. At VMware we are using Scripted to develop Scripted - and nothing gets bugs fixed faster than when the developers themselves are constantly hitting them!

## Getting started with Scripted

The github landing page includes a getting started video: [![](http://dist.springsource.org/release/SCRIPTED/posterScripted2.png)](http://dist.springsource.org/release/SCRIPTED/Scripted2.mov)

But the basic steps are as follows:

1.  Ensure you have node installed
2.  Grab the latest packaged version (0.2.0) from here: [scripted\_v0.2.0.zip](http://dist.springsource.org/release/SCRIPTED/scripted_v0.2.0.zip) 
3.  Unzip it
4.  Ensure the scripts in the bin folder are executable (if on linux/mac) with: chmod 755 bin/\*
5.  Add the bin folder to your path:
    
    Mac/Linux export PATH=<pathToUnzipLocationOrClone>/bin:$PATH
    
    Win:
    
    set PATH=<pathToUnzipLocationOrClone>\\bin;%PATH%  
    
6.  Start using it, launch it like you launch 'vi' with 'scr' or 'scripted'
    
    scr foo.js
    

Scripted will try to infer your project root at startup. It does this by searching for a close .git or .project file in the hierarchy. If you have none it will work in single file mode. To tell Scripted where the root is, you can create a simple (empty) .scripted file at the root. Scripted needs to know the root because, of course, some operations (like content assist, dependency resolution, search) happen in the context of a project.  

## The technology

As previously mentioned the server side technology is Node.js, but it really is a very small amount of server code. Underpinning the inferencing engine is some server side JS we have written for analyzing module dependencies.

On the client side we did not want to reinvent the wheel for the editor technology and so chose to use the editor from [Eclipse Orion](http://www.eclipse.org/orion/). This provides a nice fast editing experience that is very familiar to anyone who has used the editor in 'full eclipse' - it shares many of the same behaviours and key bindings. Where possible the work we have done on features like content assist is being contributed back to the Orion project. Any JavaScript that needs to be parsed is passed through our recoverable derivative of the [Esprima](http://esprima.org/) parser. When a developer is actively editing a file, the code is usually in an unfinished state and so a recoverable parser that can return a decent AST even when there are errors is very important.

## What next?

We are currently at an early stage (version 0.2.0), our future plans include:

-   Even smarter inferencing, leading to better content assist and easier navigation.
-   More panes for the side panel. Currently there is just an editor pane but we intend to include search results panes, documentation, git information panes, perhaps code preview and simulated code execution panes. The intention will be for Scripted to try and automatically manage these where possible, so all the content on screen is kept relevant to the task at hand.
-   Simple plugin system.
-   Debugging. Exploring integration with tools like Chrome Dev Tools and node inspector.

 

We decided to open source early to get feedback. If you want to help us shape the editor, please join in the discussion. There is a [scripted-dev google group](https://groups.google.com/forum/#!forum/scripted-dev) for discussing it and a [jira issuetracker](https://issuetracker.springsource.com/browse/SCRIPTED) for logging bugs, enhancement requests and voting on existing issues to ensure they are prioritized appropriately. If you want to start hacking on the codebase yourself we are definitely open to submissions - see the github page for more information.

Please try it out! [](https://github.com/scripted-editor/scripted)[https://github.com/scripted-editor/scripted](https://github.com/scripted-editor/scripted)