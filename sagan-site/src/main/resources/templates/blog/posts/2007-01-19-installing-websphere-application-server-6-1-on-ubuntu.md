---
title: Installing WebSphere Application Server 6.1 on Ubuntu
source: https://spring.io/blog/2007/01/19/installing-websphere-application-server-6-1-on-ubuntu
scraped: 2026-02-24T09:32:31.085Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Harrop |  January 19, 2007 | 0 Comments
---

# Installing WebSphere Application Server 6.1 on Ubuntu

_Engineering | Rob Harrop |  January 19, 2007 | 0 Comments_

Recently I've been doing some work with a client on WAS 6.1. Since we have a number of Spring users on WAS and I need to test the application, I decided it was time to get a copy of WAS running on one of my work laptops. I say 'one of' because I'm currently working on both my Mac (with OSX) and my ThinkPad (with Ubuntu) - more recently I've just been using the ThinkPad because I can have Oracle XE and WAS running without the need for a VM tool like Parallels. I still prefer the Mac, but to be honest there isn't much difference day-to-day - I just miss some of the more useful Mac tools like [Spotlight](http://www.apple.com/macosx/features/spotlight/), [Quicksilver](http://quicksilver.blacktree.com/), [TextMate](http://macromates.com/) and [NewsFire](http://www.newsfirerss.com/).

Anyway, back to the main topic - installing WAS 6.1 on Ubuntu. I'm using Ubuntu Edgy and my first attempts at an install failed completely and I just couldn't figure out why. Thankfully a quick Google turned up [this](http://www.snellspace.com/wp/?p=565) article. I was completely unaware that /bin/sh was linked to dash instead of bash - what on earth possessed them. I didn't really like the suggested solution of running the installer, letting it fail and then changing all the scripts in the installed directory. Instead, I just relinked /bin/sh with a quick sudo unlink /bin/sh followed by sudo ln -s /bin/bash /bin/sh. After that, the installer ran like a dream and I was up and running with a WAS install in about 15 minutes.

Even on my ThinkPad with Oracle XE running at the same time, WAS runs pretty quickly. One of the nicest things about WAS is that the tools provided (admin console, command-line tools) are really robust. The Admin Console is noticeable for its performance - many other servers have consoles that are painfully slow.