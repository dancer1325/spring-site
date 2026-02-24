---
title: Dependency analysis in Scripted
source: https://spring.io/blog/2012/11/20/dependency-analysis-in-scripted
scraped: 2026-02-24T08:13:10.487Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Kris De Volder |  November 20, 2012 | 0 Comments
---

# Dependency analysis in Scripted

_Engineering | Kris De Volder |  November 20, 2012 | 0 Comments_

Scripted, a JavaScript editor from VMWare was [announced on this blog](http://blog.springsource.org/2012/10/11/scripted-a-javascript-editor-from-vmware/) last month. In this article we'll take a look under the hood at Scripted's *Dependency Analysis Engine*. But before diving into the details, lets motivate why we need it.

## Main Motivation: Cross-file Content Assist

To provide a great JavaScript editing experience, Scripted needs to provide *accurate* suggestions about the functions, methods or identifiers you can use in your current editor context.

\[caption id="attachment\_12178" align="aligncenter" width="533" caption="Cross-file Content Assist"\][![](http://blog.springsource.org/wp-content/uploads/2015/11/xfile-content-assist1.png "xfile-content-assist")](http://blog.springsource.org/wp-content/uploads/2015/11/xfile-content-assist1.png)\[/caption\]

Two components work together to achieve this goal:

-   a fine-grained type inference analysis engine
-   a coarse-grained dependency analysis engine

The inference engine parses your code and walks every declaration, statement and expression. This allows it to determine what identifiers are valid in a given context, and make good guesses about the kinds of things that may be stored in these variables. This information is then used to make content assist suggestions.

If you wanted to simply put all your code into one big file, then a good quality inferencer alone would be sufficient to provide some pretty good content assist. In reality, projects will be divided into modules. In the example above, the 'main' module imports a 'utils' module. While you edit the main module, Scripted proposes functions from 'utils' as appropriate. The dependency analysis engine is what makes this possible.

## Other Uses of Dependency Analysis

Scripted also uses dependency analysis to flag unresolved dependencies as errors. For example, if we try to import a 'bogus' module Scripted will show an **error marker**.

\[caption id="attachment\_12180" align="aligncenter" width="518" caption="Error Marker for an Unresolved Module"\][![](http://blog.springsource.org/wp-content/uploads/2015/11/unresolved-error1.png "unresolved-error")](http://blog.springsource.org/wp-content/uploads/2015/11/unresolved-error1.png)\[/caption\]

Scripted also uses dependency analysis to support easy navigation. A shift or ctrl click on a resolved dependency name will take you to the corresponding file.

In the future, dependency analysis might also allow us to implement refactoring tools. For example, if you drag-and-drop a .js file to a different directory, Scripted could automatically update relative path references as needed.

## What does it do?

The dependency analysis engine provides just a single *getDGraph* function to its client, the type inference engine:

getDGraph :: <path-to-js-file> -> <dependency-graph>

This function computes a JSON representation of the dependency graph. This graph contains a node for all files that the target file directly or transitively depends on. If we pass it our 'main' module, it will return something like the following:

getDGraph('/sample/main.js') ==>
{
  ...
  "/NODE-NATIVES/stream.js": {
    "kind": "commonjs",
    "refs": { ... }
  },
  "/NODE-NATIVES/fs.js": {
    "kind": "commonjs",
    "refs": {
      "stream": {
        "kind": "commonjs",
        "name": "stream",
        "path": "/NODE-NATIVES/stream.js"
      },
      ...
    }
  },
  "/sample/utils.js": {
    "kind": "commonjs",
    "refs": {}
  },
  "/sample/main.js": {
    "kind": "commonjs",
    "refs": {
      "fs": {
        "kind": "commonjs",
        "name": "fs",
        "path": "/NODE-NATIVES/fs.js"
      },
      "./utils": {
        "kind": "commonjs",
        "name": "./utils",
        "path": "/sample/utils.js"
      }
    }
  }
}

Each property in this JSON object represents a node in the graph. The 'refs' property contains the edges. Each edge corresponds to a module import.

An interesting detail is that the dependency analyzer returns special *path* strings for native node modules. When the inference engine request the source code for such a path, the Scripted server, which is written in JavaScript and running on Node.js, extracts the source code from its very own Node.js process. The inference engine analyzes it just like an ordinary JavaScript file. The result is nice content assist for built-in node modules:

\[caption id="attachment\_12184" align="aligncenter" width="587" caption="Inferred Suggestions for Built-in Node Modules"\][![](http://blog.springsource.org/wp-content/uploads/2015/11/node_modules_suggestions1.png "node_modules_suggestions")](http://blog.springsource.org/wp-content/uploads/2015/11/node_modules_suggestions1.png)\[/caption\]

## What module systems are supported?

For now we only provide support for AMD and CommonJS. For CommonJS we use the [enhanced-resolve](https://github.com/webpack/enhanced-resolve) library to resolve references to paths. For AMD we currently use a custom-made resolver. We may replace this with an existing library if we find one that meets our needs.

## How does it work?

The process starts with the *target file* (i.e. the argument passed to the *getDGraph* function). It proceeds roughly in the following steps:

1.  Detect the module type (CommonJS versus AMD).
2.  Find references in the target module.
3.  Resolve the references (i.e. determine the path of the actual file that will get loaded for a reference).
4.  Repeat the process from step 1 for each of the resolved references.

Step 1 is based on detecting some typical code patterns. E.g. "a call to 'require' not nested inside of a 'define' call" is  a sign that we are dealing with a CommonJS module.

Steps 2 and 3 are dispatched to different support modules depending on the module type from step 1. It should be relatively easy to add support for additional module types (provided the step 1 detector can be made to recognize the new module type).

## Automatic Resolver Configuration

The dependency analyzer tries to discover what it needs to know rather than requiring manual configuration. This is a general philosophy in Scripted and the dependency analyzer is no exception. In fact, there is no way to manually configure the dependency analyzer or any of its components, though it is likely we will make this possible in the future.

For Node/CommonJS this works very well, mainly because there really is not much that needs to be configured. I.e. if we assume the standard Node.js loader algorithm is used, that is really all the information we need.

For AMD the situation is unfortunately more complicated. The typical AMD loader (e.g. *requirejs*) is highly configurable. Moreover the way this configuration is expressed in the project's source code tends to vary from project to project. This makes it a challenge to determine where to find the required information in a random project.

The approach we have taken is to look at some example projects and the 'typical' patterns they use. Discovery works by recognizing these patterns. The hope is that if we support enough common patterns, eventually discovery will work for most projects. We may also add some manual configuration options as a last resort, for those cases where it fails.

To give an idea how AMD discovery works, here's an example of one of the patterns we currently detect:

[![](http://blog.springsource.org/wp-content/uploads/2012/11/editor-html.png "editor-html")](http://blog.springsource.org/wp-content/uploads/2012/11/editor-html.png)

The pattern here is a *script* tag with a *data-main* attribute... If Scripted finds this, it will go looking for a *requirejs* style configuration block in the *data-main* file:

[![](http://blog.springsource.org/wp-content/uploads/2012/11/setup-js1.png "setup-js")](http://blog.springsource.org/wp-content/uploads/2012/11/setup-js1.png)

AMD configuration discovery is a work in progress. As we are presented with more examples of how people setup their AMD loaders we try to add detectors for them. If Scripted incorrectly flags many dependencies as errors, it probably failed to discover your AMD configuration. You can help us by [raising a bug request](https://github.com/scripted-editor/scripted/issues?state=open). If you attach a code sample illustrating your 'typical pattern'. This will help us extend our 'pattern catalog'.

## Conclusion

We took a look under the covers of Scripted. We presented the Scripted dependency-analysis engine. It currently understands both AMD and CommonJS module systems. Dependency analysis provides the type inference engine with a dependency graph. Cross-file analysis based on this graph allows us to make accurate content assist suggestions for functionality defined in other modules. The dependency information is also used to create error markers for unresolvable module references, and allow navigation quick navigation to resolved dependencies. In the future, dependency analysis may also enable the implementation of accurate refactoring tools to move or rename modules.

Want to try out Scripted? Grab it from [GitHub](https://github.com/scripted-editor/scripted/). It is easy to install. Download and installation instructions are in the [readme](https://github.com/scripted-editor/scripted/blob/master/README.md) file.

## Links

-   Scripted
    -   GitHub (issue tracker, wiki etc.): [https://github.com/scripted-editor/scripted/](https://github.com/scripted-editor/scripted/)
    -   Google Group: [https://groups.google.com/forum/#!forum/scripted-dev](https://groups.google.com/forum/#!forum/scripted-dev)
-   Information on JavaScript Module Systems and loaders:
    -   RequireJS the 'typical' AMD module loader: [http://requirejs.org/](http://requirejs.org/)
    -   Information on the Node.js module loader [http://nodejs.org/docs/latest/api/modules.html](http://nodejs.org/docs/latest/api/modules.html)
    -   AMD or 'Asycnhronous Module Definition': [https://github.com/amdjs/amdjs-api/wiki/AMD](https://github.com/amdjs/amdjs-api/wiki/AMD)
    -   CommonJS: [http://www.commonjs.org/](http://www.commonjs.org/)