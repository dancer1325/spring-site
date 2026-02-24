---
title: Simple templates for the Scripted Editor
source: https://spring.io/blog/2013/01/23/simple-templates-for-the-scripted-editor
scraped: 2026-02-24T08:10:30.957Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Andrew Eisenberg |  January 23, 2013 | 0 Comments
---

# Simple templates for the Scripted Editor

_Engineering | Andrew Eisenberg |  January 23, 2013 | 0 Comments_

We [recently released 0.3](http://blog.springsource.org/2013/01/08/scripted-editor-0-3-release-available/) of the [Scripted Editor](https://github.com/scripted-editor/scripted), and we are making fast progress towards our next release. One of the major goals of [Scripted Editor](https://github.com/scripted-editor/scripted/) 0.4 is extensibility and part of the extensibility story is a simple, extensible templating mechanism (the other part is a powerful plugin model, which will be described in a future blog post). In this post, I will introduce custom code completions and templates for the Scripted editor.

[Sublime Text](http://www.sublimetext.com/) is an excellent, general purpose editor. It is highly configurable and many users of Scripted also use Sublime. Because of this, we want to make extensions to Sublime compatible with Scripted where it makes sense. One of these areas is [sublime-completions files](http://www.sublimetext.info/docs/en/extensibility/completions.html). These files specify lists of completions for a given content type (typically mapped to file extensions). Scripted allows you to use these completions files as-is and also provides a bit of extra functionality.

First, I will explain how to use existing sublime-completions files, then I will show how to create new ones, and finally I will show some of the extra functionality that we have added on top of what Sublime Text supports and how this all manifests in the editor.

### Using existing completions files

Simply rename your `*.sublime-completions` files to `*.scripted-completions` and place them in your `${user.home}/.scriptedrc` directory. Completions files also exist in the `scripted/completions` directory, but these completions are provided by scripted itself and will be overwritten on every upgrade.

As an example:

1.  Place the `PHP.sublime-completions` file in your Sublime Text distribution in your `.scriptedrc` directory. On macs, this file can be found here `${HOME}/Library/Application Support/Sublime Text 2/Packages/PHP/PHP.sublime-completions`
2.  Rename it to `PHP.scripted-completions`.
3.  Restart the Scripted server (run `scr -r` on the command line) to pick up the new file (remember...Scripted is a node app)
4.  Refresh editor page and open a php file.
5.  Content assist will now show the new PHP completions in your editor

You will see something like this:

[![](http://blog.springsource.org/wp-content/uploads/2013/01/first-php.png "first-php")](http://blog.springsource.org/wp-content/uploads/2013/01/first-php.png)

And selecting a proposal will show this:

[![](http://blog.springsource.org/wp-content/uploads/2013/01/first-php-result.png "first-php-result")](http://blog.springsource.org/wp-content/uploads/2013/01/first-php-result.png)

Simple as that.

### Creating your own completions files

Let's use a simplified portion of the PHP completions as an example:

The first line is the `scope` and is used by Sublime and Scripted to determine the context in which the completions are active. Scripted just recognizes the file extension of the first word of the scope (e.g., `php`) to determine in which kinds of files these completions are active. Sublime has a more complex notion of scopes, which are not (yet) implemented in Scripted. Next comes the array of completions. A single string element (e.g., `php`) will add that entry to the list of content assist proposals if the prefix matches. Slightly more complex are the entries with `trigger` and `contents`. The `trigger` refers to the text that will trigger the completion to appear in the list of proposals. The content section is the text that will replace the trigger. `$1`, `$2`, etc refer to tab stops while editing. The tab stops can be named like this `${1:text}`. `$0` is the escape position, which is the location that the caret will jump to after pressing enter. If not specified, the escape position defaults to being after the last character of the completion. There are a few differences between sublime-completions and scripted-completions to be aware of:

1.  Scripted does not recognize partitions in the scope. All that Scripted recognizes is the file extension.
2.  We use [json5](https://github.com/aseemk/json5) to parse scripted-completions files, so you can include comments and unquoted keys in your JSON text.

Any errors in the file will be logged in the `${TEMP}/scripted.log` file. And a complete reference for the sublime-completions file format is [available here](http://www.sublimetext.info/docs/en/extensibility/completions.html).

### Other capabilities

Scripted provides some extra features that are not available in Sublime.

##### Variables

You can include variables to be expanded in the content assist proposal. For example:

And content assist will look something like this:

[![](http://blog.springsource.org/wp-content/uploads/2013/01/var-php.png "var-php")](http://blog.springsource.org/wp-content/uploads/2013/01/var-php.png)

Pressing enter will produce this:

[![](http://blog.springsource.org/wp-content/uploads/2013/01/var-php-result.png "var-php-result")](http://blog.springsource.org/wp-content/uploads/2013/01/var-php-result.png)

The currently supported variables are:

-   `${year}` the current year
-   `${file}` full path to current file in editor
-   `${dir}` directory name of current file
-   `${projectDir}` directory of the current scripted project
-   `${selection}` currently selected text in the editor
-   `${lineStart}` opening whitespace of the current line
-   `${indent}` defaults to '\\t' and [can be configured](https://github.com/scripted-editor/scripted/wiki/Configuration)

The `${lineStart}` and `${indent}` variables do not need to be explicitly used. Every '\\n' in your completion will be replaced with `${lineStart}` and every '\\t' will be replaced with `${indent}`.

##### Templates

Templates are a special kind of completion. When content assist is invoked with a non-empty selection, all templates (and only the templates) will be shown regardless of prefixes. Templates can be used to surround your code in blocks. To mark a completion as a template, add isTemplate: true to the completion. For example, given this completion:

You can use it in the editor, like this:

[![](http://blog.springsource.org/wp-content/uploads/2013/01/template-php.png "template-php")](http://blog.springsource.org/wp-content/uploads/2013/01/template-php.png)

Press enter or click and the template is applied:

[![](http://blog.springsource.org/wp-content/uploads/2013/01/template-php-result.png "template-php-result")](http://blog.springsource.org/wp-content/uploads/2013/01/template-php-result.png)

Notice that formatting is applied correctly, using the existing whitespace to indent the code.

### Current status

An early form of scripted-completions are available in 0.3, but to use all of the features described in this blog post, you should work from master of the [Scripted repository on github](https://github.com/scripted-editor/scripted).

At the time of this writing, Scripted provides completions for html and JavaScript and we plan on providing proposals for more languages. Of course. you can add your own. And if you want to be a good open source citizen, please consider submitting pull requests for any new completion files that you create.