---
title: Countdown to Grails 2.0: User experience
source: https://spring.io/blog/2011/12/14/countdown-to-grails-2-0-user-experience
scraped: 2026-02-24T08:30:28.312Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Peter Ledbrook |  December 14, 2011 | 0 Comments
---

# Countdown to Grails 2.0: User experience

_Engineering | Peter Ledbrook |  December 14, 2011 | 0 Comments_

Welcome to this final Countdown to Grails 2.0 post: the final release is imminent! I'm not really going to say much here because some of the most interesting new features of Grails 2.0 are much better seen. For that reason, I've created a screencast so you can see exactly what awaits you when you install Grails 2.0 for the first time:

[http://www.youtube.com/watch?v=KJMR0gB6NHk](http://www.youtube.com/watch?v=KJMR0gB6NHk)

The key aspects are:

-   a whole new interactive console;
-   better automatic class reloading, including support for domain classes and Java files;
-   enhanced error reporting;
-   new HTML 5 scaffolding; and
-   new test reports.

As shown in the screencast, the new interactive console comes with: auto-completion on commands; execution of external applications using "bang" (!) commands; a command history buffer; and easy access to test and dependency reports. This is backed up by a much improved reloading mechanism for Grails classes. You don't need to restart run-app nearly as often as you used to!

One thing missing from the screencast is the new errors view which makes it easier to see where errors are occurring. It displays code fragments highlighting the lines that threw an exception:

![Grails 2 error page](http://grails.org/doc/2.0.0.RC3/img/errors-view.png "Grails 2 error page")

You'll also see that the stack traces have a new look to improve their readability. It may take a little while to adjust, but once you're used to them it's much quicker to see what the issue is. This is particularly useful for people coming to Grails from non-Java backgrounds!

You also get line-accurate reporting of problems in GSP files, as shown here (click to see full size):

[![Error in a GSP template](http://blog.springsource.org/wp-content/uploads/2011/12/gsp-error-view.png "Error in a GSP template")](http://blog.springsource.org/wp-content/uploads/2011/12/gsp-error-view.png)

As you can see, Grails 2.0 will be bringing lots of features that will improve day-to-day coding, and we expect the new interactive console to be a big hit. Enjoy the release!