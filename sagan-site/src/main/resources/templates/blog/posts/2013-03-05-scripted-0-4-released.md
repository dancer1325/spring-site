---
title: Scripted 0.4 released
source: https://spring.io/blog/2013/03/05/scripted-0-4-released
scraped: 2026-02-24T08:08:24.254Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Andy Clement |  March 05, 2013 | 0 Comments
---

# Scripted 0.4 released

_Engineering | Andy Clement |  March 05, 2013 | 0 Comments_

This week we've released version 0.4 of our JavaScript focused code editor. You can read about the background of Scripted [here](http://blog.springsource.org/2012/10/11/scripted-a-javascript-editor-from-vmware/).

The full release notes for 0.4 are [here](http://scripted-editor.github.com/scripted/release_notes/0_4_0/scripted_0_4_0.html) but in this article I'll call out a few of the more interesting changes.

## Tooltips

  
Scripted uses an inferencing engine to build an understanding of your JavaScript code. Scripted 0.3 provided some basic tooltips showing inferred information about function calls. In Scripted 0.4 this has been taken further - not only better formatting but also any jsdoc discovered is now included in the tooltips. Here you can see the tooltip that will appear when you hover over the function call:

[![](http://blog.springsource.org/wp-content/uploads/2013/03/blog_jsdoc1.png "blog_jsdoc")](http://blog.springsource.org/wp-content/uploads/2013/03/blog_jsdoc1.png)

  
 

## Templates

  
Template support has been enhanced and you can now replace selections with text expansions that embed the original selection. In the first picture we have selected a function call and pressed `Ctrl/Cmd+Space`:

[![](http://blog.springsource.org/wp-content/uploads/2013/03/blog_templates1.png "blog_templates1")](http://blog.springsource.org/wp-content/uploads/2013/03/blog_templates1.png)

And on selecting the first template completion the editor contents become:

[![](http://blog.springsource.org/wp-content/uploads/2013/03/blog_templates2.png "blog_templates2")](http://blog.springsource.org/wp-content/uploads/2013/03/blog_templates2.png)

  
 

## Extensibility

  
This version of Scripted includes a basic plugin mechanism. It is possible to write just a single .js file, drop it into the right place, and it will extend the behaviour of Scripted. The plugin API is definitely a work-in-progress but you can already achieve some useful functionality. For example we have on-save source transformer plugins that perform operations like removing white space and adding copyright messages. There is more information on the plugin system in the [release notes](http://scripted-editor.github.com/scripted/release_notes/0_4_0/scripted_0_4_0.html) and [here](https://github.com/scripted-editor/scripted/wiki/Plugins) in the wiki. Basically plugin development involves writing an AMD module, 'require'ing the API pieces and you are good to go.

One of the key use cases we had in mind was enabling you to write a plugin that contributed new annotations to the editor (that appear in the left hand ruler and allow styling of the editor text) . Here is a very simple plugin. This simply locates the names of fruits in your code and adds annotations for them. Perhaps not the *most* useful plugin but it should show what the key parts of a plugin are, rather than getting bogged down in annotation computation.

```js
Copydefine(function (require) {

	// Grab the editor API
	var editorApi = require('scripted/api/editor-extensions');

	var pathExp = new RegExp('.*\\.js$');

	// Register the new annotation type
	editorApi.registerAnnotationType('example.message');

	// Load the styling for our annotation (very simple bit of css)
	editorApi.loadCss(require('text!./styling.css'));

	// Register an 'annotation computer'.
	// The return value of the function is the new set of annotations
	// which replace any added on previous calls to the function.
	editorApi.addAnnotationComputer(function (editor) {
		// Only interested in .js files
		var path = editor.getFilePath();
		if (!path || !pathExp.test(path)) {
			return;
		}
		var text = editor.getText();
		var fruits = ['apple', 'banana', 'kiwi', 'orange'];

		var annotations=[];
		for (var f=0; f<fruits.length; f++) {
			var fruit = fruits[f];
			var index = text.indexOf(fruit);
			while (index!=-1) {
				// Create the annotation: needs type/start/end/text
				annotations.push({type:'example.message', start:index, 
				  end:index+fruit.length, text:'Found '+fruit });
				index = text.indexOf(fruit,index+1);
			}
		}
		return annotations;
	});
	console.log('Annotation adding sample plugin');
});
```

The other two pieces of this plugin are the styling css (sorry about the inline image data, it is just convenient to reuse some of the images we inherit from Eclipse Orion):

```css
Copy/* Styling for the text in the editor */
.annotationRange.message {
	/* the icon for a 'squiggly' underline */
	background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJFhQXEbhTg7YAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAMklEQVQI12NkgIIvJ3QXMjAwdDN+OaEbysDA4MPAwNDNwMCwiOHLCd1zX07o6kBVGQEAKBANtobskNMAAAAASUVORK5CYII=");
	background-color: cyan;
	color: blue;
}
/* Styling for the right hand overview ruler */
.annotationOverview.message {
	background-color: grey;
	border: 1px solid #000080;
}
/* Styling for the left hand annotation ruler */
.annotationHTML.message {
	/* the icon for a 'flashlight' */
	background-image: url("data:image/gif;base64,R0lGODlhEAAQANUAALClrLu1ubOpsKqdp6eapKufqMTAw7attLSrsrGnr62jq8C7v765vaebpb22vLmyuMbCxsnGycfEx8G+wcrIysTBxUltof//yf///v70jergpPvws+nWc/npqvrpqvrpq/raffffnvXVkfTVkvXUkd+9f+SiOemvV+uyXa2OX7mYZqeIXKuNX/ClO7KQYqiIXJ59Vp19VpFvTo9uTZBvTpNyUJNyUf///////wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADgALAAAAAAQABAAAAZ4QJxwSCwajS2aS1U6DlunzcagcuKgG4sn5HJiLZ2QiHbEbj6hEapVTKVYr3OItG5TIhVGLF0npigUEAsPAjV9Q24pEhMBCAoybEUmGRcrDgcAAzNGkxcYNzAJBQSbRJ0YqBc2DaVEHJ6pGTStRBqfGBcZILRWvThBADs=");
}
```

and a plugin.json (a .json file isn't necessary for totally trivial plugins).

```js
Copy
{	
	"name": "annotation-adding-plugin",
	"version": "0.1",
	"description": "Scripted plugin to add markers in the editor",
	"main": "annotation-adding-plugin",
	"scripted": {
		"plugin": true
	}
}
```

All these pieces are [here](https://github.com/scripted-editor/scripted/tree/master/plugins/annotation-adding-plugin) in the git repo. Once activated, the styling will look like this when the annotations are added:

[![](http://blog.springsource.org/wp-content/uploads/2013/03/blog_annotations.png "blog_annotations")](http://blog.springsource.org/wp-content/uploads/2013/03/blog_annotations.png)

Based on this model we have implemented a more realistic plugin based on a blog article by Ariya Hidayat describing how to ['detect boolean traps'](http://ariya.ofilabs.com/2012/06/detecting-boolean-traps-with-esprima.html). The source for that plugin is [here](https://github.com/scripted-editor/scripted/tree/master/plugins/findbooleantrap-plugin).

Consult the wiki for more information on plugin development.  
 

## Day/Night mode

Last but not least we are building on the theming support in Orion and now have a light-on-dark theme for the editor. The individual colors are not currently configurable but we still feel the default colors that have been setup look pretty nice: [![](http://blog.springsource.org/wp-content/uploads/2013/03/blog_darkmode.png "blog_darkmode")](http://blog.springsource.org/wp-content/uploads/2013/03/blog_darkmode.png)  

## Getting started

Want to give it a go? If you have node/npm installed you just have to type:

```
Copy  npm install -g scripted
scr foo.js
```

The [readme](https://github.com/scripted-editor/scripted/) describes the other install options, it is available as a standalone zip. Many users are happy to follow master and update weekly/daily.