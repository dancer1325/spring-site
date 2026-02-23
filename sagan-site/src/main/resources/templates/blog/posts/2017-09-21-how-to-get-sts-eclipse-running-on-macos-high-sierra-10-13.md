---
title: How to get STS/Eclipse running on macOS High Sierra (10.13)
source: https://spring.io/blog/2017/09/21/how-to-get-sts-eclipse-running-on-macos-high-sierra-10-13
scraped: 2026-02-23T16:21:08.988Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Martin Lippert |  September 21, 2017 | 10 Comments
---

# How to get STS/Eclipse running on macOS High Sierra (10.13)

_Engineering | Martin Lippert |  September 21, 2017 | 10 Comments_

The new version of macOS called High Sierra (10.13) will soon go GA and we expect many of our STS/Eclipse users and Spring developers will upgrade their machines sooner than later. In case you have your system running with an English locale, you are fine and everything will be good.

If you are running your system with a different language configured, you will see all menu items of Eclipse or STS being disabled after the upgrade to macOS High Sierra.

The good news is: you can quickly get this fixed without waiting for an update of Eclipse or STS. Go into the Eclipse.app or STS.app package, move into the "Contents" folder, and edit the Info.plist file (with a text editor of your choice). Scroll down to the list of locales and remove everything from that list except for the "en" entry. Save the file, exit your text editor, and you are good again.

You can do that edit even before you install macOS High Sierra (10.13), it doesn't hurt your existing install running on other versions of macOS. (And take care to start the app at least once before you edit the file. Otherwise Gatekeeper will notice that the code signature of the downloaded package doesn't fit the actual content and will deny to open the app.)

STS 3.9.1 will ship with a fixed Info.plist file out-of-the-box, of course, and is scheduled for mid October.

In case you are interested in all the details behind this, here is a bug entry at Eclipse with with all the details: [https://bugs.eclipse.org/bugs/show\_bug.cgi?id=520176](https://bugs.eclipse.org/bugs/show_bug.cgi?id=520176).