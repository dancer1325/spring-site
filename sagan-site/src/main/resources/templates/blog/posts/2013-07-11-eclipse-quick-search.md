---
title: Eclipse Quick Search
source: https://spring.io/blog/2013/07/11/eclipse-quick-search
scraped: 2026-02-24T08:02:09.905Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Kris De Volder |  July 11, 2013 | 9 Comments
---

# Eclipse Quick Search

_Engineering | Kris De Volder |  July 11, 2013 | 9 Comments_

Are you an Eclipse user? Do you want a fast and easy way to search for text snippets and patterns in your workspace? Then read on!

A new "Quick Search" is included in Spring ToolSuite (STS) 3.3.0 and Groovy Gails Tool Suite (GGTS) 3.3.0 which have just been released. Even if you are not a Spring or Grails developer, you might be interested in this Feature because it can also be installed separately into a vanilla Eclipse.

## Introducing the Quick Search Dialog

The Quick Search dialog is designed to do just one thing and do it well: use simple text searches to quickly navigate around your workspace.

You open the dialog by pressing **CTRL+SHIFT+L** (or **CMD+SHIFT+L** on Mac):

[![](http://blog.springsource.org/wp-content/uploads/2013/06/quicksearch.png "quicksearch")](http://blog.springsource.org/wp-content/uploads/2013/06/quicksearch.png)

## The Power of Simplicity

Unlike the standard Eclipse search UI, QuickSearch UI is extremely simple. Nothing to configure (e.g. no need to define a search Scope create a workingset etc.). There's just a **single search text box**. Start typing and see the **results appear immediately** and **update instantly as you type**. Use the arrow keys to select a result and press enter to navigate to it. You can also hit enter immediately to open the first result.

Of course you can also use the mouse if you want to, but **there's no need for your hands to leave the keyboard**.

If you select a text snippet in an Eclipse Editor or View, that string will be automatically entered in the search box when you open Quick Search. Start typing to replace it. For example you can select a log or error message string in the console to quickly search for it:

[![](http://blog.springsource.org/wp-content/uploads/2013/07/quicksearch-on-selection.png "quicksearch-on-selection")](http://blog.springsource.org/wp-content/uploads/2013/07/quicksearch-on-selection.png)

If nothing is selected then your last search will be entered in the search box. This helps when you are repeatedly searching for the same pattern.

## How did we make it so fast?

When you use the Quick Search dialog, results usually appear almost instantly and update instantly as you continue typing. All of this is done without using a search index and it even scales quite well on larger workspaces (e.g. our own workspaces containing all of STS and GGTS are rather large).

So how is this possible? Well, to be honest, we get a big boost because modern hardware is really quite fast. A fast CPU, a large amount of RAM and a good filesystem cache in the OS go a long way when you use heavily optimized native Java RegExp.

Another, more interesting part of the story is that the speed you 'experience' is actually a bit of an illusion. Worst case, you might paste a unique search term into the dialog and have to wait a few seconds as it searches all the files in your workspace. In practice you don't hit this worst case very often. So let's have a look at the two 'tricks' used behind the magic curtain. (Note: I don't claim to have invented these techniques. I'm sure they have been used before to provide responsive search experiences. This article is about how I used these techniques to create a nice text search tool for myself and other Eclipse users.)

**Trick 1: asynchronicity**

As soon as you type the first character the search process is kicked of and it starts searching for matches to your query. Results are shown as soon as they are found. Typically single character searches will have many matches in just about any file.  So, the dialog fills up instantly. To avoid the dialog from exploding the searcher will pause when it hits a limit of about 200 results.

[![](http://blog.springsource.org/wp-content/uploads/2013/06/one-char-search.png "one-char-search")](http://blog.springsource.org/wp-content/uploads/2013/06/one-char-search.png)

When you type another character the search term is updated. But rather than restarting the search from scratch the search term is updated inside the running search process. That means any results going forward will match the new search term. But what about already found results? Well, far from being useless, we know they already contain the results of the new query! For example if we type "av" then anything containing "av" must obviously also contain "a". So all we have to do to with results from old query "a" is filter out the results that don't match the new query "av". This is much faster then starting the search over again from scratch, because we only have to filter a relatively small number of in memory items rather than scan the file system again. Thus, the update as you type happens in an instant.

[![](http://blog.springsource.org/wp-content/uploads/2013/06/two-char-search.png "two-char-search")](http://blog.springsource.org/wp-content/uploads/2013/06/two-char-search.png)

**Trick 2: prioritization**

The second trick is 'prioritization'. If left to run, the Quick Search engine would eventually walk all the files in your workspace. But it tries to be smart in walking files you are probably more interested in first. The way we do that isn't particularly sophisticated. We just prioritize based on the files currently open in editors. The highest priority is assigned to the 'current active editor'. Then files open in other editors. Then files in the same folders alongside those files and so on.

That has two benefits. Firstly, it makes the search return interesting results faster. Second, it makes the more interesting results appear near the top of the list.

## **Tweaks and Options**

Earlier I said there are no options to configure. I lied :-). Quick Search actually doesn't search all files in your workspace. There are quite a few things that it skips. This is good because it speeds up the search. Also, you probably don't want to see results in those files anyway. For example, files in maven 'target' directies, '.git' Git metadata directory etc. What gets skipped is configurable via a Preferences Page.  Hopefully we got the defaults right so most users won't need to change them. But if you need to, you can.

[![](http://blog.springsource.org/wp-content/uploads/2013/06/quicksearch-prefs.png "quicksearch-prefs")](http://blog.springsource.org/wp-content/uploads/2013/06/quicksearch-prefs.png)

## Installing

The **Eclipse Quicksearch** feature comes pre-installed with GGTS and STS (version 3.3.0 and above). It is part of the '[eclipse-integration-commons](https://github.com/SpringSource/eclipse-integration-commons "eclipse-integration-commons")' project. However you can also install it separately into a Vanilla Eclipse because this Feature has no dependencies on other Spring project code.

For a separate install, you can get it from the Eclipse Market place (search for "Quick Search"). Or you can install directly from the update site. Open the Eclipse installer via Menu "Help >> Install New Software" and paste the update site url in the dialog (at the end of this article). Then select only the "Eclipse Quicksearch" Feature and hit the "Install" Button.

[![](http://blog.springsource.org/wp-content/uploads/2013/07/quicksearch-update-site.png "quicksearch-update-site")](http://blog.springsource.org/wp-content/uploads/2013/07/quicksearch-update-site.png)

## Links

Eclipse Update Site (note an update site link can't be opened in a web browser. See installation instructions above):

-   [http://dist.springsource.com/release/TOOLS/eclipse-integration-commons/](http://dist.springsource.com/release/TOOLS/eclipse-integration-commons/ "http://dist.springsource.com/release/TOOLS/eclipse-integration-commons/")

Feature requests, bug reports and general questions and feeback:

-   STS Forum: [http://forum.springsource.org/forumdisplay.php?32-SpringSource-Tool-Suite](http://forum.springsource.org/forumdisplay.php?32-SpringSource-Tool-Suite "http://forum.springsource.org/forumdisplay.php?32-SpringSource-Tool-Suite")
-   STS Issue tracker: [https://issuetracker.springsource.com/browse/STS](https://issuetracker.springsource.com/browse/STS "https://issuetracker.springsource.com/browse/STS")

if you are ... 

-   an Eclipse user
-   want a fast and easy way to search for text snippets and patterns in your workspace

... read on!