---
title: JavaScript modularity (without the buzzwords)
source: https://spring.io/blog/2014/04/11/javascript-modularity-without-the-buzzwords
scraped: 2026-02-24T07:27:00.278Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Brian Clozel |  April 11, 2014 | 3 Comments
---

# JavaScript modularity (without the buzzwords)

_Engineering | Brian Clozel |  April 11, 2014 | 3 Comments_

Almost ten years ago [Adrian Colyer](https://spring.io/team/acolyer) wrote a [memorable blog post](http://aspectprogrammer.org/blogs/adrian/2004/05/the_ted_neward.html), giving the best explanation on aspect oriented programming (AOP) out there: clear and simple style, accurate content, no buzzwords. If you've taken a look at the the earlier [two](https://spring.io/blog/2014/03/27/project-sagan-open-sourcing-spring-io) [posts](https://spring.io/blog/2014/04/04/project-sagan-zero-downtime-deployments) in this series, you may have noticed some of our architecture choices in the [client module](https://github.com/spring-io/sagan/tree/master/sagan-client) of the Sagan application, including the **use of JavaScript modules**.

In this post, I want to walk you through the basics of JavaScript modules in the style of Adrian's post: clear, simple, accurate, no buzzwords!

## [](#why-javascript-needs-modularity-too)Why JavaScript needs modularity too

If, like me, you have a Java background, some JavaScript language features may look a bit odd to you:

-   its strong [prototypal nature](http://javascript.crockford.com/prototypal.html)
-   no software component unit: no packages nor modules built in the language
-   difference of programming style between browser applications and server applications

Simple web applications usually look like this:

```html
Copy<html>
<head>
	<!-- scripts are loaded **sequentially** -->
	<script src="jquery.js"></script>
	<script src="widget.js"></script>
	<!-- all objects are in the global namespace, 
			 no way to isolate the code completely! -->
	<script>
		window.$; // this is jquery
	</script>
</head>
</html>
```

Developers often try to reuse blocks of functionality and manage dependencies between them. That's really hard to achieve in the previous case: you have to declare scripts in the right order and avoid name collisions **without any metadata about dependencies**. With a growing application, this task becomes a nightmare: imagine managing your Java applications without the benefit of packages or dependency management infrastructure!

## [](#understanding-javascript-authoring-formats-commonjs-and-amd)Understanding JavaScript authoring formats: commonJS and AMD

Fortunately, the JS community is well aware of the need for modularity and over the last few years, a couple widely-adopted approaches to solving this problem have emerged:

[AMD (Asynchronous Module Definition)](https://github.com/amdjs/amdjs-api/blob/master/AMD.md) is one of them:

```javascript
Copy// defining a module that depends on "graphmodule",
// injected in the function definition as an argument
define(["graphmodule"],
  function (graph) {
    // this module exports a "draw" function
    return function draw(data) {
      return graph.piechart(data);
    }
  }
);
```

The AMD format is often used in browser applications, since:

-   it allows variables to be scoped inside the factory function (vs. having everything in the window global scope)
-   dependencies may not be available synchronously, e.g., they need to be fetched via asynchronous network request
-   modules are defined in a callback, then run once all dependencies are loaded

[CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1.1) is another *authoring format*, often used in Node.js applications on the server side, but also in browser applications.

```javascript
Copy
/**
 * Our module's dependencies and API 
 **/
// we fetch the graph module as a dependency
var graph = require('graphmodule');

// we decorate the `exports` variable to export our function
exports.draw = drawFunc;

/**
 * API implementation
 **/
function drawFunc(data) {
    return graph.piechart(data);
}
```

You probably spotted some differences with AMD:

-   this authoring format can be used in the browser **and** on the server!
-   thus you can test your modules in headless browsers **and** Node.js unit tests!
-   module definitions aren't wrapped in a `define`

## [](#whats-next)What's next?

The next version of JavaScript (technically called ECMAScript 6) will [standardize JavaScript modularity](https://spring.io/understanding/javascript-modules#user-content-es6-modules), albeit using a slightly different syntax than either the AMD or commonJS formats we've seen above. More, EcmaScript 6 will solve many problems in that space but will also make available syntactic sugar to define OO-like classes.

Wherever you're putting JavaScript to use, be it client or server, consider taking the modular approach — for all the same reasons we do in Java. There is a small learning curve to getting proficient with JS module technology, but the results are well worth it.

If you're brand new to JavaScript modularity, I recommend checking out the ["Authoring CommonJS modules" tutorial](http://know.cujojs.com/tutorials/modules/authoring-cjs-modules) and the module loader we're using in Sagan: [curl](https://github.com/cujojs/curl). And once you're feeling familiar, take a look at our [module definitions in the Sagan app](https://github.com/spring-io/sagan/tree/master/sagan-client/src/feature).